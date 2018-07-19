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

Blockly.Blocks.math_number = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
            this.setColour(colorPalette.getColor('math'));
        } else {
            this.setHelpUrl(Blockly.MSG_VALUES_HELPURL);
            this.setColour(colorPalette.getColor('programming'));
        }
        this.setTooltip(Blockly.MSG_MATH_NUMBER_TOOLTIP);
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
        var rangeVals = ['N', '-100', '100', '0'];
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
                rangeVals = ['N', '-100', '100', '0'];
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
                    } else if (Math.abs(range[0]) === Math.abs(range[1])) {
                        this.setFieldValue('(+/- ' + Math.abs(range[0]).toString(10) + ')', 'TITLE');
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
                    ["\u2212", ' - '],
                    ["\u00D7", ' * '],
                    ["\u00F7", ' / '],
                    ["% (remainder after division)", ' % '],
                    ["^ (raise to the power of)", ' p ']]), 'OP');
        this.setInputsInline(true);
        this.myChildren_ = 'B';
        this.myConnection_ = null;
        this.setMutator(new Blockly.Mutator(['math_arithmatic_term']));
    },
    mutationToDom: function () {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        container.setAttribute('terms', this.myChildren_);
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        this.myChildren_ = container.getAttribute('terms');
        if (this.myChildren_.charCodeAt(0) > 'B'.charCodeAt(0)) {
            for (var i = 'C'.charCodeAt(0); i <= this.myChildren_.charCodeAt(0); i++) {
                this.appendValueInput(String.fromCharCode(i))
                        .setCheck('Number')
                        .appendField(new Blockly.FieldDropdown([
                            ["+", ' + '],
                            ["\u2212", ' - '],
                            ["\u00D7", ' * '],
                            ["\u00F7", ' / '],
                            ["% (remainder after division)", ' % '],
                            ["^ (raise to the power of)", ' p ']]), 'OP' + String.fromCharCode(i));
            }
        }
    },
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'math_arithmatic_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        if (this.myChildren_.charCodeAt(0) > 'B'.charCodeAt(0)) {
            for (var i = 'C'.charCodeAt(0); i <= this.myChildren_.charCodeAt(0); i++) {
                var optionBlock = workspace.newBlock('math_arithmatic_term');
                optionBlock.initSvg();
                connection.connect(optionBlock.previousConnection);
                connection = optionBlock.nextConnection;
            }
        }
        return containerBlock;

    },
    compose: function (containerBlock) {
        // Delete everything.
        var i = 'C'.charCodeAt(0);
        while (this.getInput(String.fromCharCode(i))) {
            this.removeInput(String.fromCharCode(i));
            i++;
        }

        i = 'C'.charCodeAt(0);
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            // Reconnect any child blocks.
            var termInput = this.appendValueInput(String.fromCharCode(i))
                    .setCheck('Number')
                    .appendField(new Blockly.FieldDropdown([
                        ["+", ' + '],
                        ["\u2212", ' - '],
                        ["\u00D7", ' * '],
                        ["\u00F7", ' / '],
                        ["% (remainder after division)", ' % '],
                        ["^ (raise to the power of)", ' p ']]), 'OP' + String.fromCharCode(i));
            if (clauseBlock.valueConnection_) {
                termInput.connection.connect(clauseBlock.valueConnection_);
            }
            i++;
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
        }
        this.myChildren_ = String.fromCharCode(i - 1);
    },
    saveConnections: function (containerBlock) {
        // Store a pointer to any connected child blocks.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 'C'.charCodeAt(0);
        while (clauseBlock) {
            var termInput = this.getInput(String.fromCharCode(x));
            clauseBlock.valueConnection_ =
                    termInput && termInput.connection.targetConnection;
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            x++;
        }
    }
};

