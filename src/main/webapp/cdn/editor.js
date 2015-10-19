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

    } else {
        $.get(baseUrl + 'rest/shared/project/editor/' + idProject, function (data) {
            console.log(data);
            projectData = data;
            projectCreated = true;
            if (ready) {
                window.frames["content_blocks"].setProfile(data['board']);
                window.frames["content_blocks"].init();
            }
        });
    }

    $('#save-project').on('click', function () {
        saveProject();
    });

});

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

setInterval(function () {
    $.get('ping');
}, 60000);