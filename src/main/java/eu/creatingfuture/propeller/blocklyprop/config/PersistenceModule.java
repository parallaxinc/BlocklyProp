/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.config;

import com.adamlewis.guice.persist.jooq.JooqPersistModule;
import com.codahale.metrics.ConsoleReporter;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import java.util.concurrent.TimeUnit;
import javax.sql.DataSource;
import org.jooq.SQLDialect;

/**
 *
 * @author Michel
 */
public class PersistenceModule extends AbstractModule {



   

    @Override
    protected void configure() {
        install(new JooqPersistModule());
    //    bind(DataSource.class).to(ManagedDataSource.class);
    }

  

    @Provides
    public SQLDialect dialect() {
        return SQLDialect.MYSQL;
    }

}
