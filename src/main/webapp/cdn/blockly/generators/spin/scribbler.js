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
        this.appendStatementInput("LOOP")
                .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(120);
    }
};

Blockly.Blocks.scribbler_exit_loop = {
    init: function () {
        this.appendDummyInput()
            .appendField("Exit loop")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
	//this.setTooltip('');
        //this.setHelpUrl('');
    }
};

Blockly.Blocks.scribbler_wait = {
    init: function () {
        this.appendDummyInput()
            .appendField("Wait")
            .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), 'TIMEWAITS3')
            .appendField(new Blockly.FieldDropdown([['seconds', ''], ['\u2152 of a second', ' / 10']]), 'TIMESCALE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
	//this.setTooltip('');
        //this.setHelpUrl('');
    }
};

Blockly.Blocks.scribbler_if_line = {
    init: function () {
        this.appendDummyInput()
            .appendField("If there")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['was', 'WAS']]), 'LINE_READ')
            .appendField("a")
            .appendField(new Blockly.FieldDropdown([['black', 'BLACK'], ['white', 'WHITE']]), 'LINE_COLOR')
            .appendField("line")
            .appendField(new Blockly.FieldDropdown([['directly under', 'UNDER'], ['on the left edge of', 'LEFT'], ['on the right edge of', 'RIGHT'], ['not under', 'NOT_UNDER']]), 'LINE_READ')
            .appendField("the Scribbler robot");
        this.appendStatementInput("IF_LINE")
            .appendField()
        this.appendDummyInput()
            .appendField("Otherwise");
        this.appendStatementInput("ELSE_LINE")
            .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(120);
    }
};

Blockly.Blocks.scribbler_if_obstacle = {
    init: function () {
        this.appendDummyInput()
            .appendField("If there")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['was', 'WAS']]), 'OBSTACLE_READ')
            .appendField("an obstacle")
            .appendField(new Blockly.FieldDropdown([['in front of', 'FRONT'], ['to the left of', 'LEFT'], ['to the right of', 'RIGHT'], ['not detectable', 'UNDETECTABLE']]), 'OBSTACLE_READ')
            .appendField("the Scribbler robot");
        this.appendStatementInput("IF_OBSTACLE")
            .appendField()
        this.appendDummyInput()
            .appendField("Otherwise");
        this.appendStatementInput("ELSE_OBSTACLE")
            .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(120);
    }
};

Blockly.Blocks.scribbler_if_light = {
    init: function () {
        this.appendDummyInput()
            .appendField("If there")
            .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['was', 'WAS']]), 'LIGHT_READ')
            .appendField("more light")
            .appendField(new Blockly.FieldDropdown([['in front', 'FRONT'], ['to the left', 'LEFT'], ['to the right', 'RIGHT'], ['on all sides', 'UNDETECTABLE']]), 'LIGHT_READ')
            .appendField("of the Scribbler robot");
        this.appendStatementInput("IF_LIGHT")
            .appendField()
        this.appendDummyInput()
            .appendField("Otherwise");
        this.appendStatementInput("ELSE_LIGHT")
            .appendField();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(120);
    }
};

Blockly.Blocks.scribbler_drive = {
    init: function () {
        this.appendDummyInput()
            .appendField("Drive")
            .appendField(new Blockly.FieldDropdown([['forward', ''], ['backward', '-']]), 'DRIVE_DIRECTION')
            .appendField("and go")
            .appendField(new Blockly.FieldDropdown([['straight', ''], ['slightly to the right', ''], ['gently to the right', ''], ['sharply to the right', ''], ['slightly to the left', ''], ['gently to the left', ''], ['sharply to the left', '']]), 'DRIVE_ANGLE')
            .appendField("at a")
            .appendField(new Blockly.FieldDropdown([['full', ''], ['quick', ''], ['gentle', ''], ['slow', '']]), 'DRIVE_SPEED')
            .appendField("speed");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
	//this.setTooltip('');
        //this.setHelpUrl('');
    }
};

Blockly.Blocks.scribbler_spin = {
    init: function () {
        this.appendDummyInput()
            .appendField("Spin in place")
            .appendField(new Blockly.FieldDropdown([['\u21BB', ''], ['\u21BA', '-']]), 'SPIN_DIRECTION')
            .appendField("for")
	    .appendField(new Blockly.FieldAngle(90), "SPIN_ANGLE")
            .appendField("then")
            .appendField(new Blockly.FieldDropdown([['stop', 'FALSE'], ['continue', 'TRUE']]), 'SPIN_RESUME')
            .appendField("driving");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
	//this.setTooltip('');
        //this.setHelpUrl('');
    }
};

