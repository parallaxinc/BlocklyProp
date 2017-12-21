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
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.enums.ConfirmPage;
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
 *  Confirm account registration request
 * 
 * @author Michel
 */
@Singleton
public class ConfirmServlet extends HttpServlet {

    private static Logger log = LoggerFactory.getLogger(ConfirmServlet.class);

    private final TextileReader textileFileReader = new TextileReader();

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
        cloudSessionLocalUserService = new CloudSessionLocalUserService(
                configuration.getString("cloudsession.server"), 
                configuration.getString("cloudsession.baseurl"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        confirmToken(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        confirmToken(req, resp);
    }

    public void confirmToken(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        // Retreive the registration token
        String token = req.getParameter("token");
        req.setAttribute("token", token == null ? "" : token);

        // Retreive the requestor's email address
        String email = req.getParameter("email");
        req.setAttribute("email", email == null ? "" : email);

        // Return to the confirmation web page is we're missing data
        if (Strings.isNullOrEmpty(token) || Strings.isNullOrEmpty(email)) {
            req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp")
                    .forward(req, resp);
        } else {
            try {
                // Validate the email and token with the Cloud Session server
                if (cloudSessionLocalUserService.doConfirm(email, token)) {

                    // Add a user record to the blocklyprop database
                    // Long idCloudSessionUser = 0L;
                    // userDao.create(idCloudSessionUser);
                            
                    // req.getRequestDispatcher("WEB-INF/servlet/confirm/confirmed.jsp").forward(req, resp);
                    showTextilePage(req, resp, ConfirmPage.CONFIRMED);
                } else {
                    req.setAttribute("invalidToken", "Invalid token");
                    req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
                }
            } catch (UnknownUserException ex) {
                req.setAttribute("invalidToken", "Unknown email");
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
            } catch (ServerException se) {
                req.setAttribute("server-error", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
            } catch (WrongAuthenticationSourceException ex) {
                log.warn("Trying to confirm email of non local user!");
                req.setAttribute("server-error", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm.jsp").forward(req, resp);
            }
        }
    }

    public void showTextilePage(
            HttpServletRequest req, 
            HttpServletResponse resp, 
            ConfirmPage confirmPage) throws ServletException, IOException {
        
        String html = textileFileReader.readFile(
                "confirm/" + confirmPage.getPage(), 
                ServletUtils.getLocale(req),
                req.isSecure());

        req.setAttribute("html", html);
        req.getRequestDispatcher("/WEB-INF/servlet/html.jsp").forward(req, resp);
    }

}
