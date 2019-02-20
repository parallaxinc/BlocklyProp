/*
 * Copyright (c) 2019 Parallax Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.parallax.server.blocklyprop.services.impl;

import com.parallax.client.cloudsession.CloudSessionAuthenticateService;
import com.parallax.client.cloudsession.CloudSessionRegisterService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.services.SecurityService;
import com.parallax.server.blocklyprop.services.SessionService;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import java.util.Calendar;


import org.apache.commons.configuration.Configuration;
import org.apache.commons.validator.routines.EmailValidator;
import org.apache.shiro.SecurityUtils;
// import org.apache.shiro.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * User security services
 * 
 * @author Michel
 */
@Singleton
@Transactional
public class SecurityServiceImpl implements SecurityService {

    // Handle to logging facility for the SecurityServiceImpl class
    private static final Logger LOG = LoggerFactory.getLogger(SecurityServiceImpl.class);

    // A static instance of this object
    private static SecurityServiceImpl instance;

    // Application configuration settings
    private Configuration configuration;

    // Interface to the Cloud Session user account registration service
    private CloudSessionRegisterService registerService;

    // Interface to the Cloud Session user authentication service
    private CloudSessionAuthenticateService authenticateService;

    // Interface to the Cloud Session user account/profile services
    private CloudSessionUserService userService;

    // Injects an instance of SessionData here
    private Provider<SessionData> sessionData;

    // Access to the BlocklyProp user details
    private UserDao userDao;

    private SessionService sessionService;

    @Inject
    public void setSessionService(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    /**
     * Get a static instance of the EmailValidator object.
     *
     * @implNote
     * The default configuration for the validator is to not allow local and TLDs
     */
    private EmailValidator emailValidator = EmailValidator.getInstance();


    /**
     * Constructor
     */
    public SecurityServiceImpl() {
        //
        // TODO: Correct the 'this' construct in the constructor
        //
        // Notes from: https://www.securecoding.cert.org/confluence/display/java/TSM01-J.+Do+not+let+the+this+reference+escape+during+object+construction 
        //
        // Publishing by assigning this to a public static variable from the 
        // constructor of a class whose object is being constructed.
        //-------------------------------------------------------------------
        instance = this;
    }


    /**
     * Implements the Providers setSessionDataProvider interface
     * 
     * This is a callback used by the Shiro package to provide a connection
     * between the application and the Shiro session management services.
     * 
     * @param sessionDataProvider
     * is a class that models the session data
     *
     */
    @Inject
    public void setSessionDataProvider(Provider<SessionData> sessionDataProvider) {
        this.sessionData = sessionDataProvider;
    }


    /**
     * Set the session's user database object in the blocklyprop system.
     * 
     * @param userDao
     * is the DAO interface to User data instance store
     */
    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }


    /**
     * Configure cloud session service endpoints
     * 
     * @param configuration
     * A application configuration object
     */
    @Inject
    public void setConfiguration(Configuration configuration) {

        LOG.debug("Setting cloud session configuration");

        this.configuration = configuration;

        // Set the source for the cloud session registration services
        registerService = new CloudSessionRegisterService(
                configuration.getString("cloudsession.server"), 
                configuration.getString("cloudsession.baseurl"));
        
        // Set the source for cloud session user authentication  services
        authenticateService = new CloudSessionAuthenticateService(
                configuration.getString("cloudsession.server"), 
                configuration.getString("cloudsession.baseurl"));
        
        // Set the source location for cloud session existing local user
        // account services
        userService = new CloudSessionUserService(
                configuration.getString("cloudsession.baseurl"));
    }


