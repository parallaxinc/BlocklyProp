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


Blockly.Language.console_print = {
    category: 'Console',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput("")
                .appendTitle("Print")
                .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
                        'media/quote0.png', 12, 12))
                .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
                .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
                        'media/quote1.png', 12, 12));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Language.console_print_variables = {
    category: 'Console',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendValueInput( 'VALUE' )
            .appendTitle( "Print" );
        this.setInputsInline( true );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};


// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.console_print = function() {
    var text = this.getTitleValue('TEXT');

    return 'print("' + text + '\\r");\n';
};

Blockly.propc.console_print_variables = function() {
    var value = Blockly.propc.valueToCode( this, 'VALUE', Blockly.propc.ORDER_ATOMIC ) || '1000';
    
    return 'print( ' + value + ' );\n';
};
