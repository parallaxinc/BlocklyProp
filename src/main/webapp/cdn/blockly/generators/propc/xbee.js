/**
 * Visual Blocks Language
 *
 * Copyright 2016 Vale Tolpegin.
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
 * @fileoverview XBee blocks.
 * @author valetolpegin@gmail.com  (Vale Tolpegin)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.xbee_setup = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_XBEE_SETUP_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee initialize DI")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DO_PIN')
                .appendField("DO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DI_PIN')
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["9600", "9600"], ["2400", "2400"], ["4800", "4800"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"]]), "BAUD");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.xbee_transmit = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_XBEE_TRANSMIT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee transmit")
                .appendField(new Blockly.FieldDropdown([
                    ["text", "TEXT"], 
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

Blockly.Blocks.xbee_receive = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_XBEE_RECEIVE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee receive")
                .appendField(new Blockly.FieldDropdown([
                    ["text", "TEXT"], 
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

Blockly.propc.xbee_setup = function () {
    var do_pin = this.getFieldValue('DO_PIN');
    var di_pin = this.getFieldValue('DI_PIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    Blockly.propc.global_vars_["xbee"] = "fdserial *xbee;";
    Blockly.propc.setups_["xbee"] = 'xbee = fdserial_open(' + di_pin + ', ' + do_pin + ', 0, ' + baud + ');\n';

    return '';
};

Blockly.propc.xbee_transmit = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

    if (Blockly.propc.setups_["xbee"] === undefined)
    {
        return '//Missing xbee initialization\n';
    }

    if(type === "BYTE") {
        return 'fdserial_txChar(xbee, (' + data + ' & 0xFF) );\n';
    } else if(type === "INT") {
        return 'dprint(xbee, "%d\\r", ' + data + ');\n';
    } else {   
        var code = 'dprint(xbee, "%s\\r", ' + data + ');\n';
        //code += 'fdserial_txChar(xbee, 0 );\n';
        code += 'while(!fdserial_txEmpty(xbee));\n';
        code += 'pause(5);\n';

        return code;
    }
};

Blockly.propc.xbee_receive = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
    var type = this.getFieldValue('TYPE');

    if (Blockly.propc.setups_["xbee"] === undefined)
    {
        return '//Missing xbee initialization\n';
    }

    if(type === "BYTE") {
        return  data + ' = fdserial_rxChar(xbee);\n';
    } else if(type === "INT") {
        return 'dscan(xbee, "%d", &' + data + ');\n';
    } else {  
        Blockly.propc.global_vars_["xbee_rx"] = "int __XBidx;";
        Blockly.propc.vartype_[data] = 'char *';
           
        var code = '__XBidx = 0;\n';
        code += 'while(1) {\n';
        code += '  ' + data + '[__XBidx] = fdserial_rxChar(xbee);\n';
        code += '  if(' + data + '[__XBidx] == 13 || ' + data + '[__XBidx] == 10) break;\n';
        code += '  __XBidx++;\n';
        code += '}\n';    
        code += data + '[__XBidx] = 0;\nfdserial_rxFlush(xbee);\n';
        return code;
    }
};
