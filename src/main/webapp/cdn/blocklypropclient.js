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

$(document).ready(function() {
    check_client();
});

var check_com_ports_interval = null;

check_client = function() {
    $.get(client_url, function(data) {
        if (!client_available) {
            console.log(data);
            if (!data.server || data.server !== 'BlocklyPropHTTP') {
                // wrong server
            } else if (data.version < client_min_version) {
                bootbox.alert("This now requires at least version " + client_min_version + " of BlocklyPropClient.");
            }
            
            client_available = true;
            $("#client_status").text("BlocklyPropClient available").removeClass("not_available").addClass("available");
            if (check_com_ports && typeof(check_com_ports) === "function") {
                check_com_ports();
                check_com_ports_interval = setInterval(check_com_ports, 5000);
            }
        }
        setTimeout(check_client, 20000);
    }).fail(function() {
        clearInterval(check_com_ports_interval);
        client_available = false;
        $("#client_status").text("BlocklyPropClient not available").removeClass("available").addClass("not_available");
        setTimeout(check_client, 2000);
    });
};

configure_client = function() {
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
            cancel : {
                label: "Cancel",
                className: "btn-default"
            },
            save : {
                label: "Save",
                className: "btn-success",
                callback: function() {
                    client_domain_name = $("#domain_name").val();
                    client_domain_port = $("#port_number").val();
                    client_url = "http://" + client_domain_name + ":" + client_domain_port + "/";
                }
            }
        }
    });
};