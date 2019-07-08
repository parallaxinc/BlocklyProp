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

package com.parallax.server.blocklyprop.config;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;

import com.parallax.server.blocklyprop.jsp.Properties;
import com.parallax.server.blocklyprop.monitoring.Monitor;

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



/**
 *
 * @author Michel
 */
public class SetupConfig extends GuiceServletContextListener {

    // Application logging connector
    private final Logger LOG = LoggerFactory.getLogger(SetupConfig.class);

    // Application-specific configuration options
    private Configuration configuration;


    /**
     *  Create a Guice injector object
     *
     * @return a Guice injector object
     */
    @Override
    protected Injector getInjector() {
        readConfiguration();

        return Guice.createInjector(new AbstractModule() {

            @Override
            protected void configure() {

                LOG.info("Binding Configuration class");
                bind(Configuration.class).toInstance(configuration);

                bind(Properties.class).asEagerSingleton();

                bind(Monitor.class).asEagerSingleton();

                // Configure the backend data store
                install(new PersistenceModule(configuration));

                // Bind data classes with their implementations. 
                install(new DaoModule());
                install(new ServiceModule());
                install(new ServletsModule());
                install(new RestModule());
            }
        });
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
                LOG.info("Deregister the jdbc driver: {}",driver);
            } catch (SQLException sqlE) {
                LOG.error("Unable to deregister the jdbc driver {}", driver.toString());
                LOG.error("{}", sqlE.getSQLState());
            }
        }
    }

}