Blockly.Blocks.math_arithmatic_container = {
    init: function () {
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
                .appendField('Math');
        this.appendDummyInput()
                .appendField('  term');
        this.appendDummyInput()
                .appendField('  term');
        this.setInputsInline(false);
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks.math_arithmatic_term = {
    init: function () {
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
                .appendField('term');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

/*
 // Created as an initial attempt at an expanding arithmatic block.  Keep because there is some
 // really spiffy code in here:

 Blockly.Blocks.math_arithmetic_multiple = {
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
 this.myChildren_ = 'B';
 this.myConnection_ = null;
 for (var h = 0; h < 26; h++) {
 this.appendValueInput('H' + h.toString(10));
 this.getInput('H' + h.toString(10)).setVisible(false);
 }
 },
 onchange: function () {
 var nextInput = null;
 for (var inCount = 'A'.charCodeAt(0); inCount <= 'Z'.charCodeAt(0); inCount++) {
 if (!this.getInput(String.fromCharCode(inCount))) {
 nextInput = inCount;
 this.myChildren_ = String.fromCharCode(nextInput - 1);
 break;
 }
 }
 if (this.getInput(this.myChildren_).connection.targetBlock() !== null
 && !this.getInput(String.fromCharCode(nextInput))
 && this.outputConnection.targetBlock() === null) {
 //alert(String.fromCharCode(inCount));
 //this.myChildren_ === String.fromCharCode(nextInput);
 this.appendValueInput(String.fromCharCode(nextInput))
 .setCheck('Number')
 .appendField(new Blockly.FieldDropdown([
 ["+", ' + '],
 ["-", ' - '],
 ["×", ' * '],
 ["÷", ' / '],
 ["% (remainder after division)", ' % '],
 ["^ (raise to the power of)", ' p ']]), 'OP' + String.fromCharCode(nextInput));
 }

 if (this.outputConnection.targetBlock() !== null && this.myConnection_ === null) {
 this.myConnection_ = this.outputConnection.targetBlock();

 // Collect all of the blocks and operators
 var curOp = 'B'.charCodeAt(0);
 var firstOp = 0;
 var curBlock = 'A'.charCodeAt(0);
 for (var inCount = 'A'.charCodeAt(0); inCount <= 'Z'.charCodeAt(0); inCount++) {
 if (this.getInput(String.fromCharCode(inCount))) {
 var currentBlock = this.getInput(String.fromCharCode(inCount)).connection.targetBlock();
 if (currentBlock !== null) {
 currentBlock.outputConnection.disconnect();
 this.getInput(String.fromCharCode(curBlock)).connection.connect(currentBlock.outputConnection);
 curBlock++;
 if (inCount > 'A'.charCodeAt(0) && firstOp !== 0) {
 var currentOp;
 if (inCount > 'B'.charCodeAt(0))
 currentOp = this.getFieldValue('OP' + String.fromCharCode(inCount));
 else
 currentOp = this.getFieldValue('OP');

 if (curOp > 'B'.charCodeAt(0))
 this.setFieldValue(currentOp, 'OP' + String.fromCharCode(curOp));
 else
 this.setFieldValue(currentOp, 'OP');
 curOp++;
 }
 firstOp++;
 }
 }
 }
 for (var inCount = 'C'.charCodeAt(0); inCount <= 'Z'.charCodeAt(0); inCount++)
 if (this.getInput(String.fromCharCode(inCount)))
 if (this.getInput(String.fromCharCode(inCount)).connection.targetBlock() === null)
 this.removeInput(String.fromCharCode(inCount));
 } else if (this.outputConnection.targetBlock() === null)
 this.myConnection_ = null;

 // check for blank terms before the end of the block.
 var hasBlanks = 0;
 for (var inCount = 'A'.charCodeAt(0); inCount <= 'Z'.charCodeAt(0); inCount++) {
 if (this.getInput(String.fromCharCode(inCount))) {
 var currentBlock = this.getInput(String.fromCharCode(inCount)).connection.targetBlock();
 if (currentBlock !== null) {
 if (hasBlanks > 0)
 hasBlanks++;
 } else {
 if (hasBlanks === 0)
 hasBlanks++;
 }
 }
 }

 if (hasBlanks > 1)
 this.setWarningText('WARNING!  You have blank terms before the end of your statement.'
 + '\n\nThis may lead to unpredictable results.');
 else
 this.setWarningText(null);

 for (var inCount = 'Y'.charCodeAt(0); inCount >= 'C'.charCodeAt(0); inCount--) {
 if (this.getInput(String.fromCharCode(inCount)) && this.getInput(String.fromCharCode(inCount + 1))) {
 var currentBlock = this.getInput(String.fromCharCode(inCount)).connection.targetBlock();
 var previousBlock = this.getInput(String.fromCharCode(inCount + 1)).connection.targetBlock();
 if (currentBlock === null && previousBlock === null) {
 this.getInput(String.fromCharCode(inCount + 1)).connection.unhighlight();
 this.removeInput(String.fromCharCode(inCount + 1));
 } else if (currentBlock !== null)
 break;
 }
 }
 }
 };
 */

Blockly.propc.math_arithmetic = function () {
    var operator = [this.getFieldValue('OP')];
    var argument = [Blockly.propc.valueToCode(this, 'A', Blockly.propc.ORDER_MULTIPLICATIVE) || '0'];
    argument.push(Blockly.propc.valueToCode(this, 'B', Blockly.propc.ORDER_MULTIPLICATIVE) || '0');
    var code = '';

    for (var k = 'C'.charCodeAt(0); k <= 'Z'.charCodeAt(0); k++) {
        if (Blockly.propc.valueToCode(this, String.fromCharCode(k), Blockly.propc.ORDER_MULTIPLICATIVE)) {
            operator.push(this.getFieldValue('OP' + String.fromCharCode(k)));
            argument.push(Blockly.propc.valueToCode(this, String.fromCharCode(k), Blockly.propc.ORDER_MULTIPLICATIVE));
        } else {
            operator.push('');
            argument.push('');
        }
    }
    operator.push('');

    for (var k = 0; k < 26; k++) {
        if (operator[k] === ' p ') {
            code += 'pow(' + argument[k] + ', ';
        } else {
            if (k > 0) {
                var pEnds = '';
                var theOp = k - 1;
                while (theOp > -1) {
                    if (operator[theOp] === ' p ') {
                        pEnds += ')';
                    } else {
                        break;
                    }
                    theOp--;
                }
                code += argument[k] + pEnds + operator[k];
            } else {
                code += argument[k];
                code += operator[k];
            }
        }
    }
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.math_limit = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_LIMIT_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('A')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([["highest of", " > "], ["lowest of", " < "]]), 'OP');
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

    code = '(' + argument0 + operator + argument1 + ' ? ' + argument0 + ' : ' + argument1 + ')';
    return [code, Blockly.propc.ORDER_ASSIGNMENT];
};

Blockly.Blocks.math_crement = {
    // Increment/decrement
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_MATH_CREMENT_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('VAR')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([["decrement", "--"], ["increment", "++"]]), "OP");
        this.setPreviousStatement(true, "Block");
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
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
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
    var arg1 = Blockly.propc.valueToCode(this, 'A', Blockly.propc.ORDER_ATOMIC) || '1';
    var arg2 = Blockly.propc.valueToCode(this, 'B', Blockly.propc.ORDER_ATOMIC) || '100';

    return ['random(' + arg1 + ', ' + arg2 + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.math_bitwise = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MATH_BITWISE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('A')
                .setCheck("Number");
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["& (bitwise AND)", " & "],
                    ["| (bitwise OR)", " | "],
                    ["^ (bitwise XOR)", " ^ "],
                    [">> (bitwise right shift)", " >> "],
                    ["<< (bitwise left shift)", " << "]]), "OP");
        this.appendValueInput('B')
                .setCheck("Number");
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
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.base_delay = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_BASE_DELAY_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendValueInput("DELAY_TIME", 'Number')
                .appendField("pause (ms)")
                //    .appendField(new Blockly.FieldDropdown([
                //        ["ms", "pause"],
                //        ["\u00B5s", "usleep"]
                //    ]), "UNIT")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }//,
    // For testing purposes - use the pause block to capture onchange events and report them to the console.
    //onchange: function (event) {
    //    console.log(event);
    //}
};

Blockly.propc.base_delay = function () {
    var delay_time = Blockly.propc.valueToCode(this, 'DELAY_TIME', Blockly.propc.ORDER_ATOMIC) || '1000';
    var unit = "pause"; //this.getFieldValue("UNIT") || "pause";
    var code = unit + '(' + delay_time + ');\n';
    return code;
};

Blockly.Blocks.string_type_block = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_TYPE_BLOCK_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField("\u201C")
                .appendField(new Blockly.FieldTextInput('Hello'), "TEXT")
                .appendField("\u201D");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'String');
    }
};

