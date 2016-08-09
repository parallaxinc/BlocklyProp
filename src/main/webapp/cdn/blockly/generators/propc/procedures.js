/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview Generating propc for variable blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

Blockly.propc.procedures_defreturn = function() {
    // Define a procedure with a return value.
    var funcName = Blockly.propc.variableDB_.getName(this.getFieldValue('NAME'),
            Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.propc.statementToCode(this, 'STACK');
    if (Blockly.propc.INFINITE_LOOP_TRAP) {
        branch = Blockly.propc.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var returnValue = Blockly.propc.valueToCode(this, 'RETURN',
            Blockly.propc.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }
    var returnType = returnValue ? 'int' : 'void';
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
//        args[x] = this.arguments_[x];
//        console.log("argument", this.arguments_[x]);
        var varName = Blockly.propc.variableDB_.getName(this.arguments_[x],
                Blockly.Variables.NAME_TYPE);
        args.push('int ' + varName);
        if (Blockly.propc.vartype_[varName] === undefined) {
            Blockly.propc.vartype_[varName] = 'LOCAL';
        }
    }
    var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
            branch + returnValue + '}\n';
    code = Blockly.propc.scrub_(this, code);
    Blockly.propc.methods_[funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.propc.procedures_defnoreturn = Blockly.propc.procedures_defreturn;

Blockly.propc.procedures_callreturn = function() {
    // Call a procedure with a return value.
    var funcName = Blockly.propc.variableDB_.getName(this.getFieldValue('NAME'),
            Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Blockly.propc.valueToCode(this, 'ARG' + x,
                Blockly.propc.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.propc.ORDER_UNARY_POSTFIX];
};

Blockly.propc.procedures_callnoreturn = function() {
    // Call a procedure with no return value.
    var funcName = Blockly.propc.variableDB_.getName(this.getFieldValue('NAME'),
            Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Blockly.propc.valueToCode(this, 'ARG' + x,
                Blockly.propc.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ');\n';
    return code;
};

Blockly.propc.procedures_ifreturn = function() {
    // Conditionally return value from a procedure.
    var condition = Blockly.propc.valueToCode(this, 'CONDITION',
            Blockly.propc.ORDER_NONE) || 'false';
    var code = 'if (' + condition + ') {\n';
    if (this.hasReturnValue_) {
        var value = Blockly.propc.valueToCode(this, 'VALUE',
                Blockly.propc.ORDER_NONE) || 'null';
        code += '  return ' + value + ';\n';
    } else {
        code += '  return;\n';
    }
    code += '}\n';
    return code;
};
