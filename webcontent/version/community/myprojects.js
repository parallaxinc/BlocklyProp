/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    // TODO check if logged in
    $("#login-register").removeClass("hidden");

    $("#signin").on("click", function() {
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        
        $.post('/php/auth/singin', {email: email, password: password}, function(data) {
            console.log(data);
            if (data.success) {

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