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

        <div class="container">
            <div class="navbar navbar-default">
                <p class="navbar-text"><strong><fmt:message key="help.title" /></strong></p>
                <ul class="nav navbar-nav">
                    <li><a href="<c:url value="/public/help?f=blocklyprop"/>"><fmt:message key="help.menu.blocklyprop" /></a></li>
                    <li><a href="<c:url value="/public/help?f=blocks"/>"><fmt:message key="help.menu.blocks" /></a></li>

                </ul>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <%
                        String html = (String) request.getAttribute("html");
                        if (html != null) {
                    %>
                    <%= html%>
                    <% } else {%>
                    <h2><fmt:message key="html.content_missing" /></h2>
                    <% }%>

                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>