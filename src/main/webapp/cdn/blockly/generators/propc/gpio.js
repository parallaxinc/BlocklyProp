/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo, Vale Tolpegin
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
 * @fileoverview Generating C for gpio blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 *         valetolpegin@gmail.com    (Vale Tolpegin)
 *         jewald@parallax.com       (Jim Ewald)
 *         mmatz@parallax.com        (Matthew Matz)
 *         kgracey@parallax.com      (Ken Gracey)
 *         carsongracey@gmail.com    (Carson Gracey)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};

Blockly.Blocks.make_pin = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_IO_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_PINS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_MAKE_PIN_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.appendDummyInput()
                .appendField("make PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
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
            return 'toggle(' + dropdown_pin + ');\n\tset_direction(' + dropdown_pin + ', 1);\n';
        case "INPUT":
            return 'set_direction(' + dropdown_pin + ', 0);\n';
        case "REVERSE":
            return 'reverse(' + dropdown_pin + ');\n';
    }
};

Blockly.Blocks.make_pin_input = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MAKE_PIN_INPUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.appendDummyInput("")
                .appendField("make PIN");
        this.appendValueInput('PIN')
                .setCheck('Number')
                .appendField('A,' + profile.default.digital.toString(), 'RANGEVALS0');
        this.getField('RANGEVALS0').setVisible(false);
        this.appendDummyInput('ACTION')
                .appendField(new Blockly.FieldDropdown([["high", "HIGH"], ["low", "LOW"], ["toggle", "TOGGLE"], ["input", "INPUT"], ["reverse", "REVERSE"]]), "ACTION");
    }
};

Blockly.propc.make_pin_input = function () {
    var pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || 0;
    var dropdown_action = this.getFieldValue('ACTION');
    switch (dropdown_action) {
        case "HIGH":
            return 'high(' + pin + ');\n';
        case "LOW":
            return 'low(' + pin + ');\n';
        case "TOGGLE":
            return 'toggle(' + pin + ');\n\tset_direction(' + pin + ', 1);\n';
        case "INPUT":
            return 'set_direction(' + pin + ', 0);\n';
        case "REVERSE":
            return 'reverse(' + pin + ');\n';
    }
};

Blockly.Blocks.check_pin = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_IO_HELPURL);
        } else {
            this.setHelpUrl(Blockly.MSG_PINS_HELPURL);
        }
        this.setTooltip(Blockly.MSG_CHECK_PIN_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput("")
                .appendField("check PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.check_pin = function () {
    var dropdown_pin = this.getFieldValue('PIN');

    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.check_pin_input = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_CHECK_PIN_INPUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendValueInput('PIN')
                .appendField("check PIN")
                .setCheck('Number')
                .appendField('A,' + profile.default.digital.toString(), 'RANGEVALS0');
        this.getField('RANGEVALS0').setVisible(false);
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
};

Blockly.propc.check_pin_input = function () {
    var dropdown_pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_UNARY_PREFIX) || '0';

    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.set_pins = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SET_PINS_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        var start_pin = [];
        for (var i = profile.default.contiguous_pins_start; i <= profile.default.contiguous_pins_end; i++) {
            start_pin.push([i.toString(), i.toString()]);
        }
        var pin_count = [];
        for (var i = profile.default.contiguous_pins_start; i <= profile.default.contiguous_pins_end; i++) {
            pin_count.push([i.toString(), i.toString()]);
        }
        this.appendDummyInput("")
                .appendField("set the")
                .appendField(new Blockly.FieldDropdown([["states", "STATE"], ["directions", "DIRECTION"]], function (action) {
                    this.sourceBlock_.updateShape_({"ACTION": action});
                }), "ACTION")
                .appendField("from lowest PIN")
                .appendField(new Blockly.FieldDropdown(pin_count, function (startPin) {
                    this.sourceBlock_.updateShape_({"START_PIN": startPin});
                }), "START_PIN")
                .appendField("to highest PIN")
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
    //var highestPin = dropdown_start_pin + dropdown_pin_count - 1;

    code += dropdown_pin_count;
    code += ', ';
    code += dropdown_start_pin;
    code += ', 0b';
    for (var i = dropdown_pin_count; i >= dropdown_start_pin; i--) {
        code += this.getFieldValue('P' + i);
    }
    return code + ');\n';
};

Blockly.Blocks.get_pins = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_GET_PINS_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
        var start_pin = [];
        for (var i = profile.default.contiguous_pins_start; i <= profile.default.contiguous_pins_end; i++) {
            start_pin.push([i.toString(), i.toString()]);
        }
        var pin_count = [];
        for (var i = profile.default.contiguous_pins_start; i <= profile.default.contiguous_pins_end; i++) {
            pin_count.push([i.toString(), i.toString()]);
        }
        this.appendDummyInput("")
                .appendField("get the")
                .appendField(new Blockly.FieldDropdown([["states", "STATE"], ["directions", "DIRECTION"]]), "ACTION")
                .appendField("from lowest PIN")
                .appendField(new Blockly.FieldDropdown(pin_count), "START_PIN")
                .appendField("to highest PIN")
                .appendField(new Blockly.FieldDropdown(start_pin), "PIN_COUNT");
    }
};

Blockly.propc.get_pins = function () {
    var code = '';
    var action = this.getFieldValue('ACTION');
    var dropdown_pin_count = Number(this.getFieldValue('PIN_COUNT'));
    var dropdown_start_pin = Number(this.getFieldValue('START_PIN'));
    if (action === 'STATE') {
        code = 'get_states(';
    } else if (action === 'DIRECTION') {
        code = 'get_outputs(';
    }

    code += dropdown_pin_count;
    code += ', ';
    code += dropdown_start_pin;
    code += ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.set_pins_binary = {
    helpUrl: Blockly.MSG_PINS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SET_PINS_BINARY_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);

        var start_pin = [];
        for (var i = profile.default.contiguous_pins_start; i <= profile.default.contiguous_pins_end; i++) {
            start_pin.push([i.toString(), i.toString()]);
        }
        var pin_count = [];
        for (var i = profile.default.contiguous_pins_start; i <= profile.default.contiguous_pins_end; i++) {
            pin_count.push([i.toString(), i.toString()]);
        }
        this.appendValueInput("VALUE")
                .appendField("set the")
                .appendField(new Blockly.FieldDropdown([["states", "STATE"], ["directions", "DIRECTION"]]), "ACTION")
                .appendField("from lowest PIN")
                .appendField(new Blockly.FieldDropdown(pin_count), "START_PIN")
                .appendField("to highest PIN")
                .appendField(new Blockly.FieldDropdown(start_pin), "PIN_COUNT")
                .appendField("using bits from")
                .setCheck('Number');
    }
};

Blockly.propc.set_pins_binary = function () {
    var code = '';
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0b0000';
    var action = this.getFieldValue('ACTION');
    var dropdown_pin_count = Number(this.getFieldValue('PIN_COUNT'));
    var dropdown_start_pin = Number(this.getFieldValue('START_PIN'));
    if (action === 'STATE') {
        code = 'set_outputs(';
    } else if (action === 'DIRECTION') {
        code = 'set_directions(';
    }

    code += dropdown_pin_count;
    code += ', ';
    code += dropdown_start_pin;
    code += ', ' + value + ');\n';

    return code;
};

Blockly.Blocks.base_freqout = {
    helpUrl: Blockly.MSG_AUDIO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_BASE_FREQOUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.addPinMenu("frequency PIN", 'DURATION');
        this.appendValueInput("DURATION")
                .appendField("duration (ms)")
                .setCheck('Number');
        this.appendValueInput("FREQUENCY")
                .appendField("frequency (Hz)")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    addPinMenu: function (label, moveBefore) {
        this.appendDummyInput('SET_PIN')
                .appendField(label, 'LABEL')
                .appendField(new Blockly.FieldDropdown(profile.default.digital.concat([['other', 'other']]), function (op) {
                    this.sourceBlock_.setToOther(op, moveBefore);
                }), "PIN");
        this.moveBefore = moveBefore;
        this.otherPin = false;
    },
    setToOther: function (op, moveBefore) {
        if (op === 'other') {
            this.otherPin = true;
            var label = this.getFieldValue('LABEL');
            this.removeInput('SET_PIN');
            this.appendValueInput('PIN')
                    .appendField(label)
                    .setCheck('Number')
                    .appendField('A,' + profile.default.digital.toString(), 'RANGEVALS0');
            this.getField('RANGEVALS0').setVisible(false);
            if (moveBefore) {
                this.moveInputBefore('PIN', moveBefore);
            }
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('otherpin', this.otherPin);
        return container;
    },
    domToMutation: function (xmlElement) {
        var op = xmlElement.getAttribute('otherpin');
        if (op === 'true') {
            this.setToOther('other', this.moveBefore);
        }
    }
};

Blockly.propc.base_freqout = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var duration = Blockly.propc.valueToCode(this, 'DURATION', Blockly.propc.ORDER_ATOMIC) || 1000;
    var frequency = Blockly.propc.valueToCode(this, 'FREQUENCY', Blockly.propc.ORDER_ATOMIC) || 3000;

    var code = 'freqout(' + pin + ', ' + duration + ', ' + frequency + ');\n';

    return code;
};

Blockly.Blocks.base_count = {
    helpUrl: Blockly.MSG_ANALOG_PULSE_IN_OUT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_BASE_COUNT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.addPinMenu("count pulses PIN", 'DURATION');
        this.appendValueInput("DURATION")
                .appendField("duration (ms)")
                .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    },
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther
};

