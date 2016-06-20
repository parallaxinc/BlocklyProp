/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.utils;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.server.blocklyprop.security.oauth.OAuthAuthenticator;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
            JsonObject response = new JsonObject();
            response.addProperty("success", true);

            try {
                String userEmail = getAuthenticator().handleAuthentication(code);

                SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(req);
                if (savedRequest != null) {
                    resp.sendRedirect(savedRequest.getRequestUrl());
                } else {
                    resp.sendRedirect("/");
                    response.addProperty("action", "error");
                }

            } catch (UnknownUserException ex) {

            } catch (WrongAuthenticationSourceException ex) {

            } catch (ServerException ex) {
                log.error("A server exception accured in the oauth authentication process", ex);
                response.addProperty("action", "error");
                response.addProperty("error", "ERROR|SERVER_EXCEPTION");
            }

            resp.getWriter().write(response.toString());
        }
    }

}
