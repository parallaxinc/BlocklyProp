/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.client.cloudsession.CloudSessionAuthenticateService;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAccount;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 *
 * @author Michel
 */
public class CloudSessionAuthenticationRealm extends AuthorizingRealm {

    private CloudSessionAuthenticateService authenticateService;

    public CloudSessionAuthenticationRealm() {
        authenticateService = new CloudSessionAuthenticateService("http://localhost:8080/cloudsession/rest/");
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        System.out.println("AUTHORIZATION");
        AuthorizationInfo authorizationInfo = new SimpleAccount();

        return authorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        try {
            System.out.println(getCredentialsMatcher().getClass().getName());
            System.out.println("Credentials: " + new String((char[]) token.getCredentials()));
            System.out.println("Principal: " + token.getPrincipal());

            // Principal = login
            String principal = (String) token.getPrincipal();

            // Credentials = password
            String credentials = new String((char[]) token.getCredentials());

            if (authenticateService.authenticateLocalUser(principal, credentials)) {

            } else {
                return null;
            }

            System.out.println("CREATING AUTHENTICATION DETAILS");
            try {
                return new SimpleAccount(token.getPrincipal(), token.getCredentials(), "CloudSession");
//            SimpleAccount simpleAccount = new SimpleAccount();
//            simpleAccount.setCredentials(token.getCredentials());
//            System.out.println("credentials set");
//            PrincipalCollection principalCollection = new SimplePrincipalCollection();
//            simpleAccount.setPrincipals(principalCollection);
//            System.out.println("RETURNING AUTHENTICATION DETAILS");
//            return simpleAccount;
            } catch (Throwable t) {
                t.printStackTrace();
            }
            System.out.println("credentials set");
            return null;
        } catch (UnknownUserException ex) {
            Logger.getLogger(CloudSessionAuthenticationRealm.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UserBlockedException ex) {
            Logger.getLogger(CloudSessionAuthenticationRealm.class.getName()).log(Level.SEVERE, null, ex);
        } catch (EmailNotConfirmedException ex) {
            Logger.getLogger(CloudSessionAuthenticationRealm.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

}
