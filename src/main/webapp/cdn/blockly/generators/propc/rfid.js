/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com

 *Copyright 2014 Vale Tolpegin.
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


Blockly.Blocks.rfid_get = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("get RFID's sensor value and store it:")
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER');

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

Blockly.Blocks.rfid_disable = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendTitle("disable RFID");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.rfid_enable = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("enable RFID in pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_IN");
        this.appendDummyInput()
            .appendField("out pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_OUT");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.rfid_close = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("close RFID");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.rfid_get = function() {
    var saveVariable = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return saveVariable + ' = rfid_get(rfid, 1000);\n';
};

Blockly.propc.rfid_disable = function() {
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return 'rfid_disable(rfid);\n';
};

Blockly.propc.rfid_enable = function() {
    var pin_in = this.getFieldValue('PIN_IN');
    var pin_out = this.getFieldValue('PIN_OUT');

    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';
    Blockly.propc.global_vars_["rfidser"] = 'rfidser *rfid;\n';
    if (Blockly.propc.setups_["rfidser" + pin_in] === undefined && Blockly.propc.setups_["rfidser" + pin_out] === undefined)
    {
        Blockly.propc.setups_["rfidser" + pin_in] = "rfid = rfid_open(" + pin_out + ", " + pin_in + ");"
    }

    return '';
};

Blockly.propc.rfid_close = function() {
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return 'rfidser_close(rfid);\n';
};
