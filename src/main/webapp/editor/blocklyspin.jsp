<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta charset="utf-8">
        <title>BlocklyProp</title>
        <script type="text/javascript" src="<c:url value="/cdn/lib/Blob.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/lib/term.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/lib/FileSaver.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/blockly_helper.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/blocklyspin.js"/>"></script>
        <link href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<c:url value="/cdn/style.css"/>" rel="stylesheet" />
    </head>
    <body>
        <table height="100%" width="100%">
            <tr>
                <td>
                    <h1><a href="https://github.com/michel-cf/BlocklyProp">BlocklyProp</a> &gt; web-based visual programming editor for spin</h1>
                </td>
            </tr>
            <tr>
                <td>
                    <table>
                        <tr id="tabRow" height="1em">
                            <td id="tab_blocks" class="tabon" onclick="tabClick(this.id)">Blocks</td>
                            <td class="tabmin">&nbsp;</td>
                            <!--td id="tab_javascript" class="taboff" onclick="tabClick(this.id)">JavaScript</td>
                            <td class="tabmin">&nbsp;</td-->
                            <!--td id="tab_dart" class="taboff" onclick="tabClick(this.id)">Dart</td>
                            <td class="tabmin">&nbsp;</td>
                            <td id="tab_python" class="taboff" onclick="tabClick(this.id)">Python</td>
                            <td class="tabmin">&nbsp;</td-->
                            <td id="tab_spin" class="taboff" onclick="tabClick(this.id)">Spin</td>
                            <td class="tabmin">&nbsp;</td>
                            <td id="tab_xml" class="taboff" onclick="tabClick(this.id)">XML</td>
                            <td class="tabmax">
                                <button onclick="compile()">Compile</button>
                                <button onclick="loadIntoRam()">Load into Ram</button>
                                <button onclick="loadIntoEeprom()">Load into Eeprom</button>
                                <button onclick="serial_console()">Serial console</button>
                                <button onclick="discard()">Discard</button>
                                <button onclick="save()">Save XML</button>
                                <button id="fakeload">Load XML</button>
                                <input type="file" id="load" style="display: none;"/>
                                <select id="comPort"></select>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td height="99%">
                    <div id="content_blocks" style='height:99%;'>
                        <iframe name="content_blocks" src="frame.html"></iframe>
                    </div>
                    <!--div id="content_blocks" style="height:auto !important;height:400px; min-height:400px;"></div-->
                    <!--pre id="content_javascript"></pre>
                    <pre id="content_dart"></pre-->
                    <div id="content_spin">
                        <textarea id="textarea_spin" readonly></textarea>
                    </div>
                    <!--pre id="content_python"></pre-->
                    <div id="content_xml">
                        <textarea id="textarea_xml" readonly></textarea>
                    </div>
                </td>
            </tr>
        </table>

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
                        <h4 class="modal-title" id="compile-dialog-title">Console</h4>
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

        <div class="modal fade" data-keyboard="false" data-backdrop="static" id="setup-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="compile-dialog-title">Project setup</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="board-type">Board type</label>
                            <select class="form-control" id="board-type">
                                <option value="activity-board">Activity board</option>
                                <option value="board-of-education">Board of Education</option>
                                <option value="c3">Propeller C3</option>
                                <option value="demo-board">Demo board</option>
                                <option value="proto-board">Proto board</option>
                                <option value="quickstart">Quickstart</option>
                                <option value="scribbler2">Scribbler 2</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="block-types">Block types</label>
                            <select class="form-control" multiple="multiple" id="block-types">
                                <option value="serial">Serial</option>
                                <option value="serial-terminal">Serial terminal</option>
                                <option value="c3">Debug LCD</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Start</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <script src="lib/js/bootstrap.min.js"></script>
    </body>
</html>
