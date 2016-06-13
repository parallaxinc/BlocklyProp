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
                            <input class="form-control" type="text" name="email" maxlength="255" required="required" value="<%= request.getAttribute("email")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="token" ><fmt:message key="password_reset.do.token" /></label>
                            <input class="form-control" type="text" name="token" maxlength="50" required="required" value="<%= request.getAttribute("token")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="password" ><fmt:message key="password_reset.do.password" /></label>
                            <input class="form-control" type="password" name="password" maxlength="255" required="required"/>
                            <span id="helpBlock" class="help-block"><fmt:message key="password.complexity" /></span>
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" ><fmt:message key="password_reset.do.confirm_password" /></label>
                            <input class="form-control" type="password" name="confirmpassword" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="password_reset.do.submit" />">
                    </form>
                    <p><a href="<url:getUrl url="/index"/>">Go to home</a></p>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>