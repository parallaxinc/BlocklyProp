/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.security;

import org.apache.shiro.authc.credential.HashedCredentialsMatcher;

/**
 *
 * @author Michel
 */
public class CredentialsMatcher extends HashedCredentialsMatcher {

    /**
     * Returns a new, <em>uninitialized</em> instance, without its byte array
     * set. Used as a utility method in the
     * {@link SimpleCredentialsMatcher#getCredentials(org.apache.shiro.authc.AuthenticationInfo) getCredentials(AuthenticationInfo)}
     * implementation.
     *
     * @return a new, <em>uninitialized</em> instance, without its byte array
     * set.
     */
//    @Override
//    protected AbstractHash newHashInstance() {
//        SimpleHash hash = (SimpleHash) super.newHashInstance();
//        hash.setIterations(getHashIterations());
//        return hash;
//    }
    //
//    @Override
//    protected Object getCredentials(AuthenticationInfo info) {
//        SimpleAuthenticationInfo sai = (SimpleAuthenticationInfo) info;
//        Object credentials = info.getCredentials();
//
//        byte[] storedBytes = toBytes(credentials);
//
//        if (credentials instanceof String || credentials instanceof char[]) {
//            //account.credentials were a char[] or String, so
//            //we need to do text decoding first:
//            if (isStoredCredentialsHexEncoded()) {
//                storedBytes = Hex.decode(storedBytes);
//            } else {
//                storedBytes = Base64.decode(storedBytes);
//            }
//        }
//        SimpleHash hash = (SimpleHash) newHashInstance();
//        hash.setBytes(storedBytes);
//
//        //   System.out.println("getCredentials: " + sai.getCredentials() + " -> simpleHash: " + hash.toHex());
//        return hash;
//    }
    //
//    @Override
//    protected boolean equals(Object tokenCredentials, Object accountCredentials) {
//        try {
//            System.out.println("EQUALS");
//            SimpleHash token = (SimpleHash) tokenCredentials;
//
//            SimpleHash account = (SimpleHash) accountCredentials;
//
//            //     System.out.println("Salt: " + token.getSalt().toBase64() + " - " + account.getSalt().toBase64());
//            //     System.out.println("Iterations: " + token.getIterations() + " - " + account.getIterations());
//            System.out.println("Hex: " + token.toHex() + " - " + account.toHex());
//            System.out.println("Bytes (password): " + new String(token.getBytes()) + " - " + new String(account.getBytes()));
//            boolean authEquals = super.equals(tokenCredentials, accountCredentials);
//            System.out.println("AuthEquals: " + authEquals);
//            return authEquals;
//        } catch (Throwable t) {
//            t.printStackTrace();
//            return false;
//        }
//    }
}
