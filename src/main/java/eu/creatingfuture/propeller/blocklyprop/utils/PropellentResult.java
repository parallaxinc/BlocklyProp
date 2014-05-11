/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.utils;

/**
 *
 * @author Michel
 */
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
