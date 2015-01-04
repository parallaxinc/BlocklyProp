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
Blockl.Language.activitybot_set_ramp_step = {
    category: 'Activitybot Library',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Activitybot library set ramp step" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.activitybot_ramp_step_toward = {
    category: 'Activitybot Library',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Activitybot library ramp step toward" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.activitybot_calibrate = {
    category: 'Activitybot Library',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Activitybot library calibrate" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

Blockly.Language.activitybot_display_calibration = {
    category: 'Activitybot Library',
    helpUrl: '',
    init: function() {
        this.setColour( 220 );
        this.appendDummyInput( "" )
            .appendTitle( "Activitybot library display calibration" );
        this.setPreviousStatement( true, null );
        this.setNextStatement( true, null );
    }
};

//Getting propc generator
Blockly.propc = Blockly.Generator.get( 'propc' );

//Generating code for compiler
Blockly.propc.activitybot_set_ramp_step = function() {
    var code = '';
    return code;
};

Blockly.propc.activitybot_ramp_step_toward = function() {
    var code = '';
    return code;
};

Blockly.propc.activitybot_calibrate = function() {
    var code = '';
    return code;
};

Blockly.propc.activitybot_display_calibration = function() {
    var code = '';
    return code;
};