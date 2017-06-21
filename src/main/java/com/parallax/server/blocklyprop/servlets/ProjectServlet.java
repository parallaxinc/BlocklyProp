/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.services.ProjectService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.shiro.authz.UnauthorizedException;

/**
 * Handler for the /project REST endpoint
 * 
 * @author Michel
 */
@Singleton
public class ProjectServlet extends HttpServlet {

    private ProjectService projectService;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        String clone = req.getParameter("clone");
        if (!Strings.isNullOrEmpty(clone)) {
            clone(Long.parseLong(clone), req, resp);
        }

        String delete = req.getParameter("delete");
        if (!Strings.isNullOrEmpty(delete)) {
            delete(Long.parseLong(delete), req, resp);
        }
    }

    private void clone(Long idProject, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            ProjectRecord clonedProject = projectService.cloneProject(idProject);
            if (clonedProject == null) {
                req.getRequestDispatcher("WEB-INF/servlet/project/not-authorized.jsp").forward(req, resp);
            } else {
                resp.sendRedirect("my/projects.jsp#" + clonedProject.getId());
            }
        } catch (NullPointerException npe) {
            req.getRequestDispatcher("WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        }
    }

    private void delete(Long idProject, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            try {
                ProjectRecord project = projectService.getProjectOwnedByThisUser(idProject);
                if (project == null) {
                    req.getRequestDispatcher("WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
                }
                projectService.deleteProject(idProject);
                resp.sendRedirect("my/projects.jsp");
            } catch (UnauthorizedException ue) {
                req.getRequestDispatcher("WEB-INF/servlet/project/not-authorized.jsp").forward(req, resp);
            }
        } catch (NullPointerException npe) {
            req.getRequestDispatcher("WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        }
    }

}
