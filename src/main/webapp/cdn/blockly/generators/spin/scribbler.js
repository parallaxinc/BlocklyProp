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
    },
};

Blockly.Blocks.scribbler_limited_loop = {
    init: function () {
        this.appendDummyInput()
            .appendField("loop")
            .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'LOOP_COUNT')
            .appendField("times");
        this.appendStatementInput("LOOP")

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.Blocks.scribbler_exit_loop = {
    init: function () {
        this.appendDummyInput()
            .appendField("exit loop")
        this.setPreviousStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.Blocks.scribbler_simple_wait = {
    init: function () {
        this.appendDummyInput()
            .appendField("wait")
            .appendField(new Blockly.FieldTextInput('5', Blockly.FieldTextInput.numberValidator), 'WAITTIME')
            .appendField(new Blockly.FieldDropdown([['second(s) (1 to 53)', '1'], ['tenth(s) of a second (1 to 535)', '10'], ['millisecond(s) (1 to 53,500)', '1000']]), 'TIMESCALE');
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
            .appendField(new Blockly.FieldDropdown([['second(s) (1 to 53)', '1'], ['tenth(s) of a second (1 to 535)', '10'], ['millisecond(s) (1 to 53,500)', '1000']]), 'TIMESCALE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
    }
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
            .appendField("if an obstacle")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'OBSTACLE_CONDITION')
            .appendField(new Blockly.FieldDropdown([['in front of', 'CENTER'], ['to the left of', 'LEFT'], ['to the right of', 'RIGHT'], ['detected by', 'DETECTED']]), 'OBSTACLE_POSITION')
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
            .appendField("if the most light")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'LIGHT_CONDITION')
            .appendField(new Blockly.FieldDropdown([['in front', 'CENTER'], ['to the left', 'LEFT'], ['to the right', 'RIGHT'], ['on all sides', 'DETECTED']]), 'LIGHT_POSITION')
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
            .appendField("if the Scribbler robot")
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
            .appendField("if the red button")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT'], ['was', 'WAS'], ['was not', 'WAS_NOT']]), 'BUTTON_CONDITION')
            .appendField("pressed")
        this.appendStatementInput("IF_BUTTON")
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.scribbler_if_random = {
    init: function () {
        this.appendDummyInput()
            .appendField("if a virtual coin flip")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['was', 'WAS']]), 'RANDOM_CONDITION')
            .appendField(new Blockly.FieldDropdown([['heads', ''], ['tails', '_NOT']]), 'RANDOM_INVERT')
        this.appendStatementInput("IF_RANDOM")
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    }
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
    }
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
    }
};

Blockly.Blocks.scribbler_stop = {
    init: function () {
        this.appendDummyInput()
            .appendField("stop driving")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
    }
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
    }
};

Blockly.Blocks.scribbler_play = {
    init: function () {
        this.appendDummyInput()
            .appendField("play a")
            .appendField(new Blockly.FieldDropdown([['double high', '1'], ['soprano', '2'], ['tenor', '3'], ['middle', '4'], ['low', '5'], ['deep', '6'], ['pedal', '7']]), 'NOTE_OCTAVE')
            //.appendField(new Blockly.FieldDropdown([['double high', '1'], ['soprano', '2'], ['tenor', '3'], ['middle', '4'], ['low', '5'], ['deep', '6'], ['pedal', '7']]), 'NOTE_OCTAVE')
            .appendField(new Blockly.FieldDropdown([['A\u266D', '3322'], ['A', '3520'], ['A\u266F/B\u266D', '3729'], ['B', '3951'], ['C', '4186'], ['C\u266F/D\u266D', '4435'], ['D', '4699'], ['D\u266F/E\u266D', '4978'], ['E', '5274'], ['F', '5588'], ['F\u266F/G\u266D', '5920'], ['G', '6272'], ['G\u266F', '6645']]), 'NOTE_FREQUENCY')
            .appendField("for a")
            .appendField(new Blockly.FieldDropdown([['sixteenth', '63'], ['dotted sixteenth', '94'], ['eighth', '125'], ['dotted eighth', '188'], ['quarter', '250'], ['dotted quarter', '375'], ['half', '500'], ['dotted half', '750'], ['whole', '1000'], ['dotted whole', '1500']]), 'NOTE_DURATION')
            .appendField("note at a")
            .appendField(new Blockly.FieldDropdown([['loud', '100'], ['medium', '50'], ['quiet', '25']]), 'NOTE_VOLUME')
            .appendField("volume");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
    }
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
        //this.setHelpUrl('help/block-scribbler.html#motors');
    }
};

