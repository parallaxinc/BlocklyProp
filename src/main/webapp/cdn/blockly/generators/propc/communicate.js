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
 * @fileoverview Generating C for communicate blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 *         valetolpegin@gmail.com    (Vale Tolpegin)
 *         jewald@parallax.com       (Jim Ewald)
 *         mmatz@parallax.com        (Matthew Matz)
 *         kgracey@parallax.com      (Ken Gracey)
 *         carsongracey@gmail.com    (Carson Gracey)
 */

'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

// ------------------ Terminal Console Blocks ----------------------------------
Blockly.Blocks.console_print = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_PRINT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('MESSAGE')
                .setCheck('String')
                .appendField("Terminal print text");
        this.appendDummyInput()
                .appendField("then a new line")
                .appendField(new Blockly.FieldCheckbox("FALSE"), "ck_nl");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_print = function () {
    var text = Blockly.propc.valueToCode(this, 'MESSAGE', Blockly.propc.ORDER_ATOMIC);
    var checkbox = this.getFieldValue('ck_nl');

    Blockly.propc.serial_terminal_ = true;

    var code = 'print(' + text.replace(/%/g, "%%") + ');\n';
    if (checkbox === 'TRUE') {
        code += 'print("\\r");\n';
    }
    return code;
};

Blockly.Blocks.console_print_variables = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_PRINT_VARIABLES_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
                .appendField("Terminal print number")
                .setCheck("Number");
        this.appendDummyInput()
                .appendField("as")
                .appendField(new Blockly.FieldDropdown([
                    ['Decimal', 'DEC'],
                    ['Hexadecimal', 'HEX'],
                    ['Binary', 'BIN'],
                    ['ASCII Character', 'CHAR']
                ]), "FORMAT");
        this.appendDummyInput()
                .appendField("then a new line")
                .appendField(new Blockly.FieldCheckbox("FALSE"), "ck_nl");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_print_variables = function () {
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC);
    var format = this.getFieldValue('FORMAT');
    var checkbox = this.getFieldValue('ck_nl');
    Blockly.propc.serial_terminal_ = true;

    var code = 'print(';
    if (checkbox !== 'TRUE') {
        if (format === 'BIN') {
            code += '"%b"';
        } else if (format === 'HEX') {
            code += '"%x"';
        } else if (format === 'DEC') {
            code += '"%d"';
        } else {
            code += '"%c"';
        }
    } else {
        if (format === 'BIN') {
            code += '"%b\\r"';
        } else if (format === 'HEX') {
            code += '"%x\\r"';
        } else if (format === 'DEC') {
            code += '"%d\\r"';
        } else {
            code += '"%c\\r"';
        }
    }
    if (format === 'CHAR') {
        code += ', (' + value + ' & 0xFF));\n';
    } else {
        code += ', ' + value + ');\n';
    }
    return code;
};

Blockly.Blocks.console_print_multiple = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_PRINT_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Terminal print');
        this.appendValueInput('PRINT0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('String')
                .appendField('text');
        this.appendValueInput('PRINT1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField('decimal number');
        this.appendDummyInput('NEWLINE')
                .appendField("then a new line")
                .appendField(new Blockly.FieldCheckbox("FALSE"), "ck_nl");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(false);
        this.setMutator(new Blockly.Mutator(['console_print_str', 'console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.optionList_ = ['str', 'dec'];
        this.specDigits_ = false;
        this.setWarningText(null);
    },
    mutationToDom: function () {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        var divs = [];
        var places = [];
        var digits = [];
        container.setAttribute('options', JSON.stringify(this.optionList_));
        for (var fv = 0; fv < this.optionList_.length; fv++) {
            divs.push(this.getFieldValue('DIV' + fv) || '0');
            places.push(this.getFieldValue('PLACE' + fv) || '');
            digits.push(this.getFieldValue('DIGIT' + fv) || '');
        }
        container.setAttribute('divisors', JSON.stringify(divs));
        if (this.specDigits_) {
            container.setAttribute('places', JSON.stringify(places));
            container.setAttribute('digits', JSON.stringify(digits));
        }
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        this.removeInput('PRINT0');
        this.removeInput('PRINT1');
        this.removeInput('NEWLINE');
        var value = JSON.parse(container.getAttribute('options'));
        var divs = JSON.parse(container.getAttribute('divisors'));
        this.optionList_ = value;

        var places = [];
        var digits = [];
        this.specDigits_ = false;
        if (container.getAttribute('places') || container.getAttribute('digits')) {
            this.specDigits_ = true;
            places = JSON.parse(container.getAttribute('places'));
            digits = JSON.parse(container.getAttribute('digits'));
        }

        for (var i = 0; i < this.optionList_.length; i++) {
            var label = 'decimal number';
            var chk = 'Number';
            if (this.optionList_[i] === 'str') {
                label = 'text';
                chk = 'String';
            } else if (this.optionList_[i] === 'char') {
                label = 'ASCII character';
            } else if (this.optionList_[i] === 'hex') {
                label = 'hexadecimal number';
            } else if (this.optionList_[i] === 'bin') {
                label = 'binary number';
            }
            if (this.optionList_[i] === 'float' && !this.specDigits_) {
                this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField('float point  divide by', 'TYPE' + i)
                        .appendField(new Blockly.FieldDropdown([
                            ['1', '1'],
                            ['10', '10'],
                            ['100', '100'],
                            ['1000', '1000'],
                            ['10,000', '10000'],
                            ['100,000', '100000'],
                            ['1,000,000', '1000000']
                        ]), 'DIV' + i);
                this.setFieldValue(divs[i], 'DIV' + i);
            } else if (this.optionList_[i] === 'float' && this.specDigits_) {
                this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField('float point  divide by', 'TYPE' + i)
                        .appendField(new Blockly.FieldDropdown([
                            ['1', '1'],
                            ['10', '10'],
                            ['100', '100'],
                            ['1000', '1000'],
                            ['10,000', '10000'],
                            ['100,000', '100000'],
                            ['1,000,000', '1000000']
                        ]), 'DIV' + i)
                        .appendField('digits')
                        .appendField(new Blockly.FieldTextInput('', function (text) {
                            text = text.replace(/O/ig, '0').replace(/[^0-9]*/g, '');
                            return text || '';
                        }), 'DIGIT' + i)
                        .appendField('places')
                        .appendField(new Blockly.FieldTextInput('', function (text) {
                            text = text.replace(/O/ig, '0').replace(/[^0-9]*/g, '');
                            return text || '';
                        }), 'PLACE' + i);
                this.setFieldValue(divs[i] || '100', 'DIV' + i);
                this.setFieldValue(places[i] || '', 'PLACE' + i);
                this.setFieldValue(digits[i] || '', 'DIGIT' + i);
            } else if (this.specDigits_ && (this.optionList_[i] === 'hex' ||
                    this.optionList_[i] === 'dec' ||
                    this.optionList_[i] === 'bin')) {
                this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField(label, 'TYPE' + i)
                        .appendField('digits')
                        .appendField(new Blockly.FieldTextInput('', function (text) {
                            text = text.replace(/O/ig, '0').replace(/[^0-9]*/g, '');
                            return text || '';
                        }), 'DIGIT' + i);
                this.setFieldValue(digits[i] || '', 'DIGIT' + i);
            } else {
                this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField(label, 'TYPE' + i);
            }
        }
        if (this.type === "console_print_multiple") {
            this.appendDummyInput('NEWLINE')
                    .appendField("then a new line")
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "ck_nl");
        }
    },
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'console_print_container');
        if (this.type === 'console_print_multiple' || this.type === 'oled_print_multiple' || this.type === 'debug_lcd_print_multiple') {
            containerBlock.initSvg();
            containerBlock.setFieldValue((this.specDigits_ ? 'TRUE' : 'FALSE'), 'PLACES');
        } else {
            containerBlock = Blockly.Block.obtain(workspace, 'serial_print_container');
            containerBlock.initSvg();
        }

        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.optionList_.length; i++) {
            var optionBlock = workspace.newBlock(
                    'console_print_' + this.optionList_[i]);
            optionBlock.initSvg();
            connection.connect(optionBlock.previousConnection);
            connection = optionBlock.nextConnection;
        }
        return containerBlock;

    },
    compose: function (containerBlock) {
        // Delete everything.
        var i = 0;
        var digits = [];
        var places = [];
        var divs = [];
        while (this.getInput('PRINT' + i)) {
            digits[i] = this.getFieldValue('DIGIT' + i);
            places[i] = this.getFieldValue('PLACE' + i);
            divs[i] = this.getFieldValue('DIV' + i);
            this.removeInput('PRINT' + i);
            i++;
        }
        var ck_nl = this.getFieldValue('ck_nl');
        this.removeInput('NEWLINE');

        i = 0;
        this.optionList_.length = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        this.specDigits_ = false;
        if (containerBlock.getFieldValue('PLACES') === 'TRUE') {
            this.specDigits_ = true;
        }
        var label = '';
        var chk = '';
        while (clauseBlock) {
            chk = 'Number';
            if (clauseBlock.type === 'console_print_dec') {
                this.optionList_.push('dec');
                label = 'decimal number';
            } else if (clauseBlock.type === 'console_print_hex') {
                this.optionList_.push('hex');
                label = 'hexadecimal number';
            } else if (clauseBlock.type === 'console_print_bin') {
                this.optionList_.push('bin');
                label = 'binary number';
            } else if (clauseBlock.type === 'console_print_char') {
                this.optionList_.push('char');
                label = 'ASCII character';
            } else if (clauseBlock.type === 'console_print_str') {
                this.optionList_.push('str');
                chk = 'String';
                label = 'text';
            }
            // Reconnect any child blocks.
            var printInput;
            if (clauseBlock.type === 'console_print_float' && !this.specDigits_) {
                this.optionList_.push('float');
                printInput = this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField('float point  divide by', 'TYPE' + i)
                        .appendField(new Blockly.FieldDropdown([
                            ['1', '1'],
                            ['10', '10'],
                            ['100', '100'],
                            ['1000', '1000'],
                            ['10,000', '10000'],
                            ['100,000', '100000'],
                            ['1,000,000', '1000000']
                        ]), 'DIV' + i);
                this.setFieldValue(divs[i] || '100', 'DIV' + i);
            } else if (clauseBlock.type === 'console_print_float' && this.specDigits_) {
                this.optionList_.push('float');
                printInput = this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField('float point  divide by', 'TYPE' + i)
                        .appendField(new Blockly.FieldDropdown([
                            ['1', '1'],
                            ['10', '10'],
                            ['100', '100'],
                            ['1000', '1000'],
                            ['10,000', '10000'],
                            ['100,000', '100000'],
                            ['1,000,000', '1000000']
                        ]), 'DIV' + i)
                        .appendField('digits')
                        .appendField(new Blockly.FieldTextInput('', function (text) {
                            text = text.replace(/O/ig, '0').replace(/[^0-9]*/g, '');
                            return text || '';
                        }), 'DIGIT' + i)
                        .appendField('places')
                        .appendField(new Blockly.FieldTextInput('', function (text) {
                            text = text.replace(/O/ig, '0').replace(/[^0-9]*/g, '');
                            return text || '';
                        }), 'PLACE' + i);
                this.setFieldValue(divs[i] || '100', 'DIV' + i);
                this.setFieldValue(places[i] || '', 'PLACE' + i);
                this.setFieldValue(digits[i] || '', 'DIGIT' + i);
            } else if (this.specDigits_ && (this.optionList_[i] === 'hex' ||
                    this.optionList_[i] === 'dec' ||
                    this.optionList_[i] === 'bin')) {
                printInput = this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField(label, 'TYPE' + i)
                        .appendField('digits')
                        .appendField(new Blockly.FieldTextInput('', function (text) {
                            text = text.replace(/O/ig, '0').replace(/[^0-9]*/g, '');
                            return text || '';
                        }), 'DIGIT' + i);
                this.setFieldValue(digits[i] || '', 'DIGIT' + i);
            } else {
                printInput = this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField(label, 'TYPE' + i);
            }

            if (clauseBlock.valueConnection_) {
                printInput.connection.connect(clauseBlock.valueConnection_);
            }
            i++;
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
        }
        if (this.type === "console_print_multiple") {
            this.appendDummyInput('NEWLINE')
                    .appendField("then a new line")
                    .appendField(new Blockly.FieldCheckbox(ck_nl || "FALSE"), "ck_nl");
        }
    },
    saveConnections: function (containerBlock) {
        // Store a pointer to any connected child blocks.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 0;
        while (clauseBlock) {
            var printInput = this.getInput('PRINT' + x);
            clauseBlock.valueConnection_ =
                    printInput && printInput.connection.targetConnection;
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            x++;
        }
    },
    onchange: function () {
        var warnTxt = null;
        if (this.workspace && this.optionList_.length < 1) {
            warnTxt = 'Terminal print multiple must have at least one term.';
        }
        this.setWarningText(warnTxt);
    }
};

Blockly.Blocks.console_print_container = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('send');
        this.appendStatementInput('STACK');
        this.appendDummyInput()
                .appendField('specify digits')
                .appendField(new Blockly.FieldCheckbox("FALSE"), "PLACES");
        this.contextMenu = false;
    }
};

Blockly.Blocks.serial_print_container = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('send');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks.console_print_dec = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('decimal number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks.console_print_hex = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('hexadecimal number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks.console_print_bin = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('binary number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks.console_print_str = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('text');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks.console_print_char = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('ASCII character');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks.console_print_float = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('floating point number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.propc.console_print_multiple = function () {
    var code = '';
    var initBlock = null;
    var errorString = '';

    switch (this.type) {
        case 'console_print_multiple':
            code += 'print("';
            Blockly.propc.serial_terminal_ = true;
            break;
        case 'serial_print_multiple':
            initBlock = 'Serial initialize';
            errorString = '// ERROR: Serial is not initialized!\n';
            var p = '';
            if (this.ser_pins.length > 0) {
                p = this.ser_pins[0][0].replace(',', '_');
            }
            if (this.getInput('SERPIN')) {
                p = this.getFieldValue('SER_PIN').replace(',', '_');
            }
            code += 'dprint(fdser' + p + ', "';
            break;
        case 'debug_lcd_print_multiple':
            initBlock = 'LCD initialize';
            errorString = '// ERROR: LCD is not initialized!\n';
            code += 'dprint(debug_lcd, "';
            break;
        case 'oled_print_multiple':
            initBlock = 'OLED initialize';
            errorString = '// ERROR: OLED is not initialized!\n';
            code += 'oledc_print("';
            break;
        case 'xbee_print_multiple':
            initBlock = 'XBee initialize';
            errorString = '// ERROR: XBEE is not initialized!\n';
            code += 'dprint(xbee, "';
            break;
        case 'wx_print_multiple':
            initBlock = 'WX initialize';
            errorString = '// ERROR: WX is not initialized!\n';
            var handle = Blockly.propc.variableDB_.getName(this.getFieldValue('HANDLE'), Blockly.Variables.NAME_TYPE);
            var conn = this.getFieldValue('CONNECTION');
            code += 'wifi_print(' + conn + ', ' + handle + ', "';
            break;
    }

    var varList = '';
    var orIt = '';
    var i = 0;
    while (this.getInput('PRINT' + i)) {
        var digitsPlaces = this.getFieldValue('DIGIT' + i) || '';
        if (this.getFieldValue('PLACE' + i) && this.getFieldValue('PLACE' + i) !== '') {
            digitsPlaces += '.' + this.getFieldValue('PLACE' + i);
        }
        if (digitsPlaces !== '') {
            digitsPlaces = '0' + digitsPlaces;
        }
        if (this.getFieldValue('TYPE' + i).includes('decimal number')) {
            code += '%' + digitsPlaces + 'd';
            orIt = '0';
        } else if (this.getFieldValue('TYPE' + i).includes('hexadecimal number')) {
            code += '%' + digitsPlaces + 'x';
            orIt = '0x0';
        } else if (this.getFieldValue('TYPE' + i).includes('binary number')) {
            code += '%' + digitsPlaces + 'b';
            orIt = '0b0';
        } else if (this.getFieldValue('TYPE' + i).includes('text')) {
            code += '%s';
            orIt = '" "';
        } else if (this.getFieldValue('TYPE' + i).includes('ASCII character')) {
            code += '%c';
            orIt = '32';
        } else if (this.getFieldValue('TYPE' + i).includes('float point  divide by')) {
            code += '%' + digitsPlaces + 'f';
            orIt = '0';
        }

        if (!this.getFieldValue('TYPE' + i).includes('float point  divide by')) {
            varList += ', ' + (Blockly.propc.valueToCode(this, 'PRINT' + i, Blockly.propc.NONE).replace('\/%\g', '%%') || orIt);
        } else {
            varList += ', ((float) ' + (Blockly.propc.valueToCode(this, 'PRINT' + i, Blockly.propc.NONE) || orIt) +
                    ') / ' + this.getFieldValue('DIV' + i) + '.0';
        }
        i++;
    }
    if (this.getFieldValue('ck_nl') === 'TRUE') {
        code += '\\r';
    }
    code += '"' + varList + ');\n';

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (initBlock && allBlocks.indexOf(initBlock) === -1) {
        code = errorString;
    }
    if (this.type === 'wx_print_multiple' && allBlocks.indexOf('Simple WX initialize') > -1) {
        code = '// ERROR: You cannot use Advanced WX blocks with Simple WX blocks!';
    }

    return code;
};

Blockly.Blocks.console_scan_text = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_SCAN_TEXT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal receive text store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
        }
    }

};

Blockly.propc.console_scan_text = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
    Blockly.propc.vartype_[data] = 'char *';
    Blockly.propc.serial_terminal_ = true;

    if (data !== '') {
        var code = 'getStr(' + data + ', 128);\n';

        return code;
    } else {
        return '';
    }
};

Blockly.Blocks.console_scan_number = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_SCAN_NUMBER_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal receive")
                .appendField(new Blockly.FieldDropdown([["number (32-bit integer)", "NUMBER"], ["byte (ASCII character)", "BYTE"]]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
        }
    }

};

Blockly.propc.console_scan_number = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.serial_terminal_ = true;
    var code = '';

    if (data !== '') {
        if (type === 'NUMBER') {
            code += 'scan("%d\\n", &' + data + ');\n';
        } else {
            code += data + ' = getChar();\n';
        }
        return code;
    } else {
        return '';
    }
};

Blockly.Blocks.console_newline = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_NEWLINE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal new line");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_newline = function () {
    Blockly.propc.serial_terminal_ = true;
    return 'term_cmd(CR);\n';
};

Blockly.Blocks.console_clear = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_CLEAR_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal clear screen");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_clear = function () {
    Blockly.propc.serial_terminal_ = true;
    return 'term_cmd(CLS);\n';
};

Blockly.Blocks.console_move_to_position = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CONSOLE_MOVE_TO_POSITION_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal set cursor to row");
        this.appendValueInput('ROW')
                .setCheck('Number');
        this.appendDummyInput()
                .appendField("column");
        this.appendValueInput('COLUMN')
                .setCheck('Number');

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_move_to_position = function () {
    Blockly.propc.serial_terminal_ = true;
    var row = Blockly.propc.valueToCode(this, 'ROW', Blockly.propc.ORDER_NONE);
    var column = Blockly.propc.valueToCode(this, 'COLUMN', Blockly.propc.ORDER_NONE);

    if (Number(row) < 0) {
        row = 0;
    } else if (Number(row) > 255) {
        row = 255;
    }

    if (Number(column) < 0) {
        column = 0;
    } else if (Number(column) > 255) {
        column = 255;
    }

    return 'term_cmd(CRSRXY, ' + column + ', ' + row + ');\n';
};

