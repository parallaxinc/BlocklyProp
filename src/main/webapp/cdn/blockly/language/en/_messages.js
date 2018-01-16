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
 * @fileoverview English strings.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

// Context menus.
Blockly.MSG_DUPLICATE_BLOCK = 'Duplicate';
Blockly.MSG_REMOVE_COMMENT = 'Remove Comment';
Blockly.MSG_ADD_COMMENT = 'Add Comment';
Blockly.MSG_EXTERNAL_INPUTS = 'External Inputs';
Blockly.MSG_INLINE_INPUTS = 'Inline Inputs';
Blockly.MSG_DELETE_BLOCK = 'Delete Block';
Blockly.MSG_DELETE_X_BLOCKS = 'Delete %1 Blocks';
Blockly.MSG_COLLAPSE_BLOCK = 'Collapse Block';
Blockly.MSG_EXPAND_BLOCK = 'Expand Block';
Blockly.MSG_DISABLE_BLOCK = 'Disable Block';
Blockly.MSG_ENABLE_BLOCK = 'Enable Block';
Blockly.MSG_HELP = 'Help';

// Editor dialogs.
Blockly.Msg.DIALOG_CLEAR_WORKSPACE = 'Clear Workspace';
Blockly.Msg.DIALOG_CLEAR_WORKSPACE_WARNING = 'Are you sure you want to clear your workspace?  This action cannot be undone!';
Blockly.Msg.DIALOG_CHANGED_SINCE = 'The project has been changed since the last save.';
Blockly.Msg.DIALOG_PROJECT_SAVED = 'Project saved';
Blockly.Msg.DIALOG_SAVE_TITLE = 'Save';
Blockly.Msg.DIALOG_SAVE_FIRST = 'Save current project first?';
Blockly.Msg.DIALOG_PROJECT_SAVED_TEXT = 'The project has been saved';
Blockly.Msg.DIALOG_SIDE_FILES = '';
Blockly.Msg.DIALOG_SIDE_FILES_WARNING = '';
Blockly.Msg.DIALOG_NO_CLIENT = '<i class="glyphicon glyphicon-exclamation-sign"></i> BlocklyPropClient <strong>is not running</strong>';
Blockly.Msg.DIALOG_CLIENT_SEARCHING = '<i class="glyphicon glyphicon-info-sign"></i> Looking for BlocklyPropClient';
Blockly.Msg.DIALOG_DOWNLOAD = 'Download Project - Filename:';
Blockly.Msg.DIALOG_UNSAVED_PROJECT = 'Unsaved Project';
Blockly.Msg.DIALOG_SAVE_BEFORE_ADD_BLOCKS = 'You must save your project before you can upload a blocks file to it.';

// Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = 'Change value:';
Blockly.MSG_NEW_VARIABLE = 'New variable...';
Blockly.MSG_NEW_VARIABLE_TITLE = 'New variable name:';
Blockly.MSG_RENAME_VARIABLE = 'Rename variable...';
Blockly.MSG_RENAME_VARIABLE_TITLE = 'Rename all "%1" variables to:';
Blockly.LANG_VARIABLES_SET_ITEM = 'item';
Blockly.LANG_VARIABLES_GET_ITEM = 'item';

// Control Blocks.
Blockly.LANG_CATEGORY_CONTROLS = 'Control';
Blockly.LANG_CONTROLS_IF_MSG_IF = 'if';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF = 'else if';
Blockly.LANG_CONTROLS_IF_MSG_ELSE = 'else';
Blockly.LANG_CONTROLS_IF_MSG_THEN = 'do';

Blockly.LANG_CONTROLS_IF_IF_TITLE_IF = 'if';
Blockly.LANG_CONTROLS_IF_IF_TOOLTIP = 'Add, remove, or reorder sections\nto reconfigure this if block.';
Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF = 'else if';
Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP = 'Add a condition to the if block.';

Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE = 'else';
Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP = 'Add a final, catch-all condition to the if block.';

Blockly.LANG_CONTROLS_REPEAT_TITLE_REPEAT = 'repeat';
Blockly.LANG_CONTROLS_REPEAT_TITLE_TIMES = 'times';
Blockly.LANG_CONTROLS_REPEAT_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP = 'of loop';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = 'break out';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = 'continue with next iteration';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING = 'Warning:\nThis block may only\nbe used within a loop.';

// Logic Blocks.
Blockly.LANG_CATEGORY_LOGIC = 'Logic';
Blockly.LANG_LOGIC_OPERATION_AND = 'and';
Blockly.LANG_LOGIC_OPERATION_OR = 'or';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = 'not';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = 'true';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = 'false';
Blockly.LANG_LOGIC_NULL = 'null';

// Math Blocks.
Blockly.LANG_CATEGORY_MATH = 'Math';

// Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = 'method';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = 'do';
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_DEFRETURN_DO = Blockly.LANG_PROCEDURES_DEFNORETURN_DO;
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = 'return';
Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING = 'Warning:\nThis method has\nduplicate parameters.';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = 'do';
Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE = 'method';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = Blockly.LANG_PROCEDURES_CALLNORETURN_CALL;
Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE = 'parameters';
Blockly.LANG_PROCEDURES_MUTATORARG_TITLE = 'variable:';
Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF = 'Highlight Procedure';
Blockly.LANG_PROCEDURES_IFRETURN_WARNING = 'Warning:\nThis block may only be\nused within a method.';

Blockly.Msg.ADD_COMMENT = "Add Comment";
Blockly.Msg.AUTH = "Please authorize this app to enable your work to be saved and to allow it to be shared by you.";
Blockly.Msg.CHANGE_VALUE_TITLE = "Change value:";
Blockly.Msg.CHAT = "Chat with your collaborator by typing in this box!";
Blockly.Msg.CLEAN_UP = "Clean up Blocks";
Blockly.Msg.COLLAPSE_ALL = "Collapse Blocks";
Blockly.Msg.COLLAPSE_BLOCK = "Collapse Block";

Blockly.Msg.DELETE_ALL_BLOCKS = "Delete all %1 blocks?";
Blockly.Msg.DELETE_BLOCK = "Delete Block";
Blockly.Msg.DELETE_X_BLOCKS = "Delete %1 Blocks";
Blockly.Msg.DISABLE_BLOCK = "Disable Block";
Blockly.Msg.DUPLICATE_BLOCK = "Duplicate";
Blockly.Msg.ENABLE_BLOCK = "Enable Block";
Blockly.Msg.EXPAND_ALL = "Expand Blocks";
Blockly.Msg.EXPAND_BLOCK = "Expand Block";
Blockly.Msg.EXTERNAL_INPUTS = "External Inputs";
Blockly.Msg.HELP = "Help";
Blockly.Msg.INLINE_INPUTS = "Inline Inputs";

Blockly.Msg.LOGIC_BOOLEAN_FALSE = Blockly.LANG_LOGIC_BOOLEAN_FALSE;
Blockly.Msg.LOGIC_BOOLEAN_TRUE = Blockly.LANG_LOGIC_BOOLEAN_TRUE;
Blockly.Msg.LOGIC_NEGATE_TITLE = "not %1";
Blockly.Msg.LOGIC_NULL = Blockly.LANG_LOGIC_NULL;
Blockly.Msg.LOGIC_OPERATION_AND = Blockly.LANG_LOGIC_OPERATION_AND;
Blockly.Msg.LOGIC_OPERATION_OR = Blockly.LANG_LOGIC_OPERATION_OR;
Blockly.Msg.LOGIC_TERNARY_CONDITION = "test";
Blockly.Msg.LOGIC_TERNARY_IF_FALSE = "if false";
Blockly.Msg.LOGIC_TERNARY_IF_TRUE = "if true";
Blockly.Msg.MATH_CHANGE_TITLE = "change %1 by %2";
Blockly.Msg.MATH_CONSTRAIN_TITLE = "constrain %1 low %2 high %3";
Blockly.Msg.MATH_ADDITION_SYMBOL = "+";
Blockly.Msg.MATH_DIVISION_SYMBOL = "÷";
Blockly.Msg.MATH_MULTIPLICATION_SYMBOL = "×";
Blockly.Msg.MATH_SUBTRACTION_SYMBOL = "-";

Blockly.Msg.ME = "Me";
Blockly.Msg.NEW_VARIABLE = "New variable...";
Blockly.Msg.NEW_VARIABLE_TITLE = "New variable name:";
Blockly.Msg.ORDINAL_NUMBER_SUFFIX = "";
Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS = "allow statements";
Blockly.Msg.PROCEDURES_BEFORE_PARAMS = "with:";
Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS = "with:";
Blockly.Msg.PROCEDURES_CREATE_DO = "Create '%1'";
Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT = "Describe this function...";
Blockly.Msg.PROCEDURES_DEFNORETURN_DO = "";
Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE = "my function";
Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = "function";
Blockly.Msg.PROCEDURES_DEFRETURN_RETURN = "return";
Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP = "Creates a function with an output.";
Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING = "Warning: This function has duplicate parameters.";
Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF = "Highlight function definition";
Blockly.Msg.PROCEDURES_IFRETURN_WARNING = "Warning: This block may be used only within a function definition.";
Blockly.Msg.PROCEDURES_MUTATORARG_TITLE = "input name:";
Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE = "inputs";
Blockly.Msg.REDO = "Redo";
Blockly.Msg.REMOVE_COMMENT = "Remove Comment";
Blockly.Msg.RENAME_VARIABLE = "Rename variable...";
Blockly.Msg.RENAME_VARIABLE_TITLE = "Rename all '%1' variables to:";

Blockly.Msg.TODAY = "Today";
Blockly.Msg.UNDO = "Undo";
Blockly.Msg.VARIABLES_DEFAULT_NAME = "item";
Blockly.Msg.VARIABLES_GET_CREATE_SET = "Create 'set %1'";
Blockly.Msg.VARIABLES_SET = "set %1 to %2";
Blockly.Msg.VARIABLES_SET_CREATE_GET = "Create 'get %1'";
Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE;
Blockly.Msg.CONTROLS_IF_IF_TITLE_IF = Blockly.Msg.CONTROLS_IF_MSG_IF;
Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.CONTROLS_IF_MSG_THEN = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE = Blockly.Msg.CONTROLS_IF_MSG_ELSE;
Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE = Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.Msg.MATH_CHANGE_TITLE_ITEM = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.PROCEDURES_DEFRETURN_DO = Blockly.Msg.PROCEDURES_DEFNORETURN_DO;
Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF = Blockly.Msg.CONTROLS_IF_MSG_ELSEIF;
Blockly.Msg.CONTROLS_FOREACH_INPUT_DO = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.CONTROLS_FOR_INPUT_DO = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.TEXT_APPEND_VARIABLE = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT = Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT;


