/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var projectTable;
var saved = false;

var selectedProject = null;


$(document).ready(function() {
    $.cookie.json = true;
    // TODO check if logged in

    $.get('php/auth/user', function(data) {
        if (data.success) {
            $.cookie('user', data.user);
            showTable();
            $('#project-list').addClass('in').removeClass('hidden');
            $('#account-menu').removeClass('hidden');
        } else {
            $.removeCookie('user');
            $("#login-register").removeClass("hidden");
        }
    });

    $("#signin-form").submit(function(event) {
        event.preventDefault();

        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();

        $.post('php/auth/signin', {email: email, password: password}, function(data) {
            // console.log(data);
            if (data.success) {
                $.cookie('user', data.user);
                showTable();
                $('#project-list').removeClass('hidden');
                $('#login-register').collapse('hide');
                $('#account-menu').removeClass('hidden');
                //$('#login-register').collapse('show');
                $('#project-list').collapse('show');
                $('#login-wrong-credentials').addClass('hidden');
            } else {
                $("#loginEmail").addClass("has-error");
                $("#loginPassword").addClass("has-error");
                $('#login-wrong-credentials').removeClass('hidden');
            }
        });
    });

    $("#register-form").submit(function(event) {
        event.preventDefault();

        var email = $("#registerEmail").val();
        var screenname = $("#registerScreenname").val();
        var password = $("#registerPassword").val();
        var passwordConfirm = $("#registerPasswordConfirm").val();

        $.post('php/auth/register', {email: email, screenname: screenname, password: password, passwordConfirm: passwordConfirm}, function(data) {
            $(".form-group").removeClass("has-error");
            $(".icon").addClass("hidden");
            $(".message").remove();
            if (data.success) {
                $.cookie('user', data.user);
                showTable();
                $('#project-list').removeClass('hidden');
                $('#login-register').collapse('show');
                $('#project-list').collapse('hide');
                $('#account-menu').removeClass('hidden');
            } else {
                Object.keys(data['errors']).forEach(function(error_group) {
                    $("#register-group-" + error_group).addClass("has-error");
                    $("#register-group-" + error_group + " .icon").removeClass("hidden");
                    data['errors'][error_group].forEach(function(message) {
                        $("<span/>", {
                            class: "help-block message",
                            text: message
                        }).appendTo($("#register-group-" + error_group));
                    });
                });
            }
        });
    });

    $('#delete-project').on('click', function() {
        utils.confirm("Confirm delete", "Deleted projects can not be restored.<br/>Are you sure?", function(result) {
            if (result) {
                $.get('php/project/delete/' + selectedProject['id'], function(data) {
                    if (data.success) {
                        utils.showMessage("Project deleted", "Your project has been deleted");
                        $('#project-list').collapse('show');
                        $('#project-detail').collapse('hide');
                        projectTable.api().ajax.reload();
                    } else {
                        utils.showMessage("Project not deleted", "Your project was not deleted, reason:<br/>" + data.message);
                    }
                });
            }
        });
    });

    $('#back-to-list').on('click', function() {
        $('#project-list').collapse('show');
        $('#project-detail').collapse('hide');
        if (saved) {
            saved = false;
            projectTable.api().ajax.reload();
        }
    });

    $('#tag').tagsinput({
        typeahead: {
            'source': function(query) {
                return $.post('php/index.php/tag/index/', {query: query});
            }
        }
//        readonly: true
    });

    $('#log-off').on('click', function() {
        $.get('php/index.php/auth/logout', function(result) {
            if (result.success) {
                $.removeCookie('user');
                $('#account-menu').addClass('hidden');

                $('#login-register').collapse('show');
                if ($('#project-list').hasClass('in')) {
                    $('#project-list').collapse('hide');
                }
                if ($('#project-detail').hasClass('in')) {
                    $('#project-detail').collapse('hide');
                }
            }
        });
    });

    $('#name').on('click', function() {
        var projectName = $('#name').text();
        $('#name').text('');
        $('#name-input').val(projectName).removeClass('hidden').focus();
    }).tooltip();

    $('#name-input').keypress(function(e) {
        if (e.which === 13) {
            $('#name').text($('#name-input').addClass('hidden').val());
        }
    });

    $('#save-project').on('click', function() {
        selectedProject['name'] = $('#name').text();
        selectedProject['description'] = $('#description').val();

        selectedProject['tags'] = $('#tag').tagsinput('items');
        selectedProject['private'] = $('#private-project').is(':checked');
        selectedProject['shared'] = $('#shared-project').is(':checked');

        $.post('php/project/saveBaseData', selectedProject, function(data) {
            if (data.success) {
                utils.showMessage("Project saved", "Your project has been saved");
//                $('#project-list').collapse('show');
//                $('#project-detail').collapse('hide');
                saved = true;
//                projectTable.api().ajax.reload();
            } else {
                utils.showMessage("Project not saved", "Your project was not saved, reason:<br/>" + data.message);
            }
        });
    });
});

