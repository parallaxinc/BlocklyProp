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
                    <h2>Request reset</h2>
                    <%
                        String errorDescription = (String) request.getAttribute("error");
                        if (errorDescription != null) {
                    %>
                    <div>Invalid token</div>
                    <%
                        }
                    %>
                    <form name="resetRequestForm" action="" method="post">
                        <div class="form-group">
                            <label for="token" >Email:</label>
                            <input class="form-control" type="text" name="email" maxlength="30" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="Confirm">
                    </form>
                </div>
            </div>
        </div>

    </body>
</html>