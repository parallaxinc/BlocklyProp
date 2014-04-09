/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop;

import java.awt.Desktop;
import java.net.URI;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 *
 * @author Michel
 */
public class BlocklyProp {

    public static void main(String[] args) throws Exception {
        //   PropertyConfigurator.configure("log4j.properties");

        Server server = new Server();
        ServerConnector connector = new ServerConnector(server);
        server.addConnector(connector);

        // Replaced by filter in web.xml
/*
         ServletHandler servletHandler = new ServletHandler();
         //servletHandler.addServletWithMapping(server, null);
         servletHandler.addFilterWithMapping(GuiceFilter.class, "*", EnumSet.of(DispatcherType.REQUEST));
         //      servletHandler.addLifeCycleListener(new S);
         */
        ResourceHandler webcontentHandler = new ResourceHandler();
        webcontentHandler.setDirectoriesListed(true);
        webcontentHandler.setWelcomeFiles(new String[]{"index.html"});
        webcontentHandler.setResourceBase("./webcontent");

        ResourceHandler blocklyHandler = new ResourceHandler();
        blocklyHandler.setDirectoriesListed(true);
        blocklyHandler.setWelcomeFiles(new String[]{"index.html"});
        blocklyHandler.setResourceBase("./blockly");

        WebAppContext context = new WebAppContext();
        context.setResourceBase("src/main/webapp");
        context.setContextPath("/webapp");
        context.setParentLoaderPriority(true);
        server.setHandler(context);

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[]{webcontentHandler, blocklyHandler,/* servletHandler,*/ context, new DefaultHandler()});
        server.setHandler(handlers);

        server.start();

        String url = "http://localhost:" + connector.getLocalPort();
        System.out.println("Open url: " + url);
        if (Desktop.isDesktopSupported()) {
            Desktop.getDesktop().browse(new URI(url));
        }

        server.join();
//        server.stop();
    }

}
