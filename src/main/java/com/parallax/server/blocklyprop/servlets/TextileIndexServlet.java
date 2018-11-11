/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.utils.ServletUtils;
import com.parallax.server.blocklyprop.utils.TextileReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.shiro.session.UnknownSessionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Michel
 */
@Singleton
public class TextileIndexServlet extends HttpServlet {
            
    /**
     * Application logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(TextileIndexServlet.class);

    private final TextileReader textileFileReader = new TextileReader();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        try {
            String html = textileFileReader.readFile("index", ServletUtils.getLocale(req), req.isSecure());
            req.setAttribute("html", html);
            req.getRequestDispatcher("/WEB-INF/servlet/index.jsp").forward(req, resp);
        }
        catch (UnknownSessionException ex) {
            // Redrect the session back to the home page.
            LOG.error("Session has expired. Request was for: {}", req.getRequestURI());
            resp.flushBuffer();
            req.getRequestDispatcher("/WEB-INF/servlet/index.jsp").forward(req, resp);
        }
    }

}
