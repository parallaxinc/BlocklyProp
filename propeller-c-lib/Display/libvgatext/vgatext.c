/**
 * @file vgatext.c
 *
 * @author Spin + ASM by Chip Gracey
 * Converted from Spin + ASM with Eric Smith's Spin2Cpp utility
 *
 * @copyright
 * Copyright (C) Parallax, Inc. 2013. All Rights MIT Licensed.
 *
 * @brief Displays text on a VGA monitor.
 */

#include <propeller.h>
#include "vgatext.h"

#ifdef __GNUC__
#define INLINE__ static inline
#define PostEffect__(X, Y) __extension__({ int32_t tmp__ = (X); (X) = (Y); tmp__; })
#else
#define INLINE__ static
static int32_t tmp__;
#define PostEffect__(X, Y) (tmp__ = (X), (X) = (Y), tmp__)
#define waitcnt(n) _waitcnt(n)
#define locknew() _locknew()
#define lockret(i) _lockret(i)
#define lockset(i) _lockset(i)
#define lockclr(i) _lockclr(i)
#define coginit(id, code, par) _coginit((unsigned)(par)>>2, (unsigned)(code)>>2, id)
#define cognew(code, par) coginit(0x8, (code), (par))
#define cogstop(i) _cogstop(i)
#endif

INLINE__ int32_t Rotl__(uint32_t a, uint32_t b) { return (a<<b) | (a>>(32-b)); }
INLINE__ int32_t Rotr__(uint32_t a, uint32_t b) { return (a>>b) | (a<<(32-b)); }
INLINE__ int32_t Shr__(uint32_t a, uint32_t b) { return (a>>b); }
INLINE__ int32_t Between__(int32_t x, int32_t a, int32_t b){ if (a <= b) return x >= a && x <= b; return x >= b && x <= a; }

INLINE__ int32_t Lookup__(int32_t x, int32_t b, int32_t a[], int32_t n) { int32_t i = (x)-(b); return ((unsigned)i >= n) ? 0 : (a)[i]; }

static  int32_t	vga_text_print(int32_t C);
static  int32_t	vga_text_newline(void);
static VGA_Text thisobj;

static uint8_t dat[]={
  0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x00, 
  0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x00, 0x02, 0x00, 0x00, 0x0a, 0x00, 0x00, 0x00, 0x4b, 0x00, 0x00, 0x00, 0x2b, 0x00, 0x00, 0x00, 
  0xe0, 0x01, 0x00, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x3f, 0x01, 0x3c, 0x14, 0x22, 0x00, 0x15, 0x3f, 0x0f, 0x05, 0x08, 0x2e, 
  0x10, 0x35, 0x0f, 0x03};
  
int32_t vga_text_start(int32_t Basepin)
{
  int32_t Okay = 0;
  vga_text_setcolors((int32_t)(&(*(uint8_t *)&dat[84])));
  vga_text_out(0);
  memmove( (void *)&thisobj.Vga_status, (void *)&(*(int32_t *)&dat[0]), 4*(Vga_count));
  thisobj.Vga_pins = (Basepin | 0x7);
  thisobj.Vga_screen = (int32_t)(&thisobj.Screen);
  thisobj.Vga_colors = (int32_t)(&thisobj.Colors);
  thisobj.Vga_rate = (Shr__(CLKFREQ, 2));
  Okay = vgaSpin_Start((int32_t)(&thisobj.Vga_status));
  return Okay;
}

int32_t vga_text_stop(void)
{
  vgaSpin_Stop();
  return 0;
}

int32_t vga_text_str(char* Stringptr)
{
  {
    int32_t _idx__0000;
    _idx__0000 = strlen((char *) Stringptr);
    do {
      vga_text_out(((uint8_t *)(Stringptr++))[0]);
      _idx__0000 = (_idx__0000 + -1);
    } while (_idx__0000 >= 1);
  }
  return 0;
}

int32_t vga_text_dec(int32_t Value)
{
  int32_t	I;
  int32_t result = 0;
  if (Value < 0) {
    Value = (-Value);
    vga_text_out('-');
  }
  I = 1000000000;
  {
    int32_t _idx__0001;
    _idx__0001 = 10;
    do {
      if (Value >= I) {
        vga_text_out(((Value / I) + '0'));
        Value = (Value % I);
        result = -1;
      } else {
        if ((result) || (I == 1)) {
          vga_text_out('0');
        }
      }
      I = (I / 10);
      _idx__0001 = (_idx__0001 + -1);
    } while (_idx__0001 >= 1);
  }
  return result;
}