Blockly.propc.base_count = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var duration = Blockly.propc.valueToCode(this, 'DURATION', Blockly.propc.ORDER_ATOMIC) || '1';

    var code = 'count(' + pin + ', ' + duration + ')';

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.pulse_in = {
    helpUrl: Blockly.MSG_ANALOG_PULSE_IN_OUT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_PULSE_IN_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.addPinMenu("pulse-in PIN", 'READ');
        this.appendDummyInput('READ')
                .appendField("read")
                .appendField(new Blockly.FieldDropdown([
                    ["negative/low pulses", "0"],
                    ["positive/high pulses", "1"]
                ]), "STATE");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    },
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther
};

Blockly.propc.pulse_in = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var state = this.getFieldValue("STATE");

    var code = 'pulse_in(' + pin + ', ' + state + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.pulse_out = {
    helpUrl: Blockly.MSG_ANALOG_PULSE_IN_OUT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_PULSE_OUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.addPinMenu("pulse-out PIN", 'PULSE_LENGTH');
        this.appendValueInput('PULSE_LENGTH')
                .appendField("pulse length (" + "\u00B5" + "s)")
                .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther
};

Blockly.propc.pulse_out = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var pulse_length = Blockly.propc.valueToCode(this, 'PULSE_LENGTH', Blockly.propc.ORDER_ATOMIC);

    return 'pulse_out(' + pin + ', ' + pulse_length + ');\n';
};

Blockly.Blocks.rc_charge_discharge = {
    helpUrl: Blockly.MSG_ANALOG_RC_TIME_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_RC_CHARGE_DISCHARGE_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.addPinMenu("RC time PIN", 'MODE');
        this.appendDummyInput('MODE')
                .appendField(' ')
                .appendField(new Blockly.FieldDropdown([["charge", "0"], ["discharge", "1"]]), "STATE");
        this.setInputsInline(true);
        this.setPreviousStatement(false, "Block");
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    },
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther
};

Blockly.propc.rc_charge_discharge = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var state = this.getFieldValue("STATE");

    var code = 'rc_time(' + pin + ', ' + state + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

// --------------- EEPROM Memory Blocks ----------------------------------------
Blockly.Blocks.eeprom_write = {
    helpUrl: Blockly.MSG_EEPROM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_EEPROM_WRITE_TOOLTIP);
        this.setColour(colorPalette.getColor('output'));
        this.appendValueInput("DATA")
                .setCheck(null)
                .appendField("EEPROM write")
                .appendField(new Blockly.FieldDropdown([["number", "NUMBER"], ["text", "TEXT"], ["byte", "BYTE"]], function (type) {
                    this.sourceBlock_.setOutputType_(type);
                }), "TYPE");
        this.appendValueInput("ADDRESS")
                .appendField('R,0,7675,0', 'RANGEVALS0')
                .setCheck("Number")
                .appendField("to address");
        this.getField('RANGEVALS0').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setOutputType_(this.getFieldValue('DATA'));
    },
    mutationToDom: function () {
        // Create XML to represent menu options.
        var container = document.createElement('mutation');
        container.setAttribute('type', this.getFieldValue('TYPE'));
        return container;
    },
    domToMutation: function (container) {
        // Parse XML to restore the menu options.
        var savedType = container.getAttribute('type');
        if (!savedType) {
            savedType = null;
        }
        this.setOutputType_(savedType || null);
    },
    setOutputType_: function (type) {
        var setType = "Number";
        if (type === 'TEXT') {
            setType = "String";
        }
        if (type === null || type === 'null') {
            setType = null;
        }
        this.getInput('DATA').setCheck(setType);
    }
};

Blockly.propc.eeprom_write = function () {
    var type = this.getFieldValue('TYPE');
    var address = Blockly.propc.valueToCode(this, 'ADDRESS', Blockly.propc.ORDER_ATOMIC);
    var data = Blockly.propc.valueToCode(this, 'DATA', Blockly.propc.ORDER_ATOMIC) || '';

    if (!this.disabled) {
        var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
        setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
        setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
        Blockly.propc.methods_["constrain_function"] = setup_code;
        Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';
    }
    var code = '';
    if (data !== '') {
        if (type === 'BYTE') {
            code += 'ee_putByte((' + data + ' & 255), (32768 + constrain(' + address + ', 0, 7675)) );\n';
        } else if (type === 'NUMBER') {
            code += 'ee_putInt(' + data + ', (32768 + constrain(' + address + ', 0, 7675)) );\n';
        } else {
            code += 'ee_putStr(' + data + ', (strlen(' + data + ') + 1), (32768 + constrain(' + address + ', 0, 7675)) );\n';
        }
    }

    return code;
};

Blockly.Blocks.eeprom_read = {
    helpUrl: Blockly.MSG_EEPROM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_EEPROM_READ_TOOLTIP);
        this.setColour(colorPalette.getColor('output'));
        this.appendValueInput("ADDRESS")
                .setCheck("Number")
                .appendField("EEPROM read")
                .appendField(new Blockly.FieldDropdown([["number", "NUMBER"], ["text", "TEXT"], ["byte", "BYTE"]]), "TYPE")
                .appendField('R,0,7675,0', 'RANGEVALS0')
                .appendField("from address");
        this.appendDummyInput()
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VALUE');
        this.getField('RANGEVALS0').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    getVarType: function () {
        if (this.getFieldValue('TYPE') === 'TEXT') {
            return "String";
        } else {
            return "Number";
        }
    },
    getVars: function () {
        return [this.getFieldValue('VALUE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
            this.setFieldValue(newName, 'VALUE');
        }
    }
};

Blockly.propc.eeprom_read = function () {
    var type = this.getFieldValue('TYPE');
    var address = Blockly.propc.valueToCode(this, 'ADDRESS', Blockly.propc.ORDER_ATOMIC) || '0';
    var data = Blockly.propc.variableDB_.getName(this.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
    var code = '';

    if (!this.disabled) {
        var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
        setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
        setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
        Blockly.propc.methods_["constrain_function"] = setup_code;
        Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';
    }

    if (data !== '') {
        if (type === 'BYTE') {
            code += data + ' = ee_getByte( 32768 + constrain(' + address + ', 0, 7675)) & 255;\n';
        } else if (type === 'NUMBER') {
            code += data + ' = ee_getInt( 32768 + constrain(' + address + ', 0, 7675));\n';
        } else {
            if (!this.disabled) {
                Blockly.propc.global_vars_["i2c_eeBffr"] = 'char __eeBffr[1];';
                Blockly.propc.global_vars_["i2c_eeIdx"] = 'int __eeIdx = 0;';
                Blockly.propc.vartype_[data] = 'char *';
            }
            code += '// Get the string from EEPROM one character at a time until it finds the end of the string.\n__eeIdx = 0;\n';
            code += 'while(__eeIdx < 128) {\n  ee_getStr(__eeBffr, 1, (32768 + constrain(' + address + ', 0, 7675)) + __eeIdx);\n';
            code += data + '[__eeIdx] = __eeBffr[0];\nif(' + data + '[__eeIdx] == 0) break;\n  __eeIdx++;\n}\n';
            code += 'if(__eeIdx >= 128) ' + data + '[127] = 0;\n';
        }
    }
    return code;
};

// ------------------ Servo motor blocks ---------------------------------------
Blockly.Blocks.servo_move = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
        }
        this.setTooltip(Blockly.MSG_SERVO_MOVE_TOOLTIP);
        this.addPinMenu("Servo PIN", 'ANGLE');
        this.appendValueInput("ANGLE")
                .appendField("set angle (0-180\u00B0)")
                .setCheck("Number")
                .appendField('R,0,180,0', 'RANGEVALS1');
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther
};

Blockly.propc.servo_move = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var degrees = Blockly.propc.valueToCode(this, 'ANGLE', Blockly.propc.ORDER_NONE);
    if (!this.disabled) {
        Blockly.propc.definitions_["include servo"] = '#include "servo.h"';
    }
    var code = 'servo_angle(' + pin + ', ' + degrees + ' * 10);\n';
    return code;
};

Blockly.Blocks.servo_speed = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
        }
        this.setTooltip(Blockly.MSG_SERVO_SPEED_TOOLTIP);
        this.addPinMenu("CR servo PIN", 'SPEED');
        this.appendValueInput("SPEED")
                .appendField("speed")
                .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther
};

Blockly.propc.servo_speed = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var speed = Blockly.propc.valueToCode(this, 'SPEED', Blockly.propc.ORDER_NONE);
    if (!this.disabled) {
        Blockly.propc.definitions_["include servo"] = '#include "servo.h"';
    }
    return 'servo_speed(' + pin + ', ' + speed + ');\n';
};

Blockly.Blocks.servo_set_ramp = {
    helpUrl: Blockly.MSG_SERVO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SERVO_SET_RAMP_TOOLTIP);
        this.setColour(colorPalette.getColor('output'));
        this.addPinMenu("CR servo set ramp PIN", 'RAMPSTEP');
        this.appendValueInput('RAMPSTEP')
                .appendField("rampstep (0 - 100)")
                .setCheck('Number');

        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther
};

Blockly.propc.servo_set_ramp = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var ramp_step = Blockly.propc.valueToCode(this, 'RAMPSTEP', Blockly.propc.ORDER_NONE);

    if (Number(ramp_step) < 0) {
        ramp_step = "0";
    } else if (Number(ramp_step) > 100) {
        ramp_step = "100";
    }
    if (!this.disabled) {
        Blockly.propc.definitions_["include servo"] = '#include "servo.h"';
    }
    return 'servo_setramp(' + pin + ', ' + ramp_step + ');\n';
};

