/*
  This file contains support for pressure/liquid level sensors
  
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
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]] ), "PIN" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

//Get generator
Blockly.Spin = Blockly.Generator.get( 'Spin' );

//Create code for blocks
Blockly.Spin.etape_rc_time = function() {
  var pin = this.getTitleValue( 'PIN' );
  var inputStorage = Blockly.Spin.variableDB_.getName( this.getTitleValue( 'VAR' ), Blockly.Variables.NAME_TYPE );
  
  Blockly.Spin.definitions_[ "include_rctime" ] = 'rc : "RC Time"';
  Blockly.Spin.setups_[ "rctime" ] = 'rc.ChargeTime(clkfreq/1000)\nrc.TimeOut(clkfreq/50)\n'
  
  var code = 'rc.Time( ' + pin + ', 1, @' + inputStorage + ' )';
  return [ code, Blockly.Spin.ORDER_ATOMIC ];
};

Blockly.Spin.etape_voltage_input = function() {
  var pin = this.getTitleValue( 'PIN' );
  
  Blockly.Spin.definitions_[ "abvolts" ] = 'adc : "PropBOE ADC"';
  
  var code = 'adc.In( ' + pin + ' )';
  return [ code, Blockly.Spin.ORDER_ATOMIC ];
};
