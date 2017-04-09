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
import org.apache.commons.configuration.Configuration;
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

    private static final Logger log = LoggerFactory.getLogger(SecurityServiceImpl.class);
    
    private static SecurityServiceImpl instance;

    private Provider<SessionData> sessionData;

    private Configuration configuration;

    private CloudSessionRegisterService registerService;
    private CloudSessionAuthenticateService authenticateService;
    private CloudSessionUserService userService;

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
        log.debug("Setting cloud session configuration");
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
     * Register a user account
     * 
     * @param screenname
     * @param email
     * @param password
     * @param passwordConfirm
     * @return An ID for the new account or null if unsuccessful
     * @throws NonUniqueEmailException
     * @throws PasswordVerifyException
     * @throws PasswordComplexityException
     * @throws ScreennameUsedException 
     */
    @Override
    public Long register(
            String screenname, 
            String email, 
            String password, 
            String passwordConfirm) throws 
                NonUniqueEmailException, 
                PasswordVerifyException, 
                PasswordComplexityException, 
                ScreennameUsedException {

        log.info("Resgistering new user: {}", screenname);
        
        // Perform basic sanity checks on inputs
        Preconditions.checkNotNull(screenname, "Screenname cannot be null");
        Preconditions.checkNotNull(email, "Email cannot be null");
        Preconditions.checkNotNull(password, "Password cannot be null");
        Preconditions.checkNotNull(passwordConfirm, "PasswordConfirm cannot be null");

        try {
            // Attempt to register the user account data
            Long id = registerService.registerUser(
                    email, password, passwordConfirm, "en", screenname);
            userDao.create(id);
            return id;
        } catch (ServerException se) {
            log.error("Server error detected");
            return null;
        }
    }

    /**
     *  Get instance of the authenticated user object
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
    public static User authenticateLocalUserStatic(
            String email, 
            String password) throws
                UnknownUserException, 
                UserBlockedException, 
                EmailNotConfirmedException, 
                InsufficientBucketTokensException, 
                WrongAuthenticationSourceException {

        log.info("Authenticating user from email address");
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
    public static User authenticateLocalUserStatic(Long idUser) throws 
            UnknownUserIdException, 
            UserBlockedException, 
            EmailNotConfirmedException {
        
        log.info("Authenticating user from userID");
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
            log.info("User authenticated");
            return user;

        } catch (NullPointerException npe) {
            throw npe;

        } catch (ServerException se) {
            log.error("Server error encountered: {}", se.getMessage());
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
            log.info("User authenticated");
            return user;

        } catch (NullPointerException npe) {
            throw npe;

        } catch (ServerException se) {
            log.error("Server error detected. {}", se.getMessage());
            return null;
        }
    }

    /**
     * Return user session data
     * 
     * @return SessionData object containing user session details or null
     */
    public static SessionData getSessionData() {
        log.debug("Getting user session data");
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
                                    log.error("UnknownUserId exception detected. {}", ex.getMessage());
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
                    log.error("Unknown user ID. {}", ex);
                } catch (ServerException se) {
                    log.error("Server error detected. {}", se.getMessage());
                }
            }
        }
        return sessionData;
    }

}
