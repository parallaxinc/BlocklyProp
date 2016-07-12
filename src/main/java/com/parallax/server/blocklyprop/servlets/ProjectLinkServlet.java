/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import com.parallax.server.blocklyprop.services.ProjectService;
import com.parallax.server.blocklyprop.services.ProjectSharingService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.shiro.authz.UnauthorizedException;

/**
 *
 * @author Michel
 */
@Singleton
public class ProjectLinkServlet extends HttpServlet {

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

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idProjectString = req.getParameter("id");
        String shareKey = req.getParameter("key");

        Long idProject = null;
        try {
            idProject = Long.parseLong(idProjectString);
        } catch (NumberFormatException nfe) {
            // Show error screen
            req.getRequestDispatcher("/WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        }

        ProjectRecord project = projectSharingService.getSharedProject(idProject, shareKey);
        if (project == null) {
            // Project not found, or invalid share key
            req.getRequestDispatcher("/WEB-INF/servlet/project/not-found.jsp").forward(req, resp);
        } else {
            JsonObject result = projectConverter.toJson(project);
            result.addProperty("code", project.getCode());
            req.setAttribute("project", result.toString());
            if (ProjectType.PROPC == project.getType()) {
                req.getRequestDispatcher("/WEB-INF/servlet/project/project-link-c.jsp").forward(req, resp);
            } else if (ProjectType.SPIN == project.getType()) {
                req.getRequestDispatcher("/WEB-INF/servlet/project/project-link-spin.jsp").forward(req, resp);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        String idProjectString = req.getParameter("id");
        String action = req.getParameter("action");

        Long idProject = null;
        try {
            idProject = Long.parseLong(idProjectString);
        } catch (NumberFormatException nfe) {
            resp.getWriter().write(createFailure("no-action").toString());
            return;
        }

        ProjectRecord project = null;
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

        if (Strings.isNullOrEmpty(action)) {
            resp.getWriter().write(createFailure("no-action").toString());
            return;
        }
        JsonObject jsonObject = new JsonObject();
        switch (action) {
            case "share":
                ProjectSharingRecord projectSharingRecord = projectSharingService.shareProject(idProject);
                jsonObject.addProperty("success", true);
                jsonObject.addProperty("share-key", projectSharingRecord.getSharekey());
                resp.getWriter().write(jsonObject.toString());
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
