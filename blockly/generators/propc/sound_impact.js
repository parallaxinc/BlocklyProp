/*

  This file contains support for sound impact sensor
  
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

//Generate GUIs for sound impact sensor
Blockly.Language.sound_impact_run = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "sound impact run" )
      .appendTitle( "In cog" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"] ), "COG" );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null );
  }
};

Blockly.Language.sound_impact_get_count = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "sound impact get count" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null );
    this.setOutput( true, Number );
  }
};

Blockly.Language.sound_impact_end = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "sound impact end" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//Set the propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Creating code yo send to compiler
Blockly.propc.sound_impact_run = function() {
  var cog = this.getTitleValue( 'COG' );
                                                
  if ( Blockly.propc.definitions_[ "sound_impact" ] === undefined )
  {
      Blockly.propc.definitions_[ "sound_impact" ] = '#include "soundimpact.h"';
  }
  
  Blockly.propc.setups_[ "sound_impact" ] = 'int *soundimpactcog = soundImpact_run( ' + cog + ' )';
                                                
  return '';
};

Blockly.propc.sound_impact_get_count = function() {
  if ( Blockly.propc.definitions_[ "sound_impact" ] === undefined )
  {
      Blockly.propc.definitions_[ "sound_impact" ] = '#include "soundimpact.h"';
  }
  if ( Blockly.propc.setups_[ "sound_impact" ] === undefined )
  {
      return '';
  }

  var code = 'soundImpact_getCount()';
  return code;
};

Blockly.propc.sound_impact_end = function() {
  if ( Blockly.propc.definitions_[ "sound_impact" ] === undefined )
  {
      Blockly.propc.definitions_[ "sound_impact" ] = '#include "soundimpact.h"';
  }
  if ( Blockly.propc.setups_[ "sound_impact" ] === undefined )
  {
      return '';
  }

  var code = 'soundImpact_end( soundimpactcog )';
  return code;
};
