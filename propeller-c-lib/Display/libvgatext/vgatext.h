/**
 * @file vgatext.h
 *
 * @author Spin + ASM by Chip Gracey
 * Converted from Spin + ASM with Eric Smith's Spin2Cpp utility
 * Commented and function names adjusted by Andy Lindsay
 *
 * @version 0.85
 *
 * @copyright
 * Copyright (C) Parallax, Inc. 2013. All Rights MIT Licensed.
 *
 * @brief Displays text on a VGA monitor.  
 * To-do: Bring in features from
 * Steve Denson's VgaText application: 
 * https://code.google.com/p/propgcc/source/browse/demos/#demos%2FVgaText
 * Note, this library is still preliminary; revisions are pending.
 */

#ifndef VGA_Text_Class_Defined__
#define VGA_Text_Class_Defined__

#if defined(__cplusplus)
extern "C" {
#endif

#include <stdint.h>

/**
 * @internal
 */
#define Cols (32)
#define Rows (15)
#define Screensize (480)
#define Lastrow (448)
#define Vga_count (21)

/**
 * @internal
 */
typedef struct VGA_Text {
  int32_t	Col, Row, Color, Flag;
  int32_t	Colors[16];
  int32_t	Vga_status;
  int32_t	Vga_enable;
  int32_t	Vga_pins;
  int32_t	Vga_mode;
  int32_t	Vga_screen;
  int32_t	Vga_colors;
  int32_t	Vga_ht;
  int32_t	Vga_vt;
  int32_t	Vga_hx;
  int32_t	Vga_vx;
  int32_t	Vga_ho;
  int32_t	Vga_vo;
  int32_t	Vga_hd;
  int32_t	Vga_hf;
  int32_t	Vga_hs;
  int32_t	Vga_hb;
  int32_t	Vga_vd;
  int32_t	Vga_vf;
  int32_t	Vga_vs;
  int32_t	Vga_vb;
  int32_t	Vga_rate;
  uint16_t	Screen[480];
  char dummy__;
} VGA_Text;

/**
 * @brief Start the VGA text display.
 *
 * @param Basepin pin connected to VGA's V (vertical sync) input.  Must be P0, P8, P16, or P24.  
 * Counting upward from this pin, the connections are: H, B0, B1, G0, G1, R0, R1.  Example: if the
 * Basepin is set to 8, P8 is connected to H, P9 to V, P10 to B0, and so on, up through P15 to R1.
 *
 * @returns Nonzero if successfully launched, or zero if no cog available. 
 */
  int32_t	vga_text_start(int32_t Basepin);

/**
 * @brief Stop the VGA display and free up a cog.
 */
  int32_t	vga_text_stop(void);

/**
 * @brief Display a string.
 *
 * @param Stringptr A pointer to a text string.
 */
  int32_t	vga_text_str(char* Stringptr);

/**
 * @brief Display a value as decimal text.
 *
 * @param Value The value to display.
 */
  int32_t	vga_text_dec(int32_t Value);

/**
 * @brief Display a value as hexadecimal text.
 *
 * @param Value The value to display.
 *
 * @param Digits The number of digits to display
 */
  int32_t	vga_text_hex(int32_t Value, int32_t Digits);

/**
 * @brief Display a value as binary text.
 *
 * @param Value The value to display.
 *
 * @param Digits The number of digits to display.
 */
  int32_t	vga_text_bin(int32_t Value, int32_t Digits);

/**
 * @brief Display a character.
 *
 * @param C Character to print.  This could be a printable character like 
 * 'a', 'b', 'Z', '&', '~', or non-printable control characters
 *
 * @details Non-Printable Control Characters (with simpletools constants
 * when they match.)
 *
 * CLS = 0
 * HOME = 1
 * BKSPC = 8
 * 10 (next character should be a position number)
 * 11 (next character should be a position number)
 * 12 set color (color pointer value follows)
 * CR = 13 
 */
  int32_t	vga_text_out(int32_t C);

/**
 * @brief Override color palette.
 *
 * @param Colorptr Points to a list of up to 8 colors.
 * 
 * @details Each color is two bytes: foreground, background.  
 * Red, green and blue can each be values from 0 to 3.
 * char foreground = (red << 4) | (green << 2) | blue
 * Example: If you want the foreground to have a red value of 2, 
 * a green value of 1 and a blue value of 3, use 
 * char foreground = (2 << 4) | (1 << 2) | 3
 *
 */
  int32_t	vga_text_setcolors(int32_t Colorptr);

#if defined(__cplusplus)
}
#endif
/* __cplusplus */ 
#endif
/* VGA_Text_Class_Defined__ */ 

#ifndef vgaSpin_Class_Defined__
#define vgaSpin_Class_Defined__

#if defined(__cplusplus)
extern "C" {
#endif

#include <stdint.h>

/**
 * @internal
 */
#define Paramcount (21)
#define Colortable (384)

/**
 * @internal
 */
typedef struct vgaSpin {
  int32_t	Cog;
  char dummy__;
} vgaSpin;

/**
 * @internal
 */
  int32_t	vgaSpin_Start(int32_t Vgaptr);

/**
 * @internal
 */
  int32_t	vgaSpin_Stop(void);

#if defined(__cplusplus)
}
#endif
/* __cplusplus */ 
/* __cplusplus */ 
#endif
/* vgaSpin_Class_Defined__ */ 

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


