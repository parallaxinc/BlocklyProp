/*

  This file contains support for sound impact sensor
  
  Author: Vale Tolpegin ( valetolpegin@gmail.com )

*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};

//Generate GUIs for sound impact sensor
Blockly.Language.sound_impact_run = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "run" );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null );
  }
};

Blockly.Language.sound_impact_get_count = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "get count" );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null );
  }
};

Blockly.Language.sound_impact_end = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "end" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//Set the propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Creating code yo send to compiler
Blockly.propc.sound_impact_run = function() {
  var code = '';
  return code;
};

Blockly.propc.sound_impact_get_count = function() {
  var code = '';
  return code;
};

Blockly.propc.sound_impact_end = function() {
  var code = '';
  return code;
};
