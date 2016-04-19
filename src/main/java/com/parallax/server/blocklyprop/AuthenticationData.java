/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop;

import com.google.inject.servlet.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 *
 * @author Michel
 */
@SessionScoped
public class AuthenticationData implements Serializable {

    private Long idUser;

    private String token;
    private String challenge;
    private Long lastTimestamp;

    private String userAgent;
    private String remoteAddress;

    private List<Long> usedTimestamps;

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getChallenge() {
        return challenge;
    }

    public void setChallenge(String challenge) {
        this.challenge = challenge;
    }

    public Long getLastTimestamp() {
        return lastTimestamp;
    }

    public void setLastTimestamp(Long lastTimestamp) {
        this.lastTimestamp = lastTimestamp;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getRemoteAddress() {
        return remoteAddress;
    }

    public void setRemoteAddress(String remoteAddress) {
        this.remoteAddress = remoteAddress;
    }

    public List<Long> getUsedTimestamps() {
        if (usedTimestamps == null) {
            usedTimestamps = new ArrayList<>();
        }
        return usedTimestamps;
    }

    public void setUsedTimestamps(List<Long> usedTimestamps) {
        this.usedTimestamps = usedTimestamps;
    }

    public boolean isTimestampUsed(Long timestamp) {
        for (Long usedTimestamp : getUsedTimestamps()) {
//            System.out.println("Already used: " + usedTimestamp);
            if (usedTimestamp.equals(timestamp)) {
                return true;
            }
        }
        return false;
    }

    public void addUsedTimestamp(Long timestamp) {
        List<Long> timestamps = getUsedTimestamps();
        timestamps.add(timestamp);
        int amountOfUsedTimestamps = timestamps.size();
        if (amountOfUsedTimestamps > 20) {
            amountOfUsedTimestamps -= 20;
            Iterator<Long> iter = timestamps.iterator();
            while (iter.hasNext() && amountOfUsedTimestamps > 0) {
                iter.next();
                iter.remove();
            }
            setUsedTimestamps(timestamps);
        }
    }

    @Override
    public String toString() {
        return "AuthenticationData{" + "idUser=" + idUser + ", token=" + token + ", challenge=" + challenge + ", lastTimestamp=" + lastTimestamp + '}';
    }

}
