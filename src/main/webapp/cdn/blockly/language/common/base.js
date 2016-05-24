/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Control blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.cog_new = {
    helpUrl: 'help/block-cognew.html',
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField('Cognew ');

        this.appendValueInput("STACK_SIZE", 'Number')
                .appendField("Stacksize")
                .setCheck('Number');

        this.appendStatementInput("METHOD")
                .appendField("Method");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};


Blockly.Blocks.base_delay = {
    helpUrl: 'help/block-delay.html',
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendValueInput("DELAY_TIME", 'Number')
                .appendField("Delay (ms)")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Delay specific time');
    }
};

Blockly.Blocks.base_freqout = {
    helpUrl: '',
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("Freq PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendValueInput("DURATION", 'Number')
                .appendField("Duration (ms)")
                .setCheck('Number');
        this.appendValueInput("FREQUENCY", 'Number')
                .appendField("frequecy (hz)")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Frequency output');
    }
};

Blockly.Blocks.rc_charge_discharge = {
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
            .appendField("RC")
            .appendField(new Blockly.FieldDropdown([["Charge", "0"], ["Discharge", "1"]]), "STATE");
        this.appendDummyInput("")
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('RC Output');
    }
};
