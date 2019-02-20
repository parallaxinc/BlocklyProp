/*
 * Copyright (c) 2019 Parallax Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.parallax.server.blocklyprop;

import com.google.inject.servlet.SessionScoped;
import com.parallax.client.cloudsession.objects.User;
import java.io.Serializable;

/**
 * User session details.
 * 
 * This class contains the fields used to manage the client's session with
 * the application. The @SessionScoped decorator will enforce a single
 * instance per session.
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

    /**
     *  Override the default toString method to enumerate all fields
     *
     * @return string representation of SessionData fields
     */
    @Override
    public String toString() {
        return "SessionData{" + "user=" + user + ", idUser=" + idUser + ", locale=" + locale + '}';
    }

}
