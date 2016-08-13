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
                .appendField("Loop");
        this.appendStatementInput("LOOP");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('programming'));
    },
};

Blockly.Blocks.scribbler_limited_loop = {
    init: function () {
        this.appendValueInput("LOOP_COUNT", 'Number')
            .appendField("Loop")
            .setCheck('Number');
        this.appendDummyInput()
            .appendField("times");
        this.appendStatementInput("LOOP")

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.Blocks.scribbler_exit_loop = {
    init: function () {
        this.appendDummyInput()
            .appendField("Exit loop")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.Blocks.scribbler_wait = {
    init: function () {
        this.appendValueInput("WAITTIME", 'Number')
                .appendField("wait")
                .setCheck('Number');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([['seconds', '1'], ['\u2152 of a second', '10'], ['milliseconds', '1000']]), 'TIMESCALE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.Blocks.scribbler_if_line = {
    init: function () {
        this.appendDummyInput()
            .appendField("If a")
            .appendField(new Blockly.FieldDropdown([['black', 'BLACK'], ['white', 'WHITE']]), 'LINE_COLOR')
            .appendField("line")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'LINE_CONDITION')
            .appendField(new Blockly.FieldDropdown([['directly under', 'OVER'], ['on the left edge of', 'LEFT'], ['on the right edge of', 'RIGHT'], ['undetected by', 'NOT_OVER']]), 'LINE_POSITION')
            .appendField("the Scribbler robot ");
        this.appendStatementInput("IF_LINE")
            .appendField()
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.scribbler_if_obstacle = {
    init: function () {
        this.appendDummyInput()
            .appendField("If an obstacle")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'OBSTACLE_CONDITION')
            .appendField(new Blockly.FieldDropdown([['in front of', 'CENTER'], ['to the left of', 'LEFT'], ['to the right of', 'RIGHT'], ['undetected by', 'UNDETECTABLE']]), 'OBSTACLE_POSITION')
            .appendField("the Scribbler robot");
        this.appendStatementInput("IF_OBSTACLE")
            .appendField()
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.scribbler_if_light = {
    init: function () {
        this.appendDummyInput()
            .appendField("If the most light")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'LIGHT_CONDITION')
            .appendField(new Blockly.FieldDropdown([['in front', 'CENTER'], ['to the left', 'LEFT'], ['to the right', 'RIGHT'], ['on all sides', 'UNDETECTABLE']]), 'LIGHT_POSITION')
            .appendField("of the Scribbler robot");
        this.appendStatementInput("IF_LIGHT")
            .appendField()
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.scribbler_if_stalled = {
    init: function () {
        this.appendDummyInput()
            .appendField("If the Scribbler robot")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'STALLED_CONDITION')
            .appendField("stuck")
        this.appendStatementInput("IF_STALLED")
            .appendField()
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.scribbler_if_button = {
    init: function () {
        this.appendDummyInput()
            .appendField("If the red button")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'BUTTON_CONDITION')
            .appendField("pressed")
        this.appendStatementInput("IF_BUTTON")
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.scribbler_drive = {
    init: function () {
        this.appendDummyInput()
            .appendField("Drive")
            .appendField(new Blockly.FieldDropdown([['forward', ''], ['backward', '-']]), 'DRIVE_DIRECTION')
            .appendField("and go")
            .appendField(new Blockly.FieldDropdown([['straight', 'STRAIGHT'], ['slightly to the right', 'SLIGHT_RIGHT'], ['gently to the right', 'GENTLE_RIGHT'], ['sharply to the right', 'SHARP_RIGHT'], ['slightly to the left', 'SLIGHT_LEFT'], ['gently to the left', 'GENTLE_LEFT'], ['sharply to the left', 'SHARP_LEFT']]), 'DRIVE_ANGLE')
            .appendField("at a")
            .appendField(new Blockly.FieldDropdown([['full', '255'], ['quick', '191'], ['gentle', '127'], ['slow', '63']]), 'DRIVE_SPEED')
            .appendField("speed");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('output'));
    }
};

Blockly.Blocks.scribbler_spin = {
    init: function () {
        this.appendDummyInput()
            .appendField("Spin in place")
            .appendField(new Blockly.FieldDropdown([['\u21BB', ''], ['\u21BA', '-']]), 'SPIN_DIRECTION')
            .appendField("for")
	    .appendField(new Blockly.FieldAngle(90), "SPIN_ANGLE")
            .appendField("at a")
            .appendField(new Blockly.FieldDropdown([['full', '15'], ['quick', '7'], ['gentle', '3'], ['slow', '1']]), 'SPIN_SPEED')
            .appendField("speed, then")
            .appendField(new Blockly.FieldDropdown([['stop', 'FALSE'], ['continue', 'TRUE']]), 'SPIN_RESUME')
            .appendField("driving");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('output'));
    }
};

Blockly.Blocks.scribbler_stop = {
    init: function () {
        this.appendDummyInput()
            .appendField("Stop driving")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('output'));
    }
};

Blockly.Blocks.scribbler_LED = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Change these LEDs:   ")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "LEFT_LED")
            .appendField("  ")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "CENTER_LED")
            .appendField("  ")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "RIGHT_LED")
            .appendField("  ");
	var left_led_colors = new Blockly.FieldColour("#000000");
	var center_led_colors = new Blockly.FieldColour("#000000");
	var right_led_colors = new Blockly.FieldColour("#000000");
	left_led_colors.setColours(['#FF0000','#00FF00','#FFFF00','#000000']).setColumns(2);
	center_led_colors.setColours(['#FF0000','#00FF00','#FFFF00','#000000']).setColumns(2);
	right_led_colors.setColours(['#FF0000','#00FF00','#FFFF00','#000000']).setColumns(2);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("To these colors:  ")
            .appendField(left_led_colors, "LEFT_COLOR")
            .appendField(center_led_colors, "CENTER_COLOR")
            .appendField(right_led_colors, "RIGHT_COLOR")
            .appendField(" ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('output'));
    }
};

Blockly.Blocks.scribbler_play = {
    init: function () {
        this.appendDummyInput()
            .appendField("Play")
            .appendField(new Blockly.FieldDropdown([['\uD834\uDD61', '125'], ['\uD834\uDD61.', '188'], ['\u266A', '250'], ['\u266A.', '375'], ['\u2669', '500'], ['\u2669.', '750'], ['\uD834\uDD5E', '1000'], ['\uD834\uDD5E.', '1500'], ['\uD834\uDD5D', '1000000'], ['\uD834\uDD5D.', '1500000']]), 'NOTE_DURATION')
            .appendField(new Blockly.FieldDropdown([['A\u266D', '3322'], ['A', '3520'], ['A\u266F/B\u266D', '3729'], ['B', '3951'], ['C', '4186'], ['C\u266F/D\u266D', '4435'], ['D', '4699'], ['D\u266F/E\u266D', '4978'], ['E', '5274'], ['F', '5588'], ['F\u266F/G\u266D', '5920'], ['G', '6272'], ['G\u266F', '6645']]), 'NOTE_FREQUENCY')
            .appendField("in the")
            .appendField(new Blockly.FieldDropdown([['double high', ' ~> 1'], ['soprano', ' ~> 2'], ['tenor', ' ~> 3'], ['middle', ' ~> 4'], ['low', ' ~> 5'], ['deep', ' ~> 6'], ['pedal', ' ~> 7']]), 'NOTE_OCTAVE')
            .appendField("octave at a")
            .appendField(new Blockly.FieldDropdown([['loud', '100'], ['medium', '50'], ['quiet', '25']]), 'NOTE_VOLUME')
            .appendField("volume");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('output'));
    }
};


// Move the motors for 0 to ? ms, or indefinately
Blockly.Blocks.move_motors = {
    init: function () {
	this.appendValueInput("LEFT_MOTOR_SPEED")
		.setCheck("Number")
		.appendField("Set left motor speed to (-100 to 100)%");
	this.appendValueInput("RIGHT_MOTOR_SPEED")
		.setCheck("Number")
		.appendField("and set right motor speed to (-100 to 100)%,");
	this.appendValueInput("MOTOR_DURATION")
		.setCheck("Number")
		.appendField("for a duration of (1 to ?) ms,");
		// TODO: Find duration
	this.appendDummyInput()
		.appendField("using 0 ms to operate continuously and keep");
	this.appendDummyInput()
		.appendField("running more blocks, otherwise");
	this.appendDummyInput()
		.appendField("wait until the motors stop moving,");
	this.appendDummyInput()
		.appendField("before continuing to run blocks.");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Speeds are a range of -100 (full reverse) to 100 (full forward) with a duration of 1 to 15,000 milliseconds, or a duration of 0 for continuous operation');
        //this.setHelpUrl('help/block-scribbler.html#motors');
    }
};

// Move the motors...
Blockly.Blocks.move_motors_distance = {
    init: function () {
	this.appendDummyInput()
		.appendField("In ")
		.appendField(new Blockly.FieldDropdown([['milimeters (\u00B115,937)', ' * 2_056 / 1_000'], ['centimeters (\u00B11,593)', ' * 2_056 / 100'], ['inches (\u00B1643)', ' * 5_095 / 100'], ['tenths of an inch (\u00B16,431)', ' * 5_095 / 1_000'], ['native units (\u00B132,767)', '']]), 'MULTIPLIER')
		.appendField(",");
	this.appendValueInput("LEFT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("move the left motor");
	this.appendValueInput("RIGHT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("and move the right motor");
	this.appendValueInput("MOTOR_SPEED")
		.setCheck("Number")
		.appendField("at a top speed of (1 to 100)%,");
	this.appendDummyInput()
		.appendField("and wait until the motors stop moving,");
	this.appendDummyInput()
		.appendField("before continuing to run blocks.");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	this.setTooltip('Maximum milimeters: +/- 15,937, Maximum centimeters: +/- 1,593, Maximum inches: +/- 643\n Maximum tenths of an inch: +/- 6,431, Maximum native units: +/- 32,767');
        //this.setHelpUrl('help/block-scribbler.html#motors');
    }
};

// Move the motors...
Blockly.Blocks.move_motors_angle = {
    init: function () {
	this.appendValueInput("ROTATE_ANGLE")
		.setCheck("Number")
		.appendField("Rotate the Scribbler robot (-1,080 to 1,080)\u00B0,");
	this.appendDummyInput()
		.appendField("using negative angles for");
	this.appendDummyInput()
		.appendField("counterclockwise rotation,");
	this.appendValueInput("ROTATE_RADIUS")
		.setCheck("Number")
		.appendField("around a radius, in")
		.appendField(new Blockly.FieldDropdown([['milimeters (\u00B12,140)', ' * 2_056 / 1_000'], ['centimeters (\u00B1214)', ' * 2_056 / 100'], ['inches (\u00B186)', ' * 5_095 / 100'], ['tenths of an inch (\u00B1863)', ' * 5_095 / 1_000'], ['native units (\u00B14,400)', '']]), 'RADIUS_MULTIPLIER')
		.appendField("of");
	this.appendDummyInput()
		.appendField("usinging zero to rotate in place,");
	this.appendValueInput("ROTATE_SPEED")
		.setCheck("Number")
		.appendField("at a top speed of (1 to 100)%,");
	this.appendDummyInput()
		.appendField("and wait until the motors stop moving,");
	this.appendDummyInput()
		.appendField("before continuing to run blocks.");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('');
        //this.setHelpUrl('help/block-scribbler.html#motors');
    }
};

Blockly.Blocks.play_polyphony = {
    init: function () {
	this.appendValueInput("FREQUENCY_1")
		.setCheck("Number")
		.appendField("Play a tone of (1 to 10,000) Hz");
	this.appendValueInput("FREQUENCY_2")
		.setCheck("Number")
		.appendField("and a tone of (1 to 10,000) Hz,");
	this.appendValueInput("POLYPHONY_DURATION")
		.setCheck("Number")
		.appendField("for a duration of (1 to 8,000) ms,");
	this.appendValueInput("POLYPHONY_VOLUME")
		.setCheck("Number")
		.appendField("at a volume of ((0 to 100)%,");
	this.appendDummyInput()
		.appendField("and wait until the tone finishes,");
	this.appendDummyInput()
		.appendField("before continuing to run blocks.");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Frequencies are a range of 1 to 10,000 hertz with a duration of 1 to 8,000 milliseconds');
        //this.setHelpUrl('help/block-scribbler.html#Sound');
    }
};

Blockly.Blocks.line_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "LINE_SENSOR_CHOICE")
                .appendField("line sensor reflectivity,");
        this.appendDummyInput("")
                .appendField("in a range of 0% to 100%");

	this.setInputsInline(false);
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Reads surface reflectivity, in a range of 0 to 100');
        //this.setHelpUrl('help/block-scribbler.html#Line_Sensor');
    }
};

Blockly.Blocks.obstacle_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("an obstacle is present, to the")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "OBSTACLE_SENSOR_CHOICE")
                .appendField(",");
        this.appendDummyInput("")
                .appendField("as a true or false condition");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns 0 if there is no obstacle and 1 if there is an obstacle');
        //this.setHelpUrl('help/block-scribbler.html#Obstacle_Sensor');
    }
};

