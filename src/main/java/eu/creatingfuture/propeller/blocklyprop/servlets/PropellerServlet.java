/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.servlets;

import com.google.gson.Gson;
import eu.creatingfuture.propeller.blocklyprop.BlocklyProp;
import eu.creatingfuture.propeller.blocklyprop.utils.PropellerAction;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
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
        Gson gson = new Gson();
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        List<String> ports = BlocklyProp.getPropellerCommunicator().getPorts(); // propellent.getPorts();

        out.print(gson.toJson(ports));
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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
        PropellerAction action = null;
        try {
            action = PropellerAction.valueOf(actionString);
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

        String spinCode = req.getParameter("code");

        File blocklyAppFile = File.createTempFile("blocklyapp", ".spin");
        try (PrintWriter blocklyAppWriter = new PrintWriter(blocklyAppFile)) {
            blocklyAppWriter.print(spinCode);
            blocklyAppWriter.flush();
        }

        boolean success = false;
        switch (action) {
            case COMPILE:
                success = BlocklyProp.getCompiler().compile(blocklyAppFile);
                break;
            case LOAD_RAM:
            case LOAD_EEPROM:
                success = compileAndRun(action, blocklyAppFile);
                break;
        }
        result.setSucces(success);
        result.setMessage(BlocklyProp.getCompiler().getLastOutput() + "\n\n" + BlocklyProp.getPropellerCommunicator().getLastOutput());
        result.setCode(BlocklyProp.getCompiler().getLastExitValue());

        blocklyAppFile.delete();

        out.print(gson.toJson(result));
        out.flush();
    }

    private boolean compileAndRun(PropellerAction action, File blocklyAppFile) throws IOException {
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
                    success = BlocklyProp.getPropellerCommunicator().loadIntoRam(compiledFile, null);
                    break;
                case LOAD_EEPROM:
                    success = BlocklyProp.getPropellerCommunicator().loadIntoEeprom(compiledFile, null);
                    break;
            }

        }
        if (compiledFile != null) {
            compiledFile.delete();
        }

        return success;
    }

    public class PropellentResult {

        private boolean succes;
        private int code;
        private String message;

        public PropellentResult() {
        }

        public void setSucces(boolean succes) {
            this.succes = succes;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public boolean isSucces() {
            return succes;
        }

        public int getCode() {
            return code;
        }

        public String getMessage() {
            return message;
        }

    }

}
