/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baseUrl = $("meta[name=base]").attr("content");

var projectData = null;
var ready = false;
var projectLoaded = false;
var uploadStaged = false;
var ignoreSaveCheck = false;

var last_saved_timestamp = 0;
var last_saved_time = 0;

var idProject = 0;

var uploadedXML = '';

$(document).ready(function () {
    idProject = getUrlParameters('project', '', false);
    if (!idProject) {
        window.location = baseUrl;
    } else {
        $.get(baseUrl + 'rest/shared/project/editor/' + idProject, function (data) {
            console.log(data);
            projectData = data;
            showInfo(data);
            projectLoaded = true;
            if (ready) {
                window.frames["content_blocks"].setProfile(data['board']);
                window.frames["content_blocks"].init(data['board'], []);
            }
            if ($('#editor-full-mode') === 'true') {
                if (projectData['board'] === 's3' && type === 'PROPC') {
                    $('#prop-btn-ram').addClass('hidden');
                    document.getElementById('client-available').innerHTML = document.getElementById('client-available-short').innerHTML;
                } else {
                    $('#prop-btn-ram').removeClass('hidden');
                    document.getElementById('client-available').innerHTML = document.getElementById('client-available-long').innerHTML;
                }
            }

            timestampSaveTime(20, true);
            setInterval(checkLastSavedTime, 60000);
        }).fail(function () {
            // Failed to load project - this probably means that it belongs to another user and is not shared.
            utils.showMessage('Unable to Access Project', 'The BlocklyProp Editor was unable to access the project you requested.  If you are sure the rpoject exists, you may need to contact the project\'s owner and ask them to share their project before you will be able to view it.', function () {
                window.location = baseUrl;
            });
        });
    }

    $('#save-project').on('click', function () {
        saveProject();  
    });
    $('#save-project-as').on('click', function () {
        saveAsDialog();
    });
    $('#download-project').on('click', function () {
        downloadCode();
    });
    $('#upload-project').on('click', function () {
        uploadCode();
    });
    $('#save-check-dialog').on('hidden.bs.modal', function () {
        timestampSaveTime(5, false);
    });
});

timestampSaveTime = function (mins, resetTimer) {
    // Mark the time when the project was opened, add 20 minutes to it.
    var d_save = new Date();
    last_saved_timestamp = d_save.getTime() + (mins * 60000);
    if (resetTimer) {
        last_saved_time = d_save.getTime();
    }
};

checkLastSavedTime = function () {
    var d_now = new Date();
    var t_now = d_now.getTime();
    var s_save = Math.round((d_now.getTime() - last_saved_time) / 60000);
    $('#save-check-warning-time').html(s_save.toString(10));

    if (s_save > 58) {
        // TODO: It's been to long - autosave, then close/set URL back to login page.
    }

    if (t_now > last_saved_timestamp && checkLeave()) {
        // It's time to pop up a modal to remind the user to save.
        $('#save-check-dialog').modal('show');
    }
};

showInfo = function (data) {
    //console.log(data);
    $(".project-name").text(data['name']);
    if (!data['yours']) {
        $(".project-owner").text("(" + data['user'] + ")");
    }
    var projectBoardIcon = {
        "activity-board": "/cdn/images/board-icons/IconActivityBoard.png",
        "s3": "/cdn/images/board-icons/IconS3.png",
        "heb": "/cdn/images/board-icons/IconBadge.png",
        "flip": "/cdn/images/board-icons/IconFlip.png",
        "other": "/cdn/images/board-icons/IconOtherBoards.png",
        "propcfile": "/cdn/images/board-icons/IconC.png"
    };

    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

    $("#project-icon").html('<img src="' + baseUrl + projectBoardIcon[data['board']] + '"/>');
};

propcAsBlocksXml = function () {
    var code = '<xml xmlns="http://www.w3.org/1999/xhtml">';
    code += '<block type="propc_file" id="abcdefghijklmno12345" x="100" y="100">';
    code += '<field name="FILENAME">single.c</field>';
    code += '<field name="CODE">';
    code += encodeXml(codePropC.getValue().replace('/* EMPTY_PROJECT */\n', ''));
    code += '</field></block></xml>';
    return code;
};

