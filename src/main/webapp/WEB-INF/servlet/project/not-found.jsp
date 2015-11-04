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

        <div class="row">
            <div class="col-md-12">

                <h2><a href="<c:url value="/index.jsp"/>">BlocklyProp</a>: Project not found</h2>
                <shiro:authenticated><a href="<c:url value="/profile"/>"><shiro:principal></shiro:principal></a></shiro:authenticated>
                <shiro:notAuthenticated><a href="<c:url value="/login.jsp"/>">Login/Register</a></shiro:notAuthenticated>

                <shiro:authenticated><a href="<c:url value="/my/projects.jsp"/>">Your projects</a></shiro:authenticated>

            </div>
        </div>

    </body>
</html>