// --------- Feedback 360 servo blocks -----------------------------------------
Blockly.Blocks.fb360_init = {
    init: function () {
        this.setTooltip(Blockly.MSG_FB360_INIT_TOOLTIP);
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
        }
        this.appendDummyInput()
                .appendField("Feedback 360\u00b0 servo initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendField("FB")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "FB");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.fb360_init = function () {
    var pin = this.getFieldValue("PIN");
    var fb = this.getFieldValue("FB");

    if (!this.disabled) {
        Blockly.propc.definitions_["include servo360"] = '#include "servo360.h"';
        Blockly.propc.setups_["servo360_" + pin] = 'servo360_connect(' + pin + ',' + fb + ');\n';
    }
    return '';
};

Blockly.Blocks.fb360_setup = {
    init: function () {
        this.setTooltip(Blockly.MSG_FB360_SETUP_TOOLTIP);
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
        }
        this._menuOptions = [['acceleration (\u00B0/s\u00B2) to', 'setAcceleration'],
            ['max speed (\u00B0/s) to', 'setMaxSpeed'],
            //['home to current position', ''],
            //['home to servo zero', ''],
            ['turn count (+/- revolutions) to', 'setTurns'],
            ['home to position (+/- \u00B0)', 'setAngleOffset'],
            ['kP for speed to', 'setControlSys,S360_SETTING_KPV'],
            ['kI for speed to', 'setControlSys,S360_SETTING_KIV'],
            ['kD for speed to', 'setControlSys,S360_SETTING_KDV'],
            ['I for speed max to', 'setControlSys,S360_SETTING_IV_MAX'],
            ['kP for position to', 'setControlSys,S360_SETTING_KPA'],
            ['kI for position to', 'setControlSys,S360_SETTING_KIA'],
            ['kD for position to', 'setControlSys,S360_SETTING_KDA'],
            ['I for position max to', 'setControlSys,S360_SETTING_IA_MAX']];
        this.addPinMenu("Feedback 360\u00b0 servo PIN", 'VALUE');
        this.appendValueInput("VALUE")
                .appendField('configure')
                .appendField(new Blockly.FieldDropdown(this._menuOptions, function (param) {
                    this.sourceBlock_.updateShape_(param);
                }), "PARAM")
                .appendField('R,36,3600,0', 'RANGEVALS1');
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther,
    updateShape_: function (param) {
        if (param === 'setAcceleration') {
            this.setFieldValue('R,36,3600,1800', 'RANGEVALS1');
        } else if (param === 'setMaxSpeed') {
            this.setFieldValue('R,10,1080,540', 'RANGEVALS1');
        } else {
            this.setFieldValue('R,-2147483648,2147483647,0', 'RANGEVALS1');
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('param', this.getFieldValue('PARAM'));
        container.setAttribute('otherpin', this.otherPin);
        return container;
    },
    domToMutation: function (xmlElement) {
        var op = xmlElement.getAttribute('otherpin');
        if (op === 'true') {
            this.setToOther('other', this.moveBefore);
        }
        var param = xmlElement.getAttribute('param');
        this.updateShape_(param);
    },
    onchange: function () {
        var pinWarn = 'WARNING: You need a Feedback 360\u00B0 servo initialize block set to match the PIN on this block!';
        var blocks = Blockly.getMainWorkspace().getAllBlocks();

        // Iterate through every block.
        for (var x = 0; x < blocks.length; x++) {
            var blockName = blocks[x].type;
            var myPin = this.getFieldValue('PIN');
            if (blockName === 'fb360_init' && (blocks[x].getFieldValue('PIN') === myPin || blocks[x].getFieldValue('FB') === myPin)) {
                pinWarn = null;
            }
            if (blockName === 'fb360_init' && !this.getInput('SET_PIN')) {
                pinWarn = null;
            }
            this.setWarningText(pinWarn);
        }
    }
};

Blockly.propc.fb360_setup = function () {
    var param = this.getFieldValue("PARAM");
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';
    ;
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Feedback 360\u00b0 servo initialize') > -1) {
        if (param.indexOf(',') > -1) {
            var params = param.split(',');
            return 'servo360_' + params[0] + '(' + pin + ', ' + params[1] + ', ' + value + ');\n';
        } else {
            return 'servo360_' + param + '(' + pin + ', ' + value + ');\n';
        }
    } else {
        return '// WARNING: You need a Feedback 360\u00B0 servo initialize block set to match the PIN on this block!';
    }
};

Blockly.Blocks.fb360_set = {
    init: function () {
        this.setTooltip(Blockly.MSG_FB360_SET_TOOLTIP);
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
        }
        this._menuOptions = [['set speed to (+/- \u00B0/s)', 'speed'],
            ['set position to (+/- \u00B0)', 'angle'],
            ['change position by (+/- \u00B0)', 'goto']];
        this.addPinMenu("Feedback 360\u00b0 servo PIN", 'VALUE');
        this.appendValueInput('VALUE')
                .setCheck('Number')
                .appendField(' ')
                .appendField(new Blockly.FieldDropdown(this._menuOptions, function (param) {
                    this.sourceBlock_.updateShape_(param);
                }), "PARAM")
                .appendField('R,-720,720,0', 'RANGEVALS1');
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    updateShape_: function (param) {
        if (param === 'speed') {
            this.setFieldValue('R,-720,720,0', 'RANGEVALS1');
        } else if (param === 'angle') {
            this.setFieldValue('R,-1456,1456,0', 'RANGEVALS1');
        } else {
            this.setFieldValue('R,-2147483648,2147483647,0', 'RANGEVALS1');
        }
    },
    onchange: Blockly.Blocks['fb360_setup'].onchange,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther,
    mutationToDom: Blockly.Blocks['fb360_setup'].mutationToDom,
    domToMutation: Blockly.Blocks['fb360_setup'].domToMutation
};

Blockly.propc.fb360_set = Blockly.propc.fb360_setup;

Blockly.Blocks.fb360_get = {
    init: function () {
        this.setTooltip(Blockly.MSG_FB360_GET_TOOLTIP);
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
        }
        this.addPinMenu("Feedback 360\u00b0 servo PIN", 'VALUE');
        this.appendDummyInput('VALUE')
                .appendField('position (\u00B0)');
        this.setOutput(true, "Number");
        this.setInputsInline(true);
    },
    onchange: Blockly.Blocks['fb360_setup'].onchange,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther,
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation
};

Blockly.propc.fb360_get = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Feedback 360\u00b0 servo initialize') > -1) {
        return ['servo360_getAngle(' + pin + ')', Blockly.propc.ORDER_NONE];
    } else {
        return ['0', Blockly.propc.ORDER_NONE];
    }
};

Blockly.Blocks.fb360_status = {
    init: function () {
        this.setTooltip(Blockly.MSG_FB360_STATUS_TOOLTIP);
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
        }
        this.addPinMenu("Feedback 360\u00b0 servo PIN", 'VALUE');
        this.appendDummyInput('VALUE')
                .appendField(new Blockly.FieldDropdown([
                    ['is turning a speed', 'S360_SPEED'],
                    ['is moving to a position', 'S360_GOTO'],
                    ['is holding at a position', 'S360_POSITION']
                ]), "STATUS");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
    },
    onchange: Blockly.Blocks['fb360_setup'].onchange,
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther,
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation
};

Blockly.propc.fb360_status = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Feedback 360\u00b0 servo initialize') > -1) {
        return ['(servo360_getCsop(' + pin + ') == ' + this.getFieldValue("STATUS") + ')', Blockly.propc.ORDER_NONE];
    } else {
        return ['0', Blockly.propc.ORDER_NONE];
    }
};

// --------- ActivityBoard A/D and D/A voltage measurement/generation blocks ---
Blockly.Blocks.ab_volt_in = {
    helpUrl: Blockly.MSG_ANALOG_PULSES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AB_VOLT_IN_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("A/D channel")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL")
                .appendField("read (0-5V) in volt-100ths");
        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.ab_volt_in = function () {
    var dropdown_channel = this.getFieldValue('CHANNEL');
    if (!this.disabled) {
        Blockly.propc.definitions_["include abvolts"] = '#include "abvolts.h"';
        Blockly.propc.setups_['setup_abvolts'] = 'ad_init(21, 20, 19, 18);';
    }
    var code = '(ad_in(' + dropdown_channel + ') * 500 / 4096)';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.ab_volt_out = {
    helpUrl: Blockly.MSG_ANALOG_PULSES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_AB_VOLT_OUT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("D/A channel")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "CHANNEL")
                .appendField("output (0-3.3V)");
        this.appendValueInput("VALUE")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('R,0,330,0', 'RANGEVALS1')
                .appendField("volt-100ths");
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.ab_volt_out = function () {
    var dropdown_channel = this.getFieldValue('CHANNEL');
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';
    if (!this.disabled) {
        Blockly.propc.definitions_["include abvolts"] = '#include "abvolts.h"';
        Blockly.propc.setups_['setup_abvolt_out'] = 'da_init(26, 27);';
    }
    var code = 'da_out(' + dropdown_channel + ', (' + value + '* 256 / 330));\n';
    return code;
};

// ------------- PWM (Pulse-width modulation) Blocks ---------------------------
Blockly.Blocks.pwm_start = {
    helpUrl: Blockly.MSG_ANALOG_PWM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_PWM_START_TOOLTIP);
        this.setColour('#FF8800');
        this.appendDummyInput()
                .appendField("PWM initialize");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setWarningText('NOTE: The PWM initialize block is no longer\nneeded. It can be safely deleted.');
    }
};

Blockly.propc.pwm_start = function () {
    return '// NOTE: The PWM initialize block is no longer needed. It can be safely deleted.\n';
};

