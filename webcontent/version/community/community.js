/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
                        class: 'btn btn-xs btn-default',
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
});

function showProject(data) {
    console.log(data);
    $('#project-dialog').modal('show');
    $('#type').text(data['type']);
    $('#board').text(data['board']);
    $('#name').text(data['name']);
    $('#description').text(data['description']);
}