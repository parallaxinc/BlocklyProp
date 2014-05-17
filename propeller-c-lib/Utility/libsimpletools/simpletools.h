/**                                                                             
 * @file simpletools.h
 *
 * @author Andy Lindsay
 *
 * @version 0.96 (see details for more info)
 *
 * @copyright
 * Copyright (C) Parallax, Inc. 2013. All Rights MIT Licensed.
 *
 * @brief This library provides convenience functions 
 * for a variety of microcontroller I/O, timing, conversion, and  
 * communication tasks.  This library also includes (and you can 
 * call functions from) 
 * <a target="blank" href="../../../Text%20Devices/libsimpletext/
 * Documentation%20simpletext%20Library.html">simpletext</a> 
 * and
 * <a target="blank" href="../../../Text%20Devices/libsimpletext/
 * Documentation%20serial%20Library.html">serial</a>.  
 *
 * <b>NOTE:</b> If you want to update old projects to work with this version
 * of simpletools, you may need to manually use the Add Simple Library button
 * to add .../SimpleIDE/Learn/Text Devices/libsimpletext.  
 *
 * <b><i>CONSTRUCTION ZONE:</i></b> This library is still preliminary, 
 * revisions pending.
 * @n @n dac_ctr, square_wave, and all pwm functions, are currently  
 * only supported by the LMM and CMM memory models.  
 *
 * @details This (under development) library provides a set of
 * introductory functions that simplify:
 *  
 * @li I/O control - convenient I/O pin monitoring and control functions
 * @li Timing - Delays, timeouts
 * @li Timed I/O - pulse generation/measurement, square waves, transition
 * counting, RC decay, etc.
 * @li Analog - D/A conversion, PWM, and more.  
 * @n For A/D conversion see ...Learn/Simple Libraries/Convert
 * for A/D conversion libraries
 * @li Serial Communication - SPI, I2C
 * @n For half and full duplex asynchronous serial communication, see 
 * ...Learn/Simple Libraries/Text Devices
 * @li Memory - EEPROM, SD storage
 *
 * Applications include: monitoring, control and
 * communication with simple peripherals, like lights, buttons,
 * dials, motors, peripheral integrated circuits and prototyping with
 * simple systems that use pulse, or serial communication.  (A few
 * examples from the very large list of devices includes: servos,
 * ultrasonic distance sensors, accelerometers, serial liquid crystal,
 * display, etc.)
 *
 * Intended use: Accompanies introductory electronics, robotics and
 * programming lessons and projects on learn.parallax.com.  After
 * these lessons, bridge lessons will be added to familiarize the
 * programmer with standard practices used by the community for
 * adding libraries to support and endless variety of peripherals
 * and applications.
 *
 * Revision 0.91 shift_in function pre-clock mode bug fixed. @n @n
 * Revision 0.92 Simpletext functionality incorporated for use of
 * character and string I/O with both terminal and peripheral devices.
 * Simple Text folder replaces PropGCC serial driver support for simple
 * and full duplex serial peripherals. @n @n
 * Revision 0.93 i2c_newbus now uses @n
 *   .../Learn/Simple Libraries/Protocol/simplei2c/@n 
 * Added:@n
 *   i2c_out, i2c_in to cover most common I2C slave applications
 * EEPROM ee_get_* and ee_put_* changed to ee_get* and ee_put* where 
 * the * term is camel-case. @n @n
 * Revision 0.94 Fixed bug in ee_put* that prevented contiguous data
 * from crossing the EEPROM's address/128 buffer boundaries.  Updated
 * stack array to static in mstimer.c.@n@n
 * Revision 0.95 square_wave bug that prevented output frequency changes
 * (fixed). @n@n
 * Revision 0.96 ee_putStr updated to support 128 byte page writes.  More
 * corrections to ee_put* for contiguous data crossing address/128 boundary.
 * Revision 0.96.1 Add documentation for start_fpu_cog and stop_fpu_cog.
 */

#ifndef SIMPLETOOLS_H
#define SIMPLETOOLS_H