Blockly.Blocks.pwm_set = {
    helpUrl: Blockly.MSG_ANALOG_PWM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_PWM_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.addPinMenu("PWM set PIN", 'CHANNEL');
        this.appendDummyInput('CHANNEL')
                .appendField("channel")
                .appendField(new Blockly.FieldDropdown([["A", "0"], ["B", "1"]]), "CHANNEL");
        this.appendValueInput("DUTY_CYCLE", Number)
                .appendField('R,0,100,0', 'RANGEVALS1')
                .setCheck('Number')
                .appendField("duty cycle (%)");
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    addPinMenu: Blockly.Blocks['base_freqout'].addPinMenu,
    setToOther: Blockly.Blocks['base_freqout'].setToOther,
    mutationToDom: Blockly.Blocks['base_freqout'].mutationToDom,
    domToMutation: Blockly.Blocks['base_freqout'].domToMutation
};

Blockly.propc.pwm_set = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("PIN");
    }
    var channel = this.getFieldValue("CHANNEL");
    var duty_cycle = Blockly.propc.valueToCode(this, "DUTY_CYCLE", Blockly.propc.ORDER_NONE);

    if (Number(duty_cycle) < 0) {
        duty_cycle = '0';
    } else if (Number(duty_cycle) > 100) {
        duty_cycle = '100';
    }

    var code = 'pwm_start(100);\npwm_set(' + pin + ', ' + channel + ', ' + duty_cycle + ');\n';
    return code;
};

