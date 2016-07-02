/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.client.cloudsession.exceptions.EmailNotConfirmedException;
import com.parallax.client.cloudsession.exceptions.InsufficientBucketTokensException;
import com.parallax.client.cloudsession.exceptions.NonUniqueEmailException;
import com.parallax.client.cloudsession.exceptions.PasswordComplexityException;
import com.parallax.client.cloudsession.exceptions.PasswordVerifyException;
import com.parallax.client.cloudsession.exceptions.ScreennameUsedException;
import com.parallax.client.cloudsession.exceptions.UnknownUserException;
import com.parallax.client.cloudsession.exceptions.UserBlockedException;
import com.parallax.client.cloudsession.objects.User;

/**
 *
 * @author Michel
 */
public interface SecurityService {

    Long register(String screenname, String email, String password, String passwordConfirm) throws NonUniqueEmailException, PasswordVerifyException, PasswordComplexityException, ScreennameUsedException;

    User authenticateLocalUser(String email, String password) throws UnknownUserException, UserBlockedException, EmailNotConfirmedException, InsufficientBucketTokensException;

}