// ----------------------- Serial Protocol Blocks ------------------------------
Blockly.Blocks.serial_open = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERIAL_OPEN_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial initialize RX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital.concat([['None', 'None']])), "RXPIN")
                .appendField("TX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital.concat([['None', 'None']])), "TXPIN");
        this.appendDummyInput('BAUD_RATE')
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([
                    ["2400", "2400"],
                    ["4800", "4800"],
                    ["9600", "9600"],
                    ["19200", "19200"],
                    ["38400", "38400"],
                    ["57600", "57600"],
                    ["115200", "115200"],
                    ["other", "other"]
                ], function (br) {
                    if (br === 'other') {
                        this.otherBaud = true;
                    }
                    this.sourceBlock_.setToOther(br);
                }), "BAUD");
        this.appendDummyInput('MODE')
                .appendField("mode")
                .appendField(new Blockly.FieldDropdown([
                    ["standard", "standard"],
                    ["other", "other"]
                ], function () {
                    this.sourceBlock_.setToMode();
                }), "TYPE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.otherBaud = false;
        this.otherMode = false;
        this.serialPin = this.getFieldValue('RXPIN') + ',' + this.getFieldValue('TXPIN');
        this.onchange({oldXml: true});
    },
    onchange: function (event) {
        this.serialPin = this.getFieldValue('RXPIN') + ',' + this.getFieldValue('TXPIN');
        if (event.blockId === this.id || event.oldXml) {  // only fire when it's this block or a block got deleted
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
            for (var x = 0; x < allBlocks.length; x++) {
                var func = allBlocks[x].serPins;
                if (func) {
                    if (event.name === 'RXPIN') {
                        func.call(allBlocks[x], event.oldValue + ',' + this.getFieldValue('TXPIN'), event.newValue + ',' + this.getFieldValue('TXPIN'));
                    } else if (event.name === 'TXPIN') {
                        func.call(allBlocks[x], this.getFieldValue('RXPIN') + ',' + event.oldValue, this.getFieldValue('RXPIN') + ',' + event.newValue);
                    } else if (event.oldXml) {
                        func.call(allBlocks[x]);
                    }
                }
            }
        }
    },
    setToOther: function (br) {
        if (br === 'other' || this.otherBaud === true) {
            if (!br || br === 'other') {
                br = '1200';
            }
            this.otherBaud = true;
            this.removeInput('BAUD_RATE');
            this.appendDummyInput('BAUD_RATE')
                    .appendField("baud")
                    .appendField(new Blockly.FieldTextInput(br,
                            Blockly.FieldTextInput.numberValidator), "BAUD");
            this.moveInputBefore('BAUD_RATE', 'MODE');
        }
    },
    setToMode: function (details) {
        if (!details) {
            var details = ['FALSE', 'FALSE', 'FALSE', 'FALSE'];
        }
        this.removeInput('MODE');
        this.appendDummyInput('MODE')
                .appendField("invert RX")
                .appendField(new Blockly.FieldCheckbox(details[0]), "ck_bit0")
                .appendField("invert TX")
                .appendField(new Blockly.FieldCheckbox(details[1]), "ck_bit1")
                .appendField("open-drain")
                .appendField(new Blockly.FieldCheckbox(details[2]), "ck_bit2")
                .appendField("remove TX echo")
                .appendField(new Blockly.FieldCheckbox(details[3]), "ck_bit3");
        this.otherMode = true;
    },
    mutationToDom: function () {
        if (this.otherBaud || this.otherMode) {
            var container = document.createElement('mutation');
            container.setAttribute('baud', this.getFieldValue('BAUD') || '1200');
            for (var k = 0; k < 4; k++) {
                container.setAttribute('ck_bit' + k.toString(10), this.getFieldValue('ck_bit' + k.toString(10)) || 'FALSE');
            }
            return container;
        }
    },
    domToMutation: function (xmlElement) {
        var br = xmlElement.getAttribute('baud');
        if (br !== undefined) {
            this.otherBaud = true;
            this.setToOther(br);
        }
        var ck_bits = ['FALSE', 'FALSE', 'FALSE', 'FALSE'];
        var otherMode = false;
        for (var k = 0; k < 4; k++) {
            ck_bits[k] = xmlElement.getAttribute('ck_bit' + k.toString(10));
            if (ck_bits[k] === 'TRUE') {
                otherMode = true;
            }
        }
        if (otherMode) {
            this.setToMode(ck_bits);
        }
    }
};

Blockly.propc.serial_open = function () {
    var rx_pin = this.getFieldValue('RXPIN').replace('None', '-1');
    var tx_pin = this.getFieldValue('TXPIN').replace('None', '-1');
    var rx_label = this.getFieldValue('RXPIN').replace('None', 'N');
    var tx_label = this.getFieldValue('TXPIN').replace('None', 'N');
    var mode = '0b';
    for (var k = 3; k > -1; k--) {
        mode += ((this.getFieldValue('ck_bit' + k.toString(10)) || 'FALSE') === 'TRUE' ? '1' : '0');
    }
    var baud = this.getFieldValue('BAUD');

    if (!this.disabled) {
        Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
        Blockly.propc.definitions_["var fdserial" + rx_label + '_' + tx_label] = 'fdserial *fdser' + rx_label + '_' + tx_label + ';';
        Blockly.propc.setups_['setup_fdserial' + rx_label + '_' + tx_label] = 'fdser' + rx_label + '_' + tx_label + ' = fdserial_open(' + rx_pin + ', ' + tx_pin + ', ' + mode + ', ' + baud + ');';
    }
    return '';
};

Blockly.Blocks.serial_send_text = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERIAL_SEND_TEXT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial transmit")
                .appendField(new Blockly.FieldDropdown([
                    ["text", "TEXT"],
                    ["decimal number", "INT"],
                    ["hexadecimal number", "HEX"],
                    ["binary number", "BIN"],
                    ["ASCII character", "BYTE"]
                ]), 'TYPE');
        this.appendValueInput('VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
        this.stringTypeCheck();
        this.ser_pins = [];
        this.serPins();
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        if (this.getInput('SERPIN')) {
            container.setAttribute('serpin', this.getFieldValue('SER_PIN'));

        }
        container.setAttribute('pinmenu', JSON.stringify(this.ser_pins));
        return container;
    },
    domToMutation: function (xmlElement) {
        var serpin = xmlElement.getAttribute('serpin');
        this.ser_pins = JSON.parse(xmlElement.getAttribute('pinmenu')) || [['0,0', '0,0']];
        if (this.getInput('SERPIN')) {
            this.removeInput('SERPIN');
        }
        if (serpin) {
            this.appendDummyInput('SERPIN')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('RXTX')
                    .appendField(new Blockly.FieldDropdown(this.ser_pins), 'SER_PIN');
            this.setFieldValue(serpin, 'SER_PIN');
        }
    },
    serPins: function (oldPin, newPin) {
        var currentPin = '-1';
        if (this.ser_pins.length > 0) {
            currentPin = this.ser_pins[0][0];
        }
        this.ser_pins.length = 0;
        if (this.getInput('SERPIN')) {
            currentPin = this.getFieldValue('SER_PIN');
        }
        this.updateSerPin();
        if (this.getInput('SERPIN')) {
            this.removeInput('SERPIN');
        }
        if (this.ser_pins.length > 1) {
            this.appendDummyInput('SERPIN')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('RXTX')
                    .appendField(new Blockly.FieldDropdown(this.ser_pins), 'SER_PIN');
            if (this.getInput('PRINT0')) {
                this.moveInputBefore('SERPIN', 'PRINT0');
            } else if (this.getInput('OPTION0')) {
                this.moveInputBefore('SERPIN', 'OPTION0');
            }
            if (currentPin === oldPin || oldPin === null) {
                this.setFieldValue(newPin, 'SER_PIN');
            } else {
                if (this.getInput('SERPIN') && currentPin !== '-1') {
                    this.setFieldValue(currentPin, 'SER_PIN');
                }
            }
        }
    },
    updateSerPin: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        this.ser_pins.length = 0;
        for (var x = 0; x < allBlocks.length; x++) {
            if (allBlocks[x].type === 'serial_open') {
                var sp = allBlocks[x].serialPin;
                if (sp) {
                    this.ser_pins.push([sp, sp]);
                }
            }
        }
        this.ser_pins = uniq_fast(this.ser_pins);
    },
    onchange: function (event) {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('Serial initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Serial\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
        if (this.stringTypeCheck) {
            this.stringTypeCheck();
        }
    },
    stringTypeCheck: function () {
        var setType = "Number";
        if (this.getFieldValue('TYPE') === 'TEXT') {
            setType = "String";
        }
        this.getInput('VALUE').setCheck(setType);
    }
};

Blockly.propc.serial_send_text = function () {
    var p = '';
    if (this.ser_pins.length > 0) {
        p = this.ser_pins[0][0].replace(',', '_').replace(/None/g, 'N');
    }
    if (this.getInput('SERPIN')) {
        p = this.getFieldValue('SER_PIN').replace(',', '_').replace(/None/g, 'N');
    }
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Serial initialize') === -1)
    {
        return '// ERROR: Serial is not initialized!\n';
    } else {
        var type = this.getFieldValue('TYPE');
        var data = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

        if (type === "BYTE") {
            return 'fdserial_txChar(fdser' + p + ', (' + data + ' & 0xFF) );\n';
        } else if (type === "INT") {
            return 'dprint(fdser' + p + ', "%d\\r", ' + data + ');\n';
        } else if (type === "HEX") {
            return 'dprint(fdser' + p + ', "%x\\r", ' + data + ');\n';
        } else if (type === "BIN") {
            return 'dprint(fdser' + p + ', "%b\\r", ' + data + ');\n';
        } else {
            var code = 'dprint(fdser' + p + ', "%s\\r", ' + data.replace(/%/g, "%%") + ');\n';
            code += 'while(!fdserial_txEmpty(fdser' + p + '));\n';
            code += 'pause(5);\n';

            return code;
        }
    }
};

Blockly.Blocks.serial_receive_text = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERIAL_RECEIVE_TEXT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial receive")
                .appendField(new Blockly.FieldDropdown([
                    ["text", "TEXT"],
                    ["decimal number", "INT"],
                    ["hexadecimal number", "HEX"],
                    ["binary number", "BIN"],
                    ["ASCII character", "BYTE"]
                ]), 'TYPE')
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
        this.ser_pins = [];
        this.serPins();
    },
    mutationToDom: Blockly.Blocks['serial_send_text'].mutationToDom,
    domToMutation: Blockly.Blocks['serial_send_text'].domToMutation,
    serPins: Blockly.Blocks['serial_send_text'].serPins,
    updateSerPin: Blockly.Blocks['serial_send_text'].updateSerPin,
    getVarType: function () {
        if (this.getFieldValue('TYPE') === 'TEXT') {
            return "String";
        }
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
        }
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('Serial initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Serial\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.serial_receive_text = function () {
    var p = '';
    if (this.ser_pins.length > 0) {
        p = this.ser_pins[0][0].replace(',', '_');
    }
    if (this.getInput('SERPIN')) {
        p = this.getFieldValue('SER_PIN').replace(',', '_');
    }
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Serial initialize') === -1)
    {
        return '// ERROR: Serial is not initialized!\n';
    } else {
        var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);

        var type = this.getFieldValue('TYPE');

        if (type === "BYTE") {
            return  data + ' = fdserial_rxChar(fdser' + p + ');\n';
        } else if (type === "INT") {
            return 'dscan(fdser' + p + ', "%d", &' + data + ');\n';
        } else if (type === "BIN") {
            return 'dscan(fdser' + p + ', "%b", &' + data + ');\n';
        } else if (type === "HEX") {
            return 'dscan(fdser' + p + ', "%x", &' + data + ');\n';
        } else {
            if (!this.disabled) {
                Blockly.propc.global_vars_["ser_rx" + p] = "int __iS" + p + ";";
                Blockly.propc.vartype_[data] = 'char *';
            }
            var code = '__iS' + p + ' = 0;\n';
            code += 'while(1) {';
            code += '  ' + data + '[__i' + p + '] = fdserial_rxChar(fdser' + p + ');\n';
            code += '  __i' + p + '++;\n';
            code += '  if(' + data + '[__i' + p + '] == 10 || ' + data + '[__i';
            code += p + '] == 13 || ' + data + '[__i' + p + '] == 0) break;}';
            code += data + '[__i' + p + '] = 0;\nfdserial_rxFlush(fdser' + p + ');\n';

            return code;
        }
    }
};

Blockly.Blocks.serial_print_multiple = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERIAL_PRINT_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Serial transmit');
        this.appendValueInput('PRINT0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('String')
                .appendField('text');
        this.appendValueInput('PRINT1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField('decimal number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(false);
        this.setMutator(new Blockly.Mutator(['console_print_str', 'console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.optionList_ = ['str', 'dec'];
        this.setWarningText(null);
        this.ser_pins = [];
        this.serPins();
    },
    mutationToDom: function () {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        var divs = [];
        container.setAttribute('pinmenu', JSON.stringify(this.ser_pins));
        container.setAttribute('options', JSON.stringify(this.optionList_));
        for (var fv = 0; fv < this.optionList_.length; fv++) {
            divs.push(this.getFieldValue('DIV' + fv) || '0');
        }
        container.setAttribute('divisors', JSON.stringify(divs));
        if (this.getInput('SERPIN')) {
            container.setAttribute('serpin', this.getFieldValue('SER_PIN'));
        }
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        this.removeInput('PRINT0');
        this.removeInput('PRINT1');
        this.removeInput('NEWLINE');

        var value = JSON.parse(container.getAttribute('options'));
        var divs = JSON.parse(container.getAttribute('divisors'));
        this.optionList_ = value;
        for (var i = 0; i < this.optionList_.length; i++) {
            var label = 'decimal number';
            var chk = 'Number';
            if (this.optionList_[i] === 'str') {
                label = 'text';
                chk = 'String';
            } else if (this.optionList_[i] === 'char') {
                label = 'ASCII character';
            } else if (this.optionList_[i] === 'hex') {
                label = 'hexadecimal number';
            } else if (this.optionList_[i] === 'bin') {
                label = 'binary number';
            }
            if (this.optionList_[i] === 'float') {
                this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField('float point  divide by', 'TYPE' + i)
                        .appendField(new Blockly.FieldDropdown([
                            ['1', '1'],
                            ['10', '10'],
                            ['100', '100'],
                            ['1000', '1000'],
                            ['10,000', '10000'],
                            ['100,000', '100000'],
                            ['1,000,000', '1000000']
                        ]), 'DIV' + i);
                this.setFieldValue(divs[i], 'DIV' + i);
            } else {
                this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField(label, 'TYPE' + i);
            }
        }
        this.ser_pins = JSON.parse(container.getAttribute('pinmenu')) || [['0,0', '0,0']];
        var serpin = container.getAttribute('serpin');
        if (this.getInput('SERPIN')) {
            this.removeInput('SERPIN');
        }
        if (serpin) {
            this.appendDummyInput('SERPIN')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('RXTX')
                    .appendField(new Blockly.FieldDropdown(this.ser_pins), 'SER_PIN');
            this.setFieldValue(serpin, 'SER_PIN');
            if (this.getInput('PRINT0')) {
                this.moveInputBefore('SERPIN', 'PRINT0');
            }
        }
    },
    decompose: Blockly.Blocks['console_print_multiple'].decompose,
    compose: function (containerBlock) {
        // Delete everything.
        var i = 0;
        while (this.getInput('PRINT' + i)) {
            this.removeInput('PRINT' + i);
            i++;
        }
        i = 0;
        this.optionList_.length = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var label = '';
        var chk = '';
        while (clauseBlock) {
            chk = 'Number';
            if (clauseBlock.type === 'console_print_dec') {
                this.optionList_.push('dec');
                label = 'decimal number';
            } else if (clauseBlock.type === 'console_print_hex') {
                this.optionList_.push('hex');
                label = 'hexadecimal number';
            } else if (clauseBlock.type === 'console_print_bin') {
                this.optionList_.push('bin');
                label = 'binary number';
            } else if (clauseBlock.type === 'console_print_char') {
                this.optionList_.push('char');
                label = 'ASCII character';
            } else if (clauseBlock.type === 'console_print_str') {
                this.optionList_.push('str');
                chk = 'String';
                label = 'text';
            }
            // Reconnect any child blocks.
            var printInput;
            if (clauseBlock.type === 'console_print_float') {
                this.optionList_.push('float');
                printInput = this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField('float point  divide by', 'TYPE' + i)
                        .appendField(new Blockly.FieldTextInput('100',
                                Blockly.FieldTextInput.numberValidator), 'DIV' + i);
            } else {
                printInput = this.appendValueInput('PRINT' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .setCheck(chk)
                        .appendField(label, 'TYPE' + i);
            }

            if (clauseBlock.valueConnection_) {
                printInput.connection.connect(clauseBlock.valueConnection_);
            }
            i++;
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
        }
    },
    serPins: Blockly.Blocks['serial_send_text'].serPins,
    updateSerPin: Blockly.Blocks['serial_send_text'].updateSerPin,
    saveConnections: Blockly.Blocks['console_print_multiple'].saveConnections,
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('Serial initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Serial\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            if (this.workspace && this.optionList_.length < 1) {
                warnTxt = 'Serial transmit multiple must have at least one term.';
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.serial_print_multiple = Blockly.propc.console_print_multiple;

Blockly.Blocks.serial_scan_multiple = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERIAL_SCAN_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Serial receive');
        this.optionList_ = ['dec', 'char'];
        this.updateShape_();
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.setWarningText(null);
        this.ser_pins = [];
        this.serPins();
    },
    mutationToDom: function () {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        container.setAttribute('pinmenu', JSON.stringify(this.ser_pins));
        container.setAttribute('options', JSON.stringify(this.optionList_));
        if (this.getInput('SERPIN')) {
            container.setAttribute('serpin', this.getFieldValue('SER_PIN'));
        }
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        var value = JSON.parse(container.getAttribute('options'));
        this.optionList_ = value;
        this.updateShape_();
        this.ser_pins = JSON.parse(container.getAttribute('pinmenu')) || [['0,0', '0,0']];
        var serpin = container.getAttribute('serpin');
        if (this.getInput('SERPIN')) {
            this.removeInput('SERPIN');
        }
        if (serpin) {
            this.appendDummyInput('SERPIN')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('RXTX')
                    .appendField(new Blockly.FieldDropdown(this.ser_pins), 'SER_PIN');
            this.setFieldValue(serpin, 'SER_PIN');
            if (this.getInput('OPTION0')) {
                this.moveInputBefore('SERPIN', 'OPTION0');
            }
        }
    },
    decompose: function (workspace) {
        // Populate the mutator's dialog with this block's components.
        var containerBlock = workspace.newBlock('serial_scan_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.optionList_.length; i++) {
            var optionBlock = workspace.newBlock(
                    'console_print_' + this.optionList_[i]);
            optionBlock.initSvg();
            connection.connect(optionBlock.previousConnection);
            connection = optionBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        // Reconfigure this block based on the mutator dialog's components.
        var optionBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        this.optionList_.length = 0;
        var data = [];
        while (optionBlock) {
            this.optionList_.push(optionBlock.type.replace('console_print_', ''));
            data.push([optionBlock.userData_, optionBlock.cpuData_]);
            optionBlock = optionBlock.nextConnection &&
                    optionBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Restore any data.
        for (var i = 0; i < this.optionList_.length; i++) {
            var userData = data[i][0];
            if (userData !== undefined) {
                this.setFieldValue(data[i][1], 'CPU' + i);
            }
        }
    },
    serPins: Blockly.Blocks['serial_send_text'].serPins,
    updateSerPin: Blockly.Blocks['serial_send_text'].updateSerPin,
    saveConnections: function (containerBlock) {
        // Store all data for each option.
        var optionBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (optionBlock) {
            optionBlock.cpuData_ = this.getFieldValue('CPU' + i) || Blockly.LANG_VARIABLES_GET_ITEM;
            i++;
            optionBlock.userData_ = this.getFieldValue('CPU' + i);
            optionBlock = optionBlock.nextConnection &&
                    optionBlock.nextConnection.targetBlock();
        }
    },
    updateShape_: function () {
        // Delete everything.
        var i = 0;
        while (this.getInput('OPTION' + i)) {
            this.removeInput('OPTION' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 0; i < this.optionList_.length; i++) {
            var type = this.optionList_[i];
            var label = 'store ASCII character in';
            if (type === 'dec') {
                label = 'store decimal number in';
            } else if (type === 'hex') {
                label = 'store hexadecimal number in';
            } else if (type === 'bin') {
                label = 'store binary number in';
            }
            if (type === 'float') {
                this.appendDummyInput('OPTION' + i)
                        .appendField('store float point \u2715')
                        .appendField(new Blockly.FieldDropdown([
                            ['1', '1'],
                            ['10', '10'],
                            ['100', '100'],
                            ['1000', '1000'],
                            ['10,000', '10000'],
                            ['100,000', '100000'],
                            ['1,000,000', '1000000']
                        ]), 'MULT' + i)
                        //.appendField(new Blockly.FieldTextInput('100'), 'MULT' + i)
                        .appendField('in', 'TYPE' + i)
                        .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'CPU' + i);
                this.setFieldValue('100', 'MULT' + i);
            } else {
                this.appendDummyInput('OPTION' + i)
                        .appendField(label, 'TYPE' + i)
                        .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'CPU' + i);
            }
        }
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        var warnTxt = null;
        if (allBlocks.toString().indexOf('Serial initialize') === -1) {
            warnTxt = 'WARNING: You must use a Serial\ninitialize block at the beginning of your program!';
        }
        if (this.workspace && this.optionList_.length < 1) {
            warnTxt = 'Serial recieve must have at least one search term.';
        }
        this.setWarningText(warnTxt);
    },
    getVars: function () {
        var theVars = [];
        for (var i = 0; i < this.optionList_.length; i++) {
            theVars.push(this.getFieldValue('CPU' + i));
        }
        return theVars;
    },
    renameVar: function (oldName, newName) {
        for (var i = 0; i < this.optionList_.length; i++) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('CPU' + i)))
                this.setFieldValue(newName, 'CPU' + i);
        }
    }
};

Blockly.Blocks.serial_scan_container = {
    // Container.
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('receive');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.propc.serial_scan_multiple = function () {
    var p = '';
    if (this.ser_pins.length > 0) {
        p = this.ser_pins[0][0].replace(',', '_');
    }
    if (this.getInput('SERPIN')) {
        p = this.getFieldValue('SER_PIN').replace(',', '_');
    }
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Serial initialize') > -1)
    {
        var code = 'dscan(fdser' + p + ', "';
        var varList = '';
        var code_add = '';
        var i = 0;
        while (this.getFieldValue('CPU' + i)) {
            if (this.getFieldValue('TYPE' + i).includes('decimal number')) {
                code += '%d';
            } else if (this.getFieldValue('TYPE' + i).includes('store ASCII character in')) {
                code += '%c';
            } else if (this.getFieldValue('TYPE' + i).includes('store hexadecimal number in')) {
                code += '%x';
            } else if (this.getFieldValue('TYPE' + i).includes('store binary number in')) {
                code += '%b';
            } else if (this.getFieldValue('TYPE' + i) === 'in') {
                code += '%f';
            }
            if (this.getFieldValue('TYPE' + i) === 'in') {
                varList += ', &__fpBuf' + i;
                code_add += Blockly.propc.variableDB_.getName(this.getFieldValue('CPU' + i), Blockly.Variables.NAME_TYPE);
                code_add += ' = (int) (__fpBuf' + i + ' * ' + this.getFieldValue('MULT' + i) + ');\n';
                if (!this.disabled) {
                    Blockly.propc.global_vars_["floatPointScanBuffer" + i] = 'float __fpBuf' + i + ';';
                }
            } else {
                varList += ', &' + Blockly.propc.variableDB_.getName(this.getFieldValue('CPU' + i), Blockly.Variables.NAME_TYPE);
            }
            i++;
        }
        code += '"' + varList + ');\n' + code_add;
        return code;
    } else {
        return '// ERROR: Serial is not initialized!\n';
    }
};

Blockly.Blocks.serial_tx = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERIAL_TX_TOOLTIP);
        this.setColour('#FF8800');
        this.appendDummyInput()
                .appendField("Serial transmit")
                .appendField(new Blockly.FieldDropdown([
                    ["number (32-bit integer)", "INT"],
                    ["byte (ASCII character)", "BYTE"]
                ]), "TYPE");
        this.appendValueInput('VALUE')
                .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText('WARNING: This block has been deprecated\nand may not work correctly!\nPlease use one of the blocks\navailable in the menu.');
    }
};

