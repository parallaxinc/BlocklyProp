/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Range input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';
goog.provide('Blockly.FieldRange');
goog.require('Blockly.FieldTextInput');
goog.require('goog.math');
goog.require('goog.userAgent');
/**
 * Class for an editable range field.
 * @param {string} text The initial content of the field.
 * @param {string} opt_min The minimum content of the field.
 * @param {string} opt_max The maximum content of the field.
 * @param {Function} opt_changeHandler An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldRange = function (text, opt_min, opt_max, opt_changeHandler) {
    var changeHandler;
    if (opt_changeHandler) {
        // Wrap the user's change handler together with the range validator.
        var thisObj = this;
        changeHandler = function (value) {
            value = Blockly.FieldRange.rangeValidator.call(thisObj, value);
            if (value !== null) {
                opt_changeHandler.call(thisObj, value);
            }
            return value;
        };
    } else {
        changeHandler = Blockly.FieldRange.rangeValidator;
    }

    Blockly.FieldRange.MIN = Number(opt_min);
    Blockly.FieldRange.MAX = Number(opt_max);
    Blockly.FieldRange.superClass_.constructor.call(this,
            text, changeHandler);
};
goog.inherits(Blockly.FieldRange, Blockly.FieldTextInput);
/**
 * Clone this FieldRange.
 * @return {!Blockly.FieldRange} The result of calling the constructor again
 *   with the current values of the arguments used during construction.
 */
Blockly.FieldRange.prototype.clone = function () {
    return new Blockly.FieldRange(this.getText(), this.changeHandler_,
            Blockly.FieldRange.MIN, Blockly.FieldRange.MAX);
};
/**
 * Clean up this FieldRange, as well as the inherited FieldTextInput.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldRange.prototype.dispose_ = function () {
    var thisField = this;
    return function () {
        Blockly.FieldRange.superClass_.dispose_.call(thisField)();
        thisField.gauge_ = null;
        if (thisField.clickWrapper_) {
            Blockly.unbindEvent_(thisField.clickWrapper_);
        }
        if (thisField.moveWrapper1_) {
            Blockly.unbindEvent_(thisField.moveWrapper1_);
        }
        if (thisField.moveWrapper2_) {
            Blockly.unbindEvent_(thisField.moveWrapper2_);
        }
    };
};
/**
 * Show the inline free-text editor on top of the text.
 * @private
 */
Blockly.FieldRange.prototype.showEditor_ = function () {
    var noFocus =
            goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD;
    // Mobile browsers have issues with in-line textareas (focus & keyboards).
    Blockly.FieldRange.superClass_.showEditor_.call(this, noFocus);
    var div = Blockly.WidgetDiv.DIV;
    if (!div.firstChild) {
        // Mobile interface uses window.prompt.
        return;
    }

    // Build the SVG DOM for the slider
    var svg = Blockly.createSvgElement('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:html': 'http://www.w3.org/1999/xhtml',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'version': '1.1',
        'height': '44px',
        'width': '200px'
    }, div);
    this.gauge_ = Blockly.createSvgElement('rect', {
        'x': '10', 'y': '10',
        'rx': '12', 'ry': '12',
        'width': '180', 'height': '24',
        'style': 'fill: #bbb;stroke: #000;stroke-width: .5;'
    }, svg);
    if (Blockly.FieldRange.MIN < 0) {
        Blockly.createSvgElement('line', {
            'x1': '22', 'y1': '22', 'x2': '178', 'y2': '22',
            'style': 'stroke:#888;stroke-width:10;stroke-linecap:round;'
        }, svg);
    }
    if (Blockly.FieldRange.MAX > 0 && Blockly.FieldRange.MIN < 0) {
        Blockly.createSvgElement('line', {
            'x1': '125', 'y1': '22', 'x2': '178', 'y2': '22',
            'style': 'stroke:#eee;stroke-width:10;stroke-linecap:round;'
        }, svg);
        Blockly.createSvgElement('line', {
            'x1': '100', 'y1': '22', 'x2': '135', 'y2': '22',
            'style': 'stroke:#eee;stroke-width:10;'
        }, svg);
    } else {
        Blockly.createSvgElement('line', {
            'x1': '22', 'y1': '22', 'x2': '178', 'y2': '22',
            'style': 'stroke:#eee;stroke-width:10;stroke-linecap:round;'
        }, svg);
    }
    this.circle_ = Blockly.createSvgElement('circle', {
        'r': '9.5',
        'style': 'fill:#fff;stroke:#000;fill-opacity:.6;stroke-width:2;'
    }, svg);
    svg.style.marginLeft = '-35px';
    this.clickWrapper_ =
            Blockly.bindEvent_(svg, 'click', this, Blockly.WidgetDiv.hide);
    this.moveWrapper1_ =
            Blockly.bindEvent_(this.circle_, 'mousemove', this, this.onMouseMove);
    this.moveWrapper2_ =
            Blockly.bindEvent_(this.gauge_, 'mousemove', this, this.onMouseMove);
    this.updateGraph_();
};
/**
 * Set the range to match the mouse's position.
 * @param {!Event} e Mouse move event.
 */
Blockly.FieldRange.prototype.onMouseMove = function (e) {

    var bBox = this.gauge_.ownerSVGElement.getBoundingClientRect();
    // set this values:
    //var steps = Blockly.FieldRange.ROUND;
    var min = Blockly.FieldRange.MIN;
    var max = Blockly.FieldRange.MAX;
    // calculate slider position:
    var m = max - min;
    var dx = e.clientX - bBox.left;
    var pos = dx / (bBox.width / 200);
    if (pos < 22)
        pos = 22;
    if (pos > 178)
        pos = 178;
    // draw slider and knob:
    var range = Math.round(((pos - 22) / (178 - 22)) * m + min);
    if (isNaN(range)) {
        // This shouldn't happen, but let's not let this error propogate further.
        return;
    }
    range = String(range);
    Blockly.FieldTextInput.htmlInput_.value = range;
    this.setText(range);
};
/**
 * Insert a degree symbol.
 * @param {?string} text New text.
 */
Blockly.FieldRange.prototype.setText = function (text) {
    Blockly.FieldRange.superClass_.setText.call(this, text);
    if (!this.textElement_) {
        // Not rendered yet.
        return;
    }
    this.updateGraph_();
    // Cached width is obsolete.  Clear it.
    this.size_.width = 0;
};
/**
 * Redraw the graph with the current range.
 * @private
 */
Blockly.FieldRange.prototype.updateGraph_ = function () {
    if (!this.gauge_) {
        return;
    }

    var rangeValue = Number(this.getText());
    if (isNaN(rangeValue)) {
        this.circle_.setAttribute('cx', '100');
        this.circle_.setAttribute('cy', '22');
    } else {
        var min = Blockly.FieldRange.MIN;
        var max = Blockly.FieldRange.MAX;
        // calculate slider position:
        var m = max - min;
        if (rangeValue < min)
            rangeValue = min;
        if (rangeValue > max)
            rangeValue = max;
        var pos = Math.round(((rangeValue - min) / m) * 156 + 22);
        this.circle_.setAttribute('cx', pos);
        this.circle_.setAttribute('cy', '22');
    }
};
/**
 * Ensure that only a number may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid range, or null if invalid.
 */
Blockly.FieldRange.rangeValidator = function (text) {
    var n = Blockly.FieldTextInput.numberValidator(text);
    if (n < Blockly.FieldRange.MIN)
        n = Blockly.FieldRange.MIN;
    if (n > Blockly.FieldRange.MAX)
        n = Blockly.FieldRange.MAX;
    return n;
};
