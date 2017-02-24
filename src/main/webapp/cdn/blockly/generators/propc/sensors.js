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
 * @fileoverview Generating C for sensor blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 *         valetolpegin@gmail.com    (Vale Tolpegin)
 *         jewald@parallax.com       (Jim Ewald)
 *         mmatz@parallax.com        (Matthew Matz)
 *         kgracey@parallax.com      (Ken Gracey)
 *         carsongracey@gmail.com    (Carson Gracey)
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

// ---------------- 2-axis Joystick Blocks -------------------------------------
Blockly.Blocks.joystick_input_yaxis = {
    helpUrl: Blockly.MSG_JOYSTICK_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_JOYSTICK_INPUT_YAXIS_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Joystick y-axis A/D")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "PINY");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.joystick_input_yaxis = function () {
    var pin_number_yaxis = this.getFieldValue('PINY');

    Blockly.propc.definitions_["include abvolts"] = '#include "abvolts.h"';

    var code = 'ad_in(' + pin_number_yaxis + ') * 100 / 4096';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.joystick_input_xaxis = {
    helpUrl: Blockly.MSG_JOYSTICK_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_JOYSTICK_INPUT_XAXIS_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Joystick x-axis A/D")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "PINX");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.joystick_input_xaxis = function () {
    var pin_number_xaxis = this.getFieldValue('PINX');

    Blockly.propc.definitions_["include abvolts"] = '#include "abvolts.h"';

    var code = 'ad_in(' + pin_number_xaxis + ') * 100 / 4096';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

// ---------------- Ping))) Sensor Blocks --------------------------------------
Blockly.Blocks.sensor_ping = {
    helpUrl: Blockly.MSG_PING_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SENSOR_PING_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Ping))) distance in")
                .appendField(new Blockly.FieldDropdown([["inches", "_inches"], ["cm", "_cm"]]), "UNIT")
                .appendField("PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.sensor_ping = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var unit = this.getFieldValue('UNIT');

    Blockly.propc.definitions_["include ping"] = '#include "ping.h"';

    var code = 'ping' + unit + '(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

// ---------------- PIR Sensor Blocks ------------------------------------------
Blockly.Blocks.PIR_Sensor = {
    helpUrl: Blockly.MSG_PIR_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_PIR_SENSOR_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("PIR Sensor PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.PIR_Sensor = function () {
    var pin = this.getFieldValue('PIN');

    var code = 'input(' + pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

// ---------------- SF02 Laser Rangefinder Blocks ------------------------------
/*
 Blockly.Blocks.SF02_Laser_Rangefinder = {
 init: function () {
 this.setColour(colorPalette.getColor('input'));
 this.appendDummyInput()
 .appendField("SF02 Laser Rangefinder PIN")
 .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
 
 this.setOutput(true, 'Number');
 this.setPreviousStatement(false, null);
 this.setNextStatement(false, null);
 }
 };
 
 Blockly.propc.SF02_Laser_Rangefinder = function() {
 var pin = this.getFieldValue('PIN');
 
 Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
 Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
 
 var code = 'ad_volts(' + pin + ')';
 return [code, Blockly.propc.ORDER_ATOMIC];
 };
 */

// ---------------- Sound Impact Sensor Blocks ---------------------------------
Blockly.Blocks.sound_impact_run = {
    helpUrl: Blockly.MSG_SOUND_IMPACT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SOUND_IMPACT_RUN_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Sound Impact initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.propc.sound_impact_run = function () {
    var pin = this.getTitleValue('PIN');

    Blockly.propc.definitions_["sound_impact"] = '#include "soundimpact.h"';
    Blockly.propc.setups_["sound_impact"] = 'int *__soundimpactcog = soundImpact_run(' + pin + ');\n';

    return '';
};

Blockly.Blocks.sound_impact_get = {
    helpUrl: Blockly.MSG_SOUND_IMPACT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SOUND_IMPACT_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Sound Impact get count");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.sound_impact_get = function () {
    Blockly.propc.definitions_["sound_impact"] = '#include "soundimpact.h"';

    if (Blockly.propc.setups_["sound_impact"] === undefined)
    {
        return '// Missing sound impact sensor declaration statement';
    }

    var code = 'soundImpact_getCount()';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.sound_impact_end = {
    helpUrl: Blockly.MSG_SOUND_IMPACT_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SOUND_IMPACT_END_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Sound Impact close");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.sound_impact_end = function () {
    Blockly.propc.definitions_["sound_impact"] = '#include "soundimpact.h"';
    if (Blockly.propc.setups_["sound_impact"] === undefined)
    {
        return '// Missing sound impact sensor declaration statement';
    }

    return 'soundImpact_end(__soundimpactcog);\n';
};

// ---------------- ColorPal Color Sensor Blocks -------------------------------
Blockly.Blocks.colorpal_enable = {
    helpUrl: Blockly.MSG_COLORPAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_COLORPAL_ENABLE_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("ColorPal initialize PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'IO_PIN');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.colorpal_enable = function () {
    Blockly.propc.global_vars_["colorpal"] = 'colorPal *cpal;';
    Blockly.propc.definitions_["colorpal"] = '#include "colorpal.h"';

    var pin = this.getFieldValue('IO_PIN');

    Blockly.propc.setups_["colorpal"] = 'cpal = colorPal_open(' + pin + ');';

    return '';
};

Blockly.Blocks.colorpal_get_colors_raw = {
    helpUrl: Blockly.MSG_COLORPAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_COLORPAL_GET_COLORS_RAW_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("ColorPal raw colors store R in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'R_STORAGE');
        this.appendDummyInput()
                .appendField("G in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'G_STORAGE');
        this.appendDummyInput()
                .appendField("B in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'B_STORAGE');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('R_STORAGE'), this.getFieldValue('G_STORAGE'), this.getFieldValue('B_STORAGE')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('R_STORAGE'))) {
            this.setTitleValue(newName, 'R_STORAGE');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('G_STORAGE'))) {
            this.setTitleValue(newName, 'G_STORAGE');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('B_STORAGE'))) {
            this.setTitleValue(newName, 'B_STORAGE');
        }
    }
};

Blockly.propc.colorpal_get_colors_raw = function () {
    var r = Blockly.propc.variableDB_.getName(this.getFieldValue('R_STORAGE'), Blockly.Variables.NAME_TYPE);
    var g = Blockly.propc.variableDB_.getName(this.getFieldValue('G_STORAGE'), Blockly.Variables.NAME_TYPE);
    var b = Blockly.propc.variableDB_.getName(this.getFieldValue('B_STORAGE'), Blockly.Variables.NAME_TYPE);

    return 'colorPal_getRGB(cpal, &' + r + ', &' + g + ', &' + b + ');';
};

Blockly.Blocks.colorpal_get_colors = {
    helpUrl: Blockly.MSG_COLORPAL_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_COLORPAL_GET_COLORS_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("ColorPal store color in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'COLOR');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('COLOR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('COLOR'))) {
            this.setTitleValue(newName, 'COLOR');
        }
    }
};

Blockly.propc.colorpal_get_colors = function () {
    var color_var = Blockly.propc.variableDB_.getName(this.getFieldValue('COLOR'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.global_vars_["colorpal_rr"] = 'int cpRR = 0;';
    Blockly.propc.global_vars_["colorpal_gg"] = 'int cpGG = 0;';
    Blockly.propc.global_vars_["colorpal_bb"] = 'int cpBB = 0;';

    var code = 'colorPal_getRGB(cpal, &cpRR, &cpGG, &cpBB);\n\t' + color_var + ' = colorPalRRGGBB(cpRR, cpGG, cpBB);';
    return code;
};

// -------------- Fingerprint Scanner Blocks -----------------------------------
Blockly.Blocks.fp_scanner_init = {
    helpUrl: Blockly.MSG_FPS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_FPS_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Fingerprint Scanner initialize RX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "RXPIN")
                .appendField("TX")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "TXPIN")
                .appendField("allow overwrite")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "OW");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.fp_scanner_init = function () {
    var rxpin = this.getFieldValue('RXPIN');
    var txpin = this.getFieldValue('TXPIN');
    var ow = this.getFieldValue('OW');

    Blockly.propc.global_vars_["fpScannerObj"] = 'fpScanner *fpScan;';
    Blockly.propc.definitions_["fpScannerDef"] = '#include "fingerprint.h"';

    Blockly.propc.setups_["fpScanner"] = 'fpScan = fingerprint_open(' + rxpin + ', ' + txpin + ');';

    if (ow === "TRUE")
        Blockly.propc.setups_["fpScanOverWrite"] = 'fingerprint_allowOverwrite(fpScan, 1);';
    else
        Blockly.propc.setups_["fpScanOverWrite"] = 'fingerprint_allowOverwrite(fpScan, 0);';

    return '';
};

Blockly.Blocks.fp_scanner_add = {
    helpUrl: Blockly.MSG_FPS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_FPS_ADD_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Fingerprint Scanner")
                .appendField(new Blockly.FieldDropdown([["add", "ADD"], ["delete", "DEL"], ["delete all users", "ALL"]], function (action) {
                    this.sourceBlock_.setAction_({"ACTION": action});
                }), "ACTION");
        this.appendValueInput("USER")
                .setCheck("Number")
                .appendField("user");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('ACTION');
        container.setAttribute('action', action);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        this.setAction_({"ACTION": action});
    },
    setAction_: function (details) {
        var inputIs = this.getInput('USER');
        if (details['ACTION'] !== 'ALL') {
            if (!inputIs) {
                this.appendValueInput("USER")
                        .setCheck("Number")
                        .appendField("user");
            }
        } else {
            if (inputIs)
                this.removeInput('USER');
        }
    }
};

Blockly.propc.fp_scanner_add = function () {
    var act = this.getFieldValue('ACTION');
    var usr = '1';
    if (act !== "ALL")
        usr = Blockly.propc.valueToCode(this, 'USER', Blockly.propc.NONE) || '1';

    var code = '';

    if (Blockly.propc.global_vars_["fpScannerObj"] === 'fpScanner *fpScan;') {
        if (act === 'ADD')
            code = 'fingerprint_add(fpScan, ' + usr + ', 3, 0);\n';
        if (act === 'DEL')
            code = 'fingerprint_deleteUser(fpScan, ' + usr + ');\n';
        if (act === 'ALL')
            code = 'fingerprint_deleteUser(fpScan, 0);\n';
    } else {
        code = '// ERROR: Fingerprint Scanner is not initialized!\n';
    }

    return code;
};

Blockly.Blocks.fp_scanner_scan = {
    helpUrl: Blockly.MSG_FPS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_FPS_SCAN_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Fingerprint Scanner")
                .appendField(new Blockly.FieldDropdown([["scan", "SCAN"], ["scan and compare", "COMP"], ["count users", "COUNT"]], function (action) {
                    this.sourceBlock_.setAction_({"ACTION": action});
                }), "ACTION");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var action = this.getFieldValue('ACTION');
        container.setAttribute('action', action);
        return container;
    },
    domToMutation: function (xmlElement) {
        var action = xmlElement.getAttribute('action');
        this.setAction_({"ACTION": action});
    },
    setAction_: function (details) {
        var inputIs = this.getInput('USER');
        if (details['ACTION'] === 'COMP') {
            if (!inputIs) {
                this.appendValueInput("USER")
                        .setCheck("Number")
                        .appendField("to user");
            }
        } else {
            if (inputIs)
                this.removeInput('USER');
        }
    }
};

Blockly.propc.fp_scanner_scan = function () {
    var act = this.getFieldValue('ACTION');
    var usr = '1';
    if (act === "COMP")
        usr = Blockly.propc.valueToCode(this, 'USER', Blockly.propc.NONE) || '1';

    var func = 'int fingerScanner(int __u) {';
    func += 'int r;\nfingerprint_scan(fpScan, __u, &r);\n';
    func += 'if (__u != 0 && r != 0) return 1;\n else return r;}';

    var code = '0';

    if (Blockly.propc.global_vars_["fpScannerObj"] === 'fpScanner *fpScan;') {
        if (act === 'SCAN') {
            Blockly.propc.global_vars_["fpScannerFunc"] = func;
            code = 'fingerScanner(0)';
        }
        if (act === 'COMP') {
            Blockly.propc.global_vars_["fpScannerFunc"] = func;
            code = 'fingerScanner(' + usr + ')';
        }
        if (act === 'COUNT')
            code = 'fingerScanner(fpScan)';
    }
    //code = 'toast';
    return [code, Blockly.propc.ORDER_ATOMIC];
};


// -------------Memsic Tilt/Accel (MX2125 Module) ------------------------------
Blockly.Blocks.MX2125_acceleration_xaxis = {
    helpUrl: Blockly.MSG_MEMSIC_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MX2125_ACCELERATION_XAXIS_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Memsic acceleration x-axis PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINX");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.MX2125_acceleration_xaxis = function () {
    var pin = this.getFieldValue('PINX');

    Blockly.propc.definitions_["include_mx2125"] = '#include "mx2125.h"';

    var code = 'mx_accel(' + pin + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.MX2125_acceleration_yaxis = {
    helpUrl: Blockly.MSG_MEMSIC_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MX2125_ACCELERATION_YAXIS_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Memsic acceleration y-axis PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINY");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.MX2125_acceleration_yaxis = function () {
    Blockly.propc.definitions_["include_mx2125"] = '#include "mx2125.h"';

    var pin = this.getFieldValue('PINY');
    var code = 'mx_accel(' + pin + ')';

    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.MX2125_rotation = {
    helpUrl: Blockly.MSG_MEMSIC_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MX2125_ROTATION_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Memsic rotation x-axis PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINX")
                .appendField("y-axis PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINY");

        this.setInputsInline(true);
        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.MX2125_rotation = function () {
    var pinx = this.getFieldValue('PINX');
    var piny = this.getFieldValue('PINY');

    Blockly.propc.definitions_["include_mx2125"] = '#include "mx2125.h"';

    var code = 'mx_rotate(' + pinx + ', ' + piny + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.MX2125_tilt_xaxis = {
    helpUrl: Blockly.MSG_MEMSIC_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MX2125_TILT_XAXIS_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Memsic tilt x-axis PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINX");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.MX2125_tilt_xaxis = function () {
    var pin = this.getFieldValue('PINX');

    Blockly.propc.definitions_["include_mx2125"] = '#include "mx2125.h"';

    var code = 'mx_tilt(' + pin + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

Blockly.Blocks.MX2125_tilt_yaxis = {
    helpUrl: Blockly.MSG_MEMSIC_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MX2125_TILT_YAXIS_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Memsic tilt y-axis PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINY");

        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.MX2125_tilt_yaxis = function () {
    var pin = this.getFieldValue('PINY');

    Blockly.propc.definitions_["include_mx2125"] = '#include "mx2125.h"';

    var code = 'mx_tilt(' + pin + ')';
    return [code, Blockly.propc.ORDER_NONE];
};

// --------------Accelerometer (MMA7455 Module) Blocks--------------------------
Blockly.Blocks.MMA7455_init = {
    helpUrl: Blockly.MSG_ACCELEROMETER_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MMA7455_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Accelerometer initialize CS")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINZ")
                .appendField("DATA")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINX")
                .appendField("CLK")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PINY");

        this.setInputsInline(false);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.propc.MMA7455_init = function () {
    var pinx = this.getFieldValue('PINX');
    var piny = this.getFieldValue('PINY');
    var pinz = this.getFieldValue('PINZ');

    Blockly.propc.definitions_["include_mma7455"] = '#include "mma7455.h"';
    Blockly.propc.setups_["mma_7455"] = 'MMA7455_init(' + pinx + ', ' + piny + ', ' + pinz + ');\n';

    return '';
};

Blockly.Blocks.MMA7455_acceleration = {
    helpUrl: Blockly.MSG_ACCELEROMETER_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_MMA7455_ACCELERATION_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Accelerometer store x-axis in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'X_VAR')
                .appendField(" y-axis in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'Y_VAR')
                .appendField(" z-axis in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'Z_VAR');

        this.setInputsInline(false);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('X_VAR'), this.getFieldValue('Y_VAR'), this.getFieldValue('Z_VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('X_VAR'))) {
            this.setTitleValue(newName, 'X_VAR');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('Y_VAR'))) {
            this.setTitleValue(newName, 'Y_VAR');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('Z_VAR'))) {
            this.setTitleValue(newName, 'Z_VAR');
        }
    }
};

Blockly.propc.MMA7455_acceleration = function () {

    var xstorage = Blockly.propc.variableDB_.getName(this.getFieldValue('X_VAR'), Blockly.Variables.NAME_TYPE);
    var ystorage = Blockly.propc.variableDB_.getName(this.getFieldValue('Y_VAR'), Blockly.Variables.NAME_TYPE);
    var zstorage = Blockly.propc.variableDB_.getName(this.getFieldValue('Z_VAR'), Blockly.Variables.NAME_TYPE);

    return 'MMA7455_getxyz10(&' + xstorage + ', &' + ystorage + ', &' + zstorage + ');\n';
};

//-----------------------Compass (HMC5883L Module) Blocks ----------------------
Blockly.Blocks.HMC5883L_init = {
    helpUrl: Blockly.MSG_COMPASS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_HMC5883L_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Compass initialize SCL")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SCL");
        this.appendDummyInput()
                .appendField("SDA")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "SDA");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.HMC5883L_init = function () {
    var scl = this.getFieldValue("SCL");
    var sda = this.getFieldValue("SDA");

    Blockly.propc.definitions_["HMC5883L"] = '#include "compass3d.h"';
    Blockly.propc.setups_["HMC5883L"] = 'i2c *compass_bus = i2c_newbus(' + scl + ', ' + sda + ', 0);\n\tcompass_init(compass_bus);';

    return '';
};

Blockly.Blocks.HMC5883L_read = {
    helpUrl: Blockly.MSG_COMPASS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_HMC5883L_READ_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Compass heading store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'HEADING');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('HEADING')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('HEADING'))) {
            this.setTitleValue(newName, 'HEADING');
        }
    }
};

Blockly.propc.HMC5883L_read = function () {
    var storage = Blockly.propc.variableDB_.getName(this.getFieldValue('HEADING'), Blockly.Variables.NAME_TYPE);
    Blockly.propc.global_vars_["compass_vars"] = 'int __compX, __compY, __compZ;\nfloat __compH;\n';

    var code = '';
    code += 'compass_read(bus, &__compX, &__compY, &__compZ);\n';
    code += '\t__compH = atan2(((float) __compY), (((float) __compX)) * 180.0/PI;\n';
    code += '\tif(__compH < 0.0) __compH = (360.0 + __compH);\n';
    code += '\t' + storage + ' = (int) __compH;\n';

    return code;
};

// ------------------ IMU (LSM9DS1 module) Blocks ------------------------------
Blockly.Blocks.lsm9ds1_init = {
    helpUrl: Blockly.MSG_IMU_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_LSM9DS1_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("IMU initialize SCL")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_SCL")
                .appendField("SDIO")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_SDIO")
                .appendField("CS_AG")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_CSAG")
                .appendField("CS_M")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_CSM");

        this.setInputsInline(false);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.propc.lsm9ds1_init = function () {
    var pin_scl = this.getFieldValue('PIN_SCL');
    var pin_sio = this.getFieldValue('PIN_SDIO');
    var pin_csa = this.getFieldValue('PIN_CSAG');
    var pin_csm = this.getFieldValue('PIN_CSM');

    Blockly.propc.definitions_["include_lsm9ds1"] = '#include "lsm9ds1.h"';
    Blockly.propc.setups_["lsm9ds1_init"] = 'imu_init(' + pin_scl + ', ' + pin_sio + ', ' + pin_csa + ', ' + pin_csm + ');\n';
    Blockly.propc.global_vars_["lsm9ds1_vars"] = 'float __imuX, __imuY, __imuZ, __compI;\n';

    return '';
};

Blockly.Blocks.lsm9ds1_mag_calibrate = {
    helpUrl: Blockly.MSG_IMU_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_LSM9DS1_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("IMU calibrate magnetometer");

        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.propc.lsm9ds1_mag_calibrate = function () {
    return 'high(26);high(27);imu_calibrateMag();low(26);low(27);';
};

Blockly.Blocks.lsm9ds1_read = {
    helpUrl: Blockly.MSG_IMU_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_LSM9DS1_READ_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("IMU read")
                .appendField(new Blockly.FieldDropdown([["accelerometer (100ths of g's)", "Accel"], ["gyroscope (100ths of deg/s)", "Gyro"], ["magnetometer (100ths of gauss)", "Mag"]]), "SENSOR")
                .appendField("store X-axis in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'X_VAR')
                .appendField(" y-axis in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'Y_VAR')
                .appendField(" z-axis in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'Z_VAR');
        this.setInputsInline(false);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('X_VAR'), this.getFieldValue('Y_VAR'), this.getFieldValue('Z_VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('X_VAR'))) {
            this.setTitleValue(newName, 'X_VAR');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('Y_VAR'))) {
            this.setTitleValue(newName, 'Y_VAR');
        } else if (Blockly.Names.equals(oldName, this.getFieldValue('Z_VAR'))) {
            this.setTitleValue(newName, 'Z_VAR');
        }
    }
};

Blockly.propc.lsm9ds1_read = function () {
    var sensor = this.getFieldValue('SENSOR');
    var xstorage = Blockly.propc.variableDB_.getName(this.getFieldValue('X_VAR'), Blockly.Variables.NAME_TYPE);
    var ystorage = Blockly.propc.variableDB_.getName(this.getFieldValue('Y_VAR'), Blockly.Variables.NAME_TYPE);
    var zstorage = Blockly.propc.variableDB_.getName(this.getFieldValue('Z_VAR'), Blockly.Variables.NAME_TYPE);

    var code = '';
    if (Blockly.propc.definitions_["include_lsm9ds1"] === '#include "lsm9ds1.h"') {
        code += 'imu_read' + sensor + 'Calculated(&__imuX, &__imuY, &__imuZ);\n';
        code += xstorage + ' = (int) (100.0 * __imuX);\n';
        code += ystorage + ' = (int) (100.0 * __imuY);\n';
        code += zstorage + ' = (int) (100.0 * __imuZ);\n';
    } else {
        code += "// LSM9DS1 IMU is not initialized!\n";
    }

    return code;
};

Blockly.Blocks.lsm9ds1_tilt = {
    helpUrl: Blockly.MSG_IMU_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_LSM9DS1_TILT_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("IMU tilt")
                .appendField(new Blockly.FieldDropdown([["x-axis", "X"], ["y-axis", "Y"], ["z-axis", "Z"]], function (action) {
                    this.sourceBlock_.setAxes_({"ACTION": action});
                }), "G_AXIS")
                .appendField("points up/down");
        this.appendDummyInput('TILT1')
                .appendField("store y-tilt in", 'A1')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR1');
        this.appendDummyInput('TILT2')
                .appendField("z-tilt in", 'A2')
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR2');
        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    },
    setAxes_: function (details) {
        var theVar1 = this.getFieldValue('VAR1');
        var theVar2 = this.getFieldValue('VAR2');
        this.removeInput('TILT1');
        this.removeInput('TILT2');
        if (details['ACTION'] === 'X') {
            this.appendDummyInput('TILT1')
                    .appendField("store y-tilt in", 'A1')
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR1');
            this.appendDummyInput('TILT2')
                    .appendField("z-tilt in", 'A2')
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR2');
        } else if (details['ACTION'] === 'Y') {
            this.appendDummyInput('TILT1')
                    .appendField("store x-tilt in", 'A1')
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR1');
            this.appendDummyInput('TILT2')
                    .appendField("z-tilt in", 'A2')
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR2');
        } else {
            this.appendDummyInput('TILT1')
                    .appendField("store x-tilt in", 'A1')
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR1');
            this.appendDummyInput('TILT2')
                    .appendField("y-tilt in", 'A2')
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR2');
        }
        this.setFieldValue(theVar1, 'VAR1');
        this.setFieldValue(theVar2, 'VAR2');
    },
    getVars: function () {
        return [this.getFieldValue('VAR1'), this.getFieldValue('VAR2')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR1')))
            this.setTitleValue(newName, 'VAR1');
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR2')))
            this.setTitleValue(newName, 'VAR2');
    }
};

Blockly.propc.lsm9ds1_tilt = function () {
    var t1_axis = '__imu' + this.getFieldValue('A1')[0].toUpperCase();
    var t2_axis = '__imu' + this.getFieldValue('A2')[0].toUpperCase();
    var g_axis = '__imu' + this.getFieldValue('G_AXIS');
    var storage1 = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR1'), Blockly.Variables.NAME_TYPE);
    var storage2 = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR2'), Blockly.Variables.NAME_TYPE);

    var code = '';
    if (Blockly.propc.definitions_["include_lsm9ds1"] === '#include "lsm9ds1.h"') {
        code += 'imu_readAccelCalculated(&__imuX, &__imuY, &__imuZ);\n';
        code += storage1 + ' = (int) (atan2(' + t1_axis + ', ' + g_axis + ') * 180.0/PI);\n';
        code += storage2 + ' = (int) (atan2(' + t2_axis + ', ' + g_axis + ') * 180.0/PI);\n';
    } else {
        code += "// LSM9DS1 IMU is not initialized!\n";
    }

    return code;
};

Blockly.Blocks.lsm9ds1_heading = {
    helpUrl: Blockly.MSG_IMU_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_LSM9DS1_HEADING_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("IMU heading")
                .appendField(new Blockly.FieldDropdown([
                    ["z-axis points forward", "__imuZ"],
                    ["z-axis points backward", "(-1.0*__imuZ)"],
                    ["y-axis points forward", "__imuY"],
                    ["y axis points backward", "(-1.0*__imuY)"],
                    ["x-axis points forward", "(-1.0*__imuX)"],
                    ["x-axis points backward", "__imuX"]],
                        function (action) {
                            this.sourceBlock_.setAxes_({"ACTION": action});
                        }), "FB_AXIS")
                .appendField(' ');
        this.appendDummyInput('MENU2')
                .appendField(new Blockly.FieldDropdown([
                    ["y-axis points left", "__imuY"],
                    ["y-axis points right", "(-1.0*__imuY)"],
                    ["x-axis points left", "(-1.0*__imuX)"],
                    ["x-axis points right", "__imuX"]
                ]), "LR_AXIS")
                .appendField("store in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    },
    setAxes_: function (details) {
        var theVar = this.getFieldValue('VAR');
        this.removeInput('MENU2');
        var wh = details['ACTION'][details['ACTION'].length - 1];
        if (wh === ')')
            wh = details['ACTION'][details['ACTION'].length - 2];
        if (wh === 'X') {
            this.appendDummyInput('MENU2')
                    .appendField(new Blockly.FieldDropdown([
                        ["y-axis points left", "__imuY"],
                        ["y-axis points right", "(-1.0*__imuY)"],
                        ["z-axis points left", "__imuZ"],
                        ["z-axis points right", "(-1.0*__imuZ)"]
                    ]), "LR_AXIS")
                    .appendField("store in")
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        } else if (wh === 'Y') {
            this.appendDummyInput('MENU2')
                    .appendField(new Blockly.FieldDropdown([
                        ["x-axis points left", "(-1.0*__imuX)"],
                        ["x-axis points right", "__imuX"],
                        ["z-axis points left", "__imuZ"],
                        ["z-axis points right", "(-1.0*__imuZ)"]
                    ]), "LR_AXIS")
                    .appendField("store in")
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        } else {
            this.appendDummyInput('MENU2')
                    .appendField(new Blockly.FieldDropdown([
                        ["y-axis points left", "__imuY"],
                        ["y-axis points right", "(-1.0*__imuY)"],
                        ["x-axis points left", "(-1.0*__imuX)"],
                        ["x-axis points right", "__imuX"]
                    ]), "LR_AXIS")
                    .appendField("store in")
                    .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        }
        this.setFieldValue(theVar, 'VAR');
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.propc.lsm9ds1_heading = function () {
    var fb_axis = this.getFieldValue('FB_AXIS');
    var lr_axis = this.getFieldValue('LR_AXIS');
    var storage = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    var code = '';
    if (Blockly.propc.definitions_["include_lsm9ds1"] === '#include "lsm9ds1.h"') {
        code += 'imu_readMagCalculated(&__imuX, &__imuY, &__imuZ);\n';
        code += '__compI = atan2(' + lr_axis + ', ' + fb_axis + ') * 180.0/PI;\n';
        code += 'if(__compI < 0.0) __compI = (360.0 + __compI);\n';
        code += storage + ' = (int) __compI;\n';
    } else {
        code += "// LSM9DS1 IMU is not initialized!\n";
    }

    return code;
};

// ------------------ GPS (PAM7Q module) Blocks --------------------------------
Blockly.Blocks.PAM_7Q_Init = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("PAM7Q GPS Module");
        this.appendDummyInput()
                .appendField("RX pin#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "RXPIN");
        this.appendDummyInput()
                .appendField("TX pin#")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "TXPIN");
        this.appendDummyInput()
                .appendField("baud")
                .appendField(new Blockly.FieldDropdown([["2400", "2400"], ["9600", "9600"], ["19200", "19200"]]), "BAUD");

        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
    }
};

Blockly.propc.PAM_7Q_Init = function () {
    var rx_pin = this.getFieldValue('RXPIN');
    var tx_pin = this.getFieldValue('TXPIN');
    var baud = this.getFieldValue('BAUD');

    Blockly.propc.definitions_["include PAM7Q"] = '#include "gps.h"';

    var code = 'gps_open(' + rx_pin + ', ' + tx_pin + ', ' + baud + ');\npause(100)';
    return code;
};

Blockly.Blocks.PAM_7Q_Latitude = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("get latitude");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.PAM_7Q_Latitude = function () {
    Blockly.propc.definitions_["include PAM7Q"] = '#include "gps.h"';

    var code = 'gps_latitude()';
    return code;
};

Blockly.Blocks.PAM_7Q_Longitude = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("get longitude");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.PAM_7Q_Longitude = function () {
    Blockly.propc.definitions_["include PAM7Q"] = '#include "gps.h"';

    var code = 'gps_longitude()';
    return code;
};

Blockly.Blocks.PAM_7Q_Heading = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("get heading");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.PAM_7Q_Heading = function () {
    Blockly.propc.definitions_["include PAM7Q"] = '#include "gps.h"';

    var code = '(int)gps_heading()';
    return code;
};

Blockly.Blocks.PAM_7Q_Altitude = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("get altitude");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.PAM_7Q_Altitude = function () {
    Blockly.propc.definitions_["include PAM7Q"] = '#include "gps.h"';

    var code = 'gps_altitude()';
    return code;
};

Blockly.Blocks.PAM_7Q_SatsTracked = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("get # of satellites tracked");

        this.setOutput(true, 'Number');
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.propc.PAM_7Q_SatsTracked = function () {
    Blockly.propc.definitions_["include PAM7Q"] = '#include "gps.h"';

    var code = 'gps_satsTracked()';
    return code;
};

Blockly.Blocks.PAM_7Q_Velocity = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("get velocity in units")
                .appendField(new Blockly.FieldDropdown([["mph", "MPH"], ["knots", "KNOTS"]]), "VELOCITYUNITS");

        this.setOutput(true, 'Number');
        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
    }
};

Blockly.propc.PAM_7Q_Velocity = function () {
    var velocity_units = this.getFieldValue('VELOCITYUNITS');

    Blockly.propc.definitions_["include PAM7Q"] = '#include "gps.h"';

    var code = 'gps_velocity(' + velocity_units + ')';
    return code;
};

// ------------------ RFID Reader Blocks ---------------------------------------
Blockly.Blocks.rfid_get = {
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_RFID_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("RFID store reading in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'BUFFER');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    },
    getVars: function () {
        return [this.getFieldValue('BUFFER')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('BUFFER'))) {
            this.setTitleValue(newName, 'BUFFER');
        }
    }
};

Blockly.propc.rfid_get = function () {
    var saveVariable = Blockly.propc.variableDB_.getName(this.getFieldValue('BUFFER'), Blockly.Variables.NAME_TYPE);

    Blockly.propc.global_vars_["rfid_buffer"] = "char *rfidBfr;";
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    var code = 'rfidBfr = rfid_get(rfid, 500);\n\tsscan(&rfidBfr[2], "%x", &' + saveVariable + ');\n\tif(' + saveVariable + ' == 237) ' + saveVariable + ' = 0;';
    return code;
};

Blockly.Blocks.rfid_disable = {
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_RFID_DISABLE_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("RFID")
                .appendField(new Blockly.FieldDropdown([
                    ["disable", "DISABLE"],
                    ["enable", "ENABLE"]
                ]), "ACTION");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.rfid_disable = function () {
    var data = this.getFieldValue('ACTION');
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    if (data === "ENABLE") {
        return 'rfid_enable(rfid);';
    } else {
        return 'rfid_disable(rfid);';
    }
};

Blockly.Blocks.rfid_enable = {
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_RFID_ENABLE_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("RFID initialize EN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_IN");
        this.appendDummyInput()
                .appendField("SOUT")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN_OUT");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.rfid_enable = function () {
    var pin_in = this.getFieldValue('PIN_IN');
    var pin_out = this.getFieldValue('PIN_OUT');

    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';
    Blockly.propc.global_vars_["rfidser"] = 'rfidser *rfid;';
    Blockly.propc.setups_["rfidser_setup"] = 'rfid = rfid_open(' + pin_out + ',' + pin_in + ');';

    return '';
};

Blockly.Blocks.rfid_close = {
    helpUrl: Blockly.MSG_RFID_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_RFID_CLOSE_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("RFID close");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.rfid_close = function () {
    Blockly.propc.definitions_["rfidser"] = '#include "rfidser.h"';

    return 'rfidser_close(rfid);\n';
};

// ------------------ Sony TV Remote (Using 40 kHz IR sensor) Blocks -----------
Blockly.Blocks.sirc_get = {
    helpUrl: Blockly.MSG_SONY_REMOTE_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_SIRC_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Sony Remote value received from PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.sirc_get = function () {
    var pin = this.getFieldValue('PIN');

    Blockly.propc.definitions_["sirc"] = '#include "sirc.h"';
    Blockly.propc.setups_["sirc"] = "sirc_setTimeout(70);\n";

    var code = 'sirc_button(' + pin + ')';
    return [code, Blockly.propc.ORDER_NONE];
};