//--------------ActivityBoard Help URLs -----------------------
Blockly.MSG_CONTROL_HELPURL = "http://learn.parallax.com/ab-blocks/control";
Blockly.MSG_NUMBERS_HELPURL = "http://learn.parallax.com/ab-blocks/numbers";
Blockly.MSG_STRINGS_HELPURL = "http://learn.parallax.com/ab-blocks/strings";
Blockly.MSG_ARRAYS_HELPURL = "http://learn.parallax.com/ab-blocks/arrays";
Blockly.MSG_VALUES_HELPURL = "http://learn.parallax.com/ab-blocks/values";
Blockly.MSG_VARIABLES_HELPURL = "http://learn.parallax.com/ab-blocks/variables";
Blockly.MSG_FUNCTIONS_HELPURL = "http://learn.parallax.com/ab-blocks/functions";
Blockly.MSG_PINS_HELPURL = "http://learn.parallax.com/ab-blocks/pins";
Blockly.MSG_SERIAL_LCD_HELPURL = "http://learn.parallax.com/ab-blocks/serial-lcd";
Blockly.MSG_OLED_HELPURL = "http://learn.parallax.com/ab-blocks/oled";
Blockly.MSG_TERMINAL_HELPURL = "http://learn.parallax.com/ab-blocks/terminal";
Blockly.MSG_PROTOCOLS_HELPURL = "http://learn.parallax.com/ab-blocks/protocols";
Blockly.MSG_SWX_HELPURL = "http://learn.parallax.com/ab-blocks/simple-wx";
Blockly.MSG_AWX_HELPURL = "http://learn.parallax.com/ab-blocks/advanced-wx";
Blockly.MSG_XBEE_HELPURL = "http://learn.parallax.com/ab-blocks/xbee";
Blockly.MSG_KEYPAD_HELPURL = "http://learn.parallax.com/ab-blocks/keypad";
Blockly.MSG_FPS_HELPURL = "http://learn.parallax.com/ab-blocks/fingerprint";
Blockly.MSG_COMPASS_HELPURL = "http://learn.parallax.com/ab-blocks/compass";
Blockly.MSG_GPS_HELPURL = "http://learn.parallax.com/ab-blocks/gps";
Blockly.MSG_JOYSTICK_HELPURL = "http://learn.parallax.com/ab-blocks/joystick";
Blockly.MSG_MEMSIC_HELPURL = "http://learn.parallax.com/ab-blocks/memsic";
Blockly.MSG_ACCELEROMETER_HELPURL = "http://learn.parallax.com/ab-blocks/accelerometer";
Blockly.MSG_PING_HELPURL = "http://learn.parallax.com/ab-blocks/ping";
Blockly.MSG_PIR_HELPURL = "http://learn.parallax.com/ab-blocks/pir";
Blockly.MSG_RFID_HELPURL = "http://learn.parallax.com/ab-blocks/rfid";
Blockly.MSG_SONY_REMOTE_HELPURL = "http://learn.parallax.com/ab-blocks/sony-remote";
Blockly.MSG_SOUND_IMPACT_HELPURL = "http://learn.parallax.com/ab-blocks/sound-impact";
Blockly.MSG_TEMPERATURE_HELPURL = "http://learn.parallax.com/ab-blocks/temp-humidity";
Blockly.MSG_COLORPAL_HELPURL = "http://learn.parallax.com/ab-blocks/colorpal";
Blockly.MSG_EEPROM_HELPURL = "http://learn.parallax.com/ab-blocks/memory";
Blockly.MSG_SD_HELPURL = "http://learn.parallax.com/ab-blocks/memory";
Blockly.MSG_ANALOG_PULSES_HELPURL = "http://learn.parallax.com/ab-blocks/analog-pins";
Blockly.MSG_ANALOG_PWM_HELPURL = "http://learn.parallax.com/ab-blocks/pwm";
Blockly.MSG_ANALOG_PULSE_IN_OUT_HELPURL = "http://learn.parallax.com/ab-blocks/pulsein-out";
Blockly.MSG_ANALOG_RC_TIME_HELPURL = "http://learn.parallax.com/ab-blocks/rc-time";
Blockly.MSG_AUDIO_HELPURL = "http://learn.parallax.com/ab-blocks/audio";
Blockly.MSG_SERVO_HELPURL = "http://learn.parallax.com/ab-blocks/servo";
Blockly.MSG_ROBOT_HELPURL = "http://learn.parallax.com/ab-blocks/robot";
Blockly.MSG_IMU_HELPURL = "http://learn.parallax.com/ab-blocks/lsm9ds1";
Blockly.MSG_WS2812B_HELPURL = "http://learn.parallax.com/ab-blocks/ws2812b";
Blockly.MSG_SYSTEM_HELPURL = "http://learn.parallax.com/ab-blocks/system";


