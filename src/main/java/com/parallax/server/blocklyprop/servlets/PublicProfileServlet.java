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

package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.server.blocklyprop.db.generated.tables.pojos.User;
import com.parallax.server.blocklyprop.services.UserService;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Get the public attributes of a user's profile
 * 
 * @author Michel
 */
@Singleton
public class PublicProfileServlet extends HttpServlet {

    private static final Logger LOG = LoggerFactory.getLogger(PublicProfileServlet.class);

    private UserService userService;
    private CloudSessionUserService cloudSessionUserService;

    @Inject
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        cloudSessionUserService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws
            ServletException, IOException {

        String idUserString = req.getParameter("id-user");
        Long idUser = null;
        
        LOG.info("REST:/public/profile/ Get request received for user '{}'", idUserString);

        try {
            if (Strings.isNullOrEmpty(idUserString)) {
                if (SecurityUtils.getSubject().isAuthenticated()) {
                    idUser = SecurityServiceImpl.getSessionData().getIdUser();
                } else {
                    LOG.warn("Getting current user while not authenticated");
                    resp.sendError(404);
                }
            } else {
                idUser = Long.parseLong(idUserString);
            }
        } catch (NumberFormatException nfe) {
            LOG.warn("id-user is not a valid number: {}", idUserString);
            resp.sendError(500);
        }
        try {

            User user = userService.getUser(idUser);
            if (user == null) {
                LOG.info("Get public profile for user {} (Does not exist!)", idUser);
                resp.sendError(404);
            }

            com.parallax.client.cloudsession.objects.User cloudSessionUser =
                    cloudSessionUserService.getUser(user.getIdcloudsession());

            // It is possible to receive an empty, non-null object
            if (cloudSessionUser == null) {
                LOG.warn("User object is null");
                resp.sendError(404, "User profile is unavailable");
            }
            if (cloudSessionUser.getScreenname() == null ) {
                LOG.warn("Unable to decode result from Cloud Session call");
                resp.sendError(404, "User object is empty");
            }

            req.setAttribute("screenname", cloudSessionUser.getScreenname());
            req.getRequestDispatcher("/WEB-INF/servlet/public-profile.jsp").forward(req, resp);
        }
        catch (EmailNotConfirmedException ex) {
            LOG.info("User email is unconfirmed cloud-session");
            resp.sendError(404);
        }
        catch (UnknownUserIdException ex) {
            LOG.info("User not known in cloud-session");
            resp.sendError(404);
        }
        catch (NullPointerException ex) {
            LOG.warn("Unexpected Null Pointer Exception encountered. Message is: {}", ex.getMessage());
            resp.sendError(404, "NPE error. User not found");
        }
        catch (ServerException ex) {
            LOG.error("Communication problem with Cloud-session", ex);
            resp.sendError(500);
        }
    }
}
