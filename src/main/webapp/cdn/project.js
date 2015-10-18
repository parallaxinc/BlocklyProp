var baseUrl = $("meta[name=base]").attr("content");
var cloneUrl = '';
var deleteUrl = '';

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

$(document).ready(function () {
    cloneUrl = $('.clone-project').attr('href');
    deleteUrl = $('.delete-project').attr('href');
    if (window.location.hash && window.location.hash !== "#") {
        loadProject(window.location.hash.substr(1));
        $("#project-form-container").addClass('in');
    } else {
        $("#project-table-container").addClass('in');
    }

    $(window).on('hashchange', function () {
        if (window.location.hash && window.location.hash !== "#") {
            showProject(window.location.hash.substr(1));
        } else {
            showTable();
        }
    });

    $('#project-form').ajaxForm(function () {
        alert("Thank you for your comment!");
    });
});

function showTable() {
    $("#project-table").bootstrapTable('refresh');
    $("#project-table-container").collapse('show');
    $("#project-form-container").collapse('hide');
}

function showProject(idProject) {
    // Clear form
    $('.your-project').addClass('hidden');
    $('.not-your-project').addClass('hidden');

    loadProject(idProject);
    $("#project-table-container").collapse('hide');
    $("#project-form-container").collapse('show');
}

function loadProject(idProject) {
    // Get details
    $.get(baseUrl + "rest/shared/project/get/" + idProject, function (project) {
        if (project['yours']) {
            $('.your-project').removeClass('hidden');
        } else {
            $('.not-your-project').removeClass('hidden');
        }
        $("#project-form-id").val(project['id']);
        $("#project-form-name").val(project['name']);
        $("#project-form-description").val(project['description']);
        $("#project-form-private").prop('checked', project['private']);
        $("#project-form-shared").prop('checked', project['shared']);
        var openProjectLink = $("a.open-project-link");
        openProjectLink.removeClass("editor-c-link editor-spin-link");
        openProjectLink.attr("href", baseUrl + "editor/" + projectTypes[project['type']]['editor'] + "?project=" + project['id']);
        $('.clone-project').attr('href', cloneUrl + project['id']);
        $('.delete-project').attr('href', deleteUrl + project['id']);
        openProjectLink.addClass(projectTypes[project['type']]['class']);
    });
}