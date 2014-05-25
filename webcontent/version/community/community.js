/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var selectedProject = 0;

$(document).ready(function() {
    $("#table-project").datatable({
        perPage: 10,
        url: 'php/index.php/project/index',
        title: 'Projects',
        showPagination: true,
        toggleColumns: false,
        columns: [
            {
                title: "",
                sortable: true,
                field: "id",
                callback: function(data) {
                    return $('<button/>', {
                        text: 'View',
                        class: 'btn btn-xs btn-primary',
                        click: function() {
//                            alert(data.id);
                            showProject(data);
                        }
                    });
                },
                css: {
                    width: '58px'
                }
            },
            {
                title: "Type",
                sortable: true,
                field: "type",
                filter: true,
                css: {
                    width: '100px'
                }
            },
            {
                title: "Board",
                sortable: true,
                field: "board",
                css: {
                    width: '200px'
                }
            },
            {
                title: "Name",
                sortable: true,
                field: "name"
            }
        ]
    });

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
                return $.post('php/index.php/tag/index/', {query: query});
            }
        },
        readonly: true
    });
});

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
}


