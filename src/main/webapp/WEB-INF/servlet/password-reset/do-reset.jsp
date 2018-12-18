<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
        <script>
        var passWarn = false;

        $(document).ready(function () {
            
            $("#passwordField").bind("keyup", function () {
                var passValue = document.getElementById('passwordField').value;
                passWarn = false;
                for (var t = 0; t < passValue.length; t++) {
                    if(passValue.charCodeAt(t) < 32 || passValue.charCodeAt(t) > 126) {
                        passWarn = true;
                    }  
                }
                if (passWarn) {
                    // show warning, disable submit button, give field red border
                    $("#submit-btn").prop("disabled",true);
                    $("#passWarning").removeClass('hidden');
                    $("#passwordField").css("border-color","#d43f3a");
                } else {
                    // hide warning, remove red border
                    $("#passWarning").addClass('hidden');
                    if (passValue.length > 7 && passValue === passValue.trim()) {
                        // password is long enough and does not begin or end in spaces, enable submit button and turn green
                        if (document.getElementById('confirmPasswordField').value === passValue) {
                            $("#submit-btn").prop("disabled",false);
                        }
                        $("#passWarningLength").addClass('hidden');
                        $("#passwordField").css("border-color","#25c435");
                    } else {
                        // password is too short, keep field neutral colored, keep submit button disabled
                        $("#submit-btn").prop("disabled",true);
                        $("#passwordField").css("border-color","");
                    }
                }
            });
    
            $("#confirmPasswordField").bind("blur", function () {
                var passValue2 = document.getElementById('confirmPasswordField').value;
                var passValue = document.getElementById('passwordField').value;
                if (document.getElementById('passwordField').value === passValue2) {
                    if (!passWarn && passValue.length > 7 && passValue === passValue.trim()) {
                        $("#submit-btn").prop("disabled",false);
                    }
                    $("#passWarningMatch").addClass('hidden');
                } else {
                    $("#submit-btn").prop("disabled",true);
                    $("#passWarningMatch").removeClass('hidden');
                }
            });
    
            $("#confirmPasswordField").bind("keyup", function () {
                var passValue2 = document.getElementById('confirmPasswordField').value;
                var passValue = document.getElementById('passwordField').value;
                if (document.getElementById('passwordField').value === passValue2) {
                    if (!passWarn && passValue.length > 7 && passValue === passValue.trim()) {
                        $("#submit-btn").prop("disabled",false);
                    }
                    $("#passWarningMatch").addClass('hidden');
                }
            });
    
            
            
            $("#passwordField").keypress(function(e) {
                var passValue = document.getElementById('passwordField').value;
                if(e.which == 13 && passValue.length < 8) {
                    $("#passWarningLength").removeClass('hidden');
                }
            });
            
            $("#passwordField").blur(function() {
                var passValue = document.getElementById('passwordField').value;
                if(passValue.length < 8 || passValue !== passValue.trim()) {
                    $("#passWarningLength").removeClass('hidden');
                }
            });
            
        });
        </script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="password_reset.do.title" /></h2>
                    <%
                        String serverError = (String) request.getAttribute("server-error");
                        if (serverError != null) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="error.generic" /></p>
                    </div>
                    <%
                        }
                        String errorDescription = (String) request.getAttribute("invalidToken");
                        if (errorDescription != null) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="password_reset.do.error.invalid_combination" /></p>
                    </div>
                    <%
                        }
                        String passwordsDontMatch = (String) request.getAttribute("passwordsDontMatch");
                        if (passwordsDontMatch != null) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="password_reset.do.error.passwords_dont_match" /></p>
                    </div>
                    <%
                        }
                        String passwordComplexity = (String) request.getAttribute("passwordComplexity");
                        if (passwordComplexity != null) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="password.complexity.error" /></p>
                    </div>
                    <%
                        }
                    %>
                    <form name="resetRequestForm" action="reset" method="post">
                        <div class="form-group">
                            <label for="email" ><fmt:message key="password_reset.do.email" /></label>
                            <input class="form-control" 
                                    type="text" 
                                    name="email" 
                                    maxlength="255" 
                                    required="required" 
                                    value="<%= request.getAttribute("email")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="token" ><fmt:message key="password_reset.do.token" /></label>
                            <input class="form-control" 
                                    type="text" 
                                    name="token" 
                                    maxlength="50" 
                                    required="required" 
                                    value="<%= request.getAttribute("token")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="password" ><fmt:message key="password_reset.do.password" /></label>
                            <input class="form-control" 
                                    type="password" 
                                    name="password" 
                                    id="passwordField" 
                                    maxlength="255" 
                                    required="required"
                                    placeholder="<fmt:message key="password.complexity" />" />
                            <!--<span id="helpBlock" class="help-block"><fmt:message key="password.complexity" /></span>-->
                            <div class="alert alert-danger hidden" id="passWarning"><fmt:message key="register.do.password.char.alert" /></div>
                            <div class="alert alert-warning hidden" id="passWarningLength"><fmt:message key="register.do.password.char.length" /></div>
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" ><fmt:message key="password_reset.do.confirm_password" /></label>
                            <input class="form-control" 
                                    type="password" 
                                    name="confirmpassword" 
                                    id="confirmPasswordField" 
                                    maxlength="255" 
                                    required="required"/>
                            <div class="alert alert-warning hidden" id="passWarningMatch"><fmt:message key="register.error.passwords_dont_match" /></div>
                        </div>
                        <input class="btn btn-default" 
                                type="submit" 
                                name="submit" 
                                id="submit-btn" 
                                value="<fmt:message key="password_reset.do.submit" />">
                    </form>
                    <p><a href="<url:getUrl url="/index"/>">Go to home</a></p>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>
