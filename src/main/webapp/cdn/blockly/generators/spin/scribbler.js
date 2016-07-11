/**
 *
 */

/**
 * @fileoverview 
 * @author 
 */
'use strict';

// Move the motors for 0 to 5000 ms, or indefinately
Blockly.Blocks.move_motors = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#motors');
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput()
                .appendField("Set Left Motor Power to");
        this.appendValueInput('LEFT_MOTOR_POWER', 'Number');
                //.setCheck('Number');
        this.appendDummyInput()
                .appendField("Set Right Motor Power to");
        this.appendValueInput('RIGHT_MOTOR_POWER', 'Number');
                //.setCheck('Number');
        this.appendDummyInput()
                .appendField("and Drive for");
        this.appendValueInput('MOTOR_DURATION', 'Number')
                //.setCheck('Number')
                .appendField("Milliseconds");

    }
};

// Set one of the LEDs ot light red, green, or amber, or turn it off
Blockly.Blocks.set_led = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#LEDs');
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("Set the")
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Center", "CENTER"], ["right", "RIGHT"]]), "LED_CHOICE")
                .appendField("LED color to")
                .appendField(new Blockly.FieldDropdown([["Off", "OFF"], ["Red", "RED"], ["Amber", "AMBER"], ["Green", "GREEN"]]), "LED_COLOR");
    }
};

Blockly.Blocks.play_tone = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#Sound');
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput()
                .appendField("Play a");
        this.appendValueInput('FREQUENCY_1', 'Number');
                //.setCheck('Number');
        this.appendDummyInput()
                .appendField("Hz tone and a");
        this.appendValueInput('FREQUENCY_2', 'Number');
                //.setCheck('Number');
        this.appendDummyInput()
                .appendField("Hz tone for", 'Number');
        this.appendValueInput('NOTE_DURATION')
                //.setCheck('Number');
        this.appendDummyInput()
                .appendField("milliseconds");
    }
};

Blockly.Blocks.line_sensor = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#Line_Sensor');
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["right", "RIGHT"]]), "LINE_SENSOR_CHOICE")
                .appendField(" Line Sensor Value");
        this.setOutput(true, 'Boolean');
    }
};

Blockly.Blocks.obstacle_sensor = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#Line_Sensor');
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["right", "RIGHT"]]), "OBSTACLE_SENSOR_CHOICE")
                .appendField(" Obstacle Present");
        this.setOutput(true, 'Boolean');
    }
};

Blockly.Blocks.stall_sensor = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#Line_Sensor');
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("Stalled");
        this.setOutput(true, 'Boolean');
    }
};

Blockly.Blocks.light_sensor = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#Line_Sensor');
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Center", "CENTER"], ["right", "RIGHT"]]), "LGHT_SENSOR_CHOICE")
                .appendField(" Light Sensor Value");
        this.setOutput(true, 'Boolean');
    }
};

Blockly.Blocks.reset_button_presses = {
    init: function () {
        //this.setHelpUrl('help/block-scribbler.html#Line_Sensor');
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("Reset Button Presses");
        this.setOutput(true, 'Boolean');
    }
};

Blockly.Spin.move_motors = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var left_power = Blockly.Spin.valueToCode(this, 'LEFT_MOTOR_POWER', Blockly.Spin.ORDER_ATOMIC) || '0';
    var right_power = Blockly.Spin.valueToCode(this, 'RIGHT_MOTOR_POWER', Blockly.Spin.ORDER_ATOMIC) || '0';
    var movement_time = Blockly.Spin.valueToCode(this, 'MOTOR_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.MotorSet(' + left_power + ', ' + right_power + ', ' + movement_time + ')\n';
};

Blockly.Spin.set_led = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var set_LED_choice = this.getFieldValue('LED_CHOICE');
    var set_LED_color = this.getFieldValue('LED_COLOR');
    return 'Scribbler.SetLED(Scribbler#' + set_LED_choice + ', ' + set_LED_color + ')\n';
};

Blockly.Spin.play_tone = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var Frequency1 = Blockly.Spin.valueToCode(this, 'FREQUENCY_1', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Frequency2 = Blockly.Spin.valueToCode(this, 'FREQUENCY_2', Blockly.Spin.ORDER_ATOMIC) || '0';
    var Note_Duration = Blockly.Spin.valueToCode(this, 'NOTE_DURATION', Blockly.Spin.ORDER_ATOMIC) || '0';
    return 'Scribbler.PlayNote(' + Frequency1 + ', ' + Frequency2 + ', ' + Note_Duration + ')\n';
};

Blockly.Spin.line_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var line_sensor_choice = this.getFieldValue('LINE_SENSOR_CHOICE');
    var code = 'Scribbler.LineSensor(Scribbler#' + line_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.obstacle_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var obstacle_sensor_choice = this.getFieldValue('OBSTACLE_SENSOR_CHOICE');
    var code = 'Scribbler.ReadObstacle(Scribbler#' + obstacle_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.stall_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var code = 'Scribbler.Stalled';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.light_sensor = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var light_sensor_choice = this.getFieldValue('LGHT_SENSOR_CHOICE');
    var code = 'Scribbler.LightSensor(Scribbler#' + light_sensor_choice + ')';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.reset_button_presses = function () {
    Blockly.Spin.definitions_[ "include_scribbler" ] = 'OBJscribbler    : "Block Wrapper"';
    var code = 'Scribbler.ResetButtonCount';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};
