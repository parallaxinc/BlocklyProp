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
                .appendField("I2C new bus SCL")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCL_PIN");
        this.appendDummyInput()
                .appendField("SDA")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SDA_PIN");
//      this.appendDummyInput()
//              .appendField("SCL Drive mode")
//              .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCL_DRIVE");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.i2c_out = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("DATA")
            .setCheck(null)
            .appendField("I2C send")
            .appendField(new Blockly.FieldDropdown([["byte", "BYTE"], ["number", "NUMBER"], ["text", "TEXT"]]), "TYPE");
        this.appendValueInput("DEVICE")
            .setCheck("Number")
            .appendField("to addresses: device");
        this.appendValueInput("ADDRESS")
            .setCheck("Number")
            .appendField("register");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.i2c_in = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("SIZE")
            .setCheck("Number")
            .appendField("I2C retrieve bytes (size)");
        this.appendValueInput("DEVICE")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("device address");
        this.appendValueInput("REGISTER")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("register address");
        this.appendValueInput("DATA")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("store in");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.i2c_new_bus = function () {
    var scl_pin = this.getFieldValue('SCL_PIN');
    var sda_pin = this.getFieldValue('SDA_PIN');
    var scl_drive = '0';

    Blockly.propc.global_vars_["i2c_new_bus"] = 'i2c *i2cBusUD;';
    Blockly.propc.setups_["i2c_newbus"] = 'i2cBusUD = i2c_newbus(' + scl_pin + ', ' + sda_pin + ', ' + scl_drive + ');\n';

    return '';
};

Blockly.propc.i2c_in = function () {
    var device = Blockly.propc.valueToCode(this, 'DEVICE', Blockly.propc.ORDER_ATOMIC);
    var size = Blockly.propc.valueToCode(this, 'SIZE', Blockly.propc.ORDER_ATOMIC);
    var address = Blockly.propc.valueToCode(this, 'REGISTER', Blockly.propc.ORDER_ATOMIC);
    var data = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_NONE);

    if (Blockly.propc.setups_["i2c_newbus"] === undefined)
    {
        return '//Missing i2c new bus declaration\n';
    }

    Blockly.propc.global_vars_["i2c_new_bus"] = 'i2c *i2cBusUD;';
    Blockly.propc.global_vars_["i2c_address_size"] = 'int __addrSize = 4;';
    
    var code = '__addrSize = 4;\n';
    code += 'if(' + address + ' <= 0xFFFFFF) __addrSize = 3;\n';
    code += 'if(' + address + ' <= 0xFFFF) __addrSize = 2;\n';
    code += 'if(' + address + ' <= 0xFF) __addrSize = 1;\n';
    code += 'i2c_in(i2cBusUD, (' + device + ' & 127), ' + address + ', __addrSize, ' + data + ', ' + size + ');';

    return code;
};

Blockly.propc.i2c_out = function () {
    var type = this.getFieldValue('TYPE');
    var device = Blockly.propc.valueToCode(this, 'DEVICE', Blockly.propc.ORDER_ATOMIC);
    var data = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_ATOMIC);
    var address = Blockly.propc.valueToCode(this, 'ADDRESS', Blockly.propc.ORDER_ATOMIC);

    Blockly.propc.global_vars_["i2c_new_bus"] = 'i2c *i2cBusUD;';
    Blockly.propc.global_vars_["i2c_address_size"] = 'int __addrSize = 4;';

    var code = '__addrSize = 4;\n';
    code += 'if(' + address + ' <= 0xFFFFFF) __addrSize = 3;\n';
    code += 'if(' + address + ' <= 0xFFFF) __addrSize = 2;\n';
    code += 'if(' + address + ' <= 0xFF) __addrSize = 1;\n';
    code +=  'i2c_out(i2cBusUD, (' + device + ' & 127), ' + address + ', __addrSize, ';
            
    if (type === 'BYTE') {
        code += '(' + data + ' & 0xFF),';
    } else {
        code += data + ',';
    }

    if (Blockly.propc.setups_["i2c_newbus"] === undefined)
    {
        return '//Missing i2c new bus declaration\n';
    }

    if (type === 'BYTE') {
        code += '1 );\n';
    } else {
        code += 'sizeof(' + data + ') );\n';
    }
    
    return code;
};
