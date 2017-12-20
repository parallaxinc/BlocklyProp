/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.db.generated.tables.pojos.User;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface UserService {

    User getUser(Long idUser);
    
    User getUser(Long idCloudSessionUser, String screenName);

    List<UserRecord> getAllUsers();

    public String getUserScreenName(Long idUser);

    void setLocale(String locale);

}
