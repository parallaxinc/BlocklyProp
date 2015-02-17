/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo
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
 * @fileoverview Generating Spin for sensor blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 * @author valetolpegin@gmail.com ( Vale Tolpegin )
 */
'use strict';


//define blocks
if (!Blockly.Language)
    Blockly.Language = {};


Blockly.Language.compass3d_init = {
    category: 'Sensors',
    helpUrl: '',
    init: function() {
        this.setColour( 314 );
        this.appendDummyInput( "" )
            .appendTitle( "Initialize the compass3d sensor" );
        this.appendDummyInput( "" )
            .appendTitle( "sclPin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'SCL_PIN' );
        this.appendDummyInput( "" )
            .appendTitle( "sdaPin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'SDA_PIN' );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.compass3d_read = {
    category: 'Sensors',
    helpUrl: '',
    init: function() {
        this.setColour( 314 );
        this.appendDummyInput( "" )
            .appendTitle( "Read in the values from the compass sensor" );
        this.appendValueInput( 'X_STORAGE' )
            .appendTitle( "x value storage" );
        this.appendValueInput( 'Y_STORAGE' )
            .appendTitle( "y value storage" );
        this.appendValueInput( 'Z_STORAGE' )
            .appendTitle( "z value storage" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.sensor_ping = {
    category: 'Sensors',
    helpUrl: '',
    init: function() {
        this.setColour(314);
        this.appendDummyInput("")
                .appendTitle("Ping)))")
                .appendTitle(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"], ["ticks", "TICKS"]]), "UNIT")
                .appendTitle("PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, Number);
    }
};

Blockly.Language.colorpal_open = {
category: 'Sensors',
helpUrl: '',
init: function() {
    this.setColour( 314 );
    this.appendDummyInput( "" )
        .appendTitle( "open ColorPAL sensor" )
        .appendTitle( "pin" )
        .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
}
};

Blockly.Language.colorpal_get_rgb = {
    category: 'Sensors',
    helpUrl: '',
    init: function() {
        this.setColour( 314 );
        this.appendDummyInput( "" )
            .appendTitle( "get rgb" );
        this.appendValueInput( 'R_STORAGE' )
            .appendTitle( "red storage variable" );
        this.appendValueInput( 'G_STORAGE' )
            .appendTitle( "green storage variable" );
        this.appendValueInput( 'B_STORAGE' )
            .appendTitle( "blue storage variable" );
        this.setPreviousStatement( false, null );
        this.setNextStatement( false, null );
        this.setOutput( true, Number );
    }
};

Blockly.Language.colorpal_close = {
    category: 'Sensors',
    helpUrl: '',
    init: function() {
        this.setColour( 314 );
        this.appendDummyInput( "" )
            .appendTitle( "close" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.sensor_ping = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var unit = this.getTitleValue('UNIT');
    var methodForUnit = Blockly.propc.sensor_ping.UNITS[unit];

    Blockly.propc.definitions_["include ping"] = '#include "ping.h"';

    var code = 'ping' + methodForUnit + '(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.sensor_ping.UNITS = {
    INCHES: '_inches',
    CM: '_cm',
    TICKS: ''
};

Blockly.propc.compass3d_init = function() {
    var sclPin = this.getTitleValue( 'SCL_PIN' );
    var sdaPin = this.getTitleValue( 'SDA_PIN' );
    
    if ( Blockly.propc.setups_[ "i2c_compass3d" ] === undefined )
    {
        Blockly.propc.setups_[ "i2c_compass3d" ] = 'i2c compass3d = i2c_init( ' + sclPin + ', ' + sdaPin + ' );\n';
    }
    
    Blockly.propc.definitions_[ "compass3d" ] = '#include "'
    
    var code = 'compass_init( i2c_compass3d );\n';
    return code;
};

Blockly.propc.compass3d_read = function() {
    var x_storage = Blockly.propc.valueToCode( this, 'X_STORAGE' );
    var y_storage = Blockly.propc.valueToCode( this, 'Y_STORAGE' );
    var z_storage = Blockly.propc.valueToCode( this, 'Z_STORAGE' );
    
    var code = 'compass_read( compass3d, &' + x_storage + ', &' + y_storage + ', &' + z_storage + ' );\n';
    return code;
};

Blockly.propc.colorpal_open = function() {
    var pin = this.getTitleValue( 'PIN' );
    
    if ( Blockly.propc.definitions_[ "colorpal" ] === undefined )
    {
        Blockly.propc.definitions_[ "colorpal" ] = '#include "colorpal.h"';
    }
    if ( Blockly.propc.setups_[ "colorpal" ] === undefined )
    {
        Blockly.propc.setups_[ "colorpal" ] = "colorPal *cpal = colorPal_open( " + pin + " )";
    }
    
    return '';
};

Blockly.propc.colorpal_get_rgb = function() {
    var r_storage = Blockly.propc.valueToCode( this, 'R_STORAGE' );
    var g_storage = Blockly.propc.valueToCode( this, 'G_STORAGE' );
    var b_storage = Blockly.propc.valueToCode( this, 'B_STORAGE' );
    
    if ( Blockly.propc.definitions_[ "colorpal" ] === undefined )
    {
        Blockly.propc.definitions_[ "colorpal" ] = '#include "colorpal.h"';
    }
    if ( Blockly.propc.setups_[ "colorpal" ] === undefined )
    {
        return '';
    }
    
    var code = 'colorPal_getRGB( cpal, ' + ', &' + r_storage + ', &' + g_storage + ', &' + b_storage + ' )';
    return code;
};

Blockly.propc.colorpal_close = function() {
    if ( Blockly.propc.definitions_[ "colorpal" ] === undefined )
    {
        Blockly.propc.definitions_[ "colorpal" ] = '#include "colorpal.h"';
    }
    if ( Blockly.propc.setups_[ "colorpal" ] === undefined )
    {
        return '';
    }
    
    var code = 'colorPal_close( cpal )';
    return code;
};
