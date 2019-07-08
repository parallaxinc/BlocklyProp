<%@ include file="/WEB-INF/includes/include.jsp"%>
<%--
  ~ Copyright (c) 2018 Parallax Inc.
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

<div>
    <div id="login-failure" class="hidden">
        <div class="alert alert-danger" id="unlock-error">
            <p><fmt:message key="login.failed" /><%-- : < %=errorDescription%> --%></p>
        </div>
    </div>
    <p><a href="resetrequest"><fmt:message key="login.forgotlink" /></a></p>
    <p><a href="confirmrequest"><fmt:message key="login.notconfirmedlink" /></a></p>

    <%-- Post an authentication request to the AuthenticationServlet for authorization  --%>
    <form id="loginform" name="loginform" action="<url:getUrl url="/authenticate" />" method="post">
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