/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.dao.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import eu.creatingfuture.propeller.blocklyprop.db.dao.UserDao;
import eu.creatingfuture.propeller.blocklyprop.db.generated.Tables;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;
import org.jooq.DSLContext;

/**
 *
 * @author Michel
 */
@Singleton
public class UserDaoImpl implements UserDao {

    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    @Override
    public UserRecord create(String screenname, String email, String password, String salt) {
        //create.insertInto(Tables.PROJECT).set(project).execute();
        UserRecord record = create.insertInto(Tables.USER, Tables.USER.SCREENNAME, Tables.USER.EMAIL, Tables.USER.PASSWORD, Tables.USER.SALT)
                .values(screenname, email, password, salt).returning().fetchOne();
        return record;
    }

}
