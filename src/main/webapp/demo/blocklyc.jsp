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
                    <nav class="navbar navbar-default" role="navigation">
                        <div class="containter-fluid">
                            <div class="navbar-header">
                                <a class="navbar-brand" href="<c:url value="/index.jsp"/>">BlocklyProp</a>
                            </div>
                            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul class="nav navbar-nav">
                                    <!--  <li><a href="help/index.html">Manual</a></li> -->
                                    <li class="dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="editor.newproject.title" /><b class="caret"></b></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="<c:url value="/editor/blocklyspin.jsp"/>"><fmt:message key="editor.newproject.spin" /></a></li>
                                            <li><a href="<c:url value="/editor/blocklyc.jsp"/>"><fmt:message key="editor.newproject.c" /></a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="editor.projects.title" /> <b class="caret"></b></a>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a href="<c:url value="/projects.jsp"/>"><fmt:message key="editor.projects.community" /></a></li>
                                            <li><a href="<c:url value="/my/projects.jsp"/>"><fmt:message key="editor.projects.mine" /></a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><fmt:message key="editor.view.title" /> <b class="caret"></b></a>
                                        <ul class="dropdown-menu">
                                            <li class="active" id="tab_blocks"><a href="#" onclick="tabClick('tab_blocks')"><fmt:message key="editor.view.blocks" /></a></li>
                                            <li id="tab_propc"><a href="#" onclick="tabClick('tab_propc')"><fmt:message key="editor.view.c" /></a></li>
                                            <li id="tab_xml"><a href="#" onclick="tabClick('tab_xml')"><fmt:message key="editor.view.xml" /></a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul class="nav navbar-nav navbar-right">
                                    <li class="dropdown">
                                        <a href="#" class="dropdown-toggle demo-function" ><fmt:message key="editor.run.title" /> <b class="caret"></b></a>
                                    </li>
                                    <li><a href="#" class="demo-function"><fmt:message key="editor.project" /></a></li>
                                    <li><a href="#" class="demo-function"><fmt:message key="editor.save" /></a></li>
                                </ul>
                            </div><!-- /.navbar-collapse -->
                        </div><!-- /.container-fluid -->
                    </nav>
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
