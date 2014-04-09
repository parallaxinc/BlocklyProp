Welcome to the Propellent Library and Executable software for the Propeller microcontroller.


WHERE TO FIND INFORMATION

Documentation on this product is contained in the "Propellent Library.pdf" and "Propellent Executable.pdf" files.

Please visit the Parallax web site periodically to find updated software and documentation.

  http://www.parallax.com/propeller


SYSTEM REQUIREMENTS

Windows 2000 or later
The recommended processor for the Operating System
The recommended RAM for the Operating System
20 MB Free Hard Drive Space
24-bit, or better, SVGA video card
1 Available USB port or COM port


USAGE AND DISTRIBUTION REQUIREMENTS

Parallax created the Propellent Library and Executable to enable Propeller developers to create software products
that use the Propeller.  As such, Parallax gives Propeller developers permission (at no cost and with no required
license) to include any of the following with their distributions of custom software, batch files, or other products: 
  * The Propellent Library (dll)
  * The Propellent Executable (exe)
  * The Propellent documentation (pdf)
This permission is valid as long as the developer does not sell any part of, or combination of, the Propellent
Library, Propellent Executable, and/or Propellent documentation itself.  However, it is acceptable to include these
items as a distribution package along with the developer's custom-made software, batch files, or other products
for sale.


WHAT'S NEW
----------

Version 1.6 [Library and Executable]

---General---

Enhanced executable to return the last Unique Message ID as the application's error code (ie: accessible as %ERRORLEVEL%
in a batch file).  This includes all possible message ID's: Fatal Errors, Information, and Events.  The last one before
the application terminates is what ends up as the application's error code.




---Bug Fix---

Added missing period (.) to end of "Checking COMx" message.






Version 1.5 [Library and Executable]

---General---

Enhanced dialog display to make source line, and error message, more clear.



---Bug Fix---

Fixed bug that displayed a source line from the wrong file when a compile error was caused by a missing object file.  This
would occur if the missing object file was not the first object referenced (2nd object or beyond).







Version 1.4 [Library and Executable]

---General---

Updated to include new download code of Propeller Tool 1.3.2 to handle unexpected received data during reset of Propeller,
like what happens with the QuickStart board because of the extra buffer component.

Includes file/folder manipulation features of Propeller Tool v1.3 that were not included prior.







Version 1.3 (R2) [Library and Executable]

---General---

Same as Version 1.3 but with updated USB driver installer v2.08.02.





Version 1.3 [Library and Executable]

---General---

[Executable] Now defaults to localizing its settings based on Propellent executable's name and folder path.  This makes it
easier for programs using Propellent to isolate themselves from persistent settings of other Propellent-based programs on 
the same system.

[Executable] Added /Global switch to override default localization behavior and, instead, use the global settings.

[Executable] Added /PortRules switch that allows setting or getting a Serial Port Search Rule string.

[Library] Enhanced to leave all settings at defaults if StorePrefs option is false.



---Bug Fix---

[Library] Fixed bug that prevented the validation and cleaning of serial port search rules before storing them in settings.





Version 1.2 [Library and Executable]

---General---

Added persistent setting /GUI (Graphical User Interface mode) that allows configuration of which visual displays
will appear during operation.  Settings are: 1) ON - (default) show all status and dialog messages visually, 
2) STATUS - show only status messages visually, 3) DIALOGS - show only dialog messages (user prompts) visually, or
4) OFF - hide all visual messages during normal operation.  Note that this setting is ignored for the /EDITPORTS
function, since it requires GUI interaction, and for rare-occurrence user prompts such as the "File already exists.  
Overwrite?" dialog.

[Executable] Added standard output messages for all features in Propellent.exe.  These are redirectable to a file
using '> file_name.extension' on the command-line.

[Executable] Added non-persistent setting /IMAGE which combines with the /SAVEBINARY or /SAVEEEPROM switches to 
allow specification of a path and/or filename in which to save the image output, thus overriding the default of
saving to the same path/filename as the source (with a .binary or .eeprom extension).  This ability already 
existed in the Library via the SaveImage routine.

Enhanced to automatically create the folder set specified via the /IMAGE switch, or via SaveImage routine, if
those folders did not already exist.

[Library] Updated GetPropellerVersion routine to return a PChar instead of a LongWord.  The returned z-string
contains the port and version of a detected Propeller, or an error message if none detected.

Updated to prevent hard errors (like "No disk in drive") from appearing when accessing a file or folder that
may be on a removable drive.

---Bug Fix---

[Executable] Fixed bug that allowed the /SAVEBINARY and /SAVEEEPROM switches to be used without the /COMPILE switch,
which resulted in non-intuitive and unintended behavior.

Fixed bug that caused file error exception while saving image file.





Version 1.1 [Library and Executable]

---General---

Updated embedded Propeller Executable Syntax document.

Enhanced serial routines to support FTDI VCP Driver v2.4.6 to avoid a possible "Write Error on COMx" message.





Version 1.0 [Library and Executable] - Initial release.