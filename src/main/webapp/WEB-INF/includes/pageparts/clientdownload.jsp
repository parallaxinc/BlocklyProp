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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Client not running</h4>
            </div>
            <div class="modal-body">
                <p>How to start the client.</p>
                <div class="clients">
                    <div class="client MacOS">
                        <a href="${properties:downloadfiles('/blocklyprop-client-macos.zip')}">MacOS client</a>
                    </div>
                    <!--<div class="client Windows">
                        Windows 32bit client
                    </div>-->
                    <div class="client Windows">
                        <a href="${properties:downloadfiles('/blocklyprop-client-win64.zip')}">Windows 64bit client</a>
                    </div>
                    <!--    <div class="client Windows">
                            Windows service
                        </div>-->
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->