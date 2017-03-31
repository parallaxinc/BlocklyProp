/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo, Vale Tolpegin
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
 *         valetolpegin@gmail.com    (Vale Tolpegin)
 *         jewald@parallax.com       (Jim Ewald)
 *         mmatz@parallax.com        (Matthew Matz)
 *         kgracey@parallax.com      (Ken Gracey)
 *         carsongracey@gmail.com    (Carson Gracey)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

/*
 Blockly.Blocks.number_range = {
 helpUrl: Blockly.MSG_VALUES_HELPURL,
 init: function () {
 this.setTooltip(Blockly.MSG_MATH_NUMBER_TOOLTIP);
 this.setColour(colorPalette.getColor('programming'));
 this.appendDummyInput()
 .appendField(new Blockly.FieldTextInput('0',
 Blockly.FieldTextInput.numberValidator), 'NUM');
 this.setOutput(true, 'Number');
 }
 };
 
 Blockly.propc.number_range = function () {
 // Numeric value.
 var code = window.parseInt(this.getFieldValue('NUM'));
 // -4.abs() returns -4 in Dart due to strange order of operation choices.
 // -4 is actually an operator and a number.  Reflect this in the order.
 var order = code < 0 ?
 Blockly.propc.ORDER_UNARY_PREFIX : Blockly.propc.ORDER_ATOMIC;
 return [code, order];
 };
 */