Blockly.propc.serial_tx = function () {
    return '// ERROR: This block has been depricated, please use a different serial transmit block!\n';
};

Blockly.Blocks.serial_rx = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERIAL_RX_TOOLTIP);
        this.setColour('#FF8800');
        this.appendDummyInput()
                .appendField("Serial receive")
                .appendField(new Blockly.FieldDropdown([
                    ["number (32-bit integer)", "INT"],
                    ["byte (ASCII character)", "BYTE"]
                ]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText('WARNING: This block has been deprecated\nand may not work correctly!\nPlease use one of the blocks\navailable in the menu.');
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.serial_rx = function () {
    return '// ERROR: This block has been deprecated, please use a different serial receive block!\n';
};


//--------------- Shift In/Out Blocks ------------------------------------------
Blockly.Blocks.shift_in = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        var shiftBytes = [];
        for (var t = 2; t < 33; t++) {
            shiftBytes.push([t.toString(10), t.toString(10)]);
        }
        this.setTooltip(Blockly.MSG_SHIFT_IN_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("shift in")
                .appendField(new Blockly.FieldDropdown(
                        shiftBytes), "BITS")
                .appendField("bits")
                .appendField(new Blockly.FieldDropdown([["MSB first", "MSB"], ["LSB first", "LSB"]]), "MODE")
                .appendField(new Blockly.FieldDropdown([["before clock", "PRE"], ["after clock", "POST"]]), "ORDER")
                .appendField("DATA")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DATA")
                .appendField("CLK")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.shift_in = function () {
    var bits = this.getFieldValue('BITS');
    var mode = this.getFieldValue('MODE');
    var ord = this.getFieldValue('ORDER');
    var dat = this.getFieldValue('DATA');
    var clk = this.getFieldValue('CLK');

    return ['shift_in(' + dat + ', ' + clk + ', ' + mode + ord + ', ' + bits + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.shift_out = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        var shiftBytes = [];
        for (var t = 2; t < 33; t++) {
            shiftBytes.push([t.toString(10), t.toString(10)]);
        }
        this.setTooltip(Blockly.MSG_SHIFT_OUT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("VALUE")
                .setCheck("Number")
                .appendField("shift out the")
                .appendField(new Blockly.FieldDropdown(
                        shiftBytes), "BITS")
                .appendField("lowest bits of");
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["MSB first", "MSBFIRST"], ["LSB first", "LSBFIRST"]]), "MODE")
                .appendField("DATA")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DATA")
                .appendField("CLK")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.shift_out = function () {
    var bits = this.getFieldValue('BITS');
    var mode = this.getFieldValue('MODE');
    var dat = this.getFieldValue('DATA');
    var clk = this.getFieldValue('CLK');
    var val = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';

    return 'shift_out(' + dat + ', ' + clk + ', ' + mode + ', ' + bits + ', ' + val + ');\n';
};


//--------------- Serial LCD Blocks --------------------------------------------
Blockly.Blocks.debug_lcd_init = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_DEBUG_LCD_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"]]), "BAUD");

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_init = function () {
    if (!this.disabled) {
        var dropdown_pin = this.getFieldValue('PIN');
        var baud = this.getFieldValue('BAUD');

        Blockly.propc.setups_['setup_debug_lcd'] = 'serial *debug_lcd = serial_open(' + dropdown_pin + ', ' + dropdown_pin + ', 0, ' + baud + ');\n';
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Serial initialize') === -1)
    {
        return '// ERROR: LCD is not initialized!\n';
    } else {
        var code = 'writeChar(debug_lcd, 22);\npause(5);\n';
        return code;
    }
};

Blockly.Blocks.debug_lcd_music_note = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_DEBUG_LCD_MUSIC_NOTE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD play note")
                .appendField(new Blockly.FieldDropdown([["C", "223"], ["C#", "224"], ["D", "225"], ["D#", "226"], ["E", "227"], ["F", "228"], ["F#", "229"], ["G", "230"], ["G#", "231"], ["A", "220"], ["A#", "221"], ["B", "222"], ["no note (rest)", "232"]]), "NOTE")
                .appendField("octave")
                .appendField(new Blockly.FieldDropdown([["3rd", "215"], ["4th", "216"], ["5th", "217"], ["6th", "218"], ["7th", "219"]]), "OCTAVE")
                .appendField("length")
                .appendField(new Blockly.FieldDropdown([["whole (2 s)", "214"], ["half (1 s)", "213"], ["quarter (500 ms)", "212"], ["eigth (250 ms)", "211"], ["sixteenth (125 ms)", "210"], ["thirty-second (63 ms)", "209"], ["sixty-fourth (31 ms)", "208"]]), "LENGTH");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('LCD initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an LCD\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.debug_lcd_music_note = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('LCD initialize') === -1)
    {
        return '// ERROR: LCD is not initialized!\n';
    } else {

        var dropdown_note = this.getFieldValue('NOTE');
        var dropdown_octave = this.getFieldValue('OCTAVE');
        var dropdown_length = this.getFieldValue('LENGTH');

        var code = '';
        code += 'writeChar(debug_lcd, ' + dropdown_octave + ');\n';
        code += 'writeChar(debug_lcd, ' + dropdown_length + ');\n';
        code += 'writeChar(debug_lcd, ' + dropdown_note + ');\n';

        return code;
    }
};

Blockly.Blocks.debug_lcd_print = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_DEBUG_LCD_PRINT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('MESSAGE')
                .setCheck('String')
                .appendField("LCD print text ");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('LCD initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an LCD\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.debug_lcd_print = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('LCD initialize') === -1)
    {
        return '// ERROR: LCD is not initialized!\n';
    } else {
        var msg = Blockly.propc.valueToCode(this, 'MESSAGE', Blockly.propc.ORDER_NONE);
        return 'dprint(debug_lcd, ' + msg.replace(/%/g, "%%") + ');\n';
    }
};

Blockly.Blocks.debug_lcd_number = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_DEBUG_LCD_NUMBER_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
                .setCheck("Number")
                .appendField("LCD print number");
        this.appendDummyInput()
                .appendField("as")
                .appendField(new Blockly.FieldDropdown([['Decimal', 'DEC'], ['Hexadecimal', 'HEX'], ['Binary', 'BIN']]), "FORMAT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('LCD initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an LCD\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.debug_lcd_number = function () {
    var code = '';
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('LCD initialize') === -1)
    {
        code += '// ERROR: LCD is not initialized!\n';
    } else {
        var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC);
        var format = this.getFieldValue('FORMAT');

        code += 'dprint(debug_lcd, ';
        if (format === 'BIN') {
            code += '"%b"';
        } else if (format === 'HEX') {
            code += '"%x"';
        } else {
            code += '"%d"';
        }

        code += ', ' + value + ');';
    }
    return code;
};

Blockly.Blocks.debug_lcd_action = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_DEBUG_LCD_ACTION_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD command")
                .appendField(new Blockly.FieldDropdown([
                    ["clear screen", "12"],
                    ["move cursor right", "9"],
                    ["move cursor left", "8"],
                    ["move cursor down", "10"],
                    ["carriage return", "13"],
                    ["backlight on", "17"],
                    ["backlight off", "18"],
                    ["display off", "21"],
                    ["display on, cursor off", "22"],
                    ["display on, cursor off, blink", "23"],
                    ["display on, cursor on", "24"],
                    ["display on, cursor on, blink", "25"]
                ]), "ACTION");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('LCD initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an LCD\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.debug_lcd_action = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('LCD initialize') === -1)
    {
        return '// ERROR: LCD is not initialized!\n';
    } else {
        var action = this.getFieldValue('ACTION');
        var code = '';
        code += 'writeChar(debug_lcd, ' + action + ');\n';
        //if(action === '12') {
        code += 'pause(5);\n';
        //}

        return code;
    }
};

Blockly.Blocks.debug_lcd_set_cursor = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_DEBUG_LCD_SET_CURSOR_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('ROW')
                .appendField("LCD set cursor row")
                .setCheck('Number');
        this.appendValueInput('COLUMN')
                .appendField("column")
                .setCheck('Number');

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('LCD initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an LCD\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.debug_lcd_set_cursor = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('LCD initialize') === -1)
    {
        return '// LCD: Serial is not initialized!\n';
    } else {
        if (!this.disabled) {
            var row = Blockly.propc.valueToCode(this, 'ROW', Blockly.propc.ORDER_NONE);
            var column = Blockly.propc.valueToCode(this, 'COLUMN', Blockly.propc.ORDER_NONE);

            var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
            setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
            setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
            Blockly.propc.methods_["constrain_function"] = setup_code;
            Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';
        }
        return 'writeChar(debug_lcd, (128 + (constrain(' + row + ', 0, 3) * 20) + constrain(' + column + ', 0, 19)));\n';
    }
};

Blockly.Blocks.debug_lcd_print_multiple = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_DEBUG_LCD_PRINT_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('LCD print');
        this.appendValueInput('PRINT0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('String')
                .appendField('text');
        this.appendValueInput('PRINT1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField('decimal number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(false);
        this.setMutator(new Blockly.Mutator(['console_print_str', 'console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.optionList_ = ['str', 'dec'];
        this.specDigits_ = false;
        this.setWarningText(null);
    },
    mutationToDom: Blockly.Blocks['console_print_multiple'].mutationToDom,
    domToMutation: Blockly.Blocks['console_print_multiple'].domToMutation,
    decompose: Blockly.Blocks['console_print_multiple'].decompose,
    compose: Blockly.Blocks['console_print_multiple'].compose,
    saveConnections: Blockly.Blocks['console_print_multiple'].saveConnections,
    onchange: function () {
        var warnTxt = null;
        if (this.workspace && this.optionList_.length < 1) {
            warnTxt = 'LCD print multiple must have at least one term.';
        }
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('LCD initialize') === -1)
        {
            warnTxt = 'WARNING: You must use an LCD\ninitialize block at the beginning of your program!';
        }
        this.setWarningText(warnTxt);
    }
};

Blockly.propc.debug_lcd_print_multiple = Blockly.propc.console_print_multiple;


//--------------- XBee Blocks --------------------------------------------------
Blockly.Blocks.xbee_setup = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_XBEE_SETUP_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee initialize DI")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DO_PIN')
                .appendField("DO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DI_PIN')
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["9600", "9600"], ["2400", "2400"], ["4800", "4800"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"]]), "BAUD");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.xbee_setup = function () {
    var do_pin = this.getFieldValue('DO_PIN');
    var di_pin = this.getFieldValue('DI_PIN');
    var baud = this.getFieldValue('BAUD');

    if (!this.disabled) {
        Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
        Blockly.propc.global_vars_["xbee"] = "fdserial *xbee;";
        Blockly.propc.setups_["xbee"] = 'xbee = fdserial_open(' + di_pin + ', ' + do_pin + ', 0, ' + baud + ');\n';
    }
    return '';
};

Blockly.Blocks.xbee_transmit = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_XBEE_TRANSMIT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee transmit")
                .appendField(new Blockly.FieldDropdown([
                    ["text", "TEXT"],
                    ["decimal number", "INT"],
                    ["hexadecimal number", "HEX"],
                    ["binary number", "BIN"],
                    ["ASCII character", "BYTE"]
                ]), "TYPE");
        this.appendValueInput('VALUE')
                .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.stringTypeCheck();
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('XBee initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an XBee\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
        this.stringTypeCheck();
    },
    stringTypeCheck: function () {
        var setType = "Number";
        if (this.getFieldValue('TYPE') === 'TEXT') {
            setType = "String";
        }
        this.getInput('VALUE').setCheck(setType);
    }
};

Blockly.propc.xbee_transmit = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('XBee initialize') === -1)
    {
        return '// ERROR: XBee is not initialized!\n';
    } else {
        var type = this.getFieldValue('TYPE');
        var data = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

        if (type === "BYTE") {
            return 'fdserial_txChar(xbee, (' + data + ' & 0xFF) );\n';
        } else if (type === "INT") {
            return 'dprint(xbee, "%d\\r", ' + data + ');\n';
        } else if (type === "HEX") {
            return 'dprint(xbee, "%x\\r", ' + data + ');\n';
        } else if (type === "BIN") {
            return 'dprint(xbee, "%b\\r", ' + data + ');\n';
        } else {
            var code = 'dprint(xbee, "%s\\r", ' + data.replace(/%/g, "%%") + ');\n';
            code += 'while(!fdserial_txEmpty(xbee));\n';
            code += 'pause(5);\n';

            return code;
        }
    }
};

Blockly.Blocks.xbee_receive = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_XBEE_RECEIVE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee receive")
                .appendField(new Blockly.FieldDropdown([
                    ["text", "TEXT"],
                    ["decimal number", "INT"],
                    ["hexadecimal number", "HEX"],
                    ["binary number", "BIN"],
                    ["ASCII character", "BYTE"]
                ]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('XBee initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an XBee\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    },
    getVarType: function () {
        if (this.getFieldValue('TYPE') === 'TEXT') {
            return "String";
        }
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.xbee_receive = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('XBee initialize') === -1)
    {
        return '// ERROR: XBee is not initialized!\n';
    } else {
        var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
        var type = this.getFieldValue('TYPE');

        if (type === "BYTE") {
            return  data + ' = fdserial_rxChar(xbee);\n';
        } else if (type === "INT") {
            return 'dscan(xbee, "%d", &' + data + ');\n';
        } else if (type === "BIN") {
            return 'dscan(xbee, "%b", &' + data + ');\n';
        } else if (type === "HEX") {
            return 'dscan(xbee, "%x", &' + data + ');\n';
        } else {
            if (!this.disabled) {
                Blockly.propc.global_vars_["xbee_rx"] = "int __XBidx;";
                Blockly.propc.vartype_[data] = 'char *';
            }

            var code = '__XBidx = 0;\n';
            code += 'while(1) {\n';
            code += '  ' + data + '[__XBidx] = fdserial_rxChar(xbee);\n';
            code += '  if(' + data + '[__XBidx] == 13 || ' + data + '[__XBidx] == 10) break;\n';
            code += '  __XBidx++;\n';
            code += '}\n';
            code += data + '[__XBidx] = 0;\nfdserial_rxFlush(xbee);\n';
            return code;
        }
    }
};

Blockly.Blocks.xbee_print_multiple = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_XBEE_PRINT_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('XBee transmit');
        this.appendValueInput('PRINT0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('String')
                .appendField('text');
        this.appendValueInput('PRINT1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField('decimal number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(false);
        this.setMutator(new Blockly.Mutator(['console_print_str', 'console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.optionList_ = ['str', 'dec'];
        this.setWarningText(null);
    },
    mutationToDom: Blockly.Blocks['console_print_multiple'].mutationToDom,
    domToMutation: Blockly.Blocks['console_print_multiple'].domToMutation,
    decompose: Blockly.Blocks['console_print_multiple'].decompose,
    compose: Blockly.Blocks['console_print_multiple'].compose,
    saveConnections: Blockly.Blocks['console_print_multiple'].saveConnections,
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('XBee initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a XBee\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            if (this.workspace && this.optionList_.length < 1) {
                warnTxt = 'XBee transmit multiple must have at least one term.';
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.xbee_print_multiple = Blockly.propc.console_print_multiple;

Blockly.Blocks.xbee_scan_multiple = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_XBEE_SCAN_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('XBee receive');
        this.optionList_ = ['dec', 'char'];
        this.updateShape_();
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.setWarningText(null);
        // not used, but allows this block to share functions from serial_scan_multiple block
        this.ser_pins = [];
        //this.serPins();
    },
    mutationToDom: Blockly.Blocks['serial_scan_multiple'].mutationToDom,
    domToMutation: Blockly.Blocks['serial_scan_multiple'].domToMutation,
    decompose: Blockly.Blocks['serial_scan_multiple'].decompose,
    compose: Blockly.Blocks['serial_scan_multiple'].compose,
    saveConnections: Blockly.Blocks['serial_scan_multiple'].saveConnections,
    updateShape_: Blockly.Blocks['serial_scan_multiple'].updateShape_,
    updateSerPin: function () {},
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        var warnTxt = null;
        if (allBlocks.toString().indexOf('XBee initialize') === -1) {
            warnTxt = 'WARNING: You must use an XBee\ninitialize block at the beginning of your program!';
        }
        if (this.workspace && this.optionList_.length < 1) {
            warnTxt = 'XBee recieve must have at least one search term.';
        }
        this.setWarningText(warnTxt);
    },
    getVars: function () {
        var theVars = [];
        for (var i = 0; i < this.optionList_.length; i++) {
            theVars.push(this.getFieldValue('CPU' + i));
        }
        return theVars;
    },
    renameVar: function (oldName, newName) {
        for (var i = 0; i < this.optionList_.length; i++) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('CPU' + i)))
                this.setFieldValue(newName, 'CPU' + i);
        }
    }
};

Blockly.propc.xbee_scan_multiple = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('XBee initialize') > -1)
    {
        var code = 'dprint(fdser, "';
        var varList = '';
        var code_add = '';
        var i = 0;
        while (this.getFieldValue('CPU' + i)) {
            if (this.getFieldValue('TYPE' + i).includes('decimal number')) {
                code += '%d';
            } else if (this.getFieldValue('TYPE' + i).includes('store ASCII character in')) {
                code += '%c';
            } else if (this.getFieldValue('TYPE' + i).includes('store hexadecimal number in')) {
                code += '%x';
            } else if (this.getFieldValue('TYPE' + i).includes('store binary number in')) {
                code += '%b';
            } else if (this.getFieldValue('TYPE' + i) === 'in') {
                code += '%f';
            }
            if (this.getFieldValue('TYPE' + i) === 'in') {
                varList += ', &__fpBuf' + i;
                code_add += Blockly.propc.variableDB_.getName(this.getFieldValue('CPU' + i), Blockly.Variables.NAME_TYPE);
                code_add += ' = (int) (__fpBuf' + i + ' * ' + this.getFieldValue('MULT' + i) + ');\n';
                if (!this.disabled) {
                    Blockly.propc.global_vars_["floatPointScanBuffer" + i] = 'float __fpBuf' + i + ';';
                }
            } else {
                varList += ', &' + Blockly.propc.variableDB_.getName(this.getFieldValue('CPU' + i), Blockly.Variables.NAME_TYPE);
            }
            i++;
        }
        code += '"' + varList + ');\n' + code_add;
        return code;
    } else {
        return '// ERROR: XBee is not initialized!\n';
    }
};


// -------------- OLED Display blocks ------------------------------------------
Blockly.Blocks.oled_initialize = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_INITIALIZE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        // Field order DIN, CLK, CS, D/C, RES
        this.appendDummyInput()
                .appendField("OLED initialize")
                .appendField("DIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DIN")
                .appendField("CLK")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK")
                .appendField("CS")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CS")
                .appendField("D/C")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DC")
                .appendField("RES")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "RES");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_initialize = function () {
    if (!this.disbled) {
        var cs_pin = this.getFieldValue("CS");
        var dc_pin = this.getFieldValue("DC");
        var din_pin = this.getFieldValue("DIN");
        var clk_pin = this.getFieldValue("CLK");
        var res_pin = this.getFieldValue("RES");

        Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';
        Blockly.propc.setups_["oled"] = 'oledc_init(' + din_pin + ', ' + clk_pin + ', ' + cs_pin + ', ' + dc_pin + ', ' + res_pin + ', 2);';
    }
    return '';
};

