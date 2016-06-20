/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.client.cloudsession.objects.User;

/**
 *
 * @author Michel
 */
public interface OAuthService {

    User authenticateUser(String email, String authenticationSource) throws UnknownUserException, WrongAuthenticationSourceException, ServerException;

}
