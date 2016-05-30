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
            .appendField("Get RFID");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.rfid_disable = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendTitle("Disable RFID");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.rfid_enable = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Enable RFID in pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_IN");
        this.appendDummyInput()
            .appendField("Out pin")
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
            .appendField("Close RFID");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.rfid_get = function() {
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return 'rfid_get(rfid, 1000)';
};

Blockly.propc.rfid_disable = function() {
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return 'rfid_disable();\n';
};

Blockly.propc.rfid_enable = function() {
    var pin_in = this.getFieldValue('PIN_IN');
    var pin_out = this.getFieldValue('PIN_OUT');

    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';
    if (Blockly.propc.setups_["rfidser" + pin_in] === undefined && Blockly.propc.setups_["rfidser" + pin_out] === undefined)
    {
        Blockly.propc.setups_["rfidser" + pin_in] = "rfidser *rfid = rfid_open(" + pin_out + ", " + pin_in + ");"
    }

    return 'rfid_enable();\n';
};

Blockly.propc.rfid_close = function() {
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return 'rfid_close();\n';
};
