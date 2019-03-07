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

import com.cuubez.visualizer.annotation.*;
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
import com.parallax.server.blocklyprop.utils.RestProjectUtils;

import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.commons.lang.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;

import org.jetbrains.annotations.NotNull;


/**
 * Version 2 REST endpoints for private project persistence. Access is limited to
 * authenticated users. Refer to the /shared/project/* endpoints for
 * public access to projects.
 *
 * @author Michel, J. Ewald
 *
 * @implNote
 *
 * Version 1 Supported endpoints:
 * [POST]  /project/            Save current project
 * [GET]   /project/list        List projects
 * [GET]   /project/get/{id}    Retrieve a project
 * [POST]  /project/code        Update project code
 * [POST]  /project/code-as     Create new project from existing project
 *
 * Version 2 supported endpoints
 * -----------------------------------------------------------------------------------------------------
 * CREATE
 * [POST]   /v2/project/            Creates a new project and returns it in the response body
 * [POST]   /v2/project/{id}        Creates a new project using the contents of the provided
 *                                  project id
 *
 * RETRIEVE
 * [GET]    /v2/project/            Returns a list of projects; parameters in request body
 * [GET]    /v2/project/{id}        Returns the specific project if authorized
 *
 * UPDATE
 * [PUT]    /v2/project/{id}        Updates s specific project. Project details are in the request body
 *
 * DELETE
 * [DELETE] /v2/project/{id}        Destroys the project specified by {id}
 * -----------------------------------------------------------------------------------------------------
 */

