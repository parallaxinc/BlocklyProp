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
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
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
public class PasswordResetRequestServlet extends HttpServlet {

    private CloudSessionLocalUserService cloudSessionLocalUserService;
    private Configuration configuration;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        cloudSessionLocalUserService = new CloudSessionLocalUserService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-request.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        if (Strings.isNullOrEmpty(email)) {
            req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-request.jsp").forward(req, resp);
        } else {
            try {
                if (cloudSessionLocalUserService.requestPasswordReset(email)) {
                    req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-requested.jsp").forward(req, resp);
                } else {
                    req.setAttribute("error", true);
                    req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-request.jsp").forward(req, resp);
                }
            } catch (UnknownUserException ex) {
                req.setAttribute("unknownEmail", true);
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-request.jsp").forward(req, resp);
            } catch (InsufficientBucketTokensException ex) {
                req.setAttribute("insufficientTokens", true);
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-request.jsp").forward(req, resp);
            } catch (ServerException se) {
                req.setAttribute("server-error", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-request.jsp").forward(req, resp);
            }
        }
    }

}
