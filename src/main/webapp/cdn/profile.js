$(document).ready(function () {
    $.get('http://localhost:8080/blockly/rest/profile/get', function(res) {
        console.log(res);
    }).fail(function(res) {
        console.log('user info failure:');
        console.log(res);
    });
    
    $('#loginform').ajaxForm({
//        beforeSubmit: function (arr, $form, options) {
//            $(".form-message").addClass("hidden");
//        },
        success: function (response) {
            if (response['success']) {
                $("#unlock-form").collapse("hide");
                $("#profile-form").collapse("show");
                $(".password").val($("#password").val());
                $("#password").val('');
            } else {
                $("#unlock-error").removeClass("hidden");
            }
        }
    });

    $('#baseInfoForm').ajaxForm({
        beforeSubmit: function (arr, $form, options) {
            $(".form-message").addClass("hidden");
        },
        success: function (response) {
            if (response['success']) {
                $("#base-success").removeClass("hidden");
            } else {
                if (response['message'] === "screenname-used") {
                    $("#base-screenname-error").removeClass("hidden");
                } else {
                    $("#base-error").removeClass("hidden");
                }
            }
        }
    });
    $('#passwordForm').ajaxForm({
        beforeSubmit: function (arr, $form, options) {
            $(".form-message").addClass("hidden");

            var passwordFields = $(".password-match");
            if ($(passwordFields[0]).val() !== $(passwordFields[1]).val()) {
                $("#password-matching-error").removeClass("hidden");
                return false;
            }
        },
        success: function (response) {
            if (response['success']) {
                $("#password-success").removeClass("hidden");

                $(".password-match").val('');

                $("#unlock-form").collapse("show");
                $("#profile-form").collapse("hide");
            } else {
                if (response['message'] === "password-complexity") {
                    $("#password-complexity-error").removeClass("hidden");
                } else {
                    $("#password-error").removeClass("hidden");
                }
            }
        }
    });
});


window['post-authenticate'] = function () {
    $("#unlock-form").collapse("hide");
    $("#profile-form").collapse("show");
    $(".password").val($("#password").val());
    $("#password").val('');
};

window['failed-authentication'] = function () {
    $("#unlock-error").removeClass("hidden");
};