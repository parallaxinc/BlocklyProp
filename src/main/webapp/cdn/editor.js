/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var baseUrl = $("meta[name=base]").attr("content");

var projectData = null;
var ready = false;
var projectLoaded = false;

var idProject = 0;

$(document).ready(function () {
    idProject = getUrlParameters('project', '', false);
    if (!idProject) {
        window.location = baseUrl;
    } else {
        $.get(baseUrl + 'rest/shared/project/editor/' + idProject, function (data) {
            console.log(data);
            projectData = data;
            projectLoaded = true;
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
    var code = window.frames["content_blocks"].getXml();
    projectData['code'] = code
    $.post(baseUrl + 'rest/project/code', projectData, function (data) {
        projectData = data;
        projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave
        utils.showMessage("Project saved", "The project has been saved");
    });
};

blocklyReady = function () {
    if (projectLoaded) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init();
    } else {
        ready = true;
    }
};

loadProject = function () {
    if (projectData !== null) {
        window.frames["content_blocks"].load(projectData['code']);
    }
};

window.onbeforeunload = function () {
    if (checkLeave()) {
        return "The project has been changed since the last save.";
    }
};

checkLeave = function () {
    var currentXml = window.frames["content_blocks"].getXml();
    //console.log(projectData['code']);
    //console.log(currentXml);
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
    $.get(baseUrl + 'ping');
}, 60000);