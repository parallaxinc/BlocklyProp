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
 * @fileoverview Logic blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.logic_compare = {
    // Comparison operator.
    category: Blockly.LANG_CATEGORY_LOGIC,
    init: function() {
        if(profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
	this.setTooltip(Blockly.MSG_LOGIC_COMPARE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
            .setCheck("Number");
        this.appendValueInput('B')
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        //var thisBlock = this;
        //this.setTooltip(function () {
        //    var op = thisBlock.getFieldValue('OP');
        //    return Blockly.Language.logic_compare.TOOLTIPS[op];
        //});
    }
};

Blockly.Blocks.logic_compare.OPERATORS =
        [['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['<', 'LT'],
            ['\u2264', 'LTE'],
            ['>', 'GT'],
            ['\u2265', 'GTE']];

//Blockly.Blocks.logic_compare.TOOLTIPS = {
//    EQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ,
//    NEQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ,
//    LT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
//    LTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE,
//    GT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT,
//    GTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE
//};

Blockly.Blocks.logic_operation = {
    // Logical operations: 'and', 'or'.
    category: Blockly.LANG_CATEGORY_LOGIC,
    init: function() {
        if(profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
	this.setTooltip(Blockly.MSG_LOGIC_OPERATION_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
                .setCheck('Number');
        this.appendValueInput('B')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
//    var thisBlock = this;
//    this.setTooltip(function() {
//      var op = thisBlock.getFieldValue('OP');
//      return Blockly.Language.logic_operation.TOOLTIPS[op];
//    });
    }
};

Blockly.Blocks.logic_operation.OPERATORS =
        [[Blockly.LANG_LOGIC_OPERATION_AND, 'AND'],
            [Blockly.LANG_LOGIC_OPERATION_OR, 'OR'],
            ['and not', 'AND_NOT'],
            ['or not', 'OR_NOT']];

Blockly.Blocks.logic_operation.TOOLTIPS = {
    AND: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND,
    OR: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR
};

Blockly.Blocks.logic_negate = {
    // Negation.
    category: Blockly.LANG_CATEGORY_LOGIC,
    init: function() {
        if(profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_NUMBERS_HELPURL);
        }
	this.setTooltip(Blockly.MSG_LOGIC_NEGATE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('BOOL')
                .setCheck('Number')
                .appendField(Blockly.LANG_LOGIC_NEGATE_INPUT_NOT);
    //    this.setTooltip(Blockly.LANG_LOGIC_NEGATE_TOOLTIP);
    }
};

Blockly.Blocks.logic_boolean = {
    // Boolean data type: true and false.
    category: Blockly.LANG_CATEGORY_LOGIC,
    helpUrl: Blockly.MSG_VALUES_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_LOGIC_BOOLEAN_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.setOutput(true, 'Number');
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'BOOL');
    //    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP);
    }
};

Blockly.Blocks.logic_boolean.OPERATORS =
        [[Blockly.LANG_LOGIC_BOOLEAN_TRUE, 'TRUE'],
            [Blockly.LANG_LOGIC_BOOLEAN_FALSE, 'FALSE']];

Blockly.Blocks.logic_null = {
    // Null data type.
    category: Blockly.LANG_CATEGORY_LOGIC,
    helpUrl: Blockly.LANG_LOGIC_NULL_HELPURL,
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.setOutput(true, null);
        this.appendDummyInput()
                .appendField(Blockly.LANG_LOGIC_NULL);
        this.setTooltip(Blockly.LANG_LOGIC_NULL_TOOLTIP);
    }
};

Blockly.Blocks.combine_strings = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_COMBINE_STRINGS_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("STRA")
            .setCheck("String")
            .appendField("combine string");
        this.appendValueInput("STRB")
            .setCheck("String")
            .appendField("with string");
        this.appendDummyInput()
            .appendField("store in")
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.combine_strings = function () {
    var strA = Blockly.propc.valueToCode(this, 'STRA', Blockly.propc.ORDER_ATOMIC) || '';
    var strB = Blockly.propc.valueToCode(this, 'STRB', Blockly.propc.ORDER_ATOMIC) || '';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
    var code = '';

    Blockly.propc.vartype_[data] = 'char *';

    if(strA !== '' && strB !== '') {
        Blockly.propc.definitions_['str_Buffer'] = 'char *__scBfr;';

        code += 'sprint(__scBfr, "%s%s", ' + strA + ', ' + strB + ');\n'; 
        code += 'strcpy(' + data + ', __scBfr);\n'; 
    } else if(strA !== ''){           
         code += 'strcpy(' + data + ', ' + strB + ');\n'; 
    } else if(strB !== ''){           
         code += 'strcpy(' + data + ', ' + strA + ');\n'; 
    } else {            
        code += '// Both of the strings to combine are blank!\n';
    }
    return code;
};

Blockly.Blocks.find_substring = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_FIND_SUBSTRING_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("SUBSTR")
            .setCheck("String")
            .appendField("find location of text");
        this.appendValueInput("STR")
            .setCheck("String")
            .appendField("in string");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
  }
};

