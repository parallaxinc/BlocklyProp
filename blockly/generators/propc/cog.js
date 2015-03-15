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

if (!Blockly.Language)
    Blockly.Language = {};


Blockly.Language.cog_new = {
    category: 'Control',
    helpUrl: '',
    init: function () {
        this.setColour(120);
        this.appendDummyInput()
            .appendTitle("run");
        this.appendValueInput("STACK_SIZE", Number)
            .appendTitle("Stacksize")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendTitle( "variable" )
            .appendTitle(new Blockly.FieldPointer(Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
        this.appendStatementInput("METHOD")
            .appendTitle("Method");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
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

Blockly.Language.cog_end = {
    category: 'Control',
    helpUrl: '',
    init: function() {
        this.setColour( 120 );
        this.appendValueInput( 'COG' )
            .appendTitle( "End cog" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

//get generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.cog_new = function () {
    var varName = Blockly.propc.pointerDB_.getName(this.getTitleValue('VAR'), Blockly.Pointers.NAME_TYPE);
    var method = Blockly.propc.statementToCode(this, 'METHOD');
    method = method.replace("  ", "").replace("\n", "").replace("()", "").replace(";", "");
    var stackSize = Blockly.propc.valueToCode(this, 'STACK_SIZE', Blockly.propc.ORDER_NONE) || '10';

    var code = varName + ' = int * cog_run(' + method + ', ' + stackSize + ');\n';
    return code;
};

Blockly.propc.cog_end = function() {
    var cog = Blockly.propc.valueToCode(this, 'COG', Blockly.propc.ORDER_NONE);
    
    var code = 'cog_end( ' + cog + ' );\n';
    return code;
};