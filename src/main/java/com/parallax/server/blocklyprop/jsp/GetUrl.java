/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.jsp;

import com.google.common.base.Strings;
import java.io.IOException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

/**
 *
 * @author Michel
 */
public class GetUrl extends SimpleTagSupport {

    private String url;

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public void doTag() throws JspException, IOException {
        if (!Strings.isNullOrEmpty(url)) {
            // System.out.println("Geturl: " + url);

            PageContext pageContext = (PageContext) getJspContext();
            JspWriter out = pageContext.getOut();

            out.write(pageContext.getServletContext().getContextPath() + url);
        } else {
            System.out.println("Url = null or empty");
        }
    }

}
