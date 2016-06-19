/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.AbstractModule;
import com.google.inject.name.Names;
import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.security.oauth.GoogleAuthenticator;
import com.parallax.server.blocklyprop.security.oauth.OAuthAuthenticator;
import com.parallax.server.blocklyprop.services.AuthenticationService;
import com.parallax.server.blocklyprop.services.ProjectService;
import com.parallax.server.blocklyprop.services.SecurityService;
import com.parallax.server.blocklyprop.services.SessionService;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;
import com.parallax.server.blocklyprop.services.UserService;
import com.parallax.server.blocklyprop.services.impl.AuthenticationServiceImpl;
import com.parallax.server.blocklyprop.services.impl.ProjectServiceImpl;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import com.parallax.server.blocklyprop.services.impl.SessionServiceImpl;
import com.parallax.server.blocklyprop.services.impl.UUIDTokenGeneratorServiceImpl;
import com.parallax.server.blocklyprop.services.impl.UserServiceImpl;

/**
 *
 * @author Michel
 */
public class ServiceModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectConverter.class);

        bind(TokenGeneratorService.class).to(UUIDTokenGeneratorServiceImpl.class);
        bind(AuthenticationService.class).to(AuthenticationServiceImpl.class).asEagerSingleton();

        bind(ProjectService.class).to(ProjectServiceImpl.class);
        bind(UserService.class).to(UserServiceImpl.class).asEagerSingleton();
        bind(SecurityService.class).to(SecurityServiceImpl.class).asEagerSingleton();
        bind(SessionService.class).to(SessionServiceImpl.class).asEagerSingleton();

        bind(OAuthAuthenticator.class).annotatedWith(Names.named("Google")).to(GoogleAuthenticator.class);
    }

}
