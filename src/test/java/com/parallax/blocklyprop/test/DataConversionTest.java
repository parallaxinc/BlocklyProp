/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.blocklyprop.test;

import static  org.junit.Assert.*;
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
public class DataConversionTest {
    @Test
    public void verifyToStringNullDate() {
        DateFormat DF = new SimpleDateFormat("yyyy/MM/dd");

        assertNull(
            "Null date conversion should return a null result.",
            DateConversion.toString(DF,null));
    }

    @Test
    public void verifyDateConversion() {
        // Data setup
        Date date = new Date();
        DateFormat DF = new SimpleDateFormat("yyyy/MM/dd");

        // Assert values
        String message = "Date conversion must be in format yyyy/MM/dd";
        String expected = DateConversion.toString(DF, date);
        String actual = DateConversion.toDateString(date);
        
        assertEquals( message, expected, actual);
    }
    
    @Test
    public void verifyDateConversionDateTimeString() {
        Date date = new Date();
        DateFormat DTF = new SimpleDateFormat("yyyy/MM/dd HH:mm");

        String message = "Date conversion must be in format yyyy/MM/dd HH:mm";
        String expected = DateConversion.toString(DTF, date);
        String actual = DateConversion.toDateTimeString(date);
        
        assertEquals( message, expected, actual);
    }
        
    @Test
    public void verifyDateConversionTimeString() {
        Date date = new Date();
        DateFormat TF = new SimpleDateFormat("HH:mm");
        
        String message = "Date conversion must be in format HH:mm";
        String expected = DateConversion.toString(TF, date);
        String actual = DateConversion.toTimeString(date);
        
        assertEquals( message, expected, actual );
    }
}