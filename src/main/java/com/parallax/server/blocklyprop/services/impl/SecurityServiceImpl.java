/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.common.base.Preconditions;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.client.cloudsession.CloudSessionRegisterService;
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.services.SecurityService;
import org.apache.commons.configuration.Configuration;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class SecurityServiceImpl implements SecurityService {

    private Configuration configuration;

    private CloudSessionRegisterService registerService;

    private UserDao userDao;

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        registerService = new CloudSessionRegisterService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Override
    public Long register(String screenname, String email, String password, String passwordConfirm) throws NonUniqueEmailException, PasswordVerifyException {
        Preconditions.checkNotNull(screenname, "Screenname cannot be null");
        Preconditions.checkNotNull(email, "Email cannot be null");
        Preconditions.checkNotNull(password, "Password cannot be null");
        Preconditions.checkNotNull(passwordConfirm, "PasswordConfirm cannot be null");

        return registerService.registerUser(email, password, passwordConfirm, "en");
    }

}
