/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
 *
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
 * @fileoverview Generating Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.propc.make_pin = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'high(' + dropdown_pin + ');\n';
        case "LOW":
            return 'low(' + dropdown_pin + ');\n';
        case "TOGGLE":
            return 'toggle(' + dropdown_pin + ');\n\tset_direction(' + dropdown_pin + ', 1);\n';
        case "INPUT":
            return 'set_direction(' + dropdown_pin + ', 0);\n';
        case "REVERSE":
            return 'reverse(' + dropdown_pin + ');\n';
    }
};

Blockly.propc.make_pin_input = function () {
    var pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || 0;
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'high(' + pin + ');\n';
        case "LOW":
            return 'low(' + pin + ');\n';
        case "TOGGLE":
            return 'toggle(' + pin + ');\n\tset_direction(' + pin + ', 1);\n';
        case "INPUT":
            return 'set_direction(' + pin + ', 0);\n';
        case "REVERSE":
            return 'reverse(' + pin + ');\n';
    }
};

Blockly.propc.check_pin = function () {
    var dropdown_pin = this.getFieldValue('PIN');

    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.check_pin_input = function () {
    var dropdown_pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_UNARY_PREFIX) || '0';

    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.set_pins = function () {
    var code = '';
    var action = this.getFieldValue('ACTION');
    var dropdown_pin_count = Number(this.getFieldValue('PIN_COUNT'));
    var dropdown_start_pin = Number(this.getFieldValue('START_PIN'));
    if (action === 'STATE') {
        code = 'set_outputs(';
    } else if (action === 'DIRECTION') {
        code = 'set_directions(';
    }
    //var highestPin = dropdown_start_pin + dropdown_pin_count - 1;
    
    code += dropdown_pin_count;
    code += ', ';
    code += dropdown_start_pin;
    code += ', 0b';
    for (var i = dropdown_pin_count; i >= dropdown_start_pin; i--) {
        code += this.getFieldValue('P' + i);
    }
    return code + ');\n';
};

Blockly.propc.base_delay = function () {
    var delay_time = Blockly.propc.valueToCode(this, 'DELAY_TIME', Blockly.propc.ORDER_ATOMIC) || '1000';
    var code = 'pause(' + delay_time + ');\n';
    return code;
};

Blockly.propc.base_freqout = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var duration = Blockly.propc.valueToCode(this, 'DURATION', Blockly.propc.ORDER_ATOMIC) || 1000;
    var frequency = Blockly.propc.valueToCode(this, 'FREQUENCY', Blockly.propc.ORDER_ATOMIC) || 3000;

    var code = 'freqout(' + dropdown_pin + ', ' + duration + ', ' + frequency + ');\n';

    return code;
};

Blockly.Blocks.string_type_block = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_STRING_TYPE_BLOCK_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('Hello'), "TEXT");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'String');
    }
};

