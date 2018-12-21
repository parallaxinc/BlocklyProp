/*
 * Copyright (c) 2018 Parallax Inc.
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
 *  SOFTWARE.
 */

package com.parallax.server.blocklyprop.jsp;

import com.google.inject.Inject;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import org.apache.commons.configuration.Configuration;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public class Properties {

    private static Configuration configuration;

    @Inject
    public void setConfiguration(Configuration configuration) {
        Properties.configuration = configuration;
    }

    public static Configuration getConfiguration() {
        return configuration;
    }

    /**
     * Retrieve the base path to the BlocklyProp Client download files
     * <p>
     * This method supports the "offline" mode which assumes that there is
     * no Internet connectivity available.
     * 
     * @param file
     *
     * @return 
     */
    public static String getDownloadFilesBaseUrl(String file) {
        if (configuration.getBoolean("offline.enabled") == true) {
            return configuration.getString("offline.downloadfiles.baseurl") + (file.startsWith("/") ? "" : "/") + file;
        } else {
            return configuration.getString("downloadfiles.baseurl") + (file.startsWith("/") ? "" : "/") + file;
        }
    }

    public static boolean isOauthEnabled(String oauthProvider) {
        // Disable Oauth if we are running offline
        if (configuration.getBoolean("offline.enabled") == true) {
           return false; 
        } else {
        return configuration.getBoolean("oauth." + oauthProvider + ".enabled", true);
        }
    }
    
    //
    
    /**
     * Obtain the state of experimental menu items.
     * <p>
     * Blocks that are not ready for production use can be placed within
     * and 'experimental block' pattern. The 'experimental.menu' option
     * contained in the application properties file will trigger the menu
     * system to expose experimental menu items. If this option is off or
     * missing, the experimental menu items will be disabled.
     * 
     * @param state
     * @return 
     */
    public static boolean isExperimentalMenu(Boolean state) {
        try {
            if (configuration.getBoolean("experimental.menu") == true) {
                return true;
            }
        } catch (java.util.NoSuchElementException ex) {
            return false;
        }
        
        return false;
    }

     public static boolean isCoppaRestricted() {
        LoggerFactory.getLogger(Properties.class).info("Checking for COPPA restrictions");
        
        // Get the current user context
        User user = BlocklyPropSecurityUtils.getUserInfo();
        LoggerFactory.getLogger(Properties.class).info("Completed call to getUserInfo()");

        // Do not restrict is we do not have a valid user id

        if (user == null) {
            LoggerFactory.getLogger(Properties.class).info("Anonymous user. No COPPA restrictions");
            return false;
        }
        
//        LoggerFactory.getLogger(Properties.class).info("User screen name is: {}.", user.getScreenname());
//        LoggerFactory.getLogger(Properties.class).info("User COPPA requirement: {}.", user.isCoppaEligible());
//        LoggerFactory.getLogger(Properties.class).info("User COPPA month: {}.", user.getBirthMonth());
//        LoggerFactory.getLogger(Properties.class).info("User COPPA year: {}.", user.getBirthYear());
        
        return user.isCoppaEligible();
     }
}
