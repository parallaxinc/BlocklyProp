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

    var code = 'rc_time(' + pin + ', ' + state + ');\n';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.comment = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('comment'), "COMMENT_TEXT");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.comment = function() {
    var text = this.getFieldValue("COMMENT_TEXT");

    return '// ' + text + '\n';
};

Blockly.Blocks.comment = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('comment'), "COMMENT_TEXT");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.comment = function() {
    var text = this.getFieldValue("COMMENT_TEXT");

    return '// ' + text;
};

Blockly.Blocks.comment = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('comment'), "COMMENT_TEXT");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.comment = function() {
    var text = this.getFieldValue("COMMENT_TEXT");

    return '// ' + text;
};
