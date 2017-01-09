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
Blockly.Msg.DIALOG_PROJECT_SAVED_TEXT = 'The project has been saved';

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
Blockly.MSG_VALUES_HELPURL = "http://learn.parallax.com/ab-blocks/values";
Blockly.MSG_VARIABLES_HELPURL = "http://learn.parallax.com/ab-blocks/variables";
Blockly.MSG_FUNCTIONS_HELPURL = "http://learn.parallax.com/ab-blocks/functions";
Blockly.MSG_PINS_HELPURL = "http://learn.parallax.com/ab-blocks/pins";
Blockly.MSG_SERIAL_LCD_HELPURL = "http://learn.parallax.com/ab-blocks/serial-lcd";
Blockly.MSG_OLED_HELPURL = "http://learn.parallax.com/ab-blocks/oled";
Blockly.MSG_TERMINAL_HELPURL = "http://learn.parallax.com/ab-blocks/terminal";
Blockly.MSG_PROTOCOLS_HELPURL = "http://learn.parallax.com/ab-blocks/protocols";
Blockly.MSG_XBEE_HELPURL = "http://learn.parallax.com/ab-blocks/xbee";
Blockly.MSG_COMPASS_HELPURL = "http://learn.parallax.com/ab-blocks/compass";
Blockly.MSG_JOYSTICK_HELPURL = "http://learn.parallax.com/ab-blocks/joystick";
Blockly.MSG_MEMSIC_HELPURL = "http://learn.parallax.com/ab-blocks/memsic";
Blockly.MSG_ACCELEROMETER_HELPURL = "http://learn.parallax.com/ab-blocks/accelerometer";
Blockly.MSG_PING_HELPURL = "http://learn.parallax.com/ab-blocks/ping";
Blockly.MSG_PIR_HELPURL = "http://learn.parallax.com/ab-blocks/pir";
Blockly.MSG_RFID_HELPURL = "http://learn.parallax.com/ab-blocks/rfid";
Blockly.MSG_SONY_REMOTE_HELPURL = "http://learn.parallax.com/ab-blocks/sony-remote";
Blockly.MSG_SOUND_IMPACT_HELPURL = "http://learn.parallax.com/ab-blocks/sound-impact";
Blockly.MSG_COLORPAL_HELPURL = "http://learn.parallax.com/ab-blocks/colorpal";
Blockly.MSG_EEPROM_HELPURL = "http://learn.parallax.com/ab-blocks/memory";
Blockly.MSG_ANALOG_PINS_HELPURL = "http://learn.parallax.com/ab-blocks/analog-pins";
Blockly.MSG_ANALOG_PWM_HELPURL = "http://learn.parallax.com/ab-blocks/pwm";
Blockly.MSG_ANALOG_PULSE_IN_OUT_HELPURL = "http://learn.parallax.com/ab-blocks/pulsein-out";
Blockly.MSG_ANALOG_RC_TIME_HELPURL = "http://learn.parallax.com/ab-blocks/rc-time";
Blockly.MSG_AUDIO_HELPURL = "http://learn.parallax.com/ab-blocks/audio";
Blockly.MSG_SERVO_HELPURL = "http://learn.parallax.com/ab-blocks/servo";
Blockly.MSG_ROBOT_HELPURL = "http://learn.parallax.com/ab-blocks/robot";
Blockly.MSG_IMU_HELPURL = "http://learn.parallax.com/ab-blocks/lsm9ds1";
Blockly.MSG_WS2812B_HELPURL = "http://learn.parallax.com/ab-blocks/ws2812b";


