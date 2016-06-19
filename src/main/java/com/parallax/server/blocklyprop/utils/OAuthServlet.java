/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.utils;

import com.google.common.base.Strings;
import com.parallax.server.blocklyprop.security.oauth.OAuthAuthenticator;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public abstract class OAuthServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(OAuthServlet.class);

    protected abstract OAuthAuthenticator getAuthenticator();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String code = req.getParameter("code");
        if (Strings.isNullOrEmpty(code)) {
            log.info("Sending redirect");
            resp.sendRedirect(getAuthenticator().getAuthorizationUrl());
        } else {
            log.info("Received authentication code: {}", code);
            String userEmail = getAuthenticator().handleAuthentication(code);
        }
    }

}
