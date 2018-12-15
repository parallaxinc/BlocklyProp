
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
        <meta name="application-name" content="BlocklyProp"/>
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
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<url:getCdnUrl url="/style.css"/>" />
        <script src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/jquery.form.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/profile.js"/>"></script>
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
