/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.AbstractModule;
import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.dao.SessionDao;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.db.dao.impl.ProjectDaoImpl;
import com.parallax.server.blocklyprop.db.dao.impl.SessionDaoImpl;
import com.parallax.server.blocklyprop.db.dao.impl.UserDaoImpl;

/**
 *
 * @author Michel
 */
public class DaoModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectDao.class).to(ProjectDaoImpl.class);//.asEagerSingleton();
        bind(UserDao.class).to(UserDaoImpl.class);
        bind(SessionDao.class).to(SessionDaoImpl.class);
    }

}
