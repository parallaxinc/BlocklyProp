<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
    </head>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2>Email confirm request</h2>
                    <%
                        Boolean error = (Boolean) request.getAttribute("error");
                        if (error != null && error) {
                    %>
                    <div>A problem occured</div>
                    <%
                        }
                        Boolean unknownEmail = (Boolean) request.getAttribute("unknownEmail");
                        if (unknownEmail != null && unknownEmail) {
                    %>
                    <div>Unknown email</div>
                    <%
                        }
                        Boolean insufficientTokens = (Boolean) request.getAttribute("insufficientTokens");
                        if (insufficientTokens != null && insufficientTokens) {
                    %>
                    <div>Confirm requested too often</div>
                    <%
                        }
                    %>
                    <form name="confirmRequestForm" action="" method="post">
                        <div class="form-group">
                            <label for="token" >Email:</label>
                            <input class="form-control" type="text" name="email" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="Request">
                    </form>
                    <p><a href="index.jsp">Go to home</a></p>
                </div>
            </div>
        </div>

    </body>
</html>