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
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.services.ProjectService;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Michel
 */
@Path("/shared/project")
@Group(name = "/shared/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestSharedProject {
    private static final Logger LOG = LoggerFactory.getLogger(RestSharedProject.class);

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

    /**
     * Return a list of community projects.
     * 
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @return 
     */
    @GET
    @Path("/list")
    @Detail("Get all shared projects")
    @Name("Get all shared projects")
    @Produces("application/json")
    public Response get(
            @QueryParam("sort") TableSort sort, 
            @QueryParam("order") TableOrder order, 
            @QueryParam("limit") Integer limit, 
            @QueryParam("offset") Integer offset) {
        
        LOG.info("REST:/shared/project/list/ Get request received");

        List<ProjectRecord> projects 
                = projectService.getSharedProjects(sort, order, limit, offset);
        
        // Obtain a count of the total number of community projects available
        int projectCount = projectService.countSharedProjects();

        JsonObject result = new JsonObject();
        JsonArray jsonProjects = new JsonArray();
        
        for (ProjectRecord project : projects) {
            jsonProjects.add(projectConverter.toListJson(project));
        }

        result.add("rows", jsonProjects);
        result.addProperty("total", projectCount);

        return Response.ok(result.toString()).build();
    }

    @GET
    @Path("/list/user/{id}")
    @Detail("Get shared projects by user")
    @Name("Get shared projects by user")
    @Produces("application/json")
    public Response get(
            @QueryParam("sort") TableSort sort, 
            @QueryParam("order") TableOrder order, 
            @QueryParam("limit") Integer limit, 
            @QueryParam("offset") Integer offset, 
            @PathParam("id") Long idUser) {

        LOG.info("REST:/shared/project/list/user/ Get request received for user '{}'", idUser);

        List<ProjectRecord> projects = projectService.getSharedProjectsByUser(sort, order, limit, offset, idUser);
        int projectCount = projectService.countSharedProjectsByUser(idUser);

        JsonObject result = new JsonObject();
        JsonArray jsonProjects = new JsonArray();
        
        for (ProjectRecord project : projects) {
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
    public Response get(
            @HeaderParam("X-Authorization") String authorization, 
            @HeaderParam("X-Timestamp") Long timestamp, 
            @PathParam("id") Long idProject) {

        LOG.info("REST:/rest/shared/project/get/ Get request received for projecet '{}'", idProject);
        
        try {
            LOG.info("Getting project record.");
            ProjectRecord project = projectService.getProject(idProject);
            
            if (project == null) {
                LOG.info("project record was not found");
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            LOG.info("Converting project to JSON string");
            JsonObject result = projectConverter.toJson(project, false);
            LOG.info("REST: /get/" + idProject.toString() + "/ returning project {}.", project.getId());

            return Response.ok(result.toString()).build();
        }
        catch (Exception e) {
            LOG.error("Exception in {} detected. Message is: {}", e.getClass(), e.getLocalizedMessage());
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @GET
    @Path("/editor/{id}")
    @Detail("Get project by id for editor")
    @Name("Get project by id for editor")
    @Produces("application/json")
    public Response getEditor(
            @HeaderParam("X-Authorization") String authorization, 
            @HeaderParam("X-Timestamp") Long timestamp, 
            @PathParam("id") Long idProject) {
        
        LOG.info("REST:/rest/shared/project/editor/ Get request received for project '{}'", idProject);

        try {
            ProjectRecord project = projectService.getProject(idProject);

            if (project == null) {
                LOG.info("Project {} was not found.", idProject);
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            
            JsonObject result = projectConverter.toJson(project, false);
            result.addProperty("code", project.getCode());

            LOG.info("Returning meta data on project {}", idProject);
            return Response.ok(result.toString()).build();
        }
        catch (Exception e) {
            LOG.error("Exception in {} detected. Message is: {}", e.getClass(), e.getLocalizedMessage());
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

}
