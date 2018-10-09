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
 * Interface to the Cloud Session server authentication service
 * <p>
 * Additional notes:
 * 
 * An AuthorizingRealm extends the AuthenticatingRealm's capabilities by adding
 * Authorization (access control) support.
 * 
 * This implementation will perform all role and permission checks automatically
 * (and subclasses do not have to write this logic) as long as the 
 * getAuthorizationInfo(org.apache.shiro.subject.PrincipalCollection) method
 * returns an AuthorizationInfo. Please see that method's JavaDoc for an
 * in-depth explanation.
 * 
 * If you find that you do not want to utilize the AuthorizationInfo construct,
 * you are of course free to subclass the AuthenticatingRealm directly instead
 * and implement the remaining Realm interface methods directly. You might do
 * this if you want have better control over how the Role and Permission checks
 * occur for your specific data source. However, using AuthorizationInfo
 * (and its default implementation SimpleAuthorizationInfo) is sufficient in the
 * large majority of Realm cases.
 * 
 * @author Michel
 */
public class CloudSessionAuthenticationRealm extends AuthorizingRealm {

    /**
     * Class logging handle
     */
    private static Logger LOG = LoggerFactory.getLogger(CloudSessionAuthenticationRealm.class);

    /**
     * Convenience implementation that returns 
     * getAuthenticationTokenClass().isAssignableFrom( token.getClass() ); 
     * <p>
     * Can be overridden by subclasses for more complex token checking.
     * <p>
     * Notes: Most configurations will only need to set a different class via
     * setAuthenticationTokenClass(java.lang.Class<? extends org.apache.shiro.authc.AuthenticationToken>),
     * as opposed to overriding this method.
     * 
     * @param token  the token being submitted for authentication.
     * @return true if this authentication realm can process the submitted token
     * instance of the class, false otherwise.
     */
    @Override
    public boolean supports(AuthenticationToken token) {
        return true;
    }

    /**
     * Retrieves the AuthorizationInfo for the given principals from the
     * underlying data store.
     * <p>
     * When returning an instance from this method, you might want to consider
     * using an instance of SimpleAuthorizationInfo, as it is suitable in 
     * most cases.
     * 
     * @param principals  the primary identifying principals of the 
     * AuthorizationInfo that should be retrieved.
     * @return the AuthorizationInfo associated with this principals.
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        
        LOG.debug("Authorization info");
        AuthorizationInfo authorizationInfo = new SimpleAccount();

        LOG.info("AuthInfo() details: {}", authorizationInfo.getRoles().size());
        return authorizationInfo;
    }

    /**
     * Retrieves authentication data from an implementation-specific data source
     * (RDBMS, LDAP, etc) for the given authentication token.
     * <p>
     * For most data sources, this means just 'pulling' authentication data for
     * an associated subject/user and nothing more and letting Shiro do the
     * rest. But in some systems, this method could actually perform EIS 
     * specific log-in logic in addition to just retrieving data - it is up to
     * the Realm implementation.
     * <p>
     * A null return value means that no account could be associated with the
     * specified token.

     * @param token
     * The authentication token containing the user's principal and credentials.
     *
     * @return
     * Returns an AuthenticationInfo object containing account data resulting
     * from the authentication ONLY if the lookup is successful (i.e. account
     * exists and is valid, etc.)
     *
     * @throws AuthenticationException
     * if there is an error acquiring data or  performing realm-specific
     * authentication logic for the specified token
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
            throws AuthenticationException {

        LOG.info("Obtaining authentication info");
        
        try {
            if (token instanceof OAuthToken) {
                // Principal = email
                // Credentials = authenticator
                LOG.info("Authentication is using OAuth");
                return new SimpleAccount(
                        token.getPrincipal(), 
                        token.getCredentials(), 
                        "CloudSession");
            } else {

                LOG.info("Authentication is using local login authority");

                // Principal = login
                String principal = (String) token.getPrincipal();

                // Credentials = password
                String credentials = new String((char[]) token.getCredentials());

                // Thia can throw a NullPointerException
                User user = SecurityServiceImpl.authenticateLocalUserStatic(
                        principal, 
                        credentials);

                if (user == null) {
                    LOG.info("No exception but user object is null");
                    return null;
                }

                try {
                    return new SimpleAccount(
                            token.getPrincipal(), 
                            token.getCredentials(), 
                            "CloudSession");
                } catch (Throwable t) {
                    LOG.error("Unexpected exception creating account object", t);
                }
            }
            return null;
        } catch (UnknownUserException ex) {
            LOG.warn("Authentication failed. Message: {}", ex.getMessage());
            throw new AuthenticationException(ex.getMessage());

        } catch (UserBlockedException ex) {
            LOG.warn("Blocked user {}", ex);
            throw new AuthenticationException(ex.getMessage());

        } catch (EmailNotConfirmedException ex) {
            LOG.warn("Authentication failed. Message: {}", ex.getMessage());
            throw new AuthenticationException("EmailNotConfirmed");

        } catch (InsufficientBucketTokensException ex) {
            LOG.info("Insufficient bucket tokens: {}", ex.getMessage());
            throw new AuthenticationException(ex.getMessage());

        } catch (NullPointerException npe) {
            LOG.warn("NullPointer", npe);
            throw new AuthenticationException(npe.getMessage());

        } catch (Throwable t) {
            // This is a catchall exception handler that kicks the can back
            // to the caller
            LOG.warn("Throwable", t);
        }
        return null;
    }

}
