<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta charset="utf-8">
        <title>Blockly</title>

        <script type="text/javascript" src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/polyfill.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/toolboxfilter.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/apps/blockly_compressed.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/en/_messages.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc.js"/>"></script>

        <!-- define blocks -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/base.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/control.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/variables.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/procedures.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/gpio.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/communicate.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/sensors.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/heb.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/s3.js"/>"></script>
        
        <!-- Currently Unused -->  
<!--    <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/pressure.js"/>"></script>   -->
<!--    <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/sd_card.js"/>"></script>   -->
<!--    <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/file.js"/>"></script>   -->

        <style>
            html, body {
                background-color: #fff;
                margin: 0;
                padding:0;
                overflow: hidden;
            }
            .blocklySvg {
                height: 100%;
                width: 100%;
            }
            .blocklyMinimalBody {
                height: 64px;
            }
        </style>
        <script>
            function init(profileName, peripherals) {
                filterToolbox(profileName, peripherals);
                Blockly.inject(document.body, {toolbox: document.getElementById('toolbox'), trashcan: true, media: '<url:getUrl url="/cdn/blockly/media/"/>', path: '<url:getUrl url="/cdn/blockly/"/>', comments: false}); // path: '/' ,
                if (window.parent.init) {
                    // Let the top-level application know that Blockly is ready.
                    window.parent.init(Blockly);
                } else {
                    // Attempt to diagnose the problem.
                    var msg = 'Error: Unable to communicate between frames.\n\n';
                    if (window.parent === window) {
                        msg += 'Try loading index.html instead of frame.html';
                    } else if (window.location.protocol === 'file:') {
                        msg += 'This may be due to a security restriction preventing\n' +
                                'access when using the file:// protocol.\n' +
                                'http://code.google.com/p/chromium/issues/detail?id=47416';
                    }
                    alert(msg);
                }
            }
            function load(xmlText) {
                var xmlDom = Blockly.Xml.textToDom(xmlText);
                Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
            }
            function ready() {
                if (window.parent.blocklyReady) {
                    // Let the top-level application know that the frame is ready.
                    window.parent.blocklyReady();
                }
            }
            function getXml() {
                var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
                return Blockly.Xml.domToText(xml);
            }
        </script>
    </head>
    <body  onload="ready()" >
    <xml id="toolbox" style="display: none">
        <category name="<fmt:message key="category.control" />" exclude="s3" colour="220">
            <block type="comment"></block>
            <block type="controls_if"></block>
            <block type="controls_repeat">
                <mutation TYPE="FOREVER"></mutation>
            </block>
            <block type="control_repeat_for_loop">
                <value name="START">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="END">
                    <block type="math_number">
                        <field name="NUM">10</field>
                    </block>
                </value>
                <value name="STEP">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
            </block>
            <block type="controls_break"></block>
            <block type="base_delay">
                <value name="DELAY_TIME">
                    <block type="math_number">
                        <field name="NUM">1000</field>
                    </block>
                </value>
            </block>
            <block type="cog_new"></block>
            <block type="controls_return"></block>
        </category>
        <category name="<fmt:message key="category.operators" />" exclude="s3" colour="275">
            <category name="<fmt:message key="category.operators.numbers" />" >
                <block type="math_arithmetic"></block>
                <block type="math_limit"></block>
                <block type="math_crement"></block>
                <block type="math_random">
                    <value name="A">
                        <block type="math_number">
                            <field name="NUM">1</field>
                        </block>
                    </value>
                    <value name="B">
                         <block type="math_number">
                            <field name="NUM">100</field>
                        </block>
                    </value> 
                </block>  
                <block type="math_bitwise"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_compare"></block> 
            </category>
            <category name="<fmt:message key="category.operators.strings" />" >
                <block type="string_compare"></block>
                <block type="string_length"></block>
                <block type="combine_strings"></block>
                <block type="find_substring"></block>
                <block type="get_char_at_position">
                    <value name="POSITION">
                        <block type="math_number">
                            <field name="NUM">1</field>
                        </block>
                    </value>
                </block>
                <block type="set_char_at_position">
                    <value name="POSITION">
                        <block type="math_number">
                            <field name="NUM">1</field>
                        </block>
                    </value>
                </block>
                <block type="get_substring">
                    <value name="START">
                        <block type="math_number">
                            <field name="NUM">1</field>
                        </block>
                    </value>
                    <value name="END">
                        <block type="math_number">
                            <field name="NUM">3</field>
                        </block>
                    </value>
                </block>
            </category>            
        </category>
        <sep></sep>
        <category name="<fmt:message key="category.values" />" exclude="s3" colour="220">
            <block type="math_number"></block>
            <block type="string_type_block"></block>
            <block type="char_type_block"></block>            
            <block type="logic_boolean"></block>
            <block type="high_low_value"></block>
            <block type="color_picker"></block>
            <block type="color_value_from">
                <value name="RED_VALUE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="GREEN_VALUE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="BLUE_VALUE">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
            <block type="get_channel_from">
                <value name="COLOR">
                    <block type="color_picker"></block>
                </value>
            </block>
            <block type="compare_colors">
                <value name="COLOR1">
                    <block type="color_picker"></block>
                </value>
                <value name="COLOR2">
                    <block type="color_picker"></block>
                </value>
            </block>
            <block type="system_counter"></block>
        </category>
            
        <category name="<fmt:message key="category.s3-simple" />" include="s3" exclude="heb, activity-board" colour=185>
            <category name="<fmt:message key="category.s3-simple.simple-control" />" colour=205>
                <block type="scribbler_loop"></block>
                <block type="scribbler_limited_loop">
                    <value name="LOOP_COUNT">
                        <block type="spin_integer">
                            <field name="INT_VALUE">10</field>
                        </block>
                    </value>
                </block>
                <block type="scribbler_exit_loop"></block>
                <block type="scribbler_simple_wait">
                    <field name="WAITTIME">5</field>
                </block>
            </category>
            <category name="<fmt:message key="category.s3-simple.simple-sensors" />" colour=140>
                <block type="scribbler_if_line"></block>
                <block type="scribbler_if_obstacle"></block>
                <block type="scribbler_if_light"></block>
                <block type="scribbler_if_stalled"></block>
                <block type="scribbler_if_random"></block>
            </category>
            <category name="<fmt:message key="category.s3-simple.simple-actions" />" colour=185>
                <block type="scribbler_drive">
                    <field name="DRIVE_ANGLE">STRAIGHT</field>
                </block>
                <block type="scribbler_spin"></block>
                <block type="scribbler_stop"></block>
                <block type="scribbler_play">
                    <field name="NOTE_DURATION">250</field>
                    <field name="NOTE_OCTAVE">4</field>
                    <field name="NOTE_FREQUENCY">4186</field>
                    <field name="NOTE_VOLUME">50</field>
                </block>
                <block type="scribbler_LED"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.control" />" include="s3" exclude="heb, activity-board" colour=205>
            <block type="controls_repeat">
                <mutation TYPE="FOREVER"></mutation>
            </block>
            <block type="controls_if"></block>
            <block type="scribbler_wait">
                <value name="WAITTIME">
                    <block type="spin_integer">
                        <field name="INT_VALUE">500</field>
                    </block>
                </value>
                <field name="TIMESCALE">1000</field>
            </block>
            <block type="spin_comment"></block>
        </category>

            
        <category name="<fmt:message key="category.variables" />" custom="VARIABLE" colour="260"></category>
        <category name="<fmt:message key="category.functions" />" custom="PROCEDURE" colour="240"></category>
        <category name="<fmt:message key="category.input-output.pin-states" />" exclude="s3" colour="200">
            <block type="make_pin"></block>
            <block type="make_pin_input">
                <value name="PIN">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
            <block type="check_pin"></block>
            <block type="check_pin_input">
                <value name="PIN">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
            <block type="set_pins"></block>
        </category>
        <category name="<fmt:message key="category.communicate" />" include="activity-board" exclude="heb, s3" colour="320">
            <category name="<fmt:message key="category.communicate.oled" />">
                <block type="oled_initialize"></block>
                <block type="oled_font_loader"></block>
                <block type="oled_get_max_height"></block>
                <block type="oled_get_max_width"></block>
                <block type="oled_clear_screen"></block>
                <block type="oled_text_color">
                    <value name="FONT_COLOR">
                        <block type="color_picker"></block>
                    </value>
                    <value name="BACKGROUND_COLOR">
                        <block type="color_picker"></block>
                    </value>
                </block>
                <block type="oled_text_size"></block>
                <block type="oled_set_cursor">
                    <value name="X_POS">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="Y_POS">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="oled_print_text">
                    <value name="MESSAGE">
                        <block type="string_type_block"></block>
                    </value>
                </block>
                <block type="oled_print_number">
                    <value name="NUMIN">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="oled_draw_pixel">
                    <value name="X_AXIS">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="Y_AXIS">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="COLOR">
                        <block type="color_picker"></block>
                    </value>
                </block>
                <block type="oled_draw_line">
                    <value name="X_ONE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="Y_ONE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="X_TWO">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="Y_TWO">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="COLOR">
                        <block type="color_picker"></block>
                    </value>
                </block>
                <block type="oled_draw_triangle">
                    <value name="POINT_X0">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="POINT_Y0">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="POINT_X1">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="POINT_Y1">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="POINT_X2">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="POINT_Y2">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="COLOR">
                        <block type="color_picker"></block>
                    </value>
                </block>
                <block type="oled_draw_rectangle">
                    <value name="POINT_X">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="POINT_Y">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="RECT_WIDTH">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="RECT_HEIGHT">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="RECT_ROUND">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="COLOR">
                        <block type="color_picker"></block>
                    </value>
                </block>
                <block type="oled_draw_circle">
                    <value name="POINT_X">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="POINT_Y">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="RADIUS">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="COLOR">
                        <block type="color_picker"></block>
                    </value>
                </block>
            </category>
            <category name="<fmt:message key="category.communicate.protocols" />">
                <block type="serial_open"></block>
                <block type="serial_tx"></block>
                <block type="serial_send_text"></block>
                <block type="serial_rx"></block>
                <block type="serial_receive_text"></block>
            </category>
            <category name="<fmt:message key="category.communicate.WS2812B" />">
                <block type="ws2812b_init"></block>
                <block type="ws2812b_set">
                    <value name="LED">
                        <block type="math_number">
                            <field name="NUM">1</field>
                        </block>
                    </value>
                    <value name="COLOR">
                        <block type="color_picker"></block>
                    </value>
                </block>
                <block type="ws2812b_update"></block>
            </category>
            <category name="<fmt:message key="category.communicate.serial-lcd" />">
                <block type="debug_lcd_init"></block>
                <block type="debug_lcd_print">
                    <value name="MESSAGE">
                        <block type="string_type_block"></block>
                    </value>
                </block>
                <block type="debug_lcd_number">
                    <value name="VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="debug_lcd_action"></block>
                <block type="debug_lcd_set_cursor"></block>
                <block type="debug_lcd_music_note"></block>
            </category>
            <category name="<fmt:message key="category.communicate.serial-terminal" />">
                <block type="console_print">
                    <value name="MESSAGE">
                        <block type="string_type_block"></block>
                    </value>
                </block>
                <block type="console_print_variables">
                    <value name="VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="console_scan_text"></block>
                <block type="console_scan_number"></block>
                <block type="console_newline"></block>
                <block type="console_clear"></block>
                <block type="console_move_to_position">
                    <value name="ROW">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="COLUMN">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>
            <category name="<fmt:message key="category.communicate.xbee" />">
                <block type="xbee_setup"></block>
                <block type="xbee_transmit"></block>
                <block type="xbee_receive"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.sensor-input" />" include="activity-board" exclude="heb, s3" colour="155">
            <category name="<fmt:message key="category.sensor-input.2axis-joystick" />">
                <block type="joystick_input_xaxis"></block>
                <block type="joystick_input_yaxis"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.colorpal" />">
                <block type="colorpal_enable"></block>
                <block type="colorpal_get_colors_raw"></block>
                <block type="colorpal_get_colors"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.ping" />">
                <block type="sensor_ping"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.hmc5883l" />">
                <block type="HMC5883L_init"></block>
                <block type="HMC5883L_read"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.LSM9DS1" />">
                <block type="lsm9ds1_init"></block>
                <block type="lsm9ds1_read"></block>
                <block type="lsm9ds1_tilt"></block>
                <block type="lsm9ds1_heading"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.memsic-2axis" />">
                <block type="MX2125_acceleration_xaxis"></block>
                <block type="MX2125_acceleration_yaxis"></block>
                <block type="MX2125_rotation"></block>
                <block type="MX2125_tilt_xaxis"></block>
                <block type="MX2125_tilt_yaxis"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.mma7455" />">
                <block type="MMA7455_init"></block>
                <block type="MMA7455_acceleration"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.pir" />">
                <block type="PIR_Sensor"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.rfid" />">
                <block type="rfid_enable"></block>
                <block type="rfid_get"></block>
                <block type="rfid_disable"></block>
                <block type="rfid_close"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.sony-remote" />">
                <block type="sirc_get"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.sound-impact-sensor" />">
                <block type="sound_impact_run"></block>
                <block type="sound_impact_get"></block>
                <block type="sound_impact_end"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.memory" />" include="activity-board" exclude="s3" colour="155">
            <category name="<fmt:message key="category.memory.eeprom" />">
                <block type="eeprom_read">
                    <value name="ADDRESS">
                        <block type="math_number">
                                <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="eeprom_write">
                    <value name="ADDRESS">
                        <block type="math_number">
                                <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>
