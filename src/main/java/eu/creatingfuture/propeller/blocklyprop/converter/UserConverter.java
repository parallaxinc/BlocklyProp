/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.converter;

import com.google.gson.JsonObject;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.pojos.User;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.UserRecord;

/**
 *
 * @author Michel
 */
public class UserConverter {

    public static JsonObject toJson(User user) {
        JsonObject result = new JsonObject();
        result.addProperty("id", user.getId());
        result.addProperty("screenname", user.getScreenname());
        result.addProperty("email", user.getEmail());
        result.addProperty("blocked", user.getBlocked());
        return result;
    }

    public static JsonObject toJson(UserRecord user) {
        JsonObject result = new JsonObject();
        result.addProperty("id", user.getId());
        result.addProperty("screenname", user.getScreenname());
        result.addProperty("email", user.getEmail());
        result.addProperty("blocked", user.getBlocked());
        return result;
    }

}
