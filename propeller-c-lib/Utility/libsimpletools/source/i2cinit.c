/**
 * @file i2cinit.c
 */

#include "simpletools.h"
#include "simplei2c.h"

#define MAX_I2C_BUS 8

unsigned int buscnt = 0;

static i2c list[MAX_I2C_BUS];

i2c *i2c_newbus(int sclpin, int sdapin, int scldrive)
{
  i2c *bus = i2c_open(&list[buscnt++], sclpin, sdapin, scldrive);
  //return bus;
  bus = &list[buscnt-1];
  return bus;
}  

HUBTEXT int  i2c_out(i2c *bus, int i2cAddr, 
                     const unsigned char *regAddr, int regSize, 
                     const unsigned char *data, int count)
{
  int n  = 0;
  i2cAddr &= -2;                                       // Clear i2cAddr.bit0
  i2c_start(bus);
  if(i2c_writeByte(bus, i2cAddr)) return n; else n++;
  if(regSize) 
  {
    n += i2c_writeData(bus, regAddr, regSize);
  }
  n += i2c_writeData(bus, data, count);
  i2c_stop(bus);
  return n;  
}

HUBTEXT int  i2c_in(i2c *bus, int i2cAddr, 
                     const unsigned char *regAddr, int regSize, 
                     unsigned char *data, int count)
{
  int n  = 0;
  i2cAddr &= -2;                                        // Clear i2cAddr.bit0 (write)
  i2c_start(bus);
  if(regSize) 
  {
    if(i2c_writeByte(bus, i2cAddr)) return n; else n++;
    n += i2c_writeData(bus, regAddr, regSize);
  }
  i2cAddr |= 1;                                       // Set i2cAddr.bit0 (read)
  i2c_start(bus);
  if(i2c_writeByte(bus, i2cAddr)) return n; else n++;
  n += i2c_readData(bus, data, count);
  i2c_stop(bus);
  return n;  
}