//----------Activity Board (Propeller C) block tooltips ----------------------------
Blockly.MSG_COMMENT_TOOLTIP = "add comment: Leave a note for people that will not affect the program.";
Blockly.MSG_CONTROLS_IF_TOOLTIP = "If...do: when condition attached is true. Click the gear to add conditions.";
Blockly.MSG_CONTROLS_SELECT_TOOLTIP = "switch...case: does statements when case condition is true. Click the gear to add conditions.";
Blockly.MSG_CONTROLS_REPEAT_TOOLTIP = "conditional repeat: forever, x times , until, or while attached condition is true.";
Blockly.MSG_CONTROL_REPEAT_FOR_LOOP_TOOLTIP = "repeat item: use variable and value blocks for counted loop.";
Blockly.MSG_CONTROLS_BREAK_TOOLTIP = "break: Exit loop and skip to the next block.";
Blockly.MSG_CONSTANT_DEF_TOOLTIP = "define constant: provide a named constant and give it a value.";
Blockly.MSG_CONSTANT_VALUE_TOOLTIP = "constant value: returns the value of a named constant.";
Blockly.MSG_ARRAY_GET_TOOLTIP = "array get element: gets a the value of the specified element in the array.";
Blockly.MSG_ARRAY_INIT_TOOLTIP = "array initialize: sets up the array with the specified number of elements.";
Blockly.MSG_ARRAY_FILL_TOOLTIP = "array fill: fills the array with the specified values.  Must be a comma seperated list of integers.";
Blockly.MSG_ARRAY_SET_TOOLTIP = "array set element: sets the value of the specified element in the array.";
Blockly.MSG_ARRAY_CLEAR_TOOLTIP = "array clear: sets all of the elements of the array to 0 (zero).";
Blockly.MSG_BASE_DELAY_TOOLTIP = "pause: wait for specified time (in milliseconds) then continue.";
Blockly.MSG_BASE_COUNT_TOOLTIP = "count pulses: counts the number of times the selected pin detects high pulses during the specified duration.";
Blockly.MSG_COG_NEW_TOOLTIP = "new processor: launch attached “run function” block if processor is available.";
Blockly.MSG_CONTROLS_RETURN_TOOLTIP = "return: Required at the end of code enclosed in a “define function” block.";
Blockly.MSG_MATH_ARITHMETIC_TOOLTIP = "math operation: + addition, - subtraction, x multiplication, / division, or % modulus.";
Blockly.MSG_MATH_LIMIT_TOOLTIP = "limit: use first value, but if it's outside of second value, use second value instead.";
Blockly.MSG_MATH_CREMENT_TOOLTIP = "de/increment: increase or decrease attached variable by 1.";
Blockly.MSG_MATH_RANDOM_TOOLTIP = "random: Pick random number between the low “from” and high “to” values.";
Blockly.MSG_MATH_BITWISE_TOOLTIP = "bitwise:& AND, | OR, ^ XOR, >> right shift, << left shift.";
Blockly.MSG_LOGIC_OPERATION_TOOLTIP = "boolean comparison: and, or, and not, or not; return 1/true or 0/false.";
Blockly.MSG_LOGIC_NEGATE_TOOLTIP = "not: Get boolean (1/true or 0/false) opposite,\nnegate: get the negative decimal value,\nabs: get the absolute value of.";
Blockly.MSG_PARENS_TOOLTIP = "parentheses: Surrounds the enclosed block with parentheses ().  Use to change the order of mathematical operations in a series of blocks.";
Blockly.MSG_LOGIC_COMPARE_TOOLTIP = "compare values: boolean comparison returns 1/true or 0/false.";
Blockly.MSG_STRING_COMPARE_TOOLTIP = "compare strings: returns 1/true or 0/false. Case sensitive.";
Blockly.MSG_STRING_LENGTH_TOOLTIP = "length of string: number of characters in string or string variable.";
Blockly.MSG_COMBINE_STRINGS_TOOLTIP = "combine strings: join inserted strings and store in chosen variable.";
Blockly.MSG_FIND_SUBSTRING_TOOLTIP = "find string location: of first character in substring from larger string.";
Blockly.MSG_GET_CHAR_AT_POSITION_TOOLTIP = "get character at position: ASCII value (0 to 255) for nth character in string.";
Blockly.MSG_SET_CHAR_AT_POSITION_TOOLTIP = "set character at position: nth in string, set with ASCII value (0 to 255).";
Blockly.MSG_GET_SUBSTRING_TOOLTIP = "get part of string: in range of positions; store in variable item.";
Blockly.MSG_MATH_NUMBER_TOOLTIP = "number value: positive or negative; truncates to integers.";
Blockly.MSG_STRING_TYPE_BLOCK_TOOLTIP = "text string: up to 128 characters.";
Blockly.MSG_CHAR_TYPE_BLOCK_TOOLTIP = "character value: Get value (32 to 126) of printable ASCII character selected.";
Blockly.MSG_MUSIC_NOTE_BLOCK_TOOLTIP = "music note: Get frequency value of scpecified note.";
Blockly.MSG_LOGIC_BOOLEAN_TOOLTIP = "true/false: Choose a value of 1 (true) or 0 (false).";
Blockly.MSG_HIGH_LOW_VALUE_TOOLTIP = "high/low: Choose a value of 1 (high) or 0 (low).";
Blockly.MSG_COLOR_PICKER_TOOLTIP = "color: Get 24-bit integer for color selected in box.";
Blockly.MSG_COLOR_VALUE_FROM_TOOLTIP = "color value from: inserted red, green, and blue values (0 to 255).";
Blockly.MSG_GET_CHANNEL_FROM_TOOLTIP = "get red/green/blue: value (0 to 255) for chosen component of color.";
Blockly.MSG_COMPARE_COLORS_TOOLTIP = "compare colors: returns value from 0 (opposite) to 255 (identical).";
Blockly.MSG_SYSTEM_COUNTER_TOOLTIP = "system counter: 0 to 4,294,967,295 before rolling over, or current clock frequency in MHz.";
Blockly.MSG_WAITCNT_TOOLTIP = "pause until: waits until the system clounter reaches the specified value.";
Blockly.MSG_REGISTER_SET_TOOLTIP = "cog set register: sets the value of the specified cog register.";
Blockly.MSG_REGISTER_GET_TOOLTIP = "cog get register: retrievs the value of the specified cog register.";
Blockly.MSG_CUSTOM_CODE_TOOLTIP = "user code: must be properly written Propeller C code.  Places code input into specificed location.";
Blockly.MSG_VARIABLES_SET_TOOLTIP = "set variable: name and attach initial value block.";
Blockly.MSG_VARIABLES_GET_TOOLTIP = "use variable: choose set variables from dropdown.";
Blockly.MSG_PROCEDURES_DEFNORETURN_TOOLTIP = "define function: group blocks to re-use ending with return; name group.";
Blockly.MSG_PROCEDURES_CALLNORETURN_TOOLTIP = "return: use in a “define function” block to go back to the main code.";
Blockly.MSG_MAKE_PIN_TOOLTIP = "make PIN (dropdown): Select I/O pin and setting with menus.";
Blockly.MSG_MAKE_PIN_INPUT_TOOLTIP = "make PIN (programmable): Select I/O pin with value and setting with menu.";
Blockly.MSG_CHECK_PIN_TOOLTIP = "check PIN (dropdown): Set I/O pin to an input and get its state; high = 1, low = 0.";
Blockly.MSG_CHECK_PIN_INPUT_TOOLTIP = "check PIN (programmable): Set I/O pin of inserted value to an input and get its state; high = 1, low = 0.";
Blockly.MSG_SET_PINS_TOOLTIP = "set multiple pins: define group then set each pin. Do not use on P29-P31.";
Blockly.MSG_GET_PINS_TOOLTIP = "binary get pins: gets the value of a group of pins as a binary value. Highest pin is MSB.";
Blockly.MSG_SET_PINS_BINARY_TOOLTIP = "binary set pins: define group then set each pins using a binary value. Highest pin is MSB. Do not use on P29-P31.";
Blockly.MSG_DEBUG_LCD_INIT_TOOLTIP = "LCD initialize: set I/O pin to LCD; match baud to LCD switches.";
Blockly.MSG_DEBUG_LCD_PRINT_TOOLTIP = "LCD print text: display on serial LCD.";
Blockly.MSG_DEBUG_LCD_PRINT_MULTIPLE_TOOLTIP = "LCD print multiple: send attached values or text to the LCD.";
Blockly.MSG_DEBUG_LCD_NUMBER_TOOLTIP = "LCD print number: display on serial LCD.";
Blockly.MSG_DEBUG_LCD_ACTION_TOOLTIP = "LCD command: select from dropdown.";
Blockly.MSG_DEBUG_LCD_SET_CURSOR_TOOLTIP = "LCD set cursor: row and column.";
Blockly.MSG_DEBUG_LCD_MUSIC_NOTE_TOOLTIP = "LCD play note: at octave for time set.";
Blockly.MSG_OLED_INITIALIZE_TOOLTIP = "OLED initialize: match to Propeller I/O pin connections.";
Blockly.MSG_OLED_FONT_LOADER_TOOLTIP = "OLED font loader: run alone to add fonts to EEPROM.";
Blockly.MSG_OLED_GET_MAX_HEIGHT_TOOLTIP = "OLED max height in pixels";
Blockly.MSG_OLED_GET_MAX_WIDTH_TOOLTIP = "OLED max width in pixels";
Blockly.MSG_OLED_CLEAR_SCREEN_TOOLTIP = "OLED command: clear screen, sleep, wake, invert screen.";
Blockly.MSG_OLED_TEXT_COLOR_TOOLTIP = "OLED font color: background is transparent if matched to font.";
Blockly.MSG_OLED_TEXT_SIZE_TOOLTIP = "OLED set text: Med, large, script and bubble require font loader.";
Blockly.MSG_OLED_SET_CURSOR_TOOLTIP = "OLED set cursor: 0,0 is top-left corner of display.";
Blockly.MSG_OLED_PRINT_TEXT_TOOLTIP = "OLED print text: send string to display.";
Blockly.MSG_OLED_PRINT_NUMBER_TOOLTIP = "OLED print number: display value as decimal, hex, or binary.";
Blockly.MSG_OLED_PRINT_MULTIPLE_TOOLTIP = "OLED print multiple: send attached values or text to the OLED.";
Blockly.MSG_OLED_DRAW_PIXEL_TOOLTIP = "OLED draw pixel: at x, y from top-left corner.";
Blockly.MSG_OLED_DRAW_LINE_TOOLTIP = "OLED draw line: set start and end points; 0,0 is top-left.";
Blockly.MSG_OLED_DRAW_TRIANGLE_TOOLTIP = "OLED draw triangle: set x,y position of each corner.";
Blockly.MSG_OLED_DRAW_RECTANGLE_TOOLTIP = "OLED draw rectangle: set x,y position of each corner.";
Blockly.MSG_OLED_DRAW_CIRCLE_TOOLTIP = "OLED draw circle: x,y of center point, radius, color, fill. ";
Blockly.MSG_CONSOLE_PRINT_TOOLTIP = "Terminal print text: display contents of string block.";
Blockly.MSG_CONSOLE_PRINT_VARIABLES_TOOLTIP = "Terminal print number: display value as decimal, hex, binary, or ASCII.";
Blockly.MSG_CONSOLE_PRINT_MULTIPLE_TOOLTIP = "Terminal print multiple: send attached values or text to the terminal.";
Blockly.MSG_CONSOLE_SCAN_TEXT_TOOLTIP = "Terminal receive text: up to 128-character string in variable.";
Blockly.MSG_CONSOLE_SCAN_NUMBER_TOOLTIP = "Terminal receive number: as integer in variable.";
Blockly.MSG_CONSOLE_NEWLINE_TOOLTIP = "Terminal new line: move cursor to far left of the next line.";
Blockly.MSG_CONSOLE_CLEAR_TOOLTIP = "Terminal clear screen: then move cursor to 0,0 top left.";
Blockly.MSG_CONSOLE_MOVE_TO_POSITION_TOOLTIP = "Terminal set cursor: at position x,y. Use Clear screen block first.";
Blockly.MSG_SERIAL_OPEN_TOOLTIP = "Serial initialize: match to Propeller I/O pin connections and device Baud rate.";
Blockly.MSG_SERIAL_TX_TOOLTIP = "Serial transmit number: sends 32-bit integer as 4 bytes MSB-first.";
Blockly.MSG_SERIAL_SEND_TEXT_TOOLTIP = "Serial transmit text: sends text as characters terminated by a 0 (NULL).";
Blockly.MSG_SERIAL_RX_TOOLTIP = "Serial receive number: receives 4 bytes MSB first and stores a a 32-bit integer.";
Blockly.MSG_SERIAL_RECEIVE_TEXT_TOOLTIP = "Serial receive text: receives and stores characters into a variable until a 0 (NULL).";
Blockly.MSG_SERIAL_PRINT_MULTIPLE_TOOLTIP = "Serial send multiple: send attached values or text to the device connected to the specified pin.";
Blockly.MSG_SERIAL_SCAN_MULTIPLE_TOOLTIP = "Serial receive multiple: receive numbers or characters from the specified pin and store them in the specified variables.";
Blockly.MSG_SHIFT_IN_TOOLTIP = "shift in: serially shift in a specified number of bits and provides an integer value.";
Blockly.MSG_SHIFT_OUT_TOOLTIP = "shift out: serially shift out a specified number of bits from the specified value.";
Blockly.MSG_I2C_SEND_TOOLTIP = "i2c send: send data to the specified device and register/memory address using the i2c/TWI protocol.  Refer to the device's datasheet for device address and register information.";
Blockly.MSG_I2C_RECEIVE_TOOLTIP = "i2c receive: receive data from the specified device and register/memory address using the i2c/TWI protocol.  Refer to the device's datasheet for device address and register information.";
Blockly.MSG_I2C_MODE_TOOLTIP = "i2c mode: specify whether the i2c clock line (SCL) is open-collector (default) or driven/push-pull by the Propeller MCU.";
Blockly.MSG_I2C_BUSY_TOOLTIP = "i2c busy: returns true if the i2c if the specified device is busy.  Refer to the device's datasheet for device address information.";
Blockly.MSG_SWX_INIT_TOOLTIP = "Simple WX initialize: Requires simplewx.html file. Match DO/DI to Propeller I/O pin connections, set terminal and program routing.";
Blockly.MSG_SWX_CONFIG_PAGE_TOOLTIP = "Simple WX configure page: Requires simplewx.html file. Set terminal page title and background color.";
Blockly.MSG_SWX_SET_TOOLTIP = "Simple WX set widget: Requires simplewx.html file. Set location, type, color, and values for a new widget.";
Blockly.MSG_SWX_READ_TOOLTIP = "Simple WX read widgets: Requires simplewx.html file. Reads the current values of all the widgets.";
Blockly.MSG_SWX_GET_TOOLTIP = "Simple WX widget value: Requires simplewx.html file. Provides the value of a widget from when it was last read.";
Blockly.MSG_SWX_SEND_TOOLTIP = "Simple WX send to widget: Requires simplewx.html file. Send a value to a widget.";
Blockly.MSG_AWX_INIT_ADV_TOOLTIP = "Advanced WX initialize: Match DO/DI to Propeller I/O pin connections, set terminal and program routing.";
Blockly.MSG_AWX_GET_IP_TOOLTIP = "WX Get IP address: provides the module's IP address as a text string.";
Blockly.MSG_AWX_SCAN_MULTIPLE_TOOLTIP = "Advanced WX scan multiple: scans the incoming string and stores the data as specified.";
Blockly.MSG_AWX_PRINT_TOOLTIP = "Advanced WX print: prints the specified data to the WX module.";
Blockly.MSG_AWX_SCAN_STRING_TOOLTIP = "Advanced WX scan string: stores an incoming string in the specified variable.";
Blockly.MSG_AWX_SEND_TOOLTIP = "Advanced WX send: sends the specified data to the TCP connection.";
Blockly.MSG_AWX_RECEIVE_TOOLTIP = "Advanced WX receive: receives and stores TCP data.";
Blockly.MSG_AWX_POLL_TOOLTIP = "Advanced WX poll: Instructs the WX module to monitor for a connection and data.";
Blockly.MSG_AWX_LISTEN_TOOLTIP = "Advanced WX connect: listens for incoming data and provides the connection information.";
Blockly.MSG_AWX_CODE_TOOLTIP = "Advanced WX code: provides the value for one of the codes used by the WX module.";
Blockly.MSG_AWX_MODE_TOOLTIP = "Advanced WX mode: sets or gets the current mode of the WX module.";
Blockly.MSG_AWX_BUFFER_TOOLTIP = "Advanced WX buffer: use to set a different receive buffer and/or size for the receive buffer";
Blockly.MSG_AWX_DISCONNECT_TOOLTIP = "Advanced WX disconnect: disconnected from the specified connection.";
Blockly.MSG_AWX_GET_IP_TOOLTIP = "Advanced WX get IP address: provides the IP address of the specified mode as a string.";
Blockly.MSG_XBEE_SETUP_TOOLTIP = "XBee initialize: match to Propeller I/O pin connections and XBee Baud rate.";
Blockly.MSG_XBEE_TRANSMIT_TOOLTIP = "XBee transmit: sends information to an XBee.  Strings and numbers are terminated with an ASCII 13";
Blockly.MSG_XBEE_RECEIVE_TOOLTIP = "XBee receive: receives information from an XBee.  Expects strings and numbers to be terminated with an ASCII 13";
Blockly.MSG_XBEE_PRINT_MULTIPLE_TOOLTIP = "XBee send multiple: send attached values or text to the Xbee module.";
Blockly.MSG_XBEE_SCAN_MULTIPLE_TOOLTIP = "XBee receive multiple: receive numbers or characters from the XBee module and store them in the specified variables.";
Blockly.MSG_WS2812B_INIT_TOOLTIP = "RGB-LED init: match to Propeller I/O pin connections and number of LEDs.";
Blockly.MSG_WS2812B_SET_TOOLTIP = "RGB-LED set: specify color for a specific LED.";
Blockly.MSG_WS2812B_MULTIPLE_TOOLTIP = "RGB-LED set multiple: specify color for a range of consecutive LEDs.";
Blockly.MSG_WS2812B_UPDATE_TOOLTIP = "RGB-LED update: update colors of all connected RGB-LEDs.";
Blockly.MSG_KEYPAD_INIT_TOOLTIP = "4x4 Keypad init: match to Propeller I/O pins:\nWith the keypad facing you, start match from the leftmost pin to the rightmost pin.\nThe four rightmost pins must be connected to pull down resistors\n of a resistance from 1 to 100 kOhm.";
Blockly.MSG_KEYPAD_READ_TOOLTIP = "4x4 Keypad read: provides the value of the key pressed.\nIf none are pressed, provides (-1).";
Blockly.MSG_GPS_INIT_TOOLTIP = "GPS Init: match to Propeller I/O pin connections and GPS module buad rate.";
Blockly.MSG_GPS_HASFIX_TOOLTIP = "GPS has satellite fix: Returns 1 if there is a valid fix, 0 (zero) if not.";
Blockly.MSG_GPS_LAT_TOOLTIP = "GPS latitude: provides latitude in microdegrees. North latitudes are positive, South latitudes are negative.";
Blockly.MSG_GPS_LONG_TOOLTIP = "GPS longitude: provides longitude in microdegrees. East longitudes are positive, West longitudes are negative.";
Blockly.MSG_GPS_HEADING_TOOLTIP = "GPS heading: provides compass heading in degrees.  Values are only valid when in motion";
Blockly.MSG_GPS_ALTITUDE_TOOLTIP = "GPS altitude: provides altitude in centimeters above sea level.";
Blockly.MSG_GPS_SATS_TOOLTIP = "GPS satellites tracked: provides the number of satellites the GPS module can see.";
Blockly.MSG_GPS_VELOCITY_TOOLTIP = "GPS speed: provides the speed the module is travelling in the specified units.";
Blockly.MSG_FPS_INIT_TOOLTIP = "Fingerprint scanner initialize: match to Propeller I/O pin connections.";
Blockly.MSG_FPS_ADD_TOOLTIP = "Fingerprint scanner capture: capture and save or delete a capture or captures and their ID(s).";
Blockly.MSG_FPS_SCAN_TOOLTIP = "Fingerprint scanner scan: scan and identify or scan and compare a fingerprint, or count the number of saved captures.";
Blockly.MSG_HMC5883L_INIT_TOOLTIP = "Compass initialize: match to Propeller I/O pin connections.";
Blockly.MSG_HMC5883L_READ_TOOLTIP = "Compass heading: get current heading in degrees.";
Blockly.MSG_JOYSTICK_INPUT_XAXIS_TOOLTIP = "Joystick x-axis: gets horizontal position of Joystick, match to A/D socket.";
Blockly.MSG_JOYSTICK_INPUT_YAXIS_TOOLTIP = "Joystick y axis: gets vertical position of Joystick, match to A/D socket.";
Blockly.MSG_MX2125_ACCELERATION_XAXIS_TOOLTIP = "Memsic x acceleration: gets side-to-side acceleration, match to Propeller I/O pin.";
Blockly.MSG_MX2125_ACCELERATION_YAXIS_TOOLTIP = "Memsic y acceleration: gets front to back acceleration, match to Propeller I/O pin.";
Blockly.MSG_MX2125_ROTATION_TOOLTIP = "Memsic rotation: gets rotation in degress when held like a steering wheel, match to Propeller I/O pins.";
Blockly.MSG_MX2125_TILT_XAXIS_TOOLTIP = "Memsic x tilt: gets x-\tilt in degrees from level with horizon, match to Propeller I/O pin.";
Blockly.MSG_MX2125_TILT_YAXIS_TOOLTIP = "Memsic y tilt: gets y-tilt in degrees from level with horizon, match to Propeller I/O pin.";
Blockly.MSG_MMA7455_INIT_TOOLTIP = "Accelerometer initialize: match to Propeller I/O pin connections.";
Blockly.MSG_MMA7455_ACCELERATION_TOOLTIP = "Accelerometer store values: stores measured x, y, & z acceleration in specified variables.";
Blockly.MSG_LSM9DS1_INIT_TOOLTIP = "IMU initialize: match to Propeller I/O pin connections.";
Blockly.MSG_LSM9DS1_READ_TOOLTIP = "IMU read: get measurements from specified sensor.";
Blockly.MSG_LSM9DS1_MAG_CALIBRATE_TOOLTIP = "IMU Calibrate Magnetometer: Initialize first. Rotate slowly thru all 3 axes until P26/P27 LEDs turn off.";
Blockly.MSG_LSM9DS1_TILT_TOOLTIP = "IMU tilt: gets tilt along specified axis.";
Blockly.MSG_LSM9DS1_HEADING_TOOLTIP = "IMU heading: specify axes, get current heading in degrees.";
Blockly.MSG_SENSOR_PING_TOOLTIP = "Ping))) distance: gets distance measured in the specified units, match to Propeller I/O pin.";
Blockly.MSG_PIR_SENSOR_TOOLTIP = "PIR sensor: returns 1/true if motion is detected, match to Propeller I/O pin.";
Blockly.MSG_RFID_ENABLE_TOOLTIP = "RFID initialize: match to Propeller I/O pin connections.";
Blockly.MSG_RFID_GET_TOOLTIP = "RFID read: gets ID from RFID tag near sensor, returns 0 if no tag detected.";
Blockly.MSG_RFID_DISABLE_TOOLTIP = "RFID disable/enable: enables or disables the RFID reader.";
Blockly.MSG_RFID_CLOSE_TOOLTIP = "RFID close: Closes RFID object, frees resources used.";
Blockly.MSG_SIRC_GET_TOOLTIP = "Sony Remote value: returns button pressed on remote, returns -1 if none, match to Propeller I/O pin.";
Blockly.MSG_SOUND_IMPACT_RUN_TOOLTIP = "Sound Impact initialize: match to Propeller I/O pin connections.";
Blockly.MSG_SOUND_IMPACT_GET_TOOLTIP = "Sound Impact get count: gets number of sound impacts since last block was used last.";
Blockly.MSG_SOUND_IMPACT_END_TOOLTIP = "Sound Impact close: Closes Sound Impact sensor object, frees resources used.";
Blockly.MSG_COLORPAL_ENABLE_TOOLTIP = "ColorPal initialize: match to Propeller I/O pin connections.";
Blockly.MSG_COLORPAL_GET_COLORS_RAW_TOOLTIP = "ColorPal raw colors: stores raw (uncalibrated) color measurments in specified variables.";
Blockly.MSG_COLORPAL_GET_COLORS_TOOLTIP = "ColorPal get color: stores approximate color as a single integer into the specified varaible.";
Blockly.MSG_DHT22_READ_TOOLTIP = "Temp & Humidity read: trigger a DHT22/AM2302/CM2302 sensor connected to the specified pin to take and store a reading.  Must use a 10kOhm pullup resistor.";
Blockly.MSG_DHT22_VALUE_TOOLTIP = "Temp & Humidity value: returns the specified measurement from the last sensor read using the Temp & Humidity read block.";
Blockly.MSG_EEPROM_READ_TOOLTIP = "EEPROM read: reads information from EEPROM memory starting at the specified address.";
Blockly.MSG_EEPROM_WRITE_TOOLTIP = "EEPROM write: writes information to EEPROM memory starting at the specified address.";
Blockly.MSG_RC_CHARGE_DISCHARGE_TOOLTIP = "RC charge/discharge: returns the charge/discharge time of an RC circuit connected to the specified I/O pin.";
Blockly.MSG_AB_VOLT_IN_TOOLTIP = "A/D read: returns the value measured by the connected A/D channel in volt-100ths.";
Blockly.MSG_AB_VOLT_OUT_TOOLTIP = "D/A output: outputs voltage on the connected D/A channel in volt-100ths.";
Blockly.MSG_PULSE_IN_TOOLTIP = "Pulse-in: measures the duration a high or low pulse received by the connected I/O pin.";
Blockly.MSG_PULSE_OUT_TOOLTIP = "Pulse-out: outputs a high or low pulse to the specified I/O pin for the specificed duration.";
Blockly.MSG_PWM_START_TOOLTIP = "PWM initialize: sets up PWM object in the Propeller.";
Blockly.MSG_PWM_SET_TOOLTIP = "PWM set: sends the specified PWM pulses out the Propeller I/O pin specified. Set duty cycle to 0 to stop sending pulses.";
Blockly.MSG_PWM_STOP_TOOLTIP = "PWM stop: Stops PWM object, frees up resources used on the Propeller.";
Blockly.MSG_MCP320X_SET_VREF_TOOLTIP = "A/D chip set Vref: Set to the Vref voltage of the A/D chip.";
Blockly.MSG_MCP320X_READ_TOOLTIP = "A/D chip read: Reads an analog voltage from the specified channel. Match to Propeller I/O pin connections.";
Blockly.MSG_WAV_PLAY_TOOLTIP = "WAV play: Plays the specified .WAV file stored on the SD card.";
Blockly.MSG_WAV_STATUS_TOOLTIP = "WAV status: returns 1/true if a .WAV file is playing, returns 0/false if not.";
Blockly.MSG_WAV_VOLUME_TOOLTIP = "WAV volume: sets the volume of the WAV player - 0 (quietest) to 10 (loudest).";
Blockly.MSG_WAV_STOP_TOOLTIP = "WAV stop: Stops the WAV player object, frees up resources on the Propeller.";
Blockly.MSG_BASE_FREQOUT_TOOLTIP = "frequency out: sends pulses to the I/O pin at the specified frequency.";
Blockly.MSG_SOUND_INIT_TOOLTIP = "sound initialize: starts the polyphonic (multi-tone) sound process.";
Blockly.MSG_SOUND_PLAY_TOOLTIP = "sound play: set or stop the freqeuncy, set the volume, and/or set the waveform of one of the four available channels.";
Blockly.MSG_SD_INIT_TOOLTIP = "SD card initialize: start the SD card utility.";
Blockly.MSG_SD_OPEN_TOOLTIP = "SD card open: open or create the specified file on the SD card";
Blockly.MSG_SD_READ_TOOLTIP = "SD card read: read from, write to, or close the current file on the SD card.";
Blockly.MSG_SD_FILE_POINTER_TOOLTIP = "SD card file pointer: ";
Blockly.MSG_SERVO_MOVE_TOOLTIP = "Standard servo: sets the position of a standard servo connected to the I/O pin.";
Blockly.MSG_SERVO_SPEED_TOOLTIP = "CR servo speed: sets the speed of a continuous rotation servo connected to the I/O pin.";
Blockly.MSG_SERVO_SET_RAMP_TOOLTIP = "CR servo set ramp: sets the amount a servo's speed can change each update cycle.";
Blockly.MSG_FB360_INIT_TOOLTIP = "Feedback 360 servo initialize: sets up the feedback control system for the servo.  Match the signal and feedback pins to the Propeller I/O pin connections.";
Blockly.MSG_FB360_SETUP_TOOLTIP = "Feedback 360 servo configure: use to set the maximum acceleration or maximum speed of the servo. Specify either the servo's signal or feedback pin.";
Blockly.MSG_FB360_SET_TOOLTIP = "Feedback 360 servo set: sets the speed, absolute angle (where 0 is the position the servo was initialized in), or relative angle (change from current position). Specify either the servo's signal or feedback pin.";
Blockly.MSG_FB360_GET_TOOLTIP = "Feedback 360 servo get: retrieves the servo's absolute angle (where 0 is the position the servo was initialized in). Specify either the servo's signal or feedback pin.";
Blockly.MSG_FB360_STATUS_TOOLTIP = "Feedback 360 servo status: returns whether the FB360 servo is (true) or is not (false) in the state selected in the dropdown.";
Blockly.MSG_ROBOT_DRIVE_INIT_TOOLTIP = "Robot drive init: set up the Robot's drive system on the Propeller.";
Blockly.MSG_ROBOT_DRIVE_DISTANCE_TOOLTIP = "Robot drive distance: drives each wheel a specified distance.";
Blockly.MSG_ROBOT_RAMPING_TOOLTIP = "Robot set acceleration: sets how slowly or quickly the robot is\nable to change its speed.  Higher values allow for faster speed changes.";
Blockly.MSG_ROBOT_DISTANCE_MAX_SPEED_TOOLTIP = "Robot drive maximum speed: Sets the maximum speed the robot is allowed to drive.";
Blockly.MSG_ROBOT_DRIVE_SPEED_TOOLTIP = "Robot drive speed: drives each wheel at a specified speed.";
Blockly.MSG_ROBOT_DRIVE_STOP_TOOLTIP = "Robot drive stop: stops the robot from driving.";
Blockly.MSG_ROBOT_GET_TICKS_TOOLTIP = "Robot encoder counts: retrives the current encoder counts and stores them in the specified varialbes.";
Blockly.MSG_ROBOT_ACTIVITYBOT_CALIBRATE_TOOLTIP = "ActivityBot calibrate: runs the ActivityBot calibration routine.";
Blockly.MSG_ROBOT_ACTIVITYBOT_DISPLAY_CALIBRATION_TOOLTIP = "ActivityBot display calibration: displays the calibration results on the terminal.";
Blockly.MSG_STRING_TO_NUMBER_TOOLTIP = "string to number: convert a number (integer) value to a string.";
Blockly.MSG_NUMBER_TO_STRING_TOOLTIP = "number to string: convert a string representing a number to an integer.";
Blockly.MSG_NUMBER_BINARY_TOOLTIP = "binary value: use to enter a binary number.";
Blockly.MSG_NUMBER_HEX_TOOLTIP = "hexadecimal value: use to enter a hexadecimal number.";
Blockly.MSG_CONSTRAIN_VALUE_TOOLTIP = "constrain value: prevent a value from being too large or too small.";
Blockly.MSG_MAP_VALUE_TOOLTIP = "map value: scale a value from one range to a different range.";
Blockly.MSG_MATH_ADVANCED_TOOLTIP = "advanced math: perform a trigonometric, exponential, or logrithmic function.\nAngles are in degrees.";
Blockly.MSG_MATH_INV_TRIG_TOOLTIP = "inverse trig: perform an inverse trigonometric function.\nAngles are in degrees.";


