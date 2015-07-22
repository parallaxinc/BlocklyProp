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
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.server.blocklyprop.db.dao.UserDao;
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
public class ConfirmServlet extends HttpServlet {

    private CloudSessionLocalUserService cloudSessionLocalUserService;
    private Configuration configuration;

    private UserDao userDao;

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        cloudSessionLocalUserService = new CloudSessionLocalUserService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        confirmToken(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        confirmToken(req, resp);
    }

    public void confirmToken(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = req.getParameter("token");
        String email = req.getParameter("email");
        req.setAttribute("token", token == null ? "" : token);
        req.setAttribute("email", email == null ? "" : email);
        if (Strings.isNullOrEmpty(token) || Strings.isNullOrEmpty(email)) {
            req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
        } else {
            try {
                if (cloudSessionLocalUserService.doConfirm(email, token)) {
                    req.getRequestDispatcher("WEB-INF/servlet/confirm/confirmed.jsp").forward(req, resp);
                } else {
                    req.setAttribute("invalidToken", "Invalid token");
                    req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
                }
            } catch (UnknownUserException ex) {
                req.setAttribute("invalidToken", "Unknown email");
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
            }
        }
    }

}
