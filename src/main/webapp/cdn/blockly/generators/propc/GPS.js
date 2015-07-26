/*
  This file support GPS modules
  
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

if ( !Blockly.Blocks )
  Blockly.Blocks = {};

//Create GUI blocks for PAM-7Q GPS module
Blockly.Blocks.PAM_7Q_Init = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "PAM7Q GPS Module" );
    this.appendDummyInput( "" )
      .appendField( "RX pin#" )
      .appendField( new Blockly.FieldDropdown( profile.default.digital ), "RXPIN" );
    this.appendDummyInput( "" )
      .appendField( "TX pin#" )
      .appendField( new Blockly.FieldDropdown( profile.default.digital ), "TXPIN" );
    this.appendDummyInput( "" )
      .appendField( "Baud" )
      .appendField( new Blockly.FieldDropdown( [[ "2400", "2400" ], [ "9600", "9600" ], [ "19200", "19200" ]] ), "BAUD" );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null ); 
  }
};

Blockly.Blocks.PAM_7Q_Latitude = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "Get latitude" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Blocks.PAM_7Q_Longitude = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "Get longitude" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Blocks.PAM_7Q_Heading = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "Get heading" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Blocks.PAM_7Q_Altitude = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "Get altitude" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Blocks.PAM_7Q_SatsTracked = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "Get # of satellites tracked" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Blocks.PAM_7Q_Velocity = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "Get velocity in units" )
      .appendField( new Blockly.FieldDropdown( [[ "MPH", "MPH" ], [ "KNOTS", "KNOTS" ]] ), "VELOCITYUNITS" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null );
    this.setOutput( true, Number );
  }
};

//Create code for blocks
//Blockly.propc = new Blockly.Generator( 'propc' );

Blockly.propc.PAM_7Q_Init = function() {
  var rx_pin = this.getFieldValue( 'RXPIN' );
  var tx_pin = this.getFieldValue( 'TXPIN' );
  var baud = this.getFieldValue( 'BAUD' );
  
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_open( ' + rx_pin + ', ' + tx_pin + ', ' + baud + ' );\n\npause( 100 )';
  return code;
};

Blockly.propc.PAM_7Q_Latitude = function() {
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_latitude()';
  return code;
};

Blockly.propc.PAM_7Q_Longitude = function() {
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_longitude()';
  return code;
};

Blockly.propc.PAM_7Q_Heading = function() {
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = '(int)gps_heading()';
  return code;
};

Blockly.propc.PAM_7Q_Altitude = function() {
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_altitude()';
  return code;
};

Blockly.propc.PAM_7Q_SatsTracked = function() {
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_satsTracked()';
  return code;
};

Blockly.propc.PAM_7Q_Velocity = function() {
  var velocity_units = this.getFieldValue( 'VELOCITYUNITS' );
  
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_velocity( ' + velocity_units + ' )';
  return code;
};
