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
            .appendField("Save an int to EEPROM");
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
            .appendField("Get an int from EEPROM")
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
            .appendField("Save a float to EEPROM");
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
            .appendField("Get a float from EEPROM")
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
            .appendField("Save text to EEPROM")
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
            .appendField("Get text from EEPROM");
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
