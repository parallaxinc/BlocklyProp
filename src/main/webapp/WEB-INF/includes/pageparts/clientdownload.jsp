<%--
    Document   : clientdownload
    Created on : 18-nov-2015, 20:36:43
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<div class="modal fade" id="client-download-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"><fmt:message key="editor.client.title" /></h4>
            </div>
            <div class="modal-body">
                <div id="client-instructions" data-url="<url:getUrl url="/public/clientinstructions"/>"></div>
                <div class="clients">
                    <div class="client MacOS">
                        <img src="<url:getCdnUrl url="/images/os-icons/mac_os.png"/>"/>
                        <a href="${properties:downloadfiles('/BlocklyPropClient-setup-MacOS.pkg')}">
                            <fmt:message key="clientdownload.client.macos.installer" /></a>
                    </div>
                    <!-- Windows 32bit client -->
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
                    <!-- Chrome OS client -->
                    <div class="client ChromeOS">
                        <img src="<url:getCdnUrl url="/images/os-icons/chrome_os.png"/>"/>
                        <a onclick="chrome.webstore.install()" id="install-button"><fmt:message key="clientdownload.client.chromeos.installer" /></a>
                        <script>
                        if (chrome.app.isInstalled) {
                          document.getElementById('install-button').innherHTML = '<fmt:message key="clientdownload.client.chromeos.alreadyinstalled" />';
                        }
                        </script>
                    </div>

                    <%--
                        <div class="client Windows">
                            Windows service
                        </div>
                    --%>
                </div>
                <button class="btn btn-default show-all" onclick="$('body').addClass('all-clients');">
                    <fmt:message key="clientdownload.showall" /></button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->