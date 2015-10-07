/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Inject;
import com.google.inject.Singleton;
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
        String projectName = req.getParameter("project-name");
        String boardType = req.getParameter("board-type");
        String projectDescription = req.getParameter("project-description");

        resp.setContentType("text/json");
        resp.getWriter().write("{}");
        //projectService.createProject();
    }

}
