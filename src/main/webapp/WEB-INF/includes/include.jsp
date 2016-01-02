<%--
    Document   : include
    Created on : 24-mei-2015, 18:42:01
    Author     : Michel
--%>

<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="properties" uri="http://blocklyprop.parallax.com/properties" %>
<%@ taglib prefix="locale" uri="http://blocklyprop.parallax.com/locale" %>

<c:if test="${!language_set}">
    <c:set var="language_set" value="true" scope="request" />
    <locale:setLocale locale="${not empty param.language ? param.language : not empty language ? language : pageContext.request.locale}" />
</c:if>

<c:set var="language" value="${not empty param.language ? param.language : not empty language ? language : pageContext.request.locale}" scope="session" />
<fmt:setLocale value="${language}" />
<fmt:setBundle basename="com.parallax.server.blocklyprop.internationalization.translations" />