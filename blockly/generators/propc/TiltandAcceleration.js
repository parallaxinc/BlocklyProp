/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com
*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
  
//Using the MX2125 Acceleration sensor
//Creating UI
Blockly.Language.MX2125_acceleration_xaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.appendDummyInput( "" )
      .appendTitle( "X-axis PIN#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINX" );
    this.setOutput( true, Number );
  }
};

Blockly.Language.MX2125_acceleration_yaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.appendDummyInput( "" )
      .appendTitle( "Y-axis PIN#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINY" );
    this.setOutput( true, Number );
  }
};

//Getting genrator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Adding comiler code
Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINX' );
  
  if ( Blockly.propc.definitions_[ "include mx2125" ] === undefined )
  {
    Blockly.propc.definitions_[ "include mx2125" ] = '#include "mx2125.h";';
  }
  
  var code = 'mx_tilt( ' + pin + ' );\n';
  return [ code, Blockly.ORDER_ATOMIC ];
};

Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINY' );
  
  if ( Blockly.propc.definitions_[ "include mx2125" ] === undefined )
  {
    Blockly.propc.definitions_[ "include mx2125" ] = '#include "mx2125.h";';
  }
  
  var code = 'mx_tilt( ' + pin + ' );\n';
  return [ code, Blockly.ORDER_ATOMIC ];
};
