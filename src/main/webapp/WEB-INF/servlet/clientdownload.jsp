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
        <link href="<url:getCdnUrl url="/style-clientdownload.css"/>" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="<url:getCdnUrl url="/detect.js"/>"></script>
    </head>
    <body>

        <%@ include file="/WEB-INF/includes/pageparts/menu.jsp"%>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2><fmt:message key="clientdownload.title" /></h2>

                    <div class="dropdown">
                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            <fmt:message key="clientdownload.os.menu" />
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#" onmouseup="showOS('Windows');">Windows</a></li>
                            <li><a href="#" onmouseup="showOS('MacOS');">Mac OS</a></li>
                            <li><a href="#" onmouseup="showOS('ChromeOS');">Chrome OS</a></li>
                            <!-- <li><a href="#" onmouseup="showOS('Linux');">Linux</a></li> -->
                        </ul>
                    </div>
                    <%--
                    <button class="btn btn-default show-all" onclick="$('body').addClass('all-clients');">
                        <fmt:message key="clientdownload.showall" /></button>
                    --%>  
                </div>
            </div>

            <script>
                function showOS(o) {
                    $("body").removeClass('Windows')
                            .removeClass('MacOS')
                            .removeClass('Linux')
                            .removeClass('ChromeOS');
                    $("body").addClass(o);
                }
            </script>

            <div class="clients">
                <div class="row">
                    <div class="col-sm-7">
                        <%@ include file="/WEB-INF/includes/pageparts/clientinstructions.jsp"%> 
                    </div>

                    <div class="col-sm-5">
                        <%@ include file="/WEB-INF/includes/pageparts/clientdownload.jsp"%> 
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

</body>
</html>