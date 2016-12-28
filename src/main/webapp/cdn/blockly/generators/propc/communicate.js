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
    init: function() {
	this.setTooltip(Blockly.MSG_CONSOLE_PRINT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('MESSAGE')
            .setCheck('String')
            .appendField("Terminal print text");
        this.appendDummyInput()
            .appendField("then a new line")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "ck_nl");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_print = function () {
    var text = Blockly.propc.valueToCode(this, 'MESSAGE', Blockly.propc.ORDER_ATOMIC);
    var checkbox = this.getFieldValue('ck_nl');

    Blockly.propc.serial_terminal_ = true;
    
    var code = 'print(' + text.replace("%","%%") + ');\n';
    if (checkbox === 'TRUE') { code += 'print("\\r");\n'; }
    return code;
};

Blockly.Blocks.console_print_variables = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_CONSOLE_PRINT_VARIABLES_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
            .appendField("Terminal print number");
        this.appendDummyInput()
            .appendField("as")
            .appendField(new Blockly.FieldDropdown([
                ['Decimal','DEC'],
                ['Hexadecimal','HEX'],
                ['Binary', 'BIN'],
                ['ASCII Character', 'CHAR']
            ]), "FORMAT");
        this.appendDummyInput()
            .appendField("then a new line")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "ck_nl");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
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

Blockly.Blocks.console_scan_text = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_CONSOLE_SCAN_TEXT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal receive text store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }

};

Blockly.propc.console_scan_text = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);    
    Blockly.propc.vartype_[data] = 'char *';   
    Blockly.propc.serial_terminal_ = true;

    if(data !== '') {
        var code = 'getStr(' + data + ', 128);\n';

        return code;
    } else {
        return '';
    }
};

Blockly.Blocks.console_scan_number = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_CONSOLE_SCAN_NUMBER_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Terminal receive")
                .appendField(new Blockly.FieldDropdown([["number (32-bit integer)", "NUMBER"], ["byte (ASCII character)", "BYTE"]]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }

};

