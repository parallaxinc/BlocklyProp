/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.propellent;

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
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteException;
import org.apache.commons.exec.PumpStreamHandler;

/**
 *
 * @author Michel
 */
public class Propellent {

    private static final Logger logger = Logger.getLogger(Propellent.class.getName());

    private int exitValue;
    private String output;

    /*
     Expected Propellent output:

     EVT:503-Checking COM1.
     EVT:504-Scanned COM1. 
     EVT:503-Checking COM4.
     EVT:505-Propeller chip version 1 found on COM4.
     INF:451-Success. 

     */
    public List<String> getPorts() {
        List<String> ports = new ArrayList<>();
        try {
            CommandLine cmdLine = new CommandLine("propellent/Propellent.exe");
            cmdLine.addArgument("/id");
            cmdLine.addArgument("/gui").addArgument("OFF");
            DefaultExecutor executor = new DefaultExecutor();
            executor.setExitValues(new int[]{451, 301});

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
            executor.setStreamHandler(streamHandler);

            try {
                exitValue = executor.execute(cmdLine);
            } catch (ExecuteException ee) {
                //   exitValue = ee.getExitValue();
                logger.log(Level.SEVERE, "Unexpected exit value: {0}", exitValue);
                return ports;
            }

            output = outputStream.toString();

            // 301 = None found
            // 451 = Chip found
            if (exitValue == 301) {
                return ports;
            }

//            System.out.println("output: " + output);
            Scanner scanner = new Scanner(output);

            Pattern chipFoundPattern = Pattern.compile(".*?(EVT:505).*?");
            Pattern pattern = Pattern.compile(".*?found on (?<comport>[a-zA-Z0-9]*).$");
            while (scanner.hasNextLine()) {
                String portLine = scanner.nextLine();
                if (chipFoundPattern.matcher(portLine).matches()) {
                    Matcher portMatch = pattern.matcher(portLine);
                    if (portMatch.find()) {
                        String port = portMatch.group("comport");
                        ports.add(port);
                    }
                }
            }

//            System.out.println("output: " + output);
//            System.out.println("exitValue: " + exitValue);
            return ports;
        } catch (IOException ioe) {
            logger.log(Level.SEVERE, null, ioe);
            return null;
        }
    }

    /*
     Expected Propellent output:



     */
    public boolean compile(File file) {
        try {
            Map map = new HashMap();
            map.put("file", file);

            CommandLine cmdLine = new CommandLine("propellent/Propellent.exe");
            cmdLine.addArgument("/compile");
            cmdLine.addArgument("/gui").addArgument("OFF");
            cmdLine.addArgument("${file}");
            cmdLine.setSubstitutionMap(map);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setExitValues(new int[]{402, 101});

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
            executor.setStreamHandler(streamHandler);

            try {
                exitValue = executor.execute(cmdLine);
            } catch (ExecuteException ee) {
                exitValue = ee.getExitValue();
                logger.log(Level.SEVERE, "Unexpected exit value: {0}", exitValue);
                return false;
            }

            output = outputStream.toString();

            // 101 = Compile error
            // 402 = Compile succesfull
            if (exitValue == 101) {
                return false;
            }

//            System.out.println("output: " + output);
            /*
             Scanner scanner = new Scanner(output);


             Pattern chipFoundPattern = Pattern.compile(".*?(EVT:505).*?");
             Pattern pattern = Pattern.compile(".*?found on (?<comport>[a-zA-Z0-9]*).$");
             while (scanner.hasNextLine()) {
             String portLine = scanner.nextLine();
             if (chipFoundPattern.matcher(portLine).matches()) {
             Matcher portMatch = pattern.matcher(portLine);
             if (portMatch.find()) {
             //   String port = portMatch.group("comport");

             }
             }
             }
             */
//            System.out.println("output: " + output);
//            System.out.println("exitValue: " + exitValue);
            return true;
        } catch (IOException ioe) {
            logger.log(Level.SEVERE, null, ioe);
            return false;
        }
    }

    public String getLastOutput() {
        return output;
    }

    public int getLastExitValue() {
        return exitValue;
    }

}
