/* 

  This file contains support for the sirc library
  
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

//Create GUI for sirc library/tv remote
Blockly.Language.sirc_library = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "get button pressed on remote" )
      .appendTitle( "pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
    this.setOutput( true, Number );
  }
};

//Create generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generate code for compiler
Blockly.propc.sirc_library = function() {
  var pin = this.getTitleValue( 'PIN' );
    
  if ( Blockly.propc.definitions_[ "sirc" ] === undefined )
  {
      Blockly.propc.definitions_[ "sirc" ] = '#include "sirc.h"';
  }
  if ( Blockly.propc.setups_[ "sirc" ] === undefined )
  {
      Blockly.propc.setups_[ "sirc" ] = "sirc_setTimeout( 50 )";
  }

  var code = 'sirc_button( ' + pin + ' )';
  return code;
};
