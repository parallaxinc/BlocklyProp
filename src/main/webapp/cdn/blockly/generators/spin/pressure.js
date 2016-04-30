/*
 This file contains support for pressure/liquid level sensors

 Author: Vale Tolpegin ( valetolpegin@gmail.com )
 */
'use strict';

//define blocks
if (!Blockly.Blocks)
    Blockly.Blocks = {};

//Creating GUI blocks for eTape liquid sensor
Blockly.Blocks.etape_rc_time = {
    category: 'Sensors',
    helpUrl: '',
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput("")
                .appendField("ETape sensor rc_time input")
                .appendField("Pin")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput("")
                .appendField("Put input value in")
                .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setInputsInline(true);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

Blockly.Blocks.etape_voltage_input = {
    category: 'Sensors',
    helpUrl: '',
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput("")
                .appendField("ETape sensor voltage input")
                .appendField("Pin")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "PIN");
        this.setNextStatement(false, null);
        this.setPreviousStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

//Create code for blocks
Blockly.Spin.etape_rc_time = function () {
    var pin = this.getFieldValue('PIN');
    var inputStorage = Blockly.Spin.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    Blockly.Spin.definitions_[ "include_rctime" ] = 'rc : "RC Time"';
    Blockly.Spin.setups_[ "rctime" ] = 'rc.ChargeTime(clkfreq/1000)\nrc.TimeOut(clkfreq/50)\n'

    var code = 'rc.Time( ' + pin + ', 1, @' + inputStorage + ' )';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};

Blockly.Spin.etape_voltage_input = function () {
    var pin = this.getFieldValue('PIN');

    Blockly.Spin.definitions_[ "abvolts" ] = 'adc : "PropBOE ADC"';

    var code = 'adc.In( ' + pin + ' )';
    return [code, Blockly.Spin.ORDER_ATOMIC];
};
