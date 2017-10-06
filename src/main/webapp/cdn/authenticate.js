$(document).ready(function () {
    var loginForm = $('#loginform');

    loginForm.submit(function (event) {
        $("#login-failure").addClass("hidden");
        // Stop form from submitting normally
        event.preventDefault();

        var jqxhr = $.post(loginForm.attr('action'), loginForm.serialize(), onLoginSuccess);
        jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
            alert("An unexpected error occured. Please try again later or contact the webmaster.");
        });

    });
});

function onLoginSuccess(response, statusText, xhr, $form) {
    if (response.success === true) {
        if (typeof window['post-authenticate'] === 'function') {
            window['post-authenticate']();
        } else {
            location.reload(true);
        }
    } else {
        $("#login-failure").removeClass("hidden");
        if (typeof window['failed-authentication'] === 'function') {
            window['failed-authentication']();
        }
    }
}