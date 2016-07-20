/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.utils.ServletUtils;
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
public class TextileChangeLogServlet extends HttpServlet {

    private final TextileReader textileFileReader = new TextileReader();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String html = textileFileReader.readFile("change-log", ServletUtils.getLocale(req), req.isSecure());
        req.setAttribute("html", html);
        req.getRequestDispatcher("/WEB-INF/servlet/html.jsp").forward(req, resp);
    }

}
