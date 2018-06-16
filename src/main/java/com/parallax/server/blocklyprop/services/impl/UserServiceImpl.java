/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.client.cloudsession.CloudSessionUserService;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.UnknownUserIdException;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.db.generated.tables.pojos.User;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.UserService;
import java.util.List;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    private static UserService USER_SERVICE;

    private Configuration configuration;
    private UserDao userDao;

    private CloudSessionUserService userService;

    public UserServiceImpl() {
        UserServiceImpl.USER_SERVICE = this;
    }

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        userService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }

    @Override
    public User getUser(Long idUser) {
        if (userDao != null) {
            return userDao.getUser(idUser).into(User.class);
        }
        else {
            LOG.error("UserDAO is not initialized before first use!");
            return null;
        }
        
    }
    
    @Override
    public User getUser(Long idCloudSessionUser, String screenName) {
        if (userDao != null) {
            return userDao.getUser(idCloudSessionUser, screenName).into(User.class);
        }
        else {
            LOG.error("UserDAO is not initialized before first use!");
            return null;
        }
    }

    @Override
    public List<UserRecord> getAllUsers() {
        if (userDao != null) {
            return userDao.getAll();
        }
        else {
            LOG.error("UserDAO is not initialized before first use!");
            return null;
        }
    }

    @Override
    public String getUserScreenName(Long idUser) {
        
        String name = "";
        
        try {
            if (userDao != null) {
                name = userDao.getUser(idUser).getScreenname();
            }
            else {
                LOG.error("UserDAO is not initialized before first use!");
            }
        }
        catch (NullPointerException ex) {
            LOG.error("Error retreiving name for userID: {}", idUser);
        }
        return name;
    }

    @Override
    public void setLocale(String locale) {
        if (SecurityServiceImpl.getSessionData() != null) {
            if (SecurityServiceImpl.getSessionData().getUser() != null) {
                try {
                    com.parallax.client.cloudsession.objects.User user = BlocklyPropSecurityUtils.getUserInfo();
                    if (!user.getLocale().equals(locale)) {
                        LOG.info("Setting user locale: {} - {}", user.getId(), locale);
                        user = userService.changeUserLocale(user.getId(), locale);
                        BlocklyPropSecurityUtils.setUserInfo(user);
                    }
                } catch (UnknownUserIdException uuie) {
                    LOG.error("Unknown user id", uuie);
                } catch (ServerException se) {
                    LOG.error("Server exception", se);
                }
            } else {
                SecurityServiceImpl.getSessionData().setLocale(locale);
            }
        }
    }

    public static UserService getUserService() {
        return UserServiceImpl.USER_SERVICE;
    }

}
