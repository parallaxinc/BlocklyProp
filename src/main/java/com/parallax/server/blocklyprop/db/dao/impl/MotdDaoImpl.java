/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao.impl;

import com.google.inject.Singleton;
import com.google.inject.Inject;

import org.jooq.DSLContext;
import com.parallax.server.blocklyprop.db.dao.MotdDao;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;

import java.util.List;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Manage the message of the day records
 * 
 * @author Jim Ewald
 */

@Singleton
public class MotdDaoImpl implements MotdDao {
    
    /**
     * Logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(MotdDao.class);

        /**
     * Database connection context
     */
    private DSLContext create;

    
    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    /**
     * Create a new message of the day
     * 
     * @param message
     * @param enableDate
     * @param disableDate
     * @return 
     */
    @Override
    public MotdRecord create(
            String message,
            DateTime enableDate,
            DateTime disableDate) {
        
        LOG.info("Creating a MOTD record");
        
        MotdRecord record = null;
        
        return record;
    }
            
            
    /**
     * Retrieve a single message of the day
     * 
     * @param idMotd
     * 
     * @return a single MotdRecord or null if record is not found
     */
    @Override
    public MotdRecord getMotd(Long idMotd) {
        
        MotdRecord record = create
                .selectFrom(Tables.MOTD)
                .where(Tables.MOTD.ID.equal(idMotd))
                .fetchOne();

        return record;
    }
    
    /**
     * List all MOTD records
     * 
     * @return a list of MotdRecords or null if there are no records
     */
    @Override
    public List <MotdRecord> getAll() {
        
        List <MotdRecord> records = create
                .selectFrom(Tables.MOTD)
                .fetch();

        return records;
    }
    
    /**
     * Mark a record as deleted
     * 
     * @param idMotd
     * @return True if the action was successful, otherwise false
     */
    @Override
    public Boolean delete(Long idMotd) {
        
        return true;
    }
    
}
