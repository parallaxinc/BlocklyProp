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
    }
};

// POLYFILLS
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

// http://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-elements-in-another-array-in-javascript
/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        // console.log(v + " " + (haystack.indexOf(v) >= 0));
        return haystack.indexOf(v) >= 0;
    });
};

// http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// Server (demo/production) detection
var inDemo = $("meta[name=in-demo]").attr("content");

// Operating system detection
var osName = 'unknown-client';

function nav(x, y, z) {
    z = z || y;
    if (navigator[x] && navigator[x].indexOf(y) !== -1) {
        osName = z;
    }
}

/*   navigator     value     download  */
nav("appVersion", "X11", "UNIX");
nav("appVersion", "Mac", "MacOS");
nav("appVersion", "Linux");
nav("userAgent", "Linux");
nav("platform", "Linux");
nav("appVersion", "Win", "Windows");
nav("userAgent", "Windows");
nav("platform", "Win", "Windows");
nav("oscpu", "Windows");
nav("appVersion", "CrOS", "ChromeOS");


$(document).ready(function () {
    // Use the "external_link" class to make links open in new tabs
    $(".external_link").click(function (e) {
        window.open($(this).attr("href"), "_blank");
        e.preventDefault();
    });
    
    // Set up divs to hide/show OS-specific content
    $("body").addClass(osName);
    
    // Copy the client download and run instructions 
    // from the client instruction page to the modal that also shows them
    $("#client-instructions-copy").html($("#client-instructions-original").html());
});

