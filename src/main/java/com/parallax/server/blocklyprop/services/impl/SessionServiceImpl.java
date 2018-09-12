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
//import java.util.Arrays;
import java.util.Collection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class SessionServiceImpl implements SessionService {
    // Get a logger instance
    private static final Logger log = LoggerFactory.getLogger(SessionServiceImpl.class);

    // Retain session state
    private static SessionService sessionService;

    // Session database acceess object
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
        log.info("Creating a new user session with timeout set to {}", session.getTimeout());

        sessionDao.create(session);
    }

    @Override
    public SessionRecord readSession(String idSession) throws NullPointerException {
        log.debug("Reading a user session");

        return sessionDao.readSession(idSession);
    }

    @Override
    public void updateSession(SessionRecord session) throws NullPointerException {
        log.debug("Updating user session: {}", session.getIdsession());

        sessionDao.updateSession(session);
    }

    @Override
    public void deleteSession(String idSession) {
        log.info("Deleting session {}", idSession);

        sessionDao.deleteSession(idSession);
    }

    @Override
    public Collection<SessionRecord> getActiveSessions() {
        log.info("Getting all active sessions");

        return sessionDao.getActiveSessions();
    }

    public static SessionService getSessionService() {
        log.debug("Get current session service instance");

        return sessionService;
    }

}
