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
import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.parallax.client.cloudsession.CloudSessionLocalUserService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.objects.User;

import com.parallax.server.blocklyprop.services.UserService;

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
    private UserService userService;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        cloudSessionLocalUserService = new CloudSessionLocalUserService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
        cloudSessionUserService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }

    /**
     * Inject a user service object so we can update the screen name
     * @param userService
     */
    @Inject
    public void setUserService(UserService userService) {
        this.userService = userService;
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
            result.addProperty("message", "screen-name--missing");
            return Response.ok(result.toString()).build();
        } else {
            try {
                // Contact the cloud session server to update the user profile
                User user = cloudSessionUserService.changeUserInfo(id, screenname);
                if (user != null) {
                    // The update was successful, update the screen name in the
                    // blocklyprop user table
                    // TODO: Update the screen name field in blocklyprop.user table

                    Long idUser = userService.getIdUser(user.getId());
                    if (idUser > 0) {
                        userService.setScreenName(idUser, screenname);
                        LOG.info("Screen name for {} has been changed to {}", username, screenname);
                    }
                    else {
                        LOG.warn("Unable to locate blockly user record for cloudSession id {}", user.getId());
                    }

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
            } catch (EmailNotConfirmedException enc) {
                result.addProperty("success", false);
                result.addProperty("message", "email is not confirmed");
                return Response.ok(result.toString()).build();
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
