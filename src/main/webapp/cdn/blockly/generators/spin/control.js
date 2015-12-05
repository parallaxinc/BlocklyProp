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

Blockly.Spin.controls_repeat = function () {
    var type = this.getFieldValue('TYPE');
    var branch = Blockly.Spin.statementToCode(this, 'DO');
    if (Blockly.Spin.INFINITE_LOOP_TRAP) {
        branch = Blockly.Spin.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    if (branch === '') {
        branch = '  waitcnt(0)';
    }
    var order = Blockly.Spin.ORDER_UNARY_PREFIX;
    var code = '';
    switch (type) {
        case "FOREVER":
            code = 'repeat\n' + branch + '\n';
            break;
        case "TIMES":
            var repeats = Blockly.Spin.valueToCode(this, 'TIMES', order) || '0';
            code = 'repeat ' + repeats + '\n' +
                    branch + '\n';
            break;
        case "WHILE":
            var repeatCondition = Blockly.Spin.valueToCode(this, 'REPEAT_CONDITION', order) || 'TRUE';
            code = 'repeat while ' + repeatCondition + '\n' +
                    branch + '\n';
            break;
        case "UNTIL":
            var repeatCondition = Blockly.Spin.valueToCode(this, 'REPEAT_CONDITION', order) || 'TRUE';
            code = 'repeat until ' + repeatCondition + '\n' +
                    branch + '\n';
            break;
    }
    return code;
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


