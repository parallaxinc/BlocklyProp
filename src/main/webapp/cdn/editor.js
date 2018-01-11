/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var baseUrl = $("meta[name=base]").attr("content");
var cdnUrl = $("meta[name=cdn]").attr("content");   // TODO: this is used in the  blocklypropclient.js file, but that file is loaded first, so when JS is condensed, make sure this global is decalred at the top of the file
var user_authenticated = ($("meta[name=user-auth]").attr("content") === 'true') ? true : false;

var projectData = null;
var ready = false;
var projectLoaded = false;
var ignoreSaveCheck = false;

var last_saved_timestamp = 0;
var last_saved_time = 0;

var idProject = 0;

var uploadedXML = '';

// http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

$(document).ready(function () {
    if (user_authenticated) {
        $('.auth-true').css('display', $(this).attr('displayas'));
        $('.auth-false').css('display', 'none');
    } else {
        $('.auth-false').css('display', $(this).attr('displayas'));
        $('.auth-true').css('display', 'none');
    }
    
    $('.url-prefix').attr('href', function(idx, cur) {return baseUrl + cur;});
    
    // set the URLs for all of the CDN-sourced images
    var imgs = document.getElementsByTagName('img');
    for (var l = 0; l < imgs.length; l++) {
        imgs[l].src = cdnUrl + imgs[l].getAttribute('data-src');
    }
    
    // Set the client download links
    $('.client-win32-link').attr('href', $("meta[name=win32client]").attr("content"));
    $('.client-win64-link').attr('href', $("meta[name=win64client]").attr("content"));
    $('.client-mac-link').attr('href', $("meta[name=macOSclient]").attr("content"));

    idProject = getURLParameter('project');
    if (!idProject) {
        window.location = baseUrl;
    } else {
        $.get(baseUrl + 'rest/shared/project/editor/' + idProject, function (data) {
            console.log(data);
            projectData = data;
            showInfo(data);
            projectLoaded = true;
            if (ready) {
                setProfile(data['board']);
                initToolbox(data['board'], []);
            }
            if (projectData['board'] === 's3') {
                $('#prop-btn-ram').addClass('hidden');
                $('#prop-btn-graph').addClass('hidden');
                document.getElementById('client-available').innerHTML = document.getElementById('client-available-short').innerHTML;
            } else {
                $('#prop-btn-ram').removeClass('hidden');
                $('#prop-btn-graph').removeClass('hidden');
                document.getElementById('client-available').innerHTML = document.getElementById('client-available-long').innerHTML;
            }

            if (data && data['yours'] === false) {
                $('#edit-project-details').html(page_text_label['editor_view-details']);
            } else {
                $('#edit-project-details').html(page_text_label['editor_edit-details']);
            }

            timestampSaveTime(20, true);
            setInterval(checkLastSavedTime, 60000);
        }).fail(function () {
            // Failed to load project - this probably means that it belongs to another user and is not shared.
            utils.showMessage('Unable to Access Project', 'The BlocklyProp Editor was unable to access the project you requested.  If you are sure the project exists, you may need to contact the project\'s owner and ask them to share their project before you will be able to view it.', function () {
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

var timestampSaveTime = function (mins, resetTimer) {
    // Mark the time when the project was opened, add 20 minutes to it.
    var d_save = new Date();
    
    // If the proposed delay is less than the delay that's already in 
    // process, don't update the delay to a new shorter time.
    if (d_save.getTime() + (mins * 60000) > last_saved_timestamp) {
        last_saved_timestamp = d_save.getTime() + (mins * 60000);
        if (resetTimer) {
            last_saved_time = d_save.getTime();
        }
    }
};

var checkLastSavedTime = function () {
    var d_now = new Date();
    var t_now = d_now.getTime();
    var s_save = Math.round((d_now.getTime() - last_saved_time) / 60000);
    $('#save-check-warning-time').html(s_save.toString(10));

    //if (s_save > 58) {
        // TODO: It's been to long - autosave, then close/set URL back to login page.
    //}

    if (t_now > last_saved_timestamp && checkLeave() && user_authenticated) {
        // It's time to pop up a modal to remind the user to save.
        $('#save-check-dialog').modal('show');
    }
};

var showInfo = function (data) {
    //console.log(data);
    $(".project-name").text(data['name']);
    
    // Does the current user own the project?
    if (!data['yours']) {
        // If not, display owner username [and hide save-as menu option - nevermind :) ]
        $(".project-owner").text("(" + data['user'] + ")");
        // $("#save-as-menu-item").css('display', 'none');
    }
    var projectBoardIcon = {
        "activity-board": "images/board-icons/IconActivityBoard.png",
        "s3": "images/board-icons/IconS3.png",
        "heb": "images/board-icons/IconBadge.png",
        "flip": "images/board-icons/IconFlip.png",
        "other": "images/board-icons/IconOtherBoards.png",
        "propcfile": "images/board-icons/IconC.png"
    };

    $("#project-icon").html('<img src="' + cdnUrl + projectBoardIcon[data['board']] + '"/>');
};

function generateBlockId(nonce) {
    var blockId = btoa(nonce).replace(/=/g, '');
    var l = blockId.length;
    if (l < 20) {
        blockId = 'zzzzzzzzzzzzzzzzzzzz'.substr(l - 20) + blockId;
    } else {
    	blockId = blockId.substr(l - 20);
    }
    
    return blockId;
};

var propcAsBlocksXml = function () {
    var code = '<xml xmlns="http://www.w3.org/1999/xhtml">';
    code += '<block type="propc_file" id="' + generateBlockId(codePropC.getValue()) + '" x="100" y="100">';
    code += '<field name="FILENAME">single.c</field>';
    code += '<field name="CODE">';
    code += btoa(codePropC.getValue().replace('/* EMPTY_PROJECT */\n', ''));
    //code += encodeXml(codePropC.getValue().replace('/* EMPTY_PROJECT */\n', ''));
    code += '</field></block></xml>';
    return code;
};

var saveProject = function () {
    var code = '';
    if (projectData['board'] === 'propcfile') {
        code = propcAsBlocksXml();

        Blockly.mainWorkspace.clear();
        loadToolbox(code);
    } else {
        code = getXml();
    }
    projectData['code'] = code;
    $.post(baseUrl + 'rest/project/code', projectData, function (data) {
        var previousOwner = projectData['yours'];
        projectData = data;
        projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave

        // If the current user doesn't own this project, a new one is created and the page is redirected to the new project.
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

    // Mark the time when saved, add 20 minutes to it.
    timestampSaveTime(20, true);
};

var saveAsDialog = function () {
    
    // Old function - still in use because save-as+board type is not approved for use.
    utils.prompt("Save project as", projectData['name'], function (value) {
        if (value) {
            var code = getXml();
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
    
    /*
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
    profile.default.saves_to.forEach(function (bt) {
        $("#save-as-board-type").append($('<option />').val(bt[1]).text(bt[0]));
    });
    
    // Until release to production, make sure we are on demo before displaying the propc option
    if (inDemo === 'demo') {
        $("#save-as-board-type").append($('<option />').val('propcfile').text('Propeller C (code-only)'));
    }
    
    // Open modal
    $('#save-as-type-dialog').modal('show');   
    
    */
};

var checkBoardType = function () {
    var current_type = projectData['board'];
    var save_as_type = $('#save-as-board-type').val();
    // save-as-verify-boardtype
    if (current_type === save_as_type || save_as_type === 'propcfile') {
        document.getElementById('save-as-verify-boardtype').style.display = 'none';
    } else {
        document.getElementById('save-as-verify-boardtype').style.display = 'block';
    }
};

var saveProjectAs = function () {
    // Retrieve the field values
    var p_type = $('#save-as-board-type').val();
    var p_name = $('#save-as-project-name').val();
    
    //get the project's XML code
    var code = '';
    if (projectData['board'] === 'propcfile') {
        code = propcAsBlocksXml();

        Blockly.mainWorkspace.clear();
        loadToolbox(code);
    } else {
        code = getXml();
    }

    // Save the new project using the board-as endpoint
    projectData['board'] = p_type;
    projectData['code'] = code;
    projectData['name'] = p_name;
    $.post(baseUrl + 'rest/project/board-as', projectData, function (data) {
        var previousOwner = projectData['yours'];
        projectData = data;
        projectData['code'] = code; // Save code in projectdata to be able to verify if code has changed upon leave

        // Reloading project with new id
        window.location.href = baseUrl + 'projecteditor?id=' + data['id'];
    });
    timestampSaveTime(20, true);      
};

var editProjectDetails = function () {
    window.location.href = baseUrl + 'my/projects.jsp#' + idProject;
};

var blocklyReady = function () {
    // if debug mode is active, show the XML button
    if (getURLParameter('debug')) {
        document.getElementById('btn-view-xml').style.display = 'inline-block';
    } else {
        document.getElementById('btn-view-xml').style.display = 'none';
    }
    
    if (projectLoaded) {
        setProfile(projectData['board']);
        initToolbox(projectData['board'], []);
    } else {
        ready = true;
    }
};

window.onbeforeunload = function () {
    if (checkLeave()) {
        return Blockly.Msg.DIALOG_CHANGED_SINCE;
    }
};

var checkLeave = function () {
    var currentXml = '';
    var savedXml = projectData['code'];
    if (ignoreSaveCheck) {
        return false;
    }
    if (projectData['board'] === 'propcfile') {
        currentXml = propcAsBlocksXml();
    } else {
        currentXml = getXml();
    }
    if (projectData === null) {
        if (currentXml === '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>') {
            return false;
        } else {
            return true;
        }
    } else {
        if (savedXml === currentXml) {
            return false;
        } else {
            return true;
        }
    }
};

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
    var projXMLcode = getXml(); //projectData['code'];
    projXMLcode = projXMLcode.substring(42, projXMLcode.length);
    projXMLcode = projXMLcode.substring(0, (projXMLcode.length - 6));

    utils.prompt(Blockly.Msg.DIALOG_DOWNLOAD, 'Project' + idProject, function (value) {
        if (value) {
            // get the paths of the blocks themselves and the size/position of the blocks
            var projSVG = document.getElementsByClassName('blocklyBlockCanvas');
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

function uploadMergeCode(append) {
    $('#upload-dialog').modal('hide');
    if (uploadedXML !== '') {
        var projCode = '';
        if (append) {
            projCode = getXml();
            projCode = projCode.substring(42, projCode.length);
            projCode = projCode.substring(0, (projCode.length - 6));
        }

        var newCode = uploadedXML;
        newCode = newCode.substring(42, newCode.length);
        newCode = newCode.substring(0, (newCode.length - 6));

        projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml">' + projCode + newCode + '</xml>';
        Blockly.mainWorkspace.clear();
        loadToolbox(projectData['code']);
        clearUploadInfo();
    }
}

function filterToolbox(profileName, peripherals) {
    var componentlist = peripherals.slice();
    componentlist.push(profileName);

    $("#toolbox").find('category').each(function () {
        var toolboxEntry = $(this);
        var include = toolboxEntry.attr('include');
        if (include) {
            var includes = include.split(",");
            if (!findOne(componentlist, includes)) {
                toolboxEntry.remove();
            }
        }

        var exclude = toolboxEntry.attr('exclude');
        if (exclude) {
            var excludes = exclude.split(",");
            if (findOne(componentlist, excludes)) {
                toolboxEntry.remove();
            }
        }

        // Remove toolbox categories that are experimental if not in demo
        var experimental = toolboxEntry.attr('experimental');
        if (experimental && inDemo !== 'demo') {
            toolboxEntry.remove();
        }
        
        // Set the category's label
        var catKey = toolboxEntry.attr('key');
        if (catKey) {
            toolboxEntry.attr('name', toolbox_label[catKey]);
        }

        if (document.referrer.indexOf('?') !== -1) {
            if (document.referrer.split('?')[1].indexOf('grayscale=1') > -1) {
                var colorChanges = {
                    '140': '#AAAAAA',
                    '165': '#222222',
                    '185': '#333333',
                    '205': '#444444',
                    '225': '#555555',
                    '250': '#666666',
                    '275': '#777777',
                    '295': '#888888',
                    '320': '#999999',
                    '340': '#111111'
                };
                var colour = toolboxEntry.attr('colour');
                if (colour)
                    toolboxEntry.attr('colour', colorChanges[colour]);
            }
        }
    });
    $("#toolbox").find('sep').each(function () {
        var toolboxEntry = $(this);
        var include = toolboxEntry.attr('include');
        if (include) {
            var includes = include.split(",");
            if (!findOne(componentlist, includes)) {
                toolboxEntry.remove();
            }
        }

        var exclude = toolboxEntry.attr('exclude');
        if (exclude) {
            var excludes = exclude.split(",");
            if (findOne(componentlist, excludes)) {
                toolboxEntry.remove();
            }
        }
    });

    $("#toolbox").find('block').each(function () {
        var toolboxEntry = $(this);
        
        // Remove toolbox categories that are experimental if not in demo
        var experimental = toolboxEntry.attr('experimental');
        if (experimental && inDemo !== 'demo') {
            toolboxEntry.remove();
        }
        
        var include = toolboxEntry.attr('include');
        if (include) {
            var includes = include.split(",");
            if (!findOne(componentlist, includes)) {
                toolboxEntry.remove();
            }
        }

        var exclude = toolboxEntry.attr('exclude');
        if (exclude) {
            var excludes = exclude.split(",");
            if (findOne(componentlist, excludes)) {
                toolboxEntry.remove();
            }
        }

    });

}

// http://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-elements-in-another-array-in-javascript
/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        // console.log(v + " " + (haystack.indexOf(v) >= 0));
        return haystack.indexOf(v) >= 0;
    });
};

function initToolbox(profileName, peripherals) {
    filterToolbox(profileName, peripherals);
    Blockly.inject('content_blocks', {
        toolbox: document.getElementById('toolbox'),
        trashcan: true,
        media: cdnUrl + 'blockly/media/',
        readOnly: (profileName === 'propcfile' ? true : false),
        //path: cdnUrl + 'blockly/',
        comments: false,
        zoom: {
          controls: true,
          wheel: false,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        }
    });
    
    init(Blockly);
}

function loadToolbox(xmlText) {
    var xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
}

function getXml() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    return Blockly.Xml.domToText(xml);
}

function showOS(o) {
    $("body").removeClass('Windows')
            .removeClass('MacOS')
            .removeClass('Linux')
            .removeClass('ChromeOS');
    $("body").addClass(o);
}

function showStep(o, i, t) {
    for (var j = 1; j <= t; j++) {
        $('#' + o + j.toString() + '-btn').addClass('btn-default').removeClass('btn-primary');
        $('#' + o + j.toString()).addClass('hidden');
    }
    $('#' + o + i.toString() + '-btn').removeClass('btn-default').addClass('btn-primary');
    $('#' + o + i.toString()).removeClass('hidden');
}
