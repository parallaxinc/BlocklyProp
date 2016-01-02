/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.utils;

import com.parallax.server.blocklyprop.db.enums.AuthenticationProvider;
import org.jooq.impl.EnumConverter;

/**
 *
 * @author Michel
 */
public class AuthenticationProviderConverter extends EnumConverter<String, AuthenticationProvider> {

    public AuthenticationProviderConverter() {
        super(String.class, AuthenticationProvider.class);
    }

}
