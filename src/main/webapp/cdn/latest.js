var projectTypes = {
    "PROPC": {
        "editor": "blocklyc.jsp",
        "class": "editor-c-link"
    },
    "SPIN": {
        "editor": "blocklyc.jsp",
        "class": "editor-c-link"
    }
};

var projectBoard = {
    "activity-board": "icon-board-ab",
    "s3": "icon-board-s3",
    "heb": "icon-board-heb",
    "flip": "icon-board-flip",
    "other": "icon-board-other",
    "propcfile": "icon-board-propc"
};

$.get("rest/shared/project/list?sort=modified&order=desc&limit=5&offset=0", function (data) {
    $.each(data['rows'], function (index, project) {
        console.log(project);
        var user = '';
        if (project['user']) {
            user = ' (' + project['user'] + ')';
        }
        var projectItem = $("<li/>", {
            "class": "project"
        });
        $("<a/>", {
            "class": "editor-view-link editor-icon " + projectBoard[project['board']],
            "href": "editor/" + projectTypes[project['type']]['editor'] + "?project=" + project['id'],
            "text": project['name'] + user
        }).appendTo(projectItem);
        $(".latest-projects").append(projectItem);
    });
});

