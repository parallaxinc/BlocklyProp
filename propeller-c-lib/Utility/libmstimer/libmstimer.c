/*
* @file libmstimer.c
*
* @author Andy Lindsay
*
* @copyright
* Copyright (C) Parallax, Inc. 2013. All Rights MIT Licensed.
*
* @brief Project and test harness for the mstimer library.
*/

#include "simpletools.h"                      
#include "mstimer.h"

int main()                                   
{
  pause(1000);                               

  mstime_start();
  mark();
  while(1)
  {
    int time = mstime_get();
    printf("time = %d\n", time);                    
    wait(1000000);                               
  }    
}

