<%--
    Document   : projects
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>
<%--
<%@ include file="my/projects.jsp"%>
--%>
<c:set var="copparestricted" scope="page" value="${properties:copparestricted()}" />
<c:set var="experimental" scope="page" value="${properties:experimentalmenu(false)}" />

<!DOCTYPE html>
<html>
    <head>
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
        <meta name="base" content="<url:getUrl url="/"/>">
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/simplemde.min.css"/>">
        <link rel="stylesheet" href="<url:getCdnUrl url="/style.css"/>" />
        <script src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/jquery.form.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/simplemde.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/project.js"/>" ></script>
        <script src="<url:getCdnUrl url="/authenticate.js"/>" ></script>
        
        <script>
            // http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            }
            
            var boards = {
                "activity-board": "<fmt:message key="project.board.activity-board" />",
                "s3": "<fmt:message key="project.board.s3" />",
                "heb": "<fmt:message key="project.board.heb" />",
                "flip": "<fmt:message key="project.board.flip" />",
                "other": "<fmt:message key="project.board.other" />",
                "propcfile": "<fmt:message key="project.board.propcfile" />"
            };
            
            var languageUrls = {
                "PROPC": "<url:getCdnUrl url="/images/lang-icons/c.png" />",
                "SPIN": "<url:getCdnUrl url="/images/lang-icons/spin.png" />"
            };

            var boardIconUrls = {
                "activity-board": "<url:getCdnUrl url="/images/board-icons/IconActivityBoard.png" />",
                "s3": "<url:getCdnUrl url="/images/board-icons/IconS3.png" />",
                "heb": "<url:getCdnUrl url="/images/board-icons/IconBadge.png" />",
                "flip": "<url:getCdnUrl url="/images/board-icons/IconFlip.png" />",
                "other": "<url:getCdnUrl url="/images/board-icons/IconOtherBoards.png" />",
                "propcfile": "<url:getCdnUrl url="/images/board-icons/IconC.png" />"
            };

            function formatType(value, row) {
                return '<img src="' + boardIconUrls[value] + '" />';
            }

            function formatProject(value, row) {
                return "<a href='#" + row['id'] + "'>" + value + "</a>";
            }

            function formatUser(value, row) {
                return "<a role='button' onclick='showByUser(" + row['id-user'] + ", \"" + value + "\");'>" + value + "</a>";
            }

            function formatBoard(value, row) {
                var boardTranslation = boards[value];
                if (!boardTranslation) {
                    boardTranslation = boards['other'];
                }
                return boardTranslation;
            }

            function formatDescription(value, row) {
                if (value) {
                    if (value.length > 30) {
                        return value.substring(0, 27) + '&hellip;';
                    }
                }
                return value;
            }
            
            $(document).ready(function () {
                if (window.location.href.indexOf('/projects') > -1 && getURLParameter('user')) {
                    // Get the user name from the project records
                    var uId = getURLParameter('user');
                    var userRestUrl = '<url:getUrl url="/rest/shared/project/list/user"/>/' + uId;
                    $.get(userRestUrl, function (data) {
                        showByUser(uId, data.rows[0].user);                        
                    }).fail(function() {
                        // TODO: add info to a div that's more informative to the user
                        console.log('User ' + uId + ' not found, loading community projects.');
                        setupTable(false);
                    });

                // TODO: set to "/my-projects" when this gets incorperated into index.jsp
                } else if (window.location.href.indexOf('/my') === -1) {
                    setupTable(false);
                } else {
                    setupTable(true);
                }
            });
            
            function showByUser(uId, uName) {
                var allProjectsButton = '<a role="button" onclick="setupTable(false);" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Back to all projects</a>';
                $('#project-table').bootstrapTable('hideColumn', 'user');
                $('#project-page-title').html(allProjectsButton + ' Projects by user ' + uName);
                var userRestUrl = '<url:getUrl url="/rest/shared/project/list/user"/>/' + uId;
                $('#project-table').bootstrapTable('refresh', {
                    url: userRestUrl
                });                
            }
            
            function setupTable(showMyProjects) {
                if (!showMyProjects) {
                    tableREST = '<url:getUrl url="/rest/shared/project/list"/>';
                    $('#project-table').bootstrapTable('showColumn', 'user');
                    $('#project-page-title').html('<fmt:message key="project.list.title"/>');
                } else {
                    tableREST = '<url:getUrl url="/rest/project/list"/>';
                    $('#project-table').bootstrapTable('hideColumn', 'user');
                    $('#project-page-title').html('<fmt:message key="my_project.list.title"/>');
                }
                $('#project-table').bootstrapTable('refresh', {
                    url: tableREST
                });                
            }
        </script>
        
    </head>
    <body>
        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>
        <!-- Display community projects -->
        <div id="project-table-container" class="container collapse">
            <div class="row">
                <div class="col-md-12">
                    
                    <h2 id="project-page-title"><fmt:message key="project.list.title"/></h2>
                    
                    <table id="project-table" class="table" data-toggle="table" data-url=""  
                           data-toolbar="#toolbar" data-search="false" data-side-pagination="server" data-pagination="true">
                        <thead>
                            <tr>
                                <th data-field="board" data-sortable="false" data-formatter="formatType" data-width="30px" data-align="center">&nbsp;</th>
                                <th data-field="name" data-sortable="true" data-formatter="formatProject"><fmt:message key="project.table.name" /></th>
                                <th data-field="board" data-sortable="true" data-formatter="formatBoard"><fmt:message key="project.table.board" /></th>
                                <th data-field="description" data-formatter="formatDescription" data-sortable="false"><fmt:message key="project.table.description" /></th>
                                <th data-field="user" data-formatter="formatUser" data-sortable="true"><fmt:message key="project.table.user" /></th>
                            </tr>
                        </thead>
                    </table>
                            
                </div>
            </div>
        </div>
                    
        <!-- Display community shared project form -->
        <div id="project-form-container"  class="container collapse">
            <div class="row">
                <div class="col-md-12">
                    <h2>
                        <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <fmt:message key="back" /></a>
                        <fmt:message key="project.details_title" />
                        <a class="btn btn-primary open-project-link editor-view-link" href="#" ><fmt:message key="project.viewcode" /></a>
                    </h2>
                    <!-- Post the form contents to /blockly/rest/project  -->
                    <form id="project-form" action="<url:getUrl url="/rest/project"/>" method="post">
                        <div class="alert alert-success alert-dismissible hidden project-changed" id="project-changed">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <p><fmt:message key="project.changed" /></p>
                        </div>
                        <input type="hidden" name="id" id="project-form-id"/>
                        <div class="form-group">
                            <label for="name"><fmt:message key="project.name" /></label>
                            <input type="text" class="form-control" name="name" id="project-form-name" required="required"/>
                        </div>
                        <div class="form-group not-your-project hidden">
                            <label for="user"><fmt:message key="project.user" /></label>
                            <input type="text" class="form-control" name="user" id="project-form-user" readonly="readonly"/>
                        </div>
                        <div class="form-group">
                            <table style="width:100%; padding:0;   font-size: 14px;">
                                <tr>
                                    <td style="padding-right:10px;">
                                        <label for="board"><fmt:message key="project.board" /></label>
                                        <input type="text" class="form-control" name="board" id="project-form-board" readonly="readonly"/>
                                    </td>
                                    <td style="padding-right:10px;">
                                        <label for="createdDate"><fmt:message key="project.created" /></label>
                                        <input type="text" class="form-control" name="createdDate" id="project-form-created" readonly="readonly"/>
                                    </td>
                                    <td>
                                        <label for="modifiedDate"><fmt:message key="project.modified" /></label>
                                        <input type="text" class="form-control" name="modifiedDate" id="project-form-modified" readonly="readonly"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="form-group">
                            <label for="description"><fmt:message key="project.description" /></label>
                            <div class="your-project hidden">
                                <textarea class="form-control" name="description" id="project-form-description"></textarea>
                            </div>
                            <input type="hidden" name="description-html" id="project-form-description-html" />
                            <div id="project-description-html" class="not-your-project hidden description-html"></div>
                        </div>

                        <c:if test="${copparestricted == true}">
                            <div class="form-group hidden">
                                <label for="sharing"><fmt:message key="project.sharing" /></label><br/>
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default">
                                        <input type="radio" name="sharing" data-toggle="tooltip" title="<fmt:message key="project.sharing.tooltip.private" />" checked="checked" data-placement="top" class="sharing" value="private" id="project-form-shared"/><fmt:message key="project.sharing.private" />
                                    </label>
                                </div>
                            </div>
                        </c:if>

                        <c:if test="${copparestricted == false}">
                            <div class="form-group">
                                <label for="sharing"><fmt:message key="project.sharing" /></label><br/>
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default">
                                        <input type="radio" name="sharing" data-toggle="tooltip" title="<fmt:message key="project.sharing.tooltip.private" />" data-placement="top" class="sharing" value="private" id="project-form-private"/><fmt:message key="project.sharing.private" />
                                    </label>
                                    <label class="btn btn-default">
                                        <input type="radio" name="sharing" data-toggle="tooltip" title="<fmt:message key="project.sharing.tooltip.shared" />" checked="checked" data-placement="top" class="sharing" value="shared" id="project-form-shared"/><fmt:message key="project.sharing.shared" />
                                    </label>
                                </div>
                            </div>

                            <shiro:authenticated>
                                <div class="form-group your-project hidden">
                                    <label for="share-link"><fmt:message key="project.share-link" /></label>
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <input type="checkbox" id="project-link-share-enable">
                                        </span>
                                        <input type="text" class="form-control"  name="share-link" id="project-link-share" data-href="<url:getUrl url="/projectlink?id="/>" title="Ctrl/&#8984; + c to copy" readonly="readonly"/>
                                    </div><!-- /input-group -->
                                </div>
                            </shiro:authenticated>
                        </c:if>

                        <shiro:authenticated>
                            <div class="modal-footer">
                                <div class="btn-group not-your-project hidden">
                                    <a class="btn btn-default clone-project" data-href="<url:getUrl url="/project?clone="/>" ><fmt:message key="project.clonelink" /></a>
                                </div>
                                <div class="btn-group your-project hidden">
                                    <button class="btn btn-primary" ><fmt:message key="project.savelink" /></button>
                                    <a class="btn btn-danger delete-project" data-href="<url:getUrl url="/project?delete="/>" id="project-delete" ><fmt:message key="project.deletelink" /></a>
                                    <a class="btn btn-default clone-project" data-href="<url:getUrl url="/project?clone="/>" ><fmt:message key="project.clonelink" /></a>
                                </div>
                            </div>
                        </shiro:authenticated>

                    </form>
                </div>
            </div>
        </div>

        <div id="project-delete-confirm" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"><fmt:message key="project.delete.confirm.title" /></h4>
                    </div>
                    <div class="modal-body">
                        <p class="not-shared-project hidden"><fmt:message key="project.delete.confirm" /></p>
                        <p class="shared-project hidden"><fmt:message key="project.delete.confirm.shared" /></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" id="project-delete-confirmed">Delete</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- Login modal dialog -->
        <%@ include file="/WEB-INF/includes/pageparts/project-login-dialog.jsp"%>
        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>
    </body>
</html>
