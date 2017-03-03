/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo, Vale Tolpegin
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
 * @fileoverview Generating C for variable blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 *         valetolpegin@gmail.com    (Vale Tolpegin)
 *         jewald@parallax.com       (Jim Ewald)
 *         mmatz@parallax.com        (Matthew Matz)
 *         kgracey@parallax.com      (Ken Gracey)
 *         carsongracey@gmail.com    (Carson Gracey)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.variables_get = {
    // Variable getter.
    helpUrl: Blockly.MSG_VARIABLES_HELPURL,
    init: function () {
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
    init: function () {
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('VALUE', null)
                .appendField('Declare')
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR')
                .appendField("as")
                .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["char", "char"], ["unsigned int", "unsigned int"], ["signed char", "signed char"]]), "TYPE")
                .appendField("value");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
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
    helpUrl: Blockly.MSG_VARIABLES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_VARIABLES_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('VALUE')
                .appendField(Blockly.LANG_VARIABLES_SET_TITLE_1)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR').appendField('=');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
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


/**
 * @fileoverview Generating propc for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */

Blockly.propc.variables_get = function () {
    // Variable getter.
    var code = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.variables_declare = function () {
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

Blockly.propc.variables_set = function () {
    // Variable setter.
    var argument0 = Blockly.propc.valueToCode(this, 'VALUE',
            Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    if (Blockly.propc.vartype_[varName] === undefined) {
        if (argument0.indexOf("int") > -1) {
            Blockly.propc.vartype_[varName] = 'int';
            Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
        } else if (argument0.indexOf("float") > -1) {
            Blockly.propc.vartype_[varName] = 'float';
            Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
        } else if (argument0.indexOf("char") > -1) {
            Blockly.propc.vartype_[varName] = 'char';
            Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
        } else if (argument0.indexOf("char\[\]") > -1) {
            Blockly.propc.vartype_[varName] = 'char *';
        } else if (argument0.indexOf("\"") > -1) {
            Blockly.propc.vartype_[varName] = 'char *';
        } else if (argument0.indexOf(".") > -1) {
            Blockly.propc.vartype_[varName] = 'float';
        } else if (argument0.indexOf("true") > -1 || argument0.indexOf("false") > -1) {
            Blockly.propc.vartype_[varName] = 'boolean';
        } else {
            Blockly.propc.vartype_[varName] = 'int';
        }
    } else if (argument0.indexOf("int") > -1) {
        Blockly.propc.vartype_[varName] = 'int';
        Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
    } else if (argument0.indexOf("float") > -1) {
        Blockly.propc.vartype_[varName] = 'float';
        Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
    } else if (argument0.indexOf("char") > -1) {
        Blockly.propc.vartype_[varName] = 'char';
        Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
    } else if (argument0.indexOf("char\[\]") > -1) {
        Blockly.propc.vartype_[varName] = 'char *';
    }

    return varName + ' = ' + argument0 + ';\n';
};




Blockly.Blocks.array_get = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('NUM')
                .appendField('Array')
                .appendField(new Blockly.FieldTextInput('list'), 'VAR')
                .appendField('element');
        this.setInputsInline(true);
        this.setOutput(true, null);
    }
};

Blockly.propc.array_get = function () {
    var varName = this.getFieldValue('VAR');
    var element = Blockly.propc.valueToCode(this, 'NUM', Blockly.propc.ORDER_NONE) || '0';
    var list = Blockly.propc.global_vars_;

    var code = varName + '[' + element + ']';

    if (Object.keys(list).indexOf('__ARRAY' + varName) < 0) {
        return '// ERROR: The array "' + varName + '" has not been initialized!\n';
    } else {
        return [code, Blockly.propc.ORDER_ATOMIC];
    }
};

Blockly.Blocks.array_init = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput()
                .appendField('Array initialize')
                .appendField(new Blockly.FieldTextInput('list'), 'VAR')
                .appendField("with")
                .appendField(new Blockly.FieldTextInput('10',
                        Blockly.FieldTextInput.numberValidator), 'NUM')
                .appendField("elements");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.propc.array_init = function () {
    var varName = this.getFieldValue('VAR');
    var element = this.getFieldValue('NUM') || '10';

    Blockly.propc.global_vars_['__ARRAY' + varName] = 'int ' + varName + '[' + element + '];\n';

    return '';
};

Blockly.Blocks.array_fill = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput()
                .appendField('Array fill')
                .appendField(new Blockly.FieldTextInput('list'), 'VAR')
                .appendField("with values")
                .appendField(new Blockly.FieldTextInput('10,20,30,40,50'), 'NUM');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.propc.array_fill = function () {
    var varName = this.getFieldValue('VAR');
    var varVals = this.getFieldValue('NUM');
    varVals = varVals.replace(/[^0-9,-\.]/g, "");
    varVals = varVals.replace(/\b\.\w+,\b/g, ",");
    varVals = varVals.replace(/,\s*$/, "");
    var noCommas = varVals.replace(/,/g, "");

    var elements = varVals.length - noCommas.length + 1;
    var elemCount = 0;

    var initStr = Blockly.propc.global_vars_['__ARRAY' + varName];

    var code = '';

    if (initStr) {
        initStr = initStr.replace("int " + varName + "[", "");
        elemCount = parseInt(initStr, 10);

        if (elements > elemCount) {
            code += '// WARNING: You are trying to add more elements to your\n';
            code += '//          array than you initialized your array with!\n';
            elements = elemCount;
        }
        code += 'int __tmpArr[] = {' + varVals + '};\n';
        code += 'memcpy(' + varName + ', __tmpArr, ' + elements + ' * sizeof(int));\n';
    } else {
        code += '// ERROR: The array "' + varName + '" has not been initialized!\n';
    }
    
    return code;
};

Blockly.Blocks.array_set = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('NUM')
                .appendField('Array')
                .appendField(new Blockly.FieldTextInput('list'), 'VAR')
                .appendField('element');
        this.appendValueInput('VALUE')
                .appendField('=');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.propc.array_set = function () {
    var varName = this.getFieldValue('VAR');
    var element = Blockly.propc.valueToCode(this, 'NUM', Blockly.propc.ORDER_NONE) || '0';
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';
    var list = Blockly.propc.global_vars_;

    if (Object.keys(list).indexOf('__ARRAY' + varName) < 0) {
        return '// ERROR: The array "' + varName + '" has not been initialized!\n';
    } else {
        return varName + '[' + element + '] = ' + value + ';\n';
    }
};

Blockly.Blocks.array_clear = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_CLEAR_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput()
                .appendField('Array clear')
                .appendField(new Blockly.FieldTextInput('list'), 'VAR');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.propc.array_clear = function () {
    var varName = this.getFieldValue('VAR');
    var list = Blockly.propc.global_vars_;

    if (Object.keys(list).indexOf('__ARRAY' + varName) < 0) {
        return '// ERROR: The array "' + varName + '" has not been initialized!\n';
    } else {
        return 'memset(' + varName + ', 0, sizeof ' + varName + ');\n';
    }
};