Blockly.Blocks.scribbler_stop = {
    init: function () {
        this.appendDummyInput()
            .appendField("Stop driving")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
	//this.setTooltip('');
        //this.setHelpUrl('');
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
        //colour.setColours(['#f00','#0f0','#ff0','#000']).setColumns(2);
	var left_led_colors = new Blockly.FieldColour("#000");
	var center_led_colors = new Blockly.FieldColour("#000");
	var right_led_colors = new Blockly.FieldColour("#000");
	left_led_colors.setColours(['#f00','#0f0','#ff0','#000']).setColumns(2);
	center_led_colors.setColours(['#f00','#0f0','#ff0','#000']).setColumns(2);
	right_led_colors.setColours(['#f00','#0f0','#ff0','#000']).setColumns(2);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("To these colors:  ")
            .appendField(left_led_colors, "LEFT_COLOR")
            .appendField(center_led_colors, "CENTER_COLOR")
            .appendField(right_led_colors, "RIGHT_COLOR")
            .appendField(" ");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
	//this.setTooltip('');
        //this.setHelpUrl('');
    }
};

Blockly.Blocks.scribbler_play = {
    init: function () {
        this.appendDummyInput()
            .appendField("Play")
            .appendField(new Blockly.FieldDropdown([['\u{1D161}', '62.5'], ['\u{1D161}.', '93.75'], ['\u266A', '125'], ['\u266A.', '187.5'], ['\u2669', '250'], ['\u2669.', '375'], ['\u{1D15E}', '500'], ['\u{1D15E}.', '750'], ['\u{1d15D}', '1000'], ['\u{1d15D}.', '1500']]), 'NOTE_DURATION')
            .appendField(new Blockly.FieldDropdown([['A\u266D', '3322'], ['A', '3520'], ['A\u266F/B\u266D', '3729'], ['B', '3951'], ['C', '4186'], ['C\u266F/D\u266D', '4435'], ['D', '4699'], ['D\u266F/E\u266D', '4978'], ['E', '5274'], ['F', '5588'], ['F\u266F/G\u266D', '5920'], ['G', '6272'], ['G\u266F', '6645']]), 'NOTE_FREQUENCY')
            .appendField("in the")
            .appendField(new Blockly.FieldDropdown([['Eighth', ''], ['Double high', '~> 1'], ['Soprano', '~> 2'], ['Tenor', '~> 3'], ['Middle', '~> 4'], ['Low', '~> 5'], ['Deep', '~> 6'], ['Pedal', '~> 7']]), 'NOTE_OCTAVE')
            .appendField("octave at a")
            .appendField(new Blockly.FieldDropdown([['Loud', '15'], ['Medium', '7'], ['Quiet', '3']]), 'NOTE_VOLUME')
            .appendField("volume");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
	//this.setTooltip('');
        //this.setHelpUrl('');
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
		.appendField("Set right motor speed to (-100 to 100)%");
	this.appendValueInput("MOTOR_DURATION")
		.setCheck("Number")
		.appendField("For a duration of (1 to ?) ms");
	this.appendDummyInput()
		.appendField("Use 0 ms for continuous operation");

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
		.appendField(new Blockly.FieldDropdown([['milimeters', ' * 2_056 / 1_000'], ['centimeters', ' * 2_056 / 100'], ['inches', ' * 5_095 / 100'], ['tenths of an inch', ' * 5_095 / 1_000'], ['native units', '']]), 'MULTIPLIER');
	this.appendValueInput("LEFT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("Move the left motor");
	this.appendValueInput("RIGHT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("Move the right motor");
	this.appendValueInput("MOTOR_SPEED")
		.setCheck("Number")
		.appendField("At a top speed of (1 to 100)%");

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
		.appendField("Rotate the Scribbler robot (-1,080 to 1,080)°");
	this.appendValueInput("ROTATE_RADIUS")
		.setCheck("Number")
		.appendField("Around a radius of (0 to 4,400)")
	this.appendValueInput("ROTATE_SPEED")
		.setCheck("Number")
		.appendField("At a top speed of (1 to 100)%");
	this.appendDummyInput()
		.appendField("Use negative angle for counterclockwise rotation");
	this.appendDummyInput()
		.appendField("Use 0° to rotate in place");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('');
        //this.setHelpUrl('help/block-scribbler.html#motors');
    }
};

// Set one of the LEDs ot light red, green, or amber, or turn it off
Blockly.Blocks.set_led = {
    init: function () {
        this.appendDummyInput()
                .appendField("Set the")
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Center", "CENTER"], ["Right", "RIGHT"]]), "LED_CHOICE")
                .appendField("LED color to")
                .appendField(new Blockly.FieldDropdown([["Off", "OFF"], ["Red", "RED"], ["Amber", "AMBER"], ["Green", "GREEN"]]), "LED_COLOR");

	this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        //this.setHelpUrl('help/block-scribbler.html#LEDs');
    }
};

Blockly.Blocks.play_tone = {
    init: function () {
	this.appendValueInput("FREQUENCY")
		.setCheck("Number")
		.appendField("Play a tone of (1 to 10,000) Hz");
	this.appendValueInput("NOTE_DURATION")
		.setCheck("Number")
		.appendField("For a duration of (1 to 8,000) ms");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Frequencies are a range of 1 to 10,000 hertz with a duration of 1 to 8,000 milliseconds');
        //this.setHelpUrl('help/block-scribbler.html#Sound');
    }
};

Blockly.Blocks.play_polyphony = {
    init: function () {
	this.appendValueInput("FREQUENCY_1")
		.setCheck("Number")
		.appendField("Play a tone of (1 to 10,000) Hz");
	this.appendValueInput("FREQUENCY_2")
		.setCheck("Number")
		.appendField("and a tone of (1 to 10,000) Hz");
	this.appendValueInput("POLYPHONY_DURATION")
		.setCheck("Number")
		.appendField("For a duration of (1 to 8,000) ms");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Frequencies are a range of 1 to 10,000 hertz with a duration of 1 to 8,000 milliseconds');
        //this.setHelpUrl('help/block-scribbler.html#Sound');
    }
};

Blockly.Blocks.set_volume = {
    init: function () {
	this.appendValueInput("VOLUME")
		.setCheck("Number")
		.appendField("Set the volume to (0 to 100)%");

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
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Right", "RIGHT"]]), "LINE_SENSOR_CHOICE")
                .appendField("line sensor reflectivity");
        this.appendDummyInput("")
                .appendField("from 0% to 100% of sensor range");

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
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Right", "RIGHT"]]), "OBSTACLE_SENSOR_CHOICE")
                .appendField("obstacle present");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns 0 if there is no obstacle and 1 if there is an obstacle');
        //this.setHelpUrl('help/block-scribbler.html#Obstacle_Sensor');
    }
};

Blockly.Blocks.stall_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("Scribbler robot currently stalled");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.spinning_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("Wheels currently moving");

	this.setOutput(true, "Boolean");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns 0 if not stalled and 1 if stalled');
        //this.setHelpUrl('help/block-scribbler.html#Stall_Sensor');
    }
};

