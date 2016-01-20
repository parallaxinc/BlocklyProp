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
import com.parallax.server.blocklyprop.services.AuthenticationService;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.commons.configuration.Configuration;
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

    private Configuration configuration;

    private CloudSessionUserService userService;
    private CloudSessionAuthenticationTokenService authenticationTokenService;

    private Provider<AuthenticationData> authenticationDataProvider;

    private TokenGeneratorService tokenGeneratorService;

    private Provider<HttpSession> sessionProvider;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        userService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
        authenticationTokenService = new CloudSessionAuthenticationTokenService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Inject
    public void setSessionDataProvider(Provider<AuthenticationData> authenticationDataProvider) {
        this.authenticationDataProvider = authenticationDataProvider;
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
    public AuthenticationData getNewAuthenticationData() {
        String challenge = tokenGeneratorService.generateToken();
        sessionProvider.get().setAttribute("challenge", challenge);
        AuthenticationData sessionData = authenticationDataProvider.get();
        sessionData.setChallenge(challenge);
        sessionData.setLastTimestamp(new Date().getTime());
        System.out.println("Setting authentication data: " + sessionData);
        return sessionData;
    }

    @Override
    public User authenticate(Long idUser, Long timestamp, String hash, String userAgent, String remoteAddress) {
        try {
            AuthenticationData sessionData = authenticationDataProvider.get();

            System.out.println(sessionData);
            System.out.println(sessionProvider.get().getAttribute("BOE"));

            System.out.println("Challenge: " + sessionData.getChallenge() + " Hash: " + hash);
            System.out.println("Timestamp: " + timestamp);

            String challenge = (String) sessionProvider.get().getAttribute("challenge");
            List<String> tokens = authenticationTokenService.getTokens(idUser, userAgent, remoteAddress);
            for (String token : tokens) {
                String permittedHash = Hashing.sha256().hashString(token + challenge + timestamp, Charset.forName("UTF-8")).toString();
                System.out.println("Token: " + token + " hash: " + permittedHash);
                if (permittedHash.equalsIgnoreCase(hash)) {
                    return userService.getUser(idUser);
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

}
