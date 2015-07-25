$(document).ready(function() {
    if (window.location.hash && window.location.hash !== "#") {
        loadProject(window.location.hash.substr(1));
        $("#project-form-container").addClasss('in');
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
}