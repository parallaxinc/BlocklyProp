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
        <script src="<url:getUrl url="/cdn/lib/jquery.form.min.js"/>"></script>
        <script src="<url:getUrl url="/cdn/profile.js"/>"></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h2><fmt:message key="profile.title" /></h2>
                </div>
            </div>
            <div id="profile-form" class="row collapse in">
                <div class="col-md-12 col-sm-12">
                    <div class="alert alert-success hidden form-message" id="base-success">
                        <p><fmt:message key="profile.base.success" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="base-error">
                        <p><fmt:message key="profile.base.error" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="base-screenname-error">
                        <p><fmt:message key="profile.base.error.screenname" /></p>
                    </div>
                    <form id="baseInfoForm" name="baseInfoForm" action="<url:getUrl url="/rest/profile/base" />" method="post">
                        <input type="hidden" name="id" value="<%= request.getAttribute("id")%>">
                        <input type="hidden" name="username" value="<%= request.getAttribute("email")%>" />
                        <div class="form-group">
                            <label for="email" ><fmt:message key="profile.email" /></label>
                            <input class="form-control" type="text" name="email" maxlength="255" required="required" disabled="disabled" value="<%= request.getAttribute("email")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="authentication-source" ><fmt:message key="profile.authentication-source" /></label>
                            <input class="form-control" type="text" name="authentication-source" maxlength="255" required="required" disabled="disabled" value="<%= request.getAttribute("authentication-source")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="screenname" ><fmt:message key="profile.screenname" /></label>
                            <input class="form-control" type="text" name="screenname" maxlength="255" required="required" value="<%= request.getAttribute("screenname")%>"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-base" value="<fmt:message key="profile.submit" />">
                    </form>

                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>