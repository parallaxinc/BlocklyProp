/*

This file contains support for the Tilt and Acceleration sensors

Author: valetolpegin@gmail.com
*/

if ( !Blockly.Language )
  Blockly.Language = {};
  
//Using the MX2125 Acceleration sensor
Blockly.Language.MX2125_acceleration_xaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.appendDummyInput( "" )
      .appendTitle( "X-axis PIN#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.Digital ), "PINX" );
    this.setOutput( true, Number );
    this.setInputsInline( true );
  }
};

Blockly.Language.MX2125_acceleration_yaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.appendDummyInput( "" )
      .appendTitle( "Y-axis PIN#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.Digital ), "PINY" );
    this.setOutput( true, Number );
    this.setInputsInline( true );
  }
};

Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINX' );
  
  if ( Blockly.propc.definitions_[ "include mx2125" ] === undefined )
  {
    Blockly.propc.definitions_[ "include mx2125" ] = '#include "mx2125.h";';
  }
  
  return 'mx_tilt( ' + pin + ' );\n';
};

Blockly.propc.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINY' );
  
  if ( Blockly.propc.definitions_[ "include mx2125" ] === undefined )
  {
    Blockly.propc.definitions_[ "include mx2125" ] = '#include "mx2125.h";';
  }
  
  return 'mx_tilt( ' + pin + ' );\n';
};
