$(document).ready(function () {
// bind 'myForm' and provide a simple callback function
    $('#loginform').ajaxForm({
        dataType: 'json',
        success: onSuccess
    });
});

var timestamp = 1234567890;
var challenge = "azertyuiop";

function onSuccess(response, statusText, xhr, $form) {
    //   alert(response.data.token);
    if (response.success === true) {
        window.localStorage.setItem('token', response.data.token);
        var idUser = response.data['id-user'];
        var hash = sha256(response.data.token + challenge + timestamp);
        $.post('/blockly/authenticate', {'id-user': idUser, 'timestamp': timestamp, 'hash': hash}, function () {

        });
    }
}