Blockly.Blocks.oled_font_loader = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_FONT_LOADER_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("OLED font loader (EEPROM only)");
    }
};

Blockly.propc.oled_font_loader = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.definitions_["oledfonts"] = '#include "oledc_fontLoader.h"';

    var code = 'oledc_fontLoader();';
    return code;
};

Blockly.Blocks.oled_clear_screen = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_CLEAR_SCREEN_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("OLED command")
                .appendField(new Blockly.FieldDropdown([["clear screen", "CLS"], ["sleep", "SLEEP"], ["wake", "WAKE"], ["invert", "INV"]]), "CMD");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_clear_screen = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var cmd = this.getFieldValue("CMD");

        var code = '';
        if (cmd === 'CLS') {
            code += 'oledc_clear(0, 0, oledc_getWidth(), oledc_getHeight() );\n';
        } else if (cmd === 'WAKE') {
            code += 'oledc_wake();\n';
        } else if (cmd === 'SLEEP') {
            code += 'oledc_sleep();\n';
        } else if (cmd === 'INV') {
            code += 'oledc_invertDisplay();\n';
        }
        return code;
    }
}
;

Blockly.Blocks.oled_draw_circle = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_DRAW_CIRCLE_TOOLTIP);
        // First x/y coordinates
        this.appendValueInput("POINT_X")
                .setCheck("Number")
                .appendField("OLED draw circle at (x)");
        this.appendValueInput("POINT_Y")
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("(y)");
        this.appendValueInput("RADIUS")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("radius");
        // Color picker control
        this.appendValueInput('COLOR')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField("color");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("fill")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "ck_fill");

        // Other details
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_draw_circle = function () {
    // Ensure header file is included
    if (!this.disabled) {
        Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var point_x0 = Blockly.propc.valueToCode(this, 'POINT_X', Blockly.propc.ORDER_NONE);
        var point_y0 = Blockly.propc.valueToCode(this, 'POINT_Y', Blockly.propc.ORDER_NONE);
        var radius = Blockly.propc.valueToCode(this, 'RADIUS', Blockly.propc.ORDER_NONE);
        var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);
        var checkbox = this.getFieldValue('ck_fill');
        var code;

        if (checkbox === 'TRUE') {
            code = 'oledc_fillCircle(';
        } else {
            code = 'oledc_drawCircle(';
        }
        code += point_x0 + ', ' + point_y0 + ', ';
        code += radius + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")) ';
        code += ');';

        return code;
    }
};

Blockly.Blocks.oled_draw_line = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_DRAW_LINE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("X_ONE")
                .setCheck('Number')
                .appendField("OLED draw line from 1 (x)");
        this.appendValueInput("Y_ONE")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("(y)");
        this.appendValueInput("X_TWO")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("to 2 (x)");
        this.appendValueInput("Y_TWO")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("(y)");
        this.appendValueInput('COLOR')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField("color");

        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_draw_line = function () {
    // Ensure header file is included
    if (!this.disabled) {
        Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var x_one = Blockly.propc.valueToCode(this, "X_ONE", Blockly.propc.ORDER_NONE);
        var y_one = Blockly.propc.valueToCode(this, "Y_ONE", Blockly.propc.ORDER_NONE);
        var x_two = Blockly.propc.valueToCode(this, "X_TWO", Blockly.propc.ORDER_NONE);
        var y_two = Blockly.propc.valueToCode(this, "Y_TWO", Blockly.propc.ORDER_NONE);
        var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

        var code = '';
        code += 'oledc_drawLine(' + x_one + ', ' + y_one + ', ' + x_two + ', ' + y_two + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));';

        return code;
    }
};

Blockly.Blocks.oled_draw_pixel = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_DRAW_PIXEL_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("X_AXIS")
                .setCheck('Number')
                .appendField("OLED draw pixel at");
        this.appendValueInput("Y_AXIS")
                .setCheck('Number')
                .appendField(",");
        this.appendValueInput('COLOR')
                .setCheck('Number')
                .appendField("color");

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_draw_pixel = function () {
    if (!this.disabled) {
        Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var point_x = Blockly.propc.valueToCode(this, 'X_AXIS', Blockly.propc.ORDER_ATOMIC);
        var point_y = Blockly.propc.valueToCode(this, 'Y_AXIS', Blockly.propc.ORDER_ATOMIC);
        var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

        var code = '';
        code += 'oledc_drawPixel(' + point_x + ', ' + point_y + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));';
        return code;
    }
};

Blockly.Blocks.oled_draw_triangle = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_DRAW_TRIANGLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        // First x/y coordinates
        this.appendValueInput("POINT_X0")
                .setCheck("Number")
                .appendField("OLED draw triangle at 1 (x)");
        this.appendValueInput("POINT_Y0")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("(y)");
        // Second x/y coordinates
        this.appendValueInput("POINT_X1")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("2 (x)");
        this.appendValueInput("POINT_Y1")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("(y)");
        // Third x/y coordinates
        this.appendValueInput("POINT_X2")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("3 (x)");
        this.appendValueInput("POINT_Y2")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("(y)");
        // Color picker control
        this.appendValueInput('COLOR')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("color");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("fill")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "ck_fill");

        // Other details
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_draw_triangle = function () {
    if (!this.disabled) {
        Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var point_x0 = Blockly.propc.valueToCode(this, 'POINT_X0', Blockly.propc.ORDER_NONE);
        var point_y0 = Blockly.propc.valueToCode(this, 'POINT_Y0', Blockly.propc.ORDER_NONE);
        var point_x1 = Blockly.propc.valueToCode(this, 'POINT_X1', Blockly.propc.ORDER_NONE);
        var point_y1 = Blockly.propc.valueToCode(this, 'POINT_Y1', Blockly.propc.ORDER_NONE);
        var point_x2 = Blockly.propc.valueToCode(this, 'POINT_X2', Blockly.propc.ORDER_NONE);
        var point_y2 = Blockly.propc.valueToCode(this, 'POINT_Y2', Blockly.propc.ORDER_NONE);
        var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

        var checkbox = this.getFieldValue('ck_fill');
        var code;
        if (checkbox === 'TRUE') {
            code = 'oledc_fillTriangle(';
        } else {
            code = 'oledc_drawTriangle(';
        }

        code += point_x0 + ', ' + point_y0 + ', ';
        code += point_x1 + ', ' + point_y1 + ', ';
        code += point_x2 + ', ' + point_y2 + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));';
        return code;
    }
};

Blockly.Blocks.oled_draw_rectangle = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_DRAW_RECTANGLE_TOOLTIP);
        this.appendValueInput("POINT_X")
                .setCheck("Number")
                .appendField("OLED draw rectangle at (x)");
        this.appendValueInput("POINT_Y")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("(y)");
        this.appendValueInput("RECT_WIDTH")
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("width");
        this.appendValueInput("RECT_HEIGHT")
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("height");
        this.appendValueInput("RECT_ROUND")
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("roundness");
        // Color picker control
        this.appendValueInput('COLOR')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField("color");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("fill")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "ck_fill");

        // Other details
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_draw_rectangle = function () {
    if (!this.disabled) {
        Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var point_x = Blockly.propc.valueToCode(this, 'POINT_X', Blockly.propc.ORDER_NONE);
        var point_y = Blockly.propc.valueToCode(this, 'POINT_Y', Blockly.propc.ORDER_NONE);
        var width = Blockly.propc.valueToCode(this, 'RECT_WIDTH', Blockly.propc.ORDER_NONE);
        var height = Blockly.propc.valueToCode(this, 'RECT_HEIGHT', Blockly.propc.ORDER_NONE);
        var corners = Blockly.propc.valueToCode(this, 'RECT_ROUND', Blockly.propc.ORDER_NONE);
        var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);
        var checkbox = this.getFieldValue('ck_fill');
        var code;

        if (corners === '0') {
            if (checkbox === 'TRUE') {
                code = 'oledc_fillRect(';
            } else {
                code = 'oledc_drawRect(';
            }
            code += point_x + ', ' + point_y + ', ' + width + ', ' + height + ', ';
        } else {
            // Rounded rectangle
            if (checkbox === 'TRUE') {
                code = 'oledc_fillRoundRect(';
            } else {
                code = 'oledc_drawRoundRect(';
            }
            code += point_x + ', ' + point_y + ', ' + width + ', ' + height + ', ' + corners + ', ';
        }
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));\n';
        return code;
    }
};

Blockly.Blocks.oled_text_size = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_TEXT_SIZE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("OLED text size")
                .appendField(new Blockly.FieldDropdown([["small", "SMALL"], ["medium", "MEDIUM"], ["large", "LARGE"]]), "size_select")
                .appendField("font")
                .appendField(new Blockly.FieldDropdown([["sans", "FONT_SANS"], ["serif", "FONT_SERIF"], ["script", "FONT_SCRIPT"], ["bubble", "FONT_BUBBLE"]]), "font_select");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_text_size = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var size = this.getFieldValue('size_select');
        var font = this.getFieldValue('font_select');

        var code = '';
        code += 'oledc_setTextSize(' + size + ');\n';
        code += 'oledc_setTextFont(' + font + ');\n';
        return code;
    }
};

Blockly.Blocks.oled_text_color = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_TEXT_COLOR_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('FONT_COLOR')
                .setCheck('Number')
                .appendField("OLED font color");
        this.appendValueInput('BACKGROUND_COLOR')
                .setCheck('Number')
                .appendField("font background color");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_text_color = function () {
    if (!this.disabled) {
        Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var font_color = Blockly.propc.valueToCode(this, 'FONT_COLOR', Blockly.propc.ORDER_NONE);
        var background_color = Blockly.propc.valueToCode(this, 'BACKGROUND_COLOR', Blockly.propc.ORDER_NONE);

        var code = '';
        code += 'oledc_setTextColor(';

        //  TO DO: Try this - it's shorter but slightly slower:
        //  code += 'remapColor(' + font_color + ', "8R8G8B", "5R6G5B"), remapColor(' + background_color + ', "8R8G8B", "5R6G5B"));\n';

        code += 'oledc_color565(get8bitColor(' + font_color + ', "RED"), get8bitColor(' + font_color + ', "GREEN"), get8bitColor(' + font_color + ', "BLUE")), ';
        code += 'oledc_color565(get8bitColor(' + background_color + ', "RED"), get8bitColor(' + background_color + ', "GREEN"), get8bitColor(' + background_color + ', "BLUE")));';
        return code;
    }
};

Blockly.Blocks.oled_get_max_height = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_GET_MAX_HEIGHT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("OLED max height");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.oled_get_max_height = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return ['0', Blockly.propc.ORDER_NONE];
    } else {
        return ['oledc_getHeight()', Blockly.propc.ORDER_NONE];
    }
};

Blockly.Blocks.oled_get_max_width = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_GET_MAX_WIDTH_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("OLED max width");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.oled_get_max_width = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return ['0', Blockly.propc.ORDER_NONE];
    } else {
        return ['oledc_getWidth()', Blockly.propc.ORDER_NONE];
    }
};

Blockly.Blocks.oled_set_cursor = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_SET_CURSOR_TOOLTIP);
        this.appendValueInput('X_POS')
                .setCheck('Number')
                .appendField("OLED set cursor at (x)");
        this.appendValueInput('Y_POS')
                .setCheck('Number')
                .appendField("(y)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_set_cursor = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        // Get user input
        var x = Blockly.propc.valueToCode(this, 'X_POS', Blockly.propc.ORDER_NONE);
        var y = Blockly.propc.valueToCode(this, 'Y_POS', Blockly.propc.ORDER_NONE);

        return 'oledc_setCursor(' + x + ', ' + y + ',0);';
    }

};

Blockly.Blocks.oled_print_text = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_PRINT_TEXT_TOOLTIP);
        this.appendValueInput('MESSAGE')
                .setCheck('String')
                .appendField("OLED print text ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_print_text = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var msg = Blockly.propc.valueToCode(this, 'MESSAGE', Blockly.propc.ORDER_NONE);
        return 'oledc_drawText(' + msg + ');';
    }
};

Blockly.Blocks.oled_print_number = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_PRINT_NUMBER_TOOLTIP);
        this.appendValueInput('NUMIN')
                .setCheck('Number')
                .appendField("OLED print number ");
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["Decimal", "DEC"], ["Hexadecimal", "HEX"], ["Binary", "BIN"]]), "type");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            this.setWarningText('WARNING: You must use an OLED\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.oled_print_number = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('OLED initialize') === -1)
    {
        return '// ERROR: OLED is not initialized!\n';
    } else {
        var num = Blockly.propc.valueToCode(this, 'NUMIN', Blockly.propc.ORDER_NONE);
        var type = this.getFieldValue('type');
        return 'oledc_drawNumber(' + num + ', ' + type + ');';
    }
};

Blockly.Blocks.oled_print_multiple = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_OLED_PRINT_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('OLED print');
        this.appendValueInput('PRINT0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('String')
                .appendField('text');
        this.appendValueInput('PRINT1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField('decimal number');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(false);
        this.setMutator(new Blockly.Mutator(['console_print_str', 'console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.optionList_ = ['str', 'dec'];
        this.specDigits_ = false;
        this.setWarningText(null);
    },
    mutationToDom: Blockly.Blocks['console_print_multiple'].mutationToDom,
    domToMutation: Blockly.Blocks['console_print_multiple'].domToMutation,
    decompose: Blockly.Blocks['console_print_multiple'].decompose,
    compose: Blockly.Blocks['console_print_multiple'].compose,
    saveConnections: Blockly.Blocks['console_print_multiple'].saveConnections,
    onchange: function () {
        var warnTxt = null;
        if (this.workspace && this.optionList_.length < 1) {
            warnTxt = 'OLED print multiple must have at least one term.';
        }
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('OLED initialize') === -1)
        {
            warnTxt = 'WARNING: You must use an OLED\ninitialize block at the beginning of your program!';
        }
        this.setWarningText(warnTxt);
    }
};

Blockly.propc.oled_print_multiple = Blockly.propc.console_print_multiple;

// -------------- RGB LEDs (WS2812B module) blocks -----------------------------
Blockly.Blocks.ws2812b_init = {
    helpUrl: Blockly.MSG_WS2812B_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WS2812B_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("RGB-LED initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital, function (myPin) {
                    this.sourceBlock_.onPinSet(myPin);
                }), "PIN")
                .appendField("number of LEDs")
                .appendField(new Blockly.FieldTextInput('4', Blockly.FieldTextInput.numberValidator), "LEDNUM")
                .appendField("type")
                .appendField(new Blockly.FieldDropdown([["WS2812", "WS2812"]]), "TYPE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.rgbPin = this.getFieldValue('PIN');
        this.onPinSet();
    },
    onchange: function (event) {
        this.rgbPin = this.getFieldValue('PIN');
        if (event.oldXml || event.xml) {  // only fire when a block got deleted or created
            this.onPinSet(null);
        }
    },
    onPinSet: function (myPin) {
        var oldPin = this.rgbPin;
        this.rgbPin = myPin;
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        for (var x = 0; x < allBlocks.length; x++) {
            var func = allBlocks[x].rgbPins;
            var fund = allBlocks[x].onchange;
            if (func && myPin) {
                func.call(allBlocks[x], oldPin, myPin);
                if (fund) {
                    fund.call(allBlocks[x], {xml: true});
                }
            } else if (func) {
                func.call(allBlocks[x]);
            }
        }
    }
};

Blockly.propc.ws2812b_init = function () {
    if (!this.disabled) {
        var pin = this.getFieldValue('PIN');
        var num = window.parseInt(this.getFieldValue('LEDNUM'));

        if (num < 1)
            num = 1;
        if (num > 1500)
            num = 1500;

        Blockly.propc.definitions_["ws2812b_def"] = '#include "ws2812.h"';
        Blockly.propc.definitions_["ws2812b_sets" + pin] = '#define LED_PIN' + pin + '   ' + pin + '\n#define LED_COUNT' + pin + '   ' + num;
        Blockly.propc.global_vars_["ws2812b_array" + pin] = 'ws2812 *ws2812b' + pin + ';\nint RGBleds' + pin + '[' + num + '];\n';
        Blockly.propc.setups_["ws2812b_init" + pin] = 'ws2812b' + pin + ' = ws2812b_open();\n';
    }
    return '';
};

Blockly.Blocks.ws2812b_set = {
    helpUrl: Blockly.MSG_WS2812B_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WS2812B_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("LED")
                .setCheck("Number")
                .appendField("RGB-LED set LED number");
        this.appendValueInput("COLOR")
                .setCheck("Number")
                .appendField("to color");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
        this.rgb_pins = [];
        this.warnFlag = 0;
        this.rgbPins();
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('pinmenu', JSON.stringify(this.rgb_pins));
        if (this.getInput('RGBPIN')) {
            container.setAttribute('rgbpin', this.getFieldValue('RGB_PIN'));
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        var rgbpin = xmlElement.getAttribute('rgbpin');
        this.rgb_pins = JSON.parse(xmlElement.getAttribute('pinmenu'));
        if (rgbpin === 'null') {
            rgbpin = null;
        }
        if (this.getInput('RGBPIN')) {
            this.removeInput('RGBPIN');
        }
        if (rgbpin) {
            this.appendDummyInput('RGBPIN')
                    .appendField('PIN')
                    .appendField(new Blockly.FieldDropdown(this.rgb_pins), 'RGB_PIN');
            this.setFieldValue(rgbpin, 'RGB_PIN');
        }
    },
    rgbPins: function (oldPin, newPin) {
        var currentPin = '-1';
        if (this.rgb_pins.length > 0) {
            currentPin = this.rgb_pins[0][0];
        }
        this.rgb_pins.length = 0;
        if (this.getInput('RGBPIN')) {
            currentPin = this.getFieldValue('RGB_PIN');
        }
        this.updateRGBpin();
        if (this.getInput('RGBPIN')) {
            this.removeInput('RGBPIN');
        }
        if (this.rgb_pins.length > 1) {
            this.appendDummyInput('RGBPIN')
                    .appendField('PIN')
                    .appendField(new Blockly.FieldDropdown(this.rgb_pins), 'RGB_PIN');
            if (currentPin === oldPin || oldPin === null) {
                this.setFieldValue(newPin, 'RGB_PIN');
            } else {
                if (this.getInput('RGBPIN') && currentPin !== '-1') {
                    this.setFieldValue(currentPin, 'RGB_PIN');
                }
            }
        }
    },
    updateRGBpin: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        this.rgb_pins.length = 0;
        for (var x = 0; x < allBlocks.length; x++) {
            if (allBlocks[x].type === 'ws2812b_init') {
                var cp = allBlocks[x].rgbPin || allBlocks[x].getFieldValue('PIN');
                if (cp) {
                    this.rgb_pins.push([cp, cp]);
                }
            }
        }
        this.rgb_pins = uniq_fast(this.rgb_pins);
    },
    onchange: function (event) {
        // only fire when a block got deleted or created, the RGB_PIN field was changed
        if (event.oldXml || event.type === Blockly.Events.CREATE || (event.name === 'RGB_PIN' && event.blockId === this.id) || this.warnFlag > 0) {
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
            if (allBlocks.toString().indexOf('RGB-LED initialize') === -1)
            {
                this.setWarningText('WARNING: You must use an RGB-LED\ninitialize block at the beginning of your program!');
            } else {
                this.setWarningText(null);
                this.warnFlag--;
                if (this.getInput('RGBPIN')) {
                    var allRGBpins = '';
                    for (var x = 0; x < allBlocks.length; x++) {
                        if (allBlocks[x].type === 'ws2812b_init') {
                            allRGBpins += (allBlocks[x].rgbPin || allBlocks[x].getFieldValue('PIN')) + ',';
                        }
                    }
                    if (allRGBpins.indexOf(this.getFieldValue('RGB_PIN')) === -1) {
                        this.setWarningText('WARNING: You must use choose a new PIN for this block!');
                        // let all changes through long enough to ensure this is set properly.
                        this.warnFlag = allBlocks.length * 3;
                    }
                }
            }
        }
    }
};

