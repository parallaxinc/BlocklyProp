/* global colorPalette, profile */

/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Generating Spin for the debug lcd.
 * @author valetolpegin@gmail.com ( Vale Tolpegin )
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.debug_lcd_init = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput()
                .appendField("LCD initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"]]), "BAUD");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_music_note = {
    init: function() {
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

Blockly.Blocks.debug_lcd_print = {
     init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('MESSAGE')
            .setCheck('String')
                .appendField("LCD print text ");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_number = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput('VALUE')
            .appendField("LCD print number");
        this.appendDummyInput()
            .appendField("as")
            .appendField(new Blockly.FieldDropdown([
                ['Decimal','DEC'],
                ['Hexadecimal','HEX'],
                ['Binary', 'BIN']
            ]), "FORMAT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.debug_lcd_action = {
    init: function () {
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

Blockly.propc.debug_lcd_init = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.setups_['setup_debug_lcd'] = 'serial *debug_lcd = serial_open(' + dropdown_pin + ', ' + dropdown_pin + ', 0, ' + baud + ');\n';

    var code = 'writeChar(debug_lcd, 22);\n';
    return code;
};

//Blockly.propc.debug_lcd_clear = function () {
//    return 'writeChar(debug_lcd, 12);\npause(5);\n';
//};

Blockly.propc.debug_lcd_music_note = function () {
  var dropdown_note = this.getFieldValue('NOTE');
  var dropdown_octave = this.getFieldValue('OCTAVE');
  var dropdown_length = this.getFieldValue('LENGTH');

  var code  = 'writeChar(debug_lcd, ' + dropdown_octave + ');\n';
      code += 'writeChar(debug_lcd, ' + dropdown_length + ');\n';
      code += 'writeChar(debug_lcd, ' + dropdown_note + ');\n';
      
  return code;
};

Blockly.propc.debug_lcd_print = function () {
    var msg = Blockly.propc.valueToCode(this, 'MESSAGE', Blockly.propc.ORDER_NONE);
    var code = 'dprint(debug_lcd, ' + msg + ');';

    return code;
};

Blockly.propc.debug_lcd_number = function () {
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC);
    var format = this.getFieldValue('FORMAT');
    Blockly.propc.serial_terminal_ = true;

    var code = 'dprint(debug_lcd, ';
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

Blockly.propc.debug_lcd_action = function () {
var action = this.getFieldValue('ACTION');
var code = '';
if(action === '12') {
    code = 'pause(5);\n';
}
code += 'writeChar(debug_lcd, ' + action + ');\n';
return code;
};
