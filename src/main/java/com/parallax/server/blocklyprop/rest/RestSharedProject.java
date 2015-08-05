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
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.ProjectService;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

/**
 *
 * @author Michel
 */
@Path("/shared/project")
@Group(name = "/shared/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestSharedProject {

    private ProjectService projectService;

    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GET
    @Path("/list")
    @Detail("Get all shared projects")
    @Name("Get all shared projects")
    @Produces("application/json")
    public Response get(@QueryParam("order") TableOrder order, @QueryParam("limit") Integer limit, @QueryParam("offset") Integer offset) {
        List<ProjectRecord> projects = projectService.getSharedProjects(order, limit, offset);
        int projectCount = projectService.countSharedProjects();

        JsonObject result = new JsonObject();
        JsonArray jsonProjects = new JsonArray();
        for (ProjectRecord project : projects) {
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

    @GET
    @Path("/editor/{id}")
    @Detail("Get project by id for editor")
    @Name("Get project by id for editor")
    @Produces("application/json")
    public Response getEditor(@PathParam("id") Long idProject) {
        ProjectRecord project = projectService.getProject(idProject);

        if (project != null) {
            if (!project.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId())) {
                Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        JsonObject result = ProjectConverter.toJson(project);
        result.addProperty("code", project.getCode());

        return Response.ok(result.toString()).build();
    }

}
