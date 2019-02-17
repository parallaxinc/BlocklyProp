/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop;

import com.google.inject.servlet.SessionScoped;
import com.parallax.client.cloudsession.objects.User;
import java.io.Serializable;

/**
 * User session details.
 * 
 * This class contains the fields used to manage the client's session with
 * the application.
 * 
 * @author Michel
 */
@SessionScoped
public class SessionData implements Serializable {

    // A cloud session user profile object
    private User user;

    // A cloud session user profile primary key ID
    private Long idUser;

    // A locale string for this user
    private String locale;

    /**
     * Obtain the user account/profile details for the user account associated
     * with this session.
     * 
     * @return CS user account object 
     */
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    @Override
    public String toString() {
        return "SessionData{" + "user=" + user + ", idUser=" + idUser + ", locale=" + locale + '}';
    }

}
