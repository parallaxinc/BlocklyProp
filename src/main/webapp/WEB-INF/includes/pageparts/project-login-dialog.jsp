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
                    <h4 class="modal-title">You are not logged in</h4>
                </div>
                <div class="modal-body"  style="height: 200px;">
                    <div class="col-md-6">
                        <h2>Try</h2>
                        <p>Compiling and saving will be disabled</p>
                        <a class="editor-demo-link try-view-editor" href="/">Try editor</a>
                    </div>
                    <div class="col-md-6">
                        <h2>Log in</h2>
                        <a class="editor-continue-link" href="<c:url value="/login.jsp"/>">Login</a>
                        <a href="<c:url value="register"/>" >Register</a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


    <script>
        $("a.editor-new-link").click(function(event) {
            event.preventDefault();
            setEditorLinksAndShow.call(this, "Try editor");
        });

        $("a.editor-view-link").click(function(event) {
            event.preventDefault();
            setEditorLinksAndShow.call(this, "View project");
        });

        function setEditorLinksAndShow(linkText) {
            $(".try-view-editor").text(linkText);
            $("a.editor-continue-link").attr("href", $(this).attr("href"));
            $("a.editor-demo-link").attr("href", $(this).attr("href").replace('editor', 'demo'));
            $("#project-loggedin-dialog").modal('show');
        }
    </script>
</shiro:notAuthenticated>