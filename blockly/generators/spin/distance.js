/*
  This file contains support for distance sensors
  
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
      .appendTitle( "SF02 Laser Rangefinder Pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setOutput( true, Number );
  }
};

//Get generator
Blockly.Spin = Blockly.Generator.get( 'Spin' );

//Create code for blocks
Blockly.Spin.SF02_Laser_Rangefinder = function() {
  var pin = this.getTitleValue( 'PIN' );
  
  //ADD SPIN CODE
  //Blockly.Spin.definitions_[ "include abvolt" ] = '#include "abvolts.h"';
  //Blockly.Spin.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
  
  //var code = 'ad_volts( ' + pin + ' )';
  return ''; //[ code, Blockly.Spin.ORDER_ATOMIC ];
};
