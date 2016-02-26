<%--
    Document   : menu
    Created on : 4-nov-2015, 20:39:22
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>


<div class="container">
    <div class="navbar navbar-default">
        <p class="navbar-text"><strong><a href="<url:getUrl url="/public/help"/>"><fmt:message key="help.title" /></a></strong></p>
        <ul class="nav navbar-nav">
            <li><a href="<url:getUrl url="/public/help?f=blocklyprop"/>"><fmt:message key="help.menu.blocklyprop" /></a></li>
            <li><a href="<url:getUrl url="/public/help?f=blocks"/>"><fmt:message key="help.menu.blocks" /></a></li>
            <li><a href="<url:getUrl url="/public/help?f=langref"/>"><fmt:message key="help.menu.languagereference" /></a></li>
        </ul>
        <form action="<%= request.getContextPath()%>/public/helpsearch" class="navbar-form navbar-right" role="search" style="margin-right: 0px;">
            <div class="form-group">
                <input name="query" type="text" class="form-control" placeholder="<fmt:message key="help.search" />" value="<%= request.getParameter("query") == null ? "" : request.getParameter("query")%>">
            </div>
            <button type="submit" class="btn btn-default"><fmt:message key="help.search.submit" /></button>
        </form>
    </div>
</div>