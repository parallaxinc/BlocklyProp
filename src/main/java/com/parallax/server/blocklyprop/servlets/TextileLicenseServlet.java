/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.utils.TextileReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Michel
 */
@Singleton
public class TextileLicenseServlet extends HttpServlet {

    private final TextileReader textileFileReader = new TextileReader();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String html = textileFileReader.readFile("license", getLocale(req));
        req.setAttribute("html", html);
        req.getRequestDispatcher("/WEB-INF/servlet/html.jsp").forward(req, resp);
    }

    private String getLocale(HttpServletRequest req) {
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
