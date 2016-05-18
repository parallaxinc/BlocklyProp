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
    init: function () {
        this.setHelpUrl('help/block-digitalpin.html#write');
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("Make Pin#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendField(new Blockly.FieldDropdown([["high", "HIGH"], ["low", "LOW"], ["toggle", "TOGGLE"], ["input", "INPUT"], ["reverse", "REVERSE"]]), "ACTION");
    }
};

Blockly.Blocks.make_pin_input = {
    init: function () {
        this.setHelpUrl('help/block-digitalpin.html#write');
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("Make Pin#");
        this.appendValueInput('PIN')
                .setCheck('Number');
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["high", "HIGH"], ["low", "LOW"], ["toggle", "TOGGLE"], ["input", "INPUT"], ["reverse", "REVERSE"]]), "ACTION");
    }
};

Blockly.Blocks.check_pin = {
    helpUrl: 'help/block-digitalpin.html#read',
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("Check PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

Blockly.Blocks.check_pin_input = {
    helpUrl: 'help/block-digitalpin.html#read',
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("Check PIN#");
        this.appendValueInput('PIN')
                .setCheck('Number');
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip('');
    }
};

Blockly.Blocks.set_pins = {
    init: function () {
        this.setHelpUrl('help/block-digitalpin.html#write');
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        var start_pin = [];
        for (var i = 0; i < 32; i++) {
            start_pin.push([i.toString(), i.toString()]);
        }
        var pin_count = [];
        for (var i = 1; i <= 32; i++) {
            pin_count.push([i.toString(), i.toString()]);
        }
        this.appendDummyInput("")
                .appendField("Set the")
                .appendField(new Blockly.FieldDropdown([["state", "STATE"], ["direction", "DIRECTION"]], function (action) {
                    this.sourceBlock_.updateShape_({"ACTION": action});
                }), "ACTION")
                .appendField("of")
                .appendField(new Blockly.FieldDropdown(pin_count, function (pinCount) {
                    this.sourceBlock_.updateShape_({"PIN_COUNT": pinCount});
                }), "PIN_COUNT")
                .appendField("pins starting at #")
                .appendField(new Blockly.FieldDropdown(start_pin, function (startPin) {
                    this.sourceBlock_.updateShape_({"START_PIN": startPin});
                }), "START_PIN");
        this.appendDummyInput("PINS")
                .appendField("Values:")
                .appendField("p0:")
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
        for (var i = 0; i < pinCount; i++) {
            var pin = startPin + i;
            if (action === 'STATE') {
                inputPins.appendField("p" + pin + ":")
                        .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "P" + pin);
            } else if (action === 'DIRECTION') {
                inputPins.appendField("p" + pin + ":")
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
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette('io'));
        this.appendDummyInput("")
            .appendfield("Pulse-in PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([["Negative/low pulses", "0"], ["Positive/high pulses", "1"]]), "STATE");
        
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

Blockly.Blocks.pulse_out = {
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette('io'));
        this.appendDummyInput("")
            .appendfield("Pulse-out PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendValueInput('PULSE_LENGTH')
            .appendField("Pulse length");
    
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
}
