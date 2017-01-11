<%--
    Document   : projecttable
    Created on : 25-jul-2015, 18:22:28
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<table id="project-table" class="table" data-toggle="table" data-url="<url:getUrl url="${param.url}"/>"  data-toolbar="#toolbar" data-search="false" data-side-pagination="server" data-pagination="true">
    <thead>
        <tr>
            <th data-field="type" data-sortable="true" data-formatter="formatType" data-width="30px" data-align="center">&nbsp;</th>
            <th data-field="name" data-sortable="true" data-formatter="formatProject"><fmt:message key="project.table.name" /></th>
            <th data-field="board" data-sortable="true" data-formatter="formatBoard"><fmt:message key="project.table.board" /></th>
            <th data-field="description" data-formatter="formatDescription"><fmt:message key="project.table.description" /></th>
                <c:if test="${param.showuser}">
                <th data-field="user" data-formatter="formatUser"><fmt:message key="project.table.user" /></th>
                </c:if>
        </tr>
    </thead>
</table>

<script>
    var languageUrls = {
        "PROPC": "<url:getCdnUrl url="/images/lang-icons/c.png" />",
        "SPIN": "<url:getCdnUrl url="/images/lang-icons/spin.png" />"
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
        return [
            "<a href='<url:getUrl url="/public/profile" />?id-user=",
            row['id-user'],
            "'>",
            value,
            "</a>"
        ].join('');
    }

    var boards = {
        "activity-board": "<fmt:message key="project.board.activity-board" />",
        "s3": "<fmt:message key="project.board.s3" />",
        "heb": "<fmt:message key="project.board.heb" />",
        "flip": "<fmt:message key="project.board.flip" />",
        "other": "<fmt:message key="project.board.other" />"
    };

    function formatBoard(value, row) {
        var boardTranslation = boards[value];
        if (!boardTranslation) {
            boardTranslation = boards['other'];
        }
        return boardTranslation;
    }

    function formatDescription(value, row) {
        if (value) {
            if (value.length > 30) {
                return value.substring(0, 27) + '&hellip;';
            }
        }
        return value;
    }
</script>
