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
import com.parallax.client.cloudcompiler.CCloudCompileService;
import com.parallax.client.cloudcompiler.SpinCloudCompileService;
import com.parallax.client.cloudcompiler.objects.CompilationException;
import com.parallax.client.cloudcompiler.objects.CompilationResult;
import com.parallax.client.cloudcompiler.objects.CompileAction;
import com.parallax.client.cloudsession.CloudSessionBucketService;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
import com.parallax.client.cloudsession.exceptions.UnknownBucketTypeException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Path("/compile")
@Group(name = "/compile", title = "Compiling")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestCompile {

    private Logger LOG = LoggerFactory.getLogger(RestCompile.class);

    private CloudSessionBucketService bucketService;
    private CCloudCompileService cCloudCompileService;
    private SpinCloudCompileService spinCloudCompileService;
    private Configuration configuration;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        bucketService = new CloudSessionBucketService(configuration.getString("cloudsession.baseurl"));

        cCloudCompileService = new CCloudCompileService(configuration.getString("cloudcompile.baseurl"));
        spinCloudCompileService = new SpinCloudCompileService(configuration.getString("cloudcompile.baseurl"));
    }

    @GET
    @Detail("Test compile service")
    @Name("compile")
    @Produces("text/plain")
    public Response get(@QueryParam("test") String testString) {
        return Response.ok("Hello " + testString).build();
    }

    @POST
    @Path("/spin/{action}")
    @Detail("Spin compile")
    @Name("Spin")
    @Produces("text/json")
    public Response compileSpin(@PathParam("action") CompileAction action, @QueryParam("id") Long idProject, @FormParam("code") String code) {
        Response response = checkLimiterBucket();
        if (response != null) {
            return response;
        }

        try {
            CompilationResult compilationResult = spinCloudCompileService.compileSingleSpin(action, code);

            return Response.ok().build();
        } catch (CompilationException ex) {
            LOG.warn("Compile {} {}", idProject, action, ex);
            return Response.ok().build();
        }
    }

    @POST
    @Path("/c/{action}")
    @Detail("C compile")
    @Name("C")
    @Produces("text/json")
    public Response compileC(@PathParam("action") CompileAction action, @QueryParam("id") Long idProject, @FormParam("code") String code) {
        Response response = checkLimiterBucket();
        if (response != null) {
            return response;
        }

        try {
            CompilationResult compilationResult = cCloudCompileService.compileSingleC(action, code);

            return Response.ok().build();
        } catch (CompilationException ex) {
            LOG.warn("Compile {} {}", idProject, action, ex);
            return Response.ok().build();
        }
    }

    protected Response checkLimiterBucket() {
        Long idUser = SecurityServiceImpl.getSessionData().getUser().getId();
        try {
            bucketService.consumeOne("compile", idUser);
            return null;
        } catch (UnknownUserIdException ex) {
            LOG.warn("Unknown user: {}", idUser, ex);
            return Response.status(Status.FORBIDDEN).build();
        } catch (UnknownBucketTypeException ex) {
            LOG.warn("Unknown bucket type: {}", "compile", ex);
            return Response.status(Status.SERVICE_UNAVAILABLE).build();
        } catch (InsufficientBucketTokensException ex) {
            LOG.warn("Insufficient bucket tokens: {}", ex.getNextTime(), ex);
            return Response.status(Status.FORBIDDEN).build();
        } catch (EmailNotConfirmedException ex) {
            LOG.warn("Email not confirmed: {}", idUser, ex);
            return Response.status(Status.FORBIDDEN).build();
        } catch (UserBlockedException ex) {
            LOG.warn("User blocked: {}", idUser, ex);
            return Response.status(Status.FORBIDDEN).build();
        }
    }
}
