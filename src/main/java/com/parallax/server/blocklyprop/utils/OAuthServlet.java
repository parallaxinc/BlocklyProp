/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.utils;

import com.google.common.base.Strings;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.server.blocklyprop.security.NewOAuthUserException;
import com.parallax.server.blocklyprop.security.oauth.OAuthAuthenticator;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
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

            try {
                String userEmail = getAuthenticator().handleAuthentication(code);

                // Show confirm or straight redirect
                SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(req);
                if (savedRequest != null) {
                    req.setAttribute("redirect", savedRequest.getRequestUrl());
                }
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/success.jsp").forward(req, resp);
            } catch (NewOAuthUserException noaue) {
                // Save info in session
                // Show oauth user creation screen
                HttpSession session = req.getSession();
                session.setAttribute("oauth-email", noaue.getEmail());
                session.setAttribute("oauth-authenticator", noaue.getAuthenticator());
                req.setAttribute("screenname", "");
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/new-oauth-user.jsp").forward(req, resp);
            } catch (WrongAuthenticationSourceException wase) {
                // Show error
                if ("local".equalsIgnoreCase(wase.getAuthenticationSource())) {
                    req.setAttribute("local", true);
                } else {
                    req.setAttribute("local", false);
                }
                req.setAttribute("source", wase.getAuthenticationSource());
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/wrong-authentication-source.jsp").forward(req, resp);
            } catch (ServerException ex) {
                // Show error
                log.error("A server exception accured in the oauth authentication process", ex);
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/server-error.jsp").forward(req, resp);
            }
        }
    }

}
