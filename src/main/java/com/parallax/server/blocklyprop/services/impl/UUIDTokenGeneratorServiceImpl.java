/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class UUIDTokenGeneratorServiceImpl implements TokenGeneratorService {

    private static final Logger LOG = LoggerFactory.getLogger(UUIDTokenGeneratorServiceImpl.class);

    @Override
    public String generateToken() {
        UUID uuid = UUID.randomUUID();
        String token = uuid.toString().replaceAll("-", "");
        LOG.info("Generated token: {}", token);
        return token;
    }

}
