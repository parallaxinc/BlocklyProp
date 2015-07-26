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
 * @fileoverview Generating Spin for control blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

Blockly.Spin = Blockly.Generator.get('Spin');

Blockly.Spin.logic_compare = function() {
    // Comparison operator.
    var mode = this.getTitleValue('OP');
    var operator = Blockly.Spin.logic_compare.OPERATORS[mode];
    var order = (operator == '==' || operator == '!=') ?
            Blockly.Spin.ORDER_EQUALITY : Blockly.Spin.ORDER_RELATIONAL;
    var argument0 = Blockly.Spin.valueToCode(this, 'A', order) || '0';
    var argument1 = Blockly.Spin.valueToCode(this, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.Spin.logic_compare.OPERATORS = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>='
};

Blockly.Spin.logic_operation = function() {
    // Operations 'and', 'or'.
    var operator = (this.getTitleValue('OP') == 'AND') ? 'AND' : 'OR';
    var order = (operator == '&&') ? Blockly.Spin.ORDER_LOGICAL_AND :
            Blockly.Spin.ORDER_LOGICAL_OR;
    var argument0 = Blockly.Spin.valueToCode(this, 'A', order) || 'FALSE';
    var argument1 = Blockly.Spin.valueToCode(this, 'B', order) || 'FALSE';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.Spin.logic_negate = function() {
    // Negation.
    var order = Blockly.Spin.ORDER_UNARY_PREFIX;
    var argument0 = Blockly.Spin.valueToCode(this, 'BOOL', order) || 'FALSE';
    var code = '!' + argument0;
    return [code, order];
};

Blockly.Spin.logic_boolean = function() {
    // Boolean values true and false.
    var code = (this.getTitleValue('BOOL') == 'TRUE') ? 'TRUE' : 'FALSE';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};
