<%--
    Document   : projectform
    Created on : 25-jul-2015, 18:37:17
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<nav class="navbar navbar-default clearfix" role="navigation">
    <div style="width:100%;">
        <div style="display:inline;"><span><a id="nav-logo" href="<url:getUrl url="/"/>">BlocklyProp<br><strong>BETA</strong></a></span>
        </div>
        <div style="display:inline;">
            <div style="width:100%; ">
                <div style="display:inline; padding-left: 10px; line-height: 30px;">        
                    <span id="client-searching" class="bp-client-warning">
                        <a class="client-searching-link" data-toggle="modal" data-target="#client-download-modal" href="#"><fmt:message key="editor.client.checking" /></span></a>
                    </span>
                    <span id="client-unavailable" class="bp-client-danger hidden">
                        <a class="client-unavailable-link" data-toggle="modal" data-target="#client-download-modal" href="#"><fmt:message key="editor.client.not-available" /></span></a>
                    </span>
                    <span id="client-available" class="bp-client-available hidden">
                        <c:if test="${param.editor_lang == 'c'}">
                            <fmt:message key="editor.client.available" />
                        </c:if>
                        <c:if test="${param.editor_lang == 'spin'}">
                            <fmt:message key="editor.client.available.short" />
                        </c:if>
                    </span>
                    <span id="client-available-short" class="hidden">
                        <fmt:message key="editor.client.available.short" />
                    </span>
                    <span id="client-available-long" class="hidden">
                        <fmt:message key="editor.client.available" />
                    </span>
                </div>
                <div class="project-name-wrapper" align="right">        
                    <span id="project-icon" class="editor-icon"></span> <span class="project-name"></span> <span class="project-owner"></span>
                </div>
            </div>
            <div style="width:100%; padding-bottom: 5px;">
                <div style="display:inline; padding-left: 10px;" id="board-action-buttons">        
                    <a onclick="compile()" data-toggle="tooltip" title="Verify code (compile)" data-placement="bottom" href="#" class="btn btn-success btn-circle"><i class="glyphicon glyphicon-ok"></i></a>
                        <c:if test="${param.editor_lang == 'c'}">
                        <a onclick="loadIntoRam()" data-toggle="tooltip" title="Run once (load code to RAM)" data-placement="bottom" class="btn btn-success btn-circle" id="load-ram-button"><i class="glyphicon glyphicon-arrow-down"></i></a>
                        </c:if>
                    <a onclick="loadIntoEeprom()" data-toggle="tooltip" title="Load and run (save code to EEPROM)" data-placement="bottom" class="btn btn-success btn-circle"><i class="glyphicon glyphicon-save"></i></a>
                    <a onclick="serial_console()" data-toggle="tooltip" title="Open Serial Terminal" data-placement="bottom" class="btn btn-primary btn-circle"><i class="glyphicon glyphicon-list-alt"></i></a>
                </div>
                <div style="display:inline; clear:right; float:right;  padding-right: 10px;" align="right">

                    <select class="dropdown port-dropdown" title="Ports" data-placement="left" id="comPort"></select>
                    <c:if test="${param.editor_lang == 'c'}">
                        <a class="btn-view-code" id="btn-view-propc" style="display:inline;" href="#" onclick="tabClick('tab_propc')"><i class="glyphicon glyphicon-eye-open"></i> Code</a>
                    </c:if>
                    <c:if test="${param.editor_lang == 'spin'}">
                        <a class="btn-view-code" id="btn-view-spin" style="display:inline;" href="#" onclick="tabClick('tab_spin')"><i class="glyphicon glyphicon-eye-open"></i> Code</a>
                    </c:if>
                    <a class="btn-view-blocks" id="btn-view-blocks" style="display:none;" href="#" onclick="tabClick('tab_blocks')"><i class="glyphicon glyphicon-eye-open"></i> Blocks</a>                    
                    <% if ("1".equals(request.getParameter("debug"))) {%>
                    <a href="#" class="btn btn-sm btn-primary" id="tab_xml" onclick="tabClick('tab_xml')"><fmt:message key="editor.view.xml" /></a>
                    <%   }%>
                    <a href="#" class="demo-function" id="save-project"><fmt:message key="editor.save" /></a>
                    <span class="dropdown"><button class="btn btn-sm btn-default dropdown-toggle" id="options-menu" type="button" data-toggle="dropdown"><i class="glyphicon glyphicon-menu-hamburger"></i>
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu pull-right btn-sm">
                            <li><a id="edit-project-details" href="#" onclick="editProjectDetails()"><fmt:message key="editor.edit-details" /></a></li>
                            <li><a id="save-project-as" href="#"><fmt:message key="editor.save-as" /></a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <li><a href="<url:getUrl url="/projectcreate.jsp?lang=SPIN"/>">New <fmt:message key="editor.newproject.spin" /> project</a></li>
                            <li><a href="<url:getUrl url="/projectcreate.jsp?lang=PROPC"/>">New <fmt:message key="editor.newproject.c" /> project</a></li>
                            <li><a href="<url:getUrl url="/my/projects.jsp"/>"><fmt:message key="menu.my_projects" /></a></li>
                            <li><a href="<url:getUrl url="/projects.jsp"/>"><fmt:message key="menu.community_projects" /></a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <li><a href="<url:getUrl url="/public/help"/>" target="_blank"><fmt:message key="menu.help" /> & Reference</a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <li><a id="clear-workspace" href="#"><fmt:message key="editor.clear-workspace" /></a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <c:if test="${param.editor_lang == 'c'}">
                                <li><a id="download-side" href="#" onclick="downloadPropC()">Download SimpleIDE files</a></li>
                                </c:if>
                            <li><a id="download-project" href="#"><fmt:message key="editor.download" /></a></li>
                            <li><a id="upload-project" href="#"><fmt:message key="editor.upload" /></a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <li><a href="#" onclick="configure_client()"><fmt:message key="editor.run.configure" /></a></li>

                        </ul></span>
                </div>
            </div>
        </div>
    </div>
</nav>
