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
import com.cuubez.visualizer.annotation.M;
import com.cuubez.visualizer.annotation.ParameterDetail;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.inject.Inject;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.utils.RestProjectUtils;
import com.parallax.server.blocklyprop.converter.ProjectConverter;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.ProjectService;

import java.util.Arrays;
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
import org.apache.shiro.authz.UnauthorizedException;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * REST endpoints for project persistence
 * 
 * @author Michel
 *
 * @implNote
 *
 * Supported endpoints:
 * [POST]  /project/            Save current project
 * [GET]   /project/list        List projects
 * [GET]   /project/get/{id}    Retrieve a project
 * [POST]  /project/code        Update project code
 * [POST]  /project/code-as     Create new project from existing project
 *
 * The code block is not returned with most of these calls because it is only used when
 * the user is viewing or editing a project. This eliminates the unnecessary overhead of
 * moving a code block that could easily dwarf the size of the other elements in the project
 * record.
 */

@Path("/project")
@Group(name = "/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestProject {

    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(RestProject.class);


    // Connector to project services object
    private ProjectService projectService;
    

    //Connector to project converter object
    private ProjectConverter projectConverter;


    //Limit the number of records that can be returned in list functions
    private static final int REQUEST_LIMIT = 100;


    /**
     * Connect to the project service object
     *
     * @param projectService
     * An instance of the ProjectService object
     */
    @Inject
    public void setProjectService(ProjectService projectService) {
        this.projectService = projectService;
    }


    /**
     * Connect to the project converter object
     *
     * @param projectConverter
     * An instance of the ProjectConverter object
     */
    @Inject
    public void setProjectConverter(ProjectConverter projectConverter) {
        this.projectConverter = projectConverter;
    }


    /**
     * Return a list of projects owned by the currently authenticated user.
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
    @Detail("Retrieve a list of projects for the authenticated user")
    @Name("ListProjects")
    @Produces("application/json")
    public Response get(
            @QueryParam("sort") @ParameterDetail("Sort detail") @M() TableSort sort, 
            @QueryParam("order") @ParameterDetail("Sort order") @M() TableOrder order, 
            @QueryParam("limit") @ParameterDetail("Number of rows to return") @M() Integer limit, 
            @QueryParam("offset") @ParameterDetail("Offset to next row returned") @M() Integer offset) {

        String endPoint = "REST:/rest/project/list/";
        LOG.info("{} Get request received", endPoint);

        try {
            LOG.debug("Requesting blockly user id");

            // Get the logged in user id for the current session
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();

            // Return FORBIDDEN if we cannot identify the current user. This could
            // mean that the user is not logged in or that some underlying issue
            // is causing the authentication system to fail.
            LOG.info("Received blockly user id: {}", idUser);

            if (idUser == null || idUser == 0) {
                // Current session is not logged in.
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }

            //Sanity checks - is the request reasonable

            // Sort flag evaluation
            if (!RestProjectUtils.ValidateSortType(sort)) {
                LOG.warn("{} Sort parameter failed. Defaulting to sort by project name", endPoint);
                sort = TableSort.name;
            }

            // Sort order evaluation
            if (!RestProjectUtils.ValidateSortOrder(order)) {
                LOG.warn("{} Sort order parameter failed. Defaulting to ascending order", endPoint);
                order = TableOrder.asc;
            }

            // Limit result set value
            if ( (limit == null) || (limit > REQUEST_LIMIT)) {
                LOG.info("{} Limit throttle to {} entries", endPoint, REQUEST_LIMIT);
                limit = REQUEST_LIMIT;
            }

            // Check offset from the beginning of the record set
            if ((offset == null) || (offset < 0)) {
                offset = 0;
            }

            // Obtain a list of the user's projects
            List<ProjectRecord> userProjects = projectService.getUserProjects(idUser, sort, order, limit, offset);

            // Tell the caller that there is nothing to see here
            if (userProjects == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            LOG.info("Returning {} projects for user {}", userProjects.size(), idUser);

            return Response.ok(
                    returnProjectsJson(
                            userProjects,
                            projectService.countUserProjects(idUser)))
                    .build();
            }
        catch(UnauthorizedException ex) {
            // User is logged in but attempting to access a secured resource
            LOG.warn("Unauthorized access attempted");
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        catch(Exception ex) {
            LOG.warn("Unable to process REST request.");
            LOG.warn("Error is {}", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }


    /**
     * Retreive a project based on the supplied project ID
     *
     * @param idProject the project key ID
     *
     * @return
     * Return a string representation of the project in Json format if successful, otherwise
     * return a Json string containing an error status message
     */
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
     * @param idProject The project key ID
     * @param code the project blocks code string
     *
     * @return
     * Returns a Json string containing the project details if the update was successful
     * or an error message upon failure
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

            /* WARNING:
             * =================================================================================
             * The call to the saveProjectCode() method can create a new project record under
             * specific circumstances and does not appear to provide any notification that this
             * has occurred.
             * =================================================================================
             */
            ProjectRecord savedProject = projectService.saveProjectCode(idProject, code);

            LOG.debug("Code for project {} has been saved", idProject);
            return Response.ok(buildConvertedResponse(savedProject)).build();
        } catch (AuthorizationException ae) {
            LOG.warn("Project code not saved. Not Authorized");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        catch (Exception ex) {
            LOG.error("General exception encountered. Message is: ", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }


    /**
     * Create a new project from an existing project
     *
     * @param idProject The project key ID
     * @param code the project blocks code string
     * @param newName the name to assign to the newly created project
     * @param newBoard the board type assigned to the new project
     *
     * @return
     * Returns a Json string containing the project details if the update was successful
     * or an error message upon failure
     */
    @POST
    @Path("/code-as")
    @Detail("Save project code")
    @Name("Save project code")
    @Produces("application/json")
    public Response saveProjectCodeAs(
            @FormParam("id") Long idProject, 
            @FormParam("code") String code, 
            @FormParam("name") String newName,
            @FormParam("board") String newBoard) {
        
        LOG.info("REST:/rest/project/code-as/ POST request received for project '{}'", idProject);

        try {
            LOG.info("Saving project '{}', '{}' as a new project", idProject, newName);

            ProjectRecord savedProject = projectService.saveProjectCodeAs(
                    idProject, 
                    code, 
                    newName,
                    newBoard);

            LOG.debug("Code for project {} has been saved as {}", idProject, newName);
/*
            JsonObject result = projectConverter.toJson(savedProject,false);
            LOG.debug("Returning JSON: {}", result);
            result.addProperty("success", true);
            return Response.ok(result.toString()).build();
*/
            return Response.ok(buildConvertedResponse(savedProject)).build();
        }
        catch (AuthorizationException ae) {
            LOG.warn("Project code not saved. Not Authorized");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        catch (Exception ex) {
            LOG.error("General exception encountered. Message is: ", ex.getMessage());
            LOG.error("Error: {}", Arrays.toString(ex.getStackTrace()));
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }


    /**
     * Update the details of an existing project
     *
     * @param idProject the project key ID
     * @param name the name assigned to the project
     * @param description a text description of the project
     * @param descriptionHtml the same project description expressed in HTML
     * @param projectSharing a boolean flag indicating the public accessibility of the project
     * @param type is the classification of the project's language (c or spin)
     * @param board is the type of hardware associated with the project
     *
     * @return
     * Returns a Json string containing the project details if the update was successful
     * or an error message upon failure
     */
    @POST
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

        if (projects.size() > 0) {
            JsonArray jsonProjects = new JsonArray();

            for (ProjectRecord project : projects) {
                jsonProjects.add(projectConverter.toListJson(project));
            }

            result.add("rows", jsonProjects);
            result.addProperty("total", projectCount);
        }

        return result.toString();
    }



    /**
     * Convert a ProjectRecord to a Json string
     *
     * @param project is the project record to convert
     *
     * @return a Json string representing the project contents and the operation results message
     */
    private String buildConvertedResponse(ProjectRecord project) {

        /* Convert the project record to a Json object */
        JsonObject result = projectConverter.toJson(project,false);

        /* Add in a results message */
        result.addProperty("success", true);

        return result.toString();
    }

}
