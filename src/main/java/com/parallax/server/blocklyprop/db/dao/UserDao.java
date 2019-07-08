/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao;

import com.parallax.server.blocklyprop.db.enums.Role;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;
import java.util.List;
import java.util.Set;

/**
 *
 * @author Michel
 */
public interface UserDao {

    @Deprecated
    UserRecord create(Long idCloudSession);

    /**
     * Update the blockly user screen name
     *
     * @param idUser - is the long integer id for the blockly user record
     * @param screenName - is ghe new screen name to store in the user record
     */
    void updateScreenName(Long idUser, String screenName);

    /**
     *
     * @param idCloudSession
     * @param screenName
     * @return
     */
    UserRecord create(Long idCloudSession, String screenName);


    /**
     * Retrieve a BP user record
     * 
     * @param idUser
     * @return 
     */
    UserRecord getUser(Long idUser);
    
    /**
     * Retrieve a BP user record
     * 
     * @param idCloudSession
     * @param screenName
     * @return 
     */
    UserRecord getUser(Long idCloudSession, String screenName);

    /**
     *
      * @return
     */
    List<UserRecord> getAll();

    /**
     *
     * @param idUser
     * @param roles
     */
    void setRoles(Long idUser, Set<Role> roles);

    /**
     *
     * @param idUser
     * @return
     */
    List<Role> getRoles(Long idUser);

    /**
     * Obtain the blocklyprop user ID from the supplied cloud session user id
     *
     * @param idCloudSession
     * The user profile ID
     *
     * @return
     * Returns a Long integer blocklyprop user ID if successful, otherwise returns zero
     */
    Long getUserIdForCloudSessionUserId(Long idCloudSession);
}
