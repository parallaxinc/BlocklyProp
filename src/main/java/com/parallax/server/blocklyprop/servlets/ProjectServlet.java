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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Clone or delete an existing project
 * 
 * @author Michel
 */
@Singleton
public class ProjectServlet extends HttpServlet {

    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(ProjectServlet.class);

    // Object to store the injected project service object
    private ProjectService projectService;


    /**
     * Inject  project services access
     *
     * @param projectService - object to hold injected service class
     */
    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }


    /**
     * Process an HTTP GET request
     *
     * @param request is an HttpServlet Request object
     * @param response is an HttpServlet Response object
     *
     * @throws ServletException panic if something goes wrong in the servlet code
     * @throws IOException - Really panic if there is an I/O issue.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        LOG.info("REST:/project/ Get request received");

        /* -----------------------------------------------------
         * The request object holds parameters that indicate the
         * action that is to be taken in this call. Each key is
         * paired with a value that contains the id of the project
         * to at upon.
         *
         * 'clone' - create a copy of the project specified
         * 'delete' - destroy the project specified. Note that this
         *            is only allowed if the currently logged in
         *            user owns the project to be destroyed.
         * ------------------------------------------------------*/
        String clone = request.getParameter("clone");

        if (!Strings.isNullOrEmpty(clone)) {
            clone(Long.parseLong(clone), request, response);
        }

        String delete = request.getParameter("delete");

        if (!Strings.isNullOrEmpty(delete)) {
            delete(Long.parseLong(delete), request, response);
        }
    }


    /**
     * Create a copy of an existing project and assign it to the currently logged in user
     *
     * @param idProject The primary key id of the project to copy
     * @param request   is an HttpServlet Request object
     * @param response  is an HttpServlet Response object
     *
     * @throws ServletException panic if something goes wrong in the servlet code
     * @throws IOException Really panic if there is an I/O issue.
     */
    private void clone(Long idProject, HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        LOG.info("Cloning project {}", idProject);
        
        try {
            ProjectRecord clonedProject = projectService.cloneProject(idProject);

            if (clonedProject == null) {
                request.getRequestDispatcher(
                        "WEB-INF/servlet/project/not-authorized.jsp").forward(request, response);
            } else {
                response.sendRedirect("my/projects.jsp#" + clonedProject.getId());
            }
        } catch (NullPointerException npe) {
            request.getRequestDispatcher("WEB-INF/servlet/project/not-found.jsp").forward(request, response);
        }
    }


    /**
     * Destroy an existing project only when the currently logged in user owns the target project
     *
     * @param idProject The primary key id of the project to copy
     * @param request is an HttpServlet Request object
     * @param response is an HttpServlet Response object
     * @throws ServletException panic if something goes wrong in the servlet code
     * @throws IOException Really panic if there is an I/O issue.
     */
    private void delete(Long idProject, HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
       LOG.info("Deleting project {}", idProject);
        
       try {
           ProjectRecord project = projectService.getProjectOwnedByThisUser(idProject);

           if (project == null) {
               request.getRequestDispatcher("WEB-INF/servlet/project/not-found.jsp").forward(request, response);
           }

           projectService.deleteProject(idProject);
           response.sendRedirect("my/projects.jsp");

       }
       catch (UnauthorizedException ue) {
           request.getRequestDispatcher("WEB-INF/servlet/project/not-authorized.jsp").forward(request, response);
       }
    }
}
