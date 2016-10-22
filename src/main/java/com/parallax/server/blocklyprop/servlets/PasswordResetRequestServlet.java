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
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.server.blocklyprop.enums.PasswordResetPage;
import com.parallax.server.blocklyprop.utils.ServletUtils;
import com.parallax.server.blocklyprop.utils.TextileReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class PasswordResetRequestServlet extends HttpServlet {

    private static Logger log = LoggerFactory.getLogger(PasswordResetRequestServlet.class);

    private final TextileReader textileFileReader = new TextileReader();

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
                    showTextilePage(req, resp, PasswordResetPage.RESET_REQUESTED);
                    // req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-requested.jsp").forward(req, resp);
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
            } catch (WrongAuthenticationSourceException ex) {
                log.info("Trying to request password reset of non local user!");
                req.setAttribute("wrongAuthenticationSource", true);
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-request.jsp").forward(req, resp);
            }
        }
    }

    public void showTextilePage(HttpServletRequest req, HttpServletResponse resp, PasswordResetPage passwordResetPage) throws ServletException, IOException {
        String html = textileFileReader.readFile("password-reset/" + passwordResetPage.getPage(), ServletUtils.getLocale(req), req.isSecure());
        req.setAttribute("html", html);
        req.getRequestDispatcher("/WEB-INF/servlet/html.jsp").forward(req, resp);
    }

}
