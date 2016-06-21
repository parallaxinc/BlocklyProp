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
    </head>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="oauth.wrong-authentication-source" /></h2>
                    <%
                        Boolean localUser = (Boolean) request.getAttribute("local");
                        String source = (String) request.getAttribute("source");
                        if (localUser != null && localUser) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="oauth.wrong-authentication-source.local" /></p>
                    </div>
                    <%
                    } else {
                        if (source != null && source.length() > 0) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="oauth.wrong-authentication-source.other" />: <%= source%></p>
                    </div>
                    <%
                    } else {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="oauth.wrong-authentication-source.other" /></p>
                    </div>
                    <%                            }
                        }
                    %>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>