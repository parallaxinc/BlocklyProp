/*
  This file contains support for serial connections in Spin
  
  Author: Vale Tolpegin ( valetolpegin@gmail.com )
*/

/*
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
'use strict';

//define blocks
if (!Blockly.Language)
    Blockly.Language = {};


Blockly.Language.serial_open = {
    category: 'Serial',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput("")
                .appendTitle("Serial init")
                .appendTitle("rxPIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "RXPIN")
                .appendTitle("txPIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "TXPIN");
        this.appendDummyInput("")
                .appendTitle("Baud")
                .appendTitle(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"]]), "BAUD");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Language.serial_tx_byte = {
    category: 'Serial',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput("")
                .appendTitle("Serial transmit");
        this.appendValueInput('VALUE').setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
//        this.setInputsInline(true);
    }
};

Blockly.Language.serial_send_text = {
    category: 'Serial',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput("")
                .appendTitle("Serial transmit")
                .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
                        'media/quote0.png', 12, 12))
                .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
                .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
                        'media/quote1.png', 12, 12));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Language.serial_rx_byte = {
    category: 'Serial',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput("")
                .appendTitle("Serial read byte");
        this.setOutput(true, Number);
//        this.setInputsInline(true);
    }
};

// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.serial_open = function() {
    var dropdown_rx_pin = this.getTitleValue('RXPIN');
    var dropdown_tx_pin = this.getTitleValue('TXPIN');
    var baud = this.getTitleValue('BAUD');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    Blockly.propc.setups_['setup_fdserial'] = 'fdser = fdserial_open(' + dropdown_rx_pin + ', ' + dropdown_tx_pin + ', 0, ' + baud + ');';

    return '';
};

Blockly.propc.serial_tx_byte = function() {
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_UNARY_PREFIX) || '0';
    
    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '';
    }

    return 'fdserial_txChar(fdser, ' + value + ');\n';
};

Blockly.propc.serial_send_text = function() {
    var text = this.getTitleValue('TEXT');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '';
    }

    return 'writeLine(fdser, "' + text + '");\n';
};

Blockly.propc.serial_rx_byte = function() {
    
    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '';
    }
    
//    var order = code < 0 ?
//            Blockly.Spin.ORDER_UNARY_PREFIX : Blockly.Spin.ORDER_ATOMIC;
    return ['fdserial_rxCheck(fdser)', Blockly.propc.ORDER_ATOMIC];
};
