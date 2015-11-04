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
        <script src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <link href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<c:url value="/cdn/lib/bootstrap/plugins/gsdk-base.css"/>" rel="stylesheet">
        <link href="<c:url value="/cdn/style.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>

        <div id="project">
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
                                        <!--   <li><a href="#description" data-toggle="tab">Description</a></li>-->
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane" id="project-manager-base">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <h4 class="info-text">Basic project info</h4>
                                                </div>
                                                <div class="col-sm-5 col-sm-offset-1">
                                                    <div class="form-group">
                                                        <label for="project-name">Project name</label>
                                                        <input type="text" class="form-control" id="project-name" name="project-name"/>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5">
                                                    <div class="form-group">
                                                        <label>Board Type</label>
                                                        <select class="form-control" id="board-type" name="board-type">
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
                                                    <textarea class="form-control" id="project-description" rows="7" name="project-description"></textarea>
                                                </div>
                                                <input type="hidden" id="project-type" name="project-type"/>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="project-manager-sharing">
                                            <h4 class="info-text">Project sharing</h4>
                                            <div class="row">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="wizard-footer">
                                        <div class="pull-right">
                                            <input type='button' class='btn btn-next btn-fill btn-info btn-wd btn-sm' name='next' value='Next' />
                                            <input type='button' id='finish' class='btn btn-finish btn-fill btn-info btn-wd btn-sm' name='finish' value='Finish' data-editor='<c:url value="/editor/"/>' />

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

        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/jquery.bootstrap.wizard.js"/>"></script>
        <script src="<c:url value="/cdn/lib/jquery.validate.min.js"/>"></script>
        <script src="<c:url value="/cdn/utils.js"/>"></script>
        <script src="<c:url value="/cdn/projectcreation.js"/>"></script>
    </body>
</html>
