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
 * @fileoverview Utility functions for handling variables and procedure names.
 * Note that variables and procedures share the same name space, meaning that
 * one can't have a variable and a procedure of the same name.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Name space for the variables singleton.
 */
Blockly.Pointers = {};

/**
 * Category to separate variable names from procedures and generated functions.
 */
Blockly.Pointers.NAME_TYPE = 'pointer';

/**
 * Find all user-created variables.
 * @param {Blockly.Block} opt_block Optional root block.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.Pointers.allPointers = function(opt_block) {
  var blocks;
  if (opt_block) {
    blocks = opt_block.getDescendants();
  } else {
    blocks = Blockly.mainWorkspace.getAllBlocks();
  }
  var variableHash = {};
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getPointers;
    if (func) {
      var blockPointers = func.call(blocks[x]);
      for (var y = 0; y < blockPointers.length; y++) {
        var varName = blockPointers[y];
        // Variable name may be null if the block is only half-built.
        if (varName) {
          variableHash[Blockly.Names.PREFIX_ +
              varName.toLowerCase()] = {name:varName, type:'Pointer'};
        }
      }
    }
  }
  // Flatten the hash into a list.
  var variableList = [];
  for (var var_obj in variableHash) {
    variableList.push(variableHash[var_obj]);
  }
  return variableList;
};

/**
 * Find all instances of the specified variable and rename them.
 * @param {string} oldName Variable to rename.
 * @param {string} newName New variable name.
 */
Blockly.Pointers.renamePointer = function(oldName, newName) {
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  // Iterate through every block.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].renameVar;
    if (func) {
      func.call(blocks[x], oldName, newName);
    }
  }
};

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.Pointers.flyoutCategory = function(blocks, gaps, margin, workspace) {
  var variableList = Blockly.Pointers.allPointers();
  //variableList.sort(goog.string.caseInsensitiveCompare);
  variableList.sort(function(a,b){return a.name- b.name});
  // In addition to the user's variables, we also want to display the default
  // variable name at the top.  We also don't want this duplicated if the
  // user has created a variable of the same name.
  variableList.unshift(null);
  var defaultVariable = undefined;
  
  //add declareBlock into variables flyout //TOOD: add a flag to enable this block
  if (Blockly.Language.pointers_declare ) {
    var block = new Blockly.Block(workspace, 'pointers_declare');
    block.initSvg();
    blocks.push(block);
    gaps.push(margin * 2);
  }
  
  for (var i = 0; i < variableList.length; i++) {
    if (variableList[i]!=null && variableList[i].name === defaultVariable) {
      continue;
    }
    var getBlock = Blockly.Language.pointers_get ?
        new Blockly.Block(workspace, 'pointers_get') : null;
    getBlock && getBlock.initSvg();
    var setBlock = Blockly.Language.pointers_set ?
        new Blockly.Block(workspace, 'pointers_set') : null;
    setBlock && setBlock.initSvg();
    if (variableList[i] === null) {
      defaultVariable = (getBlock || setBlock).getPointers()[0];
    } else {
      getBlock && getBlock.setTitleValue(variableList[i].name, 'VAR');
      setBlock && setBlock.setTitleValue(variableList[i].name, 'VAR');
    }
    setBlock && blocks.push(setBlock);
    getBlock && blocks.push(getBlock);
    if (getBlock && setBlock) {
      gaps.push(margin, margin * 3);
    } else {
      gaps.push(margin * 2);
    }
  }
};

/**
 * Refresh the variable flyout if it is open.
 * Only used if the flyout's autoClose is false.
 */
Blockly.Pointers.refreshFlyoutCategory = function() {
  if (Blockly.Toolbox && Blockly.Toolbox.flyout_.isVisible() &&
      Blockly.Toolbox.selectedOption_.cat == Blockly.MSG_POINTER_CATEGORY) {
    Blockly.Toolbox.flyout_.hide();
    Blockly.Toolbox.flyout_.show(Blockly.MSG_POINTER_CATEGORY);
  }
};

/**
* Return a new variable name that is not yet being used. This will try to
* generate single letter variable names in the range 'i' to 'z' to start with.
* If no unique name is located it will try 'i1' to 'z1', then 'i2' to 'z2' etc.
* @return {string} New variable name.
*/
Blockly.Pointers.generateUniqueName = function() {
  var pointerList = Blockly.Pointers.allPointers();
  var newName = '';
  if (pointerList.length) {
    //variableList.sort(goog.string.caseInsensitiveCompare);
    pointerList.sort(function(a,b){return a.name- b.name});
    var nameSuffix = 0, potName = 'i', i = 0, inUse = false;
    while (!newName) {
      i = 0;
      inUse = false;
      while (i < pointerList.length && !inUse) {
        if (pointerList[i].name.toLowerCase() == potName) {
          // This potential name is already used.
          inUse = true;
        }
        i++;
      }
      if (inUse) {
        // Try the next potential name.
        if (potName[0] === 'z') {
          // Reached the end of the character sequence so back to 'a' but with
          // a new suffix.
          nameSuffix++;
          potName = 'a';
        } else {
          potName = String.fromCharCode(potName.charCodeAt(0) + 1);
          if (potName[0] == 'l') {
            // Avoid using variable 'l' because of ambiguity with '1'.
            potName = String.fromCharCode(potName.charCodeAt(0) + 1);
          }
        }
        if (nameSuffix > 0) {
          potName += nameSuffix;
        }
      } else {
        // We can use the current potential name.
        newName = potName;
      }
    }
  } else {
    newName = 'i';
  }
  return newName;
};