Blockly.Blocks.pwm_stop = {
    helpUrl: Blockly.MSG_ANALOG_PWM_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_PWM_STOP_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("PWM stop");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.pwm_stop = function () {
    var code = 'pwm_stop();\n';
    return code;
};

// ----------------- Sound audio player blocks ---------------------------------
Blockly.Blocks.sound_init = {
    helpUrl: Blockly.MSG_AUDIO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SOUND_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("sound initialize left (+) PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital.concat([['None','-1']])), "PINL")
                .appendField("right (\u2212) PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital.concat([['None','-1']])), "PINR");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.sound_init = function () {
    if (!this.disabled) {
        var l_pin = this.getFieldValue('PINL');
        var r_pin = this.getFieldValue('PINR');
        Blockly.propc.setups_["sound_start"] = 'audio0 = sound_run(' + l_pin + ', ' + r_pin + ');';
        Blockly.propc.definitions_["include_soundplayer"] = '#include "sound.h"';
        Blockly.propc.definitions_["sound_define_0"] = 'sound* audio0;';
    }
    return '';
};

Blockly.Blocks.sound_play = {
    helpUrl: Blockly.MSG_AUDIO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SOUND_PLAY_TOOLTIP);
        this.actionMenuItems = [
            ["set frequency", "freq"],
            ["set volume", "volume"],
            ["set waveform", "wave"],
            ["stop", "stop"]
        ];
        if (projectData['board'] && projectData['board'] === "heb") {
            this.setColour(colorPalette.getColor('heb'));
        } else {
            this.setColour(colorPalette.getColor('io'));            
        }
        this.addChannelMenu("sound channel", 'VALUE');
        this.appendValueInput("VALUE")
                .setCheck(null)
                .appendField(' ')
                .appendField(new Blockly.FieldDropdown(this.actionMenuItems,
                        function (act) {
                            this.sourceBlock_.setSoundAction(act);
                        }), "ACTION");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.waveInput = false;
    },
    addChannelMenu: function (label, moveBefore) {
        this.appendDummyInput('SET_CHANNEL')
                .appendField(label, 'LABEL')
                .appendField(new Blockly.FieldDropdown([
                    ['A', '0'],
                    ['B', '1'],
                    ['C', '2'],
                    ['D', '3'],
                    ['other', 'other']
                ], function (op) {
                    this.sourceBlock_.setToOther(op, moveBefore);
                }), "CHANNEL");
        this.moveBefore = moveBefore;
        this.otherChannel = false;
    },
    setSoundAction: function (act) {
        if (act !== this.getFieldValue('ACTION')) {
            if (this.getInput('VALUE')) {
                this.removeInput('VALUE');
            }
            if (act === 'wave') {
                this.appendDummyInput('VALUE')
                        .appendField(" ")
                        .appendField(new Blockly.FieldDropdown(this.actionMenuItems,
                                function (act) {
                                    this.sourceBlock_.setSoundAction(act);
                                }), "ACTION")
                        .appendField(new Blockly.FieldDropdown([
                            ["sine", "SINE"],
                            ["square", "SQUARE"],
                            ["triangle", "TRIANGLE"],
                            ["sawtooth", "SAW"],
                            ["noise", "NOISE"]
                        ]), "WAVE");
                this.waveInput = true;
            } else if (act === 'stop') {
                this.appendDummyInput("VALUE")
                        .appendField(' ')
                        .appendField(new Blockly.FieldDropdown(this.actionMenuItems,
                                function (act) {
                                    this.sourceBlock_.setSoundAction(act);
                                }), "ACTION");
                this.waveInput = true;
            } else {
                this.appendValueInput("VALUE")
                        .setCheck(null)
                        .appendField(" ")
                        .appendField(new Blockly.FieldDropdown(this.actionMenuItems,
                                function (act) {
                                    this.sourceBlock_.setSoundAction(act);
                                }), "ACTION");
                if (act === 'volume') {
                    this.getInput("VALUE")
                            .appendField('R,0,127,64', 'RANGEVALS1');
                    this.getField('RANGEVALS1').setVisible(false);
                }
                this.waveInput = false;
            }
            this.setFieldValue(act, 'ACTION');
        }
    },
    setToOther: function (op, moveBefore) {
        if (op === 'other') {
            this.otherChannel = true;
            var label = this.getFieldValue('LABEL');
            this.removeInput('SET_CHANNEL');
            this.appendValueInput('CHANNEL')
                    .appendField(label)
                    .setCheck('Number')
                    .appendField('R,0,3,0', 'RANGEVALS0');
            this.getField('RANGEVALS0').setVisible(false);
            if (moveBefore) {
                this.moveInputBefore('CHANNEL', moveBefore);
            }
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('otherchannel', this.otherChannel);
        container.setAttribute('action', this.getFieldValue('ACTION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var op = xmlElement.getAttribute('otherchannel');
        var act = xmlElement.getAttribute('action');
        if (op === 'true') {
            this.setToOther('other', this.moveBefore);
        }
        this.setSoundAction(act);
    },
    onchange: function (event) {
        if (!(projectData['board'] && projectData['board'] === "heb")) {
        //if (event.oldXml || event.type === Blockly.Events.CREATE) {
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
            if (allBlocks.indexOf('sound initialize') === -1) {
                this.setWarningText('WARNING: You must use a sound initialize\nblock at the beginning of your program!');
            } else {
                this.setWarningText(null);
            }
        //}
        }
    }
};

Blockly.propc.sound_play = function () {
    var channel = '';
    if (this.otherChannel) {
        channel = Blockly.propc.valueToCode(this, 'CHANNEL', Blockly.propc.ORDER_ATOMIC);
    } else {
        channel = this.getFieldValue('CHANNEL');
    }
    var action = this.getFieldValue('ACTION');
    var value = '';
    if (this.waveInput) {
        value = this.getFieldValue('WAVE');
    } else {
        value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_ATOMIC) || '0';
    }

    if (action === 'stop') {
        action = 'freq';
        value = '0';
    }
    var code = 'sound_' + action + '(audio0, ' + channel + ', ' + value + ');';
    
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('sound initialize') === -1 && !(projectData['board'] && projectData['board'] === "heb")) {
        code = '// WARNING: You must use a sound initialize block at the beginning of your program!\n';
    }
    
    if (projectData['board'] && projectData['board'] === "heb" && !this.disabled) {
        Blockly.propc.setups_["sound_start"] = 'audio0 = sound_run(9, 10);';
        Blockly.propc.definitions_["include_soundplayer"] = '#include "sound.h"';
        Blockly.propc.definitions_["sound_define_0"] = 'sound* audio0;';       
    }

    return code;
};

// ----------------- .WAV file audio player blocks -----------------------------
Blockly.Blocks.wav_play = {
    helpUrl: Blockly.MSG_AUDIO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WAV_PLAY_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("WAV play file")
                .appendField(new Blockly.FieldTextInput('filename', function (fn) {
                    fn = fn.replace(/[^A-Z0-9a-z_]/g, '').toLowerCase();
                    if (fn.length > 8) {
                        fn.length = 8;
                    }
                    return fn;
                }), 'FILENAME');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.wav_play = function () {
    var filename = this.getFieldValue('FILENAME');
    if (!this.disabled) {
        Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';

        var initFound = false;

        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        for (var x = 0; x < allBlocks.length; x++) {
            if (allBlocks[x].type === 'sd_init') {
                initFound = true;
            }
        }
        if (!initFound) {
            Blockly.propc.setups_["sd_card"] = 'sd_mount(22, 23, 24, 25);\n';
        }
    }
    var code = 'wav_play("' + filename + '.wav");\n';
    return code;
};

Blockly.Blocks.wav_status = {
    helpUrl: Blockly.MSG_AUDIO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WAV_STATUS_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("WAV status");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.wav_status = function () {
    if (!this.disabled) {
        Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';
    }
    var code = 'wav_playing()';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.wav_volume = {
    helpUrl: Blockly.MSG_AUDIO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WAV_VOLUME_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendValueInput('VOLUME')
                .appendField("WAV volume (0 - 10)")
                .appendField('R,0,10,0', 'RANGEVALS1');
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.wav_volume = function () {
    var volume = Blockly.propc.valueToCode(this, 'VOLUME', Blockly.propc.ORDER_NONE) || '0';

    if (!this.disabled) {
        Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';

        var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
        setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
        setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
        Blockly.propc.methods_["constrain_function"] = setup_code;
        Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';
    }
    var code = 'wav_volume(constrain(' + volume + ', 0, 10));\n';
    return code;
};

Blockly.Blocks.wav_stop = {
    helpUrl: Blockly.MSG_AUDIO_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_WAV_STOP_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("WAV stop");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.wav_stop = function () {
    if (!this.disabled) {
        Blockly.propc.definitions_["include wavplayer"] = '#include "wavplayer.h"';
    }
    var code = 'wav_stop();\n';
    return code;
};

// ----------------- SD Card file blocks --------------------------
Blockly.Blocks.sd_init = {
    helpUrl: Blockly.MSG_SD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SD_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("SD initialize DO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DO")
                .appendField("CLK")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK")
                .appendField("DI")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DI")
                .appendField("CS")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CS"),
                this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.sd_init = function () {
    var pin_do = this.getFieldValue('DO');
    var pin_clk = this.getFieldValue('CLK');
    var pin_di = this.getFieldValue('DI');
    var pin_cs = this.getFieldValue('CS');

    if (!this.disabled) {
        Blockly.propc.setups_["sd_card"] = 'sd_mount(' + pin_do + ', ' + pin_clk + ', ' + pin_di + ', ' + pin_cs + ');\n';
    }

    return '';
};

Blockly.Blocks.sd_open = {
    helpUrl: Blockly.MSG_SD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SD_OPEN_TOOLTIP);
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput("MODE")
                .appendField("SD file open")
                .appendField(new Blockly.FieldTextInput("filename.txt", function (fn) {
                    fn = fn.replace(/[^A-Z0-9a-z_\.]/g, '').toLowerCase();
                    var fn_part = fn.split('.');
                    if (fn_part[0].length > 8) {
                        fn_part[0].length = 8;
                    }
                    if (!fn_part[1]) {
                        fn_part[1] = 'TXT';
                    } else if (fn_part[1].length > 3) {
                        fn_part[1].length = 3;
                    }
                    return fn_part[0] + '.' + fn_part[1];
                }), "FILENAME")
                .appendField(new Blockly.FieldDropdown([
                    ["as read-only", "r"],
                    ["as read-write", "w"]
                ]), "MODE");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    onchange: function () {
        if (projectData["board"] !== "activity-board") {
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
            if (allBlocks.indexOf('SD initialize') === -1) {
                this.setWarningText('WARNING: You must use a SD initialize\nblock at the beginning of your program!');
            } else {
                this.setWarningText(null);
            }
        }
    }
};

Blockly.propc.sd_open = function () {
    var fp = this.getFieldValue('FILENAME');
    var mode = this.getFieldValue('MODE');
    var head = '';
    var i = 0;
    var initFound = false;

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
    for (var x = 0; x < allBlocks.length; x++) {
        if (allBlocks[x].type === 'sd_open') {
            i++;
            if (allBlocks[x] === this && i === 1) {
                head = 'FILE* ';
            }
        }
        if (allBlocks[x].type === 'sd_init') {
            initFound = true;
        }
    }

    if (!this.disabled && !initFound) {
        Blockly.propc.setups_["sd_card"] = 'sd_mount(22, 23, 24, 25);\n';
    }

    var code = head + 'fp = fopen("' + fp + '","' + mode + '");';
    if (projectData["board"] !== "activity-board" && 
            allBlocks.toString().indexOf('SD initialize') === -1) {
        code = '// WARNING: You must use a SD initialize block at the beginning of your program!';
    }
    return code;
};

Blockly.Blocks.sd_read = {
    helpUrl: Blockly.MSG_SD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SD_READ_TOOLTIP);
        this.setColour(colorPalette.getColor('output'));
        this.appendValueInput("SIZE")
                .setCheck(null)
                .appendField("SD file")
                .appendField(new Blockly.FieldDropdown([
                    ["read", "fread"],
                    ["write", "fwrite"],
                    ["close", "fclose"]
                ], function (mode) {
                    this.sourceBlock_.setSdMode(mode);
                }), "MODE");
        this.appendDummyInput("VALUE")
                .appendField("bytes of")
                .appendField(new Blockly.FieldDropdown([
                    ["text", "TEXT"],
                    ["an integer", "INT"]
                ]), "TYPE")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('mode', this.getFieldValue('MODE'));
        return container;
    },
    domToMutation: function (container) {
        var mode = container.getAttribute('mode');
        if (mode) {
            this.setFieldValue(mode, 'MODE');
        }
        this.setSdMode(mode);
    },
    setSdMode: function (mode) {
        this.removeInput("SIZE");
        if (this.getInput("VALUE")) {
            this.removeInput("VALUE");
        }
        if (mode === "fwrite") {
            this.appendValueInput("SIZE");
            this.appendValueInput("VALUE")
                    .setCheck(null)
                    .appendField("bytes of");
        } else if (mode === "fread") {
            this.appendValueInput("SIZE");
            this.appendDummyInput("VALUE")
                    .appendField("bytes of")
                    .appendField(new Blockly.FieldDropdown([
                        ["text", "TEXT"],
                        ["an integer", "INT"]
                    ]), "TYPE")
                    .appendField("store in")
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
        } else {
            this.appendDummyInput("SIZE");
        }
        this.getInput("SIZE")
                .appendField("SD file")
                .appendField(new Blockly.FieldDropdown([
                    ["read", "fread"],
                    ["write", "fwrite"],
                    ["close", "fclose"]
                ], function (mode) {
                    this.sourceBlock_.setSdMode(mode);
                }), "MODE");
        this.setFieldValue(mode, "MODE");
    },
    onchange: function () {
        var warnTxt = null;
        //if (event.oldXml || event.type === Blockly.Events.CREATE) {
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
            if (allBlocks.indexOf('SD file open') === -1) {
                warnTxt = 'WARNING: You must use a SD file open block\nbefore reading, writing, or closing an SD file!';
            } else if (allBlocks.indexOf('SD initialize') === -1 && projectData["board"] !== "activity-board") {
                warnTxt = 'WARNING: You must use a SD initialize\nblock at the beginning of your program!';
            }
        //}
        this.setWarningText(warnTxt);
    }
};

Blockly.propc.sd_read = function () {
    var size = Blockly.propc.valueToCode(this, 'SIZE', Blockly.propc.ORDER_NONE) || '1';
    var mode = this.getFieldValue('MODE');
    var type = '';
    var value = '';
    var valType = 'int';

    if (mode === 'fread') {
        value = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
        type = this.getFieldValue('TYPE');
        if (type === 'TEXT') {
            Blockly.propc.vartype_[value] = 'char *';
        }
    } else if (mode === 'fwrite') {
        value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';
        type = 'INT';
        var connBlock = this.getInput('VALUE').connection.targetBlock();
        if (connBlock) {
            var connOutput = connBlock.outputConnection.check_;
            if (connOutput && connOutput.toString().indexOf('String') > -1) {
                type = 'TEXT';
            }
        }
    }
    var code = '';
    if (mode === 'fclose') {
        code = mode + '(fp);';
    } else {
        var s = '';
        if (type === 'INT' && mode === 'fwrite') {
            s = 'int __temp = ' + value + ';\n';
            value = '&__temp';
        } else if (type === 'INT' && mode === 'fread') {
            value = '&' + value;
        }
        code = s + mode + '(' + value + ', 1, ' + size + ', fp);';
    }
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('SD file open') === -1) {
        code = '// WARNING: You must use a SD file open block before reading, writing, or closing an SD file!';
    } else if (allBlocks.indexOf('SD initialize') === -1 && projectData["board"] !== "activity-board") {
        code = '// WARNING: You must use a SD initialize block at the beginning of your program!';
    }
    return code;
};

Blockly.Blocks.sd_file_pointer = {
    helpUrl: Blockly.MSG_SD_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SD_FILE_POINTER_TOOLTIP);
        this.setColour(colorPalette.getColor('output'));
        this.appendValueInput("FP")
                .setCheck("Number")
                .appendField("SD file")
                .appendField(new Blockly.FieldDropdown([
                    ["set", "set"],
                    ["get", "get"]
                ], function (m) {
                    this.sourceBlock_.setSdMode(m);
                }), "MODE")
                .appendField("pointer");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: Blockly.Blocks['sd_read'].mutationToDom,
    domToMutation: Blockly.Blocks['sd_read'].domToMutation,
    setSdMode: function (m) {
        this.removeInput('FP');
        if (m === 'set') {
            this.setOutput(false);
            this.appendValueInput('FP')
                    .setCheck("Number");
        } else {
            this.setOutput(true, 'Number');
            this.appendDummyInput('FP');
        }
        this.getInput('FP')
                .appendField("SD file")
                .appendField(new Blockly.FieldDropdown([
                    ["set", "set"],
                    ["get", "get"]
                ], function (m) {
                    this.sourceBlock_.setSdMode(m);
                }), "MODE")
                .appendField("pointer");
        this.setFieldValue(m, 'MODE');
        var n = (m === 'get' ? false : true);
        this.setPreviousStatement(n, "Block");
        this.setNextStatement(n, null);

    },
    onchange: Blockly.Blocks['sd_read'].onchange
};

Blockly.propc.sd_file_pointer = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    var code = null;
    if (allBlocks.indexOf('SD file open') === -1) {
        code = '// WARNING: You must use a SD file open block before using the file pointer!';
    } else if (allBlocks.indexOf('SD initialize') === -1 && projectData["board"] !== "activity-board") {
        code = '// WARNING: You must use a SD initialize block at the beginning of your program!';
    } else if (this.getFieldValue('MODE') === 'set') {
        var fp = Blockly.propc.valueToCode(this, 'FP', Blockly.propc.ORDER_NONE) || '0';
        code = 'fp = ' + fp + ';';
    } else {
        code = ['fp', Blockly.propc.ORDER_ATOMIC];
    }
    return code;
};

// ----------------- Robot (drive) blocks --------------------------------------
Blockly.Blocks.ab_drive_init = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_DRIVE_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField("Robot")
                .appendField(new Blockly.FieldDropdown([
                    ["ActivityBot", "abdrive.h"],
                    ["ActivityBot 360\u00b0", "abdrive360.h"],
                    ["Arlo", "arlodrive.h"],
                    ["Servo Differential Drive", "servodiffdrive.h"]], function (bot) {
                    this.sourceBlock_.updateShape_({"BOT": bot});
                }), "BOT")
                .appendField("initialize");
        this.appendDummyInput("PINS");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('bot', this.getFieldValue('BOT'));
        container.setAttribute('lpin', this.getFieldValue('LEFT') || '');
        container.setAttribute('rpin', this.getFieldValue('RIGHT') || '');
        return container;
    },
    domToMutation: function (xmlElement) {
        var bot = xmlElement.getAttribute('bot');
        var left = xmlElement.getAttribute('lpin') || '0';
        var right = xmlElement.getAttribute('rpin') || '0';
        this.updateShape_({"BOT": bot, "LEFT": left, "RIGHT": right});
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
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "RIGHT");
            if (details['LEFT']) {
                this.setFieldValue(details['LEFT'], "LEFT");
            }
            if (details['RIGHT']) {
                this.setFieldValue(details['RIGHT'], "RIGHT");
            }
        }

        // Go through all of the blocks and run the "newRobot" function in each one that has it.
        var blocks = Blockly.getMainWorkspace().getAllBlocks();
        // Iterate through every block.
        for (var x = 0; x < blocks.length; x++) {
            var func = blocks[x].newRobot;
            if (func) {
                func.call(blocks[x], bot);
            }
        }
    }
};