Blockly.Blocks.stall_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the scribbler robot is currently stalled,");
        this.appendDummyInput("")
                .appendField("as a true or false condition");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.button_pressed = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the red botton is currently pressed,");
        this.appendDummyInput("")
                .appendField("as a true or false condition");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.spinning_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the Scribbler wheels are currently moving,");
        this.appendDummyInput("")
                .appendField("as a true or false condition");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.light_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["center", "CENTER"], ["right", "RIGHT"]]), "LGHT_SENSOR_CHOICE")
                .appendField("ambient light sensor reading,");
        this.appendDummyInput("")
                .appendField("in a range of 0% to 100%");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Reads ambient light, in a range of 0 to 255');
        //this.setHelpUrl('help/block-scribbler.html#Light_Sensor');
    }
};

Blockly.Blocks.reset_button_presses = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the number of reset button presses, during the");
        this.appendDummyInput("")
                .appendField("last reset, in a range of 0 to 8");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('io'));
    }
};

Blockly.Blocks.button_presses = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the number of red button presses, since the");
        this.appendDummyInput("")
                .appendField("last reading, in a range of 0 to 255");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('io'));
    }
};

//==============================================================================


Blockly.Spin.scribbler_loop = function () {
    return 'repeat\n' + Blockly.Spin.statementToCode(this, 'LOOP');
};

