/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.dao;

import eu.creatingfuture.propeller.blocklyprop.db.enums.AuthenticationProvider;
import eu.creatingfuture.propeller.blocklyprop.db.enums.Role;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;
import java.util.List;
import java.util.Set;

/**
 *
 * @author Michel
 */
public interface UserDao {

    UserRecord create(String screenname, String email, String password, String salt, AuthenticationProvider authenticationProvider);

    UserRecord getUser(Long idUser);

    void setRoles(Long idUser, Set<Role> roles);

    List<Role> getRoles(Long idUser);

}
