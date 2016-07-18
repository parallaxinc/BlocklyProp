/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.converter.ProjectConverter;
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
public class ProjectEditorServlet extends HttpServlet {

    private ProjectService projectService;
    private ProjectConverter projectConverter;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Inject
    public void setProjectConverter(ProjectConverter projectConverter) {
        this.projectConverter = projectConverter;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idProjectString = req.getParameter("id");

        Long idProject = null;
        try {
            idProject = Long.parseLong(idProjectString);
        } catch (NumberFormatException nfe) {
            // Show error screen
            req.getRequestDispatcher("/WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        }

        ProjectRecord project = projectService.getProject(idProject);
        if (project == null) {
            // Project not found, or invalid share key
            req.getRequestDispatcher("/WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        } else {
            if (ProjectType.PROPC == project.getType()) {
                resp.sendRedirect(req.getContextPath() + "/editor/blocklyc.jsp?project=" + project.getId());
            } else if (ProjectType.SPIN == project.getType()) {
                resp.sendRedirect(req.getContextPath() + "/editor/blocklyspin.jsp?project=" + project.getId());
            }
        }
    }

}
