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

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'spin', 'xml'];

var selected = 'blocks';

var term = null;


/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
function tabClick(id) {
    // If the XML tab was open, save and render the content.
    if (document.getElementById('tab_xml').className == 'active') {
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
        if (document.getElementById('content_' + TABS_[x])) {
            document.getElementById('content_' + TABS_[x]).style.display = 'none';
        } else {
//            document.getElementByName('content_' + TABS_[x])[0].style.display = 'none';
        }
    }

    // Select the active tab.
    selected = id.replace('tab_', '');
    document.getElementById(id).className = 'active';
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
    } else if (content.id == 'content_spin') {
        //content.innerHTML = Blockly.Generator.workspaceToCode('Arduino');
        var spinTextarea = document.getElementById('textarea_spin');
        console.log('workspace to code: Spin');
        spinTextarea.value = Blockly.Generator.workspaceToCode('Spin');
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
    loadProject();
}

/**
 *
 */
function compile() {
    if (client_available) {
        var spinCode = Blockly.Generator.workspaceToCode('Spin');

        $("#compile-dialog-title").text('Compile');
        $("#compile-console").val('');
        $('#compile-dialog').modal('show');

        $.post(client_url + 'compile.action', {action: "COMPILE", language: "spin", code: spinCode}, function(data) {
            $("#compile-console").val(data.message);
            console.log(data);
        });
    } else {
        $("#compile-dialog-title").text('Compile');
        $("#compile-console").val('');
        $('#compile-dialog').modal('show');

        $("#compile-console").val("In demo mode you cannot compile or communicate with a microcontroller");
    }
}

/**
 *
 */
function loadIntoRam() {
    if (client_available) {
        var spinCode = Blockly.Generator.workspaceToCode('Spin');

        $("#compile-dialog-title").text('Compile');
        $("#compile-console").val('');
        $('#compile-dialog').modal('show');

        $.post(client_url + 'compile.action', {action: "RAM", language: "spin", code: spinCode, "comport": getComPort()}, function(data) {
            $("#compile-console").val(data.message);
            console.log(data);
        });
    } else {
        $("#compile-dialog-title").text('Load into ram');
        $("#compile-console").val('');
        $('#compile-dialog').modal('show');

        $("#compile-console").val("In demo mode you cannot compile or communicate with a microcontroller");
    }
}

/**
 *
 */
function loadIntoEeprom() {
    if (client_available) {
        var spinCode = Blockly.Generator.workspaceToCode('Spin');

        $("#compile-dialog-title").text('Compile');
        $("#compile-console").val('');
        $('#compile-dialog').modal('show');

        $.post(client_url + 'compile.action', {action: "EEPROM", language: "spin", code: spinCode, "comport": getComPort()}, function(data) {
            $("#compile-console").val(data.message);
            console.log(data);
        });
    } else {
        $("#compile-dialog-title").text('Load into eeprom');
        $("#compile-console").val('');
        $('#compile-dialog').modal('show');

        $("#compile-console").val("In demo mode you cannot compile or communicate with a microcontroller");
    }
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

    if (client_available) {
        var url = client_url + 'serial.connect';
        url = url.replace('http', 'ws');
        var connection = new WebSocket(url);

        // When the connection is open, open com port
        connection.onopen = function() {
            connection.send('+++ open port ' + getComPort());

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
            //  term.destroy();
        };

        $('#console-dialog').on('hidden.bs.modal', function() {
            connection.close();
        });
    } else {
        term.on('data', function(data) {
            data = data.replace('\r', '\r\n');
            term.write(data);
        });

        if (newTerminal) {
            term.open(document.getElementById("serial_console"));
            term.write("Simulated terminal because you are in demo mode\n\r");

            term.write("Connection established with: " + getComPort() + "\n\r");
        }
    }

    $('#console-dialog').modal('show');
}

check_com_ports = function() {
    if (client_url !== undefined) {
        var selected_port = $("#comPort").val();
        $.get(client_url + "ports.json", function(data) {
            $("#comPort").empty();
            data.forEach(function(port) {
                $("#comPort").append($('<option>', {
                    text: port
                }));
            });
            select_com_port(selected_port);
            client_available = true;
        }).fail(function() {
            $("#comPort").empty();
            $("#comPort").append($('<option>', {
                text: 'COM1'
            }));
            $("#comPort").append($('<option>', {
                text: 'COM3'
            }));
            $("#comPort").append($('<option>', {
                text: 'COM4'
            }));
            select_com_port(selected_port);
            client_available = false;
        });
    }
};

select_com_port = function(com_port) {
    if (com_port !== null) {
        $("#comPort").val(com_port);
    }
    if ($("#comPort").val() === null && $('#comPort option').size() > 0) {
        $("#comPort").val($('#comPort option:first').text());
    }
};

$(document).ready(function() {
    check_com_ports();

});

getComPort = function() {
    return $('#comPort').find(":selected").text();
};
