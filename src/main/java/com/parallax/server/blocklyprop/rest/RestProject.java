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
import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.ProjectService;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.apache.shiro.authz.AuthorizationException;

/**
 *
 * @author Michel
 */
@Path("/")
@Group(name = "/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestProject {

    private ProjectService projectService;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GET
    @Path("/project")
    @Detail("Get all projects for the authenticated user")
    @Name("Get all projects for the authenticated user")
    @Produces("application/json")
    public Response get() {
        List<ProjectRecord> userProjects = projectService.getUserProjects(BlocklyPropSecurityUtils.getCurrentUserId());

        JsonArray result = new JsonArray();
        for (ProjectRecord project : userProjects) {
            result.add(ProjectConverter.toJson(project));
        }

        return Response.ok(result.toString()).build();
    }

    @GET
    @Path("/project/{id}")
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
    @Path("/project/code/{id}")
    @Detail("Save project code")
    @Name("Save project code")
    @Consumes("text/plain")
    @Produces("application/json")
    public Response saveProjectCode(@PathParam("id") Long idProject, String code) {
        try {
            ProjectRecord saveCode = projectService.saveCode(idProject, code);
        } catch (AuthorizationException ae) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        return Response.ok().build();
    }

    @POST
    @Path("/project/{id}")
    @Detail("Save project")
    @Name("Save project")
    @Produces("application/json")
    public Response saveProject(@PathParam("id") Long idProject, @FormParam("name") String name, @FormParam("description") String description, @FormParam("private") boolean privateProject, @FormParam("shared") boolean sharedProject) {
        try {
            ProjectRecord updatedProject = projectService.updateProject(idProject, name, description, privateProject, sharedProject);
            JsonObject result = ProjectConverter.toJson(updatedProject);

            return Response.ok(result.toString()).build();
        } catch (AuthorizationException ae) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
