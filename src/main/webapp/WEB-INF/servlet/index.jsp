<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<c:set var="experimental" scope="page" value="${properties:experimentalmenu(false)}" />
<c:set var="copparestricted" scope="page" value="${properties:copparestricted()}" />

<!doctype html >
<html>
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

        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/bootstrap/plugins/gsdk-base.css"/>">
        <link rel="stylesheet" href="<url:getCdnUrl url="/lib/simplemde.min.css"/>">
        <link rel="stylesheet" href="<url:getCdnUrl url="/style-clientdownload.css"/>" />
        <link rel="stylesheet" href="<url:getCdnUrl url="/style.css"/>" />
        
        <script src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/jquery.form.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/jquery.validate.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/core/js/bootstrap.min.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/plugins/bootstrap-table.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/bootstrap/plugins/jquery.bootstrap.wizard.js"/>"></script>
        <script src="<url:getCdnUrl url="/lib/micromarkdown.min.js"/>" ></script>
        <script src="<url:getCdnUrl url="/lib/simplemde.min.js"/>" ></script>

        <script src="<url:getCdnUrl url="/project.js"/>" ></script>


        <script>
            // Define Blockly to prevent messages file from throwing an exception (TEMPORARY)
            var Blockly = {Msg:{}};
        </script>

        <!-- Internationalization text strings -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/en/_messages.js"/>"></script>

        <script>
            // Set the application version
            page_text_label['application_major'] = "<fmt:message key="application.major"/>";
            page_text_label['application_minor'] = "<fmt:message key="application.minor"/>";
            page_text_label['application_build'] = "<fmt:message key="application.build"/>";
        </script>

    </head>
    <body>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" id="nav-logo" href="<url:getUrl url="/"/>">
                        <strong>BETA</strong>&nbsp;<span class="keyed-lang-string" key="menu_product_title"></span>
                    </a>
                </div>
                <!-- Projects -->
                <div class="collapse navbar-collapse" id="navbar-collapse">
                    <div>
                        <ul class="nav navbar-nav">
                            <li>
                                <a href="<url:getUrl url="/projects.jsp"/>"><span class="keyed-lang-string" key="menu_community_projects"></span></a>
                            </li>
                            <li id="my-projects-menu-item">
                                    <a href="<url:getUrl url="/my/projects.jsp"/>"><span class="keyed-lang-string" key="menu_my_projects"></span></a>
                            </li>
                            <li id="new-project-menu-item">
                                <a href="new-project" class="internav-link"><span class="keyed-lang-string" key="menu_newproject_title"></span></a>
                            </li>
                            <li>
                                <a href="privacy-policy" class="internav-link"><span class="keyed-lang-string" key="menu_privacy"></span></a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <!-- Register / Login -->
                        <ul class="nav navbar-nav navbar-right">
                            <!-- Anonymous user -->
                            <li id="login-menu-item">
                                <a href="<url:getUrl url="/login.jsp"/>"><span class="keyed-lang-string" key="menu_login_and_register"></span></a>
                            </li>
                            <!-- Authenticated user -->
                            <li class="dropdown" id="profile-menu-item">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true">
                                    <span class="auth-user"></span> <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="<url:getUrl url="/profile"/>"><span class="keyed-lang-string" key="menu_profile"></span></a></li>
                                    <li><a href="<url:getUrl url="/logout"/>"><span class="keyed-lang-string" key="logout"></span></a></li>
                                </ul>
                            </li>
                            <li><a href="help" class="internav-link"><span class="keyed-lang-string" key="menu_help"></span></a></li>
                            <!--
                            <li class="navbar-text">
                                <form style="margin-bottom: 0;">
                                    <select id="language" name="language" onchange="submit()">
                                        <option value="en" ${language == 'en' ? 'selected' : ''}>English</option>
                                        <%-- Multi-lingual support is under development
                                        <option value="nl" ${language == 'nl' ? 'selected' : ''}>Nederlands</option>
                                        <option value="es" ${language == 'es' ? 'selected' : ''}>Español</option>
                                        --%>
                                    </select>
                                </form>
                            </li>
                            -->
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Message of the Day goes here. -->
            <div class="container-fluid" style="background:#FAE6A4; color:#8a6d3b; padding:10px; display: none;" id="message-of-the-day">
                <div class="row">
                    <div class="col-sm-12" align="center">
                        <a id="message-of-the-day-link" href="http://learn.parallax.com/node/1692" target="_blank">Message of the day</a>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container" id="index-main" class="index-pages">
            <div class="jumbotron">
                <div class="logo">
                    <h1 id="BlocklyProp"><span class="keyed-lang-string" key="home_page_product_title"></span></h1>
                </div>
                <p><strong><span class="keyed-lang-string" key="home_page_banner_title"></span></strong>&nbsp;<span class="keyed-lang-string" key="home_page_banner_slug"></span></p>
                <p><img class="cdn full-width" border="0" src="<url:getCdnUrl url="/images/home-banner.png"/>"></p>
            </div>
            <h2 class="pad-latest-projects"><span class="keyed-lang-string" key="home_latest_projects_title"></span></h2>
            <hr>
            <ul class="latest-projects"></ul>
        </div>

        <div class="modal fade" id="project-loggedin-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title"><span class="keyed-lang-string" key="not_loggedin_title"></span></h4>
                    </div>
                    <div class="modal-body"  style="height: 370px;">
                        <div class="col-md-6">
                            <h2><span class="keyed-lang-string" key="not_loggedin_try_title"></span></h2>
                            <p><span class="keyed-lang-string" key="not_loggedin_try"></span></p>
                            <a class="editor-demo-link try-view-editor" href="/"><span class="keyed-lang-string" key="not_loggedin_try_trylink"></span></a>
                        </div>
                        <div class="col-md-6">
                            <h2><span class="keyed-lang-string" key="not_loggedin_login_title"></span></h2>
                            <p><a href="<url:getUrl url="/register"/>" ><span class="keyed-lang-string" key="not_loggedin_login_registerlink"></span></a></p>
                            <div>
                                <div id="login-failure" class="hidden">
                                    <div class="alert alert-danger" id="unlock-error">
                                        <p><span class="keyed-lang-string" key="login_failed"></span><%-- : < %=errorDescription%> --%></p>
                                    </div>
                                </div>
                                <p><a href="resetrequest"><span class="keyed-lang-string" key="login_forgotlink"></span></a></p>
                                <p><a href="confirmrequest"><span class="keyed-lang-string" key="login_notconfirmedlink"></span></a></p>
                                <form id="loginform" name="loginform" action="<url:getUrl url="/authenticate" />" method="post">
                                    <div class="form-group">
                                        <label for="username" ><span class="keyed-lang-string" key="login_email"></span></label>
                                        <input class="form-control" type="text" name="username" maxlength="255" required="required"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="password"><span class="keyed-lang-string" key="login_password"></span></label>
                                        <input class="form-control" type="password" name="password" maxlength="255" required="required"/>
                                    </div>
                                    <input class="btn btn-default" type="submit" name="submit" class="keyed-lang-string" key="login_submit" value="Submit">
                                </form>
                            </div>
                            <c:if test="${properties:oauth('google')}">
                                <a href="<url:getUrl url="/oauth/google" />?url=" target="oauth" class="oauth" id="oauth-google">Log in using Google</a>
                            </c:if>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><span class="keyed-lang-string" key="cancel"></span></button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="container" id="index-help" class="index-pages" style="display:none;">
            <div class="row">
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#C7DFFF; border: 0.5px #B3CEE6 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/ABOTprod.png"/>" style="display: inline-block; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><span class="keyed-lang-string" key="help_title_activity-bot"></span></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_getting-started_ab"><span class="keyed-lang-string" key="help_text_getting-started"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_reference_ab"><span class="keyed-lang-string" key="help_text_reference"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_tutorials_activity-bot"><span class="keyed-lang-string" key="help_text_tutorials"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_contest-ideas"><span class="keyed-lang-string" key="help_text_contest-ideas"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_educator-resources_activity-bot"><span class="keyed-lang-string" key="help_text_educator-resources"></span></a></li>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#C7DFFF; border: 0.5px #B3CEE6 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/ABWXprod.png"/>" style="display: inline; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><span class="keyed-lang-string" key="help_title_activity-board"></span></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_getting-started_ab"><span class="keyed-lang-string" key="help_text_getting-started"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_reference_ab"><span class="keyed-lang-string" key="help_text_reference"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_tutorials_activity-board"><span class="keyed-lang-string" key="help_text_tutorials"></span></a></li>
                    <%--<li><a target="_blank" class="keyed-lang-string" key="help_link_educator-resources_activity-board"><span class="keyed-lang-string" key="help_text_educator-resources"></span></a></li>--%>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#E3CCF9; border: 0.5px #CDADED solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/HEBprod.png"/>" style="display: inline; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><span class="keyed-lang-string" key="help_title_badge"></span></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_getting-started_ab"><span class="keyed-lang-string" key="help_text_getting-started"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_reference_ab"><span class="keyed-lang-string" key="help_text_reference"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_tutorials_badge"><span class="keyed-lang-string" key="help_text_tutorials"></span></a></li>
                    <%--<li><a target="_blank" class="keyed-lang-string" key="help_link_educator-resources_badge"><span class="keyed-lang-string" key="help_text_educator-resources"></span></a></li>--%>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#C4EDBF; border: 0.5px #A9DFA2 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/S3prod.png"/>" style="display: inline-block; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><span class="keyed-lang-string" key="help_title_s3"></span></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_getting-started_s3"><span class="keyed-lang-string" key="help_text_getting-started"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_reference_s3"><span class="keyed-lang-string" key="help_text_reference"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_tutorials_s3"><span class="keyed-lang-string" key="help_text_tutorials"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_contest-ideas"><span class="keyed-lang-string" key="help_text_contest-ideas"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_educator-resources_s3"><span class="keyed-lang-string" key="help_text_educator-resources"></span></a></li>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#CCECF9; border: 0.5px #AED6E8 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/FLIPprod.png"/>" style="display: inline; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><span class="keyed-lang-string" key="help_title_flip"></span></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_getting-started_ab"><span class="keyed-lang-string" key="help_text_getting-started"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_reference_ab"><span class="keyed-lang-string" key="help_text_reference"></span></a></li>
                        <li><a target="_blank" class="keyed-lang-string" key="help_link_tutorials_flip"><span class="keyed-lang-string" key="help_text_tutorials"></span></a></li>
                    <%--<li><a target="_blank" class="keyed-lang-string" key="help_link_educator-resources_flip"><span class="keyed-lang-string" key="help_text_educator-resources"></span></a></li>--%>
                    </ul>
                </div>
                <div class="col-sm-4">

                </div>
            </div>
        </div>

        <div class="container" class="index-pages" id="index-libraries" style="display: none;">
            <div class="row">
                <div class="col-md-12">
                    <h2><span class="keyed-lang-string" key="libraries_title"></span></h2>
                    <p><span class="keyed-lang-string" key="libraries_header"></span></p>
                    <h3><span class="keyed-lang-string" key="libraries_server"></span></h3>
                    <a href="https://commons.apache.org/proper/commons-configuration/ ">Apache Commons Configuration</a>&nbsp;-&nbsp;configuration framework<br>
                    <a href="https://commons.apache.org/proper/commons-collections/ ">Apache Commons Collections</a>&nbsp;-&nbsp;collection utilities<br>
                    <a href="https://commons.apache.org/proper/commons-dbcp/ ">Apache Commons DBCP</a>&nbsp;-&nbsp;database connection utilities<br>
                    <a href="https://commons.apache.org/proper/commons-pool/ ">Apache Commons Pool</a>&nbsp;-&nbsp;database connection pooling<br>
                    <a href="https://commons.apache.org/proper/commons-io/ ">Apache Commons IO</a>&nbsp;-&nbsp;IO utility framework<br>
                    <a href="http://www.cuubez.com/ ">Cuubez</a>&nbsp;-&nbsp;Rest API visualizer<br>
                    <a href="https://github.com/google/gson ">Gson</a>&nbsp;-&nbsp;JSON serializer<br>
                    <a href="https://code.google.com/p/guava-libraries/ ">Guava</a>&nbsp;-&nbsp;utilities<br>
                    <a href="https://github.com/google/guice ">Guice</a>&nbsp;-&nbsp;dependency injection<br>
                    <a href="http://lucene.apache.org/ ">Lucene</a>&nbsp;-&nbsp;full text search engine<br>
                    <a href="https://dev.mysql.com/downloads/connector/j/">MySql connector</a>&nbsp;-&nbsp;database connection utility<br>
                    <a href="https://github.com/FasterXML/jackson ">Jackson</a>&nbsp;-&nbsp;JSON parser<br>
                    <a href="https://jersey.java.net/ ">Jersey</a>&nbsp;-&nbsp;RESTful Web Services<br>
                    <a href="http://www.jooq.org/ ">jOOQ</a>&nbsp;-&nbsp;ORM library<br>
                    <a href="http://jsoup.org/ ">jsoup</a>&nbsp;-&nbsp;HTML parser<br>
                    <a href="http://shiro.apache.org/ ">Shiro</a>&nbsp;-&nbsp;security framework<br>
                    <a href="https://java.net/projects/textile-j ">Textile-J</a>&nbsp;-&nbsp;markup notation library<br>
                    <h3><span class="keyed-lang-string" key="libraries_browser"></span></h3>
                    <a href="https://ace.c9.io/#nav=about ">Ace</a>&nbsp;-&nbsp;in-browser code editor<br>
                    <a href="https://developers.google.com/blockly/?hl=en">Blockly</a>&nbsp;-&nbsp;visual programming language<br>
                    <a href="http://getbootstrap.com/">Bootstrap</a>&nbsp;-&nbsp;UI framework<br>
                    <a href="https://jquery.com/">jQuery</a>&nbsp;-&nbsp;javascript framework<br>
                    <a href="http://simonwaldherr.github.io/micromarkdown.js/">micromarkdown</a>&nbsp;-&nbsp;markdown parser<br>
                    <a href="http://malsup.com/jquery/form/">jQuery Form Plugin</a><br>
                    <a href="http://jqueryvalidation.org/">jQuery Validation Plugin</a><br>
                </div>
            </div>
        </div>

        <div class="container" class="index-pages" id="index-license" style="display: none;">
            <div class="row">
                <div class="col-md-12">
                    <h2><span class="keyed-lang-string" key="license_title"></span></h2>
                    <p><span class="keyed-lang-string" key="license_type"></span></p>
                    <p><span class="keyed-lang-string" key="license_copyright_head"></span>&nbsp;<span class="year-text"></span>&nbsp;<span class="keyed-lang-string" key="license_copyright_owner"></span></p>
                    <p><span class="keyed-lang-string" key="license_text_part1"></span></p>
                    <p><span class="keyed-lang-string" key="license_text_part2"></span></p>
                    <p><span class="keyed-lang-string" key="license_warranty"></span></p>
                </div>
            </div>
        </div>

        <div class="container" class="index-pages" id="index-releases" style="display: none;">
            <div class="row">
                <div class="col-sm-12">
                    <div id="from-github"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <h4>Log of changes prior to first official release</h4>
                    <h5><b>Release</b>&nbsp;2016-09-11</h5>
                    <ul>
                        <li>Fix grammatical error on homepage</li>
                        <li>Update homepage layout</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-09-10</h5>
                    <ul>
                        <li>Add terminal blocks for the Hackable Electronic Badge</li>
                    </ul>
                    <h5><b>Release</b>&nbsp;2016-06-27</h5>
                    <ul>
                        <li>Fix bugs introduced in build 2016/06/24</li>
                        <li>Limit servo to a limited set of pins</li>
                        <li>Replace servo angle input by angle selection</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-06-24</h5>
                    <ul>
                        <li>C variable types</li>
                        <li>Simplify cognew</li>
                        <li>Problem with newline character in print block</li>
                        <li>Remove math_single</li>
                        <li>Add random number block</li>
                        <li>Hackable Electronic Badge: toggle led</li>
                        <li>Move boolean block to values category</li>
                        <li>Fix EEPROM quote issues</li>
                        <li>Remove duplicate blocks in category</li>
                        <li>Add initialization for pins that get toggled</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-06-16</h5>
                    <ul>
                        <li>Minor toolbox organization and naming changes</li>
                        <li>Project table and form improvement (board and user)</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-06-14</h5>
                    <ul>
                        <li>Toolbox: programming menu simplification</li>
                        <li>Toolbox: remove Input/output for HEB board selection</li>
                        <li>Make 'wait' a reserved word in C</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-06-13</h5>
                    <ul>
                        <li>Fix type checking for Booleans</li>
                        <li>Show project name and owner in editor</li>
                        <li>Fix project delete and clone</li>
                        <li>Fix wrong links to old home page</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-06-12</h5>
                    <ul>
                        <li>Simplify authentication and authorization</li>
                        <li>Filter editor toolbox based on selected board</li>
                        <li>Fix set-pins block</li>
                        <li>Fix delete all blocks functionality in editor</li>
                        <li>Put variables and functions under programming category</li>
                        <li>Fix HMC5883 Category</li>
                        <li>Fix HEB IR receive block</li>
                        <li>Add BETA mark</li>
                        <li>HEB OLED print static text</li>
                        <li>HEB IR receive block data types</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-06-06</h5>
                    <ul>
                        <li>Change color palette</li>
                        <li>Fix timing blocks</li>
                        <li>Add default values to blocks</li>
                        <li>Rework cog_new and cog_end for the C editor</li>
                        <li>Improve coding style in generated code</li>
                        <li>Fix HEB IR receive block</li>
                        <li>Fix quotes and invalid block code for I2C blocks</li>
                        <li>Fix quotes in SD card blocks</li>
                        <li>HMC5883L compass blocks</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-05-30</h5>
                    <ul>
                        <li>Clean C blocks</li>
                        <li>Correct quotes</li>
                        <li>PWM blocks</li>
                        <li>Fix issues</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-05-24</h5>
                    <ul>
                        <li>Eeprom and sd cards</li>
                        <li>ActivityBot and servo</li>
                        <li>Datatypes</li>
                        <li>Spin issues</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-05-18</h5>
                    <ul>
                        <li>New blocks and block bugfixes</li>
                    </ul>
                    <hr /><h5><b>Release</b>&nbsp;2016-05-02</h5>
                    <ul>
                        <li>First version with change log</li>
                        <li>Redesigned project form</li>
                        <li>Public profile pages</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="container index-pages" id="index-client" style="display: none;">
            <div class="row">
                <div class="col-md-12">
                    <h2><span class="keyed-lang-string" key="clientdownload_title"></span></h2>

                    <div class="dropdown">
                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            <span class="keyed-lang-string" key="clientdownload_os_menu"></span>
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a class="client-os-dropdown" onmouseup="showOS('Windows');">Windows</a></li>
                            <li><a class="client-os-dropdown" onmouseup="showOS('MacOS');">Mac OS</a></li>
                            <li><a class="client-os-dropdown" onmouseup="showOS('ChromeOS');">Chrome OS</a></li>
                            <!-- <li><a href="#" onmouseup="showOS('Linux');">Linux</a></li> -->
                        </ul>
                    </div>
                    <%--
                    <button class="btn btn-default show-all" onclick="$('body').addClass('all-clients');">
                        <span class="keyed-lang-string" key="clientdownload_showall"></span></button>
                    --%>
                </div>
            </div>

            <div class="clients">
                <div class="row">
                    <div class="col-sm-7" id="client-instructions-content">
                        <!-- MacOS instructions -->
                        <div class="client-instructions MacOS">
                            <h4><span class="keyed-lang-string" key="client_macOS_run_title"></span></h4>
                            <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                                <div id="mac1">
                                    <p><span class="keyed-lang-string" key="client_macOS_run_instructions1"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/mac_os1.png"/>"/></div>
                                </div>
                                <div id="mac2" class="hidden">
                                    <p><span class="keyed-lang-string" key="client_macOS_run_instructions2"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/mac_os2.png"/>"/></div>
                                </div>
                                <div id="mac3" class="hidden">
                                    <p><span class="keyed-lang-string" key="client_macOS_run_instructions3"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/mac_os3.png"/>"/></div>
                                </div>
                                <div id="mac4" class="hidden">
                                    <p><span class="keyed-lang-string" key="client_run_instructions2"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/usbok.png"/>"/></div>
                                </div>
                            </div>
                            <div style="padding-top:10px;">
                                <button id="mac1-btn" class="btn btn-sm btn-primary" onclick="showStep('mac', 1, 4);"><span class="keyed-lang-string" key="client_run_step1"></span></button>
                                <button id="mac2-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 2, 4);"><span class="keyed-lang-string" key="client_run_step2"></span></button>
                                <button id="mac3-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 3, 4);"><span class="keyed-lang-string" key="client_run_step3"></span></button>
                                <button id="mac4-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 4, 4);"><span class="keyed-lang-string" key="client_run_step4"></span></button>
                            </div>
                        </div>

                        <!-- Windows instructions -->
                        <div class="client-instructions Windows">
                            <h4><span class="keyed-lang-string" key="client_windows_run_title"></span></h4>
                            <div style="background:#f5f5f5; border-radius:6px; height:250px; padding:6px;">
                                <div id="win1">
                                    <p><span class="keyed-lang-string" key="client_windows_run_instructions1"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/windows1.png"/>"/></div>
                                </div>
                                <div id="win2" class="hidden">
                                    <p><span class="keyed-lang-string" key="client_windows_run_instructions2"></span></p>
                                    <p><span class="keyed-lang-string" key="client_windows_run_instructions3"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/windows2.png"/>"/></div>
                                </div>
                                <div id="win3" class="hidden">
                                    <p><span class="keyed-lang-string" key="client_run_instructions2"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/usbok.png"/>"/></div>
                                </div>
                            </div>
                            <div style="padding-top:10px;">
                                <button id="win1-btn" class="btn btn-sm btn-primary" onclick="showStep('win', 1, 3);"><span class="keyed-lang-string" key="client_run_step1"></span></button>
                                <button id="win2-btn" class="btn btn-sm btn-default" onclick="showStep('win', 2, 3);"><span class="keyed-lang-string" key="client_run_step2"></span></button>
                                <button id="win3-btn" class="btn btn-sm btn-default" onclick="showStep('win', 3, 3);"><span class="keyed-lang-string" key="client_run_step3"></span></button>
                            </div>
                        </div>

                        <!-- Chrome OS instructions -->
                        <div class="client-instructions ChromeOS">
                            <h4><span class="keyed-lang-string" key="client_windows_run_title"></span></h4>
                            <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                                <div id="chr1">
                                    <p><span class="keyed-lang-string" key="client_chrome_run_instructions1"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/chrome1.png"/>"/></div>
                                </div>
                                <div id="chr2" class="hidden">
                                    <p><span class="keyed-lang-string" key="client_chrome_run_instructions2"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/chrome2.png"/>"/></div>
                                </div>
                                <div id="chr3" class="hidden">
                                    <p><span class="keyed-lang-string" key="client_run_instructions2"></span></p>
                                    <div align="center"><img src="<url:getCdnUrl url="/images/client-run/usbok.png"/>"/></div>
                                </div>
                            </div>
                            <div style="padding-top:10px;">
                                <button id="chr1-btn" class="btn btn-sm btn-primary" onclick="showStep('chr', 1, 3);"><span class="keyed-lang-string" key="client_run_step1"></span></button>
                                <button id="chr2-btn" class="btn btn-sm btn-default" onclick="showStep('chr', 2, 3);"><span class="keyed-lang-string" key="client_run_step2"></span></button>
                                <button id="chr3-btn" class="btn btn-sm btn-default" onclick="showStep('chr', 3, 3);"><span class="keyed-lang-string" key="client_run_step3"></span></button>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-5" id="client-download-content">
                        <!-- MacOS client -->
                        <div class="client-instructions MacOS">
                            <h4><span class="keyed-lang-string" key="clientdownload_download_installer"></span></h4>
                        </div>
                        <div class="client MacOS">
                            <img src="<url:getCdnUrl url="/images/os-icons/mac_os.png"/>"/>
                            <a href="${properties:downloadfiles('/BlocklyPropClient-setup-MacOS.pkg')}">
                                <span class="keyed-lang-string" key="clientdownload_client_macos_installer"></span></a>
                        </div>

                        <!-- Windows clients -->
                        <div class="client-instructions Windows">
                            <h4><span class="keyed-lang-string" key="clientdownload_download_installer"></span></h4>
                        </div>
                        <div class="client Windows">
                            <img src="<url:getCdnUrl url="/images/os-icons/windows.png"/>"/>
                            <a href="${properties:downloadfiles('/BlocklyPropClient-setup-32.exe')}">
                                <span class="keyed-lang-string" key="clientdownload_client_windows32_installer"></span></a>
                        </div>
                        <div class="client Windows">
                            <img src="<url:getCdnUrl url="/images/os-icons/windows.png"/>"/>
                            <a href="${properties:downloadfiles('/BlocklyPropClient-setup-64.exe')}">
                                <span class="keyed-lang-string" key="clientdownload_client_windows64_installer"></span></a>
                        </div>

                        <!-- ChromeOS client -->
                        <div class="client-instructions ChromeOS">
                            <h4><span class="keyed-lang-string" key="clientdownload_download_launcher"></span></h4>
                        </div>
                        <div class="client ChromeOS">
                            <img src="<url:getCdnUrl url="/images/os-icons/chrome_os.png"/>"/>
                            <a href="https://chrome.google.com/webstore/detail/iddpgcclgepllhnhlkkinbmmafpbnddb" target="_blank">
                                <span class="keyed-lang-string" key="clientdownload_client_chromeos_installer"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container index-pages" id="index-privacy-policy" style="display: none;">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h3>Parallax BlocklyProp Privacy Policies</h3>
                    <div>
                        <p>Parallax Inc., including the BlocklyProp system, is committed to protecting the privacy of children who use our sites and applications. This online privacy policy explains our information collection, disclosure, and parental notification and consent practices with respect to information provided by children under the age of 13 (“child” or “children”). This policy is in accordance with the U.S. Children’s Online Privacy Protection Act ("COPPA") and the Family Education Records Privacy Act ("FERPA"), and outlines our practices in the United States and Latin America regarding children’s personal information.</p>
                        <h4>The Information We Collect From Children, How We Use It, and How and When We Communicate With Parents</h4>
                        <p>In any instance that we collect personal information from a child, we will retain that information only so long as reasonably necessary to fulfill the activity request or allow the child to continue to participate in the activity, and ensure the security of our users and our services, or as required by law. In the event we discover we have collected information from a child in a manner inconsistent with COPPA’s requirements, we will either delete the information or immediately seek the parent’s consent for that collection.</p>
                        <h4>Registration</h4>
                        <p>Children can register with our site to learn and create with the BlocklyProp system. During the registration process, we may ask the child to provide certain information for notification and security purposes, including a parent or guardian’s email address, the child’s member or account username, and password. We also may ask for birth dates from children to validate their ages. We strongly advise children never to provide any personal information in their usernames. We will not require a child to provide more information than is reasonably necessary in order to use the BlocklyProp system.</p>
                        <p>About the collection of parent email address: Consistent with the requirements of COPPA, on any child-targeted site or application, or in any instance where we ask for age and determine the user is age 12 or under, we will ask for a parent or guardian email address before we collect any personal information from the child. If you believe your child is participating in an activity that collects personal information and you or another parent/guardian have NOT received an email providing notice or seeking your consent, please feel free to contact us at education@parallax.com. We will not use parent e-mails provided for parental consent purposes to market to the parent unless the parent has expressly opted in to email marketing or has separately participated in an activity that allows for such email contact.</p>
                        <h4>Content Generated by a Child</h4>
                        <p>The BlocklyProp system allows children to create or manipulate content and save it online. Although the BlocklyProp system does not collect or share personal information, it is possible for a child to enter information into open text boxes and fields. Therefore, we encourage you to actively participate in your child’s learning and activity on the BlocklyProp system. If we become aware of anything shared publicly that appears to be personal in nature from any of our users under 13 years of age, we will remove and delete it immediately</p>
                        <h4>About Parental Notification and Consent:</h4>
                        <p>Email Notification: When a child registers an account on the BlocklyProp system, COPPA requires that we notify a parent or guardian’s by email. In the email we will explain what information we are collecting, and how we plan to use it.</p>
                        <p>Email Consent: The email sent to a parent or guardian as a notification will contain a link that, when clicked, will allow the parent to provide consent to allow their child to share their creations publicly with the BlocklyProp community of users.</p>
                        <p>Teacher consent in lieu of a parent. With regard to school-based activities, COPPA allows teachers and school administrators to act in the stead of parents to provide consent for the collection of personal information from children. Schools should always notify parents about these activities. For more information on parental rights with respect to a child’s educational record under the Family Educational Rights and Privacy Act (FERPA), please visit the FERPA site.</p>
                        <h4>Email Contact with a Child</h4>
                        <p>On occasion, in order to respond to a question or request from a child, Parallax may need to ask for the child’s online contact information, such as an email address. Parallax will delete this information immediately after responding to the question or request.</p>
                        <h4>Third-parties and outside entities</h4>
                        <p>Parallax Inc. does not share, sell, or disclose any user or customer information with third-parties or outside entities, unless that entity is a law-enforcement agency that has obtained the legal authority to collect it.</p>
                        <h4>Persistent Identifiers</h4>
                        <p>When children interact with us, certain information may automatically be collected to make more useful and secure Examples include the type of computer operating system, the child’s IP address or mobile device identifier, the web browser, and information regarding the online or mobile service provider. This information is collected using technologies such as cookies, flash cookies, web beacons, and other unique identifiers. This data is principally used for internal purposes only, in order to:</p>
                        <ul>
                            <li>provide children with access to features and activities on our site and application</li>
                            <li>customize content and improve our site and application</li>
                            <li>conduct research and analysis to address the performance of our site and application</li>
                            <li>generate anonymous reporting</li>
                        </ul>
                        <p>Please contact us at the mailing address, email, or phone number below with questions about the operators’ privacy policies and collection and use practices:</p>
                        <p>Parallax Inc.<br/>599 Menlo Drive<br/>Rocklin, CA 95765<br/>United States of America<br/><br/>Phone: (888) 512-1024<br/>Email: education@parallax.com<br/></p>
                        <p>In any correspondence such as e-mail or mail, please include the child’s username and the parent’s email address and telephone number. To protect children’s privacy and security, we will take reasonable steps to help verify a parent’s identity before granting access to any personal information.</p>
                        <p>At any time, parents can refuse to permit us to collect further personal information from their children in association with a particular account, and can request that we delete from our records the personal information we have collected in connection with that account. Please keep in mind that a request to delete records may lead to a termination of an account, membership, or other service.</p>
                        <h4>Changes in policies or ownership</h4>
                        <p>Any material changes to our privacy practices/policies will only take place after a notice of upcoming changes has been posted prominently on the login page for at least 15 business days and/or all users have been emailed a notice of upcoming changes to our privacy policy or practices.</p>
                        <p>In the unlikely event that Parallax Inc. sold or otherwise transferred its ownership and control of the BlocklyProp site to another entity, student data would only be included if said entity honored the privacy agreement in place when users provided their data and users would be informed of the change in ownership and provided with an option to remove their data.</p>
                        <p><span style="font-size: small">Revised 2017-08-07</span></p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container index-pages" id="index-new-project" style="display: none;">
            <form class="proj">
                <div class="row">
                    <div class="col-sm-5 col-sm-offset-1">
                        <h3><span class="keyed-lang-string" key="project_create_title" ></span></h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-5 col-sm-offset-1">
                        <div class="form-group">
                            <label for="project-name"><span class="keyed-lang-string" key="project_create_project_name" ></span></label>
                            <input type="text" class="form-control" id="project-name" name="project-name"/>
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="form-group">
                            <label for="board-type"><span class="keyed-lang-string"  key="project_create_board_type" ></span></label>
                            <select class="form-control" id="board-type" name="board-type"></select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1">
                        <label for="project-description"><span class="keyed-lang-string" key="project_create_description" ></span></label>
                        <textarea class="form-control" id="project-description" name="project-description"></textarea>
                    </div>
                    <input type="hidden" id="project-type" name="project-type" value="PROPC"/>
                </div>
                <div class="row">
                    <div class="col-sm-5 col-sm-offset-1">
                        <div class="form-group">

                            <c:if test="${copparestricted == true}">
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active">
                                        <input type="radio" name="sharing" value="private" id="project-form-private" checked="checked"/>
                                            <span class="keyed-lang-string" key="project_sharing_private" ></span>
                                    </label>
                                </div>
                            </c:if>

                            <c:if test="${copparestricted == false}">
                                <label for="sharing"><span class="keyed-lang-string" key="project_sharing" ></span></label><br/>
                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active">
                                        <input type="radio" name="sharing" value="private" id="project-form-private" checked="checked"/>
                                            <span class="keyed-lang-string" key="project_sharing_private" ></span>
                                    </label>
                                    <label class="btn btn-default">
                                        <input type="radio" name="sharing" value="shared" id="project-form-shared"/>
                                        <span class="keyed-lang-string" key="project_sharing_shared" ></span>
                                    </label>
                                </div>
                            </c:if>

                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="form-group">
                            <input type='button' id='finish' class='btn btn-primary pull-right' name='finish' value='Finish' />
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </form>
        </div>

        <div id="page-dump" style="display: none;"></div>

        <script>
            // Get the logged in status
            var user_authenticated = false;
            <shiro:authenticated>
                user_authenticated = true;
            </shiro:authenticated>

            // Get the username once logged in
            var auth_user = '<shiro:principal></shiro:principal>';

            var projectBoard = {
                "activity-board": "icon-board-ab",
                "s3": "icon-board-s3",
                "heb": "icon-board-heb",
                "flip": "icon-board-flip",
                "other": "icon-board-other",
                "propcfile": "icon-board-propc"
            };

            var oauthUrls = {};
            var baseUrl = '<url:getUrl url="/" />';
            var simplemde = null;
            console.log(baseUrl);

            // handle user clicks on the "back" button
            window.addEventListener("popstate", function(e) {
                var loc = location.pathname.split('/');
                var gotoLoc = loc[loc.length - 1];
                if (gotoLoc === 'blockly' || gotoLoc === 'index' || gotoLoc === '' || !gotoLoc) {
                    gotoLoc = 'main';
                }
                indexNav(gotoLoc);
            });

            osName = 'unknown-client';

            // Detect the current operating system
            function detectOS(x, y, z) {
                z = z || y;
                if (navigator[x] && navigator[x].indexOf(y) !== -1) {
                    osName = z;
                }
            }

            /*   navigator     value     download  */
            detectOS("appVersion", "X11", "UNIX");
            detectOS("appVersion", "Mac", "MacOS");
            detectOS("appVersion", "Linux");
            detectOS("userAgent", "Linux");
            detectOS("platform", "Linux");
            detectOS("appVersion", "Win", "Windows");
            detectOS("userAgent", "Windows");
            detectOS("platform", "Win", "Windows");
            detectOS("oscpu", "Windows");
            detectOS("appVersion", "CrOS", "ChromeOS");

            $(document).ready(function () {
                $("body").addClass(osName);

                // Manage the page location/view
                var loca = location.pathname.split('/');
                var gotoLoca = loca[loca.length - 1];
                if (gotoLoca === 'blockly' || gotoLoca === 'index' || gotoLoca === '' || !gotoLoca) {
                    // Set the current page in the browser navigation
                    history.pushState(null, null, baseUrl);
                } else {
                    indexNav(gotoLoca);
                }

                // Once the page loads, set the behavior of the links for faux-navigation
                $('.internav-link').click(function(e) {
                    var loc = this.href.split('/');
                    var gotoLoc = loc[loc.length - 1];
                    e.preventDefault();
                    indexNav(gotoLoc);
                });

                // Prevent dropdown menu from affecting the page navigation on the client download/instructions page
                $('.client-os-dropdown').click(function(e) {
                    e.preventDefault();
                });

                // Show or hide elements based on login status
                if (user_authenticated === true) {
                    $('#profile-menu-item').css('display', 'list-item');
                    $('#login-menu-item').css('display', 'none');
                    $('#my-projects-menu-item').css('display', 'list-item');
                    $('#new-project-menu-item').css('display', 'list-item');
                } else {
                    $('#profile-menu-item').css('display', 'none');
                    $('#login-menu-item').css('display', 'list-item');
                    $('#my-projects-menu-item').css('display', 'none');
                    $('#new-project-menu-item').css('display', 'none');
                }
                
                // Add the username when the user is logged in
                $('.auth-user').html(auth_user);
            
                $('#loginform').submit(function (event) {
                    $("#login-failure").addClass("hidden");
                    // Stop form from submitting normally
                    event.preventDefault();

                    var jqxhr = $.post($('#loginform').attr('action'), $('#loginform').serialize(), onLoginSuccess);
                    jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
                        alert("An unexpected error occured. Please try again later or contact the webmaster.");
                    });

                });

               /*
                var pageReq = getURLParameter('page');
                alert(pageReq);
                if (pageReq) {
                    indexNav(pageReq);

                }
                */

                // set the year in copyright text fields
                $('.year-text').html(new Date().getFullYear());

                // Retrieve the list of latest projects
                $.get("rest/shared/project/list?sort=modified&order=desc&limit=5&offset=0", function (data) {
                    $.each(data['rows'], function (index, project) {
                        console.log(project);
                        var user = '';
                        if (project['user']) {
                            user = ' (' + project['user'] + ')';
                        }
                        var projectItem = $("<li/>", {
                            "class": "project"
                        });
                        $("<a/>", {
                            "class": "editor-view-link editor-icon " + projectBoard[project['board']],
                            "href": "/blockly/editor/blocklyc.jsp?project=" + project['id'],
                            "text": project['name'] + user
                        }).appendTo(projectItem);
                        $(".latest-projects").append(projectItem);
                    });
                });

                // Retrieve the Message of the Day content
                $('#page-dump').load("http://learn.parallax.com/node/1692", function (data, statusTxt, xhr){
                    if(statusTxt === "error")
                        console.log("Error: " + xhr.status + ": " + xhr.statusText);
                    console.log(data);
                    if(data.indexOf('<h6><em>') > -1 || data.indexOf('<em><h6>') > -1) {
                        var motd_page = data.replace(/<h6>/g, '|||').replace(/<\/h6>/g, '|||').replace(/<em>/g, '|||').replace(/<\/em>/g, '|||');
                        var motd_msg = motd_page.split('||||||');
                        $('#message-of-the-day').css('display', 'block');
                        $('#message-of-the-day-link').html(motd_msg[1] + ' - click here for more information');
                    }
                });

                // Grab the release list from github, format it, and
                $.getJSON("http://api.github.com/repos/parallaxinc/BlocklyProp/releases", function (result) {
                    $.each(result, function (i) {
                        $("#from-github").html($("#from-github").html() +
                                "<h5><b>Release <a href=\"" + result[i].url + "\" target=\"_blank\">" +
                                result[i].name + "</a></b>&nbsp;" +
                                result[i].published_at.split('T')[0] + "</h5>" +
                                micromarkdown.parse(result[i].body).replace(/\r\n/g, '<br>') + "<hr />");
                    });
                });

                // Set up oauth
                if (document.getElementById('project-loggedin-dialog')) {
                    $(".oauth").each(function () {
                        oauthUrls[$(this).attr('id')] = $(this).attr("href");
                    });
                }

                // Activate the tooltips
                $('[rel="tooltip"]').tooltip();
                simplemde = new SimpleMDE(
                        {
                            element: document.getElementById("project-description"),
                            hideIcons: ["link"],
                            spellChecker: false
                        });

                // set behavior when radio-groups are clicked
                $('[data-toggle="wizard-radio"]').click(function () {
                    wizard = $(this).closest('.wizard-card');
                    wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
                    $(this).addClass('active');
                    $(wizard).find('[type="radio"]').removeAttr('checked');
                    $(this).find('[type="radio"]').attr('checked', 'true');
                });

                // set behavior when checkboxes are clicked
                $('[data-toggle="wizard-checkbox"]').click(function () {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).find('[type="checkbox"]').removeAttr('checked');
                    } else {
                        $(this).addClass('active');
                        $(this).find('[type="checkbox"]').attr('checked', 'true');
                    }
                });

                // Set full height classes based on window height
                doc_height = $(document).height();
                $('.set-full-height').css('height', doc_height);
                
                // Set the board menu
                $("#board-type").empty();
                $('#board-type').append($('<option>', {
                    disabled: '',
                    selected: '',
                    text: page_text_label['project_create_board_type_select']
                }));
                $('#board-type').append($('<option>', {
                    value: 'activity-board',
                    text: page_text_label['project_board_activity-board']
                }));
                $('#board-type').append($('<option>', {
                    value: 's3',
                    text: page_text_label['project_board_s3']
                }));
                $('#board-type').append($('<option>', {
                    value: 'flip',
                    text: page_text_label['project_board_flip']
                }));
                $('#board-type').append($('<option>', {
                    value: 'heb',
                    text: page_text_label['project_board_heb']
                }));
                $('#board-type').append($('<option>', {
                    value: 'other',
                    text: page_text_label['project_board_other']
                }));
                <c:choose><c:when test="${experimental == true}">
                    $('#board-type').append($('<option>', {
                        value: 'propcfile',
                        text: page_text_label['project_board_propcfile']
                    }));
                </c:when></c:choose>
                $('#finish').val(page_text_label['project_create_finishlink']);
            });
            
            function onLoginSuccess(response, statusText, xhr, $form) {
                // alert(response.data.token);
                if (response.success === true) {
                    if (typeof window['post-authenticate'] === 'function') {
                        window['post-authenticate']();
                    } else {
                        location.reload(true);
                    }
                } else {
                    $("#login-failure").removeClass("hidden");
                    if (typeof window['failed-authentication'] === 'function') {
                        window['failed-authentication']();
                    }
                }
            }

            if(!user_authenticated) {
                $("body").on("click", "a.editor-new-link", function (event) {
                    event.preventDefault();
                    setEditorLinksAndShow.call(this, page_text_label['not_loggedin_try_trylink']);
                });

                $("body").on("click", "a.editor-view-link", function (event) {
                    event.preventDefault();
                    setEditorLinksAndShow.call(this, page_text_label['not_loggedin_try_viewprojectlink']);
                });
            }

            // http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
            function getURLParameter(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
            }

            function setEditorLinksAndShow(linkText) {
                $(".try-view-editor").text(linkText);
                $("a.editor-continue-link").attr("href", $(this).attr("href"));

                var link = $(this).attr("href");

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

            // Test for Explorer or Edge and throw an alert if that's the browser being used
            if (navigator.userAgent.indexOf('Edge') > -1 || (navigator.userAgent.indexOf('rv:11') > -1 && navigator.userAgent.indexOf('Trident') > -1) || navigator.userAgent.indexOf('MSIE') > -1) {
                alert(page_text_label['browser_detection_ms_warning']);
            }

            function indexNav(divRef) {
                history.pushState(null, null, baseUrl + (divRef === 'main' ? '' : divRef));
                document.getElementById('index-main').style.display = 'none';
                document.getElementById('index-help').style.display = 'none';
                document.getElementById('index-license').style.display = 'none';
                document.getElementById('index-releases').style.display = 'none';
                document.getElementById('index-libraries').style.display = 'none';
                document.getElementById('index-client').style.display = 'none';
                document.getElementById('index-privacy-policy').style.display = 'none';
                document.getElementById('index-new-project').style.display = 'none';
                document.getElementById('index-' + divRef).style.display = 'block';
            }

            function showOS(o) {
                $("body").removeClass('Windows')
                        .removeClass('MacOS')
                        .removeClass('Linux')
                        .removeClass('ChromeOS');
                $("body").addClass(o);
            }

            function showStep(o, i, t) {
                for (var j = 1; j <= t; j++) {
                    $('#' + o + j.toString() + '-btn').addClass('btn-default').removeClass('btn-primary');
                    $('#' + o + j.toString()).addClass('hidden');
                }
                $('#' + o + i.toString() + '-btn').removeClass('btn-default').addClass('btn-primary');
                $('#' + o + i.toString()).removeClass('hidden');
            }

            function validateFirstStep() {
                $(".proj").validate({
                    rules: {
                        'project-name': "required",
                        'board-type': "required"
                    },
                    messages: {
                        'project-name': "Please enter a project name",
                        'board-type': "Please select a board type"
                    }
                });

                if (!$(".proj").valid()) {
                    //form is invalid
                    return false;
                }
                return true;
            }

            $.fn.serializeObject = function () {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };

            // Handle 'create new project' form completion
            $('#finish').on('click', function () {
                if (validateFirstStep()) {
                    var formData = $(".proj").serializeObject();
                    formData['project-description'] = simplemde.value();
                    formData['project-description-html'] = simplemde.options.previewRender(simplemde.value());
                    console.log(formData);
                    $.post(baseUrl + 'createproject', formData, function (data) {
                        console.log(data);
                        if (data['success']) {
                            window.location = baseUrl + "editor/blocklyc.jsp?project=" + data['id'];
                        } else {
                            alert("There was an error when BlocklyProp tried to create your project:\n" + data['message']);
                        }
                    }).fail( function(response){ console.log(response); });
                }
            });
        </script>

        <footer class="footer">
            <nav class="navbar">
                <div class="container">
                    <div>
                        <ul class="nav navbar-nav">
                            <li><a href="license" class="internav-link"><span class="keyed-lang-string" key="footer_licenselink"></span></a></li>
                            <li><a href="releases" class="internav-link"><span class="keyed-lang-string" key="footer_releases"></span></a></li>
                            <li><a href="libraries" class="internav-link"><span class="keyed-lang-string" key="footer_librarieslink"></span></a></li>
                            <li><a href="client" class="internav-link"><span class="keyed-lang-string" key="clientdownload_title"></span></a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a href="http://www.parallax.com" target="_blank">
                                    V<span class="keyed-lang-string" key="application_major"></span>
                                    .<span class="keyed-lang-string" key="application_minor"></span>
                                    .<span class="keyed-lang-string" key="application_build"></span>
                                    Parallax &copy; 2015 - <span class="year-text"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </footer>
    </body>
</html>
