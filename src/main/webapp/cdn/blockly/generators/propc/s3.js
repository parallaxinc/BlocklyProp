/**
 *
 */

/**
 * @fileoverview 
 * @author 
 */
'use strict';

Blockly.Blocks.scribbler_loop = {
    init: function () {
        this.appendDummyInput()
                .appendField("loop");
        this.appendStatementInput("LOOP");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LOOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_loop = function() {
    var branch = Blockly.propc.statementToCode(this, 'LOOP');
    if (Blockly.propc.INFINITE_LOOP_TRAP) {
        branch = Blockly.propc.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    return 'while(1) {\n' + branch + '}\n';
};

Blockly.Blocks.scribbler_limited_loop = {
    init: function () {
        this.appendDummyInput()
            .appendField("loop")
            .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'LOOP_COUNT')
            .appendField("times");
        this.appendStatementInput("LOOP");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LIMITED_LOOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_limited_loop = function() {
    var branch = Blockly.propc.statementToCode(this, 'LOOP');
    if (Blockly.propc.INFINITE_LOOP_TRAP) {
        branch = Blockly.propc.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var repeats = this.getFieldValue('LOOP_COUNT') || '0';
    return 'for (int __n = 0; __n < ' + repeats + '; __n++) {\n' + branch + '}\n';
};

Blockly.Blocks.scribbler_exit_loop = {
    init: function () {
        this.appendDummyInput()
            .appendField("exit loop");
        this.setPreviousStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_EXIT_LOOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_exit_loop = function() {
    return 'break;\n';
};

Blockly.Blocks.scribbler_simple_wait = {
    init: function () {
        this.appendDummyInput()
            .appendField("wait")
            .appendField(new Blockly.FieldTextInput('5', Blockly.FieldTextInput.numberValidator), 'WAITTIME')
            .appendField(new Blockly.FieldDropdown([['second(s) (1 to 53)', '1000'], ['tenth(s) of a second (1 to 535)', '100'], ['millisecond(s) (1 to 53,500)', '1']]), 'TIMESCALE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_SIMPLE_WAIT_TOOLTIP);
    }
};

Blockly.propc.scribbler_simple_wait = function() {
    var wait_time = this.getFieldValue('WAITTIME') || '1';
    var time_scale = this.getFieldValue('TIMESCALE');
    return 'pause(' + wait_time + ' * ' + time_scale + ');\n';
};

Blockly.Blocks.scribbler_wait = {
    init: function () {
        this.appendValueInput("WAITTIME", 'Number')
                .appendField("wait")
                .setCheck('Number');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([['second(s) (1 to 53)', '1000'], ['tenth(s) of a second (1 to 535)', '100'], ['millisecond(s) (1 to 53,500)', '1']]), 'TIMESCALE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_CONTROL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_WAIT_TOOLTIP);
    }
};

Blockly.propc.scribbler_wait = function() {
    var wait_time = Blockly.propc.valueToCode(this, 'WAITTIME', Blockly.propc.ORDER_NONE) || '1';
    var time_scale = this.getFieldValue('TIMESCALE');
    return 'pause(' + wait_time + ' * ' + time_scale + ');\n';
};

Blockly.Blocks.scribbler_if_line = {
    init: function () {
        this.appendDummyInput()
            .appendField("if the Scribbler robot")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'LINE_CONDITION')
            .appendField("over")
            .appendField(new Blockly.FieldDropdown([['the center', 'CENTER'], ['the left edge', 'LEFT'], ['the right edge', 'RIGHT'], ['any part', 'DETECTED']]), 'LINE_POSITION')
            .appendField("of a")
            .appendField(new Blockly.FieldDropdown([['black', 'BLACK'], ['white', 'WHITE']]), 'LINE_COLOR')
            .appendField("line");
        this.appendStatementInput("IF_LINE")
            .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_LINE_TOOLTIP);
    }
};

Blockly.propc.scribbler_if_line = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var line_condition = this.getFieldValue('LINE_CONDITION');
    var line_position = this.getFieldValue('LINE_POSITION');
    var line_color = this.getFieldValue('LINE_COLOR');
    var code = 'if(s3_simpleLine(S3_' + line_condition + ', S3_' + line_position + ', S3_' + line_color + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_LINE') + '\n}';
};

Blockly.Blocks.scribbler_if_obstacle = {
    init: function () {
        this.appendDummyInput()
            .appendField("if an obstacle")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'OBSTACLE_CONDITION')
            .appendField(new Blockly.FieldDropdown([['in front of', 'CENTER'], ['to the left of', 'LEFT'], ['to the right of', 'RIGHT'], ['detected by', 'DETECTED']]), 'OBSTACLE_POSITION')
            .appendField("the Scribbler robot");
        this.appendStatementInput("IF_OBSTACLE")
            .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_OBSTACLE_TOOLTIP);
    }
};

Blockly.propc.scribbler_if_obstacle = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var obstacle_condition = this.getFieldValue('OBSTACLE_CONDITION');
    var obstacle_position = this.getFieldValue('OBSTACLE_POSITION');
    var code = 'if(s3_simpleObstacle(S3_' + obstacle_condition + ', S3_' + obstacle_position + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_OBSTACLE') + '\n}';
};

