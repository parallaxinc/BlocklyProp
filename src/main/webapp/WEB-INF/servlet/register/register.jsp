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
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12"></div>
                <div class="col-md-6 col-sm-12">
                    <h2><fmt:message key="register.do.title" /></h2>
                    <%
                        Boolean error = (Boolean) request.getAttribute("error");
                        if (error != null && error) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="error.generic" /></p>
                    </div>
                    <%
                        }
                        Boolean emailAlreadyUsed = (Boolean) request.getAttribute("emailAlreadyUsed");
                        if (emailAlreadyUsed != null && emailAlreadyUsed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.email_already_used" /></p>
                    </div>
                    <%
                        }
                        Boolean emailMalformed = (Boolean) request.getAttribute("emailMalformed");
                        if (emailMalformed != null && emailMalformed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.email_format_error" /></p>
                    </div>
                    <%
                        }
                        Boolean sponsorEmailMalformed = (Boolean) request.getAttribute("sponsorEmailMalformed");
                        if (sponsorEmailMalformed != null && sponsorEmailMalformed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.sponsor_email_format_error" /></p>
                    </div>
                    <%
                        }
                        Boolean passwordsDontMatch = (Boolean) request.getAttribute("passwordsDontMatch");
                        if (passwordsDontMatch != null && passwordsDontMatch) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.passwords_dont_match" /></p>
                    </div>
                    <%
                        }
                        Boolean missingFields = (Boolean) request.getAttribute("missingFields");
                        if (missingFields != null && missingFields) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.missing_fields" /></p>
                    </div>
                    <%
                        }
                        Boolean passwordComplexity = (Boolean) request.getAttribute("passwordComplexity");
                        if (passwordComplexity != null && passwordComplexity) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="password.complexity.error" /></p>
                    </div>
                    <%
                        }
                        Boolean screennameUsed = (Boolean) request.getAttribute("screennameUsed");
                        if (screennameUsed != null && screennameUsed) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="register.error.screenname_used" /></p>
                    </div>
                    <%
                        }
                    %>
                    <form name="registerForm" action="" method="post">
                        <div class="form-group">
                            <label for="screenname" ><fmt:message key="register.do.screenname" /></label>
                            <input class="form-control" type="text" name="screenname" maxlength="255" value="<%= request.getAttribute("screenname")%>">
                        </div>
                        <div class="form-group">
                            <label for="email" ><fmt:message key="register.do.email" /></label>
                            <input class="form-control" type="text" name="email" maxlength="255" value="<%= request.getAttribute("email")%>">
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
                            <label for="bdmonth"><fmt:message key="register.do.birth.month" /></label>
                            <select name="bdmonth">
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
                            </select>
                            <label for="bdyear"><fmt:message key="register.do.birth.year" /></label>
                            <select name="bdyear">
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
                            </select>
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
                        <div class="form-group">
                            <label for="sponsoremail" ><fmt:message key="register.do.sponsor.email" /></label>
                            <input class="form-control" type="text" name="sponsoremail" maxlength="255" value="<%= request.getAttribute("parentemail")%>">
                            <label for="sponsoremailtype"><fmt:message key="register.do.sponsor.emailtype" /></label>
                            <select name="sponsoremailtype">
                                <option value="1" selected="selected">Parent</option>
                                <option value="2">Legal Guardian</option>
                                <option value="3">Instructor</option>
                            </select>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="register.do.submit" />">
                    </form>
                </div>
            </div>
        </div>
        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>
    </body>
</html>