// Number block that can mutate to show a range or if a value
// is out bounds or not available.  Gets values from the block its connected
// to by looking for a hidden field starting with "RANGEVALS".
// field "RANGEVALS" must start with S, R, or A, and hold a comma-separated
// set of values.  'S' and 'R' are for a range, with 'S' invoking
// a UI slider.  The first number is the minimum allowed value, the second is
// the maximum allowed value, and the third is a dummy start value.  If the
// range is within +/- 1000, the block will display it.  A warning is thrown
// if a value entered is out of range. The 'A' argument takes a
// comma-separated list of allowed values (think PINS), and throws a
// warning if an illegal value is entered.
//
// Will eventually move this functionality into the
// "spin_integer" block for the S3.
Blockly.Blocks.math_number = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_NUMBER_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput('MAIN')
                .appendField(new Blockly.FieldTextInput('0',
                        Blockly.FieldTextInput.numberValidator), 'NUM');
        this.appendDummyInput('HIDDENVALS')
                .appendField('', 'RVALS')
                .appendField('', 'CONN')
                .setVisible(false);
        this.setOutput(true, 'Number');
        this.connection_id_ = null;
        this.onchange();
    },
    onchange: function () {
        var rangeVals = ['N','-100','100','0'];
        var range = [-100, 100, 0];
        var data = this.getFieldValue('NUM');

        if (this.outputConnection) {
            if (this.outputConnection.targetBlock() !== null) {
                var key, inputvalue, _connectedField;
                var _blockFields = this.outputConnection.targetBlock().getInputWithBlock(this).fieldRow;
                for (key in _blockFields) {
                    if (_blockFields.hasOwnProperty(key) && !isNaN(parseInt(key, 10))) {
                        inputvalue = _blockFields[key].name || ' ';
                        if (inputvalue.substring(0, 9) === "RANGEVALS") {
                            _connectedField = inputvalue;
                            break;
                        }
                    }
                }
                var sourceBlock_ = this.outputConnection.targetBlock();
                if (sourceBlock_) {
                    var fieldListing = sourceBlock_.getFieldValue(_connectedField);
                    if (fieldListing) {
                        rangeVals = fieldListing.split(',');
                        if (rangeVals[0] === 'S' || rangeVals[0] === 'R' || rangeVals[0] === 'A') {
                            var idx;
                            for (idx = 1; idx <= rangeVals.length; idx++)
                                range[idx - 1] = Number(rangeVals[idx]);
                        }
                    }
                }
                if (this.outputConnection.targetBlock().getInputWithBlock(this) !== this.connection_id_) {
                    var theVal = this.getFieldValue('NUM');
                    this.removeInput('MAIN');
                    if (rangeVals[0] === 'S') {
                        var theNum = Number(theVal);
                        if (theNum > range[1])
                            theNum = range[1];
                        if (theNum < range[0])
                            theNum = range[0];
                        this.setWarningText(null);
                        this.appendDummyInput('MAIN')
                                .appendField(new Blockly.FieldRange(theNum.toString(10),
                                        range[0].toString(10), range[1].toString(10)), 'NUM');
                    } else {
                        this.appendDummyInput('MAIN')
                                .appendField(new Blockly.FieldTextInput(theVal,
                                        Blockly.FieldTextInput.numberValidator), 'NUM');
                    }
                }
                this.connection_id_ = this.outputConnection.targetBlock().getInputWithBlock(this);
            } else {
                if (this.connection_id_) {
                    var theVal = this.getFieldValue('NUM');
                    this.removeInput('MAIN');
                    this.appendDummyInput('MAIN')
                            .appendField(new Blockly.FieldTextInput(theVal,
                                    Blockly.FieldTextInput.numberValidator), 'NUM');
                }
                this.connection_id_ = null;
                rangeVals = ['N','-100','100','0'];
            }
        }
        range[2] = Number(this.getFieldValue('NUM'));
        if (rangeVals) {
            if (rangeVals[0] === 'R') {
                if (range[2] < range[0]) {
                    this.setWarningText('WARNING: Your value is too small!  It must be greater than or equal to ' + range[0].toString(10));
                } else if (range[2] > range[1]) {
                    this.setWarningText('WARNING: Your value is too large!  It must be less than or equal to ' + range[1].toString(10));
                } else {
                    this.setWarningText(null);
                }
            } else if (rangeVals[0] === 'A') {
                var warnMsg = 'none';
                var idx;
                for (idx = 0; idx < range.length; idx++)
                    if (range[2] === Number(rangeVals[idx]))
                        warnMsg = 'match';
                if (warnMsg === 'none') {
                    this.setWarningText('WARNING: The value you entered is not available or not allowed!');
                } else {
                    this.setWarningText(null);
                }
            } else if (rangeVals[0] === 'S') {
                this.setWarningText(null);
            } else {
                this.setWarningText(null);
            }
            if (rangeVals[0] === 'R' && (range[2] < range[0] || range[2] > range[1]) && Math.abs(range[0] - range[1]) <= 10000000) {
                if (this.getField('TITLE')) {
                    if (range[1] >= 2147483647) {
                        this.setFieldValue('(\u2265 ' + range[0].toString(10) + ')', 'TITLE');
                    } else if (range[0] <= -2147483647) {
                        this.setFieldValue('(\u2264' + range[1].toString(10) + ')', 'TITLE');
                    } else {
                        this.setFieldValue('(' + range[0].toString(10) + ' to ' + range[1].toString(10) + ')', 'TITLE');
                    }
                } else {
                    this.removeInput('MAIN');
                    this.appendDummyInput('MAIN')
                            .appendField(new Blockly.FieldTextInput(data,
                                    Blockly.FieldTextInput.numberValidator), 'NUM')
                            .appendField('', 'TITLE');
                }
            } else {
                if (this.getField('TITLE')) {
                    this.removeInput('MAIN');
                    if (rangeVals[0] === 'S') {
                        this.appendDummyInput('MAIN')
                                .appendField(new Blockly.FieldRange(data, range[0].toString(10), range[1].toString(10)), 'NUM');
                    } else {
                        this.appendDummyInput('MAIN')
                                .appendField(new Blockly.FieldTextInput(data,
                                        Blockly.FieldTextInput.numberValidator), 'NUM');
                    }
                }
            }
            this.setFieldValue(rangeVals.toString(), 'RVALS');
        } else {
            if (this.getField('TITLE')) {
                this.removeInput('MAIN');
                this.appendDummyInput('MAIN')
                        .appendField(new Blockly.FieldTextInput(data,
                                Blockly.FieldTextInput.numberValidator), 'NUM');
            }
            this.setFieldValue('', 'RVALS');
            this.setWarningText(null);
        }
    }
};

Blockly.propc.math_number = function () {
    // Numeric value.
    var code = window.parseInt(this.getFieldValue('NUM'));
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
            Blockly.propc.ORDER_UNARY_PREFIX : Blockly.propc.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Blocks.math_arithmetic = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_MATH_ARITHMETIC_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
                .setCheck('Number');
        this.appendValueInput('B')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ["+", ' + '],
                    ["-", ' - '],
                    ["×", ' * '],
                    ["÷", ' / '],
                    ["% (remainder after division)", ' % '],
                    ["^ (raise to the power of)", ' p ']]), 'OP');
        this.setInputsInline(true);
    }
};

Blockly.propc.math_arithmetic = function () {
    var operator = this.getFieldValue('OP');
    var order = Blockly.propc.ORDER_MULTIPLICATIVE;
    if (operator === ' + ' || operator === ' - ') {
        order = Blockly.propc.ORDER_ADDITIVE;
    }
    var argument0 = Blockly.propc.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', order) || '0';
    var code;
    if (operator === ' p ') {
        code = 'pow(' + argument0 + ', ' + argument1 + ')';
    } else {
        code = argument0 + operator + argument1;
    }
    return [code, order];
};

