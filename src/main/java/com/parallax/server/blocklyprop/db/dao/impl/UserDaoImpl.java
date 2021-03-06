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

package com.parallax.server.blocklyprop.db.dao.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.db.dao.UserDao;
import com.parallax.server.blocklyprop.db.enums.Role;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.SecRoleRecord;
import com.parallax.server.blocklyprop.db.generated.tables.records.UserRecord;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.jooq.DSLContext;
import org.jooq.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Blockly user
 *
 * @author Michel
 */
@Singleton
public class UserDaoImpl implements UserDao {

    /**
     * Logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(UserDao.class);

    /**
     * Database connection context
     */
    private DSLContext create;

    
    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    /**
     * Create a blocklyprop user record
     * 
     * @deprecated use create(idCloudSession, screenName) instead.
     * 
     * @param idCloudSession
     * @return 
     */
    @Override
    @Deprecated
    public UserRecord create(Long idCloudSession) {
        //create.insertInto(Tables.PROJECT).set(project).execute();
        
        if (idCloudSession == 0) {
            LOG.warn("Cannot create cloud session user. Invalid cloud session ID.");
            return null;
        }
        
        UserRecord record = create.insertInto(
                Tables.USER, 
                Tables.USER.IDCLOUDSESSION).values(idCloudSession).returning().fetchOne();

        if (record != null && record.getId() != null && record.getId() > 0) {
            Set<Role> roles = new HashSet<>();
            roles.add(Role.USER);
            try {
                setRoles(record.getId(), roles);
            } catch (UnauthorizedException ue) {
                // Can be dismissed because of hard coded user role
                // Print exception in case anything should change
                LOG.error("Creating a user should have no problem with creating its role (only USER role)", ue);
            }

        }

        return record;
    }
    
    @Override
    public UserRecord create(Long idCloudSession, String screenName) {
        //create.insertInto(Tables.PROJECT).set(project).execute();
        
        if (idCloudSession == 0) {
            LOG.warn("Cannot create cloud session user. Invalid cloud session ID.");
            return null;
        }
        
        if (screenName == null) {
            LOG.warn("Cannot create cloud session user. Invalid screen name.");
            return null;
        }
        
        UserRecord record = create.insertInto( 
                Tables.USER, 
                Tables.USER.IDCLOUDSESSION,
                Tables.USER.SCREENNAME)
                .values(idCloudSession, screenName)
                .returning()
                .fetchOne();

        // Set the User role for this new account
        if (record != null && record.getId() != null && record.getId() > 0) {
            Set<Role> roles = new HashSet<>();
            roles.add(Role.USER);
            
            // Update the Roles table
            try {
                setRoles(record.getId(), roles);
            } catch (UnauthorizedException ue) {
                // Can be dismissed because of hard coded user role
                // Print exception in case anything should change
                LOG.error("Creating a user should have no problem with creating its role (only USER role)", ue);
                return null;
            }
        }

        return record;
    }
    

    @Override
    public List<UserRecord> getAll() {
        return create
                .selectFrom(Tables.USER)
                .fetch();
    }

    /**
     * Get a Blockly UserRecord
     *
     * @param idUser
     * Long integer ID of the user record to retrieve
     *
     * @return
     * Returns a UserRecord object if successful, otherwise returns a null
     */
    @Override
    public UserRecord getUser(Long idUser) {
        return create
                .selectFrom(Tables.USER)
                .where(Tables.USER.ID
                        .equal(idUser))
                .fetchOne();
    }

    @Override
    public UserRecord getUser(Long idCloudSession, String screenName) {
        // Obtain the BP user id from the CS user id
        return create
                .selectFrom(Tables.USER)
                .where(Tables.USER.IDCLOUDSESSION
                        .eq(idCloudSession))
                .and(Tables.USER.SCREENNAME
                        .eq(screenName))
                .fetchOne();
    }
    
