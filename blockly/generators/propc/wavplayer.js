/*

  This file contains support for the wavplayer built into C
  
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
  
//Creating GUI blocks
Blockly.Language.wav_play = {
  category: 'WAVPlayer',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "Play" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.wav_status = {
  category: 'WAVPlayer',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "Status" );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
  }
};

Blockly.Language.wav_volume = {
  category: 'WAVPlayer',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "Volume" )
    this.appendValueInput( "VOLUME" )
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.wav_stop = {
  category: 'WAVPlayer',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "Stop" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//Getting propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generating code going to compiler
Blockly.propc.wav_play = function() {
  var code = '';
  return code;
};

Blockly.propc.wav_status = function() {
  var code = '';
  return code;
};

Blockly.propc.wav_volume = function() {
  var volume = this.valueToCode( this, 'VOLUME', Blockly.ORDER_NONE ) || '0';
  
  var code = '';
  return code;
};

Blockly.propc.wav_stop = function() {
  var code = '';
  return code;
}
