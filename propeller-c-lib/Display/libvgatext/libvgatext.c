/*
* @file libvgatext.c
*
* @author Andy Lindsay
*
* @copyright
* Copyright (C) Parallax, Inc. 2013. All Rights MIT Licensed.
*
* @brief Project and test harness for the vgatext library.
*/


#include "simpletools.h"  
#include "vgatext.h"

int main()                                    
{
  vga_text_start(8);
  int i;
  while(1)
  {
    vga_text_out(HOME);
    vga_text_str("value = ");
    vga_text_dec(i--);
    vga_text_str("     ");
    pause(200);
  }                                    
}
