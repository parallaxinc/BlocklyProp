/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com
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
      .appendTitle( "X-axis pin#" )
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
      .appendTitle( "Y-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINY" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

//Get generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINX' );
  
  Blockly.propc.definitions_[ "include_mx2125" ] = '#include "mx2125.h";';
  
  var code = 'mx_tilt( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};

Blockly.propc.MX2125_acceleration_yaxis = function() {
  var pin = this.getTitleValue( 'PINY' );
  
  Blockly.propc.definitions_[ "include_mx2125" ] = '#include "mx2125.h";';
  
  var code = 'mx_tilt( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};

/*
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
  
//Using the MX2125 Acceleration sensor
//Creating UI
Blockly.Language.MX2125_acceleration_xaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 210 );
    this.appendDummyInput( "" )
      .appendTitle( "MX2125 X-axis PIN#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINX" );
    this.setOutput( true, Number );
  }
};

Blockly.Language.MX2125_acceleration_yaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 210 );
    this.appendDummyInput( "" )
      .appendTitle( "MX2125 Y-axis PIN#" )
      .appendTitle(new Blockly.FieldDropdown( profile.default.digital ), "PINY" );
    this.setOutput( true, Number );
  }
};

//Getting genrator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Adding comiler code
Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINX' );
  
  if ( Blockly.propc.definitions_[ "include_mx2125" ] === undefined )
  {
    Blockly.propc.definitions_[ "include_mx2125" ] = '#include "mx2125.h";';
  }
  
  var code = 'mx_tilt( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};

Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINY' );
  
  if ( Blockly.propc.definitions_[ "include_mx2125" ] === undefined )
  {
    Blockly.propc.definitions_[ "include_mx2125" ] = '#include "mx2125.h";';
  }
  
  var code = 'mx_tilt( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
*/
