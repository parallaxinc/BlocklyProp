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