Blockly.propc.ab_drive_init = function () {
    var bot = this.getFieldValue('BOT');

    if (!this.disabled) {
        //if (bot.indexOf('360') > -1) {
        //    Blockly.propc.definitions_["include servo360"] = '#include "servo360.h"';
        //}
        Blockly.propc.definitions_["include abdrive"] = '#include "' + bot + '"';
        if (bot === 'servodiffdrive.h') {
            var left = Number(this.getFieldValue('LEFT'));
            var right = Number(this.getFieldValue('RIGHT'));
            Blockly.propc.setups_["servodiffdrive"] = 'drive_pins(' + left + ',' + right + ');\n';
        }
    }
    return '';
};

Blockly.Blocks.ab_drive_ramping = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_RAMPING_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput('ACCEL')
                .appendField("Robot set acceleration for")
                .appendField(new Blockly.FieldDropdown([
                    ["speed blocks to", "FOR_SPEED"],
                    ["distance blocks to", "FOR_GOTO"]
                ]), "OPS")
                .appendField(new Blockly.FieldDropdown([
                    ["2000 ticks/s\u00B2", "2000"],
                    ["1600 ticks/s\u00B2 (jerky)", "1600"],
                    ["1200 ticks/s\u00B2", "1200"],
                    ["800 ticks/s\u00B2 (peppy)", "800"],
                    ["600 ticks/s\u00B2", "600"],
                    ["400 ticks/s\u00B2 (smooth)", "400"],
                    ["200 ticks/s\u00B2", "200"],
                    ["100 ticks/s\u00B2 (sluggish)", "100"]
                ]), "RAMPING");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.isBot = '';
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('bot', this.isBot);
        container.setAttribute('ramp', this.getFieldValue('RAMPING') || '600');
        container.setAttribute('type', this.getFieldValue('OPS') || 'FOR_SPEED');
        return container;
    },
    domToMutation: function (xmlElement) {
        var bot = xmlElement.getAttribute('bot');
        var type = xmlElement.getAttribute('type') || this.getFieldValue('OPS');
        var ramp = xmlElement.getAttribute('ramp') || this.getFieldValue('RAMPING');
        if (bot) {
            this.newRobot(bot, type, ramp);
        } else {
            this.whichBot();
        }
    },
    whichBot: function () {
        var whichRobot = '';
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        if (allBlocks.indexOf('Robot ActivityBot initialize') > -1)
            whichRobot = 'abdrive.h';
        else if (allBlocks.indexOf('Robot ActivityBot 360\u00b0 initialize') > -1)
            whichRobot = 'abdrive360.h';
        else if (allBlocks.indexOf('Robot Arlo initialize') > -1)
            whichRobot = 'arlodrive.h';
        else if (allBlocks.indexOf('Robot Servo Differential Drive initialize') > -1)
            whichRobot = 'servodiffdrive.h';
        if (this.type === 'ab_drive_ramping') {
            var ramp = this.getFieldValue('RAMPING') || (whichRobot === 'abdrive.h' ? '600' : '300');
            var type = this.getFieldValue('OPS') || 'FOR_SPEED';
            this.isBot = whichRobot;
            this.newRobot(whichRobot, type, ramp);
        } else {
            this.newRobot(whichRobot);
        }
    },
    newRobot: function (robot, type, ramp) {
        this.setWarningText(null);
        var accelMenu = [];
        if (robot === 'abdrive.h') {
            accelMenu = [
                ["not limited", "2400"],
                ["1200 ticks/s\u00B2", "1200"],
                ["800 ticks/s\u00B2 (peppy)", "800"],
                ["600 ticks/s\u00B2", "600"],
                ["400 ticks/s\u00B2 (smooth)", "400"],
                ["200 ticks/s\u00B2", "200"],
                ["100 ticks/s\u00B2 (sluggish)", "100"]
            ];
        } else if (robot === 'abdrive360.h') {
        accelMenu = [
                ["Not limited", "1200"],
                ["600 ticks/s\u00B2 (peppy)", "600"],
                ["500 ticks/s\u00B2", "450"],
                ["400 ticks/s\u00B2", "300"],
                ["300 ticks/s\u00B2", "225"],
                ["200 ticks/s\u00B2", "150"],
                ["100 ticks/s\u00B2", "75"],
                ["50 ticks/s\u00B2 (sluggish)", "50"]
            ];
        }
        this.removeInput('ACCEL');
        if (robot === 'abdrive.h' || robot === 'arlodrive.h' || robot === 'abdrive360.h') {
            this.appendDummyInput('ACCEL')
                    .appendField("Robot set acceleration for")
                    .appendField(new Blockly.FieldDropdown([
                        ["speed blocks to", "FOR_SPEED"],
                        ["distance blocks to", "FOR_GOTO"]
                    ]), "OPS")
                    .appendField(new Blockly.FieldDropdown(accelMenu), "RAMPING");
            this.setFieldValue(type || 'FOR_SPEED', 'OPS');
            this.setFieldValue(ramp || (robot === 'abdrive.h' ? '600' : '300'), 'RAMPING');
            if (robot === 'arlodrive.h')
                this.setWarningText('WARNING: This block does not currently work for the Arlo robot.');
        } else if (robot === '') {
            this.setWarningText('WARNING: You must use a Robot initialize\nblock at the beginning of your program!');
            this.appendDummyInput('ACCEL')
                    .appendField("Robot set acceleration");
        } else {
            this.appendDummyInput('ACCEL')
                    .appendField("Robot set acceleration to")
                    .appendField(new Blockly.FieldDropdown(accelMenu), "RAMPING");
            this.setFieldValue(ramp || '600', 'RAMPING');
        }
    }
};

Blockly.propc.ab_drive_ramping = function () {
    var ramping = Number(this.getFieldValue('RAMPING'));
    var ops = this.getFieldValue('OPS');

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Robot ActivityBot initialize') > -1 ||
            allBlocks.indexOf('Robot Arlo initialize') > -1 ||
            allBlocks.indexOf('Robot ActivityBot 360\u00b0 initialize') > -1) {
        return 'drive_setAcceleration(' + ops + ', ' + ramping.toString(10) + ');\n';
    } else if (allBlocks.indexOf('Robot Servo Differential Drive initialize') > -1) {
        return 'drive_setRampStep(' + (ramping / 50).toString(10) + ',' + (ramping / 50).toString(10) + ');\n';
    } else {
        return '// Robot drive system is not initialized!\n';
    }
};

Blockly.Blocks.ab_drive_get_ticks = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_GET_TICKS_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput('ACCEL')
                .appendField("Robot encoders store left count in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'LEFT')
                .appendField("right count in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'RIGHT');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.whichBot();
    },
    whichBot: Blockly.Blocks['ab_drive_ramping'].whichBot,
    newRobot: function (robot) {
        if (robot === 'abdrive.h' || robot === 'abdrive360.h' || robot === 'arlodrive.h') {
            this.setWarningText(null);
        } else if (robot === '') {
            this.setWarningText('WARNING: You must use a Robot initialize\nblock at the beginning of your program!');
        } else {
            this.setWarningText('WARNING: This block is not compatible with Servo Differential Drive');
        }
    }
};

Blockly.propc.ab_drive_get_ticks = function () {
    var left = Blockly.propc.variableDB_.getName(this.getFieldValue('LEFT'), Blockly.Variables.NAME_TYPE);
    var right = Blockly.propc.variableDB_.getName(this.getFieldValue('RIGHT'), Blockly.Variables.NAME_TYPE);

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Robot ActivityBot initialize') > -1 ||
            allBlocks.indexOf('Robot ActivityBot 360\u00b0 initialize') > -1 ||
            allBlocks.indexOf('Robot Arlo initialize') > -1) {
        return 'drive_getTicks(&' + left + ', &' + right + ');\n';
    } else {
        return '// Robot drive system is not initialized or non-ActivityBot Robot selected!\n';
    }
};

