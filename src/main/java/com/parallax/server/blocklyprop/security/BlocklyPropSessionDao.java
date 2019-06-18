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
import java.util.*;

import org.apache.commons.lang.SerializationUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.SimpleSession;
import org.apache.shiro.session.mgt.eis.SessionDAO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Session persistence manager
 * 
 * @author Michel
 *
 * @implNote
 * Notes from the Shiro JavaDocs:
 * Data Access Object design pattern specification to enable Session access to an EIS
 * (Enterprise Information System). It provides your four typical CRUD methods:
 *     create(org.apache.shiro.session.Session),
 *     readSession(java.io.Serializable),
 *     update(org.apache.shiro.session.Session),
 *     and delete(org.apache.shiro.session.Session).
 *
 * The remaining getActiveSessions() method exists as a support mechanism to pre-emptively
 * orphaned sessions, typically by ValidatingSessionManagers), and should be as efficient
 * as possible, especially if there are thousands of active sessions. Large scale/high
 * performance implementations will often return a subset of the total active sessions and
 * perform validation a little more frequently, rather than return a massive set and
 * infrequently validate.
 */
public class BlocklyPropSessionDao implements SessionDAO {

    /**
     *  Get an instance of the logger initialized to this class
     */
    private static final Logger LOG = LoggerFactory.getLogger(SessionServiceImpl.class);

    /**
     * Inserts a new Session record into the underling EIS (a relational database in this
     * implementation).
     *
     * @param session
     * the Session object to create in the EIS.
     *
     * @return
     * the EIS id (e.g. primary key) of the created Session object.
     *
     * @implNote
     * After this method is invoked, the Session.getId() method executed on the argument
     * must return a valid session identifier. That is, the following should always be
     * true:
     *
     *    Serializable id = create( session );
     *    id.equals( session.getId() ) == true
     *
     * Implementations are free to throw any exceptions that might occur due to integrity
     * violation constraints or other EIS related errors.
     */
    @Override
    public Serializable create(Session session) {
        LOG.trace("Create BlocklyProp session");
        
        // Set session timeout for 8 hours
        session.setTimeout(28800000);
        
        SimpleSession simpleSession = (SimpleSession) session;

        // Create a unique string and save into the session object
        String uuid = UUID.randomUUID().toString();
        simpleSession.setId(uuid);

        // Get a reference to the static session service and create
        // a session record from the session object and store it in the
        // sessionDao backing store
        SessionServiceImpl.getSessionService().create(convert(simpleSession));
        LOG.info("Creating session: {}", simpleSession.getId());

        // Return a unique session identifier
        return uuid;
    }

