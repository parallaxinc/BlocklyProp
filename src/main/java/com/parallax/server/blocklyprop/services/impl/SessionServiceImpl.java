/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.server.blocklyprop.db.dao.SessionDao;
import com.parallax.server.blocklyprop.db.generated.tables.records.SessionRecord;
import com.parallax.server.blocklyprop.services.SessionService;
import java.util.Collection;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class SessionServiceImpl implements SessionService {

    private static SessionService sessionService;

    private SessionDao sessionDao;

    public SessionServiceImpl() {
        sessionService = this;
    }

    @Inject
    public void setSessionDao(SessionDao sessionDao) {
        this.sessionDao = sessionDao;
    }

    @Override
    public void create(SessionRecord session) {
        sessionDao.create(session);
    }

    @Override
    public SessionRecord readSession(String idSession) throws NullPointerException {
        return sessionDao.readSession(idSession);
    }

    @Override
    public void updateSession(SessionRecord session) throws NullPointerException {
        sessionDao.updateSession(session);
    }

    @Override
    public void deleteSession(String idSession) {
        sessionDao.deleteSession(idSession);
    }

    @Override
    public Collection<SessionRecord> getActiveSessions() {
        return sessionDao.getActiveSessions();
    }

    public static SessionService getSessionService() {
        return sessionService;
    }

}