    @Override
    public void setRoles(Long idUser, Set<Role> roles) {
        for (Role role : roles) {
            if (role != Role.USER) {
                if (!SecurityUtils.getSubject().hasRole(Role.ADMIN.name())) {
                    throw new UnauthorizedException();
                }
            }
        }

        //   System.out.println(create.select(Tables.SEC_ROLE.ID, Tables.SEC_ROLE.NAME).from(Tables.SEC_ROLE).join(Tables.SEC_USER_ROLE).on(Tables.SEC_USER_ROLE.ID_ROLE.equal(Tables.SEC_ROLE.ID)).getSQL());
        Result<SecRoleRecord> currentAssignedRoles = getRawRoles(idUser);

        for (SecRoleRecord roleRecord : currentAssignedRoles) {
            if (!roles.contains(roleRecord.getName())) {
                create
                    .delete(Tables.SEC_USER_ROLE)
                    .where(Tables.SEC_USER_ROLE.ID_USER
                            .equal(idUser))
                    .and(Tables.SEC_USER_ROLE.ID_ROLE
                            .equal(roleRecord.getId()))
                    .execute();
            }
        }
        for (Role role : roles) {
            if (!currentAssignedRoles.getValues(Tables.SEC_ROLE.NAME).contains(role)) {

                Long idRole = create
                        .select(Tables.SEC_ROLE.ID)
                        .from(Tables.SEC_ROLE)
                        .where(Tables.SEC_ROLE.NAME.equal(role))
                        .fetchOne(Tables.SEC_ROLE.ID);

                if (idRole == null || idRole == 0) {
                    SecRoleRecord roleRecord = createRole(role);
                    idRole = roleRecord.getId();
                }

                create.insertInto(Tables.SEC_USER_ROLE, Tables.SEC_USER_ROLE.ID_USER, Tables.SEC_USER_ROLE.ID_ROLE)
                        .values(idUser, idRole)
                        .execute();
            }
        }
    }

    private Result<SecRoleRecord> getRawRoles(Long idUser) {
        Result<SecRoleRecord> currentAssignedRoles = create
                .select(Tables.SEC_ROLE.ID, Tables.SEC_ROLE.NAME)
                .from(Tables.SEC_ROLE)
                .join(Tables.SEC_USER_ROLE)
                .on(Tables.SEC_USER_ROLE.ID_ROLE
                        .equal(Tables.SEC_ROLE.ID))
                .where(Tables.SEC_USER_ROLE.ID_USER
                        .equal(idUser))
                .fetch()
                .into(Tables.SEC_ROLE);

        return currentAssignedRoles;
    }

    @Override
    public List<Role> getRoles(Long idUser) {
        return getRawRoles(idUser).getValues(Tables.SEC_ROLE.NAME);
    }

    private SecRoleRecord createRole(Role role) {
        SecRoleRecord record = create
                .insertInto(Tables.SEC_ROLE, Tables.SEC_ROLE.NAME)
                .values(role)
                .returning()
                .fetchOne();
        return record;
    }

    /**
     * Obtain the BP user ID from a user's cloud session account
     * 
     * @deprecated  Use the standard User object instead.
     * 
     * @param id the cloud session user account id
     * 
     * @return The BP user id
     */
    @Override
    public Long getUserIdForCloudSessionUserId(Long id) {
        
        // Obtain the BP user id from the CS user id
        Long idUser = create
                .select(Tables.USER.ID)
                .from(Tables.USER)
                .where(Tables.USER.IDCLOUDSESSION
                        .eq(id))
                .fetchOneInto(Long.class);
        
        if (idUser == null) {
            UserRecord user = create(id);
            return user.getId();
        } else {
            return idUser;
        }
    }


    /**
     * Replace the blockly user screen name
     *
     * @param idUser - is the long integer id for the blockly user record
     * @param screenName - is ghe new screen name to store in the user record
     */
    @Override
    public void updateScreenName(Long idUser, String screenName) {
        LOG.info("Attempting to update screen name for user: {} ", idUser);

        // Fetch the blockly user record
        UserRecord user = create
                .selectFrom(Tables.USER)
                .where(Tables.USER.ID
                        .eq(idUser))
                .fetchOne();
        
        if (user != null) {
            // Compare the existing screen name with the proposed screen name
            if ( ! Objects.equals(user.getScreenname(), screenName)) {
                LOG.info("Changing screen name from {} to {}", user.getScreenname(), screenName);

                create.update(Tables.USER)
                        .set(Tables.USER.SCREENNAME, screenName)
                        .where(Tables.USER.ID.eq(idUser))
                        .execute();

                LOG.info("The screen name is now {}", user.getScreenname());
            }
        }
        else {
            LOG.warn("Unable to locate a blockly user record for blockly id {}", idUser);
        }
    }

}