Blockly.propc.string_type_block = function () {
    var text = this.getFieldValue("TEXT").replace(/"/g, '\\"');

    var code = '"' + text + '"';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.char_type_block = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CHAR_TYPE_BLOCK_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        var charMenu = [["32 - space", "32"]];
        for (var k = 33; k < 127; k++) {
            charMenu.push([k.toString(10) + ' - ' + String.fromCharCode(k), k.toString(10)]);
        }
        charMenu.concat(["7 - bell", "7"],
                ["10 - line feed", "10"],
                ["11 - tab", "11"],
                ["13 - carriage return", "13"],
                ["127 - delete", "127"]);
        this.appendDummyInput()
                .appendField("character")
                .appendField(new Blockly.FieldDropdown(charMenu), "CHAR");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.char_type_block = function () {
    var code = this.getFieldValue("CHAR");

    return [code, Blockly.propc.ORDER_NONE];
};


Blockly.Blocks.music_note = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MUSIC_NOTE_BLOCK_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField("music note")
                .appendField(new Blockly.FieldDropdown([
                    ['C', '2093.00'],
                    ['C♯/D♭', '2217.46'],
                    ['D', '2349.32'],
                    ['D♯/E♭', '2489.02'],
                    ['E', '2637.02'],
                    ['F', '2793.83'],
                    ['F♯/G♭', '2959.96'],
                    ['G', '3135.96'],
                    ['G♯/A♭', '3322.44'],
                    ['A', '3520.00'],
                    ['A♯/B♭', '3729.31'],
                    ['B', '3951.07']]), "NOTE")
                .appendField("octave")
                .appendField(new Blockly.FieldDropdown([
                    ['1st', '0.015625'],
                    ['2nd', '0.03125'],
                    ['3rd', '0.0625'],
                    ['4th', '0.125'],
                    ['5th', '0.25'],
                    ['6th', '0.5'],
                    ['7th', '1'],
                    ['8th', '2']]), "OCTAVE");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.music_note = function () {
    var note = (Math.round(
            parseFloat(this.getFieldValue("NOTE")) *
            parseFloat(this.getFieldValue("OCTAVE"))
            )).toString(10);
    return [note, Blockly.propc.ORDER_NONE];
};


Blockly.Blocks.system_counter = {
    init: function () {
        this.setTooltip(Blockly.MSG_SYSTEM_COUNTER_TOOLTIP);
        if (profile.default.description === "Other Propeller Boards") {
            this.setHelpUrl(Blockly.MSG_SYSTEM_HELPURL);
            this.setColour(colorPalette.getColor('system'));
        } else {
            this.setColour(colorPalette.getColor('programming'));
            this.setHelpUrl(Blockly.MSG_VALUES_HELPURL);
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
    helpUrl: Blockly.MSG_SYSTEM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WAITCNT_TOOLTIP);
        this.setColour(colorPalette.getColor('system'));
        this.appendValueInput('TARGET')
                .setCheck("Number")
                .appendField("Wait until");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.waitcnt = function () {
    var target = Blockly.propc.valueToCode(this, 'TARGET', Blockly.propc.ORDER_NONE);
    return 'waitcnt(' + target + ');\n';
};

Blockly.Blocks.register_set = {
    helpUrl: Blockly.MSG_SYSTEM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_REGISTER_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('system'));
        this.appendValueInput('TARGET')
                .setCheck("Number")
                .appendField("cog")
                .appendField(new Blockly.FieldDropdown([
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
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.register_set = function () {
    var target = Blockly.propc.valueToCode(this, 'TARGET', Blockly.propc.ORDER_NONE);
    var register = this.getFieldValue('CMD');
    return register + ' = ' + target + ';\n';
};

Blockly.Blocks.register_get = {
    helpUrl: Blockly.MSG_SYSTEM_HELPURL,
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
    helpUrl: Blockly.MSG_SYSTEM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CUSTOM_CODE_TOOLTIP);
        this.setColour('#FF8800');
        this.setWarningText('WARNING: This block has been deprecated.\nReplace with a "User defined code" block from the Control menu.');
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
        this.setPreviousStatement(true, "Block");
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

Blockly.Blocks.string_var_length = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_VAR_LENGTH_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.appendDummyInput()
                .appendField('String variable set size of');
        this.appendDummyInput('VARZ')
                .appendField('variable')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR_NAMEZ')
                .appendField('to')
                .appendField(new Blockly.FieldTextInput("64", Blockly.FieldTextInput.numberValidator), "VAR_LENZ");
        this.myChildren_ = 1;
        this.myConnection_ = null;
        this.setMutator(new Blockly.Mutator(['string_var_length_var']));
    },
    mutationToDom: function () {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        container.setAttribute('vars', this.myChildren_.toString(10));
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        this.myChildren_ = parseInt(container.getAttribute('vars'));
        if (this.getInput('VARZ')) {
            this.removeInput('VARZ');
        }
        if (this.myChildren_ > 0) {
            for (var i = 1; i <= this.myChildren_; i++) {
                this.appendDummyInput('VAR' + i.toString(10))
                        .appendField('variable')
                        .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR_NAME' + i.toString(10))
                        .appendField('to')
                        .appendField(new Blockly.FieldTextInput("64", Blockly.FieldTextInput.numberValidator), "VAR_LEN" + i.toString(10))
                        .appendField('bytes');
            }
        }
    },
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'string_var_length_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        if (this.myChildren_ > 0) {
            for (var i = 1; i <= this.myChildren_; i++) {
                var optionBlock = workspace.newBlock('string_var_length_var');
                optionBlock.initSvg();
                connection.connect(optionBlock.previousConnection);
                connection = optionBlock.nextConnection;
            }
        }
        return containerBlock;

    },
    compose: function (containerBlock) {
        // Delete everything.
        var i = 1;
        if (this.getInput('VARZ')) {
            this.removeInput('VARZ');
        }
        while (this.getInput('VAR' + i.toString(10))) {
            this.removeInput('VAR' + i.toString(10));
            i++;
        }

        i = 1;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            // Reconnect any child blocks.
            this.appendDummyInput('VAR' + i.toString(10))
                    .appendField('variable')
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR_NAME' + i.toString(10))
                    .appendField('to')
                    .appendField(new Blockly.FieldTextInput("64", Blockly.FieldTextInput.numberValidator), "VAR_LEN" + i.toString(10));
            i++;
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
        }
        this.myChildren_ = i - 1;
    },
    saveConnections: function (containerBlock) {
        // Store a pointer to any connected child blocks.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 1;
        while (clauseBlock) {
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            i++;
        }
    },
    getVars: function () {
        var theVars = [];
        for (var i = 1; i <= this.myChildren_; i++) {
            theVars.push(this.getFieldValue('VAR_NAME' + i.toString(10)));
        }
        return theVars;
    },
    renameVar: function (oldName, newName) {
        for (var i = 1; i <= this.myChildren_; i++) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VAR_NAME' + i.toString(10)))) {
                this.setFieldValue(newName, 'VAR_NAME' + i.toString(10));
            }
        }
    }
};

