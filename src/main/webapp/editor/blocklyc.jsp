<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html><!-- manifest=node.manifest> -->
    <head>
        <meta name="application-name" content="&nbsp;"/>
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
        <meta charset="utf-8">
        <meta name="base" content="<url:getUrl url="/"/>">
        <title>BlocklyProp</title>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/xterm.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/beautify.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/ace/ace.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/detect.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blocklypropclient.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blocklyc.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/utils.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/editor.js"/>"></script>
        <link href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<url:getCdnUrl url="/style-editor.css"/>" rel="stylesheet" type="text/css" />
        <link href="<url:getCdnUrl url="/style-clientdownload.css"/>" rel="stylesheet" type="text/css" />
        <link href="<url:getCdnUrl url="/lib/xterm.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <div id="editor">
            <table id="content_table">
                <tr>
                    <td>
                        <jsp:include page="/WEB-INF/includes/pageparts/editor-menu.jsp">
                            <jsp:param name="editor_lang" value="c" />
                            <jsp:param name="demo" value="false" />
                        </jsp:include>
                    </td>
                </tr>
                <tr>
                    <td id="content">
                        <div id="content_blocks">
                            <iframe name="content_blocks" src="<url:getUrl url="/frame/framec.jsp"/>"></iframe>
                        </div>
                        <div id="content_propc">
                            <div id="code-propc"></div>
                        </div>
                        <div id="content_xml">
                            <div id="code-xml"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

                        
        <div class="modal fade" id="upload-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="compile-dialog-title"><fmt:message key="editor.upload" /></h4>
                    </div>
                    <div class="modal-body">
                        
                        <label class="control-label"><fmt:message key="editor.upload.selectfile" /></label>
                        <input id="selectfile" type="file" onchange="uploadHandler(this.files);">
                        <div id="selectfile-verify-valid" style="visibility: hidden;"><font color="green" size="+2">&#10003;</font> <fmt:message key="editor.upload.valid" /></div>
                        <div id="selectfile-verify-notvalid" style="visibility: hidden;"><font color="red" size="+2">&#10060;</font> <fmt:message key="editor.upload.notvalid" /></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" disabled="true" id="selectfile-replace" onclick="replaceCode();"><fmt:message key="editor.button.replace" /></button>
                        <button type="button" class="btn btn-primary" disabled="true" id="selectfile-append" onclick="appendCode();"><fmt:message key="editor.button.append" /></button>
                        <button type="button" class="btn btn-default" data-dismiss="modal"><fmt:message key="editor.button.cancel" /></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


        <div class="modal fade" id="compile-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="compile-dialog-title">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <label for="compile-console"><fmt:message key="editor.title.result" /></label>
                        <textarea class="form-control" rows="15" id="compile-console"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><fmt:message key="editor.button.close" /></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="console-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="console-dialog-title"><fmt:message key="editor.title.terminal" /></h4>
                    </div>
                    <div class="modal-body" style="height: 430px;">
                        <div id="serial_console" class="console"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><fmt:message key="editor.button.close" /></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <%@ include file="/WEB-INF/includes/pageparts/clientdownload.jsp"%>

        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script>
            var type = 'PROPC';
        </script>
    </body>
</html>
