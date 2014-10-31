/*
'use strict';


if ( !Blockly.Language )
  Blockly.Language = {};


//Joystick block
Blockly.Language.joystick_input = {
  category: 'Sensors',
  help_url: '',
  init: function() {
    this.setColour( 210 );
    this.appendDummyInput( "" )
      .appendTitle( "Joystick" )
      .appendTitle( "A/D PIN#" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]] ), "PIN" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};


//Define generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.joystick_input = function() {
  return '';
};
*/

'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
 
//PIR sensor blocks 
Blockly.Language.PIR_Sensor = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "PIR Sensor" )
      .appendTitle( "Pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
  }
};

//Get generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.PIR_Sensor = function() {
  return '';
};
