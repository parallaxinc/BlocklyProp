/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.parallax.server.blocklyprop.db.utils.DataSourceSetup;
import javax.sql.DataSource;
import org.apache.shiro.util.Factory;

/**
 *
 * @author Michel
 */
public class DataSourceProvider implements Factory<DataSource> {

    @Override
    public DataSource getInstance() {
        return DataSourceSetup.getDataSource();
    }

}
