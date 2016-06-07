<%--
    Document   : menu
    Created on : 4-nov-2015, 20:39:22
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>


<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" id="nav-logo" href="<url:getUrl url="/"/>"><strong>BETA</strong> BlocklyProp</a>
        </div>

        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="<url:getUrl url="/projects.jsp"/>"><fmt:message key="menu.community_projects" /></a></li>
                    <shiro:authenticated>
                    <li><a href="<url:getUrl url="/my/projects.jsp"/>"><fmt:message key="menu.my_projects" /></a></li>
                    </shiro:authenticated>
                <li>
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="menu.newproject.title" /> <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="<url:getUrl url="/projectcreate.jsp?lang=SPIN"/>"><fmt:message key="menu.newproject.spin" /></a></li>
                        <li><a href="<url:getUrl url="/projectcreate.jsp?lang=PROPC"/>"><fmt:message key="menu.newproject.c" /></a></li>
                    </ul>
                </li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <shiro:notAuthenticated>
                    <li><a href="<url:getUrl url="/login.jsp"/>"><fmt:message key="menu.login_and_register" /></a></li>
                    </shiro:notAuthenticated>
                    <shiro:authenticated>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"><shiro:principal></shiro:principal> <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="<url:getUrl url="/profile"/>"><fmt:message key="menu.profile" /></a></li>
                            <li><a href="<url:getUrl url="/public/profile"/>"><fmt:message key="menu.public-profile" /></a></li>
                            <li><a href="<url:getUrl url="/logout"/>"><fmt:message key="logout" /></a></li>
                        </ul>
                    </li>
                </shiro:authenticated>

                <li><a href="<url:getUrl url="/public/help"/>" target="_blank"><fmt:message key="menu.help" /></a></li>
                <li class="navbar-text">
                    <form style="margin-bottom: 0;">
                        <select id="language" name="language" onchange="submit()">
                            <option value="en" ${language == 'en' ? 'selected' : ''}>English</option>
                            <option value="nl" ${language == 'nl' ? 'selected' : ''}>Nederlands</option>
                            <%--       <option value="es" ${language == 'es' ? 'selected' : ''}>Español</option>--%>
                        </select>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</nav>
