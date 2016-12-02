/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.blocklyprop.test;

import static  org.junit.Assert.assertEquals;
import static  org.junit.Assert.assertNull;

import org.junit.Test;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.parallax.server.blocklyprop.utils.DateConversion;


/**
 *
 * @author Jim Ewald
 * 
 * Test the methods in the DateConversion class.
 */
public class SandTest {
    @Test
    public void verifyToStringNullDate() {
        DateFormat DF = new SimpleDateFormat("yyyy/MM/dd");

        assertNull(
            "Null date conversion should return a null result.",
            DateConversion.toString(DF,null));
    }

    @Test
    public void verifyDateConversion() {
        DateConversion convert = new DateConversion();

        // assert statements
        Date date = new Date();
        DateFormat DF = new SimpleDateFormat("yyyy/MM/dd");
        
        assertEquals(
            "Date conversion must be in format yyyy/MM/dd",
            DateConversion.toString(DF, date),
            DateConversion.toDateString(date)
        );
    }
    
    @Test
    public void verifyDateConversionDateTimeString() {
        Date date = new Date();
        DateFormat DTF = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        
        assertEquals(
            "Date conversion must be in format yyyy/MM/dd HH:mm",
            DateConversion.toString(DTF, date),
            DateConversion.toDateTimeString(date)
        );
    }
        
    @Test
    public void verifyDateConversionTimeString() {
        Date date = new Date();
        DateFormat TF = new SimpleDateFormat("HH:mm");
        
        assertEquals(
            "Date conversion must be in format HH:mm",
            DateConversion.toString(TF, date),
            DateConversion.toTimeString(date)
        );
    }
}