Blockly.propc.find_substring = function () {
    var subs = Blockly.propc.valueToCode(this, 'SUBSTR', Blockly.propc.ORDER_ATOMIC) || '';
    var strs = Blockly.propc.valueToCode(this, 'STR', Blockly.propc.ORDER_ATOMIC) || '';

    Blockly.propc.definitions_['find_sub'] = 'int find_sub(char *__strS, char *__subS) { char* __pos = strstr(__strS, __subS); return (__pos - __strS + 1); }\n';
    
    var code = '';

    if(subs !== '' && strs !== '') {
        code += 'find_sub(' + strs + ', ' + subs + ')'; 
    } else {           
        code += '0'; 
    }
    
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.get_char_at_position = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_GET_CHAR_AT_POSITION_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("POSITION")
            .setCheck("Number")
            .appendField("get character at position");
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        },

        getVars: function () {
            return [this.getFieldValue('VALUE')];
        },

        renameVar: function (oldName, newName) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
                this.setTitleValue(newName, 'VALUE');
            }
      }
};

Blockly.propc.get_char_at_position = function () {
    var pos = Blockly.propc.valueToCode(this, 'POSITION', Blockly.propc.ORDER_ATOMIC) || '1';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);

    var code = '0';
    
    if(Blockly.propc.vartype_[data] === 'char *') 
    {
        code = data + '[(' + pos + '>strlen(' + data + ')?strlen(' + data + '):' + pos + ')-1]';
    }
    
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.set_char_at_position = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_SET_CHAR_AT_POSITION_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("POSITION")
            .setCheck("Number")
            .appendField("set character at position");
        this.appendDummyInput()
            .appendField("of string")
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.appendValueInput("CHAR")
            .setCheck("Number")
            .appendField("to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.set_char_at_position = function () {
    var pos = Blockly.propc.valueToCode(this, 'POSITION', Blockly.propc.ORDER_ATOMIC) || '1';
    var chr = Blockly.propc.valueToCode(this, 'CHAR', Blockly.propc.ORDER_ATOMIC) || '32';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);

    return data + '[(' + pos + '>strlen(' + data + ')?strlen(' + data + '):' + pos + ')-1] = (' + chr + ' & 0xFF)\n;';
};

Blockly.Blocks.get_substring = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_GET_SUBSTRING_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendDummyInput()
            .appendField("get part of string")
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'FROM_STR');
        this.appendValueInput("START")
            .setCheck("Number")
            .appendField("from position");
        this.appendValueInput("END")
            .setCheck("Number")
            .appendField("to position");
        this.appendDummyInput()
            .appendField("store in")
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'TO_STR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.get_substring = function () {
    var sst = Blockly.propc.valueToCode(this, 'START', Blockly.propc.ORDER_ATOMIC) || '1';
    var snd = Blockly.propc.valueToCode(this, 'END', Blockly.propc.ORDER_ATOMIC) || '2';
    var frStr = Blockly.propc.variableDB_.getName(this.getFieldValue('FROM_STR'), Blockly.Variables.NAME_TYPE);
    var toStr = Blockly.propc.variableDB_.getName(this.getFieldValue('TO_STR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.vartype_[toStr] = 'char *';
    Blockly.propc.definitions_['str_Buffer'] = 'char *__scBfr;';

    var code = '';
    
    if(Blockly.propc.vartype_[frStr] === 'char *') 
    {
        Blockly.propc.definitions_['__ssIdx'] = 'int __ssIdx, __stIdx;';

        code += '__stIdx = 0;\nfor(__ssIdx = (' + sst + '-1); __ssIdx <= (' + snd +' <= strlen(' + frStr + ')?' + snd +':strlen(' + frStr + '))-1; __ssIdx++) {\n__scBfr[__stIdx] = ' + frStr + '[__ssIdx]; __stIdx++; }\n';
        code += 'strcpy(' + toStr + ', __scBfr);\n';
    }
    
    return code;
};

Blockly.Blocks.string_compare = {
    helpUrl: Blockly.MSG_STRINGS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_STRING_COMPARE_TOOLTIP);
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput("STRA")
            .setCheck("String")
            .appendField("string");
        this.appendValueInput("STRB")
            .setCheck("String")
            .appendField(new Blockly.FieldDropdown([["is the same as", "EQUAL"], ["is not the same as", "NOT"], ["is alphabetically before", "BEFORE"], ["is alphabetically after", "AFTER"]]), "COMP");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.string_compare = function () {
    var strA = Blockly.propc.valueToCode(this, 'STRA', Blockly.propc.ORDER_ATOMIC) || '';
    var strB = Blockly.propc.valueToCode(this, 'STRB', Blockly.propc.ORDER_ATOMIC) || '';
    var comp = this.getFieldValue('COMP');

    Blockly.propc.definitions_['str_comp'] = 'int str_comp(char *__strA, char *__strB) { return strcmp(__strA, __strB); }';
    
    var code = '';

    if(strA !== '' && strB !== '') {
        if(comp === 'EQUAL') code += 'str_comp(' + strA + ', ' + strB + ') == 0';
        if(comp === 'BEFORE') code += 'str_comp(' + strA + ', ' + strB + ') < 0';
        if(comp === 'AFTER') code += 'str_comp(' + strA + ', ' + strB + ') > 0';
        if(comp === 'NOT') code += 'str_comp(' + strA + ', ' + strB + ') != 0';  
    } else {           
        code += '0'; 
    }
    
    return [code, Blockly.propc.ORDER_NONE];
};