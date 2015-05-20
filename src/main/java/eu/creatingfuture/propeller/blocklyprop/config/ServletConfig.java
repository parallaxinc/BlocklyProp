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

/**
 *
 * @author Michel
 */
public class ServletConfig extends GuiceServletContextListener {
    

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new ServletModule(){

            @Override
            protected void configureServlets() {
                install(new PersistenceModule());
            }
            
        });
    }
    
}
