/**
 * @file simpletext.h
 *
 * @author Steve Denson
 *
 * @version 0.85
 *
 * @copyright
 * Copyright (C) 2013, Parallax Inc. 
 * See end of file for terms of use.
 *
 * Simple Terminal Library API definition.
 *
 * @brief This library is provided with the following in mind:
 *
 * - Designed for minimum size with generic IO devices.
 * - Designed for any character IO device using rxChar/txChar functions.
 * - Contains 2 built-in device drivers FdSerial and SimpleSerial.
 * - Supports get/print decimal, binary, float, hex, char, and string.
 * - Supports print format values to buffer comparable to sprintf (printBuffFormat).
 * - Supports scan  format values from buffer comparable to sscanf (scanBuffFormat).
 */
#ifndef __SimpleTEXT__
#define __SimpleTEXT__

#include <propeller.h>

#ifdef __cplusplus
extern "C"
{
#endif

#if !defined(__PROPELLER_32BIT_DOUBLES__)
#error "This library requires 32bit doubles"
#endif

#define TERM_NAME_LEN 20
#define TERM_COG_LEN  7

typedef struct text_struct
{
  int  (*rxChar)(struct text_struct *p);            /* required for terminal to work */
  int  (*txChar)(struct text_struct *p, int ch);    /* required for terminal to work */
  int  cogid[TERM_COG_LEN];                         /* pointer to cog(s) used if any */
  volatile void *devst;                             /* pointer to device info struct */
} text_t;

#define getStopCOGID(id) ((id)-(1))
#define setStopCOGID(id) ((id)+(1))

/**
 * By default the terminal will use simple serial for input/output
 * It can be overloaded.
 */
#include "serial.h"

/* Values for use with SimpleIDE Terminal */
#ifndef HOME
#define HOME   (1)
#endif
#ifndef CRSRXY
#define CRSRXY (2)
#endif
#ifndef CRSRLF
#define CRSRLF (3)
#endif
#ifndef CRSRRT
#define CRSRRT (4)
#endif
#ifndef CRSRUP
#define CRSRUP (5)
#endif
#ifndef CRSRDN
#define CRSRDN (6)
#endif
#ifndef BEEP
#define BEEP   (7)
#endif
#ifndef BKSP
#define BKSP   (8)
#endif
#ifndef TAB
#define TAB    (9)
#endif
#ifndef NL
#define NL     (10)
#endif
#ifndef LF
#define LF     (10)
#endif
#ifndef CLREOL
#define CLREOL (11)
#endif
#ifndef CLRDN
#define CLRDN  (12)
#endif
#ifndef CR
#define CR     (13)
#endif
#ifndef CRSRX
#define CRSRX  (14)
#endif
#ifndef CRSRY
#define CRSRY  (15)
#endif
#ifndef CLS
#define CLS    (16)
#endif

typedef text_t terminal;

/**
 * This function is opened by default when the library is used.
 * The port by default transmits on P30 and receives on P31 at 115200 bps.
 * The port is a simple serial driver and does not buffer bytes.
 *
 * Users do not have to call this unless the termial has been closed.
 * @returns 0 if port is already open, else returns term pointer.
 */
terminal *simpleterm_open(void);

/**
 * This function is provided if a different default driver is to be used.
 * The function should be called before opening another driver.
 */
void      simpleterm_close(void);

/**
 * This returns the default debug port device.
 */
terminal *simpleterm_pointer(void);


/**
 * Get a binary number from the debug port.
 * @returns number received.
 */
int  getBin(void);

/**
 * Get a char from the debug port.
 * @returns character received as an integer.
 */
int  getChar(void);

/**
 * Get a decimal number from the debug port.
 * @returns number received.
 */
int  getDec(void);

/**
 * Get a floating point number from the debug port.
 * @returns number received.
 */
float getFloat(void);

/**
 * Get a hexadecimal number from the debug port.
 * @returns number received.
 */
int  getHex(void);

/**
 * Get a string of chars from the debug port.
 * @param buffer is a previously declared array of char big enough to hold the input string plus 2 null terminators.
 * @param max is the maximum size to read and should be less or equal buffer size.
 * @returns string received.
 */
char *getStr(char *buffer, int max);

/**
 * Print a string representation of a binary number to the debug port.
 * @param value is number to print. 
 * @param digits is number of characters to print. 
 */
void putBin(int value);
/**
 * Send a char on the debug port.
 * @param c is the char to send. 
 */
void putChar(char c);
/**
 * Print a string representation of a decimal number to the debug port.
 * @param value is number to print. 
 */
void putDec(int value);
/**
 * Print a string representation of a 32 bit floating point number to the debug port.
 * @param value is number to print. 
 */
void putFloat(float value);
/**
 * Print a string representation of a hexadecimal number to the debug port.
 * @param value is number to print. 
 * @param digits is number of characters to print. 
 */
void putHex(int value);
/**
 * Send a string + new line on the transmit debug port.
 * @param str is the null terminated string to send. 
 */
int  putln(const char* str);
/**
 * Send a string + new line on the transmit debug port. This is an alias of putln.
 * @param str is the null terminated string to send. 
 */
int  putLine(const char* str);
/**
 * Send a string on the transmit debug port.
 * @param str is the null terminated string to send. 
 */
int  putStr(const char* str);

/**
 * Get a binary number from the receive device.
 * @param device is a previously open/started terminal device.
 * @returns number received.
 */
int  readBin(text_t *device);

/**
 * Get a char from the receive device.
 * @param device is a previously open/started terminal device.
 * @returns character received as an integer.
 */
int  readChar(text_t *device);

/**
 * Get a decimal number from the receive device.
 * @param device is a previously open/started terminal device.
 * @returns number received.
 */
int  readDec(text_t *device);

/**
 * Get a floating point number from the receive device.
 * @param device is a previously open/started terminal device.
 * @returns number received.
 */
float readFloat(text_t *device);

/**
 * Get a hexadecimal number from the receive device.
 * @param device is a previously open/started terminal device.
 * @returns number received.
 */
int  readHex(text_t *device);

/**
 * Get a string of chars from the receive device.
 * @param device is a previously open/started terminal device.
 * @param buffer is a previously declared array of char big enough to hold the input string.
 * @param max is the maximum size to read and should be less or equal buffer size.
 * @returns string received.
 */
char *readStr(text_t *device, char *buffer, int max);

/**
 * Print a string representation of a binary number to the debug port.
 * @param device is a previously open/started terminal device.
 * @param value is number to print. 
 */
void writeBin(text_t *device, int value);
/**
 * Print a string representation of a binary number to output
 * @param device is a previously open/started terminal device.
 * @param value is number to print. 
 * @param digits is number of characters to print. 
 */
void writeBinDigits(text_t *device, int value, int digits);
/**
 * Send a char on the transmit device.
 * @param device is a previously open/started terminal device.
 * @param c is the char to send. 
 */
void writeChar(text_t *device, char c);
/**
 * Print a string representation of a decimal number to output
 * @param device is a previously open/started terminal device.
 * @param value is number to print. 
 */
void writeDec(text_t *device, int value);
/**
 * Print a string representation of a decimal number to output
 * @param device is a previously open/started terminal device.
 * @param value is number to print. 
 * @param width is number of characters to print padded by spaces. 
 */
void writeDecDigits(text_t *device, int value, int width);
/**
 * Print a string representation of a 32 bit floating point number to device
 * @param device is a previously open/started terminal device.
 * @param value is number to print. 
 */
void writeFloat(text_t *device, float value);
/**
 * Print a string representation of a hexadecimal number to output
 * @param device is a previously open/started terminal device.
 * @param value is number to print. 
 */
void writeHex(text_t *device, int value);
/**
 * Print a string representation of a hexadecimal number to output
 * @param device is a previously open/started terminal device.
 * @param value is number to print. 
 * @param digits is number of hexadecimal characters to print. 
 */
void writeHexDigits(text_t *device, int value, int digits);
/**
 * Print a string representation of a 32 bit floating point number to device
 * @param device is a previously open/started terminal device.
 * @param width is number of characters to print. 
 * @param precision is number of decimal point digits to print. 
 * @param value is number to print. 
 */
void writeFloatPrecision(text_t *device, float value, int width, int precision);
/**
 * Send a string + new line on the transmit device.
 * @param device is a previously open/started terminal device.
 * @param str is the null terminated string to send. 
 */
int  writeLine(text_t *device, char* str);
/**
 * Send a string on the transmit device.
 * @param device is a previously open/started terminal device.
 * @param str is the null terminated string to send. 
 */
int  writeStr(text_t *device, char* str);
/**
 * Send a string on the transmit device.
 * @param device is a previously open/started terminal device.
 * @param str is the null terminated string to send. 
 * @param width is number of characters to print padded by spaces. 
 */
int  writeStrDigits(text_t *device, char* str, int width);

/**
 * Print format "..." args to the default simple terminal device.
 * The output is limited to 256 bytes.
 *
 * @param format is a C printf comparable format string.
 * @param ... is the arguments to use with the format string.
 * returns the number of bytes placed into the buffer.
 */
int print(const char *format, ...) __attribute__((format (printf, 1, 2)));

/**
 * Convert formatted simple terminal input to the "..." args.
 * The input is limited to 256 bytes.
 *
 * @param format is a C printf comparable format string.
 * @param ... is the arguments where output will go and must be pointers.
 * returns the number of bytes placed into the buffer.
 */
int scan(const char *fmt, ...);

/**
 * Print format "..." args to the device
 * The output is limited to 256 bytes.
 *
 * @param device is where to put the formatted output.
 * @param format is a C printf comparable format string.
 * @param ... is the arguments to use with the format string.
 * returns the number of bytes placed into the buffer.
 */
int dprint(text_t* device, const char *format, ...);

/**
 * Convert formatted device input to the "..." args.
 * The input is limited to 256 bytes.
 *
 * @param device is where to get the formatted input.
 * @param format is a C printf comparable format string.
 * @param ... is the arguments where output will go and must be pointers.
 * returns the number of bytes placed into the buffer.
 */
int dscan(text_t* device, const char *fmt, ...);

/**
 * Print format "..." args to the output buffer.
 * The output buffer *must be* big enough for the output.
 *
 * @param buffer is where to put the formatted output.
 * @param format is a C printf comparable format string.
 * @param ... is the arguments to use with the format string.
 * returns the number of bytes placed into the buffer.
 */
int sprint(char *buffer, const char *format, ...);

/**
 * Convert formatted buffer to the "..." args.
 *
 * @param buffer is where to put the formatted output.
 * @param format is a C printf comparable format string.
 * @param ... is the arguments where output will go and must be pointers.
 * returns the number of bytes placed into the buffer.
 */
int sscan(const char *buffer, const char *fmt, ...);


/*  API not intended for public use */
int   printNumber(text_t *p, unsigned long u, int base, int width, int fill_char);
char* _safe_gets(text_t *term, char* origBuf, int count);
const char* _scanf_getf(const char *str, float* dst);
const char* _scanf_getl(const char *str, int* dst, int base, unsigned width, int isSigned);

#include <stdarg.h>
int   _doscanf(const char* str, const char *fmt, va_list args);
int   _dosprnt(const char *fmt, va_list args, char *obuf);

char* float2string(float f, char *s, int width, int precision);
float string2float(char *s, char **end);

#ifdef __cplusplus
}
#endif

#endif
/* __SimpleTEXT__ */

/*
+--------------------------------------------------------------------
| TERMS OF USE: MIT License
+--------------------------------------------------------------------
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files
(the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
+--------------------------------------------------------------------
*/
