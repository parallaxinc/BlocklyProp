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
  //TO DO: switch value input from dropdown to value input
  //TO DO: Update address input to correct input type ( new block with address type? )
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM int to" )
      .appendTitle( "value" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "VALUE" );
    this.appendDummyInput( "" )
      .appendTitle( "address" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"]] ), "ADDRESS" );
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
      .appendTitle( "EEPROM int from" )
      .appendTitle( "address" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"]] ), "ADDRESS" );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
    this.setOutput( true, Number );
  }
};

Blockly.Language.eeprom_float_to = {
  //TO DO: add correct input method
  //float value input block?
  //TO DO: correct address input?
  //address block?
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM float to" )
      .appendTitle( "value" )
      .appendTitle( new Blockly.FieldDropdown( [["0.1", "0.1"], ["0.2", "0.2"]] ), "VALUE" );
    this.appendDummyInput( "" )
      .appendTitle( "address" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"]] ), "ADDRESS" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.eeprom_float_from = {
  //TO DO: correct address input
  //address block OR add address to profile.default --> profile.default.eeprom_address
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM float from" )
      .appendTitle( "address" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"]] ), "ADDRESS" );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
    this.setOutput( true, Number );
  }
};

Blockly.Language.eeprom_text_to = {
  //TO DO: correct address input
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "EEPROM text to" )
      .appendTitle( "text" )
      .appendTitle( /*ADD VALUE INPUT HERE*/ );
    this.appendDummyInput( "" )
      //TO DO: what does "int n" mean? input/no input?
      .appendTitle( "n" )
      .appendTitle( /*ADD VALUE INPUT HERE*/ );
    this.appendDummyInput( "" )
      .appendTitle( "address" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"]] ), "ADDRESS" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.eeprom_text_from = {
  //TO DO: correct address input
  category: 'EEPROM',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
      this.appendDummyInput( "" )
      .appendTitle( "EEPROM text from" )
      .appendTitle( "text" )
      .appendTitle( /*ADD VALUE OUTPUT HERE*/ );
      this.appendDummyInput( "" )
      //TO DO: what does "int n" mean? input/no input?
      .appendTitle( "n" )
      .appendTitle( /*ADD VALUE OUTPUT HERE*/ );
      this.appendDummyInput( "" )
      .appendTitle( "address" )
      .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"]] ), "ADDRESS" );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
    this.setOutput( true, Number );
  }
};

//Create propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generate code for compiler
Blockly.propc.eeprom_int_to = function() {
  var value = this.getTitleValue( 'VALUE' );
  //var value = Blockly.propc.valueToCode( this, 'VALUE', Blockly.propc.ORDER_NONE ) || '0';
  var address = this.getTitleValue( 'ADDRESS' );

  var code = 'ee_putInt( ' + value + ', ' + address + ' );\n';
  return code;
};

Blockly.propc.eeprom_int_from = function() {
  var address = this.getTitleValue( 'ADDRESS' );
    
  var code = 'ee_getInt( ' + address + ' )';
  return code;
};

Blockly.propc.eeprom_float_to = function() {
  var value = this.getTitleValue( 'VALUE' );
  //var value = Blockly.propc.valueToCode( this, 'VALUE', Blockly.ORDER_NONE ) || '0';
  var address = this.getTitleValue( 'ADDRESS' );
    
  var code = 'ee_putFloat32( ' + value + ', ' + address + ' )';
  return code;
};

Blockly.propc.eeprom_float_from = function() {
  var address = this.getTitleValue( 'ADDRESS' );
    
  var code = 'ee_getFloat32( ' + address + ' )';
  return code;
};

Blockly.propc.eeprom_text_to = function() {
  var value = this.getTitleValue( 'VALUE' );
  //var value = Blockly.propc.valueToCode( this, 'VALUE', Blockly.ORDER_NONE ) || '0';
  var address = this.getTitleValue( 'ADDRESS' );
    
  var code = 'ee_putStr( ' + value + ', ' + address + ' )';
  return code;
};

Blockly.propc.eeprom_text_from = function() {
  var address = this.getTitleValue( 'ADDRESS' );
    
  var code = 'ee_getStr( ' + address + ' )';
  return code;
};
