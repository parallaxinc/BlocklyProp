/*
 * Copyright (c) 2019 Parallax Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
import com.parallax.server.blocklyprop.utils.RestProjectUtils;
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

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Manage requests for public projects
 *
 * @author Michel
 *
 * NOTE:
 * The concept of 'shared' projects has changed over time. A project
 * can be private or public. A project can also be associated with a
 * specific project sharing URL, regardless of its public/private status.
 */
@Path("/shared/project")
@Group(name = "/shared/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestSharedProject {

    /**
     * Get a connection to the logging system
     */
    private static final Logger LOG = LoggerFactory.getLogger(RestSharedProject.class);


    /**
     * Get a handle to project services
     */
    private ProjectService projectService;


    /**
     * Get a handle to a project converter
     */
    private ProjectConverter projectConverter;


    /**
     * Limit the number of records that can be returned in list functions
     */
    final int REQUEST_LIMIT = 100;


    /**
     * Inject project services
     *
     * @param projectService
     * An instance of the ProjectService object
     */
    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }


    /**
     * Inject project conversion services
     * @param projectConverter
     *
     * An instance of the ProjectConverter object
     */
    @Inject
    public void setProjectConverter(ProjectConverter projectConverter) {
        this.projectConverter = projectConverter;
    }


    /**
     * Return a list of community projects.
     * 
     * @param sort
     * The project field used to evaluate the sort
     *
     * @param order
     * Specify the sort order - ascending or descending
     *
     * @param limit
     * Specify the maximum number of rows to return
     *
     * @param offset
     * Specify the beginning row to return
     *
     * @return
     * Return a response object that contains either the data requested
     * or a JSON string containing the error details
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

        RestProjectUtils restProjectUtils = new RestProjectUtils();

        String endPoint = "REST:/shared/project/list/";
        LOG.info("{} endpoint activated", endPoint);

        // Sort flag evaluation
        if (!restProjectUtils.ValidateSortType(sort)) {
            LOG.warn("{} Sort parameter failed. Defaulting to sort by project name", endPoint);
            sort = TableSort.name;
        }

        // Sort order evaluation
        if (!restProjectUtils.ValidateSortOrder(order)) {
            LOG.warn("{} Sort order parameter failed. Defaulting to ascending order", endPoint);
            order = TableOrder.asc;
        }

        // Limit result set value
        if ( (limit == null) || (limit > REQUEST_LIMIT)) {
            LOG.info("{} Limit throttle to {} entries", endPoint, REQUEST_LIMIT);
            limit = REQUEST_LIMIT;
        }
        
        // Check ofset from the beginning of the record set
        if ((offset == null) || (offset < 0)) {
            offset = 0;
        }

        // Get a block of projects
        List<ProjectRecord> projects = projectService.getSharedProjects(sort, order, limit, offset);

        // Tell the caller that there is nothing to see here
        if (projects == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(
                returnProjectsJson(
                        projects,
                        projectService.countSharedProjects()))
                .build();
    }


    /**
     * Get a list of projects owned by a specific user
     *
     * @param sort
     * The project field used to evaluate the sort
     *
     * @param order
     * Specify the sort order - ascending or descending
     *
     * @param limit
     * Specify the maximum number of rows to return
     *
     * @param offset
     * Specify the beginning row to return
     *
     * @return
     * Return a response object that contains either the data requested
     * or a JSON string containing the error details
     */
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

        RestProjectUtils restProjectUtils = new RestProjectUtils();

        String endPoint = "REST:/shared/project/list/user/";
        LOG.info("{} Get request received for user '{}'", endPoint, idUser);

        // Sort flag evaluation
        if (!restProjectUtils.ValidateSortType(sort)) {
            LOG.warn("{} Sort parameter failed", endPoint);
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

        // Sort order evaluation
        if (!restProjectUtils.ValidateSortOrder(order)) {
            LOG.warn("{} Sort order parameter failed", endPoint);
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }

        // Limit result set value
        if ( (limit == null) || (limit > REQUEST_LIMIT)) {
            LOG.info("{} Limit throttle to {} entries", endPoint, REQUEST_LIMIT);
            limit = REQUEST_LIMIT;
        }

        // Check ofset from the beginning of the record set
        if ((offset == null) || (offset < 0)) {
            offset = 0;
        }

        List<ProjectRecord> projects = projectService.getSharedProjectsByUser(sort, order, limit, offset, idUser);

        // Tell the caller that there is nothing to see here
        if (projects == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(
                returnProjectsJson(
                        projects,
                        projectService.countSharedProjectsByUser(idUser)))
                .build();
    }


    /**
     *
     * @param authorization
     * Authorization header token
     *
     * @param timestamp
     * A timestamp
     *
     * @param idProject
     * The project key ID
     *
     * @return
     * Returns a Json string containing the project details
     */
    @GET
    @Path("/get/{id}")
    @Detail("Get project by id")
    @Name("Get project by id")
    @Produces("application/json")
    public Response get(
            @HeaderParam("X-Authorization") String authorization, 
            @HeaderParam("X-Timestamp") Long timestamp, 
            @PathParam("id") Long idProject) {

        String endPoint = "REST:/rest/shared/project/get/";
        LOG.info("{} Get request received for project '{}'", endPoint, idProject);
        
        try {
            ProjectRecord project = projectService.getProject(idProject);
            
            if (project == null) {
                LOG.info("project record was not found");
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            LOG.info("Converting project {} to JSON string", idProject);

            JsonObject result = projectConverter.toJson(project, false);

            LOG.info("{}" + idProject.toString() + "/ returning project {}.", endPoint, project.getId());

            return Response.ok(result.toString()).build();
        }
        catch (Exception e) {
            LOG.error("Exception in {} detected. Message is: {}", e.getClass(), e.getLocalizedMessage());
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }


    /**
     * Get project details, including the project code payload
     *
     * @param authorization
     * Request authorization header
     *
     * @param timestamp
     * A timestamp
     *
     * @param idProject
     * The project key ID
     *
     * @return
     * A string containing a Json object representing the requested project
     */
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


    /**
     * Iterate a list of projects into an array of Json objects
     *
     * @param projects
     * A List of ProjectRecord objects
     *
     * @param projectCount
     * The number of projects available. This may not be the same value as
     * the number of records contained in the passed list of ProjectRecords.
     *
     * @return
     * A String containing the array of the converted Json objects
     */
    private String returnProjectsJson(@NotNull List<ProjectRecord> projects, int projectCount) {
        JsonObject result = new JsonObject();
        JsonArray jsonProjects = new JsonArray();

        for (ProjectRecord project : projects) {
            jsonProjects.add(projectConverter.toListJson(project));
        }

        result.add("rows", jsonProjects);
        result.addProperty("total", projectCount);

        return result.toString();
    }

}
