/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var terminal_dump = null;

// client_available flags whether BP Client/Launcher is found
var client_available = false;
// ports_available flags whether one or more communication ports are available
var ports_available = false;

var client_url = 'http://localhost:6009/';
var client_version = 0;

var client_domain_name = "localhost";
var client_domain_port = 6009;

var client_min_version = "0.6.0";
var client_recommended_version = "0.7.0";

var client_use_type = 'none';
var client_ws_connection = null;
var client_ws_heartbeat;
var client_ws_heartbeat_interval = null;

var check_com_ports_interval = null;
var check_ws_socket_timeout = null;
        
// BP Launcher result log and download message flag
var launcher_result = "";
var launcher_download = false;

// Status Notice IDs
const nsDownloading                = 002;
const nsDownloadSuccessful         = 005;
// Error Notice IDs
const neDownloadFailed             = 102;


$(document).ready(function () {
    find_client();
});

var find_client = function () {
    if (check_ws_socket_timeout) {
        //Clear timeout if it exists; without this, back-to-back find_client() calls seem to occur
        clearTimeout(check_ws_socket_timeout);
    }
    
    establish_socket();
    if (client_use_type !== 'ws') {
        // WebSocket'd launcher not found?  Try Http'd client
        check_client();
    }
};

var version_as_number = function (rawVersion) {
    var tempVersion = rawVersion.toString().split(".");
    tempVersion.push('0');

    if (tempVersion.length < 3) {
        $("#client-unknown-span").removeClass("hidden");
        $(".client-required-version").html(client_recommended_version);
        $(".client-your-version").html('<b>UNKNOWN</b>');
        $('#client-version-modal').modal('show');                 

        //bootbox.alert("BlocklyProp is unable to determine what version of " +
        //        "BlocklyPropClient is installed on your computer.\nYou may need to install" +
        //        "or reinstall the BlocklyPropClient.");
        
        if (tempVersion.length === 1)
            tempVersion = '0.0.0';
        else
            tempVersion.unshift('0');
    }

    // Allow for any of the three numbers to be between 0 and 1023.
    // Equivalent to: (Major * 104856) + (Minor * 1024) + Revision.
    return (Number(tempVersion[0]) << 20 | Number(tempVersion[1]) << 10 | Number(tempVersion[2]));
};

var set_ui_buttons = function (ui_btn_state) {
    if (ui_btn_state === 'available') {
        $("#client-available").removeClass("hidden");
        $("#client-searching").addClass("hidden");
        $("#client-unavailable").addClass("hidden");
        $("#prop-btn-ram").removeClass("disabled");
        $("#prop-btn-eeprom").removeClass("disabled");
        $("#prop-btn-term").removeClass("disabled");
        $("#prop-btn-graph").removeClass("disabled");
    } else {
        $("#prop-btn-ram").addClass("disabled");
        $("#prop-btn-eeprom").addClass("disabled");
        $("#prop-btn-term").addClass("disabled");
        $("#prop-btn-graph").addClass("disabled");
        if (ui_btn_state === 'searching') {
            $("#client-available").addClass("hidden");
            $("#client-searching").removeClass("hidden");
            $("#client-unavailable").addClass("hidden");
        } else {
            $("#client-available").addClass("hidden");
            $("#client-searching").addClass("hidden");
            $("#client-unavailable").removeClass("hidden");
        }
    }
};

var check_client = function () {

    if (client_use_type !== 'ws') {
        $.get(client_url, function (data) {
            if (!client_available) {
                client_version = version_as_number((typeof data.version_str !== "undefined") ? data.version_str : data.version);
                if (!data.server || data.server !== 'BlocklyPropHTTP') {
                    $('.bpc-version').addClass('hidden');
                    $("#client-unknown-span").removeClass("hidden");
                    $(".client-required-version").html(client_min_version);
                    $(".client-your-version").html(data.version || '<b>UNKNOWN</b>');
                    $('#client-version-modal').modal('show');                 
                } else if (client_version < version_as_number(client_min_version)) {
                    //bootbox.alert("This system now requires at least version " + client_min_version + " of BlocklyPropClient- yours is: " + data.version);                    
                    $('.bpc-version').addClass('hidden');
                    $("#client-danger-span").removeClass("hidden");
                    $(".client-required-version").html(client_min_version);
                    $(".client-your-version").html(data.version);
                    $('#client-version-modal').modal('show');
                } else if (client_version < version_as_number(client_recommended_version)) {
                    $('.bpc-version').addClass('hidden');
                    $("#client-warning-span").removeClass("hidden");
                    $(".client-required-version").html(client_recommended_version);
                    $(".client-your-version").html(data.version);
                    $('#client-version-modal').modal('show');
                }

                client_use_type = 'http';
                client_available = true;
                set_ui_buttons('available');
                if (check_com_ports && typeof (check_com_ports) === "function") {
                    check_com_ports();
                    check_com_ports_interval = setInterval(check_com_ports, 5000);
                }
            }

            setTimeout(check_client, 20000);

        }).fail(function () {
            clearInterval(check_com_ports_interval);
            client_use_type = 'none';
            client_available = false;
            ports_available = false;
            set_ui_buttons('unavailable');
            check_ws_socket_timeout = setTimeout(find_client, 3000);
        });
    }
};

