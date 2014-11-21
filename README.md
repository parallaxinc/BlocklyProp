BlocklyProp
=======================

Introduction
-----------------

BlocklyProp is based on Blockly, the web-based, graphical programming editor. Provide language blocks and code generators for Parallax Propeller programming.
(It actually started with the BlocklyDuino as a base because it already generates code for a microcontroller and was easier to adapt.)

BlocklyProp generates Spin code, and can compile and load into the Propeller with a single click on the web-page.

Whereas Blockly is only client side, in some version of BlocklyProp I added some server code that compiles your code and load the generated code into the Propeller microcontroller.

There are 3 versions with each a different feature sets and target groups:

1. Java version that is started as a Java application, internally creates a http-server and opens the browser. The server is used to compile programs and load them into Propeller
2. A second version is a demo version without the server functionality. It's just to have a go at using the blockly editor with the Propeller specific blocks.
3. The main version at last uses php with a mysql database to save and load projects and has community features. As the server is in this case not the users own computer a native (Python) client is used to compile and load programs.
You can use this on http://blocklyprop.creatingfuture.eu/index.html

As stated, the php version with community features is the main supported version. Anyone looking to just use BlocklyProp should use this version.


* Blockly http://code.google.com/p/blockly/
* BlocklyDuino https://github.com/gasolin/BlocklyDuino
* Parallax Propeller http://www.parallax.com/microcontrollers/propeller
* Propeller-load https://sites.google.com/site/propellergcc/documentation/tutorials/load-propgcc-code-images
* OpenSpin cross platform Spin/PASM Compiler https://code.google.com/p/open-source-spin-compiler/

The latest version of the Java version can be downloaded from http://owncloud.creatingfuture.eu/public.php?service=files&t=0eae565db031cd3ca3f1163de91c5984&path=//old
(It needs Java 1.7 to run)

Technical overview Java version
-------------------------------

BlocklyProp runs in the browser, but is started using a bat file.
This will start a Java application that contains an embedded Jetty server. When the server has started it will open your browser.

~~Although it is written in Java it can only run on Windows because I use Propellent.exe to compile and communicate with the microcontroller.~~
Thanks to input and references to other projects done for the Parallax Propeller I've integrated a cross platform compiler and way to load the application in the microcontroller.

Currently the bat file only starts the java jar: "java -jar BlocklyProp-1.0-SNAPSHOT.jar", but might be extended with more functionality in a later stage.

$ git clone https://github.com/parallaxinc/BlocklyProp.git

It is created as a maven project wich should make importing and building the project very easy.
As there are a lot of static files I used the assembly plugin to create a zip file with all the files.
(The application with dependencies, the bat file to start it, the compiler and all static files for the Blockly editor)

The maven profile to create the java-server version is java-server.


Usage Java version
-----------------

1. On Windows run blocklyprop.bat to start the server (This might give some warning from Java, Windows and/or your firewall.
On Linux run ?? to start the server. (This still needs to be implemented)
2. Your browser should start, if not please open it manually. The url will be shown in the console opened by the blocklyprop.bat file. It will be something as "Open url: http://localhost:57328")
3. Drag and drop Blocks to create your program. If you are ready to test it click on Compile, Load into Ram or Load into EEPROM as wished.
4. If you wish you can save your project
5. To stop the server, click Ctrl+c in the console and confirm.


Credit
-----------------

The project is inspired by and based on BlocklyDuino https://github.com/gasolin/BlocklyDuino
Fred Lin is the creator of BlocklyDuino.

Which in turn is created using Blockly http://code.google.com/p/blockly/

To compile your code I use Openspin https://code.google.com/p/open-source-spin-compiler/
And to do the interaction the microcontroller I use Propeller-load from the Propgcc toolchain  https://sites.google.com/site/propellergcc/

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
To Do list
-----------------

Below is the current to do list. It is organized by priority. Please edit this as the features of BlocklyProp changes.

Thanks for the help and best of luck!

1. Blocks ( more products just keep coming from Parallax! )
2. Multi Core
3. Tutorials
  1. Blocks ( User )
  2. Developer
4. Community features

Sensor/Hardware Compatibility
-----------------
- Propeller C
  - PIR Sensor ( all Parallax PIR Sensors )
  - Mutli-Cog ( start )
  - Digital and Analog I/O support
  - Serial connection ( initialize, transmit, recieve )
  - Frequout command
  - Joystick
  - Ping))) sensor
  - Abdrive
  - LCD ( currently, only 1 LCD can be attached )
  - Servo
  - MX2125 Acceleration sensor
  - MMA7455 Acceleration sensor
  - SF02 Laser Rangefinder
  - Etape liquid sensor
- Spin
  - Ping))) sensor
  - Digital and Analog I/O support
  - Multi-Cog
  - Servo
  - Abdrive
  - LCD ( currently, only 1 LCD can be attached )
  - Frequout command
