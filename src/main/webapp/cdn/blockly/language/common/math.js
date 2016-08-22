/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Math blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.math');

goog.require('Blockly.Blocks');


Blockly.Blocks.math.HUE = 230;

Blockly.Blocks['math_number'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(colorPalette.getColor('programming'));
        this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput('0',
                        Blockly.FieldTextInput.numberValidator), 'NUM');
        this.setOutput(true, 'Number');
        this.setTooltip(""); //Blockly.Msg.MATH_NUMBER_TOOLTIP);
    }
};

Blockly.Blocks.math_integer = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'INT_VALUE');

        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('math'));
    }
};

Blockly.Blocks.math_int_angle = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldAngle('90', Blockly.FieldTextInput.numberValidator), 'ANGLE_VALUE');

        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('math'));
    }
};

Blockly.Blocks['math_arithmetic'] = {
    /**
     * Block for basic arithmetic operator.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
                [["+", 'ADD'],
                    ["-", 'MINUS'],
                    ["x", 'MULTIPLY'],
                    ["/", 'DIVIDE']];
        this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('A')
                .setCheck('Number');
        this.appendValueInput('B')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip("");
        /*    this.setTooltip(function() {
         var mode = thisBlock.getFieldValue('OP');
         var TOOLTIPS = {
         'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
         'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
         'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
         'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
         'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
         };
         return TOOLTIPS[mode];
         });*/
    }
};

Blockly.Blocks['math_trig'] = {
    /**
     * Block for trigonometry operators.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
                [[Blockly.Msg.MATH_TRIG_SIN, 'SIN'],
                    [Blockly.Msg.MATH_TRIG_COS, 'COS'],
                    [Blockly.Msg.MATH_TRIG_TAN, 'TAN'],
                    [Blockly.Msg.MATH_TRIG_ASIN, 'ASIN'],
                    [Blockly.Msg.MATH_TRIG_ACOS, 'ACOS'],
                    [Blockly.Msg.MATH_TRIG_ATAN, 'ATAN']];
        this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('NUM')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'SIN': Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
                'COS': Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
                'TAN': Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
                'ASIN': Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
                'ACOS': Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
                'ATAN': Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['math_constant'] = {
    /**
     * Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
     * @this Blockly.Block
     */
    init: function () {
        var CONSTANTS =
                [['\u03c0', 'PI'],
                    ['e', 'E'],
                    ['\u03c6', 'GOLDEN_RATIO'],
                    ['sqrt(2)', 'SQRT2'],
                    ['sqrt(\u00bd)', 'SQRT1_2'],
                    ['\u221e', 'INFINITY']];
        this.setHelpUrl(Blockly.Msg.MATH_CONSTANT_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(CONSTANTS), 'CONSTANT');
        // this.setTooltip(Blockly.Msg.MATH_CONSTANT_TOOLTIP);
        this.setTooltip("");
    }
};

