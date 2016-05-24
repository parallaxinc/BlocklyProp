/**
 * Visual Blocks Language
 *
 * Copyright 2016 Vale Tolpegin
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
 * @fileoverview Generating C for ActivityBot Blocks
 * @author valetolpegin@gmail.com (Vale Tolpegin)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.activitybot_calibrate = {
    init: function() {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
          .appendField("Calibrate");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.activitybot_display_calibration = {
    init: function() {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
          .appendField("Display calibration");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.activitybot_calibrate = function() {
    Blockly.propc.definitions_["activitybot_calibrate"] = '#include "abcalibrate.h"';
    Blockly.propc.setups_["activitybot_calibrate"] = 'cal_servoPins(12, 13);\n\tcal_encoderPins(14, 15);';

    return 'cal_activityBot();\n';
};

Blockly.propc.activitybot_display_calibration = function() {
    return 'drive_displayInterpolation();\n';
}
