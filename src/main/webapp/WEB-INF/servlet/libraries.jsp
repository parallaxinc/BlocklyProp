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
                    <h2><fmt:message key="libraries.title" /></h2>
                    <p><fmt:message key="libraries.header" /></p>
                    <h3><fmt:message key="libraries.server" /></h3>
                    <a href="https://commons.apache.org/proper/commons-configuration/ ">Apache Commons Configuration</a>&nbsp;-&nbsp;configuration framework<br>
                    <a href="https://commons.apache.org/proper/commons-collections/ ">Apache Commons Collections</a>&nbsp;-&nbsp;collection utilities<br>
                    <a href="https://commons.apache.org/proper/commons-dbcp/ ">Apache Commons DBCP</a>&nbsp;-&nbsp;database connection utilities<br>
                    <a href="https://commons.apache.org/proper/commons-pool/ ">Apache Commons Pool</a>&nbsp;-&nbsp;database connection pooling<br>
                    <a href="https://commons.apache.org/proper/commons-io/ ">Apache Commons IO</a>&nbsp;-&nbsp;IO utility framework<br>
                    <a href="http://www.cuubez.com/ ">Cuubez</a>&nbsp;-&nbsp;Rest API visualizer<br>
                    <a href="https://github.com/google/gson ">Gson</a>&nbsp;-&nbsp;JSON serializer<br>
                    <a href="https://code.google.com/p/guava-libraries/ ">Guava</a>&nbsp;-&nbsp;utilities<br>
                    <a href="https://github.com/google/guice ">Guice</a>&nbsp;-&nbsp;dependency injection<br>
                    <a href="http://lucene.apache.org/ ">Lucene</a>&nbsp;-&nbsp;full text search engine<br>
                    <a href="https://dev.mysql.com/downloads/connector/j/">MySql connector</a>&nbsp;-&nbsp;database connection utility<br>
                    <a href="https://github.com/FasterXML/jackson ">Jackson</a>&nbsp;-&nbsp;JSON parser<br>
                    <a href="https://jersey.java.net/ ">Jersey</a>&nbsp;-&nbsp;RESTful Web Services<br>
                    <a href="http://www.jooq.org/ ">jOOQ</a>&nbsp;-&nbsp;ORM library<br>
                    <a href="http://jsoup.org/ ">jsoup</a>&nbsp;-&nbsp;HTML parser<br>
                    <a href="http://shiro.apache.org/ ">Shiro</a>&nbsp;-&nbsp;security framework<br>
                    <a href="https://java.net/projects/textile-j ">Textile-J</a>&nbsp;-&nbsp;markup notation library<br>
                    <h3><fmt:message key="libraries.browser" /></h3>
                    <a href="https://ace.c9.io/#nav=about ">Ace</a>&nbsp;-&nbsp;in-browser code editor<br>
                    <a href="https://developers.google.com/blockly/?hl=en">Blockly</a>&nbsp;-&nbsp;visual programming language<br>
                    <a href="http://getbootstrap.com/">Bootstrap</a>&nbsp;-&nbsp;UI framework<br>
                    <a href="https://jquery.com/">jQuery</a>&nbsp;-&nbsp;javascript framework<br>
                    <a href="http://malsup.com/jquery/form/">jQuery Form Plugin</a><br>
                    <a href="http://jqueryvalidation.org/">jQuery Validation Plugin</a><br>
                </div>
            </div>
        </div>

        <%@ include file="/WEB-INF/includes/pageparts/footer.jsp"%>

    </body>
</html>