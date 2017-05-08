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
     * Clear the user registration form data and present the form
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

        // Initialize the form fields to reasonable defaults
        req.setAttribute("screenname", "");
        req.setAttribute("email", "");
        req.setAttribute("sponsoremail", "");
        
        // Send the new form to the client
        req.getRequestDispatcher("WEB-INF/servlet/register/register.jsp").forward(req, resp);
    }

    /**
     * Process the user registration page
     * <p>
     * This retrieves the form values and pass them on to another method
     * that validates the information and creates the user account.
     * <p>
     * The register() method will throw an exception if the data collected from
     * the form is considered invalid. The exact exception depends on the nature
     * of the error. For example, null values in required fields will throw a
     * NullPointerException or a poorly formatted email address will cause a
     * IllegalStateException to be thrown.
     * <p>
     * This method traps those exceptions and resubmits the form with a helpful
     * error message to guide the user to a successful registration experience.
     * Each exception contains a mnemonic that is used here to identify the
     * exact error. The exception handler in this method then sets an attribute
     * on the form and resubmits it. The form is then presented to the user to
     * provide him or her with an opportunity to correct the data and resubmit
     * the registration.
     * <p>
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
        String sponsorEmail = Strings.emptyToNull(req.getParameter("sponsoremail"));
        String sponsorEmailType = Strings.emptyToNull(req.getParameter("sponsoremailtype"));
       
        LOG.info("Raw screen name: {}", screenname);
        LOG.info("Raw sponsor email address is: {}", sponsorEmail);

        // Clean up any possible null fields
        req.setAttribute("screenname", screenname == null ? "" : screenname);
        req.setAttribute("email", email == null ? "" : email);
        req.setAttribute("bdmonth", birthMonth == null ? "" : birthMonth );
        req.setAttribute("bdyear", birthYear == null ? "" : birthYear );
        req.setAttribute("sponsoremail", sponsorEmail == null ? "" : sponsorEmail);
        req.setAttribute("sponsoremailtype", sponsorEmailType == null ? "0" : sponsorEmailType);
                
        // Log a few things
        LOG.info("Registering screen name: {}", screenname);
        LOG.info("Registering email: {}", email);
        LOG.info("Registering month: {}", birthMonth);
        LOG.info("Registering year: {}", birthYear);
        LOG.info("Registering sponsor email: {}", sponsorEmail);
        LOG.info("Registering sponsor type selection: {}", sponsorEmailType);

        LOG.info("Checking REQ Year setting: {}",req.getAttribute("bdmonth"));
        
        Long idUser;
        
        try {
            LOG.info("Calling securityService.register()");
            // Validate the collected information
            idUser = securityService.register(
                    screenname, email, password, confirmPassword,
                    Integer.parseInt(birthMonth),
                    Integer.parseInt(birthYear),
                    sponsorEmail,
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
            LOG.warn("Null Pointer Exception. Data is: {}", npe.getMessage());

            // Figure out which data field triggered the exception
            switch(npe.getMessage()) {
                case "ScreenNameNull":
                    LOG.warn("Null screen name trigger exception");
                    req.setAttribute("ScreenNameNull", true);
                    break;
                    
                case "PasswordIsNull":
                    LOG.warn("Null password trigger exception");
                    req.setAttribute("PasswordIsNull", true);
                    break;
                    
                case "PasswordConfirmIsNull":
                    LOG.warn("Null confirmation password trigger exception");
                    req.setAttribute("PasswordConfirmIsNull", true);
                    break;
                    
                case "BirthMonthNull":
                    LOG.warn("Null birth month trigger exception");
                    req.setAttribute("BirthMonthNull", true);
                    break;
                
                case "BirthYearNull":
                    LOG.warn("Null birth yeartrigger exception");
                    req.setAttribute("BirthYearNull", true);
                    break;
                    
                case "UserEmailNull":
                    LOG.warn("Null user email");
                    req.setAttribute("UserEmailNull", true);
                    break;
                    
                case "SponsorEmailNull":
                    LOG.warn("Null sponsor email");
                    req.setAttribute("SponsorEmailNull", true);
                    break;
                    
                default:
                    LOG.warn("Unknown exception trigger");
                    req.setAttribute("missingFields", true);
            }
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
            LOG.warn("Exception message is: {}", ex.getMessage());

            if ("BirthMonthNotSet".equals(ex.getMessage())) {
                req.setAttribute("BirthMonthNotSet", true);
            }

            // Birth year is still at the default. Infants probably are not users
            else if ("BirthYearNotSet".equals(ex.getMessage())) {
                req.setAttribute("BirthYearNotSet", true);
            }
            
            // Set the on-screen error message numonic. Code in the 
            // register.jsp page will map the numonic to a language sting and
            // display that to the user
            else if ("SponsorEmail".equals(ex.getMessage())) {
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
