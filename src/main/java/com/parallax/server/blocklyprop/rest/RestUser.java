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
import com.parallax.server.blocklyprop.converter.UserConverter;
import com.parallax.server.blocklyprop.db.generated.tables.pojos.User;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;
import com.parallax.server.blocklyprop.services.UserService;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 *
 * @author Michel
 */
@Path("/user")
@Group(name = "/user", title = "User info")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestUser {

    private UserService userService;

    @Inject
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GET
    @Path("/")
    @Detail("Get all users")
    @Name("Get all users")
    @Produces("application/json")
    public Response get() {
        List<UserRecord> users = userService.getAllUsers();

        JsonArray result = new JsonArray();
        for (UserRecord user : users) {
            result.add(UserConverter.toJson(user));
        }

        return Response.ok(result.toString()).build();
    }

    @GET
    @Path("/{id}")
    @Detail("Get user by id")
    @Name("Get user by id")
    @Produces("application/json")
    public Response get(@PathParam("id") Long idUser) {
        User user = userService.getUser(idUser);

        JsonObject result = UserConverter.toJson(user);

        return Response.ok(result.toString()).build();
    }
}
