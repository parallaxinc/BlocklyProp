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

Blockly.Blocks.make_pin = {
    init: function () {
        this.setHelpUrl('help/block-digitalpin.html#write');
        this.setColour(230);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("Make PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendField(new Blockly.FieldDropdown([["high", "HIGH"], ["low", "LOW"], ["toggle", "TOGGLE"], ["input", "INPUT"], ["reverse", "REVERSE"]]), "ACTION");
    }
};

Blockly.Blocks.make_pin_input = {
    init: function () {
        this.setHelpUrl('help/block-digitalpin.html#write');
        this.setColour(230);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("Make PIN#");
        this.appendValueInput('PIN')
                .setCheck('Number');
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([["high", "HIGH"], ["low", "LOW"], ["toggle", "TOGGLE"], ["input", "INPUT"], ["reverse", "REVERSE"]]), "ACTION");
    }
};

Blockly.propc.make_pin = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'high(' + dropdown_pin + ');\n';
        case "LOW":
            return 'low(' + dropdown_pin + ');\n';
        case "TOGGLE":
            return 'toggle(' + dropdown_pin + ');\n';
        case "INPUT":
            return 'set_direction(' + dropdown_pin + ', 0);\n';
        case "REVERSE":
            return 'reverse(' + dropdown_pin + ');\n';
    }
};

Blockly.propc.make_pin_input = function () {
    var pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || 0; //Number(this.getFieldValue('PIN'));
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'high(' + pin + ');\n';
        case "LOW":
            return 'low(' + pin + ');\n';
        case "TOGGLE":
            return 'toggle(' + pin + ');\n';
        case "INPUT":
            return 'set_direction(' + pin + ', 0);\n';
        case "REVERSE":
            return 'reverse(' + pin + ');\n';
    }
};

Blockly.Blocks.check_pin = {
    helpUrl: 'help/block-digitalpin.html#read',
    init: function () {
        this.setColour(230);
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
        this.setColour(230);
        this.appendDummyInput("")
                .appendField("Check PIN#");
        this.appendValueInput('PIN')
                .setCheck('Number');
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip('');
    }
};

Blockly.propc.check_pin = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.check_pin_input = function () {
    var dropdown_pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_UNARY_PREFIX) || '0';
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.set_pins = {
    init: function () {
        this.setHelpUrl('help/block-digitalpin.html#write');
        this.setColour(230);
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

Blockly.propc.set_pins = function () {
    var code = '';
    var action = this.getFieldValue('ACTION');
    var dropdown_pin_count = Number(this.getFieldValue('PIN_COUNT'));
    var dropdown_start_pin = Number(this.getFieldValue('START_PIN'));
    if (action === 'STATE') {
        code = 'set_outputs(';
    } else if (action === 'DIRECTION') {
        code = 'set_directions(';
    }
    var highestPin = dropdown_start_pin + dropdown_pin_count - 1;
    code += highestPin;
    code += ', ';
    code += dropdown_pin_count;
    code += ', 0b';
    for (var i = highestPin; i >= dropdown_start_pin; i--) {
        code += this.getFieldValue('P' + i);
    }
    return code + ');\n';
};


Blockly.Blocks.inout_digital_write = {
    init: function () {
        this.setHelpUrl('help/block-digitalpin.html#write');
        this.setColour(230);
        this.appendDummyInput("")
                .appendField("DigitalWrite PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendField("Stat")
                .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
    }
};



Blockly.Blocks.inout_digital_write_pin = {
    helpUrl: 'help/block-digitalpin.html#write-pin',
    init: function () {
        this.setColour(230);
        this.appendDummyInput("").appendField("DigitalWrite PIN#");
        this.appendValueInput('PIN').setCheck(Number);
        this.appendDummyInput("").appendField("Stat")
                .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
        this.setInputsInline(true);
    }
};

Blockly.Blocks.inout_digital_read_pin = {
    helpUrl: 'help/block-digitalpin.html#read-pin',
    init: function () {
        this.setColour(230);
        this.appendDummyInput("").appendField("DigitalRead PIN#");
        this.appendValueInput('PIN').setCheck(Number);
        this.setOutput(true, Boolean);
        this.setTooltip('');
        this.setInputsInline(true);
    }
};

Blockly.Blocks.base_delay = {
    helpUrl: 'help/block-delay.html',
    init: function () {
        this.setColour(120);
        this.appendValueInput("DELAY_TIME", 'Number')
                .appendField("Delay (ms)")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Delay specific time');
    }
};

Blockly.Blocks.base_freqout = {
    helpUrl: '',
    init: function () {
        this.setColour(120);
        this.appendDummyInput("")
                .appendField("Freq PIN#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendValueInput("DURATION", Number)
                .appendField("Duration (ms)")
                .setCheck(Number);
        this.appendValueInput("FREQUENCY", Number)
                .appendField("frequecy (hz)")
                .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Frequency output');
    }
};


// define generators
//Blockly.propc = new Blockly.Generator('propc');

Blockly.propc.inout_digital_write = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    if (dropdown_stat == 1) {
        return 'high(' + dropdown_pin + ');\n';
    } else {
        return 'low(' + dropdown_pin + ');\n';
    }
};

Blockly.propc.inout_digital_write_pin = function () {
    var dropdown_pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_UNARY_PREFIX) || '0';
    var dropdown_stat = this.getFieldValue('STAT');
    if (dropdown_stat == 1) {
        return 'high(' + dropdown_pin + ');\n';
    } else {
        return 'low(' + dropdown_pin + ');\n';
    }
};

Blockly.propc.base_delay = function () {
    var delay_time = Blockly.propc.valueToCode(this, 'DELAY_TIME', Blockly.propc.ORDER_ATOMIC) || '1000';
    var code = 'pause(' + delay_time + ');\n';
    return code;
};

Blockly.propc.base_freqout = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var duration = Blockly.propc.valueToCode(this, 'DURATION', Blockly.propc.ORDER_ATOMIC) || 1000;
    var frequency = Blockly.propc.valueToCode(this, 'FREQUENCY', Blockly.propc.ORDER_ATOMIC) || 3000;

    var code = 'freqout( ' + dropdown_pin + ', ' + duration + ', ' + frequency + ' );\n';

    return code;
};