//-------Scribbler 3 help URLs ---------------------------------------------
Blockly.MSG_S3_COMMUNICATE_HELPURL = "http://learn.parallax.com/s3-blocks/communicate";
Blockly.MSG_S3_CONTROL_HELPURL = "http://learn.parallax.com/s3-blocks/control";
Blockly.MSG_S3_FACTORY_RESET_HELPURL = "http://learn.parallax.com/s3-blocks/factory-reset";
Blockly.MSG_S3_FUNCTIONS_HELPURL = "http://learn.parallax.com/s3-blocks/functions";
Blockly.MSG_S3_LEDS_HELPURL = "http://learn.parallax.com/s3-blocks/leds";
Blockly.MSG_S3_LIGHT_HELPURL = "http://learn.parallax.com/s3-blocks/light";
Blockly.MSG_S3_LINE_HELPURL = "http://learn.parallax.com/s3-blocks/line";
Blockly.MSG_S3_MATH_HELPURL = "http://learn.parallax.com/s3-blocks/math";
Blockly.MSG_S3_MOTORS_HELPURL = "http://learn.parallax.com/s3-blocks/motors";
Blockly.MSG_S3_MEMORY_HELPURL = "http://learn.parallax.com/s3-blocks/memory";
Blockly.MSG_S3_SERVO_HELPURL = "http://learn.parallax.com/s3-blocks/servo";
Blockly.MSG_S3_OBSTACLE_HELPURL = "http://learn.parallax.com/s3-blocks/obstacle";
Blockly.MSG_S3_PING_HELPURL = "http://learn.parallax.com/s3-blocks/ping";
Blockly.MSG_S3_MIC_HELPURL = "http://learn.parallax.com/s3-blocks/microphone";
Blockly.MSG_S3_SIRC_HELPURL = "http://learn.parallax.com/s3-blocks/sirc";
Blockly.MSG_S3_RESET_BUTTON_HELPURL = "http://learn.parallax.com/s3-blocks/reset-button";
Blockly.MSG_S3_SIMPLE_ACTIONS_HELPURL = "http://learn.parallax.com/s3-blocks/simple-actions";
Blockly.MSG_S3_SIMPLE_CONTROL_HELPURL = "http://learn.parallax.com/s3-blocks/simple-control";
Blockly.MSG_S3_SIMPLE_SENSORS_HELPURL = "http://learn.parallax.com/s3-blocks/simple-sensors";
Blockly.MSG_S3_SOUND_HELPURL = "http://learn.parallax.com/s3-blocks/sound";
Blockly.MSG_S3_STALL_HELPURL = "http://learn.parallax.com/s3-blocks/stall";
Blockly.MSG_S3_VARIABLES_HELPURL = "http://learn.parallax.com/s3-blocks/variables";
Blockly.MSG_S3_IO_HELPURL = "http://learn.parallax.com/s3-blocks/io";


