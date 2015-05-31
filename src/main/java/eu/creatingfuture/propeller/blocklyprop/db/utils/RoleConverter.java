/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.utils;

import eu.creatingfuture.propeller.blocklyprop.db.enums.Role;
import org.jooq.impl.EnumConverter;

/**
 *
 * @author Michel
 */
public class RoleConverter extends EnumConverter<String, Role> {

    public RoleConverter() {
        super(String.class, Role.class);
    }

}
