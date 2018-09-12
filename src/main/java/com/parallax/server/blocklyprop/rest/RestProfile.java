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
import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.parallax.client.cloudsession.CloudSessionLocalUserService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.client.cloudsession.objects.User;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Path("/profile")
@Group(name = "/profile", title = "Change profile info")
@HttpCode("500>Internal Server Error,200>Success Response")
public class RestProfile {

    private static final Logger LOG = LoggerFactory.getLogger(RestProfile.class);

    private CloudSessionLocalUserService cloudSessionLocalUserService;
    private CloudSessionUserService cloudSessionUserService;
    private Configuration configuration;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        cloudSessionLocalUserService = new CloudSessionLocalUserService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
        cloudSessionUserService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }

    @POST
    @Path("/base")
    @Detail("Save base profile data")
    @Name("Save base profile data")
    @Produces("application/json")
    public Response saveBase(
            @FormParam("id") Long id, 
            @FormParam("username") String username, 
            @FormParam("password") String password, 
            @FormParam("screenname") String screenname) {
        
        LOG.info("REST:/rest/profile/base/ Post request received");

        JsonObject result = new JsonObject();
        if (Strings.isNullOrEmpty(screenname)) {
            result.addProperty("success", false);
            result.addProperty("message", "fields-missing");
            return Response.ok(result.toString()).build();
        } else {
            try {
                User user = cloudSessionUserService.changeUserInfo(id, screenname);
                if (user != null) {
                    result.addProperty("success", true);
                    result.addProperty("screenname", user.getScreenname());
                    return Response.ok(result.toString()).build();
                } else {
                    result.addProperty("success", false);
                    result.addProperty("message", "could-not-change");
                    return Response.ok(result.toString()).build();
                }
            } catch (UnknownUserIdException uuie) {
                result.addProperty("success", false);
                result.addProperty("message", "unknown-user");
                return Response.ok(result.toString()).build();
            } catch (ScreennameUsedException sue) {
                result.addProperty("success", false);
                result.addProperty("message", "screenname-used");
                return Response.ok(result.toString()).build();
            } catch (ServerException se) {
                result.addProperty("success", false);
                result.addProperty("message", "server-error");
                return Response.ok(result.toString()).build();
            }
        }
    }

    @POST
    @Path("/password")
    @Detail("Save password data")
    @Name("Save password data")
    @Produces("application/json")
    public Response savePassword(
            @FormParam("id") Long id, 
            @FormParam("username") String username, 
            @FormParam("oldpassword") String oldPassword, 
            @FormParam("password") String password, 
            @FormParam("confirmpassword") String confirmPassword) {

        LOG.info("REST:/rest/profile/password/ Post request received");

        JsonObject result = new JsonObject();

        if (Strings.isNullOrEmpty(oldPassword) || Strings.isNullOrEmpty(password) || Strings.isNullOrEmpty(confirmPassword)) {
            result.addProperty("success", false);
            result.addProperty("message", "fields-missing");
            return Response.ok(result.toString()).build();
        } else if (!password.equals(confirmPassword)) {
            result.addProperty("success", false);
            result.addProperty("message", "passwords-not-matching");
            return Response.ok(result.toString()).build();
        } else {
            try {
                if (cloudSessionLocalUserService.changePassword(id, oldPassword, password, confirmPassword)) {
                    result.addProperty("success", true);
                    return Response.ok(result.toString()).build();
                } else {
                    result.addProperty("success", false);
                    result.addProperty("message", "could-not-change");
                    return Response.ok(result.toString()).build();
                }
            } catch (UnknownUserIdException uuie) {
                result.addProperty("success", false);
                result.addProperty("message", "unknown-user");
                return Response.ok(result.toString()).build();
            } catch (PasswordVerifyException pve) {
                result.addProperty("success", false);
                result.addProperty("message", "password-not-valid");
                return Response.ok(result.toString()).build();
            } catch (ServerException se) {
                result.addProperty("success", false);
                result.addProperty("message", "server-error");
                return Response.ok(result.toString()).build();
            } catch (PasswordComplexityException pce) {
                result.addProperty("success", false);
                result.addProperty("message", "password-complexity");
                return Response.ok(result.toString()).build();
            } catch (WrongAuthenticationSourceException ex) {
                LOG.warn("Trying to change password of non local user!");
                result.addProperty("success", false);
                result.addProperty("message", "server-error");
                return Response.ok(result.toString()).build();
            }
        }
    }

}
