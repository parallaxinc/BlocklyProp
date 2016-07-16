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

var simplemde = null;

$(document).ready(function () {
    simplemde = new SimpleMDE({element: document.getElementById("project-form-description")});

    cloneUrl = $('.clone-project').data('href');
    deleteUrl = $('.delete-project').data('href');
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

    $('#project-form').ajaxForm({
        'beforeSerialize': function () {
            $("#project-form-description").val(simplemde.value());
            $("#project-form-description-html").val(simplemde.options.previewRender(simplemde.value()));
        },
        'success': function () {
            $(".project-changed:not(.hidden").remove();
            var projectChanged = $(".project-changed").clone().insertAfter(".project-changed");
            projectChanged.removeClass("hidden");
            projectChanged.delay(5000).fadeOut(400, function () {
                projectChanged.remove();
            });
        }
    });

    $("#project-delete").click(function (e) {
        e.preventDefault();
        $("#project-delete-confirm").modal('show');
    });

    $("#project-delete-confirmed").click(function () {
        window.location.href = $('.delete-project').attr('href');
    });
});

function showTable() {
    $("#project-table").bootstrapTable('refresh');
    $("#project-table-container").collapse('show');
    $("#project-form-container").collapse('hide');
}

function showProject(idProject) {
    // Clear form
    $(".sharing").removeProp('checked').parent().removeClass('active');
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
            $("#project-form-user").val(project['user']);
        }
        $("#project-form-id").val(project['id']);
        $("#project-form-name").val(project['name']);

        var boardTranslation = boards[project['board']];
        if (!boardTranslation) {
            boardTranslation = boards['other'];
        }
        $("#project-form-board").val(boardTranslation);
        simplemde.value(project['description']);
        $("#project-description-html").html(project['description-html']);
        if (project['private']) {
            $("#project-form-private").prop('checked', 'checked').parent().addClass('active');
        } else if (project['shared']) {
            $("#project-form-shared").prop('checked', 'checked').parent().addClass('active');
        } else {
            $("#project-form-friends").prop('checked', 'checked').parent().addClass('active');
        }


        var openProjectLink = $("a.open-project-link");
        openProjectLink.removeClass("editor-c-link editor-spin-link");
        openProjectLink.attr("href", baseUrl + "editor/" + projectTypes[project['type']]['editor'] + "?project=" + project['id']);
        $('.clone-project').attr('href', cloneUrl + project['id']);
        $('.delete-project').attr('href', deleteUrl + project['id']);
        openProjectLink.addClass(projectTypes[project['type']]['class']);
    });
}