/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.enums;

/**
 *
 * @author Michel
 */
public enum AuthenticationProvider {

    LOCAL(true);

    private final boolean localCredentials;

    private AuthenticationProvider(boolean localCredentials) {
        this.localCredentials = localCredentials;
    }

    public boolean hasLocalCredentials() {
        return localCredentials;
    }

}
