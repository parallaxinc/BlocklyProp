/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.utils;

import eu.creatingfuture.propeller.blocklyprop.db.enums.ProjectType;
import org.jooq.impl.EnumConverter;

/**
 *
 * @author Michel
 */
public class ProjectTypeConverter extends EnumConverter<String, ProjectType> {

    public ProjectTypeConverter() {
        super(String.class, ProjectType.class);
    }

}
