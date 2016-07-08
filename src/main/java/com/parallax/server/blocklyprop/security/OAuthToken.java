/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import org.apache.shiro.authc.AuthenticationToken;

/**
 *
 * @author Michel
 */
public class OAuthToken implements AuthenticationToken {

    private String email;
    private String authenticationSource;

    public OAuthToken() {
    }

    public OAuthToken(String email, String authenticationSource) {
        this.email = email;
        this.authenticationSource = authenticationSource;
    }

    @Override
    public Object getPrincipal() {
        return email;
    }

    @Override
    public Object getCredentials() {
        return authenticationSource;
    }

    public String getAuthenticationSource() {
        return authenticationSource;
    }

    public void setAuthenticationSource(String authenticationSource) {
        this.authenticationSource = authenticationSource;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