#if defined(__cplusplus)
extern "C" {
#endif

#include <propeller.h>
#include "simpletext.h"
#include <driver.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <cog.h>
#include <ctype.h>
#include <unistd.h>
#include <sys/stat.h>
#include <dirent.h>
#include <sys/sd.h>
#include <math.h>
#include "simplei2c.h"

// Global variables shared by functions in separate files
extern long iodt;
extern long t_timeout;
extern long pauseTicks;
extern long t_mark;
extern char setForget;
extern int fdserDriverIndex;
extern unsigned int buscnt;
extern i2c *eeprom;
extern int eeInitFlag;

//extern i2c *eeprom;
//extern int dacCtrBits;
 
#ifndef PI
#define PI 3.141592653589793
#endif

#ifndef EEPROM_ADDR
#define EEPROM_ADDR	 0xA0 >> 1
#endif

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


// Values for use with shift_in
#ifndef   MSBPRE     
#define   MSBPRE     0
#endif
#ifndef   LSBPRE     
#define   LSBPRE     1
#endif
#ifndef   MSBPOST    
#define   MSBPOST    2
#endif
#ifndef   LSBPOST    
#define   LSBPOST    3
#endif
  
// Values for use with shift_out
#ifndef   LSBFIRST   
#define   LSBFIRST   0
#endif

#ifndef   MSBFIRST   
#define   MSBFIRST   1
#endif

// Counter module values
#ifndef NCO_PWM_1
#define NCO_PWM_1 (0b00100 << 26)
#endif

#ifndef CTR_NCO
#define CTR_NCO (0b100 << 26)
#endif

#ifndef CTR_PLL
#define CTR_PLL (0b10 << 26)
#endif

#ifndef DUTY_SE
#define DUTY_SE (0b110 << 26)
#endif

// Define types for simplified driver declarations
//typedef FILE* serial;
//typedef FILE* fdserial;
//typedef FILE* sdcard;
//typedef I2C* i2c;

/**
 * @brief Set an I/O pin to output-high
 *
 * @details This function set makes the Propeller
 * P8X32A connect the I/O pin to its positive 3.3 V
 * supply voltage enabling it to source up to
 * 40 mA of current (max 1 W dissipation per chip).
 *
 * @param pin Number of the I/O pin to set high.
 */
void high(int pin);

/**
 * @brief Set an I/O pin to output-low
 *
 * @details This function makes the Propeller
 * P8X32A connect the I/O pin to its ground 0 V
 * supply voltage enabling it to sink up to
 * 40 mA of current (max 1 W dissipation per chip).
 *
 * @param pin Number of the I/O pin to set low.
 */
void low(int pin);

/**
 * @brief Toggle the output state of the I/O pin.
 *
 * @details Change I/O pin's output state from low to high
 * or high to low.  This function assumes that some other
 * function has already set the I/O pin to output.
 *
 * @param pin I/O pin number.
 *
 * @returns The new pin state.
 */
unsigned int toggle(int pin);

/**
 * @brief Set an I/O pin to input
 *
 * @details This function makes the Propeller
 * connect the I/O pin to its input buffer
 * so that it can return the binary value of the
 * voltage applied by an external circuit.
 *
 * @param pin Number of the I/O pin to set to input.
 *
 * @returns 1 or 0 to indicate high or low signal
 * received.
 */
unsigned int input(int pin);

/**
 * @brief Reverse the direction of an I/O pin.
 *
 * @details If an I/O pin's direction is set to input, this
 * function changes it to output.  If it's set to output,
 * this function changes it to input.
 *
 * @param pin I/O pin number.
 *
 * @returns The new pin direction.
 */
unsigned int reverse(int pin);

/**
 * @brief Check the state of an I/O pin without
 * setting it to input.
 *
 * @details Use this function instead of input if the
 * Propeller needs to maintain an output.  For example,
 * you can use this to monitor another cog's or counter's
 * output signal activity on a pin.  (Note: if the pin
 * is already set to input, it will return the state the
 * external circuit is applying, just like input.)
 *
 * @param pin Number of the I/O pin
 *
 * @returns The pin's state.  If the pin is an output,
 * 1 = 3.3 V and 0 = 0 V.  If the pin is an input,
 * 1 means V > 1.65 V, 0 means it's less.
 */
unsigned int get_state(int pin);

/**
 * @brief Check the direction of the I/O pin.                                        
 *
 * @details This function will tell you the direction of the
 * I/O pin as seen by the cog executing it.  Keep in mind that
 * that your program might make other cogs use the I/O pin as
 * an output, and a cog that treats a pin as an output wins over
 * one that treats it as an input.
 *
 * @param pin I/O pin number
 *
 * @returns I/O pin direction as seen by the cog that runs the
 * function.
 */
unsigned int get_direction(int pin);

/**
 * @brief Get I/O pin output state.
 *
 * @details Keep in mind that this function reports the value in the output
 * register for the cog running the function.  That doesn't tell you if the
 * I/O pin is set to input, or whether another cog is sending a different
 * output state.
 *
 * @param pin I/O pin number.
 *
 * @returns In a register bit for I/O pin, either 1 or 0.
 */
unsigned int get_output(int pin);

/**
 * @brief Set an I/O pin to a given direction.                                        
 *
 * @details This function sets an I/O pin to either output or input.
 *
 * @param pin I/O pin number.
 * @param direction I/O pin direction.
  */
void set_direction(int pin, int direction);

/**
 * @brief Set I/O pin output register bit to either 1 or 0.
 *
 * @details This function focuses on the I/O pin's output register.  If you
 * intend to use it to send high or low signals, consider using high or low
 * functions.  This function can also be used in conjunction with set_direction
 * to send high or low signals.
 *
 * @param pin I/O pin to set high or low.
 * @param state 1 for high, 0 for low (when pin is actually set to output,
 * which can be done with setDirection.
 */
void set_output(int pin, int state);

/**
 * @brief Get states of a contiguous group of I/O pins
 *
 * @details This works the same as getState, but for a group of pins.  It
 * tells you the actual state of each pin, regardless of whether it's a 
 * voltage applied to input or transmitted by an output.
 *
 * @param endPin The highest numbered pin.
 * @param startPin The lowest numbered pin.
 *
 * @returns States value containing the binary bit pattern.  The value for
 * startPin should be in bit-0, next in bit-1, etc.
 */
unsigned int get_states(int endPin, int startPin);

/**
 * @brief Get directions for a contiguous group of I/O pins.
 *
 * @details Get direction register states from a contiguous group of bits 
 * in the cog's output register.
 *
 * @param endPin The highest numbered pin.
 * @param startPin The lowest numbered pin.
 *
 * @returns States value containing a binary bit pattern.  The value for
 * startPin should be in bit-0, next in bit-1, etc.
 */
unsigned int get_directions(int endPin, int startPin);

/**
 * @brief Get output settings for a contiguous group of I/O pins.
 *
 * @details Get output register settings for a contiguous group of bits 
 * in the cog's output register.
 *
 * @param endPin The highest numbered pin.
 * @param startPin The lowest numbered pin.
 *
 * @returns Pattern value containing a binary bit pattern.  The value 
 * for startPin should be in bit-0, next in bit-1, etc.
 */
unsigned int get_outputs(int endPin, int startPin);

/**
 * @brief Set directions for a contiguous group of I/O pins.
 *
 * @details Set directions values in a contiguous group of bits in the 
 * cog's output register.
 *
 * @param endPin The highest numbered pin.
 * @param startPin The lowest numbered pin.
 * @param pattern Value containing the binary bit pattern.  The value for
 * startPin should be in bit-0, next in bit-1, etc.
 */
void set_directions(int endPin, int startPin, unsigned int pattern);

/**
 * @brief Set output states for a contiguous group of I/O pins.
 *
 * @details Set output states of a contiguous group of bits in the cog's
 * output register.
 *
 * @param endPin The highest numbered pin.
 * @param startPin The lowest numbered pin.
 * @param pattern Value containing the binary bit pattern.  The value for
 * startPin should be in bit-0, next in bit-1, etc.
 */
void set_outputs(int endPin, int startPin, unsigned int pattern);

/**
 * @brief Delay cog from moving on to the next statement for a certain length
 * of time.
 *
 * @details The default time increment is 1 ms, so pause(100) would delay for
 * 100 ms = 1/10th of a second.  This time increment can be changed with a call
 * to the set_pause_dt function.
 *
 * @param time The number of time increments to delay.
 */
void pause(int time);

/**
 * @brief Delay cog from moving on to the next statement for a certain number
 * of system clock ticks.
 *
 * @details At 80 MHz, each clock tick is 12.5 ns.  Code overhead varies 
 * depending on memory model and optimization.  A simple test if you want a
 * certain number of clock ticks is:
 * 
 *  @code
 *  unsigned int ti, tf, us, pauseTicks;
 *  us = CLKFREQ/1000000;                               // 1 us worth of ticks
 *  pauseTicks = 50*us;                                 // 50 us of ticks
 *  ti = CNT;                                           // Save start time
 *  pause_ticks(pauseTicks);                            // Call pause_ticks
 *  tf = CNT;                                           // Save end time
 *  printf("pauseTicks = %d\n", pauseTicks);            // Display pauseTicks
 *  printf("delayTicks = %d\n", tf - ti);               // Display measured
 *  @endcode
 *
 * @param pticks the number of pause clock ticks.
 */
#define pause_ticks(pticks) __builtin_propeller_waitcnt(pticks+CNT, 0)

/**
 * @brief Mark the current time.
 *
 * @details The timeout function uses the marked time to determine if a timeout
 * has occurred.
 */
void mark(void);

/**
 * @brief Compares the time against the time elapsed since mark.
 *
 * @details The default time increment is 1 us, so timeout(2000) will return 1
 * if 2 ms or more has elapsed since mark, or 0 if it has not.
 *
 * @param time Number of time increments.
 */
int timeout(int time);

/**
 * @brief Waits a certain number of time increments from the last call to
 * mark or wait functions.
 *
 * @details The default time increment is 1 us, so wait(2000) will return wait
 * until 2 us after the last call to mark or wait.  This function automatically 
 * updates the marked time; you can call it repeatedly without having to call mark.
 *
 * @param time Number of time increments.
 */
void wait(int time);

/**
 * @brief Set time increment for pause function
 *
 * @details Default time increment for pause function is 1 ms.  This function
 * allows you to change that delay to custom values. For example,
 * set_pause_dt(CLKFREQ/2000) would set it to 1/2 ms increments.  To return to
 * default 1 ms increments, use set_pause_dt(CLKFREQ/1000).
 *
 * @param clockticks the number of clock ticks that pause(1) will delay.
 */
void set_pause_dt(int clockticks);

/**
 * @brief Count number of low to high transitions an external input applies to
 * an I/O pin over a certain period of time.
 *
 * @param pin I/O pin number
 * @param duration Amount of time the measurement counts transitions
 *
 * @returns The number of low to high transitions
 */
long count(int pin, long duration);

/**
 * @brief Set D/A voltage
 *
 * @details Launches process into another cog for up to two channels of D/A conversion
 * on any I/O pin.  Other libraries may be available that provide D/A for more channels.
 * Check SimpleIDE/Learn/Simple Libraries/Convert for options.  For more options, check
 * obex.parallax.com.
 *
 * This library uses another cog's counter modules (2 per cog) to perform duty modulation,
 * which is useful for D/A conversion.  The digital signal it generates will affect LED
 * brightness.  The signal can be passed through a low pass RC filter for digital to 
 * analog voltage conversion.  Add an op amp buffer if it needs to drive a load.  
 *
 * Default resolution is 8 bits for output voltages ranging from 0 V to (255/256) of
 * 3.3 V.
 *
 * General equation is dacVal * (3.3 V/2^bits)
 *
 * Default is 8 bits, which results in dacVal * (3.3 V/ 256), so dacVal
 * specifies the number of 256ths of 3.3 V.  You can change the resolution with
 * the dac_ctr_res function.
 *
 * @param pin I/O pin number.
 * @param channel Use 0 or 1 to select the cog's CTRA or CTRB counter modules, which
 * are used for D/A conversion.
 * @param dacVal Number of 256ths of 3.3 V by default.  Use a value from 0 (0 V) 
 * to 255 .
 */
void dac_ctr(int pin, int channel, int dacVal);

/**
 * @brief Set D/A voltage resolution
 *
 * @details Default resolution is 8-bits for output voltages ranging from 0 V to (255/256) of
 * 3.3 V.
 *
 * General equation is dacVal * (3.3 V/2^bits)
 *
 * Default is 8 bits, which results in dacVal * (3.3 V/ 256), so dacVal
 * specifies the number of 256ths of 3.3 V.
 *
 * @param bits The D/A converter's resolution in bits.
 */
void dac_ctr_res(int bits);

/**
 * @brief Stop the cog that's transmitting the DAC signal(s).  
 *
 * @details Stops any signals, lets go of any I/O pins, and reclaims the cog for
 * other uses.  
 *
 */
void dac_ctr_stop(void);

/**
 * @brief Use same cog to send square wave of a certain 
 * frequency for a certain amount of time.  For set and forget
 * with another cog, try square_wave function instead.
 *
 * @param pin I/O pin that sends the frequency
 * @param msTime Time in ms that the signal lasts
 * @param frequency Frequency of the signal in Hz.  Accepts
 * values from 1 Hz to 128000000 Hz (128 MHz).
 */
void freqout(int pin, int msTime, int frequency);

/**
 * @brief Start pulse width modulation (PWM) process in another cog.
 *
 * @details Great for DC motors, can also be used for servos, but the 
 * servo library is probably a better choice for that.
 *
 * A PWM signal sends repeated high signals with a fixed cycle time.
 * Your code will typically control the amount of time a PWM signal is
 * high during each cycle.  For example, pwm_start(1000) will establish
 * a 1000 us PWM cycle.  You can then use the pwm_set function to send
 * high signals that last anywhere from 0 to 1000 us.   
 *
 * @param cycleMicroseconds Number of microseconds the PWM cycle lasts.
 */
int pwm_start(unsigned int cycleMicroseconds);

/**
 * @brief Set a PWM signal's high time.
 *
 * @details After a single call to pwm_start, this function allows you
 * to set a PWM signal's high time.  For example, if your pwm_start call
 * sets up 1000 us (1 ms) you could use this function to make the signal
 * high for 3/4 of its cycle with pwm_set(pin, channel, 750).  If the
 * signal goes to a DC motor through an H bridge or other driver circuit,
 * the motor will behave as though it's only getting 3/4 of the supply 
 * and turn at roughly 3/4 of full speed.
 *
 * @param pin I/O pin to send the PWM signal.  You can change this 
 * value on the fly, which is useful for speed control of a DC motor in 
 * two different directions.  When the PWM signal changes to a new pin,
 * the cog sets the previous pin to input.  If you want it to stay low
 * when the PWM cog lets go, just set the pin low in your code before 
 * calling pwm_start.
 * 
 * @param channel You have options of 0 or 1 for up to two simultaneous 
 * PWM signals.  If you have an application in mind that requires more
 * PWM signals, check the SimpleIDE/Learn/Simple Libraries/Motor
 * directory, and also online at obex.parallax.com. 
 *
 * @param tHigh The high time for each PWM cycle repetition.
 */
void pwm_set(int pin, int channel, int tHigh);

/**
 * @brief Shut down PWM process and reclaim cog and I/O pins for other
 * uses.
 *
 * @details Shut down PWM process and reclaim cog and I/O pins for other uses
 *
 */
void pwm_stop(void);

/**
 * @brief Measure the duration of a pulse applied to an I/O pin
 *
 * @details Default time increments are specified in 1 microsecond units.  Unit size
 * can be changed with a call to set_io_dt function.
 *
 * @param pin I/O pin number
 * @param state State of the pulse (1 for positive or high pulses, 0 for negative or
 * low pulses.
 *
 * @returns Number of time units the pulse lasted.
 */
long pulse_in(int pin, int state);

/**
 * @brief Transmit a pulse with an I/O pin
 *
 * @details Default time increments are specified in 1 microsecond units.  Unit size
 * can be changed with a call to set_io_dt function.  The pulse will be positive if the
 * I/O pin is transmitting a low signal before the call.  The pulse will be negative
 * if it transmits a high signal before the call.  When the pulse is done, the pin
 * returns to whatever state it was in before the pulse.  If the pin was an input, it
 * will be changed to output and use whatever value was in the output register bit
 * for the pin.  This defaults to low on startup, but you can pre-set it while leaving
 * the pin set to input with the set_output function (or check it with get_output).
 *
 * @param pin I/O pin number.
 * @param time Amount of time the pulse lasts.
 */
void pulse_out(int pin, int time);

/**
 * @brief Set I/O pin to input and measure the time it takes a signal to transition from
 * a start state to the opposite state.
 *
 * @details Named rc_time because it is often used to measure a resistor-capacitor
 * circuit's tendency to "decay" to either ground or 5 V (depending on wiring).  Default
 * time increments are specified in 1 microsecond units.  Unit size can be changed with a
 * call to set_io_dt function.  The pulse will be positive if the I/O pin is transmitting a
 * low signal before the call.
 *
 * @param pin I/O pin number.
 * @param state Starting pin state.
 *
 * @returns Time from starting pin.
 */
long rc_time(int pin, int state);

/**
 * @brief Make I/O pin transmit a repeated high/low signal at a certain frequency.
 * High and low times are the same.  Frequency can range from 1 Hz to 128 MHz.  
 *
 * @details Uses one additional cog with up to two active channels, each with a selectable
 * frequency.  You can change transmit pins on the fly by calling this function on the 
 * same channel, but with a different pin.  The previous pin will be set to input in that
 * cog.  If your code is set to output, it will not affect that setting, only the setting
 * for the cog that is transmitting the square wave.  Code in your cog, or some other cog
 * can modulate the signal.  A low signal allows the square wave to transmit, and a high
 * signal prevents it.  
 *
 * @param pin I/O pin that transmits square wave frequency.  To stop sending the signal.
 * and change the pin back to input, pass the pin as a negative number.
 * @param channel 0 or 1 selects the counter module to transmit the frequency.
 * @param freq Square wave frequency.
 *
 */
void square_wave(int pin, int channel, int freq);

/**
 * @brief Stop the cog that's transmitting a square wave.  
 *
 * @details Stops any signals, lets go of any I/O pins, and reclaims the cog for
 * other uses.  
 *
 */
void square_wave_stop(void);

/**
 * @brief Sets the timeout value for the following timed I/O functions: pulse_in, rc_time
 *
 * @details Time increment is set in clock ticks.  For example, the default of 0.25
 * seconds is set with set_io_timeout(CLKFREQ/4).  To set the timeout to 20 ms, you could
 * use set_io_timeout(CLKFREQ/50).
 *
 * @param clockTicks Number of clock ticks for timed I/O
 */
void set_io_timeout(long clockTicks);

/**
 * @brief Sets the time increment for the following timed I/O functions: count, pulse_in,
 * pulse_out, rc_time.
 *
 * @details Time increment is set in clock ticks.  For example, the default of 1 us
 * units is specified with set_io_dt(CLKFREQ/1000000).  For 2 microsecond units, use
 * set_io_dt(CLKFREQ/500000).
 *
 * @param clockticks Number of clocktics that represents one I/O time increment.
 */
void set_io_dt(long clockticks);


/**
* @brief Receive data from a synchronous serial device
*
* @param pinDat Data pin.
* @param pinClk Clock pin.
* @param mode Order and orientation to clock pulse options: 
* MSBPRE, LSBPRE, MSBPOST,LSBPOST.
* @param bits Number of binary values to transfer.
*
* @returns Value received from the synchronous serial device.
*/
int shift_in(int pinDat, int pinClk, int mode, int bits);

/**
* @brief Send data to a synchronous serial device
*
* @param pinDat Data pin
* @param pinClk Clock pin
* @param mode Order that bits are transmitteed, either LSBFIRST or MSBFIRST.
* @param bits Number of binary values to transfer.
* @param value to transmit.
*/
void shift_out(int pinDat, int pinClk, int mode, int bits, int value);

/**
 * @brief Set up a simple serial driver with transmit & receive pins.
 *
 * @param sclpin the I2C bus' serial clock pin.
 *
 * @param sdapin the I2C bus' serial data pin.
 *
 * @param scldrive sets I/O pin connected to SCL line to send high signals by 
 * either (sclDrive = 0) allowing the pullup resistor on the bus to pull the 
 * line high, or (sclDrive = 1) by setting the I/O pin to output and driving the
 * line high.  sclDrive = 0 is by far the most common arrangement.  sclDrive = 1 
 * is used with some Propeller boards that do not have a pull-up resistor on the 
 * EEPROM's SCL line.    
 *
 * @returns a pointer to the I2C bus.  You will need this to pass to the i2cWrite and
 * i2cRead functions for communication on the bus. 
 */
i2c *i2c_newbus(int sclpin, int sdapin, int scldrive);


/**
 * @brief Send data to device using I2C protocol.
 *
 * @details This function uses Simple Libraries/Protocol/libsimplei2c for
 * clock and data line signaling.  You can also use this library to create
 * custom I2C functions.  Other I2C signaling options are included in
 * Propeller GCC.  Search for i2C int he propgcc folder for more info.  
 *
 * @param *bus pointer to an I2C bus.  Use i2c_newbus to get a pointer to an
 * I2C bus structure.
 *
 * @param i2cAddr 8 bit device address.  This is the 7-bit I2C address and 
 * read/write bit.  The value of the read/write bit does not matter because
 * the i2c_out and i2c_in functions clear and set it as needed.
 *
 * @param *regAddr Pointer to variable or array that contains the number of 
 * bytes to write to the device's register(s) or a memory address.
 *
 * @param regSize Number of bytes to use for regAddr.  This value can be zero
 * for no register or memory address data.
 *
 * @param *data Pointer to variable or array to send to the I2C device.
 *
 * @param count number of bytes in data
 *
 * @returns total number of bytes written. Should be 1 + regSize + count.  
 */
HUBTEXT int  i2c_out(i2c *bus, int i2cAddr, 
                     const unsigned char *regAddr, int regSize, 
                     const unsigned char *data, int count);


/**
 * @brief Receive data from device using I2C protocol.
 *
 * @details This function uses Simple Libraries/Protocol/libsimplei2c for
 * clock and data line signaling.  You can also use this library to create
 * custom I2C functions.  Other I2C signaling options are included in
 * Propeller GCC.  Search for i2C int he propgcc folder for more info.  
 *
 * @param *bus pointer to an I2C bus.  Use i2c_newbus to get a pointer to an
 * I2C bus structure.
 *
 * @param i2cAddr 8 bit device address.  This is the 7-bit I2C address and 
 * read/write bit.  The value of the read/write bit does not matter because
 * the i2c_out and i2c_in functions clear and set it as needed.
 *
 * @param regAddr Pointer to variable or array that contains the number of 
 * bytes to write to the device's register(s) or a memory address.
 *
 * @param regSize Number of bytes to use for regAddr.  This value can be zero
 * for no register or memory address data.
 *
 * @param *data Pointer to variable or array that will receive data from 
 * I2C device.
 *
 * @param count number of bytes in data
 *
 * @returns total number of bytes written. Should be 1 + regSize + count.  
 */
HUBTEXT int  i2c_in(i2c *bus, int i2cAddr, 
                     const unsigned char *regAddr, int regSize, 
                     unsigned char *data, int count);


/**
 * @brief Store a byte value at a certain address in the Propeller Chip's
 * dedicated EEPROM.
 *
 * @param value The byte value to store in EEPROM.
 *
 * @param addr The EEPROM address where the value is to be stored.
 */
void ee_putByte(char value, int addr);

/**
 * @brief ee_put_byte renamed ee_putByte.
 */
#define ee_put_byte ee_putByte


/**
 * @brief Get a byte value from a certain address in the Propeller Chip's
 * dedicated EEPROM.
 *
 * @param addr The EEPROM address that with the byte value that should be fetched.
 *
 * @returns value The byte value stored by the EEPROM at the address specified
 * by the addr parameter.
 */
char ee_getByte(int addr);

/**
 * @brief ee_get_byte renamed ee_getByte.
 */
#define ee_get_byte ee_getByte


/**
 * @brief Store an int value at a certain address in the Propeller Chip's
 * dedicated EEPROM.  An int value occupies four bytes, so the next value
 * should be stored at an address value that's four bytes higher.
 *
 * @param value The int value to store in EEPROM.
 *
 * @param addr The EEPROM address where the value is to be stored.
 */
void ee_putInt(int value, int addr);

/**
 * @brief ee_put_int renamed ee_putInt.
 */
#define ee_put_int ee_putInt


/**
 * @brief Get an int value from a certain address in the Propeller Chip's
 * dedicated EEPROM.  If you are fetching several int values, make sure to 
 * add 4 to the addr value with each successive call.
 *
 * @param addr The EEPROM address with the int value that should be fetched.
 *
 * @returns value The int value stored by the EEPROM at the specified address.
 */
int ee_getInt(int addr);

/**
 * @brief ee_get_int renamed ee_getInt.
 */
#define ee_get_int ee_getInt


/**
 * @brief Store a string of byte values starting at a certain address in 
 * the Propeller Chip's dedicated EEPROM.
 *
 * @param s Address of a char array containing the string of bytes.
 *
 * @param n The number of bytes to copy from the array.
 *
 * @param addr The EEPROM address of the first byte in the string.
 */
void ee_putStr(unsigned char *s, int n, int addr);

/**
 * @brief ee_put_str renamed ee_putStr.
 */
#define ee_put_str ee_putStr


/**
 * @brief Fetch a string of byte values starting at a certain address in 
 * Propeller Chip's dedicated EEPROM.  
 *
 * @param s Address of a char array to receive the string of bytes fetched
 * from EEPROM.
 *
 * @param n The number of bytes to copy from EEPROM to the array.
 *
 * @param addr The EEPROM address of the first byte in the string.
 * 
 * @returns The address of the array that stores the characters that
 * were fetched.
 */
char* ee_getStr(unsigned char* s, int n, int addr);

/**
 * @brief ee_get_str renamed ee_getStr.
 */
#define ee_get_str ee_getStr


/**
 * @brief Store a 32-bit precision floating point value at a certain address
 * in the Propeller Chip's dedicated EEPROM.  A 32-bit value occupies four bytes
 * so if you are storing values in a sequence, make sure to add 4 to each addr
 * parameter value.
 *
 * Make sure that the Math box is checked in the Project Manger.  In Simple View,
 * click the Show Project Manager button in SimpleIDE's bottom-left corner.  Then
 * click the Linker tab, and check the Math Lib box.
 *
 * @param value The 32-bit floating point float value to store in EEPROM.
 *
 * @param addr The EEPROM address where the value is to be stored.
 */
void ee_putFloat32(float value, int addr);

/**
 * @brief ee_put_float32 renamed ee_putFloat32.
 */
#define ee_put_float32 ee_putFloat32


/**
 * @brief Fetch a 32-bit precision floating point value from a certain address
 * in the Propeller Chip's dedicated EEPROM.  A 32-bit value occupies four bytes
 * so if you are fetching values in a sequence, make sure to add 4 to each addr
 * parameter value.
 *
 * Make sure that the Math box is checked in the Project Manger.  In Simple View,
 * click the Show Project Manager button in SimpleIDE's bottom-left corner.  Then
 * click the Linker tab, and check the Math Lib box.
 *
 * @param addr The EEPROM address with the 32-bit floating point float value 
 * that should be fetched.
 *
 * @returns value The float value stored by the EEPROM at the specified address.
 */
float ee_getFloat32(int addr);

/**
 * @brief Mount an SD card with the minimal 4-pin interface.
 *
 * @param doPin The SD card's data out pin.
 *
 * @param clkPin The SD card's clock pin.
 *
 * @param diPin The SD card's data in pin.
 *
 * @param csPin The SD card's chip select pin.
 *
 * @returns status 0 if successful, or an error code.
 */
int sd_mount(int doPin, int clkPin, int diPin, int csPin);

/**
 * @brief Convert value to zero terminated text string.
 *
 * @details Given an int, a character array pointer and a base, this function
 *          converts the int into the characters that represent the value in
 *          the specified base.
 *
 * @param   i An integer value.
 * @param   b[] A character array pointer.
 * @param   base The number base for the character representation.
 *
 * @returns The character array address it received.
 */
char* itoa(int i, char b[], int base);


/**
 * @brief Restarts floating point coprocessor (which runs in a separate
 * cog) after it has been shut down by stop_fpu_cog.  This process is 
 * started automatically when an application that uses the simpletools
 * library is launched.  So the only time you would call it is after
 * calling stop_fpu_cog in order to reclaim a cog for other uses.  
 * CAUTION: Do not try call simpletext library functions while the
 * fpu cog is shut down, it could cause the application to hang.
 *
 * @returns Nonzero if successful, or zero if no cogs available.
 */
int start_fpu_cog(void);


/**
 * @brief Stop floating point coprocessing cog that is started
 * automatically when an application that uses the simpletools library 
 * is launched.  When this function stops the cog running the floating 
 * point coprocessor, it will save a cog, but disable certain floating 
 * point functionalities until it is restarted by calling start_fpu_cog.
 * CAUTION: Do not try call simpletext library functions while the
 * fpu cog is shut down, it could cause the application to hang.
 *
 * @returns Nonzero if successful, or zero if no cogs available.
 */
void stop_fpu_cog(void);


int add_driver(_Driver *driverAddr);

#if defined(__cplusplus)
}
#endif
/* __cplusplus */  
#endif
/* SIMPLETOOLS_H */  

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




