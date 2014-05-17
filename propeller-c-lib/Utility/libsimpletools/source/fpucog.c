//
// COG helper for floating point operations
// This helper program supports 32 and 64 bit floating
// point operations. One COG is used to run the basic
// float and double routines (+, -, /, *) and conversions
// to/from integers
//
// Copyright (c) 2012 Total Spectrum Software Inc.
// Released under the MIT License (see the end of this file for details
//

// version 5 - fixed a problem with sticky bit in subtraction
// version 4 - fixed a problem with ECOG
// version 3 - added ECOG define and #ifdefs so compilation will work
//       with older PropGCC releases; got ITOF working again
// version 2 - fixed some problems with CMM mode
// version 1 - initial release

//
// Usage: just add fpucog.c to your command line compile, or to your
//   SimpleIDE project. The function start_fpu_cog() will be called
//   automatically (it is a constructor) and will start a COG to do
//   floating point processing.
//   To stop the cog call stop_fpu_cog(); after that no floating point
//   will be possible until start_fpu_cog() is called again.
//

/* configuration constants */

// Warning: ECOG is not tested yet, this is just a sketch of how it should
// work
//#define ECOG       // define this to place the COG code in a .ecog section

#include <propeller.h>
#include <cogload.h>

// __attribute__((fcache)) says to keep the whole function in the FCACHE
// whenever possible, which will make things faster if repeated floating
// point operations are performed

// however, the CMM fcache region is too small for some of these functions

#ifdef __PROPELLER_CMM__
#define FCACHE
#else
#define FCACHE __attribute__((fcache))
#endif

/* here are the commands that the FPU COG understands */
#define CMD_NOP  0   /* ignored */

/* double precision operations */
#define CMD_DADD 1  
#define CMD_DSUB 2
#define CMD_DMUL 3
#define CMD_DDIV 4

/* single precision operations */
#define CMD_FADD 5
#define CMD_FSUB 6
#define CMD_FMUL 7
#define CMD_FDIV 8

/* conversions: float to/from double, integer to float or double */
#define CMD_DTOF   9
#define CMD_FTOD  10
#define CMD_ITOF  11   /* signed integer to float */
#define CMD_UITOF 12   /* unsigned integer  to float */
#define CMD_ITOD  13   /* signed integer to double */
#define CMD_UITOD 14   /* unsigned integer to double */

/* the structure of the command data that we pass to the COG FPU */
/* the first 32 bits are the command (see defines above) */
/* next come 4 arguments; typically these are either 2 doubles
   (stored in little endian order, so lo word then high word for each)
   or two floats (occupying just the first two argument buffers)
*/
struct fpu_mbox {
    uint32_t cmd;
    uint32_t args[4];
};

/* A pointer to the command mailbox. To start a command we write the
   mailbox address here. When the COG is finished it will write 0.
   Note that both the pointer itself and the data it points to are volatile,
   hence the "volatile * volatile" syntax.
   This must be placed in hub RAM so the COG can read it with rdlong.
*/
static HUBDATA struct fpu_mbox volatile * volatile Cmdptr;

/* the COG that is running the FPU */
static int32_t ourCog;

#if defined(__PROPELLER_XMM__) || defined(__PROPELLER_XMMC__) || defined(__PROPELLER_USE_XMM__)
#define XMM  /* code is in external memory */
#define MAX_COG_SIZE (0x7C0)
#endif

/*
 * This constructor loads the FPU COG and starts it running. Note that
 * the __attribute__((constructor)) causes it to be run automatically
 * on startup; if you don't want the automatic start then delete that line.
 */

#ifdef ECOG
extern char _load_start_fpu_ecog[], _load_stop_fpu_ecog[];
char *_load_start_fpu_cog = _load_start_fpu_ecog;
char *_load_stop_fpu_cog = _load_stop_fpu_ecog;
#else
extern char _load_start_fpu_cog[], _load_stop_fpu_cog[];
#endif

#define cog_size (_load_stop_fpu_cog - _load_start_fpu_cog)

__attribute__((constructor))
int start_fpu_cog(void)
{

#if defined(XMM)
    /* code is in external memory; copy it to HUB memory (the
       temp array is on the stack and hence in HUB) and
       execute it from there
    */
    char temp[MAX_COG_SIZE];
    memcpy(temp, _load_start_fpu_cog, cog_size);
    Cmdptr = 0;
    ourCog = 1 + cognew(temp, (void *)&Cmdptr);
#elif defined(ECOG)
    /* code is in EEPROM */
    ourCog = 1 + cognewFromBootEeprom(_load_start_fpu_cog, cog_size, (void *)&Cmdptr);
#else
    Cmdptr = 0;
    ourCog = 1 + cognew(_load_start_fpu_cog, (void *)&Cmdptr);
#endif
    return ourCog - 1;
}

/*
 * Utility routine to stop the FPU COG. You almost never will want to do this,
 * because once the COG stops floating point will be completely unavailable
 * (it is not possible to drop back to the old software floating point, because
 * they won't even be linked in). Of course you could call start_fpu_cog()
 * to start it up again.
 */
void stop_fpu_cog(void)
{
    if (ourCog > 0) {
        cogstop(ourCog - 1);
        ourCog = 0;
    }
}

//////////////////////////////////////////////////////////////////////
// Here are some utility functions for converting representations
// between int and float. Note that these do *not* change the bit patterns,
// just how C interprets them. This is necessary because a cast from
// float to int actually converts from float to int, whereas we just want
// to pretend that a 32 bit float is really a 32 bit int when we store
// it into memory.
// These functions will be optimized away on any kind of optimization level
// (other than -O0), since they don't actually do anything.
//////////////////////////////////////////////////////////////////////

