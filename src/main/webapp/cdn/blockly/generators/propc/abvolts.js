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
            .appendField("ADC channel")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks.ab_volt_v_in = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("ADC in V channel")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks.ab_volt_out = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("DAC channel")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");
        this.appendValueInput("VALUE", Number)
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Value");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.ab_volt_v_out = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("DAC in V channel")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");
        this.appendValueInput("VALUE", Number)
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Value");

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

    var code = 'ad_in(' + dropdown_channel + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.ab_volt_v_in = function() {
    var dropdown_channel = this.getFieldValue('CHANNEL');

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt'] === undefined) {
        Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
    }

    var code = 'ad_volts(' + dropdown_channel + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.ab_volt_out = function() {
    var dropdown_channel = this.getFieldValue('CHANNEL');
    var value = this.getFieldValue('VALUE') || '0';

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt_out'] === undefined) {
        Blockly.propc.setups_['setup_abvolt_out'] = 'da_init(26, 27);';
    }

    var code = 'da_out(' + dropdown_channel + ', ' + value + ');\n';
    return code;
};

Blockly.propc.ab_volt_v_out = function() {
    var dropdown_channel = this.getFieldValue('CHANNEL');
    var value = this.getFieldValue('VALUE') || '0';

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt_out'] === undefined) {
        Blockly.propc.setups_['setup_abvolt_out'] = 'da_init(26, 27);';
    }

    var code = 'da_volts(' + dropdown_channel + ', ' + value + ');\n';
    return code;
};