Blockly.Blocks['math_number_property'] = {
    /**
     * Block for checking if a number is even, odd, prime, whole, positive,
     * negative or if it is divisible by certain number.
     * @this Blockly.Block
     */
    init: function () {
        var PROPERTIES =
                [[Blockly.Msg.MATH_IS_EVEN, 'EVEN'],
                    [Blockly.Msg.MATH_IS_ODD, 'ODD'],
                    [Blockly.Msg.MATH_IS_PRIME, 'PRIME'],
                    [Blockly.Msg.MATH_IS_WHOLE, 'WHOLE'],
                    [Blockly.Msg.MATH_IS_POSITIVE, 'POSITIVE'],
                    [Blockly.Msg.MATH_IS_NEGATIVE, 'NEGATIVE'],
                    [Blockly.Msg.MATH_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']];
        this.setColour(colorPalette.getColor('math'));
        this.appendValueInput('NUMBER_TO_CHECK')
                .setCheck('Number');
        var dropdown = new Blockly.FieldDropdown(PROPERTIES, function (option) {
            var divisorInput = (option == 'DIVISIBLE_BY');
            this.sourceBlock_.updateShape_(divisorInput);
        });
        this.appendDummyInput()
                .appendField(dropdown, 'PROPERTY');
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        //this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP);
        this.setTooltip("");
    },
    /**
     * Create XML to represent whether the 'divisorInput' should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
        container.setAttribute('divisor_input', divisorInput);
        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
        this.updateShape_(divisorInput);
    },
    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} divisorInput True if this block has a divisor input.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function (divisorInput) {
        // Add or remove a Value Input.
        var inputExists = this.getInput('DIVISOR');
        if (divisorInput) {
            if (!inputExists) {
                this.appendValueInput('DIVISOR')
                        .setCheck('Number');
            }
        } else if (inputExists) {
            this.removeInput('DIVISOR');
        }
    }
};

Blockly.Blocks['math_change'] = {
    /**
     * Block for adding to a variable in place.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_CHANGE_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.interpolateMsg(
                // TODO: Combine these messages instead of using concatenation.
                Blockly.Msg.MATH_CHANGE_TITLE_CHANGE + ' %1 ' +
                Blockly.Msg.MATH_CHANGE_INPUT_BY + ' %2',
                ['VAR', new Blockly.FieldVariable(Blockly.Msg.MATH_CHANGE_TITLE_ITEM)],
                ['DELTA', 'Number', Blockly.ALIGN_RIGHT],
                Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        /*this.setTooltip(function() {
         return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
         thisBlock.getFieldValue('VAR'));
         });*/
        this.setTooltip("");
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};

Blockly.Blocks['math_round'] = {
    /**
     * Block for rounding functions.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
                [[Blockly.Msg.MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
                    [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP, 'ROUNDUP'],
                    [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN, 'ROUNDDOWN']];
        this.setHelpUrl(Blockly.Msg.MATH_ROUND_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendValueInput('NUM')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        //this.setTooltip(Blockly.Msg.MATH_ROUND_TOOLTIP);
        this.setTooltip("");
    }
};

Blockly.Blocks['math_on_list'] = {
    /**
     * Block for evaluating a list of numbers to return sum, average, min, max,
     * etc.  Some functions also work on text (min, max, mode, median).
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS =
                [[Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
                    [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
                    [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
                    [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
                    [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
                    [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
                    [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
                    [Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']];
        // Assign 'this' to a variable for use in the closures below.
        var thisBlock = this;
        this.setHelpUrl(Blockly.Msg.MATH_ONLIST_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        var dropdown = new Blockly.FieldDropdown(OPERATORS, function (newOp) {
            if (newOp == 'MODE') {
                thisBlock.outputConnection.setCheck('Array');
            } else {
                thisBlock.outputConnection.setCheck('Number');
            }
        });
        this.appendValueInput('LIST')
                .setCheck('Array')
                .appendField(dropdown, 'OP');
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'SUM': Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
                'MIN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
                'MAX': Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
                'AVERAGE': Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
                'MEDIAN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
                'MODE': Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
                'STD_DEV': Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,
                'RANDOM': Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM
            };
            return TOOLTIPS[mode];
        });
    }
};

Blockly.Blocks['math_modulo'] = {
    /**
     * Block for remainder of a division.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_MODULO_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.MATH_MODULO_TITLE,
                ['DIVIDEND', 'Number', Blockly.ALIGN_RIGHT],
                ['DIVISOR', 'Number', Blockly.ALIGN_RIGHT],
                Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_MODULO_TOOLTIP);
    }
};

Blockly.Blocks['math_constrain'] = {
    /**
     * Block for constraining a number between two limits.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_CONSTRAIN_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.MATH_CONSTRAIN_TITLE,
                ['VALUE', 'Number', Blockly.ALIGN_RIGHT],
                ['LOW', 'Number', Blockly.ALIGN_RIGHT],
                ['HIGH', 'Number', Blockly.ALIGN_RIGHT],
                Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_CONSTRAIN_TOOLTIP);
    }
};

Blockly.Blocks['math_random_int'] = {
    /**
     * Block for random integer between [X] and [Y].
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_RANDOM_INT_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.MATH_RANDOM_INT_TITLE,
                ['FROM', 'Number', Blockly.ALIGN_RIGHT],
                ['TO', 'Number', Blockly.ALIGN_RIGHT],
                Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_RANDOM_INT_TOOLTIP);
    }
};

Blockly.Blocks['math_random_float'] = {
    /**
     * Block for random fraction between 0 and 1.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL);
        this.setColour(colorPalette.getColor('math'));
        this.setOutput(true, 'Number');
        this.appendDummyInput()
                .appendField(Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM);
        this.setTooltip(Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP);
    }
};
