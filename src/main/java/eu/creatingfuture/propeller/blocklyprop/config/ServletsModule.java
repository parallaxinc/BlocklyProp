/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.config;

import com.google.inject.servlet.ServletModule;
import eu.creatingfuture.propeller.blocklyprop.servlets.ProjectServlet;
import eu.creatingfuture.propeller.blocklyprop.servlets.RegisterServlet;
import eu.creatingfuture.propeller.blocklyprop.servlets.UserServlet;

/**
 *
 * @author Michel
 */
public class ServletsModule extends ServletModule {

    @Override
    protected void configureServlets() {
        serve("/project").with(ProjectServlet.class);
        serve("/user").with(UserServlet.class);
        serve("/register").with(RegisterServlet.class);
    }

}
