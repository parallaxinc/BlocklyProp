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
            <form action="<c:url value="/rest/project"/>" method="post">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" name="name" id="project-form-name" required="required"/>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="project-form-description" rows="8" required="required"></textarea>
                </div>
                <div>
                    <div class="btn-group">
                        <c:if test="${param.shared}">
                            <shiro:notAuthenticated>
                                <a class="btn btn-default open-project-link editor-view-link" href="#" >Open project</a>
                            </shiro:notAuthenticated>
                            <shiro:authenticated>
                                <a class="btn btn-default open-project-link editor-view-link" href="#" >Edit</a>
                                <a class="btn btn-danger" href="<c:url value="/rest/project/delete/"/>" >Delete</a>
                            </shiro:authenticated>
                        </c:if>
                        <c:if test="${param.mine}">
                            <button class="btn btn-primary" >Save</button>
                            <a class="btn btn-default open-project-link editor-view-link" href="#" >Edit</a>
                            <a class="btn btn-danger" href="<c:url value="/rest/project/delete/"/>" >Delete</a>
                        </c:if>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    var shared = <c:out value="${param.shared}" />;
</script>