Blockly.Blocks.scribbler_if_light = {
    init: function () {
        this.appendDummyInput()
            .appendField("if the most light")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'LIGHT_CONDITION')
            .appendField(new Blockly.FieldDropdown([['in front', 'CENTER'], ['to the left', 'LEFT'], ['to the right', 'RIGHT'], ['on all sides', 'DETECTED']]), 'LIGHT_POSITION')
            .appendField("of the Scribbler robot");
        this.appendStatementInput("IF_LIGHT")
            .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_LIGHT_TOOLTIP);
    }
};

Blockly.propc.scribbler_if_light = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var light_condition = this.getFieldValue('LIGHT_CONDITION');
    var light_position = this.getFieldValue('LIGHT_POSITION');
    var code = 'if(s3_simpleLight(S3_' + light_condition + ', S3_' + light_position + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_LIGHT') + '\n}';
};

Blockly.Blocks.scribbler_if_stalled = {
    init: function () {
        this.appendDummyInput()
            .appendField("if the Scribbler robot")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'STALLED_CONDITION')
            .appendField("stuck");
        this.appendStatementInput("IF_STALLED")
            .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_STALLED_TOOLTIP);
    }
};

Blockly.propc.scribbler_if_stalled = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var code = 'if(s3_simpleStalled(S3_' + this.getFieldValue('STALLED_CONDITION') + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_STALLED') + '\n}';
};

Blockly.Blocks.scribbler_if_button = {
    init: function () {
        this.appendDummyInput()
            .appendField("if the red button")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'BUTTON_CONDITION')
            .appendField("pressed");
        this.appendStatementInput("IF_BUTTON");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.propc.scribbler_if_button = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var code = 'if(s3_simpleButton(S3_' + this.getFieldValue('BUTTON_CONDITION') + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_BUTTON') + '\n}';
};

Blockly.Blocks.scribbler_if_random = {
    init: function () {
        this.appendDummyInput()
            .appendField("if a virtual coin flip")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['was', 'WAS']]), 'RANDOM_CONDITION')
            .appendField(new Blockly.FieldDropdown([['heads', ''], ['tails', '_NOT']]), 'RANDOM_INVERT');
        this.appendStatementInput("IF_RANDOM");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_RANDOM_TOOLTIP);
    }
};

Blockly.propc.scribbler_if_random = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var code = 'if(s3_simpleRandom(S3_' + this.getFieldValue('RANDOM_CONDITION') + this.getFieldValue('RANDOM_INVERT') + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_RANDOM') + '\n}';
};

Blockly.Blocks.scribbler_drive = {
    init: function () {
        this.appendDummyInput()
            .appendField("drive")
            .appendField(new Blockly.FieldDropdown([['forward', ''], ['backward', '-']]), 'DRIVE_DIRECTION')
            .appendField("and")
            .appendField(new Blockly.FieldDropdown([['sharply to the left', 'SHARP_LEFT'], ['gently to the left', 'GENTLE_LEFT'], ['slightly to the left', 'SLIGHT_LEFT'], ['straight', 'STRAIGHT'], ['slightly to the right', 'SLIGHT_RIGHT'], ['gently to the right', 'GENTLE_RIGHT'], ['sharply to the right', 'SHARP_RIGHT']]), 'DRIVE_ANGLE')
            .appendField("at")
            .appendField(new Blockly.FieldDropdown([['full', '255'], ['a quick', '191'], ['a gentle', '127'], ['a slow', '63']]), 'DRIVE_SPEED')
            .appendField("speed");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_ACTIONS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_DRIVE_TOOLTIP);
    }
};

Blockly.propc.scribbler_drive = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var drive_direction = this.getFieldValue('DRIVE_DIRECTION');
    var drive_angle = this.getFieldValue('DRIVE_ANGLE');
    var drive_speed = this.getFieldValue('DRIVE_SPEED');
    return 's3_simpleDrive(S3_' + drive_angle + ', ' + drive_direction + drive_speed + ');\n';
};

