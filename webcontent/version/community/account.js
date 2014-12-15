/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    $.cookie.json = true;

    $.get('php/auth/user', function(data) {
        if (data.success) {
            $.cookie('user', data.user);
            $('#account-data').addClass('in').removeClass('hidden');
            $('#account-menu').removeClass('hidden');
            
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

