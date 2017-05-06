/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function filterToolbox(profileName, peripherals) {
    var componentlist = peripherals.slice();
    componentlist.push(profileName);
    // console.log(componentlist);
    $("#toolbox").find('category').each(function () {
        var toolboxEntry = $(this);
        var include = toolboxEntry.attr('include');
        if (include) {
            var includes = include.split(",");
            if (!findOne(componentlist, includes)) {
                toolboxEntry.remove();
            }
        }

        var exclude = toolboxEntry.attr('exclude');
        if (exclude) {
            var excludes = exclude.split(",");
            if (findOne(componentlist, excludes)) {
                toolboxEntry.remove();
            }
        }
        if (document.referrer.split('?')[1].indexOf('graphing=1') === -1) {
            var graphing = toolboxEntry.attr('graphing');
            if (graphing)
                toolboxEntry.remove();
        }
        if (document.referrer.split('?')[1].indexOf('grayscale=1') > -1) {
            var colorChanges = {
                '140': '#AAAAAA',
                '165': '#222222',
                '185': '#333333',
                '205': '#444444',
                '225': '#555555',
                '250': '#666666',
                '275': '#777777',
                '295': '#888888',
                '320': '#999999',
                '340': '#111111'
            };
            var colour = toolboxEntry.attr('colour');
            if (colour)
                toolboxEntry.attr('colour', colorChanges[colour]);
        }
    });
    $("#toolbox").find('sep').each(function () {
        var toolboxEntry = $(this);
        var include = toolboxEntry.attr('include');
        if (include) {
            var includes = include.split(",");
            if (!findOne(componentlist, includes)) {
                toolboxEntry.remove();
            }
        }

        var exclude = toolboxEntry.attr('exclude');
        if (exclude) {
            var excludes = exclude.split(",");
            if (findOne(componentlist, excludes)) {
                toolboxEntry.remove();
            }
        }
    });
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