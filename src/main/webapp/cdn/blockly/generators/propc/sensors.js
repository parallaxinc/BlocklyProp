/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo
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
 * @fileoverview Generating C for sensor blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';


//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};


//servo block
Blockly.Blocks.sensor_ping = {
    helpUrl: '',
    init: function () {
        this.setColour(314);
        this.appendDummyInput("")
                .appendField("Ping)))")
                .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"], ["ticks", "TICKS"]]), "UNIT")
                .appendField("PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, Number);
    }
};


Blockly.propc.sensor_ping = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var unit = this.getFieldValue('UNIT');
    var methodForUnit = Blockly.propc.sensor_ping.UNITS[unit];

    Blockly.propc.definitions_["include ping"] = '#include "ping.h"';

    var code = 'ping' + methodForUnit + '(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.sensor_ping.UNITS = {
    INCHES: '_inches',
    CM: '_cm',
    TICKS: ''
};

//PIR sensor blocks
Blockly.Blocks.PIR_Sensor = {
    helpUrl: '',
    init: function () {
        this.setColour(300);
        this.appendDummyInput("")
                .appendField("PIR Sensor")
                .appendField("Pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, Number);
    }
};

Blockly.propc.PIR_Sensor = function () {
    var pin = this.getFieldValue('PIN');

    var code = 'input( ' + pin + ' )';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

// SF02 Laser Rangefinder
Blockly.Blocks.SF02_Laser_Rangefinder = {
    helpUrl: '',
    init: function () {
        this.setColour(300);
        this.appendDummyInput("")
                .appendField("SF02 Laser Rangefinder Pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, Number);
    }
};

Blockly.propc.SF02_Laser_Rangefinder = function () {
    var pin = this.getFieldValue('PIN');

    Blockly.propc.definitions_[ "include abvolt" ] = '#include "abvolts.h"';
    Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';

    var code = 'ad_volts( ' + pin + ' )';
    return [code, Blockly.propc.ORDER_ATOMIC];
};
