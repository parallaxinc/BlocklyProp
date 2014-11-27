/*
  This file contains support for GPS modules
  
  Author: Vale Tolpegin ( valetolpegin@gmail.com )
*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};

//Create GUI blocks for PAM-7Q GPS module
Blockly.Language.PAM_7Q_Init = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "PAM7Q GPS Module" );
    this.appendDummyInput( "" )
      .appendTitle( "RX pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "RXPIN" );
    this.appendDummyInput( "" )
      .appendTitle( "TX pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "TXPIN" );
    this.appendDummyInput( "" )
      .appendTitle( "Baud" )
      .appendTitle( new Blockly.FieldDropdown( [[ "2400", "2400" ], [ "9600", "9600" ], [ "19200", "19200" ]] ), "BAUD" );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null ); 
  }
};

Blockly.Language.PAM_7Q_Latitude = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "Get latitude" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Language.PAM_7Q_Longitude = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "Get longitude" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Language.PAM_7Q_Heading = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "Get heading" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Language.PAM_7Q_Altitude = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "Get altitude" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Language.PAM_7Q_SatsTracked = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "Get # of satellites tracked" );
    this.setOutput( true, Number );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Language.PAM_7Q_Velocity = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "Get velocity in units" )
      .appendTitle( new Blockly.FieldDropdown( [[ "MPH", "MPH" ], [ "KNOTS", "KNOTS" ]] ), "VELOCITYUNITS" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null );
    this.setOutput( true, Number );
  }
};

//Create code for blocks
Blockly.Spin = Blockly.Generator.get( 'Spin' );

Blockly.Spin.PAM_7Q_Init = function() {
  var rx_pin = this.getTitleValue( 'RXPIN' );
  var tx_pin = this.getTtileValue( 'TXPIN' );
  var baud = this.getTitleValue( 'BAUD' );
  
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  //var code = 'gps_open( ' + rx_pin + ', ' + tx_pin + ', ' + baud + ' );\n\npause( 100 );';
  return ''; //code;
};

Blockly.Spin.PAM_7Q_Latitude = function() {
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  //var code = 'gps_latitude();';
  return ''; //code;
};

Blockly.Spin.PAM_7Q_Longitude = function() {
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  //var code = 'gps_longitude();';
  return ''; //code;
};

Blockly.Spin.PAM_7Q_Heading = function() {
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  //var code = '(int)gps_heading();';
  return ''; //code;
};

Blockly.Spin.PAM_7Q_Altitude = function() {
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  //var code = 'gps_altitude();';
  return ''; //code;
};

Blockly.Spin.PAM_7Q_SatsTracked = function() {
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  //var code = 'gps_satsTracked();';
  return ''; //code;
};

Blockly.Spin.PAM_7Q_Velocity = function() {
  var velocity_units = this.getTitleValue( 'VELOCITYUNITS' );
  
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  //var code = 'gps_velocity( ' + velocity_units + ' );';
  return ''; //code;
};
