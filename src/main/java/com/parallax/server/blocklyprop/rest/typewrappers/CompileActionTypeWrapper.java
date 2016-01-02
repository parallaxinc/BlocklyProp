/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.rest.typewrappers;

import com.parallax.client.cloudcompiler.objects.CompileAction;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Michel
 */
public class CompileActionTypeWrapper {

    private static final Map<String, CompileAction> MAPPER = Collections
            .unmodifiableMap(new HashMap<String, CompileAction>() {
                {
                    put("compile", CompileAction.COMPILE);
                    put("bin", CompileAction.BIN);
                    put("eeprom", CompileAction.EEPROM);
                }
            });

    private final CompileAction type;

    public static CompileActionTypeWrapper valueOf(String value) {
        CompileAction type = CompileActionTypeWrapper.MAPPER.get(value.toLowerCase());
        if (type == null) {
            // if nothing found just set the desired default value
            type = CompileAction.COMPILE;
        }
        return new CompileActionTypeWrapper(type);
    }

    private CompileActionTypeWrapper(CompileAction type) {
        this.type = type;
    }

    public CompileAction getAction() {
        return this.type;
    }

}
