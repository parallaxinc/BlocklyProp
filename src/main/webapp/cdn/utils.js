var utils = {
    showMessage: function (title, message) {
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
    confirm: function (title, message, callback) {
        bootbox.dialog({
            title: title,
            message: message,
            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: function () {
                        callback(false);
                    }
                },
                confirm: {
                    lable: "Confirm",
                    className: "btn-primary",
                    callback: function () {
                        callback(true);
                    }
                }
            }
        });
    },
    getUrlParameters: function (parameter, staticURL, decode) {
        /*
         Function: getUrlParameters
         Description: Get the value of URL parameters either from
         current URL or static URL
         Author: Tirumal
         URL: www.code-tricks.com
         */
        var currLocation = staticURL ? staticURL : window.location.search;

        var parArr = [];
        if (currLocation !== undefined && currLocation.split("?")[1] !== undefined) {
            parArr = currLocation.split("?")[1].split("&");
        }
        var returnBool = true;

        for (var i = 0; i < parArr.length; i++) {
            parr = parArr[i].split("=");
            if (parr[0] == parameter) {
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            } else {
                returnBool = false;
            }
        }

        if (!returnBool)
            return false;
    }

};

$(document).ready(function () {
    $(".external_link").click(function (e) {
        window.open($(this).attr("href"), "_blank");
        e.preventDefault();
    });
});