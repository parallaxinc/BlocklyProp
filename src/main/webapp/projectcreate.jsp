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
        <meta name="base" content="<url:getUrl url="/"/>">
        <title>BlocklyProp</title>
        <script src="<url:getUrl url="/cdn/lib/jquery-1.11.3.min.js"/>" ></script>
        <link href="<url:getUrl url="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<url:getUrl url="/cdn/lib/bootstrap/plugins/gsdk-base.css"/>" rel="stylesheet">
        <link href="<url:getUrl url="/cdn/style.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

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
                                            <fmt:message key="project.create.title" />
                                            <!--<small>This information will let us know more about your boat.</small>-->
                                        </h3>
                                    </div>
                                    <ul>
                                        <li><a href="#project-manager-base" data-toggle="tab"><fmt:message key="project.create.basic" /></a></li>
                                        <li><a href="#project-manager-sharing" data-toggle="tab"><fmt:message key="project.create.sharing" /></a></li>
                                        <!--   <li><a href="#description" data-toggle="tab">Description</a></li>-->
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane" id="project-manager-base">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <h4 class="info-text"><fmt:message key="project.create.basic.title" /></h4>
                                                </div>
                                                <div class="col-sm-5 col-sm-offset-1">
                                                    <div class="form-group">
                                                        <label for="project-name"><fmt:message key="project.create.project_name" /></label>
                                                        <input type="text" class="form-control" id="project-name" name="project-name"/>
                                                    </div>
                                                </div>
                                                <div class="col-sm-5">
                                                    <div class="form-group">
                                                        <label for="board-type"><fmt:message key="project.create.board_type" /></label>
                                                        <select class="form-control" id="board-type" name="board-type">
                                                            <option disabled="" selected=""><fmt:message key="project.create.board_type.select" /></option>
                                                            <option value="activity-board"><fmt:message key="project.board.activity-board" /></option>
                                                            <option value="board-of-education"><fmt:message key="project.board.board-of-education" /></option>
                                                            <option value="c3"><fmt:message key="project.board.c3" /></option>
                                                            <option value="demo-board"><fmt:message key="project.board.demo-board" /></option>
                                                            <option value="proto-board"><fmt:message key="project.board.proto-board" /></option>
                                                            <option value="quickstart"><fmt:message key="project.board.quickstart" /></option>
                                                            <option value="scribbler2"><fmt:message key="project.board.scribbler2" /></option>
                                                            <option value="other"><fmt:message key="project.board.other" /></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-sm-10 col-sm-offset-1">
                                                    <label for="project-description"><fmt:message key="project.create.description" /></label>
                                                    <textarea class="form-control" id="project-description" rows="7" name="project-description"></textarea>
                                                </div>
                                                <input type="hidden" id="project-type" name="project-type"/>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="project-manager-sharing">
                                            <h4 class="info-text"><fmt:message key="project.create.sharing.title" /></h4>
                                            <div class="row">
                                                <div class="col-sm-5 col-sm-offset-1">
                                                    <div class="form-group">
                                                        <label for="sharing"><fmt:message key="project.sharing" /></label><br/>
                                                        <div class="btn-group" data-toggle="buttons">
                                                            <label class="btn btn-default">
                                                                <input type="radio" name="sharing" value="private" id="project-form-private"/><fmt:message key="project.sharing.private" />
                                                            </label>
                                                            <label class="btn btn-default">
                                                                <input type="radio" name="sharing" value="shared" id="project-form-shared"/><fmt:message key="project.sharing.shared" />
                                                            </label>
                                                            <label class="btn btn-default active">
                                                                <input type="radio" name="sharing" value="friends" id="project-form-friends" checked="checked"/><fmt:message key="project.sharing.friends" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="wizard-footer">
                                        <div class="pull-right">
                                            <input type='button' class='btn btn-next btn-fill btn-info btn-wd btn-sm' name='next' value='<fmt:message key="project.create.nextlink" />' />
                                            <input type='button' id='finish' class='btn btn-finish btn-fill btn-info btn-wd btn-sm' name='finish' value='<fmt:message key="project.create.finishlink" />' data-editor='<url:getUrl url="/editor/"/>' />

                                        </div>
                                        <div class="pull-left">
                                            <input type='button' class='btn btn-previous btn-fill btn-default btn-wd btn-sm' name='previous' value='<fmt:message key="project.create.previouslink" />' />
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

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

        <script src="<url:getUrl url="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script src="<url:getUrl url="/cdn/lib/bootstrap/plugins/jquery.bootstrap.wizard.js"/>"></script>
        <script src="<url:getUrl url="/cdn/lib/jquery.validate.min.js"/>"></script>
        <script src="<url:getUrl url="/cdn/utils.js"/>"></script>
        <script src="<url:getUrl url="/cdn/lib/sha256.min.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/authenticate.js"/>" ></script>
        <script src="<url:getUrl url="/cdn/projectcreation.js"/>"></script>
    </body>
</html>
