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
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" name="name" required="required"/>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" required="required"></textarea>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    var shared = <c:out value="${param.shared}" />;
</script>