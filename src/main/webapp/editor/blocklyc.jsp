<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<!-- Support for experimental blocks in Demo builds  -->
<!-- See developer notes to use this feature         -->
<c:set var="experimental" scope="page" value="${properties:experimentalmenu(false)}" />

<html>
    <head>
        <meta charset="utf-8">
        <meta name="base" content="<url:getUrl url="/"/>">
        <meta name="cdn" content="<url:getCdnUrl url="/"/>">
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
        <script type="text/javascript" src="<url:getCdnUrl url="/propterm.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/detect.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blocklypropclient.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blocklyc.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/utils.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/editor.js"/>"></script>

        <!-- Blockly core/PropC generator -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/apps/blockly_compressed.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/field_range.js"/>"></script>

        <!-- Internationalization text strings -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/en/_messages.js"/>"></script>

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
    
    <body onload="blocklyReady();">
        <div id="editor">
            <table id="content_table">
                <tr>
                    <td>
                        <nav class="navbar navbar-default clearfix" role="navigation">
                            <div style="width:100%;">
                                <div style="display:inline;"><span><a id="nav-logo" href="" class="url-prefix">BlocklyProp<br><strong>BETA</strong></a></span>
                                </div>
                                <div style="display:inline;">
                                    <div style="width:100%; ">
                                        <div style="display:inline; padding-left: 10px; line-height: 30px;" class="auth-true" displayas="inline">
                                            <span id="client-searching" class="bp-client-warning">
                                                <a class="client-searching-link" data-toggle="modal" data-target="#client-download-modal" href="#">
                                                    <svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7,8 L8,8 8,11 8,11 7,11 Z" style="stroke-width:1px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="7.5" r="6" style="stroke-width:1.3px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="5" r="1.25" style="stroke-width:0;fill:#8a6d3b;"/></svg>
                                                    <span class="keyed-lang-string" key="editor_client_checking"></span>
                                                </a>
                                            </span>
                                            <span id="client-unavailable" class="bp-client-danger hidden">
                                                <a class="client-unavailable-link" data-toggle="modal" data-target="#client-download-modal" href="#">
                                                    <svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1,12 L2,13 13,13 14,12 8,2 7,2 1,12 Z M7.25,6 L7.75,6 7.5,9 Z" style="stroke-width:1.5px;stroke:#a94442;fill:none;"/><circle cx="7.5" cy="10.75" r="1" style="stroke-width:0;fill:#a94442;"/><circle cx="7.5" cy="5.5" r="1" style="stroke-width:0;fill:#a94442;"/></svg>
                                                    <span class="keyed-lang-string" key="editor_client_not-available"></span>
                                                </a>
                                            </span>
                                            <span id="client-available" class="bp-client-available hidden">
                                                <span class="keyed-lang-string" key="editor_client_available"></span>
                                            </span> 
                                            <span id="client-available-short" class="hidden">
                                                <span class="keyed-lang-string" key="editor_client_available_short"></span>
                                            </span>
                                            <span id="client-available-long" class="hidden">
                                                <span class="keyed-lang-string" key="editor_client_available"></span>
                                            </span>
                                        </div>
                                        <div style="display:inline; padding-left: 10px; line-height: 30px;" class="auth-false" displayas="inline">
                                            <span style="font-size:13px;"><span class="keyed-lang-string" key="editor_demonstration_mode_info"></span></span>
                                        </div>
                                        <div class="project-name-wrapper" align="right">        
                                            <span id="project-icon" class="editor-icon"></span> <span class="project-name"></span> <span class="project-owner"></span>
                                        </div>
                                    </div>
                                    <div style="width:100%; padding-bottom: 5px;">
                                        <div style="display:inline; padding-left: 10px;" id="board-action-buttons">
                                            <a id="prop-btn-comp" onclick="compile()" data-toggle="tooltip" title="" data-placement="bottom" href="#" class="btn btn-success btn-circle auth-true" displayas="inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M2.25,6 L5.5,9.25 12,2.5 13.5,4 5.5,12 1,7.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                                            <a id="prop-btn-ram" onclick="loadInto('Load into RAM', 'bin', 'CODE', 'RAM')" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-success btn-circle disabled auth-true" displayas="inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,0 L8.5,0 8.5,9 12.5,9 7,14.5 1.5,9 5.5,9 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                                            <a id="prop-btn-eeprom" onclick="loadInto('Load into EEPROM', 'eeprom', 'CODE', 'EEPROM')" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-success btn-circle disabled auth-true" displayas="inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,0 L8.5,0 8.5,6 12.5,6 7,11.5 1.5,6 5.5,6 Z M0.5,12 L13.5,12 13.5,14.5 0.5,14.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></a>
                                            <a id="prop-btn-term" onclick="serial_console()" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-primary btn-circle disabled auth-true" displayas="inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15">
                                                <path d="M3,4.5 L10,4.5 M3,6.5 L6,6.5 M3,8.5 L8,8.5 M1,1 L13,1 13,14 1,14 1,1 M2,0 L12,0 M14,2 L14,13 M12,15 L2,15 M0,2 L0,13" style="stroke:#fff;stroke-width:1;fill:none;"/></svg></a>
                                            <a id="prop-btn-graph" onclick="graphing_console()" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-primary btn-circle disabled auth-true" displayas="inline-block" id="open-graph-output"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="14">
                                                <path d="M.5,0 L.5,13.5 L12.5,13.5 M3.5,0 L3.5,13.5 M6.5,0 L6.5,13.5 M9.5,0 L9.5,13.5 M12.5,0 L12.5,13.5 M.5,3.5 L12.5,3.5 M.5,7 L12.5,7 M.5,10.5 L12.5,10.5 M.5,.5 L12.5,.5" style="stroke:rgba(255,255,255,.6);stroke-width:1;fill:none;"/>
                                                <path d="M0,13 L6,5 L9,8 L14,2" style="stroke:#fff;stroke-width:2;fill:none;"/></svg></a>
                                            <span style="color:#777; font-size:11px;" class="auth-false" displayas="inline"><a href="login.jsp" class="url-prefix"><span class="keyed-lang-string" key="editor_demonstration_mode_instructions"></span></a>&nbsp;&nbsp;&nbsp;</span>
                                            <a id="prop-btn-find-replace" style="display: none;" onclick="findReplaceCode();" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M1.5,13.25 L4.5,8.75" style="stroke:#fff;stroke-width:2px;fill:none;"/><circle cx="7" cy="5" r="3.5" style="stroke:#fff;stroke-width:1.5px;fill:none;"></circle></svg></a>
                                            <a id="prop-btn-pretty" style="display: none;" onclick="prettyCode(null)" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M1,10 L5,10 5,11 1,11 Z M2,12 L6,12 6,13 2,13 Z M1,14 5,14 5,15 1,15 Z M0.5,2.75 L2.5,0.6 5.5,3.5 3.5,5.5 Z M5,7 L7,4.75 14,12 12,14 Z M0,7 Q1.5,6.5 2,5 Q2.5,6.5 4,7 Q2.5,7.5 2,9 Q1.5,7.5 0,7 Z M7,3 Q9.5,2.5 10,0 Q10.5,2.5 13,3 Q10.5,3.5 10,6 Q9.5,3.5 7,3 Z" style="stroke-width:0;fill:#fff;"/></svg></a>
                                            <a id="prop-btn-undo" style="display: none;" onclick="codePropC.undo();" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M3.5,6.5 L2.25,4.5 0.75,10.25 6,10.5 5,8.5 Q8.5,5.5 12,7 Q8,3.5 3.5,6.5 Z M11,11 L14.5,11 Q12.5,6 7,8.25 Q11,8 11,11 Z" style="stroke-width:0;fill:#fff;"/></svg></a>
                                            <a id="prop-btn-redo" style="display: none;" onclick="codePropC.redo();" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-info btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M11.5,6.5 L12.75,4.5 14.25,10.25 9,10.5 10,8.5 Q6.5,5.5 3,7 Q7,3.5 11.5,6.5 Z M4,11 L0.5,11 Q2.5,6 8,8.25 Q4,8 4,11 Z" style="stroke-width:0;fill:#fff;"/></svg></a>
                                        </div>
                                        <div style="display:inline; clear:right; float:right;  padding-right: 10px;" align="right">
                                            <select class="dropdown port-dropdown auth-true" displayas="inline-block" title="Ports" data-placement="left" id="comPort"></select>
                                            <a class="btn-view-code" id="btn-view-propc" style="display:inline;" href="#" onclick="tabClick('tab_propc')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" style="vertical-align: middle;"><path d="M0.5,7 C4,1.5 10,1.5 13.5,7 C10,12.5 4,12.5 0.5,7 M0.5,7 C4,3.5 10,3.5 13.5,7" style="stroke:#000;stroke-width:1.5;fill:none;"/><circle cx="7" cy="6.5" r="2.75" style="stroke:#000;stroke-width:1.5;fill:none;"></circle><circle cx="7" cy="6.5" r=".5" style="stroke:#000;stroke-width:1.5;fill:#000;"></circle></svg> <span class="keyed-lang-string" key="menu_code"></span></a>
                                            <a class="btn-view-blocks" id="btn-view-blocks" style="display:none;" href="#" onclick="tabClick('tab_blocks')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" style="vertical-align: middle;"><path d="M0.5,7 C4,1.5 10,1.5 13.5,7 C10,12.5 4,12.5 0.5,7 M0.5,7 C4,3.5 10,3.5 13.5,7" style="stroke:#fff;stroke-width:1.5;fill:none;"/><circle cx="7" cy="6.5" r="2.75" style="stroke:#fff;stroke-width:1.5;fill:none;"></circle><circle cx="7" cy="6.5" r=".5" style="stroke:#fff;stroke-width:1.5;fill:#fff;"></circle></svg> <span class="keyed-lang-string" key="menu_blocks"></span></a>                    
                                            <a href="#" class="btn btn-sm btn-primary" id="btn-view-xml" onclick="tabClick('tab_xml')" style="display: none;"><span class="keyed-lang-string" key="editor_view_xml"></span></a>
                                            <div style="display:inline-block;" class="auth-true" displayas="inline-block"><a href="#" class="demo-function" id="save-project"><span class="keyed-lang-string" key="editor_save"></span></a></div>
                                            <span class="dropdown"><button class="btn btn-sm btn-default dropdown-toggle" id="options-menu" type="button" data-toggle="dropdown">&#9776; <span class="caret"></span></button>
                                                <ul class="dropdown-menu pull-right btn-sm">
                                                    <li class="auth-true" displayas="list-item"><a id="edit-project-details" href="#" onclick="editProjectDetails()"><span class="keyed-lang-string" key="editor_edit-details"></span></a></li>
                                                    <li class="auth-true" displayas="list-item" id="save-as-menu-item"><a id="save-project-as" href="#"><span class="keyed-lang-string" key="editor_save-as"></span></a></li>
                                                    <hr style="line-height:5px; margin:5px;"  class="auth-true" displayas="list-item"/>
                                                    <li class="auth-true" displayas="list-item"><a href="projectcreate.jsp?lang=PROPC" class="url-prefix"><span class="keyed-lang-string" key="menu_newproject_title"></span></a></li>
                                                    <li class="auth-true" displayas="list-item"><a href="my/projects.jsp" class="url-prefix"><span class="keyed-lang-string" key="menu_my_projects"></span></a></li>
                                                    <li><a href="projects.jsp" class="url-prefix"><span class="keyed-lang-string" key="menu_community_projects"></span></a></li>
                                                    <hr style="line-height:5px; margin:5px;" />
                                                    <li><a href="public/help" target="_blank" class="url-prefix"><span class="keyed-lang-string" key="menu_help_reference"></span></a></li>
                                                    <hr style="line-height:5px; margin:5px;" />
                                                    <li><a id="download-side" href="#" onclick="downloadPropC()"><span class="keyed-lang-string" key="menu_download_simpleide"></span></a></li>
                                                    <li><a id="download-project" href="#"><span class="keyed-lang-string" key="editor_download"></span></a></li>
                                                    <li class="auth-true" displayas="list-item"><a id="upload-project" href="#"><span class="keyed-lang-string" key="editor_upload"></span></a></li>
                                                    <hr style="line-height:5px; margin:5px;" class="auth-true" displayas="list-item"/>
                                                    <li class="auth-true" displayas="list-item"><a href="#" onclick="configure_client()"><span class="keyed-lang-string" key="editor_run_configure"></span></a></li>
                                                    <hr style="line-height:5px; margin:5px;" class="auth-true" displayas="list-item"/>
                                                    <li class="auth-true" displayas="list-item"><a href="logout" class="url-prefix"><span class="keyed-lang-string" key="logout"></span></a></li>
                                                </ul>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </td>
                </tr>
                <tr id="find-replace" style="background-color: #ddd; display: none; padding: 5px;">
                    <td width="100%">
                        Find:<input type="text" class="form-control" style="display:inline; height:20px; font-size: 14px; line-height: 20px; width: 200px; padding: 1px;" id="propc-find" name="propc-find"/>
                        <a class="btn-view-blocks" style="height:19px; padding: 0px 3px 1px 3px;" href="#" onclick="codePropC.find(document.getElementById('propc-find').value, {}, true);"><span class="keyed-lang-string" key="editor_find_next"></span></a>
                        &nbsp;&nbsp;&nbsp;&nbsp;Replace:<input type="text" class="form-control" style="display:inline; height:20px; font-size: 14px; line-height: 20px; width: 200px; padding: 1px;" id="propc-replace" name="propc-replace"/>
                        <a class="btn-view-blocks" style="height:19px; padding: 0px 3px 1px 3px;" href="#" onclick="codePropC.replace(document.getElementById('propc-replace').value, {needle: document.getElementById('propc-find').value}, true);"><span class="keyed-lang-string" key="editor_replace"></span></a>
                        &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="close" onclick="findReplaceCode();">&times;</button>
                    </td>
                </tr>
                <tr>
                    <td id="content">
                        <div id="content_blocks">
                            <xml id="toolbox" style="display: none">
                                <category name="2" key="category_control" exclude="s3" colour="205">
                                    <block type="comment"></block>
                                    <block type="controls_if"></block>
                                    <block type="controls_repeat">
                                        <mutation TYPE="FOREVER"></mutation>
                                    </block>
                                    <block type="control_repeat_for_loop">
                                        <value name="START">
                                            <block type="math_number">
                                                <field name="NUM">1</field>
                                            </block>
                                        </value>
                                        <value name="END">
                                            <block type="math_number">
                                                <field name="NUM">10</field>
                                            </block>
                                        </value>
                                        <value name="STEP">
                                            <block type="math_number">
                                                <field name="NUM">1</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="controls_select">
                                        <value name="SWITCH">
                                            <block type="variables_get"></block>
                                        </value>
                                    </block>
                                    <block type="controls_break"></block>
                                    <block type="base_delay">
                                        <value name="DELAY_TIME">
                                            <block type="math_number">
                                                <field name="NUM">1000</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="cog_new"></block>
                                    <block type="controls_return"></block>
                                    <block type="custom_code_multiple" experimental="true"></block>
                                </category>
                                <category name="4" key="category_operators" exclude="s3" colour="275">
                                    <category name="6" key="category_operators_numbers" >
                                        <block type="math_arithmetic"></block>
                                        <block type="math_limit"></block>
                                        <block type="constrain_value"></block>
                                        <block type="math_crement"></block>
                                        <block type="math_random">
                                            <value name="A">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                            <value name="B">
                                                <block type="math_number">
                                                    <field name="NUM">100</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="math_bitwise"></block>
                                        <block type="logic_operation"></block>
                                        <block type="logic_negate"></block>
                                        <block type="parens"></block>
                                        <block type="logic_compare"></block>
                                        <block type="map_value"></block>
                                        <block type="math_advanced"></block>
                                        <block type="math_inv_trig">
                                            <value name="ARG3">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="8" key="category_operators_strings" >
                                        <block type="string_compare"></block>
                                        <block type="string_length"></block>
                                        <block type="combine_strings"></block>
                                        <block type="find_substring"></block>
                                        <block type="get_char_at_position">
                                            <value name="POSITION">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="set_char_at_position">
                                            <value name="POSITION">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="get_substring">
                                            <value name="START">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                            <value name="END">
                                                <block type="math_number">
                                                    <field name="NUM">3</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="string_to_number"></block>
                                        <block type="number_to_string"></block>
                                    </category>
                                </category>
                                <sep></sep>
                                <!-- IF THIS MENU GETS CHANGED BE SURE TO CHANGE THE FOLLOWING MENU AS WELL -->
                                <category name="10" key="category_values" include="other" colour="275">
                                    <block type="math_number"></block>
                                    <block type="string_type_block"></block>
                                    <block type="char_type_block"></block>
                                    <block type="music_note">
                                        <field name="OCTAVE">0.125</field>
                                    </block>
                                    <block type="number_binary"></block>
                                    <block type="number_hex"></block>
                                    <block type="logic_boolean"></block>
                                    <block type="high_low_value"></block>
                                    <block type="constant_define" experimental="true"></block>
                                    <block type="constant_value" experimental="true"></block>
                                    <block type="color_picker"></block>
                                    <block type="color_value_from">
                                        <value name="RED_VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                        <value name="GREEN_VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                        <value name="BLUE_VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="get_channel_from">
                                        <value name="COLOR">
                                            <block type="color_picker"></block>
                                        </value>
                                    </block>
                                    <block type="compare_colors">
                                        <value name="COLOR1">
                                            <block type="color_picker"></block>
                                        </value>
                                        <value name="COLOR2">
                                            <block type="color_picker"></block>
                                        </value>
                                    </block>
                                </category>
                                <!-- IF THIS MENU GETS CHANGED BE SURE TO CHANGE THE PREVIOUS MENU AS WELL -->
                                <category name="12" key="category_values" include="heb" colour="205">
                                    <block type="math_number"></block>
                                    <block type="string_type_block"></block>
                                    <block type="char_type_block"></block>
                                    <block type="music_note">
                                        <field name="OCTAVE">0.125</field>
                                    </block>
                                    <block type="number_binary"></block>
                                    <block type="number_hex"></block>
                                    <block type="logic_boolean"></block>
                                    <block type="high_low_value"></block>
                                    <block type="heb_color_val"></block>
                                    <block type="system_counter"></block>
                                </category>
                                <category name="14" key="category_values" include="activity-board,flip" colour="205">
                                    <block type="math_number"></block>
                                    <block type="string_type_block"></block>
                                    <block type="char_type_block"></block>
                                    <block type="music_note">
                                        <field name="OCTAVE">0.125</field>
                                    </block>
                                    <block type="number_binary"></block>
                                    <block type="number_hex"></block>
                                    <block type="logic_boolean"></block>
                                    <block type="high_low_value"></block>
                                    <block type="constant_define" experimental="true"></block>
                                    <block type="constant_value" experimental="true"></block>
                                    <block type="color_picker"></block>
                                    <block type="color_value_from">
                                        <value name="RED_VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                        <value name="GREEN_VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                        <value name="BLUE_VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="get_channel_from">
                                        <value name="COLOR">
                                            <block type="color_picker"></block>
                                        </value>
                                    </block>
                                    <block type="compare_colors">
                                        <value name="COLOR1">
                                            <block type="color_picker"></block>
                                        </value>
                                        <value name="COLOR2">
                                            <block type="color_picker"></block>
                                        </value>
                                    </block>
                                    <block type="system_counter"></block>
                                </category>
                                <category name="16" key="category_operators_arrays" exclude="s3" colour="250">
                                    <block type="array_init"></block>
                                    <block type="array_fill"></block>
                                    <block type="array_get">
                                        <value name="NUM">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="array_set">
                                        <value name="NUM">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                        <value name="VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="array_clear"></block>
                                </category>
                                <category name="18" key="category_control" include="s3" colour=205>
                                    <block type="controls_repeat">
                                        <mutation TYPE="FOREVER"></mutation>
                                    </block>
                                    <block type="controls_repeat">
                                        <mutation type="TIMES"></mutation>
                                        <field name="TYPE">TIMES</field>
                                        <value name="TIMES">
                                            <block type="math_number">
                                                <field name="NUM">10</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="control_repeat_for_loop">
                                        <value name="START">
                                            <block type="math_number">
                                                <field name="NUM">1</field>
                                            </block>
                                        </value>
                                        <value name="END">
                                            <block type="math_number">
                                                <field name="NUM">10</field>
                                            </block>
                                        </value>
                                        <value name="STEP">
                                            <block type="math_number">
                                                <field name="NUM">1</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="scribbler_exit_loop"></block>
                                    <block type="controls_if"></block>
                                    <block type="controls_select">
                                        <value name="SWITCH">
                                            <block type="variables_get"></block>
                                        </value>
                                    </block>
                                    <block type="scribbler_wait">
                                        <value name="WAITTIME">
                                            <block type="math_number">
                                                <field name="NUM">500</field>
                                            </block>
                                        </value>
                                        <field name="TIMESCALE">1</field>
                                    </block>
                                    <block type="comment"></block>
                                </category>
                                <category name="20" key="category_variables" custom="VARIABLE" colour="250"></category>
                                <category name="22" key="category_operators_arrays" include="s3" colour="250">
                                    <block type="array_init"></block>
                                    <block type="array_fill"></block>
                                    <block type="array_get">
                                        <value name="NUM">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="array_set">
                                        <value name="NUM">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                        <value name="VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="array_clear"></block>
                                </category>
                                <category name="24" key="category_functions" custom="PROCEDURE" colour="225"></category>
                                <category name="26" key="category_input-output_pin-states" exclude="s3,heb" colour="185">
                                    <block type="make_pin"></block>
                                    <block type="make_pin_input">
                                        <value name="PIN">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="check_pin"></block>
                                    <block type="check_pin_input">
                                        <value name="PIN">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="set_pins"></block>
                                    <block type="get_pins"></block>
                                    <block type="set_pins_binary">
                                        <value name="VALUE">
                                            <block type="number_binary"></block>
                                        </value>
                                </category>
                                <category name="28" key="category_communicate" include="activity-board,flip,other" colour="340">
                                    <category name="30" key="category_communicate_graphing" include="activity-board,flip,other">
                                        <block type="graph_settings">
                                            <field name="XAXIS">40,S</field>
                                        </block>                
                                        <block type="graph_output"></block>
                                    </category>
                                    <category name="32" key="category_communicate_oled" >
                                        <block type="oled_initialize"></block>
                                        <block type="oled_font_loader"></block>
                                        <block type="oled_get_max_height"></block>
                                        <block type="oled_get_max_width"></block>
                                        <block type="oled_clear_screen"></block>
                                        <block type="oled_text_color">
                                            <value name="FONT_COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                            <value name="BACKGROUND_COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                        </block>
                                        <block type="oled_text_size"></block>
                                        <block type="oled_set_cursor">
                                            <value name="X_POS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y_POS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="oled_print_text">
                                            <value name="MESSAGE">
                                                <block type="string_type_block"></block>
                                            </value>
                                        </block>
                                        <block type="oled_print_number">
                                            <value name="NUMIN">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="oled_print_multiple"></block>
                                        <block type="oled_draw_pixel">
                                            <value name="X_AXIS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y_AXIS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                        </block>
                                        <block type="oled_draw_line">
                                            <value name="X_ONE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y_ONE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="X_TWO">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y_TWO">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                        </block>
                                        <block type="oled_draw_triangle">
                                            <value name="POINT_X0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POINT_Y0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POINT_X1">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POINT_Y1">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POINT_X2">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POINT_Y2">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                        </block>
                                        <block type="oled_draw_rectangle">
                                            <value name="POINT_X">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POINT_Y">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="RECT_WIDTH">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="RECT_HEIGHT">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="RECT_ROUND">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                        </block>
                                        <block type="oled_draw_circle">
                                            <value name="POINT_X">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POINT_Y">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="RADIUS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="34" key="category_communicate_protocols" >
                                        <block type="serial_open"></block>
                                        <!-- <block type="serial_tx"></block> -->
                                        <block type="serial_send_text"></block>
                                        <!-- <block type="serial_rx"></block> -->
                                        <block type="serial_print_multiple" experimental="true"></block>
                                        <block type="serial_receive_text"></block>
                                        <block type="serial_scan_multiple" experimental="true"></block>
                                        <block type="i2c_send" experimental="true">
                                            <value name="DATA">
                                                <block type="math_number">
                                                    <field name="NUM">10</field>
                                                </block>
                                            </value>
                                            <value name="ADDR">
                                                <block type="number_hex"></block>
                                            </value>
                                            <value name="DEVICE">
                                                <block type="number_hex"></block>
                                            </value>
                                        </block>
                                        <block type="i2c_receive" experimental="true">
                                            <value name="ADDR">
                                                <block type="number_hex"></block>
                                            </value>
                                            <value name="DEVICE">
                                                <block type="number_hex"></block>
                                            </value>
                                        </block>
                                        <block type="i2c_busy" experimental="true">
                                            <value name="DEVICE">
                                                <block type="number_hex"></block>
                                            </value>
                                        </block>
                                        <block type="i2c_mode" experimental="true"></block>
                                        <block type="shift_in"></block>
                                        <block type="shift_out">
                                            <value name="VALUE">
                                                <block type="math_number">
                                                    <field name="NUM">10</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="36" key="category_communicate_WS2812B" >
                                        <block type="ws2812b_init"></block>
                                        <block type="ws2812b_set">
                                            <value name="LED">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                            <value name="COLOR">
                                                <block type="color_picker"></block>
                                            </value>
                                        </block>
                                        <block type="ws2812b_set_multiple">
                                            <value name="START">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                            <value name="END">
                                                <block type="math_number">
                                                    <field name="NUM">4</field>
                                                </block>
                                            </value>
                                            <value name="COLOR">
                                                <block type="color_picker">#000000</block>
                                            </value>
                                        </block>
                                        <block type="ws2812b_update"></block>
                                    </category>
                                    <category name="38" key="category_communicate_serial-lcd" >
                                        <block type="debug_lcd_init"></block>
                                        <block type="debug_lcd_print">
                                            <value name="MESSAGE">
                                                <block type="string_type_block"></block>
                                            </value>
                                        </block>
                                        <block type="debug_lcd_number">
                                            <value name="VALUE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="debug_lcd_print_multiple"></block>
                                        <block type="debug_lcd_action"></block>
                                        <block type="debug_lcd_set_cursor">
                                            <value name="ROW">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLUMN">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="debug_lcd_music_note"></block>
                                    </category>
                                    <category name="40" key="category_communicate_serial-terminal" >
                                        <block type="console_print">
                                            <value name="MESSAGE">
                                                <block type="string_type_block"></block>
                                            </value>
                                        </block>
                                        <block type="console_print_variables">
                                            <value name="VALUE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="console_print_multiple"></block>
                                        <block type="console_scan_text"></block>
                                        <block type="console_scan_number"></block>
                                        <block type="console_newline"></block>
                                        <block type="console_clear"></block>
                                        <block type="console_move_to_position">
                                            <value name="ROW">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLUMN">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>

                                    <category name="WX Module" experimental="true">
                                        <category name="Simple">
                                            <block type="wx_init"></block>
                                            <block type="wx_config_page"></block>
                                            <block type="wx_set_widget"></block>
                                            <block type="wx_send_widget">
                                                <value name="NUM">
                                                    <block type="math_number">
                                                        <field name="NUM">10</field>
                                                    </block>
                                                </value>
                                            </block>
                                            <block type="wx_read_widgets"></block>
                                            <block type="wx_get_widget"></block>
                                            <block type="wx_evt_connected"></block>
                                            <block type="wx_reconnect"></block>
                                        </category>
                                        <category name="Advanced">
                                            <block type="wx_init_adv"></block>
                                            <block type="wx_listen">
                                                <field name="ID">wxConnId1</field>
                                                <value name="PATH">
                                                    <block type="string_type_block">
                                                        <field name="TEXT">path</field>
                                                    </block>
                                                </value>
                                            </block>
                                            <block type="wx_poll">
                                                <field name="EVENT">wxEvent</field>
                                                <field name="ID">wxId</field>
                                                <field name="HANDLE">wxHandle</field>
                                            </block>
                                            <block type="wx_print_multiple">
                                                <field name="HANDLE">wxHandle</field>
                                            </block>
                                            <block type="wx_send_string">
                                                <field name="HANDLE">wxHandle</field>
                                                <value name="DATA">
                                                    <block type="string_type_block"></block>
                                                </value>
                                            </block>
                                            <block type="wx_scan_multiple">
                                                <field name="HANDLE">wxHandle</field>
                                            </block>
                                            <block type="wx_scan_string">
                                                <field name="HANDLE">wxHandle</field>
                                            </block>
                                            <block type="wx_receive_string">
                                                <field name="HANDLE">wxHandle</field>
                                                <value name="MAX">
                                                    <block type="math_number">
                                                        <field name="NUM">64</field>
                                                    </block>
                                                </value>
                                            </block>
                                            <block type="wx_mode"></block>
                                            <block type="wx_code"></block>
                                            <block type="wx_buffer">
                                                <value name="SIZE">
                                                    <block type="math_number">
                                                        <field name="NUM">64</field>
                                                    </block>
                                                </value>
                                            </block>
                                            <block type="wx_join"></block>
                                            <block type="wx_disconnect"></block>
                                            <block type="wx_ip"></block>
                                        </category>
                                    </category>

                                    <category name="42" key="category_communicate_xbee">
                                        <block type="xbee_setup"></block>
                                        <block type="xbee_transmit"></block>
                                        <block type="xbee_print_multiple" experimental="true"></block>
                                        <block type="xbee_receive"></block>
                                        <block type="xbee_scan_multiple" experimental="true"></block>
                                        <block type="xbee_configure" experimental="true"></block>
                                    </category>
                                </category>

                                <sep include="heb"></sep>

                                <category name="44" key="category_communicate" include="heb" colour="340">
                                    <category name="46" key="category_communicate_serial-terminal">
                                        <block type="console_print">
                                            <value name="MESSAGE">
                                                <block type="string_type_block"></block>
                                            </value>
                                        </block>
                                        <block type="console_print_variables">
                                            <value name="VALUE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="console_scan_text"></block>
                                        <block type="console_scan_number"></block>
                                        <block type="console_newline"></block>
                                        <block type="console_clear"></block>
                                        <block type="console_move_to_position">
                                            <value name="ROW">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLUMN">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="48" key="category_hackable-electronic-badge_oled" >
                                        <block type="heb_print_numeric_var">
                                            <value name="VALUE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_print_string_var">
                                            <value name="VALUE">
                                                <block type="string_type_block">
                                                    <field name="TEXT">Hello</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_cursor_position_large"></block>
                                        <block type="heb_cursor_position_small">
                                            <value name="ROWS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="COLS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_clear_screen"></block>
                                        <block type="heb_rotate"></block>
                                        <block type="heb_oled_point">
                                            <value name="X0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_oled_line">
                                            <value name="X0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="X1">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y1">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_oled_box">
                                            <value name="X0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="W">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="H">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_oled_circle">
                                            <value name="X0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="R">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_oled_triangle">
                                            <value name="X0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y0">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="X1">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y1">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="X2">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y2">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="50" key="category_hackable-electronic-badge_ir-communication" >
                                        <block type="heb_ir_send_signal">
                                            <value name="MESSAGE">
                                                <block type="string_type_block">
                                                    <field name="TEXT">Hello</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_ir_read_signal"></block>
                                        <block type="heb_ir_clear_buffer"></block>
                                    </category>
                                </category>
                                <category name="52" key="category_audio" include="heb" colour="295">
                                    <category name="53" key="category_audio_freqout" >
                                        <block type="sound_play"></block>
                                    </category>
                                    <category name="54" key="category_hackable-electronic-badge_text-to-speech" >
                                        <block type="heb_text_to_speech_say">
                                            <value name="STRING">
                                                <block type="string_type_block">
                                                    <field name="TEXT">heloa</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="heb_text_to_speech_spell">
                                            <value name="STRING">
                                                <block type="string_type_block">
                                                    <field name="TEXT">hello</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                </category>
                                <category name="56" key="category_hackable-electronic-badge_led_control" include="heb" colour="225">
                                    <block type="heb_toggle_led"></block>
                                    <block type="heb_toggle_led_open">
                                        <value name="LED_NUM">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                        <value name="LED_STATE">
                                            <block type="high_low_value">
                                                <field name="VALUE">high</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="heb_set_led_rgb">
                                        <value name="RGB">
                                            <block type="heb_color_val"></block>
                                        </value>
                                    </block>
                                </category>
                                <category name="58" key="category_sensor-input" include="heb" colour="185">
                                    <category name="60" key="category_hackable-electronic-badge_accelerometer" >
                                        <block type="heb_badge_axis_acceleration"></block>
                                        <block type="heb_badge_was_shaken"></block>
                                    </category>
                                    <category name="62" key="category_hackable-electronic-badge_touchpad-control" >
                                        <block type="heb_touchpad_status"></block>
                                    </category>
                                </category>
                                <category name="64" key="category_memory" include="heb" colour="140">
                                    <block type="heb_badge_eeprom_store">
                                        <value name="CONTACT">
                                            <block type="string_type_block">
                                                <field name="TEXT">Last, First</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="heb_badge_eeprom_is_stored">
                                        <value name="CONTACT">
                                            <block type="string_type_block">
                                                <field name="TEXT">Last, First</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="heb_badge_eeprom_retrieve">
                                        <value name="INDEX">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="heb_count_contacts"></block>
                                    <block type="heb_erase_all_contacts"></block>
                                </category>
                                <category name="66" key="category_sensor-input" exclude="s3,heb" colour="140">
                                    <category name="68" key="category_sensor-input_2axis-joystick" include="activity-board">
                                        <block type="joystick_input_xaxis"></block>
                                        <block type="joystick_input_yaxis"></block>
                                    </category>
                                    <category name="70" key="category_sensor-input_4x4-keypad" >
                                        <block type="keypad_initialize"></block>
                                        <block type="keypad_read"></block>
                                    </category>
                                    <category name="72" key="category_sensor-input_colorpal" >
                                        <block type="colorpal_enable"></block>
                                        <block type="colorpal_get_colors_raw"></block>
                                        <block type="colorpal_get_colors"></block>
                                    </category>
                                    <category name="74" key="category_sensor-input_ping" >
                                        <block type="sensor_ping"></block>
                                    </category>
                                    <category name="76" key="category_sensor-input_gps" >
                                        <block type="GPS_init"></block>
                                        <block type="GPS_hasFix"></block>
                                        <block type="GPS_latitude"></block>
                                        <block type="GPS_longitude"></block>
                                        <block type="GPS_heading"></block>
                                        <block type="GPS_altitude"></block>
                                        <block type="GPS_velocity"></block>
                                        <block type="GPS_satsTracked"></block>
                                        <block type="GPS_date_time"></block>
                                    </category>
                                    <category name="78" key="category_sensor-input_fingerprint" >
                                        <block type="fp_scanner_init"></block>
                                        <block type="fp_scanner_add">
                                            <value name="USER">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="fp_scanner_scan"></block>
                                    </category>
                                    <!--
                                                <category name="80" key="category_sensor-input_hmc5883l" >
                                                    <block type="HMC5883L_init"></block>
                                                    <block type="HMC5883L_read"></block>
                                                </category>
                                    -->
                                    <category name="82" key="category_sensor-input_LSM9DS1" >
                                        <block type="lsm9ds1_init"></block>
                                        <block type="lsm9ds1_mag_calibrate"></block>
                                        <block type="lsm9ds1_read"></block>
                                        <block type="lsm9ds1_tilt"></block>
                                        <block type="lsm9ds1_heading"></block>
                                    </category>
                                    <category name="84" key="category_sensor-input_memsic-2axis" >
                                        <block type="MX2125_acceleration_xaxis"></block>
                                        <block type="MX2125_acceleration_yaxis"></block>
                                        <block type="MX2125_rotation"></block>
                                        <block type="MX2125_tilt_xaxis"></block>
                                        <block type="MX2125_tilt_yaxis"></block>
                                    </category>
                                    <!--
                                                <category name="86" key="category_sensor-input_mma7455" >
                                                    <block type="MMA7455_init"></block>
                                                    <block type="MMA7455_acceleration"></block>
                                                </category>
                                    -->
                                    <category name="88" key="category_sensor-input_pir" >
                                        <block type="PIR_Sensor"></block>
                                    </category>
                                    <category name="90" key="category_sensor-input_rfid" >
                                        <block type="rfid_enable"></block>
                                        <block type="rfid_get"></block>
                                        <block type="rfid_disable"></block>
                                        <block type="rfid_close"></block>
                                    </category>
                                    <category name="92" key="category_sensor-input_sony-remote" >
                                        <block type="sirc_get"></block>
                                    </category>
                                    <category name="94" key="category_sensor-input_sound-impact-sensor" >
                                        <block type="sound_impact_run"></block>
                                        <block type="sound_impact_get"></block>
                                        <block type="sound_impact_end"></block>
                                    </category>
                                    <category name="95" key="category_sensor-input_temperature-humidity" >
                                        <block type="dht22_read"></block>
                                        <block type="dht22_value"></block>
                                    </category>
                                </category>
                                <category name="96" key="category_memory" include="activity-board,flip,other" colour="165">
                                    <category name="98" key="category_memory_eeprom" >
                                        <block type="eeprom_read">
                                            <value name="ADDRESS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="eeprom_write">
                                            <value name="ADDRESS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="102" key="category_memory_sdcard" include="activity-board,flip,other" experimental="true">
                                        <block type="sd_init" exclude="activity-board"></block>
                                        <block type="sd_open"></block>
                                        <block type="sd_read">
                                            <value name="SIZE">
                                                <block type="math_number">
                                                    <field name="NUM">10</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="sd_file_pointer"></block>
                                     </category>
                                </category>
                                <category name="104" key="category_analog-pulses" exclude="s3,heb" colour="185">
                                    <category name="106" key="category_analog-pulses_pulse-in-out" exclude="s3">
                                        <block type="pulse_in"></block>
                                        <block type="pulse_out">
                                            <value name="PULSE_LENGTH">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="base_count">
                                            <value name="DURATION">
                                                <block type="math_number">
                                                    <field name="NUM">1</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="108" key="category_analog-pulses_pwm" exclude="s3">
                                        <!-- <block type="pwm_start"></block> -->
                                        <block type="pwm_set">
                                            <value name="DUTY_CYCLE">
                                                <block type="math_number">
                                                    <field name="NUM">50</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="pwm_stop"></block>
                                    </category>
                                    <category name="110" key="category_analog-pulses_rc" exclude="s3">
                                        <block type="rc_charge_discharge"></block>
                                    </category>
                                    <category name="112" key="category_analog-pulses_voltage" include="activity-board">
                                        <block type="ab_volt_in"></block>
                                        <block type="ab_volt_out">
                                            <value name="VALUE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="114" key="category_analog-pulses_voltage" include="flip,other">
                                        <block type="mcp320x_read"></block>
                                        <block type="mcp320x_set_vref"></block>
                                    </category>
                                </category>
                                <category name="116" key="category_audio" exclude="s3,heb" colour="185">
                                    <category name="118" key="category_audio_freqout">
                                        <block type="base_freqout">
                                            <value name="DURATION">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="FREQUENCY">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="sound_init" include="activity-board" experimental="true">
                                            <field name="PINL">26</field>
                                            <field name="PINR">27</field>
                                        </block>                                        
                                        <block type="sound_init" exclude="activity-board" experimental="true"></block>
                                        <block type="sound_play" experimental="true"></block>
                                    </category>
                                    <category name="120" key="category_audio_audio" include="activity-board">
                                        <block type="wav_play"></block>
                                        <block type="wav_status"></block>
                                        <block type="wav_volume">
                                            <value name="VOLUME">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="wav_stop"></block>
                                    </category>
                                </category>
                                <category name="122" key="category_servo" exclude="s3,heb" colour="165">
                                    <block type="servo_move">
                                        <value name="ANGLE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="servo_speed">
                                        <value name="SPEED">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="servo_set_ramp">
                                        <value name="RAMPSTEP">
                                            <block type="math_number">
                                                <field name="NUM">50</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="fb360_init"></block>
                                    <block type="fb360_setup">
                                        <field name="PARAM">setAcceleration</field>
                                    </block>
                                    <block type="fb360_set">
                                        <value name="VALUE">
                                            <block type="math_number">
                                                <field name="NUM">0</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="fb360_get"></block>
                                    <block type="fb360_status"></block>
                                    <block type="scribbler_stop_servo"></block>
                                </category>
                                <category name="124" key="category_robot"  include="activity-board" colour="295">
                                    <block type="ab_drive_init"></block>
                                    <block type="ab_drive_ramping">
                                        <field name="RAMPING">600</field>
                                    </block>
                                    <block type="ab_drive_speed">
                                        <value name="LEFT">
                                            <block type="math_number">
                                                <field name="NUM">64</field>
                                            </block>
                                        </value>
                                        <value name="RIGHT">
                                            <block type="math_number">
                                                <field name="NUM">64</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="ab_drive_goto">
                                        <value name="LEFT">
                                            <block type="math_number">
                                                <field name="NUM">64</field>
                                            </block>
                                        </value>
                                        <value name="RIGHT">
                                            <block type="math_number">
                                                <field name="NUM">64</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="ab_drive_goto_max_speed">
                                        <value name="SPEED">
                                            <block type="math_number">
                                                <field name="NUM">64</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="ab_drive_stop"></block>
                                    <block type="ab_drive_get_ticks"></block>
                                    <block type="activitybot_calibrate"></block>
                                    <block type="activitybot_display_calibration"></block>
                                </category>
                                <category name="126" key="category_s3-math" include="s3" colour="275">
                                    <block type="math_number"></block>
                                    <block type="scribbler_boolean"></block>
                                    <block type="scribbler_random_boolean"></block>
                                    <block type="math_random">
                                        <value name="A">
                                            <block type="math_number">
                                                <field name="NUM">1</field>
                                            </block>
                                        </value>
                                        <value name="B">
                                            <block type="math_number">
                                                <field name="NUM">10</field>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="math_arithmetic"></block>
                                    <block type="math_limit"></block>
                                    <block type="logic_operation"></block>
                                    <block type="math_crement"></block>
                                    <block type="logic_negate"></block>
                                    <block type="logic_compare"></block>
                                    <block type="constrain_value"></block>
                                    <block type="map_value"></block>
                                    <block type="math_advanced"></block>
                                    <block type="math_inv_trig">
                                        <value name="ARG3">
                                            <block type="math_number">
                                                <field name="NUM">1</field>
                                            </block>
                                        </value>
                                    </block>
                                </category>
                                <category name="128" key="category_sensor-input" include="s3" colour=140>
                                    <category name="130" key="category_sensor-input_s3-line" >
                                        <block type="calibrate_line_sensor"></block>
                                        <!-- <block type="scribbler_if_line"></block> -->
                                        <block type="scribbler_simple_line"></block>
                                        <block type="line_sensor"></block>
                                    </category>
                                    <category name="132" key="category_sensor-input_s3-obstacle" >
                                        <!-- <block type="scribbler_if_obstacle"></block>
                                        <block type="obstacle_sensor"></block> -->
                                        <block type="scribbler_simple_obstacle"></block>
                                    </category>
                                    <category name="134" key="category_sensor-input_s3-light" >
                                        <!-- <block type="scribbler_if_light"></block> -->
                                        <block type="scribbler_simple_light"></block>
                                        <block type="light_sensor"></block>
                                    </category>
                                    <category name="136" key="category_sensor-input_s3-stall" >
                                        <!-- <block type="scribbler_if_stalled"></block> -->
                                        <block type="stall_sensor"></block>
                                        <!-- <block type="spinning_sensor"></block> -->
                                    </category>
                                    <category name="138" key="category_sensor-input_s3-sirc" >
                                        <block type="sirc_s3_get"></block>
                                    </category>
                                    <category name="140" key="category_sensor-input_s3-mic" >
                                        <block type="mic_s3_get"></block>
                                    </category>
                                    <category name="142" key="category_sensor-input_s3-button" >
                                        <block type="reset_button_presses"></block>
                                    </category>
                                </category>
                                <category name="144" key="category_s3-actions" include="s3" colour="185">
                                    <category name="146" key="category_s3-actions_motors" >
                                        <block type="scribbler_drive">
                                            <field name="DRIVE_ANGLE">STRAIGHT</field>
                                        </block>
                                        <block type="scribbler_spin"></block>
                                        <block type="scribbler_stop"></block>
                                        <block type="move_motors">
                                            <value name="LEFT_MOTOR_SPEED">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="RIGHT_MOTOR_SPEED">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="MOTOR_DURATION">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="move_motors_distance">
                                            <value name="LEFT_MOTOR_DISTANCE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="RIGHT_MOTOR_DISTANCE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="MOTOR_SPEED">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="move_motors_xy">
                                            <value name="X_DISTANCE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="Y_DISTANCE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="MOTOR_SPEED">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="move_motors_angle">
                                            <value name="ROTATE_ANGLE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="ROTATE_RADIUS">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="ROTATE_SPEED">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="148" key="category_s3-actions_sound" include="s3">
                                        <block type="scribbler_play">
                                            <field name="NOTE_DURATION">250</field>
                                            <field name="NOTE_OCTAVE">4</field>
                                            <field name="NOTE_FREQUENCY">4186</field>
                                            <field name="NOTE_VOLUME">50</field>
                                        </block>
                                        <block type="play_polyphony">
                                            <value name="FREQUENCY_1">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="FREQUENCY_2">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POLYPHONY_DURATION">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="POLYPHONY_VOLUME">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="150" key="category_s3-actions_leds" include="s3">
                                        <block type="scribbler_LED"></block>
                                    </category>
                                    <category name="152" key="category_communicate" include="s3">
                                        <block type="scribbler_serial_send_text"></block>
                                        <block type="scribbler_serial_send_decimal"></block>
                                        <block type="scribbler_serial_send_char"></block>
                                        <block type="scribbler_serial_send_ctrl"></block>
                                        <!--
                                                        <block type="scribbler_serial_cursor_xy">
                                                            <value name="X">
                                                                <block type="spin_integer">
                                                                    <field name="INT_VALUE">0</field>
                                                                </block>
                                                            </value>
                                                            <value name="Y">
                                                                <block type="spin_integer">
                                                                    <field name="INT_VALUE">0</field>
                                                                </block>
                                                            </value>
                                                        </block>
                                        -->
                                        <block type="scribbler_serial_rx_byte"></block>
                                    </category>
                                    <category name="154" key="category_memory" include="s3">
                                        <block type="s3_eeprom_read">
                                            <value name="ADDR">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="s3_eeprom_write">
                                            <value name="ADDR">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                            <value name="VALUE">
                                                <block type="math_number">
                                                    <field name="NUM">0</field>
                                                </block>
                                            </value>
                                        </block>
                                    </category>
                                    <category name="156" key="category_s3-actions_reset" include="s3">
                                        <block type="factory_reset"></block>
                                    </category>
                                </category>
                                <category name="158" key="category_s3-hacker-port" include="s3" colour="295">
                                    <category name="160" key="category_s3-hacker-port_sensors" >
                                        <block type="scribbler_ping"></block>
                                    </category>
                                    <category name="162" key="category_s3-hacker-port_pins" >
                                        <block type="make_pin"></block>
                                        <block type="check_pin"></block>
                                        <block type="analog_input"></block>
                                    </category>
                                    <category name="164" key="category_s3-hacker-port_servo" >
                                        <block type="servo_move">
                                            <value name="ANGLE">
                                                <block type="math_number">
                                                    <field name="NUM">90</field>
                                                </block>
                                            </value>
                                        </block>
                                        <block type="scribbler_stop_servo"></block>
                                    </category>
                                </category>

                                <category name="166" key="category_system" include="other" colour="320">
                                    <block type="waitcnt">
                                        <value name="TARGET">
                                            <block type="math_arithmetic">
                                                <value name="A">
                                                    <block type="system_counter"></block>
                                                </value>
                                            </block>
                                        </value>
                                    </block>
                                    <block type="register_set"></block>
                                    <block type="register_get"></block>
                                    <block type="system_counter"></block>
                                    <block type="custom_code" experimental="true"></block>
                                </category>
                            </xml>                        </div>
                        <div id="content_propc">
                            <div id="code-propc"></div>
                        </div>
                        <div id="content_xml">
                            <div id="code-xml"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="modal fade" id="upload-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" onclick="clearUploadInfo();" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="upload-dialog-title"><span class="keyed-lang-string" key="editor_upload"></span></h4>
                    </div>
                    <div class="modal-body">

                        <label class="control-label"><span class="keyed-lang-string" key="editor_upload_selectfile"></span></label>
                        <input id="selectfile" type="file" onchange="uploadHandler(this.files);">
                        <div id="selectfile-verify-valid" class="alert alert-success" style="display: none;"><svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M2.25,6 L5.5,9.25 12,2.5 13.5,4 5.5,12 1,7.5 Z" style="stroke:#3c763d;stroke-width:1;fill:#3c763d;"/></svg> <span class="keyed-lang-string" key="editor_upload_valid"></span></div>
                        <div id="selectfile-verify-notvalid" class="alert alert-danger" style="display: none;"><svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7,8 L8,8 8,11 8,11 7,11 Z" style="stroke-width:1px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="7.5" r="6" style="stroke-width:1.3px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="5" r="1.25" style="stroke-width:0;fill:#8a6d3b;"/></svg> <span class="keyed-lang-string" key="editor_upload_notvalid"></span></div>
                        <div id="selectfile-verify-boardtype" class="alert alert-warning" style="display: none;"><svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1,12 L2,13 13,13 14,12 8,2 7,2 1,12 Z M7.25,6 L7.75,6 7.5,9 Z" style="stroke-width:1.5px;stroke:#a94442;fill:none;"/><circle cx="7.5" cy="10.75" r="1" style="stroke-width:0;fill:#a94442;"/><circle cx="7.5" cy="5.5" r="1" style="stroke-width:0;fill:#a94442;"/></svg> <span class="keyed-lang-string" key="editor_upload_boardtype_warning"></span></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" disabled="true" id="selectfile-replace" onclick="uploadMergeCode(false);"><span class="keyed-lang-string" key="editor_button_replace"></span></button>
                        <button type="button" class="btn btn-primary" disabled="true" id="selectfile-append" onclick="uploadMergeCode(true);"><span class="keyed-lang-string" key="editor_button_append"></span></button>
                        <button type="button" class="btn btn-default" onclick="clearUploadInfo();" data-dismiss="modal"><span class="keyed-lang-string" key="editor_button_cancel"></span></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="save-check-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="save-check-title"><span class="keyed-lang-string" key="editor_save-check"></span></h4>
                    </div>
                    <div class="modal-body">
                        <div id="save-check-warning"><svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1,12 L2,13 13,13 14,12 8,2 7,2 1,12 Z M7.25,6 L7.75,6 7.5,9 Z" style="stroke-width:1.5px;stroke:#000;fill:none;"/><circle cx="7.5" cy="10.75" r="1" style="stroke-width:0;fill:#000;"/><circle cx="7.5" cy="5.5" r="1" style="stroke-width:0;fill:#000;"/></svg> <span class="keyed-lang-string" key="editor_save-check_warning"></span></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string" key="editor_button_close"></span></button>
                        <button type="button" class="btn btn-default" onclick="saveAsDialog();"><span class="keyed-lang-string" key="project_saveaslink"></span></button>
                        <button type="button" class="btn btn-primary" onclick="saveProject();" data-dismiss="modal"><span class="keyed-lang-string" key="project_savelink"></span></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="compile-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="compile-dialog-title">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <label for="compile-console"><span class="keyed-lang-string" key="editor_title_result"></span></label>
                        <textarea class="form-control" rows="15" id="compile-console"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string" key="editor_button_close"></span></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="console-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="console-dialog-title"><span class="keyed-lang-string" key="editor_title_terminal"></span></h4>
                    </div>
                    <div class="modal-body" style="height: 430px;">
                        <div id="serial-conn-info"></div>
                        <div id="serial_console" class="prop-term" type="text" tabindex="1" autofocus></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string" key="editor_button_close"></span></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="graphing-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="graphing-dialog-title"><span class="keyed-lang-string" key="editor_title_graphing"></span></h4>
                    </div>
                    <div class="modal-body" style="height: 445px;">
                        <div id="graph-conn-info"></div>
                        <table>
                            <tr>
                                <td>
                                    <div id="serial_graphing" class="ct-chart ct-perfect-fourth" style="width:500px;"></div>
                                    <div id="graph_x-axis_label" align="center">Time (seconds)</div>
                                </td>
                                <td valign="top">
                                    <div id="serial_graphing_labels"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer clearfix">
                        <button type="button" id="btn-graph-play" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-primary btn-circle pull-left" onclick="graph_play();"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,2 L4,2 4,11 5.5,11 Z M8.5,2 L10,2 10,11 8.5,11 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg></button>&nbsp;
                        <button type="button" id="btn-graph-snapshot" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-success btn-circle pull-left" onclick="downloadGraph();"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M1.5,13.5 L.5,12.5 .5,5.5 1.5,4.5 2.5,4.5 4,3 7,3 8.5,4.5 12.5,4.5 13.5,5.5 13.5,12.5 12.5,13.5 Z M 2,9 A 4,4,0,0,0,10,9 A 4,4,0,0,0,2,9 Z M 4.5,9 A 1.5,1.5,0,0,0,7.5,9 A 1.5,1.5,0,0,0,4.5,9 Z M 10.5,6.5 A 1,1,0,0,0,13.5,6.5 A 1,1,0,0,0,10.5,6.5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;" fill-rule="evenodd"/></svg></button>&nbsp;
                        <button type="button" id="btn-graph-csv" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-success btn-circle pull-left" onclick="downloadCSV();"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M2,.5 L2,13.5 12,13.5 12,7.5 5.5,7.5 5.5,.5 Z M 8,1.5 L8,5 11,5 Z" style="stroke:#fff;stroke-width:1;fill:#fff;" fill-rule="evenodd"/></svg></button>
                        <button type="button" id="btn-graph-clear" data-toggle="tooltip" title="" data-placement="bottom" class="btn btn-primary btn-circle pull-left" onclick="graphStartStop('clear');"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M2,12 A1.5,1.5 0 0 1 2,10 L10,2 14.5,6.5 7,14 M10,11 L5.5,6.5 M15,14 L4,14 2,12 M15,13.2 5,13.2" style="stroke:#fff;stroke-width:1;fill:none;"/><path d="M2,12 A1.5,1.5 0 0 1 2,10 L5.5,6.5 10,11 7,14 4,14 Z" style="stroke-width:0;fill:#fff;"/></svg></button>&nbsp;
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string" key="editor_button_close"></span></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="save-as-type-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="save-as-type-dialog-title"><span class="keyed-lang-string" key="editor_save-as"></span></h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="save-as-project-name"><span class="keyed-lang-string" key="project_create_project_name"></span></label>
                            <input type="text" class="form-control" id="save-as-project-name" name="save-as-project-name"/>
                                </div>
                                <div class="form-group">
                                    <label for="save-as-board-type"><span class="keyed-lang-string" key="project_create_board_type"></span></label>
                            <select class="form-control" id="save-as-board-type" name="save-as-board-type" onchange="checkBoardType();">
                                <option disabled="" selected=""><span class="keyed-lang-string" key="project_create_board_type_select"></span></option>
                            </select>
                        </div>
                        <div id="save-as-verify-boardtype" class="alert alert-warning" style="display: none;"><svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1,12 L2,13 13,13 14,12 8,2 7,2 1,12 Z M7.25,6 L7.75,6 7.5,9 Z" style="stroke-width:1.5px;stroke:#a94442;fill:none;"/><circle cx="7.5" cy="10.75" r="1" style="stroke-width:0;fill:#a94442;"/><circle cx="7.5" cy="5.5" r="1" style="stroke-width:0;fill:#a94442;"/></svg> <span class="keyed-lang-string" key="editor_saveas_boardtype_warning"></span></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string" key="editor_button_close"></span></button>
                        <button type="button" class="btn btn-primary" onclick="saveProjectAs();" data-dismiss="modal"><span class="keyed-lang-string" key="editor_save-as"></span></button>
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
                        <h4 class="modal-title"><span class="keyed-lang-string" key="editor_client_title"></span></h4></td><td>
                    </div>

                    <div class="modal-body">
                        <div class="clients">
                            
                            <!-- MacOS instructions -->
                            <div class="client-instructions MacOS">
                                <h4><span class="keyed-lang-string" key="client_macOS_run_title"></span></h4>
                                <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                                    <div id="mac1">
                                        <p><span class="keyed-lang-string" key="client_macOS_run_instructions1"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/mac_os1.png"/></div>
                                    </div>
                                    <div id="mac2" class="hidden">
                                        <p><span class="keyed-lang-string" key="client_macOS_run_instructions2"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/mac_os2.png"/></div>
                                    </div>
                                    <div id="mac3" class="hidden">
                                        <p><span class="keyed-lang-string" key="client_macOS_run_instructions3"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/mac_os3.png"/></div>
                                    </div>
                                    <div id="mac4" class="hidden">
                                        <p><span class="keyed-lang-string" key="client_run_instructions2"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/usbok.png"/></div>
                                    </div>
                                </div>
                                <div style="padding-top:10px;">
                                    <button id="mac1-btn" class="btn btn-sm btn-primary" onclick="showStep('mac', 1, 4);"><span class="keyed-lang-string" key="client_run_step1"></span></button>
                                    <button id="mac2-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 2, 4);"><span class="keyed-lang-string" key="client_run_step2"></span></button>
                                    <button id="mac3-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 3, 4);"><span class="keyed-lang-string" key="client_run_step3"></span></button>
                                    <button id="mac4-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 4, 4);"><span class="keyed-lang-string" key="client_run_step4"></span></button>
                                </div>
                            </div>

                            <!-- Windows instructions -->
                            <div class="client-instructions Windows">
                                <h4><span class="keyed-lang-string" key="client_windows_run_title"></span></h4>
                                <div style="background:#f5f5f5; border-radius:6px; height:250px; padding:6px;">
                                    <div id="win1">
                                        <p><span class="keyed-lang-string" key="client_windows_run_instructions1"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/windows1.png"/></div>
                                    </div>
                                    <div id="win2" class="hidden">
                                        <p><span class="keyed-lang-string" key="client_windows_run_instructions2"></span></p>
                                        <p><span class="keyed-lang-string" key="client_windows_run_instructions3"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/windows2.png"/></div>
                                    </div>
                                    <div id="win3" class="hidden">
                                        <p><span class="keyed-lang-string" key="client_run_instructions2"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/usbok.png"/></div>
                                    </div>
                                </div>
                                <div style="padding-top:10px;">
                                    <button id="win1-btn" class="btn btn-sm btn-primary" onclick="showStep('win', 1, 3);"><span class="keyed-lang-string" key="client_run_step1"></span></button>
                                    <button id="win2-btn" class="btn btn-sm btn-default" onclick="showStep('win', 2, 3);"><span class="keyed-lang-string" key="client_run_step2"></span></button>
                                    <button id="win3-btn" class="btn btn-sm btn-default" onclick="showStep('win', 3, 3);"><span class="keyed-lang-string" key="client_run_step3"></span></button>
                                </div>
                            </div>

                            <!-- Chrome OS instructions -->
                            <div class="client-instructions ChromeOS">
                                <h4><span class="keyed-lang-string" key="client_windows_run_title"></span></h4>
                                <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                                    <div id="chr1">
                                        <p><span class="keyed-lang-string" key="client_chrome_run_instructions1"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/chrome1.png"/></div>
                                    </div>
                                    <div id="chr2" class="hidden">
                                        <p><span class="keyed-lang-string" key="client_chrome_run_instructions2"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/chrome2.png"/></div>
                                    </div>
                                    <div id="chr3" class="hidden">
                                        <p><span class="keyed-lang-string" key="client_run_instructions2"></span></p>
                                        <div align="center"><img src="" data-src="images/client-run/usbok.png"/></div>
                                    </div>
                                </div>
                                <div style="padding-top:10px;">
                                    <button id="chr1-btn" class="btn btn-sm btn-primary" onclick="showStep('chr', 1, 3);"><span class="keyed-lang-string" key="client_run_step1"></span></button>
                                    <button id="chr2-btn" class="btn btn-sm btn-default" onclick="showStep('chr', 2, 3);"><span class="keyed-lang-string" key="client_run_step2"></span></button>
                                    <button id="chr3-btn" class="btn btn-sm btn-default" onclick="showStep('chr', 3, 3);"><span class="keyed-lang-string" key="client_run_step3"></span></button>
                                </div>
                            </div>
                            <hr />
                            
                            <!-- THESE ARE ALSO COPIED BELOW - CHANGES HERE NEED TO BE MIRRORED BELOW -->
                            <!-- MacOS client -->
                            <div class="client-instructions MacOS">
                                <h4><span class="keyed-lang-string" key="clientdownload_download_installer"></span></h4>
                            </div>
                            <div class="client MacOS">
                                <img src="" data-src="images/os-icons/mac_os.png"/>
                                <a href="#" class="client-mac-link">
                                    <span class="keyed-lang-string" key="clientdownload_client_macos_installer"></span></a>
                            </div>

                            <!-- Windows clients -->
                            <div class="client-instructions Windows">
                                <h4><span class="keyed-lang-string" key="clientdownload_download_installer"></span></h4>
                            </div>
                            <div class="client Windows">
                                <img src="" data-src="images/os-icons/windows.png"/>
                                <a href="#" class="client-win32-link">
                                    <span class="keyed-lang-string" key="clientdownload_client_windows32_installer"></span></a>
                            </div>
                            <div class="client Windows">
                                <img src="" data-src="images/os-icons/windows.png"/>
                                <a href="#" class="client-win64-link">
                                    <span class="keyed-lang-string" key="clientdownload_client_windows64_installer"></span></a>
                            </div>

                            <!-- ChromeOS client -->
                            <div class="client-instructions ChromeOS">
                                <h4><span class="keyed-lang-string" key="clientdownload_download_launcher"></span></h4>
                            </div>
                            <div class="client ChromeOS">
                                <img src="" data-src="images/os-icons/chrome_os.png"/>
                                <a href="https://chrome.google.com/webstore/detail/iddpgcclgepllhnhlkkinbmmafpbnddb" target="_blank">
                                    <span class="keyed-lang-string" key="clientdownload_client_chromeos_installer"></span></a>
                            </div>
                        </div>
                        <hr />
                        <div class="dropup">
                            <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                <span class="keyed-lang-string" key="clientdownload_os_menu"></span>
                                <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#" onmouseup="showOS('Windows');">Windows</a></li>
                                <li><a href="#" onmouseup="showOS('MacOS');">Mac OS</a></li>
                                <li><a href="#" onmouseup="showOS('ChromeOS');">Chrome OS</a></li>
                                <!-- <li><a href="#" onmouseup="showOS('Linux');">Linux</a></li> -->
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
                        <h4 class="modal-title"><span class="keyed-lang-string" key="editor_client_title"></span></h4></td><td>
                    </div>

                    <div class="modal-body">
                        <!-- BPC/BPL version warning -->
                        <div id="client-warning-span" class="alert alert-warning bpc-version hidden">
                            <svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7,8 L8,8 8,11 8,11 7,11 Z" style="stroke-width:1px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="7.5" r="6" style="stroke-width:1.3px;stroke:#8a6d3b;fill:none;"/><circle cx="7.5" cy="5" r="1.25" style="stroke-width:0;fill:#8a6d3b;"/></svg>
                            <span class="keyed-lang-string" key="client_update_warning"></span>
                        </div>
                        <div id="client-unknown-span" class="alert alert-danger bpc-version hidden">
                            <svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1,12 L2,13 13,13 14,12 8,2 7,2 1,12 Z M7.25,6 L7.75,6 7.5,9 Z" style="stroke-width:1.5px;stroke:#a94442;fill:none;"/><circle cx="7.5" cy="10.75" r="1" style="stroke-width:0;fill:#a94442;"/><circle cx="7.5" cy="5.5" r="1" style="stroke-width:0;fill:#a94442;"/></svg>
                            <span class="keyed-lang-string" key="client_unknown"></span>
                        </div>
                        <div id="client-danger-span" class="alert alert-danger bpc-version hidden">
                            <svg preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1,12 L2,13 13,13 14,12 8,2 7,2 1,12 Z M7.25,6 L7.75,6 7.5,9 Z" style="stroke-width:1.5px;stroke:#a94442;fill:none;"/><circle cx="7.5" cy="10.75" r="1" style="stroke-width:0;fill:#a94442;"/><circle cx="7.5" cy="5.5" r="1" style="stroke-width:0;fill:#a94442;"/></svg>
                            <span class="keyed-lang-string" key="client_update_danger"></span>
                        </div>
                        <hr />
                        <!-- THESE ARE ALSO COPIED BELOW - CHANGES HERE NEED TO BE MIRRORED BELOW -->
                        <!-- MacOS client -->
                        <div class="clients">
                            <div class="client-instructions MacOS">
                                <h4><span class="keyed-lang-string" key="clientdownload_download_installer"></span></h4>
                            </div>
                            <div class="client MacOS">
                                <img src="" data-src="images/os-icons/mac_os.png"/>
                                <a href="#" class="client-mac-link">
                                    <span class="keyed-lang-string" key="clientdownload_client_macos_installer"></span></a>
                            </div>

                            <!-- Windows clients -->
                            <div class="client-instructions Windows">
                                <h4><span class="keyed-lang-string" key="clientdownload_download_installer"></span></h4>
                            </div>
                            <div class="client Windows">
                                <img src="" data-src="images/os-icons/windows.png"/>
                                <a href="#" class="client-win32-link">
                                    <span class="keyed-lang-string" key="clientdownload_client_windows32_installer"></span></a>
                            </div>
                            <div class="client Windows">
                                <img src="" data-src="images/os-icons/windows.png"/>
                                <a href="#" class="client-win64-link">
                                    <span class="keyed-lang-string" key="clientdownload_client_windows64_installer"></span></a>
                            </div>

                            <!-- ChromeOS client -->
                            <div class="client-instructions ChromeOS">
                                <h4><span class="keyed-lang-string" key="clientdownload_download_launcher"></span></h4>
                            </div>
                            <div class="client ChromeOS">
                                <img src="" data-src="images/os-icons/chrome_os.png"/>
                                <a href="https://chrome.google.com/webstore/detail/iddpgcclgepllhnhlkkinbmmafpbnddb" target="_blank">
                                    <span class="keyed-lang-string" key="clientdownload_client_chromeos_installer"></span></a>
                            </div>
                        </div>

                        <hr />
                        <div class="dropup">
                            <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                                <span class="keyed-lang-string" key="clientdownload_os_menu"></span>
                                <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#" onmouseup="showOS('Windows');">Windows</a></li>
                                <li><a href="#" onmouseup="showOS('MacOS');">Mac OS</a></li>
                                <li><a href="#" onmouseup="showOS('ChromeOS');">Chrome OS</a></li>
                                <!-- <li><a href="#" onmouseup="showOS('Linux');">Linux</a></li> -->
                            </ul>
                        </div>                        
                    </div> 
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string" key="editor_button_close"></span></button>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <audio id="term-beep" src="data:audio/wav;base64,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" autostart="false"></audio>
    </body>
</html>
