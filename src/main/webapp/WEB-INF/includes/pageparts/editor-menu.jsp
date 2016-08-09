<%--
    Document   : projectform
    Created on : 25-jul-2015, 18:37:17
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<nav class="navbar navbar-default" role="navigation">
    <div class="containter-fluid">
        <span id="nav-title"><a id="nav-logo" href="<url:getUrl url="/"/>"><strong>BETA</strong> BlocklyProp</a> <span class="project-name"></span> <span class="project-owner"></span></span>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav" id="navbar-left">
                <!--  <li><a href="help/index.html">Manual</a></li> -->
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="editor.newproject.title" /><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="<url:getUrl url="/projectcreate.jsp?lang=SPIN"/>"><fmt:message key="editor.newproject.spin" /></a></li>
                        <li><a href="<url:getUrl url="/projectcreate.jsp?lang=PROPC"/>"><fmt:message key="editor.newproject.c" /></a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="editor.projects.title" /> <b class="caret"></b></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="<url:getUrl url="/projects.jsp"/>"><fmt:message key="menu.community_projects" /></a></li>
                        <li><a href="<url:getUrl url="/my/projects.jsp"/>"><fmt:message key="menu.my_projects" /></a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="editor.view.title" /> <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li class="active" id="tab_blocks"><a href="#" onclick="tabClick('tab_blocks')"><fmt:message key="editor.view.blocks" /></a></li>
                            <c:if test="${param.editor_lang == 'c'}">
                            <li id="tab_propc"><a href="#" onclick="tabClick('tab_propc')"><fmt:message key="editor.view.c" /></a></li>
                            </c:if>
                            <c:if test="${param.editor_lang == 'spin'}">
                            <li id="tab_spin"><a href="#" onclick="tabClick('tab_spin')"><fmt:message key="editor.view.spin" /></a></li>
                            </c:if>
                            <% if ("1".equals(request.getParameter("debug"))) {%>
                        <li id="tab_xml"><a href="#" onclick="tabClick('tab_xml')"><fmt:message key="editor.view.xml" /></a></li>
                            <%   }%>

                    </ul>
                </li>
                <li><a class="external_link" href="<url:getUrl url="/public/help"/>" target="_blank"><fmt:message key="menu.help" /></a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <c:if test="${!param.demo}">
                    <li id="client-unavailable">
                        <p class="navbar-text"><a data-toggle="modal" data-target="#client-download-modal" href="#"><span id="client_status" data-not-available="<fmt:message key="editor.client.not-available" />" ><fmt:message key="editor.client.checking" /></span></a></p>
                    </li>
                    <li id="client-available" class="hidden">
                        <p class="navbar-text"><fmt:message key="editor.client.available" /></p>
                    </li>
                    <li>
                        <form class="navbar-form">
                            <div class="form-group">
                                <select class="form-control" id="comPort"></select>
                            </div>
                        </form>
                    </li>
                </c:if>
                <li class="dropdown">
                    <c:if test="${!param.demo}">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="editor.run.title" /> <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" onclick="compile()"><fmt:message key="editor.run.compile" /></a></li>
                            <li><a href="#" onclick="loadIntoRam()"><fmt:message key="editor.run.ram" /></a></li>
                            <li><a href="#" onclick="loadIntoEeprom()"><fmt:message key="editor.run.eeprom" /></a></li>
                            <li class="divider"></li>
                            <li><a href="#" onclick="serial_console()"><fmt:message key="editor.run.terminal" /></a></li>
                            <li class="divider"></li>
                            <li><a href="#" onclick="configure_client()"><fmt:message key="editor.run.configure" /></a></li>
                        </ul>
                    </c:if>
                    <c:if test="${param.demo}">
                        <a href="#" class="dropdown-toggle demo-function" ><fmt:message key="editor.run.title" /> <b class="caret"></b></a>
                        </c:if>
                </li>
             <!--   <li><a href="#" onclick="project()"><fmt:message key="editor.project" /></a></li> -->
                <c:if test="${!param.demo}">
                    <li>
                        <div class="btn-group navbar-btn">
                            <button id="save-project" type="button" class="btn btn-default"><fmt:message key="editor.save" /></button>
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                &nbsp;
                                <span class="caret"></span>
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a id="save-project-as" href="#"><fmt:message key="editor.save-as" /></a></li>
                            </ul>
                        </div>
                    </li>
                </c:if>
                <c:if test="${param.demo}">
                    <li><a href="#" class="demo-function" ><fmt:message key="editor.save" /></a></li>
                    </c:if>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
