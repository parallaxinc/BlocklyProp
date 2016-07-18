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
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <link href="<url:getCdnUrl url="/lib/simplemde.min.css"/>" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="<url:getCdnUrl url="/style.css"/>" />
        <script src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/jquery.form.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/simplemde.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/project.js"/>" ></script>
        <script src="<url:getCdnUrl url="/authenticate.js"/>" ></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div id="project-table-container" class="container collapse">
            <div class="row">
                <div class="col-md-12">

                    <h2><fmt:message key="project.list.title"/></h2>

                    <jsp:include page="/WEB-INF/includes/pageparts/projecttable.jsp">
                        <jsp:param name="url" value="/rest/shared/project/list" />
                        <jsp:param name="showuser" value="true" />
                    </jsp:include>

                </div>
            </div>
        </div>

        <jsp:include page="/WEB-INF/includes/pageparts/projectform.jsp">
            <jsp:param name="mine" value="false" />
            <jsp:param name="shared" value="true" />
        </jsp:include>

        <%@ include file="/WEB-INF/includes/pageparts/project-login-dialog.jsp"%>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>