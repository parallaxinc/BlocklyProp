<%--
    Document   : register
    Created on : 31-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
        <script src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
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
                    <div><fmt:message key="error.generic" /></div>
                    <%
                        }
                        Boolean emailAlreadyUsed = (Boolean) request.getAttribute("emailAlreadyUsed");
                        if (emailAlreadyUsed != null && emailAlreadyUsed) {
                    %>
                    <div><fmt:message key="register.error.email_already_used" /></div>
                    <%
                        }
                        Boolean passwordsDontMatch = (Boolean) request.getAttribute("passwordsDontMatch");
                        if (passwordsDontMatch != null && passwordsDontMatch) {
                    %>
                    <div><fmt:message key="register.error.passwords_dont_match" /></div>
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

    </body>
</html>