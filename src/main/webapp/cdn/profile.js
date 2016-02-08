$(document).ready(function () {
    $('#baseInfoForm').ajaxForm({
        beforeSubmit: function (arr, $form, options) {
            $(".form-message").addClass("hidden");
        },
        success: function (response) {
            if (response['success']) {
                $("#base-success").removeClass("hidden");
                $.post("profile", {});
            } else {
                $("#base-error").removeClass("hidden");
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
            } else {
                $("#password-error").removeClass("hidden");
            }
        }
    });
});


window['post-authenticate'] = function () {
    $("#unlock-form").collapse();
    $("#profile-form").collapse();
    $(".password").val($("#password").val());
};