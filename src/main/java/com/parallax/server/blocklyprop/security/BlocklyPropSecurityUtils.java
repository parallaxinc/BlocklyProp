/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import org.apache.shiro.SecurityUtils;

/**
 *
 * @author Michel
 */
public class BlocklyPropSecurityUtils extends SecurityUtils {

    public static Long getCurrentUserId() {
        SessionData sessionData = SecurityServiceImpl.getSessionData();
        if (sessionData != null) {
            return sessionData.getIdUser();
        }
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

}
