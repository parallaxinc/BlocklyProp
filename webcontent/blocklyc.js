// Whitelist of blocks to keep.
/*var newLanguage = {}
 var keepers = ['controls_loop', 'controls_delay', 'control_map',
 //'setup_pinmode', 'output_digital_write', 'output_analog_write',
 //'controls_if', 'controls_if_if', 'controls_if_elseif',
 //'controls_if_else', 'controls_whileUntil', 'controls_for',
 //'controls_flow_statements',
 //'math_number','math_arithmetic',//'math_modulo',
 //'logic_compare', 'logic_operation', 'logic_negate', 'logic_boolean',
 //'variables_get','variables_set',
 //'procedures_defnoreturn', 'procedures_defreturn', 'procedures_callnoreturn', 'procedures_callreturn'
 ];
 for (var x = 0; x < keepers.length; x++) {
 newLanguage[keepers[x]] = Blockly.Language[keepers[x]];
 }
 // Fold control category into logic category.
 for (var name in newLanguage) {
 if (newLanguage[name].category == 'Math') {
 newLanguage[name].category = 'Logic';
 }
 }
 Blockly.Language = newLanguage;*/

var BlocklyProp = {};

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'propc', 'xml'];

var selected = 'blocks';

var term = null;

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
function tabClick(id) {
    // If the XML tab was open, save and render the content.
    if (document.getElementById('tab_xml').className == 'tabon') {
        var xmlTextarea = document.getElementById('textarea_xml');
        var xmlText = xmlTextarea.value;
        var xmlDom = null;
        try {
            xmlDom = Blockly.Xml.textToDom(xmlText);
        } catch (e) {
            var q =
                    window.confirm('Error parsing XML:\n' + e + '\n\nAbandon changes?');
            if (!q) {
                // Leave the user on the XML tab.
                return;
            }
        }
        if (xmlDom) {
            Blockly.mainWorkspace.clear();
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
        }
    }

    // Deselect all tabs and hide all panes.
    for (var x in TABS_) {
        document.getElementById('tab_' + TABS_[x]).className = 'taboff';
        document.getElementById('content_' + TABS_[x]).style.display = 'none';
    }

    // Select the active tab.
    selected = id.replace('tab_', '');
    document.getElementById(id).className = 'tabon';
    // Show the selected pane.
    var content = document.getElementById('content_' + selected);
    content.style.display = 'block';
    renderContent();
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
function renderContent() {
    var content = document.getElementById('content_' + selected);
    // Initialize the pane.
    if (content.id == 'content_blocks') {
        // If the workspace was changed by the XML tab, Firefox will have performed
        // an incomplete rendering due to Blockly being invisible.  Rerender.
        Blockly.mainWorkspace.render();
    } else if (content.id == 'content_xml') {
        var xmlTextarea = document.getElementById('textarea_xml');
        var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        xmlTextarea.value = xmlText;
        xmlTextarea.focus();
        /*} else if (content.id == 'content_javascript') {
         content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
         } else if (content.id == 'content_dart') {
         content.innerHTML = Blockly.Generator.workspaceToCode('Dart');
         } else if (content.id == 'content_python') {
         content.innerHTML = Blockly.Generator.workspaceToCode('Python');*/
    } else if (content.id == 'content_propc') {
        //content.innerHTML = Blockly.Generator.workspaceToCode('Arduino');
        var spinTextarea = document.getElementById('textarea_propc');
        spinTextarea.value = Blockly.Generator.workspaceToCode('propc');
        spinTextarea.focus();
    }
}

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
function init(blockly) {
    //window.onbeforeunload = function() {
    //  return 'Leaving this page will result in the loss of your work.';
    //};

    window.Blockly = blockly;

    // var blockly_frame = document.getElementById("content_blocks");
    // Blockly.inject(blockly_frame, {path: '../../'});

    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.Toolbox) {
        window.setTimeout(function() {
            document.getElementById('tab_blocks').style.minWidth =
                    (Blockly.Toolbox.width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
        }, 1);
    }

    auto_save_and_restore_blocks();

    //load from url parameter (single param)
    //http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
    var dest = unescape(location.search.replace(/^.*\=/, '')).replace(/\+/g, " ");
    if (dest) {
        load_by_url(dest);
    }
}

/**
 *
 */
function compile() {
    var propcCode = Blockly.Generator.workspaceToCode('propc');

    $("#compile-dialog-title").text('Compile');
    $("#compile-console").val('');
    $('#compile-dialog').modal('show');


    // Store data in blob.
    // var builder = new BlobBuilder();
    // builder.append(data);
    // saveAs(builder.getBlob('text/plain;charset=utf-8'), 'blockduino.xml');
    //console.log("Compiling");

    $.post('/webapp/cpropeller.action', {action: "COMPILE", code: propcCode}, function(data) {
        $("#compile-console").val(data.message);
        console.log(data);
    });

//    var blob = new Blob([data], {type: 'text/xml'});
//    saveAs(blob, 'spin.xml');
}

/**
 *
 */
function loadIntoRam() {
    var propcCode = Blockly.Generator.workspaceToCode('propc');

    $("#compile-dialog-title").text('Load into ram');
    $("#compile-console").val('');
    $('#compile-dialog').modal('show');

    // Store data in blob.
    // var builder = new BlobBuilder();
    // builder.append(data);
    // saveAs(builder.getBlob('text/plain;charset=utf-8'), 'blockduino.xml');
    //console.log("Compiling");

    $.post('/webapp/cpropeller.action', {action: "LOAD_RAM", code: propcCode}, function(data) {
        var combinedMessage = '';
        data.forEach(function(dataPart) {
            if (combinedMessage.length > 0) {
                combinedMessage += '\n\n';
            }
            combinedMessage += dataPart.message;
        });
        $("#compile-console").val(combinedMessage);
        console.log(data);
    });

//    var blob = new Blob([data], {type: 'text/xml'});
//    saveAs(blob, 'spin.xml');
}

/**
 *
 */
function loadIntoEeprom() {
    var propcCode = Blockly.Generator.workspaceToCode('propc');

    $("#compile-dialog-title").text('Load into eeprom');
    $("#compile-console").val('');
    $('#compile-dialog').modal('show');

    // Store data in blob.
    // var builder = new BlobBuilder();
    // builder.append(data);
    // saveAs(builder.getBlob('text/plain;charset=utf-8'), 'blockduino.xml');
    //console.log("Compiling");

    $.post('/webapp/cpropeller.action', {action: "LOAD_EEPROM", code: propcCode}, function(data) {
        var combinedMessage = '';
        data.forEach(function(dataPart) {
            if (combinedMessage.length > 0) {
                combinedMessage += '\n\n';
            }
            combinedMessage += dataPart.message;
        });
        $("#compile-console").val(combinedMessage);
        console.log(data);
    });

//    var blob = new Blob([data], {type: 'text/xml'});
//    saveAs(blob, 'spin.xml');
}

function serial_console() {
    var newTerminal = false;
    if (term === null) {
        term = new Terminal({
            cols: 80,
            rows: 24,
            useStyle: true,
            screenKeys: true
        });

        newTerminal = true;
    }

    var url = document.location.protocol + document.location.host + '/webapp/websockets/serial.connect';
    url = url.replace('http', 'ws');
    var connection = new WebSocket(url);

    // When the connection is open, open com port
    connection.onopen = function() {
        connection.send('+++ open port COM4');

    };
    // Log errors
    connection.onerror = function(error) {
        console.log('WebSocket Error ' + error);
        console.log(error);
        term.destroy();
    };
    // Log messages from the server
    connection.onmessage = function(e) {
        //console.log('Server: ' + e.data);
        term.write(e.data);
    };

    term.on('data', function(data) {
        //console.log(data);
        connection.send(data);
    });

    if (newTerminal) {
        term.open(document.getElementById("serial_console"));
    }
    connection.onClose = function() {
        term.destroy();
    };

    $('#console-dialog').modal('show');
    $('#console-dialog').on('hidden.bs.modal', function() {
        connection.close();
    });
}

$(document).ready(function() {
    $('#setup-dialog').modal('show');
    $('#setup-dialog').on('hidden.bs.modal', function() {
        window.frames["content_blocks"].setProfile($('#board-type').val());
        window.frames["content_blocks"].init();
    });
});