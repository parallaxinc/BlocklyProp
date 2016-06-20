/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.CloudSessionOAuthService;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.security.OAuthToken;
import org.apache.commons.configuration.Configuration;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class OAuthServiceImpl implements OAuthService {

    private static final Logger log = LoggerFactory.getLogger(OAuthServiceImpl.class);

    private CloudSessionOAuthService oauthService;

    @Inject
    public void setConfiguration(Configuration configuration) {
        oauthService = new CloudSessionOAuthService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Override
    public User authenticateUser(String email, String authenticationSource) throws UnknownUserException, WrongAuthenticationSourceException, ServerException {
        User user = oauthService.validateUser(email, authenticationSource);
        if (user != null) {
            Subject currentUser = SecurityUtils.getSubject();

            OAuthToken authenticationToken = new OAuthToken(email, authenticationSource);

            try {
                currentUser.login(authenticationToken);
                return user;
            } catch (UnknownAccountException e) {
                log.info("Unknown account (wrong password?)", e);
                return null;
            } catch (Throwable t) {
                log.error("Error while authenticating", t);
                return null;
            }
        } else {
            return null;
        }
    }

}
