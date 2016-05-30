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


// @TODO : Change "toggle_led" to something more appropriate maybe?
Blockly.Blocks.heb_toggle_led = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField('Set LED state')
            .appendField('LED #')
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]), "LED_#")
            .appendField('LED state')
            .appendField(new Blockly.FieldDropdown([["ON", "1"], ["OFF", "0"]]), "STATE");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_toggle_led = function() {
    var led_number = this.getFieldValue("LED_#");
    var led_state = this.getFieldValue("STATE");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'led( ' + led_number + ', ' + led_state + ' );\n';
    return code;
};

Blockly.Blocks.heb_set_led_rgb = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField('Set LED' + "'" + 's RGB')
            .appendField('LED side')
            .appendField(new Blockly.FieldDropdown([["L", "L"], ["R", "R"]]), "SIDE")
            .appendField('RGB value')
            .appendField(new Blockly.FieldDropdown([["BLUE", "BLUE"], ["GREEN", "GREEN"], ["CYAN", "CYAN"], ["RED", "RED"], ["MAGENTA", "MAGENTA"], ["YELLOW", "YELLOW"], ["WHITE", "WHITE"], ["OFF", "OFF"]]), "RGB");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_set_led_rgb = function() {
    var led_side = this.getFieldValue("SIDE");
    var led_rgb = this.getFieldValue("RGB");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'rgb( ' + led_side + ', ' + led_rgb + ' );\n';
    return code;
};

Blockly.Blocks.heb_print_string_var = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendValueInput('VALUE')
            .appendField("Print");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_print_string_var = function() {
    var value = Blockly.propc.valueToCode(this, "VALUE", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'oledprint("' + value + ' = %d \n",' + value + ');\n';
    return code;
};

Blockly.Blocks.heb_cursor_position = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField('Set cursor position')
            .appendField('Set text size')
            .appendField(new Blockly.FieldDropdown([["SMALL", "SMALL"], ["LARGE", "LARGE"]]), "TEXT_SIZE")
            .appendField('Columns')
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]]), "COLS")
            .appendField('Rows')
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "ROWS");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_cursor_position = function() {
    var columns = this.getFieldValue("COLS");
    var rows = this.getFieldValue("ROWS");
    var text_size = this.getFieldValue("TEXT_SIZE");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'text_size( ' + text_size + ' );\n' + 'cursor( ' + columns + ', ' + rows + ' );\n';
    return code;
};

Blockly.Blocks.heb_clear_screen = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField('Clear screen');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_clear_screen = function() {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'clear();\n';
    return code;
};

Blockly.Blocks.heb_rotate = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField('Rotate 180');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_rotate = function () {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'rotate180();\n';
    return code;
};

Blockly.Blocks.heb_send_signal = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField('Send a message')
            .appendField(new Blockly.FieldTextInput(''), "MESSAGE");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_send_signal = function() {
    var message = this.getFieldValue("MESSAGE");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'send( "' + message + '" );\n';
    return code;
};

Blockly.Blocks.heb_read_signal = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
                .appendField('number of characters received');
        this.appendDummyInput()
            .appendField('Receive an array of characters');
        this.appendDummyInput()
                .appendField('Message contents:')
            .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER');

        this.setInputsInline(false);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    },
    getVars: function() {
        return [this.getFieldValue('BUFFER')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER'))) {
            this.setTitleValue(newName, 'BUFFER');
        }
    }
};

Blockly.propc.heb_read_signal = function() {
    var buffer = Blockly.propc.valueToCode(this, "BUFFER", Blockly.propc.ORDER_NONE);
    var length = Blockly.propc.valueToCode(this, "LENGTH", Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = length + ' = receive(' + buffer + ')';
    return code;
};

Blockly.Blocks.heb_clear_ir_buffer = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            // @TODO : Should the title be something else? This might be confusing for beginners...
            .appendField("Clear IR buffer");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_clear_ir_buffer = function() {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'irclear();\n';
    return code;
};

Blockly.Blocks.heb_badge_eeprom_store = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Store a contact")
            .appendField(new Blockly.FieldTextInput(''), "CONTACT");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_badge_eeprom_store = function() {
    var contact = this.getFieldValue("CONTACT");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'store( new char[]{"' + contact + '"} );\n';
    return code;
};

Blockly.Blocks.heb_badge_eeprom_is_stored = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Already stored?")
            .appendField("Info")
            .appendField(new Blockly.FieldTextInput(''), "CONTACT");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_badge_eeprom_is_stored = function() {
    var contact = this.getFieldValue("CONTACT");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'stored( new char[]{"' + contact + '"} )';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.heb_badge_eeprom_retrieve = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Retrieve an EEPROM value")
            .appendField("EEPROM Index")
            // @TODO : Get proper EEPROM index values ( THESE ARE  FOR TESTING PURPOSES ONLY )
            .appendField(new Blockly.FieldDropdown([["1", "0"], ["2", "1"], ["3", "2"]]), "INDEX");
        this.appendValueInput("BUFFER")
            .appendField('Variable');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_badge_eeprom_retrieve = function() {
    var buffer = Blockly.propc.valueToCode(this, "BUFFER", Blockly.propc.ORDER_NONE);
    var index = this.getFieldValue("INDEX");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'retrieve( ' + buffer + ', ' + index + ' );\n';
    return code;
};

Blockly.Blocks.heb_count_contacts = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Count contacts");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_count_contacts = function() {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'contacts_count()';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.heb_erase_all_contacts = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Erase all contacts");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.heb_erase_all_contacts = function() {
    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'contacts_eraseAll();\n';
    return code;
};

Blockly.Blocks.heb_badge_axis_acceleration = {
    init: function () {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Get axis acceleration")
            .appendField(new Blockly.FieldDropdown([["X", "AX"], ["Y", "AY"], ["Z", "AZ"]]), "AXIS");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.heb_badge_axis_acceleration = function() {
    var axis = this.getFieldValue("AXIS");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'accel( ' + axis + ' )';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.heb_badge_was_shaken = {
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Was shaken?");

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
    init: function() {
        this.setColour(colorPalette.getColor('heb'));
        this.appendDummyInput()
            .appendField("Is-touchpad-pressed?")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]]), "TOUCHPAD");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Boolean');
    }
};

Blockly.propc.heb_touchpad_status = function() {
    var touchpad = this.getFieldValue("TOUCHPAD");

    Blockly.propc.definitions_["badgetools"] = '#include "badgetools.h"';
    Blockly.propc.setups_["badgetools"] = 'badge_setup();';

    var code = 'button( ' + touchpad + ' )';
    return [code, Blockly.propc.ORDER_NONE];
};
