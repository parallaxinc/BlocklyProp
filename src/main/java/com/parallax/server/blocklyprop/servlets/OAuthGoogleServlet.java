/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.name.Named;
import com.parallax.server.blocklyprop.security.oauth.OAuthAuthenticator;
import com.parallax.server.blocklyprop.utils.OAuthServlet;

/**
 *
 * @author Michel
 */
@Singleton
public class OAuthGoogleServlet extends OAuthServlet {

    private OAuthAuthenticator authenticator;

    @Inject
    public void setAuthenticator(@Named("Google") OAuthAuthenticator authenticator) {
        this.authenticator = authenticator;
    }

    @Override
    protected OAuthAuthenticator getAuthenticator() {
        return authenticator;
    }

}
