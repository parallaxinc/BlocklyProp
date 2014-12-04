/*

  This file contains support for the Parallax 2-axis Joystick
  
  Author: Vale Tolpegin ( valetolpegin@gmail.com )
  
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
Blockly.Spin = Blockly.Generator.get( 'Spin' );

Blockly.Spin.joystick_input_yaxis = function() {
  var pin_number_yaxis = this.getTitleValue( 'PINY' );
  
  Blockly.Spin.definitions_[ "abvolts" ] = 'adc : "PropBOE ADC"';
  
  var code = 'adc.In( ' + pin_number_yaxis + ' )';
  return [ code, Blockly.Spin.ORDER_ATOMIC ];
};

Blockly.Spin.joystick_input_xaxis = function() {
  var pin_number_xaxis = this.getTitleValue( 'PINX' );
  
  Blockly.Spin.definitions_[ "abvolts" ] = 'adc : "PropBOE ADC"';
  
  var code = 'adc.In( ' + pin_number_xaxis + ' )';
  return [ code, Blockly.Spin.ORDER_ATOMIC ];
};
