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
        <script src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="confirm.request.title" /></h2>
                    <%
                        Boolean error = (Boolean) request.getAttribute("error");
                        if (error != null && error) {
                    %>
                    <div><fmt:message key="error.generic" /></div>
                    <%
                        }
                        Boolean unknownEmail = (Boolean) request.getAttribute("unknownEmail");
                        if (unknownEmail != null && unknownEmail) {
                    %>
                    <div><fmt:message key="error.unknownemail" /></div>
                    <%
                        }
                        Boolean insufficientTokens = (Boolean) request.getAttribute("insufficientTokens");
                        if (insufficientTokens != null && insufficientTokens) {
                    %>
                    <div><fmt:message key="confirm.error.requested_too_often" /></div>
                    <%
                        }
                    %>
                    <form name="confirmRequestForm" action="" method="post">
                        <div class="form-group">
                            <label for="token" ><fmt:message key="confirm.request.email" /></label>
                            <input class="form-control" type="text" name="email" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="confirm.request.submit" />">
                    </form>
                    <p><a href="index.jsp">Go to home</a></p>
                </div>
            </div>
        </div>

    </body>
</html>