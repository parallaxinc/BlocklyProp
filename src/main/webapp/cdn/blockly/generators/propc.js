/**
 * Visual Blocks Language
 *
 * Copyright 2014 Creating Future
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Prop-c for blocks.
 * @author michel@creatingfuture.eu (Michel Lampo)
 */
'use strict';

var array_contains = function (haystack, needle) {
    for (var straw = 0; straw < haystack.length; straw++) {
        if (haystack[straw] === needle) {
            return straw;
        }
    }
    return null;
};

/**
 * Color Palette - Created by Michel on 30-4-2016.
 */

var colorPalette = {
    defaultColors: {
        'input': 140,
        'output': 165,
        'io': 185,
        'programming': 205,
        'functions': 225,
        'variables': 250,
        'math': 275,
        'binary': 275,
        'robot': 295,
        'heb': 295,
        'ab': 320,
        'protocols': 340,
        'system': 320
    },
    grayscaleColors: {
        'input': '#AAAAAA',
        'output': '#222222',
        'io': '#333333',
        'programming': '#444444',
        'functions': '#555555',
        'variables': '#666666',
        'math': '#777777',
        'binary': '#777777',
        'robot': '#888888',
        'heb': '#888888',
        'ab': '#999999',
        'protocols': '#111111',
        'system': '#999999'
    },
    activePalette: null,
    getColor: function (type) {
        if (colorPalette.activePalette && colorPalette.activePalette[type] !== undefined) {
            return colorPalette.activePalette[type];
        }
        return '#000000';
    }

};

if (document.referrer.indexOf('?') === -1) {
    colorPalette.activePalette = colorPalette.defaultColors;
} else {
    if (document.referrer.split('?')[1].indexOf('grayscale=1') === -1) {
        colorPalette.activePalette = colorPalette.defaultColors;
    } else {
        colorPalette.activePalette = colorPalette.grayscaleColors;
    }
}



