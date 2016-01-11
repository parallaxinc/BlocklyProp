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
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;
import com.parallax.server.blocklyprop.services.AuthenticationService;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {

    private Provider<SessionData> sessionDataProvider;

    private TokenGeneratorService tokenGeneratorService;

    @Inject
    public void setTokenGeneratorService(TokenGeneratorService tokenGeneratorService) {
        this.tokenGeneratorService = tokenGeneratorService;
    }

    @Override
    public SessionData getNewAuthenticationData() {
        SessionData sessionData = sessionDataProvider.get();
        sessionData.setChallenge(tokenGeneratorService.generateToken());
        return sessionData;
    }

    @Override
    public UserRecord authenticate(Long idUser, String timestamp, String hash) {
        return null;
    }

}
