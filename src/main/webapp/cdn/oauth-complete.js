$(document).ready(function () {
    var redirect = $("body").data('redirect');
    window.opener.location.href = redirect; // 'http://dev.blockly.parallax.com:8084/blockly/';
    window.close();
});