//
// utility to convert int32_t to float without actually changing
// any bits (just like a reinterpret cast)
//

static inline float asFloat(int32_t x)
{
    union { float f; int32_t i; } a;
    a.i = x;
    return a.f;
}
// and the reverse
static inline int32_t asInt(float x)
{
    union { float f; int32_t i; } a;
    a.f = x;
    return a.i;
}

//
// utilities to convert 64 bit doubles to/from 32 bit integers
//
typedef struct hilo {
    uint32_t lo;
    uint32_t hi;
} HiLo;

// extract the high part of a double
static inline uint32_t intHi(double x)
{
    union { double d; HiLo i; } a;
    a.d = x;
    return a.i.hi;
}
// extract the low part of a double
static inline uint32_t intLo(double x)
{
    union { double d; HiLo i; } a;
    a.d = x;
    return a.i.lo;
}
// treat a pair of 64 bit bit pattern as an IEEE double
static inline double asDouble(uint64_t x)
{
    union { double d; uint64_t i; } a;
    a.i = x;
    return a.d;
}

///////////////////////////////////////////////////////////////////

//
// issue a command with 4 32 bit arguments
// the "cmd" parameter is last so that callers do not have
// to shuffle parameters around (normally the first parameter is
// passed in r0, second in r1, and so on)
//

FCACHE
static uint64_t doCmdxxxx(uint32_t A, uint32_t B, uint32_t C, uint32_t D, int32_t cmd)
{
    volatile struct fpu_mbox Cmd;
    volatile uint32_t *ptr;
    ptr = &Cmd.cmd;
    *ptr++ = cmd;
    *ptr++ = A;
    *ptr++ = B;
    *ptr++ = C;
    *ptr = D;

    /* issue the command */
    Cmdptr = &Cmd;
    /* wait for the FPU to finish */
    do {
        ;
    } while (Cmdptr);

    // The result is placed by the FPU into the first two words of the
    // argument structure. The machine is little endian, so the LSB
    // is in args[0] and MSB in args[1]. Also note that if only one word
    // of the result is valid it's in args[0], and should be returned in
    // the LSB of the 64 bit result (the compiler places 32 bit results in
    // r0, and 64 bit results in r0 and r1 with r0 being the low word and
    // r1 the high word).

    return Cmd.args[0] | ((uint64_t)Cmd.args[1]<<32LL);
}

//
// the same thing, but with just 2 32 bit arguments (1 double or 2 floats)
//
FCACHE
static uint64_t doCmdxx(uint32_t A, uint32_t B, int32_t cmd)
{
    static volatile struct fpu_mbox Cmd;
    volatile uint32_t *ptr;
    ptr = &Cmd.cmd;
    *ptr++ = cmd;
    *ptr++ = A;
    *ptr++ = B;

    /* issue the command */
    Cmdptr = &Cmd;
    /* wait for the FPU to finish */
    do {
        ;
    } while (Cmdptr);

    // now return the two result words, packed into a 64 bit long long
    return Cmd.args[0] | ((uint64_t)Cmd.args[1]<<32LL);
}

/*
 * macro for issuing a command with 2 double arguments and getting a double back */

#define doDCmd2d(A, B, cmd) asDouble(doCmdxxxx(intLo(A), intHi(A), intLo(B), intHi(B), cmd))

/* issue a command with 1 integer argument and get 1 double back */
#define doDCmd1i(A, cmd) asDouble(doCmdxx(A, 0, cmd))


/* issue a command with 2 floats that gets one double back */
#define doFCmd2f(A, B, cmd)  asFloat(doCmdxx(asInt(A), asInt(B), cmd))

/* issue a command with 1 integer argument and get 1 float back */
#define doFCmd1i(A, cmd)  asFloat(doCmdxx(A, 0, cmd))

//
// The actual commands are here.
// If TEST is defined we use some neutral names (like "testadd") which
// allow us to run the new code alongside the old software based floating
// point. This is solely for testing purposes.
// Normally we use names like ___addsf3 which are the names in GNU libc
// for the floating point operations; this means we completely replace the
// software floating point functions.
//
#ifdef TEST
#define ADDDF testadd
#define SUBDF testsub
#define MULDF testmul
#define DIVDF testdiv

#define ADDSF testadds
#define SUBSF testsubs
#define MULSF testmuls
#define DIVSF testdivs

#define FLOATSISF testitof
#define FLOATUNSSISF testuitof
#define FLOATSIDF testitod
#define FLOATUNSSIDF testuitod

#define DOUBLETOFLOAT testdtof
#define FLOATTODOUBLE testftod

#else

#define ADDDF __adddf3
#define SUBDF __subdf3
#define MULDF __muldf3
#define DIVDF __divdf3

#define ADDSF __addsf3
#define SUBSF __subsf3
#define MULSF __mulsf3
#define DIVSF __divsf3

#define FLOATSISF __floatsisf
#define FLOATUNSSISF __floatunssisf
#define FLOATSIDF __floatsidf
#define FLOATUNSSIDF __floatunssidf

#define DOUBLETOFLOAT __truncdfsf2
#define FLOATTODOUBLE __extendsfdf2

#endif

double ADDDF(double A, double B)
{
    return doDCmd2d(A, B, CMD_DADD);
}
double SUBDF(double A, double B)
{
    return doDCmd2d(A, B, CMD_DSUB);
}
double MULDF(double A, double B)
{
    return doDCmd2d(A, B, CMD_DMUL);
}
double DIVDF(double A, double B)
{
    return doDCmd2d(A, B, CMD_DDIV);
}


