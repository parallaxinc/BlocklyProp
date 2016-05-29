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
 * @fileoverview Generating Prop-C for file blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.file_open = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("Open file")
            .appendField(new Blockly.FieldTextInput('file.txt'), 'FILE')
            .appendField("mode")
            .appendField(new Blockly.FieldDropdown([["read", "r"], ["write", "w"]]), "MODE");

        this.setOutput(true, 'Pointer');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks.file_close = {
    init: function() {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("Close file");
        this.appendValueInput('FILE');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.file_open = function() {
    var file = this.getFieldValue('FILE');
    var mode = this.getFieldValue('MODE');

    var code = 'fopen("' + file + '", "' + mode + '")';
    return [code, Blockly.propc.ORDER_ATOMIC];
};


Blockly.propc.file_close = function() {
    var file = Blockly.propc.valueToCode(this, 'FILE', Blockly.propc.ORDER_UNARY_PREFIX);

    if (file) {
        return 'fclose(' + file + ');\n'
    } else {
        return '// Missing file pointer';
    }
};
