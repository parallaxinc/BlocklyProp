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
        var fieldDropdown = new Blockly.FieldDropdown([["forever", "FOREVER"], ["x times", "TIMES"], ["with", "WITH"], ["until", "UNTIL"], ["while", "WHILE"]], function (type) {
            this.sourceBlock_.updateShape_(type);
        });
        var fieldTimes = new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator);
        fieldTimes.setVisible(false);
        this.appendDummyInput("REPEAT")
                .appendField("repeat")
                .appendField(fieldTimes, 'TIMES')
                .appendField(fieldDropdown, "TYPE");
        this.appendStatementInput('DO')
                .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
        this.setInputsInline(true);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var type = this.getFieldValue('TYPE');
        container.setAttribute('TYPE', type);
        return container;
    },
    domToMutation: function (xmlElement) {
        var type = xmlElement.getAttribute('TYPE');
        this.updateShape_(type);
    },
    updateShape_: function (type) {
        // Add or remove a Value Input.
        var fieldTimes = this.getField_('TIMES');
        if (type === 'TIMES') {
            if (fieldTimes) {
                fieldTimes.setVisible(true);
            }
        } else {
            fieldTimes.setVisible(false);
        }
        var inputCondition = this.getInput('REPEAT_CONDITION');
        if (type === 'WHILE' || type === 'UNTIL') {
            if (!inputCondition) {
                this.appendValueInput('REPEAT_CONDITION')
                        .setCheck('Number');
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
    // Repeat n times.
    var repeats = Number(this.getFieldValue('TIMES'));
    var branch = Blockly.propc.statementToCode(this, 'DO');
    if (Blockly.propc.INFINITE_LOOP_TRAP) {
        branch = Blockly.propc.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var code = 'for (int n = 0; n < ' + repeats + '; n++) {\n' +
            branch + '}\n';
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

