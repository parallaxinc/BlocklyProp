/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
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
if (!Blockly.Language)
    Blockly.Language = {};

Blockly.Language.inout_digital_write = {
    category: 'In/Out',
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function() {
        this.setColour(230);
        this.appendDummyInput("")
                .appendTitle("DigitalWrite PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendTitle("Stat")
                .appendTitle(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
    }
};

Blockly.Language.inout_digital_read = {
    category: 'In/Out',
    helpUrl: 'http://arduino.cc/en/Reference/DigitalRead',
    init: function() {
        this.setColour(230);
        this.appendDummyInput("")
                .appendTitle("DigitalRead PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

Blockly.Language.base_delay = {
    category: 'Control',
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function() {
        this.setColour(120);
        this.appendValueInput("DELAY_TIME", Number)
                .appendTitle("Delay (ms)")
                .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Delay specific time');
    }
};


// define generators
Blockly.Spin = Blockly.Generator.get('Spin');

Blockly.Spin.inout_digital_write = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var dropdown_stat = this.getTitleValue('STAT');
    Blockly.Spin.setups_['setup_output_' + dropdown_pin] = 'dira[' + dropdown_pin + ']~~';
    var code = 'outa[' + dropdown_pin + '] := ' + dropdown_stat + '\n';
    return code;
};

Blockly.Spin.inout_digital_read = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'ina[' + dropdown_pin + ']';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.base_delay = function() {
    var delay_time = Blockly.Spin.valueToCode(this, 'DELAY_TIME', Blockly.Spin.ORDER_ATOMIC) || '1000'
    var code = 'waitcnt(clkfreq / 1000 * ' + delay_time + ' + cnt)\n';
    return code;
};
