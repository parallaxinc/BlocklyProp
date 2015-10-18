<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta name="base" content="<c:url value="/"/>">
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
        <script src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/jquery.form.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>" ></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
        <script src="<c:url value="/cdn/project.js"/>" ></script>
    </head>
    <body>

        <div id="project-table-container" class="container collapse">
            <div class="row">
                <div class="col-md-12">

                    <h2><a href="<c:url value="/index.jsp"/>">BlocklyProp</a>: Projects</h2>
                    <a href="<c:url value="/profile"/>"><shiro:principal></shiro:principal></a>
                    <a href="<c:url value="/logout"/>">Logout</a>

                    <jsp:include page="/WEB-INF/includes/pageparts/projecttable.jsp">
                        <jsp:param name="url" value="/rest/project/list" />
                        <jsp:param name="showuser" value="false" />
                    </jsp:include>

                </div>
            </div>
        </div>

        <jsp:include page="/WEB-INF/includes/pageparts/projectform.jsp">
            <jsp:param name="mine" value="true" />
            <jsp:param name="shared" value="false" />
        </jsp:include>

    </body>
</html>