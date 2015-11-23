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

Blockly.Blocks.controls_repeat = {
    helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
    init: function () {
        this.setColour(120);
        this.appendDummyInput()
                .appendField(Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT)
                .appendField(new Blockly.FieldTextInput('10',
                        Blockly.FieldTextInput.numberValidator), 'TIMES')
                .appendField(Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES);
        this.appendStatementInput('DO')
                .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Blocks.controls_repeat_forever = {
    // Repeat forever.
    helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
    init: function () {
        this.setColour(120);
        this.appendDummyInput()
                .appendField(Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT);
        this.appendStatementInput('DO')
                .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Spin.controls_if = function () {
    // If/elseif/else condition.
    var n = 0;
    var argument = Blockly.Spin.valueToCode(this, 'IF' + n,
            Blockly.Spin.ORDER_NONE) || 'FALSE';
    var branch = Blockly.Spin.statementToCode(this, 'DO' + n);
    var code = 'if ' + argument + '\n' + branch + '\n';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.Spin.valueToCode(this, 'IF' + n,
                Blockly.Spin.ORDER_NONE) || 'FALSE';
        branch = Blockly.Spin.statementToCode(this, 'DO' + n);
        code += ' elseif ' + argument + '\n' + branch + '';
    }
    if (this.elseCount_) {
        branch = Blockly.Spin.statementToCode(this, 'ELSE');
        code += 'else\n' + branch + '\n';
    }
    return code + '\n';
};

Blockly.Spin.controls_repeat = function () {
    // Repeat n times.
    var repeats = Number(this.getTitleValue('TIMES'));
    var branch = Blockly.Spin.statementToCode(this, 'DO');
    if (Blockly.Spin.INFINITE_LOOP_TRAP) {
        branch = Blockly.Spin.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var code = 'repeat ' + repeats + '\n' +
            branch + '\n';
    return code;
};

Blockly.Spin.controls_repeat_forever = function () {
    // Repeat forever
    var branch = Blockly.Spin.statementToCode(this, 'DO');
    if (Blockly.Spin.INFINITE_LOOP_TRAP) {
        branch = Blockly.Spin.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    if (branch === '') {
        branch = '  waitcnt(0)';
    }
    var code = 'repeat\n' +
            branch + '\n';
    return code;
};

