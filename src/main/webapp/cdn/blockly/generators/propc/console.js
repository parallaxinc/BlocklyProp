/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
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

/**
 * @fileoverview Generating Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 * @author valetolpegin@gmail.com ( Vale Tolpegin )
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.console_print = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal print text")
                .appendField(quotes.newQuote_(true))
                .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                .appendField(quotes.newQuote_(false));

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.console_print_variables = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
            .appendField("Terminal print number");
        this.appendDummyInput()
            .appendField("as")
            .appendField(new Blockly.FieldDropdown([
                ['Decimal','DEC'],
                ['Hexadecimal','HEX'],
                ['Binary', 'BIN']
            ]), "FORMAT");
//        this.appendValueInput('PULSE_LENGTH');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};


Blockly.propc.console_print = function () {
    var text = this.getFieldValue('TEXT');
    Blockly.propc.serial_terminal_ = true;

    return 'print("' + text + '");\n';
};

Blockly.propc.console_print_variables = function () {
//    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '1000';
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC);
    var format = this.getFieldValue('FORMAT');
    Blockly.propc.serial_terminal_ = true;

    var code = 'print(';
    if (format === 'BIN') {
        code += '"%b"';
    }else if (format === 'HEX') {
        code += '"%x"';                
    }else {
        code += '"%d"';
    } 
    
    code += ', ' + value + ');';
    return code;
};

Blockly.Blocks.console_newline = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("Terminal new line");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.console_clear = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("Terminal clear screen");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.console_move_to_column = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("Terminal move to column");
        this.appendValueInput('COLUMNS')
            .setCheck('Number');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.console_move_to_row = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("Terminal move to row");
        this.appendValueInput('ROWS')
            .setCheck('Number');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_newline = function () {
    Blockly.propc.serial_terminal_ = true;
    return 'term_cmd(CR);';
};

Blockly.propc.console_clear = function () {
    Blockly.propc.serial_terminal_ = true;
    return 'term_cmd(CLS);';
};

Blockly.propc.console_move_to_column = function () {
    var column = Blockly.propc.valueToCode(this, 'COLUMNS', Blockly.propc.ORDER_NONE);
    Blockly.propc.serial_terminal_ = true;

    if (Number(column) < 0) {
        column = 0;
    } else if (Number(column) > 255) {
        column = 255;
    }

    return 'term_cmd(CRSRX, ' + column + ');';
};

Blockly.propc.console_move_to_row = function () {
    var row = Blockly.propc.valueToCode(this, 'ROWS', Blockly.propc.ORDER_NONE);
    Blockly.propc.serial_terminal_ = true;

    if (Number(row) < 0) {
        row = 0;
    } else if (Number(row) > 255) {
        row = 255;
    }

    return 'term_cmd(CRSRY, ' + row + ');';
};
