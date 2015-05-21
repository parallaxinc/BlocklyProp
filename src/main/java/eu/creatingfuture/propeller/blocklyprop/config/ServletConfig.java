/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package eu.creatingfuture.propeller.blocklyprop.config;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.DefaultConfigurationBuilder;

/**
 *
 * @author Michel
 */
public class ServletConfig extends GuiceServletContextListener {
    
    private Configuration configuration;
    

    @Override
    protected Injector getInjector() {
        readConfiguration();
        
        return Guice.createInjector(new ServletModule(){

            @Override
            protected void configureServlets() {
                bind(Configuration.class).toInstance(configuration);
             //   install(new PersistenceModule());
            }
            
        });
    }
    
    private void readConfiguration() {
        try {
            DefaultConfigurationBuilder configurationBuilder = new DefaultConfigurationBuilder(getClass().getResource("/config.xml"));
            configuration = configurationBuilder.getConfiguration();
            System.out.println("configuration: " + configuration.getString("context"));
        } catch (ConfigurationException ce) {
     //       ce.printStackTrace();
        } catch (Throwable t) {
     //       t.printStackTrace();
        }
    }
    
}
