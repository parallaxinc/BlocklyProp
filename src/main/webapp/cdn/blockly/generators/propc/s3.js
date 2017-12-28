
'use strict';

Blockly.Blocks.scribbler_loop = {
    init: function () {
        this.appendDummyInput()
                .appendField("loop");
        this.appendStatementInput("LOOP");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LOOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_loop = function () {
    var branch = Blockly.propc.statementToCode(this, 'LOOP');
    if (Blockly.propc.INFINITE_LOOP_TRAP) {
        branch = Blockly.propc.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    return 'while(1) {\n' + branch + '}\n';
};

Blockly.Blocks.scribbler_limited_loop = {
    init: function () {
        this.appendDummyInput()
                .appendField("loop")
                .appendField(new Blockly.FieldTextInput('10', Blockly.FieldTextInput.numberValidator), 'LOOP_COUNT')
                .appendField("times");
        this.appendStatementInput("LOOP");

        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LIMITED_LOOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_limited_loop = function () {
    var branch = Blockly.propc.statementToCode(this, 'LOOP');
    if (Blockly.propc.INFINITE_LOOP_TRAP) {
        branch = Blockly.propc.INFINITE_LOOP_TRAP.replace(/%1/g,
                '\'' + this.id + '\'') + branch;
    }
    var repeats = this.getFieldValue('LOOP_COUNT') || '0';
    return 'for (int __n = 0; __n < ' + repeats + '; __n++) {\n' + branch + '}\n';
};


Blockly.Blocks.scribbler_exit_loop = {
    init: function () {
        this.appendDummyInput()
                .appendField("exit loop");
        this.setPreviousStatement(true, "Block");
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_EXIT_LOOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_exit_loop = function () {
    return 'break;\n';
};

Blockly.Blocks.scribbler_simple_wait = {
    init: function () {
        this.appendDummyInput()
                .appendField("wait")
                .appendField(new Blockly.FieldTextInput('5', Blockly.FieldTextInput.numberValidator), 'WAITTIME')
                .appendField(new Blockly.FieldDropdown([
            ['seconds', '1000'], 
            ['tenths of a second', '100'], 
            ['milliseconds', '1']
        ]), 'TIMESCALE');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_SIMPLE_WAIT_TOOLTIP);
        this.onchange();
    },
    onchange: function () {
        var wait_time = Number(this.getFieldValue('WAITTIME') || '1');
        var time_scale = Number(this.getFieldValue('TIMESCALE'));
        if (time_scale === 1 && wait_time > 15000)
            this.setWarningText('WARNING: If the units are in milliseconds,\nthe wait time must be less than 15000');
        else
            this.setWarningText(null);
    }
};

Blockly.propc.scribbler_simple_wait = function () {
    var wait_time = this.getFieldValue('WAITTIME') || '1';
    var time_scale = this.getFieldValue('TIMESCALE');
    if (time_scale !== '1')
        return 'for(int __i = 0; __i < ' + wait_time + '; __i++) pause(' + time_scale + ');\n';
    else
        return 'pause(' + wait_time + ');\n';
};

Blockly.Blocks.scribbler_wait = {
    init: function () {
        this.appendValueInput("WAITTIME", 'Number')
                .appendField('N,0,0,0', 'RANGEVALS0')
                .appendField("wait")
                .setCheck('Number');
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([['seconds', '1000'], ['tenths of a second', '100'], ['milliseconds', '1']], function (unit) {
                    this.sourceBlock_.newUnit(unit);
                }), 'TIMESCALE');
        this.getField('RANGEVALS0').setVisible(false);
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_CONTROL_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_WAIT_TOOLTIP);
    },
    newUnit: function (unit) {
        var thisConnection_ = this.getInput('WAITTIME').connection;
        var thisBlock_ = thisConnection_.targetBlock();
        var rangeText = 'N,0,0,0';

        if (unit !== '1')
            rangeText = 'R,0,15000,0';

        this.setFieldValue(rangeText, 'RANGEVALS0');

        if (thisBlock_)
            if (thisBlock_.onchange)
                thisBlock_.onchange.call(thisBlock_);
    }
};

Blockly.propc.scribbler_wait = function () {
    var wait_time = Blockly.propc.valueToCode(this, 'WAITTIME', Blockly.propc.ORDER_NONE) || '1';
    var time_scale = this.getFieldValue('TIMESCALE');
    if (time_scale !== '1')
        return 'for(int __i = 0; __i < ' + wait_time + '; __i++) pause(' + time_scale + ');\n';
    else
        return 'pause(' + wait_time + ');\n';
};

Blockly.Blocks.scribbler_if_line = {
    init: function () {
        this.appendDummyInput()
                .appendField("if the Scribbler")
                .appendField(new Blockly.FieldDropdown([
                    ['is', 'IS'],
                    ['is not', 'IS_NOT']
                ], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'LINE_CONDITION')
                .appendField("over")
                .appendField(new Blockly.FieldDropdown([['the center', 'CENTER'], ['the left edge', 'LEFT'], ['the right edge', 'RIGHT'], ['any part', 'DETECTED']]), 'LINE_POSITION')
                .appendField("of a")
                .appendField(new Blockly.FieldDropdown([['black', 'BLACK'], ['white', 'WHITE']]), 'LINE_COLOR')
                .appendField("line");
        this.appendStatementInput("IF_LINE")
                .appendField();
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_LINE_TOOLTIP);
    },
    checkForWas: function (state) {
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('LINE_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_if_line = function () {
    var line_condition = this.getFieldValue('LINE_CONDITION');
    var line_position = this.getFieldValue('LINE_POSITION');
    var line_color = this.getFieldValue('LINE_COLOR');
    var code = 'if(s3_simpleLine(S3_' + line_condition + ', S3_' + line_position + ', S3_' + line_color + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_LINE') + '\n}';
};

Blockly.Blocks.scribbler_simple_line = {
    init: function () {
        this.appendDummyInput()
                .appendField("line sensor")
                .appendField(new Blockly.FieldDropdown([
                    ['is', 'IS'],
                    ['is not', 'IS_NOT']
                ], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'LINE_CONDITION')
                .appendField("over")
                .appendField(new Blockly.FieldDropdown([['the center', 'CENTER'], ['the left edge', 'LEFT'], ['the right edge', 'RIGHT'], ['any part', 'DETECTED']]), 'LINE_POSITION')
                .appendField("of a")
                .appendField(new Blockly.FieldDropdown([['black', 'BLACK'], ['white', 'WHITE']]), 'LINE_COLOR')
                .appendField("line");
        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_LINE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_LINE_TOOLTIP);
    },
    checkForWas: function (state) {
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('LINE_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_simple_line = function () {
    var line_condition = this.getFieldValue('LINE_CONDITION');
    var line_position = this.getFieldValue('LINE_POSITION');
    var line_color = this.getFieldValue('LINE_COLOR');
    var code = 's3_simpleLine(S3_' + line_condition + ', S3_' + line_position + ', S3_' + line_color + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_if_obstacle = {
    init: function () {
        this.appendDummyInput()
                .appendField("if an obstacle")
                .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT']], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'OBSTACLE_CONDITION')
                .appendField(new Blockly.FieldDropdown([['in front of', 'CENTER'], ['to the left of', 'LEFT'], ['to the right of', 'RIGHT'], ['detected by', 'DETECTED']]), 'OBSTACLE_POSITION')
                .appendField("the Scribbler");
        this.appendStatementInput("IF_OBSTACLE")
                .appendField();
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_OBSTACLE_TOOLTIP);
    },
    checkForWas: function (state) {
        if (state === undefined) state = this.getFieldValue('OBSTACLE_CONDITION');
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('OBSTACLE_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_if_obstacle = function () {
    var obstacle_condition = this.getFieldValue('OBSTACLE_CONDITION');
    var obstacle_position = this.getFieldValue('OBSTACLE_POSITION');
    var code = 'if(s3_simpleObstacle(S3_' + obstacle_condition + ', S3_' + obstacle_position + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_OBSTACLE') + '\n}';
};

Blockly.Blocks.scribbler_simple_obstacle = {
    init: function () {
        this.appendDummyInput()
                .appendField("obstacle")
                .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT']], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'OBSTACLE_CONDITION')
                .appendField("detected")
                .appendField(new Blockly.FieldDropdown([
                    ['in front', 'CENTER'],
                    ['to the left', 'LEFT'],
                    ['to the right', 'RIGHT'],
                    ['on either side', 'DETECTED']
                ]), 'OBSTACLE_POSITION');
        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_OBSTACLE_TOOLTIP);
    },
    checkForWas: function (state) {
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('OBSTACLE_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_simple_obstacle = function () {
    var obstacle_condition = this.getFieldValue('OBSTACLE_CONDITION');
    var obstacle_position = this.getFieldValue('OBSTACLE_POSITION');
    var code = 's3_simpleObstacle(S3_' + obstacle_condition + ', S3_' + obstacle_position + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_if_light = {
    init: function () {
        this.appendDummyInput()
                .appendField("if the most light")
                .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT']], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'LIGHT_CONDITION')
                .appendField(new Blockly.FieldDropdown([['in front', 'CENTER'], ['to the left', 'LEFT'], ['to the right', 'RIGHT'], ['on all sides', 'DETECTED']]), 'LIGHT_POSITION')
                .appendField("of the Scribbler");
        this.appendStatementInput("IF_LIGHT")
                .appendField();
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_LIGHT_TOOLTIP);
    },
    checkForWas: function (state) {
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('LIGHT_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_if_light = function () {
    var light_condition = this.getFieldValue('LIGHT_CONDITION');
    var light_position = this.getFieldValue('LIGHT_POSITION');
    var code = 'if(s3_simpleLight(S3_' + light_condition + ', S3_' + light_position + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_LIGHT') + '\n}';
};

Blockly.Blocks.scribbler_simple_light = {
    init: function () {
        this.appendDummyInput()
                .appendField('light sensed is')
                .appendField(new Blockly.FieldDropdown([
                    ['brightest', 'IS'],
                    ['darkest', 'IS_NOT']
                ], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'LIGHT_CONDITION')
                .appendField(' ')
                .appendField(new Blockly.FieldDropdown([
                    ['in front', 'CENTER'],
                    ['to the left', 'LEFT'],
                    ['to the right', 'RIGHT']
                ]), 'LIGHT_POSITION');
        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_LIGHT_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_LIGHT_TOOLTIP);
    },
    checkForWas: function (state) {
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('LIGHT_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_simple_light = function () {
    var light_condition = this.getFieldValue('LIGHT_CONDITION');
    var light_position = this.getFieldValue('LIGHT_POSITION');
    var code = 's3_simpleLight(S3_' + light_condition + ', S3_' + light_position + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_if_stalled = {
    init: function () {
        this.appendDummyInput()
                .appendField("if the Scribbler")
                .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT']], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'STALLED_CONDITION')
                .appendField("stuck");
        this.appendStatementInput("IF_STALLED")
                .appendField();
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_STALLED_TOOLTIP);
    },
    checkForWas: function (state) {
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('STALLED_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_if_stalled = function () {
    var code = 'if(s3_simpleStalled(S3_' + this.getFieldValue('STALLED_CONDITION') + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_STALLED') + '\n}';
};

Blockly.Blocks.scribbler_if_button = {
    init: function () {
        this.appendDummyInput()
                .appendField("if the red button")
                .appendField(new Blockly.FieldDropdown([['is', 'IS'], ['is not', 'IS_NOT']], function (state) {
                    this.sourceBlock_.checkForWas(state);
                }), 'BUTTON_CONDITION')
                .appendField("pressed");
        this.appendStatementInput("IF_BUTTON");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
    },
    checkForWas: function (state) {
        if (state === 'WAS' || state === 'WAS_NOT') {
            this.setColour('#FF8800');
            this.setWarningText('WARNING: "was" ans "was not" conditions have been deprecated.\nPlease choose "is" or "is not".\nUse a variable block to keep track of the state of this sensor instead.');
        } else {
            this.setColour(colorPalette.getColor('input'));
            this.setWarningText(null);
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('state', this.getFieldValue('BUTTON_CONDITION'));
        return container;
    },
    domToMutation: function (xmlElement) {
        var state = xmlElement.getAttribute('state');
        this.checkForWas(state);
    }
};

Blockly.propc.scribbler_if_button = function () {
    var code = 'if(s3_simpleButton(S3_' + this.getFieldValue('BUTTON_CONDITION') + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_BUTTON') + '\n}';
};

Blockly.Blocks.scribbler_if_random = {
    init: function () {
        this.appendDummyInput()
                .appendField("if a virtual coin flip is")
                .appendField(new Blockly.FieldDropdown([['heads', ''], ['tails', '_NOT']]), 'RANDOM_INVERT');
        this.appendStatementInput("IF_RANDOM");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_IF_RANDOM_TOOLTIP);
    }
};

Blockly.propc.scribbler_if_random = function () {
    var code = 'if(s3_simpleRandom(S3_IS' + this.getFieldValue('RANDOM_INVERT') + ')) {\n';
    return code + Blockly.propc.statementToCode(this, 'IF_RANDOM') + '\n}';
};

Blockly.Blocks.scribbler_drive = {
    init: function () {
        this.appendDummyInput()
                .appendField("drive")
                .appendField(new Blockly.FieldDropdown([['forward', ''], ['backward', '-']]), 'DRIVE_DIRECTION')
                .appendField("and")
                .appendField(new Blockly.FieldDropdown([['sharply to the left', 'SHARP_LEFT'], ['gently to the left', 'GENTLE_LEFT'], ['slightly to the left', 'SLIGHT_LEFT'], ['straight', 'STRAIGHT'], ['slightly to the right', 'SLIGHT_RIGHT'], ['gently to the right', 'GENTLE_RIGHT'], ['sharply to the right', 'SHARP_RIGHT']]), 'DRIVE_ANGLE')
                .appendField("at")
                .appendField(new Blockly.FieldDropdown([['full', '255'], ['a quick', '191'], ['a gentle', '127'], ['a slow', '63']]), 'DRIVE_SPEED')
                .appendField("speed");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_ACTIONS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_DRIVE_TOOLTIP);
    }
};

Blockly.propc.scribbler_drive = function () {
    var drive_direction = this.getFieldValue('DRIVE_DIRECTION');
    var drive_angle = this.getFieldValue('DRIVE_ANGLE');
    var drive_speed = this.getFieldValue('DRIVE_SPEED');
    return 's3_simpleDrive(S3_' + drive_angle + ', ' + drive_direction + drive_speed + ');\n';
};

Blockly.Blocks.scribbler_spin = {
    init: function () {
        this.appendDummyInput()
                .appendField("rotate")
                .appendField(new Blockly.FieldDropdown([['\u21BB', ''], ['\u21BA', '-']]), 'SPIN_DIRECTION')
                .appendField("for")
                .appendField(new Blockly.FieldAngle(90), "SPIN_ANGLE")
                .appendField("at")
                .appendField(new Blockly.FieldDropdown([['full', '15'], ['a quick', '7'], ['a gentle', '3'], ['a slow', '1']]), 'SPIN_SPEED')
                .appendField("speed");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_ACTIONS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_SPIN_TOOLTIP);
    }
};

Blockly.propc.scribbler_spin = function () {
    var spin_direction = this.getFieldValue('SPIN_DIRECTION');
    var spin_angle = this.getFieldValue('SPIN_ANGLE');
    var spin_speed = this.getFieldValue('SPIN_SPEED');
    return 's3_simpleSpin(' + spin_direction + spin_angle + ', ' + spin_speed + ', 0);\n';
};

Blockly.Blocks.scribbler_stop = {
    init: function () {
        this.appendDummyInput()
                .appendField("stop driving");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SIMPLE_ACTIONS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_STOP_TOOLTIP);
    }
};

Blockly.propc.scribbler_stop = function () {
    return 's3_simpleStop();\n';
};

Blockly.Blocks.scribbler_LED = {
    init: function () {
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("change these LEDs:   ")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "LEFT_LED")
                .appendField("  ")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "CENTER_LED")
                .appendField("  ")
                .appendField(new Blockly.FieldCheckbox("TRUE"), "RIGHT_LED")
                .appendField("  ");
        var left_led_colors = new Blockly.FieldColour("#000000");
        var center_led_colors = new Blockly.FieldColour("#000000");
        var right_led_colors = new Blockly.FieldColour("#000000");
        left_led_colors.setColours(['#FF0000', '#00FF00', '#FF7F00', '#000000']).setColumns(2);
        center_led_colors.setColours(['#FF0000', '#00FF00', '#FF7F00', '#000000']).setColumns(2);
        right_led_colors.setColours(['#FF0000', '#00FF00', '#FF7F00', '#000000']).setColumns(2);
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("to these colors:  ")
                .appendField(left_led_colors, "LEFT_COLOR")
                .appendField(center_led_colors, "CENTER_COLOR")
                .appendField(right_led_colors, "RIGHT_COLOR")
                .appendField(" ");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_LEDS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_LED_TOOLTIP);
    }
};

Blockly.propc.scribbler_LED = function () {
    var left_color = this.getFieldValue('LEFT_COLOR');
    var center_color = this.getFieldValue('CENTER_COLOR');
    var right_color = this.getFieldValue('RIGHT_COLOR');
    var code = '';

    if (this.getFieldValue('LEFT_LED') === 'TRUE') {
        code += 's3_setLED(S3_LEFT, S3_COLOR_' + left_color.substr(1, 6).toUpperCase() + ');\n';
    }
    if (this.getFieldValue('CENTER_LED') === 'TRUE') {
        code += 's3_setLED(S3_CENTER, S3_COLOR_' + center_color.substr(1, 6).toUpperCase() + ');\n';
    }
    if (this.getFieldValue('RIGHT_LED') === 'TRUE') {
        code += 's3_setLED(S3_RIGHT, S3_COLOR_' + right_color.substr(1, 6).toUpperCase() + ');\n';
    }

    return code;
};

Blockly.Blocks.scribbler_play = {
    init: function () {
        this.appendDummyInput()
                .appendField("play a")
                .appendField(new Blockly.FieldDropdown([['soprano', '4'], ['tenor', '8'], ['middle', '16'], ['low', '32'], ['deep', '64']]), 'NOTE_OCTAVE')
                .appendField(new Blockly.FieldDropdown([['A\u266D', '3322'], ['A', '3520'], ['A\u266F/B\u266D', '3729'], ['B', '3951'], ['C', '4186'], ['C\u266F/D\u266D', '4435'], ['D', '4699'], ['D\u266F/E\u266D', '4978'], ['E', '5274'], ['F', '5588'], ['F\u266F/G\u266D', '5920'], ['G', '6272'], ['G\u266F', '6645']]), 'NOTE_FREQUENCY')
                .appendField("for a")
                .appendField(new Blockly.FieldDropdown([['sixteenth', '63'], ['dotted sixteenth', '94'], ['eighth', '125'], ['dotted eighth', '188'], ['quarter', '250'], ['dotted quarter', '375'], ['half', '500'], ['dotted half', '750'], ['whole', '1000'], ['dotted whole', '1500']]), 'NOTE_DURATION')
                .appendField("note at a")
                .appendField(new Blockly.FieldDropdown([['loud', '50'], ['medium', '30'], ['quiet', '15']]), 'NOTE_VOLUME')
                .appendField("volume");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SOUND_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_PLAY_TOOLTIP);
    }
};


Blockly.propc.scribbler_play = function () {
    var note_octave = this.getFieldValue('NOTE_OCTAVE');
    var note_frequency = this.getFieldValue('NOTE_FREQUENCY');
    var note_duration = this.getFieldValue('NOTE_DURATION');
    var note_volume = this.getFieldValue('NOTE_VOLUME');

    return 's3_simplePlay((' + note_frequency + ' / ' + note_octave + '), ' + note_duration + ', ' + note_volume + ');\n';
};

// Move the motors for 0 to ? ms, or indefinately
Blockly.Blocks.move_motors = {
    init: function () {
        this.appendDummyInput()
                .appendField("drive at speeds of (%)");
        this.appendValueInput("LEFT_MOTOR_SPEED")
                .appendField('R,-100,100,0', 'RANGEVALS0')
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("left motor");
        this.appendValueInput("RIGHT_MOTOR_SPEED")
                .appendField('R,-100,100,0', 'RANGEVALS1')
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("right motor");
        this.appendValueInput("MOTOR_DURATION")
                .appendField('R,0,15000,0', 'RANGEVALS2')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("for (milliseconds, 0 is continuous)", "OPS");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.getField('RANGEVALS2').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_TOOLTIP);
    }
};

Blockly.propc.move_motors = function () {
    var left_speed = Blockly.propc.valueToCode(this, 'LEFT_MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    var right_speed = Blockly.propc.valueToCode(this, 'RIGHT_MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    var movement_time = Blockly.propc.valueToCode(this, 'MOTOR_DURATION', Blockly.propc.ORDER_ATOMIC) || '0';
    return 's3_motorSet(' + left_speed + ', ' + right_speed + ', ' + movement_time + ');\n';
};

// Move the motors...
Blockly.Blocks.move_motors_distance = {
    init: function () {
        this.appendDummyInput()
                .appendField("drive distances in ")
                .appendField(new Blockly.FieldDropdown([
                    ['inches', ' * 100000 / 1933'],
                    ['tenths of an inch', ' * 10000 / 1933'],
                    ['centimeters', ' * 10000 / 491'],
                    ['millimeters', ' * 1000 / 491'],
                    ['encoder counts', '']
                ], function (unit) {
                    this.sourceBlock_.newUnit(unit);
                }), 'MULTIPLIER');
        this.appendValueInput("LEFT_MOTOR_DISTANCE")
                .appendField('R,-633,633,0', 'RANGEVALS0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("left motor distance");
        this.appendValueInput("RIGHT_MOTOR_DISTANCE")
                .appendField('R,-633,633,0', 'RANGEVALS1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("right motor distance");
        this.appendValueInput("MOTOR_SPEED")
                .appendField('R,-100,100,0', 'RANGEVALS2')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("at speed (%)");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.getField('RANGEVALS2').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_DISTANCE_TOOLTIP);
        this.newUnit(this.getFieldValue('MULTIPLIER'));
    },
    newUnit: function (unit) {
        var connectionRight_ = this.getInput('RIGHT_MOTOR_DISTANCE').connection;
        var connectionLeft_ = this.getInput('LEFT_MOTOR_DISTANCE').connection;
        var blockLeft_ = connectionLeft_.targetBlock();
        var blockRight_ = connectionRight_.targetBlock();
        var rangeText = 'R,-633,633,0';

        if (unit === ' * 10000 / 1933') {
            rangeText = 'R,-6333,6333,0';
        } else if (unit === ' * 10000 / 491') {
            rangeText = 'R,-1608,1608,0';
        } else if (unit === ' * 1000 / 491') {
            rangeText = 'R,-16088,16088,0';
        } else if (unit === '') {
            rangeText = 'R,-32767,32767,0';
        }

        this.setFieldValue(rangeText, 'RANGEVALS0');
        this.setFieldValue(rangeText, 'RANGEVALS1');

        if (blockLeft_)
            if (blockLeft_.onchange)
                blockLeft_.onchange.call(blockLeft_);
        if (blockRight_)
            if (blockRight_.onchange)
                blockRight_.onchange.call(blockRight_);
    }
};

Blockly.propc.move_motors_distance = function () {
    var distance_multiplier = this.getFieldValue('MULTIPLIER');
    var left_distance = Blockly.propc.valueToCode(this, 'LEFT_MOTOR_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var right_distance = Blockly.propc.valueToCode(this, 'RIGHT_MOTOR_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var top_speed = Blockly.propc.valueToCode(this, 'MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    return 's3_motorSetDistance(' + left_distance + distance_multiplier + ', ' + right_distance + distance_multiplier + ', ' + top_speed + ');\n';
};

Blockly.Blocks.move_motors_xy = {
    init: function () {
        this.appendDummyInput()
                .appendField("drive to a location");
        this.appendValueInput("X_DISTANCE")
                .appendField('R,-20755429,20755429,0', 'RANGEVALS0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("change (+/\u2212) in X");
        this.appendValueInput("Y_DISTANCE")
                .appendField('R,-20755429,20755429,0', 'RANGEVALS1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("change (+/\u2212) in Y");
        this.appendValueInput("MOTOR_SPEED")
                .appendField('R,-100,100,0', 'RANGEVALS2')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("at speed (%)");
        this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("in")
                .appendField(new Blockly.FieldDropdown([
                    ['inches', ' * 100000 / 1933'],
                    ['tenths of an inch', ' * 10000 / 1933'],
                    ['centimeters', ' * 10000 / 491'],
                    ['millimeters', ' * 1000 / 491'],
                    ['encoder counts', '']
                ], function (unit) {
                    this.sourceBlock_.newUnit(unit);
                }), 'MULTIPLIER');
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.getField('RANGEVALS2').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_XY_TOOLTIP);
    },
    newUnit: function (unit) {
        var connectionRight_ = this.getInput('X_DISTANCE').connection;
        var connectionLeft_ = this.getInput('Y_DISTANCE').connection;
        var blockLeft_ = connectionLeft_.targetBlock();
        var blockRight_ = connectionRight_.targetBlock();
        var rangeText = 'R,-633,633,0';

        if (unit === ' * 10000 / 1933') {
            rangeText = 'R,-6334,6334,0';
        } else if (unit === ' * 10000 / 491') {
            rangeText = 'R,-1608,1608,0';
        } else if (unit === ' * 1000 / 491') {
            rangeText = 'R,-16089,16089,0';
        } else if (unit === '') {
            rangeText = 'R,-32768,32767,0';
        }

        this.setFieldValue(rangeText, 'RANGEVALS0');
        this.setFieldValue(rangeText, 'RANGEVALS1');

        if (blockLeft_)
            if (blockLeft_.onchange)
                blockLeft_.onchange.call(blockLeft_);
        if (blockRight_)
            if (blockRight_.onchange)
                blockRight_.onchange.call(blockRight_);
    }
};

Blockly.propc.move_motors_xy = function () {
    var distance_multiplier = this.getFieldValue('MULTIPLIER');
    var x_distance = Blockly.propc.valueToCode(this, 'X_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var y_distance = Blockly.propc.valueToCode(this, 'Y_DISTANCE', Blockly.propc.ORDER_ATOMIC) || '0';
    var top_speed = Blockly.propc.valueToCode(this, 'MOTOR_SPEED', Blockly.propc.ORDER_ATOMIC) || '0';
    return 's3_motorGotoXY(' + x_distance + distance_multiplier + ', ' + y_distance + distance_multiplier + ', ' + top_speed + ');\n';
};

// Move the motors...
Blockly.Blocks.move_motors_angle = {
    init: function () {
        this.appendDummyInput()
                .appendField("drive a turn");
        this.appendValueInput("ROTATE_ANGLE")
                .appendField('R,-1080,1080,0', 'RANGEVALS0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("that is (+/\u2212 degrees)");
        this.appendValueInput("ROTATE_RADIUS")
                .appendField('R,-85,85,0', 'RANGEVALS1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("around a radius in (+/\u2212)")
                .appendField(new Blockly.FieldDropdown([
                    ['inches of', ' * 100000 / 1933'],
                    ['tenths of an inch of', ' * 10000 / 1933'],
                    ['centimeters of', ' * 10000 / 491'],
                    ['millimeters of', ' * 1000 / 491'],
                    ['encoder counts of', '']
                ], function (unit) {
                    this.sourceBlock_.newUnit(unit);
                }), 'RADIUS_MULTIPLIER');
        this.appendValueInput("ROTATE_SPEED")
                .appendField('R,-100,100,0', 'RANGEVALS2')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("at speed (%)");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.getField('RANGEVALS2').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_MOTORS_HELPURL);
        this.setTooltip(Blockly.MSG_S3_MOVE_MOTORS_ANGLE_TOOLTIP);
    },
    newUnit: function (unit) {
        var thisConnection_ = this.getInput('ROTATE_RADIUS').connection;
        var thisBlock_ = thisConnection_.targetBlock();
        var rangeText = 'R,-85,85,0';

        if (unit === ' * 10000 / 1933') {
            rangeText = 'R,-850,850,0';
        } else if (unit === ' * 10000 / 491') {
            rangeText = 'R,-216,216,0';
        } else if (unit === ' * 1000 / 491') {
            rangeText = 'R,-2160,2160,0';
        } else if (unit === '') {
            rangeText = 'R,-4400,4400,0';
        }

        this.setFieldValue(rangeText, 'RANGEVALS1');

        if (thisBlock_)
            if (thisBlock_.onchange)
                thisBlock_.onchange.call(thisBlock_);
    }
};

Blockly.propc.move_motors_angle = function () {
    var radius_multiplier = this.getFieldValue('RADIUS_MULTIPLIER');
    var angle = Blockly.propc.valueToCode(this, 'ROTATE_ANGLE', Blockly.propc.ORDER_ATOMIC);
    var radius = Blockly.propc.valueToCode(this, 'ROTATE_RADIUS', Blockly.propc.ORDER_ATOMIC);
    var rotate_speed = Blockly.propc.valueToCode(this, 'ROTATE_SPEED', Blockly.propc.ORDER_ATOMIC);
    return 's3_motorSetRotate(' + angle + ', ' + radius + radius_multiplier + ', ' + rotate_speed + ');\n';
};

Blockly.Blocks.play_polyphony = {
    init: function () {
        this.appendDummyInput()
                .appendField("play tones");
        this.appendValueInput("FREQUENCY_1")
                .appendField('R,0,2000,0', 'RANGEVALS0')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("tone 1 (Hz)");
        this.appendValueInput("FREQUENCY_2")
                .appendField('R,0,2000,0', 'RANGEVALS1')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("tone 2 (Hz)");
        this.appendValueInput("POLYPHONY_DURATION")
                .appendField('R,0,15000,0', 'RANGEVALS2')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("for (milliseconds)");
        this.appendValueInput("POLYPHONY_VOLUME")
                .appendField('R,0,100,0', 'RANGEVALS3')
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("at volume (%)");
        this.getField('RANGEVALS0').setVisible(false);
        this.getField('RANGEVALS1').setVisible(false);
        this.getField('RANGEVALS2').setVisible(false);
        this.getField('RANGEVALS3').setVisible(false);
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_SOUND_HELPURL);
        this.setTooltip(Blockly.MSG_S3_PLAY_POLYPHONY_TOOLTIP);
    }
};

Blockly.propc.play_polyphony = function () {
    var fq1 = Blockly.propc.valueToCode(this, 'FREQUENCY_1', Blockly.propc.ORDER_ATOMIC) || '522';
    var fq2 = Blockly.propc.valueToCode(this, 'FREQUENCY_2', Blockly.propc.ORDER_ATOMIC) || '784';
    var dur = Blockly.propc.valueToCode(this, 'POLYPHONY_DURATION', Blockly.propc.ORDER_ATOMIC) || '250';
    var vol = Blockly.propc.valueToCode(this, 'POLYPHONY_VOLUME', Blockly.propc.ORDER_ATOMIC) || '50';

    return 's3_setVolume((' + vol + ' / 2));\ns3_playNote(' + fq1 + ', ' + fq2 + ', ' + dur + ');\n';
};

Blockly.Blocks.line_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("line sensor")
                .appendField(new Blockly.FieldDropdown([
                    ["left reflectivity", "LEFT"],
                    ["right reflectivity", "RIGHT"]
                ]), "LINE_SENSOR_CHOICE");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_LINE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_LINE_SENSOR_TOOLTIP);
    }
};

Blockly.propc.line_sensor = function () {
    var dir = this.getFieldValue("LINE_SENSOR_CHOICE");
    return ['s3_lineSensor(S3_' + dir + ')', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.obstacle_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("obstacle detected")
                .appendField(new Blockly.FieldDropdown([
                    ["on the left", "LEFT"],
                    ["on the right", "RIGHT"],
                    ["in front", "&&"],
                    ["by either sensor", "||"]
                ]), "OBSTACLE_SENSOR_CHOICE");

        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_OBSTACLE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_OBSTACLE_SENSOR_TOOLTIP);
    }
};

Blockly.propc.obstacle_sensor = function () {
    var dir = this.getFieldValue("OBSTACLE_SENSOR_CHOICE");
    if (dir === 'LEFT' || dir === 'RIGHT')
        return ['s3_readObstacle(S3_' + dir + ')', Blockly.propc.ORDER_ATOMIC];
    else
        return ['(s3_readObstacle(S3_LEFT) ' + dir + ' s3_readObstacle(S3_RIGHT))', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.stall_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("stall sensor")
                .appendField(new Blockly.FieldDropdown([
                    ["tail wheel is not spinning", "!s3_tailWheelMoving()"],
                    ["tail wheel is spinning", "s3_tailWheelMoving()"],
                    ["drive wheels are stopped", "!s3_motorsMoving()"],
                    ["drive wheels are turning", "s3_motorsMoving()"],
                    ["Scribbler is stuck", "s3_simpleStalled(S3_IS)"],
                    ["Scribbler is not stuck", "s3_simpleStalled(S3_IS_NOT)"]
                ]), "STALL_SENSOR_CHOICE");
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_STALL_HELPURL);
        this.setTooltip(Blockly.MSG_S3_STALL_SENSOR_TOOLTIP);
    }
};

Blockly.propc.stall_sensor = function () {
    var choice = this.getFieldValue('STALL_SENSOR_CHOICE');
    return [choice, Blockly.propc.ORDER_ATOMIC];
};

//Unused? - Possibly delete:
Blockly.Blocks.button_pressed = {
    init: function () {
        this.appendDummyInput("")
                .appendField("the red botton is currently pressed");
        this.appendDummyInput("")
                .appendField("(true or false)");

        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
    }
};

Blockly.Blocks.spinning_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("drive wheels stalled");
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_STALL_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SPINNING_SENSOR_TOOLTIP);
    }
};

Blockly.propc.spinning_sensor = function () {
    var dir = this.getFieldValue("LGHT_SENSOR_CHOICE");
    return ['!s3_motorsMoving()', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.light_sensor = {
    init: function () {
        this.appendDummyInput("")
                .appendField("light sensor")
                .appendField(new Blockly.FieldDropdown([
                    ["left reading", "LEFT"],
                    ["center reading", "CENTER"],
                    ["right reading", "RIGHT"]
                ]), "LGHT_SENSOR_CHOICE");
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_LIGHT_HELPURL);
        this.setTooltip(Blockly.MSG_S3_LIGHT_SENSOR_TOOLTIP);
    }
};

Blockly.propc.light_sensor = function () {
    var dir = this.getFieldValue("LGHT_SENSOR_CHOICE");
    return ['s3_lightSensor(S3_' + dir + ')', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.reset_button_presses = {
    init: function () {
        this.appendDummyInput("")
                .appendField("reset button presses on last reset");
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_RESET_BUTTON_HELPURL);
        this.setTooltip(Blockly.MSG_S3_RESET_BUTTON_PRESSES_TOOLTIP);
    }
};

Blockly.propc.reset_button_presses = function () {
    return ['s3_resetButtonCount()', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_stop_servo = {
    init: function () {
        if (profile.default.description === "Scribbler Robot") {
            this.setHelpUrl(Blockly.MSG_S3_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('robot'));
            this.pinSet = profile.default.digital;
        } else {
            this.setHelpUrl(Blockly.MSG_SERVO_HELPURL);
            this.setColour(colorPalette.getColor('output'));
            this.pinSet = profile.default.digital.concat([['other', 'other']]);
        }
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_STOP_SERVO_TOOLTIP);
        this.addPinMenu("servo PIN", 'VALUE');
        this.appendDummyInput("VALUE")
                .appendField("disable");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
    },
    addPinMenu: function (label, moveBefore) {
        this.appendDummyInput('SET_PIN')
                .appendField(label, 'LABEL')
                .appendField(new Blockly.FieldDropdown(this.pinSet, function (op) {
                    this.sourceBlock_.setToOther(op, moveBefore);
                }), "SERVO_PIN");
        this.moveBefore = moveBefore;
        this.otherPin = false;
    },
    setToOther: function (op, moveBefore) {
        if (op === 'other') {
            this.otherPin = true;
            var label = this.getFieldValue('LABEL');
            this.removeInput('SET_PIN');
            this.appendValueInput('SERVO_PIN')
                    .appendField(label)
                    .setCheck('Number')
                    .appendField('A,' + profile.default.digital.toString(), 'RANGEVALS0');
            this.getField('RANGEVALS0').setVisible(false);
            if (moveBefore) {
                this.moveInputBefore('SERVO_PIN', moveBefore);
            }
        }
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('otherpin', this.otherPin);
        return container;
    },
    domToMutation: function (xmlElement) {
        var op = xmlElement.getAttribute('otherpin');
        if (op === 'true') {
            this.setToOther('other', this.moveBefore);
        }
    }    
};

Blockly.propc.scribbler_stop_servo = function () {
    var pin = '0';
    if (this.otherPin) {
        pin = Blockly.propc.valueToCode(this, 'SERVO_PIN', Blockly.propc.ORDER_ATOMIC) || '0';
    } else {
        pin = this.getFieldValue("SERVO_PIN");
    }
    var addType = '';
    var blocks = Blockly.getMainWorkspace().getAllBlocks();

    // Iterate through every block - determine if we are trying to disable a feedback 360 servo or a CR/standard servo
    for (var x = 0; x < blocks.length; x++) {
        var blockName = blocks[x].type;
        if (blockName === 'fb360_init' && (blocks[x].getFieldValue('PIN') === pin || blocks[x].getFieldValue('FB') === pin)) {
            addType = '360';
        }
    }
    
    if (addType === '') {
        Blockly.propc.definitions_["include servo"] = '#include "servo.h"';
        return 'servo_disable(' + pin + ');\n';
    } else {
        return 'servo360_enable(' + pin + ', 0);\n';
    }
};

// Unused?  Possibly delete?
Blockly.Blocks.scribbler_ping = {
    init: function () {
        this.appendDummyInput("")
                .appendField("Ping))) sensor on")
                .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendField("distance in")
                .appendField(new Blockly.FieldDropdown([['inches', '_inches'], ['centimeters', '_cm']]), "SCALE");

        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('input'));
        this.setHelpUrl(Blockly.MSG_S3_PING_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_PING_TOOLTIP);
    }
};

Blockly.propc.scribbler_ping = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var unit = this.getFieldValue('SCALE');

    Blockly.propc.definitions_["include ping"] = '#include "ping.h"';

    var code = 'ping' + unit + '(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.analog_input = {
    init: function () {
        this.appendDummyInput("")
                .appendField("check analog PIN")
                .appendField(new Blockly.FieldDropdown(profile.default.analog), "ANALOG_PIN");
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('io'));
        this.setHelpUrl(Blockly.MSG_S3_IO_HELPURL);
        this.setTooltip(Blockly.MSG_S3_ANALOG_INPUT_TOOLTIP);
    }
};

Blockly.propc.analog_input = function () {
    var pin = this.getFieldValue('ANALOG_PIN') || "0";
    return ['s3_readADC(S3_ADC_A' + pin + ')', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_boolean = {
    init: function () {
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([['true', '1'], ['false', '0']]), 'BOOL');
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('math'));
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_BOOLEAN_TOOLTIP);
    }
};

Blockly.propc.scribbler_boolean = function () {
    return [this.getFieldValue('BOOL'), Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_random_boolean = {
    init: function () {
        this.appendDummyInput("")
                .appendField("random true/false");
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('math'));
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_RANDOM_BOOLEAN_TOOLTIP);
    }
};

Blockly.propc.scribbler_random_boolean = function () {
    Blockly.propc.setups_["random_seed"] = "srand(INA + CNT);\n";
    return ['(rand() % 2)', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_random_number = {
    init: function () {
        this.appendValueInput("A")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("random number from");
        this.appendValueInput("B")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("to");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(colorPalette.getColor('math'));
        this.setHelpUrl(Blockly.MSG_S3_MATH_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_RANDOM_NUMBER_TOOLTIP);
    }
};

Blockly.Blocks.factory_reset = {
    init: function () {
        this.appendDummyInput()
                .appendField("restore s3 demo");
        this.setColour(colorPalette.getColor('programming'));
        this.setHelpUrl(Blockly.MSG_S3_FACTORY_RESET_HELPURL);
        this.setTooltip(Blockly.MSG_S3_FACTORY_RESET_TOOLTIP);
    }
};

Blockly.propc.factory_reset = function () {
    Blockly.propc.definitions_["s3_factory_reset"] = '#pragma load_default_scribbler_binary';
    return '';
};

Blockly.Blocks.scribbler_serial_send_text = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([['Terminal', 'T'], ['WX module', 'W'], ['XBee', 'X']]), 'OUTPUT')
                .appendField("send text")
                .appendField("\u201C")
                .appendField(new Blockly.FieldTextInput(""), "MESSAGE_TEXT")
                .appendField("\u201D");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_TEXT_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_text = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var message = this.getFieldValue('MESSAGE_TEXT').replace(/"/g, '\\"').replace(/%/g, "%%");

    return 'print("' + message + '");\n';
};

Blockly.Blocks.scribbler_serial_send_char = {
    init: function () {
        this.appendValueInput("CHAR_VALUE")
                .appendField(new Blockly.FieldDropdown([['Terminal', 'T'], ['WX module', 'W'], ['XBee', 'X']]), 'OUTPUT')
                .appendField("send character")
                .setCheck("Number");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_CHAR_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_char = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var message = Blockly.propc.valueToCode(this, 'CHAR_VALUE', Blockly.propc.ORDER_ATOMIC);

    return 'print("%c", ' + message + ');\n';
};

Blockly.Blocks.scribbler_serial_send_decimal = {
    init: function () {
        this.appendValueInput("DECIMAL_VALUE")
                .setCheck("Number")
                .appendField(new Blockly.FieldDropdown([['Terminal', 'T'], ['WX module', 'W'], ['XBee', 'X']]), 'OUTPUT')
                .appendField("send number");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_DECIMAL_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_decimal = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var message = Blockly.propc.valueToCode(this, 'DECIMAL_VALUE', Blockly.propc.ORDER_ATOMIC) || 0;

    return 'print("%d", ' + message + ');\n';
};

Blockly.Blocks.scribbler_serial_send_ctrl = {
    init: function () {
        this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([['Terminal', 'T'], ['WX module', 'W'], ['XBee', 'X']]), 'OUTPUT')
                .appendField("send command")
                .appendField(new Blockly.FieldDropdown([["carriage return", "13"], ["new line", "10"], ["backspace", "127"], ["clear screen", "256"]]), "SERIAL_CHAR");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setColour(colorPalette.getColor('protocols'));
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SERIAL_SEND_CTRL_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_send_ctrl = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var message = this.getFieldValue('SERIAL_CHAR');
    if (message === '256') {
        return 'term_cmd(CLS);\n';
    } else {
        return 'print("%c", ' + message + ');\n';
    }
};

Blockly.Blocks.scribbler_serial_rx_byte = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendDummyInput("")
                .appendField(new Blockly.FieldDropdown([['Terminal', 'T'], ['WX module', 'W'], ['XBee', 'X']]), 'OUTPUT')
                .appendField("receive character");
        this.setOutput(true, 'Number');
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SERIAL_RX_BYTE_TOOLTIP);
    }
};


Blockly.propc.scribbler_serial_rx_byte = function () {
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    return ['getChar()', Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.scribbler_serial_cursor_xy = {
    init: function () {
        this.setColour(colorPalette.getColor('protocols'));
        this.appendValueInput("Y")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Terminal set cursor position to row");
        this.appendValueInput("X")
                .setCheck("Number")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("column");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setHelpUrl(Blockly.MSG_S3_COMMUNICATE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_SERIAL_CURSOR_XY_TOOLTIP);
    }
};

Blockly.propc.scribbler_serial_cursor_xy = function () {
    Blockly.propc.serial_terminal_ = true;
    Blockly.propc.setups_["s3_serial_baud"] = "simpleterm_reopen(31,30,0,9600);";

    var row = Blockly.propc.valueToCode(this, 'Y', Blockly.propc.ORDER_NONE);
    var column = Blockly.propc.valueToCode(this, 'X', Blockly.propc.ORDER_NONE);

    if (Number(row) < 0) {
        row = 0;
    } else if (Number(row) > 255) {
        row = 255;
    }

    if (Number(column) < 0) {
        column = 0;
    } else if (Number(column) > 255) {
        column = 255;
    }

    return 'term_cmd(CRSRXY, ' + column + ', ' + row + ');\n';
};

Blockly.Blocks.sirc_s3_get = {
    helpUrl: Blockly.MSG_S3_SIRC_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_SIRC_TOOLTIP);
        var addPin = [["Onboard IR sensor", "SCRIBBLER_OBS_RX"]];
        var thePins = addPin.concat(profile.default.digital);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("Sony Remote value")
                .appendField(new Blockly.FieldDropdown(thePins), "PIN");

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.sirc_s3_get = function () {
    var pin = this.getFieldValue('PIN');

    Blockly.propc.definitions_["sirc"] = '#include "sirc.h"';
    Blockly.propc.setups_["sirc"] = "sirc_setTimeout(70);\n";

    var code = 'sirc_button(' + pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.mic_s3_get = {
    helpUrl: Blockly.MSG_S3_MIC_HELPURL,
    init: function () {
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_MIC_TOOLTIP);
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("microphone volume detected");
        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, 'Number');
    }
};

Blockly.propc.mic_s3_get = function () {
    Blockly.propc.setups_[ 's3_mic' ] = 's3_enableMic();';

    var code = 's3_readMic()';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.s3_eeprom_read = {
    helpUrl: Blockly.MSG_S3_MEMORY_HELPURL,
    init: function() {      
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_MEMORY_READ_TOOLTIP);
        this.appendValueInput("ADDR")
            .setCheck('Number')
            .appendField('R,0,7936,0', 'RANGEVALS0')
            .appendField("memory read from address");
        this.getField('RANGEVALS0').setVisible(false);
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(colorPalette.getColor('output'));
  }
};

Blockly.propc.s3_eeprom_read = function () {
    var addr = Blockly.propc.valueToCode(this, 'ADDR', Blockly.propc.ORDER_NONE);
    var code = 's3_memoryRead(' + addr + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.Blocks.s3_eeprom_write = {
    helpUrl: Blockly.MSG_S3_MEMORY_HELPURL,
    init: function() {
        this.setTooltip(Blockly.MSG_S3_SCRIBBLER_MEMORY_WRITE_TOOLTIP);
        this.appendValueInput("VALUE")
            .setCheck('Number')
            .appendField("memory write");
        this.appendValueInput("ADDR")
            .setCheck('Number')
            .appendField('R,0,7936,0', 'RANGEVALS0')
            .appendField("to address");
        this.getField('RANGEVALS0').setVisible(false);
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour(colorPalette.getColor('output'));
  }
};

Blockly.propc.s3_eeprom_write = function () {
    var value = Blockly.propc.valueToCode(this, 'VALUE', Blockly.propc.ORDER_NONE);
    var addr = Blockly.propc.valueToCode(this, 'ADDR', Blockly.propc.ORDER_NONE);
    var code = 's3_memoryWrite(' + addr + ', ' + value + ');\n';
    return code;
};

Blockly.Blocks.calibrate_line_sensor = {
    init: function () {
        this.setColour(colorPalette.getColor('input'));
        this.appendDummyInput()
                .appendField("line sensor calibrate");
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, null);
        this.setHelpUrl(Blockly.MSG_S3_LINE_HELPURL);
        this.setTooltip(Blockly.MSG_S3_LINE_CALIBRATE_TOOLTIP);
    }
};

Blockly.propc.calibrate_line_sensor = function () {
    var func = 'void s3_calibrate_line_sensor(void) {int __lineSenCal[4];\n__lineSenCal[0] = ';
    func += 's3_lineSensor(S3_LEFT);\n__lineSenCal[1] = s3_lineSensor(S3_RIGHT);\n__lineSenCal[2] = ';
    func += 's3_lineSensor(S3_LEFT);\n__lineSenCal[3] = s3_lineSensor(S3_RIGHT);\n';
    func += 'int __calibrate_timer = CNT + (CLKFREQ/1000) * 3672;\ns3_motorSet(75, -75, 0);';
    func += '\nwhile(CNT < __calibrate_timer) {int __tempLineSen = s3_lineSensor(S3_LEFT);\n';
    func += 'if (__tempLineSen < __lineSenCal[0]) __lineSenCal[0] = __tempLineSen;\n';
    func += 'if (__tempLineSen > __lineSenCal[2]) __lineSenCal[2] = __tempLineSen;\n';
    func += '__tempLineSen = s3_lineSensor(S3_RIGHT);\nif (__tempLineSen < __lineSenCal[1]) ';
    func += '__lineSenCal[1] = __tempLineSen;\nif (__tempLineSen > __lineSenCal[3]) ';
    func += '__lineSenCal[3] = __tempLineSen;}s3_motorSet(0, 0, 0);\n';
    func += 'if (__lineSenCal[2] > __lineSenCal[0]) __lineSenCal[0] = __lineSenCal[2];\n';
    func += 'if (__lineSenCal[3] < __lineSenCal[1]) __lineSenCal[1] = __lineSenCal[3];\n';
    func += 'scribbler_set_line_threshold((__lineSenCal[0] + __lineSenCal[1]) / 2);\n';
    func += 'scribbler_write_line_threshold();\n}';

    Blockly.propc.methods_["s3_calibrate_line_sensor"] = func;
    Blockly.propc.method_declarations_["s3_calibrate_line_sensor"] =
            'void s3_calibrate_line_sensor(void);';

    return 's3_calibrate_line_sensor();';
};
