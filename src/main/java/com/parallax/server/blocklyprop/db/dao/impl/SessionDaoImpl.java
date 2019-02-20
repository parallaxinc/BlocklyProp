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

package com.parallax.server.blocklyprop.db.dao.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.db.dao.SessionDao;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.SessionRecord;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import org.apache.commons.configuration.Configuration;
import org.jooq.DSLContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Michel
 */
@Singleton
public class SessionDaoImpl implements SessionDao {
    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(SessionDaoImpl.class);

    /**
     * 
     */
    private DSLContext create;

    /**
     * An instance of the application configuration settings
     */
    private Configuration configuration;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    /**
     * 
     * @param configuration 
     */
    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }

    /**
     * 
     * @param session 
     */
    @Override
    public void create(SessionRecord session) {

        LOG.debug("Create a session. Timeout set to: {}", session.getTimeout());
        
        // Log session details if the configuration file permits it
        printSessionInfo("create", session);
        
        try {
            create.insertInto(Tables.SESSION)
                   .columns(
                           Tables.SESSION.IDSESSION, 
                           Tables.SESSION.STARTTIMESTAMP, 
                           Tables.SESSION.LASTACCESSTIME, 
                           Tables.SESSION.TIMEOUT, 
                           Tables.SESSION.HOST, 
                           Tables.SESSION.ATTRIBUTES)
                    .values(
                            session.getIdsession(), 
                            session.getStarttimestamp(), 
                            session.getLastaccesstime(), 
                            session.getTimeout(), 
                            session.getHost(), 
                            session.getAttributes())
                    .execute();
        }
        catch (org.jooq.exception.DataAccessException sqex) {
            LOG.error("Database exception {}", sqex.getMessage());
        }
    }

    /**
     * 
     * @param idSession
     * @return
     * @throws NullPointerException 
     */
    @Override
    public SessionRecord readSession(String idSession) throws NullPointerException {

        LOG.debug("Getting session {} details", idSession);

        SessionRecord sessionRecord = null;
        
        try {
            sessionRecord = create.selectFrom(Tables.SESSION)
                    .where(Tables.SESSION.IDSESSION.eq(idSession))
                    .fetchOne();

            // Log session details if the configuration file permits it
            printSessionInfo("read", sessionRecord);
        }
        catch (org.jooq.exception.DataAccessException sqex) {
            LOG.error("Database exception {}", sqex.getMessage());
        }

        return sessionRecord;
   }

    /**
     * 
     * @param session
     * @throws NullPointerException 
     */
    @Override
    public void updateSession(SessionRecord session) throws NullPointerException {

        LOG.debug("Update a session");

        try {
            // Get the current session record
            SessionRecord dbRecord = readSession(session.getIdsession());
            
            if (dbRecord == null) {
                throw new NullPointerException("Session not found");
            }
      
            dbRecord.setStarttimestamp(session.getStarttimestamp());
            dbRecord.setLastaccesstime(session.getLastaccesstime());
            dbRecord.setTimeout(session.getTimeout());
            dbRecord.setHost(session.getHost());
            dbRecord.setAttributes(session.getAttributes());
        
            // Log session details if the configuration file permits it
            printSessionInfo("update from", session);
            printSessionInfo("update to", dbRecord);
        
            dbRecord.update();
        }
        catch (org.jooq.exception.DataAccessException sqex) {
            LOG.error("Database exception {}", sqex.getMessage());
            throw new NullPointerException("Database error");
        }
    }

    /**
     * 
     * @param idSession 
     */
    @Override
    public void deleteSession(String idSession) {

        LOG.info("Deleting session {}", idSession);

        create.deleteFrom(Tables.SESSION)
                .where(Tables.SESSION.IDSESSION.eq(idSession))
                .execute();
    }

    /**
     * 
     * @return 
     */
    @Override
    public Collection<SessionRecord> getActiveSessions() {
        return Arrays.asList(create.selectFrom(Tables.SESSION).fetchArray());
    }

    
    private void printSessionInfo(String action, SessionRecord session) {
        if (configuration.getBoolean("debug.session", false)) {
            try {
                if (session == null || session.getAttributes() == null) {
                    LOG.error("No sessions available.");
                } else {
                    ByteArrayInputStream bis = new ByteArrayInputStream(session.getAttributes());
                    ObjectInput in = new ObjectInputStream(bis);
                    HashMap attributes = (HashMap) in.readObject();
                    LOG.info("Session info: {}:{}", action, attributes);
                }
            } catch (IOException ex) {
                LOG.error("I/O error. {}",ex.getMessage());
            } catch (ClassNotFoundException cnfe) {
                LOG.error("Class not found. {}", cnfe.getMessage());
            }
        }
    }
}
