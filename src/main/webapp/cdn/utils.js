var utils = {
    showMessage: function (title, message, callback) {
        bootbox.dialog({
            title: title,
            message: message,
            buttons: {
                confirm: {
                    label: "Ok",
                    className: "btn-primary",
                    callback: callback
                }
            }
        });
    },
    prompt: function (title, defaultValue, callback) {
        bootbox.prompt({
            title: title,
            value: defaultValue,
            callback: callback,
            buttons: {
                cancel: {
                    label: "Cancel",
                    className: "btn-default",
                    callback: callback
                },
                confirm: {
                    label: "Confirm",
                    className: "btn-primary",
                    callback: callback
                }
            }

        });
    },
    confirm: function (title, message, callback, optionLabelConfirm, optionLabelCancel) {
        bootbox.dialog({
            title: title,
            message: message,
            buttons: {
                cancel: {
                    label: (optionLabelCancel || "Cancel"),
                    className: "btn-default",
                    callback: function () {
                        callback(false);
                    }
                },
                confirm: {
                    label: (optionLabelConfirm || "Confirm"),
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
            if (parr[0] === parameter) {
                returnBool = true;
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
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

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}