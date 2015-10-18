/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author Michel
 */
public class DateConversion {

    private static final DateFormat DF = new SimpleDateFormat("yyyy/MM/dd");
    private static final DateFormat DTF = new SimpleDateFormat("yyyy/MM/dd HH:mm");
    private static final DateFormat TF = new SimpleDateFormat("HH:mm");

    public static String toDateString(Date date) {
        return toString(DF, date);
    }

    public static String toDateTimeString(Date date) {
        return toString(DTF, date);
    }

    public static String toTimeString(Date date) {
        return toString(TF, date);
    }

    public static String toString(DateFormat df, Date date) {
        if (date == null) {
            return null;
        }
        return df.format(date);
    }

}
