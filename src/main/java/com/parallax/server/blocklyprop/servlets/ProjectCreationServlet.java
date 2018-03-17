/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.services.ProjectService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * REST endpoint handler for 'createproject' URI
 * 
 * @author Michel
 */
@Singleton
public class ProjectCreationServlet extends HttpServlet {
    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(ProjectCreationServlet.class);

    private ProjectService projectService;
    
    
    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    /*
     * Update user
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        LOG.info("REST:createproject ({})",req.getParameter("project-name") );

        resp.setContentType("text/json");
        JsonObject result = new JsonObject();

        String projectName = req.getParameter("project-name");
        String boardType = req.getParameter("board-type");
        String projectDescription = req.getParameter("project-description");
        String projectDescriptionHtml = req.getParameter("project-description-html");
        String projectTypeString = req.getParameter("project-type");
        String sharing = req.getParameter("sharing");

        boolean privateProject = "private".equalsIgnoreCase(sharing);
        boolean sharedProject = "shared".equalsIgnoreCase(sharing);

        // ProjectType can be on of two values; 'SPIN' or 'PROPC'
        ProjectType projectType = null;
        
        try {
            projectType = ProjectType.valueOf(projectTypeString);
            if (projectType == null) {
                // The project type we received is unknown.
                result.addProperty("success", false);
                result.addProperty("message", "Unknown Project Type " + projectTypeString );
                resp.getWriter().write(result.toString());
                return;
            }
        } catch (IllegalArgumentException iae) {
            // The project type was not supplied.
            result.addProperty("success", false);
            result.addProperty("message", "Invalid Project Type");
            resp.getWriter().write(result.toString());
            return;
        }

        try {
            // Create a new project for the logged in user
            ProjectRecord project = projectService.createProject(
                projectName, projectDescription, 
                projectDescriptionHtml, 
                privateProject, 
                sharedProject, 
                projectType, 
                boardType);
        
            result.addProperty("success", true);
            result.addProperty("id", project.getId());
        } catch (Exception ex) {
            result.addProperty("success", false);
            result.addProperty("message", "Unexpected error");
            resp.getWriter().write(result.toString());
            return;
        }

        // Return the result to the client
        resp.getWriter().write(result.toString());
    }

}
