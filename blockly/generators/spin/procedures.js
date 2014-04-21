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
 * @fileoverview Generating Spin for variable blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

Blockly.Spin = Blockly.Generator.get('Spin');

Blockly.Spin.procedures_defreturn = function() {
    // Define a procedure with a return value.
    var funcName = Blockly.Spin.variableDB_.getName(this.getTitleValue('NAME'),
            Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Spin.statementToCode(this, 'STACK');
    if (Blockly.Spin.INFINITE_LOOP_TRAP) {
        branch = Blockly.Spin.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var returnValue = Blockly.Spin.valueToCode(this, 'RETURN',
            Blockly.Spin.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + '\n';
    }
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
//        args[x] = this.arguments_[x];
//        console.log("argument", this.arguments_[x]);
        var varName = Blockly.Spin.variableDB_.getName(this.arguments_[x],
                Blockly.Variables.NAME_TYPE);
        args.push(varName);
        if (Blockly.Spin.vartype_[varName] === undefined) {
            Blockly.Spin.vartype_[varName] = 'LOCAL';
        }
    }
    var code = 'PUB' + ' ' + funcName + '(' + args.join(', ') + ') \n' +
            branch + returnValue + '\n';
    code = Blockly.Spin.scrub_(this, code);
    Blockly.Spin.definitions_[funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Spin.procedures_defnoreturn = Blockly.Spin.procedures_defreturn;

Blockly.Spin.procedures_callreturn = function() {
    // Call a procedure with a return value.
    var funcName = Blockly.Spin.variableDB_.getName(this.getTitleValue('NAME'),
            Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Blockly.Spin.valueToCode(this, 'ARG' + x,
                Blockly.Spin.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.Spin.ORDER_UNARY_POSTFIX];
};

Blockly.Spin.procedures_callnoreturn = function() {
    // Call a procedure with no return value.
    var funcName = Blockly.Spin.variableDB_.getName(this.getTitleValue('NAME'),
            Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var x = 0; x < this.arguments_.length; x++) {
        args[x] = Blockly.Spin.valueToCode(this, 'ARG' + x,
                Blockly.Spin.ORDER_NONE) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')\n';
    return code;
};

Blockly.Spin.procedures_ifreturn = function() {
    // Conditionally return value from a procedure.
    var condition = Blockly.Spin.valueToCode(this, 'CONDITION',
            Blockly.Spin.ORDER_NONE) || 'false';
    var code = 'if ' + condition + ' \n';
    if (this.hasReturnValue_) {
        var value = Blockly.Spin.valueToCode(this, 'VALUE',
                Blockly.Spin.ORDER_NONE) || 'null';
        code += '  return ' + value + '\n';
    } else {
        code += '  return\n';
    }
    code += '\n';
    return code;
};
