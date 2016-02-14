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
public class IdAuthenticationToken implements AuthenticationToken {

    private final Long idUser;

    public IdAuthenticationToken(Long idUser) {
        this.idUser = idUser;
    }

    @Override
    public Object getPrincipal() {
        return idUser;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

}