Blockly.Blocks.math_limit = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_LIMIT_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('A')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([["highest of", " #> "], ["lowest of", " <# "]]), 'OP');
        this.appendValueInput('B')
                .setCheck('Number')
                .appendField("and");

        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.math_limit = function () {
    var operator = this.getFieldValue('OP');
    var argument0 = Blockly.propc.valueToCode(this, 'A', Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var code;

    code = argument0 + operator + argument1;
    return [code, Blockly.propc.ORDER_ASSIGNMENT];
};

Blockly.Blocks.math_crement = {
    // Increment/decrement
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_CREMENT_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('VAR')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([["decrement", "--"], ["increment", "++"]]), "OP");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.propc.math_crement = function () {
    var operator = this.getFieldValue('OP');
    var variable = Blockly.propc.valueToCode(this, 'VAR', Blockly.propc.ORDER_UNARY_PREFIX) || '0';

    var code = variable + operator + ';\n';
    return code;
};

Blockly.Blocks.math_random = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_RANDOM_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("A")
                .setCheck("Number")
                .appendField("random number from");
        this.appendValueInput("B")
                .setCheck("Number")
                .appendField("to");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.math_random = function () {
    Blockly.propc.setups_["random_seed"] = "srand(INA + CNT);\n";
    var arg1 = Blockly.propc.valueToCode(this, 'A', Blockly.propc.ORDER_ATOMIC) || '0';
    var arg2 = Blockly.propc.valueToCode(this, 'B', Blockly.propc.ORDER_ATOMIC) || '99';

    var code = '(' + arg1 + ' + rand() % (' + arg2 + ' - ' + arg1 + ' + 1))';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.math_bitwise = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_BITWISE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('A');
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["& (bitwise AND)", " & "],
                    ["| (bitwise OR)", " | "],
                    ["^ (bitwise XOR)", " ^ "],
                    [">> (bitwise right shift)", " >> "],
                    ["<< (bitwise left shift)", " << "]]), "OP");
        this.appendValueInput('B');

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.math_bitwise = function () {
    var argument0 = Blockly.propc.valueToCode(this, 'A', Blockly.propc.ORDER_NONE);
    var argument1 = Blockly.propc.valueToCode(this, 'B', Blockly.propc.ORDER_NONE);
    var operator = this.getFieldValue('OP');

    var code = argument0 + operator + argument1;
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.base_delay = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_BASE_DELAY_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendValueInput("DELAY_TIME", 'Number')
                .appendField("pause (ms)")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.base_delay = function () {
    var delay_time = Blockly.propc.valueToCode(this, 'DELAY_TIME', Blockly.propc.ORDER_ATOMIC) || '1000';
    var code = 'pause(' + delay_time + ');\n';
    return code;
};

Blockly.Blocks.string_type_block = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_TYPE_BLOCK_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('Hello'), "TEXT");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'String');
    }
};

Blockly.propc.string_type_block = function () {
    var text = this.getFieldValue("TEXT");

    var code = '"' + text + '"';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.char_type_block = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
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
                    ["126 - ~", "126"],
                    ["10 - line feed", "10"],
                    ["11 - tab", "11"],
                    ["13 - ccarriage return", "13"],
                    ["127 - delete", "127"]]), "CHAR");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.char_type_block = function () {
    var code = this.getFieldValue("CHAR");

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.system_counter = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SYSTEM_COUNTER_TOOLTIP);
        if (profile.default.description === "Other Propeller Boards") {
            this.setColour(colorPalette.getColor('system'));
        } else {
            this.setColour(colorPalette.getColor('programming'));
        }
        this.appendDummyInput()
                .appendField("system")
                .appendField(new Blockly.FieldDropdown([
                    ['counter', 'CNT'],
                    ['clock frequency', 'CLKFREQ']
                ]), 'CMD');
        this.setOutput(true, "Number");
    }
};