Blockly.Blocks.ab_drive_goto = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_DRIVE_DISTANCE_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField('Robot drive distance in')
                .appendField(new Blockly.FieldDropdown([["ticks", "TICK"], ["centimeters", "CM"], ["inches", "INCH"]]), "UNITS");
        this.appendValueInput("LEFT")
                .appendField('R,-4227330,4227330,0', 'RANGEVALS0')   // this number is derived from (2^31)/508
                .setCheck('Number')                                  // where 508 is the largest multiplier
                .setAlign(Blockly.ALIGN_RIGHT)                       // used in the scaling functions below.
                .appendField("left");                                // keeps the user input from going above 2^31
        this.appendValueInput("RIGHT")                               // (max for a 32-bit integer)
                .appendField('R,-4227330,4227330,0', 'RANGEVALS1')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("right");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.whichBot();
    },
    whichBot: Blockly.Blocks['ab_drive_ramping'].whichBot,
    newRobot: function (robot) {
        if (robot === 'servodiffdrive.h') {
            this.setWarningText('WARNING: Servo Differential Drive\ndoes not support "Robot drive distance"!');
        } else if (robot === '') {
            this.setWarningText('WARNING: You must use a Robot initialize\nblock at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    }
};

Blockly.propc.ab_drive_goto = function () {
    var left = Blockly.propc.valueToCode(this, 'LEFT', Blockly.propc.ORDER_NONE) || '0';
    var right = Blockly.propc.valueToCode(this, 'RIGHT', Blockly.propc.ORDER_NONE) || '0';
    var units = this.getFieldValue('UNITS');

    var code = '';
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Robot ActivityBot initialize') > -1 ||
            allBlocks.indexOf('Robot ActivityBot 360\u00b0 initialize') > -1) {
        if (units === 'TICK') {
            code += 'drive_goto(' + left + ', ' + right + ');\n';
        } else if (units === 'CM') {
            code += 'drive_goto((' + left + ' * 40)/13, (' + right + ' * 40)/13);\n';
        } else {
            code += 'drive_goto((' + left + ' * 508)/65, (' + right + ' * 508)/65);\n';
        }
    } else if (allBlocks.indexOf('Robot Arlo initialize') > -1) {
        if (units === 'TICK') {
            code += 'drive_goto(' + left + ', ' + right + ');\n';
        } else if (units === 'CM') {
            code += 'drive_goto((' + left + ' * 253)/90, (' + right + ' * 253)/90);\n';
        } else {
            code += 'drive_goto((' + left + ' * 50)/7, (' + right + ' * 50)/7);\n';
        }
    } else if (allBlocks.indexOf('Robot Servo Differential Drive initialize') > -1) {
        code += '// Servo Differential Drive does not support "Drive Distance"\n';
    } else {
        code += '// Robot drive system is not initialized!\n';
    }

    return code;
};

Blockly.Blocks.ab_drive_goto_max_speed = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_DISTANCE_MAX_SPEED_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendValueInput("SPEED")
                .appendField('Robot set max speed (+/-) for', 'TITLE')
                .appendField(new Blockly.FieldDropdown([
                    ["speed blocks", "FOR_SPEED"],
                    ["distance blocks", "FOR_GOTO"]
                ], function (ops) {
                    this.sourceBlock_.applyTo(ops);
                }), "OPS")
                .appendField('R,0,128,0', 'RANGEVALS0')
                .setCheck('Number');
        this.getField('RANGEVALS0').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.whichBot();
    },
    whichBot: Blockly.Blocks['ab_drive_ramping'].whichBot,
    newRobot: function (robot) {
        if (robot === 'servodiffdrive.h') {
            this.setWarningText('WARNING: Servo Differential Drive\ndoes not support this block');
        } else if (robot === 'arlodrive.h') {
            this.setWarningText('WARNING: This block does not currently work for the Arlo robot.');
        } else if (robot === '') {
            this.setWarningText('WARNING: You must use a Robot initialize\nblock at the beginning of your program!');
        } else {
            this.setWarningText(null);
        }
    },
    applyTo: function (ops) {

        if (ops === 'FOR_SPEED') {
            this.setFieldValue('Robot set max speed (+/-) for', 'TITLE');
        } else if (ops === 'FOR_GOTO') {
            this.setFieldValue('Robot set speed (+/-) for', 'TITLE');
        }
    }
};

Blockly.propc.ab_drive_goto_max_speed = function () {
    var speed = Blockly.propc.valueToCode(this, 'SPEED', Blockly.propc.ORDER_NONE) || '128';
    var ops = this.getFieldValue("OPS");

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Robot ActivityBot initialize') > -1 ||
            allBlocks.indexOf('Robot ActivityBot 360\u00b0 initialize') > -1) {
        return 'drive_setMaxVelocity(' + ops + ', ' + speed + ');\n';
    } else if (allBlocks.indexOf('Robot Arlo initialize') > -1) {
        return '// Set max speed is not supported for this robot\n';
    } else if (allBlocks.indexOf('Robot Servo Differential Drive initialize') > -1) {
        return '// Servo Differential Drive does not support this block\n';
    } else {
        return '// Robot drive system is not initialized!\n';
    }
};

Blockly.Blocks.ab_drive_speed = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_DRIVE_SPEED_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField('Robot drive speed', 'TITLE');
        this.appendValueInput("LEFT")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('R,-128,128,0', 'RANGEVALS0')
                .appendField("left");
        this.appendValueInput("RIGHT")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('R,-128,128,0', 'RANGEVALS1')
                .appendField("right");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.whichBot();
    },
    whichBot: Blockly.Blocks['ab_drive_ramping'].whichBot,
    newRobot: function (robot) {
        var connectionRight_ = this.getInput('RIGHT').connection;
        var connectionLeft_ = this.getInput('LEFT').connection;
        var blockLeft_ = connectionLeft_.targetBlock();
        var blockRight_ = connectionRight_.targetBlock();
        var warnText = null;
        var rangeText = 'R,-128,128,0';

        if (blockLeft_)
            blockLeft_.outputConnection.disconnect();
        if (blockRight_)
            blockRight_.outputConnection.disconnect();
        this.removeInput('LEFT');
        this.removeInput('RIGHT');

        if (robot === 'servodiffdrive.h' || robot === 'arlodrive.h') {
            rangeText = 'R,-500,500,0';
        } else if (robot === '') {
            warnText = 'WARNING: You must use a Robot initialize\nblock at the beginning of your program!';
            rangeText = 'N,0,0,0';
        }

        this.appendValueInput("LEFT")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(rangeText, 'RANGEVALS0')
                .appendField("left");
        this.appendValueInput("RIGHT")
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(rangeText, 'RANGEVALS1')
                .appendField("right");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.setWarningText(warnText);

        if (blockLeft_)
            blockLeft_.outputConnection.connect(this.getInput('LEFT').connection);
        if (blockRight_)
            blockRight_.outputConnection.connect(this.getInput('RIGHT').connection);

        if (blockLeft_)
            if (blockLeft_.onchange)
                blockLeft_.onchange.call(blockLeft_);
        if (blockRight_)
            if (blockRight_.onchange)
                blockRight_.onchange.call(blockRight_);
    }
};

Blockly.propc.ab_drive_speed = function () {
    var left = Blockly.propc.valueToCode(this, 'LEFT', Blockly.propc.ORDER_NONE) || '0';
    var right = Blockly.propc.valueToCode(this, 'RIGHT', Blockly.propc.ORDER_NONE) || '0';

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Robot ActivityBot initialize') > -1 ||
            allBlocks.indexOf('Robot Arlo initialize') > -1 ||
            allBlocks.indexOf('Robot ActivityBot 360\u00b0 initialize') > -1) {
        return 'drive_speed(' + left + ', ' + right + ');\n';
    } else if (allBlocks.indexOf('Robot Servo Differential Drive initialize') > -1) {
        return 'drive_speeds(' + left + ', ' + right + ');\n';
    } else {
        return '// Robot drive system is not initialized!\n';
    }
};

Blockly.Blocks.ab_drive_stop = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_DRIVE_STOP_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField("Robot drive stop");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.ab_drive_stop = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('Robot ActivityBot initialize') > -1 ||
            allBlocks.indexOf('Robot Arlo initialize') > -1 ||
            allBlocks.indexOf('Robot ActivityBot 360\u00b0 initialize') > -1) {
        return 'drive_speed(0, 0);\n';
    } else if (allBlocks.indexOf('Robot Servo Differential Drive initialize') > -1) {
        return 'drive_speeds(0, 0);\n';
    } else {
        return '// Robot drive system is not initialized!\n';
    }
};

Blockly.Blocks.activitybot_calibrate = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_ACTIVITYBOT_CALIBRATE_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["ActivityBot", "abcalibrate.h"],
                    ["ActivityBot 360\u00b0", "abcalibrate360.h"]]), "BOT")
                .appendField("calibrate");
    }
};

Blockly.propc.activitybot_calibrate = function () {
    var bot = this.getFieldValue('BOT') || 'abcalibrate.h';
    var servo = '';
    //if (bot === "abcalibrate360.h") {
    //    servo = "#include \"servo360.h\"\n";
    //}
    Blockly.propc.definitions_["activitybot_calibrate"] = servo + '#include "' + bot + '"';
    Blockly.propc.setups_["activitybot_calibrate"] = 'cal_servoPins(12, 13);\n\tcal_encoderPins(14, 15);';

    return 'high(26);\nhigh(27);\ncal_activityBot();\nlow(26);\nlow(27);\n';
};

Blockly.Blocks.activitybot_display_calibration = {
    helpUrl: Blockly.MSG_ROBOT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ROBOT_ACTIVITYBOT_DISPLAY_CALIBRATION_TOOLTIP);
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["ActivityBot", "abdrive.h"],
                    ["ActivityBot 360\u00b0", "abcalibrate360.h"]]), "BOT")
                .appendField("display calibration")
                .appendField(new Blockly.FieldDropdown([
                    ['results', 'result'],
                    ['data', 'table']]), 'TYPE');
    }
};

