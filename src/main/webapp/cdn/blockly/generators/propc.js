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
        'cogid,if,else,elseif,repeat,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
        ;

/**
 * Order of operation ENUMs.
 *
 */
Blockly.propc.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.propc.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.propc.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.propc.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.propc.ORDER_ADDITIVE = 4;       // + -
Blockly.propc.ORDER_SHIFT = 5;          // << >>
Blockly.propc.ORDER_RELATIONAL = 7;     // is is! >= > <= <
Blockly.propc.ORDER_EQUALITY = 8;       // == != === !==
Blockly.propc.ORDER_BITWISE_AND = 9;    // &
Blockly.propc.ORDER_BITWISE_XOR = 10;    // ^
Blockly.propc.ORDER_BITWISE_OR = 11;    // |
Blockly.propc.ORDER_LOGICAL_AND = 12;   // &&
Blockly.propc.ORDER_LOGICAL_OR = 13;    // ||
Blockly.propc.ORDER_CONDITIONAL = 14;   // expr ? expr : expr
Blockly.propc.ORDER_ASSIGNMENT = 15;    // := *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.propc.ORDER_NONE = 99;          // (...)

/*
 * propc Board profiles
 *
 */
var profile = {
    "activity-board": {
        description: "Parallax propeller Activity board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["26", "26"], ["27", "27"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "board-of-education": {
        description: "Parallax propeller board of education",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "c3": {
        description: "Parallax propeller C3",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "demo-board": {
        description: "Parallax propeller Demo board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "proto-board": {
        description: "Parallax propeller proto board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "quickstart": {
        description: "Parallax propeller Quickstart",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "scribbler2": {
        description: "Parallax propeller Scribbler2",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    },
    "other": {
        description: "Other propeller boards",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial: 9600
    }
};
//    demoboard: {
//        description: "Parallax propeller Demo board",
//        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"]],
//        analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
//        serial: 9600,
//    },
//}
//set default profile to Parallax propeller demo board
//profile["default"] = profile["other"];
//alert(profile.default.digital[0]);

function setProfile(profileName) {
    profile["default"] = profile[profileName];
}

/**
 * Initialise the database of variable names.
 */
Blockly.propc.init = function(workspace) {
    // Create a dictionary of definitions to be printed before setups.
    Blockly.propc.definitions_ = {};
    Blockly.propc.definitions_["include simpletools"] = '#include "simpletools.h"';
    // Create a dictionary of setups to be printed before the code.
    Blockly.propc.setups_ = {};

    // Create a list of stacks
    Blockly.propc.stacks_ = [];

    Blockly.propc.vartype_ = {};
    Blockly.propc.pointerType_ = {};

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
            var varName = Blockly.propc.variableDB_.getDistinctName(variables[x],
                    Blockly.Variables.NAME_TYPE);
            defvars[x] = '' + '{{$var_type_' + variables[x].name + '}} ' +
                    varName + ';\n';
        }
        Blockly.propc.definitions_['variables'] = defvars.join('\n');
    }

    if (Blockly.Pointers) {
        if (!Blockly.propc.pointerDB_) {
            Blockly.propc.pointerDB_ =
                new Blockly.Names(Blockly.propc.RESERVED_WORDS_);
        } else {
            Blockly.propc.pointerDB_.reset();
        }

        var defvars = [];
        var pointers = Blockly.Pointers.allPointers();
        for (var x = 0; x < pointers.length; x++) {
            var pointerName = Blockly.propc.pointerDB_.getDistinctName(pointers[x],
                Blockly.Pointers.NAME_TYPE);
            defvars[x] = '' + '{{$pointer_type_' + pointers[x].name + '}} ' +
            pointerName + ';\n';
        }
        Blockly.propc.definitions_['pointers'] = defvars.join('\n');
    }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.propc.finish = function(code) {
alert(code);

    // Convert the definitions dictionary into a list.
    var imports = [];
    var methods = [];
    var objects = [];
    var definitions = [];
    for (var name in Blockly.propc.definitions_) {
        var def = Blockly.propc.definitions_[name];
        if (def.match(/^#include/)) {
            imports.push(def);
        } else if (def.match(/^PUB/)) {
            methods.push(def);
        } else if (def.match(/^OBJ/)) {
            objects.push('' + def.substring(3));
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
                    definitions[def] = definitions[def].replace("{{$var_type_" + variable + "}} " + variable, "");
                }
            }
            definitions[def] = definitions[def].replace("\n\n", "\n");
        }
        for (var pointer in Blockly.propc.pointerType_) {
            if (definitions[def].indexOf("{{$pointer_type_" + pointer + "}}") > -1) {
                if (Blockly.propc.pointerType_[pointer] !== 'LOCAL') {
                    definitions[def] = definitions[def].replace("{{$pointer_type_" + pointer + "}}", Blockly.propc.pointerType_[pointer]);
                } else {
                    definitions[def] = definitions[def].replace("{{$pointer_type_" + pointer + "}} " + pointer, "");
                }
            }
            definitions[def] = definitions[def].replace("\n\n", "\n");
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
//    setups.push('Start');

    var OBJ = (objects.length > 0) ? '\n\nOBJ\n' + objects.join('\n') + '\n' : '';

    var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n') + '\n\n'; //int main() {\n  ' +
    var varInits = setups.join('\n') + '\n';
    //   var setup = 'CON\n  _clkmode = xtal1 + pll16x\n  _xinfreq = 5_000_000\n\n';

    // Indent every line.
    code = '  ' + code.replace(/\n/g, '\n  ');
    code = code.replace(/\n\s+$/, '\n');
    code = 'int main() {\n' + varInits + code + '\n}';


    return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code + '\n\n' + methods.join('\n');
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.propc.scrubNakedValue = function(line) {
    return line + ';\n';
};

/**
 * Encode a string as a properly escaped propc string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Prop-c string.
 * @private
 */
Blockly.propc.quote_ = function(string) {
    // TODO: This is a quick hack.  Replace with goog.string.quote
    string = string.replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\\n')
            .replace(/\$/g, '\\$')
            .replace(/'/g, '\\\'');
    return '\"' + string + '\"';
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
Blockly.propc.scrub_ = function(block, code) {
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
