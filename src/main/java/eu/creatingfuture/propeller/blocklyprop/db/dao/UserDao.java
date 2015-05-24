/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.dao;

import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;

/**
 *
 * @author Michel
 */
public interface UserDao {

    UserRecord create(String screenname, String email, String password, byte[] salt);

}