Blockly.propc.system_counter = function () {
    var code = this.getFieldValue('CMD');
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.waitcnt = {
    //helpUrl: Blockly.MSG_SYSTEM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WAITCNT_TOOLTIP);
        this.setColour(colorPalette.getColor('system'));
        this.appendValueInput('TARGET')
                .appendField("Pause until");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.waitcnt = function () {
    var target = Blockly.propc.valueToCode(this, 'TARGET', Blockly.propc.ORDER_NONE);
    return 'waitcnt(' + target + ');\n';
};

Blockly.Blocks.register_set = {
    //helpUrl: Blockly.MSG_SYSTEM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_REGISTER_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('system'));
        this.appendValueInput('TARGET')
                .appendField("cog")
                .appendField(new Blockly.FieldDropdown([
                    ['pin input', 'INA'],
                    ['pin output', 'OUTA'],
                    ['pin direction', 'DIRA'],
                    ['counter A', 'CTRA'],
                    ['counter B', 'CTRB'],
                    ['frequency A', 'FRQA'],
                    ['frequency B', 'FRQB'],
                    ['phase accumulator A', 'PHSA'],
                    ['phase accumulator B', 'PHSB']
                ]), 'CMD')
                .appendField("register =");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.register_set = function () {
    var target = Blockly.propc.valueToCode(this, 'TARGET', Blockly.propc.ORDER_NONE);
    var register = this.getFieldValue('CMD');
    return register + ' = ' + target + ';\n';
};

Blockly.Blocks.register_get = {
    //helpUrl: Blockly.MSG_SYSTEM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_REGISTER_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('system'));
        this.appendDummyInput()
                .appendField("cog")
                .appendField(new Blockly.FieldDropdown([
                    ['pin input', 'INA'],
                    ['pin output', 'OUTA'],
                    ['pin direction', 'DIRA'],
                    ['counter A', 'CTRA'],
                    ['counter B', 'CTRB'],
                    ['frequency A', 'FRQA'],
                    ['frequency B', 'FRQB'],
                    ['phase accumulator A', 'PHSA'],
                    ['phase accumulator B', 'PHSB']
                ]), 'CMD')
                .appendField("register");
        this.setOutput(true, "Number");
    }
};

Blockly.propc.register_get = function () {
    var code = this.getFieldValue("CMD");
    return [code, Blockly.propc.ORDER_NONE];
};

var cCode;

Blockly.Blocks.custom_code = {
    //helpUrl: Blockly.MSG_SYSTEM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CUSTOM_CODE_TOOLTIP);
        this.setColour(colorPalette.getColor('system'));
        this.appendDummyInput()
                .appendField("user code")
                .appendField(new Blockly.FieldTextInput(''), 'CODE')
                .appendField("in")
                .appendField(new Blockly.FieldDropdown([
                    ["main", "main"],
                    ["setup", "setup"],
                    ["definitions", "definitions"],
                    ["includes", "includes"]
                ]), 'LOC');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.custom_code = function () {
    var loc = this.getFieldValue("LOC");
    var usr = this.getFieldValue("CODE");
    var code = '';

    if (loc === 'includes') {
        Blockly.definitions_["cCode" + cCode] = usr;
    } else if (loc === 'setup') {
        Blockly.propc.setups_["cCode" + cCode] = usr;
    } else if (loc === 'definitions') {
        Blockly.propc.global_vars_["cCode" + cCode] = usr;
    } else {
        code = usr;
    }
    cCode++;
    return code;
};

Blockly.Blocks.string_length = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
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

Blockly.propc.string_length = function () {
    var text = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE);
    return ['strlen(' + text + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.high_low_value = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_HIGH_LOW_VALUE_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["high", "1"], ["low", "0"]]), 'VALUE');

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.high_low_value = function () {
    var code = this.getFieldValue('VALUE');
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.comment = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_COMMENT_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput('MAIN')
                .appendField("add", 'TITLE')
                .appendField(new Blockly.FieldDropdown([['comment', 'COMMENT'], ['blank separator', 'SPACER'], ['***       ', 'SPACER']], function (action) {
                    this.sourceBlock_.updateShape_({"ACTION": action});
                }), 'ACTION')
                .appendField(new Blockly.FieldTextInput(''), "COMMENT_TEXT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('ACTION');
        container.setAttribute('action', action);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        this.updateShape_({"ACTION": action});
    },
    updateShape_: function (details) {
        var action = details['ACTION'];
        if (details['ACTION'] === undefined) {
            action = this.getFieldValue('ACTION');
        }
        var data = this.getFieldValue('COMMENT_TEXT');
        this.removeInput('MAIN');
        if (action === 'COMMENT') {
            this.setColour(colorPalette.getColor('programming'));
            this.appendDummyInput('MAIN')
                    .appendField("add", 'TITLE')
                    .appendField(new Blockly.FieldDropdown([['comment', 'COMMENT'], ['blank separator', 'SPACER']], function (action) {
                        this.sourceBlock_.updateShape_({"ACTION": action});
                    }), 'ACTION')
                    .appendField(new Blockly.FieldTextInput(''), "COMMENT_TEXT");
        } else if (action === 'SPACER' && this.getColour !== '#FFFFFF') {
            this.setColour('#FFFFFF');
            this.appendDummyInput('MAIN')
                    .appendField("   ", 'TITLE')
                    .appendField(new Blockly.FieldDropdown([['comment', 'COMMENT'], ['       \u25BD       ', 'SPACER']], function (action) {
                        this.sourceBlock_.updateShape_({"ACTION": action});
                    }), 'ACTION')
                    .appendField(new Blockly.FieldTextInput(''), "COMMENT_TEXT");
            this.setFieldValue('SPACER', 'ACTION');
            var cmt = this.getField('COMMENT_TEXT');
            cmt.setVisible(false);
        }
    }
};

Blockly.propc.comment = function () {
    var text = this.getFieldValue("COMMENT_TEXT");

    return '// ' + text + '\n';
};

/*
 * Casting Blocks are not currently used (Everything is a string or an int)
 
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
 */

Blockly.Blocks.color_picker = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
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

Blockly.propc.color_picker = function () {
    var color = this.getFieldValue('COLOR');
    color = "0x" + color.substr(1);

    return [color];
};

Blockly.Blocks.color_value_from = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_COLOR_VALUE_FROM_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField("color value from:");
        this.appendValueInput("RED_VALUE")
                .appendField('R,0,255,0', 'RANGEVALS0')
                .appendField("red");
        this.appendValueInput("GREEN_VALUE")
                .appendField('R,0,255,0', 'RANGEVALS1')
                .appendField("green");
        this.appendValueInput("BLUE_VALUE")
                .appendField('R,0,255,0', 'RANGEVALS2')
                .appendField("blue");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.getField('RANGEVALS2').setVisible(false);
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.color_value_from = function () {
    var red = Blockly.propc.valueToCode(this, 'RED_VALUE', Blockly.propc.ORDER_NONE) || '0';
    var green = Blockly.propc.valueToCode(this, 'GREEN_VALUE', Blockly.propc.ORDER_NONE) || '0';
    var blue = Blockly.propc.valueToCode(this, 'BLUE_VALUE', Blockly.propc.ORDER_NONE) || '0';

    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var output = 'getColorRRGGBB(' + red + ', ' + green + ', ' + blue + ')';
    return [output];
};

Blockly.Blocks.get_channel_from = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
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

Blockly.propc.get_channel_from = function () {
    var channel = this.getFieldValue("CHANNEL");
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    return ['get8bitColor(' + color + ', "' + channel + '")'];
};

Blockly.Blocks.compare_colors = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
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

Blockly.propc.compare_colors = function () {
    var color1 = Blockly.propc.valueToCode(this, 'COLOR1', Blockly.propc.ORDER_NONE) || '0';
    var color2 = Blockly.propc.valueToCode(this, 'COLOR2', Blockly.propc.ORDER_NONE) || '0';

    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var code = 'compareRRGGBB(' + color1 + ', ' + color2 + ')';
    return [code];
};

Blockly.Blocks.logic_compare = {
    // Comparison operator.
    category: Blockly.LANG_CATEGORY_LOGIC,
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_LOGIC_COMPARE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
                .setCheck("Number");
        this.appendValueInput('B')
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([['=', '=='], ['\u2260', '!='], ['<', '<'], ['\u2264', '<='], ['>', '>'], ['\u2265', '>=']]), 'OP');
        this.setInputsInline(true);
    }
};

