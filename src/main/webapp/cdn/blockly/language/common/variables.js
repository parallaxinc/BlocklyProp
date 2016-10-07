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
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.variables_get = {
    // Variable getter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.MSG_VARIABLES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_VARIABLES_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput()
                .appendField(Blockly.LANG_VARIABLES_GET_TITLE)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true, null);
    },
    getVars: function() {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Blocks.variables_set = {
    // Variable setter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.MSG_VARIABLES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_VARIABLES_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('VALUE')
                .appendField(Blockly.LANG_VARIABLES_SET_TITLE)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
    getVars: function() {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};
