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
import com.parallax.server.blocklyprop.utils.HelpFileInitializer;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Enumeration;
import javax.servlet.ServletContextEvent;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.DefaultConfigurationBuilder;

/**
 *
 * @author Michel
 */
public class SetupConfig extends GuiceServletContextListener {

    private Configuration configuration;

    @Override
    protected Injector getInjector() {
        readConfiguration();

        return Guice.createInjector(new AbstractModule() {

            @Override
            protected void configure() {
                bind(Configuration.class).toInstance(configuration);

                bind(SessionData.class);
                bind(Properties.class).asEagerSingleton();

                bind(HelpFileInitializer.class).asEagerSingleton();
                bind(Monitor.class).asEagerSingleton();

                install(new PersistenceModule(configuration));
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

    private void readConfiguration() {
        try {
            System.out.println("Looking for blocklyprop.properties in: " + System.getProperty("user.home"));
            DefaultConfigurationBuilder configurationBuilder = new DefaultConfigurationBuilder(getClass().getResource("/config.xml"));
            configuration = configurationBuilder.getConfiguration();
        } catch (ConfigurationException ce) {
            ce.printStackTrace();
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        super.contextDestroyed(servletContextEvent);
        // This manually deregisters JDBC driver, which prevents Tomcat 7 from complaining about memory leaks wrto this class
        Enumeration<Driver> drivers = DriverManager.getDrivers();
        while (drivers.hasMoreElements()) {
            Driver driver = drivers.nextElement();
            try {
                DriverManager.deregisterDriver(driver);
                //  LOG.log(Level.INFO, String.format("deregistering jdbc driver: %s", driver));
            } catch (SQLException sqlE) {
                //   LOG.log(Level.SEVERE, String.format("Error deregistering driver %s", driver), e);
            }

        }
    }

}
