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
if (!Blockly.Language)
    Blockly.Language = {};

Blockly.Language.inout_digital_write = {
    category: 'In/Out',
    helpUrl: 'help/block-digitalpin.html#write',
    init: function() {
        this.setColour(230);
        this.appendDummyInput("")
                .appendTitle("DigitalWrite PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendTitle("Stat")
                .appendTitle(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
    }
};


// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.inout_digital_write = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var dropdown_stat = this.getTitleValue('STAT');
    if (dropdown_stat == 1) {
        return 'high(' + dropdown_pin + ');\n';
    } else {
        return 'low(' + dropdown_pin + ');\n';
    }
};
