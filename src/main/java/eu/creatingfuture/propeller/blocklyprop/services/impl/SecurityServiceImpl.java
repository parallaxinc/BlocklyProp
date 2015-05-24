/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import eu.creatingfuture.propeller.blocklyprop.db.dao.UserDao;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;
import eu.creatingfuture.propeller.blocklyprop.services.SecurityService;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.util.ByteSource;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class SecurityServiceImpl implements SecurityService {

    private final RandomNumberGenerator rng;

    private UserDao userDao;

    public SecurityServiceImpl() {
        rng = new SecureRandomNumberGenerator();
    }

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserRecord register(String screenname, String email, String password) {
        ByteSource salt = rng.nextBytes();

        String hashedPasswordBase64 = new Sha256Hash(password, salt, 1024).toBase64();

        UserRecord user = userDao.create(screenname, email, hashedPasswordBase64, salt.getBytes());
        return user;
    }

}
