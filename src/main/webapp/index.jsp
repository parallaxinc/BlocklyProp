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

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="jumbotron logo">
                <h1><fmt:message key="home.title" /></h1>
                <p><fmt:message key="home.text" /></p>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <h2><fmt:message key="home.latest_projects.title" /></h2>
                    <ul class="latest-projects"></ul>
                </div>

                <div class="col-md-4">
                    <h2><fmt:message key="home.c_project.title" /></h2>
                    <a class="editor-new-link editor-c-link editor-icon" href="<c:url value="/projectcreate.jsp?lang=PROPC"/>" data-href="<c:url value="/editor/blocklyc.jsp"/>"><fmt:message key="home.c_project.newlink" /></a>
                </div>

                <div class="col-md-4">
                    <h2><fmt:message key="home.spin_project.title" /></h2>
                    <a class="editor-new-link editor-spin-link editor-icon" href="<c:url value="/projectcreate.jsp?lang=SPIN"/>" data-href="<c:url value="/editor/blocklyspin.jsp"/>"><fmt:message key="home.spin_project.newlink" /></a>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/project-login-dialog.jsp"%>
        <script src="<c:url value="/cdn/latest.js"/>" ></script>
    </body>
</html>
