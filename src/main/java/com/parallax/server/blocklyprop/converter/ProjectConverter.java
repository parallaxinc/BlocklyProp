/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.converter;

import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.generated.tables.pojos.Project;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.ProjectSharingService;
import com.parallax.server.blocklyprop.services.UserService;
import com.parallax.server.blocklyprop.utils.DateConversion;

import com.google.gson.JsonObject;
import com.google.inject.Inject;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Convert a ProjectRecord object into a JSON object
 * 
 * @author Michel
 */
public class ProjectConverter {

            
    // Application logging facility
    private static final Logger LOG = LoggerFactory.getLogger(ProjectConverter.class);

    private ProjectDao projectDao;
    private UserService userService;
    private ProjectSharingService projectSharingService;
    
    // Internal flag to enable/disable parent project details
    private Boolean includeParentProjectDetails = false;

    @Inject
    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    @Inject
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Inject
    public void setProjectSharingService(ProjectSharingService projectSharingService) {
        this.projectSharingService = projectSharingService;
    }

    
    /**
     * Convert a ProjectRecord to a JSON object
     * 
     * @param project is the ProjectRecord object to convert
     *
     * @return a JsonObject. The JsonObject may be empty if the source project was null
     */
    public JsonObject toListJson(ProjectRecord project) {

        LOG.debug("Converting a ProjectRecord to a Json object");

        if (project == null) {
            return new JsonObject();
        }

        // Load the core project details
        JsonObject result = addProjectRecordProperties(project);

        boolean isYours = project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
        result.addProperty("yours", isYours);

        // Get user screen name only if it's a registered user
        if (project.getId() > 0) {
            // Get the project owner's screen name
            String screenName = userService.getUserScreenName(project.getIdUser());
            result.addProperty("user",(screenName == "" ? "unknown" : screenName));

            // Add the project user's BP user id
            result.addProperty("id-user", project.getIdUser());
        }
        else {
            result.addProperty("user", "anonymous");
            result.addProperty("id-user", 0);
        }

        return result;
    }



    // TODO: Refactor code to eliminate the parent project details. We don't use it

    // Overrride method to provide option to turn off parent project details
    public JsonObject toJson(ProjectRecord project, Boolean includeParentDetails) {
        includeParentProjectDetails = includeParentDetails;
        return toJson(project);
    }
    
    // Overrride method to provide option to turn off parent project details
    public JsonObject toJson(Project project, Boolean includeParentDetails) {
        includeParentProjectDetails = includeParentDetails;
        return toJson(project);
    }

    
    /**
     * Convert a project record to a JSON payload
     * 
     * @param project is te source ProjectRecord object to convert
     *
     * @return A Json object that contains a set of properties that represent
     * the fields contained in the ProjectRecord object
     */
    public JsonObject toJson(ProjectRecord project) {
        LOG.debug("Converting a ProjectRecord object to JSON");

        if (project == null) {
            LOG.error("Received a null project. Unable to convert it to JSON");
            return new JsonObject();
        }

        JsonObject result = null;

        try {
            // Load the project fields into the Json object
            result = addProjectRecordProperties(project);


            // Does current user own this project?
            LOG.debug("Evaluating project owner");
            boolean isYours = project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
            LOG.debug("isYours = {}", isYours);
            
            result.addProperty("yours", isYours);
            result.addProperty("user", userService.getUserScreenName(project.getIdUser()));

            LOG.debug("Checking isYours State");
            
            // Obtain a project share key if it is available
            if (isYours) {
                
                LOG.debug("Retrieving the project sharing record for project {}",project.getId());

                List<ProjectSharingRecord> projectSharingRecords = 
                        projectSharingService.getSharingInfo(project.getId());

                LOG.debug("Checking results from project sharing request");

                if (projectSharingRecords == null) {
                    LOG.debug("The project sharing record is null.");
                    return result;
                }
                
                if (projectSharingRecords.isEmpty()) {
                    LOG.debug("The project sharing record is empty");
                    return result;
                }
                
                LOG.debug("Project shared key is {}", projectSharingRecords.get(0).getSharekey());
                
                if (projectSharingRecords != null && !projectSharingRecords.isEmpty()) {
                    LOG.debug("Adding shared key to the results");
                    result.addProperty("share-key", projectSharingRecords.get(0).getSharekey());
                }
            }

            LOG.debug("Include parent project details is {}", includeParentProjectDetails);
            
            if (includeParentProjectDetails) {
                // Look for parent project - WHY????
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
            }

            LOG.debug("Returning result: {}", result);
            
            return result;
        }
        
        catch (Exception ex) {
            LOG.error("Json Conversion failed with message: {}", ex.getMessage());
        }
        
        return result;
        
    }

    
    private JsonObject toJson(Project project) {

        boolean isYours = project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId());
        JsonObject result = addProperties(project);

        result.addProperty("yours", isYours);
        result.addProperty("user", userService.getUserScreenName(project.getIdUser()));

        if (includeParentProjectDetails) {
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
        }
        
        return result;
    }


    /**
     * Create a Json object representing a Project object.
     *
     * @param project is the Project object to translate
     *
     * @return a Json object that contains a collection of properties representing
     * the fields in the source Project object
     */
    private JsonObject addProperties(Project project) {

        JsonObject result = new JsonObject();

        try {
            result.addProperty("id", project.getId());
            result.addProperty("name", project.getName());
            result.addProperty("description", project.getDescription());
            result.addProperty("description-html", project.getDescriptionHtml());
            result.addProperty("type", project.getType().name());
            result.addProperty("board", project.getBoard());
            result.addProperty("private", project.getPrivate());
            result.addProperty("shared", project.getShared());
            result.addProperty("modified", DateConversion.toDateTimeString(project.getModified().getTime()));
            result.addProperty("settings", project.getSettings());
        }
        catch (Exception ex) {
            LOG.error("Exception {} detected.", ex.toString());
        }

        return result;
    }


    /**
     * Create a Json string representing a ProjectRecord object
     *
     * @param projectRecord is the ProjectRecord object to translate
     *
     * @return a Json object that contains a collection of properties representing
     * the fields in the ProjectRecord object
     */
    private JsonObject addProjectRecordProperties( ProjectRecord projectRecord) {

        JsonObject result = new JsonObject();

        try {
            result.addProperty("id", projectRecord.getId());
            result.addProperty("name", projectRecord.getName());
            result.addProperty("description", projectRecord.getDescription());
            result.addProperty("type", projectRecord.getType().name());
            result.addProperty("board", projectRecord.getBoard());
            result.addProperty("private", projectRecord.getPrivate());
            result.addProperty("shared", projectRecord.getShared());
            result.addProperty("created", DateConversion.toDateTimeString(projectRecord.getCreated().getTime()));
            result.addProperty("modified", DateConversion.toDateTimeString(projectRecord.getModified().getTime()));
            result.addProperty("settings", projectRecord.getSettings());
        }
        catch (Exception ex) {
            LOG.error("Exception {} detected.", ex.toString());
        }

        return result;
    }
}
