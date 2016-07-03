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
        <category name="<fmt:message key="category.control" />">
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
            <block type="cog_new">
            </block>
        </category>
        <category name="<fmt:message key="category.operators" />">
            <block type="math_arithmetic"></block>
            <block type="math_limit"></block>
            <block type="math_crement"></block>
            <block type="math_random"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_compare"></block>
        </category>
        <sep></sep>
        <category name="<fmt:message key="category.values" />">
            <block type="math_number"></block>
            <block type="logic_boolean"></block>
        </category>
        <category name="<fmt:message key="category.variables" />" custom="VARIABLE"></category>
        <category name="<fmt:message key="category.functions" />" custom="PROCEDURE"></category>
        <category name="<fmt:message key="category.input-output.pin-states" />">
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
        <category name="<fmt:message key="category.communicate" />">
            <category name="<fmt:message key="category.communicate.serial-lcd" />">
                <block type="debug_lcd_init"></block>
                <block type="debug_lcd_clear"></block>
                <block type="debug_lcd_print"></block>
                <block type="debug_lcd_number"></block>
                <block type="debug_lcd_action"></block>
            </category>
            <category name="<fmt:message key="category.communicate.serial-terminal" />">
                <block type="serial_open"></block>
                <block type="serial_send_text"></block>
                <block type="serial_rx_byte"></block>
            </category>
            <category name="<fmt:message key="category.communicate.protocols" />">
            </category>
        </category>
        <category name="<fmt:message key="category.sensor-input" />">
            <category name="<fmt:message key="category.sensor-input.etape" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.hmc58783" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.2axis-joystick" />">
                <block type="joystick_input_xaxis"></block>
                <block type="joystick_input_yaxis"></block>
            </category>
            <category name="<fmt:message key="category.sensor-input.memsic-2axis" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.mma7455" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.gps_pam7q" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.ping" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.pir" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.rfid" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.sf02-laser" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.sony-remote" />">

            </category>
            <category name="<fmt:message key="category.sensor-input.sound-impact-sensor" />">

            </category>
        </category>
        <category name="<fmt:message key="category.memory" />">
            <category name="<fmt:message key="category.memory.eeprom" />">

            </category>
            <category name="<fmt:message key="category.memory.sdcard" />">

            </category>
        </category>
        <category name="<fmt:message key="category.analog-pulses" />">
            <category name="<fmt:message key="category.analog-pulses.rc" />">

            </category>
            <category name="<fmt:message key="category.analog-pulses.voltage" />">

            </category>
            <category name="<fmt:message key="category.analog-pulses.pulse-in-out" />">

            </category>
        </category>
        <category name="<fmt:message key="category.audio" />">
            <category name="<fmt:message key="category.audio.audio" />">

            </category>
            <category name="<fmt:message key="category.audio.freqout" />">
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
        </category>
        <category name="<fmt:message key="category.servo" />">
            <category name="<fmt:message key="category.servo.standard-servo" />">
                <block type="servo_move"></block>
            </category>
            <category name="<fmt:message key="category.servo.cr-servo" />">

            </category>
        </category>
        <category name="<fmt:message key="category.robot" />">
            <category name="<fmt:message key="category.robot.activitybot" />">

            </category>
            <category name="<fmt:message key="category.robot.servo-diff-drive" />">

            </category>
        </category>
    </xml>
</body>
</html>