Blockly.propc.console_scan_number = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);    

    Blockly.propc.serial_terminal_ = true;
    var code = '';

    if(data !== '') {
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
    init: function() {
	this.setTooltip(Blockly.MSG_CONSOLE_NEWLINE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("Terminal new line");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_newline = function () {
    Blockly.propc.serial_terminal_ = true;
    return 'term_cmd(CR);\n';
};

Blockly.Blocks.console_clear = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_CONSOLE_CLEAR_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("Terminal clear screen");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.console_clear = function () {
    Blockly.propc.serial_terminal_ = true;
    return 'term_cmd(CLS);\n';
};

Blockly.Blocks.console_move_to_position = {
    helpUrl: Blockly.MSG_TERMINAL_HELPURL,
    init: function() {
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
        this.setPreviousStatement(true, null);
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
    init: function() {
	this.setTooltip(Blockly.MSG_SERIAL_OPEN_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial initialize RX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "RXPIN")
                .appendField("TX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "TXPIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["19200", "19200"], ["57600", "57600"], ["115200", "115200"]]), "BAUD");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.serial_open = function () {
    var dropdown_rx_pin = this.getFieldValue('RXPIN');
    var dropdown_tx_pin = this.getFieldValue('TXPIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';
    Blockly.propc.definitions_["var fdserial"] = 'fdserial *fdser;';
    Blockly.propc.setups_['setup_fdserial'] = 'fdser = fdserial_open(' + dropdown_rx_pin + ', ' + dropdown_tx_pin + ', 0, ' + baud + ');';

    return '';
};

Blockly.Blocks.serial_tx = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_SERIAL_TX_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial transmit")
                .appendField(new Blockly.FieldDropdown([
                    ["number (32-bit integer)", "INT"], 
                    ["byte (ASCII character)", "BYTE"] 
                    ]), "TYPE");
        this.appendValueInput('VALUE', Number)
                .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.serial_tx = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

    if (Blockly.propc.setups_["setup_fdserial"] === undefined)
    {
        return '//Missing serial port initialize block\n';
    } else {
        if(type === "BYTE") {
            return 'fdserial_txChar(fdser, (' + data + ' & 0xFF) );\n';
        } else {
            var code = 'fdserial_txChar(fdser, (' + data + ' >> 24) & 255);\n'; 
            code += 'fdserial_txChar(fdser, (' + data + ' >> 16) & 255);\n';
            code += 'fdserial_txChar(fdser, (' + data + ' >> 8 ) & 255);\n';
            code += 'fdserial_txChar(fdser, ' + data + ' & 255);\n';

            return code;
        }
    }
};

Blockly.Blocks.serial_send_text = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_SERIAL_SEND_TEXT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
                .appendField("Serial transmit text")
                .setCheck('String');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.serial_send_text = function () {
    var text = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE);
   
    if (Blockly.propc.setups_['setup_fdserial'] === undefined) {
        return '//Missing serial port initialize block\n';
    } else {
        var code = 'dprint(fdser, ' + text.replace("%","%%") + ');\n';
        code += 'while(!fdserial_txEmpty(fdser));\n';
        code += 'pause(5);\n';

        return code;
    }
};

Blockly.Blocks.serial_rx = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_SERIAL_RX_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial receive")
                .appendField(new Blockly.FieldDropdown([
                    ["number (32-bit integer)", "INT"], 
                    ["byte (ASCII character)", "BYTE"] 
                    ]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.serial_rx = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);    

    if (Blockly.propc.setups_["setup_fdserial"] === undefined)
    {
        return '//Missing serial port initialize block\n';
    } else {
        if(data !== '') {
            if(type === "BYTE") {
                return data + ' = fdserial_rxChar(fdser);\n';
            } else {
                return data + ' = (fdserial_rxChar(fdser) << 24) | (fdserial_rxChar(fdser) << 16) | (fdserial_rxChar(fdser) << 8) | fdserial_rxChar(fdser);\n';
            }
        } else {
            return '';
        }
    }
};

Blockly.Blocks.serial_receive_text = {
    helpUrl: Blockly.MSG_PROTOCOLS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_SERIAL_RECEIVE_TEXT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("Serial receive text store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.serial_receive_text = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);    

    Blockly.propc.global_vars_["ser_rx"] = "int __idx;";
    Blockly.propc.vartype_[data] = 'char *';
    
    if (Blockly.propc.setups_["setup_fdserial"] === undefined)
    {
        return '//Missing serial port initialize block\n';
    } else {
        if(data !== '') {
            var code = '__idx = 0;\n';
            code += 'do {\n';
            code += '  ' + data + '[__idx] = fdserial_rxChar(fdser);\n';
            code += '  __idx++;\n';
            code += '} while(fdserial_rxPeek(fdser) != 0);\n';    
            code += data + '[__idx] = 0;\nfdserial_rxFlush(fdser);\n';

            return code;
        } else {
            return '';
        }
    }
};

//--------------- Serial LCD Blocks --------------------------------------------
Blockly.Blocks.debug_lcd_init = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_DEBUG_LCD_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"]]), "BAUD");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_init = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.setups_['setup_debug_lcd'] = 'serial *debug_lcd = serial_open(' + dropdown_pin + ', ' + dropdown_pin + ', 0, ' + baud + ');\n';

    var code = 'writeChar(debug_lcd, 22);\npause(5);\n';
    return code;
};

Blockly.Blocks.debug_lcd_music_note = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_DEBUG_LCD_MUSIC_NOTE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("LCD play note")
            .appendField(new Blockly.FieldDropdown([["C", "223"], ["C#", "224"], ["D", "225"], ["D#", "226"], ["E", "227"], ["F", "228"], ["F#", "229"], ["G", "230"], ["G#", "231"], ["A", "220"], ["A#", "221"], ["B", "222"], ["no note (rest)", "232"]]), "NOTE")
            .appendField("octave")
            .appendField(new Blockly.FieldDropdown([["3rd", "215"], ["4th", "216"], ["5th", "217"], ["6th", "218"], ["7th", "219"]]), "OCTAVE")
            .appendField("length")
            .appendField(new Blockly.FieldDropdown([["whole (2 s)", "214"], ["half (1 s)", "213"], ["quarter (500 ms)", "212"], ["eigth (250 ms)", "211"], ["sixteenth (125 ms)", "210"], ["thirty-second (63 ms)", "209"], ["sixty-fourth (31 ms)", "208"]]), "LENGTH");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_music_note = function () {
    var dropdown_note = this.getFieldValue('NOTE');
    var dropdown_octave = this.getFieldValue('OCTAVE');
    var dropdown_length = this.getFieldValue('LENGTH');

    var code = '';
    
    if(Blockly.propc.setups_['setup_debug_lcd'] === undefined) {
        code += '//Missing Serial LCD initialize block\n';
    } else {
        code += 'writeChar(debug_lcd, ' + dropdown_octave + ');\n';
        code += 'writeChar(debug_lcd, ' + dropdown_length + ');\n';
        code += 'writeChar(debug_lcd, ' + dropdown_note + ');\n';
    } 
    
    return code;
};

Blockly.Blocks.debug_lcd_print = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_DEBUG_LCD_PRINT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('MESSAGE')
            .setCheck('String')
                .appendField("LCD print text ");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_print = function () {
    var msg = Blockly.propc.valueToCode(this, 'MESSAGE', Blockly.propc.ORDER_NONE);
    
    if(Blockly.propc.setups_['setup_debug_lcd'] === undefined) {
        return '//Missing Serial LCD initialize block\n';
    } else {
        return 'dprint(debug_lcd, ' + msg.replace("%","%%") + ');\n';
    }
};

Blockly.Blocks.debug_lcd_number = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_DEBUG_LCD_NUMBER_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
            .appendField("LCD print number");
        this.appendDummyInput()
            .appendField("as")
            .appendField(new Blockly.FieldDropdown([['Decimal','DEC'], ['Hexadecimal','HEX'], ['Binary', 'BIN']]), "FORMAT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_number = function () {
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC);
    var format = this.getFieldValue('FORMAT');

    var code = '';
    
    if(Blockly.propc.setups_['setup_debug_lcd'] === undefined) {
        code += '//Missing Serial LCD initialize block\n';
    } else {
        code += 'dprint(debug_lcd, ';
        if (format === 'BIN') {
            code += '"%b"';
        }else if (format === 'HEX') {
            code += '"%x"';                
        }else {
            code += '"%d"';
        } 

        code += ', ' + value + ');';
    }
    return code;
};

Blockly.Blocks.debug_lcd_action = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function() {
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_action = function () {
    var action = this.getFieldValue('ACTION');
    var code = '';
    
    if(Blockly.propc.setups_['setup_debug_lcd'] === undefined) {
        code += '//Missing Serial LCD initialization\n';
    } else {
        code += 'writeChar(debug_lcd, ' + action + ');\n';
        //if(action === '12') {
            code += 'pause(5);\n';
        //}
    }
    return code;
};

Blockly.Blocks.debug_lcd_set_cursor = {
    helpUrl: Blockly.MSG_SERIAL_LCD_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_DEBUG_LCD_SET_CURSOR_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('ROW')
            .appendField("LCD set cursor row")
            .setCheck('Number');
        this.appendValueInput('COLUMN')
            .appendField("column")
            .setCheck('Number');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.debug_lcd_set_cursor = function () {
    var row = Blockly.propc.valueToCode(this, 'ROW', Blockly.propc.ORDER_NONE);
    var column = Blockly.propc.valueToCode(this, 'COLUMN', Blockly.propc.ORDER_NONE);

    var setup_code = '// Constrain Function\nint constrain(int __cVal, int __cMin, int __cMax) {';
    setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
    setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
    Blockly.propc.global_vars_["constrain_function"] = setup_code;

    if(Blockly.propc.setups_['setup_debug_lcd'] === undefined) {
        return '//Missing Serial LCD initialize block\n';
    } else {
        return 'writeChar(debug_lcd, (128 + (constrain(' + row + ', 0, 3) * 20) + constrain(' + column + ', 0, 20)));\n';
    }
};

//--------------- XBee Blocks --------------------------------------------------
Blockly.Blocks.xbee_setup = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function() {
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.xbee_setup = function () {
    var do_pin = this.getFieldValue('DO_PIN');
    var di_pin = this.getFieldValue('DI_PIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.definitions_["include fdserial"] = '#include "fdserial.h"';

    Blockly.propc.global_vars_["xbee"] = "fdserial *xbee;";
    Blockly.propc.setups_["xbee"] = 'xbee = fdserial_open(' + di_pin + ', ' + do_pin + ', 0, ' + baud + ');\n';

    return '';
};

Blockly.Blocks.xbee_transmit = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_XBEE_TRANSMIT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee transmit")
                .appendField(new Blockly.FieldDropdown([["text", "TEXT"], ["number (32-bit integer)", "INT"], ["byte (ASCII character)", "BYTE"]]), "TYPE");
        this.appendValueInput('VALUE', Number)
                .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.xbee_transmit = function () {
    var type = this.getFieldValue('TYPE');
    var data = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';

    if (Blockly.propc.setups_["xbee"] === undefined)
    {
        return '//Missing xbee initialize block\n';
    } else {
        if(type === "BYTE") {
            return 'fdserial_txChar(xbee, (' + data + ' & 0xFF) );\n';
        } else if(type === "INT") {
            return 'dprint(xbee, "%d\\r", ' + data + ');\n';
        } else {   
            var code = 'dprint(xbee, "%s\\r", ' + data.replace("%","%%") + ');\n';
            code += 'while(!fdserial_txEmpty(xbee));\n';
            code += 'pause(5);\n';

            return code;
        }
    }
};

Blockly.Blocks.xbee_receive = {
    helpUrl: Blockly.MSG_XBEE_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_XBEE_RECEIVE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("XBee receive")
                .appendField(new Blockly.FieldDropdown([["text", "TEXT"], ["number (32-bit integer)", "INT"], ["byte (ASCII character)", "BYTE"]]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setTitleValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.xbee_receive = function () {
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
    var type = this.getFieldValue('TYPE');

    if (Blockly.propc.setups_["xbee"] === undefined)
    {
        return '//Missing xbee initialize block\n';
    } else {
        if(type === "BYTE") {
            return  data + ' = fdserial_rxChar(xbee);\n';
        } else if(type === "INT") {
            return 'dscan(xbee, "%d", &' + data + ');\n';
        } else {  
            Blockly.propc.global_vars_["xbee_rx"] = "int __XBidx;";
            Blockly.propc.vartype_[data] = 'char *';

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

// -------------- OLED Display blocks ------------------------------------------
Blockly.Blocks.oled_initialize = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
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

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_initialize = function () {
    var cs_pin = this.getFieldValue("CS");
    var dc_pin = this.getFieldValue("DC");
    var din_pin = this.getFieldValue("DIN");
    var clk_pin = this.getFieldValue("CLK");
    var res_pin = this.getFieldValue("RES");

    Blockly.propc.definitions_["oledtools"] = '#include "oledc.h"';
    Blockly.propc.setups_["oled"] = 'oledc_init(' + din_pin + ', ' + clk_pin + ', ' + cs_pin + ', ' + dc_pin + ', ' + res_pin + ', 2);';

    return '';
};

Blockly.Blocks.oled_font_loader = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
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
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_CLEAR_SCREEN_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("OLED command")
            .appendField(new Blockly.FieldDropdown([["clear screen", "CLS"], ["sleep", "SLEEP"], ["wake", "WAKE"], ["invert", "INV"]]), "CMD");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_clear_screen = function() {
    var cmd = this.getFieldValue("CMD");

    var code = '';
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {  
        if(cmd === 'CLS') {
            code += 'oledc_clear(0, 0, oledc_getWidth(), oledc_getHeight() );\n';
        } else if(cmd === 'WAKE') {
            code += 'oledc_wake();\n';
        } else if(cmd === 'SLEEP') {
            code += 'oledc_sleep();\n';
        } else if(cmd === 'INV') {
            code += 'oledc_invertDisplay();\n';
        }
    }
    return code;
};

Blockly.Blocks.oled_draw_circle = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
    }
};

Blockly.propc.oled_draw_circle = function() {
    // Ensure header file is included
    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var point_x0 = Blockly.propc.valueToCode(this, 'POINT_X', Blockly.propc.ORDER_NONE);
    var point_y0 = Blockly.propc.valueToCode(this, 'POINT_Y', Blockly.propc.ORDER_NONE);
    var radius = Blockly.propc.valueToCode(this, 'RADIUS', Blockly.propc.ORDER_NONE);
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    var checkbox = this.getFieldValue('ck_fill');
    var code;

    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {
        if (checkbox === 'TRUE') {
            code = 'oledc_fillCircle(';
        } else {
            code = 'oledc_drawCircle(';
        }
        code += point_x0 + ', ' + point_y0 + ', ';
        code += radius + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")) ';
        code += ');';
    }
    return code;
};

Blockly.Blocks.oled_draw_line = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_draw_line = function () {
    // Ensure header file is included
    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var x_one = Blockly.propc.valueToCode(this, "X_ONE", Blockly.propc.ORDER_NONE);
    var y_one = Blockly.propc.valueToCode(this, "Y_ONE", Blockly.propc.ORDER_NONE);
    var x_two = Blockly.propc.valueToCode(this, "X_TWO", Blockly.propc.ORDER_NONE);
    var y_two = Blockly.propc.valueToCode(this, "Y_TWO", Blockly.propc.ORDER_NONE);
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    var code = '';
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {
        code += 'oledc_drawLine(' + x_one + ', ' + y_one + ', ' + x_two + ', ' + y_two + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));';
    }
    return code;
};

Blockly.Blocks.oled_draw_pixel = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_draw_pixel = function() {
    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var point_x = Blockly.propc.valueToCode(this, 'X_AXIS', Blockly.propc.ORDER_ATOMIC);
    var point_y = Blockly.propc.valueToCode(this, 'Y_AXIS', Blockly.propc.ORDER_ATOMIC);
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    var code = '';
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {
        code += 'oledc_drawPixel(' + point_x + ', ' + point_y + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));';
    }
    return code;
};

Blockly.Blocks.oled_draw_triangle = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_DRAW_TRIANGLE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        // First x/y coordinates
        this.appendValueInput("POINT_X0")
            .setCheck(null)
            .appendField("OLED draw triangle at 1 (x)");
        this.appendValueInput("POINT_Y0")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("(y)");
        // Second x/y coordinates
        this.appendValueInput("POINT_X1")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("2 (x)");
        this.appendValueInput("POINT_Y1")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("(y)");
        // Third x/y coordinates
        this.appendValueInput("POINT_X2")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("3 (x)");
        this.appendValueInput("POINT_Y2")
            .setCheck(null)
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_draw_triangle = function() {
    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var point_x0 = Blockly.propc.valueToCode(this, 'POINT_X0', Blockly.propc.ORDER_NONE);
    var point_y0 = Blockly.propc.valueToCode(this, 'POINT_Y0', Blockly.propc.ORDER_NONE);
    var point_x1 = Blockly.propc.valueToCode(this, 'POINT_X1', Blockly.propc.ORDER_NONE);
    var point_y1 = Blockly.propc.valueToCode(this, 'POINT_Y1', Blockly.propc.ORDER_NONE);
    var point_x2 = Blockly.propc.valueToCode(this, 'POINT_X2', Blockly.propc.ORDER_NONE);
    var point_y2 = Blockly.propc.valueToCode(this, 'POINT_Y2', Blockly.propc.ORDER_NONE);
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    var checkbox = this.getFieldValue('ck_fill');
    var code;
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {
        if (checkbox === 'TRUE') {
            code = 'oledc_fillTriangle(';
        } else {
            code = 'oledc_drawTriangle(';
        }

        code += point_x0 + ', ' + point_y0 + ', ';
        code += point_x1 + ', ' + point_y1 + ', ';
        code += point_x2 + ', ' + point_y2 + ', ';
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));';
    }
    return code;
};

Blockly.Blocks.oled_draw_rectangle = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
    }
};

Blockly.propc.oled_draw_rectangle = function() {
    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var point_x = Blockly.propc.valueToCode(this, 'POINT_X', Blockly.propc.ORDER_NONE);
    var point_y = Blockly.propc.valueToCode(this, 'POINT_Y', Blockly.propc.ORDER_NONE);
    var width = Blockly.propc.valueToCode(this, 'RECT_WIDTH', Blockly.propc.ORDER_NONE);
    var height = Blockly.propc.valueToCode(this, 'RECT_HEIGHT', Blockly.propc.ORDER_NONE);
    var corners = Blockly.propc.valueToCode(this, 'RECT_ROUND', Blockly.propc.ORDER_NONE);
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    var checkbox = this.getFieldValue('ck_fill');
    var code;

    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {
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
            }
            else {
                code = 'oledc_drawRoundRect(';
            }
            code += point_x + ', ' + point_y + ', ' + width + ', ' + height + ', ' + corners + ', ';
        }
        code += 'oledc_color565(get8bitColor(' + color + ', "RED"), get8bitColor(' + color + ', "GREEN"), get8bitColor(' + color + ', "BLUE")));\n';
    }
    return code;
};

