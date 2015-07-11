/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.parallax.server.blocklyprop.db.utils;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.GregorianCalendar;
import org.jooq.Converter;

/**
 *
 * @author Michel
 */
public class CalendarConverter implements Converter<Timestamp, GregorianCalendar> {


@Override
    public GregorianCalendar from(Timestamp databaseObject) {
        GregorianCalendar calendar = (GregorianCalendar) Calendar.getInstance();
        calendar.setTimeInMillis(databaseObject.getTime());
        return calendar;
    }

    @Override
    public Timestamp to(GregorianCalendar userObject) {
        return new Timestamp(userObject.getTime().getTime());
    }

    @Override
    public Class<Timestamp> fromType() {
        return Timestamp.class;
    }

    @Override
    public Class<GregorianCalendar> toType() {
        return GregorianCalendar.class;
    }
    
}
