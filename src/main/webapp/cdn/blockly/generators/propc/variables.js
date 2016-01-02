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
 * @fileoverview Generating Prop-C for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.variables_get = {
    // Variable getter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendDummyInput("")
                .appendField(Blockly.LANG_VARIABLES_GET_TITLE_1)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true, null);
        //      this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP_1);
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

Blockly.Blocks.variables_declare = {
    // Variable setter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE', null)
                .appendField('Declare')
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR')
                .appendField("as")
                .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["char", "char"], ["unsigned int", "unsigned int"], ["signed char", "signed char"]]), "TYPE")
                .appendField("value");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
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
    helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE')
                .appendField(Blockly.LANG_VARIABLES_SET_TITLE_1)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR').appendField('=');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
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


/**
 * @fileoverview Generating propc for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */

//Blockly.propc = new Blockly.Generator('propc');

Blockly.propc.variables_get = function() {
    // Variable getter.
    var code = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.variables_declare = function() {
    // Variable setter.
    var dropdown_type = this.getFieldValue('TYPE');
    //TODO: settype to variable
    var argument0 = Blockly.propc.valueToCode(this, 'VALUE',
            Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    Blockly.propc.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';\n';
    Blockly.propc.vartype_[varName] = dropdown_type;
    return '';
};

Blockly.propc.variables_set = function() {
    // Variable setter.
    var argument0 = Blockly.propc.valueToCode(this, 'VALUE',
            Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    if (Blockly.propc.vartype_[varName] === undefined) {
        Blockly.propc.vartype_[varName] = 'int';
    }
    return varName + ' = ' + argument0 + ';\n';
};
