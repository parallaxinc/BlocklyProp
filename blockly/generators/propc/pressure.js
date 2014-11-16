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
      .appendTitle( "Pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.appendDummyInput( "" )
      .appendTitle( "Put input value in" )
      .appendTitle( new Blockly.FieldVariable( Blockly.LANG_VARIABLES_GET_ITEM ), 'VAR' );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null );
    this.setInputsInline( true );
  }
};

//Get generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Create code for blocks
Blockly.propc.etape_rc_time = function() {
  var pin = this.getTitleValue( 'PIN' );
  var inputStorage = Blockly.propc.variableDB_.getName( this.getTitleValue( 'VAR' ), Blockly.Variables.NAME_TYPE );
  
  var code = 'high( ' + pin + ' );\npause( 1 );\n' + inputStorage + ' = ' + 'rc_time( ' + pin + ', 1 );';
  return [ code, Blockly.ORDER_ATOMIC ];
};