Blockly.propc.ws2812b_set = function () {
    this.updateRGBpin();
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('RGB-LED initialize') === -1)
    {
        return '// ERROR: RGB-LED is not initialized!\n';
    } else {
        var led = Blockly.propc.valueToCode(this, 'LED', Blockly.propc.ORDER_NONE);
        var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

        if (!this.disabled) {
            var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
            setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
            setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
            Blockly.propc.methods_["constrain_function"] = setup_code;
            Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';
        }
        var p = '0';
        if (this.rgb_pins.length > 0) {
            p = this.rgb_pins[0][0];
        }
        if (this.getInput('RGBPIN')) {
            p = this.getFieldValue('RGB_PIN');
        }
        var code = 'RGBleds' + p + '[constrain(' + led + ', 1, LED_COUNT' + p + ') - 1] = ' + color + ';\n';
        return code;
    }
};

Blockly.Blocks.ws2812b_set_multiple = {
    helpUrl: Blockly.MSG_WS2812B_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WS2812B_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("START")
                .setCheck("Number")
                .appendField("RGB-LED set LEDs from");
        this.appendValueInput("END")
                .setCheck("Number")
                .appendField("to");
        this.appendValueInput("COLOR")
                .setCheck("Number")
                .appendField("to color");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
        this.rgb_pins = [];
        this.rgbPins();
    },
    mutationToDom: Blockly.Blocks['ws2812b_set'].mutationToDom,
    domToMutation: Blockly.Blocks['ws2812b_set'].domToMutation,
    rgbPins: Blockly.Blocks['ws2812b_set'].rgbPins,
    updateRGBpin: Blockly.Blocks['ws2812b_set'].updateRGBpin,
    onchange: Blockly.Blocks['ws2812b_set'].onchange
};

Blockly.propc.ws2812b_set_multiple = function () {
    this.updateRGBpin();
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('RGB-LED initialize') === -1)
    {
        return '// ERROR: RGB-LED is not initialized!\n';
    } else {
        var start = Blockly.propc.valueToCode(this, 'START', Blockly.propc.ORDER_NONE);
        var end = Blockly.propc.valueToCode(this, 'END', Blockly.propc.ORDER_NONE);
        var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);
        var p = '0';
        if (this.rgb_pins.length > 0) {
            p = this.rgb_pins[0][0];
        }
        if (this.getInput('RGBPIN')) {
            p = this.getFieldValue('RGB_PIN');
        }
        var code = '';
        if (!this.disabled) {
            var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
            setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
            setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
            Blockly.propc.methods_["constrain_function"] = setup_code;
            Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';
        }
        code += 'for(int __ldx = ' + start + '; __ldx <= ' + end + '; __ldx++) {';
        code += 'RGBleds' + p + '[constrain(__ldx, 1, LED_COUNT' + p + ') - 1] = ' + color + ';}';
        return code;
    }
};

Blockly.Blocks.ws2812b_update = {
    helpUrl: Blockly.MSG_WS2812B_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WS2812B_UPDATE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("RGB-LED update LEDs");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
        this.rgb_pins = [];
        this.rgbPins();
    },
    mutationToDom: Blockly.Blocks['ws2812b_set'].mutationToDom,
    domToMutation: Blockly.Blocks['ws2812b_set'].domToMutation,
    rgbPins: Blockly.Blocks['ws2812b_set'].rgbPins,
    updateRGBpin: Blockly.Blocks['ws2812b_set'].updateRGBpin,
    onchange: Blockly.Blocks['ws2812b_set'].onchange
};

Blockly.propc.ws2812b_update = function () {
    this.updateRGBpin();
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('RGB-LED initialize') === -1)
    {
        return '// ERROR: RGB-LED is not initialized!\n';
    } else {
        var p = '0';
        if (this.rgb_pins.length > 0) {
            p = this.rgb_pins[0][0];
        }
        if (this.getInput('RGBPIN')) {
            p = this.getFieldValue('RGB_PIN');
        }
        return 'ws2812_set(ws2812b' + p + ', LED_PIN' + p + ', RGBleds' + p + ', LED_COUNT' + p + ');\n';
    }
};

// --------------------- Simple WX Module --------------------------------------
Blockly.Blocks.wx_init = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_INIT_TOOLTIP);
        var bkg_colors = new Blockly.FieldColour("#FFFFFF");
        bkg_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Simple WX initialize')
                .appendField("mode")
                .appendField(new Blockly.FieldDropdown([['Terminal on USB', 'USB_PGM_TERM'], ['Terminal on WX', 'USB_PGM'], ['Term & Programming on WX', 'WX_ALL_COM']]), "MODE")  // .concat(profile.default.digital)
                .appendField(" DI")
                .appendField(new Blockly.FieldDropdown([['WX Socket', '30']].concat(profile.default.digital), function (pin) {
                    this.sourceBlock_.updateShape_({"PIN": pin});
                }), "DI");
        this.appendDummyInput('DOPIN')
                .appendField("DO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DO");
        this.getInput('DOPIN').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var pin = this.getFieldValue('DI');
        container.setAttribute('pin', pin);
        return container;
    },
    domToMutation: function (xmlElement) {
        var pin = xmlElement.getAttribute('pin');
        this.updateShape_({"PIN": pin});
    },
    updateShape_: function (details) {
        if (details['PIN'] === '30')
            this.getInput('DOPIN').setVisible(false);
        else
            this.getInput('DOPIN').setVisible(true);
    }
};

Blockly.propc.wx_init = function () {
    if (!this.diabled) {
        var pin_do = this.getFieldValue('DO');
        var pin_di = this.getFieldValue('DI');
        if (pin_di === '30')
            pin_do = '31';
        var bkg = (this.getFieldValue('BKG') === '#FFFFFF') ? '1' : '0';
        var title = this.getFieldValue('TITLE');
        var mode = this.getFieldValue('MODE');
        //if(pin_do === '31' && pin_di === '30' && mode === 'USB_PGM') mode = 'WX_ALL_COM';
        var code = '';
        code += 'wifi_start(' + pin_do + ', ' + pin_di + ', 115200, ' + mode + ');\n';
        code += 'wifi_setBuffer(__wxBffr, sizeof(__wxBffr));\n';
        code += '__wsId = wifi_listen(WS, "/ws/a");\n';
        code += 'while(!__wsHandle) {\n  wifi_poll(&__wxEvent, &__wxId, &__wxHandle);\n';
        code += '  if(__wxEvent == \'W\' && __wxId == __wsId)  __wsHandle = __wxHandle;\n}';

        var vars = '';
        vars += 'int __wxEvent, __wxId, __wxHandle, __wsId, __wv[15], __wsHandle = 0;\n';
        vars += 'char __wxBffr[136];\n';

        Blockly.propc.definitions_["wx_def"] = '#include "wifi.h"';
        Blockly.propc.global_vars_["wx_vars"] = vars;
        Blockly.propc.setups_["wx_init"] = code;
    }
    return '';
};

Blockly.Blocks.wx_config_page = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_CONFIG_PAGE_TOOLTIP);
        var bkg_colors = new Blockly.FieldColour("#FFFFFF");
        bkg_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Simple WX configure page title")
                .appendField(new Blockly.FieldTextInput('title'), 'TITLE')
                .appendField(" background color")
                .appendField(bkg_colors, "BKG");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Simple WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Simple WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('WX ') === 0) {
                    warnTxt = 'WARNING: You cannot use Simple WX and\nAdvanced WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_config_page = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1)
    {
        return '// ERROR: Simple WX is not initialized!\n';
    } else {
        var bkg = (this.getFieldValue('BKG') === '#FFFFFF') ? '1' : '0';
        var title = this.getFieldValue('TITLE');
        var code = 'wifi_print(WS, __wsHandle, "S,' + bkg + ',' + title + '");\n';

        return code;
    }
};

Blockly.Blocks.wx_set_widget = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput("SET_1")
                .appendField("Simple WX configure widget")
                .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"]]), "WIDGET")
                .appendField("to a")
                .appendField(new Blockly.FieldDropdown([
                    ["Button \u2794", '0'],
                    ["Switch \u2794", '1'],
                    ["Slider \u2794", '2'],
                    ["Send Value \u2794", '3'],
                    ["Pick Color \u2794", '4'],
                    ["\u2794 Show Value", '5'],
                    ["\u2794 Gauge", '6'],
                    ["\u2794 Bar Graph", '7'],
                    ["\u2794 Show Color", '8'],
                    ["\u2794 Light Bulb", '9'],
                    ["Clear Widget", '10']], function (type) {
                    this.sourceBlock_.updateShape_({"TYPE": type});
                }), "TYPE")
                .appendField(" label")
                .appendField(new Blockly.FieldTextInput('label'), 'LABEL');
        this.appendDummyInput("SET_2")
                .appendField("widget color")
                .appendField(new Blockly.FieldColour("#ffffff"), "COLOR")
                .appendField(" minimum")
                .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), 'MIN')
                .appendField(" maximum")
                .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'MAX')
                .appendField(" initial value")
                .appendField(new Blockly.FieldTextInput('5', Blockly.FieldTextInput.numberValidator), 'INITIAL');
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Simple WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Simple WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('WX ') === 0) {
                    warnTxt = 'WARNING: You cannot use Simple WX and\nAdvanced WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var type = this.getFieldValue('TYPE');
        container.setAttribute('w_type', type);
        var color = this.getFieldValue('COLOR');
        container.setAttribute('w_color', color);
        var min = this.getFieldValue('MIN');
        container.setAttribute('w_min', min);
        var max = this.getFieldValue('MAX');
        container.setAttribute('w_max', max);
        var initial = this.getFieldValue('INITIAL');
        container.setAttribute('w_init', initial);

        return container;
    },
    domToMutation: function (xmlElement) {
        var type = xmlElement.getAttribute('w_type');
        var color = xmlElement.getAttribute('w_color');
        var min = xmlElement.getAttribute('w_min');
        var max = xmlElement.getAttribute('w_max');
        var initial = xmlElement.getAttribute('w_init');
        this.updateShape_({"TYPE": type, "COLOR": color, "MIN": min, "MAX": max, "INITIAL": initial});
    },
    updateShape_: function (details) {
        var type = details['TYPE'];
        if (details['TYPE'] === undefined) {
            type = this.getFieldValue('TYPE');
        }
        var min = details['MIN'];
        if (details['MIN'] === undefined) {
            min = this.getFieldValue('MIN');
        }
        var max = details['MAX'];
        if (details['MAX'] === undefined) {
            max = this.getFieldValue('MAX');
        }
        var color = details['COLOR'];
        if (details['COLOR'] === undefined) {
            color = this.getFieldValue('COLOR');
        }
        var initial = details['INITIAL'];
        if (details['INITIAL'] === undefined) {
            initial = this.getFieldValue('INITIAL');
        }
        if (this.getInput('SET_2') !== undefined) {
            this.removeInput('SET_2');
        }
        var inputPins;
        if (type !== '10') {
            this.appendDummyInput("SET_2");
            inputPins = this.getInput('SET_2');
        }
        if (type === '2' || type === '6' || type === '7') {
            inputPins.appendField("widget color")
                    .appendField(new Blockly.FieldColour("#ffffff"), "COLOR")
                    .appendField(" minimum")
                    .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), 'MIN')
                    .appendField(" maximum")
                    .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'MAX')
                    .appendField(" initial value")
                    .appendField(new Blockly.FieldTextInput('5', Blockly.FieldTextInput.numberValidator), 'INITIAL');
        } else if (type === '1') {
            inputPins.appendField("widget color")
                    .appendField(new Blockly.FieldColour("#ffffff"), "COLOR")
                    .appendField(" off value")
                    .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), 'MIN')
                    .appendField(" on value")
                    .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'MAX')
                    .appendField(" initial state")
                    .appendField(new Blockly.FieldDropdown([['on', 'on'], ['off', 'off']]), 'INITIAL');
        } else if (type === '0' || type === '5' || type === '9') {
            inputPins.appendField("widget color")
                    .appendField(new Blockly.FieldColour("#ffffff"), "COLOR")
                    .appendField(" initial value")
                    .appendField(new Blockly.FieldTextInput('5', Blockly.FieldTextInput.numberValidator), 'INITIAL');
        } else if (type === '8') {
            inputPins.appendField("widget color")
                    .appendField(new Blockly.FieldColour("#ffffff"), "COLOR")
                    .appendField(" initial color shown")
                    .appendField(new Blockly.FieldColour("#ffffff"), "INITIAL");
        } else if (type === '3' || type === '4') {
            inputPins.appendField("widget color")
                    .appendField(new Blockly.FieldColour("#ffffff"), "COLOR");
        }

        if (this.getField('TYPE') && type !== null) {
            this.setFieldValue(type, 'TYPE');
        }
        if (this.getField('MIN') && min !== null) {
            this.setFieldValue(min, 'MIN');
        }
        if (this.getField('MAX') && max !== null) {
            this.setFieldValue(max, 'MAX');
        }
        if (this.getField('COLOR') && color !== null) {
            this.setFieldValue(color, 'COLOR');
        }
        if (this.getField('INITIAL') && initial !== null) {
            this.setFieldValue(initial, 'INITIAL');
            if (type === '1' && initial === min)
                this.setFieldValue('off', 'INITIAL');
            if (type === '1' && initial === max)
                this.setFieldValue('on', 'INITIAL');
        }

    }
};

Blockly.propc.wx_set_widget = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1)
    {
        return '// ERROR: Simple WX is not initialized!\n';
    } else {
        var widget = this.getFieldValue('WIDGET');
        var label = this.getFieldValue('LABEL');
        var type = this.getFieldValue('TYPE');
        var color = this.getFieldValue('COLOR').substr(1).toUpperCase();
        var min = window.parseInt(this.getFieldValue('MIN') || '0');
        var max = window.parseInt(this.getFieldValue('MAX') || '10');
        var initial;
        if (type === '8') {
            initial = (window.parseInt((this.getFieldValue('INITIAL') || '#FFFFFF').substr(1), 16)).toString(10);
        } else if (this.getFieldValue('INITIAL') === 'on') {
            initial = max;
        } else if (this.getFieldValue('INITIAL') === 'off') {
            initial = min;
        } else {
            initial = (window.parseInt(this.getFieldValue('INITIAL') || '5')).toString(10);
        }

        var code = '';
        code += 'wifi_print(WS, __wsHandle, "W,' + widget + ',' + type + ',' + label + ',';
        code += min + ',' + max + ',' + initial + ',' + color + '");\n';
        return code;
    }
};

Blockly.Blocks.wx_send_widget = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_SEND_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("NUM")
                .setCheck("Number")
                .appendField("Simple WX send");
        this.appendDummyInput()
                .appendField("to widget")
                .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"]]), "WIDGET");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Simple WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Simple WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('WX ') === 0) {
                    warnTxt = 'WARNING: You cannot use Simple WX and\nAdvanced WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_send_widget = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1)
    {
        return '// ERROR: Simple WX is not initialized!\n';
    } else {
        var num = Blockly.propc.valueToCode(this, 'NUM', Blockly.propc.ORDER_NONE);
        var widget = this.getFieldValue('WIDGET');
        var type = this.getFieldValue('TYPE');
        var code = 'wifi_print(WS, __wsHandle, "D,' + widget + ',%d", ' + num + ');\n';

        return code;
    }
};

Blockly.Blocks.wx_read_widgets = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_READ_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Simple WX read widgets");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Simple WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Simple WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('WX ') === 0) {
                    warnTxt = 'WARNING: You cannot use Simple WX and\nAdvanced WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_read_widgets = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1)
    {
        return '// ERROR: Simple WX is not initialized!\n';
    } else {
        var code = '';
        code += 'wifi_print(WS, __wsHandle, "U,0");\n__wv[0] = 0;\n';
        code += 'while(__wv[0] != \'V\') {  __wv[0]++;\n  wifi_poll(&__wxEvent, &__wxId,';
        code += '&__wxHandle);\n  if(__wxEvent == \'W\' && __wxId == __wsId)';
        code += '__wsHandle = __wxHandle;\n   if(__wxEvent == \'D\') ';
        code += 'wifi_scan(WS, __wxHandle, "%c%d%d%d%d%d%d%d%d%d%d%d%d%d%d", ';
        code += '&__wv[0], &__wv[1], &__wv[2], &__wv[3], &__wv[4], &__wv[5], &__wv[6], ';
        code += '&__wv[7], &__wv[8], &__wv[9], &__wv[10], &__wv[11], &__wv[12], &__wv[13], &__wv[14]);\n';
        code += 'if(__wxEvent == \'X\') {__wsHandle = 0;\nwhile (!__wsHandle)';
        code += '{wifi_poll( & __wxEvent, & __wxId, & __wxHandle);\nif (__wxEvent == \'W\' ';
        code += '&& __wxId == __wsId) __wsHandle = __wxHandle;}break;}}';
        return code;
    }
};

Blockly.Blocks.wx_get_widget = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Simple WX widget")
                .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["device horizontal tilt", "13"], ["device vertical tilt", "14"]]), "WIDGET")
                .appendField("value");
        this.setOutput(true, "Number");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Simple WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Simple WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('WX ') === 0) {
                    warnTxt = 'WARNING: You cannot use Simple WX and\nAdvanced WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_get_widget = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1)
    {
        return '// ERROR: Simple WX is not initialized!\n';
    } else {
        var widget = this.getFieldValue('WIDGET');
        return ['__wv[' + widget + ']', Blockly.propc.ORDER_ATOMIC];
    }

};

Blockly.Blocks.wx_evt_connected = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Simple WX connected");
        this.setOutput(true, "Number");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Simple WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Simple WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('WX ') === 0) {
                    warnTxt = 'WARNING: You cannot use Simple WX and\nAdvanced WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_evt_connected = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1)
    {
        return '// ERROR: Simple WX is not initialized!\n';
    } else {
        return ['(__wxEvent != \'X\')', Blockly.propc.ORDER_ATOMIC];
    }
};

Blockly.Blocks.wx_reconnect = {
    helpUrl: Blockly.MSG_SWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SWX_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Simple WX reconnect");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Simple WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Simple WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('WX ') === 0) {
                    warnTxt = 'WARNING: You cannot use Simple WX and\nAdvanced WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_reconnect = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1)
    {
        return '// ERROR: Simple WX is not initialized!\n';
    } else {
        var code = '__wsId = wifi_listen(WS, "/ws/a"); __wsHandle = 0;\n';
        code += 'while(!__wsHandle) {\n  wifi_poll(&__wxEvent, &__wxId, &__wxHandle);\n';
        code += '  if(__wxEvent == \'W\' && __wxId == __wsId)  __wsHandle = __wxHandle;\n}';
        return code;
    }
};

// ---------------- Advanced WX Blocks -----------------------------------------

Blockly.Blocks.wx_init_adv = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_INIT_ADV_TOOLTIP);
        var bkg_colors = new Blockly.FieldColour("#FFFFFF");
        bkg_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('WX initialize')
                .appendField("mode")
                .appendField(new Blockly.FieldDropdown([['Terminal on USB', 'USB_PGM_TERM'], ['Terminal on WX', 'USB_PGM'], ['Term & Programming on WX', 'WX_ALL_COM']]), "MODE")  // .concat(profile.default.digital)
                .appendField(" DI")
                .appendField(new Blockly.FieldDropdown([['WX Socket', '30']].concat(profile.default.digital), function (pin) {
                    this.sourceBlock_.updateShape_({"PIN": pin});
                }), "DI");
        this.appendDummyInput('DOPIN')
                .appendField("DO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DO");
        this.getInput('DOPIN').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText(null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var pin = this.getFieldValue('DI');
        container.setAttribute('pin', pin);
        return container;
    },
    domToMutation: function (xmlElement) {
        var pin = xmlElement.getAttribute('pin');
        this.updateShape_({"PIN": pin});
    },
    updateShape_: function (details) {
        if (details['PIN'] === '30')
            this.getInput('DOPIN').setVisible(false);
        else
            this.getInput('DOPIN').setVisible(true);
    }
};

Blockly.propc.wx_init_adv = function () {
    if (!this.disabled) {
        var pin_do = this.getFieldValue('DO');
        var pin_di = this.getFieldValue('DI');
        if (pin_di === '30')
            pin_do = '31';
        var bkg = (this.getFieldValue('BKG') === '#FFFFFF') ? '1' : '0';
        var title = this.getFieldValue('TITLE');
        var mode = this.getFieldValue('MODE');

        var code = 'wifi_start(' + pin_do + ', ' + pin_di + ', 115200, ' + mode + ');\n';

        Blockly.propc.definitions_["wx_def"] = '#include "wifi.h"';
        Blockly.propc.setups_["wx_init"] = code;
    }
    return '';
};