// Move the motors...
Blockly.Blocks.move_motors_distance = {
    init: function () {
	this.appendDummyInput()
		.appendField("in ")
		.appendField(new Blockly.FieldDropdown([['inches (-633 to 633)', ' * 100_000 / 1933'], ['tenths of an inch (-6,333 to 6,333)', ' * 10_000 / 1933'], ['centimeters (-1,608 to 1,608)', ' * 10_000 / 491'], ['millimeters (-16,088 to 16,088)', ' * 1_000 / 491'], ['encoder counts (-32,767 to 32,767)', '']]), 'MULTIPLIER');
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
        //this.setHelpUrl('help/block-scribbler.html#motors');
    }
};

// Move the motors...
Blockly.Blocks.move_motors_angle = {
    init: function () {
	this.appendValueInput("ROTATE_ANGLE")
		.setCheck("Number")
		.appendField("rotate the Scribbler robot (-1,080 to 1,080)\u00B0");
	this.appendValueInput("ROTATE_RADIUS")
		.setCheck("Number")
		.appendField("around a radius in")
		.appendField(new Blockly.FieldDropdown([['inches (-85 to 85) of', ' * 100_000 / 1933'], ['tenths of an inch (-850 to 850) of', ' * 10_000 / 1933'], ['centimeters (-216 to 216) of', ' * 10_000 / 491'], ['millimeters (-2,160 to 2,160) of', ' * 1_000 / 491'], ['encoder counts (-4,400 to 4,400) of', '']]), 'RADIUS_MULTIPLIER');
	this.appendValueInput("ROTATE_SPEED")
		.setCheck("Number")
		.appendField("at a top speed of (1 to 100)%");

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
		.appendField("play a tone of (1 to 10,000) Hz");
	this.appendValueInput("FREQUENCY_2")
		.setCheck("Number")
		.appendField("and a tone of (1 to 10,000) Hz");
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
	//this.setTooltip('Frequencies are a range of 1 to 10,000 hertz with a duration of 1 to 8,000 milliseconds');
        //this.setHelpUrl('help/block-scribbler.html#Sound');
    }
};

Blockly.Blocks.line_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "LINE_SENSOR_CHOICE")
                .appendField("line sensor reflectivity (0% to 100%)");

	this.setInputsInline(false);
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	//this.setTooltip('Reads surface reflectivity, in a range of 0 to 100');
        //this.setHelpUrl('help/block-scribbler.html#Line_Sensor');
    }
};

Blockly.Blocks.obstacle_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("an obstacle is present to the")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "OBSTACLE_SENSOR_CHOICE")
                .appendField("(true or false)");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('input'));
	//this.setTooltip('Returns 0 if there is no obstacle and 1 if there is an obstacle');
        //this.setHelpUrl('help/block-scribbler.html#Obstacle_Sensor');
    }
};

Blockly.Blocks.stall_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("tail wheel is currently stalled (true or false)");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('input'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.button_pressed = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the red botton is currently pressed");
        this.appendDummyInput("")
                .appendField("(true or false)");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('input'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.spinning_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("drive wheels are currently stalled (true or false)");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('input'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.light_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["center", "CENTER"], ["right", "RIGHT"]]), "LGHT_SENSOR_CHOICE")
                .appendField("light sensor reading (0% to 100%)");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	//this.setTooltip('Reads ambient light, in a range of 0 to 255');
        //this.setHelpUrl('help/block-scribbler.html#Light_Sensor');
    }
};

