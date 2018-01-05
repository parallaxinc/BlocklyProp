/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.servlet.ServletModule;
import com.parallax.server.blocklyprop.servlets.AuthenticationServlet;
import com.parallax.server.blocklyprop.servlets.PrivacyPolicyServlet;
import com.parallax.server.blocklyprop.servlets.ConfirmRequestServlet;
import com.parallax.server.blocklyprop.servlets.ConfirmServlet;
import com.parallax.server.blocklyprop.servlets.HelpSearchServlet;
import com.parallax.server.blocklyprop.servlets.HelpServlet;
import com.parallax.server.blocklyprop.servlets.NewOAuthUserServlet;
import com.parallax.server.blocklyprop.servlets.OAuthGoogleServlet;
import com.parallax.server.blocklyprop.servlets.PasswordResetRequestServlet;
import com.parallax.server.blocklyprop.servlets.PasswordResetServlet;
import com.parallax.server.blocklyprop.servlets.PingServlet;
import com.parallax.server.blocklyprop.servlets.ProfileServlet;
import com.parallax.server.blocklyprop.servlets.ProjectCreationServlet;
import com.parallax.server.blocklyprop.servlets.ProjectEditorServlet;
import com.parallax.server.blocklyprop.servlets.ProjectLinkServlet;
import com.parallax.server.blocklyprop.servlets.ProjectServlet;
import com.parallax.server.blocklyprop.servlets.PublicProfileServlet;
import com.parallax.server.blocklyprop.servlets.RegisterServlet;
import com.parallax.server.blocklyprop.servlets.SessionStateServlet;
import com.parallax.server.blocklyprop.servlets.TextileChangeLogServlet;
import com.parallax.server.blocklyprop.servlets.TextileClientDownloadServlet;
import com.parallax.server.blocklyprop.servlets.TextileClientInstructionsServlet;
import com.parallax.server.blocklyprop.servlets.TextileIndexServlet;
import com.parallax.server.blocklyprop.servlets.TextileLibrariesServlet;
import com.parallax.server.blocklyprop.servlets.TextileLicenseServlet;

/**
 * Map each URI to a class that will handle the request
 * 
 * @author Michel
 */
public class ServletsModule extends ServletModule {

    @Override
    protected void configureServlets() {
        serve("/ping").with(PingServlet.class);

        serve("/authenticate").with(AuthenticationServlet.class);

        serve("/project").with(ProjectServlet.class);
        
        // Register a new user account
        serve("/register").with(RegisterServlet.class);
        
        serve("/profile").with(ProfileServlet.class);

        serve("/confirmrequest").with(ConfirmRequestServlet.class);
        serve("/confirm").with(ConfirmServlet.class);

        serve("/resetrequest").with(PasswordResetRequestServlet.class);
        serve("/reset").with(PasswordResetServlet.class);

        serve("/createproject").with(ProjectCreationServlet.class);
        serve("/projectlink").with(ProjectLinkServlet.class);
        serve("/projecteditor").with(ProjectEditorServlet.class);

        serve("/public/profile").with(PublicProfileServlet.class);

        // Textile pages
        serve("/index", "/").with(TextileIndexServlet.class);
        serve("/public/license").with(TextileLicenseServlet.class);
        serve("/public/libraries").with(TextileLibrariesServlet.class);
        serve("/public/clientdownload").with(TextileClientDownloadServlet.class);
        serve("/public/clientinstructions").with(TextileClientInstructionsServlet.class);
        serve("/public/changelog").with(TextileChangeLogServlet.class);

        // Help
        serve("/public/help").with(HelpServlet.class);
        serve("/public/helpsearch").with(HelpSearchServlet.class);

        // OAuth
        serve("/oauth/newuser").with(NewOAuthUserServlet.class);
        // OAuth providers
        serve("/oauth/google").with(OAuthGoogleServlet.class);
        
        // API Endpoints
        // Get the time left in a session
        serve("/sessionapi").with(SessionStateServlet.class);      
        
        // COPPA support
        serve("/privacy-policy").with(PrivacyPolicyServlet.class);
    }

}
