<%--
    Document   : projectform
    Created on : 25-jul-2015, 18:37:17
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<div id="project-form-container"  class="container collapse">
    <div class="row">
        <div class="col-md-12">
            <h2>
                <a href="#" class="btn btn-default"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <fmt:message key="back" /></a>
                <fmt:message key="project.details_title" />
                <a class="btn btn-primary open-project-link editor-view-link" href="#" ><fmt:message key="project.viewcode" /></a>
            </h2>
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
                    <label for="board"><fmt:message key="project.board" /></label>
                    <input type="text" class="form-control" name="board" id="project-form-board" readonly="readonly"/>
                </div>
                <div class="form-group">
                    <label for="description"><fmt:message key="project.description" /></label>
                    <div class="your-project hidden">
                        <textarea class="form-control" name="description" id="project-form-description"></textarea>
                    </div>
                    <input type="hidden" name="description-html" id="project-form-description-html" />
                    <div id="project-description-html" class="not-your-project hidden description-html"></div>
                </div>

                <div class="form-group">
                    <label for="sharing"><fmt:message key="project.sharing" /></label><br/>
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-default">
                            <input type="radio" name="sharing" class="sharing" value="private" id="project-form-private"/><fmt:message key="project.sharing.private" />
                        </label>
                        <label class="btn btn-default">
                            <input type="radio" name="sharing" class="sharing" value="shared" id="project-form-shared"/><fmt:message key="project.sharing.shared" />
                        </label>
                        <label class="btn btn-default">
                            <input type="radio" name="sharing" class="sharing" value="friends" id="project-form-friends"/><fmt:message key="project.sharing.friends" />
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
                    <p><fmt:message key="project.delete.confirm" /></p>
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
        "other": "<fmt:message key="project.board.other" />"
    };
</script>
