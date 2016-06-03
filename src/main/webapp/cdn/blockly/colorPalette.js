/**
 * Created by Michel on 30-4-2016.
 */

var colorPalette = {
    defaultColors: {
        'programming': 220,
        'math': 220,
        'binary': 220,
        'io': 155,
        'protocols': 200,
        'ab': 240,
        'input': 180,
        'output': 280,
        'robot': 220,
        'heb': 260,
        'functions': 220,
        'variables': 220
    },
    activePalette: null,
    getColor: function (type) {
        if (colorPalette.activePalette && colorPalette.activePalette[type] != undefined) {
            return colorPalette.activePalette[type];
        }
        console.log("Missing color type: " + type);
        return '#000000';
    }

};

colorPalette.activePalette = colorPalette.defaultColors;