/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.client.cloudsession.objects.User;

/**
 *
 * @author Michel
 */
public interface AuthenticationService {

    public User authenticate(String username, String password);

}
