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
 * @author valetolpegin@gmail.com ( Vale Tolpegin )
 */
'use strict';

//define blocks
if (!Blockly.Language)
    Blockly.Language = {};


Blockly.Language.ab_drive_goto = {
    category: 'Activitybot',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput()
                .appendTitle('Drive goto')
                .appendTitle('Left')
                .appendTitle(new Blockly.FieldTextInput('64',
                        Blockly.Language.math_number.validator), 'LEFT')
                .appendTitle('Right')
                .appendTitle(new Blockly.FieldTextInput('64',
                        Blockly.Language.math_number.validator), 'RIGHT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Language.ab_drive_speed = {
    category: 'Activitybot',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput()
                .appendTitle('Drive speed')
                .appendTitle('Left')
                .appendTitle(new Blockly.FieldTextInput('64',
                        Blockly.Language.math_number.validator), 'LEFT')
                .appendTitle('Right')
                .appendTitle(new Blockly.FieldTextInput('64',
                        Blockly.Language.math_number.validator), 'RIGHT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.ab_drive_goto = function() {
    var left = Number(this.getTitleValue('LEFT'));
    var right = Number(this.getTitleValue('RIGHT'));

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_goto(' + left + ', ' + right + ');\n';
};

Blockly.propc.ab_drive_speed = function() {
    var left = Number(this.getTitleValue('LEFT'));
    var right = Number(this.getTitleValue('RIGHT'));

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_speed(' + left + ', ' + right + ');\n';
};