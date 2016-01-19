<%--
    Document   : loginpage
    Created on : 19-jan-2016, 20:54:43
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<div>
    <script src="<c:url value="/cdn/lib/jquery.form.min.js"/>"></script>
    <script src="<c:url value="/cdn/lib/sha256.js"/>"></script>
    <script src="<c:url value="/cdn/login.js"/>"></script>

    <%@ include file="loginform.jsp"%>
</div>
