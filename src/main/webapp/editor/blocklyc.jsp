<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html><!-- manifest=node.manifest> -->
    <head>
        <meta charset="utf-8">
        <meta name="base" content="<c:url value="/"/>">
        <title>BlocklyProp</title>
        <script type="text/javascript" src="<c:url value="/cdn/lib/Blob.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/lib/term.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/lib/FileSaver.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/blockly_helper.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/blocklypropclient.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/blocklyc.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/utils.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/editor.js"/>"></script>
        <link href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<c:url value="/cdn/style-editor.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <div id="editor">
            <table id="content_table">
                <tr>
                    <td>
                        <nav class="navbar navbar-default" role="navigation">
                            <div class="containter-fluid">
                                <div class="navbar-header">
                                    <a class="navbar-brand" href="<c:url value="/index.jsp"/>">BlocklyProp</a>
                                </div>
                                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul class="nav navbar-nav">
                                        <!--  <li><a href="help/index.html">Manual</a></li> -->
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">New project<b class="caret"></b></a>
                                            <ul class="dropdown-menu">
                                                <li><a href="<c:url value="/editor/blocklyspin.jsp"/>">Spin</a></li>
                                                <li><a href="<c:url value="/editor/blocklyc.jsp"/>">Propeller C</a></li>
                                            </ul>
                                        </li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Projects <b class="caret"></b></a>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a href="<c:url value="/projects.jsp"/>">Community projects</a></li>
                                                <li><a href="<c:url value="/my/projects.jsp"/>">My projects</a></li>
                                            </ul>
                                        </li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">View <b class="caret"></b></a>
                                            <ul class="dropdown-menu">
                                                <li class="active" id="tab_blocks"><a href="#" onclick="tabClick('tab_blocks')">Blocks</a></li>
                                                <li id="tab_propc"><a href="#" onclick="tabClick('tab_propc')">Propeller C</a></li>
                                                <li id="tab_xml"><a href="#" onclick="tabClick('tab_xml')">XML</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="nav navbar-nav navbar-right">
                                        <li>
                                            <p class="navbar-text" id="client_status">Checking for BlocklyPropClient</p>
                                        </li>
                                        <li>
                                            <form class="navbar-form">
                                                <div class="form-group">
                                                    <select class="form-control" id="comPort"></select>
                                                </div>
                                            </form>
                                        </li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Run <b class="caret"></b></a>
                                            <ul class="dropdown-menu">
                                                <li><a href="#" onclick="compile()">Compile</a></li>
                                                <li><a href="#" onclick="loadIntoRam()">Load RAM</a></li>
                                                <li><a href="#" onclick="loadIntoEeprom()">Load EEPROM</a></li>
                                                <li class="divider"></li>
                                                <li><a href="#" onclick="serial_console()">Serial terminal</a></li>
                                                <li class="divider"></li>
                                                <li><a href="#" onclick="configure_client()">Configure client</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#" onclick="project()">Project</a></li>
                                        <li><a href="#" id="save-project">Save</a></li>
                                    </ul>
                                </div><!-- /.navbar-collapse -->
                            </div><!-- /.container-fluid -->
                        </nav>
                    </td>
                </tr>
                <tr>
                    <td id="content">
                        <div id="content_blocks">
                            <iframe name="content_blocks" src="<c:url value="/cdn/framec.html"/>"></iframe>
                        </div>
                        <!--div id="content_blocks" style="height:auto !important;height:400px; min-height:400px;"></div-->
                        <!--pre id="content_javascript"></pre>
                        <pre id="content_dart"></pre-->
                        <div id="content_propc">
                            <textarea id="textarea_propc" readonly></textarea>
                        </div>
                        <!--pre id="content_python"></pre-->
                        <div id="content_xml">
                            <textarea id="textarea_xml" readonly></textarea>
                        </div>
                    </td>
                </tr>
            </table>
        </div>



        <div class="modal fade" id="compile-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="compile-dialog-title">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <label for="compile-console">Result</label>
                        <textarea class="form-control" rows="15" id="compile-console"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="console-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="console-dialog-title">Console</h4>
                    </div>
                    <div class="modal-body">
                        <div id="serial_console" class="console"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script>
                                            var type = 'PROPC';
        </script>
    </body>
</html>
