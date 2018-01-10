/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo, Vale Tolpegin
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
 * @fileoverview Generating C for variable blocks
 * @author michel@creatingfuture.eu  (Michel Lampo)
 *         valetolpegin@gmail.com    (Vale Tolpegin)
 *         jewald@parallax.com       (Jim Ewald)
 *         mmatz@parallax.com        (Matthew Matz)
 *         kgracey@parallax.com      (Ken Gracey)
 *         carsongracey@gmail.com    (Carson Gracey)
 */
'use strict';

if (!Blockly.Blocks)
    Blockly.Blocks = {};

var tempArrayNumber = 0;

Blockly.Blocks.variables_get = {
    // Variable getter.
    helpUrl: Blockly.MSG_VARIABLES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_VARIABLES_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput("")
                .appendField(Blockly.LANG_VARIABLES_GET_TITLE_1)
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true);
        this.typeCheckRun = null;
    },
    /*
    onchange: function () {
        var sBlock = this;
        if(!this.typeCheckRun) {
            this.typeCheckRun = setTimeout(function () {
                var outType = "Number";
                var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
                for (var x = 0; x < allBlocks.length; x++) {
                    var func = allBlocks[x].getVarType;
                    var fund = allBlocks[x].getVars;
                    if (func) {
                        var blockType = func.call(allBlocks[x]);
                        var blockVars = fund.call(allBlocks[x]);
                        var varMatch = false;
                        for (var y = 0; y < blockVars.length; y++) {
                            if (blockVars[y].toString() === sBlock.getFieldValue('VAR')) {
                                varMatch = true;
                                break;
                            }
                        }
                        if (blockType === 'String' && varMatch) {
                            var outType = "String";
                            break;
                        } else if (blockType === 'Number' && varMatch) {
                            var outType = "Number";
                            break;
                        }
                    }
                }
                sBlock.typeCheckRun = null;
                sBlock.setOutput(true, outType);
            }, 500);
        }
    },
    */
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};

/*
Blockly.Blocks.variables_declare = {
    // Variable setter.
    init: function () {
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('VALUE', null)
                .appendField('Declare')
                .appendField(new Blockly.FieldVariable(
                        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR')
                .appendField("as")
                .appendField(new Blockly.FieldDropdown([["int", "int"], ["float", "float"], ["char", "char"], ["unsigned int", "unsigned int"], ["signed char", "signed char"]]), "TYPE")
                .appendField("value");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};
*/

Blockly.Blocks.variables_set = {
    // Variable setter.
    helpUrl: Blockly.MSG_VARIABLES_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_VARIABLES_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('VALUE')
                .appendField(Blockly.LANG_VARIABLES_SET_TITLE_1)
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_SET_ITEM), 'VAR')
                .appendField('=');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
    },
    getVarType: function () {
        if (this.getInputTargetBlock('VALUE')) {
            return this.getInputTargetBlock('VALUE').outputConnection.check_.toString();
        } else {
            return null;
        }
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};

