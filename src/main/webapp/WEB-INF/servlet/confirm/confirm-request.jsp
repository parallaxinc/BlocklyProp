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

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="confirm.request.title" /></h2>
                    <%
                        Boolean error = (Boolean) request.getAttribute("error");
                        if (error != null && error) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="error.generic" /></p>
                    </div>
                    <%
                        }
                        Boolean unknownEmail = (Boolean) request.getAttribute("unknownEmail");
                        if (unknownEmail != null && unknownEmail) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="error.unknownemail" /></p>
                    </div>
                    <%
                        }
                        Boolean insufficientTokens = (Boolean) request.getAttribute("insufficientTokens");
                        if (insufficientTokens != null && insufficientTokens) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="confirm.error.requested_too_often" /></p>
                    </div>
                    <%
                        }
                        Boolean wrongAuthenticationSource = (Boolean) request.getAttribute("wrongAuthenticationSource");
                        if (wrongAuthenticationSource != null && wrongAuthenticationSource) {
                    %>
                    <div class="alert alert-danger">
                        <p><fmt:message key="confirm.error.wrong_authentication_source" /></p>
                    </div>
                    <%
                        }
                    %>
                    <form name="confirmRequestForm" action="" method="post">
                        <div class="form-group">
                            <label for="token" ><fmt:message key="confirm.request.email" /></label>
                            <input class="form-control" type="text" name="email" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="confirm.request.submit" />">
                    </form>
                    <p><a href="<url:getUrl url="/index"/>" >Go to home page</a></p>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>