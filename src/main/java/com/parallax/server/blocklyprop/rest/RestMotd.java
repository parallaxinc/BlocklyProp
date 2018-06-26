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
// import com.parallax.server.blocklyprop.TableOrder;
// import com.parallax.server.blocklyprop.TableSort;
// import com.parallax.server.blocklyprop.converter.ProjectConverter;
// import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.MotdService;
import java.util.List;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import org.apache.commons.configuration.Configuration;
import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



/**
 *
 * @author developer
 */

@Path("/motd")
@Group(name = "/motd", title = "Banner message management")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestMotd {
    
    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(RestMotd.class);
    
    
    // Connector to project services object
    private MotdService motdService;
    
    // Connector to project converter object
    // private ProjectConverter projectConverter;

    /**
     * Connect to the project service object
     * @param projectService 
     */
    @Inject
    public void setMotdService(MotdService motdService) {
        this.motdService = motdService;
    }

    /**
     * Connect to the project converter object
     * @param projectConverter 
     */
//    @Inject
//    public void setProjectConverter(ProjectConverter projectConverter) {
//        this.projectConverter = projectConverter;
//    }


    // Get a list of messages
    @GET
    @Path("/list")
    @Detail("Get all banner messages")
    @Name("ListMotd")
    @Produces("application/json")
    public Response get(
            @QueryParam("limit") @ParameterDetail("Number of rows to return") @M() Integer limit, 
            @QueryParam("offset") @ParameterDetail("Offset to next row returned") @M() Integer offset) {
        
        LOG.info("REST:/rest/motd/list/ Get request received");
        
        try {
            // Get the logged in user id for the current session
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
            
            if (idUser == 0) {
                // Current session is not logged in.
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            //Sanity checks - is the request reasonable
            if (limit == null)
                limit = 20;
            
            if (offset == null)
                offset = 0;

            
            List<MotdRecord> messages = 
                    projectService.getUserProjects(idUser, sort, order, limit, offset);
        
            int projectCount = projectService.countUserProjects(idUser);

            JsonObject result = new JsonObject();
            JsonArray jsonMessges = new JsonArray();
            
            for (MotdRecord msg: messages) {
                // add converter from a motd record to a json payload
                jsonMessges.add(result);
            }
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