Blockly.Blocks.oled_text_size = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_TEXT_SIZE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("OLED text size")
            .appendField(new Blockly.FieldDropdown([["small", "SMALL"], ["medium", "MEDIUM"], ["large", "LARGE"]]), "size_select")
            .appendField("font")
            .appendField(new Blockly.FieldDropdown([["sans", "FONT_SANS"], ["serif", "FONT_SERIF"], ["script", "FONT_SCRIPT"], ["bubble", "FONT_BUBBLE"]]), "font_select");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_text_size = function() {
    var size = this.getFieldValue('size_select');
    var font = this.getFieldValue('font_select');

    var code = '';
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {
        // TODO: Update constants when new oledc library is published
        code += 'oledc_setTextSize(' + size + ');\n';
        code += 'oledc_setTextFont(' + font + ');\n';
    }
    return code;
};

Blockly.Blocks.oled_text_color = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_TEXT_COLOR_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('FONT_COLOR')
            .setCheck('Number')
            .appendField("OLED font color");
        this.appendValueInput('BACKGROUND_COLOR')
            .setCheck('Number')
            .appendField("font background color");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.oled_text_color = function() {
    Blockly.propc.definitions_["colormath"] = '#include "colormath.h"';

    var font_color = Blockly.propc.valueToCode(this, 'FONT_COLOR', Blockly.propc.ORDER_NONE);
    var background_color = Blockly.propc.valueToCode(this, 'BACKGROUND_COLOR', Blockly.propc.ORDER_NONE);

    var code = '';
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        code += '//Missing OLED initialize block\n';
    } else {
        code += 'oledc_setTextColor(';

    //  TO DO: Try this - it's shorter but slightly slower:
    //  code += 'remapColor(' + font_color + ', "8R8G8B", "5R6G5B"), remapColor(' + background_color + ', "8R8G8B", "5R6G5B"));\n';

        code += 'oledc_color565(get8bitColor(' + font_color + ', "RED"), get8bitColor(' + font_color + ', "GREEN"), get8bitColor(' + font_color + ', "BLUE")), ';
        code += 'oledc_color565(get8bitColor(' + background_color + ', "RED"), get8bitColor(' + background_color + ', "GREEN"), get8bitColor(' + background_color + ', "BLUE")));';
    }
    return code;
};

