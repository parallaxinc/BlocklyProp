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

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;

import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.services.AuthenticationService;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;

import javax.servlet.http.HttpSession;
import org.apache.commons.configuration.Configuration;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {

    /**
     * Application logging object
     */
    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    private static AuthenticationService _instance;

    private Configuration configuration;

    private CloudSessionUserService userService;

    private TokenGeneratorService tokenGeneratorService;

    private Provider<HttpSession> sessionProvider;

    /**
     * Constructor
     *
     */
    public AuthenticationServiceImpl() {
        // TODO: Fix leaking 'this' in constructor.
        _instance = this;
    }

    /**
     * Get the active AuthenticationService object
     * 
     * @return AthenticationService instance 
     */
    public static AuthenticationService get() {
        return _instance;
    }


    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        userService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }



    @Inject
    public void setSessionProvider(Provider<HttpSession> sessionProvider) {
        this.sessionProvider = sessionProvider;
    }



    @Inject
    public void setTokenGeneratorService(TokenGeneratorService tokenGeneratorService) {
        this.tokenGeneratorService = tokenGeneratorService;
    }



    /**
     * Authenticate a local user
     * 
     * @param username
     * @param password
     * @return a valid User object or null 
     */
    @Override
    public User authenticate(String username, String password) {

        LOG.info("Authenticating user");
        LOG.info("User: '{}', Pwd: '{}'", username, password);

        /* -----------------------------------------------------------------------------
         * A Subject represents state and security operations for a single application
         * user. These operations include authentication (login/logout), authorization
         * (access control), and session access. It is Shiro's primary mechanism for
         * single-user security functionality.
         * ------------------------------------------------------------------------------
         */

        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken authenticationToken = new UsernamePasswordToken(username, password);

        try {
            currentUser.login(authenticationToken);
        }
        catch (UnknownAccountException e) {
            LOG.info("Unknown account (wrong password?): {}", e.getMessage());
            return null;
        }
        catch (Throwable t) {
            LOG.error("Error while authenticating: {}", t.getMessage());
            return null;
        }

        try {
            return userService.getUser(username);
        }
        catch (UnknownUserException uue) {
            LOG.error("Unknown user exception just after login", uue);
            return null;
        }
        catch (ServerException se) {
            LOG.error("Server exception after login", se);
            return null;
        }
    }

}