var connection_heartbeat = function () {
    // Check the last time the port list was recieved.
    // If it's been too long, close the connection.
    if (client_use_type === 'ws') {
        var d = new Date();
        var heartbeat_check = d.getTime();
        if (client_ws_heartbeat + 12000 < heartbeat_check) {
            // Client is taking too long to check in - close the connection and clean up
            client_ws_connection.close();
            lostWSConnection();
        }
    }
};

var configure_client = function () {
    var url_input = $("<form/>", {
        class: "form-inline"
    });
    $("<span/>", {
        class: "space_right"
    }).text("http://").appendTo(url_input);
    var domain_name_group = $("<div/>", {
        class: "form-group"
    }).appendTo(url_input);
    $("<input/>", {
        id: "domain_name",
        type: "text",
        class: "form-control",
        value: client_domain_name
    }).appendTo(domain_name_group);
    $("<span/>", {
        class: "space_left space_right"
    }).text(":").appendTo(url_input);
    var domain_port_group = $("<div/>", {
        class: "form-group"
    }).appendTo(url_input);
    $("<input/>", {
        id: "port_number",
        type: "number",
        class: "form-control",
        value: client_domain_port
    }).appendTo(domain_port_group);

    bootbox.dialog({
        title: "Configure BlocklyPropClient",
        message: url_input,
        buttons: {
            cancel: {
                label: "Cancel",
                className: "btn-default"
            },
            save: {
                label: "Save",
                className: "btn-success",
                callback: function () {
                    client_domain_name = $("#domain_name").val();
                    client_domain_port = $("#port_number").val();
                    client_url = "http://" + client_domain_name + ":" + client_domain_port + "/";
                }
            }
        }
    });
};