//-------Scribbler 3 block tooltips --------------------------
Blockly.MSG_S3_SCRIBBLER_LOOP_TOOLTIP = "simple loop: repeats code inside the loop until an exit loop block is used.";
Blockly.MSG_S3_SCRIBBLER_LIMITED_LOOP_TOOLTIP = "counted loop: repeats code a number of times";
Blockly.MSG_S3_SCRIBBLER_EXIT_LOOP_TOOLTIP = "exit loop: exits out of a loop that is repeating code";
Blockly.MSG_S3_SCRIBBLER_SIMPLE_WAIT_TOOLTIP = "simple wait: waits a set amount of time before moving on the to the next block";
Blockly.MSG_S3_SCRIBBLER_IF_LINE_TOOLTIP = "detect line: detects a line underneath the Scribbler";
Blockly.MSG_S3_SCRIBBLER_IF_OBSTACLE_TOOLTIP = "detect obstacle: detects if something is in front of the Scribbler";
Blockly.MSG_S3_SCRIBBLER_IF_LIGHT_TOOLTIP = "detect ambient light: detects a light in front of the Scribbler";
Blockly.MSG_S3_SCRIBBLER_IF_STALLED_TOOLTIP = "detect stall: detects if the Scribbler's wheels are stuck";
Blockly.MSG_S3_SCRIBBLER_IF_RANDOM_TOOLTIP = "flip a coin: randomly returns a true or false";
Blockly.MSG_S3_SCRIBBLER_DRIVE_TOOLTIP = "drive: used to move the Scribbler";
Blockly.MSG_S3_SCRIBBLER_SPIN_TOOLTIP = "rotate: used to rotate the Scribbler";
Blockly.MSG_S3_SCRIBBLER_STOP_TOOLTIP = "stop driving: stops the Scribbler's motors";
Blockly.MSG_S3_SCRIBBLER_PLAY_TOOLTIP = "play note: plays a note using the Scribbler's speaker";
Blockly.MSG_S3_SCRIBBLER_LED_TOOLTIP = "change LEDs: used to change the LED's on the Scribbler";
Blockly.MSG_S3_CONTROLS_REPEAT_TOOLTIP = "conditional repeat: forever, x times , until, or while attached condition is true.";
Blockly.MSG_S3_CONTROLS_IF_TOOLTIP = "if...do: when condition attached is true. Click the gear to add conditions.";
Blockly.MSG_S3_SCRIBBLER_WAIT_TOOLTIP = "wait: waits a set amount of time before moving on the to the next block";
Blockly.MSG_S3_SPIN_COMMENT_TOOLTIP = "note: use to add a note to your program.  Does not affect the program.";
Blockly.MSG_S3_PROCEDURES_DEFNORETURN_TOOLTIP = "define function: group blocks to re-use ending with return; name group.";
Blockly.MSG_S3_PROCEDURES_CALLNORETURN_TOOLTIP = "return: use in a “define function” block to go back to the main code.";
Blockly.MSG_S3_VARIABLES_SET_TOOLTIP = "set variable: name and attach initial value block.";
Blockly.MSG_S3_VARIABLES_GET_TOOLTIP = "use variable: choose set variables from dropdown.";
Blockly.MSG_S3_SPIN_INTEGER_TOOLTIP = "number value: positive or negative; truncates to integers.";
Blockly.MSG_S3_MATH_INT_ANGLE_TOOLTIP = "number of degrees: indicate how many degrees (rotation) to turn or move.";
Blockly.MSG_S3_SCRIBBLER_BOOLEAN_TOOLTIP = "true/false: choose a true or false value";
Blockly.MSG_S3_SCRIBBLER_RANDOM_BOOLEAN_TOOLTIP = "random true/false: randomly returns a true or false";
Blockly.MSG_S3_SCRIBBLER_RANDOM_NUMBER_TOOLTIP = "random number: pick random number between the low “from” and high “to” values.";
Blockly.MSG_S3_MATH_ARITHMETIC_TOOLTIP = "math operation: + addition, - subtraction, x multiplication, / division, or % modulus.";
Blockly.MSG_S3_MATH_LIMIT_TOOLTIP = "highest/lowest: returns the highest or lowest of the two values inputted";
Blockly.MSG_S3_LOGIC_OPERATION_TOOLTIP = "boolean comparison: and, or, and not, or not; returns true or false.";
Blockly.MSG_S3_LOGIC_NEGATE_TOOLTIP = "not: returns false if input is true and true if input is false";
Blockly.MSG_S3_LOGIC_COMPARE_TOOLTIP = "compare values: boolean comparison returns true or false";
Blockly.MSG_S3_LINE_SENSOR_TOOLTIP = "line sensor reading: detection of a line by the sensors under the Scribbler";
Blockly.MSG_S3_LINE_CALIBRATE_TOOLTIP = "line sensor calibrate: Use this block at the top of a line following program.\nSpins the Scribbler robot in place and calibrates the\nline following sensors by scanning the surface beneath it.";
Blockly.MSG_S3_OBSTACLE_SENSOR_TOOLTIP = "obstacle sensor reading: detection of obstacles from the front sensors";
Blockly.MSG_S3_LIGHT_SENSOR_TOOLTIP = "light sensor reading: measurements of light from the front sensors";
Blockly.MSG_S3_STALL_SENSOR_TOOLTIP = "tail wheel stall: returns true of tail wheel is not spinning";
Blockly.MSG_S3_SPINNING_SENSOR_TOOLTIP = "drive wheel stall: returns true if drive wheels are not spinning but should be";
Blockly.MSG_S3_RESET_BUTTON_PRESSES_TOOLTIP = "button sensor: returns how many times the reset button was pressed";
Blockly.MSG_S3_SCRIBBLER_PING_TOOLTIP = "Ping))) distance: measures distances using a Ping))) sensor attached to the hacker port";
Blockly.MSG_S3_SCRIBBLER_MIC_TOOLTIP = "microphone: returns the volume of sound detected by the microphone as a percentage 0 to 100.";
Blockly.MSG_S3_SCRIBBLER_SIRC_TOOLTIP = "Sony Remote value: returns button pressed on remote, returns -1 if none.";
Blockly.MSG_S3_MOVE_MOTORS_TOOLTIP = "motor speed: use to move the Scribbler at specific speeds";
Blockly.MSG_S3_MOVE_MOTORS_DISTANCE_TOOLTIP = "move distance: use to move the Scribbler specific distances";
Blockly.MSG_S3_MOVE_MOTORS_ANGLE_TOOLTIP = "rotate by radius: rotates the scribbler by driving it";
Blockly.MSG_S3_MOVE_MOTORS_XY_TOOLTIP = "move XY: use to move Scribbler to a new XY coordinate.\nChanges in position are relative to the position and\ndirection at the start of your program.\nOnly acccurate when all movements are straight lines.";
Blockly.MSG_S3_SCRIBBLER_SERVO_TOOLTIP = "rotate Servo: turns a servo connected to the hacker port to a position";
Blockly.MSG_S3_SCRIBBLER_STOP_SERVO_TOOLTIP = "disable Servo: stops sending signals to the connected servo";
Blockly.MSG_S3_ANALOG_INPUT_TOOLTIP = "analog read pin: Get the voltage input on the specified pin.";
Blockly.MSG_S3_DIGITAL_OUTPUT_TOOLTIP = "digital set pin: Select I/O pin and setting with menus.";
Blockly.MSG_S3_DIGITAL_INPUT_TOOLTIP = "digital read pin: Get the state of I/O pin; high = 1, low = 0.";
Blockly.MSG_S3_PLAY_POLYPHONY_TOOLTIP = "play tone: mix two frequencies set in Hz.";
Blockly.MSG_S3_SCRIBBLER_MEMORY_READ_TOOLTIP = "memory read: retrieve a value from the specified address (0 to 7936).";
Blockly.MSG_S3_SCRIBBLER_MEMORY_WRITE_TOOLTIP = "memory write: save a value to the specified address (0 to 7936).  Values stay in memory even after the Scribbler is powered off.";
Blockly.MSG_S3_SERIAL_SEND_TEXT_TOOLTIP = "send message: send text out from the serial port";
Blockly.MSG_S3_SERIAL_SEND_DECIMAL_TOOLTIP = "send number: send a number out from the serial port";
Blockly.MSG_S3_SERIAL_SEND_CHAR_TOOLTIP = "send character: send a character out from the serial port";
Blockly.MSG_S3_SERIAL_SEND_CTRL_TOOLTIP = "send control character: send a special character out from the serial port";
Blockly.MSG_S3_SERIAL_CURSOR_XY_TOOLTIP = "set cursor position: set the cursor position in the terminal";
Blockly.MSG_S3_SERIAL_RX_BYTE_TOOLTIP = "receive character: receieve a character from the serial port";
Blockly.MSG_S3_FACTORY_RESET_TOOLTIP = "factory reset: use to reload the factory default demo program back onto the Scribbler"; 

