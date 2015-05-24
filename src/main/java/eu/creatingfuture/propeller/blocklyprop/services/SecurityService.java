/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.services;

import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;

/**
 *
 * @author Michel
 */
public interface SecurityService {

    UserRecord register(String screenname, String email, String password);

}
