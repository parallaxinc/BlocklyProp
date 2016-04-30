/**
 * Created by Michel on 30-4-2016.
 */

var colorPalette = {

    defaultColors: {
        'programming': 0,
        'math': 30,
        'binary': 60,
        'io': 90,
        'protocols': 120,
        'ab': 150,
        'input': 180,
        'output': 210,
        'robot': 240,
        'heb': 270,
        'functions': 300,
        'variables': 330
    },

    activePalette: null,

    getColor: function(type) {
        if (colorPalette.activePalette && colorPalette.activePalette[type] != undefined) {
            return colorPalette.activePalette[type];
        }
        console.log("Missing color type: " + type);
        return '#000000';
    }

};

colorPalette.activePalette = colorPalette.defaultColors;