/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;
import java.util.List;


/**
 * Define Message of the Day interfaces
 * 
 * @author Jim E
 * 
 */
public interface MotdService {

    // Return the most recent active message
    MotdRecord getFirstActiveMessage();
    
}
