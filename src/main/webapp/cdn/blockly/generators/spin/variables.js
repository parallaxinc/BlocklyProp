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
 * @fileoverview Generating Spin for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.variables_get = {
    // Variable getter.
    category: null, // Variables are handled specially.
    init: function () {
        if(profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_VARIABLES_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_VARIABLES_HELPURL);
        }
	this.setTooltip(Blockly.MSG_VARIABLES_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput("")
                .appendField(Blockly.LANG_VARIABLES_GET_TITLE_1)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Blocks.variables_declare = {
    // Variable setter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
    init: function () {
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('VALUE', null)
                .appendField('Declare')
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR')
                .appendField("as")
                .appendField(new Blockly.FieldDropdown([["Long", "long"], ["Word", "word"], ["Byte", "byte"]]), "TYPE")
                .appendField("value");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Blocks.variables_set = {
    // Variable setter.
    category: null, // Variables are handled specially.
    init: function () {
        if(profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_VARIABLES_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_VARIABLES_HELPURL);
        }
	this.setTooltip(Blockly.MSG_VARIABLES_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('VALUE')
                .appendField(Blockly.LANG_VARIABLES_SET_TITLE_1)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR').appendField('=');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Spin.variables_get = function () {
    // Variable getter.
    var code = Blockly.Spin.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.variables_declare = function () {
    // Variable setter.
    var dropdown_type = this.getFieldValue('TYPE');
    //TODO: settype to variable
    var argument0 = Blockly.Spin.valueToCode(this, 'VALUE',
            Blockly.Spin.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.Spin.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    Blockly.Spin.setups_['setup_var' + varName] = varName + ' := ' + argument0 + '\n';
    Blockly.Spin.vartype_[varName] = dropdown_type;
    return '';
};

Blockly.Spin.variables_set = function () {
    // Variable setter.
    var argument0 = Blockly.Spin.valueToCode(this, 'VALUE',
            Blockly.Spin.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.Spin.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    if (Blockly.Spin.vartype_[varName] === undefined) {
        Blockly.Spin.vartype_[varName] = 'long';
    }
    return varName + ' := ' + argument0 + '\n';
};