Blockly.Blocks.string_var_length_container = {
    init: function () {
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
                .appendField('String variables');
        this.setInputsInline(false);
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks.string_var_length_var = {
    init: function () {
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
                .appendField('variable');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.propc.string_var_length = function () {
    var i = 1;
    Blockly.propc.string_var_lengths = [];
    while (this.getInput('VAR' + i.toString(10))) {
        Blockly.propc.string_var_lengths.push([this.getFieldValue('VAR_NAME' + i.toString(10)),
            this.getFieldValue('VAR_LEN' + i.toString(10))]);
        i++;
    }

    return '';
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
        this.setPreviousStatement(true, "Block");
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
                .appendField("red")
                .setCheck("Number");
        this.appendValueInput("GREEN_VALUE")
                .appendField('R,0,255,0', 'RANGEVALS1')
                .appendField("green")
                .setCheck("Number");
        this.appendValueInput("BLUE_VALUE")
                .appendField('R,0,255,0', 'RANGEVALS2')
                .appendField("blue")
                .setCheck("Number");
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
                .appendField("value from")
                .setCheck("Number");
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
                .appendField("color 1:")
                .setCheck("Number");
        this.appendValueInput('COLOR2')
                .appendField("color 2:")
                .setCheck("Number");
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

Blockly.Blocks.parens = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_PARENS_TOOLTIP);
        this.appendValueInput('BOOL')
                .appendField('(', 'OP')
                .setCheck('Number');
        this.appendDummyInput('')
                .appendField(')');
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
};

Blockly.propc.parens = function () {
    var argument0 = Blockly.propc.valueToCode(this, 'BOOL', Blockly.propc.ORDER_ATOMIC) || '0';
    var code = '(' + argument0 + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
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
        this.appendValueInput('BOOL')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([
                    ["not", '!'],
                    ["negate", '-'],
                    ["abs", 'abs('],
                ]), 'OP');
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.setInputsInline(false);
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
                .setCheck("Function")
                .appendField("function");

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.cog_new = function () {
    var method = Blockly.propc.statementToCode(this, 'METHOD');
    var method_name = method.replace("  ", "").replace("\n", "").replace("()", "").replace(";", "");
    var code = '';

    if (method.length > 2) {
        Blockly.propc.cog_methods_[method_name] = method;

        code = 'cog_run(' + method_name + ', 128);\n';
    }
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
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
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
        //Blockly.propc.definitions_['str_Buffer'] = 'char *__scBfr;';

        code += 'sprint(' + data + ', "%s%s", ' + strA + ', ' + strB + ');\n';
        //code += 'sprint(__scBfr, "%s%s", ' + strA + ', ' + strB + ');\n';
        //code += 'strcpy(' + data + ', __scBfr);\n';
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
        if (this.type === 'find_substring') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: This block has been deprecated.\nReplace with a new block from the Operators > Numbers menu.\nOld blocks were (1) referenced, new blocks are (0) referenced.');
        } else {
            this.setColour(colorPalette.getColor('math'));
        }
        this.appendValueInput("SUBSTR")
                .setCheck("String")
                .appendField("find location of text");
        this.appendValueInput("STR")
                .setCheck("String")
                .appendField("in string");
        if (this.type !== 'find_substring') {
            this.appendValueInput("LOC")
                    .appendField("starting at position");
        }
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.Blocks.find_substring_zero = Blockly.Blocks.find_substring;

Blockly.propc.find_substring = function () {
    var subs = Blockly.propc.valueToCode(this, 'SUBSTR', Blockly.propc.ORDER_ATOMIC) || '';
    var strs = Blockly.propc.valueToCode(this, 'STR', Blockly.propc.ORDER_ATOMIC) || '';
    var stlc = Blockly.propc.valueToCode(this, 'LOC', Blockly.propc.ORDER_ATOMIC) || '0';

    if (this.type === 'find_substring') {
        if (!this.disabled) {
            Blockly.propc.methods_['find_sub'] = 'int find_sub(char *__strS, char *__subS) { char* __pos = strstr(__strS, __subS); return (__pos - __strS + 1); }\n';
            Blockly.propc.method_declarations_["find_sub"] = 'int find_sub(char *, char *);\n';
        }
        var code = '// WARNING! THIS BLOCK IS DEPRECATED! \n\n';

        if (subs !== '' && strs !== '') {
            code += 'find_sub(' + strs + ', ' + subs + ')';
        } else {
            code += '0';
        }
    } else {
        if (!this.disabled) {
            Blockly.propc.methods_['find_sub_zero'] = 'int str_loc(char *__strS, char *__subS, int __sLoc) { ';
            Blockly.propc.methods_['find_sub_zero'] += '__sLoc = (sLoc < 0 ? 0 : sLoc);\nsLoc = (__sLoc >= strlen(__strS) ? strlen(__strS) - 1 : sLoc);\n';
            Blockly.propc.methods_['find_sub_zero'] += 'char* __pos = strstr(__strS + __sLoc, __subS); return (__pos - __strS); }\n';
            Blockly.propc.method_declarations_["find_sub_zero"] = 'int str_loc(char *, char *, int);\n';
        }
        var code = '';
        if (subs !== '' && strs !== '') {
            code += 'str_loc(' + strs + ', ' + subs + ', ' + stlc + ')';
        } else {
            code += '0';
        }
    }

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.propc.find_substring_zero = Blockly.propc.find_substring;

Blockly.Blocks.get_char_at_position = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_GET_CHAR_AT_POSITION_TOOLTIP);
        if (this.type === 'get_char_at_position') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: This block has been deprecated.\nReplace with a new block from the Operators > Numbers menu.\nOld blocks were (1) referenced, new blocks are (0) referenced.');
        } else {
            this.setColour(colorPalette.getColor('math'));
        }
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
            this.setFieldValue(newName, 'VALUE');
        }
    }
};

Blockly.Blocks.get_char_at_position_zero = Blockly.Blocks.get_char_at_position;

Blockly.propc.get_char_at_position = function () {
    var pos = Blockly.propc.valueToCode(this, 'POSITION', Blockly.propc.ORDER_ATOMIC) || '1';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);

    var code = '0';

    if (this.type === 'get_char_at_position') {
        code = data + '[(' + pos + '>strlen(' + data + ')?strlen(' + data + '):' + pos + ')-1]';
    } else {
        code = data + '[' + pos + ']';
    }

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.propc.get_char_at_position_zero = Blockly.propc.get_char_at_position;

Blockly.Blocks.set_char_at_position = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SET_CHAR_AT_POSITION_TOOLTIP);
        if (this.type === 'set_char_at_position') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: This block has been deprecated.\nReplace with a new block from the Operators > Numbers menu.\nOld blocks were (1) referenced, new blocks are (0) referenced.');
        } else {
            this.setColour(colorPalette.getColor('math'));
        }
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
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
        }
    }
};

Blockly.Blocks.set_char_at_position_zero = Blockly.Blocks.set_char_at_position;

Blockly.propc.set_char_at_position = function () {
    var pos = Blockly.propc.valueToCode(this, 'POSITION', Blockly.propc.ORDER_ATOMIC) || '1';
    var chr = Blockly.propc.valueToCode(this, 'CHAR', Blockly.propc.ORDER_ATOMIC) || '32';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
    Blockly.propc.vartype_[data] = 'char *';

    if (this.type === 'set_char_at_position') {
        return data + '[(' + pos + '>strlen(' + data + ')?strlen(' + data + '):' + pos + ')-1] = (' + chr + ' & 0xFF)\n;';
    } else {
        return data + '[' + pos + '] = (' + chr + ' & 0xFF)\n;';
    }
};

Blockly.propc.set_char_at_position_zero = Blockly.propc.set_char_at_position;

Blockly.Blocks.get_substring = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_GET_SUBSTRING_TOOLTIP);
        if (this.type === 'get_substring') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: This block has been deprecated.\nReplace with a new block from the Operators > Numbers menu.\nOld blocks were (1) referenced, new blocks are (0) referenced.');
        } else {
            this.setColour(colorPalette.getColor('math'));
        }
        this.appendDummyInput()
                .appendField("get part of string")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'FROM_STR');
        this.appendValueInput("START")
                .setCheck("Number")
                .appendField("from position");
        this.appendValueInput("END")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([["thru", " + 1"], ["to", ""]]), "PART")
                .appendField("position");
        this.appendDummyInput()
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'TO_STR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('FROM_STR'), this.getFieldValue('TO_STR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('FROM_STR')))
            this.setFieldValue(newName, 'FROM_STR');
        if (Blockly.Names.equals(oldName, this.getFieldValue('TO_STR')))
            this.setFieldValue(newName, 'TO_STR');
    }
};

Blockly.Blocks.get_substring_zero = Blockly.Blocks.get_substring;