float ADDSF(float A, float B)
{
    return doFCmd2f(A, B, CMD_FADD);
}
float SUBSF(float A, float B)
{
    return doFCmd2f(A, B, CMD_FSUB);
}
float MULSF(float A, float B)
{
    return doFCmd2f(A, B, CMD_FMUL);
}
float DIVSF(float A, float B)
{
    return doFCmd2f(A, B, CMD_FDIV);
}

/* convert int to float */
float FLOATSISF(int32_t A)
{
    return doFCmd1i(A, CMD_ITOF);
}
float FLOATUNSSISF(uint32_t A)
{
    return doFCmd1i(A, CMD_UITOF);
}

/* convert int to double */
double FLOATSIDF(int32_t A)
{
    return doDCmd1i(A, CMD_ITOD);
}
double FLOATUNSSIDF(uint32_t A)
{
    return doDCmd1i(A, CMD_UITOD);
}

/* convert float to double */
double FLOATTODOUBLE(float A)
{
    return doDCmd1i(asInt(A), CMD_FTOD);
}

/* convert double to float */
float DOUBLETOFLOAT(double D)
{
    return doFCmd2f(asFloat(intLo(D)), asFloat(intHi(D)), CMD_DTOF);
}

/////////////////////////////////////////////////////////
// end of C code
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//
// here is the actual COG program
// The theory of operation is pretty straightforward; internally we
// convert all floats or doubles to a 4.60 mantissa (A, Alo)
// and a 32 bit exponent (Aexp), plus some flag bits (Aflag) which
// hold the sign, and whether the number was 0, Infinity, or Not A Number
//


