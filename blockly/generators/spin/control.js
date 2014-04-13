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

Blockly.Language.controls_repeat_forever = {
    // Repeat forever.
    category: Blockly.LANG_CATEGORY_CONTROLS,
    helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
    init: function() {
        console.log("repeat forever");
        this.setColour(120);
        this.appendDummyInput()
                .appendTitle(Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT);
        this.appendStatementInput('DO')
                .appendTitle(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Spin = Blockly.Generator.get('Spin');



Blockly.Spin.controls_repeat = function() {
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

Blockly.Spin.controls_repeat_forever = function() {
    // Repeat forever
    var branch = Blockly.Spin.statementToCode(this, 'DO');
    if (Blockly.Spin.INFINITE_LOOP_TRAP) {
        branch = Blockly.Spin.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var code = 'repeat\n' +
            branch + '\n';
    return code;
};

