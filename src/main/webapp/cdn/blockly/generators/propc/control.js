/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo, Vale Tolpegin
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
 * @fileoverview Generating C for control blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 *         valetolpegin@gmail.com    (Vale Tolpegin)
 *         jewald@parallax.com       (Jim Ewald)
 *         mmatz@parallax.com        (Matthew Matz)
 *         kgracey@parallax.com      (Ken Gracey)
 *         carsongracey@gmail.com    (Carson Gracey)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.controls_repeat = {
    init: function () {
        var block_label = 'repeat';
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_CONTROL_HELPURL);
            this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LOOP_TOOLTIP);
            block_label = 'loop';
        } else {
            this.setHelpUrl(Blockly.MSG_CONTROL_HELPURL);
            this.setTooltip(Blockly.MSG_CONTROLS_REPEAT_TOOLTIP);
        }
        this.setColour(colorPalette.getColor('programming'));
        // ["with", "WITH"]
        var PROPERTIES = [["forever", "FOREVER"], ["x times", "TIMES"], ["until", "UNTIL"], ["while", "WHILE"]];
        var fieldDropdown = new Blockly.FieldDropdown(PROPERTIES, function (type) {
            this.sourceBlock_.updateShape_(type);
        });
        this.appendDummyInput()
                .appendField(block_label);
        this.appendDummyInput("REPEAT")
                .appendField(fieldDropdown, "TYPE");
        this.appendStatementInput("DO")
                .appendField(Blockly.LANG_CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
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

Blockly.Blocks.controls_if = {
    // If/elseif/else condition.
    category: Blockly.LANG_CATEGORY_CONTROLS,
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_CONTROL_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_CONTROL_HELPURL);
        }
        this.setTooltip(Blockly.MSG_CONTROLS_IF_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendValueInput('IF0')
                .setCheck('Number')
                .appendField(Blockly.LANG_CONTROLS_IF_MSG_IF);
        this.appendStatementInput('DO0')
                .appendField(Blockly.LANG_CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['controls_if_elseif',
            'controls_if_else']));
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
                    .setCheck('Number')
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
                            .setCheck('Number')
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
        this.setPreviousStatement(true, "Block");
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
        this.setPreviousStatement(true, "Block");
        this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
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

/*
 * Disabled/Unused
 
 Blockly.Blocks.controls_if_return = {
 init: function () {
 this.setColour(colorPalette.getColor('programming'));
 this.appendValueInput('CONDITION')
 .appendField("if");
 this.appendDummyInput()
 .appendField("return");
 this.setInputsInline(true);
 this.setPreviousStatement(true, "Block");
 this.setNextStatement(true, null);
 }
 };
 
 Blockly.propc.controls_if_return = function () {
 var argument = Blockly.propc.valueToCode(this, 'CONDITION', Blockly.propc.ORDER_NONE) || '0';
 
 return 'if (' + argument + ') {return;}\n';
 };
 */

Blockly.Blocks.control_repeat_for_loop = {
    init: function () {
        var block_label = 'repeat';
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_CONTROL_HELPURL);
            this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LIMITED_LOOP_TOOLTIP);
            block_label = 'loop';
        } else {
            this.setHelpUrl(Blockly.MSG_CONTROL_HELPURL);
            this.setTooltip(Blockly.MSG_CONTROL_REPEAT_FOR_LOOP_TOOLTIP);
        }
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(block_label)
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.appendValueInput('START')
                .setCheck('Number')
                .appendField("from");
        this.appendValueInput('END')
                .setCheck('Number')
                .appendField("to");
        this.appendValueInput('STEP')
                .setCheck('Number')
                .appendField("by");
        this.appendStatementInput("DO")
                .appendField("do");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};

Blockly.propc.control_repeat_for_loop = function () {
    var start = Blockly.propc.valueToCode(this, 'START', Blockly.propc.ORDER_NONE) || '1';
    var end = Blockly.propc.valueToCode(this, 'END', Blockly.propc.ORDER_NONE) || '10';
    var step = Blockly.propc.valueToCode(this, 'STEP', Blockly.propc.ORDER_NONE) || '1';
    var repeat_code = Blockly.propc.statementToCode(this, 'DO');
    var loop_counter = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code = '';

    if (isNaN(parseFloat(start)) || !isFinite(start) || isNaN(parseFloat(end)) || !isFinite(end)) {
        if (isNaN(parseFloat(step)) || !isFinite(step)) {
            code += 'for (' + loop_counter + ' = ' + start + '; ' + loop_counter + ' <= ' + end + '; ' + loop_counter + ' += abs(' + step + ')) {\n' + repeat_code + '\n}';
        } else {
            if (Number(step) < 0)
                code += 'for (' + loop_counter + ' = ' + start + '; ' + loop_counter + ' >= ' + end + '; ' + loop_counter + ' += (' + step + ')) {\n' + repeat_code + '\n}';
            else if (Number(step) > 0)
                code += 'for (' + loop_counter + ' = ' + start + '; ' + loop_counter + ' <= ' + end + '; ' + loop_counter + ' += (' + step + ')) {\n' + repeat_code + '\n}';
            else if (Number(step) === 0)
                code += '// ERROR: Your "step" size cannot be 0 (zero)!\n' + repeat_code;
        }
    } else {
        if (Number(start) < Number(end)) {
            code += 'for (' + loop_counter + ' = ' + start + '; ' + loop_counter + ' <= ' + end + '; ' + loop_counter + ' += abs(' + step + ')) {\n' + repeat_code + '\n}';
        } else {
            code += 'for (' + loop_counter + ' = ' + start + '; ' + loop_counter + ' >= ' + end + '; ' + loop_counter + ' -= abs(' + step + ')) {\n' + repeat_code + '\n}';
        }
    }
    return code;
};

