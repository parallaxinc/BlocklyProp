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
var graph_timestamp_restart = 0;
var graph_paused = false;
var graph_temp_string = new String;
var graph_time_multiplier = 0;
var graph_interval_id = null;
var fullCycleTime = 4294967296 / 80000000;
var graph_labels = null;
var graph_csv_data = new Array;

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
                            + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac)");
                else
                    alert("BlocklyProp was unable to compile your project:\n" + data['message'].toString()
                            + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac)");
            } else {
                var loadWaitMsg = '';
                if (action !== 'compile') {
                    loadWaitMsg = '\nLoading program on the Propeller - Please Wait...\n';
                }
                if (data.success) {
                    $("#compile-console").val(data['compiler-output'] + data['compiler-error'] + loadWaitMsg);
                    successHandler(data, terminalNeeded);
                } else {
                    $("#compile-console").val(data['compiler-output'] + data['compiler-error'] + loadWaitMsg);
                }
            }
        }).fail(function (data) {
            if (typeof data === "string")
                alert("BlocklyProp was unable to compile your project:\n----------\n" + data
                        + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac)");
            else
                alert("BlocklyProp was unable to compile your project:\n----------\n" + data.toString()
                        + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac)");
        });
    }
}

/**
 *
 */
function compile() {
    cloudCompile('Compile', 'compile', function (data, terminalNeeded) {});
}

/**
 * begins loading process
 * @param modal_message message shown at the top of the compile/load modal.
 * @param compile_command command for the cloud compiler (bin/eeprom).
 * @param load_action command for the loader (RAM/EEPROM).
 * 
 */
function loadInto(modal_message, compile_command, load_action) {
    if (client_available) {
        cloudCompile(modal_message, compile_command, function (data, terminalNeeded) {

            if (client_use_websockets === true) {
                
                var db = 'none';
                if (terminalNeeded === 'term' || terminalNeeded === 'graph') {
                    db = terminalNeeded;
                }
                
                var prog_to_send = {
                    type: 'load-prop',
                    action: load_action, 
                    payload: data.binary, 
                    debug: db,
                    extension: data.extension, 
                    portPath: getComPort()
                };
                
                client_ws_connection.send(JSON.stringify(prog_to_send));
                
            } else {

                $.post(client_url + 'load.action', {action: load_action, binary: data.binary, extension: data.extension, "comport": getComPort()}, function (loaddata) {
                    $("#compile-console").val($("#compile-console").val() + loaddata.message);
                    console.log(loaddata);
                    if (terminalNeeded === 'term' && loaddata.success) {
                        serial_console();
                    } else if (terminalNeeded === 'graph' && loaddata.success) {
                        graphing_console();
                    }
                });
            }
        });
    } else {
        alert("BlocklyPropClient not available to communicate with a microcontroller"
                + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac)");
    }
}

/**
 *

function loadIntoEeprom() {
    if (client_available) {
        cloudCompile('Load into EEPROM', 'eeprom', function (data, terminalNeeded) {
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
                + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac)");
    }
}
*/


