$(document).ready(function () {
    $('#baseInfoForm').ajaxForm();
    $('#passwordForm').ajaxForm();
});


window['post-authenticate'] = function () {
    $("#unlock-form").collapse();
    $("#profile-form").collapse();
    $(".password").val($("#password").val());
};