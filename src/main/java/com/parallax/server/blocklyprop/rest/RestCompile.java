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
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

/**
 *
 * @author Michel
 */
@Path("/compile")
@Group(name = "/compile", title = "Compiling")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestCompile {

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
        return Response.ok().build();
    }

    @POST
    @Path("/c")
    @Detail("C compile")
    @Name("C")
    @Produces("text/json")
    public Response compileC(@QueryParam("id") Long idProject, @FormParam("code") String code) {
        return Response.ok().build();
    }
}
