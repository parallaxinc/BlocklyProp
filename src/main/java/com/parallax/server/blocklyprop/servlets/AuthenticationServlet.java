/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.AuthenticationData;
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

        String idUserString = req.getParameter("id-user");
        String timestampString = req.getParameter("timestamp");
        String hash = req.getParameter("hash");

        String remoteAddress = req.getRemoteAddr();
        String userAgent = req.getHeader("User-Agent");

        if (Strings.isNullOrEmpty(idUserString) || Strings.isNullOrEmpty(idUserString) || Strings.isNullOrEmpty(idUserString)) {
            // TODO:
            JsonObject response = new JsonObject();
            response.addProperty("success", false);
            response.addProperty("message", "Missing argument");
            resp.getWriter().write(response.toString());
            return;
        }

        Long idUser = null;
        Long timestamp = null;
        try {
            idUser = Long.parseLong(idUserString);
            timestamp = Long.parseLong(timestampString);
        } catch (NumberFormatException nfe) {
            // TODO:
            JsonObject response = new JsonObject();
            response.addProperty("success", false);
            response.addProperty("message", "Argument has wrong format");
            resp.getWriter().write(response.toString());
            return;
        }

        User user = authenticationService.authenticate(idUser, timestamp, hash, userAgent, remoteAddress);

        if (user != null) {
            JsonObject response = new JsonObject();
            response.addProperty("success", true);
            JsonObject userJson = new JsonObject();
            userJson.addProperty("id-user", user.getId());
            userJson.addProperty("screenname", user.getScreenname());
            userJson.addProperty("email", user.getEmail());
            response.add("user", userJson);
            resp.getWriter().write(response.toString());
        } else {
            JsonObject response = new JsonObject();
            response.addProperty("success", false);
            response.addProperty("message", "Invalid authentication");
            resp.getWriter().write(response.toString());
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        AuthenticationData sessionData = authenticationService.getAuthenticationData();

        req.setAttribute("blocklyPropAuthUrl", configuration.getString("blocklyprop-auth.baseurl") + "/authenticate");
        req.setAttribute("challenge", sessionData.getChallenge());
        req.setAttribute("timestamp", String.valueOf(sessionData.getLastTimestamp()));

        String format = req.getParameter("format");
        if (format == null) {
            format = "form";
        }
        System.out.println("Format: " + format);

        if ("page".equalsIgnoreCase(format)) {
            req.getRequestDispatcher("/WEB-INF/servlet/login/loginpage.jsp").forward(req, resp);
        } else if ("modal".equalsIgnoreCase(format)) {
            req.getRequestDispatcher("/WEB-INF/servlet/login/loginmodal.jsp").forward(req, resp);
        } else if ("form".equalsIgnoreCase(format)) {
            req.getRequestDispatcher("/WEB-INF/servlet/login/loginform.jsp").forward(req, resp);
        }
    }

}
