/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.services;

import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.pojos.User;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface UserService {

    User getUser(Long idUser);

    List<UserRecord> getAllUsers();

}
