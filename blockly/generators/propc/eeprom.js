/*

  This file contains support for writing text/numbers to EEPROM
  
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


//Create GUIs for EEEPROM blocks
Blockly.Language.eeprom_int_to = {
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM int to" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.eeprom_int_from = {
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM int from" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.eeprom_float_to = {
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM float to" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.eeprom_float_from = {
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM float from" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.eeprom_text_to = {
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM text to" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.eeprom_text_from = {
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM text from" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//Create propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generate code for compiler
Blockly.propc.eeprom_int_to = function() {
  var code = '';
  return code;
};

Blockly.propc.eeprom_int_from = function() {
  var code = '';
  return code;
};

Blockly.propc.eeprom_float_to = function() {
  var code = '';
  return code;
};

Blockly.propc.eeprom_float_from = function() {
  var code = '';
  return code;
};

Blockly.propc.eeprom_text_to = function() {
  var code = '';
  return code;
};

Blockly.propc.eeprom_text_from = function() {
  var code = '';
  return code;
};
