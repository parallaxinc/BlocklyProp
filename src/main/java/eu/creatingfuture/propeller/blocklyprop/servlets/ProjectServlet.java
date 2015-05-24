/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.servlets;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import eu.creatingfuture.propeller.blocklyprop.services.ProjectService;
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
public class ProjectServlet extends HttpServlet {

    private ProjectService projectService;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Create new project
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        ProjectRecord project = new ProjectRecord();
//        project.setCode("test");
        // projectDao.create(project);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("Project");
    }

}
