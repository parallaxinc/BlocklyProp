<%--
    Document   : login
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
            <div id="unlock-form" class="row collapse in">
                <div class="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-12">
                    <div class="alert alert-success hidden form-message" id="password-success">
                        <p><fmt:message key="profile.password.success" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="unlock-error">
                        <p><fmt:message key="profile.unlock.error" /></p>
                    </div>
                    <form id="loginform" action="<url:getUrl url="/profile" />" method="post">
                        <h3><fmt:message key="profile.unlock.title" /></h3>
                        <input type="hidden" name="username" value="<%= request.getAttribute("email")%>" />
                        <div class="form-group">
                            <label for="password" ><fmt:message key="profile.unlock.password" /></label>
                            <input class="form-control" type="password" name="password" id="password" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="unlock" value="<fmt:message key="profile.unlock.submit" />">
                    </form>
                </div>
            </div>
            <div id="profile-form" class="row collapse">
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
                        <input class="password" type="hidden" name="password" value="">
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

                    <div class="alert alert-danger hidden form-message" id="password-error">
                        <p><fmt:message key="profile.password.error" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="password-complexity-error">
                        <p><fmt:message key="password.complexity.error" /></p>
                    </div>
                    <div class="alert alert-danger hidden form-message" id="password-matching-error">
                        <p><fmt:message key="profile.password-confirm.error" /></p>
                    </div>
                    <form id="passwordForm" name="passwordForm" action="<url:getUrl url="/rest/profile/password" />" method="post">
                        <input type="hidden" name="id" value="<%= request.getAttribute("id")%>">
                        <input type="hidden" name="username" value="<%= request.getAttribute("email")%>" />
                        <input class="password" type="hidden" name="oldpassword" />
                        <div class="form-group">
                            <label for="password" ><fmt:message key="profile.password" /></label>
                            <input class="form-control password-match" type="password" name="password" maxlength="255" required="required"/>
                            <span id="helpBlock" class="help-block"><fmt:message key="password.complexity" /></span>
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" ><fmt:message key="profile.confirm_password" /></label>
                            <input class="form-control password-match" type="password" name="confirmpassword" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-password" value="<fmt:message key="profile.submit_password" />">
                    </form>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>