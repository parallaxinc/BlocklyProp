/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security.oauth;

import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.server.blocklyprop.security.NewOAuthUserException;

/**
 *
 * @author Michel
 */
public interface OAuthAuthenticator {

    String getAuthorizationUrl();

    String handleAuthentication(String authenticationCode) throws NewOAuthUserException, WrongAuthenticationSourceException, ServerException;

}
