<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
        <script src="<url:getCdnUrl url="/lib/sha256.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/authenticate.js"/>" ></script>
    </head>
    <body data-challenge="<authentication:challenge />" data-timestamp="<authentication:timestamp />" >

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <a href="register" ><fmt:message key="login.registerlink" /></a>
                </div>
                <div class="col-md-6 col-sm-12">
                    <h2><fmt:message key="login.title" /></h2>

                    <%@ include file="/WEB-INF/includes/pageparts/loginform.jsp"%>

                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>