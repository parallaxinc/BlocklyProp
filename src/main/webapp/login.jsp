<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>"/>
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
        <script src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <a href="register" ><fmt:message key="login.registerlink" /></a>
                </div>
                <div class="col-md-6 col-sm-12">
                    <h2><fmt:message key="login.title" /></h2>
                    <%
                        String errorDescription = (String) request.getAttribute("shiroLoginFailure");
                        if (errorDescription != null) {
                    %>
                    <p><fmt:message key="login.failed" /><%-- : < %=errorDescription%> --%></p>
                    <p><a href="resetrequest"><fmt:message key="login.forgotlink" /></a></p>
                    <p><a href="confirmrequest"><fmt:message key="login.notconfirmedlink" /></a></p>
                    <%
                        }
                    %>
                    <form name="loginform" action="" method="post">
                        <div class="form-group">
                            <label for="username" ><fmt:message key="login.email" /></label>
                            <input class="form-control" type="text" name="username" maxlength="255" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="password"><fmt:message key="login.password" /></label>
                            <input class="form-control" type="password" name="password" maxlength="255" required="required"/>
                        </div>
                        <%--     <div class="form-group">
                        <input type="checkbox" name="rememberMe"><label for="rememberMe"><fmt:message key="login.remember" /></label>
</div>--%>
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="login.submit" />">
                    </form>
                </div>
            </div>
        </div>

    </body>
</html>