saveProject = function () {
    var code = '';
    if (projectData['board'] === 'propcfile') {
        code = propcAsBlocksXml();

        window.frames["content_blocks"].clearXml();
        window.frames["content_blocks"].load(code);
    } else {
        code = window.frames["content_blocks"].getXml();
    }
    projectData['code'] = code;
    $.post(baseUrl + 'rest/project/code', projectData, function (data) {
        var previousOwner = projectData['yours'];
        projectData = data;
        projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave
        //utils.showMessage(Blockly.Msg.DIALOG_PROJECT_SAVED, Blockly.Msg.DIALOG_PROJECT_SAVED_TEXT);
        if (!previousOwner) {
            window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
        }
    }).done(function () {
        // Save was successful, show green with checkmark
        var elem = document.getElementById('save-project');
        elem.style.paddingLeft = '10px';
        elem.style.background = 'rgb(92, 184, 92)';
        elem.style.borderColor = 'rgb(76, 174, 76)';

        setTimeout(function () {
            elem.innerHTML = 'Save &#x2713;';
        }, 600);

        setTimeout(function () {
            elem.innerHTML = 'Save&nbsp;&nbsp;';
            elem.style.paddingLeft = '15px';
            elem.style.background = '#337ab7';
            elem.style.borderColor = '#2e6da4';
        }, 1750);
    }).fail(function () {
        // Save failed.  Show red with "x"
        var elem = document.getElementById('save-project');
        elem.style.paddingLeft = '10px';
        elem.style.background = 'rgb(214, 44, 44)';
        elem.style.borderColor = 'rgb(191, 38, 38)';

        setTimeout(function () {
            elem.innerHTML = 'Save &times;';
        }, 600);

        setTimeout(function () {
            elem.innerHTML = 'Save&nbsp;&nbsp;';
            elem.style.paddingLeft = '15px';
            elem.style.background = '#337ab7';
            elem.style.borderColor = '#2e6da4';
        }, 1750);
        
        utils.showMessage('Not logged in', 'BlocklyProp was unable to save your project.\n\nYou may still be able to download it as a Blockls file.\n\nYou will need to return to the homepage to log back in.');
    });

    // Mark the time when saved, add 30 minutes to it.
    timestampSaveTime(20, true);
};

saveAsDialog = function () {
    // Are we in demo or production?
    var site_loc = $('#save-as-in-demo').val();
    
    // Prompt user to save current project first if unsaved
    if (checkLeave() && projectData['yours']) {
        utils.confirm(Blockly.Msg.DIALOG_SAVE_TITLE, Blockly.Msg.DIALOG_SAVE_FIRST, function (value) {
            if (value) {
                saveProject();
            }
        }, 'Yes', 'No');
    }
     
    // Reset the save-as modal's fields
    $('#save-as-project-name').val(projectData['name']);
    $("#save-as-board-type").empty();
    window.frames["content_blocks"].profile.default.saves_to.forEach(function (bt) {
        $("#save-as-board-type").append($('<option />').val(bt[1]).text(bt[0]));
    });
    
    // Until release to production, make sure we are on demo before displaying the propc option
    if (site_loc === 'demo') {
        $("#save-as-board-type").append($('<option />').val('propcfile').text('Propeller C (code-only)'));
    }
    
    // Open modal
    $('#save-as-type-dialog').modal('show');    
};

checkBoardType = function () {
    var current_type = projectData['board'];
    var save_as_type = $('#save-as-board-type').val();
    // save-as-verify-boardtype
    if (current_type === save_as_type || save_as_type === 'propcfile') {
        document.getElementById('save-as-verify-boardtype').style.display = 'none';
    } else {
        document.getElementById('save-as-verify-boardtype').style.display = 'block';
    }
};

