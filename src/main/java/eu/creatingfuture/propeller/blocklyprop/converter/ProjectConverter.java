/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.converter;

import com.google.gson.JsonObject;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.pojos.Project;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.ProjectRecord;

/**
 *
 * @author Michel
 */
public class ProjectConverter {

    public static JsonObject toJson(ProjectRecord project) {
        JsonObject result = new JsonObject();
        result.addProperty("id", project.getId());
        result.addProperty("name", project.getName());
        result.addProperty("description", project.getDescription());
        result.addProperty("private", project.getPrivate());
        result.addProperty("shared", project.getShared());
        return result;
    }

    public static JsonObject toJson(Project project) {
        JsonObject result = new JsonObject();
        result.addProperty("id", project.getId());
        result.addProperty("name", project.getName());
        result.addProperty("description", project.getDescription());
        result.addProperty("private", project.getPrivate());
        result.addProperty("shared", project.getShared());
        return result;
    }

}
