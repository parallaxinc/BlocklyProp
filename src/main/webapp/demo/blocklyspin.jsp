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
        <meta name="base" content="<url:getUrl url="/"/>">
        <title>BlocklyProp</title>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/ace/ace.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/utils.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/demoeditor.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blocklyspin.js"/>"></script>
        <link href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<url:getCdnUrl url="/style-editor.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <table id="content_table">
            <tr>
                <td>
                    <jsp:include page="/WEB-INF/includes/pageparts/editor-menu.jsp">
                        <jsp:param name="editor_lang" value="spin" />
                        <jsp:param name="demo" value="true" />
                    </jsp:include>
                </td>
            </tr>
            <tr>
                <td id="content">
                    <div id="content_blocks">
                        <iframe name="content_blocks" src="<url:getUrl url="/frame/framespin.jsp"/>"></iframe>
                    </div>
                    <div id="content_spin">
                        <textarea id="textarea_spin" readonly></textarea>
                    </div>
                    <div id="content_xml">
                        <div id="code-xml"></div>
                    </div>
                </td>
            </tr>
        </table>

        <script type="text/javascript" src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/bootstrap/plugins/bootbox.min.js"/>"></script>
        <script>
            var type = 'SPIN';
        </script>

        <%@ include file="/WEB-INF/includes/pageparts/demo-editor.jsp"%>
    </body>
</html>
