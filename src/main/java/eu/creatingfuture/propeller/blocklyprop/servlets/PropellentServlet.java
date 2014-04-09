/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.servlets;

import com.google.gson.Gson;
import eu.creatingfuture.propeller.blocklyprop.propellent.Propellent;
import eu.creatingfuture.propeller.blocklyprop.propellent.PropellentAction;
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
public class PropellentServlet extends HttpServlet {

    private final Propellent propellent = new Propellent();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        List<String> ports = propellent.getPorts();

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
        }
        PropellentAction action = null;
        try {
            action = PropellentAction.valueOf(actionString);
        } catch (IllegalArgumentException iae) {
            // return error
            result.setSucces(false);
            result.setCode(102);
            result.setMessage("Invalid action");
            out.print(gson.toJson(result));
            out.flush();
        }
        if (action == null) {
            result.setSucces(false);
            result.setCode(102);
            result.setMessage("Invalid action");
            out.print(gson.toJson(result));
            out.flush();
        }

        String spinCode = req.getParameter("code");

        File blocklyAppFile = File.createTempFile("blocklyapp", ".spin");
        try (PrintWriter blocklyAppWriter = new PrintWriter(blocklyAppFile)) {
            blocklyAppWriter.print(spinCode);
            blocklyAppWriter.flush();
        }

        boolean succes = false;
        switch (action) {
            case COMPILE:
                succes = propellent.compile(blocklyAppFile);
                break;
        }
        result.setSucces(succes);
        result.setMessage(propellent.getLastOutput());
        result.setCode(propellent.getLastExitValue());

        blocklyAppFile.delete();

        out.print(gson.toJson(result));
        out.flush();
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
