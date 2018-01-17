/**
 * Visual Blocks Language
 *
 * Copyright 2015 Vale Tolpegin
 * Copyright 2015 Dr. Corey Brady
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
 * @fileoverview Generating Prop-C for Hackable Electronic Badge blocks.
 * @author valetolpegin@gmail.com (Vale Tolpegin)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.heb_toggle_led = {
    init: function () {
        this.setColour(colorPalette.getColor('functions'));
        this.appendDummyInput()
                .appendField('LED set state of')
                .appendField(new Blockly.FieldDropdown([["0 - P27", "0"], ["1 - P26", "1"], ["2 - P25", "2"], ["3 - P15", "3"], ["4 - P16", "4"], ["5 - P17", "5"]]), "LED_#")
                .appendField('state')
                .appendField(new Blockly.FieldDropdown([["on/high", "1"], ["off/low", "0"]]), "STATE");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_toggle_led = function () {
    var led_number = this.getFieldValue("LED_#");
    var led_state = this.getFieldValue("STATE");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'led(' + led_number + ', ' + led_state + ');\n';
    return code;
};

Blockly.Blocks.heb_toggle_led_open = {
    init: function () {
        this.setColour(colorPalette.getColor('functions'));
        this.appendDummyInput()
                .appendField('LED set state of');
        this.appendValueInput('LED_NUM')
                .setCheck('Number');
        this.appendValueInput('LED_STATE')
                .appendField('state')
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_toggle_led_open = function () {
    var led_number = Blockly.propc.valueToCode(this, "LED_NUM", Blockly.propc.ORDER_NONE);
    var led_state = Blockly.propc.valueToCode(this, "LED_STATE", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'led(' + led_number + ', ' + led_state + ');\n';
    return code;
};

Blockly.Blocks.heb_color_val = {
    init: function () {
        this.setColour(colorPalette.getColor('programming'));
        var rgb_led_colors = new Blockly.FieldColour("#FFFFFF");
        rgb_led_colors.setColours(['#FFFFFF', '#FFFF00', '#00FFFF', '#FF00FF', '#000000', '#00FF00', '#0000FF', '#FF0000']).setColumns(4);
        this.appendDummyInput()
                .appendField('color (Badge)')
                .appendField(rgb_led_colors, "RGB");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_color_val = function () {
    var led_rgb = this.getFieldValue("RGB").replace(/F/g, '1').replace(/f/g, '1').replace('#', '');
    var code = '0b' + led_rgb[0] + led_rgb[2] + led_rgb[4];

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.heb_set_led_rgb = {
    init: function () {
        this.setColour(colorPalette.getColor('functions'));
        this.appendValueInput('RGB')
                .setCheck('Number')
                .appendField('RGB LED set state of')
                .appendField(new Blockly.FieldDropdown([["left LED", "L"], ["right LED", "R"], ["both LEDs", "B"]]), "SIDE")
                .appendField('to');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_set_led_rgb = function () {
    var led_side = this.getFieldValue("SIDE");
    var led_rgb = Blockly.propc.valueToCode(this, "RGB", Blockly.propc.ORDER_NONE);

    var both_leds = '';
    if (led_side === "B") {
        led_side = led_rgb;
        both_leds = 's';
    }

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'rgb' + both_leds + '(' + led_side + ', ' + led_rgb + ');\n';
    return code;
};

Blockly.Blocks.heb_print_numeric_var = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
                .setCheck('Number')
                .appendField("Display print number");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_print_numeric_var = function () {
    var value = Blockly.propc.valueToCode(this, "VALUE", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';


    if (value.startsWith('"') && value.endsWith('"')) {
        return 'oledprint(' + value + ');\n';
    } else {
        var code = 'oledprint("%d", ' + value + ');\n';
        return code;
    }
};

Blockly.Blocks.heb_print_string_var = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
                .setCheck('String')
                .appendField("Display print text");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_print_string_var = function () {
    var value = Blockly.propc.valueToCode(this, "VALUE", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';


    return 'oledprint(' + value + ');\n';
};

Blockly.Blocks.heb_cursor_position_large = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Display set font size')
                .appendField(new Blockly.FieldDropdown([["Large", "LARGE"], ["Small", "SMALL"]]), "SIZE");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_cursor_position_large = function () {
    var size = this.getFieldValue("SIZE");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'text_size(' + size + ');\n';
    return code;
};

Blockly.Blocks.heb_cursor_position_small = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('COLS')
                .setCheck('Number')
                .appendField('Display set cursor column');
        this.appendValueInput('ROWS')
                .setCheck('Number')
                .appendField('row');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_cursor_position_small = function () {
    var columns = Blockly.propc.valueToCode(this, "COLS", Blockly.propc.ORDER_NONE);
    var rows = Blockly.propc.valueToCode(this, "ROWS", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'cursor(' + columns + ', ' + rows + ');\n';
    return code;
};

Blockly.Blocks.heb_oled_point = {
    init: function () {
        var oled_colors = new Blockly.FieldColour("#FFFFFF");
        oled_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('X0')
                .setCheck('Number')
                .appendField('Display draw pixel at (x)');
        this.appendValueInput('Y0')
                .setCheck('Number')
                .appendField('(y)');
        this.appendDummyInput()
                .appendField('color')
                .appendField(oled_colors, 'COLOR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_oled_point = function () {
    var x = Blockly.propc.valueToCode(this, "X0", Blockly.propc.ORDER_NONE);
    var y = Blockly.propc.valueToCode(this, "Y0", Blockly.propc.ORDER_NONE);
    var c = this.getFieldValue('COLOR');
    //var c = Blockly.propc.valueToCode(this, "COLOR", Blockly.propc.ORDER_NONE);
    if (c === '#000000')
        c = '0';
    else
        c = '1';

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'point(' + x + ', ' + y + ', ' + c + ');\n';
    return code;
};

Blockly.Blocks.heb_oled_line = {
    init: function () {
        var oled_colors = new Blockly.FieldColour("#FFFFFF");
        oled_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('X0')
                .setCheck('Number')
                .appendField('Display draw line from 1 (x)');
        this.appendValueInput('Y0')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('(y)');
        this.appendValueInput('X1')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('to 2 (x)');
        this.appendValueInput('Y1')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('(y)');
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('color')
                .appendField(oled_colors, 'COLOR');
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_oled_line = function () {
    var x0 = Blockly.propc.valueToCode(this, "X0", Blockly.propc.ORDER_NONE);
    var y0 = Blockly.propc.valueToCode(this, "Y0", Blockly.propc.ORDER_NONE);
    var x1 = Blockly.propc.valueToCode(this, "X1", Blockly.propc.ORDER_NONE);
    var y1 = Blockly.propc.valueToCode(this, "Y1", Blockly.propc.ORDER_NONE);
    var c = this.getFieldValue('COLOR');
    //var c = Blockly.propc.valueToCode(this, "COLOR", Blockly.propc.ORDER_NONE);
    if (c === '#000000')
        c = '0';
    else
        c = '1';

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'line(' + x0 + ', ' + y0 + ', ' + x1 + ', ' + y1 + ', ' + c + ');\n';
    return code;
};

Blockly.Blocks.heb_oled_circle = {
    init: function () {
        var oled_colors = new Blockly.FieldColour("#FFFFFF");
        oled_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('X0')
                .setCheck('Number')
                .appendField('Display draw circle at (x)');
        this.appendValueInput('Y0')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('(y)');
        this.appendValueInput('R')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('radius');
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('filled')
                .appendField(new Blockly.FieldCheckbox('TRUE'), 'FILL');
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('color')
                .appendField(oled_colors, 'COLOR');
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_oled_circle = function () {
    var x = Blockly.propc.valueToCode(this, "X0", Blockly.propc.ORDER_NONE);
    var y = Blockly.propc.valueToCode(this, "Y0", Blockly.propc.ORDER_NONE);
    var r = Blockly.propc.valueToCode(this, "R", Blockly.propc.ORDER_NONE);
    var f = this.getFieldValue('FILL');
    var c = this.getFieldValue('COLOR');
    //var c = Blockly.propc.valueToCode(this, "COLOR", Blockly.propc.ORDER_NONE);
    if (c === '#000000')
        c = '0';
    else
        c = '1';
    if (f === 'TRUE')
        f = 'Filled';
    else
        f = '';

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'circle' + f + '(' + x + ', ' + y + ', ' + r + ', ' + c + ');\n';
    return code;
};

Blockly.Blocks.heb_oled_box = {
    init: function () {
        var oled_colors = new Blockly.FieldColour("#FFFFFF");
        oled_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('X0')
                .setCheck('Number')
                .appendField('Display draw rectangle at 1 (x)');
        this.appendValueInput('Y0')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('(y)');
        this.appendValueInput('W')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('width');
        this.appendValueInput('H')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('height');
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('filled')
                .appendField(new Blockly.FieldCheckbox('TRUE'), 'FILL');
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('color')
                .appendField(oled_colors, 'COLOR');
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_oled_box = function () {
    var x0 = Blockly.propc.valueToCode(this, "X0", Blockly.propc.ORDER_NONE);
    var y0 = Blockly.propc.valueToCode(this, "Y0", Blockly.propc.ORDER_NONE);
    var w = Blockly.propc.valueToCode(this, "W", Blockly.propc.ORDER_NONE);
    var h = Blockly.propc.valueToCode(this, "H", Blockly.propc.ORDER_NONE);
    var f = this.getFieldValue('FILL');
    var c = this.getFieldValue('COLOR');
    //var c = Blockly.propc.valueToCode(this, "COLOR", Blockly.propc.ORDER_NONE);
    if (c === '#000000')
        c = '0';
    else
        c = '1';
    if (f === 'TRUE')
        f = 'Filled';
    else
        f = '';

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'box' + f + '(' + x0 + ', ' + y0 + ', (' + x0 + '+' + w + '-1),';
    code += '(' + y0 + '+' + h + '-1), ' + c + ');\n';
    return code;
};

Blockly.Blocks.heb_oled_triangle = {
    init: function () {
        var oled_colors = new Blockly.FieldColour("#FFFFFF");
        oled_colors.setColours(['#FFFFFF', '#000000']).setColumns(2);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('X0')
                .setCheck('Number')
                .appendField('Display draw triangle from 1 (x)');
        this.appendValueInput('Y0')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('(y)');
        this.appendValueInput('X1')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('to 2 (x)');
        this.appendValueInput('Y1')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('(y)');
        this.appendValueInput('X2')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('to 3 (x)');
        this.appendValueInput('Y2')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('(y)');
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('filled')
                .appendField(new Blockly.FieldCheckbox('TRUE'), 'FILL');
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('color')
                .appendField(oled_colors, 'COLOR');
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_oled_triangle = function () {
    var x0 = Blockly.propc.valueToCode(this, "X0", Blockly.propc.ORDER_NONE);
    var y0 = Blockly.propc.valueToCode(this, "Y0", Blockly.propc.ORDER_NONE);
    var x1 = Blockly.propc.valueToCode(this, "X1", Blockly.propc.ORDER_NONE);
    var y1 = Blockly.propc.valueToCode(this, "Y1", Blockly.propc.ORDER_NONE);
    var x2 = Blockly.propc.valueToCode(this, "X2", Blockly.propc.ORDER_NONE);
    var y2 = Blockly.propc.valueToCode(this, "Y2", Blockly.propc.ORDER_NONE);
    var f = this.getFieldValue('FILL');
    var c = this.getFieldValue('COLOR');
    //var c = Blockly.propc.valueToCode(this, "COLOR", Blockly.propc.ORDER_NONE);
    if (c === '#000000')
        c = '0';
    else
        c = '1';
    if (f === 'TRUE')
        f = 'Filled';
    else
        f = '';

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'triangle' + f + '(' + x0 + ', ' + y0 + ', ' + x1 + ', ';
    code += y1 + ', ' + x2 + ', ' + y2 + ', ' + c + ');\n';
    return code;
};

Blockly.Blocks.heb_clear_screen = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Display clear screen');

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_clear_screen = function () {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'clear();\n';
    return code;
};

Blockly.Blocks.heb_rotate = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('Display rotate 180\u00B0');

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_rotate = function () {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'rotate180();\n';
    return code;
};

Blockly.Blocks.heb_ir_send_signal = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('MESSAGE')
                .setCheck('String')
                .appendField('IR send text');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_ir_send_signal = function () {
    var message = Blockly.propc.valueToCode(this, "MESSAGE", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'send(' + message + ');\n';
    return code;
};

Blockly.Blocks.heb_ir_read_signal = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField('IR receive store message in')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER')
                .appendField('length in')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'LENGTH');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
    },
    getVars: function () {
        return [this.getFieldValue('BUFFER'), this.getFieldValue('LENGTH')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER')))
            this.setFieldValue(newName, 'BUFFER');
        if (Blockly.Names.equals(oldName, this.getFieldValue('LENGTH')))
            this.setFieldValue(newName, 'LENGTH');
    }
};

Blockly.propc.heb_ir_read_signal = function () {
    var buffer = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);
    var len = Blockly.propc.variableDB_.getName(this.getFieldValue('LENGTH'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';
    Blockly.propc.vartype_[buffer] = 'char';
    Blockly.propc.varlength_[buffer] = 128;

    var code = len + '= receive(' + buffer + ');\n';
    return code;
};

Blockly.Blocks.heb_ir_clear_buffer = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                // @TODO : Should the title be something else? This might be confusing for beginners...
                .appendField("IR clear buffer");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_ir_clear_buffer = function () {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'irclear();\n';
    return code;
};

Blockly.Blocks.heb_badge_eeprom_store = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput('CONTACT')
                .setCheck('String')
                .appendField("EEPROM store contact");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_badge_eeprom_store = function () {
    var contact = Blockly.propc.valueToCode(this, "CONTACT", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'store(new char[]{"' + contact + '"});\n';
    return code;
};

Blockly.Blocks.heb_badge_eeprom_is_stored = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput('CONTACT')
                .setCheck('Number')
                .appendField("EEPROM contact");
        this.appendDummyInput()
                .appendField("already stored");
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_badge_eeprom_is_stored = function () {
    var contact = Blockly.propc.valueToCode(this, "CONTACT", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'stored(new char[]{"' + contact + '"})';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.heb_badge_eeprom_retrieve = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput('INDEX')
                .setCheck('Number')
                .appendField("EEPROM get contact at index");
        this.appendDummyInput()
                .appendField('store in')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_SET_ITEM), 'BUFFER');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
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
    }
};

Blockly.propc.heb_badge_eeprom_retrieve = function () {
    var index = Blockly.propc.valueToCode(this, "INDEX", Blockly.propc.ORDER_NONE);
    var buffer = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
    setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
    setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
    Blockly.propc.methods_["constrain_function"] = setup_code;
    Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'retrieve(' + buffer + ', constrain(' + index + ', 0, contacts_count() - 1));\n';
    return code;
};

Blockly.Blocks.heb_count_contacts = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("EEPROM count contacts");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_count_contacts = function () {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'contacts_count()';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.heb_erase_all_contacts = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("EEPROM erase all contacts");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_erase_all_contacts = function () {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'contacts_eraseAll();\n';
    return code;
};

Blockly.Blocks.heb_badge_axis_acceleration = {
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("Accelerometer get")
                .appendField(new Blockly.FieldDropdown([["x-axis", "AX"], ["y-axis", "AY"], ["z-axis", "AZ"]]), "AXIS");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_badge_axis_acceleration = function () {
    var axis = this.getFieldValue("AXIS");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'accel(' + axis + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.heb_badge_was_shaken = {
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("Accelerometer was shaken?");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_badge_was_shaken = function () {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'accel_shaken()';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.heb_touchpad_status = {
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("Touchpad is")
                .appendField(new Blockly.FieldDropdown([["0 - P27", "0"], ["1 - P26", "1"], ["2 - P25", "2"], ["3 - P15", "3"], ["4 - P16", "4"], ["5 - P17", "5"], ["6 - Center Button", "6"], ["Any button", "-1"]]), "TOUCHPAD")
                .appendField("pressed?");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.heb_touchpad_status = function () {
    var touchpad = this.getFieldValue("TOUCHPAD");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = '';
    if (touchpad === "-1") {
        code += 'buttons()';
    } else {
        code += 'button(' + touchpad + ')';
    }
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.heb_text_to_speech_say = {
    init: function () {
        this.setColour(colorPalette.getColor('heb'));
        this.appendValueInput('STRING')
                .setCheck('String')
                .appendField("TTS say");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_text_to_speech_say = function () {
    var str = Blockly.propc.valueToCode(this, "STRING", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    Blockly.propc.definitions_["TTS"] = '#include "text2speech.h"';
    Blockly.propc.global_vars_["TTS"] = 'talk *tts_talk;';
    Blockly.propc.setups_["TTS"] = 'tts_talk = talk_run(9, 10);\ntalk_set_speaker(tts_talk, 1, 100);';

    var code = 'talk_say(tts_talk, ' + str + ');\n';
    return code;
};

Blockly.Blocks.heb_text_to_speech_spell = {
    init: function () {
        this.setColour(colorPalette.getColor('heb'));
        this.appendValueInput('STRING')
                .setCheck('String')
                .appendField("TTS spell");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_text_to_speech_spell = function () {
    var str = Blockly.propc.valueToCode(this, "STRING", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    Blockly.propc.definitions_["TTS"] = '#include "text2speech.h"';
    Blockly.propc.global_vars_["TTS"] = 'talk *tts_talk;';
    Blockly.propc.setups_["TTS"] = 'tts_talk = talk_run(9, 10);\ntalk_set_speaker(tts_talk, 1, 100);';

    var code = 'talk_spell(tts_talk, ' + str + ');\n';
    return code;
};
