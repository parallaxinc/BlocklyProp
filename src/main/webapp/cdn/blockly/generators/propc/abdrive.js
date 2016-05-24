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


Blockly.Blocks.ab_drive_goto = {
    category: 'Drive',
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField('Drive goto')
                .appendField('Left')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'LEFT')
                .appendField('Right')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'RIGHT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.ab_drive_speed = {
    category: 'Drive',
    helpUrl: '',
    init: function() {
        this.setColour(colorPalette.getColor('robot'));
        this.appendDummyInput()
                .appendField('Drive speed')
                .appendField('Left')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'LEFT')
                .appendField('Right')
                .appendField(new Blockly.FieldTextInput('64',
                        Blockly.FieldTextInput.numberValidator), 'RIGHT');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.ab_drive_ramp = {
    init: function() {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
            .appendField("Drive ramp step")
            .appendField("Left speed")
            .appendField(new Blockly.FieldDropdown([["-1", "-1"], ["-2", "-2"], ["-3", "-3"], ["-4", "-4"], ["-5", "-5"], ["-6", "-6"], ["-7", "-7"], ["-8", "-8"], ["-9", "-9"], ["-10", "-10"], ["-11", "-11"], ["-12", "-12"], ["-13", "-13"], ["-14", "-14"], ["-15", "-15"], ["-16", "-16"], ["-17", "-17"], ["-18", "-18"], ["-19", "-19"], ["-20", "-20"], ["-21", "-21"], ["-22", "-22"], ["-23", "-23"], ["-24", "-24"], ["-25", "-25"], ["-26", "-26"], ["-27", "-27"], ["-28", "-28"], ["-29", "-29"], ["-30", "-30"], ["-31", "-31"], [ "-32", "-32"], ["-33", "-33"], ["-34", "-34"], ["-35", "-35"], ["-36", "-36"], ["-37", "-37"], ["-38", "-38"], ["-39", "-39"], ["-40", "-40"], ["-41", "-41"], ["-42", "-42"], ["-43", "-43"], ["-44", "-44"], ["-45", "-45"], ["-46", "-46"], ["-47", "-47"], ["-48", "-48"], ["-49", "-49"], ["-50", "-50"], ["-51", "-51"], ["-52", "-52"], ["-53", "-53"], ["-54", "-54"], ["-55", "-55"], ["-56", "-56"], ["-57", "-57"], ["-58", "-58"], ["-59", "-59"], ["-60", "-60"], ["-61", "-61"], ["-62", "-62"], ["-63", "-63"], ["-64", "-64"], ["-65", "-65"], ["-66", "-66"], ["-67", "-67"], ["-68", "-68"], ["-69", "-69"], ["-70", "-70"], ["-71", "-71"], ["-72", "-72"], ["-73", "-73"], ["-74", "-74"], ["-75", "-75"], ["-76", "-76"], ["-77", "-77"], ["-78", "-78"], ["-79", "-79"], ["-80", "-80"], ["-81", "-81"], ["-82", "-82"], ["-83", "-83"], ["-84", "-84"], ["-85", "-85"], ["-86", "-86"], ["-87", "-87"], ["-88", "-88"], ["-89", "-89"], ["-90", "-90"], ["-91", "-91"], ["-92", "-92"], ["-93", "-93"], ["-94", "-94"], ["-95", "-95"], ["-96", "-96"], ["-97", "-97"], ["-98", "-98"], ["-99", "-99"], ["-100", "-100"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], [ "32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["54", "54"], ["55", "55"], ["56", "56"], ["57", "57"], ["58", "58"], ["59", "59"], ["60", "60"], ["61", "61"], ["62", "62"], ["63", "63"], ["64", "64"], ["65", "65"], ["66", "66"], ["67", "67"], ["68", "68"], ["69", "69"], ["70", "70"], ["71", "71"], ["72", "72"], ["73", "73"], ["74", "74"], ["75", "75"], ["76", "76"], ["77", "77"], ["78", "78"], ["79", "79"], ["80", "80"], ["81", "81"], ["82", "82"], ["83", "83"], ["84", "84"], ["85", "85"], ["86", "86"], ["87", "87"], ["88", "88"], ["89", "89"], ["90", "90"], ["91", "91"], ["92", "92"], ["93", "93"], ["94", "94"], ["95", "95"], ["96", "96"], ["97", "97"], ["98", "98"], ["99", "99"], ["100", "100"]]), 'LEFT_SPEED');
        this.appendDummyInput()
            .appendField("Right speed")
            .appendField(new Blockly.FieldDropdown([["-1", "-1"], ["-2", "-2"], ["-3", "-3"], ["-4", "-4"], ["-5", "-5"], ["-6", "-6"], ["-7", "-7"], ["-8", "-8"], ["-9", "-9"], ["-10", "-10"], ["-11", "-11"], ["-12", "-12"], ["-13", "-13"], ["-14", "-14"], ["-15", "-15"], ["-16", "-16"], ["-17", "-17"], ["-18", "-18"], ["-19", "-19"], ["-20", "-20"], ["-21", "-21"], ["-22", "-22"], ["-23", "-23"], ["-24", "-24"], ["-25", "-25"], ["-26", "-26"], ["-27", "-27"], ["-28", "-28"], ["-29", "-29"], ["-30", "-30"], ["-31", "-31"], [ "-32", "-32"], ["-33", "-33"], ["-34", "-34"], ["-35", "-35"], ["-36", "-36"], ["-37", "-37"], ["-38", "-38"], ["-39", "-39"], ["-40", "-40"], ["-41", "-41"], ["-42", "-42"], ["-43", "-43"], ["-44", "-44"], ["-45", "-45"], ["-46", "-46"], ["-47", "-47"], ["-48", "-48"], ["-49", "-49"], ["-50", "-50"], ["-51", "-51"], ["-52", "-52"], ["-53", "-53"], ["-54", "-54"], ["-55", "-55"], ["-56", "-56"], ["-57", "-57"], ["-58", "-58"], ["-59", "-59"], ["-60", "-60"], ["-61", "-61"], ["-62", "-62"], ["-63", "-63"], ["-64", "-64"], ["-65", "-65"], ["-66", "-66"], ["-67", "-67"], ["-68", "-68"], ["-69", "-69"], ["-70", "-70"], ["-71", "-71"], ["-72", "-72"], ["-73", "-73"], ["-74", "-74"], ["-75", "-75"], ["-76", "-76"], ["-77", "-77"], ["-78", "-78"], ["-79", "-79"], ["-80", "-80"], ["-81", "-81"], ["-82", "-82"], ["-83", "-83"], ["-84", "-84"], ["-85", "-85"], ["-86", "-86"], ["-87", "-87"], ["-88", "-88"], ["-89", "-89"], ["-90", "-90"], ["-91", "-91"], ["-92", "-92"], ["-93", "-93"], ["-94", "-94"], ["-95", "-95"], ["-96", "-96"], ["-97", "-97"], ["-98", "-98"], ["-99", "-99"], ["-100", "-100"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], [ "32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["54", "54"], ["55", "55"], ["56", "56"], ["57", "57"], ["58", "58"], ["59", "59"], ["60", "60"], ["61", "61"], ["62", "62"], ["63", "63"], ["64", "64"], ["65", "65"], ["66", "66"], ["67", "67"], ["68", "68"], ["69", "69"], ["70", "70"], ["71", "71"], ["72", "72"], ["73", "73"], ["74", "74"], ["75", "75"], ["76", "76"], ["77", "77"], ["78", "78"], ["79", "79"], ["80", "80"], ["81", "81"], ["82", "82"], ["83", "83"], ["84", "84"], ["85", "85"], ["86", "86"], ["87", "87"], ["88", "88"], ["89", "89"], ["90", "90"], ["91", "91"], ["92", "92"], ["93", "93"], ["94", "94"], ["95", "95"], ["96", "96"], ["97", "97"], ["98", "98"], ["99", "99"], ["100", "100"]]), 'RIGHT_SPEED');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.ab_drive_set_ramp_step = {
    init: function() {
        this.setColour(colorPalette.getColor('output'));
        this.appendDummyInput()
            .appendField("Drive set ramp step")
            .appendField("Left rampstep")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]]), 'LEFT_RAMP_STEP');
        this.appendDummyInput()
            .appendField("Right rampstep")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]]), 'RIGHT_RAMP_STEP');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.propc.ab_drive_goto = function() {
    var left = Number(this.getFieldValue('LEFT'));
    var right = Number(this.getFieldValue('RIGHT'));

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_goto(' + left + ', ' + right + ');\n';
};

Blockly.propc.ab_drive_speed = function() {
    var left = Number(this.getFieldValue('LEFT'));
    var right = Number(this.getFieldValue('RIGHT'));

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_speed(' + left + ', ' + right + ');\n';
};

Blockly.propc.ab_drive_ramp = function() {
    var left_speed = this.getFieldValue('LEFT_SPEED');
    var right_speed = this.getFieldValue('RIGHT_SPEED');

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_ramp(' + left_speed + ', ' + right_speed + ');\n';
};

Blockly.propc.ab_drive_set_ramp_step = function() {
    var left_ramp_speed = this.getFieldValue('LEFT_RAMP_STEP');
    var right_ramp_speed = this.getFieldValue('RIGHT_RAMP_STEP');

    Blockly.propc.definitions_["include abdrive"] = '#include "abdrive.h"';

    return 'drive_rampStep(' + left_ramp_speed + ', ' + right_ramp_speed + ');\n';
};
