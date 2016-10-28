/**
 * Visual Blocks Language
 *
 * Copyright 2015 Michel Lampo.
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
 * @fileoverview Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.make_pin = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_MAKE_PIN_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("make PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendField(new Blockly.FieldDropdown([["high", "HIGH"], ["low", "LOW"], ["toggle", "TOGGLE"], ["input", "INPUT"], ["reverse", "REVERSE"]]), "ACTION");
    }
};

Blockly.Blocks.make_pin_input = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_MAKE_PIN_INPUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("make PIN");
        this.appendValueInput('PIN')
                .setCheck('Number');
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["high", "HIGH"], ["low", "LOW"], ["toggle", "TOGGLE"], ["input", "INPUT"], ["reverse", "REVERSE"]]), "ACTION");
    }
};

Blockly.Blocks.check_pin = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_CHECK_PIN_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("check PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks.check_pin_input = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_CHECK_PIN_INPUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("check PIN");
        this.appendValueInput('PIN')
                .setCheck('Number');
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
};

Blockly.Blocks.set_pins = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_SET_PINS_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        var start_pin = [];
        for (var i = 0; i < 14; i++) {
            start_pin.push([i.toString(), i.toString()]);
        }
        var pin_count = [];
        for (var i = 0; i < 14; i++) {
            pin_count.push([i.toString(), i.toString()]);
        }
        this.appendDummyInput("")
                .appendField("set the")
                .appendField(new Blockly.FieldDropdown([["states", "STATE"], ["directions", "DIRECTION"]], function (action) {
                    this.sourceBlock_.updateShape_({"ACTION": action});
                }), "ACTION")
                .appendField("from PIN")
                .appendField(new Blockly.FieldDropdown(pin_count, function (startPin) {
                    this.sourceBlock_.updateShape_({"START_PIN": startPin});
                }), "START_PIN")
                .appendField("to PIN")
                .appendField(new Blockly.FieldDropdown(start_pin, function (pinCount) {
                    this.sourceBlock_.updateShape_({"PIN_COUNT": pinCount});
                }), "PIN_COUNT");
        this.appendDummyInput("PINS")
                .appendField("values:")
                .appendField("P0:")
                .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "P0");
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('ACTION');
        container.setAttribute('action', action);
        var pinCount = this.getFieldValue('PIN_COUNT');
        container.setAttribute('pin_count', pinCount);
        var startPin = this.getFieldValue('START_PIN');
        container.setAttribute('start_pin', startPin);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        var pinCount = xmlElement.getAttribute('pin_count');
        var startPin = xmlElement.getAttribute('start_pin');
        //var type = this.getFieldValue('TYPE');
        this.updateShape_({"ACTION": action, "PIN_COUNT": pinCount, "START_PIN": startPin});
    },
    updateShape_: function (details) {
        var data = [];
        for (var i = 0; i < 32; i++) {
            data.push(this.getFieldValue('P' + i));
        }

        var action = details['ACTION'];
        if (details['ACTION'] === undefined) {
            action = this.getFieldValue('ACTION');
        }
        var pinCount = details['PIN_COUNT'];
        if (details['PIN_COUNT'] === undefined) {
            pinCount = this.getFieldValue('PIN_COUNT');
        }
        var startPin = details['START_PIN'];
        if (details['START_PIN'] === undefined) {
            startPin = this.getFieldValue('START_PIN');
        }
        pinCount = Number(pinCount);
        startPin = Number(startPin);

        this.removeInput('PINS');
        this.appendDummyInput("PINS")
                .appendField("Values:");
        var inputPins = this.getInput('PINS');
        for (var i = 0; i < (pinCount - startPin + 1); i++) {
            var pin = startPin + i;
            if (action === 'STATE') {
                inputPins.appendField("P" + pin + ":")
                        .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "P" + pin);
            } else if (action === 'DIRECTION') {
                inputPins.appendField("P" + pin + ":")
                        .appendField(new Blockly.FieldDropdown([["OUT", "1"], ["IN", "0"]]), "P" + pin);
            }
        }

        for (var i = 0; i < 32; i++) {
            if (this.getField('P' + i) && data[i] !== null) {
                this.setFieldValue(data[i], 'P' + i);
            }
        }
    }
};

Blockly.Blocks.pulse_in = {
    helpUrl: Blockly.MSG_ANALOG_PULSE_IN_OUT_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_PULSE_IN_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("pulse-in PIN")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput()
            .appendField("read")
            .appendField(new Blockly.FieldDropdown([["negative/low pulses", "0"], ["positive/high pulses", "1"]]), "STATE");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

// Code generator is located in base.js
Blockly.Blocks.pulse_out = {
    helpUrl: Blockly.MSG_ANALOG_PULSE_IN_OUT_HELPURL,
    init: function() {
	this.setTooltip(Blockly.MSG_PULSE_OUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
            .appendField("pulse-out PIN")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendValueInput('PULSE_LENGTH')
            .appendField("pulse length (" + "\u00B5" + "s)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