Blockly.propc.string_type_block = function() {
    var text = this.getFieldValue("TEXT");

    var code = '"' + text + '"';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.char_type_block = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_CHAR_TYPE_BLOCK_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField("character")
                .appendField(new Blockly.FieldDropdown([
                    ["32 - space", "32"],
                    ["33 - !", "33"],
                    ["34 - \"", "34"],
                    ["35 - #", "35"],
                    ["36 - $", "36"],
                    ["37 - %", "37"],
                    ["38 - &", "38"],
                    ["39 - '", "39"],
                    ["40 - (", "40"],
                    ["41 - )", "41"],
                    ["42 - *", "42"],
                    ["43 - +", "43"],
                    ["44 - ,", "44"],
                    ["45 - -", "45"],
                    ["46 - .", "46"],
                    ["47 - /", "47"],
                    ["48 - 0", "48"],
                    ["49 - 1", "49"],
                    ["50 - 2", "50"],
                    ["51 - 3", "51"],
                    ["52 - 4", "52"],
                    ["53 - 5", "53"],
                    ["54 - 6", "54"],
                    ["55 - 7", "55"],
                    ["56 - 8", "56"],
                    ["57 - 9", "57"],
                    ["58 - :", "58"],
                    ["59 - ;", "59"],
                    ["60 - <", "60"],
                    ["61 - =", "61"],
                    ["62 - >", "62"],
                    ["63 - ?", "63"],
                    ["64 - @", "64"],
                    ["65 - A", "65"],
                    ["66 - B", "66"],
                    ["67 - C", "67"],
                    ["68 - D", "68"],
                    ["69 - E", "69"],
                    ["70 - F", "70"],
                    ["71 - G", "71"],
                    ["72 - H", "72"],
                    ["73 - I", "73"],
                    ["74 - J", "74"],
                    ["75 - K", "75"],
                    ["76 - L", "76"],
                    ["77 - M", "77"],
                    ["78 - N", "78"],
                    ["79 - O", "79"],
                    ["80 - P", "80"],
                    ["81 - Q", "81"],
                    ["82 - R", "82"],
                    ["83 - S", "83"],
                    ["84 - T", "84"],
                    ["85 - U", "85"],
                    ["86 - V", "86"],
                    ["87 - W", "87"],
                    ["88 - X", "88"],
                    ["89 - Y", "89"],
                    ["90 - Z", "90"],
                    ["91 - [", "91"],
                    ["92 - \\", "92"],
                    ["93 - ]", "93"],
                    ["94 - ^", "94"],
                    ["95 - _", "95"],
                    ["96 - `", "96"],
                    ["97 - a", "97"],
                    ["98 - b", "98"],
                    ["99 - c", "99"],
                    ["100 - d", "100"],
                    ["101 - e", "101"],
                    ["102 - f", "102"],
                    ["103 - g", "103"],
                    ["104 - h", "104"],
                    ["105 - i", "105"],
                    ["106 - j", "106"],
                    ["107 - k", "107"],
                    ["108 - l", "108"],
                    ["109 - m", "109"],
                    ["110 - n", "110"],
                    ["111 - o", "111"],
                    ["112 - p", "112"],
                    ["113 - q", "113"],
                    ["114 - r", "114"],
                    ["115 - s", "115"],
                    ["116 - t", "116"],
                    ["117 - u", "117"],
                    ["118 - v", "118"],
                    ["119 - w", "119"],
                    ["120 - x", "120"],
                    ["121 - y", "121"],
                    ["122 - z", "122"],
                    ["123 - {", "123"],
                    ["124 - |", "124"],
                    ["125 - }", "125"],
                    ["126 - ~", "126"]]), "CHAR");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.char_type_block = function() {
    var code = this.getFieldValue("CHAR");

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.system_counter = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_SYSTEM_COUNTER_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("system counter");
        this.setOutput(true, "Number");
  }
};

