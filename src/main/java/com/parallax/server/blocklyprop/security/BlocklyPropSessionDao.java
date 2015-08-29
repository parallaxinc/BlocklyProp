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

/**
 *
 * @author Michel
 */
public class BlocklyPropSessionDao implements SessionDAO {

    @Override
    public Serializable create(Session session) {
        SimpleSession simpleSession = (SimpleSession) session;

        String uuid = UUID.randomUUID().toString();
        simpleSession.setId(uuid);

//        System.out.println("Create session: " + session.getId());
        SessionServiceImpl.getSessionService().create(convert(simpleSession));

        return uuid;
    }

    @Override
    public Session readSession(Serializable sessionId) throws UnknownSessionException {
//        System.out.println("Read session: " + sessionId);
        try {
            SessionRecord sessionRecord = SessionServiceImpl.getSessionService().readSession(sessionId.toString());
            if (sessionRecord != null) {
                return convert(sessionRecord);
            }
            throw new UnknownSessionException();
        } catch (NullPointerException npe) {
            throw new UnknownSessionException();
        }
    }

    @Override
    public void update(Session session) throws UnknownSessionException {
//        System.out.println("Update session: " + session.getId());

        SessionServiceImpl.getSessionService().updateSession(convert(session));
    }

    @Override
    public void delete(Session session) {
//        System.out.println("Delete session: " + session.getId());
        SessionServiceImpl.getSessionService().deleteSession(session.getId().toString());
    }

    @Override
    public Collection<Session> getActiveSessions() {
        Collection<SessionRecord> sessionRecords = SessionServiceImpl.getSessionService().getActiveSessions();
        List<Session> sessions = new ArrayList<>();
        for (SessionRecord sessionRecord : sessionRecords) {
            sessions.add(convert(sessionRecord));
        }
        return sessions;
    }

    protected SessionRecord convert(Session session) {
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
        SimpleSession ssession = new SimpleSession();
        ssession.setId(sessionRecord.getIdsession());
        ssession.setStartTimestamp(sessionRecord.getStarttimestamp());
        ssession.setLastAccessTime(sessionRecord.getLastaccesstime());
        ssession.setTimeout(sessionRecord.getTimeout());
        ssession.setHost(sessionRecord.getHost());
        if (sessionRecord.getAttributes() != null) {
            HashMap<Object, Object> attributes = (HashMap<Object, Object>) SerializationUtils.deserialize(sessionRecord.getAttributes());
            ssession.setAttributes(attributes);
        }
        return ssession;
    }

}
