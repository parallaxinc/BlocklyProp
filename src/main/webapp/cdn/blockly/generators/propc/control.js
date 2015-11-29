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

Blockly.Blocks.controls_repeat = {
    helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
    init: function () {
        this.setColour(120);
        // ["with", "WITH"]
        var PROPERTIES = [["forever", "FOREVER"], ["x times", "TIMES"], ["until", "UNTIL"], ["while", "WHILE"]];
        var fieldDropdown = new Blockly.FieldDropdown(PROPERTIES, function (type) {
            this.sourceBlock_.updateShape_(type);
        });
        this.appendDummyInput()
                .appendField("repeat");
        this.appendDummyInput("REPEAT").appendField(fieldDropdown, "TYPE");
        this.appendStatementInput("DO")
                .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
        this.setInputsInline(true);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var type = this.getFieldValue('TYPE');
        container.setAttribute('type', type);
        return container;
    },
    domToMutation: function (xmlElement) {
        var type = xmlElement.getAttribute('type');
        //var type = this.getFieldValue('TYPE');
        this.updateShape_(type);
    },
    updateShape_: function (type) {
        // Add or remove a Value Input.
        var inputTimes = this.getInput('TIMES');
        if (type === 'TIMES') {
            if (!inputTimes) {
                this.appendValueInput('TIMES')
                        .setCheck('Number');
                this.moveInputBefore('TIMES', 'REPEAT');
            }
        } else {
            if (inputTimes) {
                this.removeInput('TIMES');
            }
        }
        var inputCondition = this.getInput('REPEAT_CONDITION');
        if (type === 'WHILE' || type === 'UNTIL') {
            if (!inputCondition) {
                this.appendValueInput('REPEAT_CONDITION')
                        .setCheck(Boolean);
                this.moveInputBefore('REPEAT_CONDITION', 'DO');
            }
        } else {
            if (inputCondition) {
                this.removeInput('REPEAT_CONDITION');
            }
        }
    }
};

Blockly.propc.controls_repeat = function () {
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
            code = 'for (int n = 0; n < ' + repeats + '; n++) {\n' +
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

Blockly.propc.controls_if = function () {
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
