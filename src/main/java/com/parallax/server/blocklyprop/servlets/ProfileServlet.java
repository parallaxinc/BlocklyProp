/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.CloudSessionLocalUserService;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;

/**
 *
 * @author Michel
 */
@Singleton
public class ProfileServlet extends HttpServlet {

    private CloudSessionLocalUserService cloudSessionLocalUserService;
    private CloudSessionUserService cloudSessionUserService;
    private Configuration configuration;

    private UserDao userDao;

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

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = BlocklyPropSecurityUtils.getUserInfo();
        req.setAttribute("email", user.getEmail());
        req.setAttribute("screenname", user.getScreenname());
        req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String saveBase = req.getParameter("save-base");
        if (!Strings.isNullOrEmpty(saveBase)) {
            saveBase(req, resp);
        }
        String savePassword = req.getParameter("save-password");
        if (!Strings.isNullOrEmpty(savePassword)) {
            savePassword(req, resp);
        }
//        String email = req.getParameter("email");
//        req.setAttribute("token", token == null ? "" : token);
//        req.setAttribute("email", email == null ? "" : email);
//        String password = req.getParameter("password");
//        String confirmPassword = req.getParameter("confirmpassword");
//        if (Strings.isNullOrEmpty(token) || Strings.isNullOrEmpty(email) || Strings.isNullOrEmpty(password) || Strings.isNullOrEmpty(confirmPassword)) {
//            req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
//        } else {
//            try {
//                if (cloudSessionLocalUserService.doPasswordReset(token, email, password, confirmPassword)) {
//                    req.getRequestDispatcher("WEB-INF/servlet/password-reset/reset-done.jsp").forward(req, resp);
//                } else {
//                    req.setAttribute("error", "Invalid token");
//                    req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
//                }
//            } catch (UnknownUserException ex) {
//                req.setAttribute("error", "Unknown email");
//                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
//            } catch (PasswordVerifyException ex) {
//                req.setAttribute("error", "Passwords do not match");
//                req.getRequestDispatcher("WEB-INF/servlet/password-reset/do-reset.jsp").forward(req, resp);
//            }
//        }
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
                    userDao.updateScreenname(BlocklyPropSecurityUtils.getCurrentUserId(), user.getScreenname());
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
            } catch (UnknownUserIdException uuie) {
                req.setAttribute("password-error", "Unknown user");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            } catch (PasswordVerifyException pve) {
                req.setAttribute("password-error", "Passwords did not match");
                req.getRequestDispatcher("WEB-INF/servlet/profile/profile.jsp").forward(req, resp);
            }
        }
    }

}
