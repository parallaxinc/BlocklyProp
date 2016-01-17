<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta name="base" content="<url:getUrl url="/"/>">
        <link rel="stylesheet" href="<url:getUrl url="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<url:getUrl url="/cdn/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<url:getUrl url="/cdn/style.css"/>" />
        <script src="<url:getUrl url="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/lib/jquery.form.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/project.js"/>" ></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div id="project-table-container" class="container collapse">
            <div class="row">
                <div class="col-md-12">

                    <h2><a href="<url:getUrl url="/index.jsp"/>">BlocklyProp</a>: Projects</h2>

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

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>