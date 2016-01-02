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
public enum Role {

    ADMIN(false),
    USER(true);

    private final boolean defaultRole;

    private Role(boolean defaultRole) {
        this.defaultRole = defaultRole;
    }

    public boolean isDefaultRole() {
        return defaultRole;
    }

}