function serial_console() {
    var newTerminal = false;

    if (client_use_websockets !== true) {
        if (term === null) {
            term = new Terminal({
                cols: 256,
                rows: 24,
                useStyle: true,
                screenKeys: true,
                portPath: getComPort()
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
    } else {
        
        term === null;
        term = new Terminal({
            cols: 256,
            rows: 24,
            useStyle: true,
            screenKeys: true,
            portPath: getComPort()
        });

        newTerminal = true;

        // using Websocket-only client
        var msg_to_send = {
            type: 'serial-terminal',
            portPath: getComPort(),
            baudrate: baudrate.toString(10),
            msg: 'none',
            action: 'msg'
        };

        term.on('data', function (data) {
            msg_to_send.msg = data;
            msg_to_send.action = 'msg';
            client_ws_connection.send(JSON.stringify(msg_to_send));
            //console.log('sending: ' + JSON.stringify(msg_to_send));
        });

        if (newTerminal === true) {
            term.open(document.getElementById("serial_console"));
            msg_to_send.action = 'open';
            client_ws_connection.send(JSON.stringify(msg_to_send));
            //console.log('opening: ' + JSON.stringify(msg_to_send));
        } else {
            term.reset();
        }

        $('#console-dialog').on('hidden.bs.modal', function () {
            if(msg_to_send.action !== 'close') { // because this is getting called multiple times.... ?
                msg_to_send.action = 'close';
                client_ws_connection.send(JSON.stringify(msg_to_send));
                //console.log('closing: ' + JSON.stringify(msg_to_send));
            }
            newTerminal = false;
            term.destroy();
        });
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

        var graph_labels_start = propcCode.indexOf("// GRAPH_LABELS_START:");
        if (graph_labels_start > -1) {
            var graph_labels_end = propcCode.indexOf(":GRAPH_LABELS_END //") + 20;
            var graph_labels_temp = propcCode.substring(graph_labels_start, graph_labels_end).split(':');
            graph_labels = graph_labels_temp[1].split(',');
        }

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
            graph_new_labels();
            graph_interval_id = setInterval(function () {
                graph.update(graph_data);
                graph_update_labels();
            }, graph_options.refreshRate);
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
    document.getElementById('btn-graph-play').innerHTML = '<i class="glyphicon glyphicon-pause"></i>';
}

check_com_ports = function () {
    if (client_use_websockets === false) {
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
            if (stream[k] === '\r' && graph_data_ready) {
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
                if (graph_paused) {
                    graph_timestamp_restart = ts + graph_time_multiplier - graph_timestamp_start;
                } else {
                    graph_temp_data[row].unshift(ts + graph_time_multiplier -
                            graph_timestamp_start + graph_timestamp_restart);
                    var graph_csv_temp = (Math.round(graph_temp_data[row][0] * 10000) / 10000) + ',';
                    for (var j = 2; j < graph_temp_data[row].length; j++) {
                        graph_csv_temp += graph_temp_data[row][j] + ',';
                        graph_data.series[j - 2].push({
                            x: graph_temp_data[row][0],
                            y: graph_temp_data[row][j] || null
                        });
                        if (graph_temp_data[row][0] > graph_options.sampleTotal)
                            graph_data.series[j - 2].shift();
                    }
                    graph_csv_data.push(graph_csv_temp.slice(0, -1).split(','));
                }



                /*
                 var read_serial_to_div = '';
                 for (var l = 0; l < graph_temp_data[row].length; l++)
                 read_serial_to_div += graph_temp_data[row].toString() + '\n';
                 $( "#serial_graphing" ).html(read_serial_to_div);
                 */

                graph_temp_string = '';
            } else {
                if (!graph_data_ready) {          // wait for a full set of data to
                    if (stream[k] === '\r')       // come in before graphing, ends up
                        graph_data_ready = true;  // tossing the first point but prevents 
                } else {                          // garbage from mucking up the graph.
                    graph_temp_string += stream[k];
                }
            }
        }
    }
}

function graph_reset() {
    clearInterval(graph_interval_id);
    graph_interval_id = null;
    graph_temp_data = null;
    graph_temp_data = new Array;
    graph_csv_data = null;
    graph_csv_data = new Array;
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
    graph_data_ready = false;
    // graph_labels = null;
    $("#serial_graphing").html('');
    //$("#serial_graphing_labels").html('');
}

function graph_redraw() {
    graph.update(graph_data);
}

function graph_play() {
    var play_state = document.getElementById('btn-graph-play').innerHTML;
    if (play_state.indexOf('pause') > -1) {
        document.getElementById('btn-graph-play').innerHTML = '<i class="glyphicon glyphicon-play"></i>';
        clearInterval(graph_interval_id);
    } else {
        document.getElementById('btn-graph-play').innerHTML = '<i class="glyphicon glyphicon-pause"></i>';
        graph_interval_id = setInterval(function () {
            graph.update(graph_data);
        }, graph_options.refreshRate);
    }
}

function downloadGraph() {
    utils.prompt("Download Graph Output - Filename:", 'Graph' + idProject, function (value) {
        if (value) {

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

            var svgGraph = document.getElementById('serial_graphing'),
                    pattern = new RegExp('xmlns="http://www.w3.org/2000/xmlns/"', 'g'),
                    findY = 'class="ct-label ct-horizontal ct-end"',
                    chartStyle = '<style>.ct-double-octave:after,.ct-major-eleventh:after,.ct-major-second:after,.ct-major-seventh:after,.ct-major-sixth:after,.ct-major-tenth:after,.ct-major-third:after,.ct-major-twelfth:after,.ct-minor-second:after,.ct-minor-seventh:after,.ct-minor-sixth:after,.ct-minor-third:after,.ct-octave:after,.ct-perfect-fifth:after,.ct-perfect-fourth:after,.ct-square:after{content:"";clear:both}.ct-label{fill:rgba(0,0,0,.4);color:rgba(0,0,0,.4);font-size:.75rem;line-height:1}.ct-grid-background,.ct-line{fill:none}.ct-chart-bar .ct-label,.ct-chart-line .ct-label{display:block;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.ct-chart-donut .ct-label,.ct-chart-pie .ct-label{dominant-baseline:central}.ct-label.ct-horizontal.ct-start{-webkit-box-align:flex-end;-webkit-align-items:flex-end;-ms-flex-align:flex-end;align-items:flex-end;-webkit-box-pack:flex-start;-webkit-justify-content:flex-start;-ms-flex-pack:flex-start;justify-content:flex-start;text-align:left;text-anchor:start}.ct-label.ct-horizontal.ct-end{-webkit-box-align:flex-start;-webkit-align-items:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-box-pack:flex-start;-webkit-justify-content:flex-start;-ms-flex-pack:flex-start;justify-content:flex-start;text-align:left;text-anchor:start}.ct-label.ct-vertical.ct-start{-webkit-box-align:flex-end;-webkit-align-items:flex-end;-ms-flex-align:flex-end;align-items:flex-end;-webkit-box-pack:flex-end;-webkit-justify-content:flex-end;-ms-flex-pack:flex-end;justify-content:flex-end;text-align:right;text-anchor:end}.ct-label.ct-vertical.ct-end{-webkit-box-align:flex-end;-webkit-align-items:flex-end;-ms-flex-align:flex-end;align-items:flex-end;-webkit-box-pack:flex-start;-webkit-justify-content:flex-start;-ms-flex-pack:flex-start;justify-content:flex-start;text-align:left;text-anchor:start}.ct-chart-bar .ct-label.ct-horizontal.ct-start{-webkit-box-align:flex-end;-webkit-align-items:flex-end;-ms-flex-align:flex-end;align-items:flex-end;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center;text-anchor:start}.ct-chart-bar .ct-label.ct-horizontal.ct-end{-webkit-box-align:flex-start;-webkit-align-items:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center;text-anchor:start}.ct-chart-bar.ct-horizontal-bars .ct-label.ct-horizontal.ct-start{-webkit-box-align:flex-end;-webkit-align-items:flex-end;-ms-flex-align:flex-end;align-items:flex-end;-webkit-box-pack:flex-start;-webkit-justify-content:flex-start;-ms-flex-pack:flex-start;justify-content:flex-start;text-align:left;text-anchor:start}.ct-chart-bar.ct-horizontal-bars .ct-label.ct-horizontal.ct-end{-webkit-box-align:flex-start;-webkit-align-items:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-box-pack:flex-start;-webkit-justify-content:flex-start;-ms-flex-pack:flex-start;justify-content:flex-start;text-align:left;text-anchor:start}.ct-chart-bar.ct-horizontal-bars .ct-label.ct-vertical.ct-start{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:flex-end;-webkit-justify-content:flex-end;-ms-flex-pack:flex-end;justify-content:flex-end;text-align:right;text-anchor:end}.ct-chart-bar.ct-horizontal-bars .ct-label.ct-vertical.ct-end{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:flex-start;-webkit-justify-content:flex-start;-ms-flex-pack:flex-start;justify-content:flex-start;text-align:left;text-anchor:end}.ct-grid{stroke:rgba(0,0,0,.2);stroke-width:1px;stroke-dasharray:2px}.ct-point{stroke-width:10px;stroke-linecap:round}.ct-line{stroke-width:4px}.ct-area{stroke:none;fill-opacity:.1}.ct-bar{fill:none;stroke-width:10px}.ct-slice-donut{fill:none;stroke-width:60px}.ct-series-a .ct-bar,.ct-series-a .ct-line,.ct-series-a .ct-point,.ct-series-a .ct-slice-donut{stroke:#d70206}.ct-series-a .ct-area,.ct-series-a .ct-slice-donut-solid,.ct-series-a .ct-slice-pie{fill:#d70206}.ct-series-b .ct-bar,.ct-series-b .ct-line,.ct-series-b .ct-point,.ct-series-b .ct-slice-donut{stroke:#f05b4f}.ct-series-b .ct-area,.ct-series-b .ct-slice-donut-solid,.ct-series-b .ct-slice-pie{fill:#f05b4f}.ct-series-c .ct-bar,.ct-series-c .ct-line,.ct-series-c .ct-point,.ct-series-c .ct-slice-donut{stroke:#f4c63d}.ct-series-c .ct-area,.ct-series-c .ct-slice-donut-solid,.ct-series-c .ct-slice-pie{fill:#f4c63d}.ct-series-d .ct-bar,.ct-series-d .ct-line,.ct-series-d .ct-point,.ct-series-d .ct-slice-donut{stroke:#d17905}.ct-series-d .ct-area,.ct-series-d .ct-slice-donut-solid,.ct-series-d .ct-slice-pie{fill:#d17905}.ct-series-e .ct-bar,.ct-series-e .ct-line,.ct-series-e .ct-point,.ct-series-e .ct-slice-donut{stroke:#453d3f}.ct-series-e .ct-area,.ct-series-e .ct-slice-donut-solid,.ct-series-e .ct-slice-pie{fill:#453d3f}.ct-series-f .ct-bar,.ct-series-f .ct-line,.ct-series-f .ct-point,.ct-series-f .ct-slice-donut{stroke:#59922b}.ct-series-f .ct-area,.ct-series-f .ct-slice-donut-solid,.ct-series-f .ct-slice-pie{fill:#59922b}.ct-series-g .ct-bar,.ct-series-g .ct-line,.ct-series-g .ct-point,.ct-series-g .ct-slice-donut{stroke:#0544d3}.ct-series-g .ct-area,.ct-series-g .ct-slice-donut-solid,.ct-series-g .ct-slice-pie{fill:#0544d3}.ct-series-h .ct-bar,.ct-series-h .ct-line,.ct-series-h .ct-point,.ct-series-h .ct-slice-donut{stroke:#6b0392}.ct-series-h .ct-area,.ct-series-h .ct-slice-donut-solid,.ct-series-h .ct-slice-pie{fill:#6b0392}.ct-series-i .ct-bar,.ct-series-i .ct-line,.ct-series-i .ct-point,.ct-series-i .ct-slice-donut{stroke:#f05b4f}.ct-series-i .ct-area,.ct-series-i .ct-slice-donut-solid,.ct-series-i .ct-slice-pie{fill:#f05b4f}.ct-series-j .ct-bar,.ct-series-j .ct-line,.ct-series-j .ct-point,.ct-series-j .ct-slice-donut{stroke:#dda458}.ct-series-j .ct-area,.ct-series-j .ct-slice-donut-solid,.ct-series-j .ct-slice-pie{fill:#dda458}.ct-series-k .ct-bar,.ct-series-k .ct-line,.ct-series-k .ct-point,.ct-series-k .ct-slice-donut{stroke:#eacf7d}.ct-series-k .ct-area,.ct-series-k .ct-slice-donut-solid,.ct-series-k .ct-slice-pie{fill:#eacf7d}.ct-series-l .ct-bar,.ct-series-l .ct-line,.ct-series-l .ct-point,.ct-series-l .ct-slice-donut{stroke:#86797d}.ct-series-l .ct-area,.ct-series-l .ct-slice-donut-solid,.ct-series-l .ct-slice-pie{fill:#86797d}.ct-series-m .ct-bar,.ct-series-m .ct-line,.ct-series-m .ct-point,.ct-series-m .ct-slice-donut{stroke:#b2c326}.ct-series-m .ct-area,.ct-series-m .ct-slice-donut-solid,.ct-series-m .ct-slice-pie{fill:#b2c326}.ct-series-n .ct-bar,.ct-series-n .ct-line,.ct-series-n .ct-point,.ct-series-n .ct-slice-donut{stroke:#6188e2}.ct-series-n .ct-area,.ct-series-n .ct-slice-donut-solid,.ct-series-n .ct-slice-pie{fill:#6188e2}.ct-series-o .ct-bar,.ct-series-o .ct-line,.ct-series-o .ct-point,.ct-series-o .ct-slice-donut{stroke:#a748ca}.ct-series-o .ct-area,.ct-series-o .ct-slice-donut-solid,.ct-series-o .ct-slice-pie{fill:#a748ca}.ct-square{display:block;position:relative;width:100%}.ct-square:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:100%}.ct-square:after{display:table}.ct-square>svg{display:block;position:absolute;top:0;left:0}.ct-minor-second{display:block;position:relative;width:100%}.ct-minor-second:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:93.75%}.ct-minor-second:after{display:table}.ct-minor-second>svg{display:block;position:absolute;top:0;left:0}.ct-major-second{display:block;position:relative;width:100%}.ct-major-second:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:88.8888888889%}.ct-major-second:after{display:table}.ct-major-second>svg{display:block;position:absolute;top:0;left:0}.ct-minor-third{display:block;position:relative;width:100%}.ct-minor-third:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:83.3333333333%}.ct-minor-third:after{display:table}.ct-minor-third>svg{display:block;position:absolute;top:0;left:0}.ct-major-third{display:block;position:relative;width:100%}.ct-major-third:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:80%}.ct-major-third:after{display:table}.ct-major-third>svg{display:block;position:absolute;top:0;left:0}.ct-perfect-fourth{display:block;position:relative;width:100%}.ct-perfect-fourth:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:75%}.ct-perfect-fourth:after{display:table}.ct-perfect-fourth>svg{display:block;position:absolute;top:0;left:0}.ct-perfect-fifth{display:block;position:relative;width:100%}.ct-perfect-fifth:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:66.6666666667%}.ct-perfect-fifth:after{display:table}.ct-perfect-fifth>svg{display:block;position:absolute;top:0;left:0}.ct-minor-sixth{display:block;position:relative;width:100%}.ct-minor-sixth:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:62.5%}.ct-minor-sixth:after{display:table}.ct-minor-sixth>svg{display:block;position:absolute;top:0;left:0}.ct-golden-section{display:block;position:relative;width:100%}.ct-golden-section:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:61.804697157%}.ct-golden-section:after{content:"";display:table;clear:both}.ct-golden-section>svg{display:block;position:absolute;top:0;left:0}.ct-major-sixth{display:block;position:relative;width:100%}.ct-major-sixth:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:60%}.ct-major-sixth:after{display:table}.ct-major-sixth>svg{display:block;position:absolute;top:0;left:0}.ct-minor-seventh{display:block;position:relative;width:100%}.ct-minor-seventh:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:56.25%}.ct-minor-seventh:after{display:table}.ct-minor-seventh>svg{display:block;position:absolute;top:0;left:0}.ct-major-seventh{display:block;position:relative;width:100%}.ct-major-seventh:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:53.3333333333%}.ct-major-seventh:after{display:table}.ct-major-seventh>svg{display:block;position:absolute;top:0;left:0}.ct-octave{display:block;position:relative;width:100%}.ct-octave:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:50%}.ct-octave:after{display:table}.ct-octave>svg{display:block;position:absolute;top:0;left:0}.ct-major-tenth{display:block;position:relative;width:100%}.ct-major-tenth:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:40%}.ct-major-tenth:after{display:table}.ct-major-tenth>svg{display:block;position:absolute;top:0;left:0}.ct-major-eleventh{display:block;position:relative;width:100%}.ct-major-eleventh:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:37.5%}.ct-major-eleventh:after{display:table}.ct-major-eleventh>svg{display:block;position:absolute;top:0;left:0}.ct-major-twelfth{display:block;position:relative;width:100%}.ct-major-twelfth:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:33.3333333333%}.ct-major-twelfth:after{display:table}.ct-major-twelfth>svg{display:block;position:absolute;top:0;left:0}.ct-double-octave{display:block;position:relative;width:100%}.ct-double-octave:before{display:block;float:left;content:"";width:0;height:0;padding-bottom:25%}.ct-double-octave:after{display:table}.ct-double-octave>svg{display:block;position:absolute;top:0;left:0}.ct-series-a .ct-line {stroke-width: 1px;stroke: #00f;}.ct-series-b .ct-line {stroke-width: 1px;stroke: #0bb;}.ct-series-c .ct-line {stroke-width: 1px;stroke: #0d0;}.ct-series-d .ct-line {stroke-width: 1px;stroke: #dd0;}.ct-series-e .ct-line {stroke-width: 1px;stroke: #f90;}.ct-series-f .ct-line {stroke-width: 1px;stroke: #f00;}.ct-series-g .ct-line {stroke-width: 1px;stroke: #c0c;}.ct-series-h .ct-line {stroke-width: 1px;stroke: #000;}.ct-series-i .ct-line {stroke-width: 1px;stroke: #777;}.ct-series-j .ct-line {stroke-width: 1px;}text{font-family:sans-serif;}</style>',
                    svgxml = new XMLSerializer().serializeToString(svgGraph);
            svgxml = svgxml.replace(pattern, '');
            svgxml = svgxml.replace(/foreignObject/g, 'text');
            svgxml = svgxml.replace(/([<|</])a[0-9]+:/g, '$1');
            svgxml = svgxml.replace(/xmlns: /g, '');
            svgxml = svgxml.replace(/span/g, 'tspan');
            svgxml = svgxml.replace(/x="10" /g, 'x="40" ');
            svgxml = svgxml.substring(svgxml.indexOf('<svg'), svgxml.length - 6);
            var foundY = svgxml.indexOf(findY);
            var theY = parseFloat(svgxml.substring(svgxml.indexOf(' y="', foundY + 20) + 4, svgxml.indexOf('"', svgxml.indexOf(' y="', foundY + 20) + 4)));
            var regY = new RegExp('y="' + theY + '"', 'g');
            svgxml = svgxml.replace(regY, 'y="' + (theY + 12) + '"');
            var breakpoint = svgxml.indexOf('>') + 1;
            svgxml = svgxml.substring(0, breakpoint) + chartStyle + svgxml.substring(breakpoint, svgxml.length);
            saveData(svgxml, value + '.svg');
        }
    });
}

function downloadCSV() {
    utils.prompt("Download Graph data as CSV - Filename:", 'graph_data' + idProject, function (value) {
        if (value) {

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
            var graph_csv_temp = graph_csv_data.join('\n');
            var idx1 = graph_csv_temp.indexOf('\n') + 1;
            var idx2 = graph_csv_temp.indexOf('\n', idx1 + 1);
            saveData(graph_csv_temp.substring(0, idx1) + graph_csv_temp.substring(idx2 + 1, graph_csv_temp.length - 1), value + '.csv');
        }
    });
}

function graph_new_labels() {
    var graph_csv_temp = '';
    var labelsvg = '<svg width="60" height="300">';
    graph_csv_temp += '"time",';
    for (var t = 0; t < graph_labels.length; t++) {
        labelsvg += '<g id="labelgroup' + (t + 1) + '" transform="translate(0,' + (t * 30 + 25) + ')">';
        labelsvg += '<rect x="0" y = "0" width="60" height="26" rx="3" ry="3" id="label' + (t + 1) + '" ';
        labelsvg += 'style="stroke:1px;stroke-color:blue;" class="ct-marker-' + (t + 1) + '"/><rect x="3" y = "12"';
        labelsvg += 'width="54" height="11" rx="3" ry="3" id="value' + (t + 1) + 'bkg" style="fill:rgba';
        labelsvg += '(255,255,255,.7);stroke:none;"/><text id="label' + (t + 1) + 'text" x="3" ';
        labelsvg += 'y="9" style="font-family:Arial;font-size: 9px;fill:#fff;font-weight:bold;">' + graph_labels[t];
        labelsvg += '</text><text id="gValue' + (t + 1) + '" x="5" y="21" style="align:right;';
        labelsvg += 'font-family:Arial;font-size: 10px;fill:#000;"></text></g>';
        graph_csv_temp += '"' + graph_labels[t].replace(/"/g, '_') + '",';
    }
    labelsvg += '</svg>';
    graph_csv_data.push(graph_csv_temp.slice(0, -1));
    $('#serial_graphing_labels').html(labelsvg);
}

function graph_update_labels() {
    var row = graph_temp_data.length - 1;
    if (graph_temp_data[row]) {
        var col = graph_temp_data[row].length;
        for (var w = 2; w < col; w++) {
            document.getElementById('gValue' + (w - 1).toString(10)).textContent = graph_temp_data[row][w];
        }
    }
}