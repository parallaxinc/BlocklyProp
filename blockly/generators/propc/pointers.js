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

if (!Blockly.Language)
    Blockly.Language = {};

Blockly.Language.pointers_get = {
    // Variable getter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendDummyInput("")
                .appendTitle(Blockly.LANG_VARIABLES_GET_TITLE)
                .appendTitle(new Blockly.FieldPointer(
                        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true, null);
        //      this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP_1);
    },
    getPointers: function() {
        return [this.getTitleValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Language.pointers_declare = {
    // Variable setter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE', null)
                .appendTitle('Declare')
                .appendTitle(new Blockly.FieldPointer(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR')
                .appendTitle("as")
                .appendTitle(new Blockly.FieldDropdown([["file", "FILE*"]]), "TYPE")
                .appendTitle("value");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
    },
    getPointers: function() {
        return [this.getTitleValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Language.pointers_set = {
    // Variable setter.
    category: null, // Variables are handled specially.
    helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
    init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE')
                .appendTitle(Blockly.LANG_VARIABLES_SET_TITLE)
                .appendTitle(new Blockly.FieldPointer(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR').appendTitle('=');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
//        this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
    },
    getPointers: function() {
        return [this.getTitleValue('VAR')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};


/**
 * @fileoverview Generating propc for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */

Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.pointers_get = function() {
    // Variable getter.
    var code = Blockly.propc.pointerDB_.getName(this.getTitleValue('VAR'),
            Blockly.Pointers.NAME_TYPE);
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.pointers_declare = function() {
    // Variable setter.
    var dropdown_type = this.getTitleValue('TYPE');
    //TODO: settype to variable
    var argument0 = Blockly.propc.valueToCode(this, 'VALUE',
            Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.propc.pointerDB_.getName(this.getTitleValue('VAR'),
            Blockly.Pointers.NAME_TYPE);
    Blockly.propc.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';\n';
    Blockly.propc.pointerType_[varName] = dropdown_type;
    return '';
};

Blockly.propc.pointers_set = function() {
    // Variable setter.
    var argument0 = Blockly.propc.valueToCode(this, 'VALUE',
            Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.propc.pointerDB_.getName(this.getTitleValue('VAR'),
            Blockly.Pointers.NAME_TYPE);
    if (Blockly.propc.pointerType_[varName] === undefined) {
        Blockly.propc.pointerType_[varName] = 'int';
    }
    return varName + ' = ' + argument0 + ';\n';
};