// checks for and, if found, uses a newer WebSockets-only client
function establish_socket() {
    /* TODO: needs testing - is it better to do this here, or in the next TODO
    if(client_ws_connection !== null && client_use_type !== 'ws') {

      //check_ws_socket_interval = null;

      //client_ws_connection.close();
    }*/

    // TODO: set/clear and load buttons based on status

    if (!client_available) {

        // Clear the port list
        set_port_list();
        
        var url = client_url.replace('http', 'ws');
        var connection = new WebSocket(url);

        connection.onopen = function () {

            // TODO: needs testing - is it better to do this here or in the previous TODO
            // Is there already a connection?  If so, close it:
            if (client_ws_connection !== null) {
                client_ws_connection.close();
            }

            var ws_msg = {type: 'hello-browser', baud: baudrate};
            client_ws_connection = connection;
            connection.send(JSON.stringify(ws_msg));
        };

        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error');
            console.log(error);

            //$("#client-searching").removeClass("hidden");
            //$("#client-available").addClass("hidden");
            //$("#client-unavailable").addClass("hidden");

            // TODO: Should we shutdown and try again? - needs testing
            //check_ws_socket_timeout = setTimeout(function () {
            //    find_client();
            //}, 3000);
        };

        // handle messages from the client
        connection.onmessage = function (e) {
            var ws_msg = JSON.parse(e.data);

            // --- hello handshake - establish new connection
            if (ws_msg.type === 'hello-client') {
                // type: 'hello-client',
                // version: [String version (semantic versioning)]
                client_version = version_as_number(ws_msg.version);

                /* Test code: Terminal dump
                 setInterval(function() {
                 Terminal dumper!
                 console.log('Terminal Dump!\n-------------------\n' + terminal_dump);
                 terminal_dump = null;
                 }, 10000);
                 */

                console.log("Websocket client/launcher found - version " + ws_msg.version);                
                
                client_use_type = 'ws';
                client_available = true;

                set_ui_buttons('available');

                var portRequestMsg = JSON.stringify({type: 'port-list-request', msg: 'port-list-request'});
                connection.send(portRequestMsg);

            }

            // --- com port list/change
            else if (ws_msg.type === 'port-list') {
                // type: 'port-list', 
                // ports: ['port1', 'port2', 'port3'...]

                // mark the time that this was received
                var d = new Date();
                client_ws_heartbeat = d.getTime();

                if (!client_ws_heartbeat_interval) {
                    client_ws_heartbeat_interval = setInterval(connection_heartbeat, 4000);
                }

                set_port_list(ws_msg.ports);
            }

            // --- serial terminal/graph
            else if (ws_msg.type === 'serial-terminal' &&
                    (typeof ws_msg.msg === 'string' || ws_msg.msg instanceof String)) { // sometimes some weird stuff comes through...
                // type: 'serial-terminal'
                // msg: [String message]

                var msg_in = atob(ws_msg.msg);

                //terminal_dump += ws_msg.packetID + ', ' + ws_msg.msg + ', ' + msg_in + '\n';

                if (ws_msg.msg !== undefined) {
                    if (term !== null) { // is the terminal open?
                        //term.write(msg_in);
                        displayInTerm(msg_in);
                        $('#serial_console').focus();
                    } else if (graph !== null) { // is the graph open?
                        graph_new_data(msg_in);
                    }
                }

                // var ws_cts = {type: 'debug-cts', msg: 'ok'};
                // client_ws_connection.send(JSON.stringify(ws_cts));
            }

            // --- UI Commands coming from the client
            else if (ws_msg.type === 'ui-command') {
                // type: 'ui-command', 
                // action: ['open-terminal','open-graph','close-terminal','close-graph','close-compile','clear-compile','message-compile','alert']
                // msg: [String message]

                if (ws_msg.action === 'open-terminal') {
                    serial_console();

                } else if (ws_msg.action === 'open-graph') {
                    graphing_console();

                } else if (ws_msg.action === 'close-terminal') {
                    $('#console-dialog').modal('hide');
                    newTerminal = false;
                    //term.destroy();
                    updateTermBox(0);

                } else if (ws_msg.action === 'close-graph') {
                    $('#graphing-dialog').modal('hide');
                    graph_reset();

                } else if (ws_msg.action === 'clear-compile') {
                    $('#compile-console').val('');

                } else if (ws_msg.action === 'message-compile') {
                    if (client_version >= minCodedVer) {
                        //Messages are coded; check codes, log all and filter out nsDownloading duplicates
                        var msg = ws_msg.msg.split("-");
                        if (msg[0] != nsDownloading || !launcher_download) {
                            launcher_result = launcher_result + msg[1] + "\n";
                            launcher_download |= (msg[0] == nsDownloading);
                        }
                        if (msg[0] == nsDownloadSuccessful) {
                            //Success! Keep it simple
                            $('#compile-console').val($('#compile-console').val() + ' Succeeded.');
                        } else if (msg[0] == neDownloadFailed) {
                            //Failed! Show the details
                            $('#compile-console').val($('#compile-console').val() + ' Failed!\n\n-------- loader messages --------\n' + launcher_result);
                        } else {
                            //Show progress during downloading
                            $('#compile-console').val($('#compile-console').val() + ".");
                        }
                    } else {
                        //todo - Remove this once client_min_version (and thus minVer) is >= minCodedVer
                        //Messages are not coded; display all as they come
                        $('#compile-console').val($('#compile-console').val() + ws_msg.msg);
                    }
                    
                    // Scoll automatically to the bottom after new data is added
                    var compileConsoleObj = document.getElementById("compile-console");
                    compileConsoleObj.scrollTop = compileConsoleObj.scrollHeight;
                    
                } else if (ws_msg.action === 'close-compile') {
                    $('#compile-dialog').modal('hide');
                    $('#compile-console').val('');

                } else if (ws_msg.action === 'console-log') {
                    console.log(ws_msg.msg);

                } else if (ws_msg.action === 'websocket-close') {
                    client_ws_connection.close();

                } else if (ws_msg.action === 'alert') {
                    alert(ws_msg.msg);
                }
            }

            // --- older client - disconnect it?
            else {
                console.log('Unknown WS msg: ' + JSON.stringify(ws_msg));
                //connection.close();
            }
        };

        connection.onClose = function () {
            lostWSConnection();
        };    
    }
}

function lostWSConnection() {
// Lost websocket connection, clean up and restart find_client processing
    client_ws_connection = null;
    client_use_type = 'none';
    client_available = false;
    ports_available = false;

    set_ui_buttons('unavailable');
    term = null;
    newTerminal = false;

    // Clear ports list
    set_port_list();
 
    if (client_ws_heartbeat_interval) {
        clearInterval(client_ws_heartbeat_interval);
        client_ws_heartbeat_interval = null;
    }

    //Create new ws socket timeout (find_client)
    check_ws_socket_timeout = setTimeout(find_client, 3000);
};