Blockly.propc.logic_compare = function () {
    // Comparison operator.
    var operator = this.getFieldValue('OP');
    var order = (operator === '==' || operator === '!=') ?
            Blockly.propc.ORDER_EQUALITY : Blockly.propc.ORDER_RELATIONAL;
    var argument0 = Blockly.propc.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.Blocks.logic_operation = {
    // Logical operations: 'and', 'or'.
    category: Blockly.LANG_CATEGORY_LOGIC,
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_LOGIC_OPERATION_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
                .setCheck('Number');
        this.appendValueInput('B')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([['and', ' && '], ['or', ' || '], ['and not', ' && !'], ['or not', ' || !']]), 'OP');
        this.setInputsInline(true);
    }
};

Blockly.propc.logic_operation = function () {
    // Operations 'and', 'or'.
    var operator = this.getFieldValue('OP');
    var order = Blockly.propc.ORDER_LOGICAL_AND;
    if (operator === ' || ' || operator === ' || !') {
        order = Blockly.propc.ORDER_LOGICAL_OR;
    }
    var argument0 = Blockly.propc.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + argument1;
    return [code, order];
};

Blockly.Blocks.logic_negate = {
    // Negation.
    //category: Blockly.LANG_CATEGORY_LOGIC,
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_LOGIC_NEGATE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('BOOL')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([["not", '!'], ["negate", '-'], ["abs", 'abs(']]), 'OP');
    }
};

