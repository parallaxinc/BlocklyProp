/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop;

import com.google.inject.servlet.SessionScoped;
import java.io.Serializable;

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

    @Override
    public String toString() {
        return "AuthenticationData{" + "idUser=" + idUser + ", token=" + token + ", challenge=" + challenge + ", lastTimestamp=" + lastTimestamp + '}';
    }

}