Blockly.Blocks.scribbler_spin = {
    init: function () {
        this.appendDummyInput()
            .appendField("rotate")
            .appendField(new Blockly.FieldDropdown([['\u21BB', ''], ['\u21BA', '-']]), 'SPIN_DIRECTION')
            .appendField("for")
	    .appendField(new Blockly.FieldAngle(90), "SPIN_ANGLE")
            .appendField("at")
            .appendField(new Blockly.FieldDropdown([['full', '15'], ['a quick', '7'], ['a gentle', '3'], ['a slow', '1']]), 'SPIN_SPEED')
            .appendField("speed");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_ACTIONS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_SPIN_TOOLTIP);
    }
};

Blockly.propc.scribbler_spin = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var spin_direction = this.getFieldValue('SPIN_DIRECTION');
    var spin_angle = this.getFieldValue('SPIN_ANGLE');
    var spin_speed = this.getFieldValue('SPIN_SPEED');
    return 's3_simpleSpin(' + spin_direction + spin_angle + ', ' + spin_speed + ', 0);\n';
};

Blockly.Blocks.scribbler_stop = {
    init: function () {
        this.appendDummyInput()
            .appendField("stop driving");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_ACTIONS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_STOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_stop = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    return 's3_simpleStop();\n';
};

Blockly.Blocks.scribbler_LED = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("change these LEDs:   ")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "LEFT_LED")
            .appendField("  ")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "CENTER_LED")
            .appendField("  ")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "RIGHT_LED")
            .appendField("  ");
	var left_led_colors = new Blockly.FieldColour("#000000");
	var center_led_colors = new Blockly.FieldColour("#000000");
	var right_led_colors = new Blockly.FieldColour("#000000");
	left_led_colors.setColours(['#FF0000','#00FF00','#FF7F00','#000000']).setColumns(2);
	center_led_colors.setColours(['#FF0000','#00FF00','#FF7F00','#000000']).setColumns(2);
	right_led_colors.setColours(['#FF0000','#00FF00','#FF7F00','#000000']).setColumns(2);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("to these colors:  ")
            .appendField(left_led_colors, "LEFT_COLOR")
            .appendField(center_led_colors, "CENTER_COLOR")
            .appendField(right_led_colors, "RIGHT_COLOR")
            .appendField(" ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_LEDS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LED_TOOLTIP);
    }
};

Blockly.propc.scribbler_LED = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var left_color = this.getFieldValue('LEFT_COLOR');
    var center_color = this.getFieldValue('CENTER_COLOR');
    var right_color = this.getFieldValue('RIGHT_COLOR');
    var code = '';

    if (this.getFieldValue('LEFT_LED') === 'TRUE') {
        code += 's3_setLED(S3_LEFT, S3_COLOR_' + left_color.substr(1,6).toUpperCase() + ');\n';
    }
    if (this.getFieldValue('CENTER_LED') === 'TRUE') {
        code += 's3_setLED(S3_CENTER, S3_COLOR_' + center_color.substr(1,6).toUpperCase() + ');\n';
    }
    if (this.getFieldValue('RIGHT_LED') === 'TRUE') {
        code += 's3_setLED(S3_RIGHT, S3_COLOR_' + right_color.substr(1,6).toUpperCase() + ');\n';
    }

    return code;
};

Blockly.Blocks.scribbler_play = {
    init: function () {
        this.appendDummyInput()
            .appendField("play a")
            .appendField(new Blockly.FieldDropdown([['soprano', '4'], ['tenor', '8'], ['middle', '16'], ['low', '32'], ['deep', '64']]), 'NOTE_OCTAVE')
            //.appendField(new Blockly.FieldDropdown([['double high', '1'], ['soprano', '2'], ['tenor', '3'], ['middle', '4'], ['low', '5'], ['deep', '6'], ['pedal', '7']]), 'NOTE_OCTAVE')
            .appendField(new Blockly.FieldDropdown([['A\u266D', '3322'], ['A', '3520'], ['A\u266F/B\u266D', '3729'], ['B', '3951'], ['C', '4186'], ['C\u266F/D\u266D', '4435'], ['D', '4699'], ['D\u266F/E\u266D', '4978'], ['E', '5274'], ['F', '5588'], ['F\u266F/G\u266D', '5920'], ['G', '6272'], ['G\u266F', '6645']]), 'NOTE_FREQUENCY')
            .appendField("for a")
            .appendField(new Blockly.FieldDropdown([['sixteenth', '63'], ['dotted sixteenth', '94'], ['eighth', '125'], ['dotted eighth', '188'], ['quarter', '250'], ['dotted quarter', '375'], ['half', '500'], ['dotted half', '750'], ['whole', '1000'], ['dotted whole', '1500']]), 'NOTE_DURATION')
            .appendField("note at a")
            .appendField(new Blockly.FieldDropdown([['loud', '50'], ['medium', '30'], ['quiet', '15']]), 'NOTE_VOLUME')
            .appendField("volume");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SOUND_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_PLAY_TOOLTIP);
    }
};


