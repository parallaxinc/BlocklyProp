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
        <link href="<c:url value="/cdn/lib/bootstrap/plugins/gsdk-base.css"/>" rel="stylesheet">
        <link href="<c:url value="/cdn/style-editor.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <div id="project" class="hidden">
            <!--   Big container   -->
            <div class="container">
                <div class="row">
                    <div class="col-sm-8 col-sm-offset-2">

                        <!--      Wizard container        -->
                        <div class="wizard-container">
                            <div class="card wizard-card ct-wizard-azzure" id="wizard">
                                <form action="" method="">
                                    <!--        You can switch "ct-wizard-azzure"  with one of the next bright colors: "ct-wizard-blue", "ct-wizard-green", "ct-wizard-orange", "ct-wizard-red"             -->

                                    <div class="wizard-header">
                                        <h3>
                                            Your project
                                            <!--<small>This information will let us know more about your boat.</small>-->
                                        </h3>
                                    </div>
                                    <ul>
                                        <li><a href="#project-manager-base" data-toggle="tab">Basic info</a></li>
                                        <li><a href="#project-manager-sharing" data-toggle="tab">Sharing</a></li>
                                        <li><a href="#description" data-toggle="tab">Description</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane" id="project-manager-base">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <h4 class="info-text"> Basic project info</h4>
                                                </div>
                                                <div class="col-sm-5 col-sm-offset-1">
                                                    <div class="form-group">
                                                        <label for="project-name">Project name</label>
                                                        <input type="text" class="form-control" id="project-name"/>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5">
                                                    <div class="form-group">
                                                        <label>Board Type</label>
                                                        <select class="form-control" id="board-type">
                                                            <option disabled="" selected="">- board type -</option>
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
                                                </div>
                                                <div class="col-sm-10 col-sm-offset-1">
                                                    <label for="project-description">Description</label>
                                                    <textarea class="form-control" id="project-description" rows="7"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="project-manager-sharing">
                                            <h4 class="info-text">Do you include a captain? </h4>
                                            <div class="row">
                                                <div class="col-sm-10 col-sm-offset-1">
                                                    <div class="col-sm-4 col-sm-offset-2">
                                                        <div class="choice" data-toggle="wizard-radio" rel="tooltip" title="Renters you approve will be able to take this boat">
                                                            <input type="radio" name="job" value="Design">
                                                            <div class="icon">
                                                                <i class="fa fa-life-ring"></i>
                                                            </div>
                                                            <h6>No Captain</h6>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="choice" data-toggle="wizard-radio" rel="tooltip" title="Select this option if you or a certified captain will be included.">
                                                            <input type="radio" name="job" value="Code">
                                                            <div class="icon">
                                                                <i class="fa fa-male"></i>
                                                            </div>
                                                            <h6>Includes Captain</h6>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="description">
                                            <div class="row">
                                                <h4 class="info-text"> Drop us a small description </h4>
                                                <div class="col-sm-6 col-sm-offset-1">
                                                    <div class="form-group">
                                                        <label>Boat description</label>
                                                        <textarea class="form-control" placeholder="" rows="9">

                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label>Example</label>
                                                        <p class="description">"The boat really nice name is recognized as being a really awesome boat. We use it every sunday when we go fishing and we catch a lot. It has some kind of magic shield around it."</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="wizard-footer">
                                        <div class="pull-right">
                                            <input type='button' class='btn btn-next btn-fill btn-info btn-wd btn-sm' name='next' value='Next' />
                                            <input type='button' class='btn btn-finish btn-fill btn-info btn-wd btn-sm' name='finish' value='Finish' />

                                        </div>
                                        <div class="pull-left">
                                            <input type='button' class='btn btn-previous btn-fill btn-default btn-wd btn-sm' name='previous' value='Previous' />
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </form>
                            </div>
                        </div> <!-- wizard container -->
                    </div>
                </div> <!-- row -->
            </div> <!--  big container -->
        </div>
        <div id="editor" class="hidden">
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

        <div class="hidden" data-keyboard="false" data-backdrop="static" id="project-manager" data-title="Project setup">

            <div class="wizard-card" data-cardname="project-manager-base">
                <h3>Basic project info</h3>
                <div class="form-group">
                    <label for="project-name">Project name</label>
                    <input class="form-control" id="project-name"/>

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

                    <label for="project-description">Description</label>
                    <textarea class="form-control" id="project-description" rows="7"></textarea>
                </div>
            </div>
            <div class="wizard-card" data-cardname="project-manager-sharing">
                <h3>Sharing</h3>

            </div>
            <div class="wizard-card" data-cardname="project-manager-modules">
                <h3>Block</h3>
                <div class="form-group">
                    <label for="block-types">Block types</label>
                    <select class="form-control" multiple="multiple" id="block-types">
                        <option value="serial">Serial</option>
                        <option value="serial-terminal">Serial terminal</option>
                        <option value="c3">Debug LCD</option>
                    </select>
                </div>
            </div>
        </div>

        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/jquery.bootstrap.wizard.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/wizard.js"/>"></script>
        <script>
                                            var type = 'PROPC';
        </script>
    </body>
</html>
