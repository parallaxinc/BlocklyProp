/*

 This file supports joystick use in propc

 Author: Vale Tolpegin ( vale@tolpegin.net )

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

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.joystick_input_yaxis = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("joystick")
            .appendField("A/D y-axis pin#")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "PINY");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks.joystick_input_xaxis = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("joystick")
            .appendField("A/D x-axis pin#")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "PINX");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.joystick_input_yaxis = function() {
    var pin_number_yaxis = this.getFieldValue('PINY');

    Blockly.propc.definitions_["include abvolts"] = '#include "abvolts.h"';

    var code = 'ad_in(' + pin_number_yaxis + ') * 100 / 4096';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.joystick_input_xaxis = function() {
    var pin_number_xaxis = this.getFieldValue('PINX');

    Blockly.propc.definitions_["include abvolts"] = '#include "abvolts.h"';

    var code = 'ad_in(' + pin_number_xaxis + ') * 100 / 4096';
    return [code, Blockly.propc.ORDER_ATOMIC];
};