Blockly.propc.logic_negate = function () {
    // Negation.
    var order = Blockly.propc.ORDER_UNARY_PREFIX;
    var operator = this.getFieldValue('OP');
    var argument0 = Blockly.propc.valueToCode(this, 'BOOL', order) || '0';
    var code = operator + argument0;
    if (operator === 'abs(') {
        code += ')';
        order = Blockly.propc.ORDER_NONE;
    }
    return [code, order];
};

Blockly.Blocks.logic_boolean = {
    // Boolean data type: true and false.
    //category: Blockly.LANG_CATEGORY_LOGIC,
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_LOGIC_BOOLEAN_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.setOutput(true, 'Number');
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["true", 'TRUE'], ["false", 'FALSE']]), 'BOOL');
    }
};

Blockly.propc.logic_boolean = function () {
    // Boolean values true and false.
    var code = (this.getFieldValue('BOOL') === 'TRUE') ? '1' : '0';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.cog_new = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_COG_NEW_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField("new processor");
        this.appendStatementInput("METHOD")
                .appendField("function");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.cog_new = function () {
    var method = Blockly.propc.statementToCode(this, 'METHOD');
    method = method.replace("  ", "").replace("\n", "").replace("()", "").replace(";", "");

    var code = 'cog_run(' + method + ', 128);\n';
    return code;
};

Blockly.Blocks.combine_strings = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_COMBINE_STRINGS_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("STRA")
                .setCheck("String")
                .appendField("combine string");
        this.appendValueInput("STRB")
                .setCheck("String")
                .appendField("with string");
        this.appendDummyInput()
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.combine_strings = function () {
    var strA = Blockly.propc.valueToCode(this, 'STRA', Blockly.propc.ORDER_ATOMIC) || '';
    var strB = Blockly.propc.valueToCode(this, 'STRB', Blockly.propc.ORDER_ATOMIC) || '';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
    var code = '';

    Blockly.propc.vartype_[data] = 'char *';

    if (strA !== '' && strB !== '') {
        Blockly.propc.definitions_['str_Buffer'] = 'char *__scBfr;';

        code += 'sprint(__scBfr, "%s%s", ' + strA + ', ' + strB + ');\n';
        code += 'strcpy(' + data + ', __scBfr);\n';
    } else if (strA !== '') {
        code += 'strcpy(' + data + ', ' + strB + ');\n';
    } else if (strB !== '') {
        code += 'strcpy(' + data + ', ' + strA + ');\n';
    } else {
        code += '// Both of the strings to combine are blank!\n';
    }
    return code;
};

Blockly.Blocks.find_substring = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_FIND_SUBSTRING_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("SUBSTR")
                .setCheck("String")
                .appendField("find location of text");
        this.appendValueInput("STR")
                .setCheck("String")
                .appendField("in string");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.find_substring = function () {
    var subs = Blockly.propc.valueToCode(this, 'SUBSTR', Blockly.propc.ORDER_ATOMIC) || '';
    var strs = Blockly.propc.valueToCode(this, 'STR', Blockly.propc.ORDER_ATOMIC) || '';

    Blockly.propc.definitions_['find_sub'] = 'int find_sub(char *__strS, char *__subS) { char* __pos = strstr(__strS, __subS); return (__pos - __strS + 1); }\n';

    var code = '';

    if (subs !== '' && strs !== '') {
        code += 'find_sub(' + strs + ', ' + subs + ')';
    } else {
        code += '0';
    }

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.get_char_at_position = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_GET_CHAR_AT_POSITION_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("POSITION")
                .setCheck("Number")
                .appendField("get character at position");
        this.appendDummyInput()
                .appendField("of")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.get_char_at_position = function () {
    var pos = Blockly.propc.valueToCode(this, 'POSITION', Blockly.propc.ORDER_ATOMIC) || '1';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);

    var code = '0';

    if (Blockly.propc.vartype_[data] === 'char *')
    {
        code = data + '[(' + pos + '>strlen(' + data + ')?strlen(' + data + '):' + pos + ')-1]';
    }

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.set_char_at_position = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SET_CHAR_AT_POSITION_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("POSITION")
                .setCheck("Number")
                .appendField("set character at position");
        this.appendDummyInput()
                .appendField("of string")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.appendValueInput("CHAR")
                .setCheck("Number")
                .appendField("to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.set_char_at_position = function () {
    var pos = Blockly.propc.valueToCode(this, 'POSITION', Blockly.propc.ORDER_ATOMIC) || '1';
    var chr = Blockly.propc.valueToCode(this, 'CHAR', Blockly.propc.ORDER_ATOMIC) || '32';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);

    return data + '[(' + pos + '>strlen(' + data + ')?strlen(' + data + '):' + pos + ')-1] = (' + chr + ' & 0xFF)\n;';
};

Blockly.Blocks.get_substring = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_GET_SUBSTRING_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
                .appendField("get part of string")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'FROM_STR');
        this.appendValueInput("START")
                .setCheck("Number")
                .appendField("from position");
        this.appendValueInput("END")
                .setCheck("Number")
                .appendField("to position");
        this.appendDummyInput()
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'TO_STR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('FROM_STR'), this.getFieldValue('TO_STR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('FROM_STR')))
            this.setTitleValue(newName, 'FROM_STR');
        if (Blockly.Names.equals(oldName, this.getFieldValue('TO_STR')))
            this.setTitleValue(newName, 'TO_STR');
    }
};