Blockly.Blocks.wx_scan_multiple = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_SCAN_MULTIPLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('WX scan')
                .appendField(new Blockly.FieldDropdown([["POST", "POST"], ["Websocket", "WS"], ["Command", "CMD"]], function (action) {
                    this.sourceBlock_.setPrefix_({"ACTION": action});
                }), "CONNECTION")
                .appendField('from handle')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'HANDLE');
        this.appendDummyInput('PREFIX')
                .appendField('string starts with')
                .appendField(new Blockly.FieldTextInput('txt'), 'START');
        this.optionList_ = ['dec', 'dec'];
        this.updateShape_();
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['wx_scan_dec', 'wx_scan_char']));
        this.setWarningText(null);
    },
    mutationToDom: function (workspace) {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        container.setAttribute('options', JSON.stringify(this.optionList_));
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        var value = JSON.parse(container.getAttribute('options'));
        this.optionList_ = value;
        this.updateShape_();
    },
    decompose: function (workspace) {
        // Populate the mutator's dialog with this block's components.
        var containerBlock = workspace.newBlock('wx_scan_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.optionList_.length; i++) {
            var optionBlock = workspace.newBlock(
                    'wx_scan_' + this.optionList_[i]);
            optionBlock.initSvg();
            connection.connect(optionBlock.previousConnection);
            connection = optionBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        // Reconfigure this block based on the mutator dialog's components.
        var optionBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        this.optionList_.length = 0;
        var data = [];
        while (optionBlock) {
            if (optionBlock.type === 'wx_scan_dec') {
                this.optionList_.push('dec');
            } else if (optionBlock.type === 'wx_scan_char') {
                this.optionList_.push('char');
            }
            data.push([optionBlock.userData_, optionBlock.cpuData_]);
            optionBlock = optionBlock.nextConnection &&
                    optionBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Restore any data.
        for (var i = 0; i < this.optionList_.length; i++) {
            var userData = data[i][0];
            if (userData !== undefined) {
                this.setFieldValue(data[i][1], 'CPU' + i);
            }
        }
    },
    saveConnections: function (containerBlock) {
        // Store all data for each option.
        var optionBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (optionBlock) {
            optionBlock.cpuData_ = this.getFieldValue('CPU' + i) || Blockly.LANG_VARIABLES_GET_ITEM;
            i++;
            optionBlock.userData_ = this.getFieldValue('CPU' + i);
            optionBlock = optionBlock.nextConnection &&
                    optionBlock.nextConnection.targetBlock();
        }
    },
    updateShape_: function () {
        // Delete everything.
        var i = 0;
        while (this.getInput('OPTION' + i)) {
            this.removeInput('OPTION' + i);
            i++;
        }
        // Rebuild block.


        for (var i = 0; i < this.optionList_.length; i++) {
            var type = this.optionList_[i];
            var label = 'store character in';
            if (type === 'dec')
                label = 'store integer in';
            this.appendDummyInput('OPTION' + i)
                    .appendField(label, 'TYPE' + i)
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'CPU' + i);
        }
    },
    setPrefix_: function (details) {
        var prefixVisible = false;
        if (details['ACTION'] === 'POST')
            prefixVisible = true;
        this.getInput('PREFIX').setVisible(prefixVisible);
        var data = [];
        var x = 0;
        while (this.getInput('OPTION' + x)) {
            data[x] = this.getFieldValue('CPU' + x);
            this.removeInput('OPTION' + x);
            x++;
        }

        for (var i = 0; i < x; i++) {
            var type = this.optionList_[i];
            var label = 'store character in';
            if (type === 'dec')
                label = 'store integer in';
            this.appendDummyInput('OPTION' + i)
                    .appendField(label, 'TYPE' + i)
                    .appendField(new Blockly.FieldVariable(data[i]), 'CPU' + i);
        }
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            if (this.workspace && this.optionList_.length < 1) {
                warnTxt = 'WX scan must have at least one search term.';
            }
            this.setWarningText(warnTxt);
        }
    },
    getVars: function () {
        var theVars = [this.getFieldValue('HANDLE')];
        for (var i = 0; i < this.optionList_.length; i++) {
            theVars.push(this.getFieldValue('CPU' + i));
        }
        return theVars;
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('HANDLE')))
            this.setFieldValue(newName, 'HANDLE');
        for (var i = 0; i < this.optionList_.length; i++) {
            if (Blockly.Names.equals(oldName, this.getFieldValue('CPU' + i)))
                this.setFieldValue(newName, 'CPU' + i);

        }
    }
};

Blockly.Blocks.wx_scan_container = {
    // Container.
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('scan');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks.wx_scan_dec = {
    // Add text option.
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('integer');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks.wx_scan_char = {
    // Add image option.
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('character');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.propc.wx_scan_multiple = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var handle = Blockly.propc.variableDB_.getName(this.getFieldValue('HANDLE'), Blockly.Variables.NAME_TYPE);
        var conn = this.getFieldValue('CONNECTION');
        var start = this.getFieldValue('START').replace(/'/g, '\\\'').replace(/"/g, '\\"');

        if (conn !== 'POST')
            start = '';

        var code = 'wifi_scan(' + conn + ', ' + handle + ', "' + start;
        var varList = '';
        var i = 0;
        while (this.getFieldValue('CPU' + i)) {
            if (this.getFieldValue('TYPE' + i).includes('integer')) {
                code += '%d';
            } else {
                code += '%c';
            }
            varList += ', &' + Blockly.propc.variableDB_.getName(this.getFieldValue('CPU' + i), Blockly.Variables.NAME_TYPE);
            i++;
        }
        code += '"' + varList + ');\n';
        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};


Blockly.Blocks.wx_print_multiple = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_PRINT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('WX print to')
                .appendField(new Blockly.FieldDropdown([["GET", "GET"], ["TCP", "TCP"], ["Websocket", "WS"], ["Command", "CMD"]]), "CONNECTION")
                .appendField('handle')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'HANDLE');
        this.appendValueInput('PRINT0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('String')
                .appendField('string');
        this.appendValueInput('PRINT1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField('integer');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['console_print_str', 'console_print_dec', 'console_print_hex', 'console_print_bin', 'console_print_float', 'console_print_char']));
        this.optionList_ = ['str', 'dec'];
        this.setWarningText(null);
    },
    mutationToDom: Blockly.Blocks['console_print_multiple'].mutationToDom,
    domToMutation: Blockly.Blocks['serial_print_multiple'].domToMutation,
    decompose: Blockly.Blocks['console_print_multiple'].decompose,
    compose: Blockly.Blocks['serial_print_multiple'].compose,
    saveConnections: Blockly.Blocks['console_print_multiple'].saveConnections,
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            if (this.workspace && this.optionList_.length < 1) {
                warnTxt = 'WX scan must have at least one search term.';
            }
            this.setWarningText(warnTxt);
        }
    },
    getVars: function () {
        return [this.getFieldValue('HANDLE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('HANDLE'))) {
            this.setFieldValue(newName, 'HANDLE');
        }
    }
};

Blockly.propc.wx_print_multiple = Blockly.propc.console_print_multiple;

Blockly.Blocks.wx_scan_string = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_SCAN_STRING_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('WX scan')
                .appendField(new Blockly.FieldDropdown([["POST", "POST"], ["Websocket", "WS"], ["Command", "CMD"]], function (action) {
                    this.sourceBlock_.setPrefix_({"ACTION": action});
                }), "CONNECTION")
                .appendField('from handle')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'HANDLE');
        this.appendDummyInput('PREFIX')
                .appendField('string starts with')
                .appendField(new Blockly.FieldTextInput('txt'), 'START');
        this.appendDummyInput('STORE')
                .appendField('store string in')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VARNAME');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
    },
    setPrefix_: function (details) {
        var prefixVisible = false;
        if (details['ACTION'] === 'POST')
            prefixVisible = true;
        this.getInput('PREFIX').setVisible(prefixVisible);
        var data = this.getFieldValue('VARNAME');
        this.removeInput('STORE');

        this.appendDummyInput('STORE')
                .appendField('store string in')
                .appendField(new Blockly.FieldVariable(data), 'VARNAME');
    },
    getVars: function () {
        return [this.getFieldValue('VARNAME'), this.getFieldValue('HANDLE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('HANDLE')))
            this.setFieldValue(newName, 'HANDLE');
        if (Blockly.Names.equals(oldName, this.getFieldValue('VARNAME')))
            this.setFieldValue(newName, 'VARNAME');
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_scan_string = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var handle = Blockly.propc.variableDB_.getName(this.getFieldValue('HANDLE'), Blockly.Variables.NAME_TYPE);
        var conn = this.getFieldValue('CONNECTION');
        var start = this.getFieldValue('START').replace(/'/g, '\\\'').replace(/"/g, '\\"');
        var store = Blockly.propc.variableDB_.getName(this.getFieldValue('VARNAME'), Blockly.Variables.NAME_TYPE);

        Blockly.propc.vartype_[store] = 'char *';

        if (conn !== 'POST')
            start = '';

        var code = 'wifi_scan(' + conn + ', ' + handle + ', "' + start + '%s", &' + store + ');\n';

        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
}
;

Blockly.Blocks.wx_send_string = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_SEND_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("DATA")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX send string")
                .setCheck("String");
        this.appendDummyInput()
                .appendField("handle")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'HANDLE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('HANDLE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('HANDLE'))) {
            this.setFieldValue(newName, 'HANDLE');
        }
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_send_string = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var data = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_NONE);
        var handle = Blockly.propc.variableDB_.getName(this.getFieldValue('HANDLE'), Blockly.Variables.NAME_TYPE);

        var code = 'wifi_send(' + handle + ', ' + data + ', sizeof(' + data + '));\n';

        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_receive_string = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_RECEIVE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX receive store string in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'DATA')
                .appendField("byte count in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BYTES');
        this.appendValueInput("MAX")
                .appendField("handle")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'HANDLE')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("max bytes");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setInputsInline(false);
    },
    getVars: function () {
        return [this.getFieldValue('DATA'), this.getFieldValue('BYTES'), this.getFieldValue('HANDLE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('DATA')))
            this.setFieldValue(newName, 'DATA');
        if (Blockly.Names.equals(oldName, this.getFieldValue('BYTES')))
            this.setFieldValue(newName, 'BYTES');
        if (Blockly.Names.equals(oldName, this.getFieldValue('HANDLE')))
            this.setFieldValue(newName, 'HANDLE');
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_receive_string = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var data = Blockly.propc.variableDB_.getName(this.getFieldValue('DATA'), Blockly.Variables.NAME_TYPE);
        var handle = Blockly.propc.variableDB_.getName(this.getFieldValue('HANDLE'), Blockly.Variables.NAME_TYPE);
        var max = Blockly.propc.valueToCode(this, 'MAX', Blockly.propc.NONE) || '64';
        var bytes = Blockly.propc.variableDB_.getName(this.getFieldValue('BYTES'), Blockly.Variables.NAME_TYPE);

        Blockly.propc.vartype_[data] = 'char *';

        var code = bytes + ' = wifi_recv(' + handle + ', ' + data + ', ' + max + ');\n';
        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_poll = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_POLL_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("WX poll store event in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'EVENT')
                .appendField("ID in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'ID')
                .appendField("handle in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'HANDLE');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('ID'), this.getFieldValue('EVENT'), this.getFieldValue('HANDLE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('ID')))
            this.setFieldValue(newName, 'ID');
        if (Blockly.Names.equals(oldName, this.getFieldValue('EVENT')))
            this.setFieldValue(newName, 'EVENT');
        if (Blockly.Names.equals(oldName, this.getFieldValue('HANDLE')))
            this.setFieldValue(newName, 'HANDLE');
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_poll = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var id = Blockly.propc.variableDB_.getName(this.getFieldValue('ID'), Blockly.Variables.NAME_TYPE);
        var event = Blockly.propc.variableDB_.getName(this.getFieldValue('EVENT'), Blockly.Variables.NAME_TYPE);
        var handle = Blockly.propc.variableDB_.getName(this.getFieldValue('HANDLE'), Blockly.Variables.NAME_TYPE);

        var code = 'wifi_poll(&' + event + ', &' + id + ', &' + handle + ');\n';
        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_listen = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_LISTEN_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("PATH")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX connect")
                .appendField(new Blockly.FieldDropdown([['HTTP', 'HTTP'], ['Websocket', 'WS'], ['TCP', 'TCP']], function (action) {
                    this.sourceBlock_.setPrefix_({"ACTION": action});
                }), 'PROTOCOL')
                .appendField("store ID in", 'TEXT')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'ID')
                .appendField("path", "LABEL")
                .setCheck("String");
        this.appendValueInput("PORT")
                .appendField("port")
                .setCheck("Number");
        this.appendDummyInput('CONNVARS')
                .appendField(new Blockly.FieldVariable('wxConnId1'), 'ID1')
                .appendField(new Blockly.FieldVariable('wxConnId2'), 'ID2')
                .appendField(new Blockly.FieldVariable('wxConnId3'), 'ID3')
                .appendField(new Blockly.FieldVariable('wxConnId4'), 'ID4');
        this.getInput('PORT').setVisible(false);
        this.getInput('CONNVARS').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('PROTOCOL');
        container.setAttribute('action', action);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        this.setPrefix_({"ACTION": action});
    },
    setPrefix_: function (details) {
        var prefixVisible = false;
        this.removeInput('CONNVARS');
        if (details['ACTION'] === 'TCP') {
            prefixVisible = true;
            this.setFieldValue('URL', 'LABEL');
            this.setFieldValue('wxHandle', 'ID');
            this.setFieldValue('store handle in', 'TEXT');
        } else {
            this.setFieldValue('path', 'LABEL');
            this.setFieldValue('wxConnId1', 'ID');
            this.setFieldValue('store ID in', 'TEXT');
            this.appendDummyInput('CONNVARS')
                    .appendField(new Blockly.FieldVariable('wxConnId1'), 'ID1')
                    .appendField(new Blockly.FieldVariable('wxConnId2'), 'ID2')
                    .appendField(new Blockly.FieldVariable('wxConnId3'), 'ID3')
                    .appendField(new Blockly.FieldVariable('wxConnId4'), 'ID4');
            this.getInput('CONNVARS').setVisible(false);
        }
        this.getInput('PORT').setVisible(prefixVisible);
    },
    getVars: function () {
        return [this.getFieldValue('ID'), this.getFieldValue('ID1'), this.getFieldValue('ID2'), this.getFieldValue('ID3'), this.getFieldValue('ID4')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('ID')))
            this.setFieldValue(newName, 'ID');
        if (Blockly.Names.equals(oldName, this.getFieldValue('ID1')))
            this.setFieldValue(newName, 'ID1');
        if (Blockly.Names.equals(oldName, this.getFieldValue('ID2')))
            this.setFieldValue(newName, 'ID2');
        if (Blockly.Names.equals(oldName, this.getFieldValue('ID3')))
            this.setFieldValue(newName, 'ID3');
        if (Blockly.Names.equals(oldName, this.getFieldValue('ID4')))
            this.setFieldValue(newName, 'ID4');
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_listen = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var path = Blockly.propc.valueToCode(this, 'PATH', Blockly.propc.ORDER_NONE);
        var protocol = this.getFieldValue('PROTOCOL');
        var id = Blockly.propc.variableDB_.getName(this.getFieldValue('ID'), Blockly.Variables.NAME_TYPE);
        var port = Blockly.propc.valueToCode(this, 'PORT', Blockly.propc.ORDER_NONE) || '80';

        var code = '';
        if (protocol === 'TCP') {
            code += id + ' = wifi_connect(' + path + ', ' + port + ');\n';
        } else {
            code += id + ' = wifi_listen(' + protocol + ', ' + path + ');\n';
        }
        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_join = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_GET_IP_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX join network SSID")
                .appendField(new Blockly.FieldTextInput('myNetwork'), 'SSID')
                .appendField("passphrase")
                .appendField(new Blockly.FieldTextInput('passphrase'), 'PASS');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.wx_join = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var ssid = this.getFieldValue('SSID') || '';
        var pass = this.getFieldValue('PASS') || '';
        return 'wifi_join("' + ssid + '", "' + pass + '");\n';
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_code = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_CODE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX code")
                .appendField(new Blockly.FieldDropdown(
                        [['ARG', '0xE6'],
                            ['Connect', '0xE4'],
                            ['Close', '0xE8'],
                            ['Check', '0xEE'],
                            ['Join', '0xEF'],
                            ['Listen', '0xE7'],
                            ['Path', '0xEB'],
                            ['Poll', '0xEC'],
                            ['Receive', '0xE9'],
                            ['Reply', '0xE5'],
                            ['Send', '0xEA'],
                            ['Set', '0xED'],
                            ['AP Mode', '0xF3'],
                            ['CMD', '0xFE'],
                            ['GET', '71'],
                            ['HTTP', '0xF7'],
                            ['POST', '80'],
                            ['Station Mode', '0xF4'],
                            ['Station+AP Mode', '0xF2'],
                            ['TCP', '0xF5'],
                            ['Websocket', '0xF6'],
                            ['GPIO_DI', '1'],
                            ['GPIO_DO', '3'],
                            ['GPIO_RTS', '15'],
                            ['GPIO_CTS', '13'],
                            ['GPIO_ASC', '5'],
                            ['GPIO_DBG', '2'],
                            ['GPIO_PGM', '0'],
                            ['Invalid Request', '1'],
                            ['Invalid Argument', '2'],
                            ['Wrong Argument', '3'],
                            ['No free listeners', '4'],
                            ['No free connection', '5'],
                            ['Lookup failed', '6'],
                            ['Connection failed', '7'],
                            ['Send failed', '8'],
                            ['Invalid state', '9'],
                            ['Invalid size', '10'],
                            ['Disconnected', '11'],
                            ['Not implemented', '12'],
                            ['Busy', '13'],
                            ['Internal error', '14'],
                            ['No error', '0'],
                            ['Out of memory', '-1'],
                            ['Undefined (NEG2)', '-2'],
                            ['Timeout', '-3'],
                            ['Routing problem', '-4'],
                            ['Operation in progress', '-5'],
                            ['Undefined (NEG6)', '-6'],
                            ['Number too large', '-7'],
                            ['Connection aborted', '-8'],
                            ['Connection reset', '-9'],
                            ['Connection closed', '-10'],
                            ['Not connected', '-11'],
                            ['Illegal argument', '-12'],
                            ['Undefined (NEG13)', '-13'],
                            ['UDP send error', '-14'],
                            ['Already connected', '-15'],
                            ['SSL handshake failed', '-28'],
                            ['SSL application invalid', '-61']]), 'CODE');
        this.setOutput(true, "Number");
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_code = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        return [this.getFieldValue('CODE'), Blockly.propc.ORDER_NONE];
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_mode = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_MODE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX ")
                .appendField(new Blockly.FieldDropdown([['Set', 'SET'], ['Leave and set', 'LEAVE'], ['Check', 'CHECK']], function (action) {
                    this.sourceBlock_.setPrefix_({"ACTION": action});
                }), 'ACTION')
                .appendField("mode");
        this.appendDummyInput("CHECK")
                .appendField("to")
                .appendField(new Blockly.FieldDropdown([['AP', 'AP'], ['Station', 'STA'], ['Station + AP', 'STA_AP']]), 'MODE');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('ACTION');
        container.setAttribute('action', action);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        this.setPrefix_({"ACTION": action});
    },
    setPrefix_: function (details) {
        this.removeInput('CHECK');
        if (details['ACTION'] === 'LEAVE') {
            this.appendDummyInput("CHECK")
                    .appendField("to")
                    .appendField(new Blockly.FieldDropdown([['AP', 'AP'], ['Station + AP', 'STA_AP']]), 'MODE');
        } else {
            this.appendDummyInput("CHECK")
                    .appendField("to")
                    .appendField(new Blockly.FieldDropdown([['AP', 'AP'], ['Station', 'STA'], ['Station + AP', 'STA_AP']]), 'MODE');
        }
        if (details['ACTION'] === 'CHECK') {
            this.getInput('CHECK').setVisible(false);
            this.setPreviousStatement(false, null);
            this.setNextStatement(false, null);
            this.setOutput(true, "Number");
        } else {
            this.getInput('CHECK').setVisible(true);
            this.setPreviousStatement(true, "Block");
            this.setNextStatement(true, null);
            this.setOutput(false);
        }
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_mode = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var mode = this.getFieldValue('MODE');
        var action = this.getFieldValue('ACTION');
        var code;

        if (action === 'CHECK') {
            code = ['wifi_mode(CHECK)', Blockly.propc.ORDER_NONE];
        } else if (action === 'LEAVE') {
            code = 'wifi_leave(' + mode + ');\n';
        } else {
            code = 'wifi_mode(' + mode + ');\n';
        }
        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_buffer = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_BUFFER_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("SIZE")
                .setCheck('Number')
                .appendField("WX buffer use default")
                .appendField(new Blockly.FieldCheckbox("TRUE", function (action) {
                    this.sourceBlock_.setPrefix_({"ACTION": action});
                }), "DEFAULT")
                .appendField("size");
        this.appendDummyInput('BUF')
                .appendField("set")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), "BUFFER")
                .appendField("as buffer");
        this.getInput('BUF').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('DEFAULT');
        container.setAttribute('action', action);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        this.setPrefix_({"ACTION": action});
    },
    setPrefix_: function (details) {
        var data = this.getFieldValue('BUFFER');
        this.removeInput('BUF');
        if (details["ACTION"] === 'FALSE' || details["ACTION"] === false || details["ACTION"] === 'false') {
            this.appendDummyInput('BUF')
                    .appendField("set")
                    .appendField(new Blockly.FieldVariable(data || Blockly.LANG_VARIABLES_GET_ITEM), "BUFFER")
                    .appendField("as buffer");
            this.getInput('BUF').setVisible(true);
        }
    },
    getVarType: function () {
        return "String";
    },
    getVars: function () {
        return [this.getFieldValue('BUFFER')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER'))) {
            this.setFieldValue(newName, 'BUFFER');
        }
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_buffer = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var size = Blockly.propc.valueToCode(this, 'SIZE', Blockly.propc.NONE) || '64';
        var def = this.getFieldValue('DEFAULT');
        var buffer = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

        Blockly.propc.vartype_[buffer] = 'char *';

        var code = '';
        if (def === "TRUE") {
            code += 'wifi_bufferSize(' + size + ');\n';
        } else {
            code += 'wifi_setBuffer(' + buffer + ',' + size + ');\n';
        }
        return code;
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_disconnect = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_DISCONNECT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX disconnect")
                .appendField(new Blockly.FieldDropdown([['HTTP', 'HTTP'], ['Websocket', 'WS'], ['TCP', 'TCP']], function (action) {
                    this.sourceBlock_.setPrefix_({"ACTION": action});
                }), 'PROTOCOL')
                .appendField("ID", 'TEXT')
                .appendField(new Blockly.FieldVariable('wxId'), 'ID');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('PROTOCOL');
        container.setAttribute('action', action);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        this.setPrefix_({"ACTION": action});
    },
    setPrefix_: function (details) {
        if (details['ACTION'] === 'TCP') {
            this.setFieldValue('wxHandle', 'ID');
            this.setFieldValue('handle', 'TEXT');
        } else {
            this.setFieldValue('wxId', 'ID');
            this.setFieldValue('ID', 'TEXT');
        }
    },
    getVars: function () {
        return [this.getFieldValue('ID')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('ID'))) {
            this.setFieldValue(newName, 'ID');
        }
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_disconnect = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        return 'wifi_disconnect(' + Blockly.propc.variableDB_.getName(this.getFieldValue('ID'), Blockly.Variables.NAME_TYPE) + ');\n';
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

Blockly.Blocks.wx_ip = {
    helpUrl: Blockly.MSG_AWX_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AWX_GET_IP_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("WX")
                .appendField(new Blockly.FieldDropdown([['Station', 'STA'], ['AP', 'AP']]), 'MODE')
                .appendField("IP address");
        this.setInputsInline(true);
        this.setOutput(true, "String");
    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('WX initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a WX\ninitialize block at the beginning of your program!');
        } else {
            var warnTxt = null;
            for (var ik = 0; ik < allBlocks.length; ik++) {
                if (allBlocks[ik].toString().indexOf('Simple WX') === 0) {
                    warnTxt = 'WARNING: You cannot use Advanced WX and\nSimple WX blocks together in your project!';
                }
            }
            this.setWarningText(warnTxt);
        }
    }
};

