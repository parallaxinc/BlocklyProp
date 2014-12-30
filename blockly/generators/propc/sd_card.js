/*
 
 This file contains support for the wavplayer built into C
 
 Author: Vale Tolpegin ( valetolpegin@gmail.com )
 
 *Copyright 2014 Vale Tolpegin.
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

if ( !Blockly.Language )
    Blockly.Language = {};

//Creating GUI for sd card blocks
Blockly.Language.sd_card_mount = {
    category: 'SD_CARD',
    helpUrl: '',
    init: function() {
        this.appendDummyInput( "" )
            .appendTitle( "Mount SD_CARD" );
        this.appendDummyInput( "" )
            .appendTitle( "DO pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'DO_PIN' );
        this.appendDummyInput( "" )
            .appendTitle( "CLK pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'CLK_PIN' );
        this.appendDummyInput( "" )
            .appendTitle( "DI pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'DI_PIN' );
        this.appendDummyInput( "" )
            .appendTitle( "CS pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'CS_PIN' );
        this.setNextStatement( true, null );
        this.setPreviousStatement( true, null );
    }
};

//Getting the propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generating the code for the compiler
Blockly.propc.sd_card_mount = function() {
    var do_pin  = this.getTitleValue( 'DO_PIN' );
    var clk_pin = this.getTitleValue( 'CLK_PIN' );
    var di_pin  = this.getTitleValue( 'DI_PIN' );
    var cs_pin  = this.getTitleValue( 'CS_PIN' );
    
    if ( Blockly.propc.setups_[ "sd_card" ] === undefined )
    {
        Blockly.propc.setups_[ "sd_card" ] = 'sd_mount( ' + do_pin + ', ' + clk_pin + ', ' + di_pin + ', ' + cs_pin + ' );';
    }
    
    return '';
};