Blockly.Spin.scribbler_limited_loop = function () {
    //var number_time = window.parseInt(this.getFieldValue('LOOP_COUNT'));
    var number_time = Blockly.Spin.valueToCode(this, 'LOOP_COUNT', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'repeat ' + number_time + '\n' + Blockly.Spin.statementToCode(this, 'LOOP');
};

Blockly.Spin.scribbler_exit_loop = function () {
    return 'quit\n';
};

Blockly.Spin.scribbler_wait = function () {
    var number_time = Blockly.Spin.valueToCode(this, 'WAITTIME', Blockly.Spin.ORDER_ATOMIC) || '0';
    var time_scale = this.getFieldValue('TIMESCALE');
    var code = 'waitcnt(clkfreq / ' + time_scale + ' * ' + number_time + ' + 1000 + cnt) {TODO: catch short wait periods} \n';
    return code;
};

Blockly.Spin.scribbler_if_line = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var line_condition = this.getFieldValue('LINE_CONDITION');
    var line_position = this.getFieldValue('LINE_POSITION');
    var line_color = this.getFieldValue('LINE_COLOR');
    var code = 'if Scribbler.SimpleLine(Scribbler#' + line_condition + ', Scribbler#' + line_position + ', Scribbler#' + line_color + ')\n';
    return code + Blockly.Spin.statementToCode(this, 'IF_LINE');
};