    /**
     * Retrieves the session from the EIS uniquely identified by the specified sessionId.
     *
     * @param sessionId
     * the system-wide unique identifier of the Session object to retrieve from the EIS.
     *
     * @return
     * the persisted session in the EIS identified by sessionId.
     *
     * @throws UnknownSessionException
     * if there is no EIS record for any session with the specified sessionId
     */
    @Override
    public Session readSession(Serializable sessionId) throws UnknownSessionException {

        LOG.trace("Reading session: {}", sessionId);

        // Check parameter for sanity
        if (sessionId == null) {
            LOG.warn("Attempt to retrieve session with a null UUID parameter");
            throw new UnknownSessionException();
        }

        try {
            // Obtain an existing session object
            SessionRecord sessionRecord 
                    = SessionServiceImpl.getSessionService().readSession(sessionId.toString());
 
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

    /**
     * Updates (persists) data from a previously created Session instance in the EIS identified
     * by {@link Session#getId() session.getId()}. This effectively propagates the data in the
     * argument to the EIS record previously saved.
     *
     * @param session
     * session - the Session to update
     *
     * @throws UnknownSessionException
     * if no existing EIS session record exists with the identifier of session.getSessionId()
     *
     * @implNote
     * In addition to UnknownSessionException, implementations are free to throw any other
     * exceptions that might occur due to integrity violation constraints or other EIS related
     * errors.
     */
    @Override
    public void update(Session session) throws UnknownSessionException {

        LOG.trace("Update session: {}", session.getId());

        try {
            // updateSession() can throw a NullPointerException if something goes wrong
            SessionServiceImpl.getSessionService().updateSession(convert(session));
        }
        catch (NullPointerException npe) {
            LOG.error("Unable to update the session. Error message: {}", npe.getMessage());
            throw new UnknownSessionException("Unable to update the session");
        }
    }

    /**
     * Deletes the associated EIS record of the specified session. If there never existed a
     * session EIS record with the identifier of session.getId(), then this method does nothing.
     *
     * @param session
     * session - the session to delete.
     */
    @Override
    public void delete(Session session) {

        LOG.trace("Removing session {}", session.getId());

        SessionServiceImpl.getSessionService().deleteSession(session.getId().toString());
    }

    /**
     * Returns all sessions in the EIS that are considered active, meaning all sessions that
     * have not been stopped or expired. This is primarily used to validate potential orphans.
     *
     * @return
     * a Collection of Sessions that are considered active, or an empty collection or null if
     * there are no active sessions.
     *
     * @implNote
     * This method should be as efficient as possible, especially in larger systems where there
     * might be thousands of active sessions. Large scale/high performance implementations will
     * often return a subset of the total active sessions and perform validation a little more
     * frequently, rather than return a massive set and validate infrequently. If efficient and
     * possible, it would make sense to return the oldest unstopped sessions available, ordered
     * by lastAccessTime.
     *
     * Ideally this method would only return active sessions that the EIS was certain should be
     * invalided. Typically that is any session that is not stopped and where its
     * lastAccessTimestamp is older than the session timeout. For example, if sessions were
     * backed by a relational database or SQL-92 'query-able' enterprise cache, you might return
     * something similar to the results returned by this query (assuming SimpleSessions were
     * being stored):
     *
     *  select *
     *  from sessions s
     *  where s.lastAccessTimestamp < ? and s.stopTimestamp is null
     *
     * where the ? parameter is a date instance equal to 'now' minus the session timeout
     * (e.g. now - 30 minutes).
     */
    @Override
    public Collection<Session> getActiveSessions() {

        LOG.trace("Getting all active sessions");
        
        Collection<SessionRecord> sessionRecords = SessionServiceImpl.getSessionService().getActiveSessions();
        List<Session> sessions = new ArrayList<>();

        for (SessionRecord sessionRecord : sessionRecords) {
            sessions.add(convert(sessionRecord));
        }

        return sessions;
    }


    /**
     * Convert a Session object into a SessionRecord object
     *
     * @param session
     * the session to convert into a SessionRecord
     *
     * @return
     * a SessionRecord object containing the details necessary to persist the object
     * into an EIS.
     */
    private SessionRecord convert(Session session) {
        LOG.trace("Converting session {} to a SessionRecord object", session.getId());

        // Cast the Session parameter into a SimpleSession reference
        SimpleSession ssession = (SimpleSession) session;

        SessionRecord sessionRecord = new SessionRecord();
        sessionRecord.setIdsession(session.getId().toString());
        sessionRecord.setStarttimestamp(new Timestamp(session.getStartTimestamp().getTime()));
        sessionRecord.setLastaccesstime(new Timestamp(session.getLastAccessTime().getTime()));
        sessionRecord.setTimeout(session.getTimeout());
        sessionRecord.setHost(session.getHost());

        // Gather the session attributes into a HashMap that can be persisted into the
        // SessionRecord object
        if (ssession.getAttributes() != null) {
            HashMap<Object, Object> attributes = (HashMap<Object, Object>) ssession.getAttributes();

            // Logging attributes
            // LOG.debug("Session attributes:");
            // attributes.forEach( (k,v) -> LOG.debug("Key: {}, Value: {}", k, v));

            sessionRecord.setAttributes(SerializationUtils.serialize(attributes));
        }

        return sessionRecord;
    }

    /**
     * Concert a SessionRecord object to a Session object
     *
     * @param sessionRecord
     * the SessionRecord object to convert
     *
     * @return
     * a Session object. The session object attributes may be missing if the original
     * SessionRecord object contained non-string data.
     */
    private Session convert(SessionRecord sessionRecord) {
        LOG.trace("Converting SessionRecord {} into a SimpleSession object", sessionRecord.getIdsession());
        
        SimpleSession ssession = new SimpleSession();
        ssession.setId(sessionRecord.getIdsession());
        ssession.setStartTimestamp(sessionRecord.getStarttimestamp());
        ssession.setLastAccessTime(sessionRecord.getLastaccesstime());
        ssession.setTimeout(sessionRecord.getTimeout());
        ssession.setHost(sessionRecord.getHost());

        // Gather the session attributes into a HashMap that can be persisted into the
        // Session object
        if (sessionRecord.getAttributes() != null) {
            // In case there is something in the session attributes that isn't a string value
            // We can trap the issue here and deal with it. The @SuppressWarnings tells the IDE
            // that we have thought about this and taken appropriate defensive measures.
            try {
                @SuppressWarnings("unchecked")
                HashMap<Object, Object> attributes
                        = (HashMap<Object, Object>) SerializationUtils.deserialize(sessionRecord.getAttributes());
                ssession.setAttributes(attributes);
            }
            catch (ClassCastException ex) {
                LOG.warn("Unable to convert SessionRecord attributes in session {}", sessionRecord.getIdsession() );
            }
        }

        return ssession;
    }

}
