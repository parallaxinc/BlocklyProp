var BlocklyProp = {};

//var selected = 'blocks';

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
var graph_start_playing = false;
var graph_temp_string = new String;
var graph_time_multiplier = 0;
var graph_interval_id = null;
var fullCycleTime = 4294967296 / 80000000;
var graph_labels = null;
var graph_csv_data = new Array;

var console_header_arrived = false;
var console_header = null;

var active_connection = null;

var connString = '';
var connStrYet = false;

var graph_options = {
    showPoint: false,
    fullWidth: true,
    axisX: {
        type: Chartist.AutoScaleAxis,
        onlyInteger: true
    },
    refreshRate: 250,
    sampleTotal: 40,
    graph_type: 'S'
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

// Minimum client/launcher version supporting base64-encoding
var minEnc64Ver = version_as_number('0.7.0');
// Minimum client/launcher version supporting coded/verbose responses
var minCodedVer = version_as_number('0.7.5');
// Minimum client/launcher allowed for use with this system
var minVer = version_as_number(client_min_version);

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
function tabClick(id) {

    var TABS_ = ['blocks', 'propc', 'xml'];

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
    // document.getElementById('menu-save-as-propc').style.display = 'none';
    for (var x in TABS_) {
        document.getElementById('content_' + TABS_[x]).style.display = 'none';
    }

    // Select the active tab.
    var selectedTab = id.replace('tab_', '');
    var tbxs = document.getElementsByClassName('blocklyToolboxDiv');
    var btns = document.getElementsByClassName("btn-view-code");
    document.getElementById('btn-view-blocks').style.display = 'none';
    if (document.getElementById('menu-save-as-propc'))
        document.getElementById('menu-save-as-propc').style.display = 'none';
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.display = 'none';
    }
    if (projectData['board'] !== 'propcfile') {

        // Reinstate keybindings from block workspace if this is a code-only project.
        if (Blockly.codeOnlyKeybind === true) {
            Blockly.bindEvent_(document, 'keydown', null, Blockly.onKeyDown_);
            Blockly.codeOnlyKeybind = false;
        }

        if (id === 'tab_blocks') {
            for (var i = 0; i < btns.length; i++) {
                btns[i].style.display = 'inline-block';
            }
            for (var xt = 0; xt < tbxs.length; xt++) {
                tbxs[xt].style.display = 'block';
            }
        } else {
            for (var xt = 0; xt < tbxs.length; xt++) {
                tbxs[xt].style.display = 'none';
            }
            document.getElementById('btn-view-blocks').style.display = 'inline-block';
            if (document.getElementById('menu-save-as-propc'))
                document.getElementById('menu-save-as-propc').style.display = 'block';
        }
    } else {

        // Remove keybindings from block workspace if this is a code-only project.
        Blockly.unbindEvent_(document, 'keydown', null, Blockly.onKeyDown_);
        Blockly.codeOnlyKeybind = true;

        if ($("meta[name=cdn]").attr("user-auth") === 'true') {
            document.getElementById('prop-btn-graph').style.display = 'none';
            document.getElementById('upload-project').style.display = 'none';
        }
        document.getElementById('prop-btn-pretty').style.display = 'inline-block';
        document.getElementById('prop-btn-find-replace').style.display = 'inline-block';
        document.getElementById('prop-btn-undo').style.display = 'inline-block';
        document.getElementById('prop-btn-redo').style.display = 'inline-block';
        document.getElementById('download-project').style.display = 'none';
    }

    document.getElementById('content_' + selectedTab).style.display = 'block';
    // Show the selected pane.
    if (projectData['board'] === 'propcfile' && selectedTab === 'xml' && getURLParameter('debug')) {
        document.getElementById('btn-view-propc').style.display = 'inline-block';
        document.getElementById('btn-view-xml').style.display = 'none';
    } else if (projectData['board'] === 'propcfile' && selectedTab === 'propc' && getURLParameter('debug')) {
        document.getElementById('btn-view-xml').style.display = 'inline-block';
        document.getElementById('btn-view-propc').style.display = 'none';
    }
    renderContent(selectedTab);
}

