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

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.propc.controls_repeat = function() {
    var type = this.getFieldValue('TYPE');
    var branch = Blockly.propc.statementToCode(this, 'DO');
    if (Blockly.propc.INFINITE_LOOP_TRAP) {
        branch = Blockly.propc.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var order = Blockly.propc.ORDER_UNARY_PREFIX;
    var code = '';
    switch (type) {
        case "FOREVER":
            code = 'while(1) {\n' + branch + '}\n';
            break;
        case "TIMES":
            var repeats = Blockly.propc.valueToCode(this, 'TIMES', order) || '0';
            code = 'for (int __n = 0; __n < ' + repeats + '; __n++) {\n' +
                    branch + '}\n';
            break;
        case "WHILE":
            var repeatCondition = Blockly.propc.valueToCode(this, 'REPEAT_CONDITION', order) || '0';
            code = 'while (' + repeatCondition + ') {\n' +
                    branch + '}\n';
            break;
        case "UNTIL":
            var repeatCondition = Blockly.propc.valueToCode(this, 'REPEAT_CONDITION', order) || '0';
            code = 'while (!(' + repeatCondition + ')) {\n' +
                    branch + '}\n';
            break;
    }
    return code;
};

Blockly.propc.controls_if = function() {
    // If/elseif/else condition.
    var n = 0;
    var argument = Blockly.propc.valueToCode(this, 'IF' + n,
            Blockly.propc.ORDER_NONE) || '0';
    var branch = Blockly.propc.statementToCode(this, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + branch + '}\n';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.propc.valueToCode(this, 'IF' + n,
                Blockly.propc.ORDER_NONE) || '0';
        branch = Blockly.propc.statementToCode(this, 'DO' + n);
        code += 'else if (' + argument + ') {\n' + branch + '}';
    }
    if (this.elseCount_) {
        branch = Blockly.propc.statementToCode(this, 'ELSE');
        code += 'else {\n' + branch + '}\n';
    }
    return code + '\n';
};

Blockly.Blocks.controls_if_return = {
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendValueInput('CONDITION')
                .appendField("if");
        this.appendDummyInput()
                .appendField("return");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.controls_if_return = function () {
    var argument = Blockly.propc.valueToCode(this, 'CONDITION', Blockly.propc.ORDER_NONE) || '0';

    return 'if (' + argument + ') {return;}\n';
};

Blockly.propc.control_repeat_for_loop = function () {
    var start = Blockly.propc.valueToCode(this, 'START', Blockly.propc.ORDER_NONE) || '1';
    var end = Blockly.propc.valueToCode(this, 'END', Blockly.propc.ORDER_NONE) || '10';
    var step = Blockly.propc.valueToCode(this, 'STEP', Blockly.propc.ORDER_NONE) || '1';
    var repeat_code = Blockly.propc.statementToCode(this, 'DO');
    var loop_counter = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    if (Number(start) < Number(end)) {
        var code = 'for (' + loop_counter + ' = ' + start + '; ' + loop_counter + ' <= ' + end + '; ' + loop_counter + ' += ' + step + ') {\n' + repeat_code + '\n}';
        return code;
    } else {
      var code = 'for (' + loop_counter + ' = ' + start + '; ' + loop_counter + ' >= ' + end + '; ' + loop_counter + ' -= ' + step + ') {\n' + repeat_code + '\n}';
      return code;
    }
};

Blockly.Blocks.controls_return = {
  init: function() {
    this.appendDummyInput()
        .appendField("return");

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setColour(colorPalette.getColor('programming'));
  }
};

Blockly.propc.controls_return = function() {
    return 'return;';
};
