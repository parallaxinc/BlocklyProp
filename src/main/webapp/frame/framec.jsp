<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/includes/include.jsp"%>

<html>
    <head>
        <meta charset="utf-8">
        <title>Blockly</title>

        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/colorPalette.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/apps/blockly_compressed.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/en/_messages.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc.js"/>"></script>

        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/base.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/control.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/pins.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/logic.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/math.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/text.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/lists.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/language/common/procedures.js"/>"></script>
        <!-- define blocks -->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/bit_math.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/math.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/base.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/console.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/control.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/cog.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/variables.js"/>"></script>
        <!--<script type="text/javascript" src="blockly/generators/propc/pointers.js"></script>-->
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/procedures.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/logic.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/pressure.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/TiltandAcceleration.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/GPS.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/joystick.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/abdrive.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/debug_LCD.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/serial.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/sensors.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/abvolts.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/servo.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/joystick.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/wav.js"/>"></script>
        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/hackable_electronic_badge.js"/>"></script>

        <script type="text/javascript" src="<url:getCdnUrl url="/blockly/generators/propc/file.js"/>"></script>

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
            function init() {

                Blockly.inject(document.body, {toolbox: document.getElementById('toolbox'), trashcan: true, media: '<url:getUrl url="/cdn/blockly/media/"/>', path: '<url:getUrl url="/cdn/blockly/"/>'}); // path: '/' ,

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
        <category name="<fmt:message key="category.programming" />">
            <category name="<fmt:message key="category.programming.control" />">
                <block type="controls_if"></block>
                <block type="controls_repeat">
                    <mutation TYPE="FOREVER"></mutation>
                </block>
                <block type="base_delay">
                    <value name="DELAY_TIME">
                        <block type="math_number">
                            <field name="NUM">1000</field>
                        </block>
                    </value>
                </block>
                <block type="string_type_block"></block>
                <!--<block type="text"></block>-->
            </category>
            <category name="<fmt:message key="category.programming.conditions" />">
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_boolean"></block>
            </category>
            <category name="<fmt:message key="category.programming.math" />">
                <block type="math_number"></block>
                <block type="math_arithmetic"></block>
                <block type="math_single"></block>
                <block type="math_limit"></block>
                <block type="math_crement"></block>
                <block type="bit_math_shift"></block>
                <!--<block type="bit_math_rotate"></block>-->
                <!-- Repeat from Conditions -->
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
            </category>
            <category name="<fmt:message key="category.programming.multicore" />">
                <block type="cog_new">
                    <value name="STACK_SIZE">
                        <block type="math_number">
                            <field name="NUM">128</field>
                        </block>
                    </value>
                </block>
            </category>
        </category>
        <category name="<fmt:message key="category.input-output" />">
            <category name="<fmt:message key="category.input-output.pin-states" />">
                <block type="make_pin"></block>
                <block type="make_pin_input"></block>
                <block type="check_pin"></block>
                <block type="check_pin_input"></block>
                <block type="set_pins"></block>
            </category>
            <category name="<fmt:message key="category.input-output.timing" />">
                <block type="base_freqout"></block>
                <block type="pulse_in"></block>
                <block type="pulse_out"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.communicate" />">
            <category name="<fmt:message key="category.communicate.serial-terminal" />">
                <block type="console_print"></block>
                <block type="console_print_variables"></block>
            </category>
            <category name="<fmt:message key="category.communicate.protocols" />">
                <block type="serial_open"></block>
                <block type="serial_tx_byte"></block>
                <block type="serial_send_text"></block>
                <block type="serial_rx_byte"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.activity-board" />">
            <category name="<fmt:message key="category.activity-board.voltage" />">
                <block type="ab_volt_v_in"></block>
                <block type="ab_volt_v_out"></block>
                <block type="ab_volt_in"></block>
                <block type="ab_volt_out"></block>
            </category>
            <category name="<fmt:message key="category.activity-board.memory" />">

            </category>
            <category name="<fmt:message key="category.activity-board.audio" />">
                <block type="wav_play"></block>
                <block type="wav_status"></block>
                <block type="wav_volume"></block>
                <block type="wav_stop"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.sensor-input" />">
            <category name="<fmt:message key="category.sensor-input.etape" />">
                <block type="etape_rc_time"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.hmc58783" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.2axis-joystick" />">
                <block type="joystick_input_xaxis"></block>
                <block type="joystick_input_yaxis"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.memsic-2axis" />">
                <block type="MX2125_acceleration_xaxis"></block>
                <block type="MX2125_acceleration_yaxis"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.mma7455" />">
                <block type="MMA7455_acceleration"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.gps_pam7q" />">
                <block type="PAM_7Q_Init"></block>
                <block type="PAM_7Q_Latitude"></block>
                <block type="PAM_7Q_Longitude"></block>
                <block type="PAM_7Q_Velocity"></block>
                <block type="PAM_7Q_Heading"></block>
                <block type="PAM_7Q_Altitude"></block>
                <block type="PAM_7Q_SatsTracked"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.ping" />">
                <block type="sensor_ping"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.pir" />">
                <block type="PIR_Sensor"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.rfid" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.sf02-laser" />">
                <block type="SF02_Laser_Rangefinder"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.sony-remote" />">
                <block type="sirc_get"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.sound-impact-sensor" />">

            </category>
        </category>
        <category name="<fmt:message key="category.actuator-output" />">
            <category name="<fmt:message key="category.actuator-output.standard-senvo" />">
                <block type="servo_move"></block>
            </category>
            <category name="<fmt:message key="category.actuator-output.cr-servo" />">

            </category>
            <category name="<fmt:message key="category.actuator-output.serial-lcd" />">
                <block type="debug_lcd_init"></block>
                <block type="debug_lcd_clear"></block>
                <block type="debug_lcd_print"></block>
                <block type="debug_lcd_number"></block>
                <block type="debug_lcd_action"></block>
            </category>
        </category>
        <category name="<fmt:message key="category.robot" />">
            <category name="<fmt:message key="category.robot.activitybot" />">
                <block type="ab_drive_speed"></block>
                <block type="ab_drive_goto"></block>
            </category>
            <category name="<fmt:message key="category.robot.servo-diff-drive" />">

            </category>
        </category>
        <category name="<fmt:message key="category.hackable-electronic-badge" />">
            <category name="<fmt:message key="category.hackable-electronic-badge.led_control" />">
                <block type="heb_toggle_led"></block>
                <block type="heb_set_led_rgb"></block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.oled" />">
                <block type="heb_print_string_var">
                  <value name="VALUE">
                    <block type="string_type_block">
                      <field name="VALUE">Hello</field>
                    </block>
                  </value>
                </block>
                <block type="heb_cursor_position"></block>
                <block type="heb_clear_screen"></block>
                <block type="heb_rotate"></block>
            </category>
            <category name="<fmt:message key="category.hackable-electronic-badge.ir-communication" />">
                <block type="heb_send_signal"></block>
                <block type="heb_read_signal"></block>
                <block type="heb_clear_ir_buffer"></block>
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
        <sep></sep>
        <category name="<fmt:message key="category.functions" />" custom="PROCEDURE"></category>
        <category name="<fmt:message key="category.variables" />" custom="VARIABLE"></category>
    </xml>
</body>
</html>
