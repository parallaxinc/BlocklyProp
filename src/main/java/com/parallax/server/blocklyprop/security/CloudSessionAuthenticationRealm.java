/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
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
        return true;
        //return token instanceof IdAuthenticationToken;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        log.info("AUTHORIZATION");
        AuthorizationInfo authorizationInfo = new SimpleAccount();

        return authorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        try {
            if (token instanceof OAuthToken) {
                log.info("AUTHENTICATION using oauth");

                // Principal = email
                // Credentials = authenticator
                return new SimpleAccount(token.getPrincipal(), token.getCredentials(), "CloudSession");
            } else {

                log.info("AUTHENTICATION using login and password");

                // Principal = login
                String principal = (String) token.getPrincipal();

                // Credentials = password
                String credentials = new String((char[]) token.getCredentials());

                User user = SecurityServiceImpl.authenticateLocalUserStatic(principal, credentials);
                if (user == null) {
                    log.info("No exception but user object is null");
                    return null;
                }

                try {
                    return new SimpleAccount(token.getPrincipal(), token.getCredentials(), "CloudSession");
                } catch (Throwable t) {
                    log.error("Unexpected exception creating account object", t);
                }
            }
            return null;
        } catch (UnknownUserException ex) {
            log.info("Unknown user", ex);
        } catch (UserBlockedException ex) {
            log.info("Blocked user", ex);
        } catch (EmailNotConfirmedException ex) {
            log.info("Email not confirmed", ex);
        } catch (InsufficientBucketTokensException ibte) {
            log.info("Insufficient bucken tokens", ibte);
        } catch (NullPointerException npe) {
            log.warn("NullPointer", npe);
        } catch (Throwable t) {
            log.warn("Throwable", t);
        }
        return null;
    }

}
