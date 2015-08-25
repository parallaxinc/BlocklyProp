/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.SimpleSession;
import org.apache.shiro.session.mgt.eis.SessionDAO;

/**
 *
 * @author Michel
 */
public class BlocklyPropSessionDao implements SessionDAO {

    private Map<String, Session> sessions = new HashMap<>();

    @Override
    public Serializable create(Session session) {
        System.out.println("Session: " + session);
        System.out.println("Session id: " + session.getId());

        SimpleSession simpleSession = (SimpleSession) session;

        String uuid = UUID.randomUUID().toString();
        simpleSession.setId(uuid);

        sessions.put(uuid, session);

        return uuid;
    }

    @Override
    public Session readSession(Serializable sessionId) throws UnknownSessionException {
        System.out.println("Read session: " + sessionId);
        return sessions.get(sessionId.toString());
    }

    @Override
    public void update(Session session) throws UnknownSessionException {
        System.out.println("Update session: " + session.getId());
        sessions.put(session.getId().toString(), session);
    }

    @Override
    public void delete(Session session) {
        System.out.println("Delete session: " + session.getId());
        sessions.remove(session.getId().toString());
    }

    @Override
    public Collection<Session> getActiveSessions() {
        return sessions.values();
    }

}
