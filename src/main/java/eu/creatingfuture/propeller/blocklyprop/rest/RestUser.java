/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.rest;

import com.cuubez.visualizer.annotation.Detail;
import com.cuubez.visualizer.annotation.Group;
import com.cuubez.visualizer.annotation.HttpCode;
import com.cuubez.visualizer.annotation.Name;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.pojos.User;
import eu.creatingfuture.propeller.blocklyprop.services.UserService;
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
    @Path("/{id}")
    @Detail("Get user by id")
    @Name("Get user")
    @Produces("application/json")
    public Response get(@PathParam("id") Long idUser) {
        User user = userService.getUser(idUser);

        JsonObject result = new JsonObject();
        result.addProperty("id", user.getId());
        result.addProperty("screenname", user.getScreenname());
        result.addProperty("email", user.getEmail());
        result.addProperty("blocked", user.getBlocked());
        return Response.ok(result.toString()).build();
    }
}
