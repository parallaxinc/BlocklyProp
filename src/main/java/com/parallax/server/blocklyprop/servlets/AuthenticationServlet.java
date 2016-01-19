/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.services.AuthenticationService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;

/**
 *
 * @author Michel
 */
@Singleton
public class AuthenticationServlet extends HttpServlet {

    private Configuration configuration;
    private AuthenticationService authenticationService;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }

    @Inject
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        SessionData sessionData = authenticationService.getNewAuthenticationData();

        req.setAttribute("blocklyPropAuthUrl", configuration.getString("blocklyprop-auth.baseurl") + "/authenticate");
        req.setAttribute("challenge", sessionData.getChallenge());
        req.setAttribute("timestamp", String.valueOf(sessionData.getLastTimestamp()));

        String format = req.getParameter("format");

        if ("page".equalsIgnoreCase(format)) {
            req.getRequestDispatcher("/WEB-INF/servlet/login/loginpage.jsp").forward(req, resp);
        } else if ("modal".equalsIgnoreCase(format)) {
            req.getRequestDispatcher("/WEB-INF/servlet/login/loginmodal.jsp").forward(req, resp);
        } else if ("form".equalsIgnoreCase(format)) {
            req.getRequestDispatcher("/WEB-INF/servlet/login/loginform.jsp").forward(req, resp);
        }
    }

}
