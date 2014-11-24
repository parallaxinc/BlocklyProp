/*
  This file contains support for tilt and acceleration sensors
  
  Author: Vale Tolpegin ( valetolpegin@gmail.com )
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
Blockly.Spin = Blockly.Generator.get( 'Spin' );

Blockly.Spin.MX2125_acceleration_xaxis = function() {
  var pin = this.getTitleValue( 'PINX' );
  
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include_mx2125" ] = '#include "mx2125.h"';
  
  //var code = 'mx_tilt( ' + pin + ' )';
  return ''; //[ code, Blockly.propc.ORDER_ATOMIC ];
};

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
  
  //ADD SPIN CODE HERE
  //Blockly.Spin.definitions_[ "include_mma7455" ] = '#include "mma7455.h"';
  //Blockly.Spin.setups_[ "mma_7455" ] = 'MMA7455_init( ' + pinx + ', ' + piny + ', ' + pinz + ' );\n';
  
  //var code = 'MMA7455_getxyz10( &' + xstorage + ', &' + ystorage + ', &' + zstorage + ' );\n';
  return ''; //code;
};
