<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link type="text/css" rel="stylesheet"
              href='<c:url value="/resources/style.css"/>' />
        <script src="resources/angular.min.js" ></script>
        <link rel="stylesheet" href="resources/bootstrap/core/css/bootstrap.min.css"/>
    </head>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2>Do password reset</h2>
                    <%
                        String errorDescription = (String) request.getAttribute("error");
                        if (errorDescription != null) {
                    %>
                    <div>Invalid token/email combination</div>
                    <%
                        }
                    %>
                    <form name="resetRequestForm" action="reset" method="post">
                        <div class="form-group">
                            <label for="email" >Email:</label>
                            <input class="form-control" type="text" name="email" maxlength="30" required="required" value="<%= request.getAttribute("email")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="token" >Token:</label>
                            <input class="form-control" type="text" name="token" maxlength="30" required="required" value="<%= request.getAttribute("token")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="password" >Password:</label>
                            <input class="form-control" type="password" name="password" maxlength="30" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" >Confirm password:</label>
                            <input class="form-control" type="password" name="confirmpassword" maxlength="30" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="Confirm">
                    </form>
                </div>
            </div>
        </div>

    </body>
</html>