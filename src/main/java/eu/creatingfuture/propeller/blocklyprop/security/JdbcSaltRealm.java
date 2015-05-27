/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.security;

import eu.creatingfuture.propeller.blocklyprop.db.utils.DataSourceSetup;
import eu.creatingfuture.propeller.blocklyprop.db.utils.NeedsDataSource;
import org.apache.shiro.realm.jdbc.JdbcRealm;

/**
 *
 * @author Michel
 */
public class JdbcSaltRealm extends JdbcRealm implements NeedsDataSource {

    public JdbcSaltRealm() {
        super();
        setSaltStyle(SaltStyle.COLUMN);
        DataSourceSetup.registerDataSourceUsers(this);
    }

}