Blockly.Spin.scribbler_if_obstacle = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var obstacle_condition = this.getFieldValue('OBSTACLE_CONDITION');
    var obstacle_position = this.getFieldValue('OBSTACLE_POSITION');
    var code = 'if Scribbler.SimpleObstacle(Scribbler#' + obstacle_condition + ', Scribbler#' + obstacle_position + ')\n';
    return code + Blockly.Spin.statementToCode(this, 'IF_OBSTACLE');
};

Blockly.Spin.scribbler_if_light = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var light_condition = this.getFieldValue('LIGHT_CONDITION');
    var light_position = this.getFieldValue('LIGHT_POSITION');
    var code = 'if Scribbler.SimpleLight(Scribbler#' + light_condition + ', Scribbler#' + light_position + ')\n';
    return code + Blockly.Spin.statementToCode(this, 'IF_LIGHT');
};

Blockly.Spin.scribbler_if_stalled = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'if Scribbler.SimpleStalled(Scribbler#' + this.getFieldValue('STALLED_CONDITION') + ')\n';
    return code + Blockly.Spin.statementToCode(this, 'IF_STALLED');
};

Blockly.Spin.scribbler_if_button = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'if Scribbler.SimpleButton(Scribbler#' + this.getFieldValue('BUTTON_CONDITION') + ')\n';
    return code + Blockly.Spin.statementToCode(this, 'IF_BUTTON');
};

