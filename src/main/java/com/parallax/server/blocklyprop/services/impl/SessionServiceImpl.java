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

package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.server.blocklyprop.db.dao.SessionDao;
import com.parallax.server.blocklyprop.db.generated.tables.records.SessionRecord;
import com.parallax.server.blocklyprop.services.SessionService;
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

    // Session database access object
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
        log.debug("Creating a new user session");
        //TODO: Verify session attributes element has data when saving.
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
