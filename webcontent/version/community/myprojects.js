/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    $.cookie.json = true;
    // TODO check if logged in
    
    $.get('/php/auth/user', function(data) {
        if (data.success) {
            $.cookie('user', data.user);
            showTable();
            $('#project-list').addClass('in').removeClass('hidden');
        } else {
            $.removeCookie('user');
            $("#login-register").removeClass("hidden");
        }
    });

    $("#signin").on("click", function() {
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        
        $.post('/php/auth/signin', {email: email, password: password}, function(data) {
           // console.log(data);
            if (data.success) {
                $.cookie('user', data.user);
                showTable();
                $('#project-list').removeClass('hidden');
                $('#login-register').collapse('show');
                $('#project-list').collapse('hide');
            } else {
                
            }
        });
    });

    $("#register").on("click", function() {
        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();
        var passwordConfirm = $("#registerPasswordConfirum").val();
        
        $.post('/php/auth/register', {email: email, password: password, passwordConfirm: passwordConfirm}, function(data) {
            $(".form-group").removeClass("has-error");
            $(".icon").addClass("hidden");
            $(".message").remove();
            if (data.success) {
                $.cookie('user', data.user);
                showTable();
                $('#project-list').removeClass('hidden');
                $('#login-register').collapse('show');
                $('#project-list').collapse('hide');
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
});

showTable = function() {
    $("#table-project").datatable({
        perPage: 10,
        url: 'php/index.php/project/mine',
        title: 'Projects',
        showPagination: true,
        toggleColumns: false,
        sectionHeader: '#projects-header',
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
};