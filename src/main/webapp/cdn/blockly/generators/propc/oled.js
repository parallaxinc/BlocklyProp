/**
 * Visual Blocks Language
 *
 * Copyright 2016 Vale Tolpegin
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
 * @fileoverview Generating Prop-C & UI for OLED blocks.
 * @author valetolpegin@gmail.com (Vale Tolpegin)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.oled_initialize = {
  init: function() {
    this.appendDummyInput()
        .appendField("OLED initialize")
        .appendField("CS")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "CS")
        .appendField("D/C")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "DC")
        .appendField("DIN")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "DIN")
        .appendField("CLK")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK")
        .appendField("RES")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "RES");
    this.appendDummyInput()
        .appendField("large font")
        .appendField(new Blockly.FieldDropdown([["Sans", "Sans"], ["Serif", "Serif"], ["Script", "Script"], ["Bubble", "Bubble"]]), "LARGE_FONT")
        .appendField("medium font")
        .appendField(new Blockly.FieldDropdown([["Sans", "Sans"], ["Serif", "Serif"], ["Script", "Script"], ["Bubble", "Bubble"]]), "MEDIUM_FONT");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.propc.oled_initialize = function () {
    var cs_pin = this.getFieldValue("CS");
    var dc_pin = this.getFieldValue("DC");
    var din_pin = this.getFieldValue("DIN");
    var clk_pin = this.getFieldValue("CLK");
    var res_pin = this.getFieldValue("RES");
    var large_font = this.getFieldValue("LARGE_FONT");
    var medium_font = this.getFieldValue("MEDIUM_FONT");

    Blockly.propc.definitions_["oled_large_font"] = '#include "oledc_fontLarge' + large_font + '.h"';
    Blockly.propc.definitions_["oled_medium_font"] = '#include "oledc_fontMedium' + medium_font + '.h"';
    Blockly.propc.setups_["oled"] = 'oledc_init(' + cs_pin + ', ' + dc_pin + ', ' + din_pin + ', ' + clk_pin + ', ' + res_pin + ', 2);';

    return '';
};
