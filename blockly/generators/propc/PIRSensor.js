'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
 
//PIR sensor blocks 
Blockly.Language.PIR_Sensor = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 314 );
    this.appendDummyInput( "" )
      .appendTitle( "PIR Sensor" )
      .appendTitle( "Pin" )
      .appendDropdownField( Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
  }
};

//Get generators
Blockly.propc = Blockly.Generators.get( "propc" );

Blockly.propc.PIR_Sensor = {
  return '';
}
