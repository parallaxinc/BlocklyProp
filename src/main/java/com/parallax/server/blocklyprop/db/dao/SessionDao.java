/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao;

import com.parallax.server.blocklyprop.db.generated.tables.Session;
import java.util.Collection;

/**
 *
 * @author Michel
 */
public interface SessionDao {

    void create(Session session);

    Session readSession(String idSession) throws NullPointerException;

    void updateSession(Session session) throws NullPointerException;

    void deleteSession(String idSession);

    Collection<Session> getActiveSessions();

}
