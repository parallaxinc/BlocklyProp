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
            <h2><a href="#" class="btn btn-default"><fmt:message key="back" /></a> <a href="<url:getUrl url="/index.jsp"/>">BlocklyProp</a>: <fmt:message key="project.details_title" /></h2>
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
                <div class="form-group">
                    <label for="description"><fmt:message key="project.description" /></label>
                    <textarea class="form-control" name="description" id="project-form-description" rows="8" required="required"></textarea>
                </div>

                <div class="form-group">
                    <label for="sharing"><fmt:message key="project.sharing" /></label><br/>
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-default">
                            <input type="radio" name="sharing" value="private" id="project-form-private"/><fmt:message key="project.sharing.private" />
                        </label>
                        <label class="btn btn-default">
                            <input type="radio" name="sharing" value="shared" id="project-form-shared"/><fmt:message key="project.sharing.shared" />
                        </label>
                        <label class="btn btn-default">
                            <input type="radio" name="sharing" value="friends" id="project-form-friends"/><fmt:message key="project.sharing.friends" />
                        </label>
                    </div>
                </div>

                <div>
                    <shiro:notAuthenticated>
                        <a class="btn btn-default open-project-link editor-view-link" href="#" ><fmt:message key="project.openlink" /></a>
                    </shiro:notAuthenticated>

                    <shiro:authenticated>
                        <a class="btn btn-default open-project-link editor-view-link" href="#" ><fmt:message key="project.openlink" /></a>
                        <div class="btn-group not-your-project hidden">
                            <a class="btn btn-default clone-project" data-href="<url:getUrl url="/project?clone="/>" ><fmt:message key="project.clonelink" /></a>
                        </div>
                        <div class="btn-group your-project hidden">
                            <button class="btn btn-primary" ><fmt:message key="project.savelink" /></button>
                            <a class="btn btn-danger delete-project" data-href="<url:getUrl url="/project?delete="/>" ><fmt:message key="project.deletelink" /></a>
                            <a class="btn btn-default clone-project" data-href="<url:getUrl url="/project?clone="/>" ><fmt:message key="project.clonelink" /></a>
                        </div>
                    </shiro:authenticated>
                </div>

            </form>
        </div>
    </div>
</div>

<script>
    var shared = <c:out value="${param.shared}" />;
</script>
