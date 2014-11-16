/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var selectedProject = 0;

var projectTable;

$(document).ready(function() {
    $.cookie.json = true;
    // TODO check if logged in

    $.get('php/auth/user', function(data) {
        if (data.success) {
            $.cookie('user', data.user);
            $('#account-menu').removeClass('hidden');
        } else {
            $.removeCookie('user');
            $("#login-register").removeClass("hidden");
            $("#signin-menu").removeClass("hidden");
        }
    });
    
//    $("#table-project").datatable({
//        perPage: 10,
//        url: 'php/index.php/project/index',
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
    showTable();

    $('#open-project').on('click', function() {
//        alert('open project ' + selectedProject);
        var types = {
            'spin': 'blocklyspin.html',
            'prop-c': 'blocklyc.html',
            'scribbler': 'blocklyscribbler.html'
        };
        window.location.href = types[selectedProject['type']] + '?project=' + selectedProject['id'];
    });

    $('#back-to-list').on('click', function() {
        $('#project-list').collapse('show');
        $('#project-detail').collapse('hide');
    });

    $('#tag').tagsinput({
        typeahead: {
            'source': function(query) {
                return $.post('php/tag/index/', {query: query});
            }
        },
        readonly: true
    });
    
    $('#log-off').on('click', function() {
        $.get('php/auth/logout', function(result) {
            if (result.success) {
                $.removeCookie('user');
                $('#account-menu').addClass('hidden');
                $("#signin-menu").removeClass("hidden");
            }
        });
    });
});

showTable = function() {
    if (!projectTable) {
        projectTable = $("#table-project-table").dataTable({
            "ajax": 'php/project',
            "columns": [
                {
                    "data": "id",
                    "width": "40px"
                },
                {
                    "data": "by",
                    "width": "100px"
                },
                {
                    "data": "type",
                    "width": "100px"
                },
                {
                    "data": "board",
                    "width": "150px"
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

function showProject(data) {
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
//    console.log(tags);
//    $('#tag').val(tags);


    $('#project-list').collapse('hide');
    $('#project-detail').collapse('show');
    
    var types = {
        'spin': 'blocklyspin.html',
        'prop-c': 'blocklyc.html',
        'scribbler': 'blocklyscribbler.html'
    };
    $('#open-project').attr('href', types[selectedProject['type']] + '?project=' + selectedProject['id']);
}


