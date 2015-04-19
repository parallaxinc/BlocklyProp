/*
 
 This file contains support for the activitybot_library functions built into C
 
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

//Generating GUIs for Activitybot library blocks
Blockly.Language.activitybot_set_ramp_step = {
    category: 'Activitybot',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Set Ramp Step" );
        this.appendDummyInput( "" )
            .appendTitle( new Blockly.FieldDropdown( [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]] ), 'STEPSIZE' );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.activitybot_ramp_step_toward = {
    category: 'Activitybot',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Ramp Step" );
        this.appendValueInput( 'LEFT_RAMPSTEP' )
            .appendTitle( "left ( -128 to 128 )" );
        this.appendValueInput( 'RIGHT_RAMPSTEP' )
            .appendTitle( "right ( -128 to 128 )" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.activitybot_calibrate = {
    category: 'Activitybot',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Calibrate" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.activitybot_display_calibration = {
    category: 'Activitybot',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Display Calibration" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

//Getting propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generating code for compiler
Blockly.propc.activitybot_set_ramp_step = function() {
    var stepSize = this.getTitleValue( 'STEPSIZE' );
    
    if ( Blockly.propc.definitions_[ "abdrive" ] === undefined )
    {
        Blockly.propc.definitions_[ "abdrive" ] = '#include "abdrive.h"';
    }
    
    var code = 'drive_setRampStep( ' + stepSize + ' );\n';
    return code;
};

Blockly.propc.activitybot_ramp_step_toward = function() {
    var left_rampstep = Blockly.propc.valueToCode( this, 'LEFT_RAMPSTEP', Blockly.propc.ORDER_NONE ) || '0';
    var right_rampstep = Blockly.propc.valueToCode( this, 'RIGHT_RAMPSTEP', Blockly.propc.ORDER_NONE ) || '0';
    
    if ( Blockly.propc.definitions_[ "abdrive" ] === undefined )
    {
        Blockly.propc.definitions_[ "abdrive" ] = '#include "abdrive.h"';
    }
    
    var code = 'drive_rampStep( ' + left_rampstep + ', ' + right_rampstep + ' );\n';
    return code;
};

Blockly.propc.activitybot_calibrate = function() {
    if ( Blockly.propc.definitions_[ "abcalibrate" ] === undefined )
    {
        Blockly.propc.definitions_[ "abcalibrate" ] = '#include "abcalibrate.h"';
    }
    
    var code =
        'cal_servoPins( 12, 13 );\n' +
        'cal_encoderPins( 14, 15 );\n\n' +
        'high( 26 );\n' +
        'high( 27 );\n' +
        'cal_activityBot();\n' +
        'low( 26 );\n' +
        'low( 27 );\n';
    return code;
};

Blockly.propc.activitybot_display_calibration = function() {
    if ( Blockly.propc.definitions_[ "abdrive" ] === undefined )
    {
        Blockly.propc.definitions_[ "abdrive" ] = '#include "abdrive.h"';
    }
    
    var code = 'drive_displayInterpolation();\n';
    return code;
};