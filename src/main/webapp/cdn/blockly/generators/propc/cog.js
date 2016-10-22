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
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_COG_NEW_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
            .appendField("new processor");
        this.appendStatementInput("METHOD")
            .appendField("function");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.cog_new = function() {
    var method = Blockly.propc.statementToCode(this, 'METHOD');
    method = method.replace("  ", "").replace("\n", "").replace("()", "").replace(";", "");

    var code = 'cog_run(' + method + ', 128);\n';
    return code;
};
