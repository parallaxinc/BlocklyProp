/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baseUrl = $("meta[name=base]").attr("content");


var projectData = {
    'board': 'activity-board'
};
var ready = false;
var projectLoaded = false;
var client_url = undefined;

$(document).ready(function () {
    projectData = data;
    showInfo(projectData);
    projectLoaded = true;
    if (ready) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
    }
});

blocklyReady = function () {
    if (projectLoaded) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
    } else {
        ready = true;
    }
};

showInfo = function (data) {
    $(".project-name").text(data['name']);
    if (!data['yours']) {
        $(".project-owner").text("(" + data['user'] + ")");
    }
}

loadProject = function () {
    if (projectData['code']) {
        window.frames["content_blocks"].load(projectData['code']);
    }
};

window.onbeforeunload = function () {
    var currentXml = window.frames["content_blocks"].getXml();
    if (currentXml !== '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>') {
        // TODO Save in localstorage
    }
};
