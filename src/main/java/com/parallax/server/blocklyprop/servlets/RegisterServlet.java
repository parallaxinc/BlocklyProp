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
import com.parallax.server.blocklyprop.db.generated.tables.pojos.User;
import com.parallax.server.blocklyprop.services.SecurityService;
import java.io.IOException;
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

        User user = securityService.register(screenname, email, password);

        if (user != null && user.getId() > 0) {
            JsonObject result = new JsonObject();
            result.addProperty("success", true);
            result.addProperty("id", user.getId());
            resp.getWriter().write(result.toString());
        } else {
            JsonObject result = new JsonObject();
            result.addProperty("success", false);
            result.addProperty("message", "Failed to register");
            resp.getWriter().write(result.toString());
        }

    }

}
