/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;

import com.parallax.server.blocklyprop.db.dao.MotdDao;
import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;
import com.parallax.server.blocklyprop.services.MotdService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



/**
 * Implementation of the MotdService interfaces
 * 
 * @author Jim E.
 */
@Singleton
@Transactional
public class MotdServiceImpl implements MotdService {
    
    /**
     * Implement a DAO interface for the Message of the Day database table
     */
    private MotdDao motdDao;
    
    /**
     * Application logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProjectServiceImpl.class);


    // Connect the database connection class
    @Inject
    public void setMotdDao(MotdDao mtdDao) {
        LOG.info("setting MotdDao");
        this.motdDao = mtdDao;
    }

    
    @Override
    public MotdRecord getFirstActiveMessage() {
        LOG.info("In MotdService getting default message");
        
        MotdRecord record = null;
        
        try {
            if (motdDao == null) {
                LOG.info("DAO connection is null. That's a problem.");
            }
            record = motdDao.getFirst();
        }
        catch (Exception ex) {
            LOG.info("Exception detected.");
            LOG.info("Message: {}", ex.getMessage());
        }
        
        LOG.info("Returning a MotdRecord");
        return record;
    }
}
