/*
  This file adds support for distance sensors
  
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
Blockly.propc = Blockly.Generator.get( 'propc' );

//Create code for blocks
Blockly.propc.SF02_Laser_Rangefinder = function() {
  var pin = this.getTitleValue( 'PIN' );
  
  Blockly.propc.definitions_[ "include abvolt" ] = '#include "abvolts.h"';
  Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
  
  var code = 'ad_volts( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