Blockly.propc.wx_ip = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Simple WX initialize') === -1 && allBlocks.indexOf('WX initialize') > -1)
    {
        var mode = this.getFieldValue('MODE');
        if (!this.disabled) {
            var func = 'char *wifi_ip_string(int __mode) {int __ip[4]; char __result = ';
            func += 'wifi_ip(__mode, __ip); char *ipStr; if(__result == \'E\') ';
            func += '{ipStr = "Error          ";} else {sprint(ipStr, "%d.%d';
            func += '.%d.%d", __ip[0], __ip[1], __ip[2], __ip[3]);} return ipStr;}';

            Blockly.propc.methods_["ip_address_func"] = func;
            Blockly.propc.method_declarations_["ip_address_func"] = 'char *wifi_ip_string(int __mode);\n';
        }
        return ['wifi_ip_string(' + mode + ')', Blockly.propc.ORDER_NONE];
    } else {
        return '// ERROR: WX is not initialized!\n';
    }
};

// ---------------- Graphing Output Blocks -------------------------------------
Blockly.Blocks.graph_output = {
//    helpUrl: Blockly.MSG_GRAPHING_HELPURL,
    init: function () {
//        this.setTooltip(Blockly.MSG_GRAPH_OUTPUT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Graph');
        this.appendValueInput('PRINTa')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField(new Blockly.FieldTextInput('label'), 'GRAPH_LABELa')
                .appendField('value');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['graph_dec']));
        this.optionList_ = ['dec'];
        this.graph_labels_ = [];
    },
    mutationToDom: function () {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        container.setAttribute('options', JSON.stringify(this.optionList_));
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        var value = JSON.parse(container.getAttribute('options'));
        this.optionList_ = value;
        for (var i = 0; i < this.optionList_.length; i++) {
            this.appendValueInput('PRINT' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(new Blockly.FieldTextInput('label'), 'GRAPH_LABEL' + i)
                    .appendField('value');
        }
    },
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'graphing_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.optionList_.length; i++) {
            var optionBlock = workspace.newBlock('graph_dec');
            optionBlock.initSvg();
            connection.connect(optionBlock.previousConnection);
            connection = optionBlock.nextConnection;
        }
        var i = 0;
        this.graph_labels_ = null;
        this.graph_labels_ = [];
        while (this.getFieldValue('GRAPH_LABEL' + i)) {
            this.graph_labels_.push(this.getFieldValue('GRAPH_LABEL' + i));
            i++;
        }
        return containerBlock;

    },
    compose: function (containerBlock) {
        // Delete everything.
        var i = 0;
        while (this.getInput('PRINT' + i)) {
            this.removeInput('PRINT' + i);
            i++;
        }
        i = 0;
        this.optionList_.length = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        while (clauseBlock) {
            this.optionList_.push('dec');

            var printInput = this.appendValueInput('PRINT' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .setCheck('Number')
                    .appendField(new Blockly.FieldTextInput('label'), 'GRAPH_LABEL' + i)
                    .appendField('value');

            if (clauseBlock.valueConnection_) {
                printInput.connection.connect(clauseBlock.valueConnection_);
            }
            i++;

            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
        }
        i = this.graph_labels_.length;
        for (i = 0; i < this.graph_labels_.length; i++) {
            if (this.getFieldValue('GRAPH_LABEL' + i))
                this.setFieldValue(this.graph_labels_[i], 'GRAPH_LABEL' + i);
        }
    },
    saveConnections: function (containerBlock) {
        // Store a pointer to any connected child blocks.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 0;
        while (clauseBlock) {
            //this.optionList_.push('dec');
            var printInput = this.getInput('PRINT' + x);
            clauseBlock.valueConnection_ =
                    printInput && printInput.connection.targetConnection;
            clauseBlock = clauseBlock.nextConnection &&
                    clauseBlock.nextConnection.targetBlock();
            x++;
            //break;
        }
        var i = 0;
        this.graph_labels_ = null;
        this.graph_labels_ = [];
        while (this.getFieldValue('GRAPH_LABEL' + i)) {
            this.graph_labels_.push(this.getFieldValue('GRAPH_LABEL' + i));
            i++;
        }

    },
    onchange: function () {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('Graph initialize') === -1)
        {
            this.setWarningText('WARNING: You must use a Graph\ninitialize block at the beginning of your program!');
        } else {
            if (this.workspace && this.optionList_.length < 1) {
                this.setWarningText('Graphing output must have at least one value.');
            } else {
                if (this.optionList_.length > 10)
                    this.setWarningText('Graphing output only supports up to 10 values.');
                else
                    this.setWarningText(null);
            }
        }
        if (this.getInput('PRINT0') && this.getInput('PRINTa')) {
            this.removeInput('PRINTa');
            //this.removeInput('PRINTb');
        }
    }
};

Blockly.Blocks.graphing_container = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('send');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks.graph_dec = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('value');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.propc.graph_output = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Graph initialize') > -1)
    {
        var handle = this.getFieldValue('HANDLE');
        var conn = this.getFieldValue('CONNECTION');

        var code = 'print("%u';
        var varList = '';
        var labelList = '';
        var i = 0;
        var orIt = '';
        while (Blockly.propc.valueToCode(this, 'PRINT' + i, Blockly.propc.ORDER_NONE)) {
            code += ',%d';
            varList += ', ' + Blockly.propc.valueToCode(this, 'PRINT' + i, Blockly.propc.NONE || '0');
            labelList += this.getFieldValue("GRAPH_LABEL" + i);
            if (Blockly.propc.valueToCode(this, 'PRINT' + (i + 1), Blockly.propc.ORDER_NONE) && i < 9)
                labelList += ',';
            i++;
            if (i > 10)
                break;
        }
        code += '\\r", (CNT >> 16)' + varList + ');\n';

        if (!this.disabled) {
            Blockly.propc.serial_graphing_ = true;
            Blockly.propc.definitions_['graphing_labels'] = '// GRAPH_LABELS_START:' + labelList + ':GRAPH_LABELS_END //';
        }
        return code;
    } else {
        return '// ERROR: Graphing is not initialized!';
    }
};

Blockly.Blocks.graph_settings = {
//    helpUrl: Blockly.MSG_GRAPHING_HELPURL,
    init: function () {
//        this.setTooltip(Blockly.MSG_GRAPH_SETTINGS_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Graph initialize  keep")
                .appendField(new Blockly.FieldTextInput('40',
                        Blockly.FieldTextInput.numberValidator), "XAXIS")
                .appendField('seconds of data  y-axis ')
                .appendField(new Blockly.FieldDropdown([
                    ["autoscale", "AUTO"],
                    ["range", "FIXED"]]), "YSETTING")
                .appendField("minimum", 'LABELMIN')
                .appendField(new Blockly.FieldTextInput('0',
                        Blockly.FieldTextInput.numberValidator), "YMIN")
                .appendField(" maximum", 'LABELMAX')
                .appendField(new Blockly.FieldTextInput('0',
                        Blockly.FieldTextInput.numberValidator), "YMAX");
        if (this.getFieldValue('YSETTING') === 'AUTO') {
            this.getField('YMIN').setVisible(false);
            this.setFieldValue('0', 'YMIN');
            this.getField('YMAX').setVisible(false);
            this.setFieldValue('0', 'YMAX');
            this.getField('LABELMIN').setVisible(false);
            this.getField('LABELMAX').setVisible(false);
        } else {
            this.getField('YMIN').setVisible(true);
            this.getField('YMAX').setVisible(true);
            this.getField('LABELMIN').setVisible(true);
            this.getField('LABELMAX').setVisible(true);
        }
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.render();
    },
    onchange: function () {
        if (this.getFieldValue('YSETTING') === 'AUTO') {
            this.getField('YMIN').setVisible(false);
            this.setFieldValue('0', 'YMIN');
            this.getField('YMAX').setVisible(false);
            this.setFieldValue('0', 'YMAX');
            this.getField('LABELMIN').setVisible(false);
            this.getField('LABELMAX').setVisible(false);
        } else {
            this.getField('YMIN').setVisible(true);
            this.getField('YMAX').setVisible(true);
            this.getField('LABELMIN').setVisible(true);
            this.getField('LABELMAX').setVisible(true);
        }
        this.render();
    }
};

Blockly.propc.graph_settings = function () {
    if (!this.disabled) {
        var rate = this.getFieldValue('RATE');
        var x_axis = this.getFieldValue('XAXIS') || '10';
        var y_min = this.getFieldValue('YMIN') || '0';
        var y_max = this.getFieldValue('YMAX') || '100';

        if (parseInt(x_axis) < 10) {
            x_axis = '10';
        }

        Blockly.propc.definitions_['graphing_settings'] = '// GRAPH_SETTINGS_START:100,' +
                x_axis + ',S,' + y_min + ',' + y_max + ':GRAPH_SETTINGS_END //';
    }
    return '';
};


var xbee_settings = [
    ["WR", "Write", "Write parameter values to non-volatile memory so that parameter modifications persist through subsequent power-up or reset. Note: Once WR is issued, no additional characters should be sent to the module until after the response \"OK\\r\" is received.", [], null, null],
    ["RE", "Restore Defaults", "Restore module parameters to factory defaults.", [], null, null],
    ["FR", "Software Reset", "Responds immediately with an OK then performs a hard reset ~100ms later.", [], null, null],
    ["CH", "Channel", "Set/Read the channel number used for transmitting and receiving data between RF modules (uses 802.15.4 protocol channel numbers).", [["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"]], 12, "%d"],
    ["ID", "PAN ID", "Set/Read the PAN (Personal Area Network) ID. Use 0xFFFF to broadcast messages to all PANs.", [["Min", 0], ["Max", 0xFFFF]], 13106, "%x"],
    ["DH", "Destination Address High", "Set/Read the upper 32 bits of the 64-bit destination address. When combined with DL, it defines the destination address used for transmission. To transmit using a 16-bit address, set DH parameter to zero and DL less than 0xFFFF. 0x000000000000FFFF is the broadcast address for the PAN.", [["Min", 0], ["Max", 0xFFFFFFFF]], 0, "%x"],
    ["DL", "Destination Address Low", "Set/Read the lower 32 bits of the 64-bit destination address. When combined with DH, DL defines the destination address used for transmission. To transmit using a 16-bit address, set DH parameter to zero and DL less than 0xFFFF. 0x000000000000FFFF is the broadcast address for the PAN.", [["Min", 0], ["Max", 0xFFFFFFFF]], 0, "%x"],
    ["MY", "16-bit Source Address", "Set/Read the RF module 16-bit source address. Set MY = 0xFFFF to disable reception of packets with 16-bit addresses. 64-bit source address (serial number) and broadcast address (0x000000000000FFFF) is always enabled.", [["Min", 0], ["Max", 0xFFFF]], 0, "%x"],
    ["SH", "Serial Number High", "Read high 32 bits of the RF module's unique IEEE 64-bit address. 64-bit source address is always enabled.", [["Min", 0], ["Max", 0xFFFFFFFF]], -1, "%x"],
    ["SL", "Serial Number Low", "Read low 32 bits of the RF module's unique IEEE 64-bit address. 64-bit source address is always enabled.", [["Min", 0], ["Max", 0xFFFFFFFF]], -1, "%x"],
    ["RR", "XBee Retries", "Set/Read the maximum number of retries the module will execute in addition to the 3 retries provided by the 802.15.4 MAC. For each XBee retry, the 802.15.4 MAC can execute up to 3 retries.", [["Min", 0], ["Max", 6]], 0, "%d"],
    ["RN", "Random Delay Slots", "Set/Read the minimum value of the back-off exponent in the CSMA-CA algorithm that is used for collision avoidance. If RN = 0, collision avoidance is disabled during the first iteration of the algorithm (802.15.4 - macMinBE).", [["Min", 0], ["Max", 3]], 0, "%d"],
    ["MM", "MAC Mode", "Set/Read MAC Mode value. MAC Mode enables/disables the use of a Digi header in the 802.15.4 RF packet. When Modes 0 or 3 are enabled (MM=0,3), duplicate packet detection is enabled as well as certain AT commands. Please see the detailed MM description on page 47 for additional information.", [["Digi Mode", "0"], ["802.15.4 (no ACKs)", "1"], ["802.15.4 (with ACKs)", "2"], ["Digi Mode (no ACKs)", "3"]], 0, "%d"],
    ["NI", "Node Identifier", "Stores a string identifier. The register only accepts printable ASCII data. A string can not start with a space. Carriage return ends command. Command will automatically end when maximum bytes for the string have been entered. This string is returned as part of the ND (Node Discover) command. This identifier is also used with the DN (Destination Node) command.", [["Length", 20]], "", "%s"],
    ["ND", "Node Discover", "Discovers and reports all RF modules found. The following information is reported for each module discovered (the example cites use of Transparent operation (AT command format) - refer to the long ND command description regarding differences between Transparent and API operation). MY SH SL DB NI The amount of time the module allows for responses is determined by the NT parameter. In Transparent operation, command completion is designated by a (carriage return). ND also accepts a Node Identifier as a parameter. In this case, only a module matching the supplied identifier will respond. If ND self-response is enabled (NO=1) the module initiating the node discover will also output a response for itself.", [["Length", 20]], "", "%s"],
    ["NT", "Node Discover Time", "Set/Read the amount of time a node will wait for responses from other nodes when using the ND (Node Discover) command.", [["Min", 1], ["Max", 0xFC]], 25, "%d"],
    ["NO", "Node Discover Options", "Enables node discover self-response on the module. 0-1 0 DN ( v1.x80*) Networking {Identification} Destination Node. Resolves an NI (Node Identifier) string to a physical address. The following events occur upon successful command execution: 1. DL and DH are set to the address of the module with the matching Node Identifier. 2. “OK” is returned. 3. RF module automatically exits AT Command Mode If there is no response from a module within 200 msec or a parameter is not specified (left blank), the command is terminated and an “ERROR” message is returned. 20-character ASCII string -", [["Length", 20]], "", "%s"],
    ["CE", "Coordinator Enable", "Set/Read the coordinator setting.", [["End Device", "0"], ["Coordinator", "1"]], 0, "%d"],
    ["SC", "Scan Channels", "Set/Read list of channels to scan for all Active and Energy Scans as a bitfield. This affects scans initiated in command mode (AS, ED) and during End Device Association and Coordinator startup.", [["Bitfield", 16], ["Mask", 0x1FFE]], 0x1FFE, "%b"],
    ["SD", "Scan Duration", "Set/Read the scan duration exponent. End Device - Duration of Active Scan during Association. Coordinator - If ‘ReassignPANID’ option is set on Coordinator [refer to A2 parameter], SD determines the length of time the Coordinator will scan channels to locate existing PANs. If ‘ReassignChannel’ option is set, SD determines how long the Coordinator will perform an Energy Scan to determine which channel it will operate on. ‘Scan Time’ is measured as (# of channels to scan] * (2 ^ SD) * 15.36ms). The number of channels to scan is set by the SC command. The XBee can scan up to 16 channels (SC = 0xFFFF). The XBee PRO can scan up to 13 channels (SC = 0x3FFE). Example: The values below show results for a 13 channel scan.", [["00.18 sec", "0"], ["00.74 sec", "2"], ["02.95 sec", "4"], ["11.80 sec", "6"], ["47.19 sec", "8"], ["03.15 min", "10"], ["12.58 min", "12"], ["50.33 min", "14"]], 4, "%d"],
    ["A1", "End Device Association", "Set/Read End Device association options. bit 0 - ReassignPanID 0 - Will only associate with Coordinator operating on PAN ID that matches module ID 1 - May associate with Coordinator operating on any PAN ID bit 1 - ReassignChannel 0 - Will only associate with Coordinator operating on matching CH Channel setting 1 - May associate with Coordinator operating on any Channel bit 2 - AutoAssociate 0 - Device will not attempt Association 1 - Device attempts Association until success Note: This bit is used only for Non-Beacon systems. End Devices in Beacon-enabled system must always associate to a Coordinator bit 3 - PollCoordOnPinWake 0 - Pin Wake will not poll the Coordinator for indirect (pending) data 1 - Pin Wake will send Poll Request to Coordinator to extract any pending data bits 4 - 7 are reserved", [["Bitfield", 0], ["Mask", 0x0F]], 0, "%b"],
    ["A2", "Coordinator Association", "Set/Read Coordinator association options. bit 0 - ReassignPanID 0 - Coordinator will not perform Active Scan to locate available PAN ID. It will operate on ID (PAN ID). 1 - Coordinator will perform Active Scan to determine an available ID (PAN ID). If a PAN ID conflict is found, the ID parameter will change. bit 1 - ReassignChannel - 0 - Coordinator will not perform Energy Scan to determine free channel. It will operate on the channel determined by the CH parameter. 1 - Coordinator will perform Energy Scan to find a free channel, then operate on that channel. bit 2 - AllowAssociation - 0 - Coordinator will not allow any devices to associate to it. 1 - Coordinator will allow devices to associate to it. bits 3 - 7 are reserved", [["Bitfield", 3], ["Mask", 7]], 0, "%b"],
    ["AI", "Association Indication", "Read errors with the last association request: 0x00 - Successful Completion - Coordinator successfully started or End Device association complete 0x01 - Active Scan Timeout 0x02 - Active Scan found no PANs 0x03 - Active Scan found PAN, but the CoordinatorAllowAssociation bit is not set 0x04 - Active Scan found PAN, but Coordinator and End Device are not configured to support beacons 0x05 - Active Scan found PAN, but the Coordinator ID parameter does not match the ID parameter of the End Device 0x06 - Active Scan found PAN, but the Coordinator CH parameter does not match the CH parameter of the End Device 0x07 - Energy Scan Timeout 0x08 - Coordinator start request failed 0x09 - Coordinator could not start due to invalid parameter 0x0A - Coordinator Realignment is in progress 0x0B - Association Request not sent 0x0C - Association Request timed out - no reply was received 0x0D - Association Request had an Invalid Parameter 0x0E - Association Request Channel Access Failure. Request was not transmitted - CCA failure 0x0F - Remote Coordinator did not send an ACK after Association Request was sent 0x10 - Remote Coordinator did not reply to the Association Request, but an ACK was received after sending the request 0x11 - [reserved] 0x12 - Sync-Loss - Lost synchronization with a Beaconing Coordinator 0x13 - Disassociated - No longer associated to Coordinator 0xFF - RF Module is attempting to associate", [["Min", 0], ["Max", 19]], -1, "%x"],
    ["DA", "Force Disassociation", "End Device will immediately disassociate from a Coordinator (if associated) and reattempt to associate.", [], null, null],
    ["FP", "Force Poll", "Request indirect messages being held by a coordinator.", [], null, null],
    ["AS", "Active Scan Time", "Send Beacon Request to Broadcast Address (0xFFFF) and Broadcast PAN (0xFFFF) on every channel. The parameter determines the time the radio will listen for Beacons on each channel. A PanDescriptor is created and returned for every Beacon received from the scan. Each PanDescriptor contains the following information: CoordAddress (SH, SL) CoordPanID (ID) CoordAddrMode 0x02 = 16-bit Short Address 0x03 = 64-bit Long Address Channel (CH parameter) SecurityUse ACLEntry SecurityFailure SuperFrameSpec (2 bytes): bit 15 - Association Permitted (MSB) bit 14 - PAN Coordinator bit 13 - Reserved bit 12 - Battery Life Extension bits 8-11 - Final CAP Slot bits 4-7 - Superframe Order bits 0-3 - Beacon Order GtsPermit RSSI (RSSI is returned as -dBm) TimeStamp (3 bytes) A carriage return is sent at the end of the AS command. The Active Scan is capable of returning up to 5 PanDescriptors in a scan. The actual scan time on each channel is measured as Time = [(2 ^SD PARAM) * 15.36] ms. Note the total scan time is this time multiplied by the number of channels to be scanned (16 for the XBee and 13 for the XBee-PRO). Also refer to SD command description.", [["Min", 0], ["Max", 6]], 0, "%d"],
    ["ED", "Energy Scan Time", "Send an Energy Detect Scan. This parameter determines the length of scan on each channel. The maximal energy on each channel is returned & each value is followed by a carriage return. An additional carriage return is sent at the end of the command. The values returned represent the detected energy level in units of -dBm. The actual scan time on each channel is measured as Time = [(2 ^ED) * 15.36] ms. Note the total scan time is this time multiplied by the number of channels to be scanned (refer to SD parameter).", [["Min", 0], ["Max", 6]], 0, "%d"],
    ["EE", "AES Encryption Enable", "Disable/Enable 128-bit AES encryption support. Use in conjunction with the KY command.", [["Min", 0], ["Max", 1]], 0, "%d"],
    ["KY", "AES Encryption Key", "Set the 128-bit AES (Advanced Encryption Standard) key for encrypting/decrypting data. The KY register cannot be read.", [["Length", 16]], "", "%x"],
    ["PL", "RF Interfacing Power Level", "Select/Read the power level at which the RF module transmits conducted power.", [["10 dBm", "0"], ["12 dBm", "1"], ["14 dBm", "2"], ["16 dBm", "3"], ["18 dBm", "4"]], 4, "%d"],
    ["CA", "RF Interfacing CCA Threshold", "Set/read the CCA (Clear Channel Assessment) threshold. Prior to transmitting a packet, a CCA is performed to detect energy on the channel. If the detected energy is above the CCA Threshold, the module will not transmit the packet.", [["Min", 0x24], ["Max", 0x50]], 0x2C, "%x"],
    ["SM", "Sleep Mode", "Set/Read Sleep Mode configurations.", [["No Sleep", "0"], ["Pin Hibernate", "1"], ["Pin Doze", "2"], ["Cyclic sleep remote", "4"], ["Cyclic sleep remote w/ pin wake-up", "5"]], 0, "%d"]];


