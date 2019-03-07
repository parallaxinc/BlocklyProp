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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Respond to REST /user endpoint requests
 *
 * @author Michel
 */
@Path("/user")
@Group(name = "/user", title = "User info")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestUser {

    // Logger handle
    private static final Logger LOG = LoggerFactory.getLogger(RestUser.class);

    private UserService userService;

    @Inject
    public void setUserService(UserService userService) {
        this.userService = userService;
    }


    /**
     * List of all user objects
     *
     * @return
     * Returns a list of all user objects.
     */
    @GET
//    @Path("/")
    @Detail("Get all users")
    @Name("Get all users")
    @Produces("application/json")
    public Response get() {
        //FixMe: Endpoint /rest/user/ returns a list of ALL users. This needs to be regulated.
        
        LOG.info("REST:/rest/user/ Get request received");
        JsonArray result = new JsonArray();
        List<UserRecord> users = userService.getAllUsers();

        if (users != null) {
            for (UserRecord user : users) {
                result.add(UserConverter.toJson(user));
            }
        }

        return Response.ok(result.toString()).build();
    }

    @GET
    @Path("/{id}")
    @Detail("Get user by id")
    @Name("Get user by id")
    @Produces("application/json")
    public Response get(@PathParam("id") Long idUser) {

        LOG.info("REST:/rest/user/{} Get request received", idUser);

        User user = userService.getUser(idUser);
        JsonObject result = UserConverter.toJson(user);

        return Response.ok(result.toString()).build();
    }
}
