/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.servlets;

import com.google.gson.Gson;
import eu.creatingfuture.propeller.blocklyprop.BlocklyProp;
import eu.creatingfuture.propeller.blocklyprop.utils.PropellentResult;
import eu.creatingfuture.propeller.blocklyprop.utils.PropellerPostAction;
import eu.creatingfuture.propeller.blocklyprop.utils.PropellerPutAction;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Michel
 */
public class PropellerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        Gson gson = new Gson();
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        List<String> ports = BlocklyProp.getPropellerCommunicator().getPorts(); // propellent.getPorts();

        out.print(gson.toJson(ports));
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        Gson gson = new Gson();
        PropellentResult result = new PropellentResult();
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        // Parse and validate parameters
        String actionString = req.getParameter("action");
        if (actionString == null) {
            // return error
            result.setSucces(false);
            result.setCode(101);
            result.setMessage("Action is not defined");
            out.print(gson.toJson(result));
            out.flush();
            return;
        }
        PropellerPostAction action = null;
        try {
            action = PropellerPostAction.valueOf(actionString);
        } catch (IllegalArgumentException iae) {
            // return error
            result.setSucces(false);
            result.setCode(102);
            result.setMessage("Invalid action");
            out.print(gson.toJson(result));
            out.flush();
            return;
        }
        if (action == null) {
            result.setSucces(false);
            result.setCode(102);
            result.setMessage("Invalid action");
            out.print(gson.toJson(result));
            out.flush();
            return;
        }

        String comPort = req.getParameter("comPort");

        String spinCode = req.getParameter("code");

        File blocklyAppFile = File.createTempFile("blocklyapp", ".spin");
        try {
            PrintWriter blocklyAppWriter = new PrintWriter(blocklyAppFile);

            blocklyAppWriter.print(spinCode);
            blocklyAppWriter.flush();
        } catch (IOException ioe) {
        }

        if (action == PropellerPostAction.COMPILE) {

            result.setSucces(BlocklyProp.getCompiler().compile(blocklyAppFile));
            result.setMessage(BlocklyProp.getCompiler().getLastOutput());
            result.setCode(BlocklyProp.getCompiler().getLastExitValue());

            blocklyAppFile.delete();

            out.print(gson.toJson(result));
            out.flush();
        } else {
            List<PropellentResult> results = new ArrayList<PropellentResult>();
            compileAndRun(action, blocklyAppFile, comPort);

            PropellentResult compileResult = new PropellentResult();
            boolean compileSuccess = BlocklyProp.getCompiler().wasLastSuccess();
            compileResult.setSucces(compileSuccess);
            compileResult.setMessage(BlocklyProp.getCompiler().getLastOutput());
            compileResult.setCode(BlocklyProp.getCompiler().getLastExitValue());
            results.add(compileResult);

            if (compileSuccess) {
                PropellentResult communicatorResult = new PropellentResult();
                communicatorResult.setSucces(BlocklyProp.getPropellerCommunicator().wasLastSuccess());
                communicatorResult.setMessage(BlocklyProp.getPropellerCommunicator().getLastOutput());
                communicatorResult.setCode(BlocklyProp.getPropellerCommunicator().getLastExitValue());
                results.add(communicatorResult);
            }

            blocklyAppFile.delete();

            out.print(gson.toJson(results));
            out.flush();
        }

    }

    private boolean compileAndRun(PropellerPostAction action, File blocklyAppFile, String comPort) throws IOException {
        boolean success = true;

        File compiledFile = null;
        switch (action) {
            case LOAD_RAM:
                compiledFile = File.createTempFile("blocklyapp", ".binary");
                success = BlocklyProp.getCompiler().compileForRam(blocklyAppFile, compiledFile);
                break;
            case LOAD_EEPROM:
                compiledFile = File.createTempFile("blocklyapp", ".eeprom");
                success = BlocklyProp.getCompiler().compileForEeprom(blocklyAppFile, compiledFile);
                break;
        }
        if (success) {
            switch (action) {
                case LOAD_RAM:
                    success = BlocklyProp.getPropellerCommunicator().loadIntoRam(compiledFile, comPort);
                    break;
                case LOAD_EEPROM:
                    success = BlocklyProp.getPropellerCommunicator().loadIntoEeprom(compiledFile, comPort);
                    break;
            }

        }
        if (compiledFile != null) {
            compiledFile.delete();
        }

        return success;
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        Gson gson = new Gson();
        PropellentResult result = new PropellentResult();
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        // Parse and validate parameters
        String actionString = req.getParameter("action");
        if (actionString == null) {
            // return error
            result.setSucces(false);
            result.setCode(101);
            result.setMessage("Action is not defined");
            out.print(gson.toJson(result));
            out.flush();
            return;
        }

        PropellerPutAction action = null;
        try {
            action = PropellerPutAction.valueOf(actionString);
        } catch (IllegalArgumentException iae) {
            // return error
            result.setSucces(false);
            result.setCode(102);
            result.setMessage("Invalid action");
            out.print(gson.toJson(result));
            out.flush();
            return;
        }
        if (action == null) {
            result.setSucces(false);
            result.setCode(102);
            result.setMessage("Invalid action");
            out.print(gson.toJson(result));
            out.flush();
            return;
        }

        String comPort = req.getParameter("comPort");

        File blocklyAppFile = null;

        switch (action) {
            case LOAD_RAM_BUF:
                blocklyAppFile = File.createTempFile("blocklyapp", ".binary");
                break;
            case LOAD_EEPROM_BUF:
                blocklyAppFile = File.createTempFile("blocklyapp", ".eeprom");
                break;
        }
        if (blocklyAppFile == null) {
            return;
        }

        // String bin = req.getParameter("bin");
        try {
            byte[] buffer = new byte[1024 * 1024];
            InputStream input = req.getInputStream();
            BufferedOutputStream output = new BufferedOutputStream(new FileOutputStream(blocklyAppFile));
            int bytesRead;
            while ((bytesRead = input.read(buffer)) != -1) {
                System.out.println(bytesRead);
                output.write(buffer, 0, bytesRead);
            }
            output.flush();
            output.close();
            input.close();
        } catch (IOException ioe) {
            blocklyAppFile.delete();
            result.setSucces(false);
            result.setCode(103);
            result.setMessage(ioe.getMessage());
            out.print(gson.toJson(result));
            out.flush();
            return;
        }

        boolean success = false;
        switch (action) {
            case LOAD_RAM_BUF:
                success = BlocklyProp.getPropellerCommunicator().loadIntoRam(blocklyAppFile, comPort);
                break;
            case LOAD_EEPROM_BUF:
                success = BlocklyProp.getPropellerCommunicator().loadIntoEeprom(blocklyAppFile, comPort);
                break;
        }
        result.setSucces(success);
        result.setMessage(BlocklyProp.getPropellerCommunicator().getLastOutput());
        result.setCode(BlocklyProp.getPropellerCommunicator().getLastExitValue());

        blocklyAppFile.delete();

        out.print(gson.toJson(result));
        out.flush();
    }

}
