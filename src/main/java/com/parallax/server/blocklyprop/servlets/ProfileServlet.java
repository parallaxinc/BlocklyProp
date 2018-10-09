/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.CloudSessionLocalUserService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.SecurityService;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class ProfileServlet extends HttpServlet {

    private Logger LOG = LoggerFactory.getLogger(ProfileServlet.class);

    private CloudSessionLocalUserService cloudSessionLocalUserService;
    private CloudSessionUserService cloudSessionUserService;
    private Configuration configuration;

    private UserDao userDao;

    private SecurityService securityService;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        cloudSessionLocalUserService = new CloudSessionLocalUserService(configuration.getString("cloudsession.server"), configuration.getString("cloudsession.baseurl"));
        cloudSessionUserService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Inject
    public void setSecurityService(SecurityService securityService) {
        this.securityService = securityService;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        LOG.info("REST:/profile/ Get request received");

        User user = BlocklyPropSecurityUtils.getUserInfo();
        req.setAttribute("id", user.getId());
        req.setAttribute("email", user.getEmail());
        req.setAttribute("screenname", user.getScreenname());
        
        if ("local".equals(user.getAuthenticationSource())) {
            req.getRequestDispatcher("/WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
        } else {
            req.setAttribute("authentication-source", user.getAuthenticationSource());
            req.getRequestDispatcher("/WEB-INF/servlet/profile/profile-oauth.jsp").forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        LOG.info("REST:/profile/ Post request received");

        resp.setContentType("application/json");

        String unlock = req.getParameter("unlock");
        if (!Strings.isNullOrEmpty(unlock)) {
            unlock(req, resp);
            return;
        }
        
        String saveBase = req.getParameter("save-base");
        if (!Strings.isNullOrEmpty(saveBase)) {
            saveBase(req, resp);
            return;
        }
        
        String savePassword = req.getParameter("save-password");
        if (!Strings.isNullOrEmpty(savePassword)) {
            savePassword(req, resp);
            return;
        }
    }

    private void unlock(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        if (Strings.isNullOrEmpty(username) || Strings.isNullOrEmpty(password)) {
            resp.getWriter().write(createFailure("Invalid authentication").toString());
            return;
        } else {
            try {
                User user = securityService.authenticateLocalUser(username, password);

                if (user != null) {

                    JsonObject response = new JsonObject();
                    response.addProperty("success", true);
                    JsonObject userJson = new JsonObject();
                    userJson.addProperty("id-user", user.getId());
                    userJson.addProperty("screenname", user.getScreenname());
                    userJson.addProperty("email", user.getEmail());
                    response.add("user", userJson);
                    resp.getWriter().write(response.toString());
                } else {
                    resp.getWriter().write(createFailure("Invalid authentication").toString());
                }
            } catch (UnknownUserException ex) {
                resp.getWriter().write(createFailure("Invalid authentication").toString());
                return;
            } catch (UserBlockedException ex) {
                resp.getWriter().write(createFailure("Invalid authentication").toString());
                return;
            } catch (EmailNotConfirmedException ex) {
                resp.getWriter().write(createFailure("Invalid authentication").toString());
                return;
            } catch (InsufficientBucketTokensException ex) {
                resp.getWriter().write(createFailure("Invalid authentication").toString());
                return;
            } catch (WrongAuthenticationSourceException ex) {
                resp.getWriter().write(createFailure("Invalid authentication").toString());
                return;
            } catch (ServerException ex) {
                LOG.warn("Server error reported. Message: {}", ex.getMessage());
                return;
            }

        }
    }

    private void saveBase(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = BlocklyPropSecurityUtils.getUserInfo();
        req.setAttribute("email", user.getEmail());
        req.setAttribute("screenname", user.getScreenname());
        String screenname = req.getParameter("screenname");

        if (Strings.isNullOrEmpty(screenname)) {
            req.setAttribute("base-error", "Missing fields");
            req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
        } else {
            try {
                user = cloudSessionUserService.changeUserInfo(BlocklyPropSecurityUtils.getCurrentSessionUserId(), screenname);
                if (user != null) {
                    SecurityServiceImpl.getSessionData().setUser(user);
                    
                    /*
                     * Not allowing changed to the screen name until the user profile
                     * page is capble of supporting this feature
                    */
//                    userDao.updateScreenname(BlocklyPropSecurityUtils.getCurrentUserId(), user.getScreenname());

                    req.setAttribute("base-success", "Info changed");
                    req.setAttribute("screenname", user.getScreenname());
                    req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
                } else {
                    req.setAttribute("base-error", "User info could not be changed");
                    req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
                }
            } catch (UnknownUserIdException uuie) {
                req.setAttribute("base-error", "Unknown user");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (ScreennameUsedException sue) {
                req.setAttribute("base-error", "screenname-used");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (ServerException se) {
                req.setAttribute("base-error", "Server error");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            }
        }
    }

    private void savePassword(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = BlocklyPropSecurityUtils.getUserInfo();
        req.setAttribute("email", user.getEmail());
        req.setAttribute("screenname", user.getScreenname());
        String oldPassword = req.getParameter("oldpassword");
        String password = req.getParameter("password");
        String confirmPassword = req.getParameter("confirmpassword");
        if (Strings.isNullOrEmpty(oldPassword) || Strings.isNullOrEmpty(password) || Strings.isNullOrEmpty(confirmPassword)) {
            req.setAttribute("password-error", "Missing fields");
            req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
        } else if (!password.equals(confirmPassword)) {
            req.setAttribute("password-error", "Passwords do not match");
            req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
        } else {
            try {
                if (cloudSessionLocalUserService.changePassword(BlocklyPropSecurityUtils.getCurrentSessionUserId(), oldPassword, password, confirmPassword)) {
                    req.setAttribute("password-success", "Password changed");
                    req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
                } else {
                    req.setAttribute("password-error", "Password could not be changed");
                    req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
                }
            } catch (EmailNotConfirmedException enc) {
                req.setAttribute("account-error", "Email is unconfirmed");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (UnknownUserIdException uuie) {
                req.setAttribute("password-error", "Unknown user");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (PasswordVerifyException pve) {
                req.setAttribute("password-error", "Passwords did not match");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (ServerException se) {
                req.setAttribute("base-error", "Server error");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (PasswordComplexityException pce) {
                req.setAttribute("passwordComplexity", "Password is not complex enough");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (WrongAuthenticationSourceException ex) {
                LOG.warn("Trying to change password of non local user!");
                req.setAttribute("base-error", "Server error");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            }
        }
    }

    private static JsonObject createFailure(String message) {
        JsonObject response = new JsonObject();
        response.addProperty("success", false);
        response.addProperty("message", message);
        return response;
    }

}
