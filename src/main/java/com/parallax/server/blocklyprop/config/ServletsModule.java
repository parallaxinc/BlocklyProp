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

import com.parallax.server.blocklyprop.servlets.MessageOfTheDayServlet;

/**
 * Map each URI to a class that will handle the request
 * 
 * @author Michel
 */
public class ServletsModule extends ServletModule {

    @Override
    protected void configureServlets() {
        // Verify the app is alive
        serve("/ping").with(PingServlet.class);
        
        
        // Return the active Message of the Day, if one is active
        // This is currently throwing a NPE
        serve("/motd").with(MessageOfTheDayServlet.class);

        
        // Authentication service
        // TODO: Verify that this is used somewhere.The IDE says that
        // there are no references to it in the app.
        serve("/authenticate").with(AuthenticationServlet.class);

                
        // Register a new user account
        serve("/register").with(RegisterServlet.class);
        
        
        // User profile
        serve("/profile").with(ProfileServlet.class);

        
        // Confirm user account from email URL
        serve("/confirmrequest").with(ConfirmRequestServlet.class);
        
        
        // Confirm account registration request. Not sure how this is different
        // than the confirmrequest uri.
        // ---------------------------------------------------------------------
        serve("/confirm").with(ConfirmServlet.class);
        
        
        // Reset password request via email
        serve("/resetrequest").with(PasswordResetRequestServlet.class);
        
        
        // Reset user account password via the UI
        // ---------------------------------------------------------------------
        serve("/reset").with(PasswordResetServlet.class);

        
        // Manage project details
        serve("/project").with(ProjectServlet.class);
        
        
        //Create a new project record
        serve("/createproject").with(ProjectCreationServlet.class);
        
        
        // Maintain a publicly accessible URI for any specific projet
        serve("/projectlink").with(ProjectLinkServlet.class);
        
        
        // Load a project into the canvas
        serve("/projecteditor").with(ProjectEditorServlet.class);

        
        // Get public attributes of a user's profile
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
