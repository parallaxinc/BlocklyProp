/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
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
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");

        String username = req.getParameter("username");
        String password = req.getParameter("password");

        LOG.debug("Reveived user name: {}", username);
        
        LOG.debug("Authenticating user");
        User user = authenticationService.authenticate(username, password);

        if (user != null) {
            SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(req);
            if (savedRequest != null) {
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
                resp.getWriter().write(response.toString());
            }
        } else {
            JsonObject response = new JsonObject();
            response.addProperty("success", false);
            response.addProperty("message", "Invalid authentication");
            resp.getWriter().write(response.toString());
        }
    }

}
