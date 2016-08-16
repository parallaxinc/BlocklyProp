/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Generating Prop-c for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//To support syntax defined in http://arduino.cc/en/Reference/HomePage
//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.propc['math_number'] = function() {
    // Numeric value.
    var code = window.parseFloat(this.getFieldValue('NUM'));
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
            Blockly.propc.ORDER_UNARY_PREFIX : Blockly.propc.ORDER_ATOMIC;
    return [code, order];
};


Blockly.propc.math_arithmetic = function() {
    // Basic arithmetic operators, and power.
    var mode = this.getFieldValue('OP');
    var tuple = Blockly.propc.math_arithmetic.OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.propc.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', order) || '0';
    var code;

    code = argument0 + operator + argument1;
    return [code, order];
};

Blockly.propc.math_arithmetic.OPERATORS = {
    ADD: [' + ', Blockly.propc.ORDER_ADDITIVE],
    MINUS: [' - ', Blockly.propc.ORDER_ADDITIVE],
    MULTIPLY: [' * ', Blockly.propc.ORDER_MULTIPLICATIVE],
    DIVIDE: [' / ', Blockly.propc.ORDER_MULTIPLICATIVE],
    MODULUS: [' % ', Blockly.propc.ORDER_MULTIPLICATIVE],
};

// Limit
Blockly.Blocks.math_limit = {
    // Basic arithmetic operator.
    init: function() {
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('A')
            .setCheck('Number');
        this.appendValueInput('B')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');

        this.setInputsInline(true);
        this.setTooltip("Limit");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks.math_limit.OPERATORS = [
    ["Limit min", 'LIMIT_MIN'],
    ["Limit max", 'LIMIT_MAX']
];

Blockly.propc.math_limit = function() {
    // Basic arithmetic operators, and power.
    var mode = this.getFieldValue('OP');
    var tuple = Blockly.propc.math_limit.OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.propc.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', order) || '0';
    var code;

    code = argument0 + operator + argument1;
    return [code, order];
};

Blockly.propc.math_limit.OPERATORS = {
    LIMIT_MIN: [' #> ', Blockly.propc.ORDER_ASSIGNMENT],
    LIMIT_MAX: [' <# ', Blockly.propc.ORDER_ASSIGNMENT]
};

// Increment/decrement
Blockly.Blocks.math_crement = {
    // Rounding functions.
    init: function() {
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('VAR')
            .setCheck('Number')
            .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');

        this.setTooltip("");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks.math_crement.OPERATORS = [
    ["decrement", 'DEC'],
    ["increment", 'INC']
];

Blockly.propc.math_crement = function() {
    // Basic arithmetic operators, and power.
    var mode = this.getFieldValue('OP');
    var tuple = Blockly.propc.math_crement.OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var variable = Blockly.propc.valueToCode(this, 'VAR', order) || '0';

    var code = variable + operator + ';\n';
    return code;
};

Blockly.propc.math_crement.OPERATORS = {
    DEC: ['--', Blockly.propc.ORDER_UNARY_PREFIX],
    INC: ['++', Blockly.propc.ORDER_UNARY_PREFIX]
};

Blockly.Blocks.math_random = {
    // Rounding functions.
    init: function() {
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
            .appendField("random");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.math_random = function() {
    Blockly.propc.setups_["random_seed"] = "srand(23);\n";

    var code = 'rand() % 100';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.math_bitwise = {
    init: function() {
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('VAL1');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["& (bitwise AND)", "&"], ["| (bitwise OR)", "|"], ["^ (bitwise XOR)", "^"], [">> (bitwise right shift)", ">>"], ["<< (bitwise left shift)", "<<"]]), "OPERATION");
        this.appendValueInput('VAL2');

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.math_bitwise = function() {
    var value1 = Blockly.propc.valueToCode(this, 'VAL1', Blockly.propc.ORDER_NONE);
    var value2 = Blockly.propc.valueToCode(this, 'VAL2', Blockly.propc.ORDER_NONE);
    var operation = this.getFieldValue('OPERATION');

    var code = value1 + ' ' + operation + ' ' + value2;
    return [code, Blockly.propc.ORDER_NONE];
};
