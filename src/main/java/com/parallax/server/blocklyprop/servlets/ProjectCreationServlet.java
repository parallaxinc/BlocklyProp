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

/**
 *
 * @author Michel
 */
@Singleton
public class ProjectCreationServlet extends HttpServlet {

    private ProjectService projectService;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    /*
     * Update user
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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

        ProjectType projectType = null;
        try {
            projectType = ProjectType.valueOf(projectTypeString);
            if (projectType == null) {
                result.addProperty("success", false);
                result.addProperty("message", "Invalid projecttype");
                resp.getWriter().write(result.toString());
                return;
            }
        } catch (IllegalArgumentException iae) {
            result.addProperty("success", false);
            result.addProperty("message", "Invalid projecttype");
            resp.getWriter().write(result.toString());
            return;
        }

        ProjectRecord project = projectService.createProject(projectName, projectDescription, projectDescriptionHtml, privateProject, sharedProject, projectType, boardType);
        result.addProperty("success", true);
        result.addProperty("id", project.getId());
        resp.getWriter().write(result.toString());
    }

}