Blockly.Blocks.reset_button_presses = {
    init: function () {
        this.appendDummyInput("")
                .appendField("reset button presses during the last reset");
        this.appendDummyInput("")
                .appendField("(0 to 8)");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
    }
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
    }
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
    }
};

Blockly.Blocks.scribbler_ping = {
    init: function () {
        this.appendDummyInput("")
                .appendField("distance in")
                .appendField(new Blockly.FieldDropdown([['inches (1 to 125)', '11848'], ['tenths of an inch (8 to 1,249)', '1185'], ['centimeters (4 to 635)', '2332'], ['millimeters (39 to 6352)', '233']]), "PING_RANGE")
                .appendField("from Ping))) sensor on")
                .appendField(new Blockly.FieldDropdown([['P0', '0'], ['P1', '1'], ['P2', '2'], ['P3', '3'], ['P4', '4'], ['P5', '5']]), "PING_PIN");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
	//this.setTooltip('Reads ambient light, in a range of 0 to 255');
        //this.setHelpUrl('help/block-scribbler.html#Light_Sensor');
    }
};

Blockly.Blocks.spin_integer = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'INT_VALUE');

        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('math'));
    }
};

Blockly.Blocks.scribbler_boolean = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([['true', 'TRUE'], ['false', 'FALSE']]), 'BOOL');
	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('math'));
    }
};

Blockly.Blocks.scribbler_random_boolean = {
    init: function () {
        this.appendDummyInput("")
                .appendField("random true/false");
	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('math'));
    }
};

Blockly.Blocks.scribbler_random_number = {
    init: function () {
        this.appendValueInput("LOW")
                .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
                .appendField("random number from");
        this.appendValueInput("HIGH")
                .setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
                .appendField("to");
        this.setInputsInline(true);
	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('math'));
    }
};