Blockly.Spin.scribbler_drive = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var drive_direction = this.getFieldValue('DRIVE_DIRECTION');
    var drive_angle = this.getFieldValue('DRIVE_ANGLE');
    var drive_speed = this.getFieldValue('DRIVE_SPEED');
    return 'Scribbler.SimpleDrive(Scribbler#' + drive_angle + ', ' + drive_direction + drive_speed + ')\n';
};

Blockly.Spin.scribbler_spin = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var spin_direction = this.getFieldValue('SPIN_DIRECTION');
    var spin_angle = this.getFieldValue('SPIN_ANGLE');
    var spin_speed = this.getFieldValue('SPIN_SPEED');
    var spin_resume = this.getFieldValue('SPIN_RESUME');
    return 'Scribbler.SimpleSpin(' + spin_direction + spin_angle + ', ' + spin_speed + ', ' + spin_resume + ')\n';
};

Blockly.Spin.scribbler_stop = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    return 'Scribbler.SimpleStop\n';
};

Blockly.Spin.scribbler_LED = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var left_color = this.getFieldValue('LEFT_COLOR')
    var center_color = this.getFieldValue('CENTER_COLOR')
    var right_color = this.getFieldValue('RIGHT_COLOR')
    var code = '';

    if (this.getFieldValue('LEFT_LED') == 'TRUE') {
        code = code + 'Scribbler.SetLED(Scribbler#LEFT, Scribbler#COLOR_' + left_color.substr(1,6) + ')\n';
    }
    if (this.getFieldValue('CENTER_LED') == 'TRUE') {
        code = code + 'Scribbler.SetLED(Scribbler#CENTER, Scribbler#COLOR_' + center_color.substr(1,6) + ')\n';
    }
    if (this.getFieldValue('RIGHT_LED') == 'TRUE') {
        code = code + 'Scribbler.SetLED(Scribbler#RIGHT, Scribbler#COLOR_' + right_color.substr(1,6) + ')\n';
    }

    return code;
};

Blockly.Spin.scribbler_play = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var note_duration = this.getFieldValue('NOTE_DURATION')
    var note_frequency = this.getFieldValue('NOTE_FREQUENCY')
    var note_octave = this.getFieldValue('NOTE_OCTAVE')
    var note_volume = this.getFieldValue('NOTE_VOLUME')
    return 'Scribbler.SimplePlay(' + note_frequency + note_octave + ', ' + note_duration + ', ' + note_volume + ')\n'
};

