<%--
    Document   : clientdownload
    Created on : 18-nov-2015, 20:36:43
    Author     : Michel
--%>

<%@ include file="/WEB-INF/includes/include.jsp"%>

                    <!-- MacOS instructions -->
                    <div class="client-instructions MacOS">
                        <h4><fmt:message key="client.macOS.run.title" /></h4>
                        <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                            <div id="mac1">
                                <p><fmt:message key="client.macOS.run.instructions1" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/mac_os1.png"/>"/></div>
                            </div>
                            <div id="mac2" class="hidden">
                                <p><fmt:message key="client.macOS.run.instructions2" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/mac_os2.png"/>"/></div>
                            </div>
                            <div id="mac3" class="hidden">
                                <p><fmt:message key="client.macOS.run.instructions3" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/mac_os3.png"/>"/></div>
                            </div>
                            <div id="mac4" class="hidden">
                                <p><fmt:message key="client.run.instructions2" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/usbok.png"/>"/></div>
                            </div>
                        </div>
                        <div style="padding-top:10px;">
                            <a id="mac1-btn" class="btn btn-sm btn-primary" onclick="showStep('mac', 1, 4);"><fmt:message key="client.run.step1" /></a>
                            <a id="mac2-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 2, 4);"><fmt:message key="client.run.step2" /></a>
                            <a id="mac3-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 3, 4);"><fmt:message key="client.run.step3" /></a>
                            <a id="mac4-btn" class="btn btn-sm btn-default" onclick="showStep('mac', 4, 4);"><fmt:message key="client.run.step4" /></a>
                        </div>
                    </div>

                    <!-- Windows instructions -->
                    <div class="client-instructions Windows">
                        <h4><fmt:message key="client.windows.run.title" /></h4>
                        <div style="background:#f5f5f5; border-radius:6px; height:250px; padding:6px;">
                            <div id="win1">
                                <p><fmt:message key="client.windows.run.instructions1" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/windows1.png"/>"/></div>
                            </div>
                            <div id="win2" class="hidden">
                                <p><fmt:message key="client.windows.run.instructions2" /></p>
                                <p><fmt:message key="client.windows.run.instructions3" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/windows2.png"/>"/></div>
                            </div>
                            <div id="win3" class="hidden">
                                <p><fmt:message key="client.run.instructions2" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/usbok.png"/>"/></div>
                            </div>
                        </div>
                        <div style="padding-top:10px;">
                            <a id="win1-btn" class="btn btn-sm btn-primary" onclick="showStep('win', 1, 3);"><fmt:message key="client.run.step1" /></a>
                            <a id="win2-btn" class="btn btn-sm btn-default" onclick="showStep('win', 2, 3);"><fmt:message key="client.run.step2" /></a>
                            <a id="win3-btn" class="btn btn-sm btn-default" onclick="showStep('win', 3, 3);"><fmt:message key="client.run.step3" /></a>
                        </div>
                    </div>

                    <!-- Chrome OS instructions -->
                    <div class="client-instructions ChromeOS">
                        <h4><fmt:message key="client.windows.run.title" /></h4>
                        <div style="background:#f5f5f5; border-radius:6px; height:220px; padding:6px;">
                            <div id="chr1">
                                <p><fmt:message key="client.chrome.run.instructions1" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/chrome1.png"/>"/></div>
                            </div>
                            <div id="chr2" class="hidden">
                                <p><fmt:message key="client.chrome.run.instructions2" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/chrome2.png"/>"/></div>
                            </div>
                            <div id="chr3" class="hidden">
                                <p><fmt:message key="client.run.instructions2" /></p>
                                <div align="center"><img src="<url:getCdnUrl url="/images/client-run/usbok.png"/>"/></div>
                            </div>
                        </div>
                        <div style="padding-top:10px;">
                            <a id="chr1-btn" class="btn btn-sm btn-primary" onclick="showStep('chr', 1, 3);"><fmt:message key="client.run.step1" /></a>
                            <a id="chr2-btn" class="btn btn-sm btn-default" onclick="showStep('chr', 2, 3);"><fmt:message key="client.run.step2" /></a>
                            <a id="chr3-btn" class="btn btn-sm btn-default" onclick="showStep('chr', 3, 3);"><fmt:message key="client.run.step3" /></a>
                        </div>
                    </div>

                    <!-- script for showing each step -->
                    <script>
                        function showStep(o, i, t) {
                            for (var j = 1; j <= t; j++) {
                                $('#' + o + j.toString() + '-btn').addClass('btn-default').removeClass('btn-primary');
                                $('#' + o + j.toString()).addClass('hidden');
                            }
                            $('#' + o + i.toString() + '-btn').removeClass('btn-default').addClass('btn-primary');
                            $('#' + o + i.toString()).removeClass('hidden');
                        }
                    </script>