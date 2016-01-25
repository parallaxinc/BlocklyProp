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
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.services.SecurityService;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.configuration.Configuration;
import org.apache.shiro.SecurityUtils;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class SecurityServiceImpl implements SecurityService {

    private Provider<SessionData> sessionData;

    private Configuration configuration;

    private CloudSessionRegisterService registerService;
    private CloudSessionAuthenticateService authenticateService;
    private CloudSessionUserService userService;

    private UserDao userDao;

    private static SecurityServiceImpl instance;

    public SecurityServiceImpl() {
        instance = this;
    }

    @Inject
    public void setSessionDataProvider(Provider<SessionData> sessionDataProvider) {
        this.sessionData = sessionDataProvider;
    }

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        registerService = new CloudSessionRegisterService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
        authenticateService = new CloudSessionAuthenticateService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
        userService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }

    @Override
    public Long register(String screenname, String email, String password, String passwordConfirm) throws NonUniqueEmailException, PasswordVerifyException {
        Preconditions.checkNotNull(screenname, "Screenname cannot be null");
        Preconditions.checkNotNull(email, "Email cannot be null");
        Preconditions.checkNotNull(password, "Password cannot be null");
        Preconditions.checkNotNull(passwordConfirm, "PasswordConfirm cannot be null");

        try {
            Long id = registerService.registerUser(email, password, passwordConfirm, "en", screenname);
            userDao.create(id);
            return id;
        } catch (ServerException se) {
            return null;
        }
    }

    public static User authenticateLocalUserStatic(String email, String password) throws UnknownUserException, UserBlockedException, EmailNotConfirmedException {
        return instance.authenticateLocalUser(email, password);
    }

    public static User authenticateLocalUserStatic(Long idUser) throws UnknownUserIdException, UserBlockedException, EmailNotConfirmedException {
        return instance.authenticateLocalUser(idUser);
    }

    public User authenticateLocalUser(String email, String password) throws UnknownUserException, UserBlockedException, EmailNotConfirmedException {
        try {
            User user = authenticateService.authenticateLocalUser(email, password);
//            sessionData.get().setUser(user);
//            sessionData.get().setIdUser(userDao.getUserIdForCloudSessionUserId(user.getId()));
            return user;
        } catch (NullPointerException npe) {
            npe.printStackTrace();
            throw npe;
        } catch (ServerException se) {
            return null;
        }
    }

    public User authenticateLocalUser(Long idUser) throws UnknownUserIdException, UserBlockedException, EmailNotConfirmedException {
        try {
            User user = userService.getUser(idUser);
//            sessionData.get().setUser(user);
//            sessionData.get().setIdUser(userDao.getUserIdForCloudSessionUserId(user.getId()));
            return user;
        } catch (NullPointerException npe) {
            npe.printStackTrace();
            throw npe;
        } catch (ServerException se) {
            return null;
        }
    }

    public static SessionData getSessionData() {
        SessionData sessionData = instance.sessionData.get();
        if (sessionData.getIdUser() == null) {
            if (SecurityUtils.getSubject().isAuthenticated()) {
                try {
                    User user = instance.userService.getUser((String) SecurityUtils.getSubject().getPrincipal());
                    if (user != null) {
                        if (!Strings.isNullOrEmpty(sessionData.getLocale())) {
                            if (!sessionData.getLocale().equals(user.getLocale())) {
                                try {
                                    user = instance.userService.changeUserLocale(user.getId(), sessionData.getLocale());
                                } catch (UnknownUserIdException ex) {
                                    Logger.getLogger(SecurityServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                                }
                            }
                        }
                        sessionData.setUser(user);
                        sessionData.setIdUser(instance.userDao.getUserIdForCloudSessionUserId(user.getId()));
                        instance.userDao.updateScreenname(sessionData.getIdUser(), user.getScreenname());
                    }
                } catch (UnknownUserException ex) {
                    //       Logger.getLogger(SecurityServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                } catch (ServerException se) {

                }
            }
        }
        return sessionData;
    }

}
