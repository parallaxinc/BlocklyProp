var baseUrl = $("meta[name=base]").attr("content");
var cloneUrl = '';
var deleteUrl = '';
var linkShareUrl = '';

var idProject = null;

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
    cloneUrl = $('.clone-project').data('href');
    deleteUrl = $('.delete-project').data('href');
    linkShareUrl = $('#project-link-share').data('href');
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
        $(".project-changed:not(.hidden").remove();
        var projectChanged = $(".project-changed").clone().insertAfter(".project-changed");
        projectChanged.removeClass("hidden");
        projectChanged.delay(5000).fadeOut(400, function () {
            projectChanged.remove();
        });
    });

    $("#project-delete").click(function (e) {
        e.preventDefault();
        $("#project-delete-confirm").modal('show');
    });

    $("#project-delete-confirmed").click(function () {
        window.location.href = $('.delete-project').attr('href');
    });

    $("#project-link-share-enable").click(function () {
        var linkShareInput = $("#project-link-share");
        if ($(this).prop('checked')) {
            linkShareInput.val(window.location.origin + linkShareUrl + idProject + "&key=" + guid());
            linkShareInput.focus();
            linkShareInput[0].setSelectionRange(0, linkShareInput.val().length);
            linkShareInput.tooltip();
            linkShareInput.tooltip('show');
        } else {
            linkShareInput.tooltip('destroy');
            linkShareInput.val('');
        }
    });

    $("#project-link-share").click(function () {
        var linkShareInput = $("#project-link-share");
        linkShareInput[0].setSelectionRange(0, linkShareInput.val().length);
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
    window.idProject = idProject;

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
        $("#project-form-description").val(project['description']);
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

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
}