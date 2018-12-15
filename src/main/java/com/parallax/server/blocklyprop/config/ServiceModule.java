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
import com.google.inject.name.Names;
import com.parallax.server.blocklyprop.security.OAuthService;
import com.parallax.server.blocklyprop.security.OAuthServiceImpl;
import com.parallax.server.blocklyprop.security.oauth.GoogleAuthenticator;
import com.parallax.server.blocklyprop.security.oauth.OAuthAuthenticator;

import com.parallax.server.blocklyprop.services.AuthenticationService;
import com.parallax.server.blocklyprop.services.MotdService;
import com.parallax.server.blocklyprop.services.ProjectService;
import com.parallax.server.blocklyprop.services.ProjectSharingService;
import com.parallax.server.blocklyprop.services.SecurityService;
import com.parallax.server.blocklyprop.services.SessionService;
import com.parallax.server.blocklyprop.services.TokenGeneratorService;
import com.parallax.server.blocklyprop.services.UserService;

import com.parallax.server.blocklyprop.services.impl.AuthenticationServiceImpl;
import com.parallax.server.blocklyprop.services.impl.MotdServiceImpl;
import com.parallax.server.blocklyprop.services.impl.ProjectServiceImpl;
import com.parallax.server.blocklyprop.services.impl.ProjectSharingServiceImpl;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import com.parallax.server.blocklyprop.services.impl.SessionServiceImpl;
import com.parallax.server.blocklyprop.services.impl.UUIDTokenGeneratorServiceImpl;
import com.parallax.server.blocklyprop.services.impl.UserServiceImpl;

import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.converter.MotdConverter;


/**
 * Bind abstract service classes to their implementations
 * 
 * @author Michel
 */
public class ServiceModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectConverter.class);
        bind(MotdConverter.class);        

        bind(TokenGeneratorService.class).to(UUIDTokenGeneratorServiceImpl.class);
        bind(AuthenticationService.class).to(AuthenticationServiceImpl.class).asEagerSingleton();

        bind(MotdService.class).to(MotdServiceImpl.class);
        bind(ProjectService.class).to(ProjectServiceImpl.class);
        bind(ProjectSharingService.class).to(ProjectSharingServiceImpl.class);
        bind(UserService.class).to(UserServiceImpl.class).asEagerSingleton();
        bind(SecurityService.class).to(SecurityServiceImpl.class).asEagerSingleton();
        bind(SessionService.class).to(SessionServiceImpl.class).asEagerSingleton();

        bind(OAuthService.class).to(OAuthServiceImpl.class);

        bind(OAuthAuthenticator.class).annotatedWith(Names.named("Google")).to(GoogleAuthenticator.class);
    }

}
