/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.utils;

import com.google.common.base.Strings;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Michel
 */
public class ServletUtils {

    public static String getLocale(HttpServletRequest req) {
        String language = req.getParameter("language");
        if (!Strings.isNullOrEmpty(language)) {
            return language;
        }
//        Object localeObject = req.getAttribute("language");
//        if (localeObject != null) {
//            System.out.println("Attribute locale not null: " + localeObject);
//            return String.valueOf(localeObject);
//        }
        Object localeObject = req.getSession().getAttribute("language");
        if (localeObject != null) {
            return String.valueOf(localeObject);
        }

        language = BlocklyPropSecurityUtils.getLocale();
        if (!Strings.isNullOrEmpty(language)) {
            return language;
        }
        return null;
    }

}