Blockly.propc.get_substring = function () {
    var sst = Blockly.propc.valueToCode(this, 'START', Blockly.propc.ORDER_ATOMIC) || '1';
    var snd = Blockly.propc.valueToCode(this, 'END', Blockly.propc.ORDER_ATOMIC) || '2';
    var frStr = Blockly.propc.variableDB_.getName(this.getFieldValue('FROM_STR'), Blockly.Variables.NAME_TYPE);
    var toStr = Blockly.propc.variableDB_.getName(this.getFieldValue('TO_STR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.vartype_[toStr] = 'char *';
    Blockly.propc.definitions_['str_Buffer'] = 'char *__scBfr;';

    var code = '';

    if (Blockly.propc.vartype_[frStr] === 'char *')
    {
        Blockly.propc.definitions_['__ssIdx'] = 'int __ssIdx, __stIdx;';

        code += '__stIdx = 0;\nfor(__ssIdx = (' + sst + '-1); __ssIdx <= (' + snd + ' <= strlen(' + frStr + ')?' + snd + ':strlen(' + frStr + '))-1; __ssIdx++) {\n__scBfr[__stIdx] = ' + frStr + '[__ssIdx]; __stIdx++; }\n';
        code += '__scBfr[__stIdx] = 0;\n';
        code += 'strcpy(' + toStr + ', __scBfr);\n';
    }

    return code;
};

Blockly.Blocks.string_compare = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_COMPARE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("STRA")
                .setCheck("String")
                .appendField("string");
        this.appendValueInput("STRB")
                .setCheck("String")
                .appendField(new Blockly.FieldDropdown([["is the same as", "=="], ["is not the same as", "!="], ["is alphabetically before", "<"], ["is alphabetically after", ">"]]), "COMP");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.string_compare = function () {
    var strA = Blockly.propc.valueToCode(this, 'STRA', Blockly.propc.ORDER_ATOMIC) || '';
    var strB = Blockly.propc.valueToCode(this, 'STRB', Blockly.propc.ORDER_ATOMIC) || '';
    var comp = this.getFieldValue('COMP');

    Blockly.propc.definitions_['str_comp'] = 'int str_comp(char *__strA, char *__strB) { return strcmp(__strA, __strB); }';

    var code = '';

    if (strA !== '' && strB !== '') {
        code += 'str_comp(' + strA + ', ' + strB + ') ' + comp + ' 0';
    } else {
        code += '0';
    }

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.string_to_number = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_TO_NUMBER_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("STRING")
                .setCheck("String")
                .appendField("string");
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["in decimal", "%d"], ["in hexadecimal", "%x"], ["in binary", "%b"]]), "TYPE")
                .appendField("to integer store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.propc.string_to_number = function () {
    var str = Blockly.propc.valueToCode(this, 'STRING', Blockly.propc.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var store = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.definitions_['s2i_Buffer'] = 'char __s2iBfr[64];';

    var code = '';
    code += 'strcpy(__s2iBfr, ' + str + ');\n';
    code += 'sscan(__s2iBfr, "' + type + '", &' + store + ');\n';

    return code;
};

Blockly.Blocks.number_to_string = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_NUMBER_TO_STRING_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("NUMBER")
                .setCheck("Number")
                .appendField("integer");
        this.appendDummyInput()
                .appendField("to string in")
                .appendField(new Blockly.FieldDropdown([["decimal", "%d"], ["hexadecimal", "%x"], ["binary", "%b"]]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.propc.number_to_string = function () {
    var str = Blockly.propc.valueToCode(this, 'NUMBER', Blockly.propc.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var store = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.vartype_[store] = 'char *';

    return 'sprint(' + store + ', "' + type + '", ' + str + ');\n';
};

Blockly.Blocks.number_binary = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_NUMBER_BINARY_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput("0101"), "NUMBER")
                .appendField("binary");
        this.setOutput(true, "Number");
    }
};

Blockly.propc.number_binary = function () {
    var code = '0b' + this.getFieldValue("NUMBER");

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.number_hex = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_NUMBER_HEX_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput("7F"), "NUMBER")
                .appendField("hexadecimal");
        this.setOutput(true, "Number");
    }
};

