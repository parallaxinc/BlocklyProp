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
            .appendField("Mount a SD Card")
            .appendField("DO pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DO_PIN');
        this.appendDummyInput()
            .appendField("CLK pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'CLK_PIN');
        this.appendDummyInput()
            .appendField("DI pin")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), 'DI_PIN');
        this.appendDummyInput()
            .appendField("CS pin")
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
            .appendField("Save an int to the SD Card")
            .appendField("Filename")
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote0.png', 12, 12))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote1.png', 12, 12));
        this.appendValueInput('VALUE')
            .appendField("value");
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("Starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("Ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_int_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Get an int from the SD Card")
            .appendField("Filename")
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote0.png', 12, 12))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote1.png', 12, 12));
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("Starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("Ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_read_int = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Get the stored SD Card int");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.sd_card_float_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Save a float to the SD Card")
            .appendField("Filename")
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote0.png', 12, 12))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote1.png', 12, 12));
        this.appendValueInput('VALUE')
            .appendField("Value");
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("Starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("Ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_float_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Get a float from the SD Card")
            .appendField("Filename")
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote0.png', 12, 12))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote1.png', 12, 12));
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("Starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("Ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_read_float = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField( "Get the stored SD Card float" );

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.sd_card_text_to = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Save text to the SD Card")
            .appendField("Filename")
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote0.png', 12, 12))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT_FILENAME')
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote1.png', 12, 12));
        this.appendDummyInput()
            .appendField("Text")
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote0.png', 12, 12))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT_INPUT')
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote1.png', 12, 12));
        this.appendValueInput('VALUE')
            .appendField("Value");
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("Starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("Ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_text_from = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Get text from the SD Card")
            .appendField("Filename")
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote0.png', 12, 12))
            .appendField(new Blockly.FieldTextInput(''), 'TEXT')
            .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                                            'media/quote1.png', 12, 12));
        this.appendValueInput('STARTING_POINT_VALUE')
            .appendField("Starting read location");
        this.appendValueInput('ENDING_POINT_VALUE')
            .appendField("Ending read location");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.Blocks.sd_card_read_text = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Get the stored SD Card text");

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

    if (Blockly.propc.setups_["file" + filename] === undefined)
    {
        return '//Missing file declaration for: ' + filename;
    }

    return 'fwrite("' + value + '", ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_int_from = function() {
    var filename = this.getFieldValue('TEXT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    if (Blockly.propc.setups_["file" + filename] === undefined)
    {
        return '//Missing file declaration for: ' + filename;
    }

    Blockly.propc.setups_["int_array_reading"] = 'int file_reading_array_int[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';

    return 'fread(file_reading_array_int, ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_read_int = function() {
    return 'file_reading_array_int';
};

Blockly.propc.sd_card_float_to = function() {
    var filename = this.getFieldValue('TEXT');
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '1';
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    if (Blockly.propc.setups_["file" + filename] === undefined)
    {
        return '//Missing file declaration for: ' + filename;
    }

    return 'fwrite("' + value + '", ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_float_from = function() {
    var filename = this.getFieldValue('TEXT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    if (Blockly.propc.setups_["file" + filename] === undefined)
    {
        return '// Missing file declaration for: ' + filename;
    }

    Blockly.propc.setups_["float_array_reading"] = 'float file_reading_array_float[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';

    return 'fread(file_reading_array_float, ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_read_float = function() {
    return 'file_reading_array_float';
};

Blockly.propc.sd_card_text_to = function() {
    var filename = this.getFieldValue('TEXT');
    var value = this.getFieldValue('TEXT_INPUT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    if (Blockly.propc.setups_["file" + filename] === undefined)
    {
        return '//Missing file declaration for: ' + filename;
    }

    return 'fwrite("' + value + '", ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
};

Blockly.propc.sd_card_text_from = function() {
    var filename = this.getFieldValue('TEXT');
    var starting_value = Blockly.propc.valueToCode(this, 'STARTING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    var ending_value = Blockly.propc.valueToCode(this, 'ENDING_POINT_VALUE', Blockly.propc.ORDER_ATOMIC) || '1';

    if (Blockly.propc.setups_["file" + filename] === undefined)
    {
        return '//Missing file declaration for: ' + filename;
    }

    Blockly.propc.setups_["text_array_reading"] = 'char file_reading_array_text[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';


    var code = 'fread(file_reading_array_text, ' + starting_value + ', ' + ending_value + ', fp_' + filename + ');\n';
    return code;
};

Blockly.propc.sd_card_read_text = function() {
    return 'file_reading_array_text';
};
