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
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_RFID_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("RFID store reading in")
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
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_RFID_DISABLE_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("RFID")
            .appendField(new Blockly.FieldDropdown([
                    ["disable", "DISABLE"], 
                    ["enable", "ENABLE"] 
                    ]), "ACTION");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.rfid_enable = {
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_RFID_ENABLE_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("RFID initialize EN")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_IN");
        this.appendDummyInput()
            .appendField("SOUT")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_OUT");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.rfid_close = {
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_RFID_CLOSE_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("RFID close");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.rfid_get = function() {
    var saveVariable = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.global_vars_["rfid_buffer"] = "char *rfidBfr;";
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    var code = 'rfidBfr = rfid_get(rfid, 500);\n\tsscan(&rfidBfr[2], "%x", &' + saveVariable + ');\n\tif(' + saveVariable + ' == 237) ' + saveVariable + ' = 0;';
    return code;
};

Blockly.propc.rfid_disable = function() {
    var data = this.getFieldValue('ACTION');
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    if(data === "ENABLE") {
        return 'rfid_enable(rfid);\n';
    } else {
        return 'rfid_disable(rfid);\n';    
    }
};

Blockly.propc.rfid_enable = function() {
    var pin_in = this.getFieldValue('PIN_IN');
    var pin_out = this.getFieldValue('PIN_OUT');

    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';
    Blockly.propc.global_vars_["rfidser"] = 'rfidser *rfid;';
    Blockly.propc.setups_["rfidser_setup"] = 'rfid = rfid_open(' + pin_out + ',' + pin_in + ');';

    return '';
};

Blockly.propc.rfid_close = function() {
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return 'rfidser_close(rfid);\n';
};
