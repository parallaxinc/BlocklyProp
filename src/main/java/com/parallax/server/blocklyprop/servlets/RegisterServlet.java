/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.server.blocklyprop.services.SecurityService;
import java.io.IOException;
// import java.util.HashSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Michel
 */
@Singleton
public class RegisterServlet extends HttpServlet {

    private SecurityService securityService;

    @Inject
    public void setSecurityService(SecurityService securityService) {
        this.securityService = securityService;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("screenname", "");
        req.setAttribute("email", "");
        req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
    }

    /*
     * Register
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");

        String screenname = Strings.emptyToNull(req.getParameter("screenname"));
        String email = Strings.emptyToNull(req.getParameter("email"));
        String password = Strings.emptyToNull(req.getParameter("password"));
        String confirmPassword = Strings.emptyToNull(req.getParameter("confirmpassword"));
        String birthMonth = Strings.emptyToNull(req.getParameter("bdmonth"));
        String birthYear = Strings.emptyToNull(req.getParameter("bdyear"));
        

        req.setAttribute("screenname", screenname == null ? "" : screenname);
        req.setAttribute("email", email == null ? "" : email);
        req.setAttribute("bdmonth", birthMonth == null ? "" : birthMonth );
        req.setAttribute("bdyear", birthYear == null ? "" : birthYear );
        
        Long idUser;
        
        try {
            // Obtain month and year date components
//            birthMonth = getMonthFromDate(birthDate);
//            birthYear = getYearFromDate(birthDate);
            
            idUser = securityService.register(screenname, email, password, confirmPassword, birthMonth, birthYear);
            if (idUser != null && idUser > 0) {
                req.getRequestDispatcher("WEB-INF/servlet/register/registered.jsp").forward(req, resp);
            } else {
                req.setAttribute("error", true);
                req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
            }
        } catch (NonUniqueEmailException ex) {
            req.setAttribute("emailAlreadyUsed", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (PasswordVerifyException ex) {
            req.setAttribute("passwordsDontMatch", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (NullPointerException npe) {
            req.setAttribute("missingFields", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (PasswordComplexityException pce) {
            req.setAttribute("passwordComplexity", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (ScreennameUsedException sue) {
            req.setAttribute("screennameUsed", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        }
    }
    
    private String getMonthFromDate(String date) {
        String[] dates = date.split("/");
        int month = 0;

        try {
            if (dates.length == 2) {
                month = Integer.parseInt(dates[0]);
            }
        }
        catch (NumberFormatException ex) {
            month = 0;
        }
        
        return Integer.toString(month);
    }

    private String getYearFromDate(String date) {
        String[] dates = date.split("/");
        int year = 0;

        try {
            if (dates.length == 2) {
                year = Integer.parseInt(dates[1]);
            }
        }
        catch (NumberFormatException ex) {
            year = 0;
        }
        
        return Integer.toString(year);
    }

}
