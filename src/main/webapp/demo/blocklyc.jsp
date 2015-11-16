<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html><!-- manifest=node.manifest> -->
    <head>
        <meta charset="utf-8">
        <meta name="base" content="<c:url value="/"/>">
        <title>BlocklyProp</title>
        <script type="text/javascript" src="<c:url value="/cdn/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/utils.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/demoeditor.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/cdn/blocklyc.js"/>"></script>
        <link href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<c:url value="/cdn/style-editor.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <table id="content_table">
            <tr>
                <td>
                    <jsp:include page="/WEB-INF/includes/pageparts/editor-menu.jsp">
                        <jsp:param name="editor_lang" value="c" />
                        <jsp:param name="demo" value="true" />
                    </jsp:include>
                </td>
            </tr>
            <tr>
                <td id="content">
                    <div id="content_blocks">
                        <iframe name="content_blocks" src="<c:url value="/cdn/framec.html"/>"></iframe>
                    </div>
                    <div id="content_propc">
                        <textarea id="textarea_propc" readonly></textarea>
                    </div>
                    <div id="content_xml">
                        <textarea id="textarea_xml" readonly></textarea>
                    </div>
                </td>
            </tr>
        </table>

        <script src="<c:url value="/cdn/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<c:url value="/cdn/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script>
            var type = 'PROPC';
        </script>

        <%@ include file="/WEB-INF/includes/pageparts/demo-editor.jsp"%>
    </body>
</html>
