/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

/**
 *
 * @author Michel
 */
public class NewOAuthUserException extends Exception {

    private String email;
    private String authenticator;

    public NewOAuthUserException(String email, String authenticator) {
        this.email = email;
        this.authenticator = authenticator;
    }

    public String getEmail() {
        return email;
    }

    public String getAuthenticator() {
        return authenticator;
    }

}