Blockly.propc.get_substring = function () {
    var sst = Blockly.propc.valueToCode(this, 'START', Blockly.propc.ORDER_ATOMIC) || '1';
    var snd = Blockly.propc.valueToCode(this, 'END', Blockly.propc.ORDER_ATOMIC) || '2';
    var pt = this.getFieldValue('PART');
    var frStr = Blockly.propc.variableDB_.getName(this.getFieldValue('FROM_STR'), Blockly.Variables.NAME_TYPE);
    var toStr = Blockly.propc.variableDB_.getName(this.getFieldValue('TO_STR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.vartype_[toStr] = 'char *';

    if (parseInt(sst) > parseInt(snd)) {
        var tmp = sst;
        sst = snd;
        snd = tmp;
    }

    var code = '';

    if (this.type === 'get_substring') {
        Blockly.propc.definitions_['str_Buffer'] = 'char *__scBfr;';

        code += '__stIdx = 0;\nfor(__ssIdx = (' + sst + '-1); __ssIdx <= (' + snd + ' <= strlen(' + frStr;
        code += ')?' + snd + ':strlen(' + frStr + '))-1; __ssIdx++) {\n__scBfr[__stIdx] = ' + frStr + '[__ssIdx]; __stIdx++; }\n';
        code += '__scBfr[__stIdx] = 0;\n';
        code += 'strcpy(' + toStr + ', __scBfr);\n';
    } else {
        //code += '__stIdx = 0;\nfor(__ssIdx = ' + sst + '; __ssIdx < ' + snd + ';';
        //code += '__ssIdx++) {\n__scBfr[__stIdx] = ' + frStr + '[__ssIdx]; __stIdx++; }\n';

        code += "substr (" + toStr + ", " + frStr + ", " + sst + ", " + snd + pt + ");\n";

        if (!this.disabled) {
            var fn_code = "void substr (char *__outStr, char *__inStr, int __startPos, int __toPos) {\n";
            fn_code += "unsigned int __len = strlen(__inStr);\nunsigned int __strLen = __startPos - __toPos;\n";
            fn_code += "if (__startPos < 0) {\n__startPos = __len + __startPos;\n}\nif (__startPos < 0) {\n";
            fn_code += "__startPos = 0;\n}\nif ((unsigned int)__startPos > __len) {\n__startPos = __len;\n}\n";
            fn_code += "__len = strlen (&__inStr[__startPos]);\nif (__strLen > __len) {\n__strLen = __len;\n";
            fn_code += "}\nmemcpy(__outStr, __inStr + __startPos, __strLen);\n__outStr[__strLen] = 0;\n}";

            //Blockly.propc.definitions_['__ssIdx'] = 'int __ssIdx, __stIdx;';
            Blockly.propc.methods_['substr'] = fn_code;
            Blockly.propc.method_declarations_['substr'] = 'void substr (char *, char *, int, int);\n';
        }
    }

    return code;
};

Blockly.propc.get_substring_zero = Blockly.propc.get_substring;

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

    if (strA !== '' && strB !== '') {
        return ['(strcmp(' + strA + ', ' + strB + ') ' + comp + ' 0)', Blockly.propc.ORDER_NONE];
    } else {
        return ['(1' + comp + '0)', Blockly.propc.ORDER_NONE];
    }
};

Blockly.Blocks.string_to_number = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_TO_NUMBER_TOOLTIP);
        this.setColour('#FF8800');
        this.setWarningText('WARNING: This block has been deprecated.\nReplace with a scan string block from the Operators > Numbers menu.');
        this.appendValueInput("STRING")
                .setCheck("String")
                .appendField("string");
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["in decimal", "%d"], ["in hexadecimal", "%x"], ["in binary", "%b"]]), "TYPE")
                .appendField("to integer store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};

Blockly.propc.string_to_number = function () {
    var str = Blockly.propc.valueToCode(this, 'STRING', Blockly.propc.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var store = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    //Blockly.propc.definitions_['s2i_Buffer'] = 'char __s2iBfr[64];';

    var code = '';
    //code += 'strcpy(__s2iBfr, ' + str + ');\n';
    code += 'sscan(' + str + ', "' + type + '", &' + store + ');\n';

    return code;
};

Blockly.Blocks.number_to_string = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_NUMBER_TO_STRING_TOOLTIP);
        this.setColour('#FF8800');
        this.setWarningText('WARNING: This block has been deprecated.\nReplace with a create string from block from the Operators > Numbers menu.');
        this.appendValueInput("NUMBER")
                .setCheck("Number")
                .appendField("integer");
        this.appendDummyInput()
                .appendField("to string in")
                .appendField(new Blockly.FieldDropdown([["decimal", "%d"], ["hexadecimal", "%x"], ["binary", "%b"]]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
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

Blockly.Blocks.string_split = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_SPLIT_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
                .appendField("split string");
        this.appendValueInput("FROM_STR")
                .setCheck("String");
        this.appendValueInput("CHAR")
                .setCheck("Number")
                .appendField("on");
        this.appendDummyInput()
                .appendField("store the")
                .appendField(new Blockly.FieldDropdown([
                    ["first part in", "STR"],
                    ["next part in", "NULL"]
                ], function (p) {
                    var charInputVisible = true;
                    if (p === 'NULL') {
                        charInputVisible = false;
                    }
                    this.sourceBlock_.getInput('FROM_STR').setVisible(charInputVisible);
                }), "PART")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'TO_STR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('TO_STR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('TO_STR')))
            this.setFieldValue(newName, 'TO_STR');
    }
};

Blockly.propc.string_split = function () {
    var delim = Blockly.propc.valueToCode(this, 'CHAR', Blockly.propc.ORDER_ATOMIC) || "32";
    var fromStr = Blockly.propc.valueToCode(this, 'FROM_STR', Blockly.propc.ORDER_ATOMIC) || '"Hello World!"';
    var part = this.getFieldValue('PART');
    var toStr = Blockly.propc.variableDB_.getName(this.getFieldValue('TO_STR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.vartype_[toStr] = 'char *';

    if (part === 'NULL') {
        fromStr = part;
    }

    if (!this.disabled) {
        var fn_code = '';
        fn_code += 'void str_split(char *__fromStr, char *__toStr, char __delim) {\nchar __d[2] = {__delim, 0};\n';
        fn_code += 'char *__token;\n\n__token = strtok(__fromStr, __d);\nstrcpy(__toStr, __token);\n}';

        Blockly.propc.methods_['str_split'] = fn_code;
        Blockly.propc.method_declarations_['str_split'] = 'void str_split(char *, char *, char);\n';
    }

    return 'str_split(' + fromStr + ', ' + toStr + ', ' + delim + ');\n';
};

Blockly.Blocks.string_null = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_NULL_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("STR")
                .appendField("string")
                .setCheck("String");
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["is empty", '[0] == 0'],
                    ["is not empty", '[0] != 0']
                ]), "OP");
        this.setOutput(true, "Number");
    }
};

