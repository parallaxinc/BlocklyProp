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
 * @fileoverview Generating Prop-C for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//Blockly.propc = new Blockly.Generator('propc');

Blockly.propc.logic_compare = function() {
    // Comparison operator.
    var mode = this.getFieldValue('OP');
    var operator = Blockly.propc.logic_compare.OPERATORS[mode];
    var order = (operator == '==' || operator == '!=') ?
            Blockly.propc.ORDER_EQUALITY : Blockly.propc.ORDER_RELATIONAL;
    var argument0 = Blockly.propc.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.propc.logic_compare.OPERATORS = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>='
};

Blockly.propc.logic_operation = function() {
    // Operations 'and', 'or'.
    var operator = (this.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = (operator == '&&') ? Blockly.propc.ORDER_LOGICAL_AND :
            Blockly.propc.ORDER_LOGICAL_OR;
    var argument0 = Blockly.propc.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.propc.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.propc.logic_negate = function() {
    // Negation.
    var order = Blockly.propc.ORDER_UNARY_PREFIX;
    var argument0 = Blockly.propc.valueToCode(this, 'BOOL', order) || '0';
    var code = '!' + argument0;
    return [code, order];
};

Blockly.propc.logic_boolean = function() {
    // Boolean values true and false.
    var code = (this.getFieldValue('BOOL') == 'TRUE') ? '1' : '0';
    return [code, Blockly.propc.ORDER_ATOMIC];
};