Blockly.Blocks.oled_get_max_height = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_GET_MAX_HEIGHT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("OLED max height");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.oled_get_max_height = function() {
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        return ['0', Blockly.propc.ORDER_NONE];
    } else {
        return ['oledc_getHeight()', Blockly.propc.ORDER_NONE];
    }
};

Blockly.Blocks.oled_get_max_width = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_GET_MAX_WIDTH_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("OLED max width");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Number");
    }
};

Blockly.propc.oled_get_max_width = function() {
    if (Blockly.propc.setups_["oled"] === undefined)
    {
        return ['0', Blockly.propc.ORDER_NONE];
    } else {
        return ['oledc_getWidth()', Blockly.propc.ORDER_NONE];
    }
};

Blockly.Blocks.oled_set_cursor = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_SET_CURSOR_TOOLTIP);
        this.appendValueInput('X_POS')
            .setCheck('Number')
            .appendField("OLED set cursor at (x)");
        this.appendValueInput('Y_POS')
            .setCheck('Number')
            .appendField("(y)");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
    }
};

Blockly.propc.oled_set_cursor = function() {

    // Get user input
    var x = Blockly.propc.valueToCode(this, 'X_POS', Blockly.propc.ORDER_NONE);
    var y = Blockly.propc.valueToCode(this, 'Y_POS', Blockly.propc.ORDER_NONE);

    if (Blockly.propc.setups_["oled"] === undefined) {
        return '//Missing OLED initialize block\n';
    } else {
        return 'oledc_setCursor(' + x + ', ' + y + ',0);';
    }

};

