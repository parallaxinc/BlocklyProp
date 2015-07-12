/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.remote;

import com.github.kevinsawicki.http.HttpRequest;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.inject.Inject;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.configuration.Configuration;

/**
 *
 * @author Michel
 */
public class CloudSessionServer {

    private Configuration configuration;

    private static CloudSessionServer INSTANCE;

    public CloudSessionServer() {
        INSTANCE = this;
    }

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }

    public boolean authenticateLocalUser(String login, String password) {
        Map<String, String> data = new HashMap<>();
        data.put("email", login);
        data.put("password", password);
        String response = HttpRequest.post(getUrl("authenticate/local")).form(data).body();
        JsonElement jelement = new JsonParser().parse(response);
        JsonObject responseObject = jelement.getAsJsonObject();
        if (responseObject.get("success").getAsBoolean()) {
            return true;
        } else {
            System.out.println(response);
            return false;
        }
    }

    private String getUrl(String actionUrl) {
        String baseUrl = configuration.getString("cloudsession.baseurl");
        return baseUrl + actionUrl;
    }

    public static boolean authenticateLocalUserStatic(String login, String password) {
        return INSTANCE.authenticateLocalUser(login, password);
    }

}
