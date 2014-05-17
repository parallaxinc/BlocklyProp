/**
 * @file SimpleSerial.h
 * Defines serial module
 *
 * Copyright (c) 2013, Parallax Inc.
 * Written by Steve Denson
 * Symbol naming decided by Parallax
 */
#ifndef __SERIAL_H
#define __SERIAL_H

#include "simpletext.h"

#ifdef __cplusplus
extern "C"
{
#endif

/* don't allow using pins < 0 or > SERIAL_MAX_PIN */
#define SERIAL_MIN_PIN 0
#define SERIAL_MAX_PIN 31

typedef struct serial_info
{
  int rx_pin;
  int tx_pin;
  int mode;
  int baud;
  int ticks;
} Serial_t;

/*
 * This defines serial as a type alias to text_t
 * Spelling is choice of Parallax education, not the author.
 */
typedef text_t serial;

/**
 * Initializes the simple serial terminal.
 * Equivalent to a start function which runs assembly in a cog.
 * If the txpin is < 0 or > 31, the pin will not be set to output.
 *
 * @param rxpin is pin number 0 to 31 for receive input
 * @param txpin is pin number 0 to 31 for transmit output
 * @param mode  is unused mode field (for FdSerial compatibility)
 * @param baudrate is frequency of bits ... 115200, 57600, etc...
 * @returns device term pointer for use with other functions.
 */
serial *serial_open(int rxpin, int txpin, int mode, int baudrate);

/**
 * Close device. Equivalent to a stop function without stopping a cog.
 * @param device is a previously open/started terminal device.
 */
void serial_close(serial *device);
/**
 * Gets a byte from the receive queue if available. Function does not block.
 * @param device is a previously open/started terminal device.
 * @returns receive byte 0 to 0xff or -1 if none available 
 */
int  serial_rxChar(serial *device);
/**
 * Sends a byte on the transmit queue.
 * @param device is a previously open/started terminal device.
 * @param txbyte is byte to send. 
 * @returns waits for and returns received byte if mode is 8 
 */
int  serial_txChar(serial *device, int txbyte);

#ifdef __cplusplus
}
#endif

#endif
/* __SERIAL_H */

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
