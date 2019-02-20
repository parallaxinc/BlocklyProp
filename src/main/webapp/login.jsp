<%--
  ~ Copyright (c) 2019 Parallax Inc.
  ~
  ~ Permission is hereby granted, free of charge, to any person obtaining a copy of this software
  ~ and associated documentation files (the “Software”), to deal in the Software without
  ~ restriction, including without limitation the rights to use, copy, modify, merge, publish,
  ~ distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
  ~ Software is furnished to do so, subject to the following conditions:
  ~
  ~ The above copyright notice and this permission notice shall be included in all copies or
  ~ substantial portions of the Software.
  ~
  ~ THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  ~ IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  ~ FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  ~ AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  ~ LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  ~ OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  ~ SOFTWARE.
--%>
<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>
<!DOCTYPE html>
<html>
    <head>
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
    </head>
    <body>
        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                </div>
                <div class="col-md-6 col-sm-12">
                    <h3><fmt:message key="login.title" /></h3>
                    <%
                        String errorDescription = (String) request.getAttribute("shiroLoginFailure");
                        if (errorDescription != null) {
                    %>
                    <div id="login-failure">
                        <div class="alert alert-danger" id="unlock-error">
                            <p><fmt:message key="login.failed" /><%-- : < %=errorDescription%> --%></p>
                        </div>
                    </div>
                    <%
                        }
                    %>
                    <p><a href="register" ><fmt:message key="login.registerlink" /></a></p>
                    <p><a href="resetrequest"><fmt:message key="login.forgotlink" /></a></p>
                    <p><a href="confirmrequest"><fmt:message key="login.notconfirmedlink" /></a></p>

                    <%-- This form has additional processing in the /WEB-INF/includes/pageparts/loginform.jsp --%>
                    <form id="loginform" name="loginform" action="<url:getUrl url="/login.jsp" />" method="post">
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
                    <c:if test="${properties:oauth('google')}">
                        <a href="<url:getUrl url="/oauth/google" />" target="oauth">Log in using Google</a>
                    </c:if>
                </div>
            </div>
        </div>
        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>
    </body>
</html>