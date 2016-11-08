<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta charset="utf-8">
        <title>Blockly</title>

        <script type="text/javascript" src="<url:getCdnUrl url="/lib/jquery-1.11.3.min.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/polyfill.js"/>"></script>

        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/toolboxfilter.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/colorPalette.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/quotes.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/apps/blockly_compressed.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/en/_messages.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin.js"/>"></script>

        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/base.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/servo.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/sensors.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/debug_lcd.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/control.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/logic.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/math.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/PIRSensor.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/bit_math.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/distance.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/pressure.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/TiltandAcceleration.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/variables.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/procedures.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/serial.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/scribbler.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/control.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/pins.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/logic.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/joystick.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/math.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/text.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/lists.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/procedures.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/spin/base.js"/>"></script>

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
                    if (window.parent == window) {
                        msg += 'Try loading index.html instead of frame.html';
                    } else if (window.location.protocol == 'file:') {
                        msg += 'This may be due to a security restriction preventing\n' +
                                'access when using the file:// protocol.\n' +
                                'http://code.google.com/p/chromium/issues/detail?id=47416';
                    }
                    alert(msg);
                }
            }

            function load(xmlText) {
                var xmlDom = Blockly.Xml.textToDom(xmlText)
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
        <category name="Simple Scribbler">
            <category name="Simple Control" colour=205>
                <block type="scribbler_loop"></block>
                <block type="scribbler_limited_loop">
                    <value name="LOOP_COUNT">
                        <block type="math_integer">
                            <field name="INT_VALUE">10</field>
                        </block>
                    </value>
                </block>
                <block type="scribbler_exit_loop"></block>
                <block type="scribbler_simple_wait">
                    <field name="WAITTIME">5</field>
                    <field name="TIMESCALE">10</field>
                </block>
            </category>
            <category name="Simple Sensors" colour=140>
                <block type="scribbler_if_line"></block>
                <block type="scribbler_if_obstacle"></block>
                <block type="scribbler_if_light"></block>
                <block type="scribbler_if_stalled"></block>
                <block type="scribbler_if_random"></block>
            </category>
            <category name="Simple Actions" colour=185>
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
        <category name="Control" colour=205>
            <block type="controls_repeat">
                <mutation TYPE="FOREVER"></mutation>
            </block>
            <block type="controls_if"></block>
            <block type="scribbler_wait">
                <value name="WAITTIME">
                    <block type="math_integer">
                        <field name="INT_VALUE">500</field>
                    </block>
                </value>
                <field name="TIMESCALE">1000</field>
            </block>
            <block type="spin_comment"></block>
        </category>
        <category name="<fmt:message key="category.functions" />" custom="PROCEDURE" colour=225></category>
	<category name="Variables" custom="VARIABLE" colour=250></category>
        <category name="Math" colour=275>
            <block type="spin_integer"></block>
            <block type="math_int_angle"></block>
            <block type="scribbler_boolean"></block>
            <block type="scribbler_random_boolean"></block>
            <block type="scribbler_random_number">
                <value name="LOW">
                    <block type="math_integer">
                        <field name="INT_VALUE">1</field>
                    </block>
                </value>
                <value name="HIGH">
                    <block type="math_integer">
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
        <category name="Sensors" colour=140>
            <category name="Line" colour=140>
                <block type="scribbler_if_line"></block>
                <block type="line_sensor"></block>
            </category>
            <category name="Obstacle" colour=140>
                <block type="scribbler_if_obstacle"></block>
                <block type="obstacle_sensor"></block>
            </category>
            <category name="Light" colour=140>
                <block type="scribbler_if_light"></block>
                <block type="light_sensor"></block>
            </category>
            <category name="Stall" colour=140>
                <block type="scribbler_if_stalled"></block>
                <block type="stall_sensor"></block>
                <block type="spinning_sensor"></block>
            </category>
            <category name="Button" colour=140>
                <block type="reset_button_presses"></block>
            </category>
            <category name="Ping)))" colour=140>
                <block type="scribbler_ping"></block>
            </category>
            <category name="Pins" colour=140>
                <block type="digital_input"></block>
                <block type="analog_input"></block>
            </category>
        </category>
        <category name="Actions" colour=185>
            <category name="Motors" colour=185>
                <block type="scribbler_drive">
                    <field name="DRIVE_ANGLE">STRAIGHT</field>
                </block>
                <block type="scribbler_spin"></block>
                <block type="scribbler_stop"></block>
                <block type="move_motors">
                    <value name="LEFT_MOTOR_SPEED">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="RIGHT_MOTOR_SPEED">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="MOTOR_DURATION">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="move_motors_distance">
                    <value name="LEFT_MOTOR_DISTANCE">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="RIGHT_MOTOR_DISTANCE">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="MOTOR_SPEED">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="move_motors_xy">
                    <value name="X_DISTANCE">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="Y_DISTANCE">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="MOTOR_SPEED">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="move_motors_angle">
                    <value name="ROTATE_ANGLE">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="ROTATE_RADIUS">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="ROTATE_SPEED">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="scribbler_servo">
                    <value name="SERVO_ANGLE">
                        <block type="math_int_angle">
                            <field name="ANGLE_VALUE">90</field>
                        </block>
                    </value>
		</block>
                <block type="scribbler_stop_servo"></block>
            </category>
            <category name="Sound" colour=185>
                <block type="scribbler_play">
                    <field name="NOTE_DURATION">250</field>
                    <field name="NOTE_OCTAVE">4</field>
                    <field name="NOTE_FREQUENCY">4186</field>
                    <field name="NOTE_VOLUME">50</field>
                </block>
                <block type="play_polyphony">
                    <value name="FREQUENCY_1">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="FREQUENCY_2">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="POLYPHONY_DURATION">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="POLYPHONY_VOLUME">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
            </category>
            <category name="LEDs" colour=185>
                <block type="scribbler_LED"></block>
            </category>
            <category name="Communicate" colour=185>
                <block type="serial_send_text"></block>
                <block type="serial_send_decimal"></block>
                <block type="serial_send_char"></block>
                <block type="serial_send_ctrl">
                    <field name="SERIAL_CHAR">Scribbler#NL</field>
                </block>
                <block type="serial_cursor_xy">
                    <value name="X">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                    <value name="Y">
                        <block type="math_integer">
                            <field name="INT_VALUE">0</field>
                        </block>
                    </value>
                </block>
                <block type="serial_rx_byte"></block>
            </category>
            <category name="Reset" colour=185>
                <block type="factory_reset"></block>
            </category>
        </category>
    </xml>
</body>
</html>
