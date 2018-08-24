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
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <%@ include file="/WEB-INF/servlet/help/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <h3 id="Letsgetstarted">Let&#8217;s get started!</h3>
                    <p class="short">BlocklyProp help overview</p>
                    
                    <div class="col-sm-4 col-xs-12">
                        <div class="panel panel-default text-center">
                            <div class="panel-heading">
                                <img alt="(Activity Bot and Flip Module)" title="(Activity Bot and Flip Module)" border="0" src="<url:getUrl url="/"/>images/products/ABandFLIP.png" style="max-width:100%;height:auto;"/>
                            </div>
                            <div class="panel-body text-center">
                                <a href="http://learn.parallax.com/ab-blockly-intro">Getting Started with the ActivityBot, FLiP, and most other Propeller boards with BlocklyProp</a><br /><br />
                                <a href="http://learn.parallax.com/ab-blocks">Propeller BlocklyProp Block Reference</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm-4 col-xs-12">
                        <div class="panel panel-default">
                            <div class="panel-heading text-center">
                                <img alt="(Scribbler 3)" title="(Scribbler 3)" border="0" src="<url:getUrl url="/"/>images/products/S3.png" style="max-width:100%;height:auto;"/>
                            </div>
                            <div class="panel-body text-center">
                                <a href="http://learn.parallax.com/s3-blockly-intro">Getting Started with the Scribbler robot and BlocklyProp</a><br /><br />
                                <a href="http://learn.parallax.com/s3-blocks">Scribbler 3 Block Reference</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 col-xs-12">
                        <div class="panel panel-default text-center">
                            <div class="panel-heading">
                                <img alt="(Badge WX)" title="(Badge WX)" border="0" src="<url:getUrl url="/"/>images/products/BadgeWX.png" style="max-width:100%;height:auto;"/>
                            </div>
                            <div class="panel-body text-center">
                                <a href="http://learn.parallax.com/node/1850">Getting Started with the Badge WX and BlocklyProp</a><br /><br />
                                <a href="http://learn.parallax.com/ab-blocks">Propeller BlocklyProp Block Reference</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>
