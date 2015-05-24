/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.config;

import com.google.inject.AbstractModule;
import eu.creatingfuture.propeller.blocklyprop.db.dao.ProjectDao;
import eu.creatingfuture.propeller.blocklyprop.db.dao.UserDao;
import eu.creatingfuture.propeller.blocklyprop.db.dao.impl.ProjectDaoImpl;
import eu.creatingfuture.propeller.blocklyprop.db.dao.impl.UserDaoImpl;

/**
 *
 * @author Michel
 */
public class DaoModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectDao.class).to(ProjectDaoImpl.class);//.asEagerSingleton();
        bind(UserDao.class).to(UserDaoImpl.class);
    }

}