Blockly.propc.activitybot_display_calibration = function () {
    var bot = this.getFieldValue('BOT') || 'abdrive.h';
    var servo = '';
    //if (bot === "abcalibrate360.h") {
    //    servo = "#include \"servo360.h\"\n";
    //}
    Blockly.propc.definitions_["activitybot_calibrate"] = servo + '#include "' + bot + '"';
    Blockly.propc.serial_terminal_ = true;

    if (bot === 'abdrive.h') {
        if (this.getFieldValue('TYPE') === 'table') {
            return 'drive_displayInterpolation();\n';
        } else {
            return 'drive_calibrationResults();\n';
        }
    } else {
        if (this.getFieldValue('TYPE') === 'table') {
            return 'cal_displayData();\n';
        } else {
            return 'cal_displayResults();\n';
        }
    }
};

Blockly.Blocks.mcp320x_read = {
    helpUrl: Blockly.MSG_ANALOG_PULSES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MCP320X_READ_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput('SELECTS')
                .appendField("A/D chip read ")
                .appendField(new Blockly.FieldDropdown([["MCP3002", "02"], ["MCP3004", "04"], ["MCP3008", "08"], ["MCP3202", "22"], ["MCP3204", "24"], ["MCP3208", "28"], ["ADC0831", "81"]], function (ch_c) {
                    this.sourceBlock_.updateShape_({"CH_C": ch_c});
                }), "CHIP")
                .appendField("CLK")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK_PIN")
                .appendField("DO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DO_PIN")
                .appendField("DI")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "DI_PIN")
                .appendField("CS")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "CS_PIN");
        this.appendDummyInput('CHANNELS')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("channel")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "CHAN")
                .appendField("in volt-100ths");
        this.setInputsInline(false);
        this.setOutput(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var ch_c = this.getFieldValue('CHIP');
        var cs_pin = this.getFieldValue('CS_PIN');
        var ck_pin = this.getFieldValue('CLK_PIN');
        var do_pin = this.getFieldValue('DO_PIN');
        var di_pin = this.getFieldValue('DI_PIN');
        container.setAttribute('chip', ch_c);
        container.setAttribute('cs_pin', cs_pin);
        container.setAttribute('ck_pin', ck_pin);
        container.setAttribute('do_pin', do_pin);
        container.setAttribute('di_pin', di_pin);
        return container;
    },
    domToMutation: function (xmlElement) {
        var ch_c = xmlElement.getAttribute('chip');
        var ck_pin = xmlElement.getAttribute('cs_pin', cs_pin);
        var cs_pin = xmlElement.getAttribute('ck_pin', ck_pin);
        var do_pin = xmlElement.getAttribute('do_pin', do_pin);
        var di_pin = xmlElement.getAttribute('di_pin', di_pin);
        this.updateShape_({"CH_C": ch_c, "CK": ck_pin, "CS": cs_pin, "DO": do_pin, "DI": di_pin});
    },
    updateShape_: function (details) {

        var num = details['CH_C'];
        if (details['CH_C'] === undefined)
            num = this.getFieldValue('CH_C');
        var ck_pin = details['CK'];
        if (details['CK'] === undefined)
            ck_pin = this.getFieldValue('CLK_PIN');
        var cs_pin = details['CS'];
        if (details['CS'] === undefined)
            cs_pin = this.getFieldValue('CS_PIN');
        var do_pin = details['DO'];
        if (details['DO'] === undefined)
            do_pin = this.getFieldValue('DO_PIN');
        var di_pin = details['DI'];
        if (details['DI'] === undefined)
            di_pin = this.getFieldValue('DI_PIN');


        var chan_count = [];

        for (var i = 0; i < parseInt(num[1]); i++) {
            chan_count.push([i.toString(), i.toString()]);
        }

        if (this.getInput('CHANNELS'))
            this.removeInput('CHANNELS');
        this.removeInput('SELECTS');
        if (num[1] === '1') {
            this.appendDummyInput('SELECTS')
                    .appendField("A/D chip read")
                    .appendField(new Blockly.FieldDropdown([["MCP3002", "02"], ["MCP3004", "04"], ["MCP3008", "08"], ["MCP3202", "22"], ["MCP3204", "24"], ["MCP3208", "28"], ["ADC0831", "81"]], function (ch_c) {
                        this.sourceBlock_.updateShape_({"CH_C": ch_c});
                    }), "CHIP")
                    .appendField("CLK")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK_PIN")
                    .appendField("DO")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "DO_PIN")
                    .appendField("CS")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "CS_PIN")
                    .appendField("in volt-100ths")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "DI_PIN");
            var di_pin_field = this.getField("DI_PIN");
            di_pin_field.setVisible(false);
        } else {
            this.appendDummyInput('SELECTS')
                    .appendField("A/D chip read")
                    .appendField(new Blockly.FieldDropdown([["MCP3002", "02"], ["MCP3004", "04"], ["MCP3008", "08"], ["MCP3202", "22"], ["MCP3204", "24"], ["MCP3208", "28"], ["ADC0831", "81"]], function (ch_c) {
                        this.sourceBlock_.updateShape_({"CH_C": ch_c});
                    }), "CHIP")
                    .appendField("CLK")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "CLK_PIN")
                    .appendField("DO")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "DO_PIN")
                    .appendField("DI")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "DI_PIN")
                    .appendField("CS")
                    .appendField(new Blockly.FieldDropdown(profile.default.digital), "CS_PIN");
            this.appendDummyInput('CHANNELS')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField("channel")
                    .appendField(new Blockly.FieldDropdown(chan_count), "CHAN")
                    .appendField("in volt-100ths");
        }
        this.setFieldValue(num, "CHIP");
        this.setFieldValue(ck_pin, "CLK_PIN");
        this.setFieldValue(cs_pin, "CS_PIN");
        this.setFieldValue(do_pin, "DO_PIN");
        this.setFieldValue(di_pin, "DI_PIN");

    }
};

Blockly.propc.mcp320x_read = function () {
    var chip = parseInt(this.getFieldValue('CHIP')[1]);
    var res = '1' + this.getFieldValue('CHIP')[0];
    var cs_pin = this.getFieldValue('CS_PIN');
    var clk_pin = this.getFieldValue('CLK_PIN');
    var do_pin = this.getFieldValue('DO_PIN');
    var di_pin = this.getFieldValue('DI_PIN');
    var channel = '000' + parseInt(this.getFieldValue('CHAN')).toString(2);

    if (chip < 4) {
        channel = "11" + channel.substr(channel.length - 1, channel.length) + "1";
    } else {
        channel = "11" + channel.substr(channel.length - 3, channel.length) + "0";
    }

    if (!this.disabled) {
        Blockly.propc.global_vars_["adc_set_vref"] = 'int __Mvref = 330;';
        var func = '';
        var code = '';

        if (res === '18' & chip === 1) {
            func += 'int read_adc0831(int __McsPin, int __MclkPin, int __MdoPin, int __MVr)';
            func += '{low(__MclkPin);\nlow(__McsPin);\npulse_out(__MclkPin, 250);\n';
            func += 'int __Mvolts = shift_in(__MdoPin, __MclkPin, MSBPOST, 8);\nhigh(__McsPin);\n';
            func += 'return ((__Mvolts * __MVr) / 256);}';
            Blockly.propc.methods_["adc083x_read"] = func;
            Blockly.propc.method_declarations_["adc083x_read"] = 'int read_adc0831(int __McsPin, int __MclkPin, int __MdoPin, int __MVr);\n';

            code += 'read_adc083x(' + cs_pin + ', ' + clk_pin + ', ' + do_pin + ', __Mvref)';
        } else {
            func += 'int read_mcp320x(int __McsPin, int __MclkPin, int __MdoPin, int __MdiPin, int __Mbits, int __Mdata, int __MVr, int __Mres) {\n';
            func += '  high(__McsPin);  low(__MclkPin);  low(__McsPin);\n';
            func += '  shift_out(__MdiPin, __MclkPin, MSBFIRST, __Mbits, __Mdata);\n';
            func += '  int __Mvolts = shift_in(__MdoPin, __MclkPin, MSBPOST, __Mres);\n';
            func += '  high(__McsPin);  high(__MclkPin);\n  return ((__Mvolts * __MVr) / pow(2,__Mres));}';
            Blockly.propc.methods_["mcp320x_read"] = func;
            Blockly.propc.method_declarations_["mcp320x_read"] = 'int read_mcp320x(int __McsPin, int __MclkPin, int __MdoPin, int __MdiPin, int __Mbits, int __Mdata, int __MVr, int __Mres);\n';

            code += 'read_mcp320x(' + cs_pin + ', ' + clk_pin + ', ' + do_pin;
            code += ', ' + di_pin + ', ' + channel.length + ', 0b' + channel + ', __Mvref, ' + res + ')';
        }
    }


    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.mcp320x_set_vref = {
    helpUrl: Blockly.MSG_ANALOG_PULSES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MCP320X_SET_VREF_TOOLTIP);
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("A/D set Vref to")
                .appendField(new Blockly.FieldTextInput('330',
                        Blockly.FieldTextInput.numberValidator), "VREF")
                .appendField("volt 100ths");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    }
};

Blockly.propc.mcp320x_set_vref = function () {
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
    if (allBlocks.indexOf('A/D chip read') > -1)
    {
        var vref = parseInt(this.getFieldValue('VREF'));
        return '__Mvref = ' + vref + ';\n';
    } else {
        return '';
    }
};
