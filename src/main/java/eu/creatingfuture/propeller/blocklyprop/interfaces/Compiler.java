/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.interfaces;

import java.io.File;

/**
 *
 * @author Michel
 */
public interface Compiler {

    public boolean compile(File sourceFile);

    public boolean compileForRam(File sourceFile, File destinationFile);

    public boolean compileForEeprom(File sourceFile, File destinationFile);

    public String getLastOutput();

    public int getLastExitValue();

}
