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
        <!-- Projects -->
        <div class="collapse navbar-collapse" id="navbar-collapse">
            <span>
            <ul class="nav navbar-nav">
                <li>
                    <a href="<url:getUrl url="/projects.jsp"/>"><fmt:message key="menu.community_projects" /></a>
                </li>
                <shiro:authenticated>
                <li>
                    <a href="<url:getUrl url="/my/projects.jsp"/>"><fmt:message key="menu.my_projects" /></a>
                </li>
                </shiro:authenticated>
                <li>
                    <a href="<url:getUrl url="/projectcreate.jsp?lang=PROPC"/>"><fmt:message key="menu.newproject.title" /></a>
                </li>
                <li>
                    <a href="<url:getUrl url="/privacy-policy"/>"><fmt:message key="menu.privacy" /></a>
                </li>
            </ul>
            </span><span>
                
                <!-- Register / Login -->
            <ul class="nav navbar-nav navbar-right">
                <shiro:notAuthenticated>
                    <!-- Anonymous user -->
                    <li>
                        <a href="<url:getUrl url="/login.jsp"/>"><fmt:message key="menu.login_and_register" /></a>
                    </li>
                </shiro:notAuthenticated>
                <shiro:authenticated>
                    <!-- Authenticated user -->
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"><shiro:principal></shiro:principal> <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="<url:getUrl url="/profile"/>"><fmt:message key="menu.profile" /></a></li>
                       <!--     <li><a href="<url:getUrl url="/public/profile"/>"><fmt:message key="menu.public-profile" /></a></li> -->
                            <li><a href="<url:getUrl url="/logout"/>"><fmt:message key="logout" /></a></li>
                        </ul>
                    </li>
                </shiro:authenticated>

                <li><a href="<url:getUrl url="/public/help"/>" target="_blank"><fmt:message key="menu.help" /></a></li>
                <!--
                <li class="navbar-text">
                    <form style="margin-bottom: 0;">
                        <select id="language" name="language" onchange="submit()">
                            <option value="en" ${language == 'en' ? 'selected' : ''}>English</option>
                        </select>
                    </form>
                </li>
                -->
            </ul>
            </span>
        </div>
    </div>
    
    <!-- Message of the Day goes here. -->
    <div class="container-fluid" style="background:#FAE6A4; color:#8a6d3b; padding:10px; display: none;" id="message-of-the-day">
        <div class="row">
            <div class="col-sm-12" align="center">
                <a id="message-of-the-day-link" href="http://learn.parallax.com/node/1692" target="_blank" style="color:#8a6d3b;">
                    <span id="message-of-the-day-text"></span>
                </a>
            </div>
        </div>
    </div>
</nav>
