
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
    Document   : include
    Created on : 24-mei-2015, 18:42:01
    Author     : Michel

    Notes      : The <uri> element in the TLD is a unique name for the tag library. That’s it. It
                 does NOT need to represent any actual location (path or URL, for example). It simply
                 has to be a name—the same name you use in the taglib directive.
--%>
<%--  <%@ page import="org.apache.shiro.SecurityUtils" %>   --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="properties" uri="http://blocklyprop.parallax.com/properties" %>
<%@ taglib prefix="locale" uri="http://blocklyprop.parallax.com/locale" %>
<%@ taglib prefix="url" uri="http://blocklyprop.parallax.com/url" %>

<c:if test="${!language_set}">
    <c:set var="language_set" value="true" scope="request" />
<%--
    <locale:setLocale locale="${not empty param.language ? param.language : not empty language ? language : pageContext.request.locale}" />
--%>
</c:if>

<c:set var="language" value="${not empty param.language ? param.language : not empty language ? language : pageContext.request.locale}" scope="session" />
<fmt:setLocale value="${language}" />
<fmt:setBundle basename="com.parallax.server.blocklyprop.internationalization.translations" />
