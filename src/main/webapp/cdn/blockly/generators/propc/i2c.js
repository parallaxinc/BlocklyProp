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
                .appendField("I2C initialize SCL")
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

Blockly.propc.i2c_new_bus = function () {
    var scl_pin = this.getFieldValue('SCL_PIN');
    var sda_pin = this.getFieldValue('SDA_PIN');
    var scl_drive = '0';

    Blockly.propc.global_vars_["i2c_new_bus"] = 'i2c *i2cBusUD;';
    Blockly.propc.setups_["i2c_newbus"] = 'i2cBusUD = i2c_newbus(' + scl_pin + ', ' + sda_pin + ', ' + scl_drive + ');\n';

    return '';
};

Blockly.Blocks.i2c_read_byte = {
  init: function() {
    this.appendValueInput("DEVICE")
        .setCheck("Number")
        .appendField("I2C retrieve byte from device");
    this.appendDummyInput()
        .appendField("then")
        .appendField(new Blockly.FieldDropdown([["ACK (0)", "0"], ["NACK (1)", "1"]]), "ACK");
    this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("store in");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.propc.i2c_read_byte = function(block) {
    var device = Blockly.propc.valueToCode(this, 'DEVICE', Blockly.propc.ORDER_ATOMIC);
    var ack = this.getFieldValue('ACK');
    var data = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_ATOMIC);

    if(data !== '') {
        return data + ' = i2c_readByte(i2cBusUD, ' + ack + ');\n';
    }
};

Blockly.Blocks.i2c_read_multiple = {
  init: function() {
    this.appendValueInput("BYTES")
        .setCheck("Number")
        .appendField("I2C retrieve");
    this.appendValueInput("DEVICE")
        .setCheck("Number")
        .appendField("bytes of")
        .appendField(new Blockly.FieldDropdown([["a number (MSB first)", "NUMMSB"], ["a number (LSB first)", "NUMLSB"], ["text", "TEXT"]]), "TYPE")
        .appendField("from device");
    this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("store in");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.propc.i2c_read_multiple = function(block) {
    var bytes = Blockly.propc.valueToCode(this, 'BYTES', Blockly.propc.ORDER_ATOMIC);
    var type = this.getFieldValue('TYPE');
    var device = Blockly.propc.valueToCode(this, 'DEVICE', Blockly.propc.ORDER_ATOMIC);
    var data = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_ATOMIC);

    Blockly.propc.global_vars_["i2c_idx"] = 'int __i2cIdx;';
    Blockly.propc.global_vars_["i2c_bffr"] = 'char *__i2cBffr;';    

    var code = '';
  
    if(data !== '') {
        code += data + ' = i2c_readData(i2cBusUD, ' + ack + ');\n';
    }

  return code;
};

Blockly.Blocks.eeprom_write = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput("DATA")
            .setCheck(null)
            .appendField("EEPROM write")
            .appendField(new Blockly.FieldDropdown([["number", "NUMBER"], ["text", "TEXT"], ["byte", "BYTE"]]), "TYPE");
        this.appendValueInput("ADDRESS")
            .setCheck("Number")
            .appendField("to address");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.eeprom_write = function () {
    var type = this.getFieldValue('TYPE');
    var address = Blockly.propc.valueToCode(this, 'ADDRESS', Blockly.propc.ORDER_ATOMIC);
    var data = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_ATOMIC) || '';
    
    Blockly.propc.global_vars_["i2c_eepromAddr"] = 'int __eeAddr;';
    //Blockly.propc.global_vars_["i2c_new_eebus"] = 'i2c *eeBus;';
    //Blockly.propc.setups_["i2c_eebus"] = 'eeBus = i2c_newbus(28, 29, 0);\n';
    
    var code = '// Make sure that the eeprom address does not overwrite the program memory.\n';
    code += '__eeAddr = ' + address + ';\n';
    code += 'if(__eeAddr < 0) __eeAddr = 0;\n';
    code += 'if(__eeAddr > 7675) __eeAddr = 7675;\n';
        
    if(data !== '') {
    
        if (type === 'BYTE') {
            code += 'ee_putByte((' + data + ' & 255), (32768 + __eeAddr) );\n';
        } else if (type === 'NUMBER') {
            code += 'ee_putInt(' + data + ', __eeAddr );\n';
        } else {
            code += 'ee_putStr(' + data + ', (strlen(' + data + ') + 1), __eeAddr );\n';        
        }
    }
    
    return code;
};

Blockly.Blocks.eeprom_read = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput("ADDRESS")
            .setCheck("Number")
            .appendField("EEPROM Read")
            .appendField(new Blockly.FieldDropdown([["number", "NUMBER"], ["text", "TEXT"], ["byte", "BYTE"]]), "TYPE")
            .appendField("from address");
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

Blockly.propc.eeprom_read = function () {
    var type = this.getFieldValue('TYPE');
    var address = Blockly.propc.valueToCode(this, 'ADDRESS', Blockly.propc.ORDER_ATOMIC);
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);    

    Blockly.propc.global_vars_["i2c_eepromAddr"] = 'int __eeAddr;';
    
    var code = '__eeAddr = ' + address + ';\n';
    code += 'if(__eeAddr < 0) __eeAddr = 0;\n';
    code += 'if(__eeAddr > 7675) __eeAddr = 7675;\n';
        
    if(data !== '') {
        if (type === 'BYTE') {
            code += 'ee_getByte((' + data + ' & 255), (32768 + __eeAddr) );\n';
        } else if (type === 'NUMBER') {
            code += 'ee_getInt(' + data + ', __eeAddr );\n';
        } else {
            Blockly.propc.global_vars_["i2c_eeBffr"] = 'char __eeBffr[1];';
            Blockly.propc.global_vars_["i2c_eeIdx"] = 'int __eeIdx = 0;';
            Blockly.propc.vartype_[data] = 'char *';   
            code += '// Get the string from EEPROM one character at a time until it finds the end of the string.\n';
            code += '__eeIdx = 0;\n';
            code += 'while(__eeIdx < 128) {\n  ee_getStr(__eeBffr, 1, __eeAddr + __eeIdx);\n';
            code += '  ' + data + '[__eeIdx] = __eeBffr[0];\n';
            code += '  if(' + data + '[__eeIdx] == 0) break;\n  __eeIdx++;\n}\n';
            code += '  if(__eeIdx >= 128) ' + data + '[127] = 0;\n';
        }
    }
    
    return code;
};
