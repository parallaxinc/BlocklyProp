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
import com.parallax.client.cloudsession.exceptions.EmailAlreadyConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
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
 * Process a user account confirmation email URL
 * 
 * @author Michel
 */
@Singleton
public class ConfirmRequestServlet extends HttpServlet {

    private static Logger LOG = LoggerFactory.getLogger(ConfirmRequestServlet.class);

    private final TextileReader textileFileReader = new TextileReader();

    private CloudSessionLocalUserService cloudSessionLocalUserService;
    private Configuration configuration;

    /**
     * Get the connection details for the Cloud Session server
     * 
     * @param configuration 
     */
    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        
        cloudSessionLocalUserService = new CloudSessionLocalUserService(
                configuration.getString("cloudsession.server"),
                configuration.getString("cloudsession.baseurl"));
    }

    /**
     * 
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException 
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        LOG.info("REST:/confirmrequest/ Get request received");

        req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm-request.jsp")
                .forward(req, resp);
    }

    /**
     * Handle a POST request
     * 
     * @param req
     * @param resp
     * 
     * @throws ServletException
     * @throws IOException 
     */
    @Override
    protected void doPost(
            HttpServletRequest req, 
            HttpServletResponse resp) throws ServletException, IOException {

        LOG.info("REST:/confirmrequest/ Post request received");
        
        String email = req.getParameter("email");
        
        if (Strings.isNullOrEmpty(email)) {
            LOG.warn("Received an empty email address");
            req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm-request.jsp")
                    .forward(req, resp);
        } else {
            try {
                LOG.info("Processing account confirmation for {}",email);
                if (cloudSessionLocalUserService.requestNewConfirmEmail(email)) {
                    showTextilePage(req, resp, ConfirmPage.CONFIRM_REQUESTED);
                } else {
                    LOG.warn("Unable to process account confirmation for {}",email);
                    req.setAttribute("error", true);
                    req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm-request.jsp")
                            .forward(req, resp);
                }
            } catch (UnknownUserException ex) {
                LOG.warn("Account confirmation failed: Unknown email address");
                req.setAttribute("unknownEmail", true);
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm-request.jsp")
                        .forward(req, resp);

            } catch (InsufficientBucketTokensException ex) {
                LOG.warn("Account confirmation failed: Insufficient tokens");
                req.setAttribute("insufficientTokens", true);
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm-request.jsp")
                        .forward(req, resp);

            } catch (EmailAlreadyConfirmedException ex) {
                LOG.warn("Account confirmation failed: Account already confimed");
                showTextilePage(req, resp, ConfirmPage.ALREADY_CONFIRMED);

            } catch (ServerException se) {
                LOG.error("Account confirmation failed with a server exception");
                LOG.error("Server error message: {}", se.getMessage());
                req.setAttribute("server-exception", "Server exception");
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm-request.jsp")
                        .forward(req, resp);

            } catch (WrongAuthenticationSourceException ex) {
                LOG.info("Trying to request email confirm of non local user!");
                req.setAttribute("wrongAuthenticationSource", true);
                req.getRequestDispatcher("WEB-INF/servlet/confirm/confirm-request.jsp")
                        .forward(req, resp);
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
