/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var utils = {
    
    showMessage : function(title, message) {
        bootbox.dialog({
            title: title,
            message: message,
            buttons: {
                confirm: {
                    lable: "Ok",
                    className: "btn-primary"
                }
            }
        });
    },
    
    confirm: function(title, message, callback) {
        bootbox.dialog({
            title: title,
            message: message,
            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: function() {
                        callback(false);
                    }
                },
                confirm: {
                    lable: "Confirm",
                    className: "btn-primary",
                    callback: function() {
                        callback(true);
                    }
                }
            }
        });
    }
        
};