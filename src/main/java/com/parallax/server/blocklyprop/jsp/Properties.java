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

}
