/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.jsp;

import com.google.inject.Inject;
import org.apache.commons.configuration.Configuration;

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

}
