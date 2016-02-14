/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.AuthenticationData;

/**
 *
 * @author Michel
 */
public interface AuthenticationService {

    AuthenticationData getAuthenticationData();

    User authenticate(Long idUser, Long timestamp, String hash, String userAgent, String remoteAddress);

    String getChallenge();

    Long getTimestamp();

}