Blockly.propc.number_hex = function () {
    var code = '0x' + this.getFieldValue("NUMBER");

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.constrain_value = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSTRAIN_VALUE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("NUMBER")
                .setCheck("Number")
                .appendField("constrain");
        this.appendDummyInput()
                .appendField("from")
                .appendField(new Blockly.FieldTextInput("0"), "MIN")
                .appendField("(min) to")
                .appendField(new Blockly.FieldTextInput("100"), "MAX")
                .appendField("(max)");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.constrain_value = function () {
    var num = Blockly.propc.valueToCode(this, 'NUMBER', Blockly.propc.ORDER_ATOMIC) || '0';
    var min = window.parseInt(this.getFieldValue('MIN'));
    var max = window.parseInt(this.getFieldValue('MAX'));

    var setup_code = '// Constrain Function\nint constrain(int __cVal, int __cMin, int __cMax) {';
    setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
    setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
    Blockly.propc.global_vars_["constrain_function"] = setup_code;

    var code = 'constrain(' + num + ', ' + min + ', ' + max + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.math_advanced = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_ADVANCED_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("ARG1")
                .setCheck("Number");
        this.appendValueInput("ARG2")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                    ["× the cosine of", "cos"],
                    ["× the sine of", "sin"],
                    ["× the tangent of", "tan"],
                    ["× the square root of", "sqrt"],
                    ["× e raised to the power of", "exp"],
                    ["× the logarithm (base 10) of", "log10"],
                    ["× the natural logarithm of", "log"]]), "OP");
        this.appendDummyInput("")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'STORE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('STORE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('STORE'))) {
            this.setTitleValue(newName, 'STORE');
        }
    }
};

Blockly.propc.math_advanced = function () {
    var store = Blockly.propc.variableDB_.getName(this.getFieldValue('STORE'), Blockly.Variables.NAME_TYPE);
    var arg1 = Blockly.propc.valueToCode(this, 'ARG1', Blockly.propc.ORDER_ATOMIC) || '1';
    var arg2 = Blockly.propc.valueToCode(this, 'ARG2', Blockly.propc.ORDER_ATOMIC) || '1';
    var operator = this.getFieldValue('OP');
    var opTrig = '';
    if (operator === 'sin' || operator === 'cos' || operator === 'tan')
        opTrig = ' * PI/180.0';

    var code = store + ' = (int) (((float)' + arg1 + ') * ' + operator + '(((float) ' + arg2 + ')' + opTrig + ') + 0.5);\n';

    return code;
};

Blockly.Blocks.math_inv_trig = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_INV_TRIG_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("ARG1")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([
                    ["arcsine of (", "asin"],
                    ["arccosine of (", "acos"],
                    ["arctangent of (", "atan2"]]), "OP");
        this.appendValueInput("ARG2")
                .setCheck("Number")
                .appendField("÷");
        this.appendDummyInput()
                .appendField(") store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'STORE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('STORE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('STORE'))) {
            this.setTitleValue(newName, 'STORE');
        }
    }
};

Blockly.propc.math_inv_trig = function () {
    var store = Blockly.propc.variableDB_.getName(this.getFieldValue('STORE'), Blockly.Variables.NAME_TYPE);
    var arg1 = Blockly.propc.valueToCode(this, 'ARG1', Blockly.propc.ORDER_ATOMIC) || '1';
    var arg2 = Blockly.propc.valueToCode(this, 'ARG2', Blockly.propc.ORDER_ATOMIC) || '1';
    var operator = this.getFieldValue('OP');
    var opTrig = '/';
    if (operator === 'atan2')
        opTrig = ',';

    var code = store + ' = (int) (180.0 * ' + operator + '(((float) ' + arg1 + ')' + opTrig + '((float) ' + arg2 + ')) / PI + 0.5);\n';

    return code;
};