    /**
     * Validate new user data and create a new user account
     * 
     * Details:
     * If the request passes all validity tests, create a user account
     * in the cloud session system. If that account is created successfully, 
     * create a user record in the blocklyprop system from data stored in
     * the cloud session user record.
     * 
     * @param screenname String user screen name
     * @param email String user email address
     * @param password String user password
     * @param passwordConfirm String user password confirmation
     * @param birthMonth int Month component of user's birthday. COPPA field
     * @param birthYear int Year component of the user's birthday. COPPA field
     * @param parentEmail String sponsor email address. COPPA field
     * @param parentEmailSource int Sponsor classification. COPPA
     *
     * @return The cloud session user ID if successful or zero upon failure
     *
     * @throws NonUniqueEmailException
     * A user account with the provided email address already exists
     *
     * @throws PasswordVerifyException
     * The two password values provided do not match
     *
     * @throws PasswordComplexityException
     * The provided password does not meet the requirements for a secure password
     *
     * @throws ScreennameUsedException
     * A user account with the provided screen name already exists
     *
     * @throws IllegalStateException
     *
     */
    @Override
    public Long register(
            String screenname, 
            String email, 
            String password, 
            String passwordConfirm,
            int birthMonth,
            int birthYear,
            String parentEmail,
            int parentEmailSource) throws 
                NonUniqueEmailException, 
                PasswordVerifyException, 
                PasswordComplexityException, 
                ScreennameUsedException,
                IllegalStateException{

        LOG.info("Registering a new user: {}({})", email,  screenname);

        // Instantiate a new cloud session user profile object
        User user = new User();

        // Perform basic sanity checks on inputs
        // Throws NullPointerException if screenname is null
        Preconditions.checkNotNull(screenname, "ScreenNameNull");

        // User email address is required and must be reasonably valid
        Preconditions.checkNotNull(email, "UserEmailNull");
        Preconditions.checkState(
                emailValidator.isValid(email),
                "Email address format is incorrect");

        // The password fields must contain something
        Preconditions.checkNotNull(password, "PasswordIsNull");
        Preconditions.checkNotNull(passwordConfirm, "PasswordConfirmIsNull");

        // Verify that we have valid COPPA data before continuing
        // Birth month
        Preconditions.checkNotNull(birthMonth, "BirthMonthNull");
        Preconditions.checkState((birthMonth != 0), "BirthMonthNotSet");

        // Birth year
        Preconditions.checkNotNull(birthYear, "BirthYearNull");
        Preconditions.checkState(
                (Calendar.getInstance().get(Calendar.YEAR) != birthYear),
                "BirthYearNotSet");

        // Get additional information if the registrant is under 13 years old
        if (user.isCoppaEligible(birthMonth, birthYear)) {
            // We must have a sponsor email address for COPPA eligible users
            Preconditions.checkNotNull(
                    parentEmail,
                    "SponsorEmailNull");

            // Verify that the sponsor email address is reasonable
            if (parentEmail != null && parentEmail.length() > 0) {
                Preconditions.checkState(
                        emailValidator.isValid(parentEmail),
                        "SponsorEmail");
            }

            LOG.info("User is COPPA restricted");
            LOG.info("Sponsor email address is: {}", parentEmail);
        }

        /* ------------------------------------------------------------------
         * Attempt to register the user account data with the cloud session
         * service. If successful, the method call will return a cloud
         * session user id for the newly created account
         * -----------------------------------------------------------------*/
        try {
            LOG.info("Registering user account with cloud-service");
            Long idCloudSessionUser = registerService.registerUser(
                    email, 
                    password, 
                    passwordConfirm, 
                    "en", 
                    screenname,
                    birthMonth, 
                    birthYear, 
                    parentEmail, 
                    parentEmailSource);
            
            // Create a BlocklyProp user account record
            if (idCloudSessionUser > 0) {
                LOG.info("Creating matching blocklyprop user record for {}", screenname);
                userDao.create(idCloudSessionUser, screenname);
            }
            
            return idCloudSessionUser;
        }
        catch (ServerException se) {
            LOG.error("Server error detected");
            return 0L;
        }
        catch (NullPointerException npe) {
            LOG.error("New user registration failed with: {}", npe.getMessage() );
            return 0L;
        }
    }


