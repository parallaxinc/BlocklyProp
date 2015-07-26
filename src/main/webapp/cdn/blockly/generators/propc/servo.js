/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo
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
 * @fileoverview Generating Spin for servo blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';


//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


//servo block
Blockly.Blocks.servo_move = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput("")
                .appendField("Servo")
                .appendField("PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        this.appendValueInput("DEGREES", Number)
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Degrees (0 - 180°)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// define generators
//Blockly.propc = new Blockly.Generator('propc');

Blockly.propc.servo_move = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    var degrees = Blockly.propc.valueToCode(this, 'DEGREES', Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_['define_servo'] = '#include "servo.h"';
//    Blockly.propc.setups_['setup_servo'] = 'SERVO.Start';

    var code = 'servo_angle(' + dropdown_pin + ', ' + degrees + ' * 10);\n';
    return code;
};