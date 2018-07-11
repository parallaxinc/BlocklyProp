//searchVisible = 0;
//transparent = true;

var projectTypes = {
    "PROPC": "blocklyc.jsp",
    "SPIN": "blocklyc.jsp"
};

var simplemde = null;
var pd = {};

var isOffline = ($("meta[name=isOffline]").attr("content") === 'true') ? true : false;

$(document).ready(function () {
    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();
    simplemde = new SimpleMDE({element: document.getElementById("project-description"), hideIcons: ["link"], spellChecker: false});

    $('#project-type').val(getURLParameter('lang'));

    $('[data-toggle="wizard-radio"]').click(function () {
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked', 'true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked', 'true');
        }
    });

    $height = $(document).height();
    $('.set-full-height').css('height', $height);
    
    var tt = new Date();

    var isEdit = getURLParameter('edit');

    if (isEdit === 'true' && isOffline) {
        pd = JSON.parse(window.localStorage.getItem('localProject'));
        $('#project-name').val(pd['name']);
        simplemde.value(pd['description']);
        $("#project-description-html").html(pd['description-html']);
        $('#board-type').val(pd.board);
    } else if (isOffline) {
        pd = {
                'board': '',
                'code': '<xml xmlns=\"http://www.w3.org/1999/xhtml\"></xml>',
                'created': tt,
                'description': '',
                'description-html': '',
                'id': 0,
                'modified': tt,
                'name': '',
                'private': true,
                'shared': false,
                'type': "PROPC",
                'user': "offline",
                'yours': true,
        }
    }
});

function validateFirstStep() {

    $(".proj").validate({
        rules: {
            'project-name': "required",
            'board-type': "required"
        },
        messages: {
            'project-name': "Please enter a project name",
            'board-type': "Please select a board type"
        }
    });

    if (!$(".proj").valid()) {
        //form is invalid
        return false;
    }

    return true;
}

$.fn.serializeObject = function ()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$('#finish').on('click', function () {
    if (validateFirstStep()) {
        var formData = $(".proj").serializeObject();
        formData['project-description'] = simplemde.value();
        formData['project-description-html'] = simplemde.options.previewRender(simplemde.value());
        
        if (!isOffline) {
            $.post('createproject', formData, function (data) {
                if (data['success']) {
                    window.location = $('#finish').data('editor') + projectTypes[getURLParameter('lang')] + "?project=" + data['id'];
                } else {
                    if (typeof data['message'] === "string")
                        alert("There was an error when BlocklyProp tried to create your project:\n" + data['message']);
                    else
                        alert("There was an error when BlocklyProp tried to create your project:\n" + data['message'].toString());
                }
            });
        } else {
            pd.board = formData['board-type'];
            pd.description = formData['project-description'];
            pd['name'] = formData['project-name'];
            pd['description-html'] = formData['project-description-html'];

            window.localStorage.setItem('localProject', JSON.stringify(pd));
        	window.location = 'blocklyc.html';
        }
    }
});









