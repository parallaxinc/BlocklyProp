/*

This file will contain support for multi cog use in Propeller C

*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
  
  
Blockly.Language.cog_new = {
  category: 'Control',
  helpUrul: '',
  init: function () {
    this.setColour( 120 );
    this.appendDummyInput("")
      .appendTitle( "cognew" );
    this.appendValueInput( 'STACK_SIZE', Number )
      .appendTitle( "Stacksize: " )
      .setCheck( Number );
  }
};

//get generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.cog_new = function() {
  //Add cog compilation here
}
