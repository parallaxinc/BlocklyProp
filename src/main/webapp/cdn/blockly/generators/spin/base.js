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
 * @fileoverview Generating Spin for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.inout_digital_write = {
    helpUrl: 'help/block-digitalpin.html#write',
    init: function () {
        this.setColour(230);
        this.appendDummyInput("")
                .appendField("DigitalWrite PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendField("Stat")
                .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
    }
};

Blockly.Blocks.inout_digital_read = {
    helpUrl: 'help/block-digitalpin.html#read',
    init: function () {
        this.setColour(230);
        this.appendDummyInput("")
                .appendField("DigitalRead PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

Blockly.Blocks.inout_digital_write_pin = {
    helpUrl: 'help/block-digitalpin.html#write-pin',
    init: function () {
        this.setColour(230);
        this.appendDummyInput("").appendTitle("DigitalWrite PIN#");
        this.appendValueInput('PIN').setCheck('Number');
        this.appendDummyInput("").appendTitle("Stat")
                .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
        this.setInputsInline(true);
    }
};

Blockly.Blocks.inout_digital_read_pin = {
    helpUrl: 'help/block-digitalpin.html#read-pin',
    init: function () {
        this.setColour(230);
        this.appendDummyInput("").appendField("DigitalRead PIN#");
        this.appendValueInput('PIN').setCheck('Number');
        this.setOutput(true, Boolean);
        this.setTooltip('');
        this.setInputsInline(true);
    }
};

Blockly.Blocks.base_delay = {
    helpUrl: 'help/block-delay.html',
    init: function () {
        this.setColour(120);
        this.appendValueInput("DELAY_TIME", 'Number')
                .appendField("Delay (ms)")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Delay specific time');
    }
};

// Cog actions
Blockly.Blocks.cog_new = {
    helpUrl: 'help/block-cognew.html',
    init: function () {
        this.setColour(120);
        this.appendDummyInput()
                .appendTitle('Cognew ');

        this.appendDummyInput()
                .appendField('Stacksize ')
                .appendField(new Blockly.FieldTextInput("48", Blockly.Language.math_number.validator), "STACK_SIZE");

        this.appendStatementInput("METHOD")
                .appendTitle("Method");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Spin.inout_digital_write = function () {
    var dropdown_pin = this.getTitleValue('PIN');
    var dropdown_stat = this.getTitleValue('STAT');
//    Blockly.Spin.setups_['setup_output_' + dropdown_pin] = 'dira[' + dropdown_pin + ']~~';
//    var code = 'outa[' + dropdown_pin + '] := ' + dropdown_stat + '\n';
    var code = 'dira[' + dropdown_pin + '] := 1\n' + 'outa[' + dropdown_pin + '] := ' + dropdown_stat + '\n';
    return code;
};

Blockly.Spin.inout_digital_read = function () {
    var dropdown_pin = this.getTitleValue('PIN');
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'ina[' + dropdown_pin + ']';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.inout_digital_write_pin = function () {
    var dropdown_pin = Blockly.Spin.valueToCode(this, 'PIN', Blockly.Spin.ORDER_UNARY_PREFIX) || '0';
    var dropdown_stat = this.getTitleValue('STAT');
//    Blockly.Spin.setups_['setup_output_' + dropdown_pin] = 'dira[' + dropdown_pin + ']~~';
    var code = 'dira[' + dropdown_pin + '] := 1\n' + 'outa[' + dropdown_pin + '] := ' + dropdown_stat + '\n';
    return code;
};

Blockly.Spin.inout_digital_read_pin = function () {
    var dropdown_pin = Blockly.Spin.valueToCode(this, 'PIN', Blockly.Spin.ORDER_UNARY_PREFIX) || '0';
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'ina[' + dropdown_pin + ']';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.base_delay = function () {
    var delay_time = Blockly.Spin.valueToCode(this, 'DELAY_TIME', Blockly.Spin.ORDER_ATOMIC) || '1000'
    var code = 'waitcnt(clkfreq / 1000 * ' + delay_time + ' + cnt)\n';
    return code;
};

Blockly.Spin.cog_new = function () {
    var method = Blockly.Spin.statementToCode(this, 'METHOD');
    method = method.replace("  ", "").replace("\n", "");
    var stackSize = this.getTitleValue('STACK_SIZE');
    var stackName = 'Stack' + Blockly.Spin.stacks_.length;

    Blockly.Spin.stacks_.push('long ' + stackName + '[' + stackSize + ']');

    var code = 'cognew(' + method + ', @' + stackName + ')\n';
    return code;
};