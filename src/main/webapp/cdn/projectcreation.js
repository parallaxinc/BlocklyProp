//searchVisible = 0;
//transparent = true;

var projectTypes = {
    "PROPC": "blocklyc.jsp",
    "SPIN": "blocklyc.jsp"
};

var simplemde = null;

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
    }
});









