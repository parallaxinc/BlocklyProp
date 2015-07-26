/*

This file contains support for all Parallax compatible PIR sensors

Author: valetolpegin@gmail.com ( Vale Tolpegin )

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

if ( !Blockly.Blocks )
  Blockly.Blocks = {};
 
//PIR sensor blocks 
Blockly.Blocks.PIR_Sensor = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "PIR Sensor" )
      .appendField( "Pin" )
      .appendField( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

//Get generators
//Blockly.propc = new Blockly.Generator( 'propc' );

Blockly.propc.PIR_Sensor = function() {
  var pin = this.getFieldValue( 'PIN' );
  
  var code = 'input( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
