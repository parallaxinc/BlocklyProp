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

/**
 *
 * @author Michel
 */
@Path("/project")
@Group(name = "/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestProject {

    private ProjectService projectService;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GET
    @Path("/list")
    @Detail("Get all projects for the authenticated user")
    @Name("Get all projects for the authenticated user")
    @Produces("application/json")
    public Response get(@QueryParam("order") TableOrder order, @QueryParam("limit") Integer limit, @QueryParam("offset") Integer offset) {
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        List<ProjectRecord> userProjects = projectService.getUserProjects(idUser, order, limit, offset);
        int projectCount = projectService.countUserProjects(idUser);

        JsonObject result = new JsonObject();
        JsonArray jsonProjects = new JsonArray();
        for (ProjectRecord project : userProjects) {
            jsonProjects.add(ProjectConverter.toJson(project));
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
        ProjectRecord project = projectService.getProject(idProject);

        if (project != null) {
            if (!project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId())) {
                Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        JsonObject result = ProjectConverter.toJson(project);

        return Response.ok(result.toString()).build();
    }

    @POST
    @Path("/code")
    @Detail("Save project code")
    @Name("Save project code")
    @Produces("application/json")
    public Response saveProjectCode(@PathParam("id") Long idProject, @FormParam("name") String name, @FormParam("description") String description, @FormParam("private") Boolean privateProject, @FormParam("shared") Boolean sharedProject, @FormParam("type") ProjectType type, @FormParam("board") String board, @FormParam("code") String code) {
        try {
            ProjectRecord savedProject = projectService.saveProjectWithCode(idProject, name, description, privateProject, sharedProject, type, code);
            JsonObject result = ProjectConverter.toJson(savedProject);

            result.addProperty("success", true);

            return Response.ok(result.toString()).build();
        } catch (AuthorizationException ae) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @POST
    @Path("/")
    @Detail("Save project")
    @Name("Save project")
    @Produces("application/json")
    public Response saveProject(@FormParam("id") Long idProject, @FormParam("name") String name, @FormParam("description") String description, @FormParam("private") boolean privateProject, @FormParam("shared") boolean sharedProject, @FormParam("type") ProjectType type) {
        try {
            ProjectRecord savedProject = projectService.saveProject(idProject, name, description, privateProject, sharedProject, type);
            JsonObject result = ProjectConverter.toJson(savedProject);

            result.addProperty("success", true);

            return Response.ok(result.toString()).build();
        } catch (AuthorizationException ae) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
