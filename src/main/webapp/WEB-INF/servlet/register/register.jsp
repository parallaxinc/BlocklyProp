<%--
    Document   : register
    Created on : 31-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">

                </div>
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
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="register.do.submit" />">
                    </form>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>