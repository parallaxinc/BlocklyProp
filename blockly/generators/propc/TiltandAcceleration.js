/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com

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
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINX' );
  
  Blockly.propc.definitions_[ "include_mx2125" ] = '#include "mx2125.h"';
  
  var code = 'mx_tilt( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};

Blockly.propc.MX2125_acceleration_yaxis = function() {
  var pin = this.getTitleValue( 'PINY' );
  
  Blockly.propc.definitions_[ "include_mx2125" ] = '#include "mx2125.h"';
  
  var code = 'mx_tilt( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};

Blockly.propc.MMA7455_acceleration = function() {
  var pinx = this.getTitleValue( 'PINX' );
  var piny = this.getTitleValue( 'PINY' );
  var pinz = this.getTitleValue( 'PINZ' );
  
  var xstorage = Blockly.propc.valueToCode( this, 'VARX' );
  var ystorage = Blockly.propc.valueToCode( this, 'VARY' );
  var zstorage = Blockly.propc.valueToCode( this, 'VARZ' );
  
  Blockly.propc.definitions_[ "include_mma7455" ] = '#include "mma7455.h"';
  Blockly.propc.setups_[ "mma_7455" ] = 'MMA7455_init( ' + pinx + ', ' + piny + ', ' + pinz + ' );\n';
  
  //Add variable declaration here
  var code = 'MMA7455_getxyz10( &' + xstorage + ', &' + ystorage + ', &' + zstorage + ' );\n';
  return code;
};