int32_t vga_text_hex(int32_t Value, int32_t Digits)
{
  static int32_t look__0002[] = {48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, };

  Value = (Value << ((8 - Digits) << 2));
  {
    int32_t _idx__0003;
    _idx__0003 = Digits;
    do {
      vga_text_out(Lookup__(((Value = (Rotl__(Value, 4))) & 0xf), 0, look__0002, 16));
      _idx__0003 = (_idx__0003 + -1);
    } while (_idx__0003 >= 1);
  }
  return 0;
}

int32_t vga_text_bin(int32_t Value, int32_t Digits)
{
  Value = (Value << (32 - Digits));
  {
    int32_t _idx__0004;
    _idx__0004 = Digits;
    do {
      vga_text_out((((Value = (Rotl__(Value, 1))) & 0x1) + '0'));
      _idx__0004 = (_idx__0004 + -1);
    } while (_idx__0004 >= 1);
  }
  return 0;
}

int32_t vga_text_out(int32_t C)
{
  int32_t	I, K;
  int32_t result = 0;
  if (thisobj.Flag == 0) {
    if (C == 0) {
      { int32_t _fill__0005; uint16_t *_ptr__0007 = (uint16_t *)&thisobj.Screen; uint16_t _val__0006 = 544; for (_fill__0005 = Screensize; _fill__0005 > 0; --_fill__0005) {  *_ptr__0007++ = _val__0006; } };
      thisobj.Col = (thisobj.Row = 0);
    } else if (C == 1) {
      thisobj.Col = (thisobj.Row = 0);
    } else if (C == 8) {
      if (thisobj.Col) {
        (thisobj.Col--);
      }
    } else if (C == 9) {
      do {
        vga_text_print(' ');
      } while (thisobj.Col & 0x7);
    } else if (Between__(C, 10, 12)) {
      thisobj.Flag = C;
      return result;
    } else if (C == 13) {
      vga_text_newline();
    } else if (1) {
      vga_text_print(C);
    }
  } else if (thisobj.Flag == 10) {
    thisobj.Col = (C % Cols);
  } else if (thisobj.Flag == 11) {
    thisobj.Row = (C % Rows);
  } else if (thisobj.Flag == 12) {
    thisobj.Color = (C & 0x7);
  }
  thisobj.Flag = 0;
  return result;
}

int32_t vga_text_setcolors(int32_t Colorptr)
{
  int32_t	I, Fore, Back;
  I = 0;
  do {
    Fore = (((uint8_t *)Colorptr)[(I << 1)] << 2);
    Back = (((uint8_t *)Colorptr)[((I << 1) + 1)] << 2);
    thisobj.Colors[(I << 1)] = ((((Fore << 24) + (Back << 16)) + (Fore << 8)) + Back);
    thisobj.Colors[((I << 1) + 1)] = ((((Fore << 24) + (Fore << 16)) + (Back << 8)) + Back);
    I = (I + 1);
  } while (I <= 7);
  return 0;
}

int32_t vga_text_print(int32_t C)
{
  thisobj.Screen[((thisobj.Row * Cols) + thisobj.Col)] = (((((thisobj.Color << 1) + (C & 0x1)) << 10) + 512) + (C & 0xfe));
  if ((++thisobj.Col) == Cols) {
    vga_text_newline();
  }
  return 0;
}

int32_t vga_text_newline(void)
{
  int32_t	I;
  thisobj.Col = 0;
  if ((++thisobj.Row) == Rows) {
    (thisobj.Row--);
    memmove( (void *)&thisobj.Screen, (void *)&thisobj.Screen[Cols], 2*(Lastrow));
    { int32_t _fill__0008; uint16_t *_ptr__0010 = (uint16_t *)&thisobj.Screen[Lastrow]; uint16_t _val__0009 = 544; for (_fill__0008 = Cols; _fill__0008 > 0; --_fill__0008) {  *_ptr__0010++ = _val__0009; } };
  }
  return 0;
}


/**
 * TERMS OF USE: MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */



