<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link type="text/css" rel="stylesheet"
              href="<c:url value="/resources/style.css"/>" />
    </head>
    <body>

        <h2>Hello <shiro:principal/></h2>

        <shiro:guest>
            <p>Here are a few sample accounts to play with in the default
                text-based Realm (used for this demo and test installs only). Do you
                remember the movie these names came from? ;)</p>


            <style type="text/css">
                table.sample {
                    border-width: 1px;
                    border-style: outset;
                    border-color: blue;
                    border-collapse: separate;
                    background-color: rgb(255, 255, 240);
                }

                table.sample th {
                    border-width: 1px;
                    padding: 1px;
                    border-style: none;
                    border-color: blue;
                    background-color: rgb(255, 255, 240);
                }

                table.sample td {
                    border-width: 1px;
                    padding: 1px;
                    border-style: none;
                    border-color: blue;
                    background-color: rgb(255, 255, 240);
                }
            </style>


            <table class="sample">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>admin</td>
                        <td>123qwe</td>
                    </tr>
                    <tr>
                        <td>u1</td>
                        <td>123qwe</td>
                    </tr>
                    <tr>
                        <td>u2</td>
                        <td>123qwe</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
        </shiro:guest>



    </body>
</html>