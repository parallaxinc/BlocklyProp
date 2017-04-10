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
        LOG.info("Create BlocklyProp session");
        
        // Set session timeout for 1 hours
        session.setTimeout(3600000);
        
        SimpleSession simpleSession = (SimpleSession) session;
        String uuid = UUID.randomUUID().toString();
        
        simpleSession.setId(uuid);
        LOG.info("Creating session: {}", session.getId());
        LOG.info("Session timeout is: {}", session.getTimeout());
        SessionServiceImpl.getSessionService().create(convert(simpleSession));

        return uuid;
    }

    @Override
    public Session readSession(Serializable sessionId) throws UnknownSessionException {
        LOG.debug("Reading session: {}", sessionId);

        try {
            // Obtain an existing session object
            SessionRecord sessionRecord 
                    = SessionServiceImpl
                            .getSessionService()
                            .readSession(sessionId.toString());
 
            if (sessionRecord != null) {
                return convert(sessionRecord);
            } else {
                LOG.warn("Unable to fin session: {}", sessionId);
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
        SessionServiceImpl.getSessionService().updateSession(convert(session));
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

    protected SessionRecord convert(Session session) {
        LOG.debug("Converting session {} to a SessionRecord object", session.getId());
        
        SimpleSession ssession = (SimpleSession) session;
        SessionRecord sessionRecord = new SessionRecord();
        sessionRecord.setIdsession(session.getId().toString());
        sessionRecord.setStarttimestamp(new Timestamp(session.getStartTimestamp().getTime()));
        sessionRecord.setLastaccesstime(new Timestamp(session.getLastAccessTime().getTime()));
        sessionRecord.setTimeout(session.getTimeout());
        sessionRecord.setHost(session.getHost());
        if (ssession.getAttributes() != null) {
            HashMap<Object, Object> attributes = (HashMap<Object, Object>) ssession.getAttributes();
            sessionRecord.setAttributes(SerializationUtils.serialize(attributes));
        }
        return sessionRecord;
    }

    protected Session convert(SessionRecord sessionRecord) {
        LOG.debug("Converting SessionRecord {} into a SimpleSession object", sessionRecord.getIdsession());
        
        SimpleSession ssession = new SimpleSession();
        ssession.setId(sessionRecord.getIdsession());
        ssession.setStartTimestamp(sessionRecord.getStarttimestamp());
        ssession.setLastAccessTime(sessionRecord.getLastaccesstime());
        ssession.setTimeout(sessionRecord.getTimeout());
        ssession.setHost(sessionRecord.getHost());
        
        if (sessionRecord.getAttributes() != null) {
            HashMap<Object, Object> attributes 
                    = (HashMap<Object, Object>)
                        SerializationUtils.deserialize(sessionRecord.getAttributes());
            
            ssession.setAttributes(attributes);
        }
        return ssession;
    }

}
