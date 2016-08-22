/**
 * Created by Michel on 30-4-2016.
 */

var colorPalette = {
    defaultColors: {
        'programming': 205,
        'math': 275,
        'binary': 275,
        'io': 185,
        'protocols': 340,
        'ab': 320,
        'input': 140,
        'output': 165,
        'robot': 295,
        'heb': 295,
        'functions': 225,
        'variables': 250,
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
