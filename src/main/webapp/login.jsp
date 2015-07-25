<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <script src="/cdn/lib/angular.min.js" ></script>
        <link rel="stylesheet" href="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
    </head>
    <body ng-app="login">

        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <a href="register.jsp" >Register now!</a>
                </div>
                <div class="col-md-6 col-sm-12">
                    <h2>Please Log in</h2>
                    <%
                        String errorDescription = (String) request.getAttribute("shiroLoginFailure");
                        if (errorDescription != null) {
                    %>
                    <p>Login attempt was unsuccessful: <%=errorDescription%></p>
                    <p><a href="resetrequest">Forgot your password?</a></p>
                    <%
                        }
                    %>
                    <form name="loginform" action="" method="post">
                        <div class="form-group">
                            <label for="username" >Username:</label>
                            <input class="form-control" type="text" name="username" maxlength="30" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input class="form-control" type="password" name="password" maxlength="30" required="required"/>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="rememberMe"><label for="rememberMe">Remember Me</label>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="Login">
                    </form>
                </div>
            </div>
        </div>

    </body>
</html>