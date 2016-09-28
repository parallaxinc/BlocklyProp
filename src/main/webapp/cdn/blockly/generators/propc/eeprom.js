/*
  This file contains support for writing text/numbers to EEPROM
  Author: Vale Tolpegin (valetolpegin@gmail.com)
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

if ( !Blockly.Blocks )
  Blockly.Blocks = {};

Blockly.Blocks.eeprom_int_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("save an int to EEPROM");
        this.appendValueInput('VALUE')
            .appendField("value");
        this.appendDummyInput()
            .appendField("address")
            .appendField(new Blockly.FieldDropdown(profile.default.eeprom), "ADDRESS");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.eeprom_int_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("get an int from EEPROM")
            .appendField("address")
            .appendField(new Blockly.FieldDropdown(profile.default.eeprom), "ADDRESS");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.eeprom_float_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("save a float to EEPROM");
        this.appendValueInput('VALUE')
            .appendField("value");
        this.appendDummyInput()
            .appendField("address")
            .appendField(new Blockly.FieldDropdown(profile.default.eeprom), "ADDRESS");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
  }
};

Blockly.Blocks.eeprom_float_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("get a float from EEPROM")
            .appendField("address")
            .appendField(new Blockly.FieldDropdown(profile.default.eeprom), "ADDRESS");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
  }
};

Blockly.Blocks.eeprom_text_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("save text to EEPROM")
            .appendField("text")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(quotes.newQuote_(false));
        this.appendValueInput('VALUE')
            .appendField("text length");
        this.appendDummyInput()
            .appendField("address")
            .appendField(new Blockly.FieldDropdown(profile.default.eeprom), "ADDRESS");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
  }
};

Blockly.Blocks.eeprom_text_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("get text from EEPROM");
        this.appendValueInput('VALUE')
            .appendField("text length");
        this.appendDummyInput()
            .appendField("address")
            .appendField(new Blockly.FieldDropdown(profile.default.eeprom), "ADDRESS");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
  }
};

Blockly.propc.eeprom_int_to = function() {
  var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';
  var address = this.getFieldValue('ADDRESS');

  return 'ee_putInt(' + value + ', ' + address + ');\n';
};

Blockly.propc.eeprom_int_from = function() {
  var address = this.getFieldValue('ADDRESS');

  return 'ee_getInt(' + address + ')';
};

Blockly.propc.eeprom_float_to = function() {
  var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.ORDER_NONE) || '0';
  var address = this.getFieldValue('ADDRESS');

  return 'ee_putFloat32(' + value + ', ' + address + ')';
};

Blockly.propc.eeprom_float_from = function() {
  var address = this.getFieldValue('ADDRESS');

  return 'ee_getFloat32(' + address + ')';
};

Blockly.propc.eeprom_text_to = function() {
  var text = this.getFieldValue('TEXT');
  var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.ORDER_NONE) || '0';
  var address = this.getFieldValue('ADDRESS');

  return 'ee_putStr(' + value + ', ' + address + ')';
};

Blockly.propc.eeprom_text_from = function() {
  var address = this.getFieldValue('ADDRESS');

  return 'ee_getStr(' + address + ')';
};

Blockly.Blocks.eeprom_write = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
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
            code += 'ee_putInt(' + data + ', (32768 + __eeAddr) );\n';
        } else {
            code += 'ee_putStr(' + data + ', (strlen(' + data + ') + 1), (32768 + __eeAddr) );\n';        
        }
    }
    
    return code;
};

Blockly.Blocks.eeprom_read = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
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
            code += 'ee_getInt(' + data + ', (32768 + __eeAddr) );\n';
        } else {
            Blockly.propc.global_vars_["i2c_eeBffr"] = 'char __eeBffr[1];';
            Blockly.propc.global_vars_["i2c_eeIdx"] = 'int __eeIdx = 0;';
            Blockly.propc.vartype_[data] = 'char *';   
            code += '// Get the string from EEPROM one character at a time until it finds the end of the string.\n';
            code += '__eeIdx = 0;\n';
            code += 'while(__eeIdx < 128) {\n  ee_getStr(__eeBffr, 1, (32768 + __eeAddr) + __eeIdx);\n';
            code += '  ' + data + '[__eeIdx] = __eeBffr[0];\n';
            code += '  if(' + data + '[__eeIdx] == 0) break;\n  __eeIdx++;\n}\n';
            code += '  if(__eeIdx >= 128) ' + data + '[127] = 0;\n';
        }
    }
    
    return code;
};