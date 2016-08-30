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
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee setup DI")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DO_PIN')
                .appendField("DO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DI_PIN');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.xbee_transmit = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee transmit data")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('BUFFER')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER'))) {
            this.setTitleValue(newName, 'BUFFER');
        }
    }
};

Blockly.Blocks.xbee_receive = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee receive data and store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('BUFFER')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER'))) {
            this.setTitleValue(newName, 'BUFFER');
        }
    }
};

Blockly.propc.xbee_setup = function () {
    var do_pin = this.getFieldValue('DO_PIN');
    var di_pin = this.getFieldValue('DI_PIN');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    Blockly.propc.global_vars_["xbee"] = "fdserial *xbee;";
    Blockly.propc.setups_["xbee"] = 'xbee = fdserial_open(' + di_pin + ', ' + do_pin + ', 0, 9600);\n';

    return '';
};

Blockly.propc.xbee_transmit = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    var code = 'dprint(xbee, "%d\\n", ' + data + ');\n';
    return code;
};

Blockly.propc.xbee_receive = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    var code = 'dscan(xbee, "%d", &' + data + ');\n';
    return code;
};
