<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link type="text/css" rel="stylesheet" href="<url:getUrl url="/cdn/style.css"/>" />
        <link rel="stylesheet" href="<url:getUrl url="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<url:getUrl url="/cdn/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <script src="<url:getUrl url="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/lib/sha256.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/authenticate.js"/>" ></script>
    </head>
    <body data-challenge="<authentication:challenge />" data-timestamp="<authentication:timestamp />" >

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
                    <a class="editor-new-link editor-c-link editor-icon" href="<url:getUrl url="/projectcreate.jsp?lang=PROPC"/>" data-href="<url:getUrl url="/editor/blocklyc.jsp"/>"><fmt:message key="home.c_project.newlink" /></a>
                </div>

                <div class="col-md-4">
                    <h2><fmt:message key="home.spin_project.title" /></h2>
                    <a class="editor-new-link editor-spin-link editor-icon" href="<url:getUrl url="/projectcreate.jsp?lang=SPIN"/>" data-href="<url:getUrl url="/editor/blocklyspin.jsp"/>"><fmt:message key="home.spin_project.newlink" /></a>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/project-login-dialog.jsp"%>
        <script src="<url:getUrl url="/cdn/latest.js"/>" ></script>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>
    </body>
</html>
