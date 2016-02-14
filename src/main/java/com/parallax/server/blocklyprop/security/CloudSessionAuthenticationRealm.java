/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAccount;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public class CloudSessionAuthenticationRealm extends AuthorizingRealm {

    private static Logger log = LoggerFactory.getLogger(CloudSessionAuthenticationRealm.class);

    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof IdAuthenticationToken;
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
            if (token instanceof IdAuthenticationToken) {
                Long idUser = (Long) token.getPrincipal();

                User user = SecurityServiceImpl.authenticateLocalUserStatic(idUser);
                if (user != null) {
                    System.out.println("USER = " + user);
                } else {
                    System.out.println("USER = null");
                    return null;
                }

                try {
                    return new SimpleAccount(user.getEmail(), "", "CloudSession");
                } catch (Throwable t) {
                    t.printStackTrace();
                }
            } else {
                // Principal = login
                String principal = (String) token.getPrincipal();

                // Credentials = password
                String credentials = new String((char[]) token.getCredentials());

                User user = SecurityServiceImpl.authenticateLocalUserStatic(principal, credentials);
                if (user != null) {
                    System.out.println("USER = " + user);
                } else {
                    System.out.println("USER = null");
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
            }
        } catch (UnknownUserException ex) {
            log.warn("Unknown user", ex);
        } catch (UserBlockedException ex) {
            log.warn("Blocked user", ex);
        } catch (EmailNotConfirmedException ex) {
            log.warn("Email not confirmed", ex);
        } catch (NullPointerException npe) {
            log.warn("NullPointer", npe);
        } catch (Throwable t) {
            log.warn("Throwable", t);
        }
        return null;
    }

}
