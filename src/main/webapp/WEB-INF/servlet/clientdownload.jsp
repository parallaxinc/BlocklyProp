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
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
        <link href="<url:getCdnUrl url="/style-clientdownload.css"/>" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="<url:getCdnUrl url="/detect.js"/>"></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h2><fmt:message key="clientdownload.title" /></h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">

                    <%
                        String html = (String) request.getAttribute("html");
                        if (html != null) {
                    %>
                    <%= html%>
                    <% } else {%>
                    <p><fmt:message key="html.content_missing" /></p>
                    <% }%>

                </div>

                <div class="col-md-6">
                    <div class="clients">
                        <div class="client MacOS">
                            <a href="${properties:downloadfiles('/blocklyprop-client-macos.zip')}">MacOS client</a>
                        </div>
                        <!--<div class="client Windows">
                            Windows 32bit client
                        </div>-->
                        <div class="client Windows">
                            <a href="${properties:downloadfiles('/blocklyprop-client-win64.zip')}">Windows 64bit client</a>
                        </div>
                        <!--    <div class="client Windows">
                                Windows service
                            </div>-->
                    </div>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>