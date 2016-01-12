<%--
    Document   : footer
    Created on : 4-nov-2015, 20:39:22
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>



<footer class="footer">
    <nav class="navbar">
        <div class="container">
            <div>
                <ul class="nav navbar-nav">
                    <li><a href="<c:url value="/public/license"/>"><fmt:message key="footer.licenselink" /></a></li>
                    <li><a href="<c:url value="/public/libraries"/>"><fmt:message key="footer.librarieslink" /></a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <jsp:useBean id="date" class="java.util.Date" />
                    <li><a href="http://www.parallax.com" target="_blank">Parallax &copy; 2015 - <fmt:formatDate value="${date}" pattern="yyyy" /></a></li>
                </ul>
            </div>
        </div>
    </nav>
</footer>