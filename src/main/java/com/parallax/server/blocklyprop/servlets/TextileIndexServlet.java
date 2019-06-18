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

package com.parallax.server.blocklyprop.servlets;

import com.google.inject.Singleton;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Display the BlocklyProp home page
 *
 * @author Michel
 *
 * TODO: Refactor this into a file in the application servlets directory
 */
@Singleton
public class TextileIndexServlet extends HttpServlet {
            
    // Application logging facility
    private static final Logger LOG = LoggerFactory.getLogger(TextileIndexServlet.class);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        LOG.info("Processing a Http request for '/'");

        try {
            // Direct the request to the home page
            request.getRequestDispatcher(
                    "WEB-INF/servlet/index.jsp")
                    .forward(request, response);
        }
        catch (ServletException se) {
            LOG.warn("Servlet exception encountered while serving /index.jsp");
            LOG.warn("Error message is: {}", se.getMessage());
        }
        catch (IOException eio) {
            LOG.warn("I/O exception encountered while serving /index/jsp");
            LOG.warn("Error message is: {}", eio.getMessage());
        }
    }
}
