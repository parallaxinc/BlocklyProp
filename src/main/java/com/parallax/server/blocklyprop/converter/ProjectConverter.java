/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.converter;

import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.generated.tables.pojos.Project;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.ProjectService;
import com.parallax.server.blocklyprop.services.ProjectSharingService;
import com.parallax.server.blocklyprop.services.UserService;
import com.parallax.server.blocklyprop.utils.DateConversion;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public class ProjectConverter {
    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(ProjectConverter.class);

    private ProjectDao projectDao;
    private UserService userService;
    private ProjectService projectService;
    private ProjectSharingService projectSharingService;

    @Inject
    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    @Inject
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Inject
    public void setProjectSharingService(ProjectSharingService projectSharingService) {
        this.projectSharingService = projectSharingService;
    }

    /**
     * 
     * @param project
     * @return 
     */
    public JsonObject toListJson(ProjectRecord project) {
        LOG.info("Converting project record to JSON list");
        
        JsonObject result = null;

        if (project != null) {
            result = new JsonObject();
            
            result.addProperty("id", project.getId());
            result.addProperty("name", project.getName());
            result.addProperty("description", project.getDescription());
            result.addProperty("type", project.getType().name());
            result.addProperty("board", project.getBoard());
            result.addProperty("private", project.getPrivate());
            result.addProperty("shared", project.getShared());
            result.addProperty("created", DateConversion.toDateTimeString(project.getCreated().getTime()));
            result.addProperty("modified", DateConversion.toDateTimeString(project.getModified().getTime()));
        
            boolean isYours = project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
            result.addProperty("yours", isYours);

            // Get user screen name only if it's a registered user
            if (project.getId() > 0) {
                result.addProperty("user", userService.getUserScreenName(project.getIdUser()));
                result.addProperty("id-user", project.getIdUser());
            }
            else {
                result.addProperty("user", "anonymous");
                result.addProperty("id-user", 0);
            }
        } else {
            LOG.error("Cannot convert a null project to JSON");
        }

        return result;
    }

    public JsonObject toJson(ProjectRecord project) {
        LOG.info("Converting project record to JSON object");
        
        JsonObject result = new JsonObject();
        result.addProperty("id", project.getId());
        result.addProperty("name", project.getName());
        result.addProperty("description", project.getDescription());
        result.addProperty("description-html", project.getDescriptionHtml());
        result.addProperty("type", project.getType().name());
        result.addProperty("board", project.getBoard());
        result.addProperty("private", project.getPrivate());
        result.addProperty("shared", project.getShared());
        result.addProperty("created", DateConversion.toDateTimeString(project.getCreated().getTime()));
        result.addProperty("modified", DateConversion.toDateTimeString(project.getModified().getTime()));
        boolean isYours = project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
        result.addProperty("yours", isYours);
        result.addProperty("user", userService.getUserScreenName(project.getIdUser()));
        if (isYours) {
            List<ProjectSharingRecord> projectSharingRecords = projectSharingService.getSharingInfo(project.getId());
            if (projectSharingRecords != null && !projectSharingRecords.isEmpty()) {
                result.addProperty("share-key", projectSharingRecords.get(0).getSharekey());
            }
        }

        if (project.getBasedOn() != null) {
            JsonObject basedOn = new JsonObject();
            ProjectRecord basedOnProject = projectDao.getProject(project.getBasedOn());
            if (basedOnProject != null) {
                basedOn.addProperty("id", basedOnProject.getId());
                basedOn.addProperty("name", basedOnProject.getName());
                boolean basedOnProjectisYours = basedOnProject.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
                basedOn.addProperty("yours", basedOnProjectisYours);
                if (!isYours) {
                    basedOn.addProperty("user", userService.getUserScreenName(basedOnProject.getIdUser()));
                }
                result.add("basedOn", basedOn);
            }
        }

        return result;
    }

    public JsonObject toJson(Project project) {
        LOG.info("Converting project to JSON object");
        
        JsonObject result = new JsonObject();
        result.addProperty("id", project.getId());
        result.addProperty("name", project.getName());
        result.addProperty("description", project.getDescription());
        result.addProperty("description-html", project.getDescriptionHtml());
        result.addProperty("type", project.getType().name());
        result.addProperty("board", project.getBoard());
        result.addProperty("private", project.getPrivate());
        result.addProperty("shared", project.getShared());
        result.addProperty("modified", DateConversion.toDateTimeString(project.getModified().getTime()));
        boolean isYours = project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
        result.addProperty("yours", isYours);
        result.addProperty("user", userService.getUserScreenName(project.getIdUser()));

        if (project.getBasedOn() != null) {
            JsonObject basedOn = new JsonObject();
            ProjectRecord basedOnProject = projectDao.getProject(project.getBasedOn());
            if (basedOnProject != null) {
                basedOn.addProperty("id", basedOnProject.getId());
                basedOn.addProperty("name", basedOnProject.getName());
                boolean basedOnProjectisYours = basedOnProject.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
                basedOn.addProperty("yours", basedOnProjectisYours);
                if (!isYours) {
                    basedOn.addProperty("user", userService.getUserScreenName(basedOnProject.getIdUser()));
                }
                result.add("basedOn", basedOn);
            }
        }
        return result;
    }
}
