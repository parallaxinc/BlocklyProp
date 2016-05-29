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

Blockly.Blocks.MX2125_acceleration_xaxis = {
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("MX2125 X-axis pin#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINX");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, Number);
    }
};

Blockly.Blocks.MX2125_acceleration_yaxis = {
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("MX2125 Y-axis pin#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINY");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, Number);
    }
};

Blockly.Blocks.MMA7455_acceleration = {
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("MMA7455 X-axis pin#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINX")
        this.appendValueInput('VARX')
            .appendField("Store X-axis value");
        this.appendDummyInput()
            .appendField("MMA7455 Y-axis pin#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINY")
        this.appendValueInput('VARY')
            .appendField("Store Y-axis value");
        this.appendDummyInput()
            .appendField("MMA7455 Z-axis pin#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINZ")
        this.appendValueInput('VARZ')
            .appendField("Store Z-axis value");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.propc.MX2125_acceleration_xaxis = function() {
    var pin = this.getFieldValue('PINX');

    Blockly.propc.definitions_["include_mx2125"] = '#include "mx2125.h"';

    return 'mx_tilt(' + pin + ')';
};

Blockly.propc.MX2125_acceleration_yaxis = function() {
    var pin = this.getFieldValue('PINY');

    Blockly.propc.definitions_["include_mx2125"] = '#include "mx2125.h"';

    return 'mx_tilt(' + pin + ')';
};

Blockly.propc.MMA7455_acceleration = function() {
    var pinx = this.getFieldValue('PINX');
    var piny = this.getFieldValue('PINY');
    var pinz = this.getFieldValue('PINZ');

    var xstorage = Blockly.propc.valueToCode(this, 'VARX');
    var ystorage = Blockly.propc.valueToCode(this, 'VARY');
    var zstorage = Blockly.propc.valueToCode(this, 'VARZ');

    Blockly.propc.definitions_["include_mma7455"] = '#include "mma7455.h"';
    Blockly.propc.setups_["mma_7455"] = 'MMA7455_init(' + pinx + ', ' + piny + ', ' + pinz + ');\n';

    return 'MMA7455_getxyz10(&' + xstorage + ', &' + ystorage + ', &' + zstorage + ');\n';
};
