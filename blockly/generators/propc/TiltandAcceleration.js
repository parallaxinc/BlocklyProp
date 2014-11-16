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

//MMA7455 sensor blocks 
Blockly.Language.MMA7455_acceleration = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 X-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINX" )
      //.appendTitle( "Put input value in" )
      //.appendTitle( new Blockly.FieldVariable( Blockly.LANG_VARIABLES_GET_ITEM ), 'VARX' );
    this.appendValueInput( 'VARX' )
        .appendTitle( "Storage for X-axis" );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 Y-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINY" )
      .appendTitle( "Put input value in" )
      .appendTitle( new Blockly.FieldVariable( Blockly.LANG_VARIABLES_GET_ITEM ), 'VARY' );
    this.appendDummyInput( "" )
      .appendTitle( "MMA7455 Z-axis pin#" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PINZ" )
      .appendTitle( "Put input value in" )
      .appendTitle( new Blockly.FieldVariable( Blockly.LANG_VARIABLES_GET_ITEM ), 'VARZ' );
    this.setInputsInline( true );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null ); 
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
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
  
  var xstorage = Blockly.propc.valueToCode( this, 'VARX', Blockly.propc.ORDER_ATOMIC );
  //var xstorage = Blockly.propc.variableDB_.getName( this.getTitleValue( 'VARX' ), Blockly.Variables.NAME_TYPE );
  var ystorage = Blockly.propc.variableDB_.getName( this.getTitleValue( 'VARY' ), Blockly.Variables.NAME_TYPE );
  var zstorage = Blockly.propc.variableDB_.getName( this.getTitleValue( 'VARZ' ), Blockly.Variables.NAME_TYPE );
  
  Blockly.propc.definitions_[ "include_mma7455" ] = '#include "mma7455.h"';
  Blockly.propc.setups_[ "mma_7455" ] = 'MMA7455_init( ' + pinx + ', ' + piny + ', ' + pinz + ' );\n';
  
  //Add variable declaration here
  var code = 'MMA7455_getxyz10( &' + xstorage + ', &' + ystorage + ', &' + zstorage + ' );\n';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