showTable = function() {
    if (!projectTable) {
        projectTable = $("#table-project-table").dataTable({
            "ajax": 'php/index.php/project/mine',
            "columns": [
                {
                    "data": "id",
                    "width": "40px"
                },
                {
                    "data": "type",
                    "width": "100px"
                },
                {
                    "data": "board",
                    "width": "200px"
                },
                {
                    "data": "name"
                }
            ],
            "columnDefs": [
                {
                    // The `data` parameter refers to the data for the cell (defined by the
                    // `data` option, which defaults to the column being worked with, in
                    // this case `data: 0`.
                    "render": function(data, type, row) {
                        //    return data +' ('+ row['name']+')';
                        var div = $('<div/>');
                        $('<button/>', {
                            text: 'View',
                            class: 'btn btn-xs btn-primary',
                            id: "btn-view-project-" + data
                        }).appendTo(div);
                        return div.html();
                    },
                    "targets": 0
                }
                // { "visible": false,  "targets": [ 3 ] }
            ],
            "createdRow": function(row, data, index) {
                $("#btn-view-project-" + data['id'], row).on('click', function() {
//                 alert(data.id);
                    showProject(data);
                });
            }
        });
//    $("#table-project").datatable({
//        perPage: 10,
//        url: 'php/index.php/project/mine',
//        title: 'Projects',
//        showPagination: true,
//        toggleColumns: false,
//        sectionHeader: '#projects-header',
//        columns: [
//            {
//                title: "",
//                sortable: true,
//                field: "id",
//                callback: function(data) {
//                    return $('<button/>', {
//                        text: 'View',
//                        class: 'btn btn-xs btn-primary',
//                        click: function() {
////                            alert(data.id);
//                            showProject(data);
//                        }
//                    });
//                },
//                css: {
//                    width: '58px'
//                }
//            },
//            {
//                title: "Type",
//                sortable: true,
//                field: "type",
//                filter: true,
//                css: {
//                    width: '100px'
//                }
//            },
//            {
//                title: "Board",
//                sortable: true,
//                field: "board",
//                css: {
//                    width: '200px'
//                }
//            },
//            {
//                title: "Name",
//                sortable: true,
//                field: "name"
//            }
//        ]
//    });
    } else {
        projectTable.api().ajax.reload();
    }
};

showProject = function(data) {
//    $('#project-dialog').modal('show');
    selectedProject = data;
    $('#type').text(data['type']);
    $('#board').text(data['board']);
    $('#name').text(data['name']);

    $('#description').text(data['description']);
//    var tags = [];
    $('#tag').tagsinput('removeAll');
    if (data['tags'] !== undefined) {
        for (var tag in data['tags']) {
//            tags.push(data['tags'][tag]['name']);
            $('#tag').tagsinput('add', data['tags'][tag]['name']);
        }
    }

    if (data['private']) {
        $('#private-project').attr('checked', 'checked');
    } else {
        $('#private-project').removeAttr('checked');
    }

    if (data['shared']) {
        $('#shared-project').attr('checked', 'checked');
    } else {
        $('#shared-project').removeAttr('checked');
    }

    $('#project-list').collapse('hide');
    $('#project-detail').collapse('show');

    var types = {
        'spin': 'blocklyspin.html',
        'prop-c': 'blocklyc.html',
        'scribbler': 'blocklyscribbler.html'
    };
    $('#open-project').attr('href', types[selectedProject['type']] + '?project=' + selectedProject['id']);

    var projectName = $('#name').text();
    if (projectName.length === 0) {
        $('#name-input').val(projectName).removeClass('hidden').focus();
    }
};
