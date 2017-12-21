/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.config;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.parallax.server.blocklyprop.SessionData;
import com.parallax.server.blocklyprop.jsp.Properties;
import com.parallax.server.blocklyprop.monitoring.Monitor;
//import com.parallax.server.blocklyprop.utils.HelpFileInitializer;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Enumeration;
import javax.servlet.ServletContextEvent;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.DefaultConfigurationBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ch.qos.logback.classic.LoggerContext;


/**
 * Load the application configuration information
 * 
 * <p>
 * This class is referenced in the /src/main/webapp/WEB-INF/web.xml file
 * 
 * @author Michel
 */
public class SetupConfig extends GuiceServletContextListener {

    private Configuration configuration;
    
    private final Logger LOG = LoggerFactory.getLogger(SetupConfig.class);

    @Override
    protected Injector getInjector() {
        readConfiguration();

        return Guice.createInjector(new AbstractModule() {

            @Override
            protected void configure() {
                bind(Configuration.class).toInstance(configuration);

                bind(SessionData.class);
                bind(Properties.class).asEagerSingleton();

                //bind(HelpFileInitializer.class).asEagerSingleton();
                bind(Monitor.class).asEagerSingleton();

                // Configure the backend data store
                install(new PersistenceModule(configuration));

                // Bind data classes with their implementations. 
                install(new DaoModule());
                install(new ServiceModule());
                install(new ServletsModule());
                install(new RestModule());
            }

        }
        //        new PersistenceModule(configuration)
        //new DaoModule()
        //new ServletsModule()
        );
    }

    /*
     * The application configuration is stored in the blocklyprop.properties
     * file in user home directory. The config.xml contains the actual file
     * name of the configuation file. If the file is not found, the app will
     * use a set of default values. 
    */
    private void readConfiguration() {
        try {
            LOG.info(
                    "Looking for blocklyprop.properties in: {}", 
                    System.getProperty("user.home"));
            
            DefaultConfigurationBuilder configurationBuilder 
                    = new DefaultConfigurationBuilder(getClass()
                            .getResource("/config.xml"));
            
            configuration = configurationBuilder.getConfiguration();
        } catch (ConfigurationException ce) {
            LOG.error("{}", ce.getMessage());
        } catch (Throwable t) {
            LOG.error(t.getMessage());
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        super.contextDestroyed(servletContextEvent);
        
        Enumeration<Driver> drivers = DriverManager.getDrivers();

        // This manually deregisters JDBC driver, which prevents Tomcat 7 from
        // complaining about memory leaks into this class
        while (drivers.hasMoreElements()) {
            Driver driver = drivers.nextElement();
            try {
                DriverManager.deregisterDriver(driver);
                LOG.info("deregistering jdbc driver: {}",driver);
            } catch (SQLException sqlE) {
                LOG.error("Error deregistering driver %s", driver);
                LOG.error("{}", sqlE.getSQLState());
            }

        }
        
        // Shut down the loggers. Assume SLF4J is bound to logback-classic
        // in the current environment
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        if (loggerContext != null) {
            loggerContext.stop();
        }
    }

}
