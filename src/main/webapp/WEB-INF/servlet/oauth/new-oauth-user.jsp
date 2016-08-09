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
                    <h2><fmt:message key="oauth.new-user" /></h2>
                    <div class="alert alert-danger hidden form-message" id="base-screenname-error">
                        <p><fmt:message key="oauth.new-user.error.screenname" /></p>
                    </div>
                    <form name="oauthNewUserForm" action="<url:getUrl url="/oauth/newuser" />" method="post">
                        <div class="form-group">
                            <label for="screenname" ><fmt:message key="oauth.new-user.screenname" /></label>
                            <input class="form-control" type="text" name="screenname" maxlength="255" required="required" />
                        </div>
                        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="oauth.new-user.do.submit" />">
                    </form>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>