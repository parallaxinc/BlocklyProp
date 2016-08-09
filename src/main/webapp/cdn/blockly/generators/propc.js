/**
 * Visual Blocks Language
 *
 * Copyright 2014 Creating Future
 * http://code.google.com/p/blockly/
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
 * @fileoverview Helper functions for generating Prop-c for blocks.
 * @author michel@creatingfuture.eu (Michel Lampo)
 */
'use strict';
Blockly.propc = new Blockly.Generator('propc');
Blockly.HSV_SATURATION = 0.75;
Blockly.HSV_VALUE = 0.60;
Blockly.RTL = false;
/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
if (!Blockly.propc.RESERVED_WORDS_) {
    Blockly.propc.RESERVED_WORDS_ = '';
}

Blockly.propc.RESERVED_WORDS_ +=
        // http://arduino.cc/en/Reference/HomePage
        'wait,cogid,if,else,elseif,repeat,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
        ;
/**
 * Order of operation ENUMs.
 *
 */
Blockly.propc.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.propc.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.propc.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.propc.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.propc.ORDER_ADDITIVE = 4; // + -
Blockly.propc.ORDER_SHIFT = 5; // << >>
Blockly.propc.ORDER_RELATIONAL = 7; // is is! >= > <= <
Blockly.propc.ORDER_EQUALITY = 8; // == != === !==
Blockly.propc.ORDER_BITWISE_AND = 9; // &
Blockly.propc.ORDER_BITWISE_XOR = 10; // ^
Blockly.propc.ORDER_BITWISE_OR = 11; // |
Blockly.propc.ORDER_LOGICAL_AND = 12; // &&
Blockly.propc.ORDER_LOGICAL_OR = 13; // ||
Blockly.propc.ORDER_CONDITIONAL = 14; // expr ? expr : expr
Blockly.propc.ORDER_ASSIGNMENT = 15; // := *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.propc.ORDER_NONE = 99; // (...)

/*
 * propc Board profiles
 *
 */