saveProjectAs = function () {
    // Retrieve the field values
    var p_type = $('#save-as-board-type').val();
    var p_name = $('#save-as-project-name').val();
    
    //get the project's XML code
    var code = '';
    if (projectData['board'] === 'propcfile') {
        code = propcAsBlocksXml();

        window.frames["content_blocks"].clearXml();
        window.frames["content_blocks"].load(code);
    } else {
        code = window.frames["content_blocks"].getXml();
    }

    // If the new project is the same type as the old one, use the save-as endpoint
    if(p_type === projectData['board']) {
        projectData['code'] = code;
        projectData['name'] = p_name;
        $.post(baseUrl + 'rest/project/code-as', projectData, function (data) {
            var previousOwner = projectData['yours'];
            projectData = data;
            projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave

            // Reloading project with new id
            window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
        });
        timestampSaveTime(20, true);  
        
    } else {
    // Else create a new project, then save into it

        ignoreSaveCheck = true;
        projectData['code'] = code;
        projectData['name'] = p_name;
        projectData['board'] = 'propcfile';

        var newProjectData = {
            'project-name': p_name,
            'board-type': p_type,
            'project-description': projectData['description'],
            'project-type': projectData['type'],
            'sharing': (projectData['private'] ? 'private' : 'shared'),
            'project-description-html': projectData['description-html']
        };
        $.post(baseUrl + 'createproject', newProjectData, function (data) {
            console.log(data);
            if (data['success']) {
                projectData = data;
                window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
                projectData['code'] = code;

                $.post(baseUrl + 'rest/project/code', projectData, function (data) {
                    projectData = data;
                    projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave
                    ignoreSaveCheck = false;
                });
            } else {
                if (typeof data['message'] === "string")
                    alert("There was an error when BlocklyProp tried to create your project:\n" + data['message']);
                else
                    alert("There was an error when BlocklyProp tried to create your project:\n" + data['message'].toString());
            }
        });
        timestampSaveTime(20, true);
    }
    
    /*
    utils.prompt("Save project as", projectData['name'], function (value) {
        if (value) {
            var code = '';
            if (projectData['board'] === 'propcfile') {
                code = propcAsBlocksXml();

                window.frames["content_blocks"].clearXml();
                window.frames["content_blocks"].load(code);
            } else {
                code = window.frames["content_blocks"].getXml();
            }
            projectData['code'] = code;
            projectData['name'] = value;
            $.post(baseUrl + 'rest/project/code-as', projectData, function (data) {
                var previousOwner = projectData['yours'];
                projectData = data;
                projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave
                utils.showMessage(Blockly.Msg.DIALOG_PROJECT_SAVED, Blockly.Msg.DIALOG_PROJECT_SAVED_TEXT);
                // Reloading project with new id
                window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
            });
            timestampSaveTime(20, true);
        }
    });
    */
    
};

/*
saveAsPropc = function () {
    var xmlText = propcAsBlocksXml();

    utils.prompt("Create a new Propeller C (code-only) project", projectData['name'], function (value) {
        if (value) {
            ignoreSaveCheck = true;
            //var code = window.frames["content_blocks"].getXml();
            projectData['code'] = xmlText;
            projectData['name'] = value;
            projectData['board'] = 'propcfile';

            var newProjectData = {
                'project-name': projectData['name'],
                'board-type': projectData['board'],
                'project-description': projectData['description'],
                'project-type': projectData['type'],
                'sharing': (projectData['private'] ? 'private' : 'shared'),
                'project-description-html': projectData['description-html']
            };
            $.post(baseUrl + 'createproject', newProjectData, function (data) {
                console.log(data);
                if (data['success']) {
                    projectData = data;
                    window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
                    projectData['code'] = xmlText;

                    $.post(baseUrl + 'rest/project/code', projectData, function (data) {
                        projectData = data;
                        projectData['code'] = xmlText; // Save code in projectdata to be able to verify if code has changed upon leave
                        ignoreSaveCheck = false;
                    });
                } else {
                    if (typeof data['message'] === "string")
                        alert("There was an error when BlocklyProp tried to create your project:\n" + data['message']);
                    else
                        alert("There was an error when BlocklyProp tried to create your project:\n" + data['message'].toString());
                }
            });
            timestampSaveTime(20, true);
        }
    });
};
*/

editProjectDetails = function () {
    window.location.href = baseUrl + 'my/projects.jsp#' + idProject;
};

blocklyReady = function () {
    if (projectLoaded) {
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
    } else {
        ready = true;
    }
};

loadProject = function () {
    if (projectData !== null && uploadStaged === false) {
        if (projectData['code'].length < 43) {
            projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
        }
        window.frames["content_blocks"].load(projectData['code']);
    }
    if ($('#editor-full-mode') === 'true') {
        if (projectData['board'] === 's3' && type === 'PROPC') {
            $('#load-ram-button').addClass('hidden');
            $('#open-graph-output').addClass('hidden');
            document.getElementById('client-available').innerHTML = document.getElementById('client-available-short').innerHTML;
        } else {
            $('#load-ram-button').removeClass('hidden');
            $('#open-graph-output').removeClass('hidden');
            document.getElementById('client-available').innerHTML = document.getElementById('client-available-long').innerHTML;
        }
    }
};

window.onbeforeunload = function () {
    if (checkLeave()) {
        return Blockly.Msg.DIALOG_CHANGED_SINCE;
    }
};

