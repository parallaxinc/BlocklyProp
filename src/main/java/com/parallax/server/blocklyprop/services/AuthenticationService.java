/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;

/**
 *
 * @author Michel
 */
public interface AuthenticationService {

    SessionData getNewAuthenticationData();

    UserRecord authenticate(Long idUser, String timestamp, String hash);

}