Blockly.propc = new Blockly.Generator('propc');
Blockly.HSV_SATURATION = 0.75;
Blockly.HSV_VALUE = 0.60;
Blockly.RTL = false;
/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
if (!Blockly.propc.RESERVED_WORDS_ || Blockly.propc.RESERVED_WORDS_ === '') {
    Blockly.propc.RESERVED_WORDS_ = 'INA,INB,OUTA,OUTB,DIRA,DIRB,CTRA,CTRB,PHSA,PHSB,CNT,CLKFREQ,auto,else,long,switch,break,enum,register,typedef,case,extern,return,union,char,float,short,unsigned,const,for,signed,void,continue,goto,sizeof,volatile,default,if,static,while,do,int,struct,_Packed,double,_bss_end,_bss_start,_byteReadyFlag,_byteToSend,_byteType,_C_LOCK,_clkfreq,_clkmodeval,_CLZSI,_CLZSI_ret,_cs,_doscanf,_doscanf_ct,_dosprnt,_driverlist,_FileDriver,_font,_gps_baud,_gps_rx_pin,_gps_tx_pin,_height,_hub_end,_intsprnt,_LMM_CALL_INDIRECT,_LMM_FCACHE_START,_LMM_RET,_load_start_adcACpropab_cog,_MASK_0000FFFF,_MASK_FFFFFFFF,_MULSI,_MULSI_ret,_rs,_rst,_safe_gets,_scanf_getf,_scanf_getl,_sclk,_screenLock,_servoPulseReps,_sid,_SimpleSerialDriver,_stack_end,_TMP0,_width,(float, int, long long, short, float, short, int),abd_abs,abd_blockGoto,abd_checkActivityBotStrings,abd_checkCenterPulseWidth,abd_checkForNoSignal,abd_checkForSwappedCables,abd_checkServoCalSupply,abd_cntrIdx,abd_cog,abd_dc,abd_dca,abd_displaySide,abd_dist,abd_distError,abd_ditherA,abd_ditherAa,abd_ditherAd,abd_ditherAp,abd_ditherV,abd_ditherVa,abd_ditherVd,abd_ditherVp,abd_dsr,abd_dvFlag,abd_ea,abd_ed,abd_edMax,abd_eeAddr,abd_elCnt,abd_encoders,abd_ePin,abd_ePinL,abd_ePinR,abd_gotoFlag,abd_gotoRampStep,abd_gotoSpeedLimit,abd_i,abd_intTabSetup,abd_nudgeCtr,abd_nudgeInc,abd_p,abd_rampStep,abd_record,abd_sample,abd_sampleCount,abd_senseEncoders,abd_spdmL,abd_spdmR,abd_spdrL,abd_spdrR,abd_speed,abd_speedd,abd_speedi,abd_speedLimit,abd_speedOld,abd_speedT,abd_sPin,abd_sPinL,abd_sPinR,abd_stack,abd_stopCtr,abd_stopPulseReps,abd_td,abd_tdst,abd_ticks,abd_ticksf,abd_ticksGuard,abd_ticksi,abd_trimB,abd_trimF,abd_trimticksB,abd_trimticksF,abd_us,abd_zdir,abd_zeroDelay,abort,abortChain__,abvolts_daCtrBits,abvolts_scale,accel,accel_shaken,accels,ad_in,ad_init,ad_volts,adc_in,adc_init,adc_start,adc_stop,adc_volts,adc124S021dc,adcACpropab_code,add_driver,AR,ard_blockGoto,ard_blockSpeed,ard_blockSpeedPrev,ard_cycles,ard_deadZone,ard_dhb10_arlo,ard_dhb10_terminal,ard_feedback,ard_gotoDoneReps,ard_increment,ard_mode,ard_offset,ard_opened,ard_ramp_interval,ard_rampStep,ard_rampStepMode,ard_replyMode,ard_servo_pin_L,ard_servo_pin_R,ard_speedAccLim,ard_speedL,ard_speedLimit,ard_speedR,ard_tRampStepPrev,asin,atan2,atof,atoi,audio_dac,audio0,badge_setup,badgeLight,badgeScreen,binary_audiosynth_dat_end,binary_audiosynth_dat_size,binary_audiosynth_dat_start,binary_pst_dat_end,binary_pst_dat_size,binary_pst_dat_start,binary_VGA_dat_end,binary_VGA_dat_size,binary_VGA_dat_start,binary_ws2812_driver_dat_end,binary_ws2812_driver_dat_size,binary_ws2812_driver_dat_start,BOTTOM,box,boxFilled,bt_accelInitFlag,button,buttons,cal_activityBot,cal_drive_display,cal_drive_pins,cal_drive_setramp,cal_drive_sleep,cal_drive_speeds,cal_drive_stop,cal_encoderPins,cal_encoders,cal_servoPins,CFG,circle,circleFilled,clear,clear_bit,cog_end,cog_endStackTest,cog_num,cog_run,cog_runStackTest,cogIRcom,cogstart,cogstart_stackTest,cogstop_stackTest,colorPal_close,colorPal_getRGB,colorPal_init,colorPal_open,colorPal_reset,colorPalRRGGBB,compareRRGGBB,compass_init,compass_read,ComputeOutCode,constrain,contacts_count,contacts_displayAll,contacts_eraseAll,contacts_setStartAddr,count,cpcog,cursor,cursor_x,cursor_y,da_ctr_cog,da_ctr_stop,da_init,da_out,da_res,da_setupScale,da_useScale,da_volts,dac_close,dac_ctr,dac_ctr_cog,dac_ctr_res,dac_ctr_stop,dac_loop,dac_set,dac_setup,dac_start,dac_stop,dev_ee_show,dfs_mount,dhb10_com,dhb10_reply,dhb10_terminal,dport_ptr,dprint,dprinti,drive_calibrationResults,drive_clearTicks,drive_close,drive_com,drive_displayInterpolation,drive_encoderPins,drive_feedback,drive_getSpeed,drive_getTicks,drive_getTicksCalc,drive_goto,drive_gotoBlocking,drive_gotoDoneDelay,drive_gotoMode,drive_gotoStatus,drive_open,drive_pins,drive_ramp,drive_rampStep,drive_servoPins,drive_setAcceleration,drive_setErrorLimit,drive_setMaxSpeed,drive_setMaxVelocity,drive_setramp,drive_setRampStep,drive_sleep,drive_speed,drive_speedBlocking,drive_speeds,drive_stop,DRIVER_LIST_SIZE,dscan,dt_end,dt_fromDateStr,dt_fromEt,dt_fromTimeStr,dt_get,dt_getms,dt_run,dt_set,dt_toDateStr,dt_toEt,dt_toTimeStr,dte_dateETV,dte_timeETV,dte_toCal,dte_toJD,dte_toSPD,ee_badgeCheck,ee_config,ee_displayIndex,ee_getByte,ee_getFloat32,ee_getInt,ee_getStr,ee_init,ee_putByte,ee_putFloat32,ee_putInt,ee_putStr,ee_readByte,ee_readFloat32,ee_readInt,ee_readShort,ee_readStr,ee_writeByte,ee_writeFloat32,ee_writeInt,ee_writeShort,ee_writeStr,eeBadgeOk,eeBus,eeHome,eei2cLock,eei2cLockFlag,eeNext,eeNextAddr,eeprint,eeprinted,eeRecCount,eeRecHome,eeRecOffice,eeRecs,eeRecsAddr,eescan,encoderFeedback,encoderLeds_start,encoderLeds_stop,endianSwap,fclose,fdserial_close,fdserial_open,fdserial_rxChar,fdserial_rxCheck,fdserial_rxCount,fdserial_rxFlush,fdserial_rxPeek,fdserial_rxReady,fdserial_rxTime,fdserial_txChar,fdserial_txEmpty,fdserial_txFlush,fingerprint_add,fingerprint_allowOverwrite,fingerprint_close,fingerprint_countUsers,fingerprint_deleteUser,fingerprint_lookupUserPrivlage,fingerprint_open,fingerprint_readResponse,fingerprint_scan,fingerprint_sendCommand,fingerprint_setStrictness,fingerprint_setTimeout,float2string,font_lg_bubble_data,font_lg_bubble_index,font_lg_bubble_zeroMap,font_lg_sans_data,font_lg_sans_index,font_lg_sans_zeroMap,font_lg_script_data,font_lg_script_index,font_lg_script_zeroMap,font_lg_serif_data,font_lg_serif_index,font_lg_serif_zeroMap,font_med_bubble_data,font_med_sans_data_01,font_med_sans_data_02,font_med_sans_data_03,font_med_sans_data_04,font_med_sans_data_05,font_med_sans_data_06,font_med_sans_data_07,font_med_sans_data_08,font_med_sans_data_09,font_med_sans_data_10,font_med_sans_data_11,font_med_sans_data_12,font_med_sans_data_13,font_med_sans_data_14,font_med_sans_data_15,font_med_sans_data_16,font_med_sans_data_17,font_med_script_data,font_med_serif_data,fopen,fp,fread,free,freqout,get_bit,get_direction,get_directions,get_output,get_outputs,get_state,get_states,get8bitColor,getBin,getChar,getColorRRGGBB,getDec,getFloat,getHex,getStr,gps_altitude,gps_changeBaud,gps_close,gps_cog,gps_data,gps_fix,gps_fixValid,gps_heading,gps_latitude,gps_longitude,gps_magneticVariation,gps_open,gps_rawDate,gps_rawTime,gps_run,gps_satsTracked,gps_ser,gps_stack,gps_stopping,gps_txByte,gps_velocity,greypalette,gVgaScreen,gVgaText,hdserial,high,HSA,HSB,i2c_busy,i2c_in,i2c_newbus,i2c_open,i2c_out,i2c_poll,i2c_readByte,i2c_readData,i2c_start,i2c_stop,i2c_writeByte,i2c_writeData,i2cLock,imu_accelAvailable,imu_calibrateAG,imu_calibrateMag,imu_clearAccelInterrupt,imu_clearGyroInterrupt,imu_clearMagInterrupt,imu_getAccelCalibration,imu_getAccelScale,imu_getGyroCalibration,imu_getGyroScale,imu_getMagCalibration,imu_getMagScale,imu_gyroAvailable,imu_init,imu_magAvailable,imu_readAccel,imu_readAccelCalculated,imu_readGyro,imu_readGyroCalculated,imu_readMag,imu_readMagCalculated,imu_readTemp,imu_readTempCalculated,imu_setAccelCalibration,imu_setAccelInterrupt,imu_setAccelScale,imu_setGyroCalibration,imu_setGyroInterrupt,imu_setGyroScale,imu_setMagCalibration,imu_setMagInterrupt,imu_setMagScale,imu_SPIreadBytes,imu_SPIwriteByte,imu_tempAvailable,inbox,inBuff,init_MMA7660FC,input,INSIDE,int_fraction,interpolate2,interpolation_table_setup,invert,ir_receive,ir_send,IRA,IRB,irclear,ircom_dec,ircom_hex,ircom_rjdec,ircom_rx,ircom_rxcheck,ircom_rxflush,ircom_rxtime,ircom_start,ircom_stop,ircom_str,ircom_tx,ircom_tx_bin,ircom_txflush,irprint,irscan,irself,keypad_getNumber,keypad_getNumberEndKey,keypad_read,keypad_readFrom,keypad_setup,led,led_off,led_on,leddat,leds,ledsself,LEFT,letter,light_clear,light_set_all,light_set_rgb,light_set_rgb1,light_set_rgb2,light_start,light_stop,line,longjmp,low,main_ret,malloc,map,mark,memcpy,memmove,memset,MMA7455_getMode,MMA7455_getxyz10,MMA7455_getxyz8,MMA7455_gRange,MMA7455_gRangeVal,MMA7455_init,MMA7455_pinClk,MMA7455_pinDat,MMA7455_pinEn,MMA7455_readByte,MMA7455_setMode,MMA7455_setOffsetX,MMA7455_setOffsetY,MMA7455_setOffsetZ,MMA7455_writeByte,ms,ms_timer,mstime_get,mstime_reset,mstime_set,mstime_start,mstime_stop,mx_accel,mx_rotate,mx_tilt,NA,NB,NT,oledc_bitmap,oledc_clear,oledc_color565,oledc_copy,oledc_drawCharLarge,oledc_drawCharMedium,oledc_drawCharSmall,oledc_drawCircle,oledc_drawCircleHelper,oledc_drawFastHLine,oledc_drawFastVLine,oledc_drawLine,oledc_drawLinePrimative,oledc_drawNumber,oledc_drawPixel,oledc_drawPixelPrimative,oledc_drawRect,oledc_drawRoundRect,oledc_drawText,oledc_drawTriangle,oledc_fillCircle,oledc_fillCircleHelper,oledc_fillRect,oledc_fillRectPrimative,oledc_fillRoundRect,oledc_fillTriangle,oledc_font_sm,oledc_fontLoader,oledc_getCursorX,oledc_getCursorY,oledc_getHeight,oledc_getRotation,oledc_getWidth,oledc_goTo,oledc_init,oledc_invertDisplay,oledc_isScrolling,oledc_print,oledc_screenLock,oledc_screenLockClr,oledc_screenLockSet,oledc_scrollStart,oledc_scrollStop,oledc_setCursor,oledc_setRotation,oledc_setTextColor,oledc_setTextFont,oledc_setTextSize,oledc_setTextWrap,oledc_sleep,oledc_spiWrite,oledc_startup,oledc_wake,oledc_write,oledc_writeCommand,oleddat,oledprint,ParseGGA,ParseRMC,pause,ping,ping_cm,ping_inches,point,PrepBuff,print,printi,printNumber,ptrBuff,pulse_in,pulse_out,putBin,putBinLen,putChar,putDec,putDecLen,putFloat,putFloatPrecision,putHex,putHexLen,putLine,putln,putStr,putStrLen,pw,pwL,pwm_set,pwm_start,pwm_stop,pwR,r,rand,raw2g100,rc_time,readBin,readChar,readDec,readFloat,readHex,readStr,receive,remapColor,replace_byte,retrieve,reverse,rfid_disable,rfid_enable,rfid_get,rfid_open,rfid_reset,rfidser_close,rgb,rgbs,RIGHT,rotate180,RQA,RQB,S3,s3_booleanRandom,s3_buttonCount,s3_buttonPressed,s3_enableMic,s3_lightSensor,s3_lineSensor,s3_motorSet,s3_motorSetDistance,s3_motorSetRotate,s3_motorsMoving,s3_ping,s3_playNote,s3_randomRange,s3_readBars,s3_readMic,s3_readObstacle,s3_resetButtonCount,s3_runWithoutResult,s3_setLED,s3_setup,s3_setVoices,s3_setVolume,s3_simpleButton,s3_simpleDrive,s3_simpleLight,s3_simpleLine,s3_simpleObstacle,s3_simplePlay,s3_simpleRandom,s3_simpleSpin,s3_simpleStalled,s3_simpleStop,s3_stalled,scan,SCL,screen_auto,screen_char32x16,screen_char7x5,screen_dataAddr,screen_getAuto,screen_getBuffer,screen_GetDisplayHeight,screen_GetDisplayType,screen_GetDisplayWidth,screen_getSplash,screen_HIGH,screen_image,screen_init,screen_LOW,screen_scrollLeft,screen_scrollLeftDiag,screen_scrollRight,screen_scrollRightDiag,screen_scrollStop,screen_setcommand,screen_SHIFTOUT,screen_ssd1306_Command,screen_ssd1306_Data,screen_start,screen_stop,screen_string16x4,screen_string8x1,screen_string8x2,screen_swap,screen_update,screen_WRITEBUFF,screenLock,scribbler_align_with,scribbler_arc,scribbler_arc_by,scribbler_arc_deg,scribbler_arc_deg_now,scribbler_arc_now,scribbler_arc_to,scribbler_beep,scribbler_begin_path,scribbler_button_count,scribbler_button_mode,scribbler_button_press,scribbler_command_tone,scribbler_default_light_calibration,scribbler_default_line_threshold,scribbler_default_obstacle_threshold,scribbler_default_wheel_calibration,scribbler_delay_tenths,scribbler_ee_read_byte,scribbler_ee_write_byte,scribbler_end_path,scribbler_get_adc_results,scribbler_get_charging,scribbler_get_light_calibration,scribbler_get_line_threshold,scribbler_get_mic_env,scribbler_get_model_s2,scribbler_get_model_s3,scribbler_get_obstacle_threshold,scribbler_get_results,scribbler_get_sync,scribbler_get_timer,scribbler_get_usb_powered,scribbler_get_wheel_calibration,scribbler_go_back,scribbler_go_forward,scribbler_go_left,scribbler_go_right,scribbler_heading_is,scribbler_heading_is_deg,scribbler_here_is,scribbler_light_sensor,scribbler_light_sensor_log,scribbler_light_sensor_raw,scribbler_light_sensor_word,scribbler_line_sensor,scribbler_motion,scribbler_motion_addr,scribbler_move,scribbler_move_by,scribbler_move_now,scribbler_move_ready,scribbler_move_to,scribbler_moving,scribbler_obstacle,scribbler_play_pause,scribbler_play_sync,scribbler_play_tone,scribbler_play_tones,scribbler_read_light_calibration,scribbler_read_line_threshold,scribbler_read_obstacle_threshold,scribbler_read_wheel_calibration,scribbler_reset_button_count,scribbler_run_motors,scribbler_set_led,scribbler_set_leds,scribbler_set_light_calibration,scribbler_set_line_threshold,scribbler_set_obstacle_threshold,scribbler_set_power_off,scribbler_set_speed,scribbler_set_voices,scribbler_set_volume,scribbler_set_wheel_calibration,scribbler_stalled,scribbler_start,scribbler_start_mic_env,scribbler_start_motors,scribbler_start_timer,scribbler_start_tones,scribbler_stop_all,scribbler_stop_now,scribbler_turn,scribbler_turn_by,scribbler_turn_by_deg,scribbler_turn_deg,scribbler_turn_deg_now,scribbler_turn_now,scribbler_turn_to,scribbler_turn_to_deg,scribbler_wait_stop,scribbler_wait_sync,scribbler_wheels_now,scribbler_write_light_calibration,scribbler_write_line_threshold,scribbler_write_obstacle_threshold,scribbler_write_wheel_calibration,sd_mount,sleep,secondctr,self,send,serial_close,serial_open,serial_rxChar,serial_txChar,servo_angle,servo_disable,servo_get,servo_set,servo_setramp,servo_speed,servo_stop,servoAux_angle,servoAux_get,servoAux_set,servoAux_setRamp,servoAux_speed,servoAux_stop,set_1_blue,set_1_rgb,set_bit,set_direction,set_directions,set_drive_speed,set_io_dt,set_io_timeout,set_output,set_outputs,set_pause_dt,shape,shift_in,shift_out,sign,simpleterm_close,simpleterm_fromTxDo,simpleterm_open,simpleterm_pointer,simpleterm_reopen,simpleterm_toRxDi,sirc_button,sirc_code,sirc_device,sirc_setTimeout,sound_adsr,sound_config,sound_end,sound_endAllSound,sound_endSound,sound_envelopeSet,sound_envelopeStart,sound_freq,sound_freqRaw,sound_loadPatch,sound_note,sound_param,sound_playChords,sound_playSound,sound_run,sound_sampleSet,sound_volume,sound_wave,soundImpact,soundImpact_end,soundImpact_getCount,soundImpact_run,spdL,spdR,speedPrev,sprint,sprinti,SPUTC,SPUTL,SPUTS,square_wave,square_wave_cog,square_wave_setup,square_wave_stop,srand,sscan,sscan_ct,st_buscnt,st_eeInitFlag,st_eeprom,st_iodt,st_mark,st_msTicks,st_pauseTicks,st_timeout,st_usTicks,store,stored,strcmp,strcpy,string,string2float,stringView,strlen,strncmp,strstr,strtok,talk_end,talk_run,talk_say,talk_set_speaker,talk_spell,tcL,tcR,term,term_cmd,text_size,textbgcolor,textcolor,textsize,TFTINVERTED,TFTROTATION,TFTSCROLLING,ticksL,ticksR,timeout,timeTicksSetup,toggle,TOP,touch_start,TPCount,TPDischarge,TPPins,TRA,track,TRB,triangle,triangleFilled,us,UTA,UTB,vgatext_clear,vgatext_clearEOL,vgatext_close,vgatext_getColors,vgatext_getColumns,vgatext_getRows,vgatext_getX,vgatext_getY,vgatext_home,vgatext_open,vgatext_out,vgatext_putchar,vgatext_setColorPalette,vgatext_setColors,vgatext_setCoordPosition,vgatext_setX,vgatext_setXY,vgatext_setY,vgatext_start,vgatext_stop,VocalTract_aural_id,VocalTract_empty,VocalTract_full,VocalTract_go,VocalTract_sample_ptr,VocalTract_set_attenuation,VocalTract_set_pace,VocalTract_start,VocalTract_stop,wait,wav_close,wav_play,wav_playing,wav_reader,wav_stop,wav_volume,wavDacBufferH,wavDacBufferL,wifi_baud,wifi_buf,wifi_buf_size,wifi_bufferSize,wifi_command,wifi_comSelect,wifi_comSelectPin,wifi_connect,wifi_disconnect,wifi_event,wifi_fds,wifi_handle,wifi_id,wifi_ip,wifi_ipAddr,wifi_join,wifi_leave,wifi_listen,wifi_mode,wifi_msReplyTimeout,wifi_pin_di,wifi_pin_do,wifi_poll,wifi_print,wifi_recv,wifi_replyStringCopy,wifi_replyStringDisplay,wifi_replyStringIn,wifi_scan,wifi_send,wifi_setBuffer,wifi_simpletermResume,wifi_simpletermSuspend,wifi_start,wifi_stationIp,wifi_status,wifi_stop,wifi_stringDisplay,wifi_timeoutFlag,wrap,writeBin,writeBinLen,writeChar,writeDec,writeDecLen,writeFloat,writeFloatPrecision,writeHex,writeHexLen,writeLine,writeStr,writeStrLen,ws_start,ws2812_close,ws2812_open,ws2812_set,ws2812_start,ws2812_stop,ws2812_wheel,ws2812_wheel_dim,ws2812b_open,ws2812b_start';
}

