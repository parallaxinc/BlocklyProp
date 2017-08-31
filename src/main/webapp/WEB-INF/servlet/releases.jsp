<%--
    Document   : projects
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta name="base" content="<url:getUrl url="/"/>">
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
        <script type="text/javascript" src="<url:getCdnUrl url="/lib/micromarkdown.min.js"/>" ></script>
        <script>
            function getFromGithub() {
                $.getJSON("http://api.github.com/repos/parallaxinc/BlocklyProp/releases", function (result) {
                    $.each(result, function (i) {
                        $("#from-github").html($("#from-github").html() +
                                "<h5><b>Release <a href=\"" + result[i].url + "\" target=\"_blank\">" + 
                                result[i].name + "</a></b>&nbsp;" +
                                result[i].published_at.split('T')[0] + "</h5>" +
                                micromarkdown.parse(result[i].body).replace(/\r\n/g, '<br>') + "<hr />");
                    });
                });
            }
        </script>
    </head>
    <body onload="getFromGithub();">

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
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

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>