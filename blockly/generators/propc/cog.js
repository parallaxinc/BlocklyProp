/*

This file contains support for multi cog use in Propeller C

*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
  
  
Blockly.Language.cog_new = {
  category: 'Control',
  helpUrul: '',
  init: function () {
    this.setColour( 120 );
    this.appendDummyInput()
      .appendTitle( "cognew" );
    this.appendValueInput( 'STACK_SIZE', Number )
      .appendTitle( "Stacksize" )
      .setCheck( Number );
    this.appendStatementInput( "METHOD" )
      .appendTitleValue( "Method" );
    this.setPreviousStatement( true );
    this.setNextStatement( true );
  }
};

//get generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.cog_new = function() {
  var method = Blockly.propc.statementToCode( this, 'METHOD' );
  method = method.replace( "  ", "" ).replace( "\n", "" );
  var stackSize = this.valueToCode( this, 'STACK_SIZE', Blockly.propc.ORDER_ATOMIC ) || '10';
  
  var code = 'cognew( ' + method + ', ' + stacksize + ' );';
  return code;
}