__asm__(
    // sections ending in .cog are treated by the linker as overlays
    // for COG memory, which is exactly what we want since we plan to
    // put this into a COG
#if defined(ECOG)
"       .section .fpu.ecog, \"ax\"\n"
#else
"       .section .fpu.cog, \"ax\"\n"
#endif

"       .compress off\n"

    // some defines for our assembly code; note that using #define is
    // very awkward because macro replacement doesn't usually happen inside
    // strings (we'd have to do a lot of fiddling with the preprocessor
    // stringize and token pasting operators, which is more trouble than it is
    // worth)

"       .equ FLAG_SIGN, 0x1   ' indicates negative number\n"
"       .equ FLAG_ZERO, 0x2   ' indicates a zero (may be -0.0)\n"  
"       .equ FLAG_INF,  0x4   ' indicates an infinite quanity\n"
"       .equ FLAG_NAN,  0x8   ' indicates not a number\n"
"       .equ FLAG_STICKY, 0x10 ' indicates some bits have been shifted off to the right; used for correct rounding\n"

"       .equ FBIAS_EXP, 127   ' bias of 32 bit float exponents\n"
"       .equ FMAX_EXP,  255   ' maximum exponent for a 32 bit float\n"

"'----------------------------\n"
"' Main control loop\n"
"'----------------------------\n"
" \n"
"                org     0 \n"

"cmdTable        jmp     #double_entry\n"
"\n"
"cmdDAdd         jmp     #DAdd\n"  /* cmd 1 */
"cmdDSub         jmp     #DSub\n"
"cmdDMul         jmp     #DMul\n"
"cmdDDiv         jmp     #DDiv\n"
"\n"
"cmdFAdd         jmp     #FAdd\n"  /* cmd 5 */
"cmdFSub         jmp     #FSub\n"
"cmdFMul         jmp     #FMul\n"
"cmdFDiv         jmp     #FDiv\n"
"\n"
"cmdDToF         jmp     #DToF\n"  /* cmd 9 */
"cmdFToD         jmp     #FToD\n"
"\n"
"cmdIToF         jmp     #IToF\n"  /* cmd 11 */
"cmdUIToF        jmp     #UIToF\n"
"\n"
"cmdIToD         jmp     #IToD\n"
"cmdUIToD        jmp     #UIToD\n"
"\n"
"cmdErr          jmp     #DErr\n"
"\n"
"retaddr         long 0\n"
"\n"
"ir0             long 0\n"
"ir1             long 0\n"
"ir2             long 0\n"
"ir3             long 0\n"
"cmd             long 0\n"
"cmd_ptr         long 0\n"
"\n"
"double_entry\n"
"                mov     cmdTable, cmdErr                ' make command 0 be error\n"
"cmdloop\n"
"                rdlong cmd_ptr, par wz\n"
"        if_z    jmp    #cmdloop\n"
"\n"
"                rdlong cmd, cmd_ptr\n"
"                add    cmd_ptr, #4\n"
"                max    cmd, #(cmdErr-cmdTable)/4\n"
"                \n"
"                rdlong  ir0, cmd_ptr\n"
"                add     cmd_ptr, #4\n"
"                rdlong  ir1, cmd_ptr\n"
"                add     cmd_ptr, #4\n"
"                rdlong  ir2, cmd_ptr\n"
"                add     cmd_ptr, #4\n"
"                rdlong  ir3, cmd_ptr\n"
"                sub     cmd_ptr, #12\n"
"\n"
"                jmpret  retaddr, cmd\n"
"                '' results are in ir0 and ir1\n"
"                wrlong  ir0, cmd_ptr\n"
"                add     cmd_ptr, #4\n"
"                wrlong  ir1, cmd_ptr\n"
"\n"
"                mov     ir0, #0\n"
"                wrlong  ir0, par\n"
"                jmp     #cmdloop\n"
"\n"
"DBIAS_EXP       long    1023\n"
"DMAX_EXP        long    $7ff\n"
"'' mask for double mantissa (high word)\n"
"DMANTMASK       long    $000FFFFF\n"
"'' mask for float mantissa\n"
"FMANTMASK       long    $007FFFFF\n"
"\n"
"                ''\n"
"                '' code to unpack a double in A, Alo\n"
"                '' the IEEE format is 1 bit sign, 11 bit exponent,\n"
"                '' then 52 bit mantissa\n"
"                ''\n"
"DUnpack\n"
"                mov     Aflag, #0\n"
"                mov     Aexp, A\n"
"                shl     Aexp, #1 wc\n"
"        if_c    or      Aflag, #FLAG_SIGN\n"
"                and     A, DMANTMASK    ' mask off exponent and sign bit\n"
"                shr     Aexp, #21 wz    ' extract exponent\n"
"        if_z    jmp     #_Ddenorm       ' zero or denormal\n"
"                cmp     Aexp, DMAX_EXP wz\n"
"                sub     Aexp, DBIAS_EXP  ' remove bias\n"
"        if_z    jmp     #_Dnan          ' NaN or Infinity\n"
"\n"
"                '' now shift up to 4.28 to give head room\n"
"                '' we start with 1.20\n"
"                mov     tmp0, Alo\n"
"                shl     A, #8\n"
"                shl     Alo, #8\n"
"                shr     tmp0, #24\n"
"                or      A, tmp0\n"
"                or      A, one_4_28     '' or in implied one\n"
"DUnpack_ret\n"
"                ret\n"
"\n"
"                '' normalize a denormalized number\n"
"_Ddenorm\n"
"                sub     Aexp, DBIAS_EXP\n"
"                '' adjust for converting from 1.52 to 1.60\n"
"                add     Aexp, #(1+8)\n"
"                '' check for all 0\n"
"                or       A, Alo nr,wz\n"
"        if_z    sub      Aexp, #64\n"
"        if_z    or       Aflag, #FLAG_ZERO\n"
"        if_z    jmp      DUnpack_ret\n"
"                '' not all 0, renormalize\n"
"                call   #Normalize\n"
"                jmp    DUnpack_ret\n"
"\n"
"                '' handle NaN or Infinity\n"
"_Dnan\n"
"                mov     Aexp, DMAX_EXP\n"
"                or      A, Alo nr, wz   '' check for infinity\n"
"        if_z    or      Aflag, #FLAG_INF\n"
"        if_z    mov     A, one_4_28\n"
"        if_nz   or      Aflag, #FLAG_NAN\n"
"        if_nz   add     Aexp, Aexp\n"
"                jmp     DUnpack_ret\n"
"\n"
"                ''\n"
"                '' code to unpack a single precision float in A\n"
"                '' the IEEE format is 1 bit sign, 8 bit exponent,\n"
"                '' then 23 bit mantissa\n"
"                ''\n"
"FUnpack\n"
"                mov     Alo, #0\n"
"                mov     Aflag, #0\n"
"                mov     Aexp, A\n"
"                shl     Aexp, #1 wc\n"
"        if_c    or      Aflag, #FLAG_SIGN\n"
"                and     A, FMANTMASK    ' mask off exponent and sign bit\n"
"                shr     Aexp, #24 wz    ' extract exponent\n"
"        if_z    jmp     #_Fdenorm       ' zero or denormal\n"
"                cmp     Aexp, #FMAX_EXP wz\n"
"                sub     Aexp, #FBIAS_EXP  ' remove bias\n"
"        if_z    jmp     #_Fnan          ' NaN or Infinity\n"
"\n"
"                '' now shift up to 4.28 to give head room\n"
"                '' we start with 1.23\n"
"                shl     A, #5\n"
"                or      A, one_4_28     '' or in implied one\n"
"FUnpack_ret\n"
"                ret\n"
"\n"
"                '' handle NaN or Infinity\n"
"_Fnan\n"
"                mov     Aexp, #FMAX_EXP\n"
"                or      A, Alo nr, wz   '' check for infinity\n"
"        if_z    or      Aflag, #FLAG_INF\n"
"        if_z    mov     A, one_4_28\n"
"        if_nz   or      Aflag, #FLAG_NAN\n"
"        if_nz   add     Aexp, Aexp\n"
"                jmp     FUnpack_ret\n"
"\n"
"                '' normalize a denormalized number\n"
"_Fdenorm\n"
"                sub     Aexp, #FBIAS_EXP\n"
"                '' adjust for converting from 1.23 to 1.28\n"
"                add     Aexp, #(1+5)\n"
"                '' check for all 0\n"
"                cmp      A,#0 nr,wz\n"
"        if_z    sub      Aexp, #511\n"
"        if_z    or       Aflag, #FLAG_ZERO\n"
"        if_z    jmp      FUnpack_ret\n"
"                '' not all 0, renormalize\n"
"                call   #Normalize\n"
"                jmp    FUnpack_ret\n"
"\n"
"\n"
"                ''\n"
"                '' re-normalize A to 4.28 format\n"
"                ''\n"
"Normalize\n"
"                '' check for 0\n"
"                or      A, Alo wz, nr\n"
"        if_nz   jmp     #_down\n"
"                or      Aflag, #FLAG_ZERO\n"
"                jmp     Normalize_ret\n"
"\n"
"                '' shift down if necessary\n"
"_down\n"
"                test    A, bigmask_28 wz\n"
"        if_z    jmp     #_up\n"
"                add     Aexp, #1\n"
"                shr     A, #1 wc\n"
"                rcr     Alo, #1 wc\n"
"        if_c    or      Aflag, #FLAG_STICKY     ' remember we lost bits\n"
"                jmp     #_down\n"
"\n"
"_up\n"
"                test   A, one_4_28 wz\n"
"        if_nz   jmp    #_renorm_done\n"
"_renorm\n"
"                shl    Alo, #1 wc\n"
"                rcl    A, #1\n"
"                sub    Aexp, #1\n"
"                test   A, one_4_28 wz\n"
"        if_z    jmp    #_renorm\n"
"\n"
"_renorm_done\n"
"Normalize_ret\n"
"                ret\n"
"\n"
"                ''\n"
"                '' pack a 4.60 number in A,Alo back to an IEEE double\n"
"                '' in ir1,ir0\n"
"                ''\n"
"                '' need to handle rounding and such!\n"
"                ''\n"
"                '' input is assumed to be normalized\n"
"                ''\n"
"DPack\n"
"                call    #Normalize\n"
"                test    Aflag, #(FLAG_INF|FLAG_NAN|FLAG_ZERO) wz\n"
"        if_nz   jmp     #dpack_excep\n"
"\n"
"                '' fix up exponent\n"
"                add     Aexp, DBIAS_EXP\n"
"                cmps    Aexp, #0 wz, wc\n"
"        if_be   call    #dpack_denorm\n"
"                max     Aexp, DMAX_EXP wc\n"
"        if_nc   jmp     #dpack_excep\n"
"\n"
"                '' round here\n"
"                '' we clear the implied one first, and allow the\n"
"                '' rounding to propagate up to it\n"
"                andn    A, one_4_28\n"
"                test    Aflag, #FLAG_STICKY wz\n"
"\n"
"                '' we have 4.60, we want to round to 4.52\n"
"                '' half of the lsb is therefore 0x80\n"
"                '' we also want to round to nearest even, so\n"
"                '' add a sticky bit if the lsb is set\n"
"                test    Alo, #$100 wc\n"
"    if_nz_or_c  or      Alo, #1\n"
"                add     Alo, #$7f wc\n"
"                addx    A, #0\n"
"\n"
"dpack_exp\n"
"                '' now shift down to 12.52\n"
"                shr     Alo,#8\n"
"                mov     tmp0,A\n"
"                shr     A,#8\n"
"                shl     tmp0,#24\n"
"                or      Alo,tmp0\n"
"\n"
"                shl     Aexp, #20\n"
"\n"
"                mov     ir0, Alo\n"
"                mov     ir1, A\n"
"                add     ir1, Aexp\n"
"\n"
"                shl     Aflag, #31\n"
"                or      ir1, Aflag\n"
"DPack_ret\n"
"                ret\n"
"\n"
"                ''\n"
"                '' exponent is <=0, so we have to create an IEEE denormalized\n"
"                '' number\n"
"dpack_denorm\n"
"\n"
"                abs     Aexp, Aexp\n"
"                add     Aexp, #1\n"
"_ddlp\n"
"                shr     A, #1 wc\n"
"                rcr     Alo, #1 wc\n"
"        if_c    or      Aflag, #FLAG_STICKY\n"
"                djnz    Aexp, #_ddlp\n"
"\n"
"dpack_denorm_ret\n"
"                ret\n"
"dpack_excep\n"
"                mov     A, #0\n"
"                mov     Alo, #0\n"
"                mov     Aexp, DMAX_EXP\n"
"                test    Aflag, #FLAG_NAN wz\n"
"        if_nz   mov     A, one_4_28\n"
"        if_nz   shr     A, #1\n"
"        if_nz   jmp     #dpack_exp\n"
"                test    Aflag, #FLAG_ZERO wz\n"
"        if_nz   mov     Aexp, #0\n"
"                jmp     #dpack_exp\n"
"\n"
"                ''\n"
"                '' unpack (ir1,ir0) into A and (ir3,ir2) into B\n"
"                ''\n"
"DUnpack2\n"
"                mov     A,ir3\n"
"                mov     Alo,ir2\n"
"                call    #DUnpack\n"
"                mov     B,A\n"
"                mov     Blo,Alo\n"
"                mov     Bflag,Aflag\n"
"                mov     Bexp,Aexp\n"
"                mov     A,ir1\n"
"                mov     Alo,ir0\n"
"                call    #DUnpack\n"
"DUnpack2_ret\n"
"                ret\n"
"\n"
"                ''\n"
"                '' pack a 4.60 number in A back to an IEEE float\n"
"                '' in ir0\n"
"                ''\n"
"                '' need to handle rounding and such!\n"
"                ''\n"
"                '' input is assumed to be normalized\n"
"                ''\n"
"FPack\n"
"                call    #Normalize\n"
"                test    Aflag, #(FLAG_INF|FLAG_NAN|FLAG_ZERO) wz\n"
"        if_nz   jmp     #fpack_excep\n"
"\n"
"                '' fix up exponent\n"
"                add     Aexp, #FBIAS_EXP\n"
"                cmps    Aexp, #0 wz, wc\n"
"        if_be   call    #fpack_denorm\n"
"                max     Aexp, #FMAX_EXP wc\n"
"        if_nc   jmp     #fpack_excep\n"
"\n"
"                '' round here\n"
"                '' we clear the implied one first, and allow the\n"
"                '' rounding to propagate up to it\n"
"                andn    A, one_4_28\n"
"                cmp     Alo,#0 wz\n"
"        if_nz   or      A, #1\n"
"                test    Aflag, #FLAG_STICKY wz\n"
"                '' we have 4.28, we want to round to 4.23\n"
"                '' half of the lsb is therefore 0x10\n"
"                '' we also round to nearest even, so add a sticky\n"
"                '' bit if lsb is set\n"
"                test    A, #$20 wc\n"
"    if_nz_or_c  or      A, #1\n"
"\n"
"                add     A, #$f\n"
"\n"
"fpack_exp\n"
"                '' now shift down to 9.23\n"
"                shr     A,#5\n"
"\n"
"                shl     Aexp, #23\n"
"\n"
"                mov     ir0, A\n"
"                add     ir0, Aexp\n"
"\n"
"                shl     Aflag, #31\n"
"                or      ir0, Aflag\n"
"FPack_ret\n"
"                ret\n"
"\n"
"                ''\n"
"                '' exponent is <=0, so we have to create an IEEE denormalized\n"
"                '' number\n"
"fpack_denorm\n"
"\n"
"                abs     Aexp, Aexp\n"
"                add     Aexp, #1\n"
"_fdlp\n"
"                shr     A, #1 wc\n"
"        if_c    or      Aflag, #FLAG_STICKY\n"
"                djnz    Aexp, #_fdlp\n"
"\n"
"fpack_denorm_ret\n"
"                ret\n"
"fpack_excep\n"
"                mov     A, #0\n"
"                mov     Aexp, #FMAX_EXP\n"
"\n"
"                test    Aflag, #FLAG_NAN wz\n"
"        if_nz   mov     A, one_4_28\n"
"        if_nz   shr     A, #1\n"
"        if_nz   jmp     #fpack_exp\n"
"                test    Aflag, #FLAG_ZERO wz\n"
"        if_nz   mov     Aexp, #0\n"
"                jmp     #fpack_exp\n"
"\n"
"                ''\n"
"                '' unpack 2 floats in ir0,ir1 into A,B\n"
"                ''\n"
"FUnpack2\n"
"                mov     A, ir1\n"
"                call    #FUnpack\n"
"                mov     Blo,Alo\n"
"                mov     B, A\n"
"                mov     Bflag,Aflag\n"
"                mov     Bexp,Aexp\n"
"                mov     A, ir0\n"
"                call    #FUnpack\n"
"FUnpack2_ret\n"
"                ret\n"
"\n"
"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n"
"'' Actual commands start here\n"
"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n"
"\n"
"        '' error command: returns an error status in ir0, ir1\n"
"DErr\n"
"                neg     ir0, #1\n"
"                neg     ir1, #1\n"
"                jmp     retaddr\n"
"\n"
"        '' addition and subtraction\n"
"DSub\n"
"                xor     ir3, Bit31\n"
"                '' fall through\n"
"\n"
"DAdd\n"
"                call    #DUnpack2\n"
"                call    #_Add\n"
"                call    #DPack\n"
"                jmp     retaddr\n"
"\n"
"DMul\n"
"                call    #DUnpack2\n"
"                call    #_Mul\n"
"                call    #DPack\n"
"                jmp     retaddr\n"
"\n"
"DDiv\n"
"                call    #DUnpack2\n"
"                call    #_Div\n"
"                call    #DPack\n"
"                jmp     retaddr\n"
"\n"
"        '' single precision operations\n"
"FSub\n"
"                xor     ir1, Bit31\n"
"                '' fall through\n"
"\n"
"FAdd\n"
"                call    #FUnpack2\n"
"                call    #_Add\n"
"                call    #FPack\n"
"                jmp     retaddr\n"
"\n"
"FMul\n"
"                call    #FUnpack2\n"
"                call    #_Mul\n"
"                call    #FPack\n"
"                jmp     retaddr\n"
"\n"
"FDiv\n"
"                call    #FUnpack2\n"
"                mov     Alo, A\n"
"                mov     Blo, B\n"
"                mov     A, #0\n"
"                mov     B, #0\n"
"                call    #_DivSmall\n"
"                mov     A, Alo\n"
"                mov     B, Blo\n"
"                mov     Alo, #0\n"
"                mov     Blo, #0\n"
"                call    #FPack\n"
"                jmp     retaddr\n"
"\n"
"        '' conversion operations\n"
"        '' single to double\n"
"FToD\n"
"                mov     A, ir0\n"
"                call    #FUnpack\n"
"                call    #DPack\n"
"                jmp     retaddr\n"
"\n"
"        '' double to single\n"
"DToF\n"
"                mov     A, ir1\n"
"                mov     Alo, ir0\n"
"                call    #DUnpack\n"
"                call    #FPack\n"
"                jmp     retaddr\n"
"\n"

"\n"
"doint\n"
"        if_z    mov     ir1, #0\n"
"        if_z    jmp     retaddr         '' 0 -> 0\n"
"                mov     Alo, #0\n"
"                mov     Aexp,#28        '' set the exponent\n"
"                cmp     ir2, #0 wz\n"
"        if_nz   jmp     #_dblint\n"
"                call    #FPack\n"
"                jmp     retaddr\n"
"_dblint\n"
"                call    #DPack\n"
"                jmp     retaddr\n"
"\n"
"        '' 32 bit signed integer to float\n"
"IToF\n"
"                abs     A, ir0 wc, wz\n"
"                mov     Aflag, #0\n"
"        if_c    or      Aflag, #FLAG_SIGN\n"
"                mov     ir2, #0          '' single precision\n"
"                jmp     #doint\n"

"        '' 32 bit unsigned integer to float\n"
"UIToF\n"
"                mov     A, ir0 wz,wc\n"
"                mov     Aflag, #0\n"
"                mov     ir2, #0          '' single precision\n"
"                jmp     #doint\n"
"\n"
"        '' 32 bit signed integer to double\n"
"IToD\n"
"                abs     A, ir0 wc, wz\n"
"                mov     Aflag, #0\n"
"        if_c    or      Aflag, #FLAG_SIGN\n"
"                mov     ir2, #1          '' double precision\n"
"                jmp     #doint\n"
"        '' 32 bit unsigned integer to double\n"
"UIToD\n"
"                mov     A, ir0 wz\n"
"                mov     Aflag, #0\n"
"                mov     ir2, #1          '' double precision\n"
"                jmp     #doint\n"

"\n"
"\n"
"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n"
"'' Utility functions go here\n"
"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''\n"
"\n"
"                ''\n"
"                '' the actual add routine\n"
"                ''\n"
"_Add\n"
"                '' swap so magnitude of A is bigger than that of B\n"
"                '' NOTE: we are assuming here that infinity is given\n"
"                '' a big Aexp, and 0 a very tiny one\n"
"                cmps    Aexp, Bexp wc,wz\n"
"        if_a    jmp     #_addnoswap\n"
"        if_b    jmp     #_addswap\n"
"                cmp     Alo,Blo wz,wc\n"
"                cmpx    A,B     wz,wc\n"
"        if_ae   jmp     #_addnoswap\n"
"_addswap\n"
"                mov     tmp0,Aflag\n"
"                mov     tmp1,Aexp\n"
"                mov     Aflag,Bflag\n"
"                mov     Aexp, Bexp\n"
"                mov     Bflag,tmp0\n"
"                mov     Bexp, tmp1\n"
"                mov     tmp0, A\n"
"                mov     tmp1, Alo\n"
"                mov     A, B\n"
"                mov     Alo, Blo\n"
"                mov     B, tmp0\n"
"                mov     Blo, tmp1\n"
"\n"
"_addnoswap\n"
"                '' shift B down as necessary\n"
"                mov      tmp0,Aexp\n"
"                sub      tmp0,Bexp wz\n"
"        if_z    jmp      #_doadd\n"
"                cmp      tmp0,#32 wz,wc\n"
"        if_b    jmp      #_addshift\n"
"                cmp      Blo,#0   wz,wc\n"
"        if_nz   or       Aflag, #FLAG_STICKY\n"
"                mov      Blo, B\n"
"                mov      B, #0\n"
"                sub      tmp0,#32 wz\n"
"        if_z    jmp      #_doadd\n"
"_addshift\n"
"                max      tmp0,#31\n"
"                mov      tmp1,#32\n"
"                sub      tmp1,tmp0\n"
"                mov      Btmp,Blo\n"
"                shl      Btmp,tmp1 wz\n"
"        if_nz   or       Aflag, #FLAG_STICKY\n"
"                shr      Blo, tmp0\n"
"                mov      Btmp, B\n"
"                shl      Btmp, tmp1\n"
"                shr      B, tmp0\n"
"                or       Blo, Btmp\n"
"_doadd\n"
"                '' now perform the addition\n"
"                mov     tmp0, Aflag\n"
"                xor     tmp0, Bflag\n"
"                test    tmp0, #FLAG_SIGN wz\n"
"        if_nz   jmp     #_dosub\n"
"                add     Alo, Blo wc\n"
"                addx    A, B\n"
"                jmp     _Add_ret\n"
"_dosub\n"
"                '' check for INF - INF\n"
"                '' note that if B is INF, then A is NAN or INF, so\n"
"                '' in either case NAN is appropriate to return\n"
"                test    Bflag, #FLAG_INF wz\n"
"        if_nz   or      Aflag, #FLAG_NAN\n"
"                '' watch out for sticky bit; it can affect the low word\n"
"                test    Aflag, #FLAG_STICKY wc\n"
"                subx    Alo, Blo wc, wz\n"
"                subx    A, B wc, wz\n"
"        if_z    andn    Aflag, #FLAG_SIGN\n"
"        if_z    or      Aflag, #FLAG_ZERO\n"
"_Add_ret\n"
"                ret\n"
"\n"
"                '' the actual multiply routine\n"
"_Mul\n"
"                mov     tmp0,Aflag\n"
"                or      tmp0,Bflag\n"
"                test    tmp0,#(FLAG_INF|FLAG_NAN) wz\n"
"        if_nz   jmp     #_mul_excep\n"
"                '' regular multiply\n"
"                add     Aexp,Bexp\n"
"\n"
"                '' shift (B,Blo) up by 1 to prepare loop\n"
"                add     Blo,Blo wc\n"
"                addx    B,B\n"
"\n"
"                '' (A, Alo) will be the accumulator\n"
"                mov    tmp0,A\n"
"                mov    tmp1,Alo wz\n"
"                mov    A,#0\n"
"                mov    Alo,#0\n"
"\n"
"                mov     count,#61\n"
"\n"
"                '' shorten the loop in the common case that\n"
"                '' tmp1 is zero\n"
"        if_z    mov     tmp1,tmp0\n"
"        if_z    mov     tmp0,#0\n"
"        if_z    sub     count,#32\n"
"\n"
"_mul_lp\n"
"                shr     tmp0,#1 wc\n"
"                rcr     tmp1,#1 wc\n"
"        if_nc   jmp     #_mul_skip_add\n"
"                add     Alo,Blo wc\n"
"                addx    A,B\n"
"_mul_skip_add\n"
"                shr     A,#1 wc\n"
"                rcr     Alo,#1 wc\n"
"        if_c    or      Aflag,#FLAG_STICKY\n"
"                djnz    count,#_mul_lp\n"
"\n"
"_mul_sign\n"
"                mov     tmp0,Aflag\n"
"                xor     tmp0,Bflag\n"
"                test    tmp0,#FLAG_SIGN wz\n"
"                muxnz   Aflag,#FLAG_SIGN\n"
"_Mul_ret\n"
"                ret\n"
"\n"
"                '' special cases for inf, NaN\n"
"_mul_excep\n"
"                '' if we get here, we know that either the\n"
"                '' NAN or INF bit is set\n"
"                '' if 0 is set as well, we have an illegal condition\n"
"                '' NAN*anything = NAN\n"
"                '' 0*inf == NAN\n"
"                test    tmp0, #(FLAG_NAN|FLAG_ZERO) wz\n"
"        if_nz   or      Aflag,#FLAG_NAN\n"
"        if_z    or      Aflag,#FLAG_INF\n"
"                jmp     #_mul_sign\n"
"\n"
"                ''\n"
"                '' the actual division routine\n"
"                ''\n"
"                '' DivSmall just does bottom 28 bits, Div does all\n"
"                '' 61\n"
"_DivSmall\n"
"                '' we're given just 1.28 bits\n"
"                '' make sure we produce a few extra bits for rounding\n"
"                mov     count, #31\n"
"                sub     Aexp, #2        '' compensate for rounding bits\n"
"                jmp     #_doDiv\n"
"_Div\n"
"                mov     count,#61\n"
"_doDiv\n"
"                '' set the sign of the result\n"
"                mov     tmp0, Aflag\n"
"                xor     tmp0, Bflag\n"
"                test    tmp0, #FLAG_SIGN wz\n"
"                muxnz   Aflag,#FLAG_SIGN\n"
"\n"
"                mov     tmp0, Aflag\n"
"                or      tmp0, Bflag\n"
"                '' check for divide by infinity or NAN\n"
"                test    tmp0, #(FLAG_INF|FLAG_NAN) wz\n"
"        if_nz   jmp     #_div_excep\n"
"                '' check for divide by 0\n"
"                test    Bflag, #FLAG_ZERO wz\n"
"        if_nz   jmp     #_div_by_zero\n"
"\n"
"                '' regular divide loop here\n"
"                sub     Aexp, Bexp\n"
"                mov     tmp0, Alo\n"
"                mov     tmp1, A\n"
"                '' initialize quotient\n"
"                mov     A, #0\n"
"                mov     Alo, #0\n"
"_divloop\n"
"                cmp     tmp0, Blo wc,wz\n"
"                cmpx    tmp1, B wc,wz\n"
"        if_b    jmp     #_div_skip_sub\n"
"                sub     tmp0, Blo wc,wz\n"
"                subx    tmp1, B\n"
"                shl     Alo, #1 wc\n"
"                or      Alo, #1\n"
"                jmp     #_div_next\n"
"_div_skip_sub\n"
"                shl     Alo, #1 wc\n"
"_div_next\n"
"                rcl     A, #1\n"
"                shl     tmp0, #1 wc\n"
"                rcl     tmp1, #1\n"
"                djnz    count, #_divloop\n"
"\n"
"                '' set sticky bit if necessary\n"
"                or       tmp0,tmp1 nr,wz\n"
"        if_nz   or       Aflag, #FLAG_STICKY\n"
"\n"
"_Div_ret\n"
"_DivSmall_ret\n"
"                ret\n"
"\n"
"_div_by_zero\n"
"                test    Aflag, #(FLAG_NAN|FLAG_INF|FLAG_ZERO) wz\n"
"        if_nz   or      Aflag, #FLAG_NAN\n"
"        if_z    or      Aflag, #FLAG_INF\n"
"                jmp     #_Div_ret\n"
"\n"
"                ''\n"
"                '' if some number is infinity or NaN, come here\n"
"                ''\n"
"_div_excep\n"
"                test    tmp0, #FLAG_NAN wz\n"
"_div_nan\n"
"        if_nz   or      Aflag, #FLAG_NAN\n"
"        if_nz   jmp     #_Div_ret\n"
"\n"
"                test    Aflag, #FLAG_INF wz\n"
"        if_z    jmp     #_a_finite\n"
"                '' infinity/x\n"
"                test    Bflag, #(FLAG_INF) wz\n"
"        if_nz   jmp     #_div_nan\n"
"                jmp     #_Div_ret\n"
"\n"
"                '' x/infinity\n"
"_a_finite\n"
"                or      Aflag, #FLAG_ZERO\n"
"                mov     A, #0\n"
"                mov     Alo, #0\n"
"                jmp     #_Div_ret\n"
"\n"
"bigmask_28      long    $E0000000\n"
"one_4_28        long    $10000000\n"
"Bit31           long    $80000000\n"
"\n"
"A               res     1\n"
"Alo             res     1\n"
"Aflag           res     1\n"
"Aexp            res     1\n"
"B               res     1\n"
"Blo             res     1\n"
"Bflag           res     1\n"
"Bexp            res     1\n"
"\n"
"tmp0            res     1\n"
"tmp1            res     1\n"
"\n"
"count\n"
"Btmp\n"
"                res     1\n"
"\n"
"                fit 496\n"
"                .compress default\n"
    );

/*
+------------------------------------------------------------------------------------------------------------------------------+
|                                                   TERMS OF USE: MIT License                                                  |                                                            
+------------------------------------------------------------------------------------------------------------------------------+
|Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation    | 
|files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,    |
|modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software|
|is furnished to do so, subject to the following conditions:                                                                   |
|                                                                                                                              |
|The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.|
|                                                                                                                              |
|THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE          |
|WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR         |
|COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,   |
|ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                         |
+------------------------------------------------------------------------------------------------------------------------------+
*/

