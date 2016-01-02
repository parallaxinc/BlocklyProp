/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
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
 * @fileoverview Generating Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.ab_drive_goto = {
    category: 'Drive',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput()
                .appendField('Drive goto')
                .appendField('Left')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'LEFT')
                .appendField('Right')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'RIGHT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.ab_drive_speed = {
    category: 'Drive',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput()
                .appendField('Drive speed')
                .appendField('Left')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'LEFT')
                .appendField('Right')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'RIGHT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};


// define generators
//Blockly.propc = new Blockly.Generator('propc');

Blockly.propc.ab_drive_goto = function() {
    var left = Number(this.getFieldValue('LEFT'));
    var right = Number(this.getFieldValue('RIGHT'));

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_goto(' + left + ', ' + right + ');\n';
};

Blockly.propc.ab_drive_speed = function() {
    var left = Number(this.getFieldValue('LEFT'));
    var right = Number(this.getFieldValue('RIGHT'));

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_speed(' + left + ', ' + right + ');\n';
};