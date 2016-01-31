/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import org.apache.shiro.web.filter.authz.PortFilter;

/**
 *
 * @author Michel
 */
public class NoSslFilter extends PortFilter {

    public NoSslFilter() {
        setPort(DEFAULT_HTTP_PORT);
    }

//    @Override
//    protected String getScheme(String requestScheme, int port) {
//        if (port == DEFAULT_HTTP_PORT) {
//            return PortFilter.HTTP_SCHEME;
//        } else {
//            return HTTP_SCHEME;
//        }
//    }
    /**
     * Retains the parent method's port-matching behavior but additionally
     * guarantees that the
     * {@code ServletRequest.}{@link javax.servlet.ServletRequest#isSecure() isSecure()}.
     * If the port does not match or the request is not secure, access is
     * denied.
     *
     * @param request the incoming {@code ServletRequest}
     * @param response the outgoing {@code ServletResponse} - ignored in this
     * implementation
     * @param mappedValue the filter-specific config value mapped to this filter
     * in the URL rules mappings - ignored by this implementation.
     * @return {@code true} if the request is received on an expected SSL port
     * and the
     * {@code request.}{@link javax.servlet.ServletRequest#isSecure() isSecure()}, {@code false}
     * otherwise.
     * @throws Exception if the call to {@code super.isAccessAllowed} throws an
     * exception.
     * @since 1.2
     */
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        return super.isAccessAllowed(request, response, mappedValue) && !request.isSecure();
    }

}
