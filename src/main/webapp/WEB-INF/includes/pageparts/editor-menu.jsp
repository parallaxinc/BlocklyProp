<%--
    Document   : projectform
    Created on : 25-jul-2015, 18:37:17
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<c:set var="experimental" scope="page" value="${properties:experimentalmenu(false)}" />

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
                    <a onclick="compile()" data-toggle="tooltip" title="Verify code (compile)" data-placement="bottom" href="#" class="btn btn-success btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M2.25,6 L5.5,9.25 12,2.5 13.5,4 5.5,12 1,7.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                        <c:if test="${param.editor_lang == 'c'}">
                        <a onclick="loadInto('Load into RAM', 'bin', 'RAM')" data-toggle="tooltip" title="Run once (load code to RAM)" data-placement="bottom" class="btn btn-success btn-circle" id="load-ram-button"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,0 L8.5,0 8.5,9 12.5,9 7,14.5 1.5,9 5.5,9 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></i></a>
                        </c:if>
                    <a onclick="loadInto('Load into EEPROM', 'eeprom', 'EEPROM')" data-toggle="tooltip" title="Load and run (save code to EEPROM)" data-placement="bottom" class="btn btn-success btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,0 L8.5,0 8.5,6 12.5,6 7,11.5 1.5,6 5.5,6 Z M0.5,12 L13.5,12 13.5,14.5 0.5,14.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                    <a onclick="serial_console()" data-toggle="tooltip" title="Open Serial Terminal" data-placement="bottom" class="btn btn-primary btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><rect x="1" y="1" width="12" height="13" rx="1" ry="1" style="stroke:#fff;stroke-width:2;fill:none;"/><path d="M3,4.5 L10,4.5 M3,6.5 L6,6.5 M3,8.5 L8,8.5" style="stroke:#fff;stroke-width:1;fill:none;"/></svg></a>
                        <c:choose>
                            <c:when test="${experimental == true}">
                            <a onclick="graphing_console()" data-toggle="tooltip" title="Open Graphing Output" data-placement="bottom" class="btn btn-primary btn-circle" id="open-graph-output"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="14">
                                <path d="M.5,0 L.5,13.5 L12.5,13.5 M3.5,0 L3.5,13.5 M6.5,0 L6.5,13.5 M9.5,0 L9.5,13.5 M12.5,0 L12.5,13.5 M.5,3.5 L12.5,3.5 M.5,7 L12.5,7 M.5,10.5 L12.5,10.5 M.5,.5 L12.5,.5" style="stroke:rgba(255,255,255,.6);stroke-width:1;fill:none;"/>
                                <path d="M0,13 L6,5 L9,8 L14,2" style="stroke:#fff;stroke-width:2;fill:none;"/>
                                </svg></a>
                            </c:when>
                        </c:choose>
                </div>
                <div style="display:inline; clear:right; float:right;  padding-right: 10px;" align="right">

                    <select class="dropdown port-dropdown" title="Ports" data-placement="left" id="comPort"></select>
                    <c:if test="${param.editor_lang == 'c'}">
                        <a class="btn-view-code" id="btn-view-propc" style="display:inline;" href="#" onclick="tabClick('tab_propc')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M0.5,7 C4,1.5 10,1.5 13.5,7 C10,12.5 4,12.5 0.5,7 M0.5,7 C4,3.5 10,3.5 13.5,7" style="stroke:#fff;stroke-width:1.5;fill:none;"/><circle cx="7" cy="6.5" r="2.75" style="stroke:#fff;stroke-width:1.5;fill:none;"></circle><circle cx="7" cy="6.5" r=".5" style="stroke:#fff;stroke-width:1.5;fill:#fff;"></circle></svg> Code</a>
                    </c:if>
                    <c:if test="${param.editor_lang == 'spin'}">
                        <a class="btn-view-code" id="btn-view-spin" style="display:inline;" href="#" onclick="tabClick('tab_spin')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M0.5,7 C4,1.5 10,1.5 13.5,7 C10,12.5 4,12.5 0.5,7 M0.5,7 C4,3.5 10,3.5 13.5,7" style="stroke:#fff;stroke-width:1.5;fill:none;"/><circle cx="7" cy="6.5" r="2.75" style="stroke:#fff;stroke-width:1.5;fill:none;"></circle><circle cx="7" cy="6.5" r=".5" style="stroke:#fff;stroke-width:1.5;fill:#fff;"></circle></svg> Code</a>
                    </c:if>
                    <a class="btn-view-blocks" id="btn-view-blocks" style="display:none;" href="#" onclick="tabClick('tab_blocks')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M0.5,7 C4,1.5 10,1.5 13.5,7 C10,12.5 4,12.5 0.5,7 M0.5,7 C4,3.5 10,3.5 13.5,7" style="stroke:#000;stroke-width:1.5;fill:none;"/><circle cx="7" cy="6.5" r="2.75" style="stroke:#000;stroke-width:1.5;fill:none;"></circle><circle cx="7" cy="6.5" r=".5" style="stroke:#000;stroke-width:1.5;fill:#000;"></circle></svg> Blocks</a>                    
                    <% if ("1".equals(request.getParameter("debug"))) {%>
                    <a href="#" class="btn btn-sm btn-primary" id="tab_xml" onclick="tabClick('tab_xml')"><fmt:message key="editor.view.xml" /></a>
                    <%   }%>
                    <a href="#" class="demo-function" id="save-project"><fmt:message key="editor.save" /></a>
                    <span class="dropdown"><button class="btn btn-sm btn-default dropdown-toggle" id="options-menu" type="button" data-toggle="dropdown"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,0 L8.5,0 8.5,6 12.5,6 7,11.5 1.5,6 5.5,6 Z M0.5,12 L13.5,12 13.5,14.5 0.5,14.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg>
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu pull-right btn-sm">
                            <li><a id="edit-project-details" href="#" onclick="editProjectDetails()"><fmt:message key="editor.edit-details" /></a></li>
                            <li><a id="save-project-as" href="#"><fmt:message key="editor.save-as" /></a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <li><a href="<url:getUrl url="/projectcreate.jsp?lang=PROPC"/>"><fmt:message key="menu.newproject.title" /></a></li>
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
