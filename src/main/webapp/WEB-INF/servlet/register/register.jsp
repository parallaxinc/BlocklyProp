<%--
    Document   : register
    Created on : 31-mei-2015, 18:41:02
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <link rel="stylesheet" href="<c:url value="/cdn/lib/bootstrap/core/css/bootstrap.min.css"/>" />
        <link type="text/css" rel="stylesheet" href="<c:url value="/cdn/style.css"/>" />
    </head>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">

                </div>
                <div class="col-md-6 col-sm-12">

                    <h2>Please regtister</h2>

                    <%
                        Boolean error = (Boolean) request.getAttribute("error");
                        if (error != null && error) {
                    %>
                    <div>A problem occured</div>
                    <%
                        }
                        Boolean emailAlreadyUsed = (Boolean) request.getAttribute("emailAlreadyUsed");
                        if (emailAlreadyUsed != null && emailAlreadyUsed) {
                    %>
                    <div>Email already used</div>
                    <%
                        }
                        Boolean passwordsDontMatch = (Boolean) request.getAttribute("passwordsDontMatch");
                        if (passwordsDontMatch != null && passwordsDontMatch) {
                    %>
                    <div>Passwords don't match</div>
                    <%
                        }
                    %>

                    <form name="registerForm" action="" method="post">
                        <table align="left" border="0" cellspacing="0" cellpadding="3">
                            <tr>
                                <td>Screenname:</td>
                                <td><input type="text" name="screenname" maxlength="255" value="<%= request.getAttribute("screenname")%>"></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td><input type="text" name="email" maxlength="255" value="<%= request.getAttribute("email")%>"></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type="password" name="password" maxlength="255"></td>
                            </tr>
                            <tr>
                                <td>Confirm password:</td>
                                <td><input type="password" name="confirmpassword" maxlength="255"></td>
                            </tr>
                            <tr>
                                <td colspan="2" align="right"><input type="submit" name="submit" value="Register"></td>
                            </tr>
                        </table>
                    </form>

                </div>
            </div>
        </div>

    </body>
</html>