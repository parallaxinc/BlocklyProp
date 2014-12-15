/*
  This file contains support for tilt and acceleration sensors
  
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
 
//MX2125 sensor blocks
//CURRENTLY NOT SPIN SUPPORTED
Blockly.Language.MX2125_acceleration_xaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "MX2125 X-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINX" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

//CURRENTLY NOT SPIN SUPPORTED
Blockly.Language.MX2125_acceleration_yaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "MX2125 Y-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINY" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

//MMA7455 sensor block
Blockly.Language.MMA7455_acceleration = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 X-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINX" )
    this.appendValueInput( 'VARX' )
        .appendTitle( "Storage for X-axis" );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 Y-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINY" )
    this.appendValueInput( 'VARY' )
        .appendTitle( "Storage for Y-axis" );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 Z-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINZ" )
    this.appendValueInput( 'VARZ' )
        .appendTitle( "Storage for Z-axis" );
    this.setInputsInline( true );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null ); 
  }
};

//Get generators
Blockly.Spin = Blockly.Generator.get( 'Spin' );

//CURRENTLY NOT SPIN SUPPORTED
Blockly.Spin.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINX' );
  
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include_mx2125" ] = '#include "mx2125.h"';
  
  //var code = 'mx_tilt( ' + pin + ' )';
  return ''; //[ code, Blockly.propc.ORDER_ATOMIC ];
};

//CURRENTLY NOT SPIN SUPPORTED
Blockly.Spin.MX2125_acceleration_yaxis = function() {
  var pin = this.getTitleValue( 'PINY' );
  
  //ADD SPIN CODE HERE
  //Blockly.Spin.definitions_[ "include_mx2125" ] = '#include "mx2125.h"';
  
  //var code = 'mx_tilt( ' + pin + ' )';
  return ''; //[ code, Blockly.propc.ORDER_ATOMIC ];
};

Blockly.Spin.MMA7455_acceleration = function() {
  var pinx = this.getTitleValue( 'PINX' );
  var piny = this.getTitleValue( 'PINY' );
  var pinz = this.getTitleValue( 'PINZ' );
  
  var xstorage = Blockly.Spin.valueToCode( this, 'VARX' );
  var ystorage = Blockly.Spin.valueToCode( this, 'VARY' );
  var zstorage = Blockly.Spin.valueToCode( this, 'VARZ' );

  Blockly.Spin.definitions_[ "SPI_MMA7455L_SPI_v2" ] = 'SPI        : "MMA7455L_SPI_v2"';
  Blockly.Spin.setups_[ "SPI" ] = 'SPI.Start( ' + pinx + ', ' + piny + ', ' + pinz + ' );\n';
  
  var code = 'SPI.write(SPI#MCTL, (%0110 << 4)|(SPI#G_RANGE_8g << 2)|SPI#G_MODE)\n' + xstorage + ' := SPI.read(SPI#XOUT8)\n' + ystorage + ' := SPI.read(SPI#YOUT8\n' + zstorage + ' := SPI.read(SPI#ZOUT8)\n';
  return code;
};
