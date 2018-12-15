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
