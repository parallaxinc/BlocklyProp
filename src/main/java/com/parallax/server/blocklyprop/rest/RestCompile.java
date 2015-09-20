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
import com.google.inject.Inject;
import com.parallax.client.cloudsession.CloudSessionBucketService;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
import com.parallax.client.cloudsession.exceptions.UnknownBucketTypeException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.apache.commons.configuration.Configuration;

/**
 *
 * @author Michel
 */
@Path("/compile")
@Group(name = "/compile", title = "Compiling")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestCompile {

    private CloudSessionBucketService bucketService;
    private Configuration configuration;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        bucketService = new CloudSessionBucketService(configuration.getString("cloudsession.baseurl"));
    }

    @GET
    @Detail("Test compile service")
    @Name("compile")
    @Produces("text/plain")
    public Response get(@QueryParam("test") String testString) {
        return Response.ok("Hello " + testString).build();
    }

    @POST
    @Path("/spin")
    @Detail("Spin compile")
    @Name("Spin")
    @Produces("text/json")
    public Response compileSpin(@QueryParam("id") Long idProject, @FormParam("code") String code) {
        Response response = checkLimiterBucket();
        if (response != null) {
            return response;
        }
        return Response.ok().build();
    }

    @POST
    @Path("/c")
    @Detail("C compile")
    @Name("C")
    @Produces("text/json")
    public Response compileC(@QueryParam("id") Long idProject, @FormParam("code") String code) {
        Response response = checkLimiterBucket();
        if (response != null) {
            return response;
        }
        return Response.ok().build();
    }

    protected Response checkLimiterBucket() {
        Long idUser = SecurityServiceImpl.getSessionData().getUser().getId();
        try {
            bucketService.consumeOne("compile", idUser);
            return null;
        } catch (UnknownUserIdException ex) {
            Logger.getLogger(RestCompile.class.getName()).log(Level.SEVERE, null, ex);
            return Response.status(Status.FORBIDDEN).build();
        } catch (UnknownBucketTypeException ex) {
            Logger.getLogger(RestCompile.class.getName()).log(Level.SEVERE, null, ex);
            return Response.status(Status.SERVICE_UNAVAILABLE).build();
        } catch (InsufficientBucketTokensException ex) {
            Logger.getLogger(RestCompile.class.getName()).log(Level.SEVERE, null, ex);
            return Response.status(Status.FORBIDDEN).build();
        } catch (EmailNotConfirmedException ex) {
            Logger.getLogger(RestCompile.class.getName()).log(Level.SEVERE, null, ex);
            return Response.status(Status.FORBIDDEN).build();
        } catch (UserBlockedException ex) {
            Logger.getLogger(RestCompile.class.getName()).log(Level.SEVERE, null, ex);
            return Response.status(Status.FORBIDDEN).build();
        }
    }
}
