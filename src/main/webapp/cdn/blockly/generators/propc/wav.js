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
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("play file")
            .appendField(new Blockly.FieldTextInput('File_name'), 'FILENAME');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.wav_status = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("status");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.wav_volume = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendValueInput('VOLUME')
            .appendField("volume (0 - 10)");
        this.appendValueInput('LENGTH')
            .appendField("length of file (in milliseconds)");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.wav_stop = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("stop");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.wav_play = function() {
    var filename = this.getFieldValue('FILENAME');

    Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';
    Blockly.propc.setups_["sd_card"] = 'int DO = 22, CLK = 23, DI = 24, CS = 25;\n\tsd_mount(DO, CLK, DI, CS);\n';

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

    if (Number(volume) < 0) {
        volume = '0';
    } else if (Number(volume) > 10) {
        volume = '10';
    }

    var code = 'wav_volume(' + volume + ');\npause(' + length + ');\n';
    return code;
};

Blockly.propc.wav_stop = function() {
    var code = 'wav_stop();\n';
    return code;
};