var profile = {
    "activity-board": {
        description: "Parallax propeller Activity board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["26", "26"], ["27", "27"]],
        servo: [["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        eeprom: [["0", "32768"], ["1", "32769"], ["2", "32770"], ["3", "32771"], ["4", "32772"], ["5", "32773"], ["6", "32774"], ["7", "32775"], ["8", "32776"], ["9", "32777"], ["10", "32778"], ["11", "32779"],
            ["12", "32780"], ["13", "32781"], ["14", "32782"], ["15", "32783"], ["16", "32784"], ["17", "32785"], ["18", "32786"], ["19", "32787"], ["20", "32788"], ["21", "32789"], ["22", "32790"],
            ["23", "32791"], ["24", "32792"], ["25", "32793"], ["26", "32794"], ["27", "32795"], ["28", "32796"], ["29", "32797"], ["30", "32798"], ["31", "32799"], ["32", "32800"], ["33", "32801"],
            ["34", "32802"], ["35", "32803"], ["36", "32804"], ["37", "32805"], ["38", "32806"], ["39", "32807"], ["40", "32808"], ["41", "32809"], ["42", "32810"], ["43", "32811"], ["44", "32812"],
            ["45", "32813"], ["46", "32814"], ["47", "32815"], ["48", "32816"], ["49", "32817"], ["50", "32818"], ["51", "32819"], ["52", "32820"], ["53", "32821"], ["54", "32822"], ["55", "32823"],
            ["56", "32824"], ["57", "32825"], ["58", "32826"], ["59", "32827"], ["60", "32828"], ["61", "32829"], ["62", "32830"], ["63", "32831"], ["64", "32832"], ["65", "32833"], ["66", "32834"],
            ["67", "32835"], ["68", "32836"], ["69", "32837"], ["70", "32838"], ["71", "32839"], ["72", "32840"], ["73", "32841"], ["74", "32842"], ["75", "32843"], ["76", "32844"], ["77", "32845"],
            ["78", "32846"], ["79", "32847"], ["80", "32848"], ["81", "32849"], ["82", "32850"], ["83", "32851"], ["84", "32852"], ["85", "32853"], ["86", "32854"], ["87", "32855"], ["88", "32856"],
            ["89", "32857"], ["90", "32858"], ["91", "32859"], ["92", "32860"], ["92", "32861"], ["93", "32862"], ["94", "32863"], ["95", "32864"], ["96", "32865"], ["97", "32866"], ["98", "32867"],
            ["99", "32868"], ["100", "32869"]],
        serial: 9600
    },
    "s3": {
        description: "Parallax propeller C3",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        servo: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        eeprom: [["0", "32768"], ["1", "32769"], ["2", "32770"], ["3", "32771"], ["4", "32772"], ["5", "32773"], ["6", "32774"], ["7", "32775"], ["8", "32776"], ["9", "32777"], ["10", "32778"], ["11", "32779"],
            ["12", "32780"], ["13", "32781"], ["14", "32782"], ["15", "32783"], ["16", "32784"], ["17", "32785"], ["18", "32786"], ["19", "32787"], ["20", "32788"], ["21", "32789"], ["22", "32790"],
            ["23", "32791"], ["24", "32792"], ["25", "32793"], ["26", "32794"], ["27", "32795"], ["28", "32796"], ["29", "32797"], ["30", "32798"], ["31", "32799"], ["32", "32800"], ["33", "32801"],
            ["34", "32802"], ["35", "32803"], ["36", "32804"], ["37", "32805"], ["38", "32806"], ["39", "32807"], ["40", "32808"], ["41", "32809"], ["42", "32810"], ["43", "32811"], ["44", "32812"],
            ["45", "32813"], ["46", "32814"], ["47", "32815"], ["48", "32816"], ["49", "32817"], ["50", "32818"], ["51", "32819"], ["52", "32820"], ["53", "32821"], ["54", "32822"], ["55", "32823"],
            ["56", "32824"], ["57", "32825"], ["58", "32826"], ["59", "32827"], ["60", "32828"], ["61", "32829"], ["62", "32830"], ["63", "32831"], ["64", "32832"], ["65", "32833"], ["66", "32834"],
            ["67", "32835"], ["68", "32836"], ["69", "32837"], ["70", "32838"], ["71", "32839"], ["72", "32840"], ["73", "32841"], ["74", "32842"], ["75", "32843"], ["76", "32844"], ["77", "32845"],
            ["78", "32846"], ["79", "32847"], ["80", "32848"], ["81", "32849"], ["82", "32850"], ["83", "32851"], ["84", "32852"], ["85", "32853"], ["86", "32854"], ["87", "32855"], ["88", "32856"],
            ["89", "32857"], ["90", "32858"], ["91", "32859"], ["92", "32860"], ["92", "32861"], ["93", "32862"], ["94", "32863"], ["95", "32864"], ["96", "32865"], ["97", "32866"], ["98", "32867"],
            ["99", "32868"], ["100", "32869"]],
        serial: 9600
    },
    "heb": {
        description: "Parallax propeller proto board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        servo: [["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        eeprom: [["0", "32768"], ["1", "32769"], ["2", "32770"], ["3", "32771"], ["4", "32772"], ["5", "32773"], ["6", "32774"], ["7", "32775"], ["8", "32776"], ["9", "32777"], ["10", "32778"], ["11", "32779"],
            ["12", "32780"], ["13", "32781"], ["14", "32782"], ["15", "32783"], ["16", "32784"], ["17", "32785"], ["18", "32786"], ["19", "32787"], ["20", "32788"], ["21", "32789"], ["22", "32790"],
            ["23", "32791"], ["24", "32792"], ["25", "32793"], ["26", "32794"], ["27", "32795"], ["28", "32796"], ["29", "32797"], ["30", "32798"], ["31", "32799"], ["32", "32800"], ["33", "32801"],
            ["34", "32802"], ["35", "32803"], ["36", "32804"], ["37", "32805"], ["38", "32806"], ["39", "32807"], ["40", "32808"], ["41", "32809"], ["42", "32810"], ["43", "32811"], ["44", "32812"],
            ["45", "32813"], ["46", "32814"], ["47", "32815"], ["48", "32816"], ["49", "32817"], ["50", "32818"], ["51", "32819"], ["52", "32820"], ["53", "32821"], ["54", "32822"], ["55", "32823"],
            ["56", "32824"], ["57", "32825"], ["58", "32826"], ["59", "32827"], ["60", "32828"], ["61", "32829"], ["62", "32830"], ["63", "32831"], ["64", "32832"], ["65", "32833"], ["66", "32834"],
            ["67", "32835"], ["68", "32836"], ["69", "32837"], ["70", "32838"], ["71", "32839"], ["72", "32840"], ["73", "32841"], ["74", "32842"], ["75", "32843"], ["76", "32844"], ["77", "32845"],
            ["78", "32846"], ["79", "32847"], ["80", "32848"], ["81", "32849"], ["82", "32850"], ["83", "32851"], ["84", "32852"], ["85", "32853"], ["86", "32854"], ["87", "32855"], ["88", "32856"],
            ["89", "32857"], ["90", "32858"], ["91", "32859"], ["92", "32860"], ["92", "32861"], ["93", "32862"], ["94", "32863"], ["95", "32864"], ["96", "32865"], ["97", "32866"], ["98", "32867"],
            ["99", "32868"], ["100", "32869"]],
        serial: 9600
    },
    "other": {
        description: "Other propeller boards",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        servo: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        eeprom: [["0", "32768"], ["1", "32769"], ["2", "32770"], ["3", "32771"], ["4", "32772"], ["5", "32773"], ["6", "32774"], ["7", "32775"], ["8", "32776"], ["9", "32777"], ["10", "32778"], ["11", "32779"],
            ["12", "32780"], ["13", "32781"], ["14", "32782"], ["15", "32783"], ["16", "32784"], ["17", "32785"], ["18", "32786"], ["19", "32787"], ["20", "32788"], ["21", "32789"], ["22", "32790"],
            ["23", "32791"], ["24", "32792"], ["25", "32793"], ["26", "32794"], ["27", "32795"], ["28", "32796"], ["29", "32797"], ["30", "32798"], ["31", "32799"], ["32", "32800"], ["33", "32801"],
            ["34", "32802"], ["35", "32803"], ["36", "32804"], ["37", "32805"], ["38", "32806"], ["39", "32807"], ["40", "32808"], ["41", "32809"], ["42", "32810"], ["43", "32811"], ["44", "32812"],
            ["45", "32813"], ["46", "32814"], ["47", "32815"], ["48", "32816"], ["49", "32817"], ["50", "32818"], ["51", "32819"], ["52", "32820"], ["53", "32821"], ["54", "32822"], ["55", "32823"],
            ["56", "32824"], ["57", "32825"], ["58", "32826"], ["59", "32827"], ["60", "32828"], ["61", "32829"], ["62", "32830"], ["63", "32831"], ["64", "32832"], ["65", "32833"], ["66", "32834"],
            ["67", "32835"], ["68", "32836"], ["69", "32837"], ["70", "32838"], ["71", "32839"], ["72", "32840"], ["73", "32841"], ["74", "32842"], ["75", "32843"], ["76", "32844"], ["77", "32845"],
            ["78", "32846"], ["79", "32847"], ["80", "32848"], ["81", "32849"], ["82", "32850"], ["83", "32851"], ["84", "32852"], ["85", "32853"], ["86", "32854"], ["87", "32855"], ["88", "32856"],
            ["89", "32857"], ["90", "32858"], ["91", "32859"], ["92", "32860"], ["92", "32861"], ["93", "32862"], ["94", "32863"], ["95", "32864"], ["96", "32865"], ["97", "32866"], ["98", "32867"],
            ["99", "32868"], ["100", "32869"]],
        serial: 9600
    }
};
function setProfile(profileName) {
    if (profile[profileName]) {
        profile["default"] = profile[profileName];
    } else {
        profile["default"] = profile["other"];
    }
}

/**
 * Initialise the database of variable names.
 */
Blockly.propc.init = function (workspace) {
// Create a dictionary of definitions to be printed before setups.
    Blockly.propc.definitions_ = {};
    Blockly.propc.definitions_["include simpletools"] = '#include "simpletools.h"';
    Blockly.propc.methods_ = {};
    // Create a dictionary of setups to be printed before the code.
    Blockly.propc.setups_ = {};
    Blockly.propc.global_vars_ = {};
    // Create a list of stacks
    Blockly.propc.stacks_ = [];
    Blockly.propc.vartype_ = {};
    Blockly.propc.varlength_ = {};
    Blockly.propc.serial_terminal_ = false;
    if (Blockly.Variables) {
        if (!Blockly.propc.variableDB_) {
            Blockly.propc.variableDB_ =
                    new Blockly.Names(Blockly.propc.RESERVED_WORDS_);
        } else {
            Blockly.propc.variableDB_.reset();
        }

        var defvars = [];
        var variables = Blockly.Variables.allVariables(workspace);
        for (var x = 0; x < variables.length; x++) {
            var varName = Blockly.propc.variableDB_.getName(variables[x],
                    Blockly.Variables.NAME_TYPE);
            defvars[x] = '{{$var_type_' + varName + '}} ' + varName + '{{$var_length_' + varName + '}};';
        }
        Blockly.propc.definitions_['variables'] = defvars.join('\n');
    }
};
/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.propc.finish = function (code) {
    // Convert the definitions dictionary into a list.
    var imports = [];
    var methods = [];
    var objects = [];
    var definitions = [];

    // Gives BlocklyProp developers the ability to add global variables
    for (var name in Blockly.propc.global_vars_) {
        var def = Blockly.propc.global_vars_[name];

        definitions.push(def);
    }

    for (var name in Blockly.propc.definitions_) {
        var def = Blockly.propc.definitions_[name];
        if (def.match(/^#include/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
    }

    for (var def in definitions) {
        for (var variable in Blockly.propc.vartype_) {
            if (definitions[def].indexOf("{{$var_type_" + variable + "}}") > -1) {
                if (Blockly.propc.vartype_[variable] !== 'LOCAL') {
                    definitions[def] = definitions[def].replace("{{$var_type_" + variable + "}}", Blockly.propc.vartype_[variable]);
                } else {
                    definitions[def] = definitions[def].replace("{{$var_type_" + variable + "}} " + variable + '{{$var_length_' + variable + '}}', "");
                }
                if (Blockly.propc.varlength_[variable]) {
                    definitions[def] = definitions[def].replace("{{$var_length_" + variable + "}}", '[' + Blockly.propc.varlength_[variable] + ']');
                } else {
                    definitions[def] = definitions[def].replace("{{$var_length_" + variable + "}}", "");
                }
            }
        }

        if (definitions[def].indexOf("{{$var_type_") > -1) {
            definitions[def] = definitions[def].replace(/\{\{\$var_type_.*?\}\}/ig, "int").replace(/\{\{\$var_length_.*?\}\}/ig, '');
        }
    }

    for (var stack in Blockly.propc.stacks_) {
        definitions.push(Blockly.propc.stacks_[stack]);
    }

    // Convert the setups dictionary into a list.
    var setups = [];
    for (var name in Blockly.propc.setups_) {
        setups.push('  ' + Blockly.propc.setups_[name]);
    }

    for (var method in Blockly.propc.methods_) {
        methods.push(Blockly.propc.methods_[method]);
    }

    var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n') + '\n\n'; //int main() {\n  ' +
    var varInits = setups.join('\n') + '\n';
    // Indent every line.
    code = '  ' + code.replace(/\n/g, '\n  ');
    code = code.replace(/\n\s+$/, '\n');
    code = 'int main() {\n' + varInits + code + '\n}';
    var setup = '';
    if (Blockly.propc.serial_terminal_) {
        setup += "/* SERIAL_TERMINAL USED */\n";
    }
    return setup + allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + methods.join('\n\n') + '\n\n' + code + '\n\n';
};
/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.propc.scrubNakedValue = function (line) {
    return line + ';\n';
};
/**
 * Common tasks for generating Prop-c from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The propc code created for this block.
 * @return {string} Prop-c code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.propc.scrub_ = function (block, code) {
    if (code === null) {
        // Block has handled code generation itself.
        return '';
    }
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        if (comment) {
            commentCode += Blockly.propc.prefixLines(comment, '// ') + '\n';
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var x = 0; x < block.inputList.length; x++) {
            if (block.inputList[x].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[x].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.propc.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.propc.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};
