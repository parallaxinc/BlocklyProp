<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link rel="stylesheet" href="<url:getUrl url="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<url:getUrl url="/cdn/style.css"/>" />
        <script src="<url:getUrl url="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="profile.title" /></h2>
                    <%
                        String baseSuccessDescription = (String) request.getAttribute("base-success");
                        if (baseSuccessDescription != null) {
                    %>
                    <div class="alert alert-success">
                        <p><%= baseSuccessDescription%></p>
                    </div>
                    <%
                        }
                        String baseErrorDescription = (String) request.getAttribute("base-error");
                        if (baseErrorDescription != null) {
                    %>
                    <div class="alert alert-danger">
                        <p><%= baseErrorDescription%></p>
                    </div>
                    <%
                        }
                    %>
                    <form name="baseInfoForm" method="post">
                        <div class="form-group">
                            <label for="email" ><fmt:message key="profile.email" /></label>
                            <input class="form-control" type="text" name="email" maxlength="255" required="required" disabled="disabled" value="<%= request.getAttribute("email")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="screenname" ><fmt:message key="profile.screenname" /></label>
                            <input class="form-control" type="text" name="screenname" maxlength="255" required="required" value="<%= request.getAttribute("screenname")%>"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-base" value="<fmt:message key="profile.submit" />">
                    </form>
                    <%
                        String passwordSuccessDescription = (String) request.getAttribute("password-success");
                        if (passwordSuccessDescription != null) {
                    %>
                    <div class="alert alert-success">
                        <p><%= passwordSuccessDescription%></p>
                    </div>
                    <%
                        }

                        String passwordErrorDescription = (String) request.getAttribute("password-error");
                        if (passwordErrorDescription != null) {
                    %>
                    <div class="alert alert-danger">
                        <p><%= passwordErrorDescription%></p>
                    </div>
                    <%
                        }
                    %>
                    <form name="passwordForm" method="post">
                        <div class="form-group">
                            <label for="oldpassword" ><fmt:message key="profile.old_password" /></label>
                            <input class="form-control" type="password" name="oldpassword" maxlength="255" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="password" ><fmt:message key="profile.password" /></label>
                            <input class="form-control" type="password" name="password" maxlength="255" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" ><fmt:message key="profile.confirm_password" /></label>
                            <input class="form-control" type="password" name="confirmpassword" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-password" value="<fmt:message key="profile.submit_password" />">
                    </form>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>