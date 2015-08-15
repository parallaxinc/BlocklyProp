<%--
    Document   : login
    Created on : 24-mei-2015, 18:41:02
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
                <div class="col-md-12 col-sm-12">
                    <a href="<c:url value="/logout"/>">Logout</a>
                    <h2>Profile</h2>
                    <%
                        String errorDescription = (String) request.getAttribute("error");
                        if (errorDescription != null) {
                    %>
                    <div class="bg-danger"><p><%= errorDescription%></p></div>
                            <%
                                }
                            %>
                    <form name="baseInfoForm" method="post">
                        <div class="form-group">
                            <label for="email" >Email:</label>
                            <input class="form-control" type="text" name="email" maxlength="255" required="required" disabled="disabled" value="<%= request.getAttribute("email")%>"/>
                        </div>
                        <div class="form-group">
                            <label for="screenname" >Screenname:</label>
                            <input class="form-control" type="text" name="screenname" maxlength="255" required="required" value="<%= request.getAttribute("screenname")%>"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-base" value="Confirm">
                    </form>
                    <%
                        String passwordSuccessDescription = (String) request.getAttribute("password-success");
                        if (passwordSuccessDescription != null) {
                    %>
                    <div class="bg-success"><p><%= passwordSuccessDescription%></p></div>
                            <%
                                }

                                String passwordErrorDescription = (String) request.getAttribute("password-error");
                                if (passwordErrorDescription != null) {
                            %>
                    <div class="bg-danger"><p><%= passwordErrorDescription%></p></div>
                            <%
                                }
                            %>
                    <form name="passwordForm" method="post">
                        <div class="form-group">
                            <label for="oldpassword" >Old Password:</label>
                            <input class="form-control" type="password" name="oldpassword" maxlength="255" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="password" >Password:</label>
                            <input class="form-control" type="password" name="password" maxlength="255" required="required"/>
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" >Confirm password:</label>
                            <input class="form-control" type="password" name="confirmpassword" maxlength="255" required="required"/>
                        </div>
                        <input class="btn btn-default" type="submit" name="save-password" value="Change password">
                    </form>
                    <p><a href="index.jsp">Go to home</a></p>
                </div>
            </div>
        </div>

    </body>
</html>