Blockly.Blocks.controls_return = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONTROLS_RETURN_TOOLTIP);
        this.appendDummyInput()
                .appendField("return");

        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.propc.controls_return = function () {
    return 'return;';
};

Blockly.Blocks.controls_break = {
    helpUrl: Blockly.MSG_CONTROL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONTROLS_BREAK_TOOLTIP);
        this.appendDummyInput()
                .appendField("break");

        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.propc.controls_break = function () {
    return 'break;';
};

Blockly.Blocks.controls_select = {
    // If/elseif/else condition.
    category: Blockly.LANG_CATEGORY_CONTROLS,
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_CONTROL_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_CONTROL_HELPURL);
        }
        this.setTooltip(Blockly.MSG_CONTROLS_SELECT_TOOLTIP);
        this.setColour(colorPalette.getColor('programming'));
        this.appendValueInput('SWITCH')
                .appendField('switch');
        this.appendValueInput('SEL1')
                .setCheck('Number')
                .appendField('case');
        this.appendStatementInput('CASE1')
                .appendField('do (then break')
                .appendField(new Blockly.FieldCheckbox("TRUE"), 'BREAK1')
                .appendField(')');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['controls_select_case',
            'controls_select_default']));
        this.elseifCount_ = 1;
        this.elseCount_ = 0;
    },
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('case', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('default', 1);
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        this.elseifCount_ = window.parseInt(xmlElement.getAttribute('case'), 10);
        this.elseCount_ = window.parseInt(xmlElement.getAttribute('default'), 10);
        for (var x = 1; x <= this.elseifCount_; x++) {
            var theInput = this.getInput('SEL' + x);
            if (!theInput) {
                this.appendValueInput('SEL' + x)
                        .setCheck('Number')
                        .appendField('case');
                this.appendStatementInput('CASE' + x)
                        .appendField('do (then break')
                        .appendField(new Blockly.FieldCheckbox("TRUE"), 'BREAK' + x)
                        .appendField(')');
            }
        }
        if (this.elseCount_) {
            this.appendStatementInput('DEFAULT')
                    .appendField('default');
        }
    },
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'controls_select_select');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 1; x <= this.elseifCount_; x++) {
            var elseifBlock = Blockly.Block.obtain(workspace, 'controls_select_case');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = Blockly.Block.obtain(workspace, 'controls_select_default');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        // Disconnect the else input blocks and remove the inputs.
        if (this.elseCount_) {
            this.removeInput('DEFAULT');
        }
        this.elseCount_ = 0;
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var x = this.elseifCount_; x > 0; x--) {
            this.removeInput('SEL' + x);
            this.removeInput('CASE' + x);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_select_case':
                    this.elseifCount_++;
                    var ifInput = this.appendValueInput('SEL' + this.elseifCount_)
                            .setCheck('Number')
                            .appendField('case');
                    var doInput = this.appendStatementInput('CASE' + this.elseifCount_);
                    doInput.appendField('do (then break')
                            .appendField(new Blockly.FieldCheckbox("TRUE"), 'BREAK' + this.elseifCount_)
                            .appendField(')');
                    // Reconnect any child blocks.
                    if (clauseBlock.valueConnection_) {
                        ifInput.connection.connect(clauseBlock.valueConnection_);
                    }
                    if (clauseBlock.statementConnection_) {
                        doInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                case 'controls_select_default':
                    this.elseCount_++;
                    var elseInput = this.appendStatementInput('DEFAULT');
                    elseInput.appendField('default');
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
                case 'controls_select_case':
                    var inputIf = this.getInput('SEL' + x);
                    var inputDo = this.getInput('CASE' + x);
                    clauseBlock.valueConnection_ =
                            inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                            inputDo && inputDo.connection.targetConnection;
                    x++;
                    break;
                case 'controls_select_default':
                    var inputDo = this.getInput('DEFAULT');
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


Blockly.Blocks.controls_select_select = {
    // If condition.
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField('switch');
        this.appendStatementInput('STACK');
        this.setInputsInline(false);
        this.contextMenu = false;
    }
};

Blockly.Blocks.controls_select_case = {
    // Else-If condition.
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField('case');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks.controls_select_default = {
    // Else condition.
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField('default');
        this.setPreviousStatement(true, "Block");
        this.contextMenu = false;
    }
};

Blockly.propc.controls_select = function () {
    // If/elseif/else condition.
    var n = 0;
    var start = Blockly.propc.valueToCode(this, 'SWITCH', Blockly.propc.ORDER_NONE) || '0';
    var argument = ''; //Blockly.propc.valueToCode(this, 'SEL' + n, Blockly.propc.ORDER_NONE) || '0';
    var breaking = ''; //this.getFieldValue('BREAK' + n);
    var branch = ''; //Blockly.propc.statementToCode(this, 'CASE' + n);
    var code = 'switch(' + start + ') {\n';
    //code += 'case ' + argument + ':\n' + branch;
    if (breaking === true || breaking === 'TRUE' || breaking === 'true')
        code += 'break;\n';
    for (n = 1; n <= this.elseifCount_; n++) {
        argument = Blockly.propc.valueToCode(this, 'SEL' + n, Blockly.propc.ORDER_NONE) || '0';
        branch = Blockly.propc.statementToCode(this, 'CASE' + n);
        code += 'case ' + argument + ':\n' + branch;
        breaking = this.getFieldValue('BREAK' + n);
        if (breaking === true || breaking === 'TRUE' || breaking === 'true')
            code += 'break;\n';
    }
    if (this.elseCount_) {
        branch = Blockly.propc.statementToCode(this, 'DEFAULT');
        code += 'default: \n' + branch + '\n';
    }
    return code + '}\n';
};
