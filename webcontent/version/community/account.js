/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var friendsTable;
var requestsTable;
var selectedProject;
var usersTable;

$(document).ready(function() {
    $.cookie.json = true;

    $.get('php/auth/user', function(data) {
        if (data.success) {
            $.cookie('user', data.user);
            $('#account-data').addClass('in').removeClass('hidden');
            $('#friends-list').addClass('in').removeClass('hidden');
            $('#request-list').addClass('in').removeClass('hidden');
            $('#user-list').addClass('in').removeClass('hidden');
            $('#account-menu').removeClass('hidden');
            showFriendsTable();
            showRequestsTable2();
            showUsers();
          
            $("#changeEmail").val($.cookie('user')['email']);
            $("#changeScreenname").val($.cookie('user')['screenname']);
        } else {
            $.removeCookie('user');
            $("#login-register").addClass('in').removeClass("hidden");
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
                $('#account-data').removeClass('hidden');
                $('#login-register').collapse('hide');
                $('#account-menu').removeClass('hidden');
                //$('#login-register').collapse('show');
                $('#account-data').collapse('show');
            } else {

            }
        });
    });

    $("#register-form").submit(function(event) {
        event.preventDefault();

        var email = $("#registerEmail").val();
        var screenname = $("#registerScreenname").val();
        var password = $("#registerPassword").val();
        var passwordConfirm = $("#registerPasswordConfirum").val();

        $.post('/php/auth/register', {email: email, screenname: screenname, password: password, passwordConfirm: passwordConfirm}, function(data) {
            $(".form-group").removeClass("has-error");
            $(".icon").addClass("hidden");
            $(".message").remove();
            if (data.success) {
                $.cookie('user', data.user);
                $('#account-data').removeClass('hidden');
                $('#login-register').collapse('hide');
                $('#account-data').collapse('show');
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

    $('#back-to-friends-list').on('click', function() {
        $('#friends-list').collapse('show');
        $('#friends-detail').collapse('hide');
        $('#user-list').collapse('hide');
    });
                  
    $('#back-to-request-list').on('click', function() {
        $('#request-list').collapse('show');
        $('#user-list').collapse('show');
        $('#request-detail').collapse('hide');
    });

    $('#log-off').on('click', function() {
        $.get('php/index.php/auth/logout', function(result) {
            if (result.success) {
                $.removeCookie('user');
                $('#account-menu').addClass('hidden');
                $("#login-register").removeClass("hidden");

                $('#login-register').collapse('show');
                if ($('#account-data').hasClass('in')) {
                    $('#account-data').collapse('hide');
                }
            }
        });
    });
    
    $("#account-data-form").submit(function(event) {
        event.preventDefault();

        var email = $("#changeEmail").val();
        var screenname = $("#changeScreenname").val();
        var oldPassword = $("#changeOldPassword").val();
        var password = $("#changePassword").val();
        var passwordConfirm = $("#changePasswordConfirum").val();

        $.post('php/auth/change', {email: email, screenname: screenname, oldPassword: oldPassword, password: password, passwordConfirm: passwordConfirm}, function(data) {
            $(".form-group").removeClass("has-error");
            $(".icon").addClass("hidden");
            $(".message").remove();
            if (data.success) {
                $.cookie('user', data.user);
                $('#account-data-form').collapse('hide');
                $('#account-change-confirm').collapse('show');
            } else {
                Object.keys(data['errors']).forEach(function(error_group) {
                    $("#change-group-" + error_group).addClass("has-error");
                    $("#change-group-" + error_group + " .icon").removeClass("hidden");
                    data['errors'][error_group].forEach(function(message) {
                        $("<span/>", {
                            class: "help-block message",
                            text: message
                        }).appendTo($("#change-group-" + error_group));
                    });
                });
            }
        });
    });
});

showFriendsTable = function() {
    if (!friendsTable) {
        friendsTable = $("#table-friends-table").dataTable({
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
                                  id: "btn-view-friend-" + data
                                }).appendTo(div);
                                return div.html();
                            },
                            "targets": 0
                          }
                          // { "visible": false,  "targets": [ 3 ] }
           ],
           "createdRow": function(row, data, index) {
                $("#btn-view-friend-" + data['id'], row).on('click', function() {
                    //                 alert(data.id);
                    //showFriend( data );
                });
           }
        });
    } else {
        friendsTable.api().ajax.reload();
    }
};

showRequestsTable2 = function() {
    if (!requestsTable) {
        requestsTable = $("#table-requests-table").dataTable({
            "ajax": 'php/index.php/friend/myFriends',
            "columns": [
                {
                    "data": "your_friend",
                    "width": "200px"
                },
                {
                    "data": "friends_since",
                    "width": "100px"
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
                            id: "btn-view-request-" + data
                        }).appendTo(div);
                        return div.html();
                    },
                    "targets": 0
                }
                // { "visible": false,  "targets": [ 3 ] }
            ],
            "createdRow": function(row, data, index) {
                $("#btn-view-request-" + data['id'], row).on('click', function() {
                    //                 alert(data.id);
                    //showRequest( data );
                });
            }
        });
    } else {
        requestsTable.api().ajax.reload();
    }
};

showUsers = function() {
    if (!usersTable) {
        usersTable = $("#table-user-table").dataTable({
            "ajax": 'php/index.php/friend/myFriends',
            "columns": [
                {
                    "data": "your_friend",
                    "width": "200px"
                },
                {
                    "data": "friends_since",
                    "width": "100px"
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
                            text: 'Send Request',
                            class: 'btn btn-xs btn-primary',
                            id: "btn-send-request-" + data
                        }).appendTo(div);
                        return div.html();
                    },
                    "targets": 0
                }
                // { "visible": false,  "targets": [ 3 ] }
            ],
            "createdRow": function(row, data, index) {
                $("#btn-send-request-" + data['id'], row).on('click', function() {
                    //                 alert(data.id);
                    //showUser( data );
                });
            }
        });
    } else {
        usersTable.api().ajax.reload();
    }
};

showFriend = function(data) {
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
    
    $('#friends-list').collapse('hide');
    $('#friends-detail').collapse('show');
    
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

showRequest = function(data) {
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
    
    $('#request-list').collapse('hide');
    $('#request-detail').collapse('show');
    
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

showUser = function( data )
{
    //Add show user code here
}