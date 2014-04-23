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

if (!Blockly.Language)
    Blockly.Language = {};

Blockly.Language.variables_get = {
    // Variable getter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendDummyInput("")
                .appendTitle(Blockly.LANG_VARIABLES_GET_TITLE_1)
                .appendTitle(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true, null);
        //      this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP_1);
    },
    getVars: function() {
        return [this.getTitleValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Language.variables_declare = {
    // Variable setter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE', null)
                .appendTitle('Declare')
                .appendTitle(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR')
                .appendTitle("as")
                .appendTitle(new Blockly.FieldDropdown([["Long", "long"], ["Word", "word"], ["Byte", "byte"]]), "TYPE")
                .appendTitle("value");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
    },
    getVars: function() {
        return [this.getTitleValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Language.variables_set = {
    // Variable setter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE')
                .appendTitle(Blockly.LANG_VARIABLES_SET_TITLE_1)
                .appendTitle(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR').appendTitle('=');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
    },
    getVars: function() {
        return [this.getTitleValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};


/**
 * @fileoverview Generating Spin for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */

Blockly.Spin = Blockly.Generator.get('Spin');

Blockly.Spin.variables_get = function() {
    // Variable getter.
    var code = Blockly.Spin.variableDB_.getName(this.getTitleValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.variables_declare = function() {
    // Variable setter.
    var dropdown_type = this.getTitleValue('TYPE');
    //TODO: settype to variable
    var argument0 = Blockly.Spin.valueToCode(this, 'VALUE',
            Blockly.Spin.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.Spin.variableDB_.getName(this.getTitleValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    Blockly.Spin.setups_['setup_var' + varName] = varName + ' := ' + argument0 + '\n';
    Blockly.Spin.vartype_[varName] = dropdown_type;
    return '';
};

Blockly.Spin.variables_set = function() {
    // Variable setter.
    var argument0 = Blockly.Spin.valueToCode(this, 'VALUE',
            Blockly.Spin.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.Spin.variableDB_.getName(this.getTitleValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    if (Blockly.Spin.vartype_[varName] === undefined) {
        Blockly.Spin.vartype_[varName] = 'long';
    }
    return varName + ' := ' + argument0 + '\n';
};
