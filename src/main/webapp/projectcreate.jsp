<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<c:set var="experimental" scope="page" value="${properties:experimentalmenu(false)}" />
<c:set var="copparestricted" scope="page" value="${properties:copparestricted()}" />

<html>
    <!-- manifest=node.manifest> -->
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
        <script src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/simplemde.min.js"/>" ></script>
        <link href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" rel="stylesheet">
        <link href="<url:getCdnUrl url="/lib/bootstrap/plugins/gsdk-base.css"/>" rel="stylesheet">
        <link href="<url:getCdnUrl url="/lib/simplemde.min.css"/>" rel="stylesheet">
        <link href="<url:getCdnUrl url="/style.css"/>" rel="stylesheet" type="text/css" />
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div id="project">
            <div class="col-sm-8 col-sm-offset-2">
                <form class="proj">
                    <div class="row">
                        <div class="col-sm-5 col-sm-offset-1">
                            <h3><fmt:message key="project.create.title" /></h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-sm-offset-1">
                            <div class="form-group">
                                <label for="project-name"><fmt:message key="project.create.project_name" /></label>
                                <input type="text" class="form-control" id="project-name" name="project-name"/>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="board-type"><fmt:message key="project.create.board_type" /></label>
                                <select class="form-control" id="board-type" name="board-type">
                                    <c:if test="${param.lang == 'PROPC'}">
                                        <option disabled="" selected=""><fmt:message key="project.create.board_type.select" /></option>
                                        <option value="activity-board"><fmt:message key="project.board.activity-board" /></option>
                                        <option value="s3"><fmt:message key="project.board.s3" /></option>
                                        <option value="flip"><fmt:message key="project.board.flip" /></option>
                                        <option value="heb"><fmt:message key="project.board.heb" /></option>
                                        <option value="other"><fmt:message key="project.board.other" /></option>
                                    </c:if>
                                    <c:if test="${param.lang == 'SPIN'}">
                                        <option value="s3"><fmt:message key="project.board.s3" /></option>
                                    </c:if>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-10 col-sm-offset-1">
                            <label for="project-description"><fmt:message key="project.create.description" /></label>
                            <textarea class="form-control" id="project-description" rows="7" name="project-description"></textarea>
                        </div>
                        <input type="hidden" id="project-type" name="project-type"/>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 col-sm-offset-1">
                            <div class="form-group">
                                <label for="sharing"><fmt:message key="project.sharing" /></label><br/>
                            
                            <c:if test="${copparestricted == true}">
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active">
                                        <input type="radio" name="sharing" value="private" id="project-form-private" checked="checked"/>
                                            <fmt:message key="project.sharing.private" />
                                    </label>
                                </div>
                            </c:if>

                            <c:if test="${copparestricted == false}">
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active">
                                        <input type="radio" name="sharing" value="private" id="project-form-private" checked="checked"/>
                                            <fmt:message key="project.sharing.private" />
                                    </label>
                                    <label class="btn btn-default">
                                        <input type="radio" name="sharing" value="shared" id="project-form-shared"/>
                                            <fmt:message key="project.sharing.shared" />
                                    </label>
                                </div>
                            </c:if>
                            </div>
                                
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label>&nbsp;</label><br/>
                                <input type='button' id='finish' class='btn btn-primary pull-right' name='finish' value='<fmt:message key="project.create.finishlink" />' data-editor='<url:getUrl url="/editor/"/>' />
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </form>
            </div>
        </div>

        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/plugins/jquery.bootstrap.wizard.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/jquery.validate.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/utils.js"/>"></script>
        <script src="<url:getCdnUrl url="/projectcreation.js"/>"></script>
    </body>
</html>
