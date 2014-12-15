<<<<<<< HEAD
'use strict';


=======
/*

This file supports joystick use in propc

Author: Vale Tolpegin ( vale@tolpegin.net )

 *Copyright 2014 Vale Tolpegin.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 
*/
'use strict';
>>>>>>> origin/master


if ( !Blockly.Language )
  Blockly.Language = {};


<<<<<<< HEAD


//Joystick block
Blockly.Language.joystick_input = {
  category: 'Sensors',
  help_url: '',
=======
//Joystick block
Blockly.Language.joystick_input_yaxis = {
  category: 'Sensors',
  helpUrl: '',
>>>>>>> origin/master
  init: function() {
    this.setColour( 210 );
    this.appendDummyInput( "" )
      .appendTitle( "Joystick" )
<<<<<<< HEAD
      .appendTitle( "A/D PIN#" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]] ), "PIN" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};



=======
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
>>>>>>> origin/master

//Define generators
Blockly.propc = Blockly.Generator.get( 'propc' );

<<<<<<< HEAD

Blockly.propc.joystick_input = function() {
  return '';
};
=======
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
>>>>>>> origin/master
