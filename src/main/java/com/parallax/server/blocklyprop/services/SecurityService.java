/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.client.cloudsession.exceptions.*;
import com.parallax.client.cloudsession.objects.User;

/**
 *
 * @author Michel
 * 
 * Interface to the Cloud Session service to create new user accounts and to
 * authenticate existing accounts.
 */
public interface SecurityService {

    User authenticateLocalUser(
            Long idUser) throws
                UnknownUserIdException,
                UserBlockedException,
                EmailNotConfirmedException;
    
    User authenticateLocalUser(
            String email, 
            String password) throws 
                UnknownUserException, 
                UserBlockedException, 
                EmailNotConfirmedException, 
                InsufficientBucketTokensException, 
                WrongAuthenticationSourceException,
                NullPointerException,
                ServerException;

    Long register(
            String screenname, 
            String email, 
            String password, 
            String passwordConfirm,
            int birthMonth,
            int birthYear,
            String parentEmail,
            int parentEmailSource) throws 
                NonUniqueEmailException, 
                PasswordVerifyException, 
                PasswordComplexityException, 
                ScreennameUsedException,
                IllegalStateException;
}