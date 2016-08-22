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
 * @fileoverview Generating Spin for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//To support syntax defined in http://arduino.cc/en/Reference/HomePage

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Spin.math_number = function () {
    // Numeric value.
    var code = window.parseFloat(this.getFieldValue('NUM'));
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
            Blockly.Spin.ORDER_UNARY_PREFIX : Blockly.Spin.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Spin.math_integer = function () {
    // Numeric value.
    var code = window.parseInt(this.getFieldValue('INT_VALUE'));
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
            Blockly.Spin.ORDER_UNARY_PREFIX : Blockly.Spin.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Spin.math_int_angle = function () {
    // Numeric value.
    var code = window.parseInt(this.getFieldValue('ANGLE_VALUE'));
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
            Blockly.Spin.ORDER_UNARY_PREFIX : Blockly.Spin.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Spin.math_arithmetic = function () {
    // Basic arithmetic operators, and power.
    var mode = this.getFieldValue('OP');
    var tuple = Blockly.Spin.math_arithmetic.OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.Spin.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.Spin.valueToCode(this, 'B', order) || '0';
    var code;
//    if (!operator) {
//        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
//        return [code, Blockly.Spin.ORDER_UNARY_POSTFIX];
//    }
    code = argument0 + operator + argument1;
    return [code, order];
};

Blockly.Spin.math_arithmetic.OPERATORS = {
    ADD: [' + ', Blockly.Spin.ORDER_ADDITIVE],
    MINUS: [' - ', Blockly.Spin.ORDER_ADDITIVE],
    MULTIPLY: [' * ', Blockly.Spin.ORDER_MULTIPLICATIVE],
    DIVIDE: [' / ', Blockly.Spin.ORDER_MULTIPLICATIVE],
    MODULUS: [' // ', Blockly.Spin.ORDER_MULTIPLICATIVE],
    //   POWER: [null, Blockly.Spin.ORDER_NONE]  // Handle power separately.
};



Blockly.Spin.math_single = function () {
    // Math operators with single operand.
    var operator = this.getFieldValue('OP');
    var code;
    var arg;
    if (operator == 'NEG') {
        // Negation is a special case given its different operator precedents.
        arg = Blockly.Spin.valueToCode(this, 'NUM',
                Blockly.Spin.ORDER_UNARY_PREFIX) || '0';
        if (arg[0] == '-') {
            // --3 is not legal in Dart.
            arg = ' ' + arg;
        }
        code = '-' + arg;
        return [code, Blockly.Spin.ORDER_UNARY_PREFIX];
    }
    if (operator == 'ABS' || operator.substring(0, 5) == 'ROUND') {
        arg = Blockly.Spin.valueToCode(this, 'NUM',
                Blockly.Spin.ORDER_UNARY_POSTFIX) || '0';
    } else if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
        arg = Blockly.Spin.valueToCode(this, 'NUM',
                Blockly.Spin.ORDER_MULTIPLICATIVE) || '0';
    } else {
        arg = Blockly.Spin.valueToCode(this, 'NUM',
                Blockly.Spin.ORDER_NONE) || '0';
    }
    // First, handle cases which generate values that don't need parentheses.
    switch (operator) {
        case 'ABS':
            code = '||' + arg;
            break;
        case 'ROOT':
            code = '^^' + arg;
            break;
        case 'EXP':
            code = 'Math.exp(' + arg + ')';
            break;
    }

    return [code, Blockly.Spin.ORDER_UNARY_POSTFIX];
};

// Limit

Blockly.Blocks.math_limit = {
    // Basic arithmetic operator.
    helpUrl: "",
    init: function () {
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
                .setCheck('Number');
        this.appendValueInput('B')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
        this.setInputsInline(true);
        this.setTooltip("Limit");
    }
};

Blockly.Blocks.math_limit.OPERATORS =
        [["limit min", 'LIMIT_MIN'],
            ["limit max", 'LIMIT_MAX']];

Blockly.Spin.math_limit = function () {
    // Basic arithmetic operators, and power.
    var mode = this.getFieldValue('OP');
    var tuple = Blockly.Spin.math_limit.OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.Spin.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.Spin.valueToCode(this, 'B', order) || '0';
    var code;
//    if (!operator) {
//        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
//        return [code, Blockly.Spin.ORDER_UNARY_POSTFIX];
//    }
    code = argument0 + operator + argument1;
    return [code, order];
};

Blockly.Spin.math_limit.OPERATORS = {
    LIMIT_MIN: [' #> ', Blockly.Spin.ORDER_ASSIGNMENT],
    LIMIT_MAX: [' <# ', Blockly.Spin.ORDER_ASSIGNMENT]
};

// Increment/decrement
Blockly.Blocks.math_crement = {
    // Rounding functions.
    helpUrl: "",
    init: function () {
        this.setColour(colorPalette.getColor('math'));
        // this.setOutput(true, Number);
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.appendValueInput('VAR')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
        this.setTooltip("");
    }
};

Blockly.Blocks.math_crement.OPERATORS =
        [["Decrement", 'DEC'],
            ["Increment", 'INC']];

Blockly.Spin.math_crement = function () {
    // Basic arithmetic operators, and power.
    var mode = this.getFieldValue('OP');
    var tuple = Blockly.Spin.math_crement.OPERATORS[mode];
    var operator = tuple[0];
    var order = tuple[1];
    var variable = Blockly.Spin.valueToCode(this, 'VAR', order) || '0';
//    if (!operator) {
//        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
//        return [code, Blockly.Spin.ORDER_UNARY_POSTFIX];
//    }
    var code = variable + operator + '\n';
    return code;
};

Blockly.Spin.math_crement.OPERATORS = {
    DEC: ['--', Blockly.Spin.ORDER_UNARY_PREFIX],
    INC: ['++', Blockly.Spin.ORDER_UNARY_PREFIX]
};
