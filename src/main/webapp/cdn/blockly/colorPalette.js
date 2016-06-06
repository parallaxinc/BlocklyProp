/**
 * Created by Michel on 30-4-2016.
 */

var colorPalette = {
    defaultColors: {
        'programming': 220,
        'math': 275,
        'binary': 275,
        'io': 200,
        'protocols': 320,
        'ab': 305,
        'input': 155,
        'output': 180,
        'robot': 290,
        'heb': 290,
        'functions': 240,
        'variables': 260,
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