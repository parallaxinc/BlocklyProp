/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security.oauth;

import com.github.scribejava.apis.GoogleApi20;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.client.cloudsession.exceptions.ServerException;
import com.parallax.client.cloudsession.exceptions.WrongAuthenticationSourceException;
import com.parallax.client.cloudsession.objects.User;
import com.parallax.server.blocklyprop.security.NewOAuthUserException;
import com.parallax.server.blocklyprop.security.OAuthService;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.configuration.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class GoogleAuthenticator implements OAuthAuthenticator {

    private static final Logger log = LoggerFactory.getLogger(GoogleAuthenticator.class);

    private OAuth20Service service;

    private OAuthService oauthService;

    @Inject
    public void setConfiguration(Configuration configuration) {
        service = new ServiceBuilder()
                .apiKey("870921351080-ida0dmvbi4amao2d98ac1souu3ao25dv.apps.googleusercontent.com")
                .apiSecret("3n5f093hsMDs4qmWc7Q8z8Bn").scope("https://www.googleapis.com/auth/userinfo.email")
                .callback("http://dev.blockly.parallax.com:8084/blockly/oauth/google").debug().build(GoogleApi20.instance());
    }

    @Inject
    public void setOauthService(OAuthService oauthService) {
        this.oauthService = oauthService;
    }

    @Override
    public String getAuthorizationUrl() {
        Map<String, String> additionalParams = new HashMap<>();
        additionalParams.put("scope", "https://www.googleapis.com/auth/userinfo.email");

        // For local development only
        //    additionalParams.put("device_id", "blockly-dev");
        //    additionalParams.put("device_name", "Dev desktop");
        // service.getAuthorizationUrl(null);
        return service.getAuthorizationUrl();// additionalParams);
    }

    @Override
    public String handleAuthentication(String authenticationCode) throws NewOAuthUserException, WrongAuthenticationSourceException, ServerException {
        try {
            OAuth2AccessToken accessToken = service.getAccessToken(authenticationCode);
            System.out.println("Access token: " + accessToken.getAccessToken());

            OAuthRequest request = new OAuthRequest(Verb.GET, "https://www.googleapis.com/oauth2/v2/userinfo", service);
            service.signRequest(accessToken, request);
            Response response = request.send();
            //System.out.println(response.getBody());

            JsonElement jelement = new JsonParser().parse(response.getBody());
            JsonObject responseObject = jelement.getAsJsonObject();

            String name = responseObject.get("name").getAsString();
            String email = responseObject.get("email").getAsString();
            // return email

            User user = oauthService.authenticateUser(email, "Google");

            return email;
        } catch (IOException ioe) {
            log.error("IOError gettting Access token", ioe);
        }
        return null;
    }

}