checkLeave = function () {
    if (ignoreSaveCheck) {
        return false;
    }
    var currentXml = window.frames["content_blocks"].getXml();
    if (projectData['board'] === 'propcfile') {
        currentXml = propcAsBlocksXml();
    }
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
        if (parr[0] === parameter) {
            returnBool = true;
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
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

function hashCode(str) {
    var hash = 0, i = 0, len = str.length;
    while (i < len) {
        hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }
    return (hash + 2147483647) + 1;
}

function downloadCode() {
    var projXMLcode = window.frames["content_blocks"].getXml(); //projectData['code'];
    projXMLcode = projXMLcode.substring(42, projXMLcode.length);
    projXMLcode = projXMLcode.substring(0, (projXMLcode.length - 6));

    utils.prompt(Blockly.Msg.DIALOG_DOWNLOAD, 'Project' + idProject, function (value) {
        if (value) {
            // extract the SVG from the iFrame that contains it
            var x = document.getElementsByName("content_blocks");
            var y = (x[0].contentWindow || x[0].contentDocument);
            if (y.document)
                y = y.document;

            // get the paths of the blocks themselves and the size/position of the blocks
            var projSVG = y.getElementsByClassName('blocklyBlockCanvas');
            var projSVGcode = projSVG[0].outerHTML.replace(/&nbsp;/g, ' ');
            var projSize = projSVG[0].getBoundingClientRect();
            var projH = (parseInt(projSize.height) + parseInt(projSize.top) + 100).toString();
            var projW = (parseInt(projSize.width) + parseInt(projSize.left) + 236).toString();

            // put all of the pieces together into a downloadable file
            var saveData = (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (data, fileName) {
                    var blob = new Blob([data], {type: "octet/stream"});
                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());

            // a header with the necessary svg XML header and style information to make the blocks render correctly
            var SVGheader = '';
            SVGheader += '<svg blocklyprop="blocklypropproject" xmlns="http://www.w3.org/2000/svg" ';
            SVGheader += 'xmlns:html="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" ';
            SVGheader += 'version="1.1" class="blocklySvg"><style>.blocklySvg { background-color: #fff; ';
            SVGheader += 'overflow: auto; width:' + projW + 'px; height:' + projH + 'px;} .blocklyWidgetDiv {display: none; position: absolute; ';
            SVGheader += 'z-index: 999;} .blocklyPathLight { fill: none; stroke-linecap: round; ';
            SVGheader += 'stroke-width: 2;} .blocklyDisabled>.blocklyPath { fill-opacity: .5; ';
            SVGheader += 'stroke-opacity: .5;} .blocklyDisabled>.blocklyPathLight, .blocklyDisabled>';
            SVGheader += '.blocklyPathDark {display: none;} .blocklyText {cursor: default; fill: ';
            SVGheader += '#fff; font-family: sans-serif; font-size: 11pt;} .blocklyNonEditableText>text { ';
            SVGheader += 'pointer-events: none;} .blocklyNonEditableText>rect, .blocklyEditableText>rect ';
            SVGheader += '{fill: #fff; fill-opacity: .6;} .blocklyNonEditableText>text, .blocklyEditableText>';
            SVGheader += 'text {fill: #000;} .blocklyBubbleText {fill: #000;} .blocklySvg text {user';
            SVGheader += '-select: none; -moz-user-select: none; -webkit-user-select: none; cursor: ';
            SVGheader += 'inherit;} .blocklyHidden {display: none;} .blocklyFieldDropdown:not(.blocklyHidden) ';
            SVGheader += '{display: block;} .bkginfo {cursor: default; fill: rgba(0, 0, 0, 0.3); font-family: ';
            SVGheader += 'sans-serif; font-size: 10pt;}</style>';

            // a footer to generate a watermark with the project's information at the bottom-right corner of the SVG 
            var SVGfooter = '';
            SVGfooter += '<rect x="100%" y="100%" rx="7" ry="7" width="218" height="84" style="fill:rgba(255,255,255,0.4);" transform="translate(-232,-100)" />';
            SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-83)" style="font-weight:bold;">Parallax BlocklyProp Project</text>';
            SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-68)">User: ' + projectData['user'] + '</text>';
            SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-53)">Title: ' + projectData['name'] + '</text>';
            SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-38)">Project ID: ' + idProject + '</text>';
            SVGfooter += '<text class="bkginfo" x="100%" y="100%" transform="translate(-225,-23)">Device: ' + projectData['board'] + '</text>';

            // Check for any file extentions at the end of the submitted name, and truncate if any
            if (value.indexOf(".") !== -1)
                value = value.substring(0, value.indexOf("."));
            // Check to make sure the filename is not too long
            if (value.length >= 30)
                value = value.substring(0, 29);
            // Replace any illegal characters
            value = value.replace(/[\\/:*?\"<>|]/g, '_');

            var xmlChecksum = hashCode(projXMLcode).toString();

            var xmlChecksum = '000000000000'.substring(xmlChecksum.length, 12) + xmlChecksum;

            // Assemble both the SVG (image) of the blocks and the blocks' XML definition
            saveData(SVGheader + projSVGcode + SVGfooter + projXMLcode + '<ckm>' + xmlChecksum + '</ckm></svg>', value + '.svg');
        }
    });
}

function uploadCode() {
    if (checkLeave()) {
        utils.showMessage(Blockly.Msg.DIALOG_UNSAVED_PROJECT, Blockly.Msg.DIALOG_SAVE_BEFORE_ADD_BLOCKS);
    } else {
        $('#upload-dialog').modal('show');
    }
}

function uploadHandler(files) {
    var UploadReader = new FileReader();
    UploadReader.onload = function () {
        var xmlString = this.result;
        var xmlValid = false;
        var uploadBoardType = '';

        //validate file, screen for potentially malicious code.
        if (files[0].type === 'image/svg+xml'
                && xmlString.indexOf("<svg blocklyprop=\"blocklypropproject\"") === 0
                && xmlString.indexOf("<!ENTITY") === -1
                && xmlString.indexOf("CDATA") === -1
                && xmlString.indexOf("<!--") === -1)
        {
            var uploadedChecksum = xmlString.substring((xmlString.length - 24), (xmlString.length - 12));
            uploadedXML = xmlString.substring(xmlString.indexOf("<block"), (xmlString.length - 29));
            var computedChecksum = hashCode(uploadedXML).toString();
            computedChecksum = '000000000000'.substring(computedChecksum.length, 12) + computedChecksum;

            if (computedChecksum === uploadedChecksum)
                xmlValid = true;

            if (xmlValid) {
                var boardIndex = xmlString.indexOf('transform="translate(-225,-23)">Device: ');
                uploadBoardType = xmlString.substring((boardIndex + 40), xmlString.indexOf('</text>', (boardIndex + 41)));
                if (uploadBoardType !== projectData['board']) {
                    document.getElementById("selectfile-verify-boardtype").style.display = "block";
                } else {
                    document.getElementById("selectfile-verify-boardtype").style.display = "none";
                }
            }
        }
        ;

        if (xmlValid === true) {
            document.getElementById("selectfile-verify-valid").style.display = "block";
            document.getElementById("selectfile-replace").disabled = false;
            document.getElementById("selectfile-append").disabled = false;
            uploadedXML = xmlString;
        } else {
            document.getElementById("selectfile-verify-notvalid").style.display = "block";
            document.getElementById("selectfile-replace").disabled = true;
            document.getElementById("selectfile-append").disabled = true;
            uploadedXML = '';
        }
    };

    UploadReader.readAsText(files[0]);

    if (uploadedXML !== '') {
        uploadedXML = '<xml xmlns="http://www.w3.org/1999/xhtml">' + uploadedXML + '</xml>';
        uploadStaged = true;
    }
    ;
}

function clearUploadInfo() {
    // Reset all of the upload fields and containers
    uploadedXML = '';
    $('#selectfile').val('');
    document.getElementById("selectfile-verify-notvalid").style.display = "none";
    document.getElementById("selectfile-verify-valid").style.display = "none";
    document.getElementById("selectfile-verify-boardtype").style.display = "none";
}

function replaceCode() {
    $('#upload-dialog').modal('hide');
    if (uploadedXML !== '') {
        var newCode = uploadedXML;
        newCode = newCode.substring(42, newCode.length);
        newCode = newCode.substring(0, (newCode.length - 29));

        window.frames["content_blocks"].location.reload();
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
        projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml">' + newCode + '</xml>';
        $(window).load(function () {
            window.frames["content_blocks"].load(projectData['code']);
            uploadStaged = false;
        });

        // Reset all of the upload fields and containers
        clearUploadInfo();
    }
}

function appendCode() {
    $('#upload-dialog').modal('hide');
    if (uploadedXML !== '') {
        var projCode = projectData['code'];
        projCode = projCode.substring(42, projCode.length);
        projCode = projCode.substring(0, (projCode.length - 6));

        var newCode = uploadedXML;
        newCode = newCode.substring(42, newCode.length);
        newCode = newCode.substring(0, (newCode.length - 6));

        window.frames["content_blocks"].location.reload();
        window.frames["content_blocks"].setProfile(projectData['board']);
        window.frames["content_blocks"].init(projectData['board'], []);
        projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml">' + projCode + newCode + '</xml>';
        $(window).load(function () {
            window.frames["content_blocks"].load(projectData['code']);
            uploadStaged = false;
        });

        // Reset all of the upload fields and containers
        clearUploadInfo();
    }
}