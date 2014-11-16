/*
  This file adds support for distance sensors
  
  Author: Vale Tolpegin ( valetolpegin@gmail.com )
*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};

//Create GUI blocks for SF02 Laser Rangefinder
Blockly.Language.SF02_Laser_Rangefinder = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "Pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null );
    this.setOutput( true );
  }
};

//Get generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Create code for blocks
Blockly.propc.SF02_Laser_Rangefinder = function() {
  var pin = this.getTitleValue( 'PIN' );
  
  Blockly.propc.definitions_[ "include abvolt" ] = '#include "abvolts.h"';
  Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
  
  var code = '';
};
