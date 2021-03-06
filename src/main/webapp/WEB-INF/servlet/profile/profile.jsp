<%--
   ~ Copyright (c) 2018 Parallax Inc.
   ~
   ~ Permission is hereby granted, free of charge, to any person obtaining a copy of this software
   ~ and associated documentation files (the “Software”), to deal in the Software without
   ~ restriction, including without limitation the rights to use, copy, modify, merge, publish,
   ~ distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
   ~ Software is furnished to do so, subject to the following conditions:
   ~
   ~ The above copyright notice and this permission notice shall be included in all copies or
   ~ substantial portions of the Software.
   ~
   ~ THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   ~ IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   ~ FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   ~ AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   ~ LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   ~ OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   ~ SOFTWARE.
--%>

<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>
<!DOCTYPE html>
<html>
    <head>
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="<url:getCdnUrl url="/images/mstile-144x144.png" />" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="57x57" href="<url:getCdnUrl url="/images/apple-touch-icon-57x57.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="114x114" href="<url:getCdnUrl url="/images/apple-touch-icon-114x114.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="72x72" href="<url:getCdnUrl url="/images/apple-touch-icon-72x72.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="144x144" href="<url:getCdnUrl url="/images/apple-touch-icon-144x144.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="120x120" href="<url:getCdnUrl url="/images/apple-touch-icon-120x120.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="152x152" href="<url:getCdnUrl url="/images/apple-touch-icon-152x152.png"/>" />
        <link type="image/png" rel="icon" sizes="32x32" href="<url:getCdnUrl url="/images/favicon-32x32.png"/>" />
        <link type="image/png" rel="icon" sizes="16x16" href="<url:getCdnUrl url="/images/favicon-16x16.png"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<url:getCdnUrl url="/style.css"/>" />
        <script src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/jquery.form.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/profile.js"/>"></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>
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
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="profile.title" /></h2>
                </div>
            </div>
            <div id="unlock-form" class="row collapse in">
                <div class="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-12">
                    <div class="alert alert-success hidden form-message" id="password-success">
                        <p><fmt:message key="profile.password.success" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="unlock-error">
                        <p><fmt:message key="profile.unlock.error" /></p>
                    </div>
                    <form id="loginform" action="<url:getUrl url="/profile" />" method="post">
                        <h3><fmt:message key="profile.unlock.title" /></h3>
                        <input type="hidden" name="username" value="<%= request.getAttribute("email")%>" />
                        <div class="form-group">
                            <label for="password" ><fmt:message key="profile.unlock.password" /></label>
                            <input class="form-control" type="password" name="password" id="password" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="unlock" value="<fmt:message key="profile.unlock.submit" />">
                    </form>
                </div>
            </div>
            <div id="profile-form" class="row collapse">
                <div class="col-md-12 col-sm-12">
                    <div class="alert alert-success hidden form-message" id="base-success">
                        <p><fmt:message key="profile.base.success" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="base-error">
                        <p><fmt:message key="profile.base.error" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="base-screenname-error">
                        <p><fmt:message key="profile.base.error.screenname" /></p>
                    </div>
                    <form id="baseInfoForm" name="baseInfoForm" action="<url:getUrl url="/rest/profile/base" />" method="post">
                        <input type="hidden" name="id" value="<%= request.getAttribute("id")%>">
                        <input type="hidden" name="username" value="<%= request.getAttribute("email")%>" />
                        <input class="password" type="hidden" name="password" value="">
                        <div class="form-group">
                            <label for="email" ><fmt:message key="profile.email" /></label>
                            <input class="form-control" type="text" name="email" maxlength="255" required="required" disabled="disabled" value="<%= request.getAttribute("email")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="screenname" ><fmt:message key="profile.screenname" /></label>
                            <input class="form-control" type="text" name="screenname" maxlength="255" required="required" value="<%= request.getAttribute("screenname")%>"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-base" value="<fmt:message key="profile.submit" />">
                    </form>

                    <div class="alert alert-danger hidden form-message" id="password-error">
                        <p><fmt:message key="profile.password.error" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="password-complexity-error">
                        <p><fmt:message key="password.complexity.error" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="password-matching-error">
                        <p><fmt:message key="profile.password-confirm.error" /></p>
                    </div>
                    <form id="passwordForm" name="passwordForm" action="<url:getUrl url="/rest/profile/password" />" method="post">
                        <input type="hidden" name="id" value="<%= request.getAttribute("id")%>">
                        <input type="hidden" name="username" value="<%= request.getAttribute("email")%>" />
                        <input class="password" type="hidden" name="oldpassword" />
                        <div class="form-group">
                            <label for="password" ><fmt:message key="profile.password" /></label>
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
                            <label for="confirmpassword" ><fmt:message key="profile.confirm_password" /></label>
                            <input class="form-control" 
                                    type="password" 
                                    name="confirmpassword" 
                                    id="confirmPasswordField" 
                                    maxlength="255" 
                                    required="required"/>
                            <div class="alert alert-warning hidden" id="passWarningMatch"><fmt:message key="register.error.passwords_dont_match" /></div>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-password" id="submit-btn" value="<fmt:message key="profile.submit_password" />">
                    </form>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>
