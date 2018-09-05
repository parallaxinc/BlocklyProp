/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.converter;

import com.google.inject.Inject;
import com.google.gson.JsonObject;
import org.apache.shiro.authz.UnauthorizedException;

import com.parallax.server.blocklyprop.db.generated.tables.records.MotdRecord;
import com.parallax.server.blocklyprop.services.MotdService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author developer
 */
public class MotdConverter {

    /**
     * Application logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProjectConverter.class);
    
    private MotdService motdService;
    
    
    @Inject
    public void setMotdService(MotdService motdService) {
        this.motdService = motdService;
    }

    public JsonObject toJson(MotdRecord motd) {
        
        if (motd == null) {
            LOG.error("Recieved a null motd. Unable to convert it to JSON");
            return null;
        }
        
        JsonObject result = new JsonObject();
        
        result.addProperty("id", motd.getId());
        result.addProperty("textMessage", motd.getMessageText());
        result.addProperty("htmlMessage", motd.getMessageHtml());

        return result;
    }
}
