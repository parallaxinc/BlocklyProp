<%--
    Document   : register
    Created on : 31-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
    <head>
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
        <script>
    function initCoppaElements() {
               
        document.getElementById("birthdayMonth").onchange = checkCoppaDate;
        document.getElementById("birthdayYear").onchange = checkCoppaDate;
        if (document.getElementById('birthdayYear').value == 2017) {
            hideSponsorInfo();
        }
        else {
            checkCoppaDate();
        }
    };
            
    function checkCoppaDate() {
        // Show sponsor inputs if Coppa restriction is enabled
        if (checkCoppaRestriction() === true) {
            showSponsorInfo();
        } else {
            hideSponsorInfo();
        }
    };
    
    // Return true if age is < 13
    function checkCoppaRestriction() {
        // Validate form data
        var formYearValue = document.getElementById('birthdayYear');
        if (formYearValue === null) {
            return false;
        }
        var userYear = parseInt(formYearValue.value);

        // Validate the month component
        var formMonthValue = document.getElementById('birthdayMonth');
        if (formMonthValue === null) {
            return false;
        }
        var userMonth = parseInt(formMonthValue.value);
 
        // Return today's date and time
        var currentTime = new Date();
        var currYear = currentTime.getFullYear();
        var currMonth = currentTime.getMonth() + 1;

        // Is the user 13 years old this year?
        if (((userYear + 13) + ((userMonth - 1) / 12)) >= (currYear + ((currMonth - 1) / 12))) {
            // The user is restricted if their birth month is less than
            // or equal the current month.
            //if (userMonth <= currMonth) {
                return true;
            //}
        }
        
        return false;
   };
 
   function hideSponsorInfo() {
        document.getElementById('sponsor-info').style = "display:none;";
        $('#sponsor-info').hide();
    };
    
    function showSponsorInfo() {
        document.getElementById('sponsor-info').style = "display:inherit;";
        $('#sponsor-info').show();
    }
        </script>
    </head>
    <body onload="initCoppaElements()">

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-5 col-sm-10"></div>
                <div class="col-md-7 col-sm-14">
                    <h2><fmt:message key="register.do.title" /></h2>
                    <%  // Test for a generic error
                        Boolean error = (Boolean) request.getAttribute("error");
                        if (error != null && error) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.generic" /></p>
                    </div>
                    <%
                        }

                        // Email address has already been claimed by another user
                        Boolean emailAlreadyUsed = (Boolean) request.getAttribute("emailAlreadyUsed");
                        if (emailAlreadyUsed != null && emailAlreadyUsed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.email_already_used" /></p>
                    </div>
                    <%
                        }

                        // The user email address fields contains a poorly formed address
                        Boolean emailMalformed = (Boolean) request.getAttribute("emailMalformed");
                        if (emailMalformed != null && emailMalformed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.email_format_error" /></p>
                    </div>
                    <%
                        }

                        // The sponsor email address contains a poorly formed address
                        Boolean sponsorEmailMalformed = (Boolean) request.getAttribute("sponsorEmailMalformed");
                        if (sponsorEmailMalformed != null && sponsorEmailMalformed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.sponsor_email_format_error" /></p>
                    </div>
                    <%
                        }

                        // The user email address contains a poorly formed address
                        Boolean userEmailMalformed = (Boolean) request.getAttribute("UserEmailNull");
                        if (userEmailMalformed != null && userEmailMalformed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.user_email_empty" /></p>
                    </div>
                    <%
                        } //SponsorEmailNull

                        // The user email address contains a poorly formed address
                        Boolean sponsorEmailIsEmpty = (Boolean) request.getAttribute("SponsorEmailNull");
                        if (sponsorEmailIsEmpty != null && sponsorEmailIsEmpty) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.sponsor_email_empty" /></p>
                    </div>
                    <%
                        } //SponsorEmailNull


                        // The contents of the two password fields do not match
                        Boolean passwordsDontMatch = (Boolean) request.getAttribute("passwordsDontMatch");
                        if (passwordsDontMatch != null && passwordsDontMatch) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.passwords_dont_match" /></p>
                    </div>
                    <%
                        }

                        // We are missing data in a field. This is another generic
                        // error and is probably a Bad Thing.
                        Boolean missingFields = (Boolean) request.getAttribute("missingFields");
                        if (missingFields != null && missingFields) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.missing_fields" /></p>
                    </div>
                    <%
                        }

                        // The submitted password is too simple and easily compromised
                        Boolean passwordIsEmpty = (Boolean) request.getAttribute("PasswordIsNull");
                        if (passwordIsEmpty != null && passwordIsEmpty) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.password_empty" /></p>
                    </div>
                    <%
                        }

                        // The submitted password is too simple and easily compromised
                        Boolean passwordConfirmIsEmpty = (Boolean) request.getAttribute("PasswordConfirmIsNull");
                        if (passwordConfirmIsEmpty != null && passwordConfirmIsEmpty) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.password_confirm_empty" /></p>
                    </div>
                    <%
                        }

                        // The submitted password is too simple and easily compromised
                        Boolean passwordComplexity = (Boolean) request.getAttribute("passwordComplexity");
                        if (passwordComplexity != null && passwordComplexity) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="password.complexity.error" /></p>
                    </div>
                    <%
                        }

                        // The screen name field is required but is empty
                        Boolean screenNameEmpty = (Boolean) request.getAttribute("ScreenNameNull");
                        if (screenNameEmpty != null && screenNameEmpty) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.screenname_empty" /></p>
                    </div>
                    <%
                        }

                        // The selected screen name has already been claimed by another user
                        Boolean screennameUsed = (Boolean) request.getAttribute("screennameUsed");
                        if (screennameUsed != null && screennameUsed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.screenname_used" /></p>
                    </div>
                    <%
                        }

                        // The birth month selector has not been updated
                        Boolean birthMonthSelectorZero = (Boolean) request.getAttribute("BirthMonthNotSet");
                        if (birthMonthSelectorZero != null && birthMonthSelectorZero) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.birth_month_not_selected" /></p>
                    </div>
                    <%
                        } //BirthYearNotSet
                        // The birth month selector has not been updated
                        Boolean birthYearSelectorZero = (Boolean) request.getAttribute("BirthYearNotSet");
                        if (birthYearSelectorZero != null && birthYearSelectorZero) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.birth_year_not_selected" /></p>
                    </div>
                    <%
                        } //BirthYearNotSet

                    %>
                    <form name="registerForm" action="" method="post">
                        <div class="form-group">
                            <label for="screenname" ><fmt:message key="register.do.screenname" /></label>
                            <input class="form-control" type="text" name="screenname" id="screenname" maxlength="255" value="<%= request.getAttribute("screenname")%>">
                        </div>
                        <script>
                            $("#screenname").bind("keyup", function(e) {
                                this.value = this.value.replace(/[^\w\.\-]/g, '');  //removes any non-word characters except "." and "-"
                            });
                        </script>
                        <div class="form-group">
                            <label for="email" ><fmt:message key="register.do.email" /></label>
                            <input class="form-control" type="email" name="email" maxlength="255" value="<%= request.getAttribute("email")%>">
                        </div>
                        <div class="form-group">
                            <label for="password" ><fmt:message key="register.do.password" /></label>
                            <input class="form-control" type="password" name="password" maxlength="255">
                            <span id="helpBlock" class="help-block"><fmt:message key="password.complexity" /></span>
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" ><fmt:message key="register.do.confirm_password" /></label>
                            <input class="form-control" type="password" name="confirmpassword" maxlength="255">
                        </div>
                        <div class="form-group">
                            <label for="bdyear"><fmt:message key="register.do.birth.year" /></label>
                            <select name="bdyear" id="birthdayYear">
                                <%
                                    int byLoop;
                                    int thisYear = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR);

                                    String bdYear = (String) request.getAttribute("bdyear");
                                    if (bdYear == null) {
                                            bdYear = String.valueOf(thisYear);
                                    }
                        
                                    for (byLoop = thisYear; byLoop > thisYear - 90; byLoop-- ){
                                        out.print("<option value=\"");
                                        out.print(String.valueOf(byLoop));
                                        out.print("\"");

                                        if (Integer.parseInt(bdYear) == byLoop) {
                                            out.print(" selected=\"selected\"");
                                        }

                                        out.println(">" + String.valueOf(byLoop) + "</option>");
                                    }
                                %>
                            </select>&nbsp;&nbsp;
                            <label for="bdmonth"><fmt:message key="register.do.birth.month" /></label>
                            <select name="bdmonth" id="birthdayMonth">
                                <%
                                    int bdLoop;
                                    String[] months={
                                        "Select month",
                                        "January", "February", "March", "April", "May",
                                        "June", "July", "August", "September", "October",
                                        "November", "December"};

                                    String bdMonth = (String) request.getAttribute("bdmonth");
                                    if (bdMonth == null) {
                                            bdMonth = "0";
                                    }

                                    for (bdLoop = 0; bdLoop <= 12; bdLoop++) {
                                        out.print("<option value=\"");
                                        out.print(String.valueOf(bdLoop));
                                        out.print("\"");
                        
                                        if (Integer.parseInt(bdMonth) == bdLoop) {
                                            out.print(" selected=\"selected\"");
                                        }
                            
                                        out.println(">" + months[bdLoop] + "</option>");
                                    } // End for loop
                                %>
                            </select>&nbsp;&nbsp;
                            <a id="coppa-msg-1" 
                               onclick="$('#coppa-msg-1').hide(); $('#coppa-msg-2').removeClass('hidden');">
                                <fmt:message key="register.do.coppa.msg0" /></a>
                        </div>
                        <div class="alert alert-info hidden" id="coppa-msg-2">
                            <p>
                                <fmt:message key="register.do.coppa.msg1" />
                                <a href="https://www.ftc.gov/tips-advice/business-center/guidance/childrens-online-privacy-protection-rule-not-just-kids-sites"
                                   target ="_blank">
                                    <fmt:message key="register.do.coppa.msg2" /></a>.
                            </p>
                        </div>
                        <div class="form-group" id="sponsor-info" style="display:none;">
                            <p>
                                <label for="sponsoremail" ><fmt:message key="register.do.sponsor.email" /></label>
                                <input class="form-control" type="text" name="sponsoremail" maxlength="255"
                                       value="<%= request.getAttribute("sponsoremail")%>" placeholder="Enter an parent or teacher email address">
                            </p>
                            <p>
                                <label for="sponsoremailtype"><fmt:message key="register.do.sponsor.emailtype" /></label>
                                <select name="sponsoremailtype">
                                    <option value="1" selected="selected">Parent/Guardian</option>
                                    <option value="3">Teacher/Instructor</option>
                                </select>
                            </p>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="register.do.submit" />">
                    </form>
                </div>
            </div>
        </div>
        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>
    </body>
</html>