Blockly.propc.scribbler_play = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var note_octave = this.getFieldValue('NOTE_OCTAVE');
    var note_frequency = this.getFieldValue('NOTE_FREQUENCY');
    var note_duration = this.getFieldValue('NOTE_DURATION');
    var note_volume = this.getFieldValue('NOTE_VOLUME');
    
    return 's3_simplePlay((' + note_frequency + ' / ' + note_octave + '), ' + note_duration + ', ' + note_volume + ');\n';
};

// Move the motors for 0 to ? ms, or indefinately
Blockly.Blocks.move_motors = {
    init: function () {
	this.appendValueInput("LEFT_MOTOR_SPEED")
		.setCheck("Number")
		.appendField("set left motor speed to (-100 to 100)%");
	this.appendValueInput("RIGHT_MOTOR_SPEED")
		.setCheck("Number")
		.appendField("set right motor speed to (-100 to 100)%");
	this.appendValueInput("MOTOR_DURATION")
		.setCheck("Number")
		.appendField("for a duration of (1 to 65,535) ms");
		// TODO: Find duration
	this.appendDummyInput()
		.appendField("use 0 ms for continuous operation");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	this.setTooltip('Speeds are a range of -100 (full reverse) to 100 (full forward) with a duration of 1 to 15,000 milliseconds, or a duration of 0 for continuous operation');
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_TOOLTIP);
    }
};

Blockly.propc.move_motors = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var left_speed = Blockly.propc.valueToCode(this, 'LEFT_MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    var right_speed = Blockly.propc.valueToCode(this, 'RIGHT_MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    var movement_time = Blockly.propc.valueToCode(this, 'MOTOR_DURATION', Blockly.propc.ORDER_ATOMIC) || '0';
    return 's3_motorSet(' + left_speed + ', ' + right_speed + ', ' + movement_time + ');\n';
};