Blockly.Blocks.spin_comment = {
    init: function () {
        this.appendDummyInput("")
                .appendField("note:")
                .appendField(new Blockly.FieldTextInput(""), "COMMENT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
    }
};

Blockly.Blocks.factory_reset = {
    init: function () {
        this.appendDummyInput()
            .appendField("restore_s3_demo");
        this.setColour(colorPalette.getColor('programming'));
    }
};

//==============================================================================


Blockly.Spin.scribbler_loop = function () {
    return 'repeat\n' + Blockly.Spin.statementToCode(this, 'LOOP');
};

Blockly.Spin.scribbler_limited_loop = function () {
    var number_time = window.parseInt(this.getFieldValue('LOOP_COUNT'));
    return 'repeat ' + number_time + '\n' + Blockly.Spin.statementToCode(this, 'LOOP');
};

Blockly.Spin.scribbler_exit_loop = function () {
    return 'quit \'	The \"exit loop\" block must be placed inside a loop block!\n';
};

Blockly.Spin.scribbler_simple_wait = function () {
    var number_time = window.parseInt(this.getFieldValue('WAITTIME'));
    var time_scale = this.getFieldValue('TIMESCALE');
    //TODO: catch short wait periods
    var code = 'waitcnt(clkfreq / ' + time_scale + ' * ' + number_time + ' + 1000 + cnt)\n';
    return code;
};

Blockly.Spin.scribbler_wait = function () {
    var number_time = Blockly.Spin.valueToCode(this, 'WAITTIME', Blockly.Spin.ORDER_ATOMIC) || '0';
    var time_scale = this.getFieldValue('TIMESCALE');
    //TODO: catch short wait periods
    var code = 'waitcnt(clkfreq / ' + time_scale + ' * ' + number_time + ' + 1000 + cnt)\n';
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

Blockly.Spin.scribbler_if_random = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'if Scribbler.SimpleRandom(Scribbler#' + this.getFieldValue('RANDOM_CONDITION') + this.getFieldValue('RANDOM_INVERT') + ')\n';
    return code + Blockly.Spin.statementToCode(this, 'IF_RANDOM');
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
    return 'Scribbler.SimpleSpin(' + spin_direction + spin_angle + ', ' + spin_speed + ', 0)\n';
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

    var note_octave = this.getFieldValue('NOTE_OCTAVE')
    var note_frequency = this.getFieldValue('NOTE_FREQUENCY')
    var note_duration = this.getFieldValue('NOTE_DURATION')
    var note_volume = this.getFieldValue('NOTE_VOLUME')
    return 'Scribbler.SimplePlay(' + note_frequency + ' ~> ' + note_octave + ', ' + note_duration + ', ' + note_volume + ')\n'
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
    var radius_multiplier = this.getFieldValue('RADIUS_MULTIPLIER');
    var angle = Blockly.Spin.valueToCode(this, 'ROTATE_ANGLE', Blockly.Spin.ORDER_ATOMIC);
    var radius = Blockly.Spin.valueToCode(this, 'ROTATE_RADIUS', Blockly.Spin.ORDER_ATOMIC);
    var rotate_speed = Blockly.Spin.valueToCode(this, 'ROTATE_SPEED', Blockly.Spin.ORDER_ATOMIC);
    return 'Scribbler.MotorSetRotate(' + angle + ', ' + radius + radius_multiplier + ', ' + rotate_speed + ')\n';
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

    var code = 'not Scribbler.MotorsMoving';
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

Blockly.Spin.scribbler_random_boolean = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var code = 'Scribbler.BooleanRandom';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.scribbler_ping = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';

    var Range = window.parseInt(this.getFieldValue('PING_RANGE'));
    var Pin = window.parseInt(this.getFieldValue('PING_PIN'));
    var code = 'Scribbler.Ping(' + Pin + ') / ' + Range;
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.scribbler_servo = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler_servo' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler_servo' ] = 'Scribbler.ServoStart';
    }

    var Angle = Blockly.Spin.valueToCode(this, 'SERVO_ANGLE', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Pin = window.parseInt(this.getFieldValue('SERVO_PIN'));
    return 'Scribbler.Servo(' + Pin + ', ' + Angle + ')\n';
};

Blockly.Spin.scribbler_stop_servo = function () {
    if (Blockly.Spin.setups_[ 'setup_scribbler_servo' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler_servo' ] = 'ScribblerServo.Start';
    }

    var Pin = window.parseInt(this.getFieldValue('SERVO_PIN'));
    return 'Scribbler.ServoStop(' + Pin + ')\n';
};

Blockly.Spin.spin_integer = function () {
    // Numeric value.
    var code = window.parseInt(this.getFieldValue('INT_VALUE'));
    // -4.abs() returns -4 in Dart due to strange order of operation choices.
    // -4 is actually an operator and a number.  Reflect this in the order.
    var order = code < 0 ?
            Blockly.Spin.ORDER_UNARY_PREFIX : Blockly.Spin.ORDER_ATOMIC;
    return [code, order];
};

Blockly.Spin.scribbler_boolean = function () {
    // Boolean values true and false.
    var code = this.getFieldValue('BOOL');
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.scribbler_random_number = function () {
    var low_number = Blockly.Spin.valueToCode(this, 'LOW', Blockly.Spin.ORDER_ATOMIC) || '0';
    var high_number = Blockly.Spin.valueToCode(this, 'HIGH', Blockly.Spin.ORDER_ATOMIC) || '0';

    var code = 'Scribbler.RandomRange(' + low_number + ', ' + high_number + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.spin_comment = function () {
    return "' " + this.getFieldValue('COMMENT') + '\n';
};

Blockly.Spin.factory_reset = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';

    var code = 'scribbler.RestoreS3Demo';
    return [code, Blockly.Spin.ORDER_ATOMIC];
    
};
