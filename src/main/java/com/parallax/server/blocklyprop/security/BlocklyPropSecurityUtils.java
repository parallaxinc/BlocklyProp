/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.server.blocklyprop.services.impl.SecurityServiceImpl;
import org.apache.shiro.SecurityUtils;

/**
 *
 * @author Michel
 */
public class BlocklyPropSecurityUtils extends SecurityUtils {

    public static Long getCurrentUserId() {
        return SecurityServiceImpl.getSessionData().getIdUser();
    }

}
