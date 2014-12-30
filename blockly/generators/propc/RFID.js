/*

  This file contains support for RFID hardware
  
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

//Create GUI blocks for RFID hardware
Blockly.Language.RFID_get = {
  category: 'RFID',
  helpUrl: '',
  init: function() {
    this.setColour( 180 );
    this.appendDummyInput( "" )
      .appendTitle( "Get RFID" );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
    this.setOutput( true, Number );
  }
};

Blockly.Language.RFID_disable = {
  category: 'RFID',
  helpUrl: '',
  init: function() {
    this.setColour( 180 );
    this.appendDummyInput( "" )
      .appendTitle( "Disable RFID" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.RFID_enable = {
  category: 'RFID',
  helpUrl: '',
  init: function() {
    this.setColour( 180 );
    this.appendDummyInput( "" )
      .appendTitle( "Enable RFID" )
      .appendTitle( "In pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN_IN" );
    this.appendDummyInput( "" )
      .appendTitle( "Out pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN_OUT" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.RFID_close = {
  category: 'RFID',
  helpUrl: '',
  init: function() {
    this.setColour( 180 );
    this.appendDummyInput( "" )
      .appendTitle( "Close RFID" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//Create propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generate code that is delivered to compiler
Blockly.propc.RFID_get = function() {

  if ( Blockly.propc.definitions_[ "rfidser" ] === undefined )
  {
      Blockly.propc.definitions_[ "rfidser" ] = '#include "rfidser.h"';
  }

  var code = 'rfid_get(rfid, 1000)';
  return code;
};

Blockly.propc.RFID_disable = function() {

  if ( Blockly.propc.definitions_[ "rfidser" ] === undefined )
  {
      Blockly.propc.definitions_[ "rfidser" ] = '#include "rfidser.h"';
  }
    
  var code = 'rfid_disable();\n';
  return code;
};

Blockly.propc.RFID_enable = function() {
  var pin_in = this.getTitleValue( 'PIN_IN' );
  var pin_out = this.getTitleValue( 'PIN_OUT' );
    
  if ( Blockly.propc.definitions_[ "rfidser" ] === undefined )
  {
      Blockly.propc.definitions_[ "rfidser" ] = '#include "rfidser.h"';
  }
  if ( Blockly.propc.setups_[ "rfidser" + pin_in ] === undefined && Blockly.propc.setups_[ "rfidser" + pin_out ] === undefined )
  {
      Blockly.propc.setups_[ "rfidser" + pin_in ] = "rfidser *rfid = rfid_open( " + pin_out + ", " + pin_in + " );"
  }

  var code = 'rfid_enable();\n';
  return code;
};

Blockly.propc.RFID_close = function() {

  if ( Blockly.propc.definitions_[ "rfidser" ] === undefined )
  {
      Blockly.propc.definitions_[ "rfidser" ] = '#include "rfidser.h"';
  }

  var code = 'rfid_close();\n';
  return code;
}
