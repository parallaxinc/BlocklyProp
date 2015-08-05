var baseUrl = $("meta[name=base]").attr("content");

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

$(document).ready(function() {
    if (window.location.hash && window.location.hash !== "#") {
        loadProject(window.location.hash.substr(1));
        $("#project-form-container").addClass('in');
    } else {
        $("#project-table-container").addClass('in');
    }

    $(window).on('hashchange', function() {
        if (window.location.hash && window.location.hash !== "#") {
            showProject(window.location.hash.substr(1));
        } else {
            showTable();
        }
    });
});

function showTable() {
    $("#project-table").bootstrapTable('refresh');
    $("#project-table-container").collapse('show');
    $("#project-form-container").collapse('hide');
}

function showProject(idProject) {
    // Clear form
    loadProject(idProject);
    $("#project-table-container").collapse('hide');
    $("#project-form-container").collapse('show');
}

function loadProject(idProject) {
    // Get details
    $.get(baseUrl + "rest/shared/project/get/" + idProject, function(project) {
        $("#project-form-name").val(project['name']);
        $("#project-form-description").val(project['description']);
        var openProjectLink = $("a.open-project-link");
        openProjectLink.removeClass("editor-c-link editor-spin-link");
        openProjectLink.attr("href", baseUrl + "editor/" + projectTypes[project['type']]['editor'] + "?project=" + project['id']);
        openProjectLink.addClass(projectTypes[project['type']]['class']);
    });
}