/**
 * Order of operation ENUMs.
 *
 */
Blockly.propc.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.propc.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.propc.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.propc.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.propc.ORDER_ADDITIVE = 4; // + -
Blockly.propc.ORDER_SHIFT = 5; // << >>
Blockly.propc.ORDER_RELATIONAL = 7; // is is! >= > <= <
Blockly.propc.ORDER_EQUALITY = 8; // == != === !==
Blockly.propc.ORDER_BITWISE_AND = 9; // &
Blockly.propc.ORDER_BITWISE_XOR = 10; // ^
Blockly.propc.ORDER_BITWISE_OR = 11; // |
Blockly.propc.ORDER_LOGICAL_AND = 12; // &&
Blockly.propc.ORDER_LOGICAL_OR = 13; // ||
Blockly.propc.ORDER_CONDITIONAL = 14; // expr ? expr : expr
Blockly.propc.ORDER_ASSIGNMENT = 15; // := *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.propc.ORDER_NONE = 99; // (...)

/*
 * propc Board profiles
 *
 */
var profile = {
    "activity-board": {
        description: "Propeller Activity Board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["26", "26"], ["27", "27"]],
        analog: [["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 17,
        saves_to: [["Propeller Activity Board", "activity-board"], ["Propeller FLiP or Project Board", "flip"], ["Other Propeller Boards", "other"]]
    },
    "s3": {
        description: "Scribbler Robot",
        digital: [["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"]],
        analog: [["A0", "0"], ["A1", "1"]],
        baudrate: 9600,
        contiguous_pins_start: 0,
        contiguous_pins_end: 5,
        saves_to: [["Scribbler Robot", "s3"]]
    },
    "heb": {
        description: "Hackable Electronic Badge",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"]],
        analog: [],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 11,
        saves_to: [["Hackable Electronic Badge", "heb"]]
    },
    "flip": {
        description: "Propeller FLiP or Project Board",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"]],
        analog: [],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 27,
        saves_to: [["Propeller FLiP or Project Board", "flip"], ["Propeller Activity Board", "activity-board"], ["Other Propeller Boards", "other"]]
    },
    "other": {
        description: "Other Propeller Boards",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 27,
        saves_to: [["Other Propeller Boards", "other"], ["Propeller Activity Board", "activity-board"], ["Propeller FLiP or Project Board", "flip"]]
    },
    "propcfile": {
        description: "Propeller C (code-only)",
        digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"]],
        analog: [],
        baudrate: 115200,
        contiguous_pins_start: 0,
        contiguous_pins_end: 27,
        saves_to: []
    }
};
function setProfile(profileName) {
    if (profile[profileName]) {
        profile["default"] = profile[profileName];
    } else {
        profile["default"] = profile["other"];
    }

    window.parent.setBaudrate(profile["default"]["baudrate"]);
}

/**
 * Initialize the database of variable names.
 * @param {workspace} workspace The active workspace.
 */
Blockly.propc.init = function (workspace) {
// Create a dictionary of definitions to be printed before setups.
    Blockly.propc.definitions_ = {};
    Blockly.propc.definitions_["include simpletools"] = '#include "simpletools.h"';
    if (profile.default.description === "Scribbler Robot")
        Blockly.propc.definitions_[ "include_scribbler" ] = '#include "s3.h"';
    Blockly.propc.methods_ = {};
    Blockly.propc.method_declarations_ = {};
    // Create a dictionary of setups to be printed before the code.
    Blockly.propc.setups_ = {};
    Blockly.propc.global_vars_ = {};
    Blockly.propc.cog_methods_ = {};
    // Create a list of stacks
    Blockly.propc.stacks_ = [];
    Blockly.propc.vartype_ = {};
    Blockly.propc.varlength_ = {};
    Blockly.propc.serial_graphing_ = false;
    Blockly.propc.serial_terminal_ = false;
    if (Blockly.Variables) {
        if (!Blockly.propc.variableDB_) {
            Blockly.propc.variableDB_ =
                    new Blockly.Names(Blockly.propc.RESERVED_WORDS_);
        } else {
            Blockly.propc.variableDB_.reset();
        }

        var defvars = [];
        var variables = Blockly.Variables.allVariables(workspace);
        for (var x = 0; x < variables.length; x++) {
            var varName = Blockly.propc.variableDB_.getName(variables[x],
                    Blockly.Variables.NAME_TYPE);
            defvars[x] = '{{$var_type_' + varName + '}} ' + varName + '{{$var_length_' + varName + '}};';
        }

        for (var vardef in defvars)
            Blockly.propc.definitions_['variable' + vardef.toString(10)] = defvars[vardef];
    }
};
/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.propc.finish = function (code) {
    // Convert the definitions dictionary into a list.
    var imports = [];
    var methods = [];
    var declarations = [];
    var objects = [];
    var definitions = [];
    var function_vars = [];
    var cog_function = [];
    var user_var_start, user_var_end;

    // Gives BlocklyProp developers the ability to add global variables
    for (var name in Blockly.propc.global_vars_) {
        var def = Blockly.propc.global_vars_[name];

        definitions.push(def);
    }
    user_var_start = definitions.length;

    for (var name in Blockly.propc.definitions_) {
        var def = Blockly.propc.definitions_[name];
        if (def.match(/^#include/) || def.match(/^#define/) || def.match(/^#if/) ||
                def.match(/^#end/) || def.match(/^#else/) || def.match(/^#pragma/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
    }
    user_var_end = definitions.length;

    for (var declaration in Blockly.propc.method_declarations_) {
        declarations.push(Blockly.propc.method_declarations_[declaration]);
        for (var func_index in Blockly.propc.cog_methods_) {
            if (Blockly.propc.cog_methods_[func_index].replace(/[^\w]+/g, '') === Blockly.propc.method_declarations_[declaration].replace(/void/g, '').replace(/[^\w]+/g, '')) {
                cog_function.push(declaration);
            }
        }
    }

    for (var method in Blockly.propc.cog_methods_) {
        for (var variable in Blockly.propc.vartype_) {
            if (Blockly.propc.methods_[method].indexOf(variable) > -1) {
                function_vars.push(variable);
            }
        }
    }

    for (var method in Blockly.propc.methods_) {
        methods.push(Blockly.propc.methods_[method]);
    }

    var bigStr = ' = "\\0                                                                                                                               ';
    var endStr = '";';

    var spaceAdd = '';
    for (var def in definitions) {
        for (var variable in Blockly.propc.vartype_) {
            if (definitions[def].indexOf("{{$var_type_" + variable + "}}") > -1) {
                if (Blockly.propc.vartype_[variable] !== 'LOCAL') {
                    definitions[def] = definitions[def].replace("{{$var_type_" + variable + "}}", Blockly.propc.vartype_[variable]);
                } else {
                    definitions[def] = definitions[def].replace("{{$var_type_" + variable + "}} " + variable + '{{$var_length_' + variable + '}}', "");
                }
                if (Blockly.propc.varlength_[variable]) {
                    definitions[def] = definitions[def].replace("{{$var_length_" + variable + "}}", '[' + Blockly.propc.varlength_[variable] + ']');
                } else {
                    definitions[def] = definitions[def].replace("{{$var_length_" + variable + "}}", "");
                }
            }
        }

        if (definitions[def].indexOf("{{$var_type_") > -1) {
            definitions[def] = definitions[def].replace(/\{\{\$var_type_.*?\}\}/ig, "int").replace(/\{\{\$var_length_.*?\}\}/ig, '');
        }

        // This is for when we are ready to switch from pointers to character arrays
        // Currently applying a fix to allocate ~128 bytes to char array pointers because they are myseriouly getting compiled to the same memory location in the prop - ugh.
        // Excludes variables with "__" in the name for now because those are buffers for private functions
        // TODO: This is a temporary patch until I can figure something better out -MM
        if (definitions[def].indexOf("char *") > -1 && definitions[def].indexOf("__") === -1 && definitions[def].indexOf("rfidBfr") === -1 ) {
        //    definitions[def] = definitions[def].replace("char *", "char ").replace(";", "[128];");
            definitions[def] = definitions[def].replace(/char \*(\s*)(\w+);/g, 'char *$1$2' + bigStr + spaceAdd + endStr);
            spaceAdd += ' ';
        }
    }

    for (var stack in Blockly.propc.stacks_) {
        definitions.push(Blockly.propc.stacks_[stack]);
    }

    // Convert the setups dictionary into a list.
    var setups = [];
    for (var name in Blockly.propc.setups_)
        setups.push('  ' + Blockly.propc.setups_[name]);

    if (profile.default.description === "Scribbler Robot")
        setups.unshift('  s3_setup();pause(100);');
    
    // Add volatile to variable declarations in cogs
    for (var idx = user_var_start; idx < user_var_end; idx++) {
        for (var idk in function_vars) {
            if (definitions[idx].indexOf(function_vars[idk]) > 2 && definitions[idx].indexOf('volatile') === -1) {
                //TODO: uncomment this when optimization is utilized!
                //definitions[idx] = 'volatile ' + definitions[idx];
            }
        }
    }

    var spacer_defs = '\n\n';
    if (definitions.toString().trim().length > 0)
        spacer_defs += '// ------ Global Variables and Objects ------\n';

    var allDefs = '// ------ Libraries and Definitions ------\n' + imports.join('\n') +
            spacer_defs + definitions.join('\n') + '\n\n'; //int main() {\n  ' +
    var varInits = setups.join('\n') + '\n';

    if (code.indexOf('// RAW PROPC CODE\n//{{||}}\n') > -1) {
        var pcc = code.split('//{{||}}\n');
        return pcc[2];

    } else {
        // Indent every line.
        code = '  ' + code.replace(/\n/g, '\n  ');
        // Comment out any instance of 'pause(0);' - causes a compiler error
        code = code.replace(/\n\s+$/, '\n').replace(/pause\(0\);\n/g, '// pause(0);\n');
        // Remove redundant casts
        code = code.replace(/\(float\)\s*\(int\)/g, '(float)');
        // Sweep for doubled-up parentheses
        code = code.replace(/\(\(([^()]*)\)\)/g, '($1)');
        code = 'int main() {\n' + varInits + code + '\n}';
        var setup = '';
        if (Blockly.propc.serial_terminal_) {
            setup += "/* SERIAL_TERMINAL USED */\n";
        } else if (Blockly.propc.serial_graphing_) {
            setup += "/* SERIAL_GRAPHING USED */\n";
        }
        if (Blockly.mainWorkspace.getAllBlocks().length === 0 &&
                profile.default.description !== "Propeller C (code-only)") {
            setup += "/* EMPTY_PROJECT */\n";
        }

        var spacer_decs = '';
        if (declarations.length > 0)
            spacer_decs += '// ------ Function Declarations ------\n';

        var spacer_funcs = '\n\n';
        if (methods.length > 0)
            spacer_funcs += '// ------ Functions ------\n';

        //return setup + allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + methods.join('\n\n') + '\n\n' + code + '\n\n';
        return setup + allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') +
                spacer_decs + declarations.join('\n\n').replace(/\n\n+/g, '\n').replace(/\n*$/, '\n') +
                '\n// ------ Main Program ------\n' + code + spacer_funcs + methods.join('\n');
    }
};
/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.propc.scrubNakedValue = function (line) {
    return line + ';\n';
};
/**
 * Common tasks for generating Prop-c from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The propc code created for this block.
 * @return {string} Prop-c code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.propc.scrub_ = function (block, code) {
    if (code === null) {
        // Block has handled code generation itself.
        return '';
    }
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        if (comment) {
            commentCode += Blockly.propc.prefixLines(comment, '// ') + '\n';
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var x = 0; x < block.inputList.length; x++) {
            if (block.inputList[x].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[x].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.propc.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.propc.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

// Provides backward compatibility for some older browsers:
// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
;

// NOTE: Replaces core function!
Blockly.BlockSvg.prototype.setCollapsed = function (b) {
    if (this.collapsed_ !== b) {
        for (var c = [], a = 0, d; d = this.inputList[a]; a++)
            c.push.apply(c, d.setVisible(!b));
        for (a = 0; 10 > a; a++)
            this.getField("RANGEVALS" + a) && this.getField("RANGEVALS" + a).setVisible(!1);
        if (b) {
            d = this.getIcons();
            for (a = 0; a < d.length; a++)
                d[a].setVisible(!1);
            a = this.toString().replace(/[ANRS],.[0-9,-]+[ \xa0]/g, "\u00a0");
            a.length > Blockly.COLLAPSE_CHARS && (a = a.substr(0, Blockly.COLLAPSE_CHARS) + "...");
            this.appendDummyInput("_TEMP_COLLAPSED_INPUT").appendField(a).init();
        } else
            this.removeInput("_TEMP_COLLAPSED_INPUT"),
                    this.setWarningText(null);
        Blockly.BlockSvg.superClass_.setCollapsed.call(this, b);
        if (!c.length) {
            // No child blocks, just render this block.
            c[0] = this;
        }
        if (this.rendered) {
            for (var x = 0, block; block = c[x]; x++) {
                block.render();
            }
            this.bumpNeighbours_();
        }
    }
};

// NOTE!  Replaces core function:
/**
 * Given a proposed entity name, generate a name that conforms to the
 * [_A-Za-z][_A-Za-z0-9]* format that most languages consider legal for
 * variables.
 * @param {string} name Potentially illegal entity name.
 * @return {string} Safe entity name.
 * @private
 */
Blockly.Names.prototype.safeName_ = function (name) {
    if (!name) {
        name = 'unnamed';
    } else {
        // Unfortunately names in non-latin characters will look like
        // _E9_9F_B3_E4_B9_90 which is pretty meaningless.
        name = encodeURI(name.replace(/ /g, '_')).replace(/[^\w]/g, '_');
        // Most languages don't allow names with leading numbers.
        if ('0123456789'.indexOf(name[0]) !== -1 || (name[0] === '_' && name[1] === '_')) {  // addition here: prevents collision with names with a leading double undescore.
            name = 'my_' + name;
        }
    }
    return name;
};

// polyfill that removes duplicates from an array and sorts it
// From: https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    var tmpOut = out;
    try {
        var sorted = [];
        j = 0;
        while (out.length > 0) {
            len = out.length;
            k = 0;
            for (var i = 0; i < len; i++) {
                if (parseInt(out[i], 10) < parseInt(out[k], 10)) {
                    k = i;
                }
            }
            sorted[j] = out[k];
            j++;
            out.splice(k, 1);
        }
        return sorted;
    } catch (err) {
        return tmpOut;
    }
}
