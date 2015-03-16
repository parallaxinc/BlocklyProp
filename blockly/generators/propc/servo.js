/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo & Vale Tolpegin
 * https://github.com/gasolin/BlocklyDuino
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

/**
 * @fileoverview Generating Spin for servo blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';


//define blocks
if (!Blockly.Language)
    Blockly.Language = {};


//servo block
Blockly.Language.servo_move = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour(180);
        this.appendDummyInput("")
                .appendTitle("Servo Angle")
                .appendTitle("PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        this.appendValueInput("DEGREES", Number)
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendTitle("Degrees (0 - 180°)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Language.servo_speed = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
            .appendTitle( "Servo speed" );
        this.appendDummyInput( "" )
            .appendTitle( "Pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'PIN' );
        this.appendValueInput( 'SPEED' )
            .appendTitle( "Speed ( -100 to 100 )" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.servo_set_ramp = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
            .appendTitle( "Servo set ramp" );
        this.appendDummyInput( "" )
            .appendTitle( "Pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'PIN' );
        this.appendDummyInput( "" )
            .appendTitle( "Rampstep" )
            .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]] ), 'RAMP_STEP' );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.servodiffdrive_library_drive_pins = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
            .appendTitle( "Drive pins" );
        this.appendDummyInput( "" )
            .appendTitle( "left pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'LEFT_PIN' );
        this.appendDummyInput( "" )
            .appendTitle( "right pin" )
            .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), 'RIGHT_PIN' );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.servodiffdrive_library_drive_speed = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
            .appendTitle( "Drive speeds" );
        this.appendValueInput( 'LEFT_SPEED' )
            .appendTitle( "Left Speed ( -100 to 100 )" );
        this.appendValueInptu( 'RIGHT_SPEED' )
            .appendTitle( "Right Speed ( -100 to 100 )" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.servodiffdrive_library_drive_setRamp = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
            .appendTitle( "Drive setRamp" );
        this.appendDummyInput( "" )
            .appendTitle( "left ramp" )
            .appendTitle( new Blockly.FieldDropdown( [["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]] ), 'LEFT_RAMP' );
        this.appendDummyInput( "" )
            .appendTitle( "right ramp" )
            .appendTitle( new Blockly.FieldDropdown( [["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]] ), 'RIGHT_RAMP' );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.servodiffdrive_library_drive_sleep = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
            .appendTitle( "Drive sleep" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.servodiffdrive_library_drive_stop = {
    category: 'Servo',
    helpUrl: '',
    init: function() {
        this.setColour( 180 );
        this.appendDummyInput( "" )
            .appendTitle( "Drive stop" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.servo_move = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var degrees = Blockly.propc.valueToCode(this, 'DEGREES', Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_['define_servo'] = '#include "servo.h"';
//    Blockly.propc.setups_['setup_servo'] = 'SERVO.Start';

    var code = 'servo_angle(' + dropdown_pin + ', ' + degrees + ' * 10);\n';
    return code;
};

Blockly.propc.servo_speed = function() {
    var pin = this.getTitleValue( 'PIN' );
    var speed = this.getTitleValue( 'SPEED' );
    
    var code = 'servo_speed( ' + pin + ', ' + speed + ' );\n';
    return code;
};

Blockly.propc.servo_set_ramp = function() {
    var pin = this.getTitleValue( 'PIN' );
    var ramp_step = this.getTitleValue( 'RAMP_STEP' );
    
    var code = 'servo_setramp( ' + pin + ', ' + ramp_step + ' );\n';
    return code;
};

Blockly.propc.servodiffdrive_library_drive_pins = function() {
    var left_pin = this.getTitleValue( 'LEFT_PIN' );
    var right_pin = this.getTitleValue( 'RIGHT_PIN' );
    
    var code = 'drive_pins( ' + left_pin + ', ' + right_pin + ' );\n';
    return code;
};

Blockly.propc.servodiffdrive_library_drive_speed = function() {
    var left_speed = this.getTitleValue( 'LEFT_SPEED' );
    var right_speed = this.getTitleValue( 'RIGHT_SPEED' );
    
    var code = 'drive_speeds( ' + left_speed + ', ' + right_speed + ' );\n';
    return code;
};

Blockly.propc.servodiffdrive_library_drive_setRamp = function() {
    var left_ramp = this.getTitleValue( 'LEFT_RAMP' );
    var right_ramp = this.getTitleValue( 'RIGHT_RAMP' );
    
    var code = 'drive_setramp( ' + left_ramp + ', ' + right_ramp + ' );\n';
    return code;
};

Blockly.propc.servodiffdrive_library_drive_sleep = function() {
    var code = 'drive_sleep();\n';
    return code;
};

Blockly.propc.servodiffdrive_library_drive_stop = function() {
    var code = 'drive_stop();\n';
    return code;
};
