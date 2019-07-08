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


    /**
     * User profile
     */
    private CloudSessionUserService userService;

    public UserServiceImpl() {
        UserServiceImpl.USER_SERVICE = this;
    }

    /**
     * BlocklyProp user record
     */
    private UserDao userDao;

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * Application configuration object
     */
    private Configuration configuration;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        userService = new CloudSessionUserService(configuration.getString("cloudsession.baseurl"));
    }


    /**
     * Locate a blocklyprop user record from the bp user ID
     *
     * @param idUser
     * The blocklyprop user ID
     *
     * @return
     * A populated blocklyprop user instance
     */
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


    /**
     * Look up the blockly user id from the user profile cloud session id
     *
     * @param idCloudSession
     * The user profile key id
     *
     * @return
     * Returns a Long integer representing the blockly record primary key id
     */
    public Long getIdUser(Long idCloudSession) {
        return userDao.getUserIdForCloudSessionUserId(idCloudSession);
    }


    /**
     * Locate a blocklyprop user record from the user profile ID and screen name
     *
     * @param idCloudSessionUser
     *
     * @param screenName
     *
     * @return
     *
     */
    @Deprecated
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


    /**
     * Get a list of blocklyprop user objects
     *
     * @return
     * Returns a list of blocklyprop user objects
     */
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


    /**
     * Get the blocklyprop user screen name
     *
     * @param idUser
     * Provide the blocklyprop user ID
     *
     * @return
     * Returns a string containing the user's screen name or an empty string
     * if the blocklyprop user record was not found
     */
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
            LOG.error("Error retrieving name for userID: {}", idUser);
        }
        return name;
    }

    @Override
    public void setLocale(String locale) {
        LOG.info("Setting locale {}", locale);

        if (SecurityServiceImpl.getSessionData() != null) {
            LOG.info("Retrieved SessionData object");
            LOG.info("SessionData {}",SecurityServiceImpl.getSessionData().toString() );

            if (SecurityServiceImpl.getSessionData().getUser() != null) {
                LOG.info("Retrieved SessionData User object");
                try {
                    LOG.info("Loading user profile to update locale");
                    com.parallax.client.cloudsession.objects.User user = BlocklyPropSecurityUtils.getUserInfo();

                    if (user != null) {
                        if (!user.getLocale().equals(locale)) {
                            LOG.info("Setting user locale: {} - {}", user.getId(), locale);
                            user = userService.changeUserLocale(user.getId(), locale);
                            BlocklyPropSecurityUtils.setUserInfo(user);
                        }
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

    //

    /**
     * Update the user screen name stored in the blockyprop.users table
     *
     * @param idUser is the blocklyprop user primary key
     *
     * @param screenName is the new screen name text to store
     */
    public void setScreenName(Long idUser, String screenName) {
        userDao.updateScreenName(idUser, screenName);

        // TODO: Set session screen name attribute

    }


    public static UserService getUserService() {
        return UserServiceImpl.USER_SERVICE;
    }

}