Blockly.propc.variables_get = function () {
    // Variable getter.
    var code = Blockly.propc.variableDB_.getName(
            this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    return [code, Blockly.propc.ORDER_ATOMIC];
};

/*
Blockly.propc.variables_declare = function () {
    // Variable setter.
    var dropdown_type = this.getFieldValue('TYPE');
    //TODO: settype to variable
    var argument0 = Blockly.propc.valueToCode(this, 'VALUE',
            Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.propc.variableDB_.getName(
            this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    Blockly.propc.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';\n';
    Blockly.propc.vartype_[varName] = dropdown_type;
    return '';
};
*/

Blockly.propc.variables_set = function () {
    // Variable setter.
    var argument0 = Blockly.propc.valueToCode(this, 'VALUE',
            Blockly.propc.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.propc.variableDB_.getName(
            this.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    if (Blockly.propc.vartype_[varName] === undefined) {
        if (argument0.indexOf("int") > -1) {
            Blockly.propc.vartype_[varName] = 'int';
            //Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
        } else if (argument0.indexOf("float") > -1) {
            Blockly.propc.vartype_[varName] = 'float';
            Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
        } else if (argument0.indexOf("char") > -1) {
            Blockly.propc.vartype_[varName] = 'char';
            Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
        } else if (argument0.indexOf("char\[\]") > -1) {
            Blockly.propc.vartype_[varName] = 'char *';
        } else if (argument0.indexOf("\"") > -1 && argument0.indexOf("get8bitColor(") === -1) {  // Some functions tht return numbers take strings as arguments, so we need to account for that.
            Blockly.propc.vartype_[varName] = 'char *';
        } else if (argument0.indexOf(".") > -1) {
            Blockly.propc.vartype_[varName] = 'float';
        } else if (argument0.indexOf("true") > -1 || argument0.indexOf("false") > -1) {
            Blockly.propc.vartype_[varName] = 'boolean';
        } else {
            Blockly.propc.vartype_[varName] = 'int';
        }
    } else if (argument0.indexOf("int") > -1) {
        Blockly.propc.vartype_[varName] = 'int';
        //Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
    } else if (argument0.indexOf("float") > -1) {
        Blockly.propc.vartype_[varName] = 'float';
        Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
    } else if (argument0.indexOf("char") > -1) {
        Blockly.propc.vartype_[varName] = 'char';
        Blockly.propc.varlength_[varName] = '{{$var_length_' + varName + '}};';
    } else if (argument0.indexOf("char\[\]") > -1) {
        Blockly.propc.vartype_[varName] = 'char *';
    }

    return varName + ' = ' + argument0 + ';\n';
};




Blockly.Blocks.array_get = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_GET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('NUM')
                .setCheck('Number')
                .appendField('array')
                .appendField(new Blockly.FieldDropdown([["list", "list"]]), "VAR")
                .appendField('element');
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.updateArrayMenu();
    },
    buildArrayMenu: function (v_list) {
        //if (v_list.length > 0) {
            var toConn = this.getInput('NUM').connection.targetConnection;
            this.removeInput('NUM');
            this.appendValueInput('NUM')
                    .setCheck('Number')
                    .appendField('array')
                    .appendField(new Blockly.FieldDropdown(v_list), "VAR")
                    .appendField('element');
            if (toConn) {
                this.getInput('NUM').connection.connect(toConn);
            }
        //}
    },
    updateArrayMenu: function (ov, nv) {
        var v_check = true;
        var v_list = [];
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        for (var x = 0; x < allBlocks.length; x++) {
            if (allBlocks[x].type === 'array_init') {
                var v_name = allBlocks[x].getFieldValue('VAR');
                if (v_name === ov && nv) {
                    v_name = nv;
                }
                if (v_name) {
                    v_list.push([v_name, v_name]);
                }
                v_check = false;
            }
        }
        if (v_check) {
            v_list.push(['list', 'list']);
        }
        var m = this.getFieldValue('VAR');
        // sort and remove duplicates
        v_list = uniq_fast(v_list);
        this.buildArrayMenu(v_list);
        if (m && m === ov && nv) {
            this.setFieldValue(nv, 'VAR');
        } else if (m) {
            this.setFieldValue(m, 'VAR');
        }
    },
    onchange: function () {
        var code = null;
        var elmnts = parseInt(this.getFieldValue('NUM'), 10);
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
            var initStr = '';
            for (var ij = 0; ij < allBlocks.length; ij++) {
                var f_start = allBlocks[ij].toString().indexOf('array initialize ' + this.getFieldValue('VAR'));
                if (f_start > -1) {
                    initStr = allBlocks[ij].toString().substring(f_start).replace(/[^0-9]/g, "");
                    break;
                }
            }
            if (elmnts >= parseInt(initStr, 10) || elmnts < 0) {
                code = 'WARNING: You are trying to get an element from your array that does not exist!';
            }
        } else {
            code = 'WARNING: The array "' + this.getFieldValue('VAR') + '" has not been initialized!';
        }
        this.setWarningText(code);
    }
};

