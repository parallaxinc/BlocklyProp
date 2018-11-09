BlocklyProp 
=======================

Introduction
-----------------

Active public installation at http://blockly.parallax.com/blockly/

BlocklyProp is based on Blockly, the web-based, graphical programming editor. Provide language blocks and code generators for Parallax Propeller programming.
(It actually started with the BlocklyDuino as a base because it already generates code for a microcontroller and was easier to adapt.)

BlocklyProp generates Spin and C code, and can compile and load into the Propeller with a single click on the web-page.

Whereas Blockly is only client side, BlocklyProp is hosted on a server and there were 3 previous versions, each implementing  different sets of features and targeting different groups:

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

Which in turn is created using Blockly https://developers.google.com/blockly/

To compile your code I use Openspin for spin https://code.google.com/p/open-source-spin-compiler/ and the Propeller-gcc toolchain for C code: https://sites.google.com/site/propellergcc/

Thanks to you all.

License
-----------------
Copyright (C) 2014 - 2016 Parallax

```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0
```

Main contributors
-----------------

* Michel Lampo: Project initiator and lead
* Vale Tolpegin: Help files and blocks

Supported board
-----------------

* Activity Board (WX)
* S3
* Hackable electronic badge

Available all purpose pins differ from board to board. It's also possible to select a generic board which gives access to all 32 pins.

Example projects
-----------------

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