Blockly.propc.string_null = function () {
    var str = Blockly.propc.valueToCode(this, 'STR', Blockly.propc.ORDER_ATOMIC) || '"Hello World!"';
    var op = this.getFieldValue("OP") || "";
    return [str + op, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.string_trim = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_STRING_TRIM_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('FROM_STR')
                .appendField("trim string");
        this.appendDummyInput()
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'TO_STR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('FROM_STR'), this.getFieldValue('TO_STR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('FROM_STR')))
            this.setFieldValue(newName, 'FROM_STR');
        if (Blockly.Names.equals(oldName, this.getFieldValue('TO_STR')))
            this.setFieldValue(newName, 'TO_STR');
    }
};

Blockly.propc.string_trim = function () {
    var frStr = Blockly.propc.valueToCode(this, 'FROM_STR', Blockly.propc.ORDER_ATOMIC) || '" Hello World! "';
    var toStr = Blockly.propc.variableDB_.getName(this.getFieldValue('TO_STR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.vartype_[toStr] = 'char *';
    Blockly.propc.vartype_[frStr] = 'char *';

    if (!this.disabled) {
        var fn_code = '';
        fn_code += 'void str_trim(char *out, char *str)\n{\nconst char *end;\n\n';
        fn_code += 'while(isspace((unsigned char)*str)) str++;\nif(*str == 0)\n{\n*out = 0;\nreturn;\n';
        fn_code += '}\nend = str + strlen(str) - 1;\nwhile(end > str && isspace((unsigned char)*end)) end--;\n';
        fn_code += 'end++;\n\nmemcpy(out, str, end - str);\nout[end - str] = 0;\n}';

        //Blockly.propc.definitions_['__ssIdx'] = 'int __ssIdx, __stIdx;';
        Blockly.propc.methods_['str_trim'] = fn_code;
        Blockly.propc.method_declarations_['str_trim'] = 'void str_trim(char *, char *);\n';
    }

    return 'str_trim(' + toStr + ', ' + frStr + ');\n';
};


Blockly.Blocks.number_binary = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_NUMBER_BINARY_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput("0101", function (text) {
                    if (text === null) {
                        return null;
                    }
                    // 'O' is sometimes mistaken for '0' by inexperienced users.
                    text = text.replace(/O/ig, '0');
                    // remove anything that isn't a 0 or 1.
                    text = text.replace(/[^0-1]/g, '');
                    return text;
                }), "NUMBER")
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
                .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "MIN")
                .appendField("(min) to")
                .appendField(new Blockly.FieldTextInput("100", Blockly.FieldTextInput.numberValidator), "MAX")
                .appendField("(max)");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.constrain_value = function () {
    var num = Blockly.propc.valueToCode(this, 'NUMBER', Blockly.propc.ORDER_ATOMIC) || '0';
    var min = window.parseInt(this.getFieldValue('MIN'));
    var max = window.parseInt(this.getFieldValue('MAX'));

    var code = 'constrainInt(' + num + ', ' + min + ', ' + max + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.map_value = {
    helpUrl: Blockly.MSG_NUMBERS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MAP_VALUE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("NUMBER")
                .setCheck("Number")
                .appendField("map");
        this.appendDummyInput()
                .appendField("with range")
                .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "IMIN")
                .appendField("(from A)")
                .appendField(new Blockly.FieldTextInput("50", Blockly.FieldTextInput.numberValidator), "IMAX")
                .appendField("(from B) to range")
                .appendField(new Blockly.FieldTextInput("0", Blockly.FieldTextInput.numberValidator), "FMIN")
                .appendField("(to A)")
                .appendField(new Blockly.FieldTextInput("100", Blockly.FieldTextInput.numberValidator), "FMAX")
                .appendField("(to B)");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.map_value = function () {
    var num = Blockly.propc.valueToCode(this, 'NUMBER', Blockly.propc.ORDER_ATOMIC) || '0';
    var iMin = window.parseInt(this.getFieldValue('IMIN'));
    var iMax = window.parseInt(this.getFieldValue('IMAX'));
    var fMin = window.parseInt(this.getFieldValue('FMIN'));
    var fMax = window.parseInt(this.getFieldValue('FMAX'));

    return ['mapInt(' + num + ',' + iMin + ',' + iMax + ',' + fMin + ',' + fMax + ')', Blockly.propc.ORDER_NONE];
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
                    ["\u2715 the cosine of", "cos"],
                    ["\u2715 the sine of", "sin"],
                    ["\u2715 the tangent of", "tan"],
                    ["\u2715 the square root of", "sqrt"],
                    ["\u2715 e raised to the power of", "exp"],
                    ["\u2715 the logarithm (base 10) of", "log10"],
                    ["\u2715 the natural logarithm of", "log"]]), "OP");
        this.appendDummyInput("")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'STORE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('STORE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('STORE'))) {
            this.setFieldValue(newName, 'STORE');
        }
    }
};

Blockly.propc.math_advanced = function () {
    var store = Blockly.propc.variableDB_.getName(this.getFieldValue('STORE'), Blockly.Variables.NAME_TYPE);
    var arg1 = Blockly.propc.valueToCode(this, 'ARG1', Blockly.propc.ORDER_ATOMIC) || '1';
    var arg2 = Blockly.propc.valueToCode(this, 'ARG2', Blockly.propc.ORDER_ATOMIC) || '1';
    arg1 = arg1.replace(/[\(\-+ ](\d+)/g, "$1.0").replace(/\(int\)/g, "");
    arg2 = arg2.replace(/[\(\-+ ](\d+)/g, "$1.0").replace(/\(int\)/g, "");
    var operator = this.getFieldValue('OP');
    var opTrig = '';
    if (operator === 'sin' || operator === 'cos' || operator === 'tan')
        opTrig = ' * PI/180.0';

    var code = store + ' = (int) (((float)' + arg1 + ') * ' + operator + '(((float) ' + arg2 + ')' + opTrig + '));\n';

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
                .appendField("\u00F7");
        this.appendValueInput('ARG3')
                .appendField(") \u00D7")
                .setCheck("Number");
        this.appendDummyInput()
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'STORE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('STORE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('STORE'))) {
            this.setFieldValue(newName, 'STORE');
        }
    }
};

Blockly.propc.math_inv_trig = function () {
    var store = Blockly.propc.variableDB_.getName(this.getFieldValue('STORE'), Blockly.Variables.NAME_TYPE);
    var arg1 = Blockly.propc.valueToCode(this, 'ARG1', Blockly.propc.ORDER_ATOMIC) || '1';
    var arg2 = Blockly.propc.valueToCode(this, 'ARG2', Blockly.propc.ORDER_ATOMIC) || '1';
    var arg3 = Blockly.propc.valueToCode(this, 'ARG3', Blockly.propc.ORDER_ATOMIC) || '1';
    arg1 = arg1.replace(/([0-9])(\xA0| |\)|$)/g, "$1.0$2").replace(/\(int\)/g, "");
    arg2 = arg2.replace(/([0-9])(\xA0| |\)|$)/g, "$1.0$2").replace(/\(int\)/g, "");
    arg3 = arg3.replace(/([0-9])(\xA0| |\)|$)/g, "$1.0$2").replace(/\(int\)/g, "");
    var operator = this.getFieldValue('OP');
    var opTrig = '/';
    if (operator === 'atan2')
        opTrig = ',';

    var code = store + ' = (int) (180.0 * ' + operator + '(((float) ' + arg1 + ')' + opTrig + '((float) ' + arg2 + ')) * ' + arg3 + ' / PI);\n';

    return code;
};