// Move the motors...
Blockly.Blocks.move_motors_distance = {
    init: function () {
	this.appendDummyInput()
		.appendField("in ")
		.appendField(new Blockly.FieldDropdown([['inches (-633 to 633)', ' * 100000 / 1933'], ['tenths of an inch (-6,333 to 6,333)', ' * 10000 / 1933'], ['centimeters (-1,608 to 1,608)', ' * 10000 / 491'], ['millimeters (-16,088 to 16,088)', ' * 1000 / 491'], ['encoder counts (-32,767 to 32,767)', '']]), 'MULTIPLIER');
	this.appendValueInput("LEFT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("move the left motor");
	this.appendValueInput("RIGHT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("move the right motor");
	this.appendValueInput("MOTOR_SPEED")
		.setCheck("Number")
		.appendField("at a top speed of (1 to 100)%");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	this.setTooltip('Maximum millimeters: +/- 15,937, Maximum centimeters: +/- 1,593, Maximum inches: +/- 643\n Maximum tenths of an inch: +/- 6,431, Maximum encoder counts: +/- 32,767');
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_DISTANCE_TOOLTIP);
    }
};

Blockly.propc.move_motors_distance = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var distance_multiplier = this.getFieldValue('MULTIPLIER');
    var left_distance = Blockly.propc.valueToCode(this, 'LEFT_MOTOR_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var right_distance = Blockly.propc.valueToCode(this, 'RIGHT_MOTOR_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var top_speed = Blockly.propc.valueToCode(this, 'MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    return 's3_motorSetDistance(' + left_distance + distance_multiplier + ', ' + right_distance + distance_multiplier + ', ' + top_speed + ');\n';
};

Blockly.Blocks.move_motors_xy = {
    init: function () {
	this.appendDummyInput()
		.appendField("in ")
		.appendField(new Blockly.FieldDropdown([['inches (-20,755,429 to 20,755,429)', ' * 100000 / 1933'], ['tenths of an inch (-207,554,294 to 207,554,294)', ' * 10000 / 1933'], ['centimeters (-52,720,723 to 52,720,723)', ' * 10000 / 491'], ['millimeters (-527,207,235 to 527,207,235)', ' * 1000 / 491'], ['encoder counts (-1,073,741,823 to 1,073,741,823)', '']]), 'MULTIPLIER');
        this.appendDummyInput()
            .appendField("move the Scribbler to a new coordinate (X,Y)");
	this.appendValueInput("X_DISTANCE")
		.setCheck("Number")
		.appendField("change (+/-) in X");
	this.appendValueInput("Y_DISTANCE")
		.setCheck("Number")
		.appendField("change (+/-) in Y");
	this.appendValueInput("MOTOR_SPEED")
		.setCheck("Number")
		.appendField("at a top speed of (1 to 100)%");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_XY_TOOLTIP);
    }
};

//TODO - This function appears to be missing.
Blockly.propc.move_motors_xy = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var distance_multiplier = this.getFieldValue('MULTIPLIER');
    var x_distance = Blockly.propc.valueToCode(this, 'X_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var y_distance = Blockly.propc.valueToCode(this, 'Y_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var top_speed = Blockly.propc.valueToCode(this, 'MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    return 'scribbler_set_speed(' + top_speed + ' * 3 / 20);\nscribbler_move_to(' + x_distance + distance_multiplier + ', ' + y_distance + distance_multiplier + ');\n';
};

// Move the motors...
Blockly.Blocks.move_motors_angle = {
    init: function () {
	this.appendValueInput("ROTATE_ANGLE")
		.setCheck("Number")
		.appendField("rotate the Scribbler robot (-1,080 to 1,080)\u00B0");
	this.appendValueInput("ROTATE_RADIUS")
		.setCheck("Number")
		.appendField("around a radius to the left(-)/right(+) in")
		.appendField(new Blockly.FieldDropdown([['inches (-85 to 85) of', ' * 100000 / 1933'], ['tenths of an inch (-850 to 850) of', ' * 10000 / 1933'], ['centimeters (-216 to 216) of', ' * 10000 / 491'], ['millimeters (-2,160 to 2,160) of', ' * 1000 / 491'], ['encoder counts (-4,400 to 4,400) of', '']]), 'RADIUS_MULTIPLIER');
	this.appendValueInput("ROTATE_SPEED")
		.setCheck("Number")
		.appendField("at a top speed of (1 to 100)%");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_ANGLE_TOOLTIP);
    }
};

Blockly.propc.move_motors_angle = function () {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var radius_multiplier = this.getFieldValue('RADIUS_MULTIPLIER');
    var angle = Blockly.propc.valueToCode(this, 'ROTATE_ANGLE', Blockly.propc.ORDER_ATOMIC);
    var radius = Blockly.propc.valueToCode(this, 'ROTATE_RADIUS', Blockly.propc.ORDER_ATOMIC);
    var rotate_speed = Blockly.propc.valueToCode(this, 'ROTATE_SPEED', Blockly.propc.ORDER_ATOMIC);
    return 's3_motorSetRotate(' + angle + ', ' + radius + radius_multiplier + ', ' + rotate_speed + ');\n';
};

Blockly.Blocks.play_polyphony = {
    init: function () {
	this.appendValueInput("FREQUENCY_1")
		.setCheck("Number")
		.appendField("play a tone of (1 to 2,000) Hz");
	this.appendValueInput("FREQUENCY_2")
		.setCheck("Number")
		.appendField("and a tone of (1 to 2,000) Hz");
	this.appendValueInput("POLYPHONY_DURATION")
		.setCheck("Number")
		.appendField("for a duration of (1 to 8,000) ms");
	this.appendValueInput("POLYPHONY_VOLUME")
		.setCheck("Number")
		.appendField("at a volume of (0 to 100)%");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	this.setHelpUrl(Blockly.MSG_S3_SOUND_HELPURL);
	this.setTooltip(Blockly.MSG_S3_PLAY_POLYPHONY_TOOLTIP);
    }
};

Blockly.propc.play_polyphony = function() {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var fq1 = Blockly.propc.valueToCode(this, 'FREQUENCY_1', Blockly.propc.ORDER_ATOMIC) || 522;
    var fq2 = Blockly.propc.valueToCode(this, 'FREQUENCY_2', Blockly.propc.ORDER_ATOMIC) || 784;
    var dur = Blockly.propc.valueToCode(this, 'POLYPHONY_DURATION', Blockly.propc.ORDER_ATOMIC) || 250;
    var vol = Blockly.propc.valueToCode(this, 'POLYPHONY_VOLUME', Blockly.propc.ORDER_ATOMIC) || 50;

    return 's3_setVolume((' + vol + ' / 2));\ns3_playNote(' + fq1 + ', ' + fq2 + ', ' + dur + ');\n';
};

Blockly.Blocks.line_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "LINE_SENSOR_CHOICE")
                .appendField("line sensor reflectivity (0% to 100%)");

	this.setInputsInline(false);
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_LINE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_LINE_SENSOR_TOOLTIP);
    }
};

Blockly.propc.line_sensor = function() {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var dir = this.getFieldValue("LINE_SENSOR_CHOICE");
    return ['s3_lineSensor(S3_' + dir + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.obstacle_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("an obstacle is present to the")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "OBSTACLE_SENSOR_CHOICE")
                .appendField("(true or false)");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_OBSTACLE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_OBSTACLE_SENSOR_TOOLTIP);
    }
};

