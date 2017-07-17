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
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-sm-12">

                    <%
                        String html = (String) request.getAttribute("html");
                        if (html != null) {
                    %>
                    <%= html%>
                    <% } else {%>
                    <p><fmt:message key="html.content_missing" /></p>
                    <% }%>

                </div>

                <div class="col-md-4 col-sm-12">
                    <div class="clients">
                        <div class="client MacOS">
                            <img src="<url:getCdnUrl url="/images/os-icons/mac_os.png"/>"/>
                            <a href="${properties:downloadfiles('/BlocklyPropClient-setup-MacOS.pkg')}">
                                <fmt:message key="clientdownload.client.macos.installer" /></a>
                        </div>
                        <div class="client Windows">
                            <img src="<url:getCdnUrl url="/images/os-icons/windows.png"/>"/>
                            <a href="${properties:downloadfiles('/BlocklyPropClient-setup-32.exe')}">
                                <fmt:message key="clientdownload.client.windows32.installer" /></a>
                        </div>

                        <div class="client Windows">
                            <img src="<url:getCdnUrl url="/images/os-icons/windows.png"/>"/>
                            <a href="${properties:downloadfiles('/BlocklyPropClient-setup-64.exe')}">
                                <fmt:message key="clientdownload.client.windows64.installer" /></a>
                        </div>

                        <div class="client ChromeOS" id="CrOS-link">
                            <img src="<url:getCdnUrl url="/images/os-icons/chrome_os.png"/>"/>
                            <button onclick="chrome.webstore.install()" id="install-buttons"><fmt:message key="clientdownload.client.chromeos.installer" /></button>
                            <script>
                            if (chrome.app.isInstalled) {
                              document.getElementById('install-buttons').style.display = 'none';
                              document.getElementById('CrOS-link').innerHTML = 
                                      '<img src="<url:getCdnUrl url="/images/os-icons/chrome_os.png"/>"/>' + 
                                      ' <fmt:message key="clientdownload.client.chromeos.alreadyinstalled" />';
                            }
                            </script>
                        </div>
                    </div>
                    <button class="btn btn-default show-all" onclick="$('body').addClass('all-clients');">
                        <fmt:message key="clientdownload.showall" /></button>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>