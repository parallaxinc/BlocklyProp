/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var client_available = false;
var client_url = 'http://localhost:6009/';

var client_domain_name = "localhost";
var client_domain_port = 6009;

var client_min_version = 0.2;
var client_baud_rate_min_version = 0.4;

var client_use_websockets = false;
var client_ws_connection = null;

var baud_rate_compatible = false;

$(document).ready(function () {
    establish_socket();
    if (client_use_websockets === false) {
        check_client();
    }
    $.get($("#client-instructions").data('url'), function (data) {
        $("#client-instructions").html(data);
    });
});

var check_com_ports_interval = null;
var check_ws_socket_interval = null;

version_as_number = function (rawVersion) {
    var tempVersion = rawVersion.toString().split(".");
    tempVersion.push('0');

    if (tempVersion.length < 3) {
        bootbox.alert("BlocklyProp is unable to determine what version of " +
                "BlocklyPropClient is installed on your computer.\nYou may need to install" +
                "or reinstall the BlocklyPropClient.");
        if (tempVersion.length === 1)
            tempVersion = '0.0.0';
        else
            tempVersion.unshift('0');
    }

    // Allow for any of the three numbers to be between 0 and 1023.
    // Equivalent to: (Major * 104856) + (Minor * 1024) + Revision.
    return (Number(tempVersion[0]) << 20 | Number(tempVersion[1]) << 10 | Number(tempVersion[2]));
};

check_client = function () {
    $.get(client_url, function (data) {
        if (!client_available) {
            console.log(data);
            if (!data.server || data.server !== 'BlocklyPropHTTP') {
                // wrong server
            } else if (version_as_number(data.version) < version_as_number(client_min_version)) {
                bootbox.alert("This now requires at least version " + client_min_version + " of BlocklyPropClient.");
            }

            if (version_as_number(data.version) >= version_as_number(client_baud_rate_min_version)) {
                baud_rate_compatible = true;
            }

            client_available = true;
            $("#client-available").removeClass("hidden");
            $("#client-searching").addClass("hidden");
            $("#client-unavailable").addClass("hidden");
 
            if (check_com_ports && typeof (check_com_ports) === "function") {
                check_com_ports();
                check_com_ports_interval = setInterval(check_com_ports, 5000);
            }
        }
        setTimeout(check_client, 20000);
        
    }).fail(function () {
        clearInterval(check_com_ports_interval);
        client_available = false;
        $("#client-searching").addClass("hidden");
        $("#client-available").addClass("hidden");
        $("#client-unavailable").removeClass("hidden");
        setTimeout(check_client, 2000);
    });
};

configure_client = function () {
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

// checks for and, if found, uses a newer WebSocekts-only client
function establish_socket() {

    // TODO: set/clear and load buttons based on status
    
    if (!client_available) {
        
        // Clear the port list
        var selected_port = $("#comPort").val();
        $("#comPort").empty();
        $("#comPort").append($('<option>', {
            text: 'Searching...'
        }));
        select_com_port(selected_port);


        var url = client_url + 'serial.connect';
        url = url.replace('http', 'ws');
        var connection = new WebSocket(url);

        connection.onopen = function () {
            var ws_msg = {type: 'hello-browser', baud: baudrate};
            connection.send(JSON.stringify(ws_msg));
        };

        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error');
            console.log(error);

            $("#client-searching").removeClass("hidden");
            $("#client-available").addClass("hidden");
            $("#client-unavailable").addClass("hidden");
            
            // TODO: Should we shutdown and try again?
        };

        // handle messages from the client
        connection.onmessage = function (e) {
            var ws_msg = JSON.parse(e.data);

            // --- hello handshake - establish new connection
            if (ws_msg.type === 'hello-client') {
                if (version_as_number(ws_msg.version) < version_as_number(client_min_version)) {
                    bootbox.alert("This now requires at least version " + client_min_version + " of BlocklyPropClient.");
                }
                if (version_as_number(ws_msg.version) >= version_as_number(client_baud_rate_min_version)) {
                    baud_rate_compatible = true;
                }
                client_use_websockets = true;
                client_ws_connection = connection;
                client_available = true;

                $("#client-available").removeClass("hidden");
                $("#client-searching").addClass("hidden");
                $("#client-unavailable").addClass("hidden");
                
            }

            // --- com port list/change
            else if (ws_msg.type === 'port-list') {  // type: 'port-list', ports: ['port1', 'port2', 'port3'...]
                
                selected_port = $("#comPort").val();
                $("#comPort").empty();
                ws_msg.ports.forEach(function (port) {
                    $("#comPort").append($('<option>', {
                        text: port
                    }));
                });
                select_com_port(selected_port);
            }

            // --- serial terminal/graph
            else if (ws_msg.type === 'serial-debug') {
                if (ws_msg.target === 'terminal') { // 'terminal'

                } else { // 'graph'

                }
            }

            // --- Response from programming the Prop
            else if (ws_msg.type === 'prop-load') {

            }

            // --- older client - disconnect it!
            else {
                connection.close();
            }

        };

        connection.onClose = function () {
            client_available = false;

            $("#client-searching").addClass("hidden");
            $("#client-available").addClass("hidden");
            $("#client-unavailable").removeClass("hidden");
            
            selected_port = $("#comPort").val();
            $("#comPort").empty();
            $("#comPort").append($('<option>', {
                text: 'Searching...'
            }));
            select_com_port(selected_port);

            check_ws_socket_interval = setTimeout(function() {establish_socket();}, 4000);
        };
    }
}