Blockly.propc.obstacle_sensor = function() {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var dir = this.getFieldValue("OBSTACLE_SENSOR_CHOICE");
    return ['s3_readObstacle(S3_' + dir + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.stall_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("tail wheel is currently stalled (true or false)");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_STALL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_STALL_SENSOR_TOOLTIP);
    }
};

Blockly.propc.stall_sensor = function() {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    return ['s3_stalled()', Blockly.propc.ORDER_NONE];
};


Blockly.Blocks.button_pressed = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the red botton is currently pressed");
        this.appendDummyInput("")
                .appendField("(true or false)");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.spinning_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("drive wheels are currently stalled (true or false)");
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_STALL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SPINNING_SENSOR_TOOLTIP);
    }
};

Blockly.propc.spinning_sensor = function() {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var dir = this.getFieldValue("LGHT_SENSOR_CHOICE");
    return ['!s3_motorsMoving()', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.light_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["center", "CENTER"], ["right", "RIGHT"]]), "LGHT_SENSOR_CHOICE")
                .appendField("light sensor reading (0% to 100%)");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_SENSORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_LIGHT_SENSOR_TOOLTIP);
    }
};

Blockly.propc.light_sensor = function() {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    var dir = this.getFieldValue("LGHT_SENSOR_CHOICE");
    return ['s3_lightSensor(S3_' + dir + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.reset_button_presses = {
    init: function () {
        this.appendDummyInput("")
                .appendField("reset button presses during last reset (0 to 8)");
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_RESET_BUTTON_HELPURL);
	this.setTooltip(Blockly.MSG_S3_RESET_BUTTON_PRESSES_TOOLTIP);
    }
};

Blockly.propc.reset_button_presses = function() {
    Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.setups_[ 's3_setup' ] = 's3_setup();pause(1000);';

    return ['s3_resetButtonCount()', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.button_presses = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the number of red button presses, since the");
        this.appendDummyInput("")
                .appendField("last reading \u2013 in a range of 0 to 255");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.scribbler_servo = {
    init: function () {
        this.appendDummyInput("")
                .appendField("rotate servo on")
                .appendField(new Blockly.FieldDropdown([['P0', '0'], ['P1', '1'], ['P2', '2'], ['P3', '3'], ['P4', '4'], ['P5', '5']]), "SERVO_PIN");
	this.appendValueInput("SERVO_ANGLE")
		.setCheck("Number")
		.appendField("to an angle of (0 to 180)\u00B0");
	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_SERVO_TOOLTIP);
    }
};

Blockly.propc.scribbler_servo = function () {
    var dropdown_pin = this.getFieldValue('SERVO_PIN');
    var degrees = Blockly.propc.valueToCode(this, 'SERVO_ANGLE', Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["include servo"] = '#include "servo.h"';
    if (degrees < 0) {
        degrees = 0;
    }
    if (degrees > 180) {
        degrees = 180;
    }
    var code = 'servo_angle(' + dropdown_pin + ', ' + degrees + ' * 10);\n';
    return code;
};

Blockly.Blocks.scribbler_stop_servo = {
    init: function () {
        this.appendDummyInput("")
                .appendField("disable servo on")
                .appendField(new Blockly.FieldDropdown([['P0', '0'], ['P1', '1'], ['P2', '2'], ['P3', '3'], ['P4', '4'], ['P5', '5']]), "SERVO_PIN");
	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_STOP_SERVO_TOOLTIP);
    }
};

Blockly.propc.scribbler_stop_servo = function () {
    Blockly.propc.definitions_["include servo"] = '#include "servo.h"';
    return 'servo_disable(' + this.getFieldValue('SERVO_PIN') + ');\n';
};

Blockly.Blocks.scribbler_ping = {
    init: function () {
        this.appendDummyInput("")
                .appendField("distance in")
                .appendField(new Blockly.FieldDropdown([['inches (1 to 124)', '_inches'], ['centimeters (4 to 315)', '_cm']]), "SCALE")
                .appendField("from Ping))) sensor on")
                .appendField(new Blockly.FieldDropdown([['P0', '0'], ['P1', '1'], ['P2', '2'], ['P3', '3'], ['P4', '4'], ['P5', '5']]), "PIN");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_PING_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_PING_TOOLTIP);
    }
};

Blockly.propc.scribbler_ping = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    var unit = this.getFieldValue('SCALE');

    Blockly.propc.definitions_["include ping"] = '#include "ping.h"';

    var code = 'ping' + unit + '(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.digital_input = {
    init: function () {
        this.appendDummyInput("")
                .appendField("Digital reading on")
                .appendField(new Blockly.FieldDropdown([['P0', '0'], ['P1', '1'], ['P2', '2'], ['P3', '3'], ['P4', '4'], ['P5', '5']]), "PIN");
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_IO_HELPURL);
	this.setTooltip(Blockly.MSG_S3_DIGITAL_INPUT_TOOLTIP);
    }
};

