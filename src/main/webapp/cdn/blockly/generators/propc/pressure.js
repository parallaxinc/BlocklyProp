/*
  This file contains support for pressure sensors
  
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

if ( !Blockly.Blocks )
  Blockly.Blocks = {};

//Creating GUI blocks for eTape liquid sensor
Blockly.Blocks.etape_rc_time = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "ETape sensor rc_time input" )
      .appendField( "Pin" )
      .appendField( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.appendDummyInput( "" )
      .appendField( "Put input value in" )
      .appendField( new Blockly.FieldVariable( Blockly.LANG_VARIABLES_GET_ITEM ), 'VAR' );
    this.setNextStatement( true, null );
    this.setPreviousStatement( true, null );
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks.etape_voltage_input = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendField( "ETape sensor voltage input" )
      .appendField( "Pin" )
      .appendField( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

//Get generator
//Blockly.propc = new Blockly.Generator( 'propc' );

//Create code for blocks
Blockly.propc.etape_rc_time = function() {
  var pin = this.getFieldValue( 'PIN' );
  var inputStorage = Blockly.propc.variableDB_.getName( this.getFieldValue( 'VAR' ), Blockly.Variables.NAME_TYPE );
  
  var code = 'high( ' + pin + ' );\npause( 1 );\n' + inputStorage + ' = ' + 'rc_time( ' + pin + ', 1 );\n';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};

Blockly.propc.etape_voltage_input = function() {
  var pin = this.getFieldValue( 'PIN' );
  
  Blockly.propc.setups_[ "include abvolt" ] = 'ad_init( 21, 20, 19, 18 );\n';
  
  var code = 'ad_volts( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