Blockly.Spin.move_motors = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var left_speed = Blockly.Spin.valueToCode(this, 'LEFT_MOTOR_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
    var right_speed = Blockly.Spin.valueToCode(this, 'RIGHT_MOTOR_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
    var movement_time = Blockly.Spin.valueToCode(this, 'MOTOR_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.MotorSet(' + left_speed + ', ' + right_speed + ', ' + movement_time + ')\n';
};

Blockly.Spin.move_motors_distance = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var distance_multiplier = this.getFieldValue('MULTIPLIER');
    var left_distance = Blockly.Spin.valueToCode(this, 'LEFT_MOTOR_DISTANCE', Blockly.Spin.ORDER_ATOMIC) || '0';
    var right_distance = Blockly.Spin.valueToCode(this, 'RIGHT_MOTOR_DISTANCE', Blockly.Spin.ORDER_ATOMIC) || '0';
    var top_speed = Blockly.Spin.valueToCode(this, 'MOTOR_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.MotorSetDistance(' + left_distance + distance_multiplier + ', ' + right_distance + distance_multiplier + ', ' + top_speed + ')\n';
};

Blockly.Spin.move_motors_angle = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var angle = Blockly.Spin.valueToCode(this, 'ROTATE_ANGLE', Blockly.Spin.ORDER_ATOMIC);
    var radius = Blockly.Spin.valueToCode(this, 'ROTATE_RADIUS', Blockly.Spin.ORDER_ATOMIC);
    var rotate_speed = Blockly.Spin.valueToCode(this, 'ROTATE_SPEED', Blockly.Spin.ORDER_ATOMIC);
    return 'Scribbler.MotorSetRotate(' + angle + ', ' + radius + ', ' + rotate_speed + ')\n';
};

Blockly.Spin.set_led = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var set_LED_choice = this.getFieldValue('LED_CHOICE');
    var set_LED_color = this.getFieldValue('LED_COLOR');
    return 'Scribbler.SetLED(Scribbler#' + set_LED_choice + ', Scribbler#' + set_LED_color + ')\n';
};

Blockly.Spin.play_tone = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var Frequency = Blockly.Spin.valueToCode(this, 'FREQUENCY', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Note_Duration = Blockly.Spin.valueToCode(this, 'NOTE_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Volume = Blockly.Spin.valueToCode(this, 'NOTE_VOLUME', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.SetVolume(' + Volume + ')\nScribbler.PlayNote(' + Frequency + ', 0, ' + Note_Duration + ')\n';
};

Blockly.Spin.play_polyphony = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var Frequency1 = Blockly.Spin.valueToCode(this, 'FREQUENCY_1', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Frequency2 = Blockly.Spin.valueToCode(this, 'FREQUENCY_2', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Polyphony_Duration = Blockly.Spin.valueToCode(this, 'POLYPHONY_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Volume = Blockly.Spin.valueToCode(this, 'POLYPHONY_VOLUME', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.SetVolume(' + Volume + ')\nScribbler.PlayNote(' + Frequency1 + ', ' + Frequency2 + ', ' + Polyphony_Duration + ')\n';
};

Blockly.Spin.line_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var line_sensor_choice = this.getFieldValue('LINE_SENSOR_CHOICE');
    var code = 'Scribbler.LineSensor(Scribbler#' + line_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.obstacle_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var obstacle_sensor_choice = this.getFieldValue('OBSTACLE_SENSOR_CHOICE');
    var code = 'Scribbler.ReadObstacle(Scribbler#' + obstacle_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.stall_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'Scribbler.Stalled';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.button_pressed = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'Scribbler.ButtonPressed';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.spinning_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'Scribbler.MotorsMoving';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.light_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var light_sensor_choice = this.getFieldValue('LGHT_SENSOR_CHOICE');
    var code = 'Scribbler.LightSensor(Scribbler#' + light_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.reset_button_presses = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'Scribbler.ResetButtonCount';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.button_presses = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'Scribbler.ButtonCount';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};
