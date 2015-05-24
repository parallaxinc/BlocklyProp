/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.config;

import com.google.inject.AbstractModule;
import eu.creatingfuture.propeller.blocklyprop.services.ProjectService;
import eu.creatingfuture.propeller.blocklyprop.services.SecurityService;
import eu.creatingfuture.propeller.blocklyprop.services.UserService;
import eu.creatingfuture.propeller.blocklyprop.services.impl.ProjectServiceImpl;
import eu.creatingfuture.propeller.blocklyprop.services.impl.SecurityServiceImpl;
import eu.creatingfuture.propeller.blocklyprop.services.impl.UserServiceImpl;

/**
 *
 * @author Michel
 */
public class ServiceModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectService.class).to(ProjectServiceImpl.class);
        bind(UserService.class).to(UserServiceImpl.class);
        bind(SecurityService.class).to(SecurityServiceImpl.class);
    }

}
