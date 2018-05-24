/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.rest;

import com.cuubez.visualizer.annotation.Detail;
import com.cuubez.visualizer.annotation.Group;
import com.cuubez.visualizer.annotation.HttpCode;
import com.cuubez.visualizer.annotation.Name;
import com.cuubez.visualizer.annotation.M;
import com.cuubez.visualizer.annotation.ParameterDetail;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.ProjectService;
import java.util.List;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * REST endpoints for project persistence
 * 
 * @author Michel
 */

@Path("/project")
@Group(name = "/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestProject {
    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(RestProject.class);

    // Connector to project services object
    private ProjectService projectService;
    
    // Connector to project converter object
    private ProjectConverter projectConverter;

    /**
     * Connect to the project service object
     * @param projectService 
     */
    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Connect to the project converter object
     * @param projectConverter 
     */
    @Inject
    public void setProjectConverter(ProjectConverter projectConverter) {
        this.projectConverter = projectConverter;
    }

    /**
     * Return a list of projects owned by the currently authenticated user.
     * 
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * 
     * @return JSON formatted list of project details
     */
    @GET
    @Path("/list")
    @Detail("Get all projects for the authenticated user")
    @Name("ListProjects")
    @Produces("application/json")
    public Response get(
            @QueryParam("sort") @ParameterDetail("Sort detail") @M() TableSort sort, 
            @QueryParam("order") @ParameterDetail("Sort order") @M() TableOrder order, 
            @QueryParam("limit") @ParameterDetail("Number of rows to return") @M() Integer limit, 
            @QueryParam("offset") @ParameterDetail("Offset to next row returned") @M() Integer offset) {
        
        LOG.info("REST:/rest/project/list/ Get request received");
        
        try {
            // Get the logged in user id for the current session
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
            
            if (idUser == 0) {
                // Current session is not logged in.
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            //Sanity checks - is the request reasonable
            if (sort == null)
                sort = TableSort.modified;
            
            if (order == null) 
                order = TableOrder.asc;
            
            if (limit == null)
                limit = 20;
            
            if (offset == null)
                offset = 0;

            List<ProjectRecord> userProjects = 
                    projectService.getUserProjects(idUser, sort, order, limit, offset);
        
            int projectCount = projectService.countUserProjects(idUser);

            JsonObject result = new JsonObject();
            JsonArray jsonProjects = new JsonArray();
            for (ProjectRecord project : userProjects) {
                jsonProjects.add(projectConverter.toListJson(project));
            }

            result.add("rows", jsonProjects);
            result.addProperty("total", projectCount);

            return Response.ok(result.toString()).build();
            }
        
        catch(Exception ex) {
            LOG.warn("Unable to process REST request.");
            LOG.warn("Error is {}", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GET
    @Path("/get/{id}")
    @Detail("Get project by id")
    @Name("Get project by id")
    @Produces("application/json")
    public Response get(@PathParam("id") @ParameterDetail("Project identifier") Long idProject) {

        LOG.info("REST:/rest/project/get/ Get request received for project '{}'", idProject);
        
        try {
            ProjectRecord project = projectService.getProject(idProject);

            if (project != null) {
                // Verify that the current user owns the requested project
                if (!project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId())) {
                    LOG.info("User not authorized to get project {}", idProject);
                    return Response.status(Response.Status.UNAUTHORIZED).build();
                }
            } else {
                LOG.info("Project {} was not found", idProject);
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            // The currect user owns this project
            JsonObject result = projectConverter.toJson(project,false);
            return Response.ok(result.toString()).build();
        }
        
        catch(Exception ex) {
            LOG.warn("Unable to process REST request.");
            LOG.warn("Error is {}", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update the code in an existing project.
     * 
     * This assumes that the project already exists. 
     * 
     * @param idProject
     * @param code
     * @return 
     */
    @POST
    @Path("/code")
    @Detail("Save project code")
    @Name("UpdateProjectCode")
    @Produces("application/json")
    public Response saveProjectCode(
            @FormParam("id") @ParameterDetail("Project identifier") @M() Long idProject, 
            @FormParam("code") @ParameterDetail("Project code") @M() String code) {
        
        LOG.info("REST:/rest/project/code/ POST request received for project '{}'", idProject);
        
        try {
            ProjectRecord savedProject = projectService.saveProjectCode(idProject, code);
            LOG.debug("Code for project {} has been saved", idProject);

            JsonObject result = projectConverter.toJson(savedProject,false);
            LOG.debug("Returning JSON: {}", result);

            result.addProperty("success", true);

            return Response.ok(result.toString()).build();
        } catch (AuthorizationException ae) {
            LOG.warn("Project code not saved. Not Authorized");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        catch (Exception ex) {
            LOG.error("General exception encountered. Message is: ", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/code-as")
    @Detail("Save project code")
    @Name("Save project code")
    @Produces("application/json")
    public Response saveProjectCodeAs(
            @FormParam("id") Long idProject, 
            @FormParam("code") String code, 
            @FormParam("name") String newName) {
        
        LOG.info("REST:/rest/project/code-as/ POST request received for project '{}'", idProject);

        try {
            LOG.info("Saving project '{}', '{}' as a new project", idProject, newName);

            ProjectRecord savedProject = projectService.saveProjectCodeAs(
                    idProject, 
                    code, 
                    newName);
            LOG.debug("Code for project {} has been saved as {}", idProject, newName);
            
            JsonObject result = projectConverter.toJson(savedProject,false);
            LOG.debug("Returning JSON: {}", result);

            result.addProperty("success", true);

            return Response.ok(result.toString()).build();
        } catch (AuthorizationException ae) {
            LOG.warn("Project code not saved. Not Authorized");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        catch (Exception ex) {
            LOG.error("General exception encountered. Message is: ", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/")
    @Detail("Save project")
    @Name("Save project")
    @Produces("application/json")
    public Response saveProject(
            @FormParam("id") Long idProject, 
            @FormParam("name") String name, 
            @FormParam("description") String description, 
            @FormParam("description-html") String descriptionHtml, 
            @FormParam("sharing") String projectSharing, 
            @FormParam("type") ProjectType type, 
            @FormParam("board") String board) {
        
        LOG.info("REST:/rest/project/ POST request received for project '{}'", idProject);

        try {
            boolean privateProject = false;
            boolean sharedProject = false;

            if ("private".equalsIgnoreCase(projectSharing)) {
                privateProject = true;
            } else if ("shared".equalsIgnoreCase(projectSharing)) {
                sharedProject = true;
            }

            ProjectRecord savedProject = projectService.saveProject(
                    idProject, 
                    name, 
                    description, 
                    descriptionHtml, 
                    privateProject, 
                    sharedProject, 
                    type, 
                    board);
            LOG.debug("Project {} has been saved.", idProject);

            JsonObject result = projectConverter.toJson(savedProject,false);
            LOG.debug("Returning JSON: {}", result);

            result.addProperty("success", true);

            return Response.ok(result.toString()).build();
        } catch (AuthorizationException ae) {
            LOG.warn("Project not saved. Not Authorized");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        catch (Exception ex) {
            LOG.error("General exception encountered. Message is: ", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
