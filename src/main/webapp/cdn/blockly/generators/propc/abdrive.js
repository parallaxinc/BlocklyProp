/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
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

/**
 * @fileoverview Generating Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.activitybot_calibrate = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_ACTIVITYBOT_CALIBRATE_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
            .appendField("ActivityBot calibrate");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.activitybot_display_calibration = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_ACTIVITYBOT_DISPLAY_CALIBRATION_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
            .appendField("ActivityBot display calibration");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.ab_drive_init = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_ROBOT_DRIVE_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField("Robot")
                .appendField(new Blockly.FieldDropdown([["ActivityBot", "abdrive.h"], ["Arlo", "arlodrive.h"], ["Servo Differential Drive", "servodiffdrive.h"]], function (bot) {
                    this.sourceBlock_.updateShape_({"BOT": bot});
                }), "BOT")
                .appendField("initialize"); 
        this.appendDummyInput("PINS")
                .appendField(" ramping")
                .appendField(new Blockly.FieldDropdown([["none", "2000"], ["light", "16"], ["medium", "8"], ["heavy", "4"], ["maximum", "2"]]), "RAMPING");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var bot = this.getFieldValue('BOT');
        container.setAttribute('BOT', bot);
        return container;
    },
    domToMutation: function (xmlElement) {
        var bot = xmlElement.getAttribute('BOT');
        this.updateShape_({"BOT": bot});
    },
    updateShape_: function (details) {

        var bot = details['BOT'];
        if (details['BOT'] === undefined) {
            bot = this.getFieldValue('BOT');
        }

        this.removeInput('PINS');
        this.appendDummyInput("PINS");
        var inputPins = this.getInput('PINS');
        if (bot === 'servodiffdrive.h') {
            inputPins.appendField(" left PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "LEFT")
                .appendField("right PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "RIGHT")
                .appendField(" ramping")
                .appendField(new Blockly.FieldDropdown([["none", "2000"], ["light", "16"], ["medium", "8"], ["heavy", "4"], ["maximum", "2"]]), "RAMPING");
        } else {
            inputPins.appendField(" ramping")
                .appendField(new Blockly.FieldDropdown([["none", "2000"], ["light", "16"], ["medium", "8"], ["heavy", "4"], ["maximum", "2"]]), "RAMPING");
        }
    }
};


Blockly.Blocks.ab_drive_goto = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_ROBOT_DRIVE_DISTANCE_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField('Robot drive distance in')
                .appendField(new Blockly.FieldDropdown([["ticks", "TICK"], ["centimeters", "CM"], ["inches", "INCH"]]), "UNITS");
        this.appendValueInput("LEFT")
                .setCheck('Number')
                .appendField("left");
        this.appendValueInput("RIGHT")
                .setCheck('Number')
                .appendField("right");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.ab_drive_speed = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_ROBOT_DRIVE_SPEED_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendValueInput("LEFT")
                .setCheck('Number')
                .appendField("Robot drive speed left");
        this.appendValueInput("RIGHT")
                .setCheck('Number')
                .appendField("right");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};


Blockly.propc.ab_drive_init = function() {
    var bot = this.getFieldValue('BOT');
    var left = Number(this.getFieldValue('LEFT'));
    var right = Number(this.getFieldValue('RIGHT'));
    var ramping = Number(this.getFieldValue('RAMPING'));

    Blockly.propc.definitions_["include abdrive"] = '#include "' + bot + '"';

    if(Blockly.propc.definitions_["include abdrive"] === '#include "servodiffdrive.h"') {
        Blockly.propc.setups_["servodiffdrive"] = 'drive_pins(' + left + ',' + right + ');\n';
        Blockly.propc.setups_["sdd_ramping"] = 'drive_setramp(' + ramping + ',' + ramping + ');\n';	
    } else {
        Blockly.propc.setups_["abd_ramping"] = 'drive_setRampStep(' + ramping + ');\n';
    }
    
    return '';
};

Blockly.propc.ab_drive_goto = function() {
    var left = Blockly.propc.valueToCode(this, 'LEFT', Blockly.propc.ORDER_NONE);
    var right = Blockly.propc.valueToCode(this, 'RIGHT', Blockly.propc.ORDER_NONE);
    var units = this.getFieldValue('UNITS');
    var bot = Blockly.propc.definitions_["include abdrive"];

    var code = '';
    
    if(bot === '#include "servodiffdrive.h"') {
        code += '// Servo Differential Drive does not support "Drive Distance"\n';
    } else if(bot === '#include "abdrive.h"') {
        if(units === 'TICK') {
            code += 'drive_goto(' + left + ', ' + right + ');\n';
        } else if(units === 'CM') {
            code += 'drive_goto((' + left + ' * 40)/13), (' + right + ' * 40)/13);\n';
        } else {
            code += 'drive_goto((' + left + ' * 508)/65), (' + right + ' * 508)/65);\n';            
        }
    } else {
        if(units === 'TICK') {
            code += 'drive_goto(' + left + ', ' + right + ');\n';
        } else if(units === 'CM') {
            code += 'drive_goto((' + left + ' * 2500)/889), (' + right + ' * 2500)/889);\n';            
        } else {
            code += 'drive_goto((' + left + ' * 50)/7), (' + right + ' * 50)/7);\n';            
        }        
    }
    
    if(bot === undefined) {
        return '// Robot drive system is not initialized!\n';
    } else {
        return code;
    }
};

Blockly.propc.ab_drive_speed = function() {
    var left = Blockly.propc.valueToCode(this, 'LEFT', Blockly.propc.ORDER_NONE);
    var right = Blockly.propc.valueToCode(this, 'RIGHT', Blockly.propc.ORDER_NONE);
    var bot = Blockly.propc.definitions_["include abdrive"];
    
    var code = '';
    
    if(bot === '#include "servodiffdrive.h"') {
        code = 'drive_speeds(' + left + ', ' + right + ');\n';
    } else {
        if(Blockly.propc.setups_["abd_ramping"] === 'drive_setRampStep(2000);\n') {
            code = 'drive_speed(' + left + ', ' + right + ');\n';
        } else {
            code = 'drive_ramp(' + left + ', ' + right + ');\n';
        }
    }

    if(bot === undefined) {
        return '// Robot drive system is not initialized!\n';
    } else {
        return code;
    }
};

Blockly.propc.activitybot_calibrate = function() {
    Blockly.propc.definitions_["activitybot_calibrate"] = '#include "abcalibrate.h"';
    Blockly.propc.setups_["activitybot_calibrate"] = 'cal_servoPins(12, 13);\n\tcal_encoderPins(14, 15);';

    return 'cal_activityBot();\n';
};

Blockly.propc.activitybot_display_calibration = function() {
    return 'drive_displayInterpolation();\n';
};
