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
        this.setColour(colorPalette.getColor('protocols'));
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

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.oled_draw_line = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("X_ONE")
            .setCheck('Number')
            .appendField("draw line point one");
        this.appendValueInput("Y_ONE")
            .setCheck('Number')
            .appendField(",");
        this.appendValueInput("X_TWO")
            .setCheck('Number')
            .appendField("point two");
        this.appendValueInput("Y_TWO")
            .setCheck('Number')
            .appendField(",");
        this.appendDummyInput()
            .appendField("color")
            .appendField(new Blockly.FieldColour('#ff0000').setColours(['#f00','#0f0','#00f','#000','#888','#fff']).setColumns(3), "colorName");

        this.setInputsInline(true);
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

    Blockly.propc.setups_["oled"] = 'oledc_init(' + cs_pin + ', ' + dc_pin + ', ' + din_pin + ', ' + clk_pin + ', ' + res_pin + ', 2);';

    return '';
};

Blockly.propc.oled_draw_line = function () {
    var x_one = Blockly.propc.valueToCode(this, "X_ONE", Blockly.propc.ORDER_NONE);
    var y_one = Blockly.propc.valueToCode(this, "Y_ONE", Blockly.propc.ORDER_NONE);
    var x_two = Blockly.propc.valueToCode(this, "X_TWO", Blockly.propc.ORDER_NONE);
    var y_two = Blockly.propc.valueToCode(this, "Y_TWO", Blockly.propc.ORDER_NONE);

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.getFieldValue('colorName'));
    var color_red = parseInt(result[1], 16);
    var color_green = parseInt(result[2], 16);
    var color_blue = parseInt(result[3], 16);

    var code = 'oledc_drawLine(' + x_one + ', ' + y_one + ', ' + x_two + ', ' + y_two + ', oledc_color565(' + color_red + ', ' + color_green + ', ' + color_blue + '));\n';
    return code;
};
