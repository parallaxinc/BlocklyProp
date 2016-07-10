/*

 This file contains support for the sd_card functions built into C

 Author: Vale Tolpegin (valetolpegin@gmail.com)

 *Copyright 2016 Vale Tolpegin.
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
'use strict';

if ( !Blockly.Blocks )
    Blockly.Blocks = {};


Blockly.Blocks.sd_card_mount = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("mount a SD Card")
            .appendField("do pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DO_PIN');
        this.appendDummyInput()
            .appendField("clk pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'CLK_PIN');
        this.appendDummyInput()
            .appendField("di pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DI_PIN');
        this.appendDummyInput()
            .appendField("cs pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'CS_PIN');

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_int_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("save an int to the SD Card")
            .appendField("filename")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(quotes.newQuote_(false));
        this.appendValueInput('VALUE')
            .appendField("value");
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_int_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("store an int from the SD Card")
            .appendField("filename")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(quotes.newQuote_(false));
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_read_int = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput('INDEX')
            .appendField("get index #");
        this.appendDummyInput()
            .appendField("of the stored integers");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.sd_card_float_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("save a float to the SD Card")
            .appendField("filename")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(quotes.newQuote_(false));
        this.appendValueInput('VALUE')
            .appendField("value");
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_float_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("store a float from the SD Card")
            .appendField("filename")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(quotes.newQuote_(false));
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_read_float = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput('INDEX')
            .appendField("get index #");
        this.appendDummyInput()
            .appendField("of the stored floats");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.sd_card_text_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("save text to the SD Card")
            .appendField("filename")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT_FILENAME')
            .appendField(quotes.newQuote_(false));
        this.appendDummyInput()
            .appendField("text")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT_INPUT')
            .appendField(quotes.newQuote_(false));
        this.appendValueInput('VALUE')
            .appendField("value");
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_text_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("store text from the SD Card")
            .appendField("filename")
            .appendField(quotes.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(quotes.newQuote_(false));
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_read_text = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput('INDEX')
            .appendField("get index #");
        this.appendDummyInput()
            .appendField("of the stored text");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.sd_card_mount = function() {
    var do_pin  = this.getFieldValue('DO_PIN');
    var clk_pin = this.getFieldValue('CLK_PIN');
    var di_pin  = this.getFieldValue('DI_PIN');
    var cs_pin  = this.getFieldValue('CS_PIN');

    if (Blockly.propc.setups_["sd_card"] === undefined)
    {
        Blockly.propc.setups_["sd_card"] = 'sd_mount(' + do_pin + ', ' + clk_pin + ', ' + di_pin + ', ' + cs_pin + ');';
    }

    return '';
};

Blockly.propc.sd_card_int_to = function() {
    var filename = this.getFieldValue('TEXT');
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '1';
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    return 'fwrite("' + value + '", ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_int_from = function() {
    var filename = this.getFieldValue('TEXT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    Blockly.propc.global_vars_["int_array_reading"] = 'int file_reading_array_int[128];';
    Blockly.propc.setups_["int_array_reading"] = 'file_reading_array_int = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';

    return 'fread(file_reading_array_int, ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_read_int = function() {
    var index = Blockly.propc.valueToCode(this, 'INDEX', Blockly.propc.ORDER_ATOMIC) || '0';

    var code = 'file_reading_array_int[' + index + ']';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.propc.sd_card_float_to = function() {
    var filename = this.getFieldValue('TEXT');
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '1';
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    return 'fwrite("' + value + '", ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_float_from = function() {
    var filename = this.getFieldValue('TEXT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    Blockly.propc.global_vars_["float_array_reading"] = 'float file_reading_array_float[128];\n';
    Blockly.propc.setups_["float_array_reading"] = 'file_reading_array_float = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';

    return 'fread(file_reading_array_float, ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_read_float = function() {
    var index = Blockly.propc.valueToCode(this, 'INDEX', Blockly.propc.ORDER_ATOMIC) || '0';

    var code = 'file_reading_array_float[' + index + ']';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.propc.sd_card_text_to = function() {
    var filename = this.getFieldValue('TEXT');
    var value = this.getFieldValue('TEXT_INPUT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    return 'fwrite("' + value + '", ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_text_from = function() {
    var filename = this.getFieldValue('TEXT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    Blockly.propc.global_vars_["text_array_reading"] = 'char file_reading_array_int[128];\n';
    Blockly.propc.setups_["text_array_reading"] = 'file_reading_array_text = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';


    var code = 'fread(file_reading_array_text, ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
    return code;
};

Blockly.propc.sd_card_read_text = function() {
    var index = Blockly.propc.valueToCode(this, 'INDEX', Blockly.propc.ORDER_ATOMIC) || '0';

    var code = 'file_reading_array_text[' + index + ']';
    return [code, Blockly.propc.ORDER_NONE];
};
