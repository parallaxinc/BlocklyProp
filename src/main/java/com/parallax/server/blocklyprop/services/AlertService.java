/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;

/**
 *
 * @author developer
 */
public interface AlertService {
    
    // Retreive a message from the MOTD table
    String getMessage();
    
}