Blockly.propc.array_get = function () {
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), 'Array');
    var element = Blockly.propc.valueToCode(this, 'NUM', Blockly.propc.ORDER_NONE) || '0';
    var code = varName + '[' + element + ']';

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
    if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) === -1) {
        return '// ERROR: The array "' + varName + '" has not been initialized!\n';
    } else {
        return [code, Blockly.propc.ORDER_ATOMIC];
    }
};

Blockly.Blocks.array_init = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_INIT_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput()
                .appendField('array initialize')
                .appendField(new Blockly.FieldTextInput('list', function (a) {
                    a = a.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                    this.sourceBlock_.sendArrayVal(this.sourceBlock_.getFieldValue('VAR'), a);
                    return a;
                }), 'VAR')
                .appendField("with")
                .appendField(new Blockly.FieldTextInput('10',
                        Blockly.FieldTextInput.numberValidator), 'NUM')
                .appendField("elements");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.sendUpdate = true;
    },
    sendArrayVal: function (ov, nv) {
        if (this.sendUpdate || (ov === '-1' && nv === '-1')) {
            if (ov === '-1' && nv === '-1') {
                ov = null;
                nv = null;
            }
            // Find all the blocks that have my value and tell them to update it
            var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
            for (var x = 0; x < allBlocks.length; x++) {
                var func = allBlocks[x].updateArrayMenu;
                if (func && allBlocks[x]) {
                    func.call(allBlocks[x], ov, nv);
                }
            }
        }
        this.sendUpdate = true;
    },
    onchange: function (event) {
        var myName = this.getFieldValue('VAR');
        var theBlocks = Blockly.getMainWorkspace().getAllBlocks().toString();
        
        // If I get deleted, broadcast that to other blocks.
        if (event.oldXml) {
            var oldName = '';
            var oSerializer = new XMLSerializer();
            var sXML = oSerializer.serializeToString(event.oldXml);
            var f_start = sXML.indexOf('name="VAR');
            if (f_start > -1 && sXML.indexOf('array_init') > -1) {
                var f_end = sXML.indexOf('</field', f_start);
                oldName = sXML.substring(f_start + 11, f_end);
                this.sendArrayVal(oldName, null);
            }
        }

        var warnTxt = null;
        var f_start = theBlocks.indexOf('array initialize ' + myName + ' with');
        if (theBlocks.indexOf('array initialize ' + myName + ' with', f_start + 1) > -1) {
            warnTxt = 'WARNING! you can only initialize the array "' + myName + '" once!';
        }
        this.setWarningText(warnTxt);
    }
};

Blockly.propc.array_init = function () {
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), 'Array');
    var element = this.getFieldValue('NUM') || '10';

    if (!this.disabled) {
        Blockly.propc.global_vars_['__ARRAY' + varName] = 'int ' + varName + '[' + element + '];';
    }

    return '';
};

Blockly.Blocks.array_fill = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_FILL_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput('NUMS')
                .appendField('array fill')
                .appendField(new Blockly.FieldDropdown([["list", "list"]]), "VAR")
                .appendField("with values")
                .appendField(new Blockly.FieldTextInput('10,20,30,40,50'), 'NUM');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.updateArrayMenu();
    },
    buildArrayMenu: function (v_list) {
        this.removeInput('NUMS');
        var fi = this.getFieldValue('NUM');
        this.appendDummyInput('NUMS')
                .appendField('array fill')
                .appendField(new Blockly.FieldDropdown(v_list || [["list", "list"]]), "VAR")
                .appendField("with values")
                .appendField(new Blockly.FieldTextInput('10,20,30,40,50'), 'NUM');
        this.setFieldValue(fi, 'NUM');
    },
    updateArrayMenu: Blockly.Blocks['array_get'].updateArrayMenu,
    onchange: function () {
        var code = null;
        var elmnts = (this.getFieldValue('NUM').split(',')).length;
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
            var initStr = '';
            for (var ij = 0; ij < allBlocks.length; ij++) {
                if (allBlocks[ij].toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
                    initStr = allBlocks[ij].toString().replace(/[^0-9]/g, "");
                    break;
                }
            }
            if (elmnts > parseInt(initStr, 10)) {
                code = 'WARNING: You are trying to add more elements to your\narray than you initialized your array with!';
            }
        } else {
            code = 'WARNING: The array "' + this.getFieldValue('VAR') + '" has not been initialized!';
        }
        this.setWarningText(code);
    }
};

