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
                    <li><a href="<url:getUrl url="/public/license"/>"><fmt:message key="footer.licenselink" /></a></li>
                    <li><a href="https://github.com/parallaxinc/BlocklyProp/releases" target="_blank"><fmt:message key="footer.changelog" /></a></li>
                    <li><a href="<url:getUrl url="/public/libraries"/>"><fmt:message key="footer.librarieslink" /></a></li>
                    <li><a href="<url:getUrl url="/public/clientdownload"/>"><fmt:message key="clientdownload.title" /></a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <jsp:useBean id="date" class="java.util.Date" />
                    <li><a href="http://www.parallax.com" target="_blank">
                        V<fmt:message key="application.major" />.<fmt:message key="application.minor" />.<fmt:message key="application.build" />
                                Parallax &copy; 2015 - <fmt:formatDate value="${date}" pattern="yyyy" /></a></li>
                </ul>
            </div>
        </div>
    </nav>
</footer>