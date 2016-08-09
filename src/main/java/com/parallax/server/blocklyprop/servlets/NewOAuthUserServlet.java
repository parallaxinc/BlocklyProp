/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.CloudSessionOAuthService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.server.blocklyprop.security.OAuthToken;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.configuration.Configuration;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class NewOAuthUserServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(NewOAuthUserServlet.class);

    private Configuration configuration;

    private CloudSessionUserService userService;
    private CloudSessionOAuthService oauthService;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        userService = new CloudSessionUserService(configuration.getString("cloudsession.server"));
        oauthService = new CloudSessionOAuthService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Read out email and authentication source from session
        HttpSession session = req.getSession();
        String email = (String) session.getAttribute("oauth-email");
        String authenticator = (String) session.getAttribute("oauth-authenticator");
        if (Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(authenticator)) {
            log.error("New OAuth request while missing info in session");
            req.getRequestDispatcher("/WEB-INF/servlet/oauth/server-error.jsp").forward(req, resp);
        }

        String screenname = req.getParameter("screenname");
        if (Strings.isNullOrEmpty(screenname)) {
            req.setAttribute("missing-error", "Missing fields");
            req.getRequestDispatcher("/WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
        } else {
            try {
                // Create user
                oauthService.registerUser(email, authenticator, "en", screenname);
                // Authenticate user

                Subject currentUser = SecurityUtils.getSubject();

                OAuthToken authenticationToken = new OAuthToken(email, authenticator);

                try {
                    currentUser.login(authenticationToken);
                } catch (Throwable t) {
                    log.error("Error while authenticating", t);
                }

                // Show confirm or straight redirect
                SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(req);
                if (savedRequest != null) {
                    req.setAttribute("redirect", savedRequest.getRequestUrl());
                }
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/success.jsp").forward(req, resp);
            } catch (NonUniqueEmailException ex) {
                log.error("Non unique email exception", ex);
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/server-error.jsp").forward(req, resp);
            } catch (ScreennameUsedException ex) {
                // Username already in use
                req.setAttribute("screenname", screenname);
                req.setAttribute("screenname-error", "screenname-used");
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/new-oauth-user.jsp").forward(req, resp);
            } catch (ServerException ex) {
                log.error("A server exception accured in the oauth authentication process", ex);
                req.getRequestDispatcher("/WEB-INF/servlet/oauth/server-error.jsp").forward(req, resp);
            }
        }

    }

}
