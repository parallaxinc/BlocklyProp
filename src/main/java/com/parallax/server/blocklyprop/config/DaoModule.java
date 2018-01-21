/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.AbstractModule;
import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.dao.ProjectSharingDao;
import com.parallax.server.blocklyprop.db.dao.SessionDao;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.db.dao.MotdDao;

import com.parallax.server.blocklyprop.db.dao.impl.ProjectDaoImpl;
import com.parallax.server.blocklyprop.db.dao.impl.ProjectSharingDaoImpl;
import com.parallax.server.blocklyprop.db.dao.impl.SessionDaoImpl;
import com.parallax.server.blocklyprop.db.dao.impl.UserDaoImpl;
import com.parallax.server.blocklyprop.db.dao.impl.MotdDaoImpl;


/**
 *
 * @author Michel
 * 
 * AbstractModule:
 * A support class for Modules which reduces repetition and results in a more
 * readable configuration. Simply extend this class, implement configure(),
 * and call the inherited methods which mirror those found in Binder.
 * For example:
 * 
 *  public class MyModule extends AbstractModule {
 *     protected void configure() {
 *     bind(Service.class).to(ServiceImpl.class).in(Singleton.class);
 *     bind(CreditCardPaymentService.class);
 *     bind(PaymentService.class).to(CreditCardPaymentService.class);
 *     bindConstant().annotatedWith(Names.named("port")).to(8080);
 *    }
 *  }
 * 
 */
public class DaoModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectDao.class).to(ProjectDaoImpl.class);//.asEagerSingleton();
        bind(UserDao.class).to(UserDaoImpl.class);
        bind(SessionDao.class).to(SessionDaoImpl.class);
        bind(ProjectSharingDao.class).to(ProjectSharingDaoImpl.class);
        bind(MotdDao.class).to(MotdDaoImpl.class);        
    }

}
