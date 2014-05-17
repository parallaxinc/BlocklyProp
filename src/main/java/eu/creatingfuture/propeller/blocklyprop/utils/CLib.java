/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package eu.creatingfuture.propeller.blocklyprop.utils;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Michel
 */
public class CLib {

    private String name;
    private String libdir;
    private Map<String, String> memoryModel = new HashMap<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLibdir() {
        return libdir;
    }

    public void setLibdir(String libdir) {
        this.libdir = libdir;
    }

    public Map<String, String> getMemoryModel() {
        return memoryModel;
    }

    public void setMemoryModel(Map<String, String> memoryModel) {
        this.memoryModel = memoryModel;
    }

    public void addMemoryModel(String model, String dir) {
        memoryModel.put(model, dir);
    }

}
