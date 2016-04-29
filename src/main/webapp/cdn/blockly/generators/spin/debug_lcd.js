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
 * @fileoverview Generating Spin for the debug lcd.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';


//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


//servo block
Blockly.Blocks.debug_lcd_init = {
    helpUrl: '',
    init: function () {
        this.setColour(180);
        this.appendDummyInput("")
                .appendField("LCD init")
                .appendField("PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput("")
                .appendField("Baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"]]), "BAUD");
        this.appendDummyInput("")
                .appendField("Lines")
                .appendField(new Blockly.FieldDropdown([["2", "2"], ["4", "4"]]), "LINES");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_clear = {
    helpUrl: '',
    init: function () {
        this.setColour(180);
        this.appendDummyInput("")
                .appendField("LCD clear");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_print = {
    helpUrl: '',
    init: function () {
        this.setColour(180);
        this.appendDummyInput("")
                .appendField("LCD print")
                .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                        'media/quote0.png', 12, 12))
                .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                        'media/quote1.png', 12, 12));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_number = {
    helpUrl: '',
    init: function () {
        this.setColour(180);
        this.appendDummyInput("")
                .appendField("LCD print");
        this.appendDummyInput("").appendField("Number");
        this.appendValueInput('NUMBER').setCheck('Number');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_action = {
    helpUrl: '',
    init: function () {
        this.setColour(180);
        this.appendDummyInput("")
                .appendField("LCD action")
                .appendField(new Blockly.FieldDropdown([["Newline", "13"]]), "ACTION");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// define generators
//Blockly.Spin = new Blockly.Generator('Spin');

Blockly.Spin.debug_lcd_init = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var baud = this.getFieldValue('BAUD');
    var lines = this.getFieldValue('LINES');

    Blockly.Spin.definitions_['define_debug_lcd'] = 'OBJDEBUGLCD : "debug_lcd"';
    Blockly.Spin.setups_['setup_debug_lcd'] = 'DEBUGLCD.init(' + dropdown_pin + ', ' + baud + ', ' + lines + ')';

    return '';
};

Blockly.Spin.debug_lcd_clear = function () {

    Blockly.Spin.definitions_['define_debug_lcd'] = 'OBJDEBUGLCD : "debug_lcd"';
    if (Blockly.Spin.setups_['setup_debug_lcd'] == undefined) {
        Blockly.Spin.setups_['setup_debug_lcd'] = 'DEBUGLCD.init(0, 9600, 2)';
    }

    return 'DEBUGLCD.cls\n';
};

Blockly.Spin.debug_lcd_print = function () {
    var text = this.getFieldValue('TEXT');

    Blockly.Spin.definitions_['define_debug_lcd'] = 'OBJDEBUGLCD : "debug_lcd"';
    if (Blockly.Spin.setups_['setup_debug_lcd'] == undefined) {
        Blockly.Spin.setups_['setup_debug_lcd'] = 'DEBUGLCD.init(0, 9600, 2)';
    }

    return 'DEBUGLCD.str(string("' + text + '"))\n';
};

Blockly.Spin.debug_lcd_number = function () {
    var number = Blockly.Spin.valueToCode(this, 'NUMBER', Blockly.Spin.ORDER_UNARY_PREFIX) || '0';

    Blockly.Spin.definitions_['define_debug_lcd'] = 'OBJDEBUGLCD : "debug_lcd"';
    if (Blockly.Spin.setups_['setup_debug_lcd'] == undefined) {
        Blockly.Spin.setups_['setup_debug_lcd'] = 'DEBUGLCD.init(0, 9600, 2)';
    }

    return 'DEBUGLCD.dec(' + number + ')\n';
};

Blockly.Spin.debug_lcd_action = function () {
    var action = this.getFieldValue('ACTION');

    Blockly.Spin.definitions_['define_debug_lcd'] = 'OBJDEBUGLCD : "debug_lcd"';
    if (Blockly.Spin.setups_['setup_debug_lcd'] == undefined) {
        Blockly.Spin.setups_['setup_debug_lcd'] = 'DEBUGLCD.init(0, 9600, 2)';
    }

    return 'DEBUGLCD.putc(' + action + ')\n';
};