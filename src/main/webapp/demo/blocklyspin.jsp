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
        <script type="text/javascript" src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/ace/ace.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/utils.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/demoeditor.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/blocklyspin.js"/>"></script>
        <link href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<c:url value="/cdn/style-editor.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <table id="content_table">
            <tr>
                <td>
                    <jsp:include page="/WEB-INF/includes/pageparts/editor-menu.jsp">
                        <jsp:param name="editor_lang" value="spin" />
                        <jsp:param name="demo" value="true" />
                    </jsp:include>
                </td>
            </tr>
            <tr>
                <td id="content">
                    <div id="content_blocks">
                        <iframe name="content_blocks" src="<c:url value="/frame/framespin.jsp"/>"></iframe>
                    </div>
                    <div id="content_spin">
                        <textarea id="textarea_spin" readonly></textarea>
                    </div>
                    <div id="content_xml">
                        <div id="code-xml"></div>
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

        <div class="wizard" data-keyboard="false" data-backdrop="static" id="project-manager" data-title="Project setup">

            <h1>Project setup</h1>

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

            <div class="wizard-success">
                submission succeeded!
            </div>

            <div class="wizard-error">
                submission had an error
            </div>

            <div class="wizard-failure">
                submission failed
            </div>
        </div>

        <div class="modal fade" id="login-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="login-dialog-title">Sign in / Register</h4>
                    </div>
                    <div class="modal-body">
                        <div id="signin-register" style="height: 380px;">
                            <div class="col-md-6">
                                <form role="form" id="signin-form">
                                    <fieldset>
                                        <legend>Sign in</legend>
                                        <div class="form-group">
                                            <label for="loginEmail">Email</label>
                                            <input type="email" class="form-control" id="loginEmail" name="email" placeholder="Email">
                                        </div>
                                        <div class="form-group">
                                            <label for="loginPassword">Password</label>
                                            <input type="password" class="form-control" id="loginPassword" name="password" placeholder="Password">
                                        </div>
                                        <div id="login-wrong-credentials" class="alert alert-danger hidden">Wrong credentials</div>
                                        <div class="pull-right">
                                            <button type="submit" class="btn btn-default" id="signin">Sign in</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div class="col-md-6">
                                <form  role="form" id="register-form">
                                    <fieldset>
                                        <legend>Register</legend>
                                        <div id="register-group-email" class="form-group has-feedback">
                                            <label class="control-label" for="registerEmail">Email</label>
                                            <input type="email" class="form-control" id="registerEmail" name="email" placeholder="Email">
                                            <span class="glyphicon glyphicon-remove form-control-feedback hidden icon"></span>
                                        </div>
                                        <div id="register-group-screenname" class="form-group has-feedback">
                                            <label class="control-label" for="registerScreenname">Screenname</label>
                                            <input type="text" class="form-control" id="registerScreenname" name="screenname" placeholder="Screenname">
                                            <span class="glyphicon glyphicon-remove form-control-feedback hidden icon"></span>
                                        </div>
                                        <div id="register-group-password" class="form-group has-feedback">
                                            <label class="control-label" for="registerPassword">Password</label>
                                            <input type="password" class="form-control" id="registerPassword" name="password" placeholder="Password">
                                            <span class="glyphicon glyphicon-remove form-control-feedback hidden icon"></span>
                                        </div>
                                        <div id="register-group-passwordConfirm" class="form-group has-feedback">
                                            <label class="control-label" for="registerPasswordConfirm">Confirm password</label>
                                            <input type="password" class="form-control" id="registerPasswordConfirm" name="passwordConfirm" placeholder="Confirm password">
                                            <span class="glyphicon glyphicon-remove form-control-feedback hidden icon"></span>
                                        </div>
                                        <div class="pull-right">
                                            <button type="submit" class="btn btn-default" id="register">Register</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
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
            var type = 'SPIN';
        </script>

        <%@ include file="/WEB-INF/includes/pageparts/demo-editor.jsp"%>
    </body>
</html>
