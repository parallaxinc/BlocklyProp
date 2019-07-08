/*
 * Copyright (c) 2019 Parallax Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
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
 * Reset user account password from the UI
 * 
 * @author Michel
 */
@Singleton
public class PasswordResetServlet extends HttpServlet {

    private static Logger LOG = LoggerFactory.getLogger(PasswordResetServlet.class);

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
        
        LOG.info("REST:/reset/ Get request received");

        String token = req.getParameter("token");
        String email = req.getParameter("email");
        req.setAttribute("token", token == null ? "" : token);
        req.setAttribute("email", email == null ? "" : email);

        LOG.info("Redirecting to the reset password page");
        req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        LOG.info("REST:/reset/ Post request received");
       
        String token = req.getParameter("token");
        String email = req.getParameter("email");
        req.setAttribute("token", token == null ? "" : token);
        req.setAttribute("email", email == null ? "" : email);


        String password = req.getParameter("password");
        String confirmPassword = req.getParameter("confirmpassword");

        LOG.info("Processing the results from the reset pasword page");
        
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
                LOG.warn("Trying to change password of non local user!");
                req.setAttribute("server-error", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            } catch (EmailNotConfirmedException ex) {
                LOG.warn("Cannot change password when email has not been verified.");
                req.setAttribute("EmailUnconfirmed", "Cannot change password for unconfirmed email");
                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
            }
        }
    }

    public void showTextilePage(
            HttpServletRequest req,
            HttpServletResponse resp,
            PasswordResetPage passwordResetPage) throws ServletException, IOException {

        String html = textileFileReader.readFile(
                "password-reset/" + passwordResetPage.getPage(),
                ServletUtils.getLocale(req),
                req.isSecure());

        req.setAttribute("html", html);
        req.getRequestDispatcher("/WEB-INF/servlet/html.jsp").forward(req, resp);
    }

}