Blockly.propc.digital_input = function() {
    var pin = this.getFieldValue('PIN');
    return ['input(' + pin + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.digital_output = {
    init: function () {
        this.appendDummyInput("")
                .appendField("set")
                .appendField(new Blockly.FieldDropdown([['P0', '0'], ['P1', '1'], ['P2', '2'], ['P3', '3'], ['P4', '4'], ['P5', '5']]), "PIN");
        this.appendDummyInput("")
                .appendField("to")
                .appendField(new Blockly.FieldDropdown([['high', "HIGH"], ['low', "LOW"], ['input', "INPUT"], ['toggle state', "TOGGLE"], ['toggle direction', "REVERSE"]]), "ACTION");
	this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	this.setHelpUrl(Blockly.MSG_S3_IO_HELPURL);
	this.setTooltip(Blockly.MSG_S3_DIGITAL_OUTPUT_TOOLTIP);
    }
};

Blockly.propc.digital_output = function() {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'high(' + dropdown_pin + ');\n';
        case "LOW":
            return 'low(' + dropdown_pin + ');\n';
        case "TOGGLE":
            return 'toggle(' + dropdown_pin + ');\n\tset_direction(' + dropdown_pin + ', 1);\n';
        case "INPUT":
            return 'set_direction(' + dropdown_pin + ', 0);\n';
        case "REVERSE":
            return 'reverse(' + dropdown_pin + ');\n';
    }
};

Blockly.Blocks.analog_input = {
    init: function () {
        this.appendDummyInput("")
                .appendField("Analog reading on")
                .appendField(new Blockly.FieldDropdown([['A0', '0'], ['A1', '1']]), "ANALOG_PIN");
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	this.setHelpUrl(Blockly.MSG_S3_IO_HELPURL);
	this.setTooltip(Blockly.MSG_S3_ANALOG_INPUT_TOOLTIP);
    }
};

// TODO: create this function in s3 library.
Blockly.propc.analog_input = function() {
    var pin = this.getFieldValue('PIN');
    return ['s3_readADC(S3_ADC_A' + pin + ')', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.spin_integer = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'INT_VALUE');

        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('math'));
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SPIN_INTEGER_TOOLTIP);
    }
};

Blockly.propc.spin_integer = function() {
    var code = window.parseInt(this.getFieldValue('INT_VALUE'));
    var order = code < 0 ? Blockly.propc.ORDER_UNARY_PREFIX : Blockly.propc.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Blocks.math_int_angle = {
    init: function () {
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
	this.setTooltip(Blockly.MSG_S3_MATH_INT_ANGLE_TOOLTIP);
        this.appendDummyInput()
            .appendField(new Blockly.FieldAngle('90', Blockly.FieldTextInput.numberValidator), 'ANGLE_VALUE');

        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('math'));
    }
};

Blockly.propc.math_int_angle = function () {
    var code = window.parseInt(this.getFieldValue('ANGLE_VALUE'));
    var order = code < 0 ?
            Blockly.propc.ORDER_UNARY_PREFIX : Blockly.propc.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Blocks.scribbler_boolean = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([['true', '1'], ['false', '0']]), 'BOOL');
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('math'));
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_BOOLEAN_TOOLTIP);
    }
};

Blockly.propc.scribbler_boolean = function() {
    return [this.getFieldValue('BOOL'), Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_random_boolean = {
    init: function () {
        this.appendDummyInput("")
                .appendField("random true/false");
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('math'));
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_RANDOM_BOOLEAN_TOOLTIP);
    }
};

Blockly.propc.scribbler_random_boolean = function() {
    Blockly.propc.setups_["random_seed"] = "srand(INA + CNT);\n";
    return ['(rand() % 2)', Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.scribbler_random_number = {
    init: function () {
        this.appendValueInput("A")
                .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
                .appendField("random number from");
        this.appendValueInput("B")
                .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
                .appendField("to");
        this.setInputsInline(true);
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('math'));
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_RANDOM_NUMBER_TOOLTIP);
    }
};

