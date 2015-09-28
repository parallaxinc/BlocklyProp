/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.CloudSessionLocalUserService;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
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
public class PasswordResetServlet extends HttpServlet {

    private CloudSessionLocalUserService cloudSessionLocalUserService;
    private Configuration configuration;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        cloudSessionLocalUserService = new CloudSessionLocalUserService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = req.getParameter("token");
        String email = req.getParameter("email");
        req.setAttribute("token", token == null ? "" : token);
        req.setAttribute("email", email == null ? "" : email);
        req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = req.getParameter("token");
        String email = req.getParameter("email");
        req.setAttribute("token", token == null ? "" : token);
        req.setAttribute("email", email == null ? "" : email);
        String password = req.getParameter("password");
        String confirmPassword = req.getParameter("confirmpassword");
        if (Strings.isNullOrEmpty(token) || Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(password) || Strings.isNullOrEmpty(confirmPassword)) {
            req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
        } else {
            try {
                if (cloudSessionLocalUserService.doPasswordReset(token, email, password, confirmPassword)) {
                    req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-done.jsp").forward(req, resp);
                } else {
                    req.setAttribute("error", "Invalid token");
                    req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
                }
            } catch (UnknownUserException ex) {
                req.setAttribute("error", "Unknown email");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            } catch (PasswordVerifyException ex) {
                req.setAttribute("error", "Passwords do not match");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            } catch (ServerException se) {
                req.setAttribute("error", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            }
        }
    }

}
