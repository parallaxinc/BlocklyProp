/*
 * Copyright (c) 2018 Parallax Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
        bind(ProjectDao.class).to(ProjectDaoImpl.class);
        bind(UserDao.class).to(UserDaoImpl.class);
        bind(SessionDao.class).to(SessionDaoImpl.class);
        bind(ProjectSharingDao.class).to(ProjectSharingDaoImpl.class);
        bind(MotdDao.class).to(MotdDaoImpl.class);        
    }

}
