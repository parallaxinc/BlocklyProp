/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.servlets;

import eu.creatingfuture.propeller.blocklyprop.servlets.websocket.SerialSocket;
import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

/**
 *
 * @author Michel
 */
public class SerialServlet extends WebSocketServlet {

    @Override
    public void configure(WebSocketServletFactory wssf) {
        wssf.register(SerialSocket.class);
    }

}
