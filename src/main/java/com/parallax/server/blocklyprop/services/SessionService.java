/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.db.generated.tables.records.SessionRecord;
import java.util.Collection;

/**
 *
 * @author Michel
 */
public interface SessionService {

    void create(SessionRecord session);

    SessionRecord readSession(String idSession) throws NullPointerException;

    void updateSession(SessionRecord session) throws NullPointerException;

    void deleteSession(String idSession);

    Collection<SessionRecord> getActiveSessions();

}
