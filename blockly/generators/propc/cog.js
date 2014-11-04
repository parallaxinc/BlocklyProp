/*

This file will contain support for multi cog use in Propeller C

*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
  
  
Blockly.Language.cog_new = {
  //Add cog block here
}

//get generators
Blockly.propc = Blockly.generators.get( 'propc' );

Blockly.propc.cog_new = function() {
  //Add cog compilation here
}