Blockly.Blocks.oled_print_text = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_PRINT_TEXT_TOOLTIP);
        this.appendValueInput('MESSAGE')
            .setCheck('String')
            .appendField("OLED print text ");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
    }
};

Blockly.propc.oled_print_text = function() {
    var msg = Blockly.propc.valueToCode(this, 'MESSAGE', Blockly.propc.ORDER_NONE);
    
    if (Blockly.propc.setups_["oled"] === undefined) {
        return '//Missing OLED initialize block\n';
    } else {
        return 'oledc_drawText(' + msg + ');';
    }
};

Blockly.Blocks.oled_print_number = {
    helpUrl: Blockly.MSG_OLED_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_OLED_PRINT_NUMBER_TOOLTIP);
        this.appendValueInput('NUMIN')
            .setCheck('Number')
            .appendField("OLED print number ");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["Decimal", "DEC"], ["Hexadecimal", "HEX"], ["Binary", "BIN"]]), "type");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
    }
};

Blockly.propc.oled_print_number = function() {
    var num = Blockly.propc.valueToCode(this, 'NUMIN', Blockly.propc.ORDER_NONE);
    var type = this.getFieldValue('type');
    
    if (Blockly.propc.setups_["oled"] === undefined) {
        return '//Missing OLED initialize block\n';
    } else {
        return 'oledc_drawNumber(' + num + ', ' + type + ');';
    }
};

