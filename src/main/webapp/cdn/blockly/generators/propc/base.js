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
            Blockly.propc.setups_["init_pin_" + dropdown_pin] = 'low(' + dropdown_pin + ');\n';

            return 'toggle(' + pin + ');\n';
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
    var highestPin = dropdown_start_pin + dropdown_pin_count - 1;
    code += highestPin;
    code += ', ';
    code += dropdown_pin_count;
    code += ', 0b';
    for (var i = highestPin; i >= dropdown_start_pin; i--) {
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
    init: function () {
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

Blockly.Blocks.high_low_value = {
    init: function () {
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

    var code = 'pulse_in(' + pin + ', ' + state + ');\n';
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
    init: function() {
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

    return '// ' + text;
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
    init: function() {
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

    return [color];
};

Blockly.Blocks.color_value_from = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("Color Value From:");
        this.appendValueInput("RED_VALUE")
            .appendField("Red");
        this.appendValueInput("GREEN_VALUE")
            .appendField("Green");
        this.appendValueInput("BLUE_VALUE")
            .appendField("Blue");

        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.color_value_from = function() {
    var red = Blockly.propc.valueToCode(this, 'RED_VALUE', Blockly.propc.ORDER_NONE);
    var green = Blockly.propc.valueToCode(this, 'GREEN_VALUE', Blockly.propc.ORDER_NONE);
    var blue = Blockly.propc.valueToCode(this, 'BLUE_VALUE', Blockly.propc.ORDER_NONE);

    var output = ((Number(red) & 0xFF) << 16) | ((Number(green) & 0xFF) << 8) | (Number(blue) & 0xFF);
    return [output];
};

Blockly.Blocks.get_channel_from = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([["Red", "0"], ["Green", "1"], ["Blue", "2"]]), "CHANNEL");
        this.appendValueInput('VALUE')
            .appendField("value from:");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.get_channel_from = function() {
    var channel = this.getFieldValue("CHANNEL");
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE);

    var color_mask = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    var color_red = parseInt(color_mask[1], 16);
    var color_green = parseInt(color_mask[2], 16);
    var color_blue = parseInt(color_mask[3], 16);

    if (Number(channel) === 0) {
        return [color_red];
    } else if (Number(channel) === 1) {
        return [color_green];
    } else if (Number(channel) === 2) {
        return [color_blue];
    }
};

Blockly.Blocks.compare_colors = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("compare");
        this.appendValueInput('COLOR1')
            .appendField("color 1:");
        this.appendValueInput('COLOR2')
            .appendField("color 2:");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.compare_colors = function() {
    var color1 = Blockly.propc.valueToCode(this, 'COLOR1', Blockly.propc.ORDER_NONE);
    var color2 = Blockly.propc.valueToCode(this, 'COLOR2', Blockly.propc.ORDER_NONE);

    var output = 255 - ((Math.abs((color1 & 0xFF0000) >> 16 - (color2 & 0xFF0000) >> 16) + Math.abs((color1 & 0xFF00) >> 8 - (color2 & 0xFF00) >> 8) + Math.abs(color1 & 0xFF - color2 & 0xFF)) / 3);
    return [output];
};
