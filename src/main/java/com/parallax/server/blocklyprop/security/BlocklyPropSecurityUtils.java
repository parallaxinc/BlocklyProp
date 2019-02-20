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

package com.parallax.server.blocklyprop.security;

import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import org.apache.shiro.SecurityUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public class BlocklyPropSecurityUtils extends SecurityUtils {

    // Get a logger instance
    private static final Logger LOG = LoggerFactory.getLogger(BlocklyPropSecurityUtils.class);

    /**
     *
     * @return
     */
    public static Long getCurrentUserId() {

        try {
            SessionData sessionData = SecurityServiceImpl.getSessionData();
            if (sessionData != null) {
                return sessionData.getIdUser();
            }
        }
        catch (Exception ex) {
            LOG.info("Exception trapped. Message is: {}.", ex.getMessage());
        }

        LOG.info("Session data not found");

        return null;
    }

    public static Long getCurrentSessionUserId() {
        SessionData sessionData = SecurityServiceImpl.getSessionData();
        if (sessionData != null && sessionData.getUser() != null) {
            return sessionData.getUser().getId();
        }
        return null;
    }

    public static User getUserInfo() {
        SessionData sessionData = SecurityServiceImpl.getSessionData();
        if (sessionData != null && sessionData.getUser() != null) {
            return sessionData.getUser();
        }
        return null;
    }

    public static void setUserInfo(User user) {
        SessionData sessionData = SecurityServiceImpl.getSessionData();
        if (sessionData != null) {
            sessionData.setUser(user);
        }
    }

    public static String getLocale() {
        SessionData sessionData = SecurityServiceImpl.getSessionData();
        if (sessionData != null) {
            return sessionData.getLocale();
        }
        return null;
    }

    public static void setLocale(String locale) {
        SessionData sessionData = SecurityServiceImpl.getSessionData();
        if (sessionData != null) {
            sessionData.setLocale(locale);
        }
    }

}
