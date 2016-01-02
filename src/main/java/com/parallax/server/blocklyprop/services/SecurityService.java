/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;

/**
 *
 * @author Michel
 */
public interface SecurityService {

    Long register(String screenname, String email, String password, String passwordConfirm) throws NonUniqueEmailException, PasswordVerifyException;

}
