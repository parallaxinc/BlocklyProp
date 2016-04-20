/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.jsp;

import com.google.common.base.Strings;
import com.parallax.server.blocklyprop.services.impl.UserServiceImpl;
import java.io.IOException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

/**
 *
 * @author Michel
 */
public class SetLocale extends SimpleTagSupport {

    private String locale;

    public void setLocale(String locale) {
        this.locale = locale;
    }

    @Override
    public void doTag() throws JspException, IOException {
        if (!Strings.isNullOrEmpty(locale)) {
//            System.out.println("Set locale: " + locale);
            UserServiceImpl.getUserService().setLocale(locale);
        } else {
            System.out.println("Locale = null or empty");
        }
    }

}