var toolbox_label = [];
toolbox_label['category_control'] = "Control";
toolbox_label['category_operators'] = "Operators";
toolbox_label['category_system'] = "System";
toolbox_label['category_operators_numbers'] = "Numbers";
toolbox_label['category_operators_strings'] = "Strings";
toolbox_label['category_operators_arrays'] = "Arrays";
toolbox_label['category_values'] = "Values";
toolbox_label['category_input-output'] = "Input/Output";
toolbox_label['category_input-output_pin-states'] = "Pin states";
toolbox_label['category_input-output_timing'] = "Timing";
toolbox_label['category_scribbler'] = "Scribbler 3";
toolbox_label['category_scribbler_outputs'] = "Actions";
toolbox_label['category_scribbler_inputs'] = "Sensors";
toolbox_label['category_communicate'] = "Communicate";
toolbox_label['category_communicate_serial-lcd'] = "Serial LCD";
toolbox_label['category_communicate_serial-terminal'] = "Terminal";
toolbox_label['category_communicate_oled'] = "OLED";
toolbox_label['category_communicate_graphing'] = "Graph";
toolbox_label['category_communicate_protocols'] = "Protocols";
toolbox_label['category_communicate_xbee'] = "XBee";
toolbox_label['category_communicate_WS2812B'] = "RGB LEDs";
toolbox_label['category_sensor-input'] = "Sensor";
toolbox_label['category_sensor-input_LSM9DS1'] = "LSM9DS1 IMU";
toolbox_label['category_sensor-input_etape'] = "ETape liquid level";
toolbox_label['category_sensor-input_fingerprint'] = "Fingerprint Scanner";
toolbox_label['category_sensor-input_gps'] = "GPS module";
toolbox_label['category_sensor-input_hmc5883l'] = "HMC5883L";
toolbox_label['category_sensor-input_2axis-joystick'] = "2-axis Joystick";
toolbox_label['category_sensor-input_4x4-keypad'] = "4x4 Keypad";
toolbox_label['category_sensor-input_memsic-2axis'] = "Memsic 2-axis";
toolbox_label['category_sensor-input_mma7455'] = "MMA7455";
toolbox_label['category_sensor-input_gps_pam7q'] = "GPS PAM7Q";
toolbox_label['category_sensor-input_ping'] = "Distance: PING)))";
toolbox_label['category_sensor-input_pir'] = "PIR Motion";
toolbox_label['category_sensor-input_rfid'] = "RFID";
toolbox_label['category_sensor-input_sf02-laser'] = "SF02 Laser";
toolbox_label['category_sensor-input_sony-remote'] = "Sony Remote";
toolbox_label['category_sensor-input_sound-impact-sensor'] = "Sound Impact Sensor";
toolbox_label['category_sensor-input_colorpal'] = "ColorPal";
toolbox_label['category_sensor-input_temperature-humidity'] = "Temp & Humidity";
toolbox_label['category_memory'] = "Memory";
toolbox_label['category_memory_eeprom'] = "EEPROM";
toolbox_label['category_memory_sdcard'] = "SD Card";
toolbox_label['category_analog-pulses'] = "Analog/Pulses";
toolbox_label['category_analog-pulses_rc'] = "RC time";
toolbox_label['category_analog-pulses_voltage'] = "Voltage";
toolbox_label['category_analog-pulses_pulse-in-out'] = "Pulse in/out";
toolbox_label['category_analog-pulses_pwm'] = "PWM";
toolbox_label['category_audio'] = "Audio";
toolbox_label['category_audio_audio'] = "WAV Files";
toolbox_label['category_audio_freqout'] = "Frequency out";
toolbox_label['category_servo'] = "Servo";
toolbox_label['category_servo_standard-servo'] = "Standard Servo";
toolbox_label['category_servo_cr-servo'] = "CR Servo";
toolbox_label['category_robot'] = "Robot";
toolbox_label['category_robot_activitybot'] = "ActivityBot";
toolbox_label['category_robot_servo-diff-drive'] = "Servo Differential Drive";
toolbox_label['category_hackable-electronic-badge'] = "Hackable Electronic Badge";
toolbox_label['category_hackable-electronic-badge_led_control'] = "LED Control";
toolbox_label['category_hackable-electronic-badge_oled'] = "Display";
toolbox_label['category_hackable-electronic-badge_ir-communication'] = "IR Communication";
toolbox_label['category_hackable-electronic-badge_eeprom'] = "Memory";
toolbox_label['category_hackable-electronic-badge_accelerometer'] = "Accelerometer";
toolbox_label['category_hackable-electronic-badge_touchpad-control'] = "Touchpad Control";
toolbox_label['category_hackable-electronic-badge_text-to-speech'] = "Text to Speech";
toolbox_label['category_functions'] = "Functions";
toolbox_label['category_variables'] = "Variables";
toolbox_label['category_s3-simple'] = "Simple Scribbler";
toolbox_label['category_s3-simple_simple-control'] = "Simple Control";
toolbox_label['category_s3-simple_simple-sensors'] = "Simple Sensors";
toolbox_label['category_s3-simple_simple-actions'] = "Simple Actions";
toolbox_label['category_s3-math'] = "Math";
toolbox_label['category_sensor-input_s3-line'] = "Line";
toolbox_label['category_sensor-input_s3-obstacle'] = "Obstacle";
toolbox_label['category_sensor-input_s3-light'] = "Light";
toolbox_label['category_sensor-input_s3-stall'] = "Stall";
toolbox_label['category_sensor-input_s3-button'] = "Button";
toolbox_label['category_sensor-input_s3-ping'] = "Ping)))";
toolbox_label['category_sensor-input_s3-pins'] = "Pins";
toolbox_label['category_sensor-input_s3-mic'] = "Microphone";
toolbox_label['category_sensor-input_s3-sirc'] = "Sony Remote";
toolbox_label['category_s3-actions'] = "Actions";
toolbox_label['category_s3-actions_motors'] = "Motors";
toolbox_label['category_s3-actions_sound'] = "Sound";
toolbox_label['category_s3-actions_leds'] = "LEDs";
toolbox_label['category_s3-actions_reset'] = "Restore";
toolbox_label['category_s3-hacker-port'] = "Hacker Port";
toolbox_label['category_s3-hacker-port_sensors'] = "Sensors";
toolbox_label['category_s3-hacker-port_pins'] = "Pins";
toolbox_label['category_s3-hacker-port_servo'] = "Servo";

var page_text_label = [];
page_text_label['back'] = "Back";
page_text_label['browser_detection_ms_warning'] = "WARNING: You appear to be using MS Edge or Internet Explorer as your web browser.  BlocklyProp is not currently compatible with these browsers.  Please use Chrome or Firefox instead.";
page_text_label['cancel'] = "Cancel";
page_text_label['client_chrome_run_instructions1'] = "Click the App icon (circle) in the bottom-left corner of the screen:";
page_text_label['client_chrome_run_instructions2'] = "Find the BlocklyProp Launcher app and double-click it:";
page_text_label['client_chrome_run_title'] = "Launching the BlocklyProp Launcher on your Chromebook";
page_text_label['client_macOS_run_instructions1'] = "Find the BlocklyProp Client application by opening a Finder window and clicking &quot;Applications&quot; on the left. Then look for the BlocklyProp Client application and double-click it:";
page_text_label['client_macOS_run_instructions2'] = "You may need to double-click the BlocklyProp icon in the launcher at the bottom of your screen to open its window:";
page_text_label['client_macOS_run_instructions3'] = "Click the &quot;Connect&quot; button:";
page_text_label['client_macOS_run_title'] = "Launching the BlocklyProp Client on your Mac";
page_text_label['client_run_instructions1'] = "If you have already installed the BlocklyProp Client/Launcher application on your computer, you need to open and connect it before you will be able to load programs to your device.";
page_text_label['client_run_instructions2'] = "Once the Client/Launcher is running and connected, you may return to your browser and load programs to your device.";
page_text_label['client_run_step1'] = "Step 1";
page_text_label['client_run_step2'] = "Step 2";
page_text_label['client_run_step3'] = "Step 3";
page_text_label['client_run_step4'] = "Step 4";
page_text_label['client_windows_run_instructions1'] = "Click the Windows (start) icon in the lower-left corner of your screen. Then look for the BlocklyProp Client application inside of the &quot;Parallax Inc&quot; folder:";
page_text_label['client_windows_run_instructions2'] = "You may need to double-click the BlocklyProp icon that appears in your taskbar.";
page_text_label['client_windows_run_instructions3'] = "Click the &quot;Connect&quot; button:";
page_text_label['client_windows_run_title'] = "Launching the BlocklyProp Client on your Windows PC";
page_text_label['clientdownload_client_chromeos_alreadyinstalled'] = "BlocklyProp Launcher is already installed.  Make sure it is open and running.";
page_text_label['clientdownload_client_chromeos_installer'] = "Add to Chrome";
page_text_label['clientdownload_client_macos_installer'] = "MacOS client installer";
page_text_label['clientdownload_client_windows32_installer'] = "Windows 7/8/8.1/10 (32-bit) client installer";
page_text_label['clientdownload_client_windows64_installer'] = "Windows 7/8/8.1/10 (64-bit) client installer";
page_text_label['clientdownload_download_installer'] = "Download the installer";
page_text_label['clientdownload_download_launcher'] = "Install the Launcher App";
page_text_label['clientdownload_instructions'] = "The BlocklyProp Client/Launcher application loads your programs into the Propeller and allows you to have a serial terminal in your browser connected to your Propeller.";
page_text_label['clientdownload_os_menu'] = "Choose a different operating system";
page_text_label['clientdownload_showall'] = "Show clients for all operating systems";
page_text_label['clientdownload_title'] = "BlocklyProp Client/Launcher";

