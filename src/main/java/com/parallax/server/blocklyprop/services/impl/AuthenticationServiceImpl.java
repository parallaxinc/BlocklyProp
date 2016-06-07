/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.client.cloudsession.CloudSessionAuthenticationTokenService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.security.IdAuthenticationToken;
import com.parallax.server.blocklyprop.services.AuthenticationService;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;
import javax.servlet.http.HttpSession;
import org.apache.commons.configuration.Configuration;
import org.apache.shiro.SecurityUtils;
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

    private static Logger log = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    private static AuthenticationService _instance;

    private Configuration configuration;

    private CloudSessionUserService userService;
    private CloudSessionAuthenticationTokenService authenticationTokenService;

    private TokenGeneratorService tokenGeneratorService;

    private Provider<HttpSession> sessionProvider;

    public AuthenticationServiceImpl() {
        _instance = this;
    }

    public static AuthenticationService get() {
        return _instance;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        userService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
        authenticationTokenService = new CloudSessionAuthenticationTokenService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Inject
    public void setSessionProvider(Provider<HttpSession> sessionProvider) {
        this.sessionProvider = sessionProvider;
    }

    @Inject
    public void setTokenGeneratorService(TokenGeneratorService tokenGeneratorService) {
        this.tokenGeneratorService = tokenGeneratorService;
    }

    private void doAuthentication(User user) {
        Subject currentUser = SecurityUtils.getSubject();
        IdAuthenticationToken idAuthenticationToken = new IdAuthenticationToken(user.getId());

        try {
            currentUser.login(idAuthenticationToken);
        } catch (Throwable t) {
            log.error("Error while authenticating", t);
        }
    }

}