// Populate the currently selected pane with content generated from the blocks.
function renderContent(pane) {
    // Initialize the pane.
    if (pane === 'blocks') {
        Blockly.mainWorkspace.render();
    } else if (pane === 'xml') {
        var xmlDom = null;
        if (projectData['board'] === 'propcfile') {
            xmlDom = Blockly.Xml.textToDom(propcAsBlocksXml());
        } else {
            xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        }
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        codeXml.setValue(xmlText);
        codeXml.gotoLine(0);
    } else if (pane === 'propc' && projectData['board'] !== 'propcfile') {
        prettyCode(Blockly.propc.workspaceToCode(Blockly.mainWorkspace));
    } else if (pane === 'propc') {
        if (codePropC.getValue() === '') {
            codePropC.setValue(Blockly.propc.workspaceToCode(Blockly.mainWorkspace));
        }
        codePropC.gotoLine(0);
    }
}

var prettyCode = function (raw_code) {
    if (!raw_code) {
        raw_code = codePropC.getValue();
    }
    raw_code = js_beautify(raw_code, {
        'brace_style': 'expand',
        'indent_size': 2
    });
    raw_code = raw_code.replace(/,\n[\s\xA0]+/g, ", ")

            // improve the way reference and dereference operands are rendered
            .replace(/, & /g, ", &")
            .replace(/, \* /g, ", *")
            .replace(/\( & /g, "(&")
            .replace(/\( \* /g, "(*")
            .replace(/char \* /g, "char *")
            .replace(/serial \* /g, "serial *")
            .replace(/colorPal \* /g, "colorPal *")
            .replace(/ws2812 \* /g, "ws2812 *")
            .replace(/i2c \* /g, "i2c *")
            .replace(/sound \* /g, "sound *")
            .replace(/FILE \* /g, "FILE* ")

            // improve the way functions and arrays are rendered
            .replace(/\)\s*[\n\r]\s*{/g, ") {")
            .replace(/\[([0-9]*)\]\s*=\s*{\s*([0-9xXbBA-F,\s]*)\s*};/g, function (str, m1, m2) {
                m2 = m2.replace(/\s/g, '').replace(/,/g, ', ');
                return "[" + m1 + "] = {" + m2 + "};";
            });

    codePropC.setValue(raw_code);
    codePropC.gotoLine(0);
};

var findReplaceCode = function () {
    if (document.getElementById('find-replace').style.display === 'none') {
        document.getElementById('find-replace').style.display = 'block';
    } else {
        document.getElementById('find-replace').style.display = 'none';
    }
};

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
function init(blockly) {
    codePropC = ace.edit("code-propc");
    codePropC.setTheme("ace/theme/chrome");
    codePropC.getSession().setMode("ace/mode/c_cpp");
    codePropC.getSession().setTabSize(2);
    codePropC.$blockScrolling = Infinity;
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

    if (projectData !== null) {
        if (projectData['code'].length < 43) {
            projectData['code'] = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
        }
        loadToolbox(projectData['code']);
    }

    // if the project is a propc code-only project, enable code editing.
    if (projectData['board'] === 'propcfile') {
        codePropC.setReadOnly(false);
        codePropC.commands.addCommand({
            name: "undo",
            bindKey: {win: "Ctrl-z", mac: "Command-z"},
            exec: function (codePropC) {
                codePropC.undo();
            },
            readOnly: true
        });
        codePropC.commands.addCommand({
            name: "redo",
            bindKey: {win: "Ctrl-y", mac: "Command-y"},
            exec: function (codePropC) {
                codePropC.redo();
            },
            readOnly: true
        });
        codePropC.commands.addCommand({
            name: "find_replace",
            bindKey: {win: "Ctrl-f", mac: "Command-f"},
            exec: function () {
                findReplaceCode();
            },
            readOnly: true
        });
        tabClick('tab_propc');
    }
}

function setBaudrate(_baudrate) {
    baudrate = _baudrate;
}

function cloudCompile(text, action, successHandler) {

    // if PropC is in edit mode, get it from the editor, otherwise render it from the blocks.
    var propcCode = '';
    if (codePropC.getReadOnly()) {
        propcCode = Blockly.propc.workspaceToCode(Blockly.mainWorkspace);
    } else {
        propcCode = codePropC.getValue();
    }

    var isEmptyProject = propcCode.indexOf("EMPTY_PROJECT") > -1;
    if (isEmptyProject) {
        alert("You can't compile an empty project");
    } else {
        $("#compile-dialog-title").text(text);
        $("#compile-console").val('Compile... ');
        $('#compile-dialog').modal('show');


        propcCode = js_beautify(propcCode, {
            'brace_style': 'expand',
            'indent_size': 2
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
            if (data.error || typeof data.error === "undefined") {
                // console.log(data);
                // Get message as a string, or blank if undefined
                var message = (typeof data['message'] === "string") ? data['message'] : (typeof data.error !== "undefined") ? data['message'].toString() : "";
                alert("BlocklyProp was unable to compile your project:\n" + message
                        + "\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac)");
            } else {
                var loadWaitMsg = (action !== 'compile') ? '\nDownload...' : '';
                $("#compile-console").val($("#compile-console").val() + data['compiler-output'] + data['compiler-error'] + loadWaitMsg);
                if (data.success) {
                    successHandler(data, terminalNeeded);
                }

                // Scoll automatically to the bottom after new data is added
                document.getElementById("compile-console").scrollTop = document.getElementById("compile-console").scrollHeight;
            }
        }).fail(function (data) {
            // console.log(data);
            var message = (typeof data === "string") ? data : data.toString();
            alert("BlocklyProp was unable to compile your project:\n----------\n" + message
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
 * @param compile_command for the cloud compiler (bin/eeprom).
 * @param load_option command for the loader (CODE/VERBOSE/CODE_VERBOSE).
 * @param load_action command for the loader (RAM/EEPROM).
 *
 */
function loadInto(modal_message, compile_command, load_option, load_action) {
    if (ports_available) {
        cloudCompile(modal_message, compile_command, function (data, terminalNeeded) {

            if (client_use_type === 'ws') {

                //Prep for new download messages
                launcher_result = "";
                launcher_download = false;
                //Set dbug flag if needed
                var dbug = 'none';
                if (terminalNeeded === 'term' || terminalNeeded === 'graph') {
                    dbug = terminalNeeded;
                }
                var prog_to_send = {
                    type: 'load-prop',
                    action: load_action,
                    payload: data.binary,
                    debug: dbug,
                    extension: data.extension,
                    portPath: getComPort()
                };

                client_ws_connection.send(JSON.stringify(prog_to_send));

            } else {

                if (client_version >= minCodedVer) {
                    //Request load with options from BlocklyProp Client
                    $.post(client_url + 'load.action', {option: load_option, action: load_action, binary: data.binary, extension: data.extension, "comport": getComPort()}, function (loaddata) {
                        //Replace response message's consecutive white space with a new-line, then split at new lines
                        var message = loaddata.message.replace(/\s{2,}/g, '\n').split('\n');
                        //If responses have codes, check for all success codes (< 100)
                        var success = true;
                        var coded = (load_option === "CODE" || load_option === "CODE_VERBOSE");
                        if (coded) {
                            message.forEach(function (x) {
                                success = success && x.substr(0, 3) < 100;
                            });
                        }
                        //Display results
                        var result = '';
                        if (success && coded) {
                            //Success! Keep it simple
                            result = ' Succeeded.';
                        } else {
                            //Failed (or not coded); Show the details
                            var error = [];
                            message.forEach(function (x) {
                                error.push(x.substr((coded) ? 4 : 0));
                            });
                            result = ((coded) ? ' Failed!' : "") + '\n\n-------- loader messages --------\n' + error.join('\n');
                        }

                        $("#compile-console").val($("#compile-console").val() + result);

                        // Scoll automatically to the bottom after new data is added
                        document.getElementById("compile-console").scrollTop = document.getElementById("compile-console").scrollHeight;

                        //console.log(loaddata);
                        if (terminalNeeded === 'term' && loaddata.success) {
                            serial_console();
                        } else if (terminalNeeded === 'graph' && loaddata.success) {
                            graphing_console();
                        }
                    });
                } else {
                    //todo - Remove this once client_min_version (and thus minVer) is >= minCodedVer
                    //Request load without options from old BlocklyProp Client
                    $.post(client_url + 'load.action', {action: load_action, binary: data.binary, extension: data.extension, "comport": getComPort()}, function (loaddata) {
                        $("#compile-console").val($("#compile-console").val() + loaddata.message);

                        // Scoll automatically to the bottom after new data is added
                        document.getElementById("compile-console").scrollTop = document.getElementById("compile-console").scrollHeight;

                        //console.log(loaddata);
                        if (terminalNeeded === 'term' && loaddata.success) {
                            serial_console();
                        } else if (terminalNeeded === 'graph' && loaddata.success) {
                            graphing_console();
                        }
                    });
                }
            }
        });
    } else if (client_available) {
        alert("No device detected - ensure it is connected, powered, and selected in the ports list.\n\nMake sure your BlocklyPropClient is up-to-date.");
    } else {
        alert("BlocklyPropClient not available to communicate with a microcontroller."
                + "\n\nIt may help to \"Force Refresh\" by pressing Control-Shift-R (Windows/Linux) or Shift-Command-R (Mac).");
    }
}

function serial_console() {
    var newTerminal = false;

    if (client_use_type !== 'ws') {
        if (term === null) {
            term = {
                portPath: getComPort()
            };
            newTerminal = true;
        }

        if (ports_available) {
            var url = client_url + 'serial.connect';
            url = url.replace('http', 'ws');
            var connection = new WebSocket(url);

            // When the connection is open, open com port
            connection.onopen = function () {
                connString = '';
                connStrYet = false;
                connection.send('+++ open port ' + getComPort() + (baudrate ? ' ' + baudrate : ''));
                active_connection = connection;
            };
            // Log errors
            connection.onerror = function (error) {
                console.log('WebSocket Error');
                console.log(error);
            };

            connection.onmessage = function (e) {
                var c_buf = (client_version >= minEnc64Ver) ? atob(e.data) : e.data;
                if (connStrYet) {
                    displayInTerm(c_buf);
                } else {
                    connString += c_buf;
                    if (connString.indexOf(baudrate.toString(10)) > -1) {
                        connStrYet = true;
                        if (document.getElementById('serial-conn-info')) {
                            document.getElementById('serial-conn-info').innerHTML = connString.trim();
                            // send remainder of string to terminal???  Haven't seen any leak through yet...
                        }
                    } else {
                        displayInTerm(e.data);
                    }
                }
                $('#serial_console').focus();
            };

            if (!newTerminal) {
                updateTermBox(0);
            }

            $('#console-dialog').on('hidden.bs.modal', function () {
                active_connection = null;
                connString = '';
                connStrYet = false;
                connection.close();
                if (document.getElementById('serial-conn-info')) {
                    document.getElementById('serial-conn-info').innerHTML = '';
                }
                updateTermBox(0);
                term_been_scrolled = false;
                term = null;
            });
        } else {
            active_connection = 'simulated';

            if (newTerminal) {
                displayInTerm("Simulated terminal because you are in demo mode\n");
                displayInTerm("Connection established with: " + getComPort() + "\n");
            }

            $('#console-dialog').on('hidden.bs.modal', function () {
                term_been_scrolled = false;
                active_connection = null;
                updateTermBox(0);
                term = null;
            });
        }
    } else if (client_use_type === 'ws') {
        // using Websocket-only client

        term = {
            portPath: getComPort()
        };

        var msg_to_send = {
            type: 'serial-terminal',
            outTo: 'terminal',
            portPath: getComPort(),
            baudrate: baudrate.toString(10),
            msg: 'none',
            action: 'open'
        };

        active_connection = 'websocket';
        if (document.getElementById('serial-conn-info')) {
            document.getElementById('serial-conn-info').innerHTML = 'Connection established with ' +
                    msg_to_send.portPath + ' at baudrate ' + msg_to_send.baudrate;
        }
        client_ws_connection.send(JSON.stringify(msg_to_send));

        $('#console-dialog').on('hidden.bs.modal', function () {
            if (msg_to_send.action !== 'close') { // because this is getting called multiple times...?
                msg_to_send.action = 'close';
                if (document.getElementById('serial-conn-info')) {
                    document.getElementById('serial-conn-info').innerHTML = '';
                }
                active_connection = null;
                client_ws_connection.send(JSON.stringify(msg_to_send));
            }
            term_been_scrolled = false;
            updateTermBox(0);
        });
    }

    $('#console-dialog').modal('show');
}

function graphing_console() {
    var propcCode = Blockly.propc.workspaceToCode(Blockly.mainWorkspace);

    // If there are graph settings, extract them
    var graph_settings_start = propcCode.indexOf("// GRAPH_SETTINGS_START:");
    var graph_labels_start = propcCode.indexOf("// GRAPH_LABELS_START:");

    if (graph_settings_start > -1 && graph_labels_start > -1) {
        var graph_settings_end = propcCode.indexOf(":GRAPH_SETTINGS_END //") + 22;
        var graph_settings_temp = propcCode.substring(graph_settings_start, graph_settings_end).split(':');
        var graph_settings_str = graph_settings_temp[1].split(',');

        // GRAPH_SETTINGS:rate,x_axis_val,x_axis_type,y_min,y_max:GRAPH_SETTINGS_END //

        var graph_labels_end = propcCode.indexOf(":GRAPH_LABELS_END //") + 20;
        var graph_labels_temp = propcCode.substring(graph_labels_start, graph_labels_end).split(':');
        graph_labels = graph_labels_temp[1].split(',');

        graph_options.refreshRate = Number(graph_settings_str[0]);

        graph_options.graph_type = graph_settings_str[2];
        if (Number(graph_settings_str[3]) !== 0 && Number(graph_settings_str[4]) !== 0) {
            graph_options.axisY = {
                type: Chartist.AutoScaleAxis,
                low: Number(graph_settings_str[3]),
                high: Number(graph_settings_str[4]),
                onlyInteger: true
            };
        } else {
            graph_options.axisY = {
                type: Chartist.AutoScaleAxis,
                onlyInteger: true
            };
        }
        $('#graph_x-axis_label').css('display', 'block');
        graph_options.showPoint = false;
        graph_options.showLine = true;
        if (graph_settings_str[2] === 'X') {
            $('#graph_x-axis_label').css('display', 'none');
            if (Number(graph_settings_str[5]) !== 0 || Number(graph_settings_str[6]) !== 0) {
                graph_options.axisX = {
                    type: Chartist.AutoScaleAxis,
                    low: Number(graph_settings_str[5]),
                    high: Number(graph_settings_str[6]),
                    onlyInteger: true
                };
            } else {
                graph_options.axisX = {
                    type: Chartist.AutoScaleAxis,
                    onlyInteger: true
                };
            }
            graph_options.showPoint = true;
            graph_options.showLine = false;
        }

        if (graph_options.graph_type === 'S' || graph_options.graph_type === 'X')
            graph_options.sampleTotal = Number(graph_settings_str[1]);

        if (graph === null) {
            graph_reset();
            graph_temp_string = '';
            graph = new Chartist.Line('#serial_graphing', graph_data, graph_options);
            console.log(graph_options);
        } else {
            graph.update(graph_data, graph_options);
        }

        if (client_use_type !== 'ws' && ports_available) {
            var url = client_url + 'serial.connect';
            url = url.replace('http', 'ws');
            var connection = new WebSocket(url);

            // When the connection is open, open com port
            connection.onopen = function () {
                if (baudrate) {
                    connection.send('+++ open port ' + getComPort() + ' ' + baudrate);
                } else {
                    connection.send('+++ open port ' + getComPort());
                }

                graphStartStop('start');

            };
            // Log errors
            connection.onerror = function (error) {
                console.log('WebSocket Error');
                console.log(error);
                //connection.close();
                //connection = new WebSocket(url);
            };

            connection.onmessage = function (e) {
                var c_buf = (client_version >= minEnc64Ver) ? atob(e.data) : e.data;
                if (connStrYet) {
                    graph_new_data(c_buf);
                } else {
                    connString += c_buf;
                    if (connString.indexOf(baudrate.toString(10)) > -1) {
                        connStrYet = true;
                        if (document.getElementById('graph-conn-info')) {
                            document.getElementById('graph-conn-info').innerHTML = connString.trim();
                            // send remainder of string to terminal???  Haven't seen any leak through yet...
                        }
                    } else {
                        graph_new_data(c_buf);
                    }
                }
            };

            $('#graphing-dialog').on('hidden.bs.modal', function () {
                connection.close();
                graphStartStop('stop');
                connString = '';
                connStrYet = false;
                document.getElementById('graph-conn-info').innerHTML = '';
            });

        } else if (client_use_type === 'ws' && ports_available) {
            var msg_to_send = {
                type: 'serial-terminal',
                outTo: 'graph',
                portPath: getComPort(),
                baudrate: baudrate.toString(10),
                msg: 'none',
                action: 'open'
            };

            if (document.getElementById('graph-conn-info')) {
                document.getElementById('graph-conn-info').innerHTML = 'Connection established with ' +
                        msg_to_send.portPath + ' at baudrate ' + msg_to_send.baudrate;
            }

            client_ws_connection.send(JSON.stringify(msg_to_send));

            if (!graph_interval_id) {
                graphStartStop('start');
            }

            $('#graphing-dialog').on('hidden.bs.modal', function () {
                graphStartStop('stop');
                if (msg_to_send.action !== 'close') { // because this is getting called multiple times.... ?
                    msg_to_send.action = 'close';
                    if (document.getElementById('graph-conn-info')) {
                        document.getElementById('graph-conn-info').innerHTML = '';
                    }
                    client_ws_connection.send(JSON.stringify(msg_to_send));
                }
            });

        } else {
            // create simulated graph?
        }

        $('#graphing-dialog').modal('show');
        if (document.getElementById('btn-graph-play')) {
            document.getElementById('btn-graph-play').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,2 L4,2 4,11 5.5,11 Z M8.5,2 L10,2 10,11 8.5,11 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg>';
        }
    } else {
        alert('To use the graphing feature, your program must have both a graph initialize block and a graph value block.');
    }
}

var graphStartStop = function (action) {
    if (action === 'start' || action === 'play') {
        graph_new_labels();
        if (graph_interval_id) {
            clearInterval(graph_interval_id);
        }
        graph_interval_id = setInterval(function () {
            graph.update(graph_data);
            graph_update_labels();
        }, graph_options.refreshRate);
    } else if (action === 'stop' || action === 'pause') {
        clearInterval(graph_interval_id);
        graph_interval_id = null;
    }
    if (action === 'stop') {
        graph_paused = false;
        graph_reset();
        graph_play('play');
    }
    if (action === 'clear') {
        graph_reset();
    }
    if (action === 'play') {
        if (graph_data.series[0].length === 0) {
            graph_reset();
        }
        graph_paused = false;
        graph_start_playing = true;
    }
    if (action === 'pause' && graph_temp_data.slice(-1)[0]) {
        graph_paused = true;
        graph_temp_string = '';
        graph_timestamp_start = 0;
        graph_time_multiplier = 0;
        graph_timestamp_restart = graph_temp_data.slice(-1)[0][0];
    }
};

var check_com_ports = function () {
    if (client_use_type !== 'ws') {
        if (client_url !== undefined) {
            if (client_version >= minVer) {
                // Client is >= minimum supported version
                $.get(client_url + "ports.json", function (data) {
                    set_port_list(data);
                }).fail(function () {
                    set_port_list();
                });
            } else {
                // else keep port list clear (searching...)
                set_port_list();
            }
        }
    }
};

// set communication port list
//   leave data unspecified when searching
var set_port_list = function (data) {
    data = (data ? data : 'searching');
    var selected_port = $("#comPort").val();
    $("#comPort").empty();
    if (typeof (data) === 'object' && data.length) {
        data.forEach(function (port) {
            $("#comPort").append($('<option>', {
                text: port
            }));
        });
        ports_available = true;
    } else {
        $("#comPort").append($('<option>', {
            text: (data === 'searching') ? 'Searching...' : 'No devices found'
        }));
        ports_available = false;
    }
    ;
    select_com_port(selected_port);
};

var select_com_port = function (com_port) {
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

var getComPort = function () {
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

    // Check for a failed connection:
    if (stream.indexOf('ailed') > -1) {
        $("#graph-conn-info").html(stream);

    } else {
        for (k = 0; k < stream.length; k++) {
            if (stream[k] === '\n')
                stream[k] = '\r';
            if (stream[k] === '\r' && graph_data_ready) {
                if (!graph_paused) {
                    graph_temp_data.push(graph_temp_string.split(','));
                    var row = graph_temp_data.length - 1;
                    var ts = Number(graph_temp_data[row][0]) || 0;

                    // convert to seconds:
                    // Uses Propeller system clock (CNT) left shifted by 16.
                    // Assumes 80MHz clock frequency.
                    ts = ts / 1220.703125;
                }
                if (!graph_timestamp_start || graph_timestamp_start === 0) {
                    graph_timestamp_start = ts;
                    if (graph_start_playing) {
                        graph_timestamp_start -= graph_timestamp_restart;
                        graph_timestamp_restart = 0;
                    }
                }
                if (row > 0 && !graph_start_playing) {
                    if (parseFloat(graph_temp_data[row][0]) < parseFloat(graph_temp_data[row - 1][1])) {
                        graph_time_multiplier += fullCycleTime;
                    }
                }
                graph_start_playing = false;
                if (!graph_paused) {
                    graph_temp_data[row].unshift(ts + graph_time_multiplier -
                            graph_timestamp_start);
                    var graph_csv_temp = (Math.round(graph_temp_data[row][0] * 10000) / 10000) + ',';

                    if (graph_options.graph_type === 'X') {   // xy scatter plot
                        var jk = 0;
                        for (var j = 2; j < graph_temp_data[row].length; j = j + 2) {
                            graph_csv_temp += graph_temp_data[row][j] + ',' + graph_temp_data[row][j + 1] + ',';
                            graph_data.series[jk].push({
                                x: graph_temp_data[row][j] || null,
                                y: graph_temp_data[row][j + 1] || null
                            });
                            if (graph_temp_data[row][0] > graph_options.sampleTotal)
                                graph_data.series[jk].shift();
                            jk++;
                        }
                    } else {    // Time series graph
                        for (var j = 2; j < graph_temp_data[row].length; j++) {
                            graph_csv_temp += graph_temp_data[row][j] + ',';
                            graph_data.series[j - 2].push({
                                x: graph_temp_data[row][0],
                                y: graph_temp_data[row][j] || null
                            });
                            if (graph_temp_data[row][0] > graph_options.sampleTotal)
                                graph_data.series[j - 2].shift();
                        }                        
                    }

                    graph_csv_data.push(graph_csv_temp.slice(0, -1).split(','));

                    // limits total number of data points collected to prevent memory issues
                    if (graph_csv_data.length > 15000) {
                        graph_csv_data.shift();
                    }
                }

                graph_temp_string = '';
            } else {
                if (!graph_data_ready) {            // wait for a full set of data to
                    if (stream[k] === '\r') {      // come in before graphing, ends up
                        graph_data_ready = true;    // tossing the first point but prevents
                    }                               // garbage from mucking up the graph.
                } else {
                    // make sure it's a number, comma, CR, or LF
                    if ('-0123456789.,\r\n'.indexOf(stream[k]) > -1) {
                        graph_temp_string += stream[k];
                    }
                }
            }
        }
    }
}

function graph_reset() {
    graph_temp_data.length = 0;
    graph_csv_data.length = 0;
    for (var k = 0; k < 10; k++) {
        graph_data.series[k] = [];
    }
    if (graph) {
        graph.update(graph_data, graph_options, true);
    }
    graph_temp_string = '';
    graph_timestamp_start = 0;
    graph_time_multiplier = 0;
    graph_timestamp_restart = 0;
    graph_data_ready = false;
}

function graph_play(setTo) {
    if (document.getElementById('btn-graph-play')) {
        var play_state = document.getElementById('btn-graph-play').innerHTML;
        if (setTo !== 'play' && (play_state.indexOf('pause') > -1 || play_state.indexOf('<!--p') === -1)) {
            document.getElementById('btn-graph-play').innerHTML = '<!--play--><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M4,3 L4,11 10,7 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg>';
            if (!setTo) {
                graphStartStop('pause');
            }
        } else {
            document.getElementById('btn-graph-play').innerHTML = '<!--pause--><svg xmlns="http://www.w3.org/2000/svg" width="14" height="15"><path d="M5.5,2 L4,2 4,11 5.5,11 Z M8.5,2 L10,2 10,11 8.5,11 Z" style="stroke:#fff;stroke-width:1;fill:#fff;"/></svg>';
            if (!graph_interval_id && !setTo) {
                graphStartStop('play');
            }
        }
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
    var labelClass = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    var labelPre = ["","","","","","","","","","","","","",""];
    if (graph_options.graph_type === 'X') {
        labelClass = [1,1,2,2,3,3,4,4,5,5,6,6,7,7];
        labelPre = ["x: ","y: ","x: ","y: ","x: ","y: ","x: ","y: ","x: ","y: ","x: ","y: ","x: ","y: "];
    }
    for (var t = 0; t < graph_labels.length; t++) {
        labelsvg += '<g id="labelgroup' + (t + 1) + '" transform="translate(0,' + (t * 30 + 25) + ')">';
        labelsvg += '<rect x="0" y = "0" width="60" height="26" rx="3" ry="3" id="label' + (t + 1) + '" ';
        labelsvg += 'style="stroke:1px;stroke-color:blue;" class="ct-marker-' + labelClass[t] + '"/><rect x="3" y="12"';
        labelsvg += 'width="54" height="11" rx="3" ry="3" id="value' + (t + 1) + 'bkg" style="fill:rgba';
        labelsvg += '(255,255,255,.7);stroke:none;"/><text id="label' + (t + 1) + 'text" x="3" ';
        labelsvg += 'y="9" style="font-family:Arial;font-size: 9px;fill:#fff;font-weight:bold;">' + labelPre[t];
        labelsvg += graph_labels[t] + '</text><text id="gValue' + (t + 1) + '" x="5" y="21" style="align:right;';
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
            var theLabel = document.getElementById('gValue' + (w - 1).toString(10));
            if (theLabel) {
                theLabel.textContent = graph_temp_data[row][w];
            }
        }
    }
}
