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
  category: 'I2C',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "I2C new bus" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.i2c_in = {
  category: 'I2C',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "I2C in" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

Blockly.Language.i2c_out = {
  category: 'I2C',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "I2C out" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//Creating generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generating code for compiler
Blockly.propc.i2c_new_bus = function() {
  var code = '';
  return code;
};

Blockly.propc.i2c_in = function() {
  var code = '';
  return code;
};

Blockly.propc.i2c_out = function() {
  var code = '';
  return code''
};
