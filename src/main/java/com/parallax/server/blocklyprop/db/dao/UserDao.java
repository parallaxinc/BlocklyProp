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

    UserRecord create(Long idCloudSession);

    UserRecord getUser(Long idUser);

    List<UserRecord> getAll();

    void setRoles(Long idUser, Set<Role> roles);

    List<Role> getRoles(Long idUser);

    Long getUserIdForCloudSessionUserId(Long id);

    public void updateScreenname(Long idUser, String screenname);

}
