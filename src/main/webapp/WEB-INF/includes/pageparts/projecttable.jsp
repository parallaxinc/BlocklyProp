<%--
    Document   : projecttable
    Created on : 25-jul-2015, 18:22:28
    Author     : Michel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<table id="project-table" class="table">
    <tr id="page-loading-text"><td align="center">Loading...<br><img src="<url:getCdnUrl url="/images/please-wait.gif" />" width="100" height="100"/></td></tr>
</table>

<%--
<table id="project-table" class="table" data-toggle="table" data-url="<url:getUrl url="${param.url}"/>"  
       data-toolbar="#toolbar" data-search="false" data-side-pagination="server" data-pagination="true">
    <thead>
        <tr>
            <th data-field="board" data-sortable="false" data-formatter="formatType" data-width="30px" data-align="center">&nbsp;</th>
            <th data-field="name" data-sortable="true" data-formatter="formatProject"><fmt:message key="project.table.name" /></th>
            <th data-field="board" data-sortable="true" data-formatter="formatBoard"><fmt:message key="project.table.board" /></th>
            <th data-field="description" data-formatter="formatDescription" data-sortable="false"><fmt:message key="project.table.description" /></th>
                <c:if test="${param.showuser}">
                <th data-field="user" data-formatter="formatUser" data-sortable="true"><fmt:message key="project.table.user" /></th>
                </c:if>
        </tr>
    </thead>
</table>
--%>

<script>

    $(document).ready(function () {
        
        var projData = [];        
        $.getJSON('<url:getUrl url="${param.url}"/>', function(projects) {
            for (i = 0; i < projects.rows.length; i++) {
                projData.push([
                    boardIconUrls[projects.rows[i].board],
                    '<a href="#' + projects.rows[i].id + '">' + projects.rows[i].name + '</a>', 
                    formatBoard(projects.rows[i].board),
                    formatDescription(projects.rows[i].description),
                    '<a href="<url:getUrl url="/public/profile" />?id-user=' + projects.rows[i]['id-user'] + '">' + projects.rows[i].user + '</a>'
                ]);
            }            

            // TODO: add spinny image/icon...
            $('#page-loading-text').remove();

            $('#project-table').dataTable({
                data: projData,
                deferRender: true,
                scrollY: 300,
                scroller: {
                    loadingIndicator: true
                },
                columns: [
                    {title: " ", "orderable": false},
                    {title: "Name"},
                    {title: "Board"},
                    {title: "Description"},
                    {title: "User"}
                ]
            });
        });
    });
    

    var boardIconUrls = {
        "activity-board": '<img src="<url:getCdnUrl url="/images/board-icons/IconActivityBoard.png" />" />',
        "s3": '<img src="<url:getCdnUrl url="/images/board-icons/IconS3.png" />" />',
        "heb": '<img src="<url:getCdnUrl url="/images/board-icons/IconBadge.png" />" />',
        "heb-wx": '<img src="<url:getCdnUrl url="/images/board-icons/IconBadgeWX.png" />" />',
        "flip": '<img src="<url:getCdnUrl url="/images/board-icons/IconFlip.png" />" />',
        "propcfile": '<img src="<url:getCdnUrl url="/images/board-icons/IconC.png" />" />',
        "other": '<img src="<url:getCdnUrl url="/images/board-icons/IconOtherBoards.png" />" />'
    };

    var boards = {
        "activity-board": "<fmt:message key="project.board.activity-board" />",
        "s3": "<fmt:message key="project.board.s3" />",
        "heb": "<fmt:message key="project.board.heb" />",
        "heb-wx": "<fmt:message key="project.board.heb-wx" />",
        "flip": "<fmt:message key="project.board.flip" />",
        "propcfile": "<fmt:message key="project.board.propcfile" />",
        "other": "<fmt:message key="project.board.other" />"
    };

    function formatBoard(value) {
        var boardTranslation = boards[value];
        if (!boardTranslation) {
            boardTranslation = boards['other'];
        }
        return boardTranslation;
    }

    function formatDescription(value) {
        if (value) {
            if (value.length > 30) {
                return value.substring(0, 27) + '&hellip;';
            }
        }
        return value;
    }
</script>
