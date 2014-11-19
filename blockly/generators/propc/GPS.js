/*
  This file support GPS modules
  
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

//Create code for blocks
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.PAM_7Q_Init = function() {
  var rx_pin = this.getTitleValue( 'RXPIN' );
  var tx_pin = this.getTtileValue( 'TXPIN' );
  var baud = this.getTitleValue( 'BAUD' );
  
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_open( ' + rx_pin + ', ' + tx_pin + ', ' + baud + ' );';
  return code;
};

Blockly.propc.PAM_7Q_Latitude = function() {
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_latitude();';
  return code;
};

Blockly.propc.PAM_7Q_Longitude = function() {
  Blockly.propc.definitions_[ "include PAM7Q" ] = '#include "gps.h"';
  
  var code = 'gps_longitude();';
  return code;
};