// -------------- RGB LEDs (WS2812B module) blocks -----------------------------
Blockly.Blocks.ws2812b_init = {
    helpUrl: Blockly.MSG_WS2812B_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_WS2812B_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("RGB-LED initialize PIN")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField("number of LEDs")
            .appendField(new Blockly.FieldTextInput('4', Blockly.FieldTextInput.numberValidator), "LEDNUM")
            .appendField("type")
            .appendField(new Blockly.FieldDropdown([["WS2812", "WS2812"]]), "TYPE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.ws2812b_init = function() {
    var pin = this.getFieldValue('PIN');
    var num = window.parseInt(this.getFieldValue('LEDNUM'));
    
    if(num < 1) num = 1;
    if(num > 1500) num = 1500;

    Blockly.propc.definitions_["ws2812b_def"] = '#include "ws2812.h"\n\n#define LED_PIN ' + pin + '\n#define LED_COUNT ' + num + '\n';    
    Blockly.propc.global_vars_["ws2812b_array"] = 'ws2812 *__ws2812b;\nint RGBleds[' + num + '];\nint __rgbTemp;\n';
    Blockly.propc.setups_["ws2812b_init"] = '__ws2812b = ws2812b_open();\n';
    
    return '';
};

Blockly.Blocks.ws2812b_set = {
    helpUrl: Blockly.MSG_WS2812B_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_WS2812B_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("LED")
            .setCheck("Number")
            .appendField("RGB-LED set LED number");
        this.appendValueInput("COLOR")
            .setCheck("Number")
            .appendField("to color");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.ws2812b_set = function() {
    var led = Blockly.propc.valueToCode(this, 'LED', Blockly.propc.ORDER_NONE);
    var color = Blockly.propc.valueToCode(this, 'COLOR', Blockly.propc.ORDER_NONE);

    var code = '';
    if (Blockly.propc.setups_["ws2812b_init"] === undefined) {
        code += '//Missing RGB-LED initialize block\n';
    } else {
        code += '__rgbTemp = ' + led + ';\nif(__rgbTemp < 1) __rgbTemp = 1;\nif(__rgbTemp > LED_COUNT) __rgbTemp = LED_COUNT;\n';
        code += 'RGBleds[(__rgbTemp - 1)] = ' + color + ';\n';
    }    
    return code;
};

Blockly.Blocks.ws2812b_update = {
    helpUrl: Blockly.MSG_WS2812B_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_WS2812B_UPDATE_TOOLTIP);
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("RGB-LED update LEDs");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.ws2812b_update = function() {
    if (Blockly.propc.setups_["ws2812b_init"] === undefined) {
        return '//Missing RGB-LED initialize block\n';
    } else {
        return 'ws2812_set(__ws2812b, LED_PIN, RGBleds, LED_COUNT);\n';
    }
};

// --------------------- Simple WX Module --------------------------------------
Blockly.Blocks.wx_set_widget = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput("SET_1")
            .appendField("Simple WX set widget")
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
                }), "TYPE");
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
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var type = this.getFieldValue('TYPE');
        container.setAttribute('TYPE', type);
        return container;
    },
    domToMutation: function (xmlElement) {
        var type = xmlElement.getAttribute('TYPE');
        this.updateShape_({"TYPE": type});
    },
    updateShape_: function (details) {
        var type = details['TYPE'];
        if (details['TYPE'] === undefined) {
            type = this.getFieldValue('TYPE');
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
                .appendField(" minimum")
                .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), 'MIN')
                .appendField(" maximum")
                .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'MAX');
        } else if (type === '0' || type === '5' || type === '9') {
            inputPins.appendField("widget color")
                .appendField(new Blockly.FieldColour("#ffffff"), "COLOR")
                .appendField(" initial value")
                .appendField(new Blockly.FieldTextInput('5', Blockly.FieldTextInput.numberValidator), 'INITIAL');
        } else if (type === '8') {
            inputPins.appendField("widget color")
                .appendField(new Blockly.FieldColour("#ffffff"), "COLOR")
                .appendField(" initial color shown")
                .appendField(new Blockly.FieldColour("#ffffff"), "INITIAL_COLOR");
        } else if (type === '3' || type === '4') {
            inputPins.appendField("widget color")
                .appendField(new Blockly.FieldColour("#ffffff"), "COLOR");
        }
    }
};

