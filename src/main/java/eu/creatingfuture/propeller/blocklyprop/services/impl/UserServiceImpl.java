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
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.pojos.User;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;
import eu.creatingfuture.propeller.blocklyprop.services.UserService;
import java.util.List;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    @Inject
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User getUser(Long idUser) {
        return userDao.getUser(idUser).into(User.class);
    }

    @Override
    public List<UserRecord> getAllUsers() {
        return userDao.getAll();
    }

}
