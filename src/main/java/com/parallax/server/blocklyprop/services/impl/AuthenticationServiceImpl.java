/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.common.hash.Hashing;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.client.cloudsession.CloudSessionAuthenticationTokenService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.AuthenticationData;
import com.parallax.server.blocklyprop.security.IdAuthenticationToken;
import com.parallax.server.blocklyprop.services.AuthenticationService;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.List;
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

    @Override
    public AuthenticationData getAuthenticationData() {
        AuthenticationData authenticationData = (AuthenticationData) sessionProvider.get().getAttribute("authentication");
        if (authenticationData == null) {
            String challenge = tokenGeneratorService.generateToken();

            authenticationData = new AuthenticationData();
            authenticationData.setChallenge(challenge);
            authenticationData.setLastTimestamp(new Date().getTime());
            // System.out.println("Setting authentication data: " + sessionData);

            sessionProvider.get().setAttribute("authentication", authenticationData);
        }
        return authenticationData;
    }

    @Override
    public String getChallenge() {
        AuthenticationData authenticationData = getAuthenticationData();
        return authenticationData.getChallenge();
    }

    @Override
    public Long getTimestamp() {
        AuthenticationData authenticationData = getAuthenticationData();
        return authenticationData.getLastTimestamp();
    }

    @Override
    public User authenticate(Long idUser, Long timestamp, String hash, String userAgent, String remoteAddress) {
        try {
            AuthenticationData authenticationData = getAuthenticationData();

            System.out.println("Challenge: " + authenticationData.getChallenge() + " Hash: " + hash);
            System.out.println("Timestamp: " + timestamp);

            authenticationData.setUserAgent(userAgent);
            authenticationData.setRemoteAddress(remoteAddress);

            if (authenticationData.getLastTimestamp() >= timestamp) {
                return null;
            } else {
                authenticationData.setLastTimestamp(timestamp);
                sessionProvider.get().setAttribute("authentication", authenticationData);
            }

            List<String> tokens = authenticationTokenService.getTokens(idUser, userAgent, remoteAddress);
            for (String token : tokens) {
                String permittedHash = Hashing.sha256().hashString(token + authenticationData.getChallenge() + timestamp, Charset.forName("UTF-8")).toString();
                System.out.println("Token: " + token + " hash: " + permittedHash);
                if (permittedHash.equalsIgnoreCase(hash)) {
                    User user = userService.getUser(idUser);

                    authenticationData.setToken(token);

                    sessionProvider.get().setAttribute("authentication", authenticationData);
                    doAuthentication(user);
                    return user;
                }
            }
            return null;
        } catch (ServerException se) {
            log.error("Server exception", se);
        } catch (UnknownUserIdException uuie) {
            log.error("Unknown user id", uuie);
        }
        return null;
    }

    private void doAuthentication(User user) {
        Subject currentUser = SecurityUtils.getSubject();
        IdAuthenticationToken idAuthenticationToken = new IdAuthenticationToken(user.getId());

        try {
            currentUser.login(idAuthenticationToken);
        } catch (Throwable t) {
            t.printStackTrace();
        }

//        try {
//
//            //if no exception, that's it, we're done!
//        } catch (UnknownAccountException uae) {
//            //username wasn't in the system, show them an error message?
//        } catch (IncorrectCredentialsException ice) {
//            //password didn't match, try again?
//        } catch (LockedAccountException lae) {
//            //account for that username is locked - can't login.  Show them a message?
//        } catch (AuthenticationException ae) {
//            //unexpected condition - error?
//        }
    }

}
