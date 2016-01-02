/**
 * Visual Blocks Language
 *
 * Copyright 2014 Creating Future.
 * http://www.creatingfuture.eu/
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
 * @fileoverview Scribbler blocks for Blockly.
 * @author michel@creatingfuture.eu (Michel Lampo)
 */
'use strict';

Blockly.Blocks.move = {
    category: Blockly.LANG_CATEGORY_CONTROLS,
    helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
    init: function() {
        this.setColour(120);
        this.appendDummyInput()
                .appendField('Move');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Blocks.line_sensor = {
    category: Blockly.LANG_CATEGORY_CONTROLS,
    helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
    init: function() {
        this.setColour(120);
        this.appendDummyInput()
                .appendField('Line sensor').appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Right", "RIGHT"], ["Either", "EITHER"], ["Both", "BOTH"], ["Neither", "NEITHER"]]), "STAT");
        this.setOutput(true, 'boolean');
        this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
    }
};