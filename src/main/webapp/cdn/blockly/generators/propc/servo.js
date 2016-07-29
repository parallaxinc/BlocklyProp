/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Generating Spin for servo blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 * @author valetolpegin@gmail.com (Vale Tolpegin)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};


Blockly.Blocks.servo_move = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("servo")
                .appendField("pin#")
                .appendField(new Blockly.FieldDropdown(profile.default.servo), "PIN");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("degrees (0 - 180°)")
                .appendField(new Blockly.FieldAngle(180), "DEGREES");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.servo_speed = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("servo speed")
                .appendField("pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
        this.appendDummyInput()
                .appendField("speed")
                .appendField(new Blockly.FieldDropdown([["-1", "-1"], ["-2", "-2"], ["-3", "-3"], ["-4", "-4"], ["-5", "-5"], ["-6", "-6"], ["-7", "-7"], ["-8", "-8"], ["-9", "-9"], ["-10", "-10"], ["-11", "-11"], ["-12", "-12"], ["-13", "-13"], ["-14", "-14"], ["-15", "-15"], ["-16", "-16"], ["-17", "-17"], ["-18", "-18"], ["-19", "-19"], ["-20", "-20"], ["-21", "-21"], ["-22", "-22"], ["-23", "-23"], ["-24", "-24"], ["-25", "-25"], ["-26", "-26"], ["-27", "-27"], ["-28", "-28"], ["-29", "-29"], ["-30", "-30"], ["-31", "-31"], ["-32", "-32"], ["-33", "-33"], ["-34", "-34"], ["-35", "-35"], ["-36", "-36"], ["-37", "-37"], ["-38", "-38"], ["-39", "-39"], ["-40", "-40"], ["-41", "-41"], ["-42", "-42"], ["-43", "-43"], ["-44", "-44"], ["-45", "-45"], ["-46", "-46"], ["-47", "-47"], ["-48", "-48"], ["-49", "-49"], ["-50", "-50"], ["-51", "-51"], ["-52", "-52"], ["-53", "-53"], ["-54", "-54"], ["-55", "-55"], ["-56", "-56"], ["-57", "-57"], ["-58", "-58"], ["-59", "-59"], ["-60", "-60"], ["-61", "-61"], ["-62", "-62"], ["-63", "-63"], ["-64", "-64"], ["-65", "-65"], ["-66", "-66"], ["-67", "-67"], ["-68", "-68"], ["-69", "-69"], ["-70", "-70"], ["-71", "-71"], ["-72", "-72"], ["-73", "-73"], ["-74", "-74"], ["-75", "-75"], ["-76", "-76"], ["-77", "-77"], ["-78", "-78"], ["-79", "-79"], ["-80", "-80"], ["-81", "-81"], ["-82", "-82"], ["-83", "-83"], ["-84", "-84"], ["-85", "-85"], ["-86", "-86"], ["-87", "-87"], ["-88", "-88"], ["-89", "-89"], ["-90", "-90"], ["-91", "-91"], ["-92", "-92"], ["-93", "-93"], ["-94", "-94"], ["-95", "-95"], ["-96", "-96"], ["-97", "-97"], ["-98", "-98"], ["-99", "-99"], ["-100", "-100"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["54", "54"], ["55", "55"], ["56", "56"], ["57", "57"], ["58", "58"], ["59", "59"], ["60", "60"], ["61", "61"], ["62", "62"], ["63", "63"], ["64", "64"], ["65", "65"], ["66", "66"], ["67", "67"], ["68", "68"], ["69", "69"], ["70", "70"], ["71", "71"], ["72", "72"], ["73", "73"], ["74", "74"], ["75", "75"], ["76", "76"], ["77", "77"], ["78", "78"], ["79", "79"], ["80", "80"], ["81", "81"], ["82", "82"], ["83", "83"], ["84", "84"], ["85", "85"], ["86", "86"], ["87", "87"], ["88", "88"], ["89", "89"], ["90", "90"], ["91", "91"], ["92", "92"], ["93", "93"], ["94", "94"], ["95", "95"], ["96", "96"], ["97", "97"], ["98", "98"], ["99", "99"], ["100", "100"]]), 'SPEED');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.servo_set_ramp = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("servo set ramp")
                .appendField("pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
        this.appendValueInput('RAMPSTEP')
                .appendField("rampstep (0 - 100)")
                .setCheck('Number');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.servodiffdrive_library_drive_pins = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("Drive pins")
                .appendField("left pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'LEFT_PIN');
        this.appendDummyInput()
                .appendField("right pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), 'RIGHT_PIN');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.servodiffdrive_library_drive_speed = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("Set drive speeds")
                .appendField("Left speed")
                .appendField(new Blockly.FieldDropdown([["-1", "-1"], ["-2", "-2"], ["-3", "-3"], ["-4", "-4"], ["-5", "-5"], ["-6", "-6"], ["-7", "-7"], ["-8", "-8"], ["-9", "-9"], ["-10", "-10"], ["-11", "-11"], ["-12", "-12"], ["-13", "-13"], ["-14", "-14"], ["-15", "-15"], ["-16", "-16"], ["-17", "-17"], ["-18", "-18"], ["-19", "-19"], ["-20", "-20"], ["-21", "-21"], ["-22", "-22"], ["-23", "-23"], ["-24", "-24"], ["-25", "-25"], ["-26", "-26"], ["-27", "-27"], ["-28", "-28"], ["-29", "-29"], ["-30", "-30"], ["-31", "-31"], ["-32", "-32"], ["-33", "-33"], ["-34", "-34"], ["-35", "-35"], ["-36", "-36"], ["-37", "-37"], ["-38", "-38"], ["-39", "-39"], ["-40", "-40"], ["-41", "-41"], ["-42", "-42"], ["-43", "-43"], ["-44", "-44"], ["-45", "-45"], ["-46", "-46"], ["-47", "-47"], ["-48", "-48"], ["-49", "-49"], ["-50", "-50"], ["-51", "-51"], ["-52", "-52"], ["-53", "-53"], ["-54", "-54"], ["-55", "-55"], ["-56", "-56"], ["-57", "-57"], ["-58", "-58"], ["-59", "-59"], ["-60", "-60"], ["-61", "-61"], ["-62", "-62"], ["-63", "-63"], ["-64", "-64"], ["-65", "-65"], ["-66", "-66"], ["-67", "-67"], ["-68", "-68"], ["-69", "-69"], ["-70", "-70"], ["-71", "-71"], ["-72", "-72"], ["-73", "-73"], ["-74", "-74"], ["-75", "-75"], ["-76", "-76"], ["-77", "-77"], ["-78", "-78"], ["-79", "-79"], ["-80", "-80"], ["-81", "-81"], ["-82", "-82"], ["-83", "-83"], ["-84", "-84"], ["-85", "-85"], ["-86", "-86"], ["-87", "-87"], ["-88", "-88"], ["-89", "-89"], ["-90", "-90"], ["-91", "-91"], ["-92", "-92"], ["-93", "-93"], ["-94", "-94"], ["-95", "-95"], ["-96", "-96"], ["-97", "-97"], ["-98", "-98"], ["-99", "-99"], ["-100", "-100"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["54", "54"], ["55", "55"], ["56", "56"], ["57", "57"], ["58", "58"], ["59", "59"], ["60", "60"], ["61", "61"], ["62", "62"], ["63", "63"], ["64", "64"], ["65", "65"], ["66", "66"], ["67", "67"], ["68", "68"], ["69", "69"], ["70", "70"], ["71", "71"], ["72", "72"], ["73", "73"], ["74", "74"], ["75", "75"], ["76", "76"], ["77", "77"], ["78", "78"], ["79", "79"], ["80", "80"], ["81", "81"], ["82", "82"], ["83", "83"], ["84", "84"], ["85", "85"], ["86", "86"], ["87", "87"], ["88", "88"], ["89", "89"], ["90", "90"], ["91", "91"], ["92", "92"], ["93", "93"], ["94", "94"], ["95", "95"], ["96", "96"], ["97", "97"], ["98", "98"], ["99", "99"], ["100", "100"]]), 'LEFT_SPEED');
        this.appendDummyInput()
                .appendField("Right speed")
                .appendField(new Blockly.FieldDropdown([["-1", "-1"], ["-2", "-2"], ["-3", "-3"], ["-4", "-4"], ["-5", "-5"], ["-6", "-6"], ["-7", "-7"], ["-8", "-8"], ["-9", "-9"], ["-10", "-10"], ["-11", "-11"], ["-12", "-12"], ["-13", "-13"], ["-14", "-14"], ["-15", "-15"], ["-16", "-16"], ["-17", "-17"], ["-18", "-18"], ["-19", "-19"], ["-20", "-20"], ["-21", "-21"], ["-22", "-22"], ["-23", "-23"], ["-24", "-24"], ["-25", "-25"], ["-26", "-26"], ["-27", "-27"], ["-28", "-28"], ["-29", "-29"], ["-30", "-30"], ["-31", "-31"], ["-32", "-32"], ["-33", "-33"], ["-34", "-34"], ["-35", "-35"], ["-36", "-36"], ["-37", "-37"], ["-38", "-38"], ["-39", "-39"], ["-40", "-40"], ["-41", "-41"], ["-42", "-42"], ["-43", "-43"], ["-44", "-44"], ["-45", "-45"], ["-46", "-46"], ["-47", "-47"], ["-48", "-48"], ["-49", "-49"], ["-50", "-50"], ["-51", "-51"], ["-52", "-52"], ["-53", "-53"], ["-54", "-54"], ["-55", "-55"], ["-56", "-56"], ["-57", "-57"], ["-58", "-58"], ["-59", "-59"], ["-60", "-60"], ["-61", "-61"], ["-62", "-62"], ["-63", "-63"], ["-64", "-64"], ["-65", "-65"], ["-66", "-66"], ["-67", "-67"], ["-68", "-68"], ["-69", "-69"], ["-70", "-70"], ["-71", "-71"], ["-72", "-72"], ["-73", "-73"], ["-74", "-74"], ["-75", "-75"], ["-76", "-76"], ["-77", "-77"], ["-78", "-78"], ["-79", "-79"], ["-80", "-80"], ["-81", "-81"], ["-82", "-82"], ["-83", "-83"], ["-84", "-84"], ["-85", "-85"], ["-86", "-86"], ["-87", "-87"], ["-88", "-88"], ["-89", "-89"], ["-90", "-90"], ["-91", "-91"], ["-92", "-92"], ["-93", "-93"], ["-94", "-94"], ["-95", "-95"], ["-96", "-96"], ["-97", "-97"], ["-98", "-98"], ["-99", "-99"], ["-100", "-100"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["54", "54"], ["55", "55"], ["56", "56"], ["57", "57"], ["58", "58"], ["59", "59"], ["60", "60"], ["61", "61"], ["62", "62"], ["63", "63"], ["64", "64"], ["65", "65"], ["66", "66"], ["67", "67"], ["68", "68"], ["69", "69"], ["70", "70"], ["71", "71"], ["72", "72"], ["73", "73"], ["74", "74"], ["75", "75"], ["76", "76"], ["77", "77"], ["78", "78"], ["79", "79"], ["80", "80"], ["81", "81"], ["82", "82"], ["83", "83"], ["84", "84"], ["85", "85"], ["86", "86"], ["87", "87"], ["88", "88"], ["89", "89"], ["90", "90"], ["91", "91"], ["92", "92"], ["93", "93"], ["94", "94"], ["95", "95"], ["96", "96"], ["97", "97"], ["98", "98"], ["99", "99"], ["100", "100"]]), 'RIGHT_SPEED');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.servodiffdrive_library_drive_setRamp = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("Set drive ramp")
                .appendField("left ramp")
                .appendField(new Blockly.FieldDropdown([["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), 'LEFT_RAMP');
        this.appendDummyInput()
                .appendField("right ramp")
                .appendField(new Blockly.FieldDropdown([["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), 'RIGHT_RAMP');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.servodiffdrive_library_drive_sleep = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("Drive sleep");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.servodiffdrive_library_drive_stop = {
    init: function () {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
                .appendField("Drive stop");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.pwm_start = {
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("PWM start");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.pwm_set = {
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("PWM set")
                .appendField("pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput()
                .appendField("channel")
                .appendField(new Blockly.FieldDropdown([["A", "0"], ["B", "1"]]), "CHANNEL");
        this.appendValueInput("DUTY_CYCLE", Number)
                .setCheck('Number')
                .appendField("duty cycle (0 - 100)");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.pwm_stop = {
    init: function () {
        this.setColour(colorPalette.getColor('io'));
        this.appendDummyInput()
                .appendField("PWM stop");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.servo_move = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var degrees = Blockly.propc.valueToCode(this, 'DEGREES', Blockly.propc.ORDER_NONE);

    Blockly.propc.definitions_["include servo"] = '#include "servo.h"';

    var code = 'servo_angle(' + dropdown_pin + ', ' + degrees + ' * 10);\n';
    return code;
};

Blockly.propc.servo_speed = function () {
    var pin = this.getFieldValue('PIN');
    var speed = this.getFieldValue('SPEED');

    Blockly.propc.definitions_["include servo"] = '#include "servo.h"';

    return 'servo_speed(' + pin + ', ' + speed + ');\n';
};

Blockly.propc.servo_set_ramp = function () {
    var pin = this.getFieldValue('PIN');
    var ramp_step = Blockly.propc.valueToCode(this, 'RAMPSTEP', Blockly.propc.ORDER_NONE);

    if (Number(ramp_step) < 0) {
      ramp_step = "0"
    } else if (Number(ramp_step) > 100) {
      ramp_step = "100"
    }

    Blockly.propc.definitions_["include servo"] = '#include "servo.h"';

    return 'servo_setramp(' + pin + ', ' + ramp_step + ');\n';
};

Blockly.propc.servodiffdrive_library_drive_pins = function () {
    var left_pin = this.getFieldValue('LEFT_PIN');
    var right_pin = this.getFieldValue('RIGHT_PIN');

    return 'drive_pins(' + left_pin + ', ' + right_pin + ');\n';
};

Blockly.propc.servodiffdrive_library_drive_speed = function () {
    var left_speed = this.getFieldValue('LEFT_SPEED');
    var right_speed = this.getFieldValue('RIGHT_SPEED');

    return 'drive_speeds(' + left_speed + ', ' + right_speed + ');\n';
};

Blockly.propc.servodiffdrive_library_drive_setRamp = function () {
    var left_ramp = this.getFieldValue('LEFT_RAMP');
    var right_ramp = this.getFieldValue('RIGHT_RAMP');

    return 'drive_setramp(' + left_ramp + ', ' + right_ramp + ');\n';
};

Blockly.propc.servodiffdrive_library_drive_sleep = function () {
    return 'drive_sleep();\n';
};

Blockly.propc.servodiffdrive_library_drive_stop = function () {
    return 'drive_stop();\n';
};

Blockly.propc.pwm_start = function () {
    var code = 'pwm_start(100);\n';
    return code;
};

Blockly.propc.pwm_set = function () {
    var pin = this.getFieldValue("PIN");
    var channel = this.getFieldValue("CHANNEL");
    var duty_cycle = Blockly.propc.valueToCode(this, "DUTY_CYCLE", Blockly.propc.ORDER_NONE);

    if (Number(duty_cycle) < 0) {
        duty_cycle = '0';
    } else if (Number(duty_cycle) > 100) {
        duty_cycle = '100';
    }

    var code = 'pwm_start(' + pin + ', ' + channel + ', ' + duty_cycle + ');\n';
    return code;
};

Blockly.propc.pwm_stop = function () {
    var code = 'pwm_stop();\n';
    return code;
};
