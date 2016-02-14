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
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.parallax.client.cloudcompiler.CCloudCompileService;
import com.parallax.client.cloudcompiler.SpinCloudCompileService;
import com.parallax.client.cloudcompiler.objects.CompilationException;
import com.parallax.client.cloudcompiler.objects.CompilationResult;
import com.parallax.client.cloudcompiler.objects.CompileAction;
import com.parallax.client.cloudsession.CloudSessionBucketService;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownBucketTypeException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.server.blocklyprop.rest.typewrappers.CompileActionTypeWrapper;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import javax.servlet.http.HttpServletRequest;
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

    private final Logger LOG = LoggerFactory.getLogger(RestCompile.class);

    private CloudSessionBucketService bucketService;
    private CCloudCompileService cCloudCompileService;
    private SpinCloudCompileService spinCloudCompileService;
    private Configuration configuration;

    private Provider<HttpServletRequest> requestProvider;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        bucketService = new CloudSessionBucketService(configuration.getString("cloudsession.baseurl"));

        cCloudCompileService = new CCloudCompileService(configuration.getString("cloudcompiler.baseurl"));
        spinCloudCompileService = new SpinCloudCompileService(configuration.getString("cloudcompiler.baseurl"));
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
    //  @Consumes("text/plain")
    @Produces("application/json")
    public Response compileSpin(@PathParam("action") CompileActionTypeWrapper actionWrapper, @QueryParam("id") Long idProject, @FormParam("code") String code) {
        Response response = checkLimiterBucket();
        if (response != null) {
            return response;
        }

        try {
            return handleCompilationResult(actionWrapper.getAction(), spinCloudCompileService.compileSingleSpin(actionWrapper.getAction(), code));
        } catch (CompilationException ex) {
            LOG.warn("Compile spin {} {}", idProject, actionWrapper.getAction(), ex);
            return handleCompilationException(ex);
        } catch (com.parallax.client.cloudcompiler.exceptions.ServerException se) {
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/c/{action}")
    @Detail("C compile")
    @Name("C")
    @Produces("text/json")
    public Response compileC(@PathParam("action") CompileActionTypeWrapper actionWrapper, @QueryParam("id") Long idProject, @FormParam("code") String code) {
        Response response = checkLimiterBucket();
        if (response != null) {
            return response;
        }

        try {
            return handleCompilationResult(actionWrapper.getAction(), cCloudCompileService.compileSingleC(actionWrapper.getAction(), code));
        } catch (CompilationException ex) {
            LOG.warn("Compile c {} {}", idProject, actionWrapper.getAction());
            return handleCompilationException(ex);
        } catch (com.parallax.client.cloudcompiler.exceptions.ServerException se) {
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    protected Response handleCompilationResult(CompileAction action, CompilationResult compilationResult) {
        JsonObject json = new JsonObject();
        json.addProperty("error", false);
        json.addProperty("success", compilationResult.isSuccess());
        json.addProperty("compiler-output", compilationResult.getCompilerOutput());
        json.addProperty("compiler-error", compilationResult.getCompilerError());
        if (compilationResult.isSuccess() && action != CompileAction.COMPILE) {
            json.addProperty("binary", compilationResult.getBinary());
            json.addProperty("extension", compilationResult.getExtension());
        }
        return Response.ok(json.toString()).build();
    }

    protected Response handleCompilationException(CompilationException compilationException) {
        JsonObject json = new JsonObject();
        json.addProperty("error", true);
        json.addProperty("message", compilationException.getMessage());
        return Response.ok(json.toString()).build();
    }

    protected Response checkLimiterBucket() {
        Long idUser = SecurityServiceImpl.getSessionData().getUser().getId();
        try {
            bucketService.consumeOne("compile", idUser);
            return null;
        } catch (UnknownUserIdException ex) {
            LOG.warn("Unknown user: {}", idUser);
            return Response.status(Status.FORBIDDEN).build();
        } catch (UnknownBucketTypeException ex) {
            LOG.warn("Unknown bucket type: {}", "compile");
            return Response.status(Status.SERVICE_UNAVAILABLE).build();
        } catch (InsufficientBucketTokensException ex) {
            LOG.warn("Insufficient bucket tokens: {}", ex.getNextTime());
            return Response.status(Status.FORBIDDEN).build();
        } catch (EmailNotConfirmedException ex) {
            LOG.warn("Email not confirmed: {}", idUser);
            return Response.status(Status.FORBIDDEN).build();
        } catch (UserBlockedException ex) {
            LOG.warn("User blocked: {}", idUser);
            return Response.status(Status.FORBIDDEN).build();
        } catch (ServerException se) {
            LOG.warn("Server error: {}", idUser);
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
