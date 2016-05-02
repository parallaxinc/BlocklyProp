/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.CloudSessionUserService;
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
 *
 * @author Michel
 */
@Singleton
public class PublicProfileServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(PublicProfileServlet.class);

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
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idUserString = req.getParameter("id-user");
        Long idUser = null;
        try {
            if (Strings.isNullOrEmpty(idUserString)) {
                if (SecurityUtils.getSubject().isAuthenticated()) {
                    idUser = SecurityServiceImpl.getSessionData().getIdUser();
                } else {
                    log.info("Getting current user while not authenticated");
                    resp.sendError(404);
                }
            } else {
                idUser = Long.parseLong(idUserString);
            }
        } catch (NumberFormatException nfe) {
            log.info("id-user is not a valid number: {}", idUserString);
            resp.sendError(500);
        }
        try {

            User user = userService.getUser(idUser);
            if (user == null) {
                log.info("Get public profile for user {} (Does not exist!)", idUser);
                resp.sendError(404);
                return;
            }

            log.info("Get public profile for user {}: Cloud-session user: {}", idUser, user.getIdcloudsession());
            com.parallax.client.cloudsession.objects.User cloudSessionUser = cloudSessionUserService.getUser(user.getIdcloudsession());

            req.setAttribute("screenname", cloudSessionUser.getScreenname());
            req.getRequestDispatcher("/WEB-INF/servlet/public-profile.jsp").forward(req, resp);
        } catch (UnknownUserIdException ex) {
            log.info("User not known in cloud-session");
            resp.sendError(404);
        } catch (ServerException ex) {
            log.error("Communication problem with Cloud-session", ex);
            resp.sendError(500);
        }

    }

}
