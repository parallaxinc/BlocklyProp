var BlocklyProp = {};

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'propc', 'xml'];

var selected = 'blocks';

var term = null;
var graph = null;

var codePropC = null;
var codeXml = null;

var baudrate = 115200;

var graph_temp_data = new Array;
var graph_data_ready = false;
var graph_connection_string = '';
var graph_timestamp_start = null;
var graph_temp_string = new String;
var graph_time_multiplier = 0;
var graph_interval_id = null;
var fullCycleTime = 4294967296 / 80000000;

var console_header_arrived = false;
var console_header = null;

var graph_options = {
    showPoint: false,
    fullWidth: true,
    axisX: {
        type: Chartist.AutoScaleAxis,
        onlyInteger: true
    },
    refreshRate: 250,
    sampleTotal: 40
};

var graph_data = {
    series: [// add more here for more possible lines...
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
};


/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
function tabClick(id) {
    // If the XML tab was open, save and render the content.
    /* if (document.getElementById('tab_xml').className == 'active') {
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
     }*/

    // Deselect all tabs and hide all panes.
    for (var x in TABS_) {
        //if (document.getElementById('tab_' + TABS_[x])) {
        //    document.getElementById('tab_' + TABS_[x]).className = 'taboff';
        //}
        document.getElementById('content_' + TABS_[x]).style.display = 'none';
    }

    // Select the active tab.
    selected = id.replace('tab_', '');
    //document.getElementById(id).className = 'active';

    if (id === 'tab_blocks') {
        document.getElementById('btn-view-blocks').style.display = 'none';
        var btns = document.getElementsByClassName("btn-view-code");
        for (var i = 0; i < btns.length; i++)
        {
            btns[i].style.display = 'inline';
        }
    } else {
        document.getElementById('btn-view-blocks').style.display = 'inline';
        var btns = document.getElementsByClassName("btn-view-code");
        for (var i = 0; i < btns.length; i++)
        {
            btns[i].style.display = 'none';
        }
    }

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
    if (content.id === 'content_blocks') {
        Blockly.mainWorkspace.render();
    } else if (content.id === 'content_xml') {
        var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        codeXml.setValue(xmlText);
        codeXml.gotoLine(0);
    } else if (content.id === 'content_propc') {
        var code = Blockly.propc.workspaceToCode(Blockly.mainWorkspace);
        code = js_beautify(code, {
            'brace_style': 'expand'
        });
        code = code.replace(/,\n[\s\xA0]+/g, ", ");
        code = code.replace(/, & /g, ", &");
        code = code.replace(/, \* /g, ", *");
        code = code.replace(/\( & /g, "(&");
        code = code.replace(/\( \* /g, "(*");
        code = code.replace(/char \* /g, "char *");
        codePropC.setValue(code);
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

    // Make the 'Blocks' tab line up with the toolbox.
    /*
     if (Blockly.Toolbox) {
     window.setTimeout(function () {
     document.getElementById('tab_blocks').style.minWidth =
     (Blockly.Toolbox.width - 38) + 'px';
     // Account for the 19 pixel margin and on each side.
     }, 1);
     }
     */

    loadProject();
}

function setBaudrate(_baudrate) {
    baudrate = _baudrate;
}

function cloudCompile(text, action, successHandler) {

    var propcCode = Blockly.propc.workspaceToCode(Blockly.mainWorkspace);
    var isEmptyProject = propcCode.indexOf("EMPTY_PROJECT") > -1;
    if (isEmptyProject) {
        alert("You can't compile an empty project");
    } else {
        $("#compile-dialog-title").text(text);
        $("#compile-console").val('');
        $('#compile-dialog').modal('show');


        propcCode = js_beautify(propcCode, {
            'brace_style': 'expand'
        });

        var terminalNeeded = false;
        if (propcCode.indexOf("SERIAL_TERMINAL USED") > -1)
            terminalNeeded = 'term';
        else if (propcCode.indexOf("SERIAL_GRAPHING USED") > -1)
            terminalNeeded = 'graph';

        $.ajax({
            'method': 'POST',
            'url': baseUrl + 'rest/compile/c/' + action + '?id=' + idProject,
            'data': {"code": propcCode}
        }).done(function (data) {
            if (data.error) {
                if (typeof data['message'] === "string")
                    alert("BlocklyProp was unable to compile your project:\n" + data['message']
                            + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-\u2381-R (Mac)");
                else
                    alert("BlocklyProp was unable to compile your project:\n" + data['message'].toString()
                            + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-\u2381-R (Mac)");
            } else {
                if (data.success) {
                    $("#compile-console").val(data['compiler-output'] + data['compiler-error']);
                    successHandler(data, terminalNeeded);
                } else {
                    $("#compile-console").val(data['compiler-output'] + data['compiler-error']);
                }
            }
        }).fail(function (data) {
            if (typeof data === "string")
                alert("BlocklyProp was unable to compile your project:\n----------\n" + data
                        + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-\u2381-R (Mac)");
            else
                alert("BlocklyProp was unable to compile your project:\n----------\n" + data.toString()
                        + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-\u2381-R (Mac)");
        });
    }
}

/**
 *
 */
function compile() {
    cloudCompile('Compile', 'compile', function (data, terminalNeeded) {

    });
}

/**
 *
 */
function loadIntoRam() {
    if (client_available) {
        cloudCompile('Load into ram', 'bin', function (data, terminalNeeded) {
            $.post(client_url + 'load.action', {action: "RAM", binary: data.binary, extension: data.extension, "comport": getComPort()}, function (loaddata) {
                $("#compile-console").val($("#compile-console").val() + loaddata.message);
                console.log(loaddata);
                if (terminalNeeded === 'term' && loaddata.success) {
                    serial_console();
                } else if (terminalNeeded === 'graph' && loaddata.success) {
                    graphing_console();
                }
            });
        });
    } else {
        alert("BlocklyPropClient not available to communicate with a microcontroller"
                + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-\u2381-R (Mac)");
    }
}

/**
 *
 */
function loadIntoEeprom() {
    if (client_available) {
        cloudCompile('Load into eeprom', 'eeprom', function (data, terminalNeeded) {
            $.post(client_url + 'load.action', {action: "EEPROM", binary: data.binary, extension: data.extension, "comport": getComPort()}, function (loaddata) {
                $("#compile-console").val($("#compile-console").val() + loaddata.message);
                console.log(loaddata);
                if (terminalNeeded === 'term' && loaddata.success) {
                    serial_console();
                } else if (terminalNeeded === 'graph' && loaddata.success) {
                    graphing_console();
                }
            });
        });
    } else {
        alert("BlocklyPropClient not available to communicate with a microcontroller"
                + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-\u2381-R (Mac)");
    }
}

function serial_console() {
    var newTerminal = false;
    if (term === null) {
        term = new Terminal({
            cols: 256,
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
            if (baud_rate_compatible && baudrate) {
                connection.send('+++ open port ' + getComPort() + ' ' + baudrate);
            } else {
                connection.send('+++ open port ' + getComPort());
            }

        };
        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error');
            console.log(error);
            // term.destroy();
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
        } else {
            term.reset();
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

function graphing_console() {
    var newGraph = false;
    var propcCode = Blockly.propc.workspaceToCode(Blockly.mainWorkspace);

    // If there are graph settings, extract them
    var graph_settings_start = propcCode.indexOf("// GRAPH_SETTINGS_START:");
    if (graph_settings_start > -1) {
        var graph_settings_end = propcCode.indexOf(":GRAPH_SETTINGS_END //") + 22;
        var graph_settings_temp = propcCode.substring(graph_settings_start, graph_settings_end).split(':');
        var graph_settings_str = graph_settings_temp[1].split(',');

        // GRAPH_SETTINGS:rate,x_axis_val,x_axis_type,y_min,y_max:GRAPH_SETTINGS_END //

        graph_options.refreshRate = Number(graph_settings_str[0]);

        if (graph_settings_str[3] === '0' && graph_settings_str[4] === '0')
            graph_options.axisY = {
                type: Chartist.AutoScaleAxis,
            };
        else
            graph_options.axisY = {
                type: Chartist.AutoScaleAxis,
                low: Number(graph_settings_str[3]),
                high: Number(graph_settings_str[4])
            };

        if (graph_settings_str[2] === 'S')
            graph_options.sampleTotal = Number(graph_settings_str[1]);
    }

    if (graph === null) {
        graph_reset();
        graph_temp_string = '';
        graph = new Chartist.Line('#serial_graphing', graph_data, graph_options);
        newGraph = true;
    }

    if (client_available) {
        var url = client_url + 'serial.connect';
        url = url.replace('http', 'ws');
        var connection = new WebSocket(url);
        
        // When the connection is open, open com port
        connection.onopen = function () {
            if (baud_rate_compatible && baudrate) {
                connection.send('+++ open port ' + getComPort() + ' ' + baudrate);
            } else {
                connection.send('+++ open port ' + getComPort());
            }

        };
        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error');
            console.log(error);
            //connection.close();
            //connection = new WebSocket(url);
        };
        
        // Log messages from the server
        connection.onmessage = function (e) {
           graph_new_data(e.data);
        };
        
        if (newGraph || graph !== null) {
            graph_interval_id = setInterval(function () {graph.update(graph_data);}, graph_options.refreshRate);
        }

        connection.onClose = function () {
            graph_reset();
        };
        
        $('#graphing-dialog').on('hidden.bs.modal', function () {
            connection.close();
            graph_reset();
        });
    } else {
        /*  Create simulated graph?  */
    }

    $('#graphing-dialog').modal('show');
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
                text: 'Searching...'
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
function downloadPropC() {
    var propcCode = Blockly.propc.workspaceToCode(Blockly.mainWorkspace);
    var isEmptyProject = propcCode.indexOf("EMPTY_PROJECT") > -1;
    if (isEmptyProject) {
        alert("You can't download an empty project");
    } else {
        utils.confirm('Downloading a SimpleIDE project', 'To open your project in SimpleIDE, two files will be downloaded.  They must both be saved in the same folder on your computer.', function (confirmed) {
            if (confirmed) {
                utils.prompt("Enter a filename:", 'Project' + idProject, function (value) {
                    if (value) {

                        var sideFileContent = ".c\n>compiler=C\n>memtype=cmm main ram compact\n";
                        sideFileContent += ">optimize=-Os\n>-m32bit-doubles\n>-fno-exceptions\n>defs::-std=c99\n";
                        sideFileContent += ">-lm\n>BOARD::ACTIVITYBOARD";
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
                        // Check for any file extentions at the end of the submitted name, and truncate if any
                        if (value.indexOf(".") !== -1)
                            value = value.substring(0, value.indexOf("."));
                        // Check to make sure the filename is not too long
                        if (value.length >= 30)
                            value = value.substring(0, 29);
                        // Replace any illegal characters
                        value = value.replace(/[\\/:*?\"<>|]/g, '_');
                        saveData(propcCode, value + ".c");
                        saveData(value + sideFileContent, value + ".side");
                    }
                });
            }
        });
    }
}

function graph_new_data(stream) {

    /*
     // Attempt to capture connection information:
    
     var j = 0;
     while (!graph_data_ready) {
        if (stream[0] === '\n')
            stream[0] = '\r';
        graph_connection_string[j] = stream[0];
        stream = stream.slice(1);
        if (graph_connection_string[j] === '\r' && graph_connection_string[j - 1] === '\r')
            graph_data_ready = true;
        j++;
        }
    */

    // Check for a failed connection:
    if (stream.indexOf('ailed') > -1) {
        $("#serial_graphing").html(stream);
        
    } else {
        for (k = 0; k < stream.length; k++) {
            if (stream[k] === '\n')
                stream[k] = '\r';
            if (stream[k] === '\r') {
                graph_temp_data.push(graph_temp_string.split(','));
                var row = graph_temp_data.length - 1;
                var ts = Number(graph_temp_data[row][0]) || 0;
                ts = ts / 1220.703125; // convert to seconds - Propeller system clock left shifted by 16;
                if (!graph_timestamp_start)
                    graph_timestamp_start = ts;
                if (row > 0) {
                    if (parseFloat(graph_temp_data[row][0]) < parseFloat(graph_temp_data[row - 1][1])) {
                        graph_time_multiplier += fullCycleTime;
                    }
                }
                graph_temp_data[row].unshift(ts + graph_time_multiplier - graph_timestamp_start);
                for (j = 2; j < graph_temp_data[row].length; j++) {
                    graph_data.series[j - 2].push({
                        x: graph_temp_data[row][0],
                        y: graph_temp_data[row][j] || null
                    });
                    if (graph_temp_data[row][0] > graph_options.sampleTotal)
                        graph_data.series[j - 2].shift();
                }
                
                /*
                 var read_serial_to_div = '';
                 for (var l = 0; l < graph_temp_data[row].length; l++)
                 read_serial_to_div += graph_temp_data[row].toString() + '\n';
                 $( "#serial_graphing" ).html(read_serial_to_div);
                 */

                graph_temp_string = '';
            } else {
                graph_temp_string += stream[k];
            }
        }
    }
}

function graph_reset() {
    clearInterval(graph_interval_id);
    graph_interval_id = null;
    graph_temp_data.length = 0;
    graph_data = {
        series: [// add more here for more possible lines...
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    };
    graph_temp_string = '';
    graph_timestamp_start = null;
    $("#serial_graphing").html('');
}

function graph_redraw() {
    graph.update(graph_data);
}