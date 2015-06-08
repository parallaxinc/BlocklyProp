/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.config;

import com.sun.jersey.guice.JerseyServletModule;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;
import eu.creatingfuture.propeller.blocklyprop.rest.RestCompile;
import eu.creatingfuture.propeller.blocklyprop.rest.RestProject;
import eu.creatingfuture.propeller.blocklyprop.rest.RestUser;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;

/**
 *
 * @author Michel
 */
public class RestModule extends JerseyServletModule {

    @Override
    protected void configureServlets() {
        bind(RestCompile.class);
        bind(RestUser.class);
        bind(RestProject.class);

        /* bind jackson converters for JAXB/JSON serialization */
        bind(MessageBodyReader.class).to(JacksonJsonProvider.class);
        bind(MessageBodyWriter.class).to(JacksonJsonProvider.class);

        serve("/rest/*").with(GuiceContainer.class);
    }

}
