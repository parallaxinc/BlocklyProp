<%--
    Document   : license
    Created on : 2017-08-30
    Author     : MattM
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

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2><fmt:message key="license.title" /></h2>
                    <p><fmt:message key="license.type" /></p>
                    <p><fmt:message key="license.copyright.head" /> <span id="year"></span><fmt:message key="license.copyright.owner" /></p>
                    <p><fmt:message key="license.text.part1" /></p>
                    <p><fmt:message key="license.text.part2" /></p>
                    <p><fmt:message key="license.warranty" /></p>
                    
                    <script>
                        document.getElementById("year").innerHTML = new Date().getFullYear();
                    </script>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>