/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import java.util.Arrays;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;

/**
 *
 * @author Michel
 */
public class CloudSessionCredentialsMatcher extends SimpleCredentialsMatcher {

    @Override
    protected boolean equals(Object tokenCredentials, Object accountCredentials) {
        System.out.println("Performing credentials equality check for tokenCredentials of type ["
                + tokenCredentials.getClass().getName() + " and accountCredentials of type ["
                + accountCredentials.getClass().getName() + "]");
        if (isByteSource(tokenCredentials) && isByteSource(accountCredentials)) {
            System.out.println("Both credentials arguments can be easily converted to byte arrays.  Performing "
                    + "array equals comparison");
            byte[] tokenBytes = toBytes(tokenCredentials);
            byte[] accountBytes = toBytes(accountCredentials);
            System.out.println("Token: " + new String(tokenBytes));
            System.out.println("Account: " + new String(accountBytes));
            return Arrays.equals(tokenBytes, accountBytes);
        } else {
            return accountCredentials.equals(tokenCredentials);
        }
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        System.out.println("MATCHING!!");
        Object tokenCredentials = getCredentials(token);
        Object accountCredentials = getCredentials(info);
        return equals(tokenCredentials, accountCredentials);
    }

}
