/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.AbstractModule;
import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.services.ProjectService;
import com.parallax.server.blocklyprop.services.SecurityService;
import com.parallax.server.blocklyprop.services.SessionService;
import com.parallax.server.blocklyprop.services.UserService;
import com.parallax.server.blocklyprop.services.impl.ProjectServiceImpl;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import com.parallax.server.blocklyprop.services.impl.SessionServiceImpl;
import com.parallax.server.blocklyprop.services.impl.UserServiceImpl;

/**
 *
 * @author Michel
 */
public class ServiceModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectConverter.class);

        bind(ProjectService.class).to(ProjectServiceImpl.class);
        bind(UserService.class).to(UserServiceImpl.class);
        bind(SecurityService.class).to(SecurityServiceImpl.class).asEagerSingleton();
        bind(SessionService.class).to(SessionServiceImpl.class);
    }

}
