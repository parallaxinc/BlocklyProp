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
 * @fileoverview Generating Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.serial_open = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial initialize RX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "RXPIN")
                .appendField("TX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "TXPIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"]]), "BAUD");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.serial_tx = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial transmit")
                .appendField(new Blockly.FieldDropdown([
                    ["number (32-bit integer)", "INT"], 
                    ["byte (ASCII character)", "BYTE"] 
                    ]), "TYPE");
        this.appendValueInput('VALUE', Number)
                .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.serial_send_text = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
                .appendField("Serial transmit text")
                .setCheck('String');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.serial_rx = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial receive")
                .appendField(new Blockly.FieldDropdown([
                    ["number (32-bit integer)", "INT"], 
                    ["byte (ASCII character)", "BYTE"] 
                    ]), "TYPE")
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

Blockly.Blocks.serial_receive_text = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial receive text store in")
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

Blockly.propc.serial_open = function () {
    var dropdown_rx_pin = this.getFieldValue('RXPIN');
    var dropdown_tx_pin = this.getFieldValue('TXPIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    Blockly.propc.setups_['setup_fdserial'] = 'fdser = fdserial_open(' + dropdown_rx_pin + ', ' + dropdown_tx_pin + ', 0, ' + baud + ');';

    return '';
};

Blockly.propc.serial_tx = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

    if (Blockly.propc.setups_["setup_fdserial"] === undefined)
    {
        return '//Missing new serial port declaration\n';
    }

    if(type === "BYTE") {
        return 'fdserial_txChar(fdser, (' + data + ' & 0xFF) );\n';
    } else {
        var code = 'fdserial_txChar(fdser, (' + data + ' >> 24) & 255);\n'; 
        code += 'fdserial_txChar(fdser, (' + data + ' >> 16) & 255);\n';
        code += 'fdserial_txChar(fdser, (' + data + ' >> 8 ) & 255);\n';
        code += 'fdserial_txChar(fdser, ' + data + ' & 255);\n';
        
        return code;
    }
};

Blockly.propc.serial_send_text = function () {
    var text = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE);
   
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '//Missing new serial port declaration\n';
    }
    
    var code = 'dprint(fdser, "%s", ' + text + ');\n';
    //code += 'fdserial_txChar(fdser, 0 );\n';
    code += 'while(!fdserial_txEmpty(fdser));\n';
    code += 'pause(5);\n';
    
    return code;
};

Blockly.propc.serial_rx = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);    

    if (Blockly.propc.setups_["setup_fdserial"] === undefined)
    {
        return '//Missing new serial port declaration\n';
    }

    if(data !== '') {
        if(type === "BYTE") {
            return data + ' = fdserial_rxChar(fdser);\n';
        } else {
            return data + ' = (fdserial_rxChar(fdser) << 24) | (fdserial_rxChar(fdser) << 16) | (fdserial_rxChar(fdser) << 8) | fdserial_rxChar(fdser);\n';
        }
    } else {
        return '';
    }
};

Blockly.propc.serial_receive_text = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);    
    Blockly.propc.global_vars_["ser_rx"] = "int __idx;";

    //var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'),
    //        Blockly.Variables.NAME_TYPE);
    
    Blockly.propc.vartype_[data] = 'char *';
    
    if (Blockly.propc.setups_["setup_fdserial"] === undefined)
    {
        return '//Missing new serial port declaration\n';
    }

    if(data !== '') {
        var code = '__idx = 0;\n';
        code += 'do {\n';
        code += '  ' + data + '[__idx] = fdserial_rxChar(fdser);\n';
        code += '  __idx++;\n';
        code += '} while(fdserial_rxPeek(fdser) != 0);\n';    
        code += data + '[__idx] = 0;\nfdserial_rxFlush(fdser);\n';

        return code;
    } else {
        return '';
    }
};