<%--        <category name="<fmt:message key="category.memory.sdcard" />">
                <block type="sd_card_mount"></block>
                <block type="sd_card_int_to">
                    <value name="STARTING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="ENDING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_int_from">
                    <value name="STARTING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="ENDING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_read_int">
                    <value name="INDEX">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_float_to">
                    <value name="STARTING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="ENDING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_float_from">
                    <value name="STARTING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="ENDING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_read_float">
                    <value name="INDEX">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_text_to">
                    <value name="STARTING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="ENDING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_text_from">
                    <value name="STARTING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="ENDING_POINT_VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="sd_card_read_text">
                    <value name="INDEX">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>                   --%>
        </category>
        <category name="<fmt:message key="category.analog-pulses" />" exclude="s3" colour="200">
            <category name="<fmt:message key="category.analog-pulses.pulse-in-out" />" exclude="s3">
                <block type="pulse_in"></block>
                <block type="pulse_out">
                    <value name="PULSE_LENGTH">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>
            <category name="<fmt:message key="category.analog-pulses.pwm" />" exclude="s3">
                <block type="pwm_start"></block>
                <block type="pwm_set">
                    <value name="DUTY_CYCLE">
                        <block type="math_number">
                            <field name="NUM">50</field>
                        </block>
                    </value>
                </block>
                <block type="pwm_stop"></block>
            </category>
            <category name="<fmt:message key="category.analog-pulses.rc" />" exclude="s3">
                <block type="rc_charge_discharge"></block>
            </category>
            <category name="<fmt:message key="category.analog-pulses.voltage" />" include="activity-board">
                <block type="ab_volt_in"></block>
                <block type="ab_volt_out">
                    <value name="VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>
        </category>
        <category name="<fmt:message key="category.audio" />" include="activity-board, heb" exclude="s3" colour="200">
            <category name="<fmt:message key="category.audio.freqout" />" include="activity-board, heb" exclude="s3">
                <block type="base_freqout">
                    <value name="DURATION">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="FREQUENCY">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>
            <category name="<fmt:message key="category.audio.audio" />" include="activity-board" exclude="heb, s3">
                <block type="wav_play"></block>
                <block type="wav_status"></block>
                <block type="wav_volume">
                    <value name="VOLUME">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="wav_stop"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.servo" />" include="activity-board, heb" exclude="s3" colour="180">
            <category name="<fmt:message key="category.servo.standard-servo" />">
                <block type="servo_move">
                    <value name="ANGLE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>
            <category name="<fmt:message key="category.servo.cr-servo" />">
                <block type="servo_speed">
                    <value name="SPEED">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="servo_set_ramp">
                    <value name="RAMPSTEP">
                        <block type="math_number">
                            <field name="NUM">50</field>
                        </block>
                    </value>
                </block>
            </category>
        </category>
        <category name="<fmt:message key="category.robot" />"  include="activity-board" exclude="heb, s3" colour="295">
            <block type="ab_drive_init"></block>
            <block type="ab_drive_speed">
                <value name="LEFT">
                    <block type="math_number">
                        <field name="NUM">64</field>
                    </block>
                </value>
                <value name="RIGHT">
                    <block type="math_number">
                        <field name="NUM">64</field>
                    </block>
                </value>
            </block>
            <block type="ab_drive_goto">
                <value name="LEFT">
                    <block type="math_number">
                        <field name="NUM">64</field>
                    </block>
                </value>
                <value name="RIGHT">
                    <block type="math_number">
                        <field name="NUM">64</field>
                    </block>
                </value>
            </block>
            <block type="ab_drive_stop"></block>
            <block type="activitybot_calibrate"></block>
            <block type="activitybot_display_calibration"></block>
        </category>
        <category name="<fmt:message key="category.hackable-electronic-badge" />" include="heb" exclude="s3, activity-board" colour="290">
            <category name="<fmt:message key="category.communicate.serial-terminal" />">
                <block type="console_print">
                    <value name="MESSAGE">
                        <block type="string_type_block"></block>
                    </value>
                </block>
                <block type="console_print_variables">
                    <value name="VALUE">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
                <block type="console_scan_text"></block>
                <block type="console_scan_number"></block>
                <block type="console_newline"></block>
                <block type="console_clear"></block>
                <block type="console_move_to_position">
                    <value name="ROW">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="COLUMN">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                </block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.led_control" />">
                <block type="heb_toggle_led"></block>
                <block type="heb_toggle_led_open">
                    <value name="LED_NUM">
                        <block type="math_number">
                            <field name="NUM">0</field>
                        </block>
                    </value>
                    <value name="LED_STATE">
                        <block type="high_low_value">
                            <field name="VALUE">high</field>
                        </block>
                    </value>
                </block>
                <block type="heb_set_led_rgb"></block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.oled" />">
                <block type="heb_print_numeric_var"></block>
                <block type="heb_print_string_var">
                    <value name="VALUE">
                        <block type="string_type_block">
                            <field name="TEXT">Hello</field>
                        </block>
                    </value>
                </block>
                <block type="heb_cursor_position_large"></block>
                <block type="heb_cursor_position_small"></block>
                <block type="heb_clear_screen"></block>
                <block type="heb_rotate"></block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.ir-communication" />">
                <block type="heb_ir_send_signal"></block>
                <block type="heb_ir_read_signal"></block>
                <block type="heb_ir_clear_buffer"></block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.eeprom" />">
                <block type="heb_badge_eeprom_store"></block>
                <block type="heb_badge_eeprom_is_stored"></block>
                <block type="heb_badge_eeprom_retrieve"></block>
                <block type="heb_count_contacts"></block>
                <block type="heb_erase_all_contacts"></block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.accelerometer" />">
                <block type="heb_badge_axis_acceleration"></block>
                <block type="heb_badge_was_shaken"></block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.touchpad-control" />">
                <block type="heb_touchpad_status"></block>
            </category>
        </category>
        
        <category name="<fmt:message key="category.s3-math" />" include="s3" exclude="heb, activity-board" colour=275>
            <block type="spin_integer"></block>
            <block type="math_int_angle"></block>
            <block type="scribbler_boolean"></block>
            <block type="scribbler_random_boolean"></block>
            <block type="scribbler_random_number">
                <value name="LOW">
                    <block type="spin_integer">
                        <field name="INT_VALUE">1</field>
                    </block>
                </value>
                <value name="HIGH">
                    <block type="spin_integer">
                        <field name="INT_VALUE">10</field>
                    </block>
                </value>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_limit"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_compare"></block>
        </category>
        <category name="<fmt:message key="category.sensor-input" />" include="s3" exclude="heb, activity-board" colour=140>
            <category name="<fmt:message key="category.sensor-input.s3-line" />">
                <block type="scribbler_if_line"></block>
                <block type="line_sensor"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.s3-obstacle" />">
                <block type="scribbler_if_obstacle"></block>
                <block type="obstacle_sensor"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.s3-light" />">
                <block type="scribbler_if_light"></block>
                <block type="light_sensor"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.s3-stall" />">
                <block type="scribbler_if_stalled"></block>
                <block type="stall_sensor"></block>
                <block type="spinning_sensor"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.s3-button" />">
                <block type="reset_button_presses"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.s3-ping" />">
                <block type="scribbler_ping"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.s3-pins" />">
                <block type="digital_input"></block>
                <block type="analog_input"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.s3-actions" />" include="s3" exclude="heb, activity-board" colour=185>
            <block type="digital_output"></block>
            <category name="<fmt:message key="category.s3-actions.motors" />">
                <block type="scribbler_drive">
                    <field name="DRIVE_ANGLE">STRAIGHT</field>
                </block>
                <block type="scribbler_spin"></block>
                <block type="scribbler_stop"></block>
                <block type="move_motors">
                    <value name="LEFT_MOTOR_SPEED">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="RIGHT_MOTOR_SPEED">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="MOTOR_DURATION">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="move_motors_distance">
                    <value name="LEFT_MOTOR_DISTANCE">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="RIGHT_MOTOR_DISTANCE">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="MOTOR_SPEED">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="move_motors_xy">
                    <value name="X_DISTANCE">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="Y_DISTANCE">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="MOTOR_SPEED">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="move_motors_angle">
                    <value name="ROTATE_ANGLE">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="ROTATE_RADIUS">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="ROTATE_SPEED">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="scribbler_servo">
                    <value name="SERVO_ANGLE">
                        <block type="spin_integer">
                            <field name="ANGLE_VALUE">90</field>
                        </block>
                    </value>
		</block>
                <block type="scribbler_stop_servo"></block>
            </category>
            <category name="<fmt:message key="category.s3-actions.sound" />" include="s3" exclude="heb, activity-board">
                <block type="scribbler_play">
                    <field name="NOTE_DURATION">250</field>
                    <field name="NOTE_OCTAVE">4</field>
                    <field name="NOTE_FREQUENCY">4186</field>
                    <field name="NOTE_VOLUME">50</field>
                </block>
                <block type="play_polyphony">
                    <value name="FREQUENCY_1">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="FREQUENCY_2">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="POLYPHONY_DURATION">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="POLYPHONY_VOLUME">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
            </category>
            <category name="<fmt:message key="category.s3-actions.leds" />" include="s3" exclude="heb, activity-board">
                <block type="scribbler_LED"></block>
            </category>
            <category name="<fmt:message key="category.communicate" />" include="s3" exclude="heb, activity-board">
            
                <block type="scribbler_serial_send_text"></block>
                <block type="scribbler_serial_send_decimal"></block>
                <block type="scribbler_serial_send_char"></block>
                <block type="scribbler_serial_send_ctrl"></block>
                <block type="scribbler_serial_cursor_xy">
                    <value name="X">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="Y">
                        <block type="spin_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="scribbler_serial_rx_byte"></block>

            </category>
            <category name="<fmt:message key="category.s3-actions.reset" />" include="s3" exclude="heb, activity-board">
                <block type="factory_reset"></block>
            </category>
        </category>

    </xml>
</body>
</html>