Blockly.propc.system_counter = function() {
  var code = 'CNT';
  return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.string_length = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_STRING_LENGTH_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('VALUE')
                .setCheck('String')
                .appendField("length of string");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.string_length = function() {
  var text = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE);
  return ['strlen(' + text + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.high_low_value = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_HIGH_LOW_VALUE_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["high", "1"], ["low", "0"]]), 'VALUE');

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.high_low_value = function() {
    var code = this.getFieldValue('VALUE');
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.pulse_in = function() {
    var pin = this.getFieldValue("PIN");
    var state = this.getFieldValue("STATE");

    var code = 'pulse_in(' + pin + ', ' + state + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.propc.pulse_out = function() {
    var pin = this.getFieldValue("PIN");
    var pulse_length = Blockly.propc.valueToCode(this, 'PULSE_LENGTH', Blockly.propc.ORDER_ATOMIC);

    return 'pulse_out(' + pin + ', ' + pulse_length + ');\n';
};

Blockly.propc.rc_charge_discharge = function() {
    var pin = this.getFieldValue("PIN");
    var state = this.getFieldValue("STATE");

    var code = 'rc_time(' + pin + ', ' + state + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.comment = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_COMMENT_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField("add comment")
                .appendField(new Blockly.FieldTextInput(''), "COMMENT_TEXT");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.comment = function() {
    var text = this.getFieldValue("COMMENT_TEXT");

    return '// ' + text + '\n';
};

Blockly.Blocks.cast = {
    init: function() {
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('ITEM_TO_CAST')
                .appendField("cast");
        this.appendDummyInput()
                .appendField("to")
                .appendField(new Blockly.FieldDropdown([["int", "(int) "], ["float", "(float) "], ["char", "(char) "], ["char[128]", "(char[]) "]]), "CAST_TYPE");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.cast = function() {
    var type = this.getFieldValue("CAST_TYPE");
    var item = Blockly.propc.valueToCode(this, 'ITEM_TO_CAST', Blockly.propc.ORDER_NONE);

    var code = "" + type + item;
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.color_picker = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_COLOR_PICKER_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField("color")
                .appendField(new Blockly.FieldColour('#FFFFFF').setColours(["#FFFFFF", "#CCCCCC", "#C0C0C0", "#999999", "#666666", "#333333", "#000000", "#FFCCCC", "#FF6666", "#FF0000", "#CC0000", "#990000", "#660000", "#330000", "#FFCC99", "#FF9966", "#FF9900", "#FF6600", "#CC6600", "#993300", "#663300", "#FFFF99", "#FFFF66", "#FFCC66", "#FFCC33", "#CC9933", "#996633", "#663333", "#FFFFCC", "#FFFF33", "#FFFF00", "#FFCC00", "#999900", "#666600", "#333300", "#99FF99", "#66FF99", "#33FF33", "#33CC00", "#009900", "#006600", "#003300", "#99FFFF", "#33FFFF", "#66CCCC", "#00CCCC", "#339999", "#336666", "#003333", "#CCFFFF", "#66FFFF", "#33CCFF", "#3366FF", "#3333FF", "#000099", "#000066", "#CCCCFF", "#9999FF", "#6666CC", "#6633FF", "#6600CC", "#333399", "#330099", "#FFCCFF", "#FF66FF", "#CC66CC", "#CC33CC", "#993399", "#663366", "#330033"]).setColumns(7), "COLOR");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.color_picker = function() {
    var color = this.getFieldValue('COLOR');
    color = "0x" + color.substr(1);

    return [color];
};

Blockly.Blocks.color_value_from = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_COLOR_VALUE_FROM_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("color value from:");
        this.appendValueInput("RED_VALUE")
            .appendField("red");
        this.appendValueInput("GREEN_VALUE")
            .appendField("green");
        this.appendValueInput("BLUE_VALUE")
            .appendField("blue");

        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.color_value_from = function() {
    var red = Blockly.propc.valueToCode(this, 'RED_VALUE', Blockly.propc.ORDER_NONE) || '0';
    var green = Blockly.propc.valueToCode(this, 'GREEN_VALUE', Blockly.propc.ORDER_NONE) || '0';
    var blue = Blockly.propc.valueToCode(this, 'BLUE_VALUE', Blockly.propc.ORDER_NONE) || '0';

    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var output = 'getColorRRGGBB(' + red + ', ' + green + ', ' + blue + ')';
    return [output];
};

Blockly.Blocks.get_channel_from = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_GET_CHANNEL_FROM_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([["Red", "R"], ["Green", "G"], ["Blue", "B"]]), "CHANNEL");
        this.appendValueInput('COLOR')
            .appendField("value from");

        this.setOutput(true, 'Number');
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.get_channel_from = function() {
    var channel = this.getFieldValue("CHANNEL");
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    return ['get8bitColor(' + color + ', "' + channel + '")'];
};

Blockly.Blocks.compare_colors = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_COMPARE_COLORS_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("compare");
        this.appendValueInput('COLOR1')
            .appendField("color 1:");
        this.appendValueInput('COLOR2')
            .appendField("color 2:");

        this.setOutput(true, 'Number');
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.compare_colors = function() {
    var color1 = Blockly.propc.valueToCode(this, 'COLOR1', Blockly.propc.ORDER_NONE) || '0';
    var color2 = Blockly.propc.valueToCode(this, 'COLOR2', Blockly.propc.ORDER_NONE) || '0';

    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var code = 'compareRRGGBB(' + color1 + ', ' + color2 + ')';
    return [code];
};
