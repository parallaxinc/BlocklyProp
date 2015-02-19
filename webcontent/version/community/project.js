/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var projectData = null;
var ready = false;
var projectCreated = false;

var project_options = {
    'keyboard': false,
    'backdrop': false,
    'contentHeight': 500,
    'contentWidth': 700
};
var projectManager = null;

$(document).ready(function() {
    var idProject = getUrlParameters('project', '', false);
    if (!idProject) {
        
        project_options['showClose'] = false;
        projectManager = $("#project-manager").wizard(project_options);
       
        projectData = {
            name: '',
            description: '',
            type: window.type,
            //       board: $('#board-type').val(),
            code: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
        };
        projectManager.on("submit", function() {
            projectCreated = true;
            projectManager.close();
            projectData['name'] = $('#project-name').val();
            projectData['board'] = $('#board-type').val();
            projectData['description'] = $('#project-description').val();
            window.frames["content_blocks"].setProfile($('#board-type').val());
            window.frames["content_blocks"].init();
      //      alert("init");
            projectManager.reset();
            
       /*     var firstCard = projectManager.cards["project-manager-base"];
            firstCard.select();
            projectManager.showButtons(); */
            
            addProjectManagerHandler();
        });
        projectManager.show();

//        $('#setup-dialog').modal('show');
//        $('#setup-dialog').on('hidden.bs.modal', function() {
//            projectData = {
//                name: '',
//                description: '',
//                type: window.type,
//                board: $('#board-type').val(),
//                code: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
//            };
//           
//        });
    } else {
        $.get('php/index.php/project/view/' + idProject, function(data) {
            console.log(data);
            projectData = data;
            projectCreated = true;
            if (ready) {
                window.frames["content_blocks"].setProfile(data['board']);
                window.frames["content_blocks"].init();

//                var projectWizard = $('#project-manager').wizard({});
//                projectWizard.show();
            }
        });
    }

    $('#save-project').on('click', function() {
        saveProject();
    });

    $("#signin-form").submit(function(event) {
        event.preventDefault();

        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();

        $.post('php/auth/signin', {email: email, password: password}, function(data) {
            // console.log(data);
            if (data.success) {
                $.cookie('user', data.user);
                showTable();
              
                $("#loginEmail").removeClass("has-error");
                $("#loginPassword").removeClass("has-error");
                $('#login-wrong-credentials').addClass('hidden');
            } else {
                $("#loginEmail").addClass("has-error");
                $("#loginPassword").addClass("has-error");
                $('#login-wrong-credentials').removeClass('hidden');
            }
        });
    });

    $("#register-form").submit(function(event) {
        event.preventDefault();

        var email = $("#registerEmail").val();
        var screenname = $("#registerScreenname").val();
        var password = $("#registerPassword").val();
        var passwordConfirm = $("#registerPasswordConfirm").val();

        $.post('php/auth/register', {email: email, screenname: screenname, password: password, passwordConfirm: passwordConfirm}, function(data) {
            $(".form-group").removeClass("has-error");
            $(".icon").addClass("hidden");
            $(".message").remove();
            if (data.success) {
                $.cookie('user', data.user);
                showTable();
                $('#login-register').collapse('show');
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

addProjectManagerHandler = function () {
    projectManager.on("submit", function(wizard) {
        saveProject();
    });
};

saveProject = function() {
    getProjectData();
    projectData['code'] = window.frames["content_blocks"].getXml();
    $.post('php/index.php/project/save', projectData, function(data) {
        if (data.success === false) {
            if (data.code === 2) {
//                    $('#signin-register').height($('#register-form').height());
                $('#login-dialog').modal('show');
                projectManager.submitError();
            }
        } else {
            projectData = data;
            //$('#project-dialog').modal('hide');
          //  projectManager.submitSuccess();
            projectManager.hide();
          //  projectManager.reset();
          //  projectManager.enableNextButton();
          //  projectManager.updateProgressBar(0);

            for (var cardName in projectManager.cards) {
                projectManager.cards[cardName].deselect();
            }
            var firstCard = projectManager.cards["project-manager-base"];
            firstCard.select();
            projectManager.showButtons();

            utils.showMessage("Project saved", "The project has been saved");
        }
    });
};

blocklyReady = function() {
    if (projectCreated) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init();
    } else {
        ready = true;
    }
};


loadProject = function() {
    if (projectData != null) {
//        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, projectData['code']);
        window.frames["content_blocks"].load(projectData['code']);
    }
};


project = function() {
    if (projectManager == null) {
        project_options['showClose'] = true;
        project_options['showCancel'] = true;
        projectManager = $("#project-manager").wizard(project_options);
        addProjectManagerHandler();
        projectManager.updateProgressBar(0);
        $(".wizard-nav-container li.wizard-nav-item").addClass('already-visited');
    } else {
      //  projectManager.reset();
        projectManager.updateProgressBar(0);
        $(".wizard-nav-container li.wizard-nav-item").addClass('already-visited');
    }

 /*   $('#name').val(projectData['name']);
    $('#description').text(projectData['description']);
    $('#board').val(projectData['board']);
    $('#project-dialog').modal('show');
    $('#setup-dialog').on('hidden.bs.modal', function() {
        getProjectData();
    }); */
    projectManager.show();
    projectManager.reset();
};

getProjectData = function() {
    projectData['name'] = $('#project-name').val();
    projectData['description'] = $('#project-description').val();
//    console.log(projectData['description']);
};



community = function() {
    if (checkLeave()) {
        bootbox.confirm("The project has been changed since the last save.<br/>Are you sure you want to leave this page?", function(result) {
            if (result) {
                window.onbeforeunload = null;
                window.location.href = "community.html";
            }
        });
    } else {
        window.onbeforeunload = null;
        window.location.href = "community.html";
    }
};

window.onbeforeunload = function() {
    if (checkLeave()) {
        return "The project has been changed since the last save.";
    }
//    checkLeave(function(result) {
//        if (result) {
//            return "test";
//        }
//    });
};

checkLeave = function() {
    var currentXml = window.frames["content_blocks"].getXml();
//    console.log(currentXml);
    if (projectData === null) {
        if (currentXml === '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>') {
            return false;
        } else {
            return true;
        }
    } else {
        if (projectData['code'] === currentXml) {
            return false;
        } else {
            return true;
        }
    }
};