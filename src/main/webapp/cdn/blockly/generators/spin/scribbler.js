/**
 *
 */

/**
 * @fileoverview 
 * @author 
 */
'use strict';

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
	this.appendValueInput("LEFT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("Move the left motor (-32,000 to 32,000) units");
	this.appendValueInput("RIGHT_MOTOR_DISTANCE")
		.setCheck("Number")
		.appendField("Move the right motor (-32,000 to 32,000) units");
	this.appendValueInput("MOTOR_SPEED")
		.setCheck("Number")
		.appendField("At a top speed of (1 to 100)%");

	this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
	//this.setTooltip('');
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
		.appendField("Around a radius of (0 to 4_400");
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

Blockly.Spin.move_motors = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var left_speed = Blockly.Spin.valueToCode(this, 'LEFT_MOTOR_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
    var right_speed = Blockly.Spin.valueToCode(this, 'RIGHT_MOTOR_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
    var movement_time = Blockly.Spin.valueToCode(this, 'MOTOR_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.MotorSet(' + left_speed + ', ' + right_speed + ', ' + movement_time + ')\n';
};

Blockly.Spin.move_motors_distance = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var left_distance = Blockly.Spin.valueToCode(this, 'LEFT_MOTOR_DISTANCE', Blockly.Spin.ORDER_ATOMIC) || '0';
    var right_distance = Blockly.Spin.valueToCode(this, 'RIGHT_MOTOR_DISTANCE', Blockly.Spin.ORDER_ATOMIC) || '0';
    var top_speed = Blockly.Spin.valueToCode(this, 'MOTOR_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.MotorSetDistance(' + left_distance + ', ' + right_distance + ', ' + top_speed + ')\n';
};

Blockly.Spin.move_motors_angle = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var angle = Blockly.Spin.valueToCode(this, 'ROTATE_ANGLE', Blockly.Spin.ORDER_ATOMIC) || '0';
    var radius = Blockly.Spin.valueToCode(this, 'ROTATE_RADIUS', Blockly.Spin.ORDER_ATOMIC) || '0';
    var rotate_speed = Blockly.Spin.valueToCode(this, 'ROTATE_SPEED', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.MotorSetRotate(' + angle + ', ' + radius + ', ' + rotate_speed + ')\n';
};

Blockly.Spin.set_led = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var set_LED_choice = this.getFieldValue('LED_CHOICE');
    var set_LED_color = this.getFieldValue('LED_COLOR');
    return 'Scribbler.SetLED(Scribbler#' + set_LED_choice + ', Scribbler#' + set_LED_color + ')\n';
};

Blockly.Spin.play_tone = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var Frequency = Blockly.Spin.valueToCode(this, 'FREQUENCY', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Note_Duration = Blockly.Spin.valueToCode(this, 'NOTE_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.PlayNote(' + Frequency + ', 0, ' + Note_Duration + ')\n';
};

Blockly.Spin.play_polyphony = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var Frequency1 = Blockly.Spin.valueToCode(this, 'FREQUENCY_1', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Frequency2 = Blockly.Spin.valueToCode(this, 'FREQUENCY_2', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Polyphony_Duration = Blockly.Spin.valueToCode(this, 'POLYPHONY_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.PlayNote(' + Frequency1 + ', ' + Frequency2 + ', ' + Polyphony_Duration + ')\n';
};

Blockly.Spin.set_volume = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var Volume = Blockly.Spin.valueToCode(this, 'VOLUME', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.SetVolume(' + Volume + ')\n';
};

Blockly.Spin.line_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var line_sensor_choice = this.getFieldValue('LINE_SENSOR_CHOICE');
    var code = 'Scribbler.LineSensor(Scribbler#' + line_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.obstacle_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var obstacle_sensor_choice = this.getFieldValue('OBSTACLE_SENSOR_CHOICE');
    var code = 'Scribbler.ReadObstacle(Scribbler#' + obstacle_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.stall_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var code = 'Scribbler.Stalled';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.spinning_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var code = 'Scribbler.MotorsMoving';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.light_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var light_sensor_choice = this.getFieldValue('LGHT_SENSOR_CHOICE');
    var code = 'Scribbler.LightSensor(Scribbler#' + light_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.reset_button_presses = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block_Wrapper"';
    var code = 'Scribbler.ResetButtonCount';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};
