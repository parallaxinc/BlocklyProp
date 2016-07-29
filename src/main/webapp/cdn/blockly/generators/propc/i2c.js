/*
 This file implements support for I2C functions.

 Author: Vale Tolpegin ( valetolpegin@gmail.com )

 *Copyright 2016 Vale Tolpegin.
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

'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.i2c_new_bus = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("I2C new bus")
                .appendField("sclPin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCL_PIN");
        this.appendDummyInput()
                .appendField("sdaPin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SDA_PIN");
        this.appendDummyInput()
                .appendField("sclDrive")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCL_DRIVE");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.i2c_in = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("I2C in");
        this.appendValueInput('VALUE')
                .appendField("data count");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.i2c_out = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("I2C out");
        this.appendDummyInput()
                .appendField("data")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DATA")
                .appendField(quotes.newQuote_(true))
                .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                .appendField(quotes.newQuote_(false));
        this.appendValueInput('VALUE')
                .appendField("data count");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.propc.i2c_new_bus = function () {
    var scl_pin = this.getFieldValue('SCL_PIN');
    var sda_pin = this.getFieldValue('SDA_PIN');
    var scl_drive = this.getFieldValue('SCL_DRIVE') || '0';

    Blockly.propc.setups_["i2c_newbus"] = 'i2cBusUD = i2c_newbus(' + scl_pin + ', ' + sda_pin + ', ' + scl_drive + ');\n';

    return '';
};

Blockly.propc.i2c_out = function () {
    var data = this.getFieldValue('TEXT') || '';
    var dataCount = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

    if (Blockly.propc.setups_["i2c_newbus"] === undefined)
    {
        return '//Missing i2c new bus declaration\n';
    }

    return 'i2c_out(i2cBusUD, 0b1010000, 32768, 2, ' + data + ', ' + dataCount + ')';
};

Blockly.propc.i2c_in = function () {
    var dataCount = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

    if (Blockly.propc.setups_["i2c_newbus"] === undefined)
    {
        return '//Missing i2c new bus declaration\n';
    }

    if (Blockly.propc.setups_["i2c_input_array"] === undefined)
    {
        Blockly.propc.setups_["i2c_input_array"] = 'char i2cInputArray[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';
    }

    return 'i2c_in(i2cBusUD, 0b1010000, 32768, 2, i2cInputArray, ' + dataCount + ')';
};
