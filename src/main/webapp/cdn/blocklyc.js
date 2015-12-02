var BlocklyProp = {};

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'propc', 'xml'];

var selected = 'blocks';

var term = null;

var codePropC = null;
var codeXml = null;

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
        document.getElementById('content_' + TABS_[x]).style.display = 'none';
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
//        var xmlTextarea = document.getElementById('textarea_xml');
        var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
//        xmlTextarea.value = xmlText;
//        xmlTextarea.focus();

        /*} else if (content.id == 'content_javascript') {
         content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
         } else if (content.id == 'content_dart') {
         content.innerHTML = Blockly.Generator.workspaceToCode('Dart');
         } else if (content.id == 'content_python') {
         content.innerHTML = Blockly.Generator.workspaceToCode('Python');*/
        codeXml.setValue(xmlText);
        codeXml.gotoLine(0);
    } else if (content.id == 'content_propc') {
        //content.innerHTML = Blockly.Generator.workspaceToCode('Arduino');
        //  var propcTextarea = document.getElementById('textarea_propc');
        //  propcTextarea.value = Blockly.propc.workspaceToCode(Blockly.mainWorkspace);
        //  propcTextarea.focus();
        codePropC.setValue(Blockly.propc.workspaceToCode(Blockly.mainWorkspace));
        codePropC.gotoLine(0);
    }
}

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
function init(blockly) {
    codePropC = ace.edit("code-propc");
    codePropC.setTheme("ace/theme/chrome");
    codePropC.getSession().setMode("ace/mode/c_cpp");
    codePropC.setReadOnly(true);

    codeXml = ace.edit("code-xml");
    codeXml.setTheme("ace/theme/chrome");
    codeXml.getSession().setMode("ace/mode/xml");
    codeXml.setReadOnly(true);

    window.Blockly = blockly;

    // var blockly_frame = document.getElementById("content_blocks");
    // Blockly.inject(blockly_frame, {path: '../../'});

    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.Toolbox) {
        window.setTimeout(function () {
            document.getElementById('tab_blocks').style.minWidth =
                    (Blockly.Toolbox.width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
        }, 1);
    }

    loadProject();
}

function cloudCompile(text, action, successHandler) {
    $("#compile-dialog-title").text(text);
    $("#compile-console").val('');
    $('#compile-dialog').modal('show');

    var propcCode = Blockly.propc.workspaceToCode();
    $.ajax({
        'method': 'POST',
        'url': baseUrl + 'rest/compile/c/' + action + '?id=' + idProject,
        'data': propcCode
    }).done(function (data) {
        if (data.error) {
            alert(data['message']);
        } else {
            if (data.success) {
                $("#compile-console").val(data['compiler-output'] + data['compiler-error']);
                successHandler(data);
            } else {
                $("#compile-console").val(data['compiler-output'] + data['compiler-error']);
            }
        }
    }).fail(function (data) {
        alert(data);
    });
}

/**
 *
 */
function compile() {
    cloudCompile('Compile', 'compile', function (data) {

    });
}

/**
 *
 */
function loadIntoRam() {
    if (client_available) {
        cloudCompile('Load into ram', 'bin', function (data) {
            $.post(client_url + 'load.action', {action: "RAM", binary: data.binary, extension: data.extension, "comport": getComPort()}, function (loaddata) {
                $("#compile-console").val($("#compile-console").val() + loaddata.message);
                console.log(loaddata);
            });
        });
    } else {
        alert("BlocklyPropClient not available to communicate with a microcontroller");
    }
}

/**
 *
 */
function loadIntoEeprom() {
    if (client_available) {
        cloudCompile('Load into eeprom', 'eeprom', function (data) {
            $.post(client_url + 'load.action', {action: "EEPROM", binary: data.binary, extension: data.extension, "comport": getComPort()}, function (loaddata) {
                $("#compile-console").val($("#compile-console").val() + loaddata.message);
                console.log(loaddata);
            });
        });
    } else {
        alert("BlocklyPropClient not available to communicate with a microcontroller");
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
        connection.onopen = function () {
            connection.send('+++ open port ' + getComPort());

        };
        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error ' + error);
            console.log(error);
            term.destroy();
        };
        // Log messages from the server
        connection.onmessage = function (e) {
            //console.log('Server: ' + e.data);
            term.write(e.data);
        };

        term.on('data', function (data) {
            //console.log(data);
            connection.send(data);
        });

        if (newTerminal) {
            term.open(document.getElementById("serial_console"));
        }
        connection.onClose = function () {
            //  term.destroy();
        };

        $('#console-dialog').on('hidden.bs.modal', function () {
            connection.close();
        });
    } else {
        term.on('data', function (data) {
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

check_com_ports = function () {
    if (client_url !== undefined) {
        var selected_port = $("#comPort").val();
        $.get(client_url + "ports.json", function (data) {
            $("#comPort").empty();
            data.forEach(function (port) {
                $("#comPort").append($('<option>', {
                    text: port
                }));
            });
            select_com_port(selected_port);
            client_available = true;
        }).fail(function () {
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

select_com_port = function (com_port) {
    if (com_port !== null) {
        $("#comPort").val(com_port);
    }
    if ($("#comPort").val() === null && $('#comPort option').size() > 0) {
        $("#comPort").val($('#comPort option:first').text());
    }
};

$(document).ready(function () {
    check_com_ports();

});

getComPort = function () {
    return $('#comPort').find(":selected").text();
};
