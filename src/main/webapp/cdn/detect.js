var osName = 'unknown-client';

var inDemo = $("meta[name=in-demo]").attr("content");

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
    $("body").addClass(osName);
});