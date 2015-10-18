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
            <h2><a href="#" class="btn btn-default">Back</a> <a href="<c:url value="/index.jsp"/>">BlocklyProp</a>: Project</h2>
            <form id="project-form" action="<c:url value="/rest/project"/>" method="post">
                <input type="hidden" name="id" id="project-form-id"/>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" name="name" id="project-form-name" required="required"/>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="project-form-description" rows="8" required="required"></textarea>
                </div>
                <div class="form-group">
                    <input type="checkbox" name="private" value="true" id="project-form-private"/><label for="name">Private</label>
                </div>
                <div class="form-group">
                    <input type="checkbox" name="shared" value="true" id="project-form-shared"/><label for="description">Shared</label>
                </div>
                <div>
                    <shiro:notAuthenticated>
                        <a class="btn btn-default open-project-link editor-view-link" href="#" >Open project</a>
                    </shiro:notAuthenticated>

                    <shiro:authenticated>
                        <a class="btn btn-default open-project-link editor-view-link" href="#" >Open project</a>
                        <div class="btn-group not-your-project hidden">
                            <a class="btn btn-default clone-project" href="<c:url value="/project?clone="/>" >Clone</a>
                        </div>
                        <div class="btn-group your-project hidden">
                            <button class="btn btn-primary" >Save</button>
                            <a class="btn btn-danger delete-project" href="<c:url value="/project?delete="/>" >Delete</a>
                            <a class="btn btn-default clone-project" href="<c:url value="/project?clone="/>" >Clone</a>
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