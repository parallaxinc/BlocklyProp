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
        "editor": "blocklyc.jsp",
        "class": "editor-c-link"
    }
};

var simplemde = null;

$(document).ready(function () {
    simplemde = new SimpleMDE({element: document.getElementById("project-form-description"), hideIcons: ["link"], spellChecker: false});

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

    $("#project-link-share-enable").click(function () {
        var linkShareInput = $("#project-link-share");
        if ($(this).prop('checked')) {
            $.post(baseUrl + "projectlink", {'id': idProject, 'action': 'share'}, function (response) {
                if (response['success']) {
                    linkShareInput.val(window.location.origin + linkShareUrl + idProject + "&key=" + response['share-key']);
                    linkShareInput.focus();
                    linkShareInput[0].setSelectionRange(0, linkShareInput.val().length);
                    linkShareInput.tooltip();
                    linkShareInput.tooltip('show');

                    $('.not-shared-project').addClass('hidden');
                    $('.shared-project').removeClass('hidden');
                }
            });


        } else {
            $.post(baseUrl + "projectlink", {'id': idProject, 'action': 'revoke'}, function (response) {
                if (response['success']) {
                    linkShareInput.tooltip('destroy');
                    linkShareInput.val('');

                    $('.not-shared-project').removeClass('hidden');
                    $('.shared-project').addClass('hidden');
                }
            });
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
    $('.not-shared-project').addClass('hidden');
    $('.shared-project').addClass('hidden');

    loadProject(idProject);
    $("#project-table-container").collapse('hide');
    $("#project-form-container").collapse('show');
}

function loadProject(idProject) {
    window.idProject = idProject;

    var linkShareInput = $("#project-link-share");
    linkShareInput.tooltip('destroy');
    linkShareInput.val('');
    $("#project-link-share-enable").prop('checked', false);

    // Get details
    $.get(baseUrl + "rest/shared/project/get/" + idProject, function (project) {
        if (project['yours']) {
            $('.your-project').removeClass('hidden');

            if (project['share-key']) {
                $("#project-link-share-enable").prop('checked', true);
                linkShareInput.val(window.location.origin + linkShareUrl + idProject + "&key=" + project['share-key']);
                linkShareInput.tooltip();

                $('.shared-project').removeClass('hidden');
            } else {
                $('.not-shared-project').removeClass('hidden');
            }
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
        $("#project-form-created").val(project['created']);
        $("#project-form-modified").val(project['modified']);
        simplemde.value(project['description']);
        $("#project-description-html").html(project['description-html']);
        if (project['private']) {
            $("#project-form-private").prop('checked', 'checked').parent().addClass('active');
        } else if (project['shared']) {
            $("#project-form-shared").prop('checked', 'checked').parent().addClass('active');
        } else {
            $("#project-form-private").prop('checked', 'checked').parent().addClass('active');
            //$("#project-form-friends").prop('checked', 'checked').parent().addClass('active');
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