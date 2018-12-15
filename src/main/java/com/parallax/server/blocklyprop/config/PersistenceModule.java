/*
 * Copyright (c) 2018 Parallax Inc.
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

package com.parallax.server.blocklyprop.config;

import com.adamlewis.guice.persist.jooq.JooqPersistModule;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.parallax.server.blocklyprop.db.utils.DataSourceSetup;
import java.sql.SQLException;
import javax.sql.DataSource;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.dbcp2.PoolingDataSource;
import org.jooq.SQLDialect;

import java.util.logging.Level;
import java.util.logging.Logger;


/**
 *
 * @author Michel
 */
public class PersistenceModule extends AbstractModule {

    private final Configuration configuration;

    PersistenceModule(Configuration configuration) {
        this.configuration = configuration;
    }

    @Override
    protected void configure() {
        install(new JooqPersistModule());
        bind(DataSource.class).to(PoolingDataSource.class).asEagerSingleton();
    }

    @Provides
    PoolingDataSource dataSource() throws ClassNotFoundException {

        PoolingDataSource ds = DataSourceSetup.connect(configuration);
        try {
            ds.getConnection();
        } catch (SQLException ex) {
            Logger.getLogger(PersistenceModule.class.getName()).log(Level.SEVERE, null, ex);
        }
        return ds;
    }

    @Provides
    public SQLDialect dialect() {
        return SQLDialect.valueOf(configuration.getString("database.dialect"));
    }

}
