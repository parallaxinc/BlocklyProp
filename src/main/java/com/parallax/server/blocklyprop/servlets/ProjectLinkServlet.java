/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import com.parallax.server.blocklyprop.services.ProjectService;
import com.parallax.server.blocklyprop.services.ProjectSharingService;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.IOException;
import java.util.Base64;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.shiro.authz.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Manage project link URI for a project
 * 
 * @author Michel
 */
@Singleton
public class ProjectLinkServlet extends HttpServlet {
    private static final Logger LOG = LoggerFactory.getLogger(ProjectLinkServlet.class);

    private ProjectService projectService;
    private ProjectSharingService projectSharingService;
    private ProjectConverter projectConverter;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Inject
    public void setProjectSharingService(ProjectSharingService projectSharingService) {
        this.projectSharingService = projectSharingService;
    }

    @Inject
    public void setProjectConverter(ProjectConverter projectConverter) {
        this.projectConverter = projectConverter;
    }

    /**
     * Process a get request to the endpoint /projectlink
     * 
     * @param req
     * @param resp
     * 
     * @throws ServletException
     * @throws IOException 
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        LOG.info("REST:/projectlink/ Get request received");

        // Project ID
        String idProjectString = req.getParameter("id");
        
        // Share key token
        String shareKey = req.getParameter("key");

        Long idProject = null;
        
        // Convert the project id from a string to a long
        try {
            idProject = Long.parseLong(idProjectString);
        } catch (NumberFormatException nfe) {
            // Show error screen
            req.getRequestDispatcher("/WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        }
        
        LOG.debug("Get project link for project {}.",idProject);
        
        // Retreive the project. Project meta data will be retruned if the project exists
        // and the project share key is known and active
        ProjectRecord project = projectSharingService.getSharedProject(idProject, shareKey);
        
        if (project == null) {
            // Project not found, or invalid share key
            LOG.debug("Unable to retrieve parent project");
            req.getRequestDispatcher("/WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        } else {
            LOG.debug("Found the project {}", project.getId());
            
            // Add project meta data to result object
            JsonObject result = projectConverter.toJson(project,false);
            
            LOG.debug("Converted project {} to Json: {}",project.getId(), result );

            // Add the project code block to the result object
            result.addProperty("code", project.getCode());

            //Convert result to base64
            byte[] projectBytes = Base64.getEncoder().encode(result.toString().getBytes());
            
            req.setAttribute("project", new String(projectBytes));
            req.getRequestDispatcher("/editor/blocklyc.jsp").forward(req, resp);
        }
    }

    
    /**
     * 
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException 
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        LOG.info("REST:/projectlink/ POST request received");
        
        resp.setContentType("application/json");
        String idProjectString = req.getParameter("id");
        String action = req.getParameter("action");
        Long idProject = null;
        ProjectRecord project = null;

        LOG.debug("Posting shared link service request");
        
        // Convert project id into a long
        try {
            idProject = Long.parseLong(idProjectString);
        } catch (NumberFormatException nfe) {
            resp.getWriter().write(createFailure("no-action").toString());
            return;
        }

        // What work needs to be done (share, revoke)?
        if (Strings.isNullOrEmpty(action)) {
            resp.getWriter().write(createFailure("no-action").toString());
            return;
        }

        // Retieve the requested project
        try {
            project = projectService.getProject(idProject);
            if (project == null) {
                resp.getWriter().write(createFailure("project-does-not-exist").toString());
                return;
            }
        } catch (UnauthorizedException ue) {
            resp.getWriter().write(createFailure("not-your-project").toString());
            return;
        }
        
        JsonObject jsonObject = new JsonObject();

        switch (action) {
            case "share":
                // Make the project sharing record active.
                ProjectSharingRecord projectSharingRecord = projectSharingService.shareProject(idProject);
                if (projectSharingRecord == null) {
                    LOG.error("Unable to activate a project sharing record for project {}.", idProject);
                    resp.getWriter().write(createFailure("no-action").toString());
                } else {
                jsonObject.addProperty("success", true);
                jsonObject.addProperty("share-key", projectSharingRecord.getSharekey());
                resp.getWriter().write(jsonObject.toString());
                }
                break;

            case "revoke":
                projectSharingService.revokeSharing(idProject);
                jsonObject.addProperty("success", true);
                resp.getWriter().write(jsonObject.toString());
                break;
            default:
                resp.getWriter().write(createFailure("unknown-action").toString());
        }
    }

    private static JsonObject createFailure(String messageCode) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);
        jsonObject.addProperty("code", messageCode);
        return jsonObject;
    }
}
