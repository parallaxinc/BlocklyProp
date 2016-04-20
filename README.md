BlocklyProp
=======================

Introduction
-----------------

BlocklyProp is based on Blockly, the web-based, graphical programming editor. Provide language blocks and code generators for Parallax Propeller programming.
(It actually started with the BlocklyDuino as a base because it already generates code for a microcontroller and was easier to adapt.)

BlocklyProp generates Spin and C code, and can compile and load into the Propeller with a single click on the web-page.

Whereas Blockly is only client side, BlocklyProp is hosted on a server and

There where 3 previous versions with each a different feature sets and target groups:

1. Java version that is started as a Java application, internally creates a http-server and opens the browser. The server is used to compile programs and load them into Propeller
2. A second version is a demo version without the server functionality. It's just to have a go at using the blockly editor with the Propeller specific blocks.
3. The main version at last uses php with a mysql database to save and load projects and has community features. As the server is in this case not the users own computer a native (Python) client is used to compile and load programs.

This current version is a rewrite of the latest php version. It's now written in Java and runs on a Tomcat server.
To make the BlocklyPropClient lighter and to support Chromebooks and tablets compilation is now done on the server.

Requirements and setup
----------------------

BlocklyProp is written to run on a modern linux system.
It requires:

* Tomcat 7 or higher
* Java 1.7 or higher
* Mysql 5.6 or higher
* A Cloud-session installation
* A Cloud-compiler installation

References
----------

* Blockly http://code.google.com/p/blockly/
* BlocklyDuino https://github.com/gasolin/BlocklyDuino
* Parallax Propeller http://www.parallax.com/microcontrollers/propeller
* OpenSpin cross platform Spin/PASM Compiler https://code.google.com/p/open-source-spin-compiler/
* Compiler https://sites.google.com/site/propellergcc/

Credit
-----------------

The project is inspired by and based on BlocklyDuino https://github.com/gasolin/BlocklyDuino
Fred Lin is the creator of BlocklyDuino.

Which in turn is created using Blockly http://code.google.com/p/blockly/

To compile your code I use Openspin for spin https://code.google.com/p/open-source-spin-compiler/ and the Propeller-gcc toolchain for C code: https://sites.google.com/site/propellergcc/

Thanks to you all.

License
-----------------
Copyright (C) 2014 Michel Lampo michel@creatingfuture.eu

```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0
```

To Do list/Roadmap
-----------------

1. Example projects
  1. Alarm System for your room ( ping and wavplayer )
  2. Zombie detector with PIR
  3. RF message decoder XBee
  4. Joystick controlled servo
  5. Ping distance note player
  6. Mood display
  7. LED candle
  8. ColorPal LED display
  9. Musical Instrument control of something
  10. RF tilt video game controller ( mx2125 )
  11. Light sensor

Sensor/Hardware Compatibility
-----------------
- Propeller C
  - PIR Sensor ( all Parallax PIR Sensors )
  - Mutli-Cog ( start )
  - Digital and Analog I/O support
  - Serial connection ( initialize, transmit, receive )
  - Freqout command
  - Joystick
  - Ping))) sensor
  - Abdrive
  - LCD ( currently, only 1 LCD can be attached )
  - Servo
  - MX2125 Acceleration sensor & rotation and tilt functions
  - MMA7455 Acceleration sensor
  - SF02 Laser Rangefinder
  - Etape liquid sensor
  - Activitybot Library functions
  - Servodiffdrivelibrary functions
  - Wavplayer
  - File I/O
  - TV remote functions
  - EEPROM
  - I2C
  - rc_time
  - RFID card I/O
  - sd card I/O
  - sound impact
  - assorted simpletools library functions ( see base.js )
- Spin
  - Ping))) sensor
  - Digital and Analog I/O support
  - Multi-Cog
  - Serial connection ( initialize, transmit, receive )
  - SF02 Laser Rangefinder
  - Joystick
  - MMA7455 Acceleration sensor
  - Etape liquid sensor
  - PIR Sensor
  - Freqout command
  - LCD ( currently, only 1 LCD can be attached )
  - Servo
