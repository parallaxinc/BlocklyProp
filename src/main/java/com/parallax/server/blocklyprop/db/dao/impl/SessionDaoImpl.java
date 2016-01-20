/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jooq.DSLContext;

/**
 *
 * @author Michel
 */
@Singleton
public class SessionDaoImpl implements SessionDao {

    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    @Override
    public void create(SessionRecord session) {
        printSessionInfo("create", session);
        create.insertInto(Tables.SESSION).columns(Tables.SESSION.IDSESSION, Tables.SESSION.STARTTIMESTAMP, Tables.SESSION.LASTACCESSTIME, Tables.SESSION.TIMEOUT, Tables.SESSION.HOST, Tables.SESSION.ATTRIBUTES)
                .values(session.getIdsession(), session.getStarttimestamp(), session.getLastaccesstime(), session.getTimeout(), session.getHost(), session.getAttributes()).execute();
    }

    @Override
    public SessionRecord readSession(String idSession) throws NullPointerException {
        SessionRecord sessionRecord = create.selectFrom(Tables.SESSION).where(Tables.SESSION.IDSESSION.eq(idSession)).fetchOne();
        printSessionInfo("read", sessionRecord);
        return sessionRecord;
    }

    @Override
    public void updateSession(SessionRecord session) throws NullPointerException {
        SessionRecord dbRecord = readSession(session.getIdsession());
        if (dbRecord == null) {
            throw new NullPointerException();
        }
        dbRecord.setStarttimestamp(session.getStarttimestamp());
        dbRecord.setLastaccesstime(session.getLastaccesstime());
        dbRecord.setTimeout(session.getTimeout());
        dbRecord.setHost(session.getHost());
        dbRecord.setAttributes(session.getAttributes());
        printSessionInfo("update from", session);
        printSessionInfo("update to", dbRecord);
        dbRecord.update();
    }

    @Override
    public void deleteSession(String idSession) {
        create.deleteFrom(Tables.SESSION).where(Tables.SESSION.IDSESSION.eq(idSession)).execute();
    }

    @Override
    public Collection<SessionRecord> getActiveSessions() {
        return Arrays.asList(create.selectFrom(Tables.SESSION).fetchArray());
    }

    private void printSessionInfo(String action, SessionRecord session) {
        try {
            if (session == null || session.getAttributes() == null) {
                System.out.println(action + ": NO SESSION AVAILABLE");
            } else {
                ByteArrayInputStream bis = new ByteArrayInputStream(session.getAttributes());
                ObjectInput in = new ObjectInputStream(bis);
                HashMap attributes = (HashMap) in.readObject();
                System.out.println(action + ": " + attributes);
            }
        } catch (IOException ex) {
            Logger.getLogger(SessionDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException cnfe) {
            Logger.getLogger(SessionDaoImpl.class.getName()).log(Level.SEVERE, null, cnfe);
        }

    }

}