page_text_label['client_unknown'] = "BlocklyProp is unable to determine what version of BlocklyPropClient is installed on your computer.<br>You may need to install or reinstall the BlocklyPropClient.";
page_text_label['client_update_warning'] = "BlocklyProp now recommends BlocklyPropClient version <span class=\"client-required-version\"></span>.<br>You appear to be using BlocklyPropClient version <span class=\"client-your-version\"></span>.<br>Please use the link below to download the newest version of BlocklyPropClient.";
page_text_label['client_update_danger'] = "BlocklyProp now requires BlocklyPropClient version <span class=\"client-required-version\"></span>.<br>You appear to be using BlocklyPropClient version <span class=\"client-your-version\"></span>.<br>You will not be able to load projects to your device until you upgrade your BlocklyPropClient.<br>Please use the link below to download the newest version.";

page_text_label['confirm_do_email'] = "Email:";
page_text_label['confirm_do_error_invalid_combination'] = "Invalid token/email combination";
page_text_label['confirm_do_submit'] = "Confirm";
page_text_label['confirm_do_title'] = "Please confirm";
page_text_label['confirm_do_token'] = "Token:";
page_text_label['confirm_error_requested_too_often'] = "Confirm requested too often";
page_text_label['confirm_error_wrong_authentication_source'] = "Email confirm is not for users using third party authentication sources.";
page_text_label['confirm_request_email'] = "Email:";
page_text_label['confirm_request_submit'] = "Request";
page_text_label['confirm_request_title'] = "Email confirm request";
page_text_label['confirm_requested'] = "Please check your email";
page_text_label['editor_button_append'] = "Append";
page_text_label['editor_button_cancel'] = "Cancel";
page_text_label['editor_button_close'] = "Close";
page_text_label['editor_button_replace'] = "Replace";
page_text_label['editor_clear-workspace'] = "Clear workspace";
page_text_label['editor_client_available'] = "<strong>Select the correct port,</strong> then click <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"15\" style=\"vertical-align: middle;\"><path d=\"M4.4,0 L6.8,0 6.8,7.2 10,7.2 5.6,11.6 1.2,7.2 4.4,7.2 Z\" style=\"stroke:#000;stroke-width:1;fill:#000;\"/></svg> or <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"15\" style=\"vertical-align: middle;\"><path d=\"M4.4,0 L6.8,0 6.8,4.8 10,4.8 5.6,9.2 1.2,4.8 4.4,4.8 Z M0.4,9.6 L10.8,9.6 10.8,11.6 0.4,11.6 Z\" style=\"stroke:#000;stroke-width:1;fill:#000;\"/></svg>.";
page_text_label['editor_client_available_short'] = "<strong>Select the correct port,</strong> then click <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"15\" style=\"vertical-align: middle;\"><path d=\"M4.4,0 L6.8,0 6.8,4.8 10,4.8 5.6,9.2 1.2,4.8 4.4,4.8 Z M0.4,9.6 L10.8,9.6 10.8,11.6 0.4,11.6 Z\" style=\"stroke:#000;stroke-width:1;fill:#000;\"/></svg>.";
page_text_label['editor_client_checking'] = "Looking for BlocklyProp-Client...";
page_text_label['editor_client_not-available'] = "BlocklyProp-Client <b>not found</b>. Click here for instructions.";
page_text_label['editor_client_title'] = "BlocklyProp Client/Launcher";
page_text_label['editor_demo_dialog_continue'] = "Continue demo";
page_text_label['editor_demo_dialog_continue_continuelink'] = "Continue";
page_text_label['editor_demo_dialog_continue_text'] = "Compiling and saving are disabled";
page_text_label['editor_demo_dialog_login'] = "Log in";
page_text_label['editor_demo_dialog_login_loginlink'] = "Log in if you want to start compiling or making changes.";
page_text_label['editor_demo_dialog_login_registerlink'] = "If you don't yet have an account, register.";
page_text_label['editor_demo_dialog_title'] = "You are not logged in";
page_text_label['editor_demonstration_mode_info'] = "<strong>Demo mode:</strong> Log in to use all of BlocklyProp's features.";
page_text_label['editor_demonstration_mode_instructions'] = "Click here to log in or sign up";
page_text_label['editor_download'] = "Download blocks file";
page_text_label['editor_edit-details'] = "Edit Project details";
page_text_label['editor_view-details'] = "View Project details";
page_text_label['editor_find_next'] = "Find Next";
page_text_label['editor_replace'] = "Replace";
page_text_label['editor_newproject_c'] = "Propeller C";
page_text_label['editor_newproject_spin'] = "Scribbler Robot";
page_text_label['editor_newproject_title'] = "New project";
page_text_label['editor_project'] = "Project";
page_text_label['editor_projects_title'] = "Projects";
page_text_label['editor_run_compile'] = "Compile";
page_text_label['editor_run_configure'] = "Configure client";
page_text_label['editor_run_eeprom'] = "Load EEPROM";
page_text_label['editor_run_ram'] = "Load RAM";
page_text_label['editor_run_terminal'] = "Serial terminal";
page_text_label['editor_run_title'] = "Run";
page_text_label['editor_save'] = "Save";
page_text_label['editor_save-as'] = "Save project as";
page_text_label['editor_save-check'] = "Save project reminder";
page_text_label['editor_save-check_warning'] = "It has been <span id=\"save-check-warning-time\"></span> minutes since you last saved your project. Save now?";
page_text_label['editor_saveas_boardtype_warning'] = "<strong>Warning!</strong> You are about to save the blocks from your current project into a project that is for a different board/device.  If the blocks that are in your project are not available for the board/device you selected, the new project may <strong>not work!</strong>";
page_text_label['editor_title_graphing'] = "Graphing";
page_text_label['editor_title_result'] = "Result";
page_text_label['editor_title_terminal'] = "Terminal";
page_text_label['editor_upload'] = "Upload blocks file";
page_text_label['editor_upload_boardtype_warning'] = "<strong>Warning!</strong> You are about to upload a blocks file from a different board/device than you are currently using.  If the blocks you are trying to upload are not available for your current board, uploading this blocks file into your project may <strong>break your project</strong>.  If your project does break after uploading this file - do not save it! Click your browser's refresh button to reload your project.";
page_text_label['editor_upload_notvalid'] = "The selected file is not valid.";
page_text_label['editor_upload_selectfile'] = "Select File";
page_text_label['editor_upload_valid'] = "The selected file appears valid.";
page_text_label['editor_view_blocks'] = "Blocks";
page_text_label['editor_view_c'] = "Propeller C";
page_text_label['editor_view_code'] = "Code";
page_text_label['editor_view_spin'] = "Spin";
page_text_label['editor_view_title'] = "View";
page_text_label['editor_view_xml'] = "XML";
page_text_label['error_generic'] = "A problem occurred";
page_text_label['error_unknownemail'] = "Unknown email";
page_text_label['footer_librarieslink'] = "External libraries";
page_text_label['footer_licenselink'] = "License";
page_text_label['footer_releases'] = "Releases";
page_text_label['help_invalid-path'] = "Invalid help file";
page_text_label['help_link_contest-ideas'] = "http://learn.parallax.com/educators/contest/home";
page_text_label['help_link_educator-resources_activity-board'] = "http://learn.parallax.com";
page_text_label['help_link_educator-resources_activity-bot'] = "http://learn.parallax.com/educators/resource/activitybot-resources";
page_text_label['help_link_educator-resources_badge'] = "http://learn.parallax.com";
page_text_label['help_link_getting-started_ab'] = "http://learn.parallax.com/tutorials/language/blocklyprop/getting-started-blocklyprop";
page_text_label['help_link_getting-started_s3'] = "http://learn.parallax.com/tutorials/robot/scribbler-robot/getting-started-blocklyprop-s3";
page_text_label['help_link_reference_ab'] = "http://learn.parallax.com/support/reference/propeller-blocklyprop-block-reference";
page_text_label['help_link_reference_s3'] = "http://learn.parallax.com/support/reference/scribbler-3-robot-block-reference";
page_text_label['help_link_tutorials_activity-board'] = "http://learn.parallax.com/tutorials/language/blocklyprop";
page_text_label['help_link_tutorials_activity-bot'] = "http://learn.parallax.com/tutorials/activitybot";
page_text_label['help_link_tutorials_badge'] = "http://learn.parallax.com";
page_text_label['help_link_tutorials_s3'] = "http://learn.parallax.com/tutorials/robot/scribbler-robot/scribbler-3";
page_text_label['help_menu_blocklyprop'] = "BlocklyProp";
page_text_label['help_menu_blocks'] = "Blocks";
page_text_label['help_menu_languagereference'] = "Language reference";
page_text_label['help_not-found'] = "Help file not found";
page_text_label['help_search'] = "Search";
page_text_label['help_search_no-results'] = "No results";
page_text_label['help_search_results'] = "Search results";
page_text_label['help_search_submit'] = "Search";
page_text_label['help_text_contest-ideas'] = "Contest Ideas";
page_text_label['help_text_educator-resources'] = "Educator resources";
page_text_label['help_text_getting-started'] = "Getting started";
page_text_label['help_text_reference'] = "Block reference";
page_text_label['help_text_tutorials'] = "Tutorials and projects";
page_text_label['help_title'] = "Help";
page_text_label['help_title_activity-board'] = "Activity Board";
page_text_label['help_title_activity-bot'] = "Activity Bot";
page_text_label['help_title_badge'] = "Hackable Badge";
page_text_label['help_title_flip'] = "Propeller FLiP";
page_text_label['help_title_s3'] = "Scribbler Robot";
page_text_label['home_c_project_newlink'] = "New";
page_text_label['home_c_project_title'] = "C Project";
page_text_label['home_latest_projects_title'] = "Latest projects";
page_text_label['home_page_banner_slug'] = "Making amazing projects and learning to code just became easier";
page_text_label['home_page_banner_title'] = "Blockly for Propeller Multicore:";
page_text_label['home_page_product_title'] = "BlocklyProp";
page_text_label['home_spin_project_newlink'] = "New";
page_text_label['home_spin_project_title'] = "S3 Robot Project";
page_text_label['html_content_missing'] = "Content missing";
page_text_label['libraries_browser'] = "Browser Libraries";
page_text_label['libraries_header'] = "BlocklyProp utilizes a whole set of open source libraries, improving stability, compatibility and release times.";
page_text_label['libraries_server'] = "Server Libraries";
page_text_label['libraries_title'] = "Open Source Libraries";
page_text_label['license_copyright_head'] = "Copyright &copy;";
page_text_label['license_copyright_owner'] = "Parallax Inc.";
page_text_label['license_text_part1'] = "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:";
page_text_label['license_text_part2'] = "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.";
page_text_label['license_title'] = "License";
page_text_label['license_type'] = "The MIT License (MIT)";
page_text_label['license_warranty'] = "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
page_text_label['login_email'] = "Email:";
page_text_label['login_failed'] = "Login was unsuccessful";
page_text_label['login_forgotlink'] = "Forgot your password?";
page_text_label['login_notconfirmedlink'] = "Email not yet confirmed?";
page_text_label['login_password'] = "Password:";
page_text_label['login_registerlink'] = "Register a new account";
page_text_label['login_submit'] = "Login";
page_text_label['login_title'] = "Please Log in";
page_text_label['logout'] = "Logout";
page_text_label['menu_community_projects'] = "Community projects";
page_text_label['menu_download_simpleide'] = "Download SimpleIDE files";
page_text_label['menu_help'] = "Help";
page_text_label['menu_code'] = "Code";
page_text_label['menu_blocks'] = "Blocks";
page_text_label['menu_help_reference'] = "Help & Reference";
page_text_label['menu_login_and_register'] = "Login/Register";
page_text_label['menu_my_projects'] = "My projects";
page_text_label['menu_newproject_c'] = "Propeller C";
page_text_label['menu_newproject_spin'] = "Scribbler Robot";
page_text_label['menu_newproject_title'] = "New project";
page_text_label['menu_privacy'] = "Privacy Policy";
page_text_label['menu_product_title'] = "BlocklyProp";
page_text_label['menu_profile'] = "Profile";
page_text_label['menu_public-profile'] = "Public profile";
page_text_label['my_project_list_title'] = "My projects";
page_text_label['not_loggedin_login_loginlink'] = "Login";
page_text_label['not_loggedin_login_registerlink'] = "Register a new account";
page_text_label['not_loggedin_login_title'] = "Log in";
page_text_label['not_loggedin_title'] = "You are not logged in";
page_text_label['not_loggedin_try'] = "Compiling and saving will be disabled";
page_text_label['not_loggedin_try_title'] = "Try";
page_text_label['not_loggedin_try_trylink'] = "Try editor";
page_text_label['not_loggedin_try_viewprojectlink'] = "View project";
page_text_label['oauth_new-user'] = "New user";
page_text_label['oauth_new-user_do_submit'] = "Save";
page_text_label['oauth_new-user_error_screenname'] = "Screen Name already in use";
page_text_label['oauth_new-user_screenname'] = "Screen Name";
page_text_label['oauth_success'] = "User logged in";
page_text_label['password_complexity'] = "The password should be at least 8 characters long";
page_text_label['password_complexity_error'] = "Password is not complex enough";
page_text_label['password_reset_do_confirm_password'] = "Confirm password:";
page_text_label['password_reset_do_email'] = "Email:";
page_text_label['password_reset_do_error_invalid_combination'] = "Invalid token/email combination";
page_text_label['password_reset_do_error_passwords_dont_match'] = "Passwords don't match";
page_text_label['password_reset_do_password'] = "Password:";
page_text_label['password_reset_do_submit'] = "Change";
page_text_label['password_reset_do_title'] = "Do password reset";
page_text_label['password_reset_do_token'] = "Token:";
page_text_label['password_reset_error_requested_too_often'] = "Reset requested too often";
page_text_label['password_reset_error_wrong_authentication_source'] = "Password reset is not for users using third party authentication sources.";
page_text_label['password_reset_request_email'] = "Email:";
page_text_label['password_reset_request_submit'] = "Confirm";
page_text_label['password_reset_request_title'] = "Request password reset";
page_text_label['profile_authentication-source'] = "Authenticated using:";
page_text_label['profile_base_error'] = "Your details could not be changed";
page_text_label['profile_base_error_screenname'] = "Screenname already in use";
page_text_label['profile_base_success'] = "Your details have been changed";
page_text_label['profile_confirm_password'] = "Confirm password:";
page_text_label['profile_email'] = "Email:";
page_text_label['profile_password'] = "Password:";
page_text_label['profile_password_error'] = "Password could not be changed";
page_text_label['profile_password_success'] = "Your password has been changed";
page_text_label['profile_password-confirm_error'] = "Passwords don't match";
page_text_label['profile_screenname'] = "Screenname:";
page_text_label['profile_submit'] = "Confirm";
page_text_label['profile_submit_password'] = "Change password";
page_text_label['profile_title'] = "Profile";
page_text_label['profile_unlock_error'] = "Could not unlock your profile";
page_text_label['profile_unlock_password'] = "Password:";
page_text_label['profile_unlock_submit'] = "Unlock";
page_text_label['profile_unlock_title'] = "Unlock to change";
page_text_label['project_board'] = "Board Type";
page_text_label['project_board_activity-board'] = "Propeller Activity Board WX";
page_text_label['project_board_flip'] = "Propeller FLiP or Project Board";
page_text_label['project_board_heb'] = "Hackable Electronic Badge";
page_text_label['project_board_other'] = "Other Propeller Board";
page_text_label['project_board_propcfile'] = "Propeller C (code-only)";
page_text_label['project_board_s3'] = "Scribbler Robot";
page_text_label['project_changed'] = "Project changes have been saved";
page_text_label['project_clonelink'] = "Clone";
page_text_label['project_create_basic'] = "Basic info";
page_text_label['project_create_basic_title'] = "Basic project info";
page_text_label['project_create_board_type'] = "Board/Device/Project type";
page_text_label['project_create_board_type_select'] = "- board/device/project type -";
page_text_label['project_create_description'] = "Description";
page_text_label['project_create_finishlink'] = "Finish";
page_text_label['project_create_nextlink'] = "Next";
page_text_label['project_create_previouslink'] = "Previous";
page_text_label['project_create_project_name'] = "Project name";
page_text_label['project_create_sharing'] = "Sharing";
page_text_label['project_create_sharing_title'] = "Project sharing";
page_text_label['project_create_title'] = "New project";
page_text_label['project_created'] = "Created On";
page_text_label['project_created'] = "Created";
page_text_label['project_delete_confirm'] = "Are you sure you want to delete this project?";
page_text_label['project_delete_confirm_shared'] = "Are you sure you want to delete this project? You have it currently shared using a link.";
page_text_label['project_delete_confirm_title'] = "Confirm delete";
page_text_label['project_deletelink'] = "Delete";
page_text_label['project_description'] = "Description";
page_text_label['project_details_title'] = "Project details";
page_text_label['project_list_title'] = "Community projects";
page_text_label['project_modified'] = "Last Modified";
page_text_label['project_modified'] = "Modified";
page_text_label['project_name'] = "Project Name";
page_text_label['project_saveaslink'] = "Save As";
page_text_label['project_savelink'] = "Save";
page_text_label['project_share-link'] = "Share project using link";
page_text_label['project_sharing'] = "Sharing";
page_text_label['project_sharing_private'] = "Private";
page_text_label['project_sharing_shared'] = "Shared";
page_text_label['project_sharing_tooltip_private'] = "Hide project from other users";
page_text_label['project_sharing_tooltip_shared'] = "Make project visible to other users";
page_text_label['project_table_board'] = "Board";
page_text_label['project_table_description'] = "Description";
page_text_label['project_table_name'] = "Name";
page_text_label['project_table_user'] = "User";
page_text_label['project_title'] = "Project";
page_text_label['project_user'] = "User Screen Name";
page_text_label['project_viewcode'] = "View project code";
page_text_label['public-profile_friends'] = "Friends";
page_text_label['public-profile_nav_profile'] = "Profile";
page_text_label['public-profile_nav_projects'] = "Projects";
page_text_label['public-profile_projects'] = "Projects";
page_text_label['public-profile_title'] = "User profile";
page_text_label['register_do_birth_month'] = "Birth Month:";
page_text_label['register_do_birth_year'] = "Birth Year:";
page_text_label['register_do_confirm_password'] = "Confirm password:";
page_text_label['register_do_coppa_msg0'] = "Why are we asking?";
page_text_label['register_do_coppa_msg1'] = "To protect your privacy, especially if you are one of our younger users, US COPPA regulations require that we determine your age. More information is available";
page_text_label['register_do_coppa_msg2'] = "here";
page_text_label['register_do_email'] = "Email:";
page_text_label['register_do_password'] = "Password:";
page_text_label['register_do_screenname'] = "Screen name:";
page_text_label['register_do_sponsor_email'] = "Alternate contact email:";
page_text_label['register_do_sponsor_emailtype'] = "Select one:";
page_text_label['register_do_submit'] = "Register";
page_text_label['register_do_title'] = "Register";
page_text_label['register_done_text'] = "Please check your email to confirm your email account.";
page_text_label['register_done_title'] = "Registration successful";
page_text_label['register_error_birth_month_not_selected'] = "Please select the month of your birthday";
page_text_label['register_error_birth_year_not_selected'] = "Please select the year of your birthday";
page_text_label['register_error_email_already_used'] = "Email already used";
page_text_label['register_error_email_format_error'] = "The email address is not formatted correctly";
page_text_label['register_error_generic'] = "Something has gone wrong while registering your account. Support has been notified.";
page_text_label['register_error_missing_fields'] = "All fields must be completed";
page_text_label['register_error_password_confirm_empty'] = "Please enter your password twice to ensure it matches";
page_text_label['register_error_password_empty'] = "Please provide a password to secure your account";
page_text_label['register_error_passwords_dont_match'] = "Passwords don't match";
page_text_label['register_error_screenname_empty'] = "Please enter a screen name";
page_text_label['register_error_screenname_used'] = "Screen name already in use";
page_text_label['register_error_sponsor_email_empty'] = "Please enter a sponsor email address. Ask a parent or teacher if you can use their email address";
page_text_label['register_error_sponsor_email_format_error'] = "The sponsor email address is not formatted correctly";
page_text_label['register_error_user_email_empty'] = "Please enter your email address";

