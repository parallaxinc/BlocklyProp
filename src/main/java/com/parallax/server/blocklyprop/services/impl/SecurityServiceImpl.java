/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.client.cloudsession.CloudSessionAuthenticateService;
import com.parallax.client.cloudsession.CloudSessionRegisterService;
import com.parallax.client.cloudsession.CloudSessionUserService;
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
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.services.SecurityService;
import java.util.Calendar;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.validator.routines.EmailValidator;
import org.apache.shiro.SecurityUtils;
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

    /**
     * 
     */
    private static final Logger LOG = LoggerFactory.getLogger(SecurityServiceImpl.class);
    
    /**
     * 
     */
    private static SecurityServiceImpl instance;

    /**
     * 
     */
    private Provider<SessionData> sessionData;

    /**
     * 
     */
    private Configuration configuration;
    
    /**
     * 
     */
    private EmailValidator emailValidator = EmailValidator.getInstance();

    /**
     * 
     */
    private CloudSessionRegisterService registerService;
    
    /**
     * 
     */
    private CloudSessionAuthenticateService authenticateService;
    
    /**
     * 
     */
    private CloudSessionUserService userService;

    /**
     * 
     */
    private UserDao userDao;
    
    /**
     * Constructor
     * 
     */
    public SecurityServiceImpl() {
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
     * Set the session's data provider
     * 
     * @param sessionDataProvider 
     */
    @Inject
    public void setSessionDataProvider(Provider<SessionData> sessionDataProvider) {
        this.sessionData = sessionDataProvider;
    }

    /**
     * Set the session's user database object
     * 
     * @param userDao 
     */
    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * Configure cloud session service endpoints
     * 
     * @param configuration 
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
     * 
     * @param screenname String user screen name
     * @param email String user email address
     * @param password String user password
     * @param passwordConfirm String user password confirmation
     * @param birthMonth int Month component of user's birthday. COPPA field
     * @param birthYear int Year component of the user's birthday. COPPA field
     * @param parentEmail String Sponsor's email address. COPPA field
     * @param parentEmailSource int Sponsor classification. COPPA
     * @return
     * @throws NonUniqueEmailException
     * @throws PasswordVerifyException
     * @throws PasswordComplexityException
     * @throws ScreennameUsedException
     * @throws IllegalStateException 
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

        User user = new User();

        // Log a few things
        LOG.info("In register: parameter screen name: {}", screenname);
        LOG.info("In register: parameter email: {}", email);
        LOG.info("In register: parameter month: {}", birthMonth);
        LOG.info("In register: parameter year: {}", birthYear);
        LOG.info("In register: parameter sponsor email: {}", parentEmail);
        LOG.info("In register: parameter sponsor type selection: {}", parentEmailSource);
        
        // Perform basic sanity checks on inputs
        // Throws NullPointerException if screenname is null
        LOG.info("Resgistering new user: {}", screenname);
        Preconditions.checkNotNull(screenname, "ScreenNameNull");

        LOG.info("Verifying that a password was provided");
        Preconditions.checkNotNull(password, "PasswordIsNull");
        
        LOG.info("Verify that second copy of password was provided");
        Preconditions.checkNotNull(passwordConfirm, "PasswordConfirmIsNull");
 
        // Verify that we have valid COPPA data before continuing
        Preconditions.checkNotNull(birthMonth, "BirthMonthNull");
        LOG.info("Verify that month is provided: {}", birthMonth);
        Preconditions.checkState((birthMonth != 0), "BirthMonthNotSet");
        
        Preconditions.checkNotNull(birthYear, "BirthYearNull");

        int thisYear = Calendar.getInstance().get(Calendar.YEAR);
        LOG.info("Verify that year is provided: {}", birthYear);
        Preconditions.checkState((thisYear != birthYear), "BirthYearNotSet");

        // The user email field is optional if the user is under 13 years old
        if (user.isCoppaEligible(birthMonth, birthYear)) {
            LOG.info("User is COPPA eligible!");

            // We must have a sponsor email address for COPPA eligible users
            Preconditions.checkNotNull(
                    parentEmail,
                    "SponsorEmailNull");
            
            // This email address is optional
            if (email != null && email.length() > 0) {
                LOG.info("Verify that optional user email address is reasonable");
                Preconditions.checkState(
                    emailValidator.isValid(parentEmail),
                    "SponsorEmail");
            }

            // Looking for a reasonably valid email address
            if (parentEmail.length() > 0) {
                LOG.info("Verify that sponsor address is reasonable");
                Preconditions.checkState(
                        emailValidator.isValid(parentEmail),
                        "SponsorEmail");
            }
        }
        else {
            LOG.info("User is NOT COPPA eligible!");
            
            // User email address is required and must be reasonably valid
            LOG.info("Verifying email address has been supplied");
            Preconditions.checkNotNull(email, "UserEmailNull");

            LOG.info("Verifying email address is reasonable");
            Preconditions.checkState(emailValidator.isValid(email),"Email address format is incorrect");
        }
        
        // The sponsor email address is not required for anyone
        // 13 years old or older. If an address is provided, verify
        // that it is reasonable before saving it.
        if (parentEmail != null && parentEmail.length() > 0) {
            LOG.info("Verify that sponsor address is reasonable");
            Preconditions.checkState(
                    emailValidator.isValid(parentEmail),
                    "SponsorEmail");
        }

        try {
            // Attempt to register the user account data
            LOG.info("Registering user account with cloud-service");
            Long id = registerService.registerUser(
                    email, password, passwordConfirm, "en", screenname,
                    birthMonth, birthYear, parentEmail, parentEmailSource);
            
            if (id > 0) {
                userDao.create(id);
            }
            
            return id;
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
                WrongAuthenticationSourceException {

        LOG.info("Authenticating user from email address");
        return instance.authenticateLocalUser(email, password);
    }

    /**
     * Authenticate a user from the provided userID
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
     * 
     * @param email
     * @param password
     * @return
     * @throws UnknownUserException
     * @throws UserBlockedException
     * @throws EmailNotConfirmedException
     * @throws InsufficientBucketTokensException
     * @throws WrongAuthenticationSourceException 
     */
    @Override
    public User authenticateLocalUser(String email, String password) throws 
            UnknownUserException, 
            UserBlockedException, 
            EmailNotConfirmedException, 
            InsufficientBucketTokensException, 
            WrongAuthenticationSourceException {
        
        try {
            User user = authenticateService.authenticateLocalUser(email, password);
            LOG.info("User authenticated");
            return user;

        } catch (NullPointerException npe) {
            throw npe;

        } catch (ServerException se) {
            LOG.error("Server error encountered: {}", se.getMessage());
            return null;
        }
    }

    /**
     * 
     * @param idUser
     * @return
     * @throws UnknownUserIdException
     * @throws UserBlockedException
     * @throws EmailNotConfirmedException 
     */
    public User authenticateLocalUser(Long idUser) throws 
            UnknownUserIdException, 
            UserBlockedException, 
            EmailNotConfirmedException {
        
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
     */
    public static SessionData getSessionData() {
        LOG.debug("Getting user session data");
        SessionData sessionData = instance.sessionData.get();
        
        if (sessionData.getIdUser() == null) {
            
            // Did not get a valid session
            if (SecurityUtils.getSubject().isAuthenticated()) {
                
                try {
                    User user = instance.userService.getUser(
                            (String) SecurityUtils.getSubject().getPrincipal());
                    
                    if (user != null) {
                        // User account local may have changed
                        if (!Strings.isNullOrEmpty(sessionData.getLocale())) {
                            if (!sessionData.getLocale().equals(user.getLocale())) {
                                try {
                                    user = instance.userService.changeUserLocale(
                                            user.getId(), sessionData.getLocale());
                                } catch (UnknownUserIdException ex) {
                                    LOG.error("UnknownUserId exception detected. {}", ex.getMessage());
                                }
                            }
                        }
                        
                        sessionData.setUser(user);
                        sessionData.setIdUser(
                                instance.userDao.getUserIdForCloudSessionUserId(user.getId()));
                        
                        instance.userDao.updateScreenname(
                                sessionData.getIdUser(), 
                                user.getScreenname());
                    }
                } catch (UnknownUserException ex) {
                    LOG.error("Unknown user ID. {}", ex);
                } catch (ServerException se) {
                    LOG.error("Server error detected. {}", se.getMessage());
                }
            }
        }
        return sessionData;
    }
}
