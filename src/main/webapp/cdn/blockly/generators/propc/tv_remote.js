/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com

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

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.sirc_get = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Sony remote value received at pin#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.sirc_get = function() {
    var pin = this.getFieldValue('PIN');

    Blockly.propc.definitions_["sirc"] = '#include "sirc.h"';
    Blockly.propc.setups_["sirc"] = "sirc_setTimeout(70);\n";

    var code = 'sirc_button(' + pin + ')';
    return [code, Blockly.propc.ORDER_NONE];
};
