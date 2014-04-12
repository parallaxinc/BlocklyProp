/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.propeller;

import java.io.File;
import java.util.List;

/**
 * https://code.google.com/p/propgcc/wiki/PropGccLoader
 *
 * propeller-load -p com# fibo.elf -r -t
 *
 * propeller-load is the propgcc loader program. -p com# is the name of the
 * serial port, such as com7. if you omit -p the loader will use the first
 * serial port in the system. fibo.elf is the program image file to load. -r
 * says load to ram and run the program. -e would mean load to eeprom and run
 * the program. -t says start the terminal (press ESC or Ctrl-C when done).
 *
 * You can omit -p com# and propeller-load will use the first port for download.
 * propeller-load fibo.elf -r -t
 *
 * @author Michel
 */
public class WindowsPropellerLoad extends PropellerLoad {

    @Override
    public List<String> getPorts() {
        return this.getPorts("propeller-tools/windows/propeller-load.exe");
    }

    @Override
    public boolean loadIntoRam(File ramFile, String comPort) {
        return this.loadIntoRam("propeller-tools/windows/propeller-load.exe", ramFile, comPort);
    }

    @Override
    public boolean loadIntoEeprom(File eepromFile, String comPort) {
        return this.loadIntoEeprom("propeller-tools/windows/propeller-load.exe", eepromFile, comPort);
    }

}
