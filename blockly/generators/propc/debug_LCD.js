/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
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
 * @fileoverview Generating Spin for the debug lcd.
 * @author valetolpegin@gmail.com ( Vale Tolpegin )
 */
'use strict';


//define blocks
if (!Blockly.Language)
    Blockly.Language = {};


//servo block
Blockly.Language.debug_lcd_init = {
    category: 'Debug LCD',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
                .appendTitle( "LCD init" )
                .appendTitle( "PIN#" )
                .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
        this.appendDummyInput( "" )
                .appendTitle( "Baud" )
                .appendTitle( new Blockly.FieldDropdown( [["2400", "2400"], ["9600", "9600"], ["19200", "19200"]] ), "BAUD" );
        this.appendDummyInput( "" )
                .appendTitle( "Lines" )
                .appendTitle( new Blockly.FieldDropdown( [["2", "2"], ["4", "4"]] ), "LINES" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.debug_lcd_clear = {
    category: 'Debug LCD',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
                .appendTitle( "LCD clear" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.debug_lcd_print = {
    category: 'Debug LCD',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
                .appendTitle( "LCD print" )
                .appendTitle( new Blockly.FieldImage( Blockly.pathToBlockly +
                        'media/quote0.png', 12, 12 ) )
                .appendTitle( new Blockly.FieldTextInput( '' ), 'TEXT' )
                .appendTitle( new Blockly.FieldImage( Blockly.pathToBlockly +
                        'media/quote1.png', 12, 12 ) );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.debug_lcd_number = {
    category: 'Debug LCD',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
                .appendTitle( "LCD print" );
        this.appendDummyInput( "" ).appendTitle( "Number" );
        this.appendValueInput( 'NUMBER' )
            .setCheck( Number );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.debug_lcd_action = {
    category: 'Debug LCD',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
                .appendTitle( "LCD action" )
                .appendTitle( new Blockly.FieldDropdown( [["Newline", "13"]] ), "ACTION" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

// define generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.debug_lcd_init = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var baud = this.getTitleValue('BAUD');
    var lines = this.getTitleValue('LINES');

    //TO DO: HOW TO INITIALIZE AN LCD
    //Blockly.propc.definitions_['define_debug_lcd'] = '';
    Blockly.propc.setups_['setup_debug_lcd'] = 'serial *lcd';

    return '';
};

Blockly.propc.debug_lcd_clear = function() {

    //TO DO: HOW TO CLEAR AN LCD
    Blockly.propc.definitions_['define_debug_lcd'] = '';
    if (Blockly.propc.setups_['setup_debug_lcd'] === undefined) {
        Blockly.propc.setups_['setup_debug_lcd'] = '';
    }

    return '\n';
};

Blockly.propc.debug_lcd_print = function() {
    var text = this.getTitleValue('TEXT');

    //TO DO: HOW TO PRINT TO AN LCD
    Blockly.propc.definitions_['define_debug_lcd'] = '';
    if (Blockly.propc.setups_['setup_debug_lcd'] == undefined) {
        Blockly.propc.setups_['setup_debug_lcd'] = '';
    }

    return '\n';
};

Blockly.propc.debug_lcd_number = function() {
    var number = Blockly.propc.valueToCode(this, 'NUMBER', Blockly.propc.ORDER_UNARY_PREFIX) || '0';

    //TO DO: ADD C CODE
    Blockly.propc.definitions_['define_debug_lcd'] = '';
    if (Blockly.propc.setups_['setup_debug_lcd'] == undefined) {
        Blockly.propc.setups_['setup_debug_lcd'] = '';
    }

    return '\n';
};

Blockly.propc.debug_lcd_action = function() {
    var action = this.getTitleValue('ACTION');

    //TO DO: ADD C CODE
    Blockly.propc.definitions_['define_debug_lcd'] = '';
    if (Blockly.propc.setups_['setup_debug_lcd'] == undefined) {
        Blockly.propc.setups_['setup_debug_lcd'] = '';
    }

    return '\n';
};
