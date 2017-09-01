
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta name="base" content="<url:getUrl url="/"/>">
        <%@ include file="/WEB-INF/includes/pageparts/head/basic.jsp"%>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#C7DFFF; border: 0.5px #B3CEE6 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/ABOTprod.png"/>" style="display: inline-block; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><fmt:message key="help.title.activity-bot" /></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" href="<fmt:message key="help.link.getting-started.ab" />"><fmt:message key="help.text.getting-started" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.reference.ab" />"><fmt:message key="help.text.reference" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.tutorials.activity-bot" />"><fmt:message key="help.text.tutorials" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.contest-ideas" />"><fmt:message key="help.text.contest-ideas" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.educator-resources.activity-bot" />"><fmt:message key="help.text.educator-resources" /></a></li>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#C7DFFF; border: 0.5px #B3CEE6 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/ABWXprod.png"/>" style="display: inline; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><fmt:message key="help.title.activity-board" /></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" href="<fmt:message key="help.link.getting-started.ab" />"><fmt:message key="help.text.getting-started" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.reference.ab" />"><fmt:message key="help.text.reference" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.tutorials.activity-board" />"><fmt:message key="help.text.tutorials" /></a></li>
                        <%--<li><a target="_blank" href="<fmt:message key="help.link.educator-resources.activity-board" />"><fmt:message key="help.text.educator-resources" /></a></li>--%>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#E3CCF9; border: 0.5px #CDADED solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/HEBprod.png"/>" style="display: inline; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><fmt:message key="help.title.badge" /></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" href="<fmt:message key="help.link.getting-started.ab" />"><fmt:message key="help.text.getting-started" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.reference.ab" />"><fmt:message key="help.text.reference" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.tutorials.badge" />"><fmt:message key="help.text.tutorials" /></a></li>
                        <%--<li><a target="_blank" href="<fmt:message key="help.link.educator-resources.badge" />"><fmt:message key="help.text.educator-resources" /></a></li>--%>
                    </ul>
                </div>                
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#C4EDBF; border: 0.5px #A9DFA2 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/S3prod.png"/>" style="display: inline-block; height: 42px; width: 42px;"/>
                    </div> 
                    <h4 style="display: inline-block; padding-left: 5px;"><fmt:message key="help.title.s3" /></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" href="<fmt:message key="help.link.getting-started.s3" />"><fmt:message key="help.text.getting-started" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.reference.s3" />"><fmt:message key="help.text.reference" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.tutorials.s3" />"><fmt:message key="help.text.tutorials" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.contest-ideas" />"><fmt:message key="help.text.contest-ideas" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.educator-resources.s3" />"><fmt:message key="help.text.educator-resources" /></a></li>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div style="width:48px; height:48px; border-radius:24px; background-color:#CCECF9; border: 0.5px #AED6E8 solid; padding:3px; display: inline-block;">
                        <img src="<url:getCdnUrl url="/images/products/FLIPprod.png"/>" style="display: inline; height: 42px; width: 42px;"/>
                    </div>
                    <h4 style="display: inline-block; padding-left: 5px;"><fmt:message key="help.title.flip" /></h4>
                    <ul style="margin-left: 30px; padding-bottom: 10px">
                        <li><a target="_blank" href="<fmt:message key="help.link.getting-started.ab" />"><fmt:message key="help.text.getting-started" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.reference.ab" />"><fmt:message key="help.text.reference" /></a></li>
                        <li><a target="_blank" href="<fmt:message key="help.link.tutorials.flip" />"><fmt:message key="help.text.tutorials" /></a></li>
                        <%--<li><a target="_blank" href="<fmt:message key="help.link.educator-resources.badge" />"><fmt:message key="help.text.educator-resources" /></a></li>--%>
                    </ul>
                </div>
                <div class="col-sm-4">

                </div>                
            </div>        
        </div>

        <%--
            <div style="background-color: #f5f5f5; border: 0.5px #eee solid; border-radius: 10px; padding:4px;">
                <div style="width:48px; height:48px; border-radius:24px; background-color:#C4EDBF; border: 0.5px #A9DFA2 solid; padding:3px; display: inline-block;">
                    <img src="<url:getCdnUrl url="/images/products/S3prod.png"/>" style="display: inline; height: 42px; width: 42px;"/>
                </div>
            </div>
        --%>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>