/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package eu.creatingfuture.propeller.blocklyprop.servlets.websocket;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import jssc.SerialPort;
import jssc.SerialPortEvent;
import jssc.SerialPortEventListener;
import jssc.SerialPortException;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;

/**
 *
 * @author Michel
 */
public class SerialSocket extends WebSocketAdapter {

    private static final Logger logger = Logger.getLogger(SerialSocket.class.getName());

    private SerialPort serialConnection;

    public static final String OPEN_CONNECTION_STRING = "+++ open port ";

    @Override
    public void onWebSocketConnect(Session sess) {
        super.onWebSocketConnect(sess);
        System.out.println("WebSocket connect");
        //       sess..addHeader("Access-Control-Allow-Origin", "*");

    }

    @Override
    public void onWebSocketText(String message) {
        logger.log(Level.FINE, "Serial message: ''{0}''", message);
//        for (int i = 0; i < message.length(); i++) {
//            char character = message.charAt(i);
//            System.out.println(Character.getNumericValue(character));
//        }
        try {
            if (message.startsWith(OPEN_CONNECTION_STRING)) {
                if (serialConnection == null) {
                    serialConnection = new SerialPort(message.substring(OPEN_CONNECTION_STRING.length()));
                    try {
                        if (serialConnection.openPort()) {
                            getSession().getRemote().sendString("Connection established with: " + message.substring(OPEN_CONNECTION_STRING.length()) + "\n\r");
                            serialConnection.addEventListener(new SerialPortEventListener() {

                                @Override
                                public void serialEvent(SerialPortEvent serialPortEvent) {
                                    switch (serialPortEvent.getEventType()) {

                                        case SerialPortEvent.RXCHAR:
                                            try {
                                                String serialString = serialConnection.readString();
                                                if (serialString != null) {
                                                    serialString = serialString.replace("\r", "\n\r");
                                                    getSession().getRemote().sendString(serialString);
                                                }
                                            } catch (SerialPortException spe) {
                                            } catch (IOException ioe) {
                                            }
                                    }
                                }
                            });
                        }
                    } catch (SerialPortException ex) {
                        getSession().getRemote().sendString("Failed to connect to: " + message.substring(OPEN_CONNECTION_STRING.length()) + "\n\r(" + ex.getMessage() + ")\n\r");
                        logger.log(Level.SEVERE, "Failed to connect", ex);
                    }
                }
            } else {
                if (serialConnection == null || !serialConnection.isOpened()) {
                    getSession().getRemote().sendString(message);
                } else {
                    try {
                        serialConnection.writeString(message);
                    } catch (SerialPortException ex) {
                        logger.log(Level.SEVERE, "Trying to send command", ex);
                    }
                    getSession().getRemote().sendString(message);
                }
            }

            //  getSession().getRemote().sendString("returning message: " + message);
        } catch (IOException ioe) {
        }
    }

    @Override
    public void onWebSocketClose(int statusCode, String reason) {
        try {
            if (serialConnection != null && serialConnection.isOpened()) {
                serialConnection.closePort();
            }
        } catch (SerialPortException ex) {
            logger.log(Level.SEVERE, "WebSocket close: closeport execption", ex);
        }
    }

    @Override
    public void onWebSocketError(Throwable cause) {
        try {
            if (serialConnection != null && serialConnection.isOpened()) {
                serialConnection.closePort();
            }
        } catch (SerialPortException ex) {
            logger.log(Level.SEVERE, "WebSocket error: closeport execption", ex);
        }
    }

}
