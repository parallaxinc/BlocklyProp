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

/**
 * Quotes - Created by Vale Tolpegin on 29-5-2016.
 */

var quotes = {
    /**
     * Create an image of an open or closed quote.
     * @param {boolean} open True if open quote, false if closed.
     * @return {!Blockly.FieldImage} The field image of the quote.
     * @this Blockly.Block
     */
    newQuote_: function (open) {
        if (open === this.RTL) {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
        } else {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
        }
        return new Blockly.FieldImage(file, 12, 12, '"');
    }

};

/*
var directionArrow = {
    /**
     * Create an image of a arrow pointing toward or away.
     * @param {string} direction 'forward' or 'backward'.
     * @return {!Blockly.FieldImage} The field image of the arrow.
     * @this Blockly.Block
     *
    newArrow_: function (direction) {
        if (direction === 'forward') {
            var file = "data:image/svg+xml,%3Csvg viewBox%3D'0 0 7 10' xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'8' height%3D'12'%3E%3Cpath d%3D'M3%2C3 L2%2C10 L4%2C10 z M3%2C.5 L.5%2C3 L5.5%2C3 z' style%3D'fill%3A %23fff%3B stroke%3A %23fff%3Bstroke-width%3A 1%3B'%2F%3E%3C%2Fsvg%3E";
            return new Blockly.FieldImage(file, 8, 12, '&#8593;');
        } else {
            var file = "data:image/svg+xml,%3Csvg viewBox%3D'0 0 7 10' xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'8' height%3D'12'%3E%3Cpath d%3D'M3%2C0 L2%2C7 L4%2C7 z M3%2C10 L0.2%2C6.5 L5.8%2C6.5 z' style%3D'fill%3A %23fff%3B stroke%3A %23fff%3Bstroke-width%3A 1%3B'%2F%3E%3C%2Fsvg%3E";
            return new Blockly.FieldImage(file, 8, 12, '&#8595;');
        }
    }
};
*/

/**
 * Color Palette - Created by Michel on 30-4-2016.
 */

var colorPalette = {
    defaultColors: {
        'input': 140,
        'output': 165,
        'io': 185,
        'programming': 205,
        'functions': 225,
        'variables': 250,
        'math': 275,
        'binary': 275,
        'robot': 295,
        'heb': 295,
        'ab': 320,
        'protocols': 340
    },
    activePalette: null,
    getColor: function (type) {
        if (colorPalette.activePalette && colorPalette.activePalette[type] !== undefined) {
            return colorPalette.activePalette[type];
        }
        console.log("Missing color type: " + type);
        return '#000000';
    }

};

colorPalette.activePalette = colorPalette.defaultColors;



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
        'wait,cogid,if,else,elseif,repeat,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,float,double,string,String,array,static,volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
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
        description: "Propeller Activity Board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["26", "26"], ["27", "27"]],
        analog: [["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 17
    },
    "s3": {
        description: "Scribbler Robot",
        digital: [["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"]],
        analog: [["A0", "0"], ["A1", "1"]],
        baudrate: 9600,
        contiguous_pins_start: 0,
        contiguous_pins_end: 5
    },
    "heb": {
        description: "Hackable Electronic Badge",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"]],
        analog: [],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 11
    },
    "flip": {
        description: "Propeller FLiP or Project Board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"]],
        analog: [],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 27
    },
    "other": {
        description: "Other Propeller Boards",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 27
    }
};
function setProfile(profileName) {
    if (profile[profileName]) {
        profile["default"] = profile[profileName];
    } else {
        profile["default"] = profile["other"];
    }

    window.parent.setBaudrate(profile["default"]["baudrate"]);
}

/**
 * Initialize the database of variable names.
 * @param {workspace} workspace The active workspace.
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
        if (name !== 's3_setup') {
            setups.push('  ' + Blockly.propc.setups_[name]);
        } else {
            setups.unshift('  ' + Blockly.propc.setups_[name]);
        }
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
    if (Blockly.mainWorkspace.getAllBlocks().length === 0) {
        setup += "/* EMPTY_PROJECT */\n";
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

// Provides backward compatibility for some older browsers:
// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
;