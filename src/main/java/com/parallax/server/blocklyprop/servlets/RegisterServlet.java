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
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.server.blocklyprop.services.SecurityService;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Michel
 */
@Singleton
public class RegisterServlet extends HttpServlet {

    private SecurityService securityService;

    @Inject
    public void setSecurityService(SecurityService securityService) {
        this.securityService = securityService;
    }

    /*
     * Register
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        String screenname = Strings.emptyToNull(req.getParameter("screenname"));
        String email = Strings.emptyToNull(req.getParameter("email"));
        String password = Strings.emptyToNull(req.getParameter("password"));
        String confirmPassword = Strings.emptyToNull(req.getParameter("confirmpassword"));

        Long idUser;
        try {
            idUser = securityService.register(screenname, email, password, confirmPassword);
            if (idUser != null && idUser > 0) {
                JsonObject result = new JsonObject();
                result.addProperty("success", true);
                result.addProperty("id", idUser);
                resp.getWriter().write(result.toString());
            } else {
                JsonObject result = new JsonObject();
                result.addProperty("success", false);
                result.addProperty("message", "Failed to register");
                resp.getWriter().write(result.toString());
            }
            return;
        } catch (NonUniqueEmailException ex) {
            Logger.getLogger(RegisterServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (PasswordVerifyException ex) {
            Logger.getLogger(RegisterServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        JsonObject result = new JsonObject();
        result.addProperty("success", false);
        result.addProperty("message", "Failed to register");
        resp.getWriter().write(result.toString());
    }

}
