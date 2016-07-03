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
 * @author valetolpegin@gmail.com ( Vale Tolpegin )
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.debug_lcd_init = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD init")
                .appendField("pin#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"]]), "BAUD");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_clear = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD clear");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_print = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput("")
                .appendField("LCD print")
                .appendField(quotes.newQuote_(true))
                .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                .appendField(quotes.newQuote_(false));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_number = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD print");
        this.appendValueInput('NUMBER', Number)
                .appendField("number")
                .setCheck('Number');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_action = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD action")
                .appendField(new Blockly.FieldDropdown([["newline", "13"]]), "ACTION");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_init = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.setups_['setup_debug_lcd'] = 'serial *debug_lcd = serial_open(' + dropdown_pin + ', ' + dropdown_pin + ', 0, ' + baud + ');\n';

    var code = 'writeChar(debug_lcd, 22);\n';
    return code;
};

Blockly.propc.debug_lcd_clear = function () {
    return 'writeChar(debug_lcd, 12);\npause(5);\n';
};

Blockly.propc.debug_lcd_print = function () {
    var text = this.getFieldValue('TEXT');

    return 'dprint(debug_lcd, "' + text + '");\n';
};

Blockly.propc.debug_lcd_number = function () {
    var number = Blockly.propc.valueToCode(this, 'NUMBER', Blockly.propc.ORDER_UNARY_PREFIX) || '0';

    return 'dprint(debug_lcd, "' + number + '");\n';
};

Blockly.propc.debug_lcd_action = function () {
    var action = this.getFieldValue('ACTION');

    return 'dprint(debug_lcd, ' + action + ');\n';
};