var tooltip_text = [
    ['prop-btn-comp','Verify code (compile)'],
    ['prop-btn-ram','Run once (load code to RAM)'],
    ['prop-btn-eeprom','Load and run (save code to EEPROM)'],
    ['prop-btn-term','Open Serial Terminal'],
    ['prop-btn-graph','Open Graphing Output'],
    ['prop-btn-find-replace','Find/Replace'],
    ['prop-btn-pretty','Beautify Code'],
    ['prop-btn-undo','Undo'],
    ['prop-btn-redo','Redo'],
    ['btn-graph-play','Pause/Resume the graph'],
    ['btn-graph-snapshot','Download a snapshot of the graph'],
    ['btn-graph-csv','Download graph data as CSV'],
    ['btn-graph-clear','Clear the graph'],
    ['project-form-shared', 'Make project visible to other users'],
    ['project-form-private', 'Hide project from other users']
    ['project-form-edit-shared', 'Make project visible to other users'],
    ['project-form-edit-private', 'Hide project from other users']
];

// Insert the text strings (internationalization) once the page has loaded
$(document).ready(function () {
    
    // insert into <span> tags
    $(".keyed-lang-string").each(function () {
        var span_tag = $(this);
        
        // Set the text of the label spans
        var pageLabel = span_tag.attr('key');
        if (pageLabel) {
            if (span_tag.is('a')) {
                span_tag.attr('href', page_text_label[pageLabel]);
            } else if (span_tag.is('input')) {
                span_tag.attr('value', page_text_label[pageLabel]);
            } else {
                span_tag.html(page_text_label[pageLabel]);
            }
        }
    });
    
    // insert into button/link tooltips
    for (var i = 0; i < tooltip_text.length; i++) {
        if (tooltip_text[i] && document.getElementById(tooltip_text[i][0])) {
            $('#' + tooltip_text[i][0]).attr('title', tooltip_text[i][1]);
        }
    }
});
