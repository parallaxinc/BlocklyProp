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
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"]]), "BAUD");

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
                    ["byte", "BYTE"], 
                    ["text", "%s"],
                    ["decimal number", "%d"], 
                    ["hexadecimal number", "%x"], 
                    ["binary number", "%b"] 
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

        this.appendDummyInput("")
                .appendField("Serial transmit")
                .appendField(quotes.newQuote_(true))
                .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                .appendField(quotes.newQuote_(false));
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
                    ["byte", "BYTE"], 
                    ["text", "%s"],
                    ["decimal number", "%d"], 
                    ["hexadecimal number", "%x"], 
                    ["binary number", "%b"] 
                    ]), "TYPE")
                .appendField("store in");
        this.appendValueInput('VALUE')
                .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
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
        return 'dprint(fdser, "' + type + '", ' + data + ');\n';
    }
};

Blockly.propc.serial_send_text = function () {
    var text = this.getFieldValue('TEXT');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '';
    }

    return 'writeLine(fdser, "' + text + '");\n';
};

Blockly.propc.serial_rx = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '';

    if (Blockly.propc.setups_["setup_fdserial"] === undefined)
    {
        return '//Missing new serial port declaration\n';
    }

    if(data !== '') {
        if(type === "BYTE") {
            return data + ' = fdserial_rxChar(fdser);\n';
        } else {
            return 'dscan(fdser, "' + type + '", &' + data + ');\n';
        }
    } else {
        return '';
    }
};
