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

//define blocks
if (!Blockly.Language )
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
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "SCL_DRIVE" );
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
      .appendTitle( "I2C in" );
    this.appendValueInput( 'VALUE' )
      .appendTitle( "data count" );
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
      .appendTitle( "I2C out" );
    this.appendDummyInput( "" )
      .appendTitle( "data" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "DATA" )
      .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
                                          'media/quote0.png', 12, 12))
      .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
      .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
                                          'media/quote1.png', 12, 12));
    this.appendValueInput( 'VALUE' )
      .appendTitle( "data count" );
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
  var scl_drive = this.getTitleValue( 'SCL_DRIVE' ) || '0';

  if ( Blockly.propc.setups_[ "i2c_newbus" ] === undefined )
  {
      Blockly.propc.setups_[ "12c_newbus" ] = 'i2cBusUD = i2c_newbus( ' + scl_pin + ', ' + sda_pin + ', ' + scl_drive + ' );\n';
  }

  return '';
};

Blockly.propc.i2c_out = function() {
  var data = this.getTitleValue( 'TEXT' ) || '';
  var dataCount = Blockly.propc.valueToCode( this, 'VALUE', Blockly.propc.ORDER_ATOMIC ) || '0';
    
  if ( Blockly.propc.setups_[ "i2c_newbus" ] === undefined )
  {
      return '// Missing i2c new bus declaration\n';
  }
    
  var code = 'i2c_out( i2cBusUD, 0b1010000, 32768, 2, ' + data + ', ' + dataCount + ' )';
  return code;
};

Blockly.propc.i2c_in = function() {
  var dataCount = Blockly.propc.valueToCode( this, 'VALUE', Blockly.propc.ORDER_ATOMIC ) || '0';
    
  if ( Blockly.propc.setups_[ "i2c_newbus" ] === undefined )
  {
      return '// Missing i2c new bus declaration\n';
  }
    
  if ( Blockly.propc.setups_[ "i2c_input_array" ] === undefined )
  {
      Blockly.propc.setups_[ "i2c_input_array" ] = 'char i2cInputArray[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};\n';
  }

  var code = 'i2c_in( i2cBusUD, 0b1010000, 32768, 2, i2cInputArray, ' + dataCount + ' )';
  return [code, Blockly.propc.ORDER_NONE];
};
