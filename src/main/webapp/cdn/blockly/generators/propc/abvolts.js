/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo
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
 * @fileoverview Generating C for ActivityBoard ADC
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.ab_volt_in = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("A/D channel")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL")
            .appendField("read (0-5V) in volt-100ths");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks.ab_volt_out = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("D/A channel")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "CHANNEL")
                .appendField("output (0-3.3V)");
                this.appendValueInput("VALUE")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("volt-100ths");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.ab_volt_in = function() {
    var dropdown_channel = this.getFieldValue('CHANNEL');

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt'] === undefined) {
        Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
    }

    var code = '(ad_in(' + dropdown_channel + ') * 500 / 4096)';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.propc.ab_volt_out = function() {
    var dropdown_channel = this.getFieldValue('CHANNEL');
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt_out'] === undefined) {
        Blockly.propc.setups_['setup_abvolt_out'] = 'da_init(26, 27);';
    }

    var code = 'da_out(' + dropdown_channel + ', (' + value + '* 256 / 330));\n';
    return code;
};
