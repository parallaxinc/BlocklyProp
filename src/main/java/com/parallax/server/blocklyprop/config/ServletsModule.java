/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.servlet.ServletModule;
import com.parallax.server.blocklyprop.servlets.ProjectServlet;
import com.parallax.server.blocklyprop.servlets.RegisterServlet;
import com.parallax.server.blocklyprop.servlets.UserServlet;

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
