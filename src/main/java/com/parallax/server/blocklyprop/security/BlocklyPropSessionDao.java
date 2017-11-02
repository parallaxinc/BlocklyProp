/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.server.blocklyprop.db.generated.tables.records.SessionRecord;
import com.parallax.server.blocklyprop.services.impl.SessionServiceImpl;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import org.apache.commons.lang.SerializationUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.SimpleSession;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public class BlocklyPropSessionDao implements SessionDAO {
    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(SessionServiceImpl.class);

    @Override
    public Serializable create(Session session) {
        LOG.debug("Create BlocklyProp session");
        
        // Set session timeout for 8 hours
        session.setTimeout(28800000);
        
        // Create a unique session id
        SimpleSession simpleSession = (SimpleSession) session;
        String uuid = UUID.randomUUID().toString();
        
        // create a new session
        simpleSession.setId(uuid);
        SessionServiceImpl.getSessionService().create(convert(simpleSession));
        LOG.debug("Session timeout is: {}", simpleSession.getTimeout());
        LOG.debug("Creating session: {}", simpleSession.getId());

        return uuid;
    }

    @Override
    public Session readSession(Serializable sessionId) throws UnknownSessionException {
        LOG.debug("Reading session: {}", sessionId);

        try {
            // Obtain an existing session object
            SessionRecord sessionRecord = SessionServiceImpl
                    .getSessionService()
                    .readSession(sessionId.toString());
 
            if (sessionRecord != null) {
                return convert(sessionRecord);
            } else {
                LOG.warn("Unable to find session: {}", sessionId);
                throw new UnknownSessionException();
            }
        } catch (NullPointerException npe) {
            LOG.error("Unable to obtain session details. {}", npe.getMessage());
            throw new UnknownSessionException();
        }
    }

    @Override
    public void update(Session session) throws UnknownSessionException {
        LOG.debug("Update session: {}", session.getId());
        
        try {
            // updateSession() can throw a NullPointerException if something goes wrong
            SessionServiceImpl.getSessionService().updateSession(convert(session));
        }
        catch (NullPointerException npe) {
            LOG.error("Unable to update the session. Error message: {}", npe.getMessage());
            throw new UnknownSessionException("Unable to update the session");
        }
    }

    @Override
    public void delete(Session session) {
        LOG.debug("Removing session {}", session.getId());
        SessionServiceImpl.getSessionService().deleteSession(session.getId().toString());
    }

    @Override
    public Collection<Session> getActiveSessions() {
        LOG.debug("Getting all active sessions");
        
        Collection<SessionRecord> sessionRecords = SessionServiceImpl.getSessionService().getActiveSessions();
        List<Session> sessions = new ArrayList<>();
        for (SessionRecord sessionRecord : sessionRecords) {
            sessions.add(convert(sessionRecord));
        }
        return sessions;
    }

    /***
     * Convert a Session object to a SessionRecord object
     * @param session - Session object to be converted
     * @return a SessionRecord object 
     */
    protected SessionRecord convert(Session session) {
        LOG.debug("Converting session {} to a SessionRecord object", session.getId());
        
        SimpleSession sSession = (SimpleSession) session;
        
        // Create a SessionRecord object and populate details
        SessionRecord sessionRecord = new SessionRecord();
        sessionRecord.setIdsession(session.getId().toString());
        sessionRecord.setStarttimestamp(new Timestamp(session.getStartTimestamp().getTime()));
        sessionRecord.setLastaccesstime(new Timestamp(session.getLastAccessTime().getTime()));
        sessionRecord.setTimeout(session.getTimeout());
        sessionRecord.setHost(session.getHost());
        
        // Add session attributes to the SessionRecord object if any are available
        if (sSession.getAttributes() != null) {
            HashMap<Object, Object> attributes = (HashMap<Object, Object>) sSession.getAttributes();
            sessionRecord.setAttributes(SerializationUtils.serialize(attributes));
        }
        return sessionRecord;
    }

    /***
     * Convert a SessionRecord object to a Session object
     * @param sessionRecord
     * @return 
     */
    protected Session convert(SessionRecord sessionRecord) {
        LOG.debug("Converting SessionRecord {} into a SimpleSession object",
                sessionRecord.getIdsession());
        
        SimpleSession sSession = new SimpleSession();
        sSession.setId(sessionRecord.getIdsession());
        sSession.setStartTimestamp(sessionRecord.getStarttimestamp());
        sSession.setLastAccessTime(sessionRecord.getLastaccesstime());
        sSession.setTimeout(sessionRecord.getTimeout());
        sSession.setHost(sessionRecord.getHost());
        
        if (sessionRecord.getAttributes() != null) {
            HashMap<Object, Object> attributes 
                    = (HashMap<Object, Object>)
                        SerializationUtils.deserialize(sessionRecord.getAttributes());
            
            sSession.setAttributes(attributes);
        }
        return sSession;
    }

}
