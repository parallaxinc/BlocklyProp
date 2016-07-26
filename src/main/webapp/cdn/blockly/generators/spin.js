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
 * @fileoverview Helper functions for generating Spin for blocks.
 * @author michel@creatingfuture.eu (Michel Lampo)
 * @author valetolpegin@gmail.com (Vale Tolpegin)
 */
'use strict';
Blockly.Spin = new Blockly.Generator('Spin');

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
if (!Blockly.Spin.RESERVED_WORDS_) {
    Blockly.Spin.RESERVED_WORDS_ = '';
}

Blockly.Spin.RESERVED_WORDS_ +=
        // http://arduino.cc/en/Reference/HomePage
        'cogid,if,else,elseif,repeat,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
        ;
/**
 * Order of operation ENUMs.
 *
 */
Blockly.Spin.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Spin.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.Spin.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Spin.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Spin.ORDER_ADDITIVE = 4; // + -
Blockly.Spin.ORDER_SHIFT = 5; // << >>
Blockly.Spin.ORDER_RELATIONAL = 7; // is is! >= > <= <
Blockly.Spin.ORDER_EQUALITY = 8; // == != === !==
Blockly.Spin.ORDER_BITWISE_AND = 9; // &
Blockly.Spin.ORDER_BITWISE_XOR = 10; // ^
Blockly.Spin.ORDER_BITWISE_OR = 11; // |
Blockly.Spin.ORDER_LOGICAL_AND = 12; // &&
Blockly.Spin.ORDER_LOGICAL_OR = 13; // ||
Blockly.Spin.ORDER_CONDITIONAL = 14; // expr ? expr : expr
Blockly.Spin.ORDER_ASSIGNMENT = 15; // := *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Spin.ORDER_NONE = 99; // (...)

/*
 * Spin Board profiles
 *
 */
var profile = {
    "activity-board": {
        description: "Parallax propeller Activity board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["26", "26"], ["27", "27"]],
        servo: [["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "s3": {
        description: "Parallax propeller C3",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        servo: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "heb": {
        description: "Parallax propeller proto board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        servo: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "other": {
        description: "Other propeller boards",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        servo: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]], analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
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
Blockly.Spin.init = function (workspace) {
// Create a dictionary of definitions to be printed before setups.
    Blockly.Spin.definitions_ = {};
    // Create a dictionary of setups to be printed before the code.
    Blockly.Spin.setups_ = {};
    // Create a list of stacks
    Blockly.Spin.stacks_ = [];
    Blockly.Spin.vartype_ = {};
    Blockly.Spin.serial_terminal_ = false;
    if (Blockly.Variables) {
        if (!Blockly.Spin.variableDB_) {
            Blockly.Spin.variableDB_ =
                    new Blockly.Names(Blockly.Spin.RESERVED_WORDS_);
        } else {
            Blockly.Spin.variableDB_.reset();
        }

        var defvars = [];
        var variables = Blockly.Variables.allVariables(workspace);
        for (var x = 0; x < variables.length; x++) {
            var varName = Blockly.Spin.variableDB_.getName(variables[x],
                    Blockly.Variables.NAME_TYPE);
            defvars[x] = '  ' + '{{$var_type_' + varName /* variables[x].name */ + '}} ' +
                    varName + '\n';
        }
        Blockly.Spin.definitions_['variables'] = defvars.join('\n');
    }
};
/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Spin.finish = function (code) {
    // Indent every line.
    code = '  ' + code.replace(/\n/g, '\n  ');
    code = code.replace(/\n\s+$/, '\n');
    code = 'PUB Start\n\n' + code;
    // Convert the definitions dictionary into a list.
    var methods = [];
    var objects = [];
    var definitions = [];
    for (var name in Blockly.Spin.definitions_) {
        var def = Blockly.Spin.definitions_[name];
        if (def.match(/^PUB/)) {
            methods.push(def);
        } else if (def.match(/^OBJ/)) {
            objects.push('  ' + def.substring(3));
        } else {
            definitions.push(def);
        }
    }

    for (var def in definitions) {
        for (var variable in Blockly.Spin.vartype_) {
            if (definitions[def].indexOf("{{$var_type_" + variable + "}}") > -1) {
                if (Blockly.Spin.vartype_[variable] !== 'LOCAL') {
                    definitions[def] = definitions[def].replace("{{$var_type_" + variable + "}}", Blockly.Spin.vartype_[variable]);
                } else {
                    definitions[def] = definitions[def].replace("{{$var_type_" + variable + "}} " + variable, "");
                }
            }
            definitions[def] = definitions[def].replace("\n\n", "\n");
        }
    }

    for (var stack in Blockly.Spin.stacks_) {
        definitions.push('  ' + Blockly.Spin.stacks_[stack]);
    }

    // Convert the setups dictionary into a list.
    var setups = [];
    for (var name in Blockly.Spin.setups_) {
        setups.push(Blockly.Spin.setups_[name]);
    }
    setups.push('Start');
    var OBJ = (objects.length > 0) ? '\n\nOBJ\n' + objects.join('\n') + '\n' : '';
    var allDefs = 'VAR\n' + definitions.join('\n') + OBJ + '\n\nPUB Setup\n  ' + setups.join('\n  ') + '\n\n';
    var setup = '';
    if (Blockly.Spin.serial_terminal_) {
        setup += "'SERIAL_TERMINAL USED\n";
    }
    if (Blockly.mainWorkspace.getAllBlocks().length === 0) {
        setup += "'EMPTY_PROJECT\n";
    }
    setup += 'CON\n  _clkmode = xtal1 + pll16x\n  _xinfreq = 5_000_000\n\n';
    return setup + allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code + '\n\n' + methods.join('\n');
};
/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Spin.scrubNakedValue = function (line) {
    return line + ';\n';
};
/**
 * Encode a string as a properly escaped Spin string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Spin string.
 * @private
 */
Blockly.Spin.quote_ = function (string) {
    // TODO: This is a quick hack.  Replace with goog.string.quote
    string = string.replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\\n')
            .replace(/\$/g, '\\$')
            .replace(/'/g, '\\\'');
    return '\"' + string + '\"';
};
/**
 * Common tasks for generating Spin from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Spin code created for this block.
 * @return {string} Spin code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.Spin.scrub_ = function (block, code) {
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
            commentCode += Blockly.Spin.prefixLines(comment, '\' ') + '\n';
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var x = 0; x < block.inputList.length; x++) {
            if (block.inputList[x].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[x].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.Spin.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.Spin.prefixLines(comment, '\' ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};
