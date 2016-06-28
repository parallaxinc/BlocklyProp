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
        <script type="text/javascript" src="<url:getCdnUrl url="/oauth-complete.js"/>"></script>
    </head>
    <%
        String redirect = (String) request.getAttribute("redirect");
        if (redirect != null) {
    %>
    <body data-redirect="<%= redirect%>" >
        <%
        } else {
        %>
    <body data-redirect="<url:getUrl url="/" />" >
        <%
            }
        %>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="oauth.success" /></h2>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>