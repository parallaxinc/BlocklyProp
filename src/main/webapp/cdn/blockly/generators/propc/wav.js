/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com

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

if (!Blockly.Blocks)
  Blockly.Blocks = {};


Blockly.Blocks.wav_play = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Play file")
            .appendField(new Blockly.FieldTextInput('File_name'), 'FILENAME');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.wav_status = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Status");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.wav_volume = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendValueInput('VOLUME')
            .appendField("Volume");
        this.appendValueInput('LENGTH')
            .appendField("Length of file (in milliseconds)");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.wav_stop = {
    init: function() {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Stop");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.wav_play = function() {
    var filename = this.getFieldValue('FILENAME');

    Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';
    Blockly.propc.setups_["sd_card"] = 'sd_mount(' + do_pin + ', ' + clk_pin + ', ' + di_pin + ', ' + cs_pin + ');';

    var code = 'wav_play("' + filename + '.wav");\n';
    return code;
};

Blockly.propc.wav_status = function() {
    Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';

    var code = 'wav_playing()';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.propc.wav_volume = function() {
    var volume = Blockly.propc.valueToCode(this, 'VOLUME', Blockly.propc.ORDER_NONE) || '0';
    var length = Blockly.propc.valueToCode(this, 'LENGTH', Blockly.propc.ORDER_NONE) || '0';

    Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';

    var code = 'wav_volume(' + volume + ');\npause(' + length + ');\n';
    return code;
};

Blockly.propc.wav_stop = function() {
    var code = 'wav_stop();\n';
    return code;
};