Blockly.Blocks.constant_define = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSTANT_DEF_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput('MAIN')
                .appendField("constant")
                .appendField(new Blockly.FieldTextInput('MYVALUE', function (a) {
                    a = a.toUpperCase();
                    a = a.replace(/ /g, '_').replace(/[^A-Z0-9_]/g, '');
                    this.sourceBlock_.sendConstantVal(this.sourceBlock_.getFieldValue('CONSTANT_NAME'), a);
                    return a;
                }), "CONSTANT_NAME")
                .appendField(" = ")
                .appendField(new Blockly.FieldTextInput('0', function (a) {
                    if (a.indexOf('0x') === 0) {
                        a = a.replace(/[^0-9xA-Fa-f-]/g, "");
                    } else {
                        a = a.replace(/[^0-9b-]/g, "");
                    }
                    return a;
                }), 'VALUE');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.sendUpdate = true;
    },
    sendConstantVal: function (ov, nv) {
        if (this.sendUpdate || (ov === '-1' && nv === '-1')) {
            if (ov === '-1' && nv === '-1') {
                ov = null;
                nv = null;
            }
            // Find all the blocks that have my value and tell them to update it
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
            for (var x = 0; x < allBlocks.length; x++) {
                if (allBlocks[x] && allBlocks[x].type === 'constant_value') {
                    allBlocks[x].updateConstMenu.call(allBlocks[x], ov, nv);
                }
            }
        }
        this.sendUpdate = true;
    },
    onchange: function (event) {
        var myName = this.getFieldValue('CONSTANT_NAME');
        var theBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();

        // If I get deleted, broadcast that to other blocks.
        if (event.oldXml) {
            var oldName = '';
            var oSerializer = new XMLSerializer();
            var sXML = oSerializer.serializeToString(event.oldXml);
            var f_start = sXML.indexOf('CONSTANT_NAME');
            if (f_start > -1 && sXML.indexOf('constant_define') > -1) {
                var f_end = sXML.indexOf('</field', f_start);
                oldName = sXML.substring(f_start + 15, f_end);
                this.sendConstantVal(oldName, null);
            }
        }

        var warnTxt = null;
        var f_start = theBlocks.indexOf('constant ' + myName + '  =');
        if (theBlocks.indexOf('constant ' + myName + '  =', f_start + 1) > -1) {
            warnTxt = 'WARNING! you can only define the constant "' + myName + '" once!';
        }
        this.setWarningText(warnTxt);
    }
};

Blockly.propc.constant_define = function () {
    if (!this.disabled) {
        var c = this.getFieldValue('CONSTANT_NAME');
        var v = this.getFieldValue('VALUE');
        Blockly.propc.definitions_["USER_" + c ] = '#define MY_' + c + ' \t' + v;
    }
    return '';
};

