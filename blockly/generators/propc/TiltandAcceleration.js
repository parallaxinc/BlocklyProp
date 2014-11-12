/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com
*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
 
//MX2125 sensor blocks 
Blockly.Language.MX2125_acceleration = {
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

//MMA7455 sensor blocks 
Blockly.Language.MMA7455_acceleration = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 X-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINX" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

Blockly.Language.MMA7455_acceleration_yaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 Y-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINY" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

Blockly.Language.MMA7455_acceleration_zaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 Z-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINZ" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
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

Blockly.propc.MX2125_acceleration_yaxis = function() {
  var pin = this.getTitleValue( 'PINY' );
  
  Blockly.propc.definitions_[ "include_mma7455" ] = '#include "mma7455.h"';
  Blockly.propc.setups_[ "mma_7455_" ]
  
  var code = 'mx_tilt( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
