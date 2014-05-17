/**
 * @file SimpleTerm.c
 * SimpleTerm startup default constructor
 *
 * Copyright (c) 2013, Parallax Inc.
 * Written by Steve Denson
 */
#include <propeller.h>
#include "simpletext.h"

/*
 * SimpleTerm uses global pointers for IO - it is the default debug module.
 * Functions like putChar, putDec, putLine are default IO and use the globals.
 */
HUBDATA terminal *dport_ptr = 0;
HUBDATA terminal debug_port;
Serial_t         debug_serial;

__attribute__((constructor))
terminal *simpleterm_open(void)
{
  if(dport_ptr != 0)
    return dport_ptr;

#ifdef SIMPLESERIAL_TERM
  dport_ptr = serial_open(31,30,0,115200);
  return dport_ptr;
#else
  int txpin = 30;
  int rxpin = 31;

  /* set pins first for boards that can misbehave intentionally like the Quickstart */
  DIRA |=  (1<<txpin);
  OUTA |=  (1<<txpin);
  DIRA &= ~(1<<rxpin);

  debug_port.devst     = &debug_serial;
  
  debug_port.txChar    = serial_txChar;     /* required for terminal to work */
  debug_port.rxChar    = serial_rxChar;     /* required for terminal to work */

  debug_serial.rx_pin  = rxpin; /* recieve pin */
  debug_serial.tx_pin  = txpin; /* transmit pin*/
  debug_serial.mode    = 0;
  debug_serial.baud    = 115200;
  debug_serial.ticks   = CLKFREQ/115200; /* baud from clkfreq (cpu clock typically 80000000 for 5M*pll16x) */

  waitcnt(CLKFREQ/2+CNT);
  dport_ptr = &debug_port;
  return &debug_port;
#endif
}


/**
 * Get the SimpleTerm default text_t pointer
 */
terminal *simpleterm_pointer(void)
{
  return dport_ptr;
}

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


