/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.config;

import com.adamlewis.guice.persist.jooq.JooqPersistModule;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import eu.creatingfuture.propeller.blocklyprop.db.utils.DataSourceSetup;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sql.DataSource;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.dbcp2.PoolingDataSource;
import org.jooq.SQLDialect;

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
        bind(DataSource.class).to(PoolingDataSource.class);
    }

    @Provides
    PoolingDataSource dataSource() throws ClassNotFoundException {
        System.out.println("get datasource");
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
        System.out.println("get dialect");
        return SQLDialect.valueOf(configuration.getString("database.dialect"));
    }

}
