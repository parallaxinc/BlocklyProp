/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop;

import eu.creatingfuture.propeller.blocklyprop.interfaces.CCompiler;
import eu.creatingfuture.propeller.blocklyprop.interfaces.PropellerCommunicator;
import eu.creatingfuture.propeller.blocklyprop.interfaces.SpinCompiler;
import eu.creatingfuture.propeller.blocklyprop.propeller.LinuxGccCompiler;
import eu.creatingfuture.propeller.blocklyprop.propeller.LinuxOpenSpin;
import eu.creatingfuture.propeller.blocklyprop.propeller.LinuxPropellerLoad;
import eu.creatingfuture.propeller.blocklyprop.propeller.WindowsGccCompiler;
import eu.creatingfuture.propeller.blocklyprop.propeller.WindowsOpenSpin;
import eu.creatingfuture.propeller.blocklyprop.propeller.WindowsPropellerLoad;
import eu.creatingfuture.propeller.blocklyprop.utils.OsCheck;
import java.awt.Desktop;
import java.net.URI;
import java.util.logging.Logger;
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

    private static final Logger logger = Logger.getLogger(BlocklyProp.class.getName());

    private static SpinCompiler compiler;
    private static PropellerCommunicator propellerCommunicator;
    private static CCompiler cCompiler;

    public static void main(String[] args) throws Exception {
        OsCheck.OSType os = OsCheck.getOperatingSystemType();
        switch (os) {
            case Windows:
                compiler = new WindowsOpenSpin();
                propellerCommunicator = new WindowsPropellerLoad();
                cCompiler = new WindowsGccCompiler();
                break;
            case Linux:
                compiler = new LinuxOpenSpin();
                propellerCommunicator = new LinuxPropellerLoad();
                cCompiler = new LinuxGccCompiler();
                break;
            case MacOS:
                logger.warning( "MacOS cannot compile and donwload programs" );
                break;
            default:
                logger.warning("This OS is currently not supported: " + os);
                System.exit(1);
        }
        //   PropertyConfigurator.configure("log4j.properties");

        Server server = new Server();
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(63012);
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

    public static SpinCompiler getCompiler() {
        return compiler;
    }

    public static PropellerCommunicator getPropellerCommunicator() {
        return propellerCommunicator;
    }

    public static CCompiler getCCompiler() {
        return cCompiler;
    }

}
