/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.propeller;

import eu.creatingfuture.propeller.blocklyprop.interfaces.CCompiler;
import eu.creatingfuture.propeller.blocklyprop.utils.CLib;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
public abstract class GccCompiler implements CCompiler {

    private static final Logger logger = Logger.getLogger(GccCompiler.class.getName());

    protected boolean success;
    protected int exitValue;
    protected String output;

    private static final Map<String, CLib> cLibs = new HashMap<>();

    static {
        CLib simpletoolsLib = new CLib();
        simpletoolsLib.setName("simpletools");
        simpletoolsLib.setLibdir("Utility/libsimpletools");
        simpletoolsLib.addMemoryModel("cmm", "Utility/libsimpletools/cmm/");
        cLibs.put("simpletools", simpletoolsLib);

        CLib simpletextLib = new CLib();
        simpletextLib.setName("simpletext");
        simpletextLib.setLibdir("Text Devices/libsimpletext");
        simpletextLib.addMemoryModel("cmm", "Text Devices/libsimpletext/cmm/");
        cLibs.put("simpletext", simpletextLib);

        CLib simpleI2CLib = new CLib();
        simpleI2CLib.setName("simplei2c");
        simpleI2CLib.setLibdir("Protocol/libsimplei2c");
        simpleI2CLib.addMemoryModel("cmm", "Protocol/libsimplei2c/cmm/");
        cLibs.put("simplei2c", simpleI2CLib);
    }

    /**
     *
     *
     * @param executable
     * @param sourceFile
     * @return
     */
    protected boolean compile(String executable, File sourceFile) {
        try {
            List<CLib> libs = new ArrayList<>();
            libs.add(cLibs.get("simpletools"));
            libs.add(cLibs.get("simpletext"));
            libs.add(cLibs.get("simplei2c"));

            File temporaryDestinationFile = File.createTempFile("blocklyapp", ".elf");
            File libDirectory = new File(new File(System.getProperty("user.dir")), "/propeller-c-lib");
            Map map = new HashMap();
            map.put("sourceFile", sourceFile);
            map.put("destinationFile", temporaryDestinationFile);

            CommandLine cmdLine = new CommandLine(executable);
            for (CLib lib : libs) {
                cmdLine.addArgument("-I").addArgument("${libdir" + lib.getName() + "}");
                cmdLine.addArgument("-L").addArgument("${memorymodel" + lib.getName() + "}");
                // cmdLine.addArgument("-l" + lib.getName());

                map.put("libdir" + lib.getName(), new File(libDirectory, lib.getLibdir()));
                map.put("memorymodel" + lib.getName(), new File(libDirectory, lib.getMemoryModel().get("cmm")));
            }
            cmdLine.addArgument("-Os");
            cmdLine.addArgument("-mcmm");
            cmdLine.addArgument("-m32bit-doubles");
            cmdLine.addArgument("-fno-exceptions");
            cmdLine.addArgument("-std=c99");
            cmdLine.addArgument("-o").addArgument("${destinationFile}");
            cmdLine.addArgument("${sourceFile}");
            cmdLine.addArgument("-lm");
            for (CLib lib : libs) {
                cmdLine.addArgument("-l" + lib.getName());
            }

            cmdLine.setSubstitutionMap(map);
            DefaultExecutor executor = new DefaultExecutor();
            executor.setExitValues(new int[]{0, 1});

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream);
            executor.setStreamHandler(streamHandler);

            try {
                System.out.println(cmdLine);
                exitValue = executor.execute(cmdLine);
            } catch (ExecuteException ee) {
                exitValue = ee.getExitValue();
                logger.log(Level.SEVERE, "Unexpected exit value: {0}", exitValue);
                success = false;
                return false;
            } finally {
                temporaryDestinationFile.delete();
                output = outputStream.toString();
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
            success = true;
            return true;
        } catch (IOException ioe) {
            logger.log(Level.SEVERE, null, ioe);
            success = false;
            return false;
        }
    }

    protected boolean compileForRam(String executable, File sourceFile, File destinationFile) {
        try {
            List<CLib> libs = new ArrayList<>();
            libs.add(cLibs.get("simpletools"));
            libs.add(cLibs.get("simpletext"));
            libs.add(cLibs.get("simplei2c"));

            File libDirectory = new File(new File(System.getProperty("user.dir")), "/propeller-c-lib");
            Map map = new HashMap();
            map.put("sourceFile", sourceFile);
            map.put("destinationFile", destinationFile);
            CommandLine cmdLine = new CommandLine(executable);
            for (CLib lib : libs) {
                cmdLine.addArgument("-I").addArgument("${libdir" + lib.getName() + "}");
                cmdLine.addArgument("-L").addArgument("${memorymodel" + lib.getName() + "}");
//                cmdLine.addArgument("-l" + lib.getName());

                map.put("libdir" + lib.getName(), new File(libDirectory, lib.getLibdir()));
                map.put("memorymodel" + lib.getName(), new File(libDirectory, lib.getMemoryModel().get("cmm")));
            }
            cmdLine.addArgument("-Os");
            cmdLine.addArgument("-mcmm");
            cmdLine.addArgument("-m32bit-doubles");
            cmdLine.addArgument("-std=c99");
            cmdLine.addArgument("-o").addArgument("${destinationFile}");
            cmdLine.addArgument("${sourceFile}");
            cmdLine.addArgument("-lm");
            for (CLib lib : libs) {
                cmdLine.addArgument("-l" + lib.getName());
            }

            cmdLine.setSubstitutionMap(map);
            DefaultExecutor executor = new DefaultExecutor();
            //  executor.setExitValues(new int[]{402, 101});

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
            success = true;
            return true;
        } catch (IOException ioe) {
            logger.log(Level.SEVERE, null, ioe);
            success = false;
            return false;
        }
    }

    protected boolean compileForEeprom(String executable, File sourceFile, File destinationFile) {
        try {
            List<CLib> libs = new ArrayList<>();
            libs.add(cLibs.get("simpletools"));
            libs.add(cLibs.get("simpletext"));
            libs.add(cLibs.get("simplei2c"));

            File libDirectory = new File(new File(System.getProperty("user.dir")), "/propeller-c-lib");
            Map map = new HashMap();
            map.put("sourceFile", sourceFile);
            map.put("destinationFile", destinationFile);
            CommandLine cmdLine = new CommandLine(executable);
            for (CLib lib : libs) {
                cmdLine.addArgument("-I").addArgument("${libdir" + lib.getName() + "}");
                cmdLine.addArgument("-L").addArgument("${memorymodel" + lib.getName() + "}");
                cmdLine.addArgument("-l" + lib.getName());

                map.put("libdir" + lib.getName(), new File(libDirectory, lib.getLibdir()));
                map.put("memorymodel" + lib.getName(), new File(libDirectory, lib.getMemoryModel().get("cmm")));
            }
            cmdLine.addArgument("-Os");
            cmdLine.addArgument("-mcmm");
            cmdLine.addArgument("-m32bit-doubles");
            cmdLine.addArgument("-std=c99");
            cmdLine.addArgument("-o").addArgument("${destinationFile}");
            cmdLine.addArgument("${sourceFile}");
            cmdLine.addArgument("-lm");
            for (CLib lib : libs) {
                cmdLine.addArgument("-l" + lib.getName());
            }
            cmdLine.setSubstitutionMap(map);
            DefaultExecutor executor = new DefaultExecutor();
            //  executor.setExitValues(new int[]{402, 101});

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
