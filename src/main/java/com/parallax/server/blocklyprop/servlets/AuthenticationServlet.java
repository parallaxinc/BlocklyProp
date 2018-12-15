/*
 * Copyright (c) 2018 Parallax Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.parallax.server.blocklyprop.servlets;

import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.services.AuthenticationService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Authenticate a user.
 * 
 * NOTE: This does not appear to be used to authenticate from the UI. 
 * 
 * @author Michel
 */
@Singleton
public class AuthenticationServlet extends HttpServlet {

    /**
     * Handle for any logging activity
     */
    private final Logger LOG = LoggerFactory.getLogger(AuthenticationServlet.class);


    /**
     * Application configuration settings
     */
    private Configuration configuration;


    /**
     * An instance of this class
     */
    private AuthenticationService authenticationService;


    /**
     * Initialize the application configuration
     * 
     * @param configuration 
     */
    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }


    /**
     * Initialize an instance of the Authentication service
     * 
     * @param authenticationService 
     */
    @Inject
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
        LOG.info("Authentication Service");
    }



    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        LOG.info("REST:/authenticate/ Post request received");

        resp.setContentType("application/json");

        String username = req.getParameter("username");
        String password = req.getParameter("password");

        LOG.info("Authenticating user '{}'", username);

        User user = null;

        try {
            user = authenticationService.authenticate(username, password);
        }
        catch (AuthenticationException ex) {
            LOG.warn("Authentication error. Message is: {}", ex.getMessage());

            JsonObject response = new JsonObject();
            response.addProperty("success", false);
            response.addProperty("message", ex.getMessage());
            resp.getWriter().write(response.toString());
        }

        if (user != null) {
            SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(req);
            if (savedRequest != null) {
                LOG.info("Redirecting to third-part authenticator");
                resp.sendRedirect(savedRequest.getRequestUrl());
            } else {

                JsonObject response = new JsonObject();
                response.addProperty("success", true);
                JsonObject userJson = new JsonObject();
                userJson.addProperty("id-user", user.getId());
                userJson.addProperty("screenname", user.getScreenname());
                userJson.addProperty("email", user.getEmail());
                
                // COPPA required fields
                userJson.addProperty("bdmonth",user.getBirthMonth());
                userJson.addProperty("bdyear", user.getBirthYear());
                userJson.addProperty("parent-email", user.getCoachEmail());
                userJson.addProperty("sponsoremail", user.getCoachEmailSource());
 
                response.add("user", userJson);
                
                LOG.info("Authentication successful for user '{}'", username);
                resp.getWriter().write(response.toString());
            }
        } else {
            LOG.info("Authentication failed for user '{}'", username);

            JsonObject response = new JsonObject();
            response.addProperty("success", false);
            response.addProperty("message", "Invalid authentication");
            resp.getWriter().write(response.toString());
        }
    }

}
