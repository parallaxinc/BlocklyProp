/*

  This file contains support for reading and writing using the I2C interface
  
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

//Generating GUIs for IrC blocks
Blockly.Language.i2c_new_bus = {
  //TO DO: correct SCL_DRIVE input
  category: 'I2C',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "I2C new bus" )
      .appendTitle( "sclPin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "SCL_PIN" );
    this.appendDummyInput( "" )
      .appendTitle( "sdaPin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "SDA_PIN" );
    this.appendDummyInput( "" )
      .appendTitle( "sclDrive" )
      .appendDummyInput( new Blockly.FieldDropdown( profile.default.digital ), "SCL_DRIVE" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.i2c_in = {
  //TO DO: correct inputs
  category: 'I2C',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "I2C in" )
      .appendTitle( "busID" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "BUSID" );
    this.appendDummyInput( "" )
      .appendTitle( "I2c address" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "I2CADDR" );
    this.appendDummyInput( "" )
      .appendTitle( "memory address" )
      .appenDTitle( new Blockly.FieldDropdown( profile.default.digital ), "MEMORYADDRESS" );
    this.appendDummyInput( "" )
      .appendTitle( "memory address count" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "MEMORYADDRESSCOUNT" );
    this.appendDummyInput( "" )
      .appendTitle( "data" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "DATA" );
    this.appendDummyInput( "" )
      .appendTitle( "data count" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "DATACOUNT" );
    this.setPreviousStatement( false, null );
    this.setNextStatement( false, null );
    this.setOutput( true, Number );
  }
};

Blockly.Language.i2c_out = {
  //TO DO: correct inputs
  category: 'I2C',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "I2C out" )
      .appendTitle( "busID" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "BUSID" );
    this.appendDummyInput( "" )
      .appendTitle( "I2c address" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "I2CADDR" );
    this.appendDummyInput( "" )
      .appendTitle( "memory address" )
      .appenDTitle( new Blockly.FieldDropdown( profile.default.digital ), "MEMORYADDRESS" );
    this.appendDummyInput( "" )
      .appendTitle( "memory address count" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "MEMORYADDRESSCOUNT" );
    this.appendDummyInput( "" )
      .appendTitle( "data" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "DATA" );
    this.appendDummyInput( "" )
      .appendTitle( "data count" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "DATACOUNT" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//Creating generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generating code for compiler
Blockly.propc.i2c_new_bus = function() {
  var scl_pin = this.getTitleValue( 'SCL_PIN' );
  var sda_pin = this.getTitleValue( 'SDA_PIN' );
  //TO DO: correct input for SCL_DRIVE
  var sdl_drive = this.getTitleValue( 'SCL_DRIVE' );
    
  var code = 'i2c_newbus( ' + scl_pin + ', ' + sda_pin + ', ' + scl_drive + ' )';
  return code;
};

Blockly.propc.i2c_in = function() {
  //TO DO: add correct var assignments for inputs
    
  var code = 'i2c_in( ' + busID + ', ' + I2CAddress + ', ' + memoryAddress + ', ' + memoryAddressCount + ', ' + data + ', ' + dataCount + ' )';
  return code;
};

Blockly.propc.i2c_out = function() {
  //TO DO: add correct var assignments for inputs
    
  var code = 'i2c_out( ' + busID + ', ' + I2CAddress + ', ' + memoryAddress + ', ' + memoryAddressCount + ', ' + data + ', ' + dataCount + ' )';
  return code''
};
