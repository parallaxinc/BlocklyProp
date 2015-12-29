/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.common.io.Files;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;

/**
 *
 * @author Michel
 */
@Singleton
public class HelpServlet extends HttpServlet {

    private static final String DEFAULT_DESTINATION_DIRECTORY = "help-xml";

    private Configuration configuration;

    private File destinationDirectoryFile;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;

        String destinationDirectory = configuration.getString("help.destination", DEFAULT_DESTINATION_DIRECTORY);
        destinationDirectoryFile = new File(new File(System.getProperty("user.home")), destinationDirectory);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String filePath = req.getParameter("f");

        File file = new File(destinationDirectoryFile, filePath + ".xml");

        if (isSubDirectory(destinationDirectoryFile, file)) {
            if (file.exists() && file.isFile()) {
                req.setAttribute("html", Files.toString(file, Charset.forName("UTF-8")));
                req.getRequestDispatcher("/WEB-INF/servlet/help/help.jsp").forward(req, resp);
            } else {
                req.setAttribute("help-not-found", true);
                req.getRequestDispatcher("/WEB-INF/servlet/help/help-error.jsp").forward(req, resp);;
            }
        } else {
            req.setAttribute("help-invalid-path", true);
            req.getRequestDispatcher("/WEB-INF/servlet/help/help-error.jsp").forward(req, resp);
        }
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

    public boolean isSubDirectory(File base, File child) throws IOException {
        base = base.getCanonicalFile();
        child = child.getCanonicalFile();

        File parentFile = child;
        while (parentFile != null) {
            if (base.equals(parentFile)) {
                return true;
            }
            parentFile = parentFile.getParentFile();
        }
        return false;
    }

}
