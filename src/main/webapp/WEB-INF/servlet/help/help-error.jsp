<%--
    Document   : projects
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta name="base" content="<c:url value="/"/>">
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
        <script src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>" ></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <%@ include file="/WEB-INF/servlet/help/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <%
                        Boolean notFound = (Boolean) request.getAttribute("help-not-found");
                        if (notFound != null && notFound) {
                    %>
                    <h2><fmt:message key="help.not-found" /></h2>
                    <% }
                        Boolean invalidPath = (Boolean) request.getAttribute("help-invalid-path");
                        if (invalidPath != null && invalidPath) {
                    %>
                    <h2><fmt:message key="help.invalid-path" /></h2>
                    <% }%>

                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>