Blockly.propc.array_fill = function () {
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), 'Array');
    var varVals = this.getFieldValue('NUM');
    if (varVals.indexOf('0x') === 0 || varVals.indexOf(',0x') > 0) {
        varVals = varVals.replace(/[^0-9xA-Fa-f,-\.]/g, "");
    } else {
        varVals = varVals.replace(/[^0-9b,-\.]/g, "");
    }
    varVals = varVals.replace(/,\./g, ",0.")
            .replace(/\b\.[0-9-]+,\b/g, ",")
            .replace(/\.[0-9],/g, ",")
            .replace(/,,/g, ",0,")
            .replace(/,\s*$/, "");
    varVals = varVals.split(".")[0];
    var noCommas = varVals.replace(/,/g, "");

    var elements = varVals.length - noCommas.length + 1;
    var elemCount = 0;

    /* DONT DELETE - MAY WANT TO USE THIS CODE ELSEWHERE
     
     // Find all Array-type variables, and find the largest one.
     var ArrayList = Object.keys(Blockly.propc.global_vars_);
     var ArrayMaxSize = 1;
     for (var k = 0; k < ArrayList.length; k++) {
     if (ArrayList[k].indexOf('__ARRAY') >= 0) {
     var t = Blockly.propc.global_vars_[ArrayList[k]];
     t = t.replace(/[^0-9]/g, "");
     var z = parseInt(t, 10);
     if (z > ArrayMaxSize)
     ArrayMaxSize = z;
     }
     }
     
     Blockly.propc.global_vars_['__TEMP_ARR'] = 'int __tmpArr[' + ArrayMaxSize.toString() + '];';
     
     */

    var code = '';

    var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
    if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
        var initStr = '';
        for (var ij = 0; ij < allBlocks.length; ij++) {
            if (allBlocks[ij].toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
                initStr = allBlocks[ij].toString().replace(/[^0-9]/g, "");
                break;
            }
        }
        elemCount = parseInt(initStr, 10);

        if (elements > elemCount) {
            code += '// WARNING: You are trying to add more elements to your\n';
            code += '//          array than you initialized your array with!\n';
            elements = elemCount;
        }
        code += 'int __tmpArr' + tempArrayNumber.toString() + '[] = {' + varVals + '};\n';
        code += 'memcpy(' + varName + ', __tmpArr' + tempArrayNumber.toString() + ', ' + elements + ' * sizeof(int));\n';
        tempArrayNumber++;
    } else {
        code += '// ERROR: The array "' + this.getFieldValue('VAR') + '" has not been initialized!\n';
    }

    return code;
};

Blockly.Blocks.array_set = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_SET_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendValueInput('NUM')
                .appendField('array')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown([["list", "list"]]), "VAR")
                .appendField('element');
        this.appendValueInput('VALUE')
                .setCheck('Number')
                .appendField('=');
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.updateArrayMenu();
    },
    buildArrayMenu: function (v_list) {
        var toConn = this.getInput('NUM').connection.targetConnection;
        this.removeInput('NUM');
        this.appendValueInput('NUM')
                .appendField('array')
                .setCheck('Number')
                .appendField(new Blockly.FieldDropdown(v_list || [["list", "list"]]), "VAR")
                .appendField('element');
        this.moveInputBefore('NUM', 'VALUE');
        if (toConn) {
            this.getInput('NUM').connection.connect(toConn);
        }
    },
    updateArrayMenu: Blockly.Blocks['array_get'].updateArrayMenu,
    onchange: function () {
        var code = null;
        var elmnts = null;
        var en = Blockly.propc.valueToCode(this, 'NUM', Blockly.propc.ORDER_NONE) || '0';
        if (en.replace(/[^0-9]+/g, "") === en) {
            elmnts = parseInt(en);
        }
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
            var initStr = '';
            for (var ij = 0; ij < allBlocks.length; ij++) {
                if (allBlocks[ij].toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
                    initStr = allBlocks[ij].toString().replace(/[^0-9]/g, "");
                    break;
                }
            }
            if (elmnts) {
                if (elmnts >= parseInt(initStr, 10) || elmnts < 0) {
                    code = 'WARNING: You are trying to set an element\nin your array that does not exist!';
                }
            }
        } else {
            code = 'WARNING: The array "' + this.getFieldValue('VAR') + '" has not been initialized!';
        }
        this.setWarningText(code);
    }
};

