/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.interfaces;

import java.io.File;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface PropellerCommunicator {

    public List<String> getPorts();

    public boolean loadIntoRam(File ramFile, String comPort);

    public boolean loadIntoEeprom(File eepromFile, String comPort);

    public String getLastOutput();

    public int getLastExitValue();

}
