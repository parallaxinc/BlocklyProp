<%--
    Document   : projecttable
    Created on : 25-jul-2015, 18:22:28
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<table id="project-table" class="table" data-toggle="table" data-url="<url:getUrl url="${param.url}"/>"  data-toolbar="#toolbar" data-search="true" data-side-pagination="server" data-pagination="true" data-search="true">
    <thead>
        <tr>
            <th data-field="type" data-formatter="formatType" data-width="30px" data-align="center"></th>
            <th data-field="name" data-formatter="formatProject"><fmt:message key="project.table.name" /></th>
            <th data-field="description"><fmt:message key="project.table.description" /></th>
                <c:if test="${param.showuser}">
                <th data-field="user" data-formatter="formatUser"><fmt:message key="project.table.user" /></th>
                </c:if>
        </tr>
    </thead>
</table>

<script>
    var languageUrls = {
        "PROPC": "<url:getUrl url="/cdn/images/lang-icons/c.png" />",
        "SPIN": "<url:getUrl url="/cdn/images/lang-icons/spin.png" />"
    };

    function formatType(value, row) {
        return '<img src="' + languageUrls[value] + '" />';
    }

    function formatProject(value, row) {
        return [
            "<a href='#",
            row['id'],
            "'>",
            value,
            "</a>"
        ].join('');
    }

    function formatUser(value, row) {
        if (row['yours']) {
            return '<fmt:message key="project.yours" />';
        }
        return value;
    }
</script>