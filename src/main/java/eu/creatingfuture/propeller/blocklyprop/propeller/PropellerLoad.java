/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.propeller;

import eu.creatingfuture.propeller.blocklyprop.interfaces.PropellerCommunicator;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteException;
import org.apache.commons.exec.PumpStreamHandler;

/**
 *
 * @author Michel
 */
public abstract class PropellerLoad implements PropellerCommunicator {

    private static final Logger logger = Logger.getLogger(PropellerLoad.class.getName());

    protected int exitValue;
    protected String output;
    protected boolean success;

    protected List<String> getPorts(String executable) {
        List<String> ports = new ArrayList<>();
        try {
            CommandLine cmdLine = new CommandLine(executable);
            cmdLine.addArgument("-P");
            DefaultExecutor executor = new DefaultExecutor();
            //executor.setExitValues(new int[]{451, 301});

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
            executor.setStreamHandler(streamHandler);

            try {
                exitValue = executor.execute(cmdLine);
            } catch (ExecuteException ee) {
                exitValue = ee.getExitValue();
                logger.log(Level.SEVERE, "Unexpected exit value: {0}", exitValue);
                return ports;
            } finally {
                output = outputStream.toString();
            }

            /*
             if (exitValue == 301) {
             return ports;
             }
             */
//            System.out.println("output: " + output);
            Scanner scanner = new Scanner(output);

            while (scanner.hasNextLine()) {
                ports.add(scanner.nextLine());
            }

            return ports;
        } catch (IOException ioe) {
            logger.log(Level.SEVERE, null, ioe);
            return null;
        }
    }

    protected boolean loadIntoRam(String executable, File ramFile, String comPort) {
        try {
            Map map = new HashMap();
            map.put("ramFile", ramFile);

            CommandLine cmdLine = new CommandLine(executable);
            cmdLine.addArgument("-r");
            cmdLine.addArgument("${ramFile}");

            cmdLine.setSubstitutionMap(map);
            DefaultExecutor executor = new DefaultExecutor();
            //executor.setExitValues(new int[]{451, 301});

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
            executor.setStreamHandler(streamHandler);

            try {
                exitValue = executor.execute(cmdLine);
            } catch (ExecuteException ee) {
                exitValue = ee.getExitValue();
                logger.log(Level.SEVERE, "Unexpected exit value: {0}", exitValue);
                success = false;
                return false;
            } finally {
                output = outputStream.toString();
            }

            success = true;
            return true;
        } catch (IOException ioe) {
            logger.log(Level.SEVERE, null, ioe);
            success = false;
            return false;
        }
    }

    protected boolean loadIntoEeprom(String executable, File eepromFile, String comPort) {
        try {
            Map map = new HashMap();
            map.put("eepromFile", eepromFile);

            CommandLine cmdLine = new CommandLine(executable);
            cmdLine.addArgument("-r");
            cmdLine.addArgument("-e");
            cmdLine.addArgument("${eepromFile}");

            cmdLine.setSubstitutionMap(map);
            DefaultExecutor executor = new DefaultExecutor();
            //executor.setExitValues(new int[]{451, 301});

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
            executor.setStreamHandler(streamHandler);

            try {
                exitValue = executor.execute(cmdLine);
            } catch (ExecuteException ee) {
                exitValue = ee.getExitValue();
                logger.log(Level.SEVERE, "Unexpected exit value: {0}", exitValue);
                success = false;
                return false;
            } finally {
                output = outputStream.toString();
            }

            success = true;
            return true;
        } catch (IOException ioe) {
            logger.log(Level.SEVERE, null, ioe);
            success = false;
            return false;
        }
    }

    @Override
    public String getLastOutput() {
        return output;
    }

    @Override
    public int getLastExitValue() {
        return exitValue;
    }

    @Override
    public boolean wasLastSuccess() {
        return success;
    }

}
