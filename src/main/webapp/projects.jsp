<%--
    Document   : projects
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="<url:getCdnUrl url="/images/mstile-144x144.png" />" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="57x57" href="<url:getCdnUrl url="/images/apple-touch-icon-57x57.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="114x114" href="<url:getCdnUrl url="/images/apple-touch-icon-114x114.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="72x72" href="<url:getCdnUrl url="/images/apple-touch-icon-72x72.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="144x144" href="<url:getCdnUrl url="/images/apple-touch-icon-144x144.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="120x120" href="<url:getCdnUrl url="/images/apple-touch-icon-120x120.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="152x152" href="<url:getCdnUrl url="/images/apple-touch-icon-152x152.png"/>" />
        <link type="image/png" rel="icon" sizes="32x32" href="<url:getCdnUrl url="/images/favicon-32x32.png"/>" />
        <link type="image/png" rel="icon" sizes="16x16" href="<url:getCdnUrl url="/images/favicon-16x16.png"/>" />
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