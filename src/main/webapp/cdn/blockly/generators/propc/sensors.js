/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating C for sensor blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.sensor_ping = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Ping))) distance in")
            .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT")
            .appendField("PIN")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};


Blockly.propc.sensor_ping = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    var unit = this.getFieldValue('UNIT');
    var methodForUnit = Blockly.propc.sensor_ping.UNITS[unit];

    Blockly.propc.definitions_["include ping"] = '#include "ping.h"';

    var code = 'ping' + methodForUnit + '(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.sensor_ping.UNITS = {
    INCHES: '_inches',
    CM: '_cm',
    TICKS: ''
};

Blockly.Blocks.PIR_Sensor = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("PIR Sensor PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.PIR_Sensor = function () {
    var pin = this.getFieldValue('PIN');

    var code = 'input(' + pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.SF02_Laser_Rangefinder = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("SF02 Laser Rangefinder PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.SF02_Laser_Rangefinder = function() {
    var pin = this.getFieldValue('PIN');

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';

    var code = 'ad_volts(' + pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.sound_impact_run = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Sound Impact run in processor")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]]), "COG");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sound_impact_get = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Sound Impact get data");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setTooltip('Ensure the sound impact sensor has been initialized before using this block');
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.sound_impact_end = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Sound Impact turn off");

        this.setTooltip('Ensure the sound impact sensor has been initialized before using this block');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.sound_impact_run = function() {
    var cog = this.getTitleValue('COG');

    Blockly.propc.definitions_["sound_impact"] = '#include "soundimpact.h"';
    Blockly.propc.setups_["sound_impact"] = 'int *soundimpactcog = soundImpact_run(' + cog + ');\n';

    return '';
};

Blockly.propc.sound_impact_get = function() {
    Blockly.propc.definitions_["sound_impact"] = '#include "soundimpact.h"';

    if (Blockly.propc.setups_["sound_impact"] === undefined)
    {
        return '-1 /*Missing sound impact sensor declaration statement*/';
    }

    return 'soundImpact_getCount()';
};

Blockly.propc.sound_impact_end = function() {
    Blockly.propc.definitions_["sound_impact"] = '#include "soundimpact.h"';
    if (Blockly.propc.setups_["sound_impact"] === undefined)
    {
        return '//Missing sound impact sensor declaration statement';
    }

    return 'soundImpact_end(soundimpactcog);\n';
};

Blockly.Blocks.colorpal_enable = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("ColorPal initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'IO_PIN');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.colorpal_get_colors_raw = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("ColorPal raw colors store R in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'R_STORAGE');
        this.appendDummyInput()
                .appendField("G in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'G_STORAGE');
        this.appendDummyInput()
                .appendField("B in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'B_STORAGE');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('R_STORAGE'), this.getFieldValue('G_STORAGE'), this.getFieldValue('B_STORAGE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('R_STORAGE'))) {
            this.setTitleValue(newName, 'R_STORAGE');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('G_STORAGE'))) {
            this.setTitleValue(newName, 'G_STORAGE');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('B_STORAGE'))) {
            this.setTitleValue(newName, 'B_STORAGE');
        }
    }
};

Blockly.Blocks.colorpal_get_colors = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("ColorPal store color in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'COLOR');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('COLOR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('COLOR'))) {
            this.setTitleValue(newName, 'COLOR');
        }
    }
};

Blockly.propc.colorpal_enable = function () {
    Blockly.propc.global_vars_["colorpal"] = 'colorPal *cpal;';
    Blockly.propc.definitions_["colorpal"] = '#include "colorpal.h"';

    var pin = this.getFieldValue('IO_PIN');    
    
    //Blockly.propc.global_vars_["colorpal_pin"] = 'int cpSIO = ' + pin + ';';
    Blockly.propc.setups_["colorpal"] = 'cpal = colorPal_open(' + pin + ');';

    return '';
};

Blockly.propc.colorpal_get_colors_raw = function () {
    var r = Blockly.propc.variableDB_.getName(this.getFieldValue('R_STORAGE'), Blockly.Variables.NAME_TYPE);
    var g = Blockly.propc.variableDB_.getName(this.getFieldValue('G_STORAGE'), Blockly.Variables.NAME_TYPE);
    var b = Blockly.propc.variableDB_.getName(this.getFieldValue('B_STORAGE'), Blockly.Variables.NAME_TYPE);

    return 'colorPal_getRGB(cpal, &' + r + ', &' + g + ', &' + b + ');';
};

Blockly.propc.colorpal_get_colors = function () {
    var color_var = Blockly.propc.variableDB_.getName(this.getFieldValue('COLOR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.global_vars_["colorpal_rr"] = 'int cpRR = 0;';
    Blockly.propc.global_vars_["colorpal_gg"] = 'int cpGG = 0;';
    Blockly.propc.global_vars_["colorpal_bb"] = 'int cpBB = 0;';

    var code = 'colorPal_getRGB(cpal, &cpRR, &cpGG, &cpBB);\n\t' + color_var + ' = colorPalRRGGBB(cpRR, cpGG, cpBB);';
    return code;
};
