<%--
    Document   : project-login-dialog
    Created on : 2-aug-2015, 14:45:11
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<shiro:notAuthenticated>
    <div class="modal fade" id="project-loggedin-dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title"><fmt:message key="not_loggedin.title" /></h4>
                </div>
                <div class="modal-body"  style="height: 200px;">
                    <div class="col-md-6">
                        <h2><fmt:message key="not_loggedin.try.title" /></h2>
                        <p><fmt:message key="not_loggedin.try" /></p>
                        <a class="editor-demo-link try-view-editor" href="/"><fmt:message key="not_loggedin.try.trylink" /></a>
                    </div>
                    <div class="col-md-6">
                        <h2><fmt:message key="not_loggedin.login.title" /></h2>
                        <a class="editor-continue-link" href="<c:url value="/login.jsp"/>"><fmt:message key="not_loggedin.login.loginlink" /></a>
                        <a href="<c:url value="register"/>" ><fmt:message key="not_loggedin.login.registerlink" /></a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><fmt:message key="cancel" /></button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


    <script>
        $("body").on("click", "a.editor-new-link", function (event) {
            event.preventDefault();
            setEditorLinksAndShow.call(this, "<fmt:message key="not_loggedin.try.trylink" />");
        });

        $("body").on("click", "a.editor-view-link", function (event) {
            event.preventDefault();
            setEditorLinksAndShow.call(this, "<fmt:message key="not_loggedin.try.viewprojectlink" />");
        });

        function setEditorLinksAndShow(linkText) {
            $(".try-view-editor").text(linkText);
            $("a.editor-continue-link").attr("href", $(this).attr("href"));
            if ($(this).data("href")) {
                $("a.editor-demo-link").attr("href", $(this).data("href").replace('editor', 'demo'));
            } else {
                $("a.editor-demo-link").attr("href", $(this).attr("href").replace('editor', 'demo'));
            }
            $("#project-loggedin-dialog").modal('show');
        }
    </script>
</shiro:notAuthenticated>