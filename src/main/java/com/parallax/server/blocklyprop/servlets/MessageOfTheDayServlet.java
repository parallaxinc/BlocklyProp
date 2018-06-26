/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.parallax.server.blocklyprop.db.dao.MotdDao;
import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Jim Ewald
 */
@Singleton

public class MessageOfTheDayServlet  extends HttpServlet {

    /**
     * Handle for any logging activity
     */
    private final Logger LOG = LoggerFactory.getLogger(MessageOfTheDayServlet.class);

    
    private MotdDao motdDao;
   
    
    @Inject
    public void setMotdDao(MotdDao motdDao) {
        this.motdDao = motdDao;
    }
    
    /*
     * Respond to a ping request
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws
            ServletException, IOException {
        
        LOG.info("REST:/motd/ Get request received");
        
        MotdRecord record = motdDao.get(1L);
        if (record == null) {
            resp.getWriter().write("<html><body>No messages are available</body></html>");
        }
        else {
            resp.getWriter().write( record.getMessageHtml() );
        }
    }
}
