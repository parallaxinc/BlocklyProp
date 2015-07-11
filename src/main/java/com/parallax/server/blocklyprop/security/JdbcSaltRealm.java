/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.server.blocklyprop.db.utils.DataSourceSetup;
import com.parallax.server.blocklyprop.db.utils.NeedsDataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.realm.jdbc.JdbcRealm;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.JdbcUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public class JdbcSaltRealm extends JdbcRealm implements NeedsDataSource {

    private static final Logger log = LoggerFactory.getLogger(JdbcSaltRealm.class);

    public JdbcSaltRealm() {
        super();
        setSaltStyle(SaltStyle.COLUMN);
        DataSourceSetup.registerDataSourceUsers(this);
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        UsernamePasswordToken upToken = (UsernamePasswordToken) token;
        String username = upToken.getUsername();

        // Null username is invalid
        if (username == null) {
            throw new AccountException("Null usernames are not allowed by this realm.");
        }

        Connection conn = null;
        SimpleAuthenticationInfo info = null;
        try {
            conn = dataSource.getConnection();

            UserInfo userInfo = getInfoForUser(conn, username);

            String password = userInfo.getPassword();
            String salt = userInfo.getSalt();

            if (password == null) {
                throw new UnknownAccountException("No account found for user [" + username + "]");
            }

            List authenticationInfo = new ArrayList();
            authenticationInfo.add(userInfo.getId());
            authenticationInfo.add(username);
            info = new SimpleAuthenticationInfo(authenticationInfo, password.toCharArray(), getName());

            if (salt != null) {
                info.setCredentialsSalt(ByteSource.Util.bytes(salt));
            }

        } catch (SQLException e) {
            final String message = "There was a SQL error while authenticating user [" + username + "]";
            if (log.isErrorEnabled()) {
                log.error(message, e);
            }

            // Rethrow any SQL errors as an authentication exception
            throw new AuthenticationException(message, e);
        } finally {
            JdbcUtils.closeConnection(conn);
        }

        return info;
    }

    private UserInfo getInfoForUser(Connection conn, String username) throws SQLException {

        UserInfo userInfo = new UserInfo();

        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            ps = conn.prepareStatement(authenticationQuery);
            ps.setString(1, username);

            // Execute query
            rs = ps.executeQuery();

            // Loop over results - although we are only expecting one result, since usernames should be unique
            boolean foundResult = false;
            while (rs.next()) {

                // Check to ensure only one row is processed
                if (foundResult) {
                    throw new AuthenticationException("More than one user row found for user [" + username + "]. Usernames must be unique.");
                }

                userInfo.setPassword(rs.getString(1));
                userInfo.setSalt(rs.getString(2));
                userInfo.setId(rs.getLong(3));

                foundResult = true;
            }
        } finally {
            JdbcUtils.closeResultSet(rs);
            JdbcUtils.closeStatement(ps);
        }

        return userInfo;
    }

    private class UserInfo {

        private Long id;

        private String password;
        private String salt;

        public UserInfo() {
        }

        public UserInfo(Long id, String password, String salt) {
            this.id = id;
            this.password = password;
            this.salt = salt;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getSalt() {
            return salt;
        }

        public void setSalt(String salt) {
            this.salt = salt;
        }

    }
}
