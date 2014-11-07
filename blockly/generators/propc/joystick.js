/*

This file supports joystick use in propc

Author: Vale Tolpegin ( vale@tolpegin.net )
*/
'use strict';


if ( !Blockly.Language )
  Blockly.Language = {};


//Joystick block
Blockly.Language.joystick_input_yaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 210 );
    this.appendDummyInput( "" )
      .appendTitle( "Joystick" )
      .appendTitle( "A/D y-axis PIN#" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]] ), "PINY" );
    this.setOutput( true, Number );
  }
};

//Joystick block
Blockly.Language.joystick_input_xaxis = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 210 );
    this.appendDummyInput( "" )
      .appendTitle( "Joystick" )
      .appendTitle( "A/D x-axis PIN#" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]] ), "PINX");
    this.setOutput( true, Number );
  }
};

//Define generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.joystick_input_yaxis = function() {
  var pin_number_yaxis = this.getTitleValue( 'PINY' );
  
  Blockly.propc.definitions_[ "include abvolts" ] = '#include "abvolts.h"';
  if (Blockly.propc.setups_['setup_abvolt'] === undefined) {
      Blockly.propc.setups_['setup_abvolt'] = 'ad_init( 21, 20, 19, 18 );\n';
  }
  
  var code = 'ad_volts( ' + pin_number_yaxis + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};

Blockly.propc.joystick_input_xaxis = function() {
  var pin_number_xaxis = this.getTitleValue( 'PINX' );
  
  Blockly.propc.definitions_[ "include abvolts" ] = '#include "abvolts.h"';
  if (Blockly.propc.setups_['setup_abvolt'] === undefined) {
      Blockly.propc.setups_['setup_abvolt'] = 'ad_init( 21, 20, 19, 18 );\n';
  }
  
  var code = 'ad_volts( ' + pin_number_xaxis + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
