/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.config;

import com.cuubez.visualizer.domain.ApplicationConfigurationContext;
import com.cuubez.visualizer.domain.ConfigurationType;
import com.cuubez.visualizer.domain.configuration.Configuration;
import com.cuubez.visualizer.domain.configuration.Description;
import com.cuubez.visualizer.domain.configuration.Display;
import com.cuubez.visualizer.processor.ApiMetaDataProcessor;
import com.cuubez.visualizer.processor.ResourceVariableProcessor;
import com.cuubez.visualizer.processor.ServiceRepositoryProcessor;
import com.cuubez.visualizer.resource.InformationRepository;
import com.cuubez.visualizer.servlet.VzBootstrapContextListener;
import javax.servlet.ServletContextEvent;

/**
 *
 * @author Michel
 */
public class RestAPIVisualizeBootstrap extends VzBootstrapContextListener {

    @Override
    public void contextInitialized(ServletContextEvent contextEvent) {
        //  log.trace("Context initialization started");
        String applicationPath = contextEvent.getServletContext().getRealPath("/");

        ApplicationConfigurationContext applicationConfigurationContext = new ApplicationConfigurationContext();
        applicationConfigurationContext.setApplicationName("Blockly REST Api");
        applicationConfigurationContext.setApplicationPath(applicationPath);

        InformationRepository.getInstance().setApplicationConfigurationContext(applicationConfigurationContext);
        //    new ConfigurationProcessor().process();
        setConfiguration();
        if (ConfigurationType.ANNOTATION.equals(applicationConfigurationContext.getConfigurationType())) {
            new ServiceRepositoryProcessor().process();
            new ResourceVariableProcessor().process();
        }
        new ApiMetaDataProcessor().process();

    }

    /**
     * Hardcoded due to a bug on windows in coodez API visualizer version 1.0.1
     * ( https://code.google.com/p/cuubez/issues/detail?id=5 )
     */
    private void setConfiguration() {
        Configuration configuration = new Configuration();
        Display display = new Display();
        display.setHeader("BlocklyProp REST service API Documentation");
        display.setTittle("BlocklyProp REST service API Documentation");
        display.setLogoInclude(true);
        display.setLogoUrl("https://jersey.java.net/images/jersey_logo.png");
        Description description = new Description();
        description.setHeader("BlocklyProp REST API Documentation");
        description.setDetail("Usage of the BlocklyProp REST API");
        display.setDescription(description);
        configuration.setDisplay(display);
        InformationRepository.getInstance().setConfiguration(configuration);
    }

}
