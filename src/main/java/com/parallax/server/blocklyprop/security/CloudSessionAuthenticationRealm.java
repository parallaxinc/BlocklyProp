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
import com.parallax.client.cloudsession.objects.User;
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

    private final CloudSessionAuthenticateService authenticateService;

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
            // Principal = login
            String principal = (String) token.getPrincipal();

            // Credentials = password
            String credentials = new String((char[]) token.getCredentials());

            User user = authenticateService.authenticateLocalUser(principal, credentials);
            if (user != null) {

            } else {
                return null;
            }

            System.out.println("CREATING AUTHENTICATION DETAILS");
            try {
                return new SimpleAccount(token.getPrincipal(), token.getCredentials(), "CloudSession");
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