Blockly.propc.scribbler_random_number = function() {
    Blockly.propc.setups_["random_seed"] = "srand(INA + CNT);\n";
    var arg1 = Blockly.propc.valueToCode(this, 'A', Blockly.propc.ORDER_ATOMIC) || '0';
    var arg2 = Blockly.propc.valueToCode(this, 'B', Blockly.propc.ORDER_ATOMIC) || '99';

    var code = '(' + arg1 + ' + rand() % (' + arg2 + ' - ' + arg1 + ' + 1))';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.spin_comment = {
    init: function () {
        this.appendDummyInput("")
                .appendField("note:")
                .appendField(new Blockly.FieldTextInput(""), "COMMENT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_CONTROL_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SPIN_COMMENT_TOOLTIP);
    }
};

Blockly.propc.spin_comment = function() {
    var text = this.getFieldValue("COMMENT");

    return '// ' + text + '\n';
};

Blockly.Blocks.factory_reset = {
    init: function () {
        this.appendDummyInput()
            .appendField("restore_s3_demo");
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_FACTORY_RESET_HELPURL);
	this.setTooltip(Blockly.MSG_S3_FACTORY_RESET_TOOLTIP);
    }
};

Blockly.Blocks.scribbler_serial_send_text = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput("")
                .appendField("Terminal / XBee / WX send text")
                .appendField(quotes.newQuote_(this.RTL))
                .appendField(new Blockly.FieldTextInput(""), "MESSAGE_TEXT")
                .appendField(quotes.newQuote_(this.LTR));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_TEXT_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_text = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";
    
    var message = this.getFieldValue('MESSAGE_TEXT');

    return 'print("' + message + '");\n';
};

Blockly.Blocks.scribbler_serial_send_char = {
    init: function () {
        this.appendValueInput("CHAR_VALUE")
                .setCheck("Number")
                .appendField("Terminal / XBee / WX send character (0 to 255)");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_CHAR_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_char = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var message = Blockly.propc.valueToCode(this, 'CHAR_VALUE', Blockly.propc.ORDER_ATOMIC);

    return 'print("%c", ' + message + ');\n';
};

Blockly.Blocks.scribbler_serial_send_decimal = {
    init: function () {
        this.appendValueInput("DECIMAL_VALUE")
                .setCheck("Number")
                .appendField("Terminal / XBee / WX send number (32-bit signed)");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_DECIMAL_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_decimal = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var message = Blockly.propc.valueToCode(this, 'DECIMAL_VALUE', Blockly.propc.ORDER_ATOMIC) || 0;

    return 'print("%d", ' + message + ');\n';
};

Blockly.Blocks.scribbler_serial_send_ctrl = {
    init: function () {
        this.appendDummyInput()
                .appendField("Terminal / XBee / WX command")
                .appendField(new Blockly.FieldDropdown([["carriage return", "13"], ["new line", "10"], ["backspace", "127"], ["clear screen", "256"]]), "SERIAL_CHAR");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_CTRL_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_ctrl = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var message = this.getFieldValue('SERIAL_CHAR');
    if(message === '256') {
        return 'term_cmd(CLS);\n';
    } else {
        return 'print("%c", ' + message + ');\n';
    }
};

Blockly.Blocks.scribbler_serial_rx_byte = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput("")
                .appendField("Terminal / XBee / WX receive character (0 to 255)");
        this.setOutput(true, 'Number');
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SERIAL_RX_BYTE_TOOLTIP);
    }
};


Blockly.propc.scribbler_serial_rx_byte = function () {
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    return ['getChar()', Blockly.propc.ORDER_NONE];
};
    
Blockly.Blocks.scribbler_serial_cursor_xy = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("Y")
                .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Terminal set cursor position to row");
        this.appendValueInput("X")
                .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
                .appendField("column");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
	this.setTooltip(Blockly.MSG_S3_SERIAL_CURSOR_XY_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_cursor_xy = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var row = Blockly.propc.valueToCode(this, 'Y', Blockly.propc.ORDER_NONE);
    var column = Blockly.propc.valueToCode(this, 'X', Blockly.propc.ORDER_NONE);

    if (Number(row) < 0) {
        row = 0;
    } else if (Number(row) > 255) {
        row = 255;
    }

    if (Number(column) < 0) {
        column = 0;
    } else if (Number(column) > 255) {
        column = 255;
    }

    return 'term_cmd(CRSRXY, ' + column + ', ' + row + ');\n';
};

Blockly.Blocks.sirc_s3_get = {
    helpUrl: Blockly.MSG_S3_SIRC_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_S3_SCRIBBLER_SIRC_TOOLTIP);
        var addPin = [["Onboard IR sensor", "SCRIBBLER_OBS_RX"]];
        var thePins = addPin.concat(profile.default.digital);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
            .appendField("Sony Remote value received from")
            .appendField(new Blockly.FieldDropdown(thePins), "PIN");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.sirc_s3_get = function() {
    var pin = this.getFieldValue('PIN');

    Blockly.propc.definitions_["sirc"] = '#include "sirc.h"';
    Blockly.propc.setups_["sirc"] = "sirc_setTimeout(70);\n";

    var code = 'sirc_button(' + pin + ')';
    return [code, Blockly.propc.ORDER_NONE];
};