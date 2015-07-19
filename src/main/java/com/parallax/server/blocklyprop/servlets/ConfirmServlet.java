/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.db.dao.UserDao;
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
public class ConfirmServlet extends HttpServlet {

    private UserDao userDao;

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    /*
     * Get user information
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        confirmToken(req, resp);
    }

    /*
     * Update user
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        confirmToken(req, resp);
    }

    public void confirmToken(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = req.getParameter("token");
        String email = req.getParameter("email");
        if (Strings.isNullOrEmpty(token)) {
            req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
        } else {
            if ("abc".equals(token)) {
                // Wrong token
                req.setAttribute("invalidToken", "Invalid token");
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
            } else if ("def".equals(token)) {
                // Already confirmed
                req.getRequestDispatcher("WEB-INF/servlet/confirm/already-confirmed.jsp").forward(req, resp);
            } else {
                // Correct token
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirmed.jsp").forward(req, resp);
            }
        }
    }

}
