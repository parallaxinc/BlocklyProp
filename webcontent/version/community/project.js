/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var projectData = null;
var ready = false;
$(document).ready(function() {
    var idProject = getUrlParameters('project', '', false);
    if (!idProject) {
        $('#setup-dialog').modal('show');
        $('#setup-dialog').on('hidden.bs.modal', function() {
            projectData = {
                name: '',
                description: '',
                type: window.type,
                board: $('#board-type').val(),
                code: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
            };
            window.frames["content_blocks"].setProfile($('#board-type').val());
            window.frames["content_blocks"].init();
        });
    } else {
        $.get('php/index.php/project/view/' + idProject, function(data) {
            console.log(data);
            projectData = data;
            if (ready) {
                window.frames["content_blocks"].setProfile(data['board']);
                window.frames["content_blocks"].init();
            }
        });
    }

    $('#save-project').on('click', function() {
        getProjectData();
        projectData['code'] = window.frames["content_blocks"].getXml();
        $.post('php/index.php/project/save', projectData, function() {
            $('#project-dialog').modal('hide');
        });
    });

});

blocklyReady = function() {
    if (projectData != null) {
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
    $('#name').val(projectData['name']);
    $('#description').text(projectData['description']);
    $('#board').val(projectData['board']);
    $('#project-dialog').modal('show');
    $('#setup-dialog').on('hidden.bs.modal', function() {
        getProjectData();
    });
};

getProjectData = function() {
    projectData['name'] = $('#name').val();
    projectData['description'] = $('#description').val();
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