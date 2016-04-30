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
 * @fileoverview Control blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.controls_if = {
    // If/elseif/else condition.
    category: Blockly.LANG_CATEGORY_CONTROLS,
    helpUrl: Blockly.LANG_CONTROLS_IF_HELPURL,
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendValueInput('IF0')
                .setCheck(Boolean)
                .appendField(Blockly.LANG_CONTROLS_IF_MSG_IF);
        this.appendStatementInput('DO0')
                .appendField(Blockly.LANG_CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['controls_if_elseif',
            'controls_if_else']));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.LANG_CONTROLS_IF_TOOLTIP_1;
            } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.LANG_CONTROLS_IF_TOOLTIP_2;
            } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.LANG_CONTROLS_IF_TOOLTIP_3;
            } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.LANG_CONTROLS_IF_TOOLTIP_4;
            }
            return '';
        });
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    },
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
        this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
        for (var x = 1; x <= this.elseifCount_; x++) {
            this.appendValueInput('IF' + x)
                    .setCheck(Boolean)
                    .appendField(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('DO' + x)
                    .appendField(Blockly.LANG_CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                    .appendField(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
        }
    },
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 1; x <= this.elseifCount_; x++) {
            var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        // Disconnect the else input blocks and remove the inputs.
        if (this.elseCount_) {
            this.removeInput('ELSE');
        }
        this.elseCount_ = 0;
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var x = this.elseifCount_; x > 0; x--) {
            this.removeInput('IF' + x);
            this.removeInput('DO' + x);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                    var ifInput = this.appendValueInput('IF' + this.elseifCount_)
                            .setCheck(Boolean)
                            .appendField(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
                    var doInput = this.appendStatementInput('DO' + this.elseifCount_);
                    doInput.appendField(Blockly.LANG_CONTROLS_IF_MSG_THEN);
                    // Reconnect any child blocks.
                    if (clauseBlock.valueConnection_) {
                        ifInput.connection.connect(clauseBlock.valueConnection_);
                    }
                    if (clauseBlock.statementConnection_) {
                        doInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    var elseInput = this.appendStatementInput('ELSE');
                    elseInput.appendField(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
                    // Reconnect any child blocks.
                    if (clauseBlock.statementConnection_) {
                        elseInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
        }
    },
    saveConnections: function (containerBlock) {
        // Store a pointer to any connected child blocks.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    var inputIf = this.getInput('IF' + x);
                    var inputDo = this.getInput('DO' + x);
                    clauseBlock.valueConnection_ =
                            inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                    x++;
                    break;
                case 'controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
        }
    }
};

Blockly.Blocks.controls_if_if = {
    // If condition.
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(Blockly.LANG_CONTROLS_IF_IF_TITLE_IF);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.LANG_CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks.controls_if_elseif = {
    // Else-If condition.
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks.controls_if_else = {
    // Else condition.
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks.controls_repeat = {
    helpUrl: Blockly.LANG_CONTROLS_REPEAT_HELPURL,
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
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