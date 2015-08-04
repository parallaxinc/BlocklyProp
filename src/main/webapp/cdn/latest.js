var projectTypes = {
    "PROPC": {
        "editor": "blocklyc.jsp",
        "class": "editor-c-link"
    },
    "SPIN": {
        "editor": "blocklyspin.jsp",
        "class": "editor-spin-link"
    }
};

$.get("rest/shared/project/list?order=desc&limit=5&offset=0", function(data) {
    $.each(data['rows'], function(index, project) {
        var projectItem = $("<li/>", {
            "class": "project"
        });
        $("<a/>", {
            "class": "editor-view-link " + projectTypes[project['type']]['class'],
            "href": "editor/" + projectTypes[project['type']]['editor'] + "?project=" + project['id'],
            "text": project['name']
        }).appendTo(projectItem);
        $(".latest-projects").append(projectItem);
    });
});

