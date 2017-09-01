<%--
    Document   : clientdownload
    Created on : 18-nov-2015, 20:36:43
    Author     : Michel
--%>

<%@ include file="/WEB-INF/includes/include.jsp"%>

<!-- MacOS client -->
<div class="client-instructions MacOS">
    <h4><fmt:message key="clientdownload.download.installer" /></h4>
</div>
<div class="client MacOS">
    <img src="<url:getCdnUrl url="/images/os-icons/mac_os.png"/>"/>
    <a href="${properties:downloadfiles('/BlocklyPropClient-setup-MacOS.pkg')}">
        <fmt:message key="clientdownload.client.macos.installer" /></a>
</div>

<!-- Windows clients -->
<div class="client-instructions Windows">
    <h4><fmt:message key="clientdownload.download.installer" /></h4>
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

<!-- ChromeOS client -->
<div class="client-instructions ChromeOS">
    <h4><fmt:message key="clientdownload.download.launcher" /></h4>
</div>
<div class="client ChromeOS">
    <img src="<url:getCdnUrl url="/images/os-icons/chrome_os.png"/>"/>
    <a href="https://chrome.google.com/webstore/detail/iddpgcclgepllhnhlkkinbmmafpbnddb" target="_blank">
        <fmt:message key="clientdownload.client.chromeos.installer" /></a>
</div>
