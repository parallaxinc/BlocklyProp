/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.services.impl;

import com.google.common.base.Preconditions;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import eu.creatingfuture.propeller.blocklyprop.db.dao.UserDao;
import eu.creatingfuture.propeller.blocklyprop.db.enums.AuthenticationProvider;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.pojos.User;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;
import eu.creatingfuture.propeller.blocklyprop.services.SecurityService;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;

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
    public User register(String screenname, String email, String password) {
        Preconditions.checkNotNull(screenname, "Screenname cannot be null");
        Preconditions.checkNotNull(email, "Email cannot be null");
        Preconditions.checkNotNull(password, "Paasword cannot be null");

        String salt = rng.nextBytes().toHex();
        SimpleHash hasher = new SimpleHash("SHA-256", password, salt, 1024);

        UserRecord userRecord = userDao.create(screenname, email, hasher.toHex(), salt, AuthenticationProvider.LOCAL);
        User user = userRecord.into(User.class);

        return user;
    }

}
