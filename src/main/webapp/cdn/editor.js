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
            if (projectData['board'] === 's3' && type === 'PROPC') {
                $('#load-ram-button').addClass('hidden');
                document.getElementById('client-available').innerHTML = document.getElementById('client-available-short').innerHTML;
            } else {
                $('#load-ram-button').removeClass('hidden');
                document.getElementById('client-available').innerHTML = document.getElementById('client-available-long').innerHTML;
            }
        });
    }

    $('#save-project').on('click', function () {
        saveProject();

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
    });

    $('#save-project-as').on('click', function () {
        saveProjectAs();
    });
    $('#download-project').on('click', function () {
        downloadCode();
    });
    $('#upload-project').on('click', function () {
        uploadCode();
    });
    $('#clear-workspace').on('click', function () {
        clearWorkspace();
    });

});

showInfo = function (data) {
    console.log(data);
    $(".project-name").text(data['name']);
    if (!data['yours']) {
        $(".project-owner").text("(" + data['user'] + ")");
    }
    var projectBoardIcon = {
        "activity-board": "/cdn/images/board-icons/IconActivityBoard.png",
        "s3": "/cdn/images/board-icons/IconS3.png",
        "heb": "/cdn/images/board-icons/IconBadge.png",
        "flip": "/cdn/images/board-icons/IconFlip.png",
        "other": "/cdn/images/board-icons/IconOtherBoards.png"
    };
    
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    
    $("#project-icon").html('<img src="' + baseUrl + projectBoardIcon[data['board']] + '"/>');
};

saveProject = function () {
    var code = window.frames["content_blocks"].getXml();
    projectData['code'] = code;
    $.post(baseUrl + 'rest/project/code', projectData, function (data) {
        var previousOwner = projectData['yours'];
        projectData = data;
        projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave
        //utils.showMessage(Blockly.Msg.DIALOG_PROJECT_SAVED, Blockly.Msg.DIALOG_PROJECT_SAVED_TEXT);
        if (!previousOwner) {
            window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
        }
    });
};

saveProjectAs = function () {
    utils.prompt("Save project as", projectData['name'], function (value) {
        if (value) {
            var code = window.frames["content_blocks"].getXml();
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
        }
    });
};

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
    if (projectData !== null) {
        window.frames["content_blocks"].load(projectData['code']);
    }
    if (projectData['board'] === 's3' && type === 'PROPC') {
        $('#load-ram-button').addClass('hidden');
        $('#open-graph-output').addClass('hidden');
        document.getElementById('client-available').innerHTML = document.getElementById('client-available-short').innerHTML;
    } else {
        $('#load-ram-button').removeClass('hidden');
        $('#open-graph-output').removeClass('hidden');
        document.getElementById('client-available').innerHTML = document.getElementById('client-available-long').innerHTML;
    }
};

window.onbeforeunload = function () {
    if (checkLeave()) {
        return Blockly.Msg.DIALOG_CHANGED_SINCE;
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

    utils.prompt("Download Project - Filename:", 'Project' + idProject, function (value) {
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
        utils.showMessage('Unsaved Project', 'You must save your project before you can upload a blocks file to it.');
    } else {
        $('#upload-dialog').modal('show');
    }
}

function uploadHandler(files) {
    var UploadReader = new FileReader();
    UploadReader.onload = function () {
        //var parsed = new DOMParser().parseFromString(this.result, "text/xml");
        //var xmlString = (new XMLSerializer()).serializeToString(parsed);
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
        };

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
    };
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
        setTimeout(function() {window.frames["content_blocks"].load(projectData['code']);}, 2000);

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
        setTimeout(function() {window.frames["content_blocks"].load(projectData['code']);}, 2000);

        // Reset all of the upload fields and containers
        clearUploadInfo();
    }
}

function clearWorkspace() {
    utils.confirm(Blockly.Msg.DIALOG_CLEAR_WORKSPACE, Blockly.Msg.DIALOG_CLEAR_WORKSPACE_WARNING, function (value) {
        if (value) {
            window.frames["content_blocks"].location.reload();
            window.frames["content_blocks"].setProfile(projectData['board']);
            window.frames["content_blocks"].init(projectData['board'], []);
            projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
            setTimeout(function() {window.frames["content_blocks"].load(projectData['code']);}, 2000);
        }
    });
}

