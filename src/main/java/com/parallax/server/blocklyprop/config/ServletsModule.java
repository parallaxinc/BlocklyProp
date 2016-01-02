/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.servlet.ServletModule;
import com.parallax.server.blocklyprop.servlets.ConfirmRequestServlet;
import com.parallax.server.blocklyprop.servlets.ConfirmServlet;
import com.parallax.server.blocklyprop.servlets.HelpSearchServlet;
import com.parallax.server.blocklyprop.servlets.HelpServlet;
import com.parallax.server.blocklyprop.servlets.PasswordResetRequestServlet;
import com.parallax.server.blocklyprop.servlets.PasswordResetServlet;
import com.parallax.server.blocklyprop.servlets.PingServlet;
import com.parallax.server.blocklyprop.servlets.ProfileServlet;
import com.parallax.server.blocklyprop.servlets.ProjectCreationServlet;
import com.parallax.server.blocklyprop.servlets.ProjectServlet;
import com.parallax.server.blocklyprop.servlets.RegisterServlet;
import com.parallax.server.blocklyprop.servlets.TextileLicenseServlet;
import com.parallax.server.blocklyprop.servlets.UserServlet;

/**
 *
 * @author Michel
 */
public class ServletsModule extends ServletModule {

    @Override
    protected void configureServlets() {
        serve("/pong").with(PingServlet.class);

        serve("/project").with(ProjectServlet.class);
        serve("/user").with(UserServlet.class);
        serve("/register").with(RegisterServlet.class);
        serve("/profile").with(ProfileServlet.class);

        serve("/confirmrequest").with(ConfirmRequestServlet.class);
        serve("/confirm").with(ConfirmServlet.class);

        serve("/resetrequest").with(PasswordResetRequestServlet.class);
        serve("/reset").with(PasswordResetServlet.class);

        serve("/createproject").with(ProjectCreationServlet.class);

        serve("/public/license").with(TextileLicenseServlet.class);
        serve("/public/help").with(HelpServlet.class);
        serve("/public/helpsearch").with(HelpSearchServlet.class);
    }

}