//----------Activity Board (Propeller C) block tooltips ----------------------------
Blockly.MSG_COMMENT_TOOLTIP = "add comment: Leave a note for people that will not affect the program.";
Blockly.MSG_CONTROLS_IF_TOOLTIP = "If...do: when condition attached is true. Click the gear to add conditions.";
Blockly.MSG_CONTROLS_REPEAT_TOOLTIP = "conditional repeat: forever, x times , until, or while attached condition is true.";
Blockly.MSG_CONTROL_REPEAT_FOR_LOOP_TOOLTIP = "repeat item: use variable and value blocks for counted loop.";
Blockly.MSG_CONTROLS_BREAK_TOOLTIP = "break: Exit loop and skip to the next block.";
Blockly.MSG_BASE_DELAY_TOOLTIP = "pause: wait for specified time (in milliseconds) then continue.";
Blockly.MSG_COG_NEW_TOOLTIP = "new processor: launch attached “run function” block if processor is available.";
Blockly.MSG_CONTROLS_RETURN_TOOLTIP = "return: Required at the end of code enclosed in a “define function” block.";
Blockly.MSG_MATH_ARITHMETIC_TOOLTIP = "math operation: + addition, - subtraction, x multiplication, / division, or % modulus.";
Blockly.MSG_MATH_LIMIT_TOOLTIP = "limit: use first value, but if it's outside of second value, use second value instead.";
Blockly.MSG_MATH_CREMENT_TOOLTIP = "de/increment: increase or decrease attached variable by 1.";
Blockly.MSG_MATH_RANDOM_TOOLTIP = "random: Pick random number between the low “from” and high “to” values.";
Blockly.MSG_MATH_BITWISE_TOOLTIP = "bitwise:& AND, | OR, ^ XOR, >> right shift, << left shift.";
Blockly.MSG_LOGIC_OPERATION_TOOLTIP = "boolean comparison: and, or, and not, or not; return 1/true or 0/false.";
Blockly.MSG_LOGIC_NEGATE_TOOLTIP = "not: Get boolean (1/true or 0/false) opposite,\nnegate: get the negative decimal value,\nabs: get the absolute value of.";
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
Blockly.MSG_LOGIC_BOOLEAN_TOOLTIP = "true/false: Choose a value of 1 (true) or 0 (false).";
Blockly.MSG_HIGH_LOW_VALUE_TOOLTIP = "high/low: Choose a value of 1 (high) or 0 (low).";
Blockly.MSG_COLOR_PICKER_TOOLTIP = "color: Get 24-bit integer for color selected in box.";
Blockly.MSG_COLOR_VALUE_FROM_TOOLTIP = "color value from: inserted red, green, and blue values (0 to 255).";
Blockly.MSG_GET_CHANNEL_FROM_TOOLTIP = "get red/green/blue: value (0 to 255) for chosen component of color.";
Blockly.MSG_COMPARE_COLORS_TOOLTIP = "compare colors: returns value from 0 (opposite) to 255 (identical).";
Blockly.MSG_SYSTEM_COUNTER_TOOLTIP = "system counter: 0 to 4,294,967,295 before rolling over.";
Blockly.MSG_VARIABLES_SET_TOOLTIP = "set variable: name and attach initial value block.";
Blockly.MSG_VARIABLES_GET_TOOLTIP = "use variable: choose set variables from dropdown.";
Blockly.MSG_PROCEDURES_DEFNORETURN_TOOLTIP = "define function: group blocks to re-use ending with return; name group.";
Blockly.MSG_PROCEDURES_CALLNORETURN_TOOLTIP = "return: Required at the end of code enclosed in a “define function” block.";
Blockly.MSG_MAKE_PIN_TOOLTIP = "make PIN (dropdown): Select I/O pin and setting with menus.";
Blockly.MSG_MAKE_PIN_INPUT_TOOLTIP = "make PIN (programmable): Select I/O pin with value and setting with menu.";
Blockly.MSG_CHECK_PIN_TOOLTIP = "check PIN (dropdown): Get the state of I/O pin; high = 1, low = 0.";
Blockly.MSG_CHECK_PIN_INPUT_TOOLTIP = "check PIN (programmable): Get state of I/O pin at inserted value; high = 1, low = 0.";
Blockly.MSG_SET_PINS_TOOLTIP = "set multiple pins: define group then set each pin. Do not use on P29-P31.";
Blockly.MSG_DEBUG_LCD_INIT_TOOLTIP = "LCD initialize: set I/O pin to LCD; match baud to LCD switches.";
Blockly.MSG_DEBUG_LCD_PRINT_TOOLTIP = "LCD print text: display on serial LCD.";
Blockly.MSG_DEBUG_LCD_NUMBER_TOOLTIP = "LCD print number: display on serial LCD.";
Blockly.MSG_DEBUG_LCD_ACTION_TOOLTIP = "LCD command: select from dropdown.";
Blockly.MSG_DEBUG_LCD_SET_CURSOR_TOOLTIP = "LCD set cursor: row and column.";
Blockly.MSG_DEBUG_LCD_MUSIC_NOTE_TOOLTIP = "LCD play note: at octave for time set.";
Blockly.MSG_OLED_INITIALIZE_TOOLTIP = "OLED initialize: match to Propeller I/O pin connections.";
Blockly.MSG_OLED_FONT_LOADER_TOOLTIP = "OLED font loader: run alone to add fonts to EEPROM.";
Blockly.MSG_OLED_GET_MAX_HEIGHT_TOOLTIP = "OLED max height";
Blockly.MSG_OLED_GET_MAX_WIDTH_TOOLTIP = "OLED max width";
Blockly.MSG_OLED_CLEAR_SCREEN_TOOLTIP = "OLED clear screen: all pixels go black.";
Blockly.MSG_OLED_TEXT_COLOR_TOOLTIP = "OLED font color: background is transparent if matched to font.";
Blockly.MSG_OLED_TEXT_SIZE_TOOLTIP = "OLED set text: Med, large, script and bubble require font loader.";
Blockly.MSG_OLED_SET_CURSOR_TOOLTIP = "OLED set cursor: 0,0 is top-left corner of display.";
Blockly.MSG_OLED_PRINT_TEXT_TOOLTIP = "OLED print text: send string to display.";
Blockly.MSG_OLED_PRINT_NUMBER_TOOLTIP = "OLED print number: display value as decimal, hex, or binary.";
Blockly.MSG_OLED_DRAW_PIXEL_TOOLTIP = "OLED draw pixel: at x, y from top-left corner.";
Blockly.MSG_OLED_DRAW_LINE_TOOLTIP = "OLED draw line: set start and end points; 0,0 is top-left.";
Blockly.MSG_OLED_DRAW_TRIANGLE_TOOLTIP = "OLED draw triangle: set x,y position of each corner.";
Blockly.MSG_OLED_DRAW_RECTANGLE_TOOLTIP = "OLED draw rectangle: set x,y position of each corner.";
Blockly.MSG_OLED_DRAW_CIRCLE_TOOLTIP = "OLED draw circle: x,y of center point, radius, color, fill. ";
Blockly.MSG_CONSOLE_PRINT_TOOLTIP = "Terminal print text: display contents of string block.";
Blockly.MSG_CONSOLE_PRINT_VARIABLES_TOOLTIP = "Terminal print number: display value as decimal, hex, binary, or ASCII.";
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
Blockly.MSG_XBEE_SETUP_TOOLTIP = "XBee initialize: match to Propeller I/O pin connections and XBee Baud rate.";
Blockly.MSG_XBEE_TRANSMIT_TOOLTIP = "XBee transmit: sends information to an XBee.  Strings and numbers are terminated with an ASCII 13";
Blockly.MSG_XBEE_RECEIVE_TOOLTIP = "XBee receive: receives information from an XBee.  Expects strings and numbers to be terminated with an ASCII 13";
Blockly.MSG_WS2812B_INIT_TOOLTIP = "RGB-LED init: match to Propeller I/O pin connections and number of LEDs.";
Blockly.MSG_WS2812B_SET_TOOLTIP = "RGB-LED set: specify color for a specific LED.";
Blockly.MSG_WS2812B_UPDATE_TOOLTIP = "RGB-LED update: update colors of all connected RGB-LEDs.";
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
Blockly.MSG_WAV_PLAY_TOOLTIP = "WAV play: Plays the specified .WAV file stored on the SD card.";
Blockly.MSG_WAV_STATUS_TOOLTIP = "WAV status: returns 1/true if a .WAV file is playing, returns 0/false if not.";
Blockly.MSG_WAV_VOLUME_TOOLTIP = "WAV volume: sets the volume of the WAV player - 0 (quietest) to 10 (loudest).";
Blockly.MSG_WAV_STOP_TOOLTIP = "WAV stop: Stops the WAV player object, frees up resources on the Propeller.";
Blockly.MSG_BASE_FREQOUT_TOOLTIP = "frequency out: sends pulses to the I/O pin at the specified frequency.";
Blockly.MSG_SERVO_MOVE_TOOLTIP = "Standard servo: sets the position of a standard servo connected to the I/O pin.";
Blockly.MSG_SERVO_SPEED_TOOLTIP = "CR servo speed: sets the speed of a continuous rotation servo connected to the I/O pin.";
Blockly.MSG_SERVO_SET_RAMP_TOOLTIP = "CR servo set ramp: sets the amount a servo's speed can change each update cycle.";
Blockly.MSG_ROBOT_DRIVE_INIT_TOOLTIP = "Robot drive init: set up the Robot's drive system on the Propeller";
Blockly.MSG_ROBOT_DRIVE_DISTANCE_TOOLTIP = "Robot drive distance: drives each wheel a specified distance.";
Blockly.MSG_ROBOT_DRIVE_SPEED_TOOLTIP = "Robot drive speed: drives each wheel at a specified speed.";
Blockly.MSG_ROBOT_DRIVE_STOP_TOOLTIP = "Robot drive stop: stops the robot from driving.";
Blockly.MSG_ROBOT_ACTIVITYBOT_CALIBRATE_TOOLTIP = "ActivityBot calibrate: runs the ActivityBot calibration routine.";
Blockly.MSG_ROBOT_ACTIVITYBOT_DISPLAY_CALIBRATION_TOOLTIP = "ActivityBot display calibration: displays the calibration results on the terminal.";
Blockly.MSG_STRING_TO_NUMBER_TOOLTIP = "string to number: convert a number (integer) value to a string.";
Blockly.MSG_NUMBER_TO_STRING_TOOLTIP = "number to string: convert a string representing a number to an integer.";
Blockly.MSG_NUMBER_BINARY_TOOLTIP = "binary value: use to enter a binary number.";
Blockly.MSG_NUMBER_HEX_TOOLTIP = "hexadecimal value: use to enter a hexadecimal number.";
Blockly.MSG_CONSTRAIN_VALUE_TOOLTIP = "constrain value: prevent a value from being too large or too small.";
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
Blockly.MSG_S3_OBSTACLE_HELPURL = "http://learn.parallax.com/s3-blocks/obstacle";
Blockly.MSG_S3_PING_HELPURL = "http://learn.parallax.com/s3-blocks/ping";
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
Blockly.MSG_S3_PROCEDURES_CALLNORETURN_TOOLTIP = "return: Required at the end of code enclosed in a “define function” block.";
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
Blockly.MSG_S3_OBSTACLE_SENSOR_TOOLTIP = "obstacle sensor reading: detection of obstacles from the front sensors";
Blockly.MSG_S3_LIGHT_SENSOR_TOOLTIP = "light sensor reading: measurements of light from the front sensors";
Blockly.MSG_S3_STALL_SENSOR_TOOLTIP = "tail wheel stall: returns true of tail wheel is not spinning";
Blockly.MSG_S3_SPINNING_SENSOR_TOOLTIP = "drive wheel stall: returns true if drive wheels are not spinning but should be";
Blockly.MSG_S3_RESET_BUTTON_PRESSES_TOOLTIP = "button sensor: returns how many times the reset button was pressed";
Blockly.MSG_S3_SCRIBBLER_PING_TOOLTIP = "Ping))) distance: measures distances using a Ping))) sensor attached to the hacker port";
Blockly.MSG_S3_SCRIBBLER_SIRC_TOOLTIP = "Sony Remote value: returns button pressed on remote, returns -1 if none.";
Blockly.MSG_S3_MOVE_MOTORS_TOOLTIP = "motor speed: use to move the Scribbler at specific speeds";
Blockly.MSG_S3_MOVE_MOTORS_DISTANCE_TOOLTIP = "move distance: use to move the Scribbler specific distances";
Blockly.MSG_S3_MOVE_MOTORS_ANGLE_TOOLTIP = "rotate by radius: rotates the scribbler by driving it";
Blockly.MSG_S3_SCRIBBLER_SERVO_TOOLTIP = "rotate Servo: turns a servo connected to the hacker port to a position";
Blockly.MSG_S3_SCRIBBLER_STOP_SERVO_TOOLTIP = "disable Servo: disables a servo connected to the hacker port";
Blockly.MSG_S3_ANALOG_INPUT_TOOLTIP = "analog read pin: Get the voltage input on the specified pin.";
Blockly.MSG_S3_DIGITAL_OUTPUT_TOOLTIP = "digital set pin: Select I/O pin and setting with menus.";
Blockly.MSG_S3_DIGITAL_INPUT_TOOLTIP = "digital read pin: Get the state of I/O pin; high = 1, low = 0.";
Blockly.MSG_S3_PLAY_POLYPHONY_TOOLTIP = "play tone: mix two frequencies set in Hz.";
Blockly.MSG_S3_SERIAL_SEND_TEXT_TOOLTIP = "send message: send text out from the serial port";
Blockly.MSG_S3_SERIAL_SEND_DECIMAL_TOOLTIP = "send number: send a number out from the serial port";
Blockly.MSG_S3_SERIAL_SEND_CHAR_TOOLTIP = "send character: send a character out from the serial port";
Blockly.MSG_S3_SERIAL_SEND_CTRL_TOOLTIP = "send control character: send a special character out from the serial port";
Blockly.MSG_S3_SERIAL_CURSOR_XY_TOOLTIP = "set cursor position: set the cursor position in the terminal";
Blockly.MSG_S3_SERIAL_RX_BYTE_TOOLTIP = "receive character: receieve a character from the serial port";
Blockly.MSG_S3_FACTORY_RESET_TOOLTIP = "factory reset: use to reload the factory default demo program back onto the Scribbler"; 
