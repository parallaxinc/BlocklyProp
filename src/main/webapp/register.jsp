<%--
    Document   : register
    Created on : 31-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="include.jsp"%>

<html>
    <head>
        <link type="text/css" rel="stylesheet"
              href="<c:url value="/login.css"/>" />
    </head>
    <body>

        <h2>Please regtister</h2>


        <form name="registerForm" action="" method="post">
            <table align="left" border="0" cellspacing="0" cellpadding="3">
                <tr>
                    <td>Screenname:</td>
                    <td><input type="text" name="screenname" maxlength="50"></td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td><input type="text" name="email" maxlength="255"></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="password" name="password" maxlength="30"></td>
                </tr>
                <tr>
                    <td>Confirm password:</td>
                    <td><input type="confirmpassword" name="confirmpassword" maxlength="30"></td>
                </tr>
                <tr>
                    <td colspan="2" align="right"><input type="submit"
                                                         name="submit" value="Register"></td>
                </tr>
            </table>
        </form>

        <a href="register.jsp" >Register now!</a>

    </body>
</html>