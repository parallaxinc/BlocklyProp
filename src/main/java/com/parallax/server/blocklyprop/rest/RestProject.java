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

    @GET
    @Path("/list")
    @Detail("Get all projects for the authenticated user")
    @Name("Get all projects for the authenticated user")
    @Produces("application/json")
    public Response get(
            @QueryParam("sort") TableSort sort, 
            @QueryParam("order") TableOrder order, 
            @QueryParam("limit") Integer limit, 
            @QueryParam("offset") Integer offset) {
        
        if (sort == null) sort = TableSort.modified;
        if (order == null) order = TableOrder.asc;
        if (limit == null) limit = 20;
        if (offset == null) offset = 0;
        
        LOG.info("Retreiving project list");

        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
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

    @GET
    @Path("/get/{id}")
    @Detail("Get project by id")
    @Name("Get project by id")
    @Produces("application/json")
    public Response get(@PathParam("id") Long idProject) {
        LOG.info("Retreiving project {}", idProject);

        ProjectRecord project = projectService.getProject(idProject);

        if (project != null) {
            if (!project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId())) {
                LOG.info("User not authorized to get project {}", idProject);
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } else {
            LOG.info("Project {} was not found", idProject);
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        JsonObject result = projectConverter.toJson(project);
        LOG.debug("Returning JSON: {}", result);

        return Response.ok(result.toString()).build();
    }

    @POST
    @Path("/code")
    @Detail("Save project code")
    @Name("Save project code")
    @Produces("application/json")
    public Response saveProjectCode(
            @FormParam("id") Long idProject, 
            @FormParam("code") String code) {
        
        LOG.info("Saving project {} code", idProject);
        
        try {
            ProjectRecord savedProject = projectService.saveProjectCode(idProject, code);
            LOG.debug("Code for project {} has been saved", idProject);

            JsonObject result = projectConverter.toJson(savedProject);
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
        
        LOG.info("Saving project {} code as new {}", idProject, newName);

        try {
            ProjectRecord savedProject = projectService.saveProjectCodeAs(
                    idProject, 
                    code, 
                    newName);
            LOG.debug("Code for project {} has been saved as {}", idProject, newName);
            
            JsonObject result = projectConverter.toJson(savedProject);
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
    @Path("/board-as")
    @Detail("Save project code board")
    @Name("Save project code board")
    @Produces("application/json")
    public Response saveProjectCodeBoardAs(
            @FormParam("id") Long idProject, 
            @FormParam("code") String code, 
            @FormParam("name") String newName,
            @FormParam("board") String newBoard) {
        
        LOG.info("Saving project {} code as new {} for board {}", idProject, newName, newBoard);

        try {
            ProjectRecord savedProject = projectService.saveProjectCodeBoardAs(
                    idProject, 
                    code, 
                    newName,
                    newBoard);
            LOG.debug("Code for project {} has been saved as {} for board {}", idProject, newName, newBoard);
            
            JsonObject result = projectConverter.toJson(savedProject);
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
        
        LOG.info("Received POST REST call. Saving project {}.", idProject);

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

            JsonObject result = projectConverter.toJson(savedProject);
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
