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

                    <%@ include file="/WEB-INF/includes/pageparts/language-switcher.jsp"%>

                    <shiro:authenticated><a href="<c:url value="/profile"/>"><shiro:principal></shiro:principal></a></shiro:authenticated>
                    <shiro:notAuthenticated><a href="<c:url value="/login.jsp"/>"><fmt:message key="menu.login_and_register" /></a></shiro:notAuthenticated>

                    <shiro:authenticated>
                        <a href="<c:url value="/my/projects.jsp"/>"><fmt:message key="menu.your_projects" /></a>
                        <a href="<c:url value="/logout"/>"><fmt:message key="logout" /></a>
                    </shiro:authenticated>
                    <a href="<c:url value="/projects.jsp"/>"><fmt:message key="menu.project_list" /></a>


                </div>
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
