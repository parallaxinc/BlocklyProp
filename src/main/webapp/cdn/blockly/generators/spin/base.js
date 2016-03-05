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

Blockly.Spin.make_pin = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'OUTA[' + dropdown_pin + ']~~\nDIRA[' + dropdown_pin + ']~~\n';
        case "LOW":
            return 'OUTA[' + dropdown_pin + ']~\nDIRA[' + dropdown_pin + ']~~\n';
        case "TOGGLE":
            return '!OUTA[' + dropdown_pin + ']\n';
        case "INPUT":
            return 'DIRA[' + dropdown_pin + ']~\n';
        case "REVERSE":
            return '!DIRA[' + dropdown_pin + ']\n';
    }
};

Blockly.Spin.make_pin_input = function () {
    var pin = Blockly.Spin.valueToCode(this, 'PIN', Blockly.Spin.ORDER_ATOMIC) || 0; //Number(this.getFieldValue('PIN'));
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'OUTA[' + pin + ']~~\nDIRA[' + pin + ']~~\n';
        case "LOW":
            return 'OUTA[' + pin + ']~\nDIRA[' + pin + ']~~\n';
        case "TOGGLE":
            return '!OUTA[' + pin + ']\n';
        case "INPUT":
            return 'DIRA[' + pin + ']~\n';
        case "REVERSE":
            return '!DIRA[' + pin + ']\n';
    }
};

Blockly.Spin.check_pin = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'INA[' + dropdown_pin + ']';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.check_pin_input = function () {
    var dropdown_pin = Blockly.Spin.valueToCode(this, 'PIN', Blockly.Spin.ORDER_UNARY_PREFIX) || '0';
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'INA[' + dropdown_pin + ']';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Spin.set_pins = function () {
    var code = '';
    var action = this.getFieldValue('ACTION');
    var dropdown_pin_count = Number(this.getFieldValue('PIN_COUNT'));
    var dropdown_start_pin = Number(this.getFieldValue('START_PIN'));
    if (action === 'STATE') {
        code = 'OUTA[';
    } else if (action === 'DIRECTION') {
        code = 'DIR[';
    }
    var highestPin = dropdown_start_pin + dropdown_pin_count - 1;
    code += dropdown_start_pin;
    if (dropdown_pin_count > 1) {
        code += '..';
        code += highestPin;
    }
    code += '] := %';
    for (var i = dropdown_start_pin; i <= highestPin; i++) {
        code += this.getFieldValue('P' + i);
    }
    return code + '\n';
};

Blockly.Spin.base_freqout = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var duration = Blockly.Spin.valueToCode(this, 'DURATION', Blockly.Spin.ORDER_ATOMIC) || 1000;
    var frequency = Blockly.Spin.valueToCode(this, 'FREQUENCY', Blockly.Spin.ORDER_ATOMIC) || 3000;

    var code = 'freqout( ' + dropdown_pin + ', ' + duration + ', ' + frequency + ' );\n';
    // TODO
    return code;
};


Blockly.Spin.base_delay = function () {
    var delay_time = Blockly.Spin.valueToCode(this, 'DELAY_TIME', Blockly.Spin.ORDER_ATOMIC) || '1000'
    var code = 'waitcnt(clkfreq / 1000 * ' + delay_time + ' + cnt)\n';
    return code;
};

Blockly.Spin.cog_new = function () {
    var method = Blockly.Spin.statementToCode(this, 'METHOD');
    method = method.replace("  ", "").replace("\n", "");
    var stackSize = this.getFieldValue('STACK_SIZE');
    var stackName = 'Stack' + Blockly.Spin.stacks_.length;

    Blockly.Spin.stacks_.push('long ' + stackName + '[' + stackSize + ']');

    var code = 'cognew(' + method + ', @' + stackName + ')\n';
    return code;
};
