<%--
    Document   : projects
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta name="base" content="<url:getUrl url="/"/>">
        <link rel="stylesheet" href="<url:getUrl url="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<url:getUrl url="/cdn/style.css"/>" />
        <script src="<url:getUrl url="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>" ></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="row">
            <div class="col-md-12">

                <h2><a href="<url:getUrl url="/index.jsp"/>">BlocklyProp</a>: Not authorized</h2>
                <shiro:authenticated><a href="<url:getUrl url="/profile"/>"><shiro:principal></shiro:principal></a></shiro:authenticated>
                <shiro:notAuthenticated><a href="<url:getUrl url="/login.jsp"/>">Login/Register</a></shiro:notAuthenticated>

                <shiro:authenticated><a href="<url:getUrl url="/my/projects.jsp"/>">Your projects</a></shiro:authenticated>

                </div>
            </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>