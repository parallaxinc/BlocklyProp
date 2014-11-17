/*
  This file contains support for pressure sensors
  
  Author: Vale Tolpegin ( valetolpegin@gmail.com )
*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};

//Creating GUI blocks for eTape liquid sensor
Blockly.Language.etape_rc_time = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "ETape sensor rc_time input" )
      .appendTitle( "Pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.appendDummyInput( "" )
      .appendTitle( "Put input value in" )
      .appendTitle( new Blockly.FieldVariable( Blockly.LANG_VARIABLES_GET_ITEM ), 'VAR' );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null );
    this.setInputsInline( true );
  },
  getVars: function() {
    return [ this.getTitleValue( 'VAR' ) ];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.etape_voltage_input = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "ETape sensor voltage input" )
      .appendTitle( "Pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null );
    this.setOutput( true );
  }
};

//Get generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Create code for blocks
Blockly.propc.etape_rc_time = function() {
  var pin = this.getTitleValue( 'PIN' );
  var inputStorage = Blockly.propc.variableDB_.getName( this.getTitleValue( 'VAR' ), Blockly.Variables.NAME_TYPE );
  
  var code = 'high( ' + pin + ' );\npause( 1 );\n' + inputStorage + ' = ' + 'rc_time( ' + pin + ', 1 );\n';
  return [ code, Blockly.ORDER_ATOMIC ];
};

Blockly.propc.etape_voltage_input = function() {
  var pin = this.getTitleValue( 'PIN' );
  
  Blockly.propc.setups_[ "include abvolt" ] = 'ad_init( 21, 20, 19, 18 );\n';
  
  var code = 'ad_volts( ' + pin + ' );\n';
  return [ code, Blockly.ORDER_ATOMIC ];
};
