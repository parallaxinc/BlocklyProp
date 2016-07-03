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
                <div class="modal-body"  style="height: 320px;">
                    <div class="col-md-6">
                        <h2><fmt:message key="not_loggedin.try.title" /></h2>
                        <p><fmt:message key="not_loggedin.try" /></p>
                        <a class="editor-demo-link try-view-editor" href="/"><fmt:message key="not_loggedin.try.trylink" /></a>
                    </div>
                    <div class="col-md-6">
                        <h2><fmt:message key="not_loggedin.login.title" /></h2>

                        <%@ include file="/WEB-INF/includes/pageparts/loginform.jsp"%>

                        <c:if test="${properties:oauth('google')}">
                            <a href="<url:getUrl url="/oauth/google" />?url=" target="oauth" class="oauth" id="oauth-google">Log in using Google</a>
                        </c:if>
                        <a href="<url:getUrl url="/register"/>" ><fmt:message key="not_loggedin.login.registerlink" /></a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><fmt:message key="cancel" /></button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


    <script>
        var oauthUrls = {};
        var baseUrl = '<url:getUrl url="/" />';

        $(document).ready(function () {
            $(".oauth").each(function () {
                oauthUrls[$(this).attr('id')] = $(this).attr("href");
            });
        });

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
            var link = $(this).attr("href");
            //window['post-authenticate'] = function () {
            //    location.href = link;
            //};
            $(".oauth").each(function () {
                $(this).attr("href", oauthUrls[$(this).attr('id')] + encodeURI(baseUrl + link));
            });
            if ($(this).data("href")) {
                $("a.editor-demo-link").attr("href", $(this).data("href").replace('editor', 'demo'));
            } else {
                $("a.editor-demo-link").attr("href", $(this).attr("href").replace('editor', 'demo'));
            }
            $("#project-loggedin-dialog").modal('show');
        }
    </script>
</shiro:notAuthenticated>