@Path("/v2/project")
@Group(name = "/project", title = "Project management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestV2Project {

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
     * Test endpoint to verify that the class is reachable
     *
     * @return a Json reply, 'Pong'
     */
    @GET
    @Path("/ping")
    @Detail("Testing for life on Mars")
    @Name("PingProjects")
    @Produces("application/json")
    public Response get() {
        return Response.ok("{\"result\": \"Pong\"}").build();
    }



    /**
     * Create a new project. Access is limited to authenticated users.
     *
     * @param projectName
     * is a required string parameter containing the project name
     *
     * @param description
     * is a required string parameter containing the project description
     *
     * @param descriptionHtml
     * is an optional parameter containing the HTML representation of the
     * project description
     *
     * @param code
     * is a required parameter containing the XML representation of the
     * project's code blocks
     *
     * @param projectSharing
     * is an optional parameter containing one of two possible strings;
     * 'private' or 'shared.
     *
     * The project will be marked as a public or community project only
     * if the 'shared' keyword value is supplied. Otherwise, if the
     * 'private' keyword is supplied or no keyword is supplied, the
     * project will be configured as a private project.
     *
     * @param type
     * is a required parameter indicating the project's source language, either
     * SPIN or PROPC.
     *
     * @param board
     * is a required parameter indicating the type of board used for the project.
     *
     * @param settings
     * is an optional parameter containing a Json encoded string of various
     * custom project settings.
     *
     * @return
     * Returns a Json string containing the project details, including the new
     * project ID if successful or an error message upon failure
     *
     * @implNote
     *
     *    VERB     URI                     Notes:
     *    -------  ----------------------  ----------------------------------------------
     *    [POST]   /v2/project/            Create a new project from the data provided.
     *                                     The service returns a Json string containing
     *                                     the new project details.
     *
     *      Return value in response body:
     *      {
     *          "id": 66,
     *          "name": "Chocolate Factory IV",
     *          "description": "Willie Wonka and the factory",
     *          "type": "PROPC",
     *          "board": "heb",
     *          "private": true,
     *          "shared": false,
     *          "created": "2019/02/28 06:36",
     *          "modified": "2019/02/28 06:36",
     *          "settings": null,
     *          "yours": true,
     *          "user": "demo-998",
     *          "success": true
     *      }
     *
     * @apiNote
     *
     * This endpoint could also handle the use case where the client wishes to
     * create a new copy of an existing project. There are two possible branches
     * in this expanded specification;
     *
     * 1) The existing project belongs to the current user.
     *
     * 2) The existing project is a) a community project or b) a shared project.
     *
     *  In both cases, a new project is created from the contents of the existing
     *  project. The new project is designated as 'private' and it's parent field
     *  is set to the project id of the source project.
     *
     *  TODO: Monitor hits/second from a single user to prevent malicious spamming
     */
    @POST
    @Detail("Create a new project")
    @Name("Create project")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProject(
            @FormParam("name") String projectName,
            @FormParam("description") String description,
            @FormParam("description-html") String descriptionHtml,
            @FormParam("code") String code,
            @FormParam("sharing") String projectSharing,
            @FormParam("type") ProjectType type,
            @FormParam("board") String board,
            @FormParam("settings") String settings) {

        LOG.info("REST:/rest/v2/project/ POST request received to create a new project '{}'", projectName);

        try {
            // Required fields
            Validate.notEmpty(projectName, "A project name is required.");
            Validate.notEmpty(description, "A project description is required.");
            Validate.notEmpty(code, "A project code block is required.");
            Validate.notNull(type, "The project type is required.");
            Validate.notEmpty(board, "The project board type is required.");

            boolean privateProject = false;
            boolean sharedProject = false;

            if ("private".equalsIgnoreCase(projectSharing)) {
                privateProject = true;
            } else if ("shared".equalsIgnoreCase(projectSharing)) {
                sharedProject = true;
            }

            // Validate the project type
            if (! RestProjectUtils.ValidateProjectType(type)) {
                return Response.status(Response.Status.NOT_ACCEPTABLE).build();
            }

            LOG.info("Parameters are valid. Saving the project");
            ProjectRecord savedProject = projectService.saveProject(
                    null, projectName, description, descriptionHtml, code,
                    privateProject, sharedProject, type, board, settings);

            if (savedProject == null) {
                LOG.warn("Unable to create a new project record");
            }

            JsonObject result = projectConverter.toJson(savedProject,false);
            result.addProperty("success", true);

            return Response.ok(result.toString()).build();
        }
        catch (NullPointerException ex) {
            LOG.warn("Null pointer exception detected. {}", ex.getMessage());
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        catch (IllegalArgumentException aex) {
            LOG.warn("Illegal argument exception detected. {}", aex.getMessage());
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        catch (AuthorizationException ae) {
            LOG.warn("Project not saved. Not Authorized");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        catch (Exception ex) {
            LOG.error("General exception encountered. Message is: ", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }





    /**
     * Create a new project based on an existing project. The resulting new
     * project will be placed in the logged in user's library as a private
     * project.
     *
     * @param idProject is the identifier of the project to use as a
     *                  source for the new project
     * @param projectName
     * is a required string parameter containing the project name
     *
     * @param description
     * is a required string parameter containing the project description
     *
     * @param descriptionHtml
     * is an optional parameter containing the HTML representation of the
     * project description
     *
     * @param code
     * is a required parameter containing the XML representation of the
     * project's code blocks
     *
     * @param type
     * is a required parameter indicating the project's source language, either
     * SPIN or PROPC.
     *
     * @param board
     * is a required parameter indicating the type of board used for the project.
     *
     * @param settings
     * is an optional parameter containing a Json encoded string of various
     * custom project settings.
     *
     * @return
     * Returns a Json string containing the project details, including the new
     * project ID if successful or an error message upon failure
     *
     * @implNote
     *
     *    VERB     URI                     Notes:
     *    -------  ----------------------  ----------------------------------------------
     *    [POST]   /v2/project/            Create a new project from the data provided.
     *                                     The service returns a Json string containing
     *                                     the new project details.
     *
     *      Return value in response body:
     *      {
     *          "id": 66,
     *          "name": "Chocolate Factory IV",
     *          "description": "Willie Wonka and the factory",
     *          "type": "PROPC",
     *          "board": "heb",
     *          "private": true,
     *          "shared": false,
     *          "created": "2019/02/28 06:36",
     *          "modified": "2019/02/28 06:36",
     *          "settings": null,
     *          "yours": true,
     *          "user": "demo-998",
     *          "success": true
     *      }
     *
     * @apiNote
     *
     * This endpoint could also handle the use case where the client wishes to
     * create a new copy of an existing project. There are two possible branches
     * in this expanded specification;
     *
     * 1) The existing project belongs to the current user.
     *
     * 2) The existing project is a) a community project or b) a shared project.
     *
     *  In both cases, a new project is created from the contents of the existing
     *  project. The new project is designated as 'private' and it's parent field
     *  is set to the project id of the source project.
     *
     *  TODO: Monitor hits/second from a single user to prevent malicious spamming
     */
    @POST
    @Path("/{id}")
    @Detail("Create a new copy of an existing project")
    @Name("Create project copy")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProjectCopy(
            @PathParam("id") @ParameterDetail("Project identifier") Long idProject,
            @FormParam("name") String projectName,
            @FormParam("description") String description,
            @FormParam("description-html") String descriptionHtml,
            @FormParam("code") String code,
            @FormParam("type") ProjectType type,
            @FormParam("board") String board,
            @FormParam("settings") String settings) {

        LOG.info("REST:/rest/v2/project/id POST request received to create a new project '{}'", projectName);

        /**
         * This method will retrieve the specified project, verify that it is either a
         * public (community) project or if it is a private project, is the project available
         * as a shared project.
         *
         * TODO: If we are cloning a shared project, should we require the shared project key?
         *  It look like we're creating a separate endpoint to accept a shared project token as
         *  the source project identifier.
         *
         */
        try {
            // Required fields
            Validate.notNull(idProject, "A parent project id is required.");

            /*
             * All of these parameters are optional. IF they are not provided,
             * the copy operation will take the settings from the original project
             *
             */

            LOG.info("Parameters are valid. Saving the project");

            ProjectRecord project = projectService.createProjectCopy(
                    idProject, projectName, description, descriptionHtml,
                    code, type, board, settings);

            LOG.info("Project created?");

            if (project == null) {
                LOG.warn("Unable to create a new project record");
            }

            JsonObject result = projectConverter.toJson(project,false);
            result.addProperty("success", true);

            return Response.ok(result.toString()).build();
        }
        catch (NullPointerException ex) {
            LOG.warn("Null pointer exception detected. {}", ex.getMessage());
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        catch (IllegalArgumentException aex) {
            LOG.warn("Illegal argument exception detected. {}", aex.getMessage());
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        catch (AuthorizationException ae) {
            LOG.warn("Project not saved. Not Authorized");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        catch (Exception ex) {
            LOG.error("General exception encountered. Message is: ", ex.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
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
     *
     * @implNote
     *
     *      VERB     URI                     Notes:
     *      -------  ----------------------  --------------------------------------
     *      [GET]    /v2/project/            Returns a list of projects; parameters
     *
     *      Sample output:
     *          {
     *              "rows": [
     *                 {
     *                     "id": 16,
     *                     "name": "XBee Sandbox",
     *                     "description": "Testing XBee blocks",
     *                     "type": "PROPC",
     *                     "board": "activity-board",
     *                     "private": false,
     *                     "shared": true,
     *                     "created": "2017/04/12 06:01",
     *                     "modified": "2018/10/18 04:06",
     *                     "settings": null,
     *                     "yours": true,
     *                     "user": "demo-998",
     *                     "id-user": 1
     *                 },
     *                 {
     *                     "id": 13,
     *                     "name": "TestIssue#886",
     *                     "description": "Testing pin dropdown.",
     *                     "type": "PROPC",
     *                     "board": "activity-board",
     *                     "private": true,
     *                     "shared": false,
     *                     "created": "2017/01/17 23:25",
     *                     "modified": "2017/01/17 23:25",
     *                     "settings": null,
     *                     "yours": true,
     *                     "user": "demo-998",
     *                     "id-user": 1
     *                  }
     *              ],
     *              "total": 41
     *              }
     *  ---------------------------------------------------------------------------------
     */
    @GET
    @Detail("Retrieve a list of projects for the authenticated user")
    @Name("ListProjects")
    @Produces("application/json")
    public Response get(
            @QueryParam("sort") @ParameterDetail("Sort detail") @M() TableSort sort,
            @QueryParam("order") @ParameterDetail("Sort order") @M() TableOrder order,
            @QueryParam("limit") @ParameterDetail("Number of rows to return") @M() Integer limit,
            @QueryParam("offset") @ParameterDetail("Offset to next row returned") @M() Integer offset) {

        String endPoint = "REST:/rest/v2/project/list/";
        LOG.info("{} Get request received", endPoint);

        try {
            LOG.debug("Requesting blockly user id");

            // Get the logged in user id for the current session
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();

            // Return UNAUTHORIZED if we cannot identify the current user. This could
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

            return Response.ok(
                    returnProjectsJson(
                            userProjects,
                            projectService.countUserProjects(idUser)))
                    .build();
        }
        catch(UnauthorizedException ex) {
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
     *
     * @implNote
     *
     *    VERB     URI                     Notes:
     *    -------  ----------------------  --------------------------------------
     *    [GET]    /v2/project/{id}        Returns a single projects based on the
     *                                     project ID received and the user is
     *                                     owner of the project.
     *
     *    Sample output:
     *
     *    {
     *        "id": 20,
     *        "name": "AB-Drive 360 Error",
     *        "description": "Testing a linking error that appears when the AB360 library is invoked.\nTesting search engine bits a little more.",
     *        "type": "PROPC",
     *        "board": "activity-board",
     *        "private": true,
     *        "shared": false,
     *        "created": "2017/10/27 16:50",
     *        "modified": "2018/10/17 19:22",
     *        "settings": "{\"settings\": {\"setting_1\": \"Always-ON\", \"setting-2\": \"false\", \"setting-3\": \"/cdn/bootloader\"}}",
     *        "yours": true,
     *        "user": "demo-998",
     *        "id-user": 1
     *    }
     *
     * ----------------------------------------------------------------------------------
     *
     */
    @GET
    @Path("/{id}")
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

            // The current user owns this project
            JsonObject result = projectConverter.toJson(project,false);
            result.addProperty("id-user", project.getIdUser());

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
             * This call can create a new project record under specific circumstances and does
             * not appear to provide any notification that this has occurred.
             * =================================================================================
             */
            ProjectRecord savedProject = projectService.saveProjectCode(idProject, code);

            LOG.debug("Code for project {} has been saved", idProject);
/*
            JsonObject result = projectConverter.toJson(savedProject,false);
            result.addProperty("success", true);
            return Response.ok(result.toString()).build();
*/
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





    /*-------------------------------------------------------------------------+
     * VERB     URI                     Notes:                                 |
     * -------  ----------------------  -------------------------------------- |
     * [POST]   /v2/project/            Creates a new project. The project     |
     *                                  details, including the new project ID, |
     *                                  are returned to the caller.            |
     *-------------------------------------------------------------------------*/







    /*
     * Update the details of an existing project  V1 implementation
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

/*
    @POST
//    @Path("/")
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

*/

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


