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
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
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
public class PasswordResetServlet extends HttpServlet {

    private static Logger log = LoggerFactory.getLogger(PasswordResetServlet.class);

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
                    showTextilePage(req, resp, PasswordResetPage.RESET_DONE);
                    //req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-done.jsp").forward(req, resp);
                } else {
                    req.setAttribute("invalidToken", "Invalid token");
                    req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
                }
            } catch (UnknownUserException ex) {
                req.setAttribute("invalidToken", "Unknown email");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            } catch (PasswordVerifyException ex) {
                req.setAttribute("passwordsDontMatch", "Passwords do not match");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            } catch (ServerException se) {
                req.setAttribute("server-error", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            } catch (PasswordComplexityException pce) {
                req.setAttribute("passwordComplexity", "Password is not complex enough");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            } catch (WrongAuthenticationSourceException ex) {
                log.warn("Trying to change password of non local user!");
                req.setAttribute("server-error", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            }
        }
    }

    public void showTextilePage(HttpServletRequest req, HttpServletResponse resp, PasswordResetPage passwordResetPage) throws ServletException, IOException {
        String html = textileFileReader.readFile("password-reset/" + passwordResetPage.getPage(), ServletUtils.getLocale(req), req.isSecure());
        req.setAttribute("html", html);
        req.getRequestDispatcher("/WEB-INF/servlet/html.jsp").forward(req, resp);
    }

}