Blockly.propc.array_set = function () {
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), 'Array');
    var element = Blockly.propc.valueToCode(this, 'NUM', Blockly.propc.ORDER_NONE) || '0';
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE) || '0';
    var code = varName + '[' + element + '] = ' + value + ';\n';
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
    if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
        var initStr = '';
        for (var ij = 0; ij < allBlocks.length; ij++) {
            if (allBlocks[ij].toString().indexOf('array initialize ' + this.getFieldValue('VAR')) > -1) {
                initStr = allBlocks[ij].toString().replace(/[^0-9]/g, "");
                break;
            }
        }
        if (element.replace(/[^0-9]+/g, "") === element) {
            if (parseInt(element) >= parseInt(initStr, 10) || parseInt(element) < 0) {
                code = 'WARNING: You are trying to set an element\nin your array that does not exist!\n';
            }
        } else {
            if (!this.disabled) {
                var setup_code = 'int constrain(int __cVal, int __cMin, int __cMax) {';
                setup_code += 'if(__cVal < __cMin) __cVal = __cMin;\n';
                setup_code += 'if(__cVal > __cMax) __cVal = __cMax;\nreturn __cVal;\n}\n';
                Blockly.propc.methods_["constrain_function"] = setup_code;
                Blockly.propc.method_declarations_["constrain_function"] = 'int constrain(int __cVal, int __cMin, int __cMax);\n';
            }
            code = varName + '[constrain(' + element + ', 0, ';
            code += (parseInt(initStr, 10) - 1).toString(10);
            code += ')] = ' + value + ';\n';
        }
    } else {
        code = 'WARNING: The array "' + this.getFieldValue('VAR') + '" has not been initialized!\n';
    }
    return code;
};

Blockly.Blocks.array_clear = {
    helpUrl: Blockly.MSG_ARRAYS_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_ARRAY_CLEAR_TOOLTIP);
        this.setColour(colorPalette.getColor('variables'));
        this.appendDummyInput('NUM')
                .appendField('array clear')
                .appendField(new Blockly.FieldDropdown([["list", "list"]]), "VAR");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.updateArrayMenu();
    },
    buildArrayMenu: function (v_list) {
        this.removeInput('NUM');
        this.appendDummyInput('NUM')
                .appendField('array clear')
                .appendField(new Blockly.FieldDropdown(v_list || [["list", "list"]]), "VAR");
    },
    updateArrayMenu: Blockly.Blocks['array_get'].updateArrayMenu,
    onchange: function () {
        var code = null;
        var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
        if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) === -1) {
            code = 'WARNING: The array "' + this.getFieldValue('VAR') + '" has not been initialized!';
        }
        this.setWarningText(code);
    }
};

Blockly.propc.array_clear = function () {
    var varName = Blockly.propc.variableDB_.getName(this.getFieldValue('VAR'), 'Array');
    var allBlocks = Blockly.getMainWorkspace().getAllBlocks();
    if (allBlocks.toString().indexOf('array initialize ' + this.getFieldValue('VAR')) === -1) {
        return '// ERROR: The array "' + this.getFieldValue('VAR') + '" has not been initialized!\n';
    } else {
        return 'memset(' + varName + ', 0, sizeof ' + varName + ');\n';
    }
};
