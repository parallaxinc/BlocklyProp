<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <script src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
    </head>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <h2>Projects</h2>
                    <shiro:authenticated><a href="<c:url value="/profile"/>"><shiro:principal></shiro:principal></a></shiro:authenticated>
                    <shiro:notAuthenticated><a href="<c:url value="/login.jsp"/>">Login/Register</a></shiro:notAuthenticated>

                    <shiro:authenticated><a href="<c:url value="/my/projects.jsp"/>">Your projects</a></shiro:authenticated>
                    <a href="<c:url value="/projects.jsp"/>">Project list</a>


                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <h2>Latest projects</h2>
                </div>

                <div class="col-md-4">
                    <h2>C Project</h2>
                    <a class="editor-new-link editor-c-link" href="<c:url value="/editor/blocklyc.jsp"/>">New</a>
                </div>

                <div class="col-md-4">
                    <h2>Spin project</h2>
                    <a class="editor-new-link editor-spin-link" href="<c:url value="/editor/blocklyspin.jsp"/>">New</a>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/project-login-dialog.jsp"%>

    </body>
</html>