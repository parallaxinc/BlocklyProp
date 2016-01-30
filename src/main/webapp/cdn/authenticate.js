var timestamp = undefined;
var timediff = 0;
var challenge = undefined;

$(document).ready(function () {
// bind 'myForm' and provide a simple callback function
    var body = $('body');
    var loginForm = $('#loginform');

    challenge = body.data('challenge');
    timestamp = body.data('timestamp');

    var nowEpoch = Date.now();
    timediff = nowEpoch - timestamp;

    loginForm.submit(function (event) {
        // Stop form from submitting normally
        event.preventDefault();

        $.post(loginForm.attr('action'), loginForm.serialize(), onSuccess);
    });

});



function onSuccess(response, statusText, xhr, $form) {
    // alert(response.data.token);
    if (response.success === true) {
        window.localStorage.setItem('token', response.data.token);
        var requestTimestamp = Date.now() + timediff;
        var idUser = response.data['id-user'];
        var hash = sha256(response.data.token + challenge + requestTimestamp);
        $.post('/blockly/authenticate', {'id-user': idUser, 'timestamp': requestTimestamp, 'hash': hash}, function (authenticationResponse) {
            if (authenticationResponse.success === true) {
                if (typeof window['post-authenticate'] === 'function') {
                    window['post-authenticate']();
                } else {
                    location.reload(true);
                }
            }
        });
    }
}