Blockly.Blocks.constant_value = {
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSTANT_VALUE_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput('VALUE_LIST')
                .appendField(new Blockly.FieldDropdown([
                    ['MYVALUE', 'MYVALUE']
                ]), "VALUE");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, null);
        this.updateConstMenu();
    },
    updateConstMenu: function (ov, nv) {
        var v_check = true;
        var v_list = [];
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        for (var x = 0; x < allBlocks.length; x++) {
            if (allBlocks[x].type === 'constant_define') {
                var v_name = allBlocks[x].getFieldValue('CONSTANT_NAME');
                if (v_name === ov && nv) {
                    v_name = nv;
                }
                if (v_name) {
                    v_list.push([v_name, v_name]);
                }
                v_check = false;
            }
        }
        if (v_check) {
            v_list.push(['MYVALUE', 'MYVALUE']);
        }
        var m = this.getFieldValue('VALUE');

        this.removeInput('VALUE_LIST');
        this.appendDummyInput('VALUE_LIST')
                .appendField(new Blockly.FieldDropdown(uniq_fast(v_list)), "VALUE");
        if (m && m === ov && nv) {
            this.setFieldValue(nv, 'VALUE');
        } else if (m) {
            this.setFieldValue(m, 'VALUE');
        }
    },
    onchange: function () {
        var val = this.getFieldValue('VALUE');
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('constant ' + val) === -1) {
            this.setWarningText('WARNING: Your program must include a constant define block for this value!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.constant_value = function () {
    var code = this.getFieldValue("VALUE");
    return ['MY_' + code, Blockly.propc.ORDER_ATOMIC];
};


Blockly.Blocks.custom_code_multiple = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CUSTOM_CODE_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldCheckbox('FALSE', function (blockEdit) {
                    this.sourceBlock_.hideInputs(blockEdit);
                }), 'EDIT')
                .appendField('  User defined code', 'LABEL');
        this.appendDummyInput('SET_LABEL')
                .appendField('label')
                .appendField(new Blockly.FieldTextInput('User defined code', function (blockLabel) {
                    this.sourceBlock_.setFieldValue('  ' + blockLabel, 'LABEL');
                }), 'LABEL_SET');
        this.appendDummyInput('SET_COLOR')
                .appendField('block color')
                .appendField(new Blockly.FieldColour('#266999').setColours([
                    "#26994D", "#268F99", "#266999",
                    "#264399", "#392699", "#692699",
                    "#8F2699", "#992673", "#99264C"
                ]).setColumns(3), 'COLOR');
        this.appendDummyInput('INCL')
                .appendField('includes code')
                .appendField(new Blockly.FieldCode(''), 'INCLUDES');
        this.appendDummyInput('GLOB')
                .appendField('globals code')
                .appendField(new Blockly.FieldCode(''), 'GLOBALS');
        this.appendDummyInput('SETS')
                .appendField('setups code')
                .appendField(new Blockly.FieldCode(''), 'SETUPS');
        this.appendDummyInput('MAIN')
                .appendField('main code')
                .appendField(new Blockly.FieldCode(''), 'MAIN');
        this.appendDummyInput('OUTS')
                .appendField('main code is')
                .appendField(new Blockly.FieldDropdown([
                    ['inline', 'INL'],
                    ['a numeric value', 'NUM'],
                    ['a string value', 'STR']
                ], function (outType) {
                    if (outType === 'INL') {
                        this.sourceBlock_.setPreviousStatement(true);
                        this.sourceBlock_.setNextStatement(true);
                        this.sourceBlock_.setOutput(false);
                    } else if (outType === 'NUM') {
                        this.sourceBlock_.setPreviousStatement(false);
                        this.sourceBlock_.setNextStatement(false);
                        this.sourceBlock_.setOutput(true, 'Number');
                    } else {
                        this.sourceBlock_.setPreviousStatement(false);
                        this.sourceBlock_.setNextStatement(false);
                        this.sourceBlock_.setOutput(true, 'String');
                    }
                }), 'TYPE');
        this.appendDummyInput('FUNC')
                .appendField('functions code')
                .appendField(new Blockly.FieldCode(''), 'FUNCTIONS');
        this.appendDummyInput('ARGS')
                .appendField(new Blockly.FieldDropdown([
                    ['no inputs', '0'],
                    ['add 1 input', '1'],
                    ['add 2 inputs', '2'],
                    ['add 3 inputs', '3'],
                    ['add 4 inputs', '4'],
                    ['add 5 inputs', '5'],
                    ['add 6 inputs', '6'],
                    ['add 7 inputs', '7'],
                    ['add 8 inputs', '8'],
                    ['add 9 inputs', '9']
                ], function (inSet) {
                    this.sourceBlock_.setupInputs(inSet);
                }), 'ARG_COUNT');
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setFieldValue('FALSE', 'EDIT');
        this.hideInputs('FALSE');
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        //this.setFieldValue('FALSE', 'EDIT');
        for (var i = 1; i < 10; i++) {
            if (this.getInput('ARG' + i.toString(10))) {
                var currentLabel = this.getFieldValue('LABEL_ARG' + i.toString(10));
                this.setFieldValue(currentLabel, 'EDIT_ARG' + i.toString(10));
                this.getField('LABEL_ARG' + i.toString(10)).setVisible(false);
            }
        }
        //this.hideInputs('FALSE');
        var args = this.getFieldValue('ARG_COUNT') || '0';
        container.setAttribute('args', args);
        for (var tk = 1; tk < 10; tk++) {
            if (this.getField('EDIT_ARG' + tk.toString(10))) {
                container.setAttribute('a' + tk.toString(10), this.getFieldValue('EDIT_ARG' + tk.toString(10)));
            }
        }
        container.setAttribute('color', this.getFieldValue('COLOR'));
        container.setAttribute('type', this.getFieldValue('TYPE'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var args = xmlElement.getAttribute('args');
        this.setupInputs(args);
        this.getField('EDIT').setValue('FALSE');
        for (var tk = 1; tk < 10; tk++) {
            var mv = xmlElement.getAttribute('a' + tk.toString(10))
            if (this.getField('EDIT_ARG' + tk.toString(10)) && mv) {
                    this.setFieldValue(mv, 'EDIT_ARG' + tk.toString(10));
            }
        }
        this.setFieldValue(xmlElement.getAttribute('color'), 'COLOR');
        var outType = xmlElement.getAttribute('type');
        if (outType === 'INL') {
            this.setPreviousStatement(true, "Block");
            this.setNextStatement(true);
            this.setOutput(false);
        } else if (outType === 'NUM') {
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true, 'Number');
        } else {
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true, 'String');
        }
        this.setFieldValue('FALSE', 'EDIT');
        this.hideInputs('FALSE');
    },
    setupInputs: function (argsCount) {
        for (var i = 1; i <= Number(argsCount); i++) {
            if (!this.getInput('ARG' + i.toString(10))) {
                this.appendValueInput('ARG' + i.toString(10))
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField('input "@' + i.toString(10) + '" label', 'EDIT_ARG' + i.toString(10))
                        .appendField(new Blockly.FieldTextInput(''), 'LABEL_ARG' + i.toString(10));
            }
        }
        for (var i = 9; i > Number(argsCount); i--) {
            if (this.getInput('ARG' + i.toString(10))) {
                this.removeInput('ARG' + i.toString(10));
            }
        }
        //this.render();
    },
    hideInputs: function (hideState) {
        var fieldNameList_ = ['SET_LABEL', 'SET_COLOR', 'INCL', 'GLOB', 'SETS', 'MAIN', 'OUTS', 'FUNC', 'ARGS'];
        if (hideState === true || hideState === 'true' || hideState === 'TRUE') {
            this.setColour('#909090');
            for (var tk = 0; tk < fieldNameList_.length; tk++) {
                this.getInput(fieldNameList_[tk]).setVisible(true);
            }
            for (var i = 1; i < 10; i++) {
                if (this.getInput('ARG' + i.toString(10))) {
                    this.getField('LABEL_ARG' + i.toString(10)).setVisible(true);
                    var currentLabel = this.getFieldValue('EDIT_ARG' + i.toString(10));
                    if (currentLabel !== 'input "@' + i.toString(10) + '" label')
                        this.setFieldValue(currentLabel, 'LABEL_ARG' + i.toString(10));
                    this.setFieldValue('input "@' + i.toString(10) + '" label', 'EDIT_ARG' + i.toString(10));
                }
            }
        } else {
            //this.removeSelect();
            this.setColour(this.getFieldValue('COLOR'));
            for (var tk = 0; tk < fieldNameList_.length; tk++) {
                this.getInput(fieldNameList_[tk]).setVisible(false);
            }
            for (var i = 1; i < 10; i++) {
                if (this.getInput('ARG' + i.toString(10))) {
                    var currentLabel = this.getFieldValue('LABEL_ARG' + i.toString(10));
                    this.setFieldValue(currentLabel, 'EDIT_ARG' + i.toString(10));
                    this.getField('LABEL_ARG' + i.toString(10)).setVisible(false);
                }
            }
        }
        this.render();
    }
};

Blockly.propc.custom_code_multiple = function () {
    var in_arg = [];
    for (var tk = 1; tk < 10; tk++) {
        in_arg.push(Blockly.propc.valueToCode(this, 'ARG' + tk.toString(10), Blockly.propc.ORDER_ATOMIC) || '');
    }
    console.log(in_arg);
    var incl = (this.getFieldValue("INCLUDES") || '').replace(/\@([0-9])/g, function(m, p) {return in_arg[parseInt(p)-1]});
    var glob = (this.getFieldValue("GLOBALS") || '').replace(/\@([0-9])/g, function(m, p) {return in_arg[parseInt(p)-1]});
    var sets = (this.getFieldValue("SETUPS") || '').replace(/\@([0-9])/g, function(m, p) {return in_arg[parseInt(p)-1]});
    var main = (this.getFieldValue("MAIN") || '').replace(/\@([0-9])/g, function(m, p) {return in_arg[parseInt(p)-1]});
    var func = (this.getFieldValue("FUNCTIONS") || '').replace(/\@([0-9])/g, function(m, p) {return in_arg[parseInt(p)-1]});

    var code = '';

    if (incl !== '')
        Blockly.propc.definitions_["cCode" + cCode] = incl + '\n';
    if (glob !== '')
        Blockly.propc.global_vars_["cCode" + cCode] = glob + '\n';
    if (sets !== '')
        Blockly.propc.setups_["cCode" + cCode] = sets + '\n';
    if (main !== '')
        code += main;
    if (this.getFieldValue('TYPE') === 'INL')
        code += '\n';
    if (func !== '')
        Blockly.propc.methods_["cCode" + cCode] = func + '\n';

    cCode++;

    if (this.getFieldValue('TYPE') === 'INL')
        return code;
    else
        return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.propc_file = {
    init: function () {
        this.setColour('#000000');
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('single.c'), 'FILENAME')
                .appendField(new Blockly.FieldTextInput(''), 'CODE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.propc_file = function () {
    var fnme = this.getFieldValue('FILENAME');
    var code = this.getFieldValue('CODE');
    if (code.indexOf(' ') === -1 && code.indexOf('{') === -1) {
        code = atob(code);
    }
    return '// RAW PROPC CODE\n//{{||}}\n' + fnme + '//{{||}}\n' + code;
};
