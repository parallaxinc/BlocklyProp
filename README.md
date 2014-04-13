BlocklyProp
=======================

Introduction
-----------------

BlocklyProp is based on blockly, the web-based, graphical programming editor. Provide language blocks and code generators for Parallax Propeller programming.
(I actualy used the BlocklyDuino as a base because it already generates code for a microcontroller and was easier to adapt.)

BlocklyProp generates Spin code, and can compile and load into the Propeller with a single click on the web-page.

Whereas Blockly is only client side, I added some server code that compiles your code and load the generated code into the Propeller microcontroller.

~~This does mean that I can't put up a server where you can test it because the server part has to run on your own computer in order to be able to compile and communicate with the microcontroller.~~

I now created a second version that creates a demo application. This does not contain any server code, so compiling and interaction with the microcontroller are disabled.
You can test this on http://blocklyprop.creatingfuture.eu/index.html


* Blockly http://code.google.com/p/blockly/
* BlocklyDuino https://github.com/gasolin/BlocklyDuino
* Parallax Propeller http://www.parallax.com/microcontrollers/propeller
* Propeller-load https://sites.google.com/site/propellergcc/documentation/tutorials/load-propgcc-code-images
* Openspin cross platform Spin/PASM Compiler https://code.google.com/p/open-source-spin-compiler/

The latest version can be downloaded from http://owncloud.creatingfuture.eu/public.php?service=files&t=0eae565db031cd3ca3f1163de91c5984
(It needs Java 1.7 to run)

Technical overview
-----------------

BlocklyProp runs in the browser, but is started using a bat file.
This will start a Java application that contains an embedded Jetty server. When the server has started it will open your browser.

~~Although it is written in Java it can only run on Windows because I use Propellent.exe to compile and communicate with the microcontroller.~~
Thanks to input and references to other projects done for the Parallax Propeller I've integrated a cross platform compiler and way to load the application in the microcontroller.

Currently the bat file only starts the java jar: "java -jar BlocklyProp-1.0-SNAPSHOT.jar", but might be extended with more functionality in a later stage.

$ git clone https://github.com/michel-cf/BlocklyProp.git

It is created as a maven project wich should make importing and building the project very easy.
As there are a lot of static files I used the assembly plugin to create a zip file with all the files.
(The application with dependencies, the bat file to start it, the compiler and all static files for the Blockly editor)

There are multiple profiles to choose from:
* java-server creates a version including an embedded java server that provides an interface to save your projects and do the microcontroller interaction
* offline-demo creates a version without server components that can be run on any server, while not providing compile options. (Still needs to be run from a webserver due to the blockly iframe)


Usage
-----------------

1. On Windows run blocklyprop.bat to start the server (This might give some warning from Java, Windows and/or your firewall.
On Linux run ?? to start the server. (This still needs to be implemented)
2. Your browser should start, if not please open it manualy. The url will be shown in the console opened by the blocklyprop.bat file. It will be something as "Open url: http://localhost:57328")
3. Drag and drop Blocks to create your program. If you are ready to test it click on Compile, Load into Ram or Load into Eeprom as wished.
4. If you wish you can save your project
5. To stop the server, click Ctrl+c in the console and confirm.


Credit
-----------------

The project is inspired by and based on BlocklyDuino https://github.com/gasolin/BlocklyDuino
Fred Lin is the creator of BlocklyDuino.

Wich in turn is created using Blockly http://code.google.com/p/blockly/

To compile your code I use Openspin https://code.google.com/p/open-source-spin-compiler/
And to do the interaction the microcontroller I use Propeller-load from the Propgcc toolchain https://sites.google.com/site/propellergcc/

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
