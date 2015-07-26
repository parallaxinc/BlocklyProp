/**
 * Visual Blocks Editor
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
 * @fileoverview Variable input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Class for a variable's dropdown field.
 * @param {!string} varname The default name for the variable.  If null,
 *     a unique variable name will be generated.
 * @extends Blockly.FieldDropdown
 * @constructor
 */
Blockly.FieldPointer = function (varname) {
    // Call parent's constructor.
    Blockly.FieldDropdown.call(this, Blockly.FieldPointer.dropdownCreate,
        Blockly.FieldPointer.dropdownChange);
    if (varname) {
        this.setText(varname);
    } else {
        this.setText(Blockly.Pointers.generateUniqueName());
    }
};

// FieldPointer is a subclass of FieldDropdown.
goog.inherits(Blockly.FieldPointer, Blockly.FieldDropdown);

/**
 * Get the variable's name (use a variableDB to convert into a real name).
 * Unline a regular dropdown, variables are literal and have no neutral value.
 * @return {string} Current text.
 */
Blockly.FieldPointer.prototype.getValue = function () {
    return this.getText();
};

/**
 * Set the variable name.
 * @param {string} text New text.
 */
Blockly.FieldPointer.prototype.setValue = function (text) {
    this.setText(text);
};

function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i] === id) {
            return i;
        }
        if (typeof(source[i]) === "object") {
            if (source[i].name === id) {
                return i;
            }
        }
    }
    return -1;
}

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<string>} Array of variable names.
 * @this {!Blockly.FieldPointer}
 */
Blockly.FieldPointer.dropdownCreate = function () {
    var pointerList = Blockly.Pointers.allPointers();
    // Ensure that the currently selected variable is an option.
    var name = this.getText();
    // if (name && variableList.indexOf(name) == -1) {
    if (name && findById(pointerList, name) == -1) {
        //all variables should be object
        pointerList.push(name.name);
    }
    // variableList.sort(goog.string.caseInsensitiveCompare);
    pointerList.sort(function (a, b) {
        return a.name - b.name
    });
    pointerList.push(Blockly.MSG_RENAME_POINTER);
    pointerList.push(Blockly.MSG_NEW_POINTER);
    // Variables are not language-specific, use the name as both the user-facing
    // text and the internal representation.
    var options = [];

    for (var x = 0; x < pointerList.length; x++) {
        if (typeof(pointerList[x]) === "string") {
            options[x] = [pointerList[x], pointerList[x]];
        } else {
            options[x] = [pointerList[x].name, pointerList[x]];
        }
    }
    return options;
};

/**
 * Event handler for a change in variable name.
 * Special case the 'New variable...' and 'Rename variable...' options.
 * In both of these special cases, prompt the user for a new name.
 * @param {string} text The selected dropdown menu option.
 * @this {!Blockly.FieldPointer}
 */
Blockly.FieldPointer.dropdownChange = function (text) {
    function promptName(promptText, defaultText) {
        Blockly.hideChaff();
        var newVar = window.prompt(promptText, defaultText);
        // Merge runs of whitespace.  Strip leading and trailing whitespace.
        // Beyond this, all names are legal.
        return newVar && newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    }

    if (text == Blockly.MSG_RENAME_POINTER) {
        var oldVar = this.getText();
        text = promptName(Blockly.MSG_RENAME_POINTER_TITLE.replace('%1', oldVar),
            oldVar);
        if (text) {
            Blockly.Pointers.renamePointer(oldVar, text);
        }
    } else if (text == Blockly.MSG_NEW_POINTER) {
        text = promptName(Blockly.MSG_NEW_POINTER_TITLE, '');
        // Since variables are case-insensitive, ensure that if the new variable
        // matches with an existing variable, the new case prevails throughout.
        Blockly.Pointers.renamePointer(text, text);
    }
    if (text) {
        this.setText(text);
    }
    window.setTimeout(Blockly.Pointers.refreshFlyoutCategory, 1);
};