Blockly.propc.wx_set_widget = function() {
    var widget = this.getFieldValue('WIDGET');
    var type = this.getFieldValue('TYPE');
    var color = this.getFieldValue('COLOR').substr(1).toUpperCase();
    var min = window.parseInt(this.getFieldValue('MIN') || '0');
    var max = window.parseInt(this.getFieldValue('MAX') || '10');
    var initial;
    if (type !== '8') {
        initial = window.parseInt(this.getFieldValue('INITIAL') || '5');
    } else { 
        initial = window.parseInt((this.getFieldValue('INITIAL_COLOR') || '#FFFFFF').substr(1), 16);
    }
    
    var code = '';
    code += 'wx_print("s' + widget + ',' + type + ',' + color + ',';
    code += min + ',' + max + ',' + initial + '");\n';
    
    return code;
};

Blockly.Blocks.wx_send_widget = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("NUM")
            .setCheck(null)
            .appendField("Simple WX send");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["as text", "%s"], ["as an ASCII character", "%c"], ["as a decimal integer", "%d"], ["as a hexadecimal integer", "%x"], ["as a binary integer", "%b"]]), "TYPE")
            .appendField("to widget")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"]]), "WIDGET");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.wx_send_widget = function() {
    var num = Blockly.propc.valueToCode(this, 'NUM', Blockly.propc.ORDER_NONE);
    var widget = this.getFieldValue('WIDGET');
    var type = this.getFieldValue('TYPE');
    
    var code = '';
    code += 'wx_print("t' + widget + ',' + type + '", ' + num + ');\n';
    
    return code;
};

Blockly.Blocks.wx_read_widget = {
    init: function() {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
            .appendField("Simple WX read")
            .appendField(new Blockly.FieldDropdown([["text", "%s"], ["an ASCII character", "%c"], ["a decimal integer", "%d"], ["a hexadecimal integer", "%x"], ["a binary integer", "%b"]]), "TYPE")
            .appendField("from widget")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"]]), "WIDGET")
            .appendField("store in")
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), "VAR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.wx_read_widget = function() {
    var value = Blockly.propc.valueToCode(this, 'VAR', Blockly.propc.ORDER_NONE);
    var widget = this.getFieldValue('WIDGET');
    var type = this.getFieldValue('TYPE');
    
    var code = '';
    code += 'wx_scan("r' + widget + ',' + type + '", &' + value + ');\n';
    
    return code;
};
