/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.jsp.authentication;

import com.parallax.server.blocklyprop.services.impl.AuthenticationServiceImpl;
import java.io.IOException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.SimpleTagSupport;

/**
 *
 * @author Michel
 */
public class GetTimestamp extends SimpleTagSupport {

    @Override
    public void doTag() throws JspException, IOException {

        PageContext pageContext = (PageContext) getJspContext();
        JspWriter out = pageContext.getOut();

        out.write(String.valueOf(AuthenticationServiceImpl.get().getTimestamp()));
    }

}
