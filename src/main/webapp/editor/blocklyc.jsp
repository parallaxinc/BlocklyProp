<!--
  TERMS OF USE: MIT License

  Permission is hereby granted, free of charge, to any person obtaining a
  copy of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation
  the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.
-->

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<%-- Support for experimental blocks in Demo builds  --%>
<%-- See developer notes to use this feature         --%>
<c:set var="experimental" scope="page" value="${properties:experimentalmenu(false)}" />
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="base" content="<url:getUrl url="/"/>">
        <meta name="cdn" content="<url:getCdnUrl url="/"/>">
        <meta name="projectlink" content="<%= request.getAttribute("project")%>">
        <meta name="isOffline" content="false">
        <meta name="user-auth" content="<shiro:authenticated>true</shiro:authenticated><shiro:notAuthenticated>false</shiro:notAuthenticated>">
        <meta name="in-demo" content="<c:choose><c:when test="${experimental == true}">demo</c:when></c:choose>">
        <meta name="win32client" content="${properties:downloadfiles('/BlocklyPropClient-setup-32.exe')}">
        <meta name="win64client" content="${properties:downloadfiles('/BlocklyPropClient-setup-64.exe')}">
        <meta name="macOSclient" content="${properties:downloadfiles('/BlocklyPropClient-setup-MacOS.pkg')}">
              
        <meta name="application-name" content="BlocklyProp"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="<url:getCdnUrl url="/images/mstile-144x144.png" />" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="57x57" href="<url:getCdnUrl url="/images/apple-touch-icon-57x57.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="114x114" href="<url:getCdnUrl url="/images/apple-touch-icon-114x114.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="72x72" href="<url:getCdnUrl url="/images/apple-touch-icon-72x72.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="144x144" href="<url:getCdnUrl url="/images/apple-touch-icon-144x144.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="120x120" href="<url:getCdnUrl url="/images/apple-touch-icon-120x120.png"/>" />
        <link type="image/png" rel="apple-touch-icon-precomposed" sizes="152x152" href="<url:getCdnUrl url="/images/apple-touch-icon-152x152.png"/>" />
        <link type="image/png" rel="icon" sizes="32x32" href="<url:getCdnUrl url="/images/favicon-32x32.png"/>" />
        <link type="image/png" rel="icon" sizes="16x16" href="<url:getCdnUrl url="/images/favicon-16x16.png"/>" />

        <title>BlocklyProp</title>

        <!-- JavaScript libraries -->
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/chartist.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/beautify.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/ace/ace.js"/>"></script>

        <!-- Javascript helpers -->
        <script type="text/javascript" src="<url:getCdnUrl url="/utils.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/propterm.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blocklypropclient.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blocklyc.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/editor.js"/>"></script>

        <!-- Blockly core/PropC generator -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/apps/blockly_compressed.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/field_range.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/field_code.js"/>"></script>

        <!-- Internationalization text strings -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/en/_messages.js"/>"></script>
        
        <!-- Block Menu/Toolbox -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propcToolbox.js"/>"></script>

        <!-- Block definitions -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/base.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/control.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/variables.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/procedures.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/gpio.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/communicate.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/sensors.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/heb.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/s3.js"/>"></script>
        
        <!-- Style sheets -->
        <link href="<url:getCdnUrl url="/lib/chartist.min.css" />" rel="stylesheet" type="text/css" />
        <link href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet" type="text/css" />
        <link href="<url:getCdnUrl url="/style-editor.css"/>" rel="stylesheet" type="text/css" />
        <link href="<url:getCdnUrl url="/style-clientdownload.css"/>" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Ubuntu|Rambla|Basic|Oxygen|Rubik|Nunito+Sans|Varela+Round|Puritan|Signika|Magra|Archivo|Itim|Neucha|Lato|Share+Tech|PT+Sans|Heebo|Cabin|ABeeZee|Arimo|Encode+Sans+Semi+Condensed|Exo+2|Open+Sans">
        
        <%--        
        <!-- Minified/Compressed versions of the above files -->
        <script type="text/javascript" src="<url:getCdnUrl url="/ace/ace.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/compressed/propc_libs.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/compressed/propc_setups.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/compressed/propc_cores.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/compressed/propc_gens.min.js"/>"></script>
        <link type="text/css" href="<url:getCdnUrl url="/compressed/propc_styles.css"/>" rel="stylesheet" />
        --%>
        
        <%--        
        <%@ include file="/WEB-INF/includes/jsheaders.jsp"%>
        --%>
    </head>
    
    <body>
        <div id="editor" style="background-color:#f8f8f8; padding-top:0px; padding-bottom:5px;">

            <div id="branding" style="position: relative; top: 2px;">
                <a id="nav-logo" href="" class="url-prefix">BlocklyProp</a>
            </div>

            <div>
                <div id="client-status-alerts" style="display: inline;">
                    <span class="auth-true" style="padding-left: 10px; line-height: 30px;">
                        <span id="client-searching" class="bp-client-warning">
                            <a class="client-searching-link" data-toggle="modal" data-target="#client-download-modal"
                                href="#">
                                <span class="bpIcon" data-icon="warningCircle">!</span>
                                <span class="keyed-lang-string" data-key="editor_client_checking"></span>
                            </a>
                        </span>
                        <span id="client-unavailable" class="bp-client-danger hidden">
                            <a class="client-unavailable-link" data-toggle="modal" data-target="#client-download-modal"
                                href="#">
                                <span class="bpIcon" data-icon="dangerTriangle">!!</span>
                                <span class="keyed-lang-string" data-key="editor_client_not-available"></span>
                            </a>
                        </span>
                        <span id="client-available" class="bp-client-available keyed-lang-string hidden"
                            data-key="editor_client_available"></span>
                        <span id="client-available-short" class="bp-client-available keyed-lang-string hidden"
                            data-key="editor_client_available_short"></span>
                    </span>
                    <span class="auth-false" style="padding-left: 10px; line-height: 30px;" data-displayas="inline">
                        <span style="font-size:13px;" class="keyed-lang-string"
                            data-key="editor_demonstration_mode_info"></span>
                        <span style="color:#ddd;" class="keyed-lang-string" data-key="editor_offline_title"></span>
                    </span>
                </div>

                <div id="project-details" class="project-name-wrapper"
                    style="float:right; display: inline; position: relative; top: 2px;">
                    <span id="project-icon" class="editor-icon"></span> <span class="project-name"></span> <span
                        class="project-owner"></span>
                </div>
            </div>

            <div>
                <div style="padding-left: 10px; display: inline;" id="board-action-buttons">
                    <a id="prop-btn-comp" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-success btn-circle auth-true" data-displayas="inline-block"><span class="bpIcon"
                            data-icon="checkMarkWhite">&#x2713;</span></a>
                    <a id="prop-btn-ram" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-success btn-circle disabled auth-true" data-displayas="inline-block"><span
                            class="bpIcon" data-icon="downArrowWhite">&gt;</span></a>
                    <a id="prop-btn-eeprom" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-success btn-circle disabled auth-true" data-displayas="inline-block"><span
                            class="bpIcon" data-icon="downArrowBoxWhite">&gt;&gt;</span></a>
                    <a id="prop-btn-term" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-primary btn-circle disabled auth-true" data-displayas="inline-block"><span
                            class="bpIcon" data-icon="terminalWhite">#</span></a>
                    <a id="prop-btn-graph" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-primary btn-circle disabled auth-true" data-displayas="inline-block"><span
                            class="bpIcon" data-icon="graphWhite">~</span></a>
                    <a id="prop-btn-find-replace" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-info btn-circle propc-only hidden"><span class="bpIcon"
                            data-icon="searchWhite">&#x1F50E;</span></a>
                    <a id="prop-btn-pretty" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-info btn-circle propc-only hidden"><span class="bpIcon"
                            data-icon="magicWandWhite">&#x2728;</span></a>
                    <a id="prop-btn-undo" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-info btn-circle propc-only hidden"><span class="bpIcon"
                            data-icon="undoWhite">&#x293A;</span></a>
                    <a id="prop-btn-redo" data-toggle="tooltip" title="" data-placement="bottom"
                        class="btn btn-info btn-circle propc-only hidden"><span class="bpIcon"
                            data-icon="redoWhite">&#x293B;</span></a>
                    <span style="color:#777; font-size:11px;" class="auth-false" data-displayas="inline"><a href="login.jsp"
                            class="url-prefix"><span class="keyed-lang-string"
                                data-key="editor_demonstration_mode_instructions"></span></a>&nbsp;&nbsp;&nbsp;</span>
                </div>

                <div id="right-menus" style="float:right; padding-right: 10px; display: inline;">
                    <select class="dropdown port-dropdown auth-true select-css" data-displayas="inline-block" title="Ports"
                        data-placement="left" id="comPort"></select>
                    <a class="btn-view-blocks" id="btn-view-propc" style="display: none;"><span class="bpIcon"
                            data-icon="eyeWhite">&#x1F441;</span>&nbsp;<span class="keyed-lang-string"
                            data-key="menu_code"></span></a>
                    <a class="btn-view-blocks" id="btn-view-blocks" style="display: none;"><span class="bpIcon"
                            data-icon="eyeWhite">&#x1F441;</span>&nbsp;<span class="keyed-lang-string"
                            data-key="menu_blocks"></span></a>
                    <a class="btn-view-blocks" id="btn-view-xml" style="display: none;"><span class="bpIcon"
                            data-icon="eyeWhite">&#x1F441;</span>&nbsp;<span class="keyed-lang-string"
                            data-key="editor_view_xml"></span></a>
                    <a class="demo-function auth-true" id="save-project" style="display: inline-block;"
                        data-displayas="inline-block"><span class="keyed-lang-string" data-key="editor_save"></span></a>
                    <div class="dropdown" style="display: inline-block;">
                        <button class="btn btn-sm btn-default dropdown dropdown-toggle" id="options-menu" type="button"
                            data-toggle="dropdown">&#9776; <span class="caret"></span></button>
                        <ul class="dropdown-menu pull-right btn-sm">
                            <li class="auth-true" data-displayas="list-item"><a id="edit-project-details"><span
                                        class="keyed-lang-string" data-key="editor_edit-details"></span></a></li>
                            <li class="auth-true online-only" data-displayas="list-item" id="save-as-menu-item"><a
                                    id="save-project-as"><span class="keyed-lang-string"
                                        data-key="editor_save-as"></span></a></li>
                            <li class="auth-true online-only divider" data-displayas="list-item"></li>
                            <li class="auth-true online-only" data-displayas="list-item"><a
                                    href="projectcreate.jsp?lang=PROPC" class="url-prefix"><span class="keyed-lang-string"
                                        data-key="menu_newproject_title"></span></a></li>
                            <li class="auth-true offline-only hidden" data-displayas="list-item"><a
                                    id="new-project-menu-item" href="#" class="url-prefix"><span class="keyed-lang-string"
                                        data-key="menu_newproject_title"></span></a></li>
                            <li class="auth-true online-only" data-displayas="list-item"><a href="my/projects.jsp"
                                    class="url-prefix"><span class="keyed-lang-string"
                                        data-key="menu_my_projects"></span></a></li>
                            <li class="online-only"><a href="projects.jsp" class="url-prefix"><span
                                        class="keyed-lang-string" data-key="menu_community_projects"></span></a></li>
                            <li class="online-only divider"></li>
                            <li><a href="public/help" target="_blank" class="url-prefix"><span class="keyed-lang-string"
                                        data-key="menu_help_reference"></span></a></li>
                            <li class="divider"></li>
                            <li><a id="download-side" href="#"><span class="keyed-lang-string"
                                        data-key="menu_download_simpleide"></span></a></li>
                            <li><a id="download-project" href="#"><span class="keyed-lang-string"
                                        data-key="editor_download"></span></a></li>
                            <li class="auth-true" data-displayas="list-item"><a id="upload-project"><span
                                        class="keyed-lang-string" data-key="editor_upload"></span></a></li>
                            <li class="auth-true divider" data-displayas="list-item"></li>
                            <li class="auth-true" data-displayas="list-item"><a id="client-setup"><span
                                        class="keyed-lang-string" data-key="editor_run_configure"></span></a></li>
                            <li class="auth-true online-only divider" data-displayas="list-item"></li>
                            <li class="auth-true online-only" data-displayas="list-item"><a href="logout"
                                    class="url-prefix"><span class="keyed-lang-string" data-key="logout"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div id="find-replace" style="background-color: #ddd; display: none; padding: 5px;">
            <span class="keyed-lang-string indent-left-double" data-key="editor_find_label"></span>
            <input type="text" class="input-find-replace" id="propc-find" name="propc-find" />&nbsp;
            <button id="propc-find-btn" class="btn-view-blocks btn-find-replace keyed-lang-string"
                data-key="editor_find_next"></button>
            <span class="keyed-lang-string indent-left-double" data-key="editor_replace_label"></span>
            <input type="text" class="input-find-replace" id="propc-replace" name="propc-replace" />&nbsp;
            <button id="propc-replace-btn" class="btn-view-blocks btn-find-replace keyed-lang-string"
                data-key="editor_replace"></button>
            <button id="find-replace-close" class="close margin-left-double">&times;</button>
        </div>


        <div id="content">
            <div id="content_blocks" style="position: absolute; z-index: 10;"></div>
            <div id="content_propc">
                <div id="code-propc"></div>
            </div>
            <div id="content_xml">
                <div id="code-xml"></div>
            </div>
        </div>


        <div class="modal fade" id="upload-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button id="upload-close" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="upload-dialog-title" class="modal-title keyed-lang-string" data-key="editor_upload">&nbsp;
                        </h4>
                    </div>
                    <div class="modal-body">
                        <label class="control-label keyed-lang-string" data-key="editor_upload_selectfile"></label>
                        <input id="selectfile" type="file" onchange="uploadHandler(this.files);">
                        <div id="selectfile-verify-valid" class="alert alert-success" style="display: none;">
                            <span class="bpIcon" data-icon="checkMarkGreen">&#x2713;</span>&nbsp;
                            <span class="keyed-lang-string" data-key="editor_upload_valid"></span>
                        </div>
                        <div id="selectfile-verify-notvalid" class="alert alert-danger" style="display: none;">
                            <span class="bpIcon" data-icon="dangerTriangle">!!</span>&nbsp;
                            <span class="keyed-lang-string" data-key="editor_upload_notvalid"></span>
                        </div>
                        <div id="selectfile-verify-boardtype" class="alert alert-warning" style="display: none;">
                            <span class="bpIcon" data-icon="warningCircle">!</span>&nbsp;
                            <span class="keyed-lang-string" data-key="editor_upload_boardtype_warning"></span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="selectfile-replace" class="btn btn-danger keyed-lang-string"
                            data-key="editor_button_replace"></button>
                        <button id="selectfile-append" class="btn btn-primary keyed-lang-string"
                            data-key="editor_button_append"></button>
                        <button id="selectfile-clear" class="btn btn-default keyed-lang-string" data-dismiss="modal"
                            data-key="editor_button_cancel"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="save-check-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="save-check-title" class="modal-title keyed-lang-string" data-key="editor_save-check">&nbsp;
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div id="save-check-warning">
                            <span class="bpIcon" data-icon="dangerTriangleBlack">!!</span>&nbsp;
                            <span class="keyed-lang-string" data-key="editor_save-check_warning"></span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default keyed-lang-string" data-dismiss="modal"
                            data-key="editor_button_close"></button>
                        <button id="save-as-btn" class="btn btn-default keyed-lang-string"
                            data-key="project_saveaslink"></button>
                        <button id="save-btn" class="btn btn-primary keyed-lang-string" data-dismiss="modal"
                            data-key="project_savelink"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="help-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="help-dialog-title" class="modal-title keyed-lang-string" data-key="help_reference">&nbsp;
                        </h4>
                    </div>
                    <div class="modal-body" id="help-content"></div>
                    <div class="modal-footer">
                        <button class="btn btn-default keyed-lang-string" data-dismiss="modal"
                            data-key="editor_button_close"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="compile-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="compile-dialog-title" class="modal-title keyed-lang-string" data-key="editor_run_compile">
                            &nbsp;</h4>
                    </div>
                    <div class="modal-body">
                        <label for="compile-console" class="keyed-lang-string" data-key="editor_title_result"></label>
                        <textarea class="form-control" rows="15" id="compile-console"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default keyed-lang-string" data-dismiss="modal"
                            data-key="editor_button_close"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="console-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="console-dialog-title" class="modal-title keyed-lang-string"
                            data-key="editor_title_terminal">&nbsp;</h4>
                    </div>
                    <div class="modal-body" style="height: 430px;">
                        <div id="serial-conn-info"></div>
                        <div id="serial_console" class="prop-term" tabindex="1"></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default keyed-lang-string" data-dismiss="modal"
                            data-key="editor_button_close"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="graphing-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="graphing-dialog-title" class="modal-title keyed-lang-string"
                            data-key="editor_title_graphing">&nbsp;</h4>
                    </div>
                    <div class="modal-body" style="height: 445px;">
                        <div id="graph-conn-info"></div>
                        <table>
                            <tr>
                                <td>
                                    <div id="serial_graphing" class="ct-chart ct-perfect-fourth" style="width:500px;"></div>
                                    <div id="graph_x-axis_label" style="text-align:center;" class="keyed-lang-string"
                                        data-key="editor_graph_time_label"></div>
                                </td>
                                <td style="vertical-align: top;">
                                    <div id="serial_graphing_labels"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer clearfix">
                        <button id="btn-graph-play" data-toggle="tooltip" title="" data-placement="bottom"
                            class="btn btn-primary btn-circle pull-left bpIcon" data-icon="pauseWhite"></button>&nbsp;
                        <button id="btn-graph-snapshot" data-toggle="tooltip" title="" data-placement="bottom"
                            class="btn btn-success btn-circle pull-left bpIcon" data-icon="cameraWhite"></button>&nbsp;
                        <button id="btn-graph-csv" data-toggle="tooltip" title="" data-placement="bottom"
                            class="btn btn-success btn-circle pull-left bpIcon" data-icon="fileWhite"></button>&nbsp;
                        <button id="btn-graph-clear" data-toggle="tooltip" title="" data-placement="bottom"
                            class="btn btn-primary btn-circle pull-left bpIcon" data-icon="eraserWhite"></button>&nbsp;
                        <button class="btn btn-default keyed-lang-string" data-dismiss="modal"
                            data-key="editor_button_close"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="save-as-type-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 id="save-as-type-dialog-title" class="modal-title keyed-lang-string" data-key="editor_save-as">
                            &nbsp;</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="save-as-project-name" class="keyed-lang-string"
                                data-key="project_create_project_name"></label>
                            <input type="text" class="form-control" id="save-as-project-name" name="save-as-project-name" />
                        </div>
                        <div class="form-group">
                            <label for="save-as-board-type" class="keyed-lang-string"
                                data-key="project_create_board_type"></label>
                            <select id="save-as-board-type" class="form-control" name="save-as-board-type">
                                <option disabled selected class="keyed-lang-string"
                                    data-key="project_create_board_type_select">&nbsp;</option>
                            </select>
                            <span id="saveAsDialogSender" style="display:none;"></span>
                        </div>
                        <div id="save-as-verify-boardtype" class="alert alert-warning" style="display: none;">
                            <span class="bpIcon" data-icon="dangerTriangle"></span>&nbsp;
                            <span class="keyed-lang-string" data-key="editor_saveas_boardtype_warning"></span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default keyed-lang-string" data-dismiss="modal"
                            data-key="editor_button_close"></button>
                        <button id="save-as-board-btn" class="btn btn-primary keyed-lang-string" data-dismiss="modal"
                            data-key="editor_save-as"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="new-project-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="new-project-dialog-title" class="modal-title keyed-lang-string"
                            data-key="editor_newproject_title">&nbsp;</h4>
                    </div>
                    <div class="modal-body">
                        <form class="proj">
                            <div class="form-group">
                                <label for="new-project-name" class="keyed-lang-string" data-key="project_name"></label>
                                <input type="text" class="form-control" id="new-project-name" name="new-project-name" />
                            </div>
                            <div id="new-project-board-dropdown" class="form-group">
                                <label for="board-type" class="keyed-lang-string"
                                    data-key="project_create_board_type"></label>
                                <select class="form-control" id="new-project-board-type"
                                    name="new-project-board-type"></select>
                            </div>
                            <div id="edit-project-details-static" class="form-group hidden">
                                <strong class="keyed-lang-string" data-key="project_create_board_type"></strong>:&nbsp;<span
                                    id="edit-project-board-type"></span><br>
                                <strong class="keyed-lang-string" data-key="project_created"></strong>:&nbsp;<span
                                    id="edit-project-created-date"></span><br>
                                <strong class="keyed-lang-string" data-key="project_modified"></strong>:&nbsp;<span
                                    id="edit-project-last-modified"></span>
                            </div>
                            <div class="form-group">
                                <label for="project-description" class="keyed-lang-string"
                                    data-key="project_create_description"></label>
                                <textarea class="form-control" id="new-project-description" rows="7"
                                    name="new-project-description"></textarea>
                            </div>
                            <div id="open-modal-sender" class="hidden"></div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="new-project-cancel" class="btn btn-default keyed-lang-string"
                            data-key="editor_button_cancel"></button>
                        <button id="new-project-continue" class="btn btn-primary keyed-lang-string"
                            data-key="editor_button_continue"></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="client-download-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title keyed-lang-string" data-key="editor_client_title">&nbsp;</h4>
                    </div>

                    <div class="modal-body">
                        <div class="clients">

                            <!-- MacOS instructions -->
                            <div class="client-instructions MacOS">
                                <h4><span class="keyed-lang-string" data-key="client_macOS_run_title"></span>&nbsp;</h4>
                                <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                                    <div id="mac1">
                                        <p class="keyed-lang-string" data-key="client_macOS_run_instructions1"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/mac_os1.png"
                                                alt="Instructions to launch the client" /></div>
                                    </div>
                                    <div id="mac2" class="hidden">
                                        <p class="keyed-lang-string" data-key="client_macOS_run_instructions2"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/mac_os2.png"
                                                alt="Instructions to launch the client" /></div>
                                    </div>
                                    <div id="mac3" class="hidden">
                                        <p class="keyed-lang-string" data-key="client_macOS_run_instructions3"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/mac_os3.png"
                                                alt="Instructions to launch the client" /></div>
                                    </div>
                                    <div id="mac4" class="hidden">
                                        <p class="keyed-lang-string" data-key="client_run_instructions2"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/usbok.png"
                                                alt="Safe to plug in USB and Propeller hardware" /></div>
                                    </div>
                                </div>
                                <div style="padding-top:10px;">
                                    <button id="mac1-btn" class="btn btn-sm btn-primary keyed-lang-string"
                                        data-key="client_run_step1"></button>
                                    <button id="mac2-btn" class="btn btn-sm btn-default keyed-lang-string"
                                        data-key="client_run_step2"></button>
                                    <button id="mac3-btn" class="btn btn-sm btn-default keyed-lang-string"
                                        data-key="client_run_step3"></button>
                                    <button id="mac4-btn" class="btn btn-sm btn-default keyed-lang-string"
                                        data-key="client_run_step4"></button>
                                </div>
                            </div>

                            <!-- Windows instructions -->
                            <div class="client-instructions Windows">
                                <h4 class="keyed-lang-string" data-key="client_windows_run_title">&nbsp;</h4>
                                <div style="background:#f5f5f5; border-radius:6px; height:250px; padding:6px;">
                                    <div id="win1">
                                        <p class="keyed-lang-string" data-key="client_windows_run_instructions1"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/windows1.png"
                                                alt="Instructions to launch the client" /></div>
                                    </div>
                                    <div id="win2" class="hidden">
                                        <p class="keyed-lang-string" data-key="client_windows_run_instructions2"></p>
                                        <p class="keyed-lang-string" data-key="client_windows_run_instructions3"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/windows2.png"
                                                alt="Instructions to launch the client" /></div>
                                    </div>
                                    <div id="win3" class="hidden">
                                        <p class="keyed-lang-string" data-key="client_run_instructions2"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/usbok.png"
                                                alt="Safe to plug in USB and Propeller hardware" /></div>
                                    </div>
                                </div>
                                <div style="padding-top:10px;">
                                    <button id="win1-btn" class="btn btn-sm btn-primary keyed-lang-string"
                                        data-key="client_run_step1"></button>
                                    <button id="win2-btn" class="btn btn-sm btn-default keyed-lang-string"
                                        data-key="client_run_step2"></button>
                                    <button id="win3-btn" class="btn btn-sm btn-default keyed-lang-string"
                                        data-key="client_run_step3"></button>
                                </div>
                            </div>

                            <!-- Chrome OS instructions -->
                            <div class="client-instructions ChromeOS">
                                <h4 class="keyed-lang-string" data-key="client_chrome_run_title">&nbsp;</h4>
                                <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                                    <div id="chr1">
                                        <p class="keyed-lang-string" data-key="client_chrome_run_instructions1"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/chrome1.png"
                                                alt="Instructions to launch the client" /></div>
                                    </div>
                                    <div id="chr2" class="hidden">
                                        <p class="keyed-lang-string" data-key="client_chrome_run_instructions2"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/chrome2.png"
                                                alt="Instructions to launch the client" /></div>
                                    </div>
                                    <div id="chr3" class="hidden">
                                        <p class="keyed-lang-string" data-key="client_run_instructions2"></p>
                                        <div style="text-align:center;"><img
                                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                                data-src="images/client-run/usbok.png"
                                                alt="Safe to plug in USB and Propeller hardware" /></div>
                                    </div>
                                </div>
                                <div style="padding-top:10px;">
                                    <button id="chr1-btn" class="btn btn-sm btn-primary keyed-lang-string"
                                        data-key="client_run_step1"></button>
                                    <button id="chr2-btn" class="btn btn-sm btn-default keyed-lang-string"
                                        data-key="client_run_step2"></button>
                                    <button id="chr3-btn" class="btn btn-sm btn-default keyed-lang-string"
                                        data-key="client_run_step3"></button>
                                </div>
                            </div>
                            <hr />

                            <div id="client-instructions-copy"></div>
                        </div>
                        <hr />
                        <div class="dropup">
                            <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                <span class="keyed-lang-string" data-key="clientdownload_os_menu"></span>
                                <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#" class="show-os-win"><span class="keyed-lang-string"
                                            data-key="os_name_win"></span></a></li>
                                <li><a href="#" class="show-os-mac"><span class="keyed-lang-string"
                                            data-key="os_name_mac"></span></a></li>
                                <li><a href="#" class="show-os-chr"><span class="keyed-lang-string"
                                            data-key="os_name_chr"></span></a></li>
                                <!-- <li><a href="#" class="show-os-lnx"><span class="keyed-lang-string" data-key="os_name_lnx"></span></a></li> -->
                            </ul>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


        <div class="modal fade" id="client-version-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title keyed-lang-string" data-key="editor_client_title">&nbsp;</h4>
                    </div>

                    <div class="modal-body">
                        <!-- BPC/BPL version warning -->
                        <div id="client-warning-span" class="alert alert-warning bpc-version hidden">
                            <span class="bpIcon" data-icon="warningCircle"></span>&nbsp;
                            <span class="keyed-lang-string" data-key="client_update_warning"></span>
                        </div>
                        <div id="client-unknown-span" class="alert alert-danger bpc-version hidden">
                            <span class="bpIcon" data-icon="dangerTriangle"></span>&nbsp;
                            <span class="keyed-lang-string" data-key="client_unknown"></span>
                        </div>
                        <div id="client-danger-span" class="alert alert-danger bpc-version hidden">
                            <span class="bpIcon" data-icon="dangerTriangle"></span>&nbsp;
                            <span class="keyed-lang-string" data-key="client_update_danger"></span>
                        </div>
                        <hr />

                        <div class="clients" id="client-instructions-original">
                            <!-- MacOS client -->
                            <div class="client-instructions MacOS">
                                <h4 class="keyed-lang-string" data-key="clientdownload_download_installer">&nbsp;</h4>
                            </div>
                            <div class="client MacOS">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                    data-src="images/os-icons/mac_os.png" alt="Mac OS icon" />
                                <a href="#" class="client-mac-link">
                                    <span class="keyed-lang-string"
                                        data-key="clientdownload_client_macos_installer"></span></a>
                            </div>

                            <!-- Windows clients -->
                            <div class="client-instructions Windows">
                                <h4 class="keyed-lang-string" data-key="clientdownload_download_installer">&nbsp;</h4>
                            </div>
                            <div class="client Windows">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                    data-src="images/os-icons/windows.png" alt="Windows OS icon" />
                                <a href="#" class="client-win32-link">
                                    <span class="keyed-lang-string"
                                        data-key="clientdownload_client_windows32_installer"></span>
                                </a>
                            </div>
                            <div class="client Windows">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                    data-src="images/os-icons/windows.png" alt="Windows OS icon" />
                                <a href="#" class="client-win64-link">
                                    <span class="keyed-lang-string"
                                        data-key="clientdownload_client_windows64_installer"></span>
                                </a>
                            </div>

                            <!-- ChromeOS client -->
                            <div class="client-instructions ChromeOS">
                                <h4 class="keyed-lang-string" data-key="clientdownload_download_launcher">&nbsp;</h4>
                            </div>
                            <div class="client ChromeOS">
                                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                    data-src="images/os-icons/chrome_os.png" alt="Chrome OS icon" />
                                <a href="https://chrome.google.com/webstore/detail/iddpgcclgepllhnhlkkinbmmafpbnddb"
                                    target="_blank">
                                    <span class="keyed-lang-string"
                                        data-key="clientdownload_client_chromeos_installer"></span>
                                </a>
                            </div>
                        </div>

                        <hr />
                        <div class="dropup">
                            <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                <span class="keyed-lang-string" data-key="clientdownload_os_menu"></span>
                                <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#" class="show-os-win"><span class="keyed-lang-string"
                                            data-key="os_name_win"></span></a></li>
                                <li><a href="#" class="show-os-mac"><span class="keyed-lang-string"
                                            data-key="os_name_mac"></span></a></li>
                                <li><a href="#" class="show-os-chr"><span class="keyed-lang-string"
                                            data-key="os_name_chr"></span></a></li>
                                <!-- <li><a href="#" class="show-os-lnx"><span class="keyed-lang-string" data-key="os_name_lnx"></span></a></li> -->
                            </ul>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string"
                                data-key="editor_button_close"></span></button>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <audio id="term-beep"
            src="data:audio/wav;base64,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"></audio>
    </body>
</html>
