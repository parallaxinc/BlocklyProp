/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Singleton;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Michel
 */
@Singleton
public class PingServlet extends HttpServlet {
    
    /**
     * Handle for any logging activity
     */
    private final Logger LOG = LoggerFactory.getLogger(PingServlet.class);


    /*
     * Respond to a ping request
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws
            ServletException, IOException {
        
        LOG.info("REST:/ping/ Get request received");
        resp.getWriter().write("<html><body>pong</body></html>");
    }
}
