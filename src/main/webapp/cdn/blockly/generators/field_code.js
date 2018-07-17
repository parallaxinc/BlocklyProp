/**
 * @fileoverview Code input field.
 * @author mmatz@parallax.com (Matthew Matz)
 */
'use strict';

goog.provide('Blockly.FieldCode');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.ColorPicker');
goog.require('goog.style');



/**
 * Class for a code input field.
 * @param {string} code The initial code.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldCode = function(code) {
  Blockly.FieldCode.superClass_.constructor.call(this, code);
  this.setValue(code);
};
goog.inherits(Blockly.FieldCode, Blockly.Field);

/**
 * Install this field on a block.
 * @param {!Blockly.Block} block The block containing this field.
 */
Blockly.FieldCode.prototype.init = function(block) {
  Blockly.FieldCode.superClass_.init.call(this, block);
  this.borderRect_.style['fillOpacity'] = 1;
};

/**
 * Clone this FieldCode.
 * @return {!Blockly.FieldCode} The result of calling the constructor again
 *   with the current values of the arguments used during construction.
 */
Blockly.FieldCode.prototype.clone = function() {
  return new Blockly.FieldCode(this.getValue());
};

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldCode.prototype.CURSOR = 'editable';

/**
 * Close the code picker if this input is being deleted.
 */
Blockly.FieldCode.prototype.dispose = function() {
  //this.codeField_.destroy();
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldCode.superClass_.dispose.call(this);
};

/**
 * Return the current code.
 * @return {string} Current code.
 */
Blockly.FieldCode.prototype.getValue = function() {
  return this.getText();
};

/**
 * Set the code.
 * @param {string} code The new code in '#rrggbb' format.
 */
Blockly.FieldCode.prototype.setValue = function(code) {
  this.setText(code);
  if (this.borderRect_) {
    this.borderRect_.style.fill = '#d3d3d3';
  }
};


/**
 * Get the text from this field.  Used when the block is collapsed.
 * @return {string} Current text.
 */
Blockly.FieldCode.prototype.getText = function() {
  return Blockly.Field.prototype.getText.call(this);
};

Blockly.FieldCode.prototype.setText = function(t) {
  Blockly.Field.prototype.setText.call(this, t);
};

function getOffset_(el) {
  el = el.getBoundingClientRect();
  return {
    x: el.left + window.scrollX,
    y: el.top + window.scrollY
  }
}
/**
 * Create a palette under the code field.
 * @private
 */
Blockly.FieldCode.prototype.showEditor_ = function() {
  Blockly.WidgetDiv.show(this, Blockly.FieldCode.widgetDispose_);

  var node = document.createElement("DIV");                  // Create a <div> node
  node.className = 'field_code';

  this.codeField_ = ace.edit(node);
  this.codeField_.setTheme("ace/theme/chrome");
  this.codeField_.getSession().setMode("ace/mode/c_cpp");
  this.codeField_.getSession().setTabSize(2);
  this.codeField_.$blockScrolling = Infinity;
  this.codeField_.setValue(this.getText());

  var theEditor = this;
  this.codeField_.on('change', function(e) {theEditor.setText(theEditor.codeField_.getValue());});

  var windowSize = goog.dom.getViewportSize();
  var scrollOffset = goog.style.getViewportPageOffset(document);
  var xy = getOffset_(/** @type {!Element} */ (this.borderRect_));
  var borderBBox = this.borderRect_.getBBox();
  var div = Blockly.WidgetDiv.DIV;
  div.appendChild(node);

  var paletteSize = goog.style.getSize(node);

  // Flip the palette vertically if off the bottom.
  if (xy.y + paletteSize.height + borderBBox.height >=
      windowSize.height + scrollOffset.y) {
    xy.y -= paletteSize.height - 1;
  } else {
    xy.y += borderBBox.height - 1;
  }
  if (Blockly.RTL) {
    xy.x += borderBBox.width;
    xy.x -= paletteSize.width;
    // Don't go offscreen left.
    if (xy.x < scrollOffset.x) {
      xy.x = scrollOffset.x;
    }
  } else {
    // Don't go offscreen right.
    if (xy.x > windowSize.width + scrollOffset.x - paletteSize.width) {
      xy.x = windowSize.width + scrollOffset.x - paletteSize.width;
    }
  }
  Blockly.WidgetDiv.position(xy.x, xy.y, windowSize, scrollOffset);
};

/**
 * Hide the code palette.
 * @private
 */
Blockly.FieldCode.widgetDispose_ = function() {
  this.setText(this.codeField_.getValue());
  this.codeField_.destroy();
};
