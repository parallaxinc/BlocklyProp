<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="include.jsp"%>

<html>
    <head>
        <link type="text/css" rel="stylesheet"
              href="<c:url value="/style.css"/>" />
    </head>
    <body>

        <h2>Please Log in</h2>
        <%
            String errorDescription = (String) request.getAttribute("shiroLoginFailure");
            if (errorDescription != null) {
        %>
        Login attempt was unsuccessful: <%=errorDescription%>
        <%
            }
        %>
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

        <form name="loginform" action="" method="post">
            <table align="left" border="0" cellspacing="0" cellpadding="3">
                <tr>
                    <td>Username:</td>
                    <td><input type="text" name="username" maxlength="30"></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="password" name="password" maxlength="30"></td>
                </tr>
                <tr>
                    <td colspan="2" align="left"><input type="checkbox"
                                                        name="rememberMe"><font size="2">Remember Me</font></td>
                </tr>
                <tr>
                    <td colspan="2" align="right"><input type="submit"
                                                         name="submit" value="Login"></td>
                </tr>
            </table>
        </form>

    </body>
</html>