Blockly.Blocks.xbee_configure = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        var xb_sets = [];
        for (var xt = 0; xt < xbee_settings.length; xt++) {
            if (xbee_settings[xt][4] !== -1) {
                xb_sets.push([xbee_settings[xt][1], xt.toString(10)]);
            }
        }
        this.appendDummyInput()
                .appendField("XBee configuration")
                .appendField(new Blockly.FieldDropdown([["set", "set"], ["read", "read"]], function (act) {
                    if (act === "set") {
                        this.sourceBlock_.setOutput(false, null);
                        this.sourceBlock_.setPreviousStatement(true, "Block");
                        this.sourceBlock_.setNextStatement(true, null);
                    } else {
                        this.sourceBlock_.setOutput(true, null);
                        this.sourceBlock_.setPreviousStatement(false);
                        this.sourceBlock_.setNextStatement(false);
                    }
                    this.sourceBlock_.setParams(act);
                }), 'ACTION')
                .appendField(new Blockly.FieldDropdown(xb_sets, function (st) {
                    this.sourceBlock_.setParams(st);
                }), 'SETTING');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    setParams: function (st) {
        var act = '';
        if (st === "set" || st === "read") {
            act = st;
            st = parseInt(this.getFieldValue('SETTING'));
        } else {
            act = this.getFieldValue('ACTION');
        }
        this.setTooltip(xbee_settings[st][2]);
        if (this.getInput('SELECT')) {
            this.removeInput('SELECT');
        }
        if (act === "set") {
            if (xbee_settings[st][3].length === 0) {

            } else if (xbee_settings[st][3][0][0] === "Min") {
                this.appendDummyInput('SELECT')
                        .appendField("to")
                        .appendField(new Blockly.FieldTextInput("0", function (text) {
                            if (text === null) {
                                this.sourceBlock_.setWarningText('WARNING: You cannot leave this block\'s value blank!');
                                return null;
                            }
                            // TODO: Handle cases like 'ten', '1.203,14', etc.
                            // 'O' is sometimes mistaken for '0' by inexperienced users.
                            text = text.replace(/O/ig, '0');
                            // Strip out thousands separators.
                            text = text.replace(/,/g, '');
                            var n = parseFloat(text || 0);
                            if (isNaN(n)) {
                                this.sourceBlock_.setWarningText('WARNING: You must enter a number value!');
                                return null;
                            } else if (n < xbee_settings[st][3][0][1]) {
                                this.sourceBlock_.setWarningText('WARNING: The value you entered is too small!\nAcceptable values are from ' + xbee_settings[st][3][0][1] + ' to ' + xbee_settings[st][3][1][1] + '.');
                                return String(n);
                            } else if (n > xbee_settings[st][3][1][1]) {
                                this.sourceBlock_.setWarningText('WARNING: The value you entered is too large!\nAcceptable values are from ' + xbee_settings[st][3][0][1] + ' to ' + xbee_settings[st][3][1][1] + '.');
                                return String(n);
                            } else {
                                this.sourceBlock_.setWarningText(null);
                                return String(n);
                            }
                        }), 'VALUE');
                if (xbee_settings[st][4]) {
                    this.setFieldValue(xbee_settings[st][4].toString(), 'VALUE');
                }
            } else if (xbee_settings[st][3][0][0] === "Bitfield") {

            } else if (xbee_settings[st][3][0][0] === "Length") {

            } else {
                this.appendDummyInput('SELECT')
                        .appendField("to")
                        .appendField(new Blockly.FieldDropdown(xbee_settings[st][3]), 'VALUE');
                if (xbee_settings[st][4]) {
                    this.setFieldValue(xbee_settings[st][4].toString(), 'VALUE');
                }
            }
        } else {
            if (xbee_settings[st][5]) {
                if (xbee_settings[st][5] !== "%s") {
                    this.appendDummyInput('SELECT')
                            .appendField("as")
                            .appendField(new Blockly.FieldDropdown([
                                ["text", "%s"],
                                ["a decimal number", "%d"],
                                ["a hexadecimal number", "%x"],
                                ["a binary number", "%b"]
                            ]), 'VALUE');
                    this.setFieldValue(xbee_settings[st][5].toString(), 'VALUE');
                }
            }
        }
    }
};

Blockly.propc.xbee_configure = function () {
    return '// XBee configure is not yet ready and working';
};

Blockly.Blocks.i2c_send = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_I2C_SEND_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("DATA")
                .appendField("i2c SDA")
                .appendField(new Blockly.FieldDropdown(profile.default.digital, function (pin) {
                    this.sourceBlock_.checkI2cPins(null, pin, null);
                }), "SDA")
                .appendField("SCL")
                .appendField(new Blockly.FieldDropdown(profile.default.digital, function (pin) {
                    this.sourceBlock_.checkI2cPins(null, null, pin);
                }), "SCL")
                .appendField(" send")
                .appendField(new Blockly.FieldTextInput('2',
                        Blockly.FieldTextInput.numberValidator), "COUNT")
                .appendField("bytes of data");
        this.appendValueInput("ADDR")
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([["MSB", "1"], ["LSB", "-1"]]), "ORDER")
                .appendField("first  to register");
        this.appendValueInput("DEVICE")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldDropdown([
                    ["length 1 byte", "1"],
                    ["length 2 bytes", "2"],
                    ["length 3 bytes", "3"],
                    ["length 4 bytes", "4"]
                ]), "ADDRCOUNT")
                .setCheck('Number')
                .appendField(" at address");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.pinWarn = null;
        //this.checkI2cPins(null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        if (this.pinWarn) {
            container.setAttribute('pinwarn', this.pinWarn);
        }
        return container;
    },
    domToMutation: function (container) {
        var warnTxt = container.getAttribute('pinwarn') || null;
        this.pinWarn = warnTxt;
        this.setWarningText(warnTxt);
    },
    checkI2cPins: function (action, zda, zcl) {
        var sda = zda || this.getFieldValue('SDA');
        var scl = zcl || this.getFieldValue('SCL');
        var warnTxt = 'WARNING: Both SDA and SCL must be equal to \nSDA and SCL on ';
        warnTxt += 'other blocks if sharing \nan i2c bus, or both must be different ';
        warnTxt += '\nif on seperate i2c busses, and SDA and SCL \nmust be different ';
        warnTxt += 'from each other!';
        this.pinWarn = null;

        if (action === null) {
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
            for (var x = 0; x < allBlocks.length; x++) {
                var func = allBlocks[x].checkI2cPins;
                if (func) {
                    var xda = allBlocks[x].getFieldValue('SDA');
                    var xcl = allBlocks[x].getFieldValue('SCL');
                    if (((sda === scl) || (xda === sda && xcl !== scl) ||
                            (xda !== sda && xcl === scl) ||
                            (xda === scl && xcl !== sda) ||
                            (xcl === sda && xda !== scl)) &&
                            allBlocks[x] !== this &&
                            allBlocks[x].type !== 'i2c_busy') {
                        this.pinWarn = warnTxt;
                    }
                }
            }
            for (var x = 0; x < allBlocks.length; x++) {
                var func = allBlocks[x].checkI2cPins;
                if (func) {
                    func.call(allBlocks[x], (this.pinWarn ? true : false));
                }
                func = allBlocks[x].setSdaPins;
                if (func && sda !== this.getFieldValue('SDA')) {
                    func.call(allBlocks[x], sda, this.getFieldValue('SDA'));
                }
                func = allBlocks[x].setSclPins;
                if (func && scl !== this.getFieldValue('SCL')) {
                    func.call(allBlocks[x], scl, this.getFieldValue('SCL'));
                }
            }
        } else if (action === true) {
            this.pinWarn = warnTxt;
        } else if (action === false) {
            this.pinWarn = null;
        }
        this.setWarningText(this.pinWarn);
    }
};

Blockly.propc.i2c_send = function () {
    var code = (this.pinWarn ? '// ' + this.pinWarn.replace(/\n/g, '') : '');
    var sda = this.getFieldValue('SDA');
    var mode = '0';
    var scl = this.getFieldValue('SCL');
    var order = this.getFieldValue('ORDER');
    var adct = this.getFieldValue('ADDRCOUNT');
    var val = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_NONE) || '0';
    var cnt = this.getFieldValue('COUNT') || '1';
    var addr = Blockly.propc.valueToCode(this, 'ADDR', Blockly.propc.ORDER_NONE) || '0';
    var devc = Blockly.propc.valueToCode(this, 'DEVICE', Blockly.propc.ORDER_NONE) || '0';

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
    for (var x = 0; x < allBlocks.length; x++) {
        if (allBlocks[x].type === 'i2c_mode') {
            var xcl = allBlocks[x].getFieldValue('SCL');
            if (xcl === scl) {
                mode = allBlocks[x].getFieldValue('MODE');
            }
        }
    }

    if (!this.disabled) {
        Blockly.propc.definitions_['i2c_init' + sda] = 'i2c *i2c' + sda + ';';
        Blockly.propc.setups_['i2c_init' + sda] = 'i2c' + sda + ' = i2c_newbus(' + sda + ', ' + scl + ', ' + mode + ');';
    }

    var bufCode = '';
    var dType = 'Number';
    var connBlock = this.getInput('DATA').connection.targetBlock();
    if (connBlock) {
        var connOutput = connBlock.outputConnection.check_;
        if (connOutput && connOutput.toString().indexOf('String') > -1) {
            dType = 'String';
        }
    }

    if (dType === 'Number') {
        Blockly.propc.definitions_['i2c_InBuf'] = 'unsigned char i2cInBuf[4] = {0, 0, 0, 0};';
        switch (cnt) {
            default:
            case '4':
                bufCode += 'i2cInBuf[3] = (' + val + ' >> 24) & 255; ';
            case '3':
                bufCode += 'i2cInBuf[2] = (' + val + ' >> 16) & 255; ';
            case '2':
                bufCode += 'i2cInBuf[1] = (' + val + ' >> 8) & 255; ';
            case '1':
                bufCode += 'i2cInBuf[0] = (' + val + ') & 255;';
                break;
        }
        val = 'i2cInBuf';
    }

    code += 'i2c_out(i2c' + sda + ', ' + devc + ' & 0x7F, ' + addr;
    code += ', ' + adct + ' * ' + order + ', ' + val + ', ' + cnt + ');\n';
    code += bufCode;
    return code;
};

Blockly.Blocks.i2c_receive = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_I2C_RECEIVE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("i2c SDA")
                .appendField(new Blockly.FieldDropdown(profile.default.digital, function (pin) {
                    this.sourceBlock_.checkI2cPins(null, pin, null);
                }), "SDA")
                .appendField("SCL")
                .appendField(new Blockly.FieldDropdown(profile.default.digital, function (pin) {
                    this.sourceBlock_.checkI2cPins(null, null, pin);
                }), "SCL")
                .appendField("receive")
                .appendField(new Blockly.FieldTextInput('2',
                        Blockly.FieldTextInput.numberValidator), "COUNT")
                .appendField("bytes of data");
        this.appendValueInput("ADDR")
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck(null)
                .appendField(new Blockly.FieldDropdown([["MSB", "1"], ["LSB", "-1"]]), "ORDER")
                .appendField("first  from register");
        this.appendValueInput("DEVICE")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldDropdown([
                    ["length 1 byte", "1"],
                    ["length 2 bytes", "2"],
                    ["length 3 bytes", "3"],
                    ["length 4 bytes", "4"]
                ]), "ADDRCOUNT")
                .setCheck(null)
                .appendField(" at address");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("as")
                .appendField(new Blockly.FieldDropdown([["Decimal", "int"], ["String", "str"]]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.pinWarn = null;
        //this.checkI2cPins(null);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    mutationToDom: Blockly.Blocks['i2c_send'].mutationToDom,
    domToMutation: Blockly.Blocks['i2c_send'].domToMutation,
    checkI2cPins: Blockly.Blocks['i2c_send'].checkI2cPins
};

Blockly.propc.i2c_receive = function () {
    var code = (this.pinWarn ? '// ' + this.pinWarn.replace(/\n/g, '') : '');
    var sda = this.getFieldValue('SDA');
    var mode = '0';
    var scl = this.getFieldValue('SCL');
    var order = this.getFieldValue('ORDER');
    var adct = this.getFieldValue('ADDRCOUNT');
    var type = this.getFieldValue('TYPE');
    var val = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var cnt = this.getFieldValue('COUNT') || '1';
    var addr = Blockly.propc.valueToCode(this, 'ADDR', Blockly.propc.ORDER_NONE) || '0';
    var devc = Blockly.propc.valueToCode(this, 'DEVICE', Blockly.propc.ORDER_NONE) || '0';

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
    for (var x = 0; x < allBlocks.length; x++) {
        if (allBlocks[x].type === 'i2c_mode') {
            var xcl = allBlocks[x].getFieldValue('SCL');
            if (xcl === scl) {
                mode = allBlocks[x].getFieldValue('MODE');
            }
        }
    }

    if (!this.disabled) {
        Blockly.propc.definitions_['i2c_init' + sda] = 'i2c *i2c' + sda + ';';
        Blockly.propc.setups_['i2c_init' + sda] = 'i2c' + sda + ' = i2c_newbus(' + sda + ', ' + scl + ', ' + mode + ');';
    }

    var bufCode = val + ' = ';
    if (type === 'str') {
        Blockly.propc.vartype_[val] = 'char *';
        bufCode = '';
    } else {
        Blockly.propc.definitions_['i2c_InBuf'] = 'unsigned char i2cInBuf[4] = {0, 0, 0, 0};';
        val = 'i2cInBuf';
        bufCode += '(';
        switch (cnt) {
            case '4':
                bufCode += '(i2cInBuf[3] << 24) | ';
            case '3':
                bufCode += '(i2cInBuf[2] << 16) | ';
            case '2':
                bufCode += '(i2cInBuf[1] << 8) | ';
            case '1':
                bufCode += 'i2cInBuf[0]';
                break;
        }
        bufCode += ');\n';
    }

    code += 'i2c_in(i2c' + sda + ', ' + devc + ' & 0x7F, ' + addr;
    code += ', ' + adct + ' * ' + order + ', &' + val + ', ' + cnt + ');\n';
    code += bufCode;
    return code;
};

Blockly.Blocks.i2c_mode = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_I2C_MODE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput('SCLPIN')
                .appendField("i2c SCL")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCL")
                .appendField("set mode")
                .appendField(new Blockly.FieldDropdown([
                    ["normal (open-collector)", "0"],
                    ["push-pull", "1"]
                ]), "MODE");
        this.warnFlag = 0;
        this.pinWarn = null;
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    onchange: function (event) {
        // only fire when a block got deleted or created, the SCL field was changed
        if (event.oldXml || event.type === Blockly.Events.CREATE || 
                event.name === 'SCL' || event.name === 'SDA'|| 
                event.blockId === this.id || this.warnFlag > 0) {
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
            this.warnFlag--;
            var sda = null;
            this.pinWarn = 'WARNING: SCL on this block must match SCL on at least one i2c receieve or i2c send block!';
            for (var x = 0; x < allBlocks.length; x++) {
                if (allBlocks[x].type === 'i2c_send' || allBlocks[x].type === 'i2c_receive') {
                    if (allBlocks[x].getFieldValue('SCL') === this.getFieldValue('SCL')) {
                        if (sda && sda !== allBlocks[x].getFieldValue('SDA')) {
                            this.pinWarn = 'WARNING: Both SDA and SCL must match SDA and SCL on other i2c blocks if sharing ';
                            this.pinWarn += 'an i2c bus, or both must be different if on seperate i2c busses!';
                            sda = '-1';
                        } else {
                            sda = allBlocks[x].getFieldValue('SDA');
                            this.pinWarn = null;
                        }
                    }
                    if (allBlocks[x].getFieldValue('SCL') === allBlocks[x].getFieldValue('SDA')) {
                        this.pinWarn = 'WARNING: SDA and SCL cannot be on the same pin!';
                        x = allBlocks.length + 1;
                    }
                }
            this.setWarningText(this.pinWarn);
            }
        }
    }
};


Blockly.propc.i2c_mode = function () {
    return '';
};

Blockly.Blocks.i2c_busy = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function () {
        //this.setTooltip(Blockly.MSG_I2C_BUSY_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("i2c SCL")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCL");
        this.appendValueInput("DEVICE")
                .setCheck('Number')
                .appendField(" address");
        this.appendDummyInput()
                .appendField("busy");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.pinWarn = null;
    },
    mutationToDom: Blockly.Blocks['i2c_send'].mutationToDom,
    domToMutation: Blockly.Blocks['i2c_send'].domToMutation,
    onchange: Blockly.Blocks['i2c_mode'].onchange
};

Blockly.propc.i2c_busy = function () {
    var scl = this.getFieldValue('SCL');
    var devc = Blockly.propc.valueToCode(this, 'DEVICE', Blockly.propc.ORDER_NONE) || '0';
    if (this.pinWarn) {
        return '// ' + this.pinWarn;
    } else {
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        var sda = '0';
        for (var x = 0; x < allBlocks.length; x++) {
            if ((allBlocks[x].type === 'i2c_send' || allBlocks[x].type === 'i2c_receive') &&
                    allBlocks[x].getFieldValue('SCL') === this.getFieldValue('SCL')) {
                sda = allBlocks[x].getFieldValue('SDA');
            }
        }
        return ['i2c_busy(i2c' + sda + ', ' + devc + ')', Blockly.propc.ORDER_ATOMIC];
    }
};
