/*

 This file contains support for multi cog use in Propeller C

 Author: valetolpegin@gmail.com ( Vale Tolpegin )

 *Copyright 2014 Vale Tolpegin.
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
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.cog_new = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("cognew");
        this.appendValueInput("STACK_SIZE", Number)
            .appendField("Stacksize")
            .setCheck('Number');
        this.appendStatementInput("METHOD")
            .appendField("Method");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.cog_end = {
    init: function() {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("Stop a cog:")
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'COG');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function() {
        return [this.getFieldValue('COG')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('COG'))) {
            this.setTitleValue(newName, 'COG');
        }
    }
}

Blockly.propc.cog_new = function() {
    var method = Blockly.propc.statementToCode(this, 'METHOD');
    method = method.replace("  ", "").replace("\n", "").replace("()", "").replace(";", "");
    var stackSize = Blockly.propc.valueToCode(this, 'STACK_SIZE', Blockly.propc.ORDER_NONE) || '10';

    var code = 'cog_run(' + method + ', ' + stackSize + ')';
    return code;
};

Blockly.propc.cog_end = function() {
    var cog = Blockly.variableDB_.getName(this.getFieldValue('COG'), Blockly.Variables.NAME_TYPE);

    var code = 'cog_end(' + cog + ');\n';
    return code;
};
