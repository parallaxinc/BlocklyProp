/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import org.apache.commons.validator.routines.EmailValidator;
import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.server.blocklyprop.services.SecurityService;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class RegisterServlet extends HttpServlet {

    /**
     * 
     */
    private static final Logger LOG = LoggerFactory.getLogger(RegisterServlet.class);
    
    private EmailValidator emailValid = EmailValidator.getInstance();

    /**
     * 
     */
    private SecurityService securityService;
    
    /**
     * 
     * @param securityService 
     */
    @Inject
    public void setSecurityService(SecurityService securityService) {
        this.securityService = securityService;
    }

    /**
     * Clear the user screen name and email addresses from the user registration form
     * 
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException 
     */
    @Override
    protected void doGet(
            HttpServletRequest req, 
            HttpServletResponse resp) throws ServletException, IOException {

        req.setAttribute("screenname", "");
        req.setAttribute("email", "");
        req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
    }

    /**
     * 
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException 
     */
    @Override
    protected void doPost(
            HttpServletRequest req, 
            HttpServletResponse resp) throws ServletException, IOException {
    
        resp.setContentType("application/json");

        String screenname = Strings.emptyToNull(req.getParameter("screenname"));
        String email = Strings.emptyToNull(req.getParameter("email"));
        String password = Strings.emptyToNull(req.getParameter("password"));
        String confirmPassword = Strings.emptyToNull(req.getParameter("confirmpassword"));
        String birthMonth = Strings.emptyToNull(req.getParameter("bdmonth"));
        String birthYear = Strings.emptyToNull(req.getParameter("bdyear"));
        String parentEmail = Strings.emptyToNull(req.getParameter("sponsoremail"));
        String sponsorEmailType = Strings.emptyToNull(req.getParameter("sponsoremailtype"));
       
        LOG.info("Raw birthday year is: {}", birthYear);

        // Clean up any possible null fields
        req.setAttribute("screenname", screenname == null ? "" : screenname);
        req.setAttribute("email", email == null ? "" : email);
        req.setAttribute("bdmonth", birthMonth == null ? "" : birthMonth );
        req.setAttribute("bdyear", birthYear == null ? "" : birthYear );
        req.setAttribute("sponsoremail", parentEmail == null ? "" : parentEmail);
        req.setAttribute("sponsoremailtype", sponsorEmailType == null ? "0" : sponsorEmailType);
                
        // Log a few things
        LOG.info("Registering screen name: {}", screenname);
        LOG.info("Registering email: {}", email);
        LOG.info("Registering month: {}", birthMonth);
        LOG.info("Registering year: {}", birthYear);
        LOG.info("Registering sponsor email: {}", parentEmail);
        LOG.info("Registering sponsor type selection: {}", sponsorEmailType);

        LOG.info("Checking REQ Year setting: {}",req.getAttribute("bdmonth"));
        LOG.info("Checking email details");
        if (email == null) {
            LOG.info("Email is Null");
        }
        else {
            LOG.info("Email is not Null");
        }
        
        LOG.info("Checking for valid email address");
        if (emailValid.isValid(email)){
            LOG.info("Email appears to be valid");
        }
        else {
            LOG.warn("Email address is not in the correct format: {}", email);
            req.setAttribute("emailMalformed", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        }
        
        Long idUser;
        
        try {
            LOG.info("Calling securityService.register()");
            idUser = securityService.register(
                    screenname, email, password, confirmPassword,
                    Integer.parseInt(birthMonth),
                    Integer.parseInt(birthYear),
                    parentEmail,
                    Integer.parseInt(sponsorEmailType));

            LOG.info("Returning from register(). ID assigned is: {}", idUser);
            
            if (idUser != null && idUser > 0) {
                LOG.info("Transfering to registered.jsp");
                req.getRequestDispatcher("WEB-INF/servlet/register/registered.jsp").forward(req, resp);
            } else {
                LOG.info("Returning to the user registration page");
                req.setAttribute("error", true);
                req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
            }
        } catch (NonUniqueEmailException ex) {
            LOG.warn("Attempt to register already assigned email: {}", email);
            req.setAttribute("emailAlreadyUsed", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (PasswordVerifyException ex) {
            LOG.info("Paswword mismatch");
            req.setAttribute("passwordsDontMatch", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (NullPointerException npe) {
            LOG.warn("Null pointer exception. Missing field data");
            req.setAttribute("missingFields", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (PasswordComplexityException pce) {
            LOG.info("Paswword is not complex enough");
            req.setAttribute("passwordComplexity", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (ScreennameUsedException sue) {
            LOG.info("Attempt to use already assigned screen name: {}", screenname);
            req.setAttribute("screennameUsed", true);
            req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
        } catch (IllegalStateException ex) {
            LOG.warn("Possible email address issue");
            LOG.warn("Exception message is: {}", ex.getMessage());

            if (ex.getMessage() == "SponsorEmail") {
                req.setAttribute("sponsorEmailMalformed", true);
            }
            else // User email issue
            {
                req.setAttribute("emailMalformed", true);
            }
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
