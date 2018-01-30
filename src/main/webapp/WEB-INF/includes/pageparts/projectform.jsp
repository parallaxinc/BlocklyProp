<%--
    Document   : projectform
    Created on : 25-jul-2015, 18:37:17
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<c:set var="copparestricted" scope="page" value="${properties:copparestricted()}" />

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
                    <table style="width:100%; padding:0;   font-size: 14px;"><tr>
                            <td style="padding-right:10px;">
                                <label for="board"><fmt:message key="project.board" /></label>
                                <input type="text" class="form-control" name="board" id="project-form-board" readonly="readonly"/>
                            </td><td style="padding-right:10px;">
                                <label for="createdDate"><fmt:message key="project.created" /></label>
                                <input type="text" class="form-control" name="createdDate" id="project-form-created" readonly="readonly"/>
                            </td><td>
                                <label for="modifiedDate"><fmt:message key="project.modified" /></label>
                                <input type="text" class="form-control" name="modifiedDate" id="project-form-modified" readonly="readonly"/>
                            </td>
                        </tr></table>
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

<shiro:authenticated>
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
</shiro:authenticated>

<script>
    var shared = <c:out value="${param.shared}" />;

    var boards = {
        "activity-board": "<fmt:message key="project.board.activity-board" />",
        "s3": "<fmt:message key="project.board.s3" />",
        "heb": "<fmt:message key="project.board.heb" />",
        "heb": "<fmt:message key="project.board.heb-wx" />",
        "flip": "<fmt:message key="project.board.flip" />",
        "other": "<fmt:message key="project.board.other" />",
        "propcfile": "<fmt:message key="project.board.propcfile" />",
    };
</script>
