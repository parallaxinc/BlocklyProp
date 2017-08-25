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
                    <c:if test="${param.demo == 'false'}">
                        <span id="client-searching" class="bp-client-warning">
                            <a class="client-searching-link" data-toggle="modal" data-target="#client-download-modal" href="#">
                                <svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7,8 L8,8 8,11 8,11 7,11 Z" style="stroke-width:1px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="7.5" r="6" style="stroke-width:1.3px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="5" r="1.25" style="stroke-width:0;fill:#8a6d3b;"/></svg>
                                <fmt:message key="editor.client.checking" />
                            </a>
                        </span>
                        <span id="client-unavailable" class="bp-client-danger hidden">
                            <a class="client-unavailable-link" data-toggle="modal" data-target="#client-download-modal" href="#">
                                <svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1,12 L2,13 13,13 14,12 8,2 7,2 1,12 Z M7.25,6 L7.75,6 7.5,9 Z" style="stroke-width:1.5px;stroke:#a94442;fill:none;"/><circle cx="7.5" cy="10.75" r="1" style="stroke-width:0;fill:#a94442;"/><circle cx="7.5" cy="5.5" r="1" style="stroke-width:0;fill:#a94442;"/></svg>
                                <fmt:message key="editor.client.not-available" />
                            </a>
                        </span>
                        <span id="client-available" class="bp-client-available hidden">
                            <fmt:message key="editor.client.available" />
                        </span>
                        <span id="client-available-short" class="hidden">
                            <fmt:message key="editor.client.available.short" />
                        </span>
                        <span id="client-available-long" class="hidden">
                            <fmt:message key="editor.client.available" />
                        </span>
                        <span id="editor-full-mode" class="hidden">true</span>
                    </c:if>
                    <c:if test="${param.demo == 'true'}">
                        <span style="font-size:13px;"><fmt:message key="editor.demonstration.mode.info" /></span>
                        <span id="editor-full-mode" class="hidden">false</span>
                    </c:if>    
                </div>
                <div class="project-name-wrapper" align="right">        
                    <span id="project-icon" class="editor-icon"></span> <span class="project-name"></span> <span class="project-owner"></span>
                </div>
            </div>
            <div style="width:100%; padding-bottom: 5px;">
                <div style="display:inline; padding-left: 10px;" id="board-action-buttons">
                    <c:if test="${param.demo == 'false'}">
                        <a id="prop-btn-comp" onclick="compile()" data-toggle="tooltip" title="Verify code (compile)" data-placement="bottom" href="#" class="btn btn-success btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M2.25,6 L5.5,9.25 12,2.5 13.5,4 5.5,12 1,7.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                        <a id="prop-btn-ram" onclick="loadInto('Load into RAM', 'bin', 'RAM')" data-toggle="tooltip" title="Run once (load code to RAM)" data-placement="bottom" class="btn btn-success btn-circle disabled"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,0 L8.5,0 8.5,9 12.5,9 7,14.5 1.5,9 5.5,9 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                        <a id="prop-btn-eeprom" onclick="loadInto('Load into EEPROM', 'eeprom', 'EEPROM')" data-toggle="tooltip" title="Load and run (save code to EEPROM)" data-placement="bottom" class="btn btn-success btn-circle disabled"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,0 L8.5,0 8.5,6 12.5,6 7,11.5 1.5,6 5.5,6 Z M0.5,12 L13.5,12 13.5,14.5 0.5,14.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                        <a id="prop-btn-term" onclick="serial_console()" data-toggle="tooltip" title="Open Serial Terminal" data-placement="bottom" class="btn btn-primary btn-circle disabled"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15">
                            <path d="M3,4.5 L10,4.5 M3,6.5 L6,6.5 M3,8.5 L8,8.5 M1,1 L13,1 13,14 1,14 1,1 M2,0 L12,0 M14,2 L14,13 M12,15 L2,15 M0,2 L0,13" style="stroke:#fff;stroke-width:1;fill:none;"/></svg></a>
                        <a id="prop-btn-graph" onclick="graphing_console()" data-toggle="tooltip" title="Open Graphing Output" data-placement="bottom" class="btn btn-primary btn-circle disabled" id="open-graph-output"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="14">
                            <path d="M.5,0 L.5,13.5 L12.5,13.5 M3.5,0 L3.5,13.5 M6.5,0 L6.5,13.5 M9.5,0 L9.5,13.5 M12.5,0 L12.5,13.5 M.5,3.5 L12.5,3.5 M.5,7 L12.5,7 M.5,10.5 L12.5,10.5 M.5,.5 L12.5,.5" style="stroke:rgba(255,255,255,.6);stroke-width:1;fill:none;"/>
                            <path d="M0,13 L6,5 L9,8 L14,2" style="stroke:#fff;stroke-width:2;fill:none;"/></svg></a>
                    </c:if>
                    <c:if test="${param.demo == 'true'}">
                        <span style="color:#777; font-size:11px;"><a href="<url:getUrl url="/login.jsp"/>"><fmt:message key="editor.demonstration.mode.instructions" /></a>&nbsp;&nbsp;&nbsp;</span>
                    </c:if>
                    <a id="prop-btn-find-replace" style="display: none;" onclick="findReplaceCode();" data-toggle="tooltip" title="Find/Replace" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M1.5,13.25 L4.5,8.75" style="stroke:#fff;stroke-width:2px;fill:none;"/><circle cx="7" cy="5" r="3.5" style="stroke:#fff;stroke-width:1.5px;fill:none;"></circle></svg></a>
                    <a id="prop-btn-pretty" style="display: none;" onclick="prettyCode(null)" data-toggle="tooltip" title="Beautify Code" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M1,10 L5,10 5,11 1,11 Z M2,12 L6,12 6,13 2,13 Z M1,14 5,14 5,15 1,15 Z M0.5,2.75 L2.5,0.6 5.5,3.5 3.5,5.5 Z M5,7 L7,4.75 14,12 12,14 Z M0,7 Q1.5,6.5 2,5 Q2.5,6.5 4,7 Q2.5,7.5 2,9 Q1.5,7.5 0,7 Z M7,3 Q9.5,2.5 10,0 Q10.5,2.5 13,3 Q10.5,3.5 10,6 Q9.5,3.5 7,3 Z" style="stroke-width:0;fill:#fff;"/></svg></a>
                    <a id="prop-btn-undo" style="display: none;" onclick="codePropC.undo();" data-toggle="tooltip" title="Undo" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M3.5,6.5 L2.25,4.5 0.75,10.25 6,10.5 5,8.5 Q8.5,5.5 12,7 Q8,3.5 3.5,6.5 Z M11,11 L14.5,11 Q12.5,6 7,8.25 Q11,8 11,11 Z" style="stroke-width:0;fill:#fff;"/></svg></a>
                    <a id="prop-btn-redo" style="display: none;" onclick="codePropC.redo();" data-toggle="tooltip" title="Redo" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M11.5,6.5 L12.75,4.5 14.25,10.25 9,10.5 10,8.5 Q6.5,5.5 3,7 Q7,3.5 11.5,6.5 Z M4,11 L0.5,11 Q2.5,6 8,8.25 Q4,8 4,11 Z" style="stroke-width:0;fill:#fff;"/></svg></a>
                </div>
                <div style="display:inline; clear:right; float:right;  padding-right: 10px;" align="right">
                    <c:if test="${param.demo == 'false'}">
                        <select class="dropdown port-dropdown" title="Ports" data-placement="left" id="comPort"></select>
                    </c:if>
                    <a class="btn-view-code" id="btn-view-propc" style="display:inline;" href="#" onclick="tabClick('tab_propc')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" style="vertical-align: middle;"><path d="M0.5,7 C4,1.5 10,1.5 13.5,7 C10,12.5 4,12.5 0.5,7 M0.5,7 C4,3.5 10,3.5 13.5,7" style="stroke:#000;stroke-width:1.5;fill:none;"/><circle cx="7" cy="6.5" r="2.75" style="stroke:#000;stroke-width:1.5;fill:none;"></circle><circle cx="7" cy="6.5" r=".5" style="stroke:#000;stroke-width:1.5;fill:#000;"></circle></svg> Code</a>
                    <a class="btn-view-blocks" id="btn-view-blocks" style="display:none;" href="#" onclick="tabClick('tab_blocks')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" style="vertical-align: middle;"><path d="M0.5,7 C4,1.5 10,1.5 13.5,7 C10,12.5 4,12.5 0.5,7 M0.5,7 C4,3.5 10,3.5 13.5,7" style="stroke:#fff;stroke-width:1.5;fill:none;"/><circle cx="7" cy="6.5" r="2.75" style="stroke:#fff;stroke-width:1.5;fill:none;"></circle><circle cx="7" cy="6.5" r=".5" style="stroke:#fff;stroke-width:1.5;fill:#fff;"></circle></svg> Blocks</a>                    
                    <% if ("1".equals(request.getParameter("debug"))) {%>
                        <a href="#" class="btn btn-sm btn-primary" id="tab_xml" onclick="tabClick('tab_xml')"><fmt:message key="editor.view.xml" /></a>
                    <%   }%>
                    <c:if test="${param.demo == 'false'}">
                        <a href="#" class="demo-function" id="save-project"><fmt:message key="editor.save" /></a>
                    </c:if>
                    <span class="dropdown"><button class="btn btn-sm btn-default dropdown-toggle" id="options-menu" type="button" data-toggle="dropdown">&#9776; <span class="caret"></span></button>
                        <ul class="dropdown-menu pull-right btn-sm">
                            <c:if test="${param.demo == 'false'}">
                                <li><a id="edit-project-details" href="#" onclick="editProjectDetails()"><fmt:message key="editor.edit-details" /></a></li>
                                <li><a id="save-project-as" href="#"><fmt:message key="editor.save-as" /></a></li>
                                <hr style="line-height:5px; margin:5px;">
                                <li><a href="<url:getUrl url="/projectcreate.jsp?lang=PROPC"/>"><fmt:message key="menu.newproject.title" /></a></li>
                                <li><a href="<url:getUrl url="/my/projects.jsp"/>"><fmt:message key="menu.my_projects" /></a></li>
                            </c:if>
                            <li><a href="<url:getUrl url="/projects.jsp"/>"><fmt:message key="menu.community_projects" /></a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <li><a href="<url:getUrl url="/public/help"/>" target="_blank"><fmt:message key="menu.help" /> & Reference</a></li>
                            <hr style="line-height:5px; margin:5px;">
                            <li><a id="download-side" href="#" onclick="downloadPropC()">Download SimpleIDE files</a></li>
                            <li><a id="download-project" href="#"><fmt:message key="editor.download" /></a></li>
                            <c:if test="${param.demo == 'false'}">
                                <li><a id="upload-project" href="#"><fmt:message key="editor.upload" /></a></li>
                                <hr style="line-height:5px; margin:5px;">
                                <li><a href="#" onclick="configure_client()"><fmt:message key="editor.run.configure" /></a></li>
                            </c:if>
                        </ul>
                    </span>
                </div>
            </div>
        </div>
    </div>
</nav>
