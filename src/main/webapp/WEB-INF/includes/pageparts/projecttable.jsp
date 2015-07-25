<%--
    Document   : projecttable
    Created on : 25-jul-2015, 18:22:28
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<table id="project-table" class="table" data-toggle="table" data-url="<c:url value="${param.url}"/>"  data-toolbar="#toolbar" data-search="true" data-side-pagination="server" data-pagination=true" data-search="true">
    <thead>
        <tr>
            <th data-field="name" data-formatter="formatProject">Name</th>
            <th data-field="description">Description</th>
            <th data-field="type">Type</th>
        </tr>
    </thead>
</table>

<script>
    function formatProject(value, row) {
        return [
            "<a href='#",
            row['id'],
            "'>",
            value,
            "</a>"
        ].join('');
    }
</script>