Blockly.Blocks.light_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Center", "CENTER"], ["Right", "RIGHT"]]), "LGHT_SENSOR_CHOICE")
                .appendField("sensor ambient light");
        this.appendDummyInput("")
                .appendField("from 0% to 100% of sensor range");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Reads ambient light, in a range of 0 to 255');
        //this.setHelpUrl('help/block-scribbler.html#Light_Sensor');
    }
};

Blockly.Blocks.reset_button_presses = {
    init: function () {
        this.appendDummyInput("")
                .appendField("Reset button presses during last reset");

	this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('Returns the number of reset button presses during the last reset');
        //this.setHelpUrl('help/block-scribbler.html#Reset_Button_Presses');
    }
};

Blockly.Spin.scribbler_wait = function () {
    var number_time = window.parseFloat(this.getFieldValue('TIMEWAITS3'));
    var time_scale = this.getFieldValue('TIMESCALE');
    var code = 'waitcnt(clkfreq' + time_scale + ' * ' + number_time + ' + 1000 + cnt) {TODO: catch short wait periods} \n';
    return code;
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

    var angle = Blockly.Spin.valueToCode(this, 'ROTATE_ANGLE', Blockly.Spin.ORDER_ATOMIC) || '0';
    var radius = Blockly.Spin.valueToCode(this, 'ROTATE_RADIUS', Blockly.Spin.ORDER_ATOMIC) || '0';
    var rotate_speed = Blockly.Spin.valueToCode(this, 'ROTATE_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
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
    return 'Scribbler.PlayNote(' + Frequency + ', 0, ' + Note_Duration + ')\n';
};

Blockly.Spin.play_polyphony = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var Frequency1 = Blockly.Spin.valueToCode(this, 'FREQUENCY_1', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Frequency2 = Blockly.Spin.valueToCode(this, 'FREQUENCY_2', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Polyphony_Duration = Blockly.Spin.valueToCode(this, 'POLYPHONY_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.PlayNote(' + Frequency1 + ', ' + Frequency2 + ', ' + Polyphony_Duration + ')\n';
};

Blockly.Spin.set_volume = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    if (Blockly.Spin.setups_[ 'setup_scribbler' ] === undefined) {
        Blockly.Spin.setups_[ 'setup_scribbler' ] = 'Scribbler.Start';
    }

    var Volume = Blockly.Spin.valueToCode(this, 'VOLUME', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.SetVolume(' + Volume + ')\n';
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
