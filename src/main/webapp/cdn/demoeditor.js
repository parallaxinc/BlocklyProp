/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var projectData = {
    'board': 'activity-board'
};
var ready = false;
var projectCreated = false;
var client_url = undefined;

$(document).ready(function() {
    var idProject = getUrlParameters('project', '', false);
    if (!idProject) {
        projectCreated = true;
        if (ready) {
            window.frames["content_blocks"].setProfile('activity-board');
            window.frames["content_blocks"].init();
        }
    } else {
        $.get('php/index.php/project/view/' + idProject, function(data) {
            console.log(data);
            projectData = data;
            projectCreated = true;
            if (ready) {
                window.frames["content_blocks"].setProfile(data['board']);
                window.frames["content_blocks"].init();
            }
        });
    }
});

blocklyReady = function() {
    if (projectCreated) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init();
    } else {
        ready = true;
    }
};


loadProject = function() {
    if (projectData['code']) {
//        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, projectData['code']);
        window.frames["content_blocks"].load(projectData['code']);
    }
};

window.onbeforeunload = function() {
    var currentXml = window.frames["content_blocks"].getXml();
    if (currentXml !== '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>') {
        // TODO Save in localstorage
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