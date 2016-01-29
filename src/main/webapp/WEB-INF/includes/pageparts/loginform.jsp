<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>


<%@ include file="/WEB-INF/includes/include.jsp"%>

<div>
    <div id="failure" class="hidden">
        <p><fmt:message key="login.failed" /><%-- : < %=errorDescription%> --%></p>
        <p><a href="resetrequest"><fmt:message key="login.forgotlink" /></a></p>
        <p><a href="confirmrequest"><fmt:message key="login.notconfirmedlink" /></a></p>
    </div>
    <form id="loginform" name="loginform" action="${properties:authenticationserver('/authenticate')}" method="post" data-challenge="<authentication:challenge />" data-timestamp="<authentication:timestamp />">
        <div class="form-group">
            <label for="username" ><fmt:message key="login.email" /></label>
            <input class="form-control" type="text" name="username" maxlength="255" required="required"/>
        </div>
        <div class="form-group">
            <label for="password"><fmt:message key="login.password" /></label>
            <input class="form-control" type="password" name="password" maxlength="255" required="required"/>
        </div>
        <input class="btn btn-default" type="submit" name="submit" value="<fmt:message key="login.submit" />">
    </form>
</div>
