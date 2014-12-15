/*
  This file contains support for all Parallax compatible PIR Sensors
  
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
    this.setOutput( true, Number );
  }
};

//Get generators
Blockly.Spin = Blockly.Generator.get( 'Spin' );

Blockly.Spin.PIR_Sensor = function() {
  var pin = this.getTitleValue( 'PIN' );
  
  var code = 'ina[ ' + pin + ' ]';
  return [ code, Blockly.Spin.ORDER_ATOMIC ];
};
