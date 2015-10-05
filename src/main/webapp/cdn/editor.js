/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var baseUrl = $("meta[name=base]").attr("content");

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

var idProject = 0;

$(document).ready(function () {
    idProject = getUrlParameters('project', '', false);
    if (!idProject) {

        project_options['showClose'] = false;
        //    projectManager = $("#project-manager").wizard(project_options);
        addProjectManagerHandler();
        projectData = {
            name: '',
            description: '',
            type: window.type,
            //       board: $('#board-type').val(),
            code: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
        };
        /*    projectManager.on("submit", function () {
         projectCreated = true;
         projectManager.close();
         projectData['name'] = $('#project-name').val();
         projectData['board'] = $('#board-type').val();
         projectData['shared'] = true;
         projectData['private'] = false;
         projectData['description'] = $('#project-description').val();
         window.frames["content_blocks"].setProfile($('#board-type').val());
         window.frames["content_blocks"].init();
         //      alert("init");
         });
         projectManager.show();
         */
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
        $.get(baseUrl + 'rest/shared/project/editor/' + idProject, function (data) {
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

    $('#save-project').on('click', function () {
        saveProject();
    });

});

addProjectManagerHandler = function () {
    /*   projectManager.on("submit", function (wizard) {
     saveProject();
     });*/
};

saveProject = function () {
//    getProjectData();
    projectData['code'] = window.frames["content_blocks"].getXml();
    $.post(baseUrl + 'rest/project/code', projectData, function (data) {
        projectData = data;
        utils.showMessage("Project saved", "The project has been saved");
    });
};

blocklyReady = function () {
    if (projectCreated) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init();
    } else {
        ready = true;
    }
};


loadProject = function () {
    if (projectData !== null) {
//        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, projectData['code']);
        window.frames["content_blocks"].load(projectData['code']);
    }
};


project = function () {
    /*    if (projectManager === null) {
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
     */

    //  projectManager.show();
};

getProjectData = function () {
    projectData['name'] = $('#project-name').val();
    projectData['description'] = $('#project-description').val();
//    console.log(projectData['description']);
};

window.onbeforeunload = function () {
    if (checkLeave()) {
        return "The project has been changed since the last save.";
    }
};

checkLeave = function () {
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

function getUrlParameters(parameter, staticURL, decode) {
    /*
     Function: getUrlParameters
     Description: Get the value of URL parameters either from
     current URL or static URL
     Author: Tirumal
     URL: www.code-tricks.com
     */
    var currLocation = (staticURL.length) ? staticURL : window.location.search;

    var parArr = [];
    if (currLocation !== undefined && currLocation.split("?")[1] !== undefined) {
        parArr = currLocation.split("?")[1].split("&");
    }
    var returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        } else {
            returnBool = false;
        }
    }

    if (!returnBool)
        return false;
}