    /**
     *  Get instance of an authenticated user object
     * 
     * @param email
     * @param password
     * @return Authenticated User object or null
     * @throws UnknownUserException
     * @throws UserBlockedException
     * @throws EmailNotConfirmedException
     * @throws InsufficientBucketTokensException
     * @throws WrongAuthenticationSourceException 
     */
    @Inject
    public static User authenticateLocalUserStatic(
            String email, 
            String password) throws
                UnknownUserException, 
                UserBlockedException, 
                EmailNotConfirmedException, 
                InsufficientBucketTokensException, 
                WrongAuthenticationSourceException,
                ServerException {

        LOG.info("Authenticating user from email address");

        return instance.authenticateLocalUser(email, password);
    }

    /**
     * Get an instance of an authenticated user object
     * 
     * @param idUser
     * 
     * @return
     * @throws UnknownUserIdException
     * @throws UserBlockedException
     * @throws EmailNotConfirmedException 
     */
    @Inject
    public static User authenticateLocalUserStatic(Long idUser) throws 
            UnknownUserIdException, 
            UserBlockedException, 
            EmailNotConfirmedException {
        
        LOG.info("Authenticating user from userID");
        return instance.authenticateLocalUser(idUser);
    }

    /**
     * Authenticate a user login using the local user authentication database
     *
     * @param email
     * @param password
     * @return
     * @throws UnknownUserException
     * @throws UserBlockedException
     * @throws EmailNotConfirmedException
     * @throws InsufficientBucketTokensException
     * @throws WrongAuthenticationSourceException
     * @throws NullPointerException
     *
     */
    @Override
    public User authenticateLocalUser(String email, String password) throws
            UnknownUserException,
            UserBlockedException, 
            EmailNotConfirmedException, 
            InsufficientBucketTokensException, 
            WrongAuthenticationSourceException,
            NullPointerException,
            ServerException {
        
        try {
            LOG.info("Attempting to authenticate {}", email);

            // Query Cloud Session interface
            User user = authenticateService.authenticateLocalUser(email, password);
            return user;

        } catch (UnknownUserException uue) {
            LOG.error("User account is unknown.");
            throw uue;
        } catch (UserBlockedException ube) {
            LOG.error("User account is blocked.");
            throw ube;

        } catch (EmailNotConfirmedException enc) {
            LOG.error("Attempt to log into an unconfirmed account.");
            throw enc;

        } catch (InsufficientBucketTokensException ibte) {
            LOG.error("Number of consecutive login attempts has been exceeded.");
            throw ibte;

        } catch (WrongAuthenticationSourceException wase) {
            LOG.error("Attempting to authenticate to the wrong authentication source.");
            throw wase;

        } catch (NullPointerException npe) {
            LOG.error("Authentication threw Null Pointer Exception");
            throw npe;

        } catch (ServerException se) {
            LOG.error("Server error encountered: {}", se.getMessage());
            throw se;
        }
    }

    /**
     * 
     * @param idUser
     * This is the primary key from the cloudsession.user table.
     *
     * @return
     * Returns a User object if successful. Otherwise it throws an appropriate exception.
     *
     * @throws UnknownUserIdException
     * User account does not exist
     *
     * @throws UserBlockedException
     * User account is locked and unavailable
     *
     * @throws EmailNotConfirmedException
     * User account registration is incomplete. The account is unavailable.
     */
    public User authenticateLocalUser(Long idUser) throws 
            UnknownUserIdException, 
            UserBlockedException, 
            EmailNotConfirmedException {

        // FixMe: UserBlockledException is never thrown in client.cloudsession.

        try {
            User user = userService.getUser(idUser);
            LOG.info("User authenticated");
            return user;

        } catch (NullPointerException npe) {
            throw npe;

        } catch (ServerException se) {
            LOG.error("Server error detected. {}", se.getMessage());
            return null;
        }
    }

    /**
     * Return user session data
     * 
     * @return SessionData object containing user session details or null
     *
     * @implNote
     * The SessionData object stores three attributes:
     *     user - A cloud session user profile object
     *     idUser - the blocklprop user primary key ID
     *     locale - the locale string used for this session
     */
    public static SessionData getSessionData() {
        LOG.debug("Getting user session data");

        SessionData sessionData = instance.sessionData.get();

        if (sessionData == null) {
            LOG.warn("Error obtaining session data");
            return null;
        }

        // Check for a BP user id
        if (sessionData.getIdUser() == null) {
            LOG.debug("No user ID is associated with the current session");
            
            // No BP user id found, is the user in this session authenticated?
            if (SecurityUtils.getSubject().isAuthenticated()) {
                
                // The user identified by this session is authenticated. Perform
                // a fun exercise to locate the BP user id for this authenticated
                // user.
                LOG.debug("Obtaining session data for authenticated user");
                
                try {
                    // Getting a user record using the account email address
                    String principal = (String) SecurityUtils.getSubject().getPrincipal();
                    // Display the user's email address
                    LOG.debug("Principal is: {}", principal );
                    
                    // Get the user account/profile record
                    String emailAddress = (String) SecurityUtils.getSubject().getPrincipal();
                    LOG.debug("Getting user profile for {}", emailAddress);

                    // Retrieve a blocky user record using an email address
                    User user = instance.userService.getUser(
                            (String) SecurityUtils.getSubject().getPrincipal());

                    // Did we get a user account object
                    if (user != null) {
                        LOG.debug("User Profile: {}({}), ID: {}",
                                user.getEmail(),
                                user.getScreenname(),
                                user.getId());
                        LOG.debug("Session Locale is: {}",sessionData.getLocale());

                        // Yes, User account local may have changed
                        if (!Strings.isNullOrEmpty(sessionData.getLocale())) {
                            if (!sessionData.getLocale().equals(user.getLocale())) {
                                try {
                                    // User locale changed. Let's update the user 
                                    // account with new locale
                                    LOG.debug("Changing user {} locale", user.getScreenname());
                                    user = instance.userService.changeUserLocale(
                                            user.getId(), sessionData.getLocale());

                                } catch (UnknownUserIdException ex) {
                                    LOG.error("UnknownUserId exception detected. {}", ex.getMessage());
                                }
                            }
                        }

                        // Store the user profile into the session
                        sessionData.setUser(user);

                        LOG.debug("Checking {}", sessionData.getUser().getScreenname());

                        // Getting the blocklyprop user record
                        Long idBlocklyUser = instance.userDao.getUserIdForCloudSessionUserId(user.getId());

                        LOG.debug("Obtained BlocklyProp user id {} from cloud session id {} ",
                                idBlocklyUser,
                                user.getId() );

                        UserRecord bpUser = instance.userDao.getUser(idBlocklyUser);

                        if (bpUser != null) {
                            LOG.debug("Retrieved blockly user record: bpID: {}, csID: {}, Name: {}",
                                    bpUser.getId(),
                                    bpUser.getIdcloudsession(),
                                    bpUser.getScreenname() );


                            // Verify that the screen name matches in both databases
                            if (! bpUser.getScreenname().equals(user.getScreenname())) {
                                LOG.info("Updating bp screen name from {} to {}",
                                        bpUser.getScreenname(),
                                        user.getScreenname());

//                                instance.userDao.updateScreenName(
//                                        bpUser.getId(),
//                                        user.getScreenname());
                            }
                        }else{
                            LOG.warn("Warning! Setting BP user id to zero");
                            sessionData.setIdUser(0L);
                        }

                        sessionData.setIdUser(idBlocklyUser);
                        sessionData.setLocale(user.getLocale());


                        //TODO: Persist the updated sessionData
                    }
                } catch (UnknownUserException ex) {
                    LOG.error("Unknown user ID. {}", ex);
                } catch (ServerException se) {
                    LOG.error("Server error detected. {}", se.getMessage());
                }
            }
        }

        LOG.debug("